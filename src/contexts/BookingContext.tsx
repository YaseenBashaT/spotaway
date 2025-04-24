
import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import { addDays, format, isAfter, isBefore, isEqual, parseISO } from "date-fns";
import { toast } from "sonner";
import { Hotel } from "@/types/hotel";
import { hotelData } from "@/data/hotels";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

// Define types
export interface Booking {
  id: string;
  userId: string;
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  createdAt: string;
  status: "confirmed" | "cancelled" | "completed";
}

// Supabase booking type matches the database structure
interface SupabaseBooking {
  id: string;
  user_id: string;
  hotel_id: string;
  room_id: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  created_at: string;
  status: string;
}

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface BookingContextType {
  hotels: Hotel[];
  filteredHotels: Hotel[];
  selectedHotel: Hotel | null;
  bookings: Booking[];
  dateRange: DateRange;
  filterCriteria: {
    location: string;
    priceRange: [number, number];
    amenities: string[];
  };
  isLoading: boolean;
  setDateRange: (range: DateRange) => void;
  setFilterCriteria: (criteria: Partial<BookingContextType["filterCriteria"]>) => void;
  selectHotel: (hotelId: string) => void;
  checkRoomAvailability: (hotelId: string, roomId: string, checkIn: Date, checkOut: Date) => Promise<boolean>;
  createBooking: (booking: Omit<Booking, "id" | "createdAt" | "status">) => Promise<Booking | null>;
  getUserBookings: (userId: string) => Booking[];
  cancelBooking: (bookingId: string) => Promise<boolean>;
}

// Helper function to convert Supabase booking to our app's Booking type
const mapSupabaseBookingToBooking = (supabaseBooking: SupabaseBooking): Booking => {
  return {
    id: supabaseBooking.id,
    userId: supabaseBooking.user_id,
    hotelId: supabaseBooking.hotel_id,
    roomId: supabaseBooking.room_id,
    checkIn: supabaseBooking.check_in,
    checkOut: supabaseBooking.check_out,
    guests: supabaseBooking.guests,
    totalPrice: supabaseBooking.total_price,
    createdAt: supabaseBooking.created_at,
    status: supabaseBooking.status as "confirmed" | "cancelled" | "completed",
  };
};

// Create context
const BookingContext = createContext<BookingContextType | null>(null);

// Hook for using the context
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [filterCriteria, setFilterCriteria] = useState({
    location: "",
    priceRange: [0, 1000] as [number, number],
    amenities: [] as string[],
  });

  // Load hotels and user's bookings on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setHotels(hotelData);
        
        if (user) {
          const { data: bookingsData, error } = await supabase
            .from('bookings')
            .select('*')
            .eq('user_id', user.id);
          
          if (error) throw error;
          
          // Map Supabase bookings to our app's Booking type
          const mappedBookings = (bookingsData as SupabaseBooking[]).map(mapSupabaseBookingToBooking);
          setBookings(mappedBookings);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load bookings");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

  // Filter hotels based on criteria
  const filteredHotels = useMemo(() => {
    return hotels.filter(hotel => {
      // Filter by location
      if (filterCriteria.location && 
          !hotel.location.city.toLowerCase().includes(filterCriteria.location.toLowerCase()) &&
          !hotel.location.country.toLowerCase().includes(filterCriteria.location.toLowerCase())) {
        return false;
      }
      
      // Filter by price range
      const hotelMinPrice = Math.min(...hotel.rooms.map(room => room.pricePerNight));
      if (hotelMinPrice < filterCriteria.priceRange[0] || 
          hotelMinPrice > filterCriteria.priceRange[1]) {
        return false;
      }
      
      // Filter by amenities
      if (filterCriteria.amenities.length > 0) {
        return filterCriteria.amenities.every(amenity => 
          hotel.amenities.includes(amenity)
        );
      }
      
      return true;
    });
  }, [hotels, filterCriteria]);

  const selectHotel = (hotelId: string) => {
    const hotel = hotels.find(h => h.id === hotelId) || null;
    setSelectedHotel(hotel);
  };

  const checkRoomAvailability = async (
    hotelId: string, 
    roomId: string, 
    checkIn: Date, 
    checkOut: Date
  ): Promise<boolean> => {
    try {
      const { data: existingBookings, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('hotel_id', hotelId)
        .eq('room_id', roomId)
        .neq('status', 'cancelled');
      
      if (error) throw error;

      return !(existingBookings as SupabaseBooking[]).some(booking => {
        const bookingCheckIn = parseISO(booking.check_in);
        const bookingCheckOut = parseISO(booking.check_out);
        
        return (
          (isAfter(checkIn, bookingCheckIn) || isEqual(checkIn, bookingCheckIn)) && 
          (isBefore(checkIn, bookingCheckOut)) ||
          (isAfter(checkOut, bookingCheckIn) && 
          (isBefore(checkOut, bookingCheckOut) || isEqual(checkOut, bookingCheckOut))) ||
          (isBefore(checkIn, bookingCheckIn) && isAfter(checkOut, bookingCheckOut))
        );
      });
    } catch (error) {
      console.error("Error checking availability:", error);
      return false;
    }
  };

  const createBooking = async (
    bookingData: Omit<Booking, "id" | "createdAt" | "status">
  ): Promise<Booking | null> => {
    if (!user) {
      toast.error("You must be logged in to make a booking");
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          user_id: user.id,
          hotel_id: bookingData.hotelId,
          room_id: bookingData.roomId,
          check_in: bookingData.checkIn,
          check_out: bookingData.checkOut,
          guests: bookingData.guests,
          total_price: bookingData.totalPrice,
          status: 'confirmed'
        }])
        .select()
        .single();

      if (error) throw error;
      
      // Map Supabase booking to our app's Booking type
      const newBooking = mapSupabaseBookingToBooking(data as SupabaseBooking);
      setBookings(prev => [...prev, newBooking]);
      return newBooking;
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to create booking");
      return null;
    }
  };

  const getUserBookings = (userId: string): Booking[] => {
    return bookings.filter(booking => booking.userId === userId);
  };

  const cancelBooking = async (bookingId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId)
        .eq('user_id', user?.id);

      if (error) throw error;

      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'cancelled' } 
            : booking
        )
      );
      
      toast.success("Booking cancelled successfully");
      return true;
    } catch (error) {
      console.error("Cancel error:", error);
      toast.error("Failed to cancel booking");
      return false;
    }
  };

  const updateFilterCriteria = (criteria: Partial<BookingContextType["filterCriteria"]>) => {
    setFilterCriteria(prev => ({
      ...prev,
      ...criteria,
    }));
  };

  return (
    <BookingContext.Provider
      value={{
        hotels,
        filteredHotels,
        selectedHotel,
        bookings,
        dateRange,
        filterCriteria,
        isLoading,
        setDateRange,
        setFilterCriteria: updateFilterCriteria,
        selectHotel,
        checkRoomAvailability,
        createBooking,
        getUserBookings,
        cancelBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

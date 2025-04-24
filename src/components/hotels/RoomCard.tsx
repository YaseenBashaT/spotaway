
import { useState } from "react";
import { format, addDays, differenceInDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Room } from "@/types/hotel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/contexts/BookingContext";
import { toast } from "sonner";

interface RoomCardProps {
  room: Room;
  hotelId: string;
}

const RoomCard = ({ room, hotelId }: RoomCardProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { dateRange, checkRoomAvailability } = useBooking();
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  
  // Calculate number of nights and total price if dates are selected
  const nights = dateRange.from && dateRange.to 
    ? differenceInDays(dateRange.to, dateRange.from)
    : 0;
  
  const totalPrice = nights * room.pricePerNight;
  
  const handleBookNow = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to book a room");
      navigate("/login");
      return;
    }
    
    if (!dateRange.from || !dateRange.to) {
      toast.error("Please select check-in and check-out dates");
      return;
    }
    
    setIsCheckingAvailability(true);
    
    try {
      // Check if room is available for selected dates
      const isAvailable = checkRoomAvailability(
        hotelId,
        room.id,
        dateRange.from,
        dateRange.to
      );
      
      if (isAvailable) {
        // Navigate to booking page with necessary data
        navigate(`/booking/new`, {
          state: {
            hotelId,
            roomId: room.id,
            checkIn: format(dateRange.from, "yyyy-MM-dd"),
            checkOut: format(dateRange.to, "yyyy-MM-dd"),
            nights,
            totalPrice,
          },
        });
      } else {
        toast.error("This room is not available for the selected dates");
      }
    } finally {
      setIsCheckingAvailability(false);
    }
  };
  
  return (
    <Card className="overflow-hidden border shadow-sm mb-6">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3 p-4">
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {room.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-square relative overflow-hidden rounded-md">
                    <img
                      src={image}
                      alt={`${room.name} - Image ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
        
        <div className="lg:w-2/3 p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">{room.name}</h3>
              <div className="text-right">
                <div className="text-lg font-medium text-primary">
                  ${room.pricePerNight}
                  <span className="text-sm font-normal text-gray-500"> / night</span>
                </div>
                {nights > 0 && (
                  <div className="text-sm text-gray-500">
                    ${totalPrice} total for {nights} {nights === 1 ? 'night' : 'nights'}
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{room.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <span>{room.capacity} {room.capacity === 1 ? 'Guest' : 'Guests'}</span>
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <span>{room.bedType}</span>
              </Badge>
              {room.amenities.slice(0, 3).map((amenity) => (
                <Badge key={amenity} variant="outline">
                  {amenity}
                </Badge>
              ))}
              {room.amenities.length > 3 && (
                <Badge variant="outline">+{room.amenities.length - 3} more</Badge>
              )}
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleBookNow}
              disabled={isCheckingAvailability || !dateRange.from || !dateRange.to}
              className="w-full md:w-auto"
            >
              {isCheckingAvailability ? "Checking Availability..." : "Book Now"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RoomCard;

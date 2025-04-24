
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DateRangePicker } from "@/components/hotels/DateRangePicker";
import RoomCard from "@/components/hotels/RoomCard";
import { useBooking } from "@/contexts/BookingContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

const HotelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hotels, selectedHotel, selectHotel, dateRange, setDateRange } = useBooking();
  
  useEffect(() => {
    // If we have an ID from the URL and hotels are loaded, select the hotel
    if (id && hotels.length > 0) {
      selectHotel(id);
    }
  }, [id, hotels, selectHotel]);
  
  // If hotel not found, show error and redirect
  useEffect(() => {
    if (hotels.length > 0 && id && !hotels.some(hotel => hotel.id === id)) {
      console.error("Hotel not found");
      navigate("/hotels", { replace: true });
    }
  }, [id, hotels, navigate]);
  
  if (!selectedHotel) {
    return (
      <Layout>
        <div className="container-custom py-8">
          <div className="animate-pulse">
            <Skeleton className="h-8 w-1/2 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-8" />
            
            <Skeleton className="h-96 w-full rounded-lg mb-8" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Skeleton className="h-40" />
              <Skeleton className="h-40" />
              <Skeleton className="h-40" />
            </div>
            
            <Skeleton className="h-8 w-1/3 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-8" />
            
            <Skeleton className="h-8 w-1/3 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </div>
            
            <Skeleton className="h-8 w-1/3 mb-4" />
            <Skeleton className="h-64 w-full mb-6" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{selectedHotel.name}</h1>
          <div className="flex items-center text-gray-600">
            <span className="mr-2">
              {selectedHotel.location.city}, {selectedHotel.location.country}
            </span>
            <span className="flex items-center ml-4">
              <Badge className="bg-primary text-white">{selectedHotel.rating} ★</Badge>
            </span>
          </div>
        </div>
        
        {/* Hotel Images */}
        <div className="mb-8">
          <Carousel className="w-full">
            <CarouselContent>
              {selectedHotel.images.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <div className="overflow-hidden rounded-lg aspect-square">
                      <img
                        src={image}
                        alt={`${selectedHotel.name} - Image ${index + 1}`}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">About this hotel</h2>
              <p className="text-gray-700">{selectedHotel.description}</p>
            </div>
            
            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {selectedHotel.amenities.map((amenity) => (
                  <div 
                    key={amenity} 
                    className="flex items-center p-3 border rounded-md"
                  >
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Location */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Location</h2>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="font-medium">{selectedHotel.location.address}</p>
                <p>
                  {selectedHotel.location.city}, {selectedHotel.location.postalCode}
                </p>
                <p>{selectedHotel.location.country}</p>
              </div>
            </div>
          </div>
          
          <div>
            {/* Date Picker */}
            <div className="sticky top-24 bg-white p-6 border rounded-lg shadow-sm mb-8">
              <h2 className="text-xl font-semibold mb-4">Check Availability</h2>
              <DateRangePicker
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                className="mb-4"
              />
              <p className="text-sm text-gray-500 mb-3">
                Select check-in and check-out dates to view availability
              </p>
              <Separator className="my-4" />
              <p className="text-center text-sm text-gray-700">
                {dateRange.from && dateRange.to
                  ? "Now scroll down to see available rooms"
                  : "Select dates to view room options"}
              </p>
            </div>
          </div>
        </div>
        
        {/* Available Rooms */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">Available Rooms</h2>
          
          {dateRange.from && dateRange.to ? (
            <div>
              {selectedHotel.rooms.map((room) => (
                <RoomCard key={room.id} room={room} hotelId={selectedHotel.id} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-8 text-center rounded-lg">
              <h3 className="text-xl font-medium mb-2">Select dates to view available rooms</h3>
              <p className="text-gray-600">
                Please select your check-in and check-out dates above to see room availability and prices
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HotelDetail;

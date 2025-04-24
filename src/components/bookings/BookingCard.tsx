
import { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Booking } from "@/contexts/BookingContext";
import { useBooking } from "@/contexts/BookingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface BookingCardProps {
  booking: Booking;
}

const BookingCard = ({ booking }: BookingCardProps) => {
  const { hotels, cancelBooking } = useBooking();
  const navigate = useNavigate();
  const [isCancelling, setIsCancelling] = useState(false);
  
  // Find hotel and room details
  const hotel = hotels.find(h => h.id === booking.hotelId);
  const room = hotel?.rooms.find(r => r.id === booking.roomId);
  
  if (!hotel || !room) {
    return <div>Booking information not available</div>;
  }
  
  const handleCancelBooking = async () => {
    setIsCancelling(true);
    try {
      await cancelBooking(booking.id);
    } finally {
      setIsCancelling(false);
    }
  };
  
  const handleViewHotel = () => {
    navigate(`/hotels/${hotel.id}`);
  };
  
  // Render booking status badge with appropriate color
  const renderStatusBadge = () => {
    switch (booking.status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      case "completed":
        return <Badge variant="outline">Completed</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <img
              src={hotel.images[0]}
              alt={hotel.name}
              className="w-full h-32 object-cover rounded-md"
            />
          </div>
          
          <div className="md:w-3/4 md:pl-6">
            <div className="flex flex-col md:flex-row md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">{hotel.name}</h3>
                <p className="text-sm text-gray-500">
                  {hotel.location.city}, {hotel.location.country}
                </p>
                <p className="text-gray-700 mt-1">Room: {room.name}</p>
              </div>
              <div className="mt-2 md:mt-0 text-right">
                {renderStatusBadge()}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Check-in</h4>
                <p>{format(new Date(booking.checkIn), "MMM dd, yyyy")}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Check-out</h4>
                <p>{format(new Date(booking.checkOut), "MMM dd, yyyy")}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Guests</h4>
                <p>{booking.guests}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-500">Booking ID</h4>
              <p className="text-sm">{booking.id}</p>
            </div>
            
            <div className="mt-4 bg-gray-50 p-3 rounded-md flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-lg font-semibold">${booking.totalPrice}</p>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  onClick={handleViewHotel}
                  variant="outline"
                  size="sm"
                >
                  View Hotel
                </Button>
                
                {booking.status === "confirmed" && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={isCancelling}
                      >
                        {isCancelling ? "Cancelling..." : "Cancel"}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to cancel this booking? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>No, keep booking</AlertDialogCancel>
                        <AlertDialogAction onClick={handleCancelBooking}>
                          Yes, cancel booking
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;

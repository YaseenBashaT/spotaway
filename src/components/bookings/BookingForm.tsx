
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/contexts/BookingContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface BookingFormProps {
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalPrice: number;
}

const BookingForm = ({
  hotelId,
  roomId,
  checkIn,
  checkOut,
  nights,
  totalPrice,
}: BookingFormProps) => {
  const { user } = useAuth();
  const { hotels, createBooking } = useBooking();
  const navigate = useNavigate();
  
  const [guests, setGuests] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get user name parts, with fallbacks
  const getUserName = () => {
    if (!user) return { firstName: "", lastName: "" };
    
    if (user.user_metadata?.full_name) {
      const nameParts = user.user_metadata.full_name.split(" ");
      return { 
        firstName: nameParts[0] || "", 
        lastName: nameParts.slice(1).join(" ") || "" 
      };
    }
    
    // Fallback to email if no name
    return { firstName: user.email?.split("@")[0] || "", lastName: "" };
  };
  
  const { firstName, lastName } = getUserName();
  
  const [firstNameInput, setFirstName] = useState(firstName);
  const [lastNameInput, setLastName] = useState(lastName);
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  
  // Find hotel and room details
  const hotel = hotels.find(h => h.id === hotelId);
  const room = hotel?.rooms.find(r => r.id === roomId);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to make a booking");
      navigate("/login");
      return;
    }
    
    if (!hotel || !room) {
      toast.error("Invalid hotel or room selection");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const booking = await createBooking({
        userId: user.id,
        hotelId,
        roomId,
        checkIn,
        checkOut,
        guests,
        totalPrice,
      });
      
      if (booking) {
        toast.success("Booking confirmed successfully!");
        navigate(`/bookings`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!hotel || !room) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Guest Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={firstNameInput}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={lastNameInput}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="guests">Number of Guests</Label>
                <Select
                  value={guests.toString()}
                  onValueChange={(value) => setGuests(parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of guests" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: room.capacity }, (_, i) => i + 1).map(
                      (num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Confirm Booking"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-lg">{hotel.name}</h3>
              <p className="text-sm text-gray-500">
                {hotel.location.city}, {hotel.location.country}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium">Room</h4>
              <p>{room.name}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <h4 className="font-medium">Check-in</h4>
                <p>{format(new Date(checkIn), "MMM dd, yyyy")}</p>
              </div>
              <div>
                <h4 className="font-medium">Check-out</h4>
                <p>{format(new Date(checkOut), "MMM dd, yyyy")}</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Room Price</span>
                <span>${room.pricePerNight} × {nights} nights</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingForm;

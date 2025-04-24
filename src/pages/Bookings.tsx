
import { useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import BookingCard from "@/components/bookings/BookingCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/contexts/BookingContext";

const Bookings = () => {
  const { user, isAuthenticated } = useAuth();
  const { getUserBookings } = useBooking();
  
  // Get user's bookings
  const userBookings = useMemo(() => {
    if (!user) return [];
    return getUserBookings(user.id);
  }, [user, getUserBookings]);
  
  // Filter bookings by status
  const confirmedBookings = userBookings.filter(
    booking => booking.status === "confirmed"
  );
  
  const cancelledBookings = userBookings.filter(
    booking => booking.status === "cancelled"
  );
  
  const completedBookings = userBookings.filter(
    booking => booking.status === "completed"
  );
  
  // If not authenticated, show message
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container-custom py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Login Required</h1>
          <p className="text-gray-600 mb-8">
            Please login to view your bookings
          </p>
          <Link to="/login">
            <Button>Log in</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-2xl font-bold mb-2">My Bookings</h1>
        <p className="text-gray-600 mb-8">
          View and manage all your bookings in one place
        </p>
        
        <Tabs defaultValue="confirmed" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="confirmed">
              Upcoming ({confirmedBookings.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedBookings.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({cancelledBookings.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="confirmed">
            {confirmedBookings.length > 0 ? (
              confirmedBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">No upcoming bookings</h2>
                <p className="text-gray-600 mb-6">
                  You don't have any confirmed reservations at the moment
                </p>
                <Link to="/hotels">
                  <Button>Browse Hotels</Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            {completedBookings.length > 0 ? (
              completedBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">No completed stays</h2>
                <p className="text-gray-600 mb-6">
                  Your completed bookings will appear here
                </p>
                <Link to="/hotels">
                  <Button>Browse Hotels</Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="cancelled">
            {cancelledBookings.length > 0 ? (
              cancelledBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">No cancelled bookings</h2>
                <p className="text-gray-600 mb-6">
                  You don't have any cancelled reservations
                </p>
                <Link to="/hotels">
                  <Button>Browse Hotels</Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Bookings;

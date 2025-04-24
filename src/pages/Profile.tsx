
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import BookingCard from "@/components/bookings/BookingCard";
import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/contexts/BookingContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const { getUserBookings } = useBooking();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;
  
  const userBookings = getUserBookings(user.id);
  const activeBookings = userBookings.filter(b => b.status === "confirmed");
  const pastBookings = userBookings.filter(b => b.status === "completed");
  const cancelledBookings = userBookings.filter(b => b.status === "cancelled");

  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-gray-600 mb-8">Welcome back, {user.email}</p>

        <Tabs defaultValue="active" className="w-full">
          <TabsList>
            <TabsTrigger value="active">Active Bookings ({activeBookings.length})</TabsTrigger>
            <TabsTrigger value="past">Past Stays ({pastBookings.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({cancelledBookings.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {activeBookings.length > 0 ? (
              <div className="space-y-4">
                {activeBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">No active bookings</h2>
                <p className="text-gray-600 mb-6">
                  Ready to plan your next stay?
                </p>
                <Button onClick={() => navigate("/hotels")}>Browse Hotels</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            {pastBookings.length > 0 ? (
              <div className="space-y-4">
                {pastBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">No past stays</h2>
                <p className="text-gray-600 mb-6">
                  Your completed stays will appear here
                </p>
                <Button onClick={() => navigate("/hotels")}>Browse Hotels</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="cancelled">
            {cancelledBookings.length > 0 ? (
              <div className="space-y-4">
                {cancelledBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">No cancelled bookings</h2>
                <p className="text-gray-600 mb-6">
                  Cancelled bookings will appear here
                </p>
                <Button onClick={() => navigate("/hotels")}>Browse Hotels</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;

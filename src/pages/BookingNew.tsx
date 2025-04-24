
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import BookingForm from "@/components/bookings/BookingForm";
import { useAuth } from "@/contexts/AuthContext";

const BookingNew = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Get booking data from location state
  const bookingData = location.state;
  
  // Redirect if not authenticated or no booking data
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    if (!bookingData) {
      navigate("/hotels");
    }
  }, [bookingData, isAuthenticated, navigate]);
  
  if (!bookingData) {
    return (
      <Layout>
        <div className="container-custom py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Booking Request</h1>
          <p className="text-gray-600 mb-8">
            Please select a hotel and room before proceeding to booking.
          </p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-2xl font-bold mb-2">Complete Your Booking</h1>
        <p className="text-gray-600 mb-8">
          You're just a few steps away from confirming your reservation
        </p>
        
        <BookingForm
          hotelId={bookingData.hotelId}
          roomId={bookingData.roomId}
          checkIn={bookingData.checkIn}
          checkOut={bookingData.checkOut}
          nights={bookingData.nights}
          totalPrice={bookingData.totalPrice}
        />
      </div>
    </Layout>
  );
};

export default BookingNew;

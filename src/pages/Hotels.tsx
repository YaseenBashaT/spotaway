
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import HotelCard from "@/components/hotels/HotelCard";
import HotelFilters from "@/components/hotels/HotelFilters";
import { DateRangePicker } from "@/components/hotels/DateRangePicker";
import { useBooking } from "@/contexts/BookingContext";
import { Skeleton } from "@/components/ui/skeleton";

const Hotels = () => {
  const { filteredHotels, dateRange, setDateRange, isLoading } = useBooking();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-8">Find Your Perfect Hotel</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="sticky top-24">
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Dates</h2>
                <DateRangePicker
                  dateRange={dateRange}
                  onDateRangeChange={setDateRange}
                  className="mb-4"
                />
                <p className="text-sm text-gray-500">
                  Select dates to see availability and prices
                </p>
              </div>
              
              <HotelFilters />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            {isLoading || !isMounted ? (
              // Loading state
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex flex-col">
                    <Skeleton className="h-60 w-full rounded-t-lg" />
                    <div className="p-4 border border-t-0 rounded-b-lg">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <div className="flex gap-2 mb-4">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                      <div className="flex justify-between mt-2">
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-6 w-1/4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredHotels.length > 0 ? (
              <>
                <p className="mb-4 text-gray-600">
                  {filteredHotels.length} {filteredHotels.length === 1 ? "hotel" : "hotels"} found
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredHotels.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold mb-2">No hotels found</h2>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Hotels;

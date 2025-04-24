
import { useEffect, useState } from "react";
import { useBooking } from "@/contexts/BookingContext";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

// Common amenities for filtering
const commonAmenities = [
  "Free WiFi",
  "Swimming Pool",
  "Fitness Center",
  "Restaurant",
  "Spa",
  "Room Service",
  "Bar",
  "Free Parking",
  "Business Center",
  "Airport Shuttle",
];

const HotelFilters = () => {
  const { filterCriteria, setFilterCriteria } = useBooking();
  
  // Local state for form values
  const [location, setLocation] = useState(filterCriteria.location);
  const [priceRange, setPriceRange] = useState<[number, number]>(filterCriteria.priceRange);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(filterCriteria.amenities);
  const [isOpen, setIsOpen] = useState(false);
  
  // Apply filters when form is submitted
  const handleApplyFilters = () => {
    setFilterCriteria({
      location,
      priceRange,
      amenities: selectedAmenities,
    });
    
    // On mobile, close the filter panel
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };
  
  // Reset filters
  const handleResetFilters = () => {
    setLocation("");
    setPriceRange([0, 1000]);
    setSelectedAmenities([]);
    
    setFilterCriteria({
      location: "",
      priceRange: [0, 1000],
      amenities: [],
    });
  };
  
  // Handle amenity checkbox changes
  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };
  
  return (
    <div className="mb-8">
      {/* Mobile filter toggle */}
      <div className="md:hidden mb-4">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          className="w-full flex items-center justify-center"
        >
          <Filter size={18} className="mr-2" />
          {isOpen ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>
      
      {/* Filter content - always visible on desktop, toggleable on mobile */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          
          {/* Location */}
          <div className="mb-6">
            <Label htmlFor="location" className="block mb-2">Location</Label>
            <Input
              id="location"
              type="text"
              placeholder="City or country"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full"
            />
          </div>
          
          {/* Price Range */}
          <div className="mb-6">
            <Label className="block mb-2">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </Label>
            <Slider
              value={priceRange}
              min={0}
              max={1000}
              step={10}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="my-6"
            />
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">$0</span>
              <span className="text-sm text-gray-500">$1000+</span>
            </div>
          </div>
          
          {/* Amenities */}
          <div className="mb-6">
            <Label className="block mb-3">Amenities</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {commonAmenities.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`amenity-${amenity}`}
                    checked={selectedAmenities.includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                  />
                  <Label
                    htmlFor={`amenity-${amenity}`}
                    className="text-sm cursor-pointer"
                  >
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleApplyFilters} className="flex-1">
              Apply Filters
            </Button>
            <Button 
              onClick={handleResetFilters} 
              variant="outline" 
              className="flex-1"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelFilters;

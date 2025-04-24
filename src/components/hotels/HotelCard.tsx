
import { useState } from "react";
import { Link } from "react-router-dom";
import { Hotel } from "@/types/hotel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard = ({ hotel }: HotelCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Calculate min price across all rooms
  const minPrice = Math.min(...hotel.rooms.map(room => room.pricePerNight));
  
  // Get top 3 amenities to display
  const topAmenities = hotel.amenities.slice(0, 3);
  
  return (
    <Link to={`/hotels/${hotel.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={hotel.images[currentImageIndex]}
            alt={hotel.name}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 flex space-x-1">
            {hotel.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentImageIndex(index);
                }}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
          <div className="absolute top-2 left-2">
            <Badge className="bg-primary text-white">
              {hotel.rating} ★
            </Badge>
          </div>
        </div>
        <CardContent className="flex-grow p-4">
          <h3 className="text-lg font-semibold mb-1 line-clamp-1">{hotel.name}</h3>
          <p className="text-sm text-gray-500 mb-2">
            {hotel.location.city}, {hotel.location.country}
          </p>
          <div className="line-clamp-2 text-sm text-gray-600 mb-3">
            {hotel.description}
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {topAmenities.map((amenity) => (
              <Badge key={amenity} variant="outline" className="text-xs">
                {amenity}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 border-t">
          <div className="flex justify-between items-center w-full">
            <div>
              <span className="text-lg font-semibold text-primary">${minPrice}</span>
              <span className="text-sm text-gray-500"> / night</span>
            </div>
            <span className="text-sm text-primary hover:underline">View details</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default HotelCard;

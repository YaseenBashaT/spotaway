
export interface Location {
  address: string;
  city: string;
  country: string;
  postalCode: string;
  latitude: number;
  longitude: number;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  capacity: number;
  bedType: string;
  pricePerNight: number;
  images: string[];
  amenities: string[];
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  location: Location;
  rating: number;
  images: string[];
  amenities: string[];
  rooms: Room[];
}

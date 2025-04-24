
import { Hotel } from "@/types/hotel";

export const hotelData: Hotel[] = [
  {
    id: "1",
    name: "Grand Plaza Hotel",
    description: "Luxury hotel in the heart of downtown with stunning city views and premium amenities for both business and leisure travelers.",
    location: {
      address: "123 Main Street",
      city: "New York",
      country: "USA",
      postalCode: "10001",
      latitude: 40.7128,
      longitude: -74.006
    },
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1000"
    ],
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Fitness Center",
      "Restaurant",
      "Bar",
      "Room Service",
      "Spa",
      "Business Center"
    ],
    rooms: [
      {
        id: "101",
        name: "Deluxe King Room",
        description: "Spacious room with a king-sized bed, city view, and modern amenities.",
        capacity: 2,
        bedType: "King",
        pricePerNight: 250,
        images: [
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1000",
          "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1000"
        ],
        amenities: [
          "Air Conditioning",
          "Flat-screen TV",
          "Mini Bar",
          "Safe",
          "Coffee Maker",
          "Premium Bedding"
        ]
      },
      {
        id: "102",
        name: "Executive Suite",
        description: "Luxury suite with separate living area, premium amenities, and panoramic city views.",
        capacity: 3,
        bedType: "King",
        pricePerNight: 450,
        images: [
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&q=80&w=1000",
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1000"
        ],
        amenities: [
          "Air Conditioning",
          "Flat-screen TV",
          "Mini Bar",
          "Safe",
          "Coffee Maker",
          "Premium Bedding",
          "Separate Living Area",
          "Work Desk",
          "Bath Tub"
        ]
      },
      {
        id: "103",
        name: "Twin Room",
        description: "Comfortable room with two twin beds, ideal for friends or colleagues traveling together.",
        capacity: 2,
        bedType: "Twin",
        pricePerNight: 200,
        images: [
          "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&q=80&w=1000",
          "https://images.unsplash.com/photo-1587985064135-0366536eab42?auto=format&fit=crop&q=80&w=1000"
        ],
        amenities: [
          "Air Conditioning",
          "Flat-screen TV",
          "Mini Bar",
          "Safe",
          "Coffee Maker"
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Seaside Resort & Spa",
    description: "Beautiful beachfront resort with direct access to private beach, multiple pools, and a world-class spa.",
    location: {
      address: "789 Ocean Drive",
      city: "Miami",
      country: "USA",
      postalCode: "33139",
      latitude: 25.7617,
      longitude: -80.1918
    },
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=1000"
    ],
    amenities: [
      "Free WiFi",
      "Swimming Pools",
      "Private Beach",
      "Fitness Center",
      "Multiple Restaurants",
      "Bar",
      "Room Service",
      "Spa",
      "Children's Activities"
    ],
    rooms: [
      {
        id: "201",
        name: "Ocean View Room",
        description: "Relaxing room with breathtaking ocean views and a private balcony.",
        capacity: 2,
        bedType: "Queen",
        pricePerNight: 320,
        images: [
          "https://images.unsplash.com/photo-1609602126247-4ab7188b4aa1?auto=format&fit=crop&q=80&w=1000",
          "https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&q=80&w=1000"
        ],
        amenities: [
          "Air Conditioning",
          "Flat-screen TV",
          "Mini Bar",
          "Safe",
          "Coffee Maker",
          "Private Balcony"
        ]
      },
      {
        id: "202",
        name: "Beachfront Villa",
        description: "Exclusive villa with direct beach access, private pool, and luxurious amenities.",
        capacity: 4,
        bedType: "King + Sofa Bed",
        pricePerNight: 750,
        images: [
          "https://images.unsplash.com/photo-1602002418082-dd4a8f7053b3?auto=format&fit=crop&q=80&w=1000",
          "https://images.unsplash.com/photo-1576354302919-96748cb8299e?auto=format&fit=crop&q=80&w=1000"
        ],
        amenities: [
          "Air Conditioning",
          "Multiple Flat-screen TVs",
          "Full Kitchen",
          "Private Pool",
          "Direct Beach Access",
          "Premium Bedding",
          "Outdoor Shower",
          "Butler Service"
        ]
      }
    ]
  },
  {
    id: "3",
    name: "Mountain View Lodge",
    description: "Cozy mountain retreat with rustic charm, outdoor activities, and stunning natural surroundings.",
    location: {
      address: "456 Alpine Road",
      city: "Aspen",
      country: "USA",
      postalCode: "81611",
      latitude: 39.1911,
      longitude: -106.8175
    },
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1506974210756-8e1b8985d348?auto=format&fit=crop&q=80&w=1000"
    ],
    amenities: [
      "Free WiFi",
      "Restaurant",
      "Bar",
      "Fireplace",
      "Hot Tub",
      "Ski Storage",
      "Hiking Trails",
      "Shuttle Service"
    ],
    rooms: [
      {
        id: "301",
        name: "Mountain View Room",
        description: "Charming room with beautiful mountain views and rustic decor.",
        capacity: 2,
        bedType: "Queen",
        pricePerNight: 180,
        images: [
          "https://images.unsplash.com/photo-1604062527893-55539c99fa8c?auto=format&fit=crop&q=80&w=1000",
          "https://images.unsplash.com/photo-1604014056132-11a50234674e?auto=format&fit=crop&q=80&w=1000"
        ],
        amenities: [
          "Air Conditioning",
          "Flat-screen TV",
          "Coffee Maker",
          "Fireplace",
          "Balcony"
        ]
      },
      {
        id: "302",
        name: "Luxury Cabin",
        description: "Private cabin with fireplace, hot tub, and panoramic mountain views.",
        capacity: 4,
        bedType: "King + Bunk Beds",
        pricePerNight: 400,
        images: [
          "https://images.unsplash.com/photo-1596292581759-c9a94b823313?auto=format&fit=crop&q=80&w=1000",
          "https://images.unsplash.com/photo-1567636788276-40a47795ba4e?auto=format&fit=crop&q=80&w=1000"
        ],
        amenities: [
          "Air Conditioning",
          "Flat-screen TV",
          "Full Kitchen",
          "Fireplace",
          "Private Hot Tub",
          "BBQ Grill",
          "Ski-in/Ski-out Access"
        ]
      }
    ]
  },
  {
    id: "4",
    name: "Urban Boutique Hotel",
    description: "Stylish boutique hotel in a trendy neighborhood, offering a unique blend of modern design and personalized service.",
    location: {
      address: "888 Trendy Avenue",
      city: "San Francisco",
      country: "USA",
      postalCode: "94103",
      latitude: 37.7749,
      longitude: -122.4194
    },
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1630660664869-c9d3cc676880?auto=format&fit=crop&q=80&w=1000"
    ],
    amenities: [
      "Free WiFi",
      "Artisan Cafe",
      "Rooftop Bar",
      "Bicycle Rental",
      "Art Gallery",
      "Local Tours",
      "Co-working Space"
    ],
    rooms: [
      {
        id: "401",
        name: "Designer Queen Room",
        description: "Stylish room with curated artwork, designer furniture, and modern amenities.",
        capacity: 2,
        bedType: "Queen",
        pricePerNight: 220,
        images: [
          "https://images.unsplash.com/photo-1613571230005-55bc0b1d294d?auto=format&fit=crop&q=80&w=1000",
          "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&q=80&w=1000"
        ],
        amenities: [
          "Air Conditioning",
          "Smart TV",
          "Bluetooth Speaker",
          "Rainfall Shower",
          "Organic Toiletries",
          "Locally Sourced Minibar"
        ]
      },
      {
        id: "402",
        name: "Loft Suite",
        description: "Two-level suite with living area downstairs and bedroom upstairs, featuring local artwork.",
        capacity: 2,
        bedType: "King",
        pricePerNight: 350,
        images: [
          "https://images.unsplash.com/photo-1594563703937-fdc640497dcd?auto=format&fit=crop&q=80&w=1000",
          "https://images.unsplash.com/photo-1638989281126-32d055ab3c32?auto=format&fit=crop&q=80&w=1000"
        ],
        amenities: [
          "Air Conditioning",
          "Smart TV",
          "Bluetooth Speaker",
          "Rainfall Shower",
          "Organic Toiletries",
          "Espresso Machine",
          "Yoga Mat",
          "Record Player"
        ]
      }
    ]
  },
  {
    id: "5",
    name: "Historic City Inn",
    description: "Charming inn set in a beautifully restored historic building in the heart of the old city district.",
    location: {
      address: "123 Heritage Way",
      city: "Boston",
      country: "USA",
      postalCode: "02108",
      latitude: 42.3601,
      longitude: -71.0589
    },
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1527142879-95b61a0916bc?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1460533893735-45cea2c2e7e8?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1536938304283-528bee12726d?auto=format&fit=crop&q=80&w=1000"
    ],
    amenities: [
      "Free WiFi",
      "Continental Breakfast",
      "Historic Tour",
      "Library",
      "Tea Room",
      "Garden Courtyard",
      "Evening Wine Reception"
    ],
    rooms: [
      {
        id: "501",
        name: "Heritage Room",
        description: "Charming room with period details, antique furnishings, and modern comforts.",
        capacity: 2,
        bedType: "Queen",
        pricePerNight: 190,
        images: [
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1000",
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1000"
        ],
        amenities: [
          "Air Conditioning",
          "Flat-screen TV",
          "Tea/Coffee Facilities",
          "Premium Bedding",
          "Claw-foot Bathtub"
        ]
      },
      {
        id: "502",
        name: "Presidential Suite",
        description: "Luxurious suite where notable historical figures once stayed, featuring original architectural details.",
        capacity: 3,
        bedType: "King",
        pricePerNight: 420,
        images: [
          "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&q=80&w=1000",
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1000"
        ],
        amenities: [
          "Air Conditioning",
          "Flat-screen TV",
          "Tea/Coffee Facilities",
          "Premium Bedding",
          "Claw-foot Bathtub",
          "Sitting Area",
          "Working Fireplace",
          "Writing Desk"
        ]
      }
    ]
  }
];

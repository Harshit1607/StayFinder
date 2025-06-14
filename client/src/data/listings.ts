
export interface Listing {
  id: number;
  title: string;
  description: string;
  location: string;
  price_per_night: number;
  image_url: string;
}

export const listings: Listing[] = [
  {
    id: 1,
    title: "Heritage Haveli in Old City",
    description: "Traditional Rajasthani haveli with intricate architecture and rooftop views.",
    location: "Jaipur, Rajasthan",
    price_per_night: 6800,
    image_url: "https://source.unsplash.com/featured/?house,india,1"
  },
  {
    id: 2,
    title: "Houseboat on Dal Lake",
    description: "Authentic Kashmiri houseboat experience with mountain views.",
    location: "Srinagar, Kashmir",
    price_per_night: 7500,
    image_url: "https://source.unsplash.com/featured/?house,india,2"
  },
  {
    id: 3,
    title: "Beach Shack in Palolem",
    description: "Rustic beach hut just steps away from pristine sands.",
    location: "Palolem, Goa",
    price_per_night: 3200,
    image_url: "https://source.unsplash.com/featured/?house,india,3"
  },
  {
    id: 4,
    title: "Modern Apartment in Bandra",
    description: "Stylish 2BHK with city views and premium amenities.",
    location: "Mumbai, Maharashtra",
    price_per_night: 8500,
    image_url: "https://source.unsplash.com/featured/?house,india,4"
  },
  {
    id: 5,
    title: "Colonial Bungalow in Shimla",
    description: "Historic British-era bungalow with fireplace and garden.",
    location: "Shimla, Himachal Pradesh",
    price_per_night: 5500,
    image_url: "https://source.unsplash.com/featured/?house,india,5"
  },
  {
    id: 6,
    title: "Backwater Villa in Alleppey",
    description: "Serene villa overlooking Kerala's famous backwaters.",
    location: "Alleppey, Kerala",
    price_per_night: 6200,
    image_url: "https://source.unsplash.com/featured/?house,india,6"
  },
  {
    id: 7,
    title: "Tea Estate Cottage in Munnar",
    description: "Cozy cottage surrounded by lush tea plantations.",
    location: "Munnar, Kerala",
    price_per_night: 4800,
    image_url: "https://source.unsplash.com/featured/?house,india,7"
  },
  {
    id: 8,
    title: "IT Hub Apartment in Whitefield",
    description: "Modern studio perfect for business travelers and techies.",
    location: "Bangalore, Karnataka",
    price_per_night: 4200,
    image_url: "https://source.unsplash.com/featured/?house,india,8"
  },
  {
    id: 9,
    title: "Temple Town Guesthouse",
    description: "Traditional guesthouse near ancient temples with spiritual ambiance.",
    location: "Madurai, Tamil Nadu",
    price_per_night: 3800,
    image_url: "https://source.unsplash.com/featured/?house,india,9"
  },
  {
    id: 10,
    title: "Lakeside Resort in Udaipur",
    description: "Luxury accommodation with stunning Lake Pichola views.",
    location: "Udaipur, Rajasthan",
    price_per_night: 9200,
    image_url: "https://source.unsplash.com/featured/?house,india,10"
  },
  {
    id: 11,
    title: "Himalayan Retreat in Rishikesh",
    description: "Peaceful ashram-style accommodation perfect for yoga enthusiasts.",
    location: "Rishikesh, Uttarakhand",
    price_per_night: 3500,
    image_url: "https://source.unsplash.com/featured/?house,india,11"
  },
  {
    id: 12,
    title: "Desert Camp in Jaisalmer",
    description: "Luxury tent accommodation with camel safari and cultural shows.",
    location: "Jaisalmer, Rajasthan",
    price_per_night: 7800,
    image_url: "https://source.unsplash.com/featured/?house,india,12"
  },
  {
    id: 13,
    title: "Hill Station Cottage in Ooty",
    description: "Charming cottage with eucalyptus groves and cool mountain air.",
    location: "Ooty, Tamil Nadu",
    price_per_night: 5200,
    image_url: "https://source.unsplash.com/featured/?house,india,13"
  },
  {
    id: 14,
    title: "City Center Penthouse",
    description: "Luxurious penthouse with panoramic city views and rooftop access.",
    location: "Hyderabad, Telangana",
    price_per_night: 7200,
    image_url: "https://source.unsplash.com/featured/?house,india,14"
  },
  {
    id: 15,
    title: "French Quarter Villa",
    description: "Colonial-style villa in the heart of French architectural heritage.",
    location: "Pondicherry, Tamil Nadu",
    price_per_night: 6500,
    image_url: "https://source.unsplash.com/featured/?house,india,15"
  },
  {
    id: 16,
    title: "Ganga View Hostel",
    description: "Budget-friendly accommodation with direct river views and spiritual atmosphere.",
    location: "Varanasi, Uttar Pradesh",
    price_per_night: 2800,
    image_url: "https://source.unsplash.com/featured/?house,india,16"
  },
  {
    id: 17,
    title: "Spice Plantation Stay",
    description: "Eco-friendly accommodation amidst aromatic spice gardens.",
    location: "Thekkady, Kerala",
    price_per_night: 4500,
    image_url: "https://source.unsplash.com/featured/?house,india,17"
  },
  {
    id: 18,
    title: "Tribal Village Homestay",
    description: "Authentic tribal culture experience with traditional meals and crafts.",
    location: "Bastar, Chhattisgarh",
    price_per_night: 3200,
    image_url: "https://source.unsplash.com/featured/?house,india,18"
  },
  {
    id: 19,
    title: "Buddhist Monastery Guesthouse",
    description: "Peaceful monastery accommodation with meditation halls and mountain views.",
    location: "Dharamshala, Himachal Pradesh",
    price_per_night: 3800,
    image_url: "https://source.unsplash.com/featured/?house,india,19"
  },
  {
    id: 20,
    title: "Sundarbans Eco Lodge",
    description: "Wildlife lodge experience in the mangrove forests with tiger spotting opportunities.",
    location: "Sundarbans, West Bengal",
    price_per_night: 6800,
    image_url: "https://source.unsplash.com/featured/?house,india,20"
  }
];

export default listings;
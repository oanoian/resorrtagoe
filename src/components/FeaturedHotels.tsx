import { Star, MapPin, Heart } from 'lucide-react';

const hotels = [
  {
    id: 1,
    name: 'Grand Hyatt Bangkok',
    location: 'Sukhumvit, Bangkok',
    rating: 4.8,
    reviews: 2341,
    stars: 5,
    price: 189,
    originalPrice: 245,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
    tag: 'Best Seller',
  },
  {
    id: 2,
    name: 'Park Hyatt Tokyo',
    location: 'Shinjuku, Tokyo',
    rating: 4.9,
    reviews: 1876,
    stars: 5,
    price: 320,
    originalPrice: 420,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80',
    tag: 'Top Rated',
  },
  {
    id: 3,
    name: 'The Mulia Bali',
    location: 'Nusa Dua, Bali',
    rating: 4.7,
    reviews: 1523,
    stars: 5,
    price: 156,
    originalPrice: 198,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80',
    tag: 'Great Deal',
  },
  {
    id: 4,
    name: 'Marina Bay Sands',
    location: 'Downtown, Singapore',
    rating: 4.8,
    reviews: 3421,
    stars: 5,
    price: 275,
    originalPrice: 350,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80',
    tag: 'Popular',
  },
];

export default function FeaturedHotels() {
  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#333]">Featured Properties</h2>
          <a href="#" className="text-[#5b913e] text-sm font-medium hover:underline">
            View all properties →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} {...hotel} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HotelCard({ name, location, rating, reviews, stars, price, originalPrice, image, tag }: {
  name: string;
  location: string;
  rating: number;
  reviews: number;
  stars: number;
  price: number;
  originalPrice: number;
  image: string;
  tag: string;
}) {
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group border border-gray-100">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 bg-[#5b913e] text-white px-2 py-1 rounded text-xs font-medium">
          {tag}
        </div>
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
          <Heart size={16} className="text-gray-600 hover:text-red-500" />
        </button>
        <div className="absolute bottom-3 left-3 bg-black/60 text-white px-2 py-0.5 rounded text-xs">
          -{discount}%
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-1">
          {[...Array(stars)].map((_, i) => (
            <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <h3 className="font-bold text-[#333] text-sm mb-1 truncate">{name}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
          <MapPin size={12} />
          <span>{location}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="bg-[#003580] text-white px-1.5 py-0.5 rounded text-xs font-bold">
              {rating}
            </div>
            <span className="text-xs text-gray-500">{reviews.toLocaleString()} reviews</span>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400 line-through">${originalPrice}</div>
            <div className="text-lg font-bold text-[#333]">${price}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

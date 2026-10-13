import { Star, MapPin } from 'lucide-react';

const destinations = [
  {
    name: 'Bangkok',
    country: 'Thailand',
    properties: 4523,
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=80',
    price: 28,
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    properties: 3891,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80',
    price: 65,
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    properties: 2847,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80',
    price: 42,
  },
  {
    name: 'Singapore',
    country: 'Singapore',
    properties: 1956,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=80',
    price: 78,
  },
  {
    name: 'Seoul',
    country: 'South Korea',
    properties: 2341,
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&q=80',
    price: 55,
  },
  {
    name: 'Kuala Lumpur',
    country: 'Malaysia',
    properties: 2105,
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&q=80',
    price: 32,
  },
];

export default function PopularDestinations() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#333]">Popular Destinations</h2>
        <a href="#" className="text-[#5b913e] text-sm font-medium hover:underline">
          View all destinations →
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {destinations.map((dest) => (
          <DestinationCard key={dest.name} {...dest} />
        ))}
      </div>
    </section>
  );
}

function DestinationCard({ name, country, properties, image, price }: {
  name: string;
  country: string;
  properties: number;
  image: string;
  price: number;
}) {
  return (
    <div className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer bg-white border border-gray-100">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md">
          <span className="text-xs font-medium text-[#333]">{properties.toLocaleString()} properties</span>
        </div>
        <div className="absolute bottom-3 right-3 bg-[#5b913e] text-white px-3 py-1 rounded-md">
          <span className="text-sm font-bold">From ${price}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-1">
          <MapPin size={14} className="text-[#5b913e]" />
          <h3 className="font-bold text-[#333]">{name}</h3>
        </div>
        <p className="text-sm text-gray-500">{country}</p>
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-xs text-gray-500 ml-1">4.5/5</span>
        </div>
      </div>
    </div>
  );
}

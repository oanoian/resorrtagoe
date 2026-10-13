import { Star, MapPin, Zap, Waves, Heart } from 'lucide-react';
import type { Property, Room } from '../types';

interface PropertyListProps {
  properties: Property[];
  rooms: Room[];
  onPropertySelect: (property: Property) => void;
}

export default function PropertyList({ properties, rooms, onPropertySelect }: PropertyListProps) {
  if (properties.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
        <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search all Bolinao.</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#333]">
          {properties.length} Properties in Bolinao
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => {
          const propertyRooms = rooms.filter(r => r.propertyId === property.id);
          const lowestPrice = propertyRooms.length > 0 
            ? Math.min(...propertyRooms.map(r => r.basePricePhp))
            : 0;

          return (
            <PropertyCard 
              key={property.id} 
              property={property} 
              lowestPrice={lowestPrice}
              onClick={() => onPropertySelect(property)}
            />
          );
        })}
      </div>
    </section>
  );
}

function PropertyCard({ property, lowestPrice, onClick }: { 
  property: Property; 
  lowestPrice: number;
  onClick: () => void;
}) {
  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group border border-gray-100"
      onClick={onClick}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {property.hasBackupGenerator && (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
              <Zap size={10} />
              Generator
            </span>
          )}
          {property.hasBeachAccess && (
            <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
              <Waves size={10} />
              Beach
            </span>
          )}
        </div>
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
          <Heart size={16} className="text-gray-600" />
        </button>
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md">
          <span className="text-xs font-medium text-[#333]">{property.barangay}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-1">
          <div className="bg-[#003580] text-white px-1.5 py-0.5 rounded text-xs font-bold">
            {property.rating}
          </div>
          <span className="text-xs text-gray-500">{property.reviewCount} reviews</span>
        </div>
        <h3 className="font-bold text-[#333] mb-1 truncate">{property.title}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
          <MapPin size={12} />
          <span>{property.address}</span>
        </div>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{property.vibe}</p>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {property.hasAirConditioning && (
              <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded">AC</span>
            )}
            {property.hasWifi && (
              <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded">WiFi</span>
            )}
            {property.hasPool && (
              <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded">Pool</span>
            )}
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">From</div>
            <div className="text-lg font-bold text-[#5b913e]">₱{lowestPrice.toLocaleString()}</div>
            <div className="text-[10px] text-gray-400">per night</div>
          </div>
        </div>
      </div>
    </div>
  );
}

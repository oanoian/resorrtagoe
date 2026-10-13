import { Home, Building2, TreePine, Waves, Castle, Warehouse } from 'lucide-react';

const propertyTypes = [
  {
    icon: Building2,
    name: 'Hotel',
    count: '1.2M+',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Home,
    name: 'Apartment',
    count: '850K+',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: TreePine,
    name: 'Resort',
    count: '320K+',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Waves,
    name: 'Villa',
    count: '210K+',
    color: 'bg-cyan-50 text-cyan-600',
  },
  {
    icon: Castle,
    name: 'Ryokan',
    count: '45K+',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Warehouse,
    name: 'Hostel',
    count: '180K+',
    color: 'bg-orange-50 text-orange-600',
  },
];

export default function PropertyTypes() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-[#333] mb-6">Browse by Property Type</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {propertyTypes.map((type) => (
          <div
            key={type.name}
            className="flex flex-col items-center p-5 rounded-xl border border-gray-100 hover:border-[#5b913e] hover:shadow-md transition-all cursor-pointer bg-white group"
          >
            <div className={`w-14 h-14 rounded-full ${type.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <type.icon size={24} />
            </div>
            <h3 className="font-semibold text-sm text-[#333]">{type.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{type.count} properties</p>
          </div>
        ))}
      </div>
    </section>
  );
}

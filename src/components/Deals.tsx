import { Clock, Percent, Tag, Gift } from 'lucide-react';

const deals = [
  {
    id: 1,
    title: 'Flash Sale',
    subtitle: 'Up to 50% off',
    description: 'Limited time deals on top destinations',
    icon: Clock,
    color: 'from-red-500 to-orange-500',
    bgColor: 'bg-red-50',
  },
  {
    id: 2,
    title: 'Member Deals',
    subtitle: 'Extra 15% off',
    description: 'Exclusive prices for VIP members',
    icon: Percent,
    color: 'from-purple-500 to-indigo-500',
    bgColor: 'bg-purple-50',
  },
  {
    id: 3,
    title: 'Early Bird',
    subtitle: 'Save 30%',
    description: 'Book 60 days ahead and save big',
    icon: Tag,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
  },
  {
    id: 4,
    title: 'VIP Rewards',
    subtitle: 'Earn points',
    description: 'Get rewarded for every booking',
    icon: Gift,
    color: 'from-[#5b913e] to-emerald-500',
    bgColor: 'bg-green-50',
  },
];

export default function Deals() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-[#333] mb-6">Today's Top Deals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className={`${deal.bgColor} rounded-xl p-5 cursor-pointer hover:shadow-lg transition-shadow border border-gray-100`}
          >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${deal.color} flex items-center justify-center mb-4`}>
              <deal.icon size={24} className="text-white" />
            </div>
            <h3 className="font-bold text-[#333] text-lg">{deal.title}</h3>
            <p className="font-semibold text-[#5b913e] text-xl mb-1">{deal.subtitle}</p>
            <p className="text-sm text-gray-600">{deal.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

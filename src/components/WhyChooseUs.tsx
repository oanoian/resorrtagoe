import { Shield, CreditCard, Headphones, Award } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Best Price Guarantee',
    description: 'Find a lower price? We\'ll match it and give you an extra 100% of the difference back.',
  },
  {
    icon: CreditCard,
    title: 'Secure Booking',
    description: 'Your payment information is safe with our secure SSL encryption technology.',
  },
  {
    icon: Headphones,
    title: '24/7 Customer Support',
    description: 'Our multilingual customer service team is available around the clock to help.',
  },
  {
    icon: Award,
    title: 'Trusted by Millions',
    description: 'Over 40 million travelers trust Agoda for their accommodation needs worldwide.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-[#333] mb-2 text-center">Why Book with Agoda?</h2>
      <p className="text-gray-500 text-center mb-8">Join millions of travelers who trust us for the best deals</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div key={feature.title} className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="w-14 h-14 bg-[#5b913e]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <feature.icon size={24} className="text-[#5b913e]" />
            </div>
            <h3 className="font-bold text-[#333] mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

import { useState } from 'react';
import { Search, MapPin, Calendar, Users, ArrowRightLeft } from 'lucide-react';

export default function HeroSearch() {
  const [activeTab, setActiveTab] = useState('hotels');

  const tabs = [
    { id: 'hotels', label: 'Hotels & Homes' },
    { id: 'flights', label: 'Flights' },
    { id: 'activities', label: 'Activities' },
    { id: 'transfers', label: 'Airport Transfers' },
  ];

  return (
    <section className="relative">
      {/* Background */}
      <div className="absolute inset-0 h-[500px]">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
          alt="Beach resort"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 pt-12 pb-20">
        <div className="text-center mb-8">
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-3">
            Deals for the Weekend
          </h1>
          <p className="text-white/90 text-lg">
            Save on your next trip with Agoda
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-5xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-1 mb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-[#333]'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-b-lg rounded-tr-lg shadow-xl p-4 md:p-6">
            {activeTab === 'hotels' && <HotelSearchForm />}
            {activeTab === 'flights' && <FlightSearchForm />}
            {activeTab === 'activities' && <ActivitySearchForm />}
            {activeTab === 'transfers' && <TransferSearchForm />}
          </div>
        </div>
      </div>
    </section>
  );
}

function HotelSearchForm() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Destination */}
        <div className="md:col-span-5 relative">
          <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-[#5b913e] transition-colors focus-within:border-[#5b913e]">
            <MapPin size={20} className="text-gray-400 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <label className="text-[10px] text-gray-500 uppercase tracking-wide">Destination</label>
              <input
                type="text"
                placeholder="Where are you going?"
                className="w-full text-sm text-[#333] outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Check-in */}
        <div className="md:col-span-3">
          <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-[#5b913e] transition-colors focus-within:border-[#5b913e]">
            <Calendar size={20} className="text-gray-400 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <label className="text-[10px] text-gray-500 uppercase tracking-wide">Check in</label>
              <input
                type="text"
                placeholder="Sat, Jul 5"
                className="w-full text-sm text-[#333] outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Check-out */}
        <div className="md:col-span-2">
          <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-[#5b913e] transition-colors focus-within:border-[#5b913e]">
            <Calendar size={20} className="text-gray-400 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <label className="text-[10px] text-gray-500 uppercase tracking-wide">Check out</label>
              <input
                type="text"
                placeholder="Sun, Jul 6"
                className="w-full text-sm text-[#333] outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Guests */}
        <div className="md:col-span-2">
          <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-[#5b913e] transition-colors focus-within:border-[#5b913e]">
            <Users size={20} className="text-gray-400 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <label className="text-[10px] text-gray-500 uppercase tracking-wide">Guests</label>
              <input
                type="text"
                placeholder="2 Adults"
                className="w-full text-sm text-[#333] outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="flex justify-center mt-4">
        <button className="bg-[#5b913e] hover:bg-[#4a7a32] text-white font-semibold px-12 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-md">
          <Search size={18} />
          Search
        </button>
      </div>
    </div>
  );
}

function FlightSearchForm() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <label className="flex items-center gap-2 text-sm">
          <input type="radio" name="trip" defaultChecked className="accent-[#5b913e]" />
          Round trip
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="radio" name="trip" className="accent-[#5b913e]" />
          One way
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-4">
          <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-[#5b913e] transition-colors">
            <MapPin size={20} className="text-gray-400 mr-3" />
            <div className="flex-1">
              <label className="text-[10px] text-gray-500 uppercase tracking-wide">From</label>
              <input type="text" placeholder="City or airport" className="w-full text-sm outline-none" />
            </div>
          </div>
        </div>
        <div className="md:col-span-1 flex items-center justify-center">
          <button className="p-2 rounded-full border border-gray-300 hover:border-[#5b913e]">
            <ArrowRightLeft size={16} className="text-gray-500" />
          </button>
        </div>
        <div className="md:col-span-4">
          <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-[#5b913e] transition-colors">
            <MapPin size={20} className="text-gray-400 mr-3" />
            <div className="flex-1">
              <label className="text-[10px] text-gray-500 uppercase tracking-wide">To</label>
              <input type="text" placeholder="City or airport" className="w-full text-sm outline-none" />
            </div>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-[#5b913e] transition-colors">
            <Calendar size={20} className="text-gray-400 mr-3" />
            <div className="flex-1">
              <label className="text-[10px] text-gray-500 uppercase tracking-wide">Date</label>
              <input type="text" placeholder="Select date" className="w-full text-sm outline-none" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button className="bg-[#5b913e] hover:bg-[#4a7a32] text-white font-semibold px-12 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-md">
          <Search size={18} />
          Search Flights
        </button>
      </div>
    </div>
  );
}

function ActivitySearchForm() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-9">
          <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-[#5b913e] transition-colors">
            <MapPin size={20} className="text-gray-400 mr-3" />
            <div className="flex-1">
              <label className="text-[10px] text-gray-500 uppercase tracking-wide">Activity or destination</label>
              <input type="text" placeholder="Search things to do" className="w-full text-sm outline-none" />
            </div>
          </div>
        </div>
        <div className="md:col-span-3">
          <button className="w-full bg-[#5b913e] hover:bg-[#4a7a32] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md">
            <Search size={18} />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

function TransferSearchForm() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-4">
          <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-[#5b913e] transition-colors">
            <MapPin size={20} className="text-gray-400 mr-3" />
            <div className="flex-1">
              <label className="text-[10px] text-gray-500 uppercase tracking-wide">Pickup</label>
              <input type="text" placeholder="Airport name" className="w-full text-sm outline-none" />
            </div>
          </div>
        </div>
        <div className="md:col-span-4">
          <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-[#5b913e] transition-colors">
            <MapPin size={20} className="text-gray-400 mr-3" />
            <div className="flex-1">
              <label className="text-[10px] text-gray-500 uppercase tracking-wide">Drop-off</label>
              <input type="text" placeholder="Hotel or address" className="w-full text-sm outline-none" />
            </div>
          </div>
        </div>
        <div className="md:col-span-4">
          <button className="w-full bg-[#5b913e] hover:bg-[#4a7a32] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md">
            <Search size={18} />
            Search Transfers
          </button>
        </div>
      </div>
    </div>
  );
}

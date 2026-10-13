import { useState } from 'react';
import { Search, MapPin, Calendar, Users, Zap, Waves } from 'lucide-react';
import type { Barangay } from '../types';

interface HeroSearchProps {
  onSearch: (filters: { barangay: string; checkIn: string; checkOut: string; guests: number }) => void;
}

const barangays: { value: Barangay | ''; label: string }[] = [
  { value: '', label: 'All Bolinao' },
  { value: 'Patar', label: 'Patar (Beachfront)' },
  { value: 'Balingasay', label: 'Balingasay (River)' },
  { value: 'Poblacion', label: 'Poblacion (Town Center)' },
  { value: 'Luciente 1st', label: 'Luciente 1st (Coastal)' },
  { value: 'Luciente 2nd', label: 'Luciente 2nd (Coastal)' },
];

export default function HeroSearch({ onSearch }: HeroSearchProps) {
  const [barangay, setBarangay] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [needGenerator, setNeedGenerator] = useState(false);
  const [needBeachAccess, setNeedBeachAccess] = useState(false);

  const handleSearch = () => {
    onSearch({ barangay, checkIn, checkOut, guests });
  };

  return (
    <section className="relative">
      {/* Background */}
      <div className="absolute inset-0 h-[420px]">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
          alt="Bolinao Beach"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 pt-10 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">
            Discover Bolinao, Pangasinan
          </h1>
          <p className="text-white/90 text-lg">
            Beachfront resorts, river eco-camps, and authentic Filipino stays
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl p-5 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-4">
              {/* Destination */}
              <div className="md:col-span-4">
                <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-[#5b913e] transition-colors focus-within:border-[#5b913e]">
                  <MapPin size={20} className="text-gray-400 mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <label className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">Barangay / Area</label>
                    <select
                      value={barangay}
                      onChange={(e) => setBarangay(e.target.value)}
                      className="w-full text-sm text-[#333] outline-none bg-transparent"
                    >
                      {barangays.map(b => (
                        <option key={b.value} value={b.value}>{b.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Check-in */}
              <div className="md:col-span-3">
                <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-[#5b913e] transition-colors focus-within:border-[#5b913e]">
                  <Calendar size={20} className="text-gray-400 mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <label className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">Check in</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full text-sm text-[#333] outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Check-out */}
              <div className="md:col-span-3">
                <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-[#5b913e] transition-colors focus-within:border-[#5b913e]">
                  <Calendar size={20} className="text-gray-400 mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <label className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">Check out</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full text-sm text-[#333] outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Guests */}
              <div className="md:col-span-2">
                <div className="flex items-center border border-gray-300 rounded-lg p-3 hover:border-[#5b913e] transition-colors focus-within:border-[#5b913e]">
                  <Users size={20} className="text-gray-400 mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <label className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">Guests</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full text-sm text-[#333] outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Amenity Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-4 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500 font-medium">Priority Amenities:</span>
              <button
                onClick={() => setNeedGenerator(!needGenerator)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  needGenerator 
                    ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' 
                    : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                <Zap size={12} />
                Backup Generator
              </button>
              <button
                onClick={() => setNeedBeachAccess(!needBeachAccess)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  needBeachAccess 
                    ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                    : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                <Waves size={12} />
                Beach Access
              </button>
            </div>

            {/* Search Button */}
            <div className="flex justify-center">
              <button 
                onClick={handleSearch}
                className="bg-[#5b913e] hover:bg-[#4a7a32] text-white font-semibold px-12 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-md"
              >
                <Search size={18} />
                Search Properties
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

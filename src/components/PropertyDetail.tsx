import { useState } from 'react';
import { ArrowLeft, Star, MapPin, Zap, Waves, Check, Clock, Users, Calendar } from 'lucide-react';
import type { Property, Room } from '../types';
import { barangayInfo } from '../data';

interface PropertyDetailProps {
  property: Property;
  rooms: Room[];
  onBack: () => void;
}

export default function PropertyDetail({ property, rooms, onBack }: PropertyDetailProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const nights = calculateNights();
  const totalAmount = selectedRoom ? selectedRoom.basePricePhp * nights : 0;
  const taxAmount = Math.round(totalAmount * 0.12);
  const grandTotal = totalAmount + taxAmount;

  const handleBooking = () => {
    if (selectedRoom && checkIn && checkOut && nights > 0) {
      setBookingConfirmed(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#5b913e] hover:text-[#4a7a32] mb-4 font-medium"
      >
        <ArrowLeft size={18} />
        Back to search results
      </button>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 rounded-xl overflow-hidden mb-6">
        <div className="h-64 md:h-80">
          <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
        </div>
        <div className="h-64 md:h-80">
          <img src={property.images[1] || property.images[0]} alt={property.title} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Property Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Rating */}
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#333] mb-2">{property.title}</h1>
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin size={16} className="text-[#5b913e]" />
                  <span>{property.address}, {property.barangay}, Bolinao, Pangasinan</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <div className="bg-[#003580] text-white px-2 py-1 rounded font-bold">
                    {property.rating}
                  </div>
                  <span className="text-sm font-medium">Excellent</span>
                </div>
                <span className="text-xs text-gray-500">{property.reviewCount} reviews</span>
              </div>
            </div>
          </div>

          {/* Key Amenities */}
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <h3 className="font-bold text-[#333] mb-3">Key Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {property.hasBackupGenerator && (
                <div className="flex items-center gap-2 text-sm">
                  <Zap size={16} className="text-yellow-500" />
                  <span>Backup Generator</span>
                </div>
              )}
              {property.hasBeachAccess && (
                <div className="flex items-center gap-2 text-sm">
                  <Waves size={16} className="text-blue-500" />
                  <span>Beach Access</span>
                </div>
              )}
              {property.hasRiverAccess && (
                <div className="flex items-center gap-2 text-sm">
                  <Waves size={16} className="text-green-500" />
                  <span>River Access</span>
                </div>
              )}
              {property.hasAirConditioning && (
                <div className="flex items-center gap-2 text-sm">
                  <Check size={16} className="text-[#5b913e]" />
                  <span>Air Conditioning</span>
                </div>
              )}
              {property.hasWifi && (
                <div className="flex items-center gap-2 text-sm">
                  <Check size={16} className="text-[#5b913e]" />
                  <span>Free WiFi</span>
                </div>
              )}
              {property.hasPool && (
                <div className="flex items-center gap-2 text-sm">
                  <Check size={16} className="text-[#5b913e]" />
                  <span>Swimming Pool</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <h3 className="font-bold text-[#333] mb-3">About This Property</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{property.description}</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="font-medium text-sm text-[#333] mb-2">Location Vibe</h4>
              <p className="text-sm text-gray-500">{property.vibe}</p>
              <p className="text-xs text-gray-400 mt-2">{barangayInfo[property.barangay as keyof typeof barangayInfo]?.characteristics}</p>
            </div>
          </div>

          {/* House Rules */}
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <h3 className="font-bold text-[#333] mb-3">House Rules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-gray-400" />
                <div>
                  <div className="text-sm font-medium">Check-in</div>
                  <div className="text-xs text-gray-500">{property.checkInTime}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-gray-400" />
                <div>
                  <div className="text-sm font-medium">Check-out</div>
                  <div className="text-xs text-gray-500">{property.checkOutTime}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Available Rooms */}
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <h3 className="font-bold text-[#333] mb-4">Available Rooms</h3>
            <div className="space-y-3">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedRoom?.id === room.id
                      ? 'border-[#5b913e] bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-sm">{room.name}</h4>
                        <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded uppercase">{room.tier}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <Users size={12} />
                        <span>Max {room.maxGuests} guests</span>
                        <span className="text-gray-300">•</span>
                        <span>{room.availableInventory} available</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {room.amenities.slice(0, 4).map((amenity) => (
                          <span key={amenity} className="text-[10px] bg-gray-100 px-2 py-0.5 rounded">
                            {amenity}
                          </span>
                        ))}
                        {room.amenities.length > 4 && (
                          <span className="text-[10px] text-gray-400">+{room.amenities.length - 4} more</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-lg font-bold text-[#5b913e]">₱{room.basePricePhp.toLocaleString()}</div>
                      <div className="text-[10px] text-gray-400">per night</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Booking */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-5 border border-gray-100 sticky top-24 shadow-lg">
            {!bookingConfirmed ? (
              <>
                <h3 className="font-bold text-[#333] mb-4">Book Your Stay</h3>
                
                {/* Dates */}
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="text-xs text-gray-500 font-medium mb-1 block">Check-in</label>
                    <div className="flex items-center border border-gray-300 rounded-lg p-2.5">
                      <Calendar size={16} className="text-gray-400 mr-2" />
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full text-sm outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium mb-1 block">Check-out</label>
                    <div className="flex items-center border border-gray-300 rounded-lg p-2.5">
                      <Calendar size={16} className="text-gray-400 mr-2" />
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full text-sm outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500 font-medium mb-1 block">Adults</label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={adults}
                        onChange={(e) => setAdults(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium mb-1 block">Children</label>
                      <input
                        type="number"
                        min={0}
                        max={10}
                        value={children}
                        onChange={(e) => setChildren(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Price Summary */}
                {selectedRoom && nights > 0 && (
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <div className="text-sm font-medium mb-2">Price Summary</div>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">₱{selectedRoom.basePricePhp.toLocaleString()} × {nights} night{nights > 1 ? 's' : ''}</span>
                        <span>₱{totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Taxes & fees (12%)</span>
                        <span>₱{taxAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-100">
                        <span>Total</span>
                        <span className="text-[#5b913e]">₱{grandTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleBooking}
                  disabled={!selectedRoom || !checkIn || !checkOut || nights <= 0}
                  className="w-full bg-[#5b913e] hover:bg-[#4a7a32] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  {selectedRoom ? 'Confirm Booking' : 'Select a room to book'}
                </button>

                <p className="text-[10px] text-gray-400 text-center mt-2">
                  Free cancellation up to 48 hours before check-in
                </p>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-[#5b913e]" />
                </div>
                <h3 className="font-bold text-[#333] text-lg mb-2">Booking Confirmed!</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Your reservation at {property.title} has been confirmed.
                </p>
                <div className="bg-gray-50 rounded-lg p-3 text-left text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Room:</span>
                    <span className="font-medium">{selectedRoom?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Dates:</span>
                    <span className="font-medium">{checkIn} to {checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Guests:</span>
                    <span className="font-medium">{adults} adults{children > 0 ? `, ${children} children` : ''}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
                    <span>Total:</span>
                    <span className="text-[#5b913e]">₱{grandTotal.toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => setBookingConfirmed(false)}
                  className="mt-4 text-sm text-[#5b913e] hover:underline"
                >
                  Book another room
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { Calendar, MapPin, CreditCard } from 'lucide-react';
import { bookings, properties, rooms } from '../data';

export default function CustomerDashboard() {
  const myBookings = bookings.filter(b => b.customerId === 'cust-001');

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#333] mb-2">My Bookings</h1>
        <p className="text-gray-500">Manage your reservations and view booking history</p>
      </div>

      {myBookings.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
          <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="font-bold text-[#333] text-lg mb-2">No bookings yet</h3>
          <p className="text-gray-500">Start exploring Bolinao properties and book your next stay!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myBookings.map((booking) => {
            const property = properties.find(p => p.id === booking.propertyId);
            const room = rooms.find(r => r.id === booking.roomId);

            return (
              <div key={booking.id} className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row gap-4">
                  {property && (
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full md:w-40 h-32 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-[#333]">{property?.title}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin size={12} />
                          <span>{property?.address}, {property?.barangay}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        booking.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-sm">
                      <div>
                        <div className="text-gray-500 text-xs">Room</div>
                        <div className="font-medium">{room?.name}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs">Check-in</div>
                        <div className="font-medium">{booking.checkIn}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs">Check-out</div>
                        <div className="font-medium">{booking.checkOut}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs">Guests</div>
                        <div className="font-medium">{booking.adults} adults{booking.children > 0 ? `, ${booking.children} children` : ''}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <CreditCard size={14} />
                        <span>Booking #{booking.id}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-[#5b913e]">₱{booking.totalAmountPhp.toLocaleString()}</div>
                        <div className="text-[10px] text-gray-400">Total amount</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

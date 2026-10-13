import { TrendingUp, Users, Calendar, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import type { Property, Room, Booking } from '../types';

interface OwnerDashboardProps {
  properties: Property[];
  rooms: Room[];
  bookings: Booking[];
}

export default function OwnerDashboard({ properties, rooms, bookings }: OwnerDashboardProps) {
  const ownerPropertyIds = properties.map(p => p.id);
  const ownerRooms = rooms.filter(r => ownerPropertyIds.includes(r.propertyId));
  const ownerBookings = bookings.filter(b => ownerPropertyIds.includes(b.propertyId));

  // Calculate stats
  const totalRevenue = ownerBookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + b.totalAmountPhp, 0);
  
  const totalInventory = ownerRooms.reduce((sum, r) => sum + r.totalInventory, 0);
  const availableInventory = ownerRooms.reduce((sum, r) => sum + r.availableInventory, 0);
  const occupancyRate = totalInventory > 0 ? Math.round(((totalInventory - availableInventory) / totalInventory) * 100) : 0;
  
  const activeBookings = ownerBookings.filter(b => b.status === 'confirmed').length;
  const lowInventoryRooms = ownerRooms.filter(r => r.availableInventory <= 2);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#333] mb-2">Owner Dashboard</h1>
        <p className="text-gray-500">Manage your properties, inventory, and bookings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign size={20} className="text-[#5b913e]" />
            </div>
            <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded">+12%</span>
          </div>
          <div className="text-2xl font-bold text-[#333]">₱{totalRevenue.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Total Revenue</div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-blue-600" />
            </div>
            <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded">{occupancyRate}%</span>
          </div>
          <div className="text-2xl font-bold text-[#333]">{occupancyRate}%</div>
          <div className="text-xs text-gray-500">Occupancy Rate</div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar size={20} className="text-purple-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#333]">{activeBookings}</div>
          <div className="text-xs text-gray-500">Active Bookings</div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-orange-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#333]">{availableInventory}/{totalInventory}</div>
          <div className="text-xs text-gray-500">Available/Total Rooms</div>
        </div>
      </div>

      {/* Alerts */}
      {lowInventoryRooms.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={18} className="text-yellow-600" />
            <h3 className="font-bold text-yellow-800">Low Inventory Alert</h3>
          </div>
          <p className="text-sm text-yellow-700">
            {lowInventoryRooms.length} room(s) have 2 or fewer units available. Consider updating inventory.
          </p>
        </div>
      )}

      {/* Properties & Rooms Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-8">
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-bold text-[#333] text-lg">Property Inventory</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Room</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Property</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Tier</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Rate (PHP)</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Inventory</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ownerRooms.map((room) => {
                const property = properties.find(p => p.id === room.propertyId);
                const isLow = room.availableInventory <= 2;
                const isFull = room.availableInventory === 0;

                return (
                  <tr key={room.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <div className="font-medium text-sm text-[#333]">{room.name}</div>
                      <div className="text-xs text-gray-500">Max {room.maxGuests} guests</div>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">{property?.title}</td>
                    <td className="px-5 py-4">
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded uppercase">{room.tier}</span>
                    </td>
                    <td className="px-5 py-4 text-sm font-medium">₱{room.basePricePhp.toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{room.availableInventory}/{room.totalInventory}</span>
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${isFull ? 'bg-red-500' : isLow ? 'bg-yellow-500' : 'bg-[#5b913e]'}`}
                            style={{ width: `${(room.availableInventory / room.totalInventory) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      {isFull ? (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">Sold Out</span>
                      ) : isLow ? (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Low Stock</span>
                      ) : (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded flex items-center gap-1 w-fit">
                          <CheckCircle size={10} />
                          Available
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-bold text-[#333] text-lg">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Guest</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Room</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Dates</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Amount</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ownerBookings.map((booking) => {
                const room = rooms.find(r => r.id === booking.roomId);
                return (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <div className="font-medium text-sm text-[#333]">{booking.customerName}</div>
                      <div className="text-xs text-gray-500">{booking.customerEmail}</div>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">{room?.name}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">
                      {booking.checkIn} → {booking.checkOut}
                    </td>
                    <td className="px-5 py-4 text-sm font-medium">₱{booking.totalAmountPhp.toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        booking.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

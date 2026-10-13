import { useState } from 'react';
import { Shield, Building2, Users, AlertCircle, CheckCircle, Clock, XCircle, Eye } from 'lucide-react';
import type { Property, Booking, AuditLog, PropertyStatus } from '../types';

interface SuperadminDashboardProps {
  properties: Property[];
  bookings: Booking[];
  auditLogs: AuditLog[];
}

export default function SuperadminDashboard({ properties, bookings, auditLogs }: SuperadminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'pending' | 'audit'>('overview');

  // Platform-wide stats
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + b.totalAmountPhp, 0);

  const activeProperties = properties.filter(p => p.status === 'active').length;
  const pendingProperties = properties.filter(p => p.status === 'pending_approval');
  const suspendedProperties = properties.filter(p => p.status === 'suspended');
  const totalBookings = bookings.length;

  const uniqueOwners = new Set(properties.map(p => p.ownerId)).size;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Shield size={24} className="text-[#5b913e]" />
          <h1 className="text-2xl font-bold text-[#333]">Admin Control Panel</h1>
        </div>
        <p className="text-gray-500">Platform oversight, compliance monitoring, and property approvals</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-2">
            <Building2 size={20} className="text-[#5b913e]" />
          </div>
          <div className="text-2xl font-bold text-[#333]">{activeProperties}</div>
          <div className="text-xs text-gray-500">Active Properties</div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-2">
            <Clock size={20} className="text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-[#333]">{pendingProperties.length}</div>
          <div className="text-xs text-gray-500">Pending Approval</div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-2">
            <XCircle size={20} className="text-red-600" />
          </div>
          <div className="text-2xl font-bold text-[#333]">{suspendedProperties.length}</div>
          <div className="text-xs text-gray-500">Suspended</div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
            <Users size={20} className="text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-[#333]">{uniqueOwners}</div>
          <div className="text-xs text-gray-500">Property Owners</div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
            <Eye size={20} className="text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-[#333]">₱{totalRevenue.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Platform Revenue</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'overview'
              ? 'border-[#5b913e] text-[#5b913e]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          All Properties
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors flex items-center gap-1 ${
            activeTab === 'pending'
              ? 'border-[#5b913e] text-[#5b913e]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Pending Approvals
          {pendingProperties.length > 0 && (
            <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{pendingProperties.length}</span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'audit'
              ? 'border-[#5b913e] text-[#5b913e]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Audit Logs
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && <PropertiesOverview properties={properties} />}
      {activeTab === 'pending' && <PendingApprovals properties={pendingProperties} />}
      {activeTab === 'audit' && <AuditLogsTable logs={auditLogs} />}
    </section>
  );
}

function PropertiesOverview({ properties }: { properties: Property[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Property</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Owner</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Barangay</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Rating</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Amenities</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {properties.map((property) => (
              <tr key={property.id} className="hover:bg-gray-50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-medium text-sm text-[#333]">{property.title}</div>
                      <div className="text-xs text-gray-500">{property.address}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-gray-600">{property.ownerName}</td>
                <td className="px-5 py-4 text-sm text-gray-600">{property.barangay}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">{property.rating}</span>
                    <span className="text-xs text-gray-500">({property.reviewCount})</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1">
                    {property.hasBackupGenerator && <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded">Generator</span>}
                    {property.hasBeachAccess && <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">Beach</span>}
                    {property.hasRiverAccess && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded">River</span>}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    property.status === 'active' ? 'bg-green-100 text-green-700' :
                    property.status === 'pending_approval' ? 'bg-yellow-100 text-yellow-700' :
                    property.status === 'suspended' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {property.status === 'pending_approval' ? 'Pending' : property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PendingApprovals({ properties }: { properties: Property[] }) {
  const [localProperties, setLocalProperties] = useState(properties);

  const handleApprove = (id: string) => {
    setLocalProperties(prev => prev.filter(p => p.id !== id));
  };

  const handleReject = (id: string) => {
    setLocalProperties(prev => prev.filter(p => p.id !== id));
  };

  if (localProperties.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
        <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
        <h3 className="font-bold text-[#333] text-lg mb-2">All caught up!</h3>
        <p className="text-gray-500">No pending property approvals at this time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {localProperties.map((property) => (
        <div key={property.id} className="bg-white rounded-xl p-5 border border-yellow-200 hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row gap-4">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full md:w-48 h-36 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-[#333] text-lg">{property.title}</h3>
                  <div className="text-sm text-gray-500">{property.address}, {property.barangay}</div>
                </div>
                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                  <AlertCircle size={12} />
                  Pending Approval
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
                <div>
                  <span className="text-gray-500">Owner:</span>
                  <span className="ml-2 font-medium">{property.ownerName}</span>
                </div>
                <div>
                  <span className="text-gray-500">Submitted:</span>
                  <span className="ml-2 font-medium">{property.createdAt}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500">Vibe:</span>
                  <span className="ml-2 font-medium">{property.vibe}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {property.hasBackupGenerator && <span className="text-xs bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-0.5 rounded">⚡ Generator</span>}
                {property.hasBeachAccess && <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded">🌊 Beach Access</span>}
                {property.hasRiverAccess && <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded">🏞️ River Access</span>}
                {property.hasAirConditioning && <span className="text-xs bg-gray-50 text-gray-700 border border-gray-200 px-2 py-0.5 rounded">❄️ AC</span>}
                {property.hasWifi && <span className="text-xs bg-gray-50 text-gray-700 border border-gray-200 px-2 py-0.5 rounded">📶 WiFi</span>}
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleApprove(property.id)}
                  className="bg-[#5b913e] hover:bg-[#4a7a32] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                >
                  <CheckCircle size={14} />
                  Approve Property
                </button>
                <button
                  onClick={() => handleReject(property.id)}
                  className="bg-white border border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                >
                  <XCircle size={14} />
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AuditLogsTable({ logs }: { logs: AuditLog[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Timestamp</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Action</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">User</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Role</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-5 py-4 text-sm text-gray-500">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                    log.action.includes('APPROVED') ? 'bg-green-100 text-green-700' :
                    log.action.includes('REGISTERED') ? 'bg-blue-100 text-blue-700' :
                    log.action.includes('BOOKING') ? 'bg-purple-100 text-purple-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-gray-600 font-mono">{log.userId}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    log.role === 'superadmin' ? 'bg-red-100 text-red-700' :
                    log.role === 'hotel_owner' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {log.role}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-gray-600 max-w-md truncate">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

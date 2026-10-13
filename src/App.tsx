import { useState } from 'react';
import type { Role, Property, Room, Booking } from './types';
import { properties, rooms, bookings, auditLogs, barangayInfo } from './data';
import Header from './components/Header';
import HeroSearch from './components/HeroSearch';
import PropertyList from './components/PropertyList';
import PropertyDetail from './components/PropertyDetail';
import CustomerDashboard from './components/CustomerDashboard';
import OwnerDashboard from './components/OwnerDashboard';
import SuperadminDashboard from './components/SuperadminDashboard';
import Footer from './components/Footer';

function App() {
  const [currentRole, setCurrentRole] = useState<Role>('customer');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchFilters, setSearchFilters] = useState({
    barangay: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
  });

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleBackToList = () => {
    setSelectedProperty(null);
  };

  const filteredProperties = searchFilters.barangay
    ? properties.filter(p => p.barangay === searchFilters.barangay && p.status === 'active')
    : properties.filter(p => p.status === 'active');

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header currentRole={currentRole} onRoleChange={setCurrentRole} />
      
      {currentRole === 'customer' && (
        <>
          {!selectedProperty ? (
            <>
              <HeroSearch onSearch={setSearchFilters} />
              <PropertyList 
                properties={filteredProperties}
                rooms={rooms}
                onPropertySelect={handlePropertySelect}
              />
            </>
          ) : (
            <PropertyDetail 
              property={selectedProperty}
              rooms={rooms.filter(r => r.propertyId === selectedProperty.id)}
              onBack={handleBackToList}
            />
          )}
        </>
      )}

      {currentRole === 'hotel_owner' && (
        <OwnerDashboard 
          properties={properties.filter(p => p.ownerId === 'owner-001')}
          rooms={rooms}
          bookings={bookings}
        />
      )}

      {currentRole === 'superadmin' && (
        <SuperadminDashboard 
          properties={properties}
          bookings={bookings}
          auditLogs={auditLogs}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;

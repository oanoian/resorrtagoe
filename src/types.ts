export type Role = 'customer' | 'hotel_owner' | 'superadmin';

export type PropertyStatus = 'active' | 'pending_approval' | 'suspended' | 'archived';

export type Barangay = 'Patar' | 'Balingasay' | 'Poblacion' | 'Luciente 1st' | 'Luciente 2nd';

export interface Property {
  id: string;
  title: string;
  description: string;
  address: string;
  barangay: Barangay;
  ownerId: string;
  ownerName: string;
  status: PropertyStatus;
  hasBackupGenerator: boolean;
  hasBeachAccess: boolean;
  hasRiverAccess: boolean;
  hasAirConditioning: boolean;
  hasWifi: boolean;
  hasPool: boolean;
  rating: number;
  reviewCount: number;
  images: string[];
  vibe: string;
  checkInTime: string;
  checkOutTime: string;
  createdAt: string;
}

export interface Room {
  id: string;
  propertyId: string;
  name: string;
  tier: 'standard' | 'deluxe' | 'suite' | 'villa';
  basePricePhp: number;
  totalInventory: number;
  availableInventory: number;
  maxGuests: number;
  hasBeachView: boolean;
  hasRiverView: boolean;
  amenities: string[];
}

export interface Booking {
  id: string;
  propertyId: string;
  roomId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  checkIn: string;
  checkOut: string;
  unitsReserved: number;
  adults: number;
  children: number;
  totalAmountPhp: number;
  status: 'confirmed' | 'cancelled' | 'completed' | 'pending';
  createdAt: string;
}

export interface AuditLog {
  id: string;
  action: string;
  userId: string;
  role: Role;
  details: string;
  timestamp: string;
}

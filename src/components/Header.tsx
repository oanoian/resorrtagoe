import { useState } from 'react';
import { Globe, User, Menu, X, ChevronDown, Shield, Building2, UserCheck } from 'lucide-react';
import type { Role } from '../types';

interface HeaderProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
}

export default function Header({ currentRole, onRoleChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roleLabels: Record<Role, string> = {
    customer: 'Guest',
    hotel_owner: 'Property Owner',
    superadmin: 'Administrator',
  };

  const roleIcons: Record<Role, typeof User> = {
    customer: User,
    hotel_owner: Building2,
    superadmin: Shield,
  };

  const RoleIcon = roleIcons[currentRole];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#505050] text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Bolinao, Pangasinan • Region I, Philippines</span>
            <div className="relative">
              <button className="flex items-center gap-1 hover:text-gray-200">
                <Globe size={14} />
                <span>English</span>
                <ChevronDown size={12} />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-yellow-300 font-medium">₱ PHP</span>
            <a href="#" className="hover:text-gray-200">Support</a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <a href="#" className="flex items-center" onClick={() => onRoleChange('customer')}>
            <div className="text-2xl font-bold">
              <span className="text-[#5b913e]">Bolinao</span>
              <span className="text-[#333]">Stays</span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <button 
              onClick={() => onRoleChange('customer')}
              className={`text-sm font-medium transition-colors ${currentRole === 'customer' ? 'text-[#5b913e] border-b-2 border-[#5b913e]' : 'text-[#333] hover:text-[#5b913e]'}`}
            >
              Find Stays
            </button>
            <button 
              onClick={() => onRoleChange('hotel_owner')}
              className={`text-sm font-medium transition-colors ${currentRole === 'hotel_owner' ? 'text-[#5b913e] border-b-2 border-[#5b913e]' : 'text-[#333] hover:text-[#5b913e]'}`}
            >
              Owner Dashboard
            </button>
            <button 
              onClick={() => onRoleChange('superadmin')}
              className={`text-sm font-medium transition-colors ${currentRole === 'superadmin' ? 'text-[#5b913e] border-b-2 border-[#5b913e]' : 'text-[#333] hover:text-[#5b913e]'}`}
            >
              Admin Panel
            </button>
          </nav>
        </div>

        {/* Right side - Role Switcher */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-[#5b913e] transition-colors"
            >
              <RoleIcon size={16} className="text-[#5b913e]" />
              <span className="text-sm font-medium hidden sm:inline">{roleLabels[currentRole]}</span>
              <ChevronDown size={14} className="text-gray-400" />
            </button>
            
            {roleDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-xl border py-2 w-56 z-50">
                <div className="px-3 py-1 text-xs text-gray-500 uppercase tracking-wide">Switch Role</div>
                <button
                  onClick={() => { onRoleChange('customer'); setRoleDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-2.5 flex items-center gap-3 hover:bg-gray-50 ${currentRole === 'customer' ? 'bg-green-50' : ''}`}
                >
                  <User size={18} className="text-[#5b913e]" />
                  <div>
                    <div className="text-sm font-medium">Guest / Traveler</div>
                    <div className="text-xs text-gray-500">Search & book properties</div>
                  </div>
                </button>
                <button
                  onClick={() => { onRoleChange('hotel_owner'); setRoleDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-2.5 flex items-center gap-3 hover:bg-gray-50 ${currentRole === 'hotel_owner' ? 'bg-green-50' : ''}`}
                >
                  <Building2 size={18} className="text-[#5b913e]" />
                  <div>
                    <div className="text-sm font-medium">Property Owner</div>
                    <div className="text-xs text-gray-500">Manage inventory & bookings</div>
                  </div>
                </button>
                <button
                  onClick={() => { onRoleChange('superadmin'); setRoleDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-2.5 flex items-center gap-3 hover:bg-gray-50 ${currentRole === 'superadmin' ? 'bg-green-50' : ''}`}
                >
                  <Shield size={18} className="text-[#5b913e]" />
                  <div>
                    <div className="text-sm font-medium">Administrator</div>
                    <div className="text-xs text-gray-500">Platform oversight & compliance</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          <a href="#" className="hidden md:flex items-center gap-2 text-sm border border-[#5b913e] text-[#5b913e] px-4 py-2 rounded-lg hover:bg-[#5b913e] hover:text-white transition-colors">
            <UserCheck size={16} />
            Sign in
          </a>
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white">
          <nav className="px-4 py-4 flex flex-col gap-3">
            <button
              onClick={() => { onRoleChange('customer'); setMobileMenuOpen(false); }}
              className={`text-left text-sm font-medium py-2 border-b ${currentRole === 'customer' ? 'text-[#5b913e]' : 'text-[#333]'}`}
            >
              Find Stays
            </button>
            <button
              onClick={() => { onRoleChange('hotel_owner'); setMobileMenuOpen(false); }}
              className={`text-left text-sm font-medium py-2 border-b ${currentRole === 'hotel_owner' ? 'text-[#5b913e]' : 'text-[#333]'}`}
            >
              Owner Dashboard
            </button>
            <button
              onClick={() => { onRoleChange('superadmin'); setMobileMenuOpen(false); }}
              className={`text-left text-sm font-medium py-2 border-b ${currentRole === 'superadmin' ? 'text-[#5b913e]' : 'text-[#333]'}`}
            >
              Admin Panel
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

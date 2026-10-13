import { useState } from 'react';
import { Globe, User, Menu, X, ChevronDown, HelpCircle, Heart, ShoppingCart } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#505050] text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Agoda.com part of Booking Holdings</span>
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 hover:text-gray-200"
              >
                <Globe size={14} />
                <span>English</span>
                <ChevronDown size={12} />
              </button>
              {langMenuOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white text-gray-800 rounded shadow-lg py-2 w-48 z-50">
                  <div className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer">English</div>
                  <div className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer">中文</div>
                  <div className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer">日本語</div>
                  <div className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer">한국어</div>
                  <div className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer">Français</div>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-200 flex items-center gap-1">
              <HelpCircle size={14} />
              <span className="hidden sm:inline">Support</span>
            </a>
            <a href="#" className="hover:text-gray-200">List your property</a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <a href="#" className="flex items-center">
            <div className="text-3xl font-bold">
              <span className="text-[#5b913e]">agoda</span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-[#333] hover:text-[#5b913e] flex items-center gap-1">
              <span>Flights</span>
            </a>
            <a href="#" className="text-sm font-medium text-[#333] hover:text-[#5b913e] flex items-center gap-1">
              <span>Hotels & Homes</span>
            </a>
            <a href="#" className="text-sm font-medium text-[#333] hover:text-[#5b913e] flex items-center gap-1">
              <span>Activities</span>
            </a>
            <a href="#" className="text-sm font-medium text-[#333] hover:text-[#5b913e] flex items-center gap-1">
              <span>Homes & Apts</span>
            </a>
            <a href="#" className="text-sm font-medium text-[#333] hover:text-[#5b913e] flex items-center gap-1">
              <span>Deals</span>
              <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">New</span>
            </a>
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a href="#" className="hidden sm:flex items-center gap-1 text-sm text-[#333] hover:text-[#5b913e]">
            <Heart size={18} />
          </a>
          <a href="#" className="hidden sm:flex items-center gap-1 text-sm text-[#333] hover:text-[#5b913e]">
            <ShoppingCart size={18} />
          </a>
          <a href="#" className="hidden md:flex items-center gap-2 text-sm border border-[#5b913e] text-[#5b913e] px-4 py-2 rounded hover:bg-[#5b913e] hover:text-white transition-colors">
            <User size={16} />
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
            <a href="#" className="text-sm font-medium text-[#333] py-2 border-b">Flights</a>
            <a href="#" className="text-sm font-medium text-[#333] py-2 border-b">Hotels & Homes</a>
            <a href="#" className="text-sm font-medium text-[#333] py-2 border-b">Activities</a>
            <a href="#" className="text-sm font-medium text-[#333] py-2 border-b">Homes & Apts</a>
            <a href="#" className="text-sm font-medium text-[#333] py-2 border-b">Deals</a>
            <a href="#" className="text-sm font-medium text-[#5b913e] py-2 flex items-center gap-2">
              <User size={16} />
              Sign in
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

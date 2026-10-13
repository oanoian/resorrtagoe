import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#333] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-[#5b913e]">Bolinao</span>
              <span className="text-white">Stays</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Your trusted platform for discovering and booking accommodations in Bolinao, Pangasinan. From beachfront resorts to river eco-camps.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#5b913e] transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#5b913e] transition-colors">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Destinations</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Patar Beach</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Balingasay River</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Cape Bolinao</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Poblacion Town Center</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Luciente Coast</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Cancellation Policy</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Safety Guidelines</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">List Your Property</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Partner Hub</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin size={14} className="text-[#5b913e] flex-shrink-0" />
                <span>Bolinao, Pangasinan, Philippines</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone size={14} className="text-[#5b913e] flex-shrink-0" />
                <span>+63 (75) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail size={14} className="text-[#5b913e] flex-shrink-0" />
                <span>support@bolinaostays.ph</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <span>|</span>
              <a href="#" className="hover:text-white">RLS Compliance</a>
              <span>|</span>
              <a href="#" className="hover:text-white">Sitemap</a>
            </div>
            <p className="text-xs text-gray-500">
              © 2026 Bolinao Stays. Bolinao-Agoda Hospitality Core v2.4.0
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

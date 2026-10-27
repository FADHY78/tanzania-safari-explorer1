
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-[#C08240] to-[#A67134] text-white pt-10 pb-5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
              <Logo variant="light" size="sm" />
            </Link>
            <p className="text-white/70 leading-relaxed text-xs">
              Leading sustainable safari tourism in Tanzania since 2008.
            </p>
            <div className="flex gap-3">
              {['FB', 'IG', 'TW', 'LI'].map((n) => (
                <a key={n} href="#" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white hover:text-[#C08240] transition-all text-[10px] font-bold">{n}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/70 text-xs">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/destinations" className="hover:text-white transition-colors">Destinations</Link></li>
              <li><Link to="/tours" className="hover:text-white transition-colors">Safari Tours</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Regions</h4>
            <ul className="space-y-2 text-white/70 text-xs">
              <li><Link to="/destinations" className="hover:text-white transition-colors">Northern Circuit</Link></li>
              <li><Link to="/destinations" className="hover:text-white transition-colors">Southern Tanzania</Link></li>
              <li><Link to="/destinations" className="hover:text-white transition-colors">Zanzibar</Link></li>
              <li><Link to="/destinations" className="hover:text-white transition-colors">Kilimanjaro</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Newsletter</h4>
            <p className="text-white/70 mb-3 text-xs">Get safari tips & exclusive offers.</p>
            <form className="relative">
              <input type="email" className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 pl-3 pr-10 text-xs outline-none focus:border-white transition-all text-white placeholder:text-white/50" placeholder="Email Address" />
              <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-white text-[#C08240] px-3 rounded-md hover:bg-white/90 transition-colors font-bold">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </form>
          </div>
        </div>

        <div className="pt-5 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] uppercase tracking-wider text-white/50 font-semibold">
          <p>© 2024 Tanzania Safari Explorer. Proudly Tanzanian Owned.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

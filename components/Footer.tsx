import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Shield, Award, Heart } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://facebook.com',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'X (Twitter)',
      url: 'https://twitter.com',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/255754000000',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      )
    },
    {
      name: 'TripAdvisor',
      url: 'https://tripadvisor.com',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-5.5 13.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm5.5 2.5c-1.93 0-3.5-1.57-3.5-3.5h7c0 1.93-1.57 3.5-3.5 3.5zm5.5-2.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-[#1E1915] via-[#2A211B] to-[#1A1410] text-white pt-14 sm:pt-16 pb-8 border-t border-[#C08240]/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-12">
          
          {/* Company Brand Column */}
          <div className="space-y-4 lg:col-span-2">
            <Link to="/" className="inline-block hover:opacity-95 transition-opacity">
              <Logo variant="light" size="md" />
            </Link>
            <p className="text-white/70 leading-relaxed text-xs max-w-sm">
              Founded in 2025. Authentic East African wildlife safaris, Kilimanjaro mountain treks, and Zanzibar beach escapes. Licensed by the Tanzania Tourism Board.
            </p>

            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C08240] block mb-2.5">
                Connect With Us
              </span>
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={item.name}
                    aria-label={item.name}
                    className="w-9 h-9 bg-white/10 hover:bg-[#C08240] text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm border border-white/10 hover:border-[#C08240]"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2 text-[11px] text-white/60">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#C08240]" />
                <span>TTB Licensed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#C08240]" />
                <span>ATOI Member</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F3C082] mb-4">
              Explore Tours
            </h4>
            <ul className="space-y-2.5 text-white/70 text-xs">
              <li><Link to="/tours?category=Safari" className="hover:text-white hover:translate-x-1 inline-block transition-all">Wildlife Safaris</Link></li>
              <li><Link to="/tours?category=Trekking" className="hover:text-white hover:translate-x-1 inline-block transition-all">Kilimanjaro Treks</Link></li>
              <li><Link to="/tours?category=Zanzibar" className="hover:text-white hover:translate-x-1 inline-block transition-all">Zanzibar Holidays</Link></li>
              <li><Link to="/tours?category=Day%20Trips" className="hover:text-white hover:translate-x-1 inline-block transition-all">Day Trips & Culture</Link></li>
              <li><Link to="/gallery" className="hover:text-white hover:translate-x-1 inline-block transition-all">Expedition Gallery</Link></li>
            </ul>
          </div>

          {/* Safari Circuits */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F3C082] mb-4">
              Circuits & Parks
            </h4>
            <ul className="space-y-2.5 text-white/70 text-xs">
              <li><Link to="/destinations" className="hover:text-white hover:translate-x-1 inline-block transition-all">Serengeti National Park</Link></li>
              <li><Link to="/destinations" className="hover:text-white hover:translate-x-1 inline-block transition-all">Ngorongoro Crater</Link></li>
              <li><Link to="/destinations" className="hover:text-white hover:translate-x-1 inline-block transition-all">Tarangire Baobabs</Link></li>
              <li><Link to="/destinations" className="hover:text-white hover:translate-x-1 inline-block transition-all">Mount Kilimanjaro</Link></li>
              <li><Link to="/destinations" className="hover:text-white hover:translate-x-1 inline-block transition-all">Zanzibar Island</Link></li>
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F3C082] mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-2.5 text-white/70 text-xs mb-5">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C08240] flex-shrink-0 mt-0.5" />
                <span>Arusha & Moshi, Tanzania</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C08240] flex-shrink-0" />
                <a href="mailto:info@embuatsafaris.com" className="hover:text-white transition-colors">info@embuatsafaris.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C08240] flex-shrink-0" />
                <a href="tel:+255754000000" className="hover:text-white transition-colors">+255 754 000 000</a>
              </li>
            </ul>

            <h5 className="text-[11px] font-bold uppercase tracking-wider text-white/90 mb-2">
              Safari Newsletter
            </h5>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white/10 border border-white/20 rounded-xl py-2 pl-3 pr-9 text-xs outline-none focus:border-[#C08240] transition-all text-white placeholder:text-white/40"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1 top-1 bottom-1 bg-[#C08240] hover:bg-[#A67134] text-white px-2.5 rounded-lg transition-colors font-bold flex items-center justify-center"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar with Year 2026 and Embuat Safaris */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] uppercase tracking-wider text-white/50 font-semibold text-center md:text-left">
          <p>
            © 2026 <span className="notranslate" translate="no">Embuat Safaris</span>. <span className="notranslate" translate="no">Explore • Experience • Preserve</span>. {t('footer.tagline') || 'Proudly Tanzanian Owned.'}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs normal-case">
            <Link to="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link>
            <Link to="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
            <Link to="/terms" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
            <Link to="/admin" className="text-white/40 hover:text-[#F3C082] transition-colors font-mono text-[11px]">Staff Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

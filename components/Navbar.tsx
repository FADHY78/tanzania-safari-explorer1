
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Tours', path: '/tours' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  const isHomePage = location.pathname === '/';
  const navBgClass = isScrolled || !isHomePage 
    ? 'bg-white/98 backdrop-blur-md shadow-2xl' 
    : 'bg-transparent';
  const textColorClass = isScrolled || !isHomePage ? 'text-gray-800' : 'text-white';
  const logoVariant = isScrolled || !isHomePage ? 'dark' : 'light';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 py-4 ${navBgClass}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="group hover:opacity-90 transition-opacity">
          <Logo variant={logoVariant} size="md" />
        </Link>
        
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2.5 font-semibold transition-all duration-200 text-sm uppercase tracking-wider relative rounded-lg ${
                  isActive
                    ? 'text-[#C08240] bg-[#C08240]/10'
                    : `${textColorClass} hover:text-[#C08240] hover:bg-[#C08240]/5`
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="ml-4 bg-gradient-to-r from-[#C08240] to-[#A67134] text-white px-6 py-2.5 rounded-full font-bold hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 text-xs uppercase tracking-wider"
          >
            Book Now
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden p-2 hover:text-[#C08240] transition-colors rounded-lg ${textColorClass}`}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-gray-200 shadow-2xl animate-slide-down">
          <div className="container mx-auto px-6 py-6 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `block font-semibold transition-colors py-3 px-4 rounded-lg text-sm uppercase tracking-wider ${
                    isActive
                      ? 'text-[#C08240] bg-[#C08240]/10'
                      : 'text-gray-700 hover:text-[#C08240] hover:bg-gray-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="block text-center bg-gradient-to-r from-[#C08240] to-[#A67134] text-white px-6 py-3 rounded-full font-bold hover:shadow-xl transition-all mt-4 text-xs uppercase tracking-wider"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

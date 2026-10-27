import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Sun, Moon, Phone, Mail, ArrowRight, Menu, X, Compass, Globe, ChevronDown, Check } from 'lucide-react';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';
import { useLanguage, LanguageCode } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const mobileLangDropdownRef = useRef<HTMLDivElement>(null);

  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage, currentLanguageInfo, supportedLanguages, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsLangDropdownOpen(false);
  }, [location]);

  // Click outside listener for language dropdown (desktop & mobile)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedDesktop = langDropdownRef.current && langDropdownRef.current.contains(target);
      const clickedMobile = mobileLangDropdownRef.current && mobileLangDropdownRef.current.contains(target);
      if (!clickedDesktop && !clickedMobile) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.tours'), path: '/tours' },
    { name: t('nav.destinations'), path: '/destinations' },
    { name: t('nav.gallery'), path: '/gallery' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.contact'), path: '/contact' }
  ];

  const isHomePage = location.pathname === '/';
  
  // Navbar background styling based on scroll, route, and theme
  const getNavBgClass = () => {
    if (isScrolled) {
      return 'bg-white/95 dark:bg-[#14100D]/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-white/10 py-3';
    }
    if (!isHomePage) {
      return 'bg-white/95 dark:bg-[#14100D]/95 backdrop-blur-md border-b border-gray-200/50 dark:border-white/10 py-3 sm:py-4';
    }
    return 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-4 sm:py-5';
  };

  const getTextColorClass = () => {
    if (isScrolled || !isHomePage) {
      return 'text-gray-800 dark:text-gray-100';
    }
    return 'text-white';
  };

  const logoVariant = (isScrolled || !isHomePage) && !isDark ? 'dark' : 'light';

  return (
    <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${getNavBgClass()}`}>
      <div className="container mx-auto px-3 sm:px-6 flex justify-between items-center gap-2 lg:gap-4 flex-nowrap">
        
        {/* Brand Logo */}
        <Link to="/" className="group hover:opacity-95 transition-opacity flex-shrink-0" aria-label="Embuat Safaris Home">
          <Logo variant={logoVariant} size="md" />
        </Link>
        
        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 flex-nowrap flex-shrink-0" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-2.5 xl:px-3.5 py-1.5 xl:py-2 font-semibold transition-all duration-200 text-[11px] xl:text-xs uppercase tracking-wider rounded-xl whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? 'text-[#C08240] bg-[#C08240]/10 font-bold'
                    : `${getTextColorClass()} hover:text-[#C08240] hover:bg-[#C08240]/10`
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions: Language Selector, Dark Mode Toggle & CTA */}
        <div className="hidden lg:flex items-center space-x-1.5 xl:space-x-2.5 flex-shrink-0">
          {/* Language Selector Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className={`w-9 h-9 xl:w-10 xl:h-10 rounded-xl border transition-all duration-300 flex items-center justify-center relative flex-shrink-0 ${
                isScrolled || !isHomePage
                  ? 'bg-gray-100 dark:bg-white/10 border-gray-200 dark:border-white/15 text-gray-700 dark:text-gray-200 hover:border-[#C08240]'
                  : 'bg-white/15 border-white/20 text-white hover:bg-white/25'
              }`}
              title={t('ui.switchLanguage')}
              aria-label={t('ui.switchLanguage')}
            >
              <Globe className="w-4 h-4 xl:w-4.5 xl:h-4.5 text-current" />
              <span className="absolute -bottom-1 -right-1 text-[10px] leading-none drop-shadow-sm select-none" title={currentLanguageInfo.name}>
                {currentLanguageInfo.flag}
              </span>
            </button>

            {/* Floating Dropdown Menu */}
            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#1B1613] shadow-2xl border border-amber-900/10 dark:border-[#2C241E] p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider">
                  {t('ui.switchLanguage')}
                </div>
                <div className="space-y-1">
                  {supportedLanguages.map((lang) => {
                    const isSelected = language === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#C08240]/15 to-[#DE6826]/15 text-[#C08240] font-bold'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-lg leading-none">{lang.flag}</span>
                          <span className="text-left">
                            <span className="block font-medium">{lang.nativeName}</span>
                            <span className="block text-[10px] text-gray-400">{lang.country}</span>
                          </span>
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#C08240]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`w-9 h-9 xl:w-10 xl:h-10 rounded-xl border transition-all duration-300 flex items-center justify-center flex-shrink-0 ${
              isScrolled || !isHomePage
                ? 'bg-gray-100 dark:bg-white/10 border-gray-200 dark:border-white/15 text-gray-700 dark:text-amber-400 hover:border-[#C08240]'
                : 'bg-white/15 border-white/20 text-amber-300 hover:bg-white/25'
            }`}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 rotate-0 transition-transform duration-500" />
            ) : (
              <Moon className="w-4 h-4 text-gray-700 dark:text-amber-400 rotate-0 transition-transform duration-500" />
            )}
          </button>

          {/* Book Now Button */}
          <Link
            to="/contact"
            className="bg-gradient-to-r from-[#C08240] via-[#DE6826] to-[#A67134] text-white px-3.5 xl:px-5 py-2 xl:py-2.5 rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 text-[11px] xl:text-xs uppercase tracking-wider shadow-md shadow-[#C08240]/20 flex items-center gap-1.5 whitespace-nowrap flex-shrink-0"
          >
            <span>{t('nav.planSafari')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        
        {/* Mobile Header Controls: Quick Language, Theme Toggle & Hamburger Menu */}
        <div className="flex lg:hidden items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
          {/* Mobile Language Button - Matching size and rounding */}
          <div className="relative" ref={mobileLangDropdownRef}>
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              aria-label={t('ui.switchLanguage')}
              title={t('ui.switchLanguage')}
              className={`w-9 h-9 rounded-xl border transition-all flex items-center justify-center relative flex-shrink-0 ${
                isScrolled || !isHomePage
                  ? 'bg-gray-100 dark:bg-white/10 border-gray-200 dark:border-white/15 text-gray-800 dark:text-gray-100'
                  : 'bg-white/15 border-white/20 text-white'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="absolute -bottom-0.5 -right-0.5 text-[9px] leading-none select-none">
                {currentLanguageInfo.flag}
              </span>
            </button>

            {/* Mobile Dropdown Menu */}
            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-[#1B1613] shadow-2xl border border-amber-900/10 dark:border-[#2C241E] p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider">
                  {t('ui.switchLanguage')}
                </div>
                <div className="space-y-1">
                  {supportedLanguages.map((lang) => {
                    const isSelected = language === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#C08240]/15 to-[#DE6826]/15 text-[#C08240] font-bold'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base leading-none">{lang.flag}</span>
                          <span className="font-medium text-left">{lang.nativeName}</span>
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#C08240]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Theme Toggle Button - Matching size and rounding */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`w-9 h-9 rounded-xl border transition-all flex items-center justify-center flex-shrink-0 ${
              isScrolled || !isHomePage
                ? 'bg-gray-100 dark:bg-white/10 border-gray-200 dark:border-white/15 text-gray-700 dark:text-amber-400'
                : 'bg-white/15 border-white/20 text-amber-300'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Button - Matching size and rounding */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className={`w-9 h-9 rounded-xl border transition-colors flex items-center justify-center flex-shrink-0 ${
              isScrolled || !isHomePage
                ? 'border-gray-200 dark:border-white/15 text-gray-800 dark:text-gray-100 hover:text-[#C08240]'
                : 'border-white/20 text-white hover:text-[#C08240]'
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Menu */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-50 bg-[#FAF7F2] dark:bg-[#14100D] border-l border-gray-200 dark:border-white/10 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
          <Logo variant={isDark ? 'light' : 'dark'} size="sm" />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2 px-3">
            Menu Navigation
          </div>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between font-semibold py-3 px-4 rounded-xl text-sm uppercase tracking-wider transition-all ${
                  isActive
                    ? 'text-[#C08240] bg-[#C08240]/15 dark:bg-[#C08240]/25 font-bold shadow-sm'
                    : 'text-gray-800 dark:text-gray-200 hover:text-[#C08240] hover:bg-gray-100 dark:hover:bg-white/5'
                }`
              }
            >
              <span>{link.name}</span>
              <ArrowRight className="w-4 h-4 opacity-40" />
            </NavLink>
          ))}

          {/* Language Selector for Mobile Drawer */}
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-white/10">
            <div className="text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2.5 px-1 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#C08240]" />
              <span>{t('ui.switchLanguage')}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {supportedLanguages.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                      isSelected
                        ? 'bg-[#C08240]/15 border-[#C08240] text-[#C08240] font-bold shadow-sm'
                        : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="text-lg leading-none">{lang.flag}</span>
                    <div className="truncate">
                      <span className="block text-xs leading-tight">{lang.nativeName}</span>
                      <span className="block text-[9px] text-gray-400 uppercase tracking-wider">{lang.code}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Theme switcher option in drawer */}
          <div className="pt-3 mt-3 border-t border-gray-200 dark:border-white/10">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-200 font-semibold text-xs uppercase tracking-wider"
            >
              <span className="flex items-center gap-2">
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
                Theme: {isDark ? 'Dark Mode' : 'Light Mode'}
              </span>
              <span className="text-[10px] bg-[#C08240] text-white px-2 py-0.5 rounded-full font-bold">
                Toggle
              </span>
            </button>
          </div>
        </div>

        {/* Drawer Footer & CTA */}
        <div className="p-5 border-t border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 space-y-3">
          <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
            <a href="tel:+255754000000" className="flex items-center gap-2 py-1 hover:text-[#C08240]">
              <Phone className="w-3.5 h-3.5 text-[#C08240]" />
              <span>+255 754 000 000</span>
            </a>
            <a href="mailto:info@embuatsafaris.com" className="flex items-center gap-2 py-1 hover:text-[#C08240]">
              <Mail className="w-3.5 h-3.5 text-[#C08240]" />
              <span>info@embuatsafaris.com</span>
            </a>
          </div>

          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-center bg-gradient-to-r from-[#C08240] via-[#DE6826] to-[#A67134] text-white px-6 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all text-xs uppercase tracking-wider"
          >
            Book Your Safari Today
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

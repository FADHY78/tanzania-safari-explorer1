import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Sun,
  Moon,
  Globe,
  Check,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  CalendarCheck,
  Compass,
  Home,
  MapPin,
  Camera,
  Award,
  MessageSquare,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useLiveCategories, useLiveTours } from '../services/tourService';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isToursDropdownOpen, setIsToursDropdownOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(true);

  const langDropdownRef = useRef<HTMLDivElement>(null);
  const toursDropdownRef = useRef<HTMLDivElement>(null);
  const toursDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage, currentLanguageInfo, supportedLanguages, t } = useLanguage();
  const location = useLocation();

  // Dynamic live database categories and packages from Supabase
  const categories = useLiveCategories();
  const tours = useLiveTours();

  // Dynamic calculation of packages per category strictly from database
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    tours.forEach((tour) => {
      if (tour.category) {
        counts[tour.category] = (counts[tour.category] || 0) + 1;
      }
    });
    return counts;
  }, [tours]);

  // Window scroll listener for refined glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsLangDropdownOpen(false);
    setIsToursDropdownOpen(false);
  }, [location.pathname, location.search]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsLangDropdownOpen(false);
        setIsToursDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (langDropdownRef.current && !langDropdownRef.current.contains(target)) {
        setIsLangDropdownOpen(false);
      }
      if (toursDropdownRef.current && !toursDropdownRef.current.contains(target)) {
        setIsToursDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Body scroll lock for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Hover handlers for Tours mega-dropdown on desktop
  const handleToursMouseEnter = () => {
    if (toursDropdownTimeoutRef.current) {
      clearTimeout(toursDropdownTimeoutRef.current);
      toursDropdownTimeoutRef.current = null;
    }
    setIsToursDropdownOpen(true);
  };

  const handleToursMouseLeave = () => {
    toursDropdownTimeoutRef.current = setTimeout(() => {
      setIsToursDropdownOpen(false);
    }, 200);
  };

  const isHomePage = location.pathname === '/';
  const isSolidNav = isScrolled || !isHomePage;

  const navLinks = [
    { name: t('nav.home'), path: '/', icon: Home },
    { name: t('nav.destinations'), path: '/destinations', icon: MapPin },
    { name: t('nav.gallery'), path: '/gallery', icon: Camera },
    { name: t('nav.about'), path: '/about', icon: Award },
    { name: t('nav.contact'), path: '/contact', icon: MessageSquare }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-300 ${
          isSolidNav
            ? 'bg-white/95 dark:bg-[#0C0A09]/95 backdrop-blur-xl border-b border-stone-200/80 dark:border-white/[0.08] shadow-[0_4px_25px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.45)] py-3'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 sm:py-5 border-b border-white/[0.06]'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex-shrink-0 transition-opacity hover:opacity-95 focus:outline-none"
            aria-label="Embuat Safaris"
          >
            <Logo variant={isSolidNav && !isDark ? 'dark' : 'light'} size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {/* Home Link */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-200 relative rounded-lg ${
                  isActive
                    ? 'text-[#D97736] font-bold after:content-[""] after:absolute after:bottom-0 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-[#D97736]'
                    : isSolidNav
                    ? 'text-stone-700 dark:text-stone-200 hover:text-[#D97736] dark:hover:text-[#D97736] hover:bg-black/5 dark:hover:bg-white/5'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {t('nav.home')}
            </NavLink>

            {/* Tours Mega Menu Trigger & Dropdown */}
            <div
              className="relative"
              ref={toursDropdownRef}
              onMouseEnter={handleToursMouseEnter}
              onMouseLeave={handleToursMouseLeave}
            >
              <button
                onClick={() => setIsToursDropdownOpen(!isToursDropdownOpen)}
                className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-200 rounded-lg flex items-center gap-1.5 focus:outline-none ${
                  location.pathname === '/tours' || isToursDropdownOpen
                    ? 'text-[#D97736] font-bold'
                    : isSolidNav
                    ? 'text-stone-700 dark:text-stone-200 hover:text-[#D97736] dark:hover:text-[#D97736] hover:bg-black/5 dark:hover:bg-white/5'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                aria-expanded={isToursDropdownOpen}
              >
                <span>{t('nav.tours')}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isToursDropdownOpen ? 'rotate-180 text-[#D97736]' : 'opacity-70'
                  }`}
                />
              </button>

              {/* Mega Dropdown Panel */}
              {isToursDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[740px] max-w-[92vw] rounded-2xl bg-white dark:bg-[#110E0C] border border-stone-200 dark:border-stone-800 shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Dropdown Top Bar */}
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-stone-100 dark:border-stone-800">
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-[#D97736]" />
                      <span className="text-xs font-bold uppercase tracking-[0.14em] text-stone-900 dark:text-white">
                        Safari Collections & Expeditions
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-900 px-2.5 py-0.5 rounded-full border border-stone-200 dark:border-stone-800">
                      {tours.length} Verified Itineraries
                    </span>
                  </div>

                  {/* Categories Grid (Pulling 100% live from Supabase) */}
                  <div className="grid grid-cols-3 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                    {categories.map((cat) => {
                      const count = categoryCounts[cat.id] || 0;
                      return (
                        <Link
                          key={cat.id}
                          to={`/tours?category=${encodeURIComponent(cat.id)}`}
                          onClick={() => setIsToursDropdownOpen(false)}
                          className="group p-3 rounded-xl bg-stone-50/80 dark:bg-stone-900/60 hover:bg-[#D97736]/10 dark:hover:bg-[#D97736]/15 border border-stone-200/80 dark:border-stone-800/80 hover:border-[#D97736]/40 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-1.5 mb-1">
                              <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#D97736] transition-colors leading-snug line-clamp-1">
                                {cat.name}
                              </h4>
                              <span className="text-[10px] font-semibold text-[#D97736] bg-[#D97736]/10 dark:bg-[#D97736]/20 px-1.5 py-0.5 rounded-md flex-shrink-0">
                                {count}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                              {cat.description || 'Guided Tanzania wilderness expedition.'}
                            </p>
                          </div>
                          <div className="mt-2.5 flex items-center gap-1 text-[10px] font-semibold text-stone-400 group-hover:text-[#D97736] transition-colors">
                            <span>View Packages</span>
                            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Dropdown Bottom Banner */}
                  <div className="mt-4 pt-3.5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                    <Link
                      to="/tours"
                      onClick={() => setIsToursDropdownOpen(false)}
                      className="font-bold text-[#D97736] hover:underline flex items-center gap-1.5"
                    >
                      <span>Explore All {tours.length} Expeditions</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to="/plan-my-visit"
                      onClick={() => setIsToursDropdownOpen(false)}
                      className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#D97736]" />
                      <span>Custom Tailored Safari</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Other Nav Links */}
            {navLinks.slice(1).map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-200 relative rounded-lg ${
                    isActive
                      ? 'text-[#D97736] font-bold after:content-[""] after:absolute after:bottom-0 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-[#D97736]'
                      : isSolidNav
                      ? 'text-stone-700 dark:text-stone-200 hover:text-[#D97736] dark:hover:text-[#D97736] hover:bg-black/5 dark:hover:bg-white/5'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right Actions: Language, Theme & Luxury Plan CTA */}
          <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
            {/* Language Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className={`h-9 px-2.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 focus:outline-none ${
                  isSolidNav
                    ? 'bg-stone-100/80 dark:bg-stone-900/80 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:border-[#D97736]/50'
                    : 'bg-black/30 backdrop-blur-md border-white/20 text-white hover:border-white/40'
                }`}
                aria-label="Select Language"
                title="Select Language"
              >
                <span className="text-sm leading-none">{currentLanguageInfo.flag}</span>
                <span className="uppercase tracking-wider text-[11px] font-semibold">
                  {currentLanguageInfo.code}
                </span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-[#110E0C] border border-stone-200 dark:border-stone-800 shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-2.5 py-1 text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                    Language
                  </div>
                  <div className="space-y-0.5">
                    {supportedLanguages.map((lang) => {
                      const isSelected = language === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                            isSelected
                              ? 'bg-[#D97736] text-white font-semibold'
                              : 'text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-sm">{lang.flag}</span>
                            <span>{lang.nativeName}</span>
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
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
              className={`w-9 h-9 rounded-lg border transition-all flex items-center justify-center focus:outline-none ${
                isSolidNav
                  ? 'bg-stone-100/80 dark:bg-stone-900/80 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:text-[#D97736] dark:hover:text-[#D97736]'
                  : 'bg-black/30 backdrop-blur-md border-white/20 text-white hover:border-white/40'
              }`}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45 duration-300" />
              ) : (
                <Moon className="w-4 h-4 transition-transform hover:-rotate-12 duration-300" />
              )}
            </button>

            {/* Plan My Visit CTA Button */}
            <Link
              to="/plan-my-visit"
              className="bg-gradient-to-r from-[#C26223] to-[#A04E17] hover:from-[#D46C29] hover:to-[#B2571B] text-white px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-[0.12em] shadow-md shadow-[#C26223]/20 border border-amber-500/30 transition-all flex items-center gap-2 hover:shadow-lg focus:outline-none whitespace-nowrap"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Plan My Visit</span>
            </Link>
          </div>

          {/* Mobile Right Controls: Language, Theme, & Sleek Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Quick Language Toggle */}
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className={`w-8 h-8 rounded-lg border text-xs flex items-center justify-center ${
                isSolidNav
                  ? 'bg-stone-100 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200'
                  : 'bg-black/40 border-white/20 text-white'
              }`}
              aria-label="Language"
            >
              <span className="text-xs leading-none">{currentLanguageInfo.flag}</span>
            </button>

            {/* Quick Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`w-8 h-8 rounded-lg border flex items-center justify-center ${
                isSolidNav
                  ? 'bg-stone-100 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200'
                  : 'bg-black/40 border-white/20 text-white'
              }`}
              aria-label="Theme"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Minimalist Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
              className="w-9 h-9 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 flex items-center justify-center shadow-md focus:outline-none transition-transform active:scale-95"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ── LUXURY MOBILE DRAWER ── */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Slide-out Drawer */}
        <aside
          aria-label="Mobile Navigation"
          className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#0E0C0A] text-stone-100 border-l border-stone-800 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Top Header */}
          <div className="px-5 py-4 border-b border-stone-800/80 flex items-center justify-between bg-[#12100E]">
            <Logo variant="light" size="sm" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close Menu"
              className="w-8 h-8 rounded-lg bg-stone-800/70 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
            {/* Primary Navigation Links */}
            <nav className="space-y-1" aria-label="Mobile Primary Links">
              <NavLink
                to="/"
                end
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-[#D97736]/20 text-[#D97736] border border-[#D97736]/40'
                      : 'text-stone-300 hover:bg-stone-900 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Home className="w-4 h-4 text-[#D97736]" />
                  <span>{t('nav.home')}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-40" />
              </NavLink>

              {navLinks.slice(1).map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                        isActive
                          ? 'bg-[#D97736]/20 text-[#D97736] border border-[#D97736]/40'
                          : 'text-stone-300 hover:bg-stone-900 hover:text-white'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-[#D97736]" />
                      <span>{link.name}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                  </NavLink>
                );
              })}
            </nav>

            {/* Live Database Safari Categories Accordion */}
            <div className="pt-3 border-t border-stone-800/80">
              <button
                type="button"
                onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                className="w-full flex items-center justify-between py-2 text-stone-400 hover:text-stone-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#D97736]" />
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-stone-200">
                    Safari Collections ({categories.length})
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isMobileCategoriesOpen ? 'rotate-180 text-[#D97736]' : 'opacity-60'
                  }`}
                />
              </button>

              {isMobileCategoriesOpen && (
                <div className="mt-2 space-y-1.5 pl-2">
                  {categories.map((cat) => {
                    const count = categoryCounts[cat.id] || 0;
                    return (
                      <Link
                        key={cat.id}
                        to={`/tours?category=${encodeURIComponent(cat.id)}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-stone-900/60 hover:bg-[#D97736]/15 border border-stone-800/60 text-stone-300 hover:text-white transition-all text-xs font-medium"
                      >
                        <span className="truncate">{cat.name}</span>
                        <span className="text-[10px] font-bold text-[#D97736] bg-[#D97736]/15 px-1.5 py-0.5 rounded ml-2 flex-shrink-0">
                          {count}
                        </span>
                      </Link>
                    );
                  })}
                  <Link
                    to="/tours"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-center py-2 text-xs font-bold text-[#D97736] hover:underline"
                  >
                    View All {tours.length} Packages →
                  </Link>
                </div>
              )}
            </div>

            {/* Language Selection Grid */}
            <div className="pt-3 border-t border-stone-800/80">
              <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#D97736]" />
                <span>Select Language</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {supportedLanguages.map((lang) => {
                  const isSelected = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`px-2 py-1.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-[#D97736] text-white border-[#D97736] font-bold'
                          : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:bg-stone-800'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span className="truncate">{lang.code.toUpperCase()}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sticky Drawer Footer */}
          <div className="p-4 border-t border-stone-800/80 bg-[#12100E] space-y-2.5 flex-shrink-0">
            <Link
              to="/plan-my-visit"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#C26223] to-[#A04E17] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#C26223]/25"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Plan My Visit</span>
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Navbar;
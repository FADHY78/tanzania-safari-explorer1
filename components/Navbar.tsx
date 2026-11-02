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
  Sparkles,
  Phone,
  Mail,
  ShieldCheck
} from 'lucide-react';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useLiveCategories, useLiveTours } from '../services/tourService';
import { useSiteSettings } from '../services/siteSettingsService';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isToursDropdownOpen, setIsToursDropdownOpen] = useState(false);
  const [isMobileLangExpanded, setIsMobileLangExpanded] = useState(false);

  const langDropdownRef = useRef<HTMLDivElement>(null);
  const mobileLangDropdownRef = useRef<HTMLDivElement>(null);
  const toursDropdownRef = useRef<HTMLDivElement>(null);
  const toursDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { company } = useSiteSettings();
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
    setIsMobileLangExpanded(false);
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
      const clickedDesktop = langDropdownRef.current && langDropdownRef.current.contains(target);
      const clickedMobile = mobileLangDropdownRef.current && mobileLangDropdownRef.current.contains(target);
      if (!clickedDesktop && !clickedMobile) {
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

  const mobileNavLinks = [
    { name: t('nav.home'), path: '/', icon: Home, subtitle: 'Welcome & Overview' },
    { name: t('nav.tours'), path: '/tours', icon: Compass, subtitle: `${tours.length}+ Curated Expeditions` },
    { name: t('nav.destinations'), path: '/destinations', icon: MapPin, subtitle: 'Serengeti, Kilimanjaro & Coast' },
    { name: t('nav.gallery'), path: '/gallery', icon: Camera, subtitle: 'Photos & Videos from the Bush' },
    { name: t('nav.about'), path: '/about', icon: Award, subtitle: 'Our Heritage & Conservation' },
    { name: t('nav.contact'), path: '/contact', icon: MessageSquare, subtitle: '24/7 Safari Specialists' },
    { name: 'Plan My Visit', path: '/plan-my-visit', icon: Sparkles, subtitle: 'Custom Safari Trip Builder' }
  ];

  const quickCategories = [
    { label: 'Wildlife Safaris', path: '/tours?category=Safari' },
    { label: 'Kilimanjaro Treks', path: '/tours?category=Trekking' },
    { label: 'Zanzibar Beach', path: '/tours?category=Zanzibar' },
    { label: 'Day Trips', path: '/tours?category=Day%20Trips' }
  ];

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
                    ? 'text-brand-gold font-bold after:content-[""] after:absolute after:bottom-0 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-brand-gold'
                    : isSolidNav
                    ? 'text-stone-700 dark:text-stone-200 hover:text-brand-gold dark:hover:text-brand-gold hover:bg-black/5 dark:hover:bg-white/5'
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
                    ? 'text-brand-gold font-bold'
                    : isSolidNav
                    ? 'text-stone-700 dark:text-stone-200 hover:text-brand-gold dark:hover:text-brand-gold hover:bg-black/5 dark:hover:bg-white/5'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                aria-expanded={isToursDropdownOpen}
              >
                <span>{t('nav.tours')}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isToursDropdownOpen ? 'rotate-180 text-brand-gold' : 'opacity-70'
                  }`}
                />
              </button>

              {/* Mega Dropdown Panel */}
              {isToursDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[740px] max-w-[92vw] rounded-2xl bg-white dark:bg-[#110E0C] border border-stone-200 dark:border-stone-800 shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Dropdown Top Bar */}
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-stone-100 dark:border-stone-800">
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-brand-gold" />
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
                          className="group p-3 rounded-xl bg-stone-50/80 dark:bg-stone-900/60 hover:bg-brand-gold/10 dark:hover:bg-brand-gold/15 border border-stone-200/80 dark:border-stone-800/80 hover:border-brand-gold/40 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-1.5 mb-1">
                              <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-brand-gold transition-colors leading-snug line-clamp-1">
                                {cat.name}
                              </h4>
                              <span className="text-[10px] font-semibold text-brand-gold bg-brand-gold/10 dark:bg-brand-gold/20 px-1.5 py-0.5 rounded-md flex-shrink-0">
                                {count}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                              {cat.description || 'Guided Tanzania wilderness expedition.'}
                            </p>
                          </div>
                          <div className="mt-2.5 flex items-center gap-1 text-[10px] font-semibold text-stone-400 group-hover:text-brand-gold transition-colors">
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
                      className="font-bold text-brand-gold hover:underline flex items-center gap-1.5"
                    >
                      <span>Explore All {tours.length} Expeditions</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to="/plan-my-visit"
                      onClick={() => setIsToursDropdownOpen(false)}
                      className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
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
                      ? 'text-brand-gold font-bold after:content-[""] after:absolute after:bottom-0 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-brand-gold'
                      : isSolidNav
                      ? 'text-stone-700 dark:text-stone-200 hover:text-brand-gold dark:hover:text-brand-gold hover:bg-black/5 dark:hover:bg-white/5'
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
                    ? 'bg-stone-100/80 dark:bg-stone-900/80 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:border-brand-gold/50'
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
                              ? 'bg-brand-gold text-white font-semibold'
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
                  ? 'bg-stone-100/80 dark:bg-stone-900/80 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:text-brand-gold dark:hover:text-brand-gold'
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
              className="bg-gradient-to-r from-brand-gold to-brand-orange hover:opacity-90 text-white px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-[0.12em] shadow-md shadow-brand-gold/20 border border-amber-500/30 transition-all flex items-center gap-2 hover:shadow-lg focus:outline-none whitespace-nowrap"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Plan My Visit</span>
            </Link>
          </div>

          {/* Mobile Header Controls: Quick Language, Theme Toggle & Professional Menu Trigger */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Mobile Language Button */}
            <div className="relative" ref={mobileLangDropdownRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                aria-label={t('ui.switchLanguage')}
                title={t('ui.switchLanguage')}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border transition-all flex items-center justify-center relative flex-shrink-0 ${isSolidNav
                    ? 'bg-neutral-100 dark:bg-white/10 border-black/10 dark:border-white/15 text-black dark:text-white'
                    : 'bg-black/45 backdrop-blur-md border-white/25 text-white'
                  }`}
              >
                <Globe className="w-4 h-4" />
                <span className="absolute -bottom-0.5 -right-0.5 text-[9px] leading-none select-none">
                  {currentLanguageInfo.flag}
                </span>
              </button>

              {/* Mobile Header Language Popover */}
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-[#121212] shadow-2xl border border-black/10 dark:border-white/15 p-2 z-50 animate-slide-down">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-extrabold text-neutral-400 dark:text-neutral-500 tracking-wider">
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
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${isSelected
                              ? 'bg-brand-gold text-white font-bold'
                              : 'text-black dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/10'
                            }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-base leading-none">{lang.flag}</span>
                            <span className="font-semibold text-left">{lang.nativeName}</span>
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border transition-all flex items-center justify-center flex-shrink-0 ${isSolidNav
                  ? 'bg-neutral-100 dark:bg-white/10 border-black/10 dark:border-white/15 text-black dark:text-brand-gold'
                  : 'bg-black/45 backdrop-blur-md border-white/25 text-brand-gold'
                }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={isMobileMenuOpen}
              className="h-9 sm:h-10 px-3 rounded-xl bg-brand-gold/80 hover:bg-brand-gold/95 backdrop-blur-md border border-white/30 dark:border-brand-gold/50 text-white font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-brand-gold/20 active:scale-95 flex-shrink-0"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-[11px] uppercase tracking-wider font-extrabold hidden xs:inline sm:inline">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── PROFESSIONAL FULL-HEIGHT MOBILE NAVIGATION DRAWER ── */}
      {/* Rendered outside <header> so backdrop-filter never clips fixed viewport height */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isMobileMenuOpen ? ' visible pointer-events-auto' : 'invisible pointer-events-none'
          }`}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Backdrop Overlay */}
        <div
          className={`fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Slide-Over Panel with Framed Edges */}
        <aside
          aria-label="Mobile Navigation Drawer"
          className={`fixed top-2.5 right-2.5 bottom-2.5 w-[86vw] max-w-[370px] h-[calc(100dvh-20px)] rounded-3xl overflow-hidden bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-xl text-black dark:text-white border-2 border-brand-gold/40 dark:border-brand-gold/45 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-[110%]'
            }`}
        >
          {/* Top Orange Brand Accent Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-brand-gold/80 via-brand-orange/75 to-black flex-shrink-0" />

          {/* Drawer Header */}
          <div className="px-5 py-4 border-b border-black/15 dark:border-white/15 flex items-center justify-between bg-white/90 dark:bg-[#0A0A0A]/90 flex-shrink-0">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="focus:outline-none"
            >
              <Logo variant={isDark ? 'light' : 'dark'} size="sm" />
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close Navigation Menu"
              className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-white/10 border border-black/15 dark:border-white/15 hover:bg-brand-gold/80 hover:text-white dark:hover:bg-brand-gold/80 text-black dark:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">

            {/* Primary Navigation Links */}
            <div>
              <div className="px-2 mb-2.5 flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
                  Navigation Menu
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-gold/90">
                  <ShieldCheck className="w-3 h-3" /> TTB Licensed
                </span>
              </div>

              <nav className="space-y-2" aria-label="Mobile Primary Navigation">
                {mobileNavLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      end={link.path === '/'}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `group flex items-center justify-between p-3 rounded-2xl transition-all duration-200 border ${isActive
                          ? 'bg-brand-gold/80 text-white border-brand-gold/90 shadow-md shadow-brand-gold/15'
                          : 'bg-neutral-50 dark:bg-[#121212] text-black dark:text-white border-black/15 dark:border-white/15 hover:border-brand-gold/50 hover:bg-neutral-100 dark:hover:bg-white/10'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${isActive
                                  ? 'bg-black/20 text-white border border-white/25'
                                  : 'bg-white dark:bg-black text-brand-gold/90 border border-black/15 dark:border-white/15 group-hover:bg-brand-gold/80 group-hover:text-white'
                                }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <span className="block font-bold text-xs uppercase tracking-wider truncate">
                                {link.name}
                              </span>
                              <span
                                className={`block text-[11px] truncate ${isActive ? 'text-white/90' : 'text-neutral-500 dark:text-neutral-400'
                                  }`}
                              >
                                {link.subtitle}
                              </span>
                            </div>
                          </div>
                          <ChevronRight
                            className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5 ${isActive ? 'text-white' : 'text-neutral-400 group-hover:text-brand-gold'
                              }`}
                          />
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            {/* Quick Safari Categories */}
            <div className="pt-2 border-t border-black/15 dark:border-white/15">
              <div className="px-2 mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold/90" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
                  Quick Safari Categories
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {quickCategories.map((cat) => (
                  <Link
                    key={cat.label}
                    to={cat.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#121212] hover:bg-brand-gold/80 hover:text-white dark:hover:bg-brand-gold/80 text-black dark:text-neutral-200 border border-black/15 dark:border-white/15 hover:border-brand-gold/70 text-xs font-bold transition-all flex items-center justify-between"
                  >
                    <span className="truncate">{cat.label}</span>
                    <ArrowRight className="w-3 h-3 text-brand-gold/90 group-hover:text-white flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Preferences: Theme & Language */}
            <div className="pt-2 border-t border-black/15 dark:border-white/15 space-y-3">
              {/* Segmented Appearance Switch */}
              <div className="p-1.5 rounded-2xl bg-neutral-100 dark:bg-[#121212] border border-black/15 dark:border-white/15 grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => { if (isDark) toggleTheme(); }}
                  className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${!isDark
                      ? 'bg-brand-gold/80 text-white shadow-sm border border-brand-gold/90'
                      : 'text-neutral-500 hover:text-white'
                    }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light Mode</span>
                </button>
                <button
                  type="button"
                  onClick={() => { if (!isDark) toggleTheme(); }}
                  className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${isDark
                      ? 'bg-brand-gold/80 text-white shadow-sm border border-brand-gold/90'
                      : 'text-neutral-600 hover:text-black'
                    }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark Mode</span>
                </button>
              </div>

              {/* Collapsible Language Selector */}
              <div className="rounded-2xl border border-black/15 dark:border-white/15 overflow-hidden bg-neutral-50 dark:bg-[#121212]">
                <button
                  type="button"
                  onClick={() => setIsMobileLangExpanded(!isMobileLangExpanded)}
                  className="w-full px-3.5 py-3 flex items-center justify-between text-xs font-bold text-black dark:text-white"
                >
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-brand-gold/90" />
                    <span>{t('ui.switchLanguage')}</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-white dark:bg-black px-2.5 py-1 rounded-lg border border-black/15 dark:border-white/15 text-[11px]">
                    <span>{currentLanguageInfo.flag}</span>
                    <span>{currentLanguageInfo.nativeName}</span>
                  </span>
                </button>

                {isMobileLangExpanded && (
                  <div className="p-2.5 pt-0 grid grid-cols-2 gap-1.5 border-t border-black/10 dark:border-white/10">
                    {supportedLanguages.map((lang) => {
                      const isSelected = language === lang.code;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            setLanguage(lang.code);
                            setIsMobileLangExpanded(false);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-semibold transition-all text-left ${isSelected
                              ? 'bg-brand-gold/80 border-brand-gold text-white font-bold'
                              : 'bg-white dark:bg-black border-black/15 dark:border-white/15 text-black dark:text-neutral-300'
                            }`}
                        >
                          <span className="text-base leading-none">{lang.flag}</span>
                          <span className="truncate text-[11px]">{lang.nativeName}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sticky Drawer Footer & CTA */}
          <div className="p-4 border-t border-black/15 dark:border-white/15 bg-neutral-50/95 dark:bg-[#111111]/95 space-y-3 flex-shrink-0">
            <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
              <a
                href={`tel:${company.phone.replace(/\s/g, '')}`}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/15 dark:border-white/15 hover:border-brand-gold/70 transition-colors truncate"
              >
                <Phone className="w-3.5 h-3.5 text-brand-gold/90 flex-shrink-0" />
                <span className="truncate">{company.phone}</span>
              </a>
              <a
                href={`mailto:${company.email}`}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/15 dark:border-white/15 hover:border-brand-gold/70 transition-colors truncate"
              >
                <Mail className="w-3.5 h-3.5 text-brand-gold/90 flex-shrink-0" />
                <span className="truncate">{company.email}</span>
              </a>
            </div>

            <Link
              to="/plan-my-visit"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-brand-gold/85 hover:bg-brand-gold border border-brand-gold text-white px-5 py-3.5 rounded-xl font-extrabold shadow-lg shadow-brand-gold/20 transition-all text-xs uppercase tracking-wider active:scale-98"
            >
              <Sparkles className="w-4 h-4" />
              <span>Plan My Visit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Navbar;
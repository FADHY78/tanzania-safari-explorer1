import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Sun,
  Moon,
  Phone,
  Mail,
  ArrowRight,
  Menu,
  X,
  Compass,
  Globe,
  Check,
  Home,
  MapPin,
  Camera,
  Award,
  MessageSquare,
  ChevronRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileLangExpanded, setIsMobileLangExpanded] = useState(false);

  const langDropdownRef = useRef<HTMLDivElement>(null);
  const mobileLangDropdownRef = useRef<HTMLDivElement>(null);

  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage, currentLanguageInfo, supportedLanguages, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsLangDropdownOpen(false);
    setIsMobileLangExpanded(false);
  }, [location.pathname, location.search]);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsLangDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside listener for language dropdown (desktop & mobile header)
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
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: t('nav.home'), path: '/', icon: Home, subtitle: 'Welcome & Overview' },
    { name: t('nav.tours'), path: '/tours', icon: Compass, subtitle: '84+ Curated Expeditions' },
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

  const isHomePage = location.pathname === '/';
  const isSolidNav = isScrolled || !isHomePage;

  // Navbar background styling based on scroll, route, and theme
  const getNavBgClass = () => {
    if (isSolidNav) {
      return 'bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-md shadow-lg border-b border-black/10 dark:border-white/10 py-3';
    }
    return 'bg-gradient-to-b from-black/85 via-black/45 to-transparent py-4 sm:py-5';
  };

  const getTextColorClass = () => {
    if (isSolidNav) {
      return 'text-black dark:text-white';
    }
    return 'text-white';
  };

  const logoVariant = isSolidNav && !isDark ? 'dark' : 'light';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-300 ${getNavBgClass()}`}>
        <div className="container mx-auto px-3.5 sm:px-6 flex justify-between items-center gap-2 lg:gap-4 flex-nowrap">

          {/* Brand Logo */}
          <Link
            to="/"
            className="group hover:opacity-95 transition-opacity flex-shrink-0"
            aria-label="Embuat Safaris Home"
          >
            <Logo variant={logoVariant} size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-nowrap flex-shrink-0" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `px-3 xl:px-4 py-2 font-bold transition-all duration-200 text-[11px] xl:text-xs uppercase tracking-wider rounded-xl whitespace-nowrap flex-shrink-0 ${isActive
                    ? 'bg-[#F97316] text-white shadow-md shadow-[#F97316]/25'
                    : `${getTextColorClass()} hover:text-[#F97316] dark:hover:text-[#F97316] hover:bg-[#F97316]/10`
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions: Language Selector, Dark Mode Toggle & CTA */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-2.5 flex-shrink-0">
            {/* Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className={`w-10 h-10 rounded-xl border transition-all duration-300 flex items-center justify-center relative flex-shrink-0 ${isSolidNav
                    ? 'bg-neutral-100 dark:bg-white/10 border-black/10 dark:border-white/15 text-black dark:text-white hover:border-[#F97316]'
                    : 'bg-black/40 backdrop-blur-md border-white/25 text-white hover:border-[#F97316] hover:bg-black/60'
                  }`}
                title={t('ui.switchLanguage')}
                aria-label={t('ui.switchLanguage')}
              >
                <Globe className="w-4 h-4 text-current" />
                <span className="absolute -bottom-1 -right-1 text-[10px] leading-none drop-shadow-sm select-none" title={currentLanguageInfo.name}>
                  {currentLanguageInfo.flag}
                </span>
              </button>

              {/* Floating Dropdown Menu */}
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2.5 w-56 rounded-2xl bg-white dark:bg-[#121212] shadow-2xl border border-black/10 dark:border-white/15 p-2 z-50 animate-slide-down">
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
                              ? 'bg-[#F97316] text-white font-bold shadow-sm'
                              : 'text-black dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/10'
                            }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="text-lg leading-none">{lang.flag}</span>
                            <span className="text-left">
                              <span className="block font-semibold">{lang.nativeName}</span>
                              <span className={`block text-[10px] ${isSelected ? 'text-white/80' : 'text-neutral-400'}`}>{lang.country}</span>
                            </span>
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-white" />}
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
              className={`w-10 h-10 rounded-xl border transition-all duration-300 flex items-center justify-center flex-shrink-0 ${isSolidNav
                  ? 'bg-neutral-100 dark:bg-white/10 border-black/10 dark:border-white/15 text-black dark:text-[#F97316] hover:border-[#F97316]'
                  : 'bg-black/40 backdrop-blur-md border-white/25 text-[#F97316] hover:border-[#F97316] hover:bg-black/60'
                }`}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-[#F97316] transition-transform duration-500" />
              ) : (
                <Moon className="w-4 h-4 text-current transition-transform duration-500" />
              )}
            </button>

            {/* Plan My Visit CTA Button */}
            <Link
              to="/plan-my-visit"
              className="bg-[#F97316] hover:bg-[#EA580C] text-white px-4 xl:px-5 py-2.5 rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 text-[11px] xl:text-xs uppercase tracking-wider shadow-md shadow-[#F97316]/25 flex items-center gap-1.5 whitespace-nowrap flex-shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Plan My Visit</span>
              <ArrowRight className="w-3.5 h-3.5" />
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
                              ? 'bg-[#F97316] text-white font-bold'
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
                  ? 'bg-neutral-100 dark:bg-white/10 border-black/10 dark:border-white/15 text-black dark:text-[#F97316]'
                  : 'bg-black/45 backdrop-blur-md border-white/25 text-[#F97316]'
                }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={isMobileMenuOpen}
              className="h-9 sm:h-10 px-3 rounded-xl bg-[#F97316]/80 hover:bg-[#F97316]/95 backdrop-blur-md border border-white/30 dark:border-[#F97316]/50 text-white font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#F97316]/20 active:scale-95 flex-shrink-0"
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
          className={`fixed top-2.5 right-2.5 bottom-2.5 w-[86vw] max-w-[370px] h-[calc(100dvh-20px)] rounded-3xl overflow-hidden bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-xl text-black dark:text-white border-2 border-[#F97316]/40 dark:border-[#F97316]/45 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-[110%]'
            }`}
        >
          {/* Top Orange Brand Accent Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#F97316]/80 via-[#EA580C]/75 to-black flex-shrink-0" />

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
              className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-white/10 border border-black/15 dark:border-white/15 hover:bg-[#F97316]/80 hover:text-white dark:hover:bg-[#F97316]/80 text-black dark:text-white flex items-center justify-center transition-colors"
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
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#F97316]/90">
                  <ShieldCheck className="w-3 h-3" /> TTB Licensed
                </span>
              </div>

              <nav className="space-y-2" aria-label="Mobile Primary Navigation">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      end={link.path === '/'}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `group flex items-center justify-between p-3 rounded-2xl transition-all duration-200 border ${isActive
                          ? 'bg-[#F97316]/80 text-white border-[#F97316]/90 shadow-md shadow-[#F97316]/15'
                          : 'bg-neutral-50 dark:bg-[#121212] text-black dark:text-white border-black/15 dark:border-white/15 hover:border-[#F97316]/50 hover:bg-neutral-100 dark:hover:bg-white/10'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${isActive
                                  ? 'bg-black/20 text-white border border-white/25'
                                  : 'bg-white dark:bg-black text-[#F97316]/90 border border-black/15 dark:border-white/15 group-hover:bg-[#F97316]/80 group-hover:text-white'
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
                            className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5 ${isActive ? 'text-white' : 'text-neutral-400 group-hover:text-[#F97316]'
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
                <Sparkles className="w-3.5 h-3.5 text-[#F97316]/90" />
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
                    className="px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#121212] hover:bg-[#F97316]/80 hover:text-white dark:hover:bg-[#F97316]/80 text-black dark:text-neutral-200 border border-black/15 dark:border-white/15 hover:border-[#F97316]/70 text-xs font-bold transition-all flex items-center justify-between"
                  >
                    <span className="truncate">{cat.label}</span>
                    <ArrowRight className="w-3 h-3 text-[#F97316]/90 group-hover:text-white flex-shrink-0" />
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
                      ? 'bg-[#F97316]/80 text-white shadow-sm border border-[#F97316]/90'
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
                      ? 'bg-[#F97316]/80 text-white shadow-sm border border-[#F97316]/90'
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
                    <Globe className="w-4 h-4 text-[#F97316]/90" />
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
                              ? 'bg-[#F97316]/80 border-[#F97316] text-white font-bold'
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
                href="tel:+255785341091"
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/15 dark:border-white/15 hover:border-[#F97316]/70 transition-colors truncate"
              >
                <Phone className="w-3.5 h-3.5 text-[#F97316]/90 flex-shrink-0" />
                <span className="truncate">+255 785 341 091</span>
              </a>
              <a
                href="mailto:gabrielzablon6@gmail.com"
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/15 dark:border-white/15 hover:border-[#F97316]/70 transition-colors truncate"
              >
                <Mail className="w-3.5 h-3.5 text-[#F97316]/90 flex-shrink-0" />
                <span className="truncate">gabrielzablon6@gmail.com</span>
              </a>
            </div>

            <Link
              to="/plan-my-visit"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-[#F97316]/85 hover:bg-[#F97316] border border-[#F97316] text-white px-5 py-3.5 rounded-xl font-extrabold shadow-lg shadow-[#F97316]/20 transition-all text-xs uppercase tracking-wider active:scale-98"
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

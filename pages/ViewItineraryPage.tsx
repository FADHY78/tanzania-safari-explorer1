import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Clock, Users, MapPin, CheckCircle, XCircle, Camera, 
  Utensils, MessageCircle, Phone, Mail, Share2, Compass, Check, 
  Home, ChevronRight, Maximize2, X, Eye
} from 'lucide-react';
import { useLiveTour } from '../services/tourService';
import { useSiteSettings } from '../services/siteSettingsService';
import BookingModal from '../components/BookingModal';
import ShareItineraryModal from '../components/ShareItineraryModal';

const ViewItineraryPage: React.FC = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const tour = useLiveTour(tourId);
  const { company } = useSiteSettings();
  
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [imageFitMode, setImageFitMode] = useState<'cover' | 'contain'>('cover');

  const handleShare = () => {
    setIsShareOpen(true);
  };

  if (!tour) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] pt-28 pb-20 text-center px-4">
        <div className="max-w-md mx-auto p-8 bg-neutral-50 dark:bg-[#121212] rounded-3xl border border-black/10 dark:border-white/10 shadow-xl">
          <h1 className="text-3xl font-serif font-bold text-black dark:text-white mb-2">Safari Not Found</h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">The package you're looking for doesn't exist or has moved.</p>
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold hover:bg-brand-orange text-white rounded-xl font-bold text-sm shadow-md transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Tours
          </Link>
        </div>
      </div>
    );
  }

  const heroImageUrl = tour.coverImage || tour.image || 'https://images.unsplash.com/photo-1583421664367-15c7cfd6f0f6?q=80&w=1600';

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-black dark:text-white transition-colors duration-300">
      {/* ─── DEDICATED LUXURY TOP NAVIGATION & BREADCRUMBS BAR ─── */}
      <div className="bg-white/95 dark:bg-[#0E0C0A]/95 border-b border-black/10 dark:border-white/10 backdrop-blur-xl sticky top-[60px] sm:top-[68px] z-30 transition-colors shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Prominent Back Button */}
          <Link
            to="/tours"
            className="group inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-brand-gold text-black dark:text-white hover:text-white text-xs sm:text-sm font-bold border border-black/10 dark:border-white/15 hover:border-brand-gold shadow-sm hover:shadow-lg hover:shadow-brand-gold/30 transition-all duration-200 active:scale-95"
            aria-label="Back to Tours"
          >
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black/10 dark:bg-black/40 group-hover:bg-white/20 flex items-center justify-center transition-colors">
              <ArrowLeft className="w-3.5 h-3.5 text-brand-gold group-hover:text-white transition-transform duration-200 group-hover:-translate-x-0.5" />
            </span>
            <span>Back to All Tours</span>
          </Link>

          {/* Quick Actions (Share + Instant WhatsApp Concierge) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-brand-gold/20 text-neutral-700 dark:text-neutral-200 hover:text-brand-gold text-xs font-semibold border border-black/10 dark:border-white/10 transition-colors"
              title="Share itinerary"
            >
              <Share2 className="w-3.5 h-3.5 text-brand-gold" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <a
              href={`https://wa.me/${company.whatsapp || '255785341091'}?text=${encodeURIComponent(`Hello Embuat Safaris! I'm interested in the "${tour.name}" (${tour.duration}). Could you share availability and booking details?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white text-xs font-bold border border-[#25D366]/30 transition-all shadow-sm"
              title="Inquire via WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── MAJESTIC HERO SECTION (PROPORTIONAL & NOT AGGRESSIVELY ZOOMED) ─── */}
      <div className="relative min-h-[480px] sm:min-h-[560px] lg:h-[65vh] max-h-[760px] flex items-end overflow-hidden pb-8 sm:pb-12">
        {/* Ambient Blurred Background (fills widescreen without forcing foreground crop) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={heroImageUrl}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover blur-3xl scale-125 opacity-35 brightness-75 transition-all duration-700"
          />
        </div>

        {/* Primary Hero Photograph - Top-Focal Centered so Wildlife & Peaks Are Never Cut Off */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroImageUrl}
            alt={tour.name}
            onError={(e) => {
              const target = e.currentTarget;
              if (tour.image && target.src !== tour.image) {
                target.src = tour.image;
              } else {
                target.src = 'https://images.unsplash.com/photo-1583421664367-15c7cfd6f0f6?q=80&w=1600';
              }
            }}
            className={`w-full h-full transition-all duration-500 ${
              imageFitMode === 'contain'
                ? 'object-contain p-4 sm:p-8 backdrop-blur-md'
                : 'object-cover object-[center_28%] sm:object-[center_32%]'
            }`}
          />
        </div>

        {/* Subtle Cinematic Vignette (Crisp image visible through the center, dark at bottom for text) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/25 pointer-events-none"></div>

        {/* Floating Hero Image Controls (Full Photo Lightbox + Framing Mode) */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setImageFitMode(prev => prev === 'cover' ? 'contain' : 'cover')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 hover:border-brand-gold text-white hover:text-brand-gold text-xs font-semibold shadow-lg transition-all"
            title={imageFitMode === 'cover' ? 'Fit complete photo inside frame' : 'Fill hero banner'}
          >
            <Eye className="w-3.5 h-3.5 text-brand-gold" />
            <span className="hidden sm:inline">{imageFitMode === 'cover' ? 'Fit Full Photo' : 'Fill View'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPhotoModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 hover:border-brand-gold text-white hover:text-brand-gold text-xs font-semibold shadow-lg transition-all group"
            title="Open high-resolution uncropped photo"
          >
            <Camera className="w-3.5 h-3.5 text-brand-gold group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">View High-Res</span>
            <Maximize2 className="w-3 h-3 opacity-60" />
          </button>
        </div>

        {/* Hero Bottom Content & Typography */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full text-white z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
            {tour.badge && (
              <span className="px-3 py-1 bg-brand-gold text-white text-[10px] sm:text-xs font-bold rounded-full shadow-md uppercase tracking-wider">
                {tour.badge}
              </span>
            )}
            <span className="px-3 py-1 bg-black/70 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold rounded-full border border-white/25">
              {tour.category}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold mb-3 sm:mb-4 leading-tight drop-shadow-lg max-w-4xl">
            {tour.name}
          </h1>

          <div className="flex flex-wrap items-center gap-2 sm:gap-6 text-xs sm:text-sm text-white/95">
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold flex-shrink-0" />
              <span className="font-semibold">{tour.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold flex-shrink-0" />
              <span>{tour.groupSize || 'Private 4x4 Custom Tour'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold flex-shrink-0" />
              <span>{tour.location || 'Tanzania Wildlife Ecosystem'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── FULL HIGH-RES PHOTO LIGHTBOX MODAL ─── */}
      {isPhotoModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsPhotoModalOpen(false)}
        >
          {/* Top Bar with Title & Close Button */}
          <div className="flex items-center justify-between text-white pb-4 border-b border-white/10" onClick={(e) => e.stopPropagation()}>
            <div className="min-w-0 pr-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold block">{tour.category} Expedition</span>
              <h3 className="font-serif font-bold text-base sm:text-xl truncate text-white">{tour.name}</h3>
            </div>
            <button
              type="button"
              onClick={() => setIsPhotoModalOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-brand-gold text-white transition-colors"
              title="Close full photo view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Centered 100% Uncropped High-Res Image */}
          <div className="flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <img
              src={heroImageUrl}
              alt={tour.name}
              className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl ring-1 ring-white/15"
            />
          </div>

          {/* Bottom Bar Info */}
          <div className="text-center text-xs text-white/60 pt-3 border-t border-white/10 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
            <span>Authentic Embuat Safaris Field Photography</span>
            <span className="font-mono text-[11px] text-brand-gold">{tour.duration} • {tour.category}</span>
          </div>
        </div>
      )}

      {/* ─── MAIN CONTENT SECTION ─── */}
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 py-8 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">

          {/* Main Content (Overview, Highlights, Itinerary, Inclusions) */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">

            {/* Overview */}
            <div className="bg-neutral-50 dark:bg-[#121212] rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 p-4 sm:p-8 shadow-sm">
              <div className="flex items-center gap-1.5 sm:gap-2 text-brand-gold font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-1.5 sm:mb-2">
                <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" /> Expedition Summary
              </div>
              <h2 className="text-xl sm:text-3xl font-serif font-bold text-black dark:text-white mb-4 sm:mb-6">Tour Overview</h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
                <div className="p-3 sm:p-4 bg-white dark:bg-[#0A0A0A] rounded-xl sm:rounded-2xl border border-black/10 dark:border-white/10">
                  <p className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-semibold">Duration</p>
                  <p className="font-bold text-black dark:text-white text-xs sm:text-base mt-0.5 leading-snug">{tour.duration}</p>
                </div>
                <div className="p-3 sm:p-4 bg-white dark:bg-[#0A0A0A] rounded-xl sm:rounded-2xl border border-black/10 dark:border-white/10">
                  <p className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-semibold">Category</p>
                  <p className="font-bold text-black dark:text-white text-xs sm:text-base mt-0.5 leading-snug">{tour.category}</p>
                </div>
                <div className="p-3 sm:p-4 bg-white dark:bg-[#0A0A0A] rounded-xl sm:rounded-2xl border border-black/10 dark:border-white/10">
                  <p className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-semibold">Starting From</p>
                  <p className="font-bold text-brand-gold text-xs sm:text-base mt-0.5 leading-snug">${tour.fromPrice}</p>
                </div>
                <div className="p-3 sm:p-4 bg-white dark:bg-[#0A0A0A] rounded-xl sm:rounded-2xl border border-black/10 dark:border-white/10">
                  <p className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-semibold">Departure Hub</p>
                  <p className="font-bold text-black dark:text-white text-xs sm:text-base mt-0.5 leading-snug">{tour.category.toLowerCase().includes('zanzibar') ? 'Zanzibar' : 'Arusha / Moshi'}</p>
                </div>
              </div>

              {/* Highlights */}
              <h3 className="text-base sm:text-xl font-serif font-bold text-black dark:text-white mb-3 sm:mb-4">Tour Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {tour.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2.5 p-3 rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10">
                    <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-snug">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Itinerary */}
            <div className="bg-neutral-50 dark:bg-[#121212] rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 p-4 sm:p-8 shadow-sm">
              <div className="flex items-center gap-1.5 sm:gap-2 text-brand-gold font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-1.5 sm:mb-2">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" /> Day-by-Day Breakdown
              </div>
              <h2 className="text-xl sm:text-3xl font-serif font-bold text-black dark:text-white mb-5 sm:mb-8">Detailed Itinerary</h2>
              <div className="space-y-4 sm:space-y-8 relative">
                <div className="absolute left-3.5 sm:left-4 top-4 bottom-4 w-0.5 bg-brand-gold/30"></div>
                {tour.itinerary.map((day, index) => (
                  <div key={index} className="relative pl-9 sm:pl-12">
                    <div className="absolute left-0 top-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-brand-gold text-white flex items-center justify-center text-[11px] sm:text-xs font-extrabold shadow-md">
                      {day.day}
                    </div>
                    <div className="bg-white dark:bg-[#0A0A0A] p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-black/10 dark:border-white/10">
                      <h3 className="text-sm sm:text-lg font-serif font-bold text-black dark:text-white mb-1.5 sm:mb-2 leading-snug">{day.title}</h3>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-light mb-3 sm:mb-4">{day.activities}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-[11px] sm:text-xs border-t border-black/10 dark:border-white/10 pt-2.5 sm:pt-3">
                        <div className="flex items-start gap-1.5 text-black dark:text-neutral-300">
                          <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <span className="font-semibold">Lodge / Camp: </span>
                            <span className="text-neutral-500 dark:text-neutral-400 break-words">{day.accommodation}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5 text-black dark:text-neutral-300">
                          <Utensils className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <span className="font-semibold">Catering: </span>
                            <span className="text-neutral-500 dark:text-neutral-400 break-words">{day.meals}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Included & Not Included */}
            <div className="bg-neutral-50 dark:bg-[#121212] rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 p-4 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-3xl font-serif font-bold text-black dark:text-white mb-4 sm:mb-6">Package Inclusions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-brand-gold flex items-center gap-2 mb-3 sm:mb-4">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" /> What's Included
                  </h3>
                  <div className="space-y-2">
                    {tour.included.map((item, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-snug">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5 flex-shrink-0"></span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-black dark:text-white flex items-center gap-2 mb-3 sm:mb-4">
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-500 flex-shrink-0" /> What's Not Included
                  </h3>
                  <div className="space-y-2">
                    {tour.notIncluded.map((item, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-snug">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 flex-shrink-0"></span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar (Booking, Pricing, Concierge) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-5 sm:space-y-6">
              {/* Pricing & Booking Card */}
              <div className="bg-neutral-50 dark:bg-[#121212] rounded-2xl sm:rounded-3xl border border-black/15 dark:border-white/15 p-4 sm:p-8 shadow-xl">
                <div className="text-center mb-4 sm:mb-6">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-brand-gold font-bold">Starting Price</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-brand-gold mt-0.5 sm:mt-1">
                    ${tour.fromPrice}
                  </div>
                  <div className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">per person sharing / all inclusive</div>
                </div>

                <div className="space-y-2.5 mb-5 sm:mb-6 p-3.5 sm:p-4 bg-white dark:bg-[#0A0A0A] rounded-xl sm:rounded-2xl border border-black/10 dark:border-white/10 text-[11px] sm:text-xs">
                  <div className="flex justify-between gap-2">
                    <span className="text-neutral-500 dark:text-neutral-400">Duration:</span>
                    <span className="font-bold text-black dark:text-white text-right">{tour.duration}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-neutral-500 dark:text-neutral-400">Group Format:</span>
                    <span className="font-bold text-black dark:text-white text-right">Private 4x4 Land Cruiser</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-neutral-500 dark:text-neutral-400">Guides:</span>
                    <span className="font-bold text-black dark:text-white text-right">English (French/German on req)</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-neutral-500 dark:text-neutral-400">Flexibility:</span>
                    <span className="font-bold text-brand-gold text-right">100% Customizable</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full bg-brand-gold hover:bg-brand-orange text-white py-3 sm:py-3.5 rounded-xl font-bold text-center text-xs sm:text-sm block hover:shadow-xl hover:shadow-brand-gold/30 transition-all mb-2.5 sm:mb-3 cursor-pointer"
                >
                  Book This Safari
                </button>

                <Link
                  to="/plan-my-visit"
                  className="w-full border-2 border-black dark:border-white text-black dark:text-white py-3 sm:py-3.5 rounded-xl font-bold text-center text-xs sm:text-sm block hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors mb-2.5"
                >
                  Customize Itinerary
                </Link>

                <button
                  type="button"
                  onClick={() => setIsShareOpen(true)}
                  className="w-full bg-neutral-100 dark:bg-white/10 hover:bg-brand-gold/15 text-black dark:text-white hover:text-brand-gold py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-black/10 dark:border-white/10 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Share Itinerary with Photos</span>
                </button>
              </div>

              {/* Direct Help Card */}
              <div className="bg-neutral-50 dark:bg-[#121212] rounded-3xl border border-black/10 dark:border-white/10 p-6 shadow-md">
                <h3 className="font-serif font-bold text-black dark:text-white text-base mb-3">Speak to a Safari Designer</h3>
                <div className="space-y-3 text-xs">
                  <a href={`tel:${(company.phone || '+255785341091').replace(/\s/g, '')}`} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 hover:border-brand-gold transition-colors">
                    <Phone className="w-4 h-4 text-brand-gold" />
                    <div>
                      <span className="text-neutral-500 dark:text-neutral-400">Call Us:</span>
                      <p className="font-bold text-black dark:text-white">{company.phone || '+255 785 341 091'}</p>
                    </div>
                  </a>
                  <a href={`https://wa.me/${company.whatsapp || '255785341091'}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 hover:border-brand-gold transition-colors">
                    <MessageCircle className="w-4 h-4 text-brand-gold" />
                    <div>
                      <span className="text-neutral-500 dark:text-neutral-400">WhatsApp:</span>
                      <p className="font-bold text-black dark:text-white">+{company.whatsapp || '255 785 341 091'}</p>
                    </div>
                  </a>
                  <a href={`mailto:${company.email || 'embuatsafaris@gmail.com'}`} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 hover:border-brand-gold transition-colors">
                    <Mail className="w-4 h-4 text-brand-gold" />
                    <div>
                      <span className="text-neutral-500 dark:text-neutral-400">Email:</span>
                      <p className="font-bold text-black dark:text-white">{company.email || 'embuatsafaris@gmail.com'}</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        tour={tour}
      />

      <ShareItineraryModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        tour={tour}
      />
    </div>
  );
};

export default ViewItineraryPage;

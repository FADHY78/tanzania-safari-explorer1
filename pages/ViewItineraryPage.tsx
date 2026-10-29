import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, MapPin, CheckCircle, XCircle, Camera, Utensils, MessageCircle, Phone, Mail, Share2, Compass, Check } from 'lucide-react';
import { useLiveTour } from '../services/tourService';
import BookingModal from '../components/BookingModal';
import ShareItineraryModal from '../components/ShareItineraryModal';

const ViewItineraryPage: React.FC = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const tour = useLiveTour(tourId);
  const [copied, setCopied] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

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
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All 84 Tours
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-black dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative min-h-[420px] sm:min-h-[460px] h-auto sm:h-[55vh] flex items-end overflow-hidden pt-24 sm:pt-28 pb-6 sm:pb-12">
        <img
          src={tour.coverImage || tour.image || 'https://images.unsplash.com/photo-1583421664367-15c7cfd6f0f6?q=80&w=1600'}
          alt={tour.name}
          onError={(e) => {
            const target = e.currentTarget;
            if (tour.image && target.src !== tour.image) {
              target.src = tour.image;
            } else {
              target.src = 'https://images.unsplash.com/photo-1583421664367-15c7cfd6f0f6?q=80&w=1600';
            }
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/45"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full text-white">
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
            <Link
              to="/tours"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-white hover:text-[#F97316] text-[11px] sm:text-sm font-semibold transition-colors bg-black/65 backdrop-blur-md px-3 sm:px-3.5 py-1.5 rounded-xl sm:rounded-full border border-white/20"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Back to Tours
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
            {tour.badge && (
              <span className="px-2.5 sm:px-3 py-1 bg-[#F97316]/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold rounded-lg sm:rounded-full shadow-md leading-tight">
                {tour.badge}
              </span>
            )}
            <span className="px-2.5 sm:px-3 py-1 bg-black/70 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold rounded-lg sm:rounded-full border border-white/25 leading-tight">
              {tour.category}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold mb-3 sm:mb-4 leading-tight drop-shadow-md">{tour.name}</h1>

          <div className="flex flex-wrap items-center gap-2 sm:gap-6 text-[11px] sm:text-sm text-white/90">
            <div className="flex items-center gap-1.5 bg-black/55 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/15 sm:bg-transparent sm:p-0 sm:border-0">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F97316] flex-shrink-0" />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/55 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/15 sm:bg-transparent sm:p-0 sm:border-0">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F97316] flex-shrink-0" />
              <span>{tour.groupSize || 'Private / Small Group'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/55 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/15 sm:bg-transparent sm:p-0 sm:border-0">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F97316] flex-shrink-0" />
              <span>{tour.location || 'Tanzania Wildlife Sanctuaries'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 py-8 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">

            {/* Overview */}
            <div className="bg-neutral-50 dark:bg-[#121212] rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 p-4 sm:p-8 shadow-sm">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[#F97316] font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-1.5 sm:mb-2">
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
                  <p className="font-bold text-[#F97316] text-xs sm:text-base mt-0.5 leading-snug">${tour.fromPrice}</p>
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
                    <CheckCircle className="w-4 h-4 text-[#F97316] flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-snug">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Itinerary */}
            <div className="bg-neutral-50 dark:bg-[#121212] rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 p-4 sm:p-8 shadow-sm">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[#F97316] font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-1.5 sm:mb-2">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" /> Day-by-Day Breakdown
              </div>
              <h2 className="text-xl sm:text-3xl font-serif font-bold text-black dark:text-white mb-5 sm:mb-8">Detailed Itinerary</h2>
              <div className="space-y-4 sm:space-y-8 relative">
                <div className="absolute left-3.5 sm:left-4 top-4 bottom-4 w-0.5 bg-[#F97316]/30"></div>
                {tour.itinerary.map((day, index) => (
                  <div key={index} className="relative pl-9 sm:pl-12">
                    <div className="absolute left-0 top-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#F97316] text-white flex items-center justify-center text-[11px] sm:text-xs font-extrabold shadow-md">
                      {day.day}
                    </div>
                    <div className="bg-white dark:bg-[#0A0A0A] p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-black/10 dark:border-white/10">
                      <h3 className="text-sm sm:text-lg font-serif font-bold text-black dark:text-white mb-1.5 sm:mb-2 leading-snug">{day.title}</h3>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-light mb-3 sm:mb-4">{day.activities}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-[11px] sm:text-xs border-t border-black/10 dark:border-white/10 pt-2.5 sm:pt-3">
                        <div className="flex items-start gap-1.5 text-black dark:text-neutral-300">
                          <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F97316] flex-shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <span className="font-semibold">Lodge / Camp: </span>
                            <span className="text-neutral-500 dark:text-neutral-400 break-words">{day.accommodation}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5 text-black dark:text-neutral-300">
                          <Utensils className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F97316] flex-shrink-0 mt-0.5" />
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
                  <h3 className="text-sm sm:text-base font-bold text-[#F97316] flex items-center gap-2 mb-3 sm:mb-4">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" /> What's Included
                  </h3>
                  <div className="space-y-2">
                    {tour.included.map((item, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-snug">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] mt-1.5 flex-shrink-0"></span>
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

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-5 sm:space-y-6">
              {/* Pricing & Booking Card */}
              <div className="bg-neutral-50 dark:bg-[#121212] rounded-2xl sm:rounded-3xl border border-black/15 dark:border-white/15 p-4 sm:p-8 shadow-xl">
                <div className="text-center mb-4 sm:mb-6">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#F97316] font-bold">Starting Price</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#F97316] mt-0.5 sm:mt-1">
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
                    <span className="font-bold text-[#F97316] text-right">100% Customizable</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white py-3 sm:py-3.5 rounded-xl font-bold text-center text-xs sm:text-sm block hover:shadow-xl hover:shadow-[#F97316]/30 transition-all mb-2.5 sm:mb-3 cursor-pointer"
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
                  className="w-full bg-neutral-100 dark:bg-white/10 hover:bg-[#F97316]/15 text-black dark:text-white hover:text-[#F97316] py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-black/10 dark:border-white/10 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>Share Itinerary with Photos</span>
                </button>
              </div>

              {/* Direct Help Card */}
              <div className="bg-neutral-50 dark:bg-[#121212] rounded-3xl border border-black/10 dark:border-white/10 p-6 shadow-md">
                <h3 className="font-serif font-bold text-black dark:text-white text-base mb-3">Speak to a Safari Designer</h3>
                <div className="space-y-3 text-xs">
                  <a href="tel:+255785341091" className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 hover:border-[#F97316] transition-colors">
                    <Phone className="w-4 h-4 text-[#F97316]" />
                    <div>
                      <span className="text-neutral-500 dark:text-neutral-400">Call Us:</span>
                      <p className="font-bold text-black dark:text-white">+255 785 341 091</p>
                    </div>
                  </a>
                  <a href="https://wa.me/255785341091" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 hover:border-[#F97316] transition-colors">
                    <MessageCircle className="w-4 h-4 text-[#F97316]" />
                    <div>
                      <span className="text-neutral-500 dark:text-neutral-400">WhatsApp:</span>
                      <p className="font-bold text-black dark:text-white">+255 785 341 091</p>
                    </div>
                  </a>
                  <a href="mailto:gabrielzablon6@gmail.com" className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 hover:border-[#F97316] transition-colors">
                    <Mail className="w-4 h-4 text-[#F97316]" />
                    <div>
                      <span className="text-neutral-500 dark:text-neutral-400">Email:</span>
                      <p className="font-bold text-black dark:text-white">gabrielzablon6@gmail.com</p>
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

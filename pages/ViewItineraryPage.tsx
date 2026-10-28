import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, MapPin, Calendar, CheckCircle, XCircle, Star, Camera, Utensils, MessageCircle, Phone, Mail, Share2, Compass, Check } from 'lucide-react';
import { useLiveTour } from '../services/tourService';
import { TourPackage } from '../types';
import BookingModal from '../components/BookingModal';

const ViewItineraryPage: React.FC = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const tour = useLiveTour(tourId);
  const [copied, setCopied] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tour ? `${tour.name} - Embuat Safaris` : 'Embuat Safaris',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!tour) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#120F0D] pt-28 pb-20 text-center px-4">
        <div className="max-w-md mx-auto p-8 bg-white dark:bg-[#1B1613] rounded-3xl border border-amber-900/10 dark:border-[#2C241E] shadow-xl">
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">Safari Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">The package you're looking for doesn't exist or has moved.</p>
          <Link 
            to="/tours" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#DE6826] to-[#C08240] text-white rounded-xl font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All 84 Tours
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#120F0D] text-gray-800 dark:text-[#E8E1D9] transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative min-h-[420px] h-[55vh] flex items-end overflow-hidden pt-20">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/40"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full pb-10 sm:pb-12 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <Link 
              to="/tours" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-[#F5C478] text-xs sm:text-sm font-semibold transition-colors bg-black/30 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Tours
            </Link>
            <button 
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs text-white/90 bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Share Itinerary'}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            {tour.badge && (
              <span className="px-3 py-1 bg-gradient-to-r from-[#DE6826] to-[#C08240] text-white text-xs font-bold rounded-full shadow-md">
                {tour.badge}
              </span>
            )}
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/25">
              {tour.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight drop-shadow-md">{tour.name}</h1>
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/85">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#F5C478]" />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#F5C478]" />
              <span>{tour.groupSize || 'Private / Small Group'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#F5C478]" />
              <span>{tour.location || 'Tanzania Wildlife Sanctuaries'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Overview */}
            <div className="bg-white dark:bg-[#1B1613] rounded-3xl border border-amber-900/10 dark:border-[#2C241E] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 text-[#DE6826] dark:text-[#F5C478] font-bold text-xs uppercase tracking-widest mb-2">
                <Compass className="w-4 h-4" /> Expedition Summary
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white mb-6">Tour Overview</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 p-4 bg-[#FAF7F2] dark:bg-[#120F0D] rounded-2xl border border-amber-900/10 dark:border-[#2C241E]">
                <div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Duration</p>
                  <p className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mt-0.5">{tour.duration}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Category</p>
                  <p className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mt-0.5">{tour.category}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Starting From</p>
                  <p className="font-bold text-[#DE6826] dark:text-[#F5C478] text-sm sm:text-base mt-0.5">${tour.fromPrice}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Departure Hub</p>
                  <p className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mt-0.5">{tour.category.toLowerCase().includes('zanzibar') ? 'Zanzibar' : 'Arusha / Moshi'}</p>
                </div>
              </div>

              {/* Highlights */}
              <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">Tour Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tour.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#120F0D] border border-amber-900/10 dark:border-[#2C241E]">
                    <CheckCircle className="w-4 h-4 text-[#DE6826] dark:text-[#F5C478] flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-snug">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Itinerary */}
            <div className="bg-white dark:bg-[#1B1613] rounded-3xl border border-amber-900/10 dark:border-[#2C241E] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 text-[#DE6826] dark:text-[#F5C478] font-bold text-xs uppercase tracking-widest mb-2">
                <Clock className="w-4 h-4" /> Day-by-Day Breakdown
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white mb-8">Detailed Itinerary</h2>
              <div className="space-y-8 relative">
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#DE6826] via-[#D48B28] to-[#C08240] opacity-25"></div>
                {tour.itinerary.map((day, index) => (
                  <div key={index} className="relative pl-10 sm:pl-12">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-xl bg-gradient-to-br from-[#DE6826] to-[#C08240] text-white flex items-center justify-center text-xs font-extrabold shadow-md">
                      {day.day}
                    </div>
                    <div className="bg-[#FAF7F2] dark:bg-[#120F0D] p-5 sm:p-6 rounded-2xl border border-amber-900/10 dark:border-[#2C241E]">
                      <h3 className="text-lg font-serif font-bold text-gray-900 dark:text-white mb-2">{day.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-light mb-4">{day.activities}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs border-t border-amber-900/10 dark:border-[#2C241E] pt-3">
                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <Camera className="w-4 h-4 text-[#DE6826] flex-shrink-0" />
                          <span className="font-semibold">Lodge / Camp:</span>
                          <span className="text-gray-500 dark:text-gray-400 truncate">{day.accommodation}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <Utensils className="w-4 h-4 text-[#DE6826] flex-shrink-0" />
                          <span className="font-semibold">Catering:</span>
                          <span className="text-gray-500 dark:text-gray-400">{day.meals}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Included & Not Included */}
            <div className="bg-white dark:bg-[#1B1613] rounded-3xl border border-amber-900/10 dark:border-[#2C241E] p-6 sm:p-8 shadow-sm">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white mb-6">Package Inclusions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-base font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5" /> What's Included
                  </h3>
                  <div className="space-y-2.5">
                    {tour.included.map((item, index) => (
                      <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-snug">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-rose-500 dark:text-rose-400 flex items-center gap-2 mb-4">
                    <XCircle className="w-5 h-5" /> What's Not Included
                  </h3>
                  <div className="space-y-2.5">
                    {tour.notIncluded.map((item, index) => (
                      <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-snug">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0"></span>
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
            <div className="sticky top-28 space-y-6">
              {/* Pricing & Booking Card */}
              <div className="bg-white dark:bg-[#1B1613] rounded-3xl border border-amber-900/10 dark:border-[#2C241E] p-6 sm:p-8 shadow-xl">
                <div className="text-center mb-6">
                  <span className="text-[11px] uppercase tracking-widest text-[#DE6826] dark:text-[#F5C478] font-bold">Starting Price</span>
                  <div className="text-4xl font-extrabold bg-gradient-to-r from-[#DE6826] via-[#D48B28] to-[#C08240] bg-clip-text text-transparent mt-1">
                    ${tour.fromPrice}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">per person sharing / all inclusive</div>
                </div>
                
                <div className="space-y-3 mb-6 p-4 bg-[#FAF7F2] dark:bg-[#120F0D] rounded-2xl border border-amber-900/10 dark:border-[#2C241E] text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{tour.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Group Format:</span>
                    <span className="font-bold text-gray-900 dark:text-white">Private 4x4 Land Cruiser</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Guides:</span>
                    <span className="font-bold text-gray-900 dark:text-white">English (French/German on req)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Flexibility:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">100% Customizable</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full bg-gradient-to-r from-[#DE6826] via-[#D48B28] to-[#C08240] text-white py-3.5 rounded-xl font-bold text-center text-sm block hover:shadow-xl hover:shadow-[#DE6826]/30 transition-all mb-3 cursor-pointer"
                >
                  Book This Safari
                </button>
                
                <Link
                  to="/contact"
                  className="w-full border border-amber-900/20 dark:border-[#2C241E] text-gray-800 dark:text-[#E8E1D9] py-3.5 rounded-xl font-bold text-center text-sm block hover:border-[#DE6826] hover:text-[#DE6826] transition-colors"
                >
                  Customize Itinerary
                </Link>
              </div>

              {/* Direct Help Card */}
              <div className="bg-white dark:bg-[#1B1613] rounded-3xl border border-amber-900/10 dark:border-[#2C241E] p-6 shadow-md">
                <h3 className="font-serif font-bold text-gray-900 dark:text-white text-base mb-3">Speak to a Safari Designer</h3>
                <div className="space-y-3 text-xs">
                  <a href="tel:+255753997777" className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#120F0D] hover:bg-[#DE6826]/10 transition-colors">
                    <Phone className="w-4 h-4 text-[#DE6826]" />
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Call Us:</span>
                      <p className="font-bold text-gray-900 dark:text-white">+255 753 997 777</p>
                    </div>
                  </a>
                  <a href="https://wa.me/255753997777" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#120F0D] hover:bg-[#25D366]/10 transition-colors">
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">WhatsApp:</span>
                      <p className="font-bold text-gray-900 dark:text-white">+255 753 997 777</p>
                    </div>
                  </a>
                  <a href="mailto:info@embuatsafaris.com" className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#120F0D] hover:bg-[#DE6826]/10 transition-colors">
                    <Mail className="w-4 h-4 text-[#DE6826]" />
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Email:</span>
                      <p className="font-bold text-gray-900 dark:text-white">info@embuatsafaris.com</p>
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
    </div>
  );
};

export default ViewItineraryPage;
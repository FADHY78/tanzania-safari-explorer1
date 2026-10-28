import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TourPackage } from '../types';
import { useLanguage } from '../context/LanguageContext';
import BookingModal from './BookingModal';

interface TourCardProps {
  tour: TourPackage;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const { t } = useLanguage();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  return (
    <div className="bg-white dark:bg-[#1B1613] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-[#2C241E] flex flex-col group">
      {/* Image Section */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img 
          src={tour.image || tour.coverImage || 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200'} 
          alt={tour.name} 
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            if (tour.coverImage && target.src !== tour.coverImage) {
              target.src = tour.coverImage;
            } else if (tour.category === 'Zanzibar') {
              target.src = 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/zanzibar-beach-view-1024x576.jpg';
            } else {
              target.src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200';
            }
          }}
          className={`w-full h-full object-cover transition-all duration-700 ${
            tour.hoverImage ? 'group-hover:opacity-0 group-hover:scale-105' : 'group-hover:scale-105'
          }`}
        />
        {tour.hoverImage && (
          <img 
            src={tour.hoverImage} 
            alt={`${tour.name} hover preview`}
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-105"
          />
        )}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[85%]">
          <span className="bg-white/95 dark:bg-black/85 backdrop-blur-sm text-gray-800 dark:text-gray-100 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm border border-gray-100 dark:border-white/10">
            {tour.duration}
          </span>
          {tour.subcategory && (
            <span className="bg-[#DE6826] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
              {tour.subcategory}
            </span>
          )}
          {tour.badge && !tour.subcategory && (
            <span className="bg-[#C08240] text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm">
              {tour.badge}
            </span>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 pt-6">
          <span className="text-[#F3C082] text-lg font-bold drop-shadow-md">
            {t('ui.from')} {tour.priceRange}
          </span>
          <p className="text-white/80 text-[10px] font-medium tracking-wide">/{t('ui.person')}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 leading-snug line-clamp-1 mb-2.5 group-hover:text-[#C08240] transition-colors" title={tour.name}>
            {tour.name}
          </h3>
          
          <div className="space-y-1.5 mb-3">
            {tour.highlights.slice(0, 3).map((h, i) => (
              <div key={i} className="flex items-start gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                <svg className="w-3.5 h-3.5 text-[#C08240] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="line-clamp-1">{h}</span>
              </div>
            ))}
          </div>

          {/* Detailed Rates or Promo Note */}
          {tour.rates && tour.rates.length > 0 ? (
            <div className="mb-3 bg-gray-50 dark:bg-white/5 rounded-xl p-2.5 border border-gray-100 dark:border-white/10">
              <p className="text-[9px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1.5 border-b border-gray-200/80 dark:border-white/10 pb-1">
                {t('ui.pricePerPerson') || 'Price Per Person (USD)'}
              </p>
              <div className="grid grid-cols-2 gap-y-1 gap-x-2">
                {tour.rates.map((rate, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[10px]">
                    <span className="text-gray-500 dark:text-gray-400">{rate.pax}</span>
                    <span className="font-bold text-[#C08240] dark:text-[#F3C082]">{rate.currency} {rate.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-3 p-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-800/40 flex items-center justify-between">
              <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
                {t('ui.officialRates') || 'Official Direct Rates'}
              </p>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 italic">
                {t('ui.bestPrice') || 'Best Price Guarantee'}
              </span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="border-t border-gray-100 dark:border-white/10 pt-3 mt-1">
          <div className="flex gap-2">
            <Link 
              to={`/itinerary/${tour.id}`}
              className="flex-1 text-center border border-[#C08240] text-[#C08240] hover:bg-[#C08240] hover:text-white dark:hover:text-white font-bold py-2.5 rounded-xl transition-all text-xs uppercase tracking-wider"
            >
              {t('ui.viewItinerary') || 'Itinerary'}
            </Link>
            <button 
              type="button"
              onClick={() => setIsBookingOpen(true)}
              className="flex-1 text-center bg-gradient-to-r from-[#C08240] to-[#DE6826] hover:opacity-90 text-white font-bold py-2.5 rounded-xl transition-all text-xs uppercase tracking-wider shadow-sm"
            >
              {t('ui.inquire') || 'Book / Quote'}
            </button>
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

export default TourCard;

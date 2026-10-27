
import React from 'react';
import { Link } from 'react-router-dom';
import { TourPackage } from '../types';

interface TourCardProps {
  tour: TourPackage;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={tour.image || tour.coverImage || 'https://images.unsplash.com/photo-1583421664367-15c7cfd6f0f6?q=80&w=1200'} 
          alt={tour.name} 
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            if (tour.coverImage && target.src !== tour.coverImage) {
              target.src = tour.coverImage;
            } else if (tour.category === 'Zanzibar') {
              target.src = 'https://images.unsplash.com/photo-1583421664367-15c7cfd6f0f6?q=80&w=1200';
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
          <span className="bg-white/95 backdrop-blur-sm text-gray-800 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm border border-gray-100">
            {tour.duration}
          </span>
          {tour.subcategory && (
            <span className="bg-[#082f38]/90 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider shadow-sm">
              {tour.subcategory}
            </span>
          )}
          {tour.badge && !tour.subcategory && (
            <span className="bg-[#C08240] text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm">
              {tour.badge}
            </span>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 pt-6">
          <span className="text-white text-lg font-bold drop-shadow-md">
            From {tour.priceRange}
          </span>
          <p className="text-white/80 text-[10px] font-medium tracking-wide">per person</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-1 mb-2.5" title={tour.name}>
            {tour.name}
          </h3>
          
          <div className="space-y-1.5 mb-3">
            {tour.highlights.slice(0, 3).map((h, i) => (
              <div key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                <svg className="w-3.5 h-3.5 text-[#C08240] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="line-clamp-1">{h}</span>
              </div>
            ))}
          </div>

          {/* Detailed Rates or Promo Note */}
          {tour.rates && tour.rates.length > 0 ? (
            <div className="mb-3 bg-gray-50 rounded-lg p-2 border border-gray-100">
              <p className="text-[9px] font-bold text-gray-700 uppercase tracking-widest mb-1 border-b border-gray-200/80 pb-0.5">Price Per Person (USD)</p>
              <div className="grid grid-cols-2 gap-y-1 gap-x-2">
                {tour.rates.map((rate, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[10px]">
                    <span className="text-gray-500">{rate.pax}</span>
                    <span className="font-bold text-[#C08240]">{rate.currency} {rate.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-3 p-2 bg-green-50 rounded-lg border border-green-100 flex items-center justify-between">
              <p className="text-[10px] font-bold text-green-700 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
                Group Savings: 15% Off
              </p>
              <span className="text-[10px] text-gray-500 italic">Seasonal rates</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="border-t border-gray-100 pt-3 mt-1">
          <div className="flex gap-2">
            <Link 
              to={`/itinerary/${tour.id}`}
              className="flex-1 text-center border border-[#C08240] text-[#C08240] hover:bg-[#C08240] hover:text-white font-bold py-2 rounded-lg transition-all text-xs uppercase tracking-wider"
            >
              Itinerary
            </Link>
            <a 
              href="#contact"
              className="flex-1 text-center bg-[#C08240] hover:bg-[#A67134] text-white font-bold py-2 rounded-lg transition-all text-xs uppercase tracking-wider shadow-sm"
            >
              Inquire
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;

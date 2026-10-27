
import React, { useState } from 'react';
import { TOURS } from '../constants';
import { TourCategory } from '../types';
import TourCard from './TourCard';

const ToursSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<TourCategory>('Trekking');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('All');

  const categories: TourCategory[] = ['Trekking', 'Safari', 'Zanzibar', 'Day Trips'];

  const filteredTours = TOURS.filter(t => {
    if (t.category !== activeCategory) return false;
    if (activeCategory === 'Zanzibar' && activeSubcategory !== 'All') {
      return t.subcategory === activeSubcategory;
    }
    return true;
  });

  const handleCategoryChange = (cat: TourCategory) => {
    setActiveCategory(cat);
    setActiveSubcategory('All');
  };

  const zanzibarSubcategories = [
    { id: 'All', label: 'All Zanzibar', count: TOURS.filter(t => t.category === 'Zanzibar').length },
    { id: 'Multi-Day Holidays', label: 'Multi-Day Holidays (2-6 Days)', count: TOURS.filter(t => t.category === 'Zanzibar' && t.subcategory === 'Multi-Day Holidays').length },
    { id: 'Half Day Tours', label: 'Half Day Tours', count: TOURS.filter(t => t.category === 'Zanzibar' && t.subcategory === 'Half Day Tours').length },
    { id: 'Full Day Tours', label: 'Full Day Tours', count: TOURS.filter(t => t.category === 'Zanzibar' && t.subcategory === 'Full Day Tours').length }
  ];

  return (
    <section id="tours" className="py-24 bg-gradient-to-b from-[#FDFBF7] to-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4">
            <h4 className="text-[#C08240] font-bold tracking-widest uppercase text-sm bg-[#C08240]/10 px-4 py-2 rounded-full">Curated Experiences</h4>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Popular Tour Packages</h2>
          <p className="text-gray-600 text-lg">
            Explore Tanzania through different types of adventures. Choose a tour category below to discover the perfect experience for you.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-7 py-3 rounded-full font-semibold transition-all shadow-sm transform hover:scale-105 ${
                activeCategory === cat 
                ? 'bg-[#C08240] text-white shadow-lg shadow-[#C08240]/40' 
                : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-[#C08240] hover:text-[#C08240]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Zanzibar Subcategory Tabs */}
        {activeCategory === 'Zanzibar' && (
          <div className="flex flex-wrap justify-center items-center gap-2.5 mb-12">
            {zanzibarSubcategories.map(sub => (
              <button
                key={sub.id}
                onClick={() => setActiveSubcategory(sub.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm ${
                  activeSubcategory === sub.id
                    ? 'bg-[#082f38] text-white shadow-md shadow-[#082f38]/25 ring-2 ring-[#082f38]/40 scale-105'
                    : 'bg-white text-gray-700 hover:bg-amber-50/70 border border-gray-200 hover:border-[#C08240]/50'
                }`}
              >
                <span>{sub.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeSubcategory === sub.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-[#C08240]/15 text-[#C08240]'
                }`}>
                  {sub.count}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
        
        {filteredTours.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-400 font-medium">No packages found for this duration. Contact us for a custom itinerary!</p>
          </div>
        )}

        <div className="mt-20 bg-gradient-to-r from-[#C08240] to-[#A67134] rounded-[2rem] p-10 md:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#C08240]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Can't find what you're looking for?</h3>
            <p className="text-white/80 text-lg">
              We specialize in custom, tailor-made safari experiences. Tell us your preferences, and we'll design the perfect trip just for you.
            </p>
          </div>
          <a 
            href="#contact" 
            className="relative z-10 bg-white text-gray-800 px-8 py-4 rounded-xl font-bold hover:bg-white/90 hover:text-gray-900 transition-all transform hover:scale-105 shadow-lg uppercase tracking-wider"
          >
            Request Custom Safari
          </a>
        </div>
      </div>
    </section>
  );
};

export default ToursSection;

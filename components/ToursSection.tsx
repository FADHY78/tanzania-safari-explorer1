import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLiveTours } from '../services/tourService';
import { TourCategory } from '../types';
import TourCard from './TourCard';
import CategoryIcon from './CategoryIcon';
import { useLanguage } from '../context/LanguageContext';

const ToursSection: React.FC = () => {
  const { t } = useLanguage();
  const allTours = useLiveTours();
  // Filter active tours only for public display
  const activeTours = allTours.filter(t => t.status !== 'draft' && t.status !== 'archived');

  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as TourCategory | null;

  const [activeCategory, setActiveCategory] = useState<TourCategory>('Trekking');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('All');

  useEffect(() => {
    if (categoryParam && ['Trekking', 'Safari', 'Zanzibar', 'Day Trips'].includes(categoryParam)) {
      setActiveCategory(categoryParam);
      setActiveSubcategory('All');
    }
  }, [categoryParam]);

  const categories: { id: TourCategory; label: string }[] = [
    { id: 'Trekking', label: t('cat.kilimanjaro') },
    { id: 'Safari', label: t('cat.safari') },
    { id: 'Zanzibar', label: t('cat.zanzibar') },
    { id: 'Day Trips', label: t('cat.daytrips') }
  ];

  const filteredTours = activeTours.filter(t => {
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
    { id: 'All', label: t('tours.allZanzibar'), count: activeTours.filter(t => t.category === 'Zanzibar').length },
    { id: 'Multi-Day Holidays', label: t('tours.multiDay'), count: activeTours.filter(t => t.category === 'Zanzibar' && t.subcategory === 'Multi-Day Holidays').length },
    { id: 'Half Day Tours', label: t('tours.halfDay'), count: activeTours.filter(t => t.category === 'Zanzibar' && t.subcategory === 'Half Day Tours').length },
    { id: 'Full Day Tours', label: t('tours.fullDay'), count: activeTours.filter(t => t.category === 'Zanzibar' && t.subcategory === 'Full Day Tours').length }
  ];

  return (
    <section id="tours" className="py-20 sm:py-24 bg-gradient-to-b from-[#FAF7F2] to-white dark:from-[#16120E] dark:to-[#120F0D] transition-colors">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <h4 className="text-[#C08240] font-bold tracking-widest uppercase text-xs sm:text-sm bg-[#C08240]/10 px-4 py-1.5 rounded-full">
              {t('tours.badge')}
            </h4>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            {t('tours.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            {t('tours.desc')}
          </p>
        </div>

        {/* Filter Tabs - Mobile Friendly Horizontal Swipe */}
        <div className="flex flex-nowrap overflow-x-auto pb-3 sm:pb-0 sm:flex-wrap justify-start sm:justify-center items-center gap-2.5 mb-8 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-5 sm:px-7 py-3 rounded-2xl font-bold transition-all duration-300 text-xs sm:text-sm whitespace-nowrap flex-shrink-0 flex items-center gap-2 shadow-sm ${
                activeCategory === cat.id 
                ? 'bg-gradient-to-r from-[#C08240] to-[#DE6826] text-white shadow-lg shadow-[#C08240]/30 scale-105' 
                : 'bg-white dark:bg-[#1B1613] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:border-[#C08240] hover:text-[#C08240]'
              }`}
            >
              <CategoryIcon category={cat.id} className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Zanzibar Subcategory Tabs - Mobile Friendly Horizontal Swipe */}
        {activeCategory === 'Zanzibar' && (
          <div className="flex flex-nowrap overflow-x-auto pb-3 sm:pb-0 sm:flex-wrap justify-start sm:justify-center items-center gap-2 mb-10 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {zanzibarSubcategories.map(sub => (
              <button
                key={sub.id}
                onClick={() => setActiveSubcategory(sub.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap flex-shrink-0 transition-all duration-200 flex items-center gap-2 shadow-sm ${
                  activeSubcategory === sub.id
                    ? 'bg-[#082f38] dark:bg-[#0e4350] text-white shadow-md ring-2 ring-[#C08240]/60 scale-105'
                    : 'bg-white dark:bg-[#1B1613] text-gray-700 dark:text-gray-300 hover:bg-amber-50/70 border border-gray-200 dark:border-white/10 hover:border-[#C08240]/50'
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

        {/* Tour Count Indicator */}
        <div className="text-right text-xs text-gray-500 dark:text-gray-400 mb-6 font-medium">
          Showing <span className="font-bold text-[#C08240]">{filteredTours.length}</span> {t('ui.verifiedPackages')}
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
        
        {filteredTours.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-[#1B1613] rounded-3xl border border-dashed border-gray-300 dark:border-white/15">
            <p className="text-gray-500 dark:text-gray-400 font-medium">No packages found for this selection. Contact us for a custom itinerary!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ToursSection;

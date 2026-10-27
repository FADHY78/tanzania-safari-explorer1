import React from 'react';
import { MountainSnow, Compass, Palmtree, SunMedium, Sparkles } from 'lucide-react';

interface CategoryIconProps {
  category: string;
  className?: string;
  size?: number;
}

/**
 * Realistic vector icons for Embuat Safaris tour categories.
 * Replaces casual emojis and generic AI art with clean, professional iconography.
 */
export const CategoryIcon: React.FC<CategoryIconProps> = ({ category, className = "w-5 h-5", size = 20 }) => {
  const norm = category.toLowerCase().trim();

  // 1. Kilimanjaro Treks / Trekking
  if (norm.includes('kili') || norm.includes('trek') || norm.includes('mountain')) {
    return <MountainSnow className={className} size={size} strokeWidth={2} />;
  }

  // 2. Wildlife Safaris / Safari
  if (norm.includes('safari') || norm.includes('wildlife')) {
    return (
      <svg 
        className={className} 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        {/* Realistic Binoculars vector for Wildlife Safari observation */}
        <circle cx="6" cy="15" r="4" />
        <circle cx="18" cy="15" r="4" />
        <path d="M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
        <path d="M2.5 13 5 7c.4-.9 1.3-1.5 2.3-1.5h1.4c1 0 1.9.6 2.3 1.5l1.5 3.5" />
        <path d="M21.5 13 19 7c-.4-.9-1.3-1.5-2.3-1.5h-1.4c-1 0-1.9.6-2.3 1.5l-1.5 3.5" />
      </svg>
    );
  }

  // 3. Zanzibar Holidays / Zanzibar Island
  if (norm.includes('zanzibar') || norm.includes('beach') || norm.includes('island')) {
    return <Palmtree className={className} size={size} strokeWidth={2} />;
  }

  // 4. Day Trips & Culture
  if (norm.includes('day trip') || norm.includes('culture') || norm.includes('day trips')) {
    return (
      <svg 
        className={className} 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        {/* Realistic African savannah sun rising over cultural landscape */}
        <circle cx="12" cy="10" r="4" />
        <path d="M12 2v2" />
        <path d="M12 18v4" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 10h2" />
        <path d="M20 10h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
        <path d="M3 20h18" />
      </svg>
    );
  }

  // All / Default
  return <Sparkles className={className} size={size} strokeWidth={2} />;
};

export default CategoryIcon;

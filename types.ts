
export interface ItineraryDay {
  day: number;
  title: string;
  activities: string;
  accommodation: string;
  meals: string;
}

export type TourCategory = 'Safari' | '1-Day' | '2-3 Days' | '4-6 Days' | '7-8 Days' | '7+ Days' | 'Day Trips' | 'Trekking' | 'Zanzibar';

export interface PricingTier {
  pax: string;
  price: number;
  currency: string;
}

export interface TourPackage {
  id: string;
  name: string;
  category: TourCategory;
  duration: string;
  priceRange: string;
  fromPrice: number;
  rates?: PricingTier[];
  image: string;
  coverImage?: string;
  hoverImage?: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  included: string[];
  notIncluded: string[];
  badge?: string;
  subcategory?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  image: string;
}

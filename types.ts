
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
  groupSize?: string;
  location?: string;
  destination?: string;
  status?: 'active' | 'draft' | 'archived';
  featured?: boolean;
  updatedAt?: string;
}

export interface TourBooking {
  id: string;
  tourId: string;
  tourName: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  country: string;
  travelDate: string;
  pax: number;
  totalAmount: number;
  currency: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  specialRequests?: string;
  assignedGuide?: string;
  createdAt: string;
}

export interface DepartureSchedule {
  id: string;
  tourId: string;
  tourName: string;
  category: TourCategory;
  startDate: string;
  endDate: string;
  availableSeats: number;
  totalSeats: number;
  pricePerPerson: number;
  guaranteed: boolean;
  status: 'Open' | 'Guaranteed' | 'Almost Full' | 'Sold Out';
}

export interface FleetVehicle {
  id: string;
  plateNumber: string;
  model: string;
  year: number;
  status: 'Available' | 'On Safari' | 'Maintenance';
  assignedGuide?: string;
  features: string[];
  lastServiceDate: string;
  mileageKm: number;
}

export interface SafariGuide {
  id: string;
  name: string;
  photo: string;
  languages: string[];
  experienceYears: number;
  specialty: string;
  status: 'Available' | 'On Safari' | 'Resting';
  assignedVehicle?: string;
  rating: number;
  phone: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  image: string;
  tour?: string;
}

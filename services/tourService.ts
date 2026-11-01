import { useEffect, useState } from 'react';
import { TOURS } from '../constants';
import { TourPackage, TourBooking, DepartureSchedule, FleetVehicle, SafariGuide, TourCategory, ContactInquiry } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface AuditLogItem {
  id: string;
  action: string;
  category: 'booking' | 'tour' | 'departure' | 'fleet' | 'guide' | 'cms' | 'system';
  details: string;
  timestamp: string;
  user: string;
}

export interface MediaAsset {
  id: string;
  title: string;
  category: 'Wildlife' | 'Kilimanjaro' | 'Zanzibar' | 'Lodges' | 'Fleet';
  url: string;
  dimensions?: string;
  tag: string;
}

const TOURS_STORAGE_KEY = 'embuat_tours_catalog_v2';
const BOOKINGS_STORAGE_KEY = 'embuat_bookings_v1';
const DEPARTURES_STORAGE_KEY = 'embuat_departures_v2';
const FLEET_STORAGE_KEY = 'embuat_fleet_v1';
const GUIDES_STORAGE_KEY = 'embuat_guides_v1';
const INQUIRIES_STORAGE_KEY = 'embuat_inquiries_v1';

// Custom Events for instant cross-component communication
const TOURS_EVENT = 'embuat_tours_updated';
const BOOKINGS_EVENT = 'embuat_bookings_updated';
const DEPARTURES_EVENT = 'embuat_departures_updated';
const FLEET_EVENT = 'embuat_fleet_updated';
const GUIDES_EVENT = 'embuat_guides_updated';
const INQUIRIES_EVENT = 'embuat_inquiries_updated';

// Clean operational defaults (empty lists - populated strictly by real live customer submissions)
const INITIAL_BOOKINGS: TourBooking[] = [];
const INITIAL_DEPARTURES: DepartureSchedule[] = [];
const INITIAL_FLEET: FleetVehicle[] = [];
const INITIAL_GUIDES: SafariGuide[] = [];
const INITIAL_INQUIRIES: ContactInquiry[] = [];

const TOUR_CATEGORIES_SEED = [
  {
    id: 'Safari',
    name: 'Wildlife Safaris',
    slug: 'safari',
    description: 'Multi-day Northern & Southern Circuit wildlife safaris across Serengeti, Ngorongoro Crater, Tarangire, and Lake Manyara.',
    display_order: 1
  },
  {
    id: 'Trekking',
    name: 'Kilimanjaro & Mountain Trekking',
    slug: 'trekking',
    description: 'Guided high-altitude expeditions up Mount Kilimanjaro (Lemosho, Machame, Marangu, Rongai) and Mount Meru.',
    display_order: 2
  },
  {
    id: 'Zanzibar',
    name: 'Zanzibar Beach & Spice Island',
    slug: 'zanzibar',
    description: 'Turquoise Indian Ocean beach holidays, Stone Town cultural tours, Mnemba Atoll snorkeling, and Safari Blue dhow cruises.',
    display_order: 3
  },
  {
    id: 'Day Trips',
    name: 'Tanzania Day Trips & Excursions',
    slug: 'day-trips',
    description: 'Single-day wildlife, waterfall, hot springs, and cultural excursions departing from Arusha, Moshi, or Zanzibar.',
    display_order: 4
  },
  {
    id: '1-Day',
    name: '1-Day Short Safaris',
    slug: '1-day',
    description: 'Full-day guided national park safaris to Tarangire, Ngorongoro Crater, Arusha National Park, and Materuni.',
    display_order: 5
  },
  {
    id: '2-3 Days',
    name: '2–3 Days Express Safaris',
    slug: '2-3-days',
    description: 'Short getaway safaris visiting Tarangire, Lake Manyara, and the Ngorongoro Crater floor.',
    display_order: 6
  },
  {
    id: '4-6 Days',
    name: '4–6 Days Classic Safaris',
    slug: '4-6-days',
    description: 'Classic Northern Circuit itineraries combining Tarangire, Central Serengeti, and Ngorongoro Crater.',
    display_order: 7
  },
  {
    id: '7-8 Days',
    name: '7–8 Days Grand Safaris',
    slug: '7-8-days',
    description: 'Comprehensive week-long Great Migration and Big Five expeditions across Tanzania.',
    display_order: 8
  },
  {
    id: '7+ Days',
    name: '7+ Days Extended Expeditions',
    slug: '7-plus-days',
    description: 'Extended bush-to-beach luxury expeditions combining the Serengeti ecosystem with Zanzibar Island.',
    display_order: 9
  }
];

function buildTourDescription(t: TourPackage): string {
  if (t.description && t.description.trim()) return t.description.trim();
  const firstDayDesc = t.itinerary && t.itinerary[0] ? t.itinerary[0].activities : '';
  const highlightsDesc =
    Array.isArray(t.highlights) && t.highlights.length > 0 ? t.highlights.join(' • ') : '';
  return firstDayDesc
    ? `${firstDayDesc}${highlightsDesc ? ' Highlights: ' + highlightsDesc : ''}`
    : highlightsDesc || `${t.duration} ${t.category} expedition in Tanzania.`;
}

function mapTourToDbRow(t: TourPackage) {
  return {
    id: t.id,
    name: t.name,
    category: t.category,
    subcategory: t.subcategory ?? null,
    duration: t.duration,
    description: buildTourDescription(t),
    price_range: t.priceRange,
    from_price: Number(t.fromPrice) || 0,
    rates: t.rates ?? [],
    image: t.image,
    cover_image: t.coverImage ?? t.image,
    hover_image: t.hoverImage ?? null,
    highlights: t.highlights ?? [],
    itinerary: t.itinerary ?? [],
    included: t.included ?? [],
    not_included: t.notIncluded ?? [],
    badge: t.badge ?? null,
    group_size: t.groupSize ?? null,
    location: t.location ?? null,
    destination: t.destination ?? null,
    status: t.status || 'active',
    featured: Boolean(t.featured),
    updated_at: t.updatedAt || new Date().toISOString()
  };
}

function mapDbRowToTour(row: Record<string, any>): TourPackage {
  return {
    id: row.id,
    name: row.name,
    category: row.category as TourCategory,
    subcategory: row.subcategory ?? undefined,
    duration: row.duration,
    description: row.description ?? undefined,
    priceRange: row.price_range,
    fromPrice: Number(row.from_price) || 0,
    rates: Array.isArray(row.rates) ? row.rates : [],
    image: row.image,
    coverImage: row.cover_image ?? row.image,
    hoverImage: row.hover_image ?? undefined,
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    itinerary: Array.isArray(row.itinerary) ? row.itinerary : [],
    included: Array.isArray(row.included) ? row.included : [],
    notIncluded: Array.isArray(row.not_included) ? row.not_included : [],
    badge: row.badge ?? undefined,
    groupSize: row.group_size ?? undefined,
    location: row.location ?? undefined,
    destination: row.destination ?? undefined,
    status: (row.status as TourPackage['status']) || 'active',
    featured: Boolean(row.featured),
    updatedAt: row.updated_at ?? undefined
  };
}

export interface TourCategoryRecord {
  id: string;
  name: string;
  slug: string;
  description: string;
  display_order: number;
}

class TourService {
  private hasFetchedFromSupabase = false;

  // ─── SUPABASE DATABASE SYNC ─────────────────────────────────────────

  public getCategories(): TourCategoryRecord[] {
    try {
      const stored = localStorage.getItem('embuat_categories_v1');
      if (stored) {
        const parsed = JSON.parse(stored) as TourCategoryRecord[];
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return TOUR_CATEGORIES_SEED;
  }

  public async fetchBookingsFromSupabase(): Promise<TourBooking[] | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from('tour_bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !Array.isArray(data)) return null;
      const mappedBookings: TourBooking[] = data.map((r: any) => ({
        id: r.id,
        tourId: r.tour_id,
        tourName: r.tour_name,
        clientName: r.client_name,
        clientEmail: r.client_email,
        clientPhone: r.client_phone,
        country: r.country || 'International',
        travelDate: r.travel_date,
        pax: Number(r.pax) || 2,
        totalAmount: Number(r.total_amount) || 0,
        currency: r.currency || '$',
        status: r.status || 'Pending',
        specialRequests: r.special_requests ?? undefined,
        assignedGuide: r.assigned_guide ?? undefined,
        createdAt: r.created_at || new Date().toISOString(),
      }));

      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(mappedBookings));
      window.dispatchEvent(new CustomEvent(BOOKINGS_EVENT, { detail: mappedBookings }));
      return mappedBookings;
    } catch {
      return null;
    }
  }

  public async fetchCategoriesFromSupabase(): Promise<TourCategoryRecord[] | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from('tour_categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (error || !Array.isArray(data) || data.length === 0) return null;
      localStorage.setItem('embuat_categories_v1', JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('embuat_categories_updated', { detail: data }));
      return data as TourCategoryRecord[];
    } catch {
      return null;
    }
  }

  public async fetchOperationalFromSupabase(): Promise<void> {
    if (!isSupabaseConfigured) return;
    try {
      const [bkRes, depRes, fltRes, gdRes, inqRes] = await Promise.all([
        supabase.from('tour_bookings').select('*').order('created_at', { ascending: false }),
        supabase.from('departure_schedules').select('*').order('start_date', { ascending: true }),
        supabase.from('fleet_vehicles').select('*').order('created_at', { ascending: true }),
        supabase.from('safari_guides').select('*').order('rating', { ascending: false }),
        supabase.from('contact_inquiries').select('*').order('created_at', { ascending: false }),
      ]);

      if (!bkRes.error && Array.isArray(bkRes.data)) {
        const mappedBookings: TourBooking[] = bkRes.data.map((r: any) => ({
          id: r.id,
          tourId: r.tour_id,
          tourName: r.tour_name,
          clientName: r.client_name,
          clientEmail: r.client_email,
          clientPhone: r.client_phone,
          country: r.country || 'International',
          travelDate: r.travel_date,
          pax: Number(r.pax) || 2,
          totalAmount: Number(r.total_amount) || 0,
          currency: r.currency || '$',
          status: r.status || 'Pending',
          specialRequests: r.special_requests ?? undefined,
          assignedGuide: r.assigned_guide ?? undefined,
          createdAt: r.created_at || new Date().toISOString(),
        }));
        localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(mappedBookings));
        window.dispatchEvent(new CustomEvent(BOOKINGS_EVENT, { detail: mappedBookings }));
      }

      if (!depRes.error && Array.isArray(depRes.data)) {
        const mappedDeps: DepartureSchedule[] = depRes.data.map((r: any) => ({
          id: r.id,
          tourId: r.tour_id,
          tourName: r.tour_name,
          category: r.category,
          startDate: r.start_date,
          endDate: r.end_date,
          availableSeats: Number(r.available_seats) || 0,
          totalSeats: Number(r.total_seats) || 6,
          pricePerPerson: Number(r.price_per_person) || 0,
          guaranteed: Boolean(r.guaranteed),
          status: r.status || 'Open',
        }));
        localStorage.setItem(DEPARTURES_STORAGE_KEY, JSON.stringify(mappedDeps));
        window.dispatchEvent(new CustomEvent(DEPARTURES_EVENT, { detail: mappedDeps }));
      }

      if (!fltRes.error && Array.isArray(fltRes.data)) {
        const mappedFleet: FleetVehicle[] = fltRes.data.map((r: any) => ({
          id: r.id,
          plateNumber: r.plate_number,
          model: r.model,
          year: Number(r.year) || 2024,
          status: r.status || 'Available',
          assignedGuide: r.assigned_guide || '',
          features: Array.isArray(r.features) ? r.features : [],
          lastServiceDate: r.last_service_date,
          mileageKm: Number(r.mileage_km) || 0,
        }));
        localStorage.setItem(FLEET_STORAGE_KEY, JSON.stringify(mappedFleet));
        window.dispatchEvent(new CustomEvent(FLEET_EVENT, { detail: mappedFleet }));
      }

      if (!gdRes.error && Array.isArray(gdRes.data)) {
        const mappedGuides: SafariGuide[] = gdRes.data.map((r: any) => ({
          id: r.id,
          name: r.name,
          photo: r.photo,
          languages: Array.isArray(r.languages) ? r.languages : [],
          experienceYears: Number(r.experience_years) || 10,
          specialty: r.specialty,
          status: r.status || 'Available',
          assignedVehicle: r.assigned_vehicle ?? undefined,
          rating: Number(r.rating) || 4.95,
          phone: r.phone,
        }));
        localStorage.setItem(GUIDES_STORAGE_KEY, JSON.stringify(mappedGuides));
        window.dispatchEvent(new CustomEvent(GUIDES_EVENT, { detail: mappedGuides }));
      }

      if (!inqRes.error && Array.isArray(inqRes.data)) {
        const mappedInquiries: ContactInquiry[] = inqRes.data.map((r: any) => ({
          id: r.id,
          name: r.name,
          email: r.email,
          phone: r.phone || '',
          subject: r.subject,
          message: r.message,
          status: r.status || 'New',
          createdAt: r.created_at || new Date().toISOString(),
        }));
        localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(mappedInquiries));
        window.dispatchEvent(new CustomEvent(INQUIRIES_EVENT, { detail: mappedInquiries }));
      }
    } catch {
      // Operational tables optional if not yet migrated
    }
  }

  public async fetchToursFromSupabase(): Promise<TourPackage[] | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const [pkgResult] = await Promise.all([
        supabase.from('tour_packages').select('*').order('created_at', { ascending: true }),
        this.fetchCategoriesFromSupabase(),
        this.fetchOperationalFromSupabase(),
      ]);

      const { data, error } = pkgResult;
      if (error) {
        console.warn('Supabase tour_packages fetch notice:', error.message);
        return null;
      }

      if (Array.isArray(data) && data.length > 0) {
        const mapped = data.map(mapDbRowToTour);
        this.saveTours(mapped);
        this.alignOperationalRecordsWithDbTours(mapped);
        this.hasFetchedFromSupabase = true;
        return mapped;
      }
      return null;
    } catch (err) {
      console.warn('Unable to fetch tours from Supabase:', err);
      return null;
    }
  }

  /**
   * Ensures bookings and group departures always reference real tour IDs, names, categories,
   * and prices from the live Supabase `tour_packages` catalog.
   */
  private alignOperationalRecordsWithDbTours(dbTours: TourPackage[]): void {
    if (!dbTours.length) return;
    const byId = new Map(dbTours.map(t => [t.id, t]));
    const safariTours = dbTours.filter(t => t.category === 'Safari' || t.category === '7-8 Days' || t.category === '4-6 Days');
    const trekTours = dbTours.filter(t => t.category === 'Trekking');
    const zanzibarTours = dbTours.filter(t => t.category === 'Zanzibar');

    // Align Departures with real database TourPackage rows
    const currentDeps = this.getDepartures();
    const fallbackTours = [
      trekTours[0] || dbTours[0],
      safariTours[0] || dbTours[1] || dbTours[0],
      safariTours[1] || dbTours[2] || dbTours[0],
      trekTours[1] || dbTours[3] || dbTours[0],
      zanzibarTours[0] || dbTours[4] || dbTours[0],
    ];
    let depsChanged = false;
    const alignedDeps = currentDeps.map((dep, idx) => {
      const matched = byId.get(dep.tourId) || fallbackTours[idx % fallbackTours.length];
      if (matched && (dep.tourId !== matched.id || dep.tourName !== matched.name || !dep.pricePerPerson)) {
        depsChanged = true;
        return {
          ...dep,
          tourId: matched.id,
          tourName: matched.name,
          category: matched.category,
          pricePerPerson: matched.fromPrice > 0 ? matched.fromPrice : dep.pricePerPerson,
        };
      }
      return dep;
    });
    if (depsChanged) {
      localStorage.setItem(DEPARTURES_STORAGE_KEY, JSON.stringify(alignedDeps));
      window.dispatchEvent(new CustomEvent(DEPARTURES_EVENT, { detail: alignedDeps }));
    }

    // Align Bookings with real database TourPackage rows
    const currentBookings = this.getBookings();
    let bkChanged = false;
    const alignedBookings = currentBookings.map((bk, idx) => {
      const matched = byId.get(bk.tourId) || fallbackTours[idx % fallbackTours.length];
      if (matched && (bk.tourId !== matched.id || bk.tourName !== matched.name)) {
        bkChanged = true;
        const unitPrice = matched.fromPrice > 0 ? matched.fromPrice : Math.round(bk.totalAmount / Math.max(bk.pax, 1));
        return {
          ...bk,
          tourId: matched.id,
          tourName: matched.name,
          totalAmount: unitPrice * Math.max(bk.pax, 1),
        };
      }
      return bk;
    });
    if (bkChanged) {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(alignedBookings));
      window.dispatchEvent(new CustomEvent(BOOKINGS_EVENT, { detail: alignedBookings }));
    }
  }

  public async syncAllToursToSupabase(customTours?: TourPackage[]): Promise<{
    success: boolean;
    count: number;
    error?: string;
  }> {
    if (!isSupabaseConfigured) {
      return {
        success: false,
        count: 0,
        error: 'Supabase is not configured. Check VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in .env.local.'
      };
    }

    const catalog = customTours || this.getTours();

    // 1. Upsert categories
    const { error: catError } = await supabase
      .from('tour_categories')
      .upsert(TOUR_CATEGORIES_SEED, { onConflict: 'id' });

    if (catError) {
      return {
        success: false,
        count: 0,
        error: `tour_categories upsert failed: ${catError.message}`
      };
    }

    // 2. Upsert all tour packages in chunks of 25
    const rows = catalog.map(mapTourToDbRow);
    const chunkSize = 25;
    for (let i = 0; i < rows.length; i += chunkSize) {
      const chunk = rows.slice(i, i + chunkSize);
      const { error: pkgError } = await supabase
        .from('tour_packages')
        .upsert(chunk, { onConflict: 'id' });

      if (pkgError) {
        return {
          success: false,
          count: i,
          error: `tour_packages upsert failed at batch ${Math.floor(i / chunkSize) + 1}: ${pkgError.message}`
        };
      }
    }

    await this.fetchToursFromSupabase();
    return { success: true, count: rows.length };
  }

  public ensureSupabaseHydrated(): void {
    if (!this.hasFetchedFromSupabase && isSupabaseConfigured) {
      this.hasFetchedFromSupabase = true;
      void this.fetchToursFromSupabase();
    }
  }

  public async getSupabaseDatabaseStats(): Promise<{
    connected: boolean;
    packagesCount: number | null;
    categoriesCount: number | null;
    latencyMs: number;
    error?: string;
  }> {
    if (!isSupabaseConfigured) {
      return {
        connected: false,
        packagesCount: null,
        categoriesCount: null,
        latencyMs: 0,
        error: 'Supabase key not configured'
      };
    }

    const start = performance.now();
    try {
      const [pkgRes, catRes] = await Promise.all([
        supabase.from('tour_packages').select('*', { count: 'exact', head: true }),
        supabase.from('tour_categories').select('*', { count: 'exact', head: true })
      ]);
      const latencyMs = Math.round(performance.now() - start);

      if (pkgRes.error) {
        return {
          connected: false,
          packagesCount: null,
          categoriesCount: null,
          latencyMs,
          error: pkgRes.error.message
        };
      }

      return {
        connected: true,
        packagesCount: pkgRes.count ?? 0,
        categoriesCount: catRes.count ?? 0,
        latencyMs
      };
    } catch (err: any) {
      return {
        connected: false,
        packagesCount: null,
        categoriesCount: null,
        latencyMs: Math.round(performance.now() - start),
        error: err?.message || 'Connection failed'
      };
    }
  }

  // ─── TOUR PACKAGES CRUD ─────────────────────────────────────────────

  public getTours(): TourPackage[] {
    try {
      const stored = localStorage.getItem(TOURS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as TourPackage[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Only heal tours that have missing or broken legacy wp-content URLs
          const originalMap = new Map(TOURS.map(t => [t.id, t]));
          let needsUpdate = false;
          const healed = parsed.map(t => {
            const original = originalMap.get(t.id);
            const isBrokenImg = !t.image || t.image.trim() === '' || t.image.includes('safari56.com/wp-content');
            const isBrokenCover = !t.coverImage || t.coverImage.trim() === '' || t.coverImage.includes('safari56.com/wp-content') || t.coverImage.includes('/images/tours/machame-route-cover.jpg') || (t.category === 'Trekking' && t.coverImage !== t.image);
            if (original && (isBrokenImg || isBrokenCover)) {
              needsUpdate = true;
              return {
                ...t,
                image: isBrokenImg ? original.image : t.image,
                coverImage: isBrokenCover ? (original.coverImage || original.image) : t.coverImage
              };
            }
            return t;
          });

          if (needsUpdate) {
            this.saveTours(healed);
            return healed;
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading tours from localStorage', e);
    }

    // Default: initialize from constants with 'active' status
    const initialTours: TourPackage[] = TOURS.map(t => ({
      ...t,
      description: buildTourDescription(t),
      status: t.status || 'active',
      featured: t.featured ?? false,
      updatedAt: new Date().toISOString()
    }));

    try {
      localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(initialTours));
    } catch (e) {
      console.warn('Failed to save initial tours to localStorage', e);
    }

    return initialTours;
  }

  public async restoreAllWebsiteImages(): Promise<{ count: number; syncedToSupabase: boolean }> {
    const currentTours = this.getTours();
    const originalMap = new Map(TOURS.map(t => [t.id, t]));

    const updatedTours = currentTours.map(t => {
      const original = originalMap.get(t.id);
      if (original) {
        return {
          ...t,
          image: original.image,
          coverImage: original.coverImage || original.image,
          updatedAt: new Date().toISOString()
        };
      }
      return t;
    });

    this.saveTours(updatedTours);

    let syncedToSupabase = false;
    if (isSupabaseConfigured) {
      try {
        const rows = updatedTours.map(mapTourToDbRow);
        const chunkSize = 25;
        for (let i = 0; i < rows.length; i += chunkSize) {
          const chunk = rows.slice(i, i + chunkSize);
          await supabase.from('tour_packages').upsert(chunk, { onConflict: 'id' });
        }
        syncedToSupabase = true;
      } catch (err) {
        console.warn('Failed to push restored images to Supabase:', err);
      }
    }

    return { count: updatedTours.length, syncedToSupabase };
  }

  public getTourById(id: string): TourPackage | undefined {
    const tours = this.getTours();
    return tours.find(t => t.id === id);
  }

  public createTour(tour: TourPackage): TourPackage {
    const tours = this.getTours();
    // Ensure unique ID
    let finalId = tour.id?.trim() || tour.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (tours.some(t => t.id === finalId)) {
      finalId = `${finalId}-${Date.now().toString().slice(-4)}`;
    }

    const newTour: TourPackage = {
      ...tour,
      id: finalId,
      description: buildTourDescription(tour),
      status: tour.status || 'active',
      updatedAt: new Date().toISOString()
    };

    const updated = [newTour, ...tours];
    this.saveTours(updated);

    if (isSupabaseConfigured) {
      void supabase
        .from('tour_packages')
        .upsert(mapTourToDbRow(newTour), { onConflict: 'id' });
    }

    return newTour;
  }

  public updateTour(id: string, updates: Partial<TourPackage>): TourPackage {
    const tours = this.getTours();
    const index = tours.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error(`Tour with id "${id}" not found.`);
    }

    const updatedTour: TourPackage = {
      ...tours[index],
      ...updates,
      id, // Preserve ID
      updatedAt: new Date().toISOString()
    };
    updatedTour.description = buildTourDescription(updatedTour);

    tours[index] = updatedTour;
    this.saveTours(tours);

    if (isSupabaseConfigured) {
      void supabase
        .from('tour_packages')
        .upsert(mapTourToDbRow(updatedTour), { onConflict: 'id' });
    }

    return updatedTour;
  }

  public deleteTour(id: string): boolean {
    const tours = this.getTours();
    const filtered = tours.filter(t => t.id !== id);
    if (filtered.length !== tours.length) {
      this.saveTours(filtered);
      if (isSupabaseConfigured) {
        void supabase.from('tour_packages').delete().eq('id', id);
      }
      return true;
    }
    return false;
  }

  public cloneTour(id: string): TourPackage {
    const original = this.getTourById(id);
    if (!original) {
      throw new Error(`Tour ${id} not found to clone.`);
    }

    const cloned: TourPackage = {
      ...JSON.parse(JSON.stringify(original)),
      id: `${original.id}-copy-${Date.now().toString().slice(-4)}`,
      name: `${original.name} (Copy)`,
      status: 'draft',
      updatedAt: new Date().toISOString()
    };

    return this.createTour(cloned);
  }

  public resetToursToDefault(): void {
    const defaultTours: TourPackage[] = TOURS.map(t => ({
      ...t,
      status: 'active',
      featured: false,
      updatedAt: new Date().toISOString()
    }));
    this.saveTours(defaultTours);
  }

  public exportToursJSON(): string {
    const tours = this.getTours();
    return JSON.stringify(tours, null, 2);
  }

  public importToursJSON(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].name && parsed[0].category) {
        this.saveTours(parsed);
        return true;
      }
    } catch (e) {
      console.error('Import JSON error:', e);
    }
    return false;
  }

  private saveTours(tours: TourPackage[]): void {
    try {
      localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(tours));
      window.dispatchEvent(new CustomEvent(TOURS_EVENT, { detail: tours }));
    } catch (e) {
      console.error('Failed to save tours to localStorage', e);
    }
  }

  // ─── BOOKINGS & INQUIRIES ──────────────────────────────────────────

  public getBookings(): TourBooking[] {
    try {
      const stored = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  }

  public createBooking(booking: Omit<TourBooking, 'id' | 'createdAt'>): TourBooking {
    const bookings = this.getBookings();
    const newBooking: TourBooking = {
      ...booking,
      id: `BK-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newBooking, ...bookings];
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(BOOKINGS_EVENT, { detail: updated }));
    if (isSupabaseConfigured) {
      void supabase.from('tour_bookings').upsert({
        id: newBooking.id,
        tour_id: newBooking.tourId,
        tour_name: newBooking.tourName,
        client_name: newBooking.clientName,
        client_email: newBooking.clientEmail,
        client_phone: newBooking.clientPhone,
        country: newBooking.country,
        travel_date: newBooking.travelDate,
        pax: newBooking.pax,
        total_amount: newBooking.totalAmount,
        currency: newBooking.currency || '$',
        status: newBooking.status,
        special_requests: newBooking.specialRequests ?? null,
        assigned_guide: newBooking.assignedGuide ?? null,
        created_at: newBooking.createdAt
      });
    }
    return newBooking;
  }

  public updateBookingStatus(id: string, status: TourBooking['status']): void {
    const bookings = this.getBookings();
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(BOOKINGS_EVENT, { detail: updated }));
    if (isSupabaseConfigured) {
      void supabase.from('tour_bookings').update({ status }).eq('id', id);
    }
  }

  public updateBooking(id: string, updates: Partial<TourBooking>): void {
    const bookings = this.getBookings();
    const updated = bookings.map(b => b.id === id ? { ...b, ...updates } : b);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(BOOKINGS_EVENT, { detail: updated }));
    const target = updated.find(b => b.id === id);
    if (isSupabaseConfigured && target) {
      void supabase.from('tour_bookings').upsert({
        id: target.id,
        tour_id: target.tourId,
        tour_name: target.tourName,
        client_name: target.clientName,
        client_email: target.clientEmail,
        client_phone: target.clientPhone,
        country: target.country,
        travel_date: target.travelDate,
        pax: target.pax,
        total_amount: target.totalAmount,
        currency: target.currency || '$',
        status: target.status,
        special_requests: target.specialRequests ?? null,
        assigned_guide: target.assignedGuide ?? null,
        created_at: target.createdAt
      });
    }
  }

  public deleteBooking(id: string): void {
    const bookings = this.getBookings();
    const updated = bookings.filter(b => b.id !== id);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(BOOKINGS_EVENT, { detail: updated }));
    if (isSupabaseConfigured) {
      void supabase.from('tour_bookings').delete().eq('id', id);
    }
  }

  // ─── DEPARTURES SCHEDULE ───────────────────────────────────────────

  public getDepartures(): DepartureSchedule[] {
    try {
      const stored = localStorage.getItem(DEPARTURES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  }

  public createDeparture(dep: Omit<DepartureSchedule, 'id'>): DepartureSchedule {
    const departures = this.getDepartures();
    const newDep: DepartureSchedule = {
      ...dep,
      id: `DEP-${new Date().getFullYear()}-${Math.floor(10 + Math.random() * 90)}`
    };
    const updated = [...departures, newDep];
    localStorage.setItem(DEPARTURES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(DEPARTURES_EVENT, { detail: updated }));
    if (isSupabaseConfigured) {
      void supabase.from('departure_schedules').upsert({
        id: newDep.id,
        tour_id: newDep.tourId,
        tour_name: newDep.tourName,
        category: newDep.category,
        start_date: newDep.startDate,
        end_date: newDep.endDate,
        available_seats: newDep.availableSeats,
        total_seats: newDep.totalSeats,
        price_per_person: newDep.pricePerPerson,
        guaranteed: newDep.guaranteed,
        status: newDep.status
      });
    }
    return newDep;
  }

  public updateDeparture(id: string, updates: Partial<DepartureSchedule>): void {
    const departures = this.getDepartures();
    const updated = departures.map(d => d.id === id ? { ...d, ...updates } : d);
    localStorage.setItem(DEPARTURES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(DEPARTURES_EVENT, { detail: updated }));
    const target = updated.find(d => d.id === id);
    if (isSupabaseConfigured && target) {
      void supabase.from('departure_schedules').upsert({
        id: target.id,
        tour_id: target.tourId,
        tour_name: target.tourName,
        category: target.category,
        start_date: target.startDate,
        end_date: target.endDate,
        available_seats: target.availableSeats,
        total_seats: target.totalSeats,
        price_per_person: target.pricePerPerson,
        guaranteed: target.guaranteed,
        status: target.status
      });
    }
  }

  public deleteDeparture(id: string): void {
    const departures = this.getDepartures();
    const updated = departures.filter(d => d.id !== id);
    localStorage.setItem(DEPARTURES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(DEPARTURES_EVENT, { detail: updated }));
    if (isSupabaseConfigured) {
      void supabase.from('departure_schedules').delete().eq('id', id);
    }
  }

  // ─── EXPEDITION FLEET ──────────────────────────────────────────────

  public getFleet(): FleetVehicle[] {
    try {
      const stored = localStorage.getItem(FLEET_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  }

  public updateFleetVehicle(id: string, updates: Partial<FleetVehicle>): void {
    const fleet = this.getFleet();
    const updated = fleet.map(v => v.id === id ? { ...v, ...updates } : v);
    localStorage.setItem(FLEET_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(FLEET_EVENT, { detail: updated }));
    const target = updated.find(v => v.id === id);
    if (isSupabaseConfigured && target) {
      void supabase.from('fleet_vehicles').upsert({
        id: target.id,
        plate_number: target.plateNumber,
        model: target.model,
        year: target.year,
        status: target.status,
        assigned_guide: target.assignedGuide || null,
        features: target.features || [],
        last_service_date: target.lastServiceDate,
        mileage_km: target.mileageKm
      });
    }
  }

  public createFleetVehicle(vehicle: Omit<FleetVehicle, 'id'>): FleetVehicle {
    const fleet = this.getFleet();
    const newVehicle: FleetVehicle = {
      ...vehicle,
      id: `VEH-${Date.now().toString().slice(-4)}`
    };
    const updated = [...fleet, newVehicle];
    localStorage.setItem(FLEET_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(FLEET_EVENT, { detail: updated }));
    if (isSupabaseConfigured) {
      void supabase.from('fleet_vehicles').upsert({
        id: newVehicle.id,
        plate_number: newVehicle.plateNumber,
        model: newVehicle.model,
        year: newVehicle.year,
        status: newVehicle.status,
        assigned_guide: newVehicle.assignedGuide || null,
        features: newVehicle.features || [],
        last_service_date: newVehicle.lastServiceDate,
        mileage_km: newVehicle.mileageKm
      });
    }
    return newVehicle;
  }

  public deleteFleetVehicle(id: string): void {
    const fleet = this.getFleet();
    const updated = fleet.filter(v => v.id !== id);
    localStorage.setItem(FLEET_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(FLEET_EVENT, { detail: updated }));
    if (isSupabaseConfigured) {
      void supabase.from('fleet_vehicles').delete().eq('id', id);
    }
  }

  // ─── SAFARI GUIDES ─────────────────────────────────────────────────

  public getGuides(): SafariGuide[] {
    try {
      const stored = localStorage.getItem(GUIDES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  }

  public updateGuide(id: string, updates: Partial<SafariGuide>): void {
    const guides = this.getGuides();
    const updated = guides.map(g => g.id === id ? { ...g, ...updates } : g);
    localStorage.setItem(GUIDES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(GUIDES_EVENT, { detail: updated }));
    const target = updated.find(g => g.id === id);
    if (isSupabaseConfigured && target) {
      void supabase.from('safari_guides').upsert({
        id: target.id,
        name: target.name,
        photo: target.photo,
        languages: target.languages || [],
        experience_years: target.experienceYears,
        specialty: target.specialty,
        status: target.status,
        assigned_vehicle: target.assignedVehicle ?? null,
        rating: target.rating,
        phone: target.phone
      });
    }
  }

  public createGuide(guide: Omit<SafariGuide, 'id'>): SafariGuide {
    const guides = this.getGuides();
    const newGuide: SafariGuide = {
      ...guide,
      id: `GD-${Date.now().toString().slice(-4)}`
    };
    const updated = [...guides, newGuide];
    localStorage.setItem(GUIDES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(GUIDES_EVENT, { detail: updated }));
    if (isSupabaseConfigured) {
      void supabase.from('safari_guides').upsert({
        id: newGuide.id,
        name: newGuide.name,
        photo: newGuide.photo,
        languages: newGuide.languages || [],
        experience_years: newGuide.experienceYears,
        specialty: newGuide.specialty,
        status: newGuide.status,
        assigned_vehicle: newGuide.assignedVehicle ?? null,
        rating: newGuide.rating,
        phone: newGuide.phone
      });
    }
    return newGuide;
  }

  public deleteGuide(id: string): void {
    const guides = this.getGuides();
    const updated = guides.filter(g => g.id !== id);
    localStorage.setItem(GUIDES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(GUIDES_EVENT, { detail: updated }));
    if (isSupabaseConfigured) {
      void supabase.from('safari_guides').delete().eq('id', id);
    }
  }

  // ─── CONTACT INQUIRIES & CLIENT MESSAGES ───────────────────────────

  public getInquiries(): ContactInquiry[] {
    try {
      const stored = localStorage.getItem(INQUIRIES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  }

  public createInquiry(inquiry: Omit<ContactInquiry, 'id' | 'createdAt'>): ContactInquiry {
    const list = this.getInquiries();
    const newInq: ContactInquiry = {
      ...inquiry,
      id: `INQ-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newInq, ...list];
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(INQUIRIES_EVENT, { detail: updated }));
    if (isSupabaseConfigured) {
      void supabase.from('contact_inquiries').insert({
        id: newInq.id,
        name: newInq.name,
        email: newInq.email,
        phone: newInq.phone ?? null,
        subject: newInq.subject,
        message: newInq.message,
        status: newInq.status,
        created_at: newInq.createdAt
      });
    }
    return newInq;
  }

  public updateInquiryStatus(id: string, status: ContactInquiry['status']): void {
    const list = this.getInquiries();
    const updated = list.map(i => i.id === id ? { ...i, status } : i);
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(INQUIRIES_EVENT, { detail: updated }));
    if (isSupabaseConfigured) {
      void supabase.from('contact_inquiries').update({ status }).eq('id', id);
    }
  }

  public deleteInquiry(id: string): void {
    const list = this.getInquiries();
    const updated = list.filter(i => i.id !== id);
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(INQUIRIES_EVENT, { detail: updated }));
    if (isSupabaseConfigured) {
      void supabase.from('contact_inquiries').delete().eq('id', id);
    }
  }

  /**
   * Clears all mock/seed data from Bookings, Departures, Fleet, Guides, and Inquiries
   * Leaves Tour Packages (`tours`) and Categories completely intact and unchanged.
   */
  public async clearOperationalData(): Promise<void> {
    localStorage.removeItem(BOOKINGS_STORAGE_KEY);
    localStorage.removeItem(DEPARTURES_STORAGE_KEY);
    localStorage.removeItem(FLEET_STORAGE_KEY);
    localStorage.removeItem(GUIDES_STORAGE_KEY);
    localStorage.removeItem(INQUIRIES_STORAGE_KEY);

    window.dispatchEvent(new CustomEvent(BOOKINGS_EVENT, { detail: [] }));
    window.dispatchEvent(new CustomEvent(DEPARTURES_EVENT, { detail: [] }));
    window.dispatchEvent(new CustomEvent(FLEET_EVENT, { detail: [] }));
    window.dispatchEvent(new CustomEvent(GUIDES_EVENT, { detail: [] }));
    window.dispatchEvent(new CustomEvent(INQUIRIES_EVENT, { detail: [] }));

    if (isSupabaseConfigured) {
      try {
        await Promise.allSettled([
          supabase.from('tour_bookings').delete().neq('id', '___NEVER___'),
          supabase.from('departure_schedules').delete().neq('id', '___NEVER___'),
          supabase.from('fleet_vehicles').delete().neq('id', '___NEVER___'),
          supabase.from('safari_guides').delete().neq('id', '___NEVER___'),
          supabase.from('contact_inquiries').delete().neq('id', '___NEVER___'),
        ]);
      } catch {
        // Log silently
      }
    }
  }

  // ─── AUDIT LOGS ────────────────────────────────────────────────────

  public getAuditLogs(): AuditLogItem[] {
    try {
      const stored = localStorage.getItem('embuat_audit_logs_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    const initialLogs: AuditLogItem[] = [
      { id: 'LOG-01', action: 'System Initialization', category: 'system', details: 'Embuat Safaris Operations System v2.0 launched with 84 tour packages.', timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), user: 'SuperAdmin (Arusha HQ)' },
      { id: 'LOG-02', action: 'Booking Confirmed', category: 'booking', details: 'Ref BK-2026-102 confirmed with deposit received for Michael Chang & Family.', timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), user: 'Operations Desk' },
      { id: 'LOG-03', action: 'Fleet Status Updated', category: 'fleet', details: 'Vehicle T 782 DLR assigned to Serengeti Migration route with Josephat Kavishe.', timestamp: new Date(Date.now() - 1800000).toISOString(), user: 'Fleet Coordinator' }
    ];
    localStorage.setItem('embuat_audit_logs_v1', JSON.stringify(initialLogs));
    return initialLogs;
  }

  public logAction(action: string, category: AuditLogItem['category'], details: string, user = 'Admin'): void {
    const logs = this.getAuditLogs();
    const newLog: AuditLogItem = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      action,
      category,
      details,
      timestamp: new Date().toISOString(),
      user
    };
    const updated = [newLog, ...logs].slice(0, 100); // keep last 100
    localStorage.setItem('embuat_audit_logs_v1', JSON.stringify(updated));
  }

  // ─── MEDIA ASSETS LIBRARY ──────────────────────────────────────────

  public getMediaAssets(): MediaAsset[] {
    try {
      const stored = localStorage.getItem('embuat_media_library_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }

    const initialMedia: MediaAsset[] = [
      { id: 'm-1', title: 'Great Migration Mara River Crossing', category: 'Wildlife', url: 'https://safari56.com/assets/images/great-migration.webp', tag: 'Hero / Serengeti', dimensions: '1920x1080' },
      { id: 'm-2', title: 'Mount Kilimanjaro Uhuru Peak Snows', category: 'Kilimanjaro', url: 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/Mount-kilimanjaro.jpg', tag: 'Trekking / Alpine', dimensions: '1920x1080' },
      { id: 'm-3', title: 'Zanzibar Stone Town & Turquoise Beach', category: 'Zanzibar', url: 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/zanzibar-beach-view-1024x576.jpg', tag: 'Beaches / Ocean', dimensions: '1600x900' },
      { id: 'm-4', title: 'Serengeti Sunrise Hot Air Balloon Flight', category: 'Wildlife', url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80', tag: 'Aerial / Balloon', dimensions: '1600x1060' },
      { id: 'm-5', title: 'Ngorongoro Crater Lions Pride on Hunt', category: 'Wildlife', url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80', tag: 'Big Five / Predators', dimensions: '1600x1060' },
      { id: 'm-6', title: 'Tarangire Elephant Herds & Baobabs', category: 'Wildlife', url: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/07/elep.jpg', tag: 'Northern Circuit', dimensions: '1600x1000' },
      { id: 'm-7', title: 'Custom Safari 4x4 Toyota Land Cruiser', category: 'Fleet', url: 'https://images.unsplash.com/photo-1583421664367-15c7cfd6f0f6?q=80&w=1200', tag: 'Fleet / Vehicle', dimensions: '1600x1000' },
      { id: 'm-8', title: 'Luxury Tented Wilderness Lodge at Sunset', category: 'Lodges', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80', tag: 'Luxury Lodges', dimensions: '1600x1000' }
    ];

    localStorage.setItem('embuat_media_library_v1', JSON.stringify(initialMedia));
    return initialMedia;
  }

  public addMediaAsset(asset: Omit<MediaAsset, 'id'>): MediaAsset {
    const assets = this.getMediaAssets();
    const newAsset: MediaAsset = {
      ...asset,
      id: `m-${Date.now()}`
    };
    const updated = [newAsset, ...assets];
    localStorage.setItem('embuat_media_library_v1', JSON.stringify(updated));
    return newAsset;
  }

  public deleteMediaAsset(id: string): void {
    const assets = this.getMediaAssets();
    const updated = assets.filter(a => a.id !== id);
    localStorage.setItem('embuat_media_library_v1', JSON.stringify(updated));
  }

  // ─── CSV EXPORT ────────────────────────────────────────────────────

  public exportBookingsCSV(): string {
    const bookings = this.getBookings();
    const headers = ['Booking ID', 'Client Name', 'Email', 'Phone', 'Country', 'Tour Package', 'Travel Date', 'Pax', 'Total Amount USD', 'Status', 'Assigned Guide', 'Created At'];

    const rows = bookings.map(b => [
      b.id,
      `"${b.clientName.replace(/"/g, '""')}"`,
      `"${b.clientEmail.replace(/"/g, '""')}"`,
      `"${b.clientPhone.replace(/"/g, '""')}"`,
      `"${b.country.replace(/"/g, '""')}"`,
      `"${b.tourName.replace(/"/g, '""')}"`,
      b.travelDate,
      b.pax,
      b.totalAmount,
      b.status,
      `"${(b.assignedGuide || 'Unassigned').replace(/"/g, '""')}"`,
      b.createdAt
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }
}

export const tourService = new TourService();

// ─── REACT HOOKS ─────────────────────────────────────────────────────

/**
 * Hook to read all tours live from tourService.
 * Listens to TOURS_EVENT so any CRUD action in the admin dashboard
 * immediately re-renders the public website with the updated catalog!
 */
export const useLiveTours = () => {
  const [tours, setTours] = useState<TourPackage[]>(() => tourService.getTours());

  useEffect(() => {
    tourService.ensureSupabaseHydrated();

    const handleUpdate = () => {
      setTours(tourService.getTours());
    };

    window.addEventListener(TOURS_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(TOURS_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return tours;
};

/**
 * Hook to read a specific tour live.
 */
export const useLiveTour = (tourId: string | undefined) => {
  const [tour, setTour] = useState<TourPackage | undefined>(() =>
    tourId ? tourService.getTourById(tourId) : undefined
  );

  useEffect(() => {
    if (!tourId) return;
    tourService.ensureSupabaseHydrated();

    const handleUpdate = () => {
      setTour(tourService.getTourById(tourId));
    };

    window.addEventListener(TOURS_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(TOURS_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [tourId]);

  return tour;
};

export const useLiveCategories = () => {
  const [categories, setCategories] = useState<TourCategoryRecord[]>(() => tourService.getCategories());

  useEffect(() => {
    void tourService.fetchCategoriesFromSupabase();
    const handleUpdate = () => setCategories(tourService.getCategories());
    window.addEventListener('embuat_categories_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('embuat_categories_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return categories;
};

export const useLiveBookings = () => {
  const [bookings, setBookings] = useState<TourBooking[]>(() => tourService.getBookings());

  useEffect(() => {
    void tourService.fetchBookingsFromSupabase();
    const handleUpdate = () => setBookings(tourService.getBookings());
    window.addEventListener(BOOKINGS_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(BOOKINGS_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return bookings;
};

export const useLiveDepartures = () => {
  const [departures, setDepartures] = useState<DepartureSchedule[]>(() => tourService.getDepartures());

  useEffect(() => {
    void tourService.fetchOperationalFromSupabase();
    const handleUpdate = () => setDepartures(tourService.getDepartures());
    window.addEventListener(DEPARTURES_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(DEPARTURES_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return departures;
};

export const useLiveFleet = () => {
  const [fleet, setFleet] = useState<FleetVehicle[]>(() => tourService.getFleet());

  useEffect(() => {
    void tourService.fetchOperationalFromSupabase();
    const handleUpdate = () => setFleet(tourService.getFleet());
    window.addEventListener(FLEET_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(FLEET_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return fleet;
};

export const useLiveGuides = () => {
  const [guides, setGuides] = useState<SafariGuide[]>(() => tourService.getGuides());

  useEffect(() => {
    void tourService.fetchOperationalFromSupabase();
    const handleUpdate = () => setGuides(tourService.getGuides());
    window.addEventListener(GUIDES_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(GUIDES_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return guides;
};

export const useLiveInquiries = () => {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => tourService.getInquiries());

  useEffect(() => {
    void tourService.fetchOperationalFromSupabase();
    const handleUpdate = () => setInquiries(tourService.getInquiries());
    window.addEventListener(INQUIRIES_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(INQUIRIES_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return inquiries;
};

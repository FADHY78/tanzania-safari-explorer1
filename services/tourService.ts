import { useEffect, useState } from 'react';
import { TOURS } from '../constants';
import { TourPackage, TourBooking, DepartureSchedule, FleetVehicle, SafariGuide } from '../types';

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

const TOURS_STORAGE_KEY = 'embuat_tours_catalog_v1';
const BOOKINGS_STORAGE_KEY = 'embuat_bookings_v1';
const DEPARTURES_STORAGE_KEY = 'embuat_departures_v1';
const FLEET_STORAGE_KEY = 'embuat_fleet_v1';
const GUIDES_STORAGE_KEY = 'embuat_guides_v1';

// Custom Events for instant cross-component communication
const TOURS_EVENT = 'embuat_tours_updated';
const BOOKINGS_EVENT = 'embuat_bookings_updated';
const DEPARTURES_EVENT = 'embuat_departures_updated';
const FLEET_EVENT = 'embuat_fleet_updated';
const GUIDES_EVENT = 'embuat_guides_updated';

// Default initial operational seeds
const INITIAL_BOOKINGS: TourBooking[] = [
  {
    id: 'BK-2026-101',
    tourId: 'kilimanjaro-lemosho-8-days',
    tourName: 'Kilimanjaro Lemosho Route Trekking',
    clientName: 'Alexander & Sarah Wright',
    clientEmail: 'a.wright@uktravel.co.uk',
    clientPhone: '+44 7911 123456',
    country: 'United Kingdom',
    travelDate: '2026-08-14',
    pax: 2,
    totalAmount: 5226,
    currency: '$',
    status: 'Confirmed',
    specialRequests: 'Vegetarian meals during mountain ascent. Trekking poles rental required.',
    assignedGuide: 'Emmanuel Mollel',
    createdAt: '2026-10-15T09:30:00Z'
  },
  {
    id: 'BK-2026-102',
    tourId: '7-days-serengeti-migration-safari',
    tourName: '7-Day Serengeti Migration & Ngorongoro Luxury',
    clientName: 'Michael Chang & Family',
    clientEmail: 'mchang@vanguardtech.com',
    clientPhone: '+1 (415) 890-3421',
    country: 'United States',
    travelDate: '2026-07-22',
    pax: 4,
    totalAmount: 11800,
    currency: '$',
    status: 'Confirmed',
    specialRequests: 'Private 4x4 with pop-up roof for wildlife telephoto lenses. 2 binoculars requested.',
    assignedGuide: 'Josephat Kavishe',
    createdAt: '2026-10-20T14:15:00Z'
  },
  {
    id: 'BK-2026-103',
    tourId: 'zanzibar-beach-stone-town-5-days',
    tourName: '5-Day Zanzibar Spice Island & Nungwi Beach',
    clientName: 'Elena Rostova',
    clientEmail: 'elena.rostova@mail.de',
    clientPhone: '+49 170 9876543',
    country: 'Germany',
    travelDate: '2026-09-05',
    pax: 2,
    totalAmount: 3100,
    currency: '$',
    status: 'Pending',
    specialRequests: 'Sunset dhow cruise confirmation and airport private transfer in Stone Town.',
    assignedGuide: 'Said Juma',
    createdAt: '2026-10-26T11:45:00Z'
  },
  {
    id: 'BK-2026-104',
    tourId: 'tarangire-manyara-crater-4-days',
    tourName: '4-Day Northern Circuit Highlights',
    clientName: 'Dr. Jean-Pierre Laurent',
    clientEmail: 'jp.laurent@sorbonne.fr',
    clientPhone: '+33 6 12 34 56 78',
    country: 'France',
    travelDate: '2026-11-10',
    pax: 3,
    totalAmount: 5850,
    currency: '$',
    status: 'Pending',
    specialRequests: 'Focus on birding taxonomy in Tarangire and Lake Manyara.',
    assignedGuide: 'Peter Massawe',
    createdAt: '2026-10-27T16:20:00Z'
  }
];

const INITIAL_DEPARTURES: DepartureSchedule[] = [
  {
    id: 'DEP-2026-01',
    tourId: 'kilimanjaro-lemosho-8-days',
    tourName: 'Kilimanjaro Lemosho 8 Days',
    category: 'Trekking',
    startDate: '2026-07-05',
    endDate: '2026-07-12',
    availableSeats: 2,
    totalSeats: 8,
    pricePerPerson: 2533,
    guaranteed: true,
    status: 'Almost Full'
  },
  {
    id: 'DEP-2026-02',
    tourId: '7-days-serengeti-migration-safari',
    tourName: 'Serengeti Migration River Crossing Expedition',
    category: 'Safari',
    startDate: '2026-07-18',
    endDate: '2026-07-24',
    availableSeats: 1,
    totalSeats: 6,
    pricePerPerson: 2950,
    guaranteed: true,
    status: 'Almost Full'
  },
  {
    id: 'DEP-2026-03',
    tourId: 'ngorongoro-serengeti-5-days',
    tourName: '5-Day Classic Big Five Wildlife Explorer',
    category: 'Safari',
    startDate: '2026-08-02',
    endDate: '2026-08-06',
    availableSeats: 4,
    totalSeats: 6,
    pricePerPerson: 2180,
    guaranteed: true,
    status: 'Guaranteed'
  },
  {
    id: 'DEP-2026-04',
    tourId: 'kilimanjaro-machame-7-days',
    tourName: 'Kilimanjaro Machame Route 7 Days',
    category: 'Trekking',
    startDate: '2026-08-15',
    endDate: '2026-08-21',
    availableSeats: 5,
    totalSeats: 8,
    pricePerPerson: 2350,
    guaranteed: true,
    status: 'Open'
  },
  {
    id: 'DEP-2026-05',
    tourId: 'zanzibar-beach-stone-town-5-days',
    tourName: 'Zanzibar Cultural & Spice Island Getaway',
    category: 'Zanzibar',
    startDate: '2026-08-25',
    endDate: '2026-08-29',
    availableSeats: 6,
    totalSeats: 10,
    pricePerPerson: 1450,
    guaranteed: false,
    status: 'Open'
  }
];

const INITIAL_FLEET: FleetVehicle[] = [
  {
    id: 'VEH-01',
    plateNumber: 'T 782 DLR',
    model: 'Toyota Land Cruiser HZJ76 Extended (Custom 4x4)',
    year: 2024,
    status: 'On Safari',
    assignedGuide: 'Josephat Kavishe',
    features: ['360° Pop-Up Roof', 'Onboard 40L Refrigerator', '220V Inverter Power (Charging)', 'VHF Long-Range Radio', 'Garmin GPS Tracker'],
    lastServiceDate: '2026-10-10',
    mileageKm: 42800
  },
  {
    id: 'VEH-02',
    plateNumber: 'T 419 EBA',
    model: 'Toyota Land Cruiser V8 Custom Safari Conversion',
    year: 2025,
    status: 'Available',
    assignedGuide: 'Emmanuel Mollel',
    features: ['360° Pop-Up Roof', 'Onboard Refrigerator', 'Individual USB Outlets', 'High-Lift Jack & Snorkel', 'Nikon Pro Binoculars'],
    lastServiceDate: '2026-10-18',
    mileageKm: 18400
  },
  {
    id: 'VEH-03',
    plateNumber: 'T 903 CLM',
    model: 'Toyota Land Cruiser Extended Bush Cruiser',
    year: 2023,
    status: 'Available',
    assignedGuide: 'Peter Massawe',
    features: ['360° Pop-Up Roof', 'Onboard Refrigerator', 'Dual Fuel Tanks (180L)', 'Emergency First Aid & O2', 'VHF Safari Comms'],
    lastServiceDate: '2026-10-05',
    mileageKm: 65200
  },
  {
    id: 'VEH-04',
    plateNumber: 'T 632 DXN',
    model: 'Toyota Land Cruiser 78 Troopy Expedition',
    year: 2024,
    status: 'Maintenance',
    assignedGuide: 'Said Juma',
    features: ['Pop-Up Roof', 'Cooler Box', 'Roof Rack & Spare Tires', 'Satellite Phone'],
    lastServiceDate: '2026-10-25',
    mileageKm: 38100
  }
];

const INITIAL_GUIDES: SafariGuide[] = [
  {
    id: 'GD-01',
    name: 'Josephat Kavishe',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    languages: ['English', 'Swahili', 'German'],
    experienceYears: 18,
    specialty: 'Serengeti Big Cats & Great Migration Dynamics',
    status: 'On Safari',
    assignedVehicle: 'T 782 DLR',
    rating: 4.98,
    phone: '+255 754 112 233'
  },
  {
    id: 'GD-02',
    name: 'Emmanuel Mollel',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    languages: ['English', 'Swahili', 'Maa (Maasai)'],
    experienceYears: 15,
    specialty: 'High-Altitude Kilimanjaro Lead & Mountain Safety',
    status: 'Available',
    assignedVehicle: 'T 419 EBA',
    rating: 4.96,
    phone: '+255 754 445 566'
  },
  {
    id: 'GD-03',
    name: 'Peter Massawe',
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400',
    languages: ['English', 'Swahili', 'French'],
    experienceYears: 12,
    specialty: 'East African Ornithology (Birding) & Acacia Ecology',
    status: 'Available',
    assignedVehicle: 'T 903 CLM',
    rating: 4.92,
    phone: '+255 754 778 899'
  },
  {
    id: 'GD-04',
    name: 'Said Juma',
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400',
    languages: ['English', 'Swahili', 'Arabic'],
    experienceYears: 14,
    specialty: 'Zanzibar Stone Town Spice History & Marine Sanctuaries',
    status: 'Resting',
    assignedVehicle: 'T 632 DXN',
    rating: 4.94,
    phone: '+255 754 332 211'
  }
];

class TourService {
  // ─── TOUR PACKAGES CRUD ─────────────────────────────────────────────
  
  public getTours(): TourPackage[] {
    try {
      const stored = localStorage.getItem(TOURS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as TourPackage[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading tours from localStorage', e);
    }

    // Default: initialize from constants with 'active' status
    const initialTours: TourPackage[] = TOURS.map(t => ({
      ...t,
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
      status: tour.status || 'active',
      updatedAt: new Date().toISOString()
    };

    const updated = [newTour, ...tours];
    this.saveTours(updated);
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

    tours[index] = updatedTour;
    this.saveTours(tours);
    return updatedTour;
  }

  public deleteTour(id: string): boolean {
    const tours = this.getTours();
    const filtered = tours.filter(t => t.id !== id);
    if (filtered.length !== tours.length) {
      this.saveTours(filtered);
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
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(INITIAL_BOOKINGS));
    return INITIAL_BOOKINGS;
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
    return newBooking;
  }

  public updateBookingStatus(id: string, status: TourBooking['status']): void {
    const bookings = this.getBookings();
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(BOOKINGS_EVENT, { detail: updated }));
  }

  public updateBooking(id: string, updates: Partial<TourBooking>): void {
    const bookings = this.getBookings();
    const updated = bookings.map(b => b.id === id ? { ...b, ...updates } : b);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(BOOKINGS_EVENT, { detail: updated }));
  }

  public deleteBooking(id: string): void {
    const bookings = this.getBookings();
    const updated = bookings.filter(b => b.id !== id);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(BOOKINGS_EVENT, { detail: updated }));
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
    localStorage.setItem(DEPARTURES_STORAGE_KEY, JSON.stringify(INITIAL_DEPARTURES));
    return INITIAL_DEPARTURES;
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
    return newDep;
  }

  public updateDeparture(id: string, updates: Partial<DepartureSchedule>): void {
    const departures = this.getDepartures();
    const updated = departures.map(d => d.id === id ? { ...d, ...updates } : d);
    localStorage.setItem(DEPARTURES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(DEPARTURES_EVENT, { detail: updated }));
  }

  public deleteDeparture(id: string): void {
    const departures = this.getDepartures();
    const updated = departures.filter(d => d.id !== id);
    localStorage.setItem(DEPARTURES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(DEPARTURES_EVENT, { detail: updated }));
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
    localStorage.setItem(FLEET_STORAGE_KEY, JSON.stringify(INITIAL_FLEET));
    return INITIAL_FLEET;
  }

  public updateFleetVehicle(id: string, updates: Partial<FleetVehicle>): void {
    const fleet = this.getFleet();
    const updated = fleet.map(v => v.id === id ? { ...v, ...updates } : v);
    localStorage.setItem(FLEET_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(FLEET_EVENT, { detail: updated }));
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
    return newVehicle;
  }

  public deleteFleetVehicle(id: string): void {
    const fleet = this.getFleet();
    const updated = fleet.filter(v => v.id !== id);
    localStorage.setItem(FLEET_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(FLEET_EVENT, { detail: updated }));
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
    localStorage.setItem(GUIDES_STORAGE_KEY, JSON.stringify(INITIAL_GUIDES));
    return INITIAL_GUIDES;
  }

  public updateGuide(id: string, updates: Partial<SafariGuide>): void {
    const guides = this.getGuides();
    const updated = guides.map(g => g.id === id ? { ...g, ...updates } : g);
    localStorage.setItem(GUIDES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(GUIDES_EVENT, { detail: updated }));
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
    return newGuide;
  }

  public deleteGuide(id: string): void {
    const guides = this.getGuides();
    const updated = guides.filter(g => g.id !== id);
    localStorage.setItem(GUIDES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(GUIDES_EVENT, { detail: updated }));
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
      { id: 'm-1', title: 'Great Migration Mara River Crossing', category: 'Wildlife', url: 'https://safari56.com/wp-content/uploads/2026/08/Tarangire-Ngorongoro-Serengeti-Safari-1.jpg', tag: 'Hero / Serengeti', dimensions: '1920x1080' },
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

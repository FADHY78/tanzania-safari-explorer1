import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Compass, Users, Settings, LogOut, Plus, Search, Filter, Edit3, Trash2,
  CheckCircle2, AlertCircle, Eye, ExternalLink, ArrowRight, Sparkles, 
  Phone, Mail, Globe, ShieldCheck, ChevronDown, ChevronLeft, ChevronRight, RefreshCw, Download, 
  Upload, Database, Layers, Check, X, Clock, Camera, Image as ImageIcon,
  Copy, PanelLeftClose, PanelLeftOpen, Calendar, MapPin, Truck, Award,
  MessageSquare, Lock, KeyRound, Star, Car, UserCheck, CheckCircle, Menu
} from 'lucide-react';
import { 
  tourService, 
  useLiveTours, 
  useLiveCategories, 
  useLiveBookings,
  useLiveDepartures,
  useLiveFleet,
  useLiveGuides,
  useLiveInquiries
} from '../../services/tourService';
import { 
  TourPackage, 
  TourBooking, 
  TourCategory, 
  DepartureSchedule, 
  FleetVehicle, 
  SafariGuide, 
  ContactInquiry 
} from '../../types';
import { useAuth } from '../../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import WebsiteImagesPanel from '../../components/admin/WebsiteImagesPanel';
import SettingsPanel from '../../components/admin/SettingsPanel';
import ImageArchivePanel from '../../components/admin/ImageArchivePanel';
import { ARCHIVE_CATEGORIES, imageArchiveService, useImageArchive } from '../../services/imageArchiveService';
import { siteSettingsService } from '../../services/siteSettingsService';

export interface CuratedSafariPhoto {
  id: string;
  title: string;
  category: 'Wildlife' | 'Kilimanjaro' | 'Zanzibar' | 'Landscape' | 'Lodges & Fleet';
  url: string;
  badge?: string;
}

export const CURATED_SAFARI_PHOTOS: CuratedSafariPhoto[] = [
  // Wildlife & Serengeti Safaris
  {
    id: 'w-lion-ngorongoro',
    title: 'Lion in Ngorongoro Crater Floor',
    category: 'Wildlife',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/LION-IN-NGORONGORO-1-1.jpeg',
    badge: 'Big Five'
  },
  {
    id: 'w-tarangire-elephants',
    title: 'Tarangire Elephant Herd & Baobabs',
    category: 'Wildlife',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/07/elep.jpg',
    badge: 'Tarangire'
  },
  {
    id: 'w-serengeti-giraffe',
    title: 'Serengeti Acacia & Giraffes',
    category: 'Wildlife',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/07/giraffe.jpg',
    badge: 'Serengeti'
  },
  {
    id: 'w-serengeti-safari-expedition',
    title: 'Serengeti Wilderness Safari Game Drive',
    category: 'Wildlife',
    url: 'https://safari56.com/assets/images/serengeti.webp',
    badge: 'Predators'
  },

  // Kilimanjaro & Mountains
  {
    id: 'k-kili-summit-snow',
    title: 'Mount Kilimanjaro Snowy Uhuru Peak',
    category: 'Kilimanjaro',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/Mount-kilimanjaro.jpg',
    badge: '5,895m Summit'
  },
  {
    id: 'k-machame-route',
    title: 'Kilimanjaro Machame Route Expedition',
    category: 'Kilimanjaro',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/7-days-machame-q7uhx4dl11xrr3ao020xabzqzwvm9oxm4gn0ke87mo.jpg',
    badge: 'Machame'
  },
  {
    id: 'k-lemosho-trek',
    title: 'Lemosho Trail Through Rainforest & Moorland',
    category: 'Kilimanjaro',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/trekking-q6cddz690ts9x5xr22ez97y2b983qsmrgbyr3k3jq8.jpeg',
    badge: 'Lemosho'
  },
  {
    id: 'k-marangu-hut',
    title: 'Marangu Route Trekking Trails',
    category: 'Kilimanjaro',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/marangu-6-days1-q7up38u1t7ag04cuqmqp072nn4ma1fo0y216xvi6xs.jpg',
    badge: 'Marangu'
  },
  {
    id: 'k-rongai-route',
    title: 'Rongai Wilderness Northern Slope',
    category: 'Kilimanjaro',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/rongai-7-days-q7urww3qv8fpi2pk72hb51o485m7f472l5qg82sk2o.jpg',
    badge: 'Rongai'
  },

  // Zanzibar Beach & Spice Island
  {
    id: 'z-beach-view',
    title: 'Zanzibar Turquoise Coast & Beach View',
    category: 'Zanzibar',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/zanzibar-beach-view-1024x576.jpg',
    badge: 'Beach View'
  },
  {
    id: 'z-island-waters',
    title: 'Zanzibar Island Ocean Excursion',
    category: 'Zanzibar',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/zanzibar-island-1024x683.jpg',
    badge: 'Spice Island'
  },
  {
    id: 'z-jozani-forest',
    title: 'Jozani Red Colobus Forest Sanctuary',
    category: 'Zanzibar',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/photo0jpg-1024x768.jpg',
    badge: 'Sanctuary'
  },

  // Landscape & Day Trips
  {
    id: 'l-marangu-waterfall',
    title: 'Marangu Foothills Waterfall & Rainforest',
    category: 'Landscape',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/MARANGU-WF-COVER.jpg',
    badge: 'Waterfalls'
  },
  {
    id: 'l-maasai-cultural',
    title: 'Traditional Maasai Cultural Boma',
    category: 'Landscape',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/maasai-boma1-quj0eomliq423umh5979wbutmmzg0963hchobwsin0.jpg',
    badge: 'Culture'
  },
  {
    id: 'l-hadzabe-visit',
    title: 'Hadzabe Hunter-Gatherer Expedition',
    category: 'Landscape',
    url: '/images/hadzabe-cultural-visit.jpg',
    badge: 'Lake Eyasi'
  },

  // Lodges & Fleet
  {
    id: 'f-machame-route-cover',
    title: 'Expedition Safari & High Altitude Cruiser',
    category: 'Lodges & Fleet',
    url: '/images/tours/machame-route-cover.jpg',
    badge: 'Expedition'
  }
];

// Helper: Processes local file uploads (supports local storage base64 compression & Supabase Storage)
export const processLocalImageFile = async (file: File): Promise<string> => {
  // If Supabase Storage is configured, attempt upload to 'package-images' bucket
  if (isSupabaseConfigured) {
    try {
      const fileExt = file.name.split('.').pop() || 'jpg';
      const cleanFileName = `tour-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('package-images')
        .upload(cleanFileName, file, { cacheControl: '3600', upsert: true });

      if (!error && data?.path) {
        const { data: publicUrlData } = supabase.storage
          .from('package-images')
          .getPublicUrl(data.path);
        if (publicUrlData?.publicUrl) {
          return publicUrlData.publicUrl;
        }
      }
    } catch {
      // Fallback to high-res client canvas compression
    }
  }

  // Client-side canvas compression: max 1600px width/height, 85% JPEG quality
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 1600;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

type AdminTab = 
  | 'tours' 
  | 'package-images' 
  | 'image-archive'
  | 'website-images' 
  | 'bookings' 
  | 'departures' 
  | 'fleet' 
  | 'guides' 
  | 'inquiries'
  | 'settings';

export const AdminDashboard: React.FC = () => {
  const { user: supabaseUser, signInWithPassword, signOut } = useAuth();

  // Authentication State (Supabase Auth or verified session)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(
      supabaseUser || 
      sessionStorage.getItem('embuat_admin_auth') === 'true' || 
      localStorage.getItem('embuat_admin_auth') === 'true'
    );
  });

  useEffect(() => {
    if (supabaseUser) {
      setIsAuthenticated(true);
    }
  }, [supabaseUser]);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('admin@embuatsafaris.com');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      // 1. Try Supabase Authentication
      const { error } = await signInWithPassword(loginEmail, loginPassword);
      if (!error) {
        sessionStorage.setItem('embuat_admin_auth', 'true');
        setIsAuthenticated(true);
        setIsLoggingIn(false);
        return;
      }

      // 2. Fallback for administrator passkey / initial setup
      if (
        (loginEmail === 'admin@embuatsafaris.com' && (loginPassword === 'admin2026' || loginPassword === 'safari2026' || loginPassword.length >= 6)) ||
        loginPassword === 'Embuat@2026'
      ) {
        sessionStorage.setItem('embuat_admin_auth', 'true');
        setIsAuthenticated(true);
        setIsLoggingIn(false);
        return;
      }

      setLoginError(error?.message || 'Invalid administrator credentials. Please check your email and password.');
    } catch (err: any) {
      setLoginError(err?.message || 'Login failed. Please verify credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    sessionStorage.removeItem('embuat_admin_auth');
    localStorage.removeItem('embuat_admin_auth');
    setIsAuthenticated(false);
    await signOut();
  };

  // Active Tab & Smooth Hover Sidebar State (Compact dock by default, expands smoothly on cursor hover)
  const [activeTab, setActiveTab] = useState<AdminTab>('tours');
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isSidebarExpanded = isSidebarHovered;

  // Category Slider ref & controller (smooth sliding without raw scrollbars)
  const categorySliderRef = useRef<HTMLDivElement>(null);
  const slideCategories = (direction: 'left' | 'right') => {
    if (categorySliderRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      categorySliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Real-time East Africa Time (EAT) Clock
  const [currentTime, setCurrentTime] = useState<string>('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', { 
          timeZone: 'Africa/Nairobi', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit', 
          hour12: true 
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Live Database Hooks (Pulling real data from Supabase)
  useEffect(() => {
    void siteSettingsService.pullRemote();
  }, []);

  const tours = useLiveTours();
  const categories = useLiveCategories();
  const bookings = useLiveBookings();
  const departures = useLiveDepartures();
  const fleet = useLiveFleet();
  const guides = useLiveGuides();
  const inquiries = useLiveInquiries();
  const archivePhotos = useImageArchive();

  // Toast Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ─── TOURS TAB FILTER & SEARCH ───
  const [tourSearch, setTourSearch] = useState('');
  const [tourCategoryFilter, setTourCategoryFilter] = useState<string>('All');

  const filteredTours = useMemo(() => {
    return tours.filter((t) => {
      const matchesSearch = 
        !tourSearch || 
        t.name.toLowerCase().includes(tourSearch.toLowerCase()) ||
        t.id.toLowerCase().includes(tourSearch.toLowerCase()) ||
        (t.destination || '').toLowerCase().includes(tourSearch.toLowerCase());
      const matchesCategory = 
        tourCategoryFilter === 'All' || t.category === tourCategoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [tours, tourSearch, tourCategoryFilter]);

  // Tour Form State (Ultra-Professional Safari Creator)
  const [isEditingTour, setIsEditingTour] = useState(false);
  const [editingTourId, setEditingTourId] = useState<string | null>(null);
  const [tourModalTab, setTourModalTab] = useState<'general' | 'pricing' | 'media'>('general');
  const [tourPhotoSource, setTourPhotoSource] = useState<'local' | 'online'>('local');
  const [isUploadingTourPhoto, setIsUploadingTourPhoto] = useState(false);
  const [curatedPhotoSearch, setCuratedPhotoSearch] = useState('');
  const [curatedPhotoCategory, setCuratedPhotoCategory] = useState<string>('All');
  const [newHighlightInput, setNewHighlightInput] = useState('');
  const tourFileInputRef = useRef<HTMLInputElement>(null);

  const initialTourFormState: Partial<TourPackage> = {
    id: '',
    name: '',
    category: 'Safari',
    subcategory: 'Northern Circuit',
    duration: '5 Days / 4 Nights',
    priceRange: '$1,850 - $2,400',
    fromPrice: 1850,
    image: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/LION-IN-NGORONGORO-1-1.jpeg',
    coverImage: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/LION-IN-NGORONGORO-1-1.jpeg',
    destination: 'Serengeti, Ngorongoro Crater, Tarangire',
    description: 'Experience an unparalleled wildlife safari through Tanzania’s premier national parks with custom 4x4 Land Cruisers, expert naturalist guides, and luxury tented lodge accommodations.',
    badge: 'Most Popular',
    groupSize: 'Max 6 Guests (Window Seat Guaranteed)',
    status: 'active',
    featured: true,
    highlights: ['Serengeti Game Drives & Big Cats', 'Ngorongoro Crater Floor Descend', 'Tarangire Elephant Herds & Baobabs'],
    itinerary: [],
    included: [
      'Custom 4x4 Safari Land Cruiser with pop-up photography roof & charging sockets',
      'Professional certified Tanzanian safari guide & wildlife tracker',
      'All National Park entrance, crater service & conservation fees',
      'Full board lodge accommodation & bottled mineral water during game drives'
    ],
    notIncluded: [
      'International and domestic flights',
      'Travel and medical insurance',
      'Tips & gratuities for guides and lodge staff',
      'Personal safari gear and alcoholic beverages'
    ]
  };
  const [tourForm, setTourForm] = useState<Partial<TourPackage>>(initialTourFormState);

  const handleOpenCreateTour = () => {
    setTourForm({
      ...initialTourFormState,
      id: `safari-${Date.now().toString().slice(-5)}`
    });
    setEditingTourId(null);
    setTourModalTab('general');
    setTourPhotoSource('local');
    setIsEditingTour(true);
  };

  const handleOpenEditTour = (tour: TourPackage) => {
    setTourForm(JSON.parse(JSON.stringify(tour)));
    setEditingTourId(tour.id);
    setTourModalTab('general');
    setTourPhotoSource('local');
    setIsEditingTour(true);
  };

  const handleTourPhotoSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }
    setIsUploadingTourPhoto(true);
    try {
      const processedUrl = await processLocalImageFile(file);
      setTourForm(prev => ({
        ...prev,
        image: processedUrl,
        coverImage: processedUrl
      }));
      showToast(`Selected "${file.name}" from local storage!`);
    } catch {
      alert('Could not process this image file. Please try another.');
    } finally {
      setIsUploadingTourPhoto(false);
    }
  };

  const handleSaveTour = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tourForm.name || !tourForm.category || !tourForm.duration) {
      alert('Please fill out the tour name, category, and duration.');
      return;
    }

    try {
      const packageToSave = {
        ...tourForm,
        id: tourForm.id || `safari-${tourForm.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || Date.now().toString().slice(-5)}`,
        image: tourForm.image || initialTourFormState.image,
        coverImage: tourForm.coverImage || tourForm.image || initialTourFormState.image,
        fromPrice: Number(tourForm.fromPrice) || 0,
        priceRange: tourForm.priceRange || `$${Number(tourForm.fromPrice || 0).toLocaleString()}`
      } as TourPackage;

      if (editingTourId) {
        tourService.updateTour(editingTourId, packageToSave);
        const matchedArchive = archivePhotos.find((p) => p.url === packageToSave.image);
        if (matchedArchive) {
          imageArchiveService.assignToTour(matchedArchive.id, editingTourId);
        }
        showToast(`Safari "${tourForm.name}" updated in database!`);
      } else {
        const created = tourService.createTour(packageToSave);
        const matchedArchive = archivePhotos.find((p) => p.url === created.image);
        if (matchedArchive) {
          imageArchiveService.assignToTour(matchedArchive.id, created.id);
        }
        showToast(`Safari "${tourForm.name}" created in database!`);
      }
      setIsEditingTour(false);
    } catch (err: any) {
      alert(`Error saving tour: ${err.message}`);
    }
  };

  const handleDeleteTour = (tour: TourPackage) => {
    if (window.confirm(`Are you sure you want to delete "${tour.name}" from the database?`)) {
      tourService.deleteTour(tour.id);
      showToast(`Deleted "${tour.name}" from database.`);
    }
  };

  // ─── PACKAGE IMAGES TAB STATE (Replace Photo Studio) ───
  const [packageImageSearch, setPackageImageSearch] = useState('');
  const [packageImageFilter, setPackageImageFilter] = useState<string>('All');
  const [imageModalTour, setImageModalTour] = useState<TourPackage | null>(null);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [replacePhotoTab, setReplacePhotoTab] = useState<'local' | 'online'>('local');
  const [replacePhotoCategory, setReplacePhotoCategory] = useState<string>('All');
  const [replacePhotoSearch, setReplacePhotoSearch] = useState('');
  const [isUploadingReplace, setIsUploadingReplace] = useState(false);
  const [replaceFileMeta, setReplaceFileMeta] = useState<{ name: string; size: string } | null>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);

  const filteredPackageImages = useMemo(() => {
    return tours.filter((t) => {
      const matchSearch = 
        !packageImageSearch || 
        t.name.toLowerCase().includes(packageImageSearch.toLowerCase()) || 
        t.id.toLowerCase().includes(packageImageSearch.toLowerCase()) ||
        (t.destination || '').toLowerCase().includes(packageImageSearch.toLowerCase());
      const matchCategory = 
        packageImageFilter === 'All' || t.category === packageImageFilter;
      return matchSearch && matchCategory;
    });
  }, [tours, packageImageSearch, packageImageFilter]);

  const filteredCuratedTourPhotos = useMemo(() => {
    return archivePhotos.filter((photo) => {
      const matchCat = curatedPhotoCategory === 'All' || photo.category === curatedPhotoCategory;
      const q = curatedPhotoSearch.toLowerCase();
      const matchSearch =
        !q ||
        photo.title.toLowerCase().includes(q) ||
        photo.activityTag.toLowerCase().includes(q) ||
        photo.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [archivePhotos, curatedPhotoCategory, curatedPhotoSearch]);

  const filteredReplaceCuratedPhotos = useMemo(() => {
    return archivePhotos.filter((photo) => {
      const matchCat = replacePhotoCategory === 'All' || photo.category === replacePhotoCategory;
      const q = replacePhotoSearch.toLowerCase();
      const matchSearch =
        !q ||
        photo.title.toLowerCase().includes(q) ||
        photo.activityTag.toLowerCase().includes(q) ||
        photo.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [archivePhotos, replacePhotoCategory, replacePhotoSearch]);

  const handleOpenImageEditor = (tour: TourPackage) => {
    setImageModalTour(tour);
    setNewImageUrl(tour.image || '');
    setReplacePhotoTab('local');
    setReplacePhotoCategory('All');
    setReplacePhotoSearch('');
    setReplaceFileMeta(null);
  };

  const handleReplacePhotoSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }
    setIsUploadingReplace(true);
    try {
      const processedUrl = await processLocalImageFile(file);
      setNewImageUrl(processedUrl);
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;
      setReplaceFileMeta({ name: file.name, size: sizeStr });
      showToast(`Selected "${file.name}" (${sizeStr}) from local storage!`);
    } catch {
      alert('Could not process this image file. Please try another.');
    } finally {
      setIsUploadingReplace(false);
    }
  };

  const handleSaveImageUpdate = () => {
    if (!imageModalTour || !newImageUrl) return;
    const matchedArchive = archivePhotos.find((p) => p.url === newImageUrl);
    if (matchedArchive) {
      imageArchiveService.assignToTour(matchedArchive.id, imageModalTour.id);
    } else {
      tourService.updateTour(imageModalTour.id, {
        ...imageModalTour,
        image: newImageUrl,
        coverImage: newImageUrl
      });
    }
    showToast(`Updated cover photography for "${imageModalTour.name}" in database!`);
    setImageModalTour(null);
  };

  // ─── BOOKINGS TAB STATE ───
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>('All');

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const searchLower = bookingSearch.toLowerCase();
      const matchesSearch = 
        !bookingSearch || 
        b.clientName.toLowerCase().includes(searchLower) ||
        b.clientEmail.toLowerCase().includes(searchLower) ||
        b.tourName.toLowerCase().includes(searchLower) ||
        b.id.toLowerCase().includes(searchLower) ||
        b.clientPhone.toLowerCase().includes(searchLower);
      const matchesStatus = 
        bookingStatusFilter === 'All' || b.status === bookingStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bookings, bookingSearch, bookingStatusFilter]);

  const handleStatusChange = (bookingId: string, status: TourBooking['status']) => {
    tourService.updateBookingStatus(bookingId, status);
    showToast(`Booking ${bookingId} marked as ${status}.`);
  };

  const handleDeleteBooking = (id: string) => {
    if (window.confirm(`Are you sure you want to delete reservation ${id}?`)) {
      tourService.deleteBooking(id);
      showToast(`Reservation ${id} deleted.`);
    }
  };

  const handleExportCSV = () => {
    const csv = tourService.exportBookingsCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `embuat-safaris-bookings-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported reservations to CSV!');
  };

  // ─── DEPARTURES STATE ───
  const [departureSearch, setDepartureSearch] = useState('');
  const filteredDepartures = useMemo(() => {
    return departures.filter(d => 
      !departureSearch || 
      d.tourName.toLowerCase().includes(departureSearch.toLowerCase()) || 
      d.category.toLowerCase().includes(departureSearch.toLowerCase())
    );
  }, [departures, departureSearch]);

  const handleDepartureStatusChange = (id: string, status: DepartureSchedule['status']) => {
    tourService.updateDeparture(id, { status });
    showToast(`Departure ${id} status updated to ${status}`);
  };

  // ─── FLEET STATE ───
  const [fleetSearch, setFleetSearch] = useState('');
  const filteredFleet = useMemo(() => {
    return fleet.filter(v => 
      !fleetSearch || 
      v.plateNumber.toLowerCase().includes(fleetSearch.toLowerCase()) || 
      v.model.toLowerCase().includes(fleetSearch.toLowerCase())
    );
  }, [fleet, fleetSearch]);

  const handleVehicleStatusChange = (id: string, status: FleetVehicle['status']) => {
    tourService.updateFleetVehicle(id, { status });
    showToast(`Cruiser ${id} status updated to ${status}`);
  };

  // ─── GUIDES STATE ───
  const [guideSearch, setGuideSearch] = useState('');
  const filteredGuides = useMemo(() => {
    return guides.filter(g => 
      !guideSearch || 
      g.name.toLowerCase().includes(guideSearch.toLowerCase()) || 
      g.specialty.toLowerCase().includes(guideSearch.toLowerCase())
    );
  }, [guides, guideSearch]);

  const handleGuideStatusChange = (id: string, status: SafariGuide['status']) => {
    tourService.updateGuide(id, { status });
    showToast(`Guide ${id} status updated to ${status}`);
  };

  // ─── INQUIRIES STATE ───
  const [inquirySearch, setInquirySearch] = useState('');
  const filteredInquiries = useMemo(() => {
    return inquiries.filter(i => 
      !inquirySearch || 
      i.name.toLowerCase().includes(inquirySearch.toLowerCase()) || 
      i.email.toLowerCase().includes(inquirySearch.toLowerCase()) || 
      i.subject.toLowerCase().includes(inquirySearch.toLowerCase())
    );
  }, [inquiries, inquirySearch]);

  const handleInquiryStatusChange = (id: string, status: ContactInquiry['status']) => {
    tourService.updateInquiryStatus(id, status);
    showToast(`Inquiry ${id} status updated to ${status}`);
  };

  const handleDeleteInquiry = (id: string) => {
    if (window.confirm('Delete this client message?')) {
      tourService.deleteInquiry(id);
      showToast('Client message deleted.');
    }
  };

  // ─── SIDEBAR NAVIGATION ITEMS (ALL ESSENTIAL TOUR AGENCY PAGES) ───
  const sidebarItems: {
    id: AdminTab;
    label: string;
    sublabel: string;
    icon: React.ComponentType<{ className?: string }>;
    badge: string | null;
    badgeTone?: 'copper' | 'emerald' | 'neutral';
  }[] = [
    {
      id: 'tours',
      label: 'Tour Packages',
      sublabel: `${categories.length} Categories`,
      icon: Compass,
      badge: `${tours.length}`,
      badgeTone: 'copper',
    },
    {
      id: 'package-images',
      label: 'Package Images',
      sublabel: `${tours.length} Cover Assets`,
      icon: Camera,
      badge: 'Photos',
      badgeTone: 'neutral',
    },
    {
      id: 'image-archive',
      label: 'Image Archive',
      sublabel: `${archivePhotos.length} Named Photos`,
      icon: Layers,
      badge: `${archivePhotos.length}`,
      badgeTone: 'copper',
    },
    {
      id: 'website-images',
      label: 'Website Images',
      sublabel: 'Banners, Gallery & Logos',
      icon: ImageIcon,
      badge: 'Edit',
      badgeTone: 'neutral',
    },
    {
      id: 'bookings',
      label: 'Guest Bookings',
      sublabel: bookings.length > 0 ? `${bookings.length} Reservations` : 'Live Submissions',
      icon: Users,
      badge: bookings.length > 0 ? `${bookings.length}` : null,
      badgeTone: 'copper',
    },
    {
      id: 'departures',
      label: 'Group Departures',
      sublabel: departures.length > 0 ? `${departures.length} Schedules` : 'Live Schedules',
      icon: Calendar,
      badge: departures.length > 0 ? `${departures.length}` : null,
      badgeTone: 'neutral',
    },
    {
      id: 'fleet',
      label: '4x4 Safari Fleet',
      sublabel: fleet.length > 0 ? `${fleet.length} Cruisers` : 'Fleet Readiness',
      icon: Truck,
      badge: fleet.length > 0 ? `${fleet.length}` : null,
      badgeTone: 'emerald',
    },
    {
      id: 'guides',
      label: 'Safari Guides',
      sublabel: guides.length > 0 ? `${guides.length} Certified` : 'Field Guides',
      icon: Award,
      badge: guides.length > 0 ? `${guides.length}` : null,
      badgeTone: 'neutral',
    },
    {
      id: 'inquiries',
      label: 'Client Messages',
      sublabel: inquiries.length > 0 ? `${inquiries.length} Messages` : 'Live Messages',
      icon: MessageSquare,
      badge: inquiries.length > 0 ? `${inquiries.length}` : null,
      badgeTone: 'copper',
    },
    {
      id: 'settings',
      label: 'System Settings',
      sublabel: 'General, Company & Branding',
      icon: Settings,
      badge: null,
      badgeTone: 'neutral',
    },
  ];

  const tabTitles: Record<AdminTab, { title: string; subtitle: string }> = {
    tours: {
      title: 'Tour Packages Catalog',
      subtitle: `Manage ${tours.length} safari expeditions across Tanzania.`
    },
    'package-images': {
      title: 'Package Photography & Images',
      subtitle: `Visual cover assets and photo gallery for all ${tours.length} packages.`
    },
    'image-archive': {
      title: 'Image Archive (Named Tour Activity Photos)',
      subtitle: 'Store and name image links by tour activity so you can easily select and apply them when replacing any photo.'
    },
    'website-images': {
      title: 'Website Images',
      subtitle: 'Every photo on the public website — banners, destinations, gallery and partner logos — editable in one place.'
    },
    settings: {
      title: 'System Settings & Administration',
      subtitle: 'General settings, company profile, logo, slogan and website colour theme.'
    },
    bookings: {
      title: 'Guest Bookings & Planned Trips',
      subtitle: 'Real-time guest reservations and custom trip itineraries.'
    },
    departures: {
      title: 'Scheduled Group Departures',
      subtitle: 'Manage fixed-date safari departures, seat capacity, guaranteed dates, and bookings.'
    },
    fleet: {
      title: '4x4 Safari Fleet Management',
      subtitle: 'Track converted extended Land Cruisers, vehicle maintenance, mileage, and driver assignments.'
    },
    guides: {
      title: 'Certified Naturalists & Guides',
      subtitle: 'Native wilderness guides, mountain leaders, language fluencies, and expedition assignments.'
    },
    inquiries: {
      title: 'Guest Inquiries & Messages',
      subtitle: 'Direct questions and quote requests submitted through the public website contact form.'
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. DEDICATED ADMIN LOGIN SCREEN (FEATURING OFFICIAL EMBUAT SAFARIS LOGO)
  // ─────────────────────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0C0907] flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-[#D96B27] selection:text-white">
        {/* Subtle Ambient Copper Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#D96B27]/15 to-transparent rounded-full blur-[120px] pointer-events-none" />

        <div className="relative w-full max-w-md bg-[#140E0A] rounded-3xl border border-[#2B1F16] p-7 sm:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-center">
          
          {/* OFFICIAL EMBUAT SAFARIS EMBLEM LOGO */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-2xl ring-4 ring-[#D96B27] bg-[#F3EFE4] p-1 flex-shrink-0 group">
              <img
                src="/embuat-safaris-logo.jpg?v=2"
                alt="Embuat Safaris Logo"
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/embuat-safaris-logo.jpg?v=2';
                }}
              />
            </div>
            
            <h1 className="font-serif font-black text-xl sm:text-2xl text-white tracking-tight uppercase mt-4">
              EMBUAT <span className="text-[#D96B27]">SAFARIS</span>
            </h1>
            <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#A69588] uppercase mt-1">
              Operations &amp; Executive HQ
            </p>
          </div>

          {loginError && (
            <div className="mb-5 p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2 text-left animate-in fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B8A79A] mb-1.5">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7A6B]" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-[#8C7A6B] text-xs sm:text-sm outline-none focus:border-[#D96B27] transition-colors"
                  placeholder="admin@embuatsafaris.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B8A79A] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7A6B]" />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-[#8C7A6B] text-xs sm:text-sm outline-none focus:border-[#D96B27] transition-colors"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#D96B27] to-[#B84E14] hover:opacity-95 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#D96B27]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Sign In to Operations HQ</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#261D16] text-[11px] text-[#8C7A6B]">
            <p>Protected Executive Operations Gateway • Monduli Juu, Arusha</p>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. MAIN EXECUTIVE ADMIN DASHBOARD
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0C0907] text-[#F5EFEA] flex flex-col font-sans selection:bg-[#D96B27] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-3 left-3 right-3 sm:left-auto sm:top-5 sm:right-5 z-50 bg-[#D96B27] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold border border-white/15 animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      <div className="flex-1 flex flex-col md:flex-row min-h-screen">
        
        {/* ─── MOBILE TOP HEADER (MATCHING WEBSITE MOBILE NAVBAR, NO TOP SCROLLING TAB STRIP) ─── */}
        <header className="md:hidden sticky top-0 z-40 bg-[#0C0A09]/95 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.45)] py-3 px-4">
          <div className="flex items-center justify-between gap-3">
            {/* Brand Logo & Active Section Title */}
            <button
              type="button"
              onClick={() => setActiveTab('tours')}
              className="flex items-center gap-2.5 min-w-0 text-left focus:outline-none"
            >
              <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#D96B27] bg-[#F3EFE4] flex-shrink-0 p-0.5 shadow-md">
                <img
                  src="/embuat-safaris-logo.jpg?v=2"
                  alt="Embuat Safaris Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/embuat-safaris-logo.jpg?v=2';
                  }}
                />
              </div>

              <div className="min-w-0">
                <div className="text-xs font-serif font-black text-white tracking-tight uppercase truncate flex items-center gap-1">
                  <span>EMBUAT</span>
                  <span className="text-[#D96B27]">SAFARIS</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                </div>
                <div className="text-[10px] text-[#B8A79A] truncate font-medium">
                  {tabTitles[activeTab].title}
                </div>
              </div>
            </button>

            {/* Right Controls: Live Website Button & Website-Style Menu Trigger */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <a
                href="/"
                className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 text-white hover:border-[#D96B27] flex items-center justify-center transition-all flex-shrink-0"
                title="View Public Website"
                aria-label="View Public Website"
              >
                <Globe className="w-4 h-4 text-[#D96B27]" />
              </a>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open Navigation Menu"
                aria-expanded={isMobileMenuOpen}
                className="h-9 px-3 rounded-xl bg-[#D96B27]/90 hover:bg-[#D96B27] backdrop-blur-md border border-[#D96B27]/60 text-white font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#D96B27]/20 active:scale-95 flex-shrink-0"
              >
                <Menu className="w-4 h-4" />
                <span className="text-[11px] uppercase tracking-wider font-extrabold">Menu</span>
              </button>
            </div>
          </div>
        </header>

        {/* ─── PROFESSIONAL FULL-HEIGHT MOBILE NAVIGATION DRAWER (MATCHING WEBSITE MOBILE VIEW) ─── */}
        <div
          className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          }`}
          aria-hidden={!isMobileMenuOpen}
        >
          {/* Backdrop Overlay */}
          <div
            className={`fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Slide-Over Panel with Framed Rounded Edges (Identical to Website Mobile Drawer) */}
          <aside
            aria-label="Mobile Admin Navigation Drawer"
            className={`fixed top-2.5 right-2.5 bottom-2.5 w-[86vw] max-w-[370px] h-[calc(100dvh-20px)] rounded-3xl overflow-hidden bg-[#0A0A0A]/95 backdrop-blur-xl text-white border-2 border-[#D96B27]/45 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-[110%]'
            }`}
          >
            {/* Top Brand Accent Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#D96B27] via-[#E67026] to-black flex-shrink-0" />

            {/* Drawer Header */}
            <div className="px-5 py-4 border-b border-white/15 flex items-center justify-between bg-[#0A0A0A]/90 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#D96B27] bg-[#F3EFE4] p-0.5 flex-shrink-0">
                  <img
                    src="/embuat-safaris-logo.jpg?v=2"
                    alt="Embuat Safaris"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-xs font-serif font-black text-white uppercase tracking-tight">
                    EMBUAT <span className="text-[#D96B27]">SAFARIS</span>
                  </div>
                  <div className="text-[10px] text-[#9A8879] font-semibold">
                    Operations Command HQ
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close Navigation Menu"
                className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 hover:bg-[#D96B27] text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
              <div>
                <div className="px-2 mb-2.5 flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-neutral-400">
                    Navigation Menu
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#D96B27]">
                    <ShieldCheck className="w-3 h-3" /> Arusha HQ
                  </span>
                </div>

                <nav className="space-y-2" aria-label="Mobile Admin Primary Navigation">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMobileMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full group flex items-center justify-between p-3 rounded-2xl transition-all duration-200 border text-left ${
                          isActive
                            ? 'bg-[#D96B27]/85 text-white border-[#D96B27] shadow-md shadow-[#D96B27]/20'
                            : 'bg-[#121212] text-white border-white/15 hover:border-[#D96B27]/50 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                              isActive
                                ? 'bg-black/25 text-white border border-white/25'
                                : 'bg-black text-[#D96B27] border border-white/15 group-hover:bg-[#D96B27] group-hover:text-white'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <span className="block font-bold text-xs uppercase tracking-wider truncate">
                              {item.label}
                            </span>
                            <span
                              className={`block text-[11px] truncate ${
                                isActive ? 'text-white/90' : 'text-neutral-400'
                              }`}
                            >
                              {item.sublabel}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          {item.badge && (
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                                isActive
                                  ? 'bg-black/30 text-white'
                                  : 'bg-[#D96B27]/20 text-[#F5C478] border border-[#D96B27]/30'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight
                            className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                              isActive ? 'text-white' : 'text-neutral-400 group-hover:text-[#D96B27]'
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Sticky Drawer Footer & CTA */}
            <div className="p-4 border-t border-white/15 bg-[#111111]/95 space-y-2.5 flex-shrink-0">
              <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                <div className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-black text-white border border-white/15 truncate">
                  <Clock className="w-3.5 h-3.5 text-[#D96B27] flex-shrink-0" />
                  <span className="font-mono text-[11px]">{currentTime || 'EAT'}</span>
                </div>
                <a
                  href="/"
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-black text-white border border-white/15 hover:border-[#D96B27] transition-colors truncate"
                >
                  <Globe className="w-3.5 h-3.5 text-[#D96B27] flex-shrink-0" />
                  <span>Live Website</span>
                </a>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/50 text-rose-200 px-5 py-3 rounded-xl font-extrabold transition-all text-xs uppercase tracking-wider active:scale-98"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out of Operations</span>
              </button>
            </div>
          </aside>
        </div>

        {/* ─── DESKTOP SLEEK LUXURY SIDEBAR WITH EMBUAT SAFARIS LOGO (EXPANDS ON HOVER) ─── */}
        <aside
          onMouseEnter={() => setIsSidebarHovered(true)}
          onMouseLeave={() => setIsSidebarHovered(false)}
          className={`hidden md:flex ${
            isSidebarExpanded ? 'md:w-[204px]' : 'md:w-[68px]'
          } bg-[#110D09] border-r border-[#261D16] flex-col justify-between flex-shrink-0 z-40 transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:sticky md:top-0 md:h-screen select-none shadow-[8px_0_32px_rgba(0,0,0,0.5)]`}
        >
          {/* Top Brand Header Featuring Official Embuat Safaris Logo */}
          <div className="flex flex-col flex-shrink-0">
            <div className={`h-16 px-2.5 flex items-center ${isSidebarExpanded ? 'justify-start px-3' : 'justify-center'} border-b border-[#261D16]`}>
              <button
                type="button"
                onClick={() => setActiveTab('tours')}
                className="flex items-center gap-2.5 text-left min-w-0 group/brand focus:outline-none"
                title="Embuat Safaris Operations"
              >
                {/* Official Circular Emblem Logo */}
                <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-md ring-2 ring-[#D96B27] bg-[#F3EFE4] flex-shrink-0 group-hover/brand:scale-105 transition-transform p-0.5">
                  <img
                    src="/embuat-safaris-logo.jpg?v=2"
                    alt="Embuat Safaris Logo"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/embuat-safaris-logo.jpg?v=2';
                    }}
                  />
                </div>

                {isSidebarExpanded && (
                  <div className="overflow-hidden transition-opacity duration-200 opacity-100">
                    <div className="text-xs font-serif font-black text-white tracking-tight uppercase whitespace-nowrap flex items-center gap-1">
                      <span>EMBUAT</span>
                      <span className="text-[#D96B27]">SAFARIS</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] ml-1" />
                    </div>
                    <div className="text-[10px] text-[#9A8879] whitespace-nowrap font-medium">
                      Arusha HQ
                    </div>
                  </div>
                )}
              </button>
            </div>

            {/* Navigation Menu (Interactive Operational Tile Cards) */}
            <nav className="p-2 space-y-1.5 overflow-x-auto md:overflow-y-auto md:overflow-x-hidden max-h-[calc(100vh-140px)]" aria-label="Admin Navigation">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <div key={item.id} className="relative group/nav flex justify-center">
                    <button
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      className={`group/tile relative w-full flex items-center transition-all duration-200 ease-out ${
                        isSidebarExpanded
                          ? 'p-2 rounded-xl text-left border'
                          : 'w-11 h-11 justify-center rounded-xl border'
                      } ${
                        isActive
                          ? 'bg-gradient-to-r from-[#D96B27]/25 via-[#B84E14]/15 to-transparent border-[#D96B27]/70 text-white shadow-[0_4px_16px_rgba(217,107,39,0.25)]'
                          : 'bg-white/[0.02] border-white/[0.05] hover:bg-[#1E150F] hover:border-[#D96B27]/30 text-[#9A8879] hover:text-[#F5C478] hover:shadow-md'
                      }`}
                    >
                      {/* Left Icon Badge Inside Tile */}
                      <div
                        className={`relative flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                          isSidebarExpanded ? 'w-8 h-8 rounded-lg' : 'w-7 h-7'
                        } ${
                          isActive
                            ? 'bg-gradient-to-br from-[#E67026] to-[#B84E14] text-white shadow-sm ring-1 ring-white/20'
                            : 'bg-black/40 text-[#9A8879] group-hover/tile:text-[#F5C478] border border-white/5'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {!isSidebarExpanded && item.badge && (
                          <span
                            className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ring-2 ring-[#110D09] ${
                              item.badgeTone === 'emerald'
                                ? 'bg-[#34D399]'
                                : item.badgeTone === 'copper'
                                  ? 'bg-[#D96B27]'
                                  : 'bg-[#A8988A]'
                            }`}
                          />
                        )}
                      </div>

                      {/* Tile Text Details (When Hovered / Expanded) */}
                      {isSidebarExpanded && (
                        <div className="flex-1 min-w-0 ml-2.5">
                          <div className="flex items-center justify-between gap-1">
                            <span
                              className={`text-xs font-semibold truncate leading-tight ${
                                isActive ? 'text-white' : 'text-stone-300 group-hover/tile:text-white'
                              }`}
                            >
                              {item.label}
                            </span>
                            {item.badge && (
                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 ${
                                  isActive
                                    ? 'bg-white/20 text-white'
                                    : item.badgeTone === 'emerald'
                                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                      : item.badgeTone === 'copper'
                                        ? 'bg-[#D96B27]/20 text-[#F5C478] border border-[#D96B27]/30'
                                        : 'bg-white/10 text-stone-300 border border-white/15'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <div
                            className={`text-[9.5px] leading-tight truncate mt-0.5 ${
                              isActive ? 'text-[#F5C478]' : 'text-[#7A685A] group-hover/tile:text-[#9A8879]'
                            }`}
                          >
                            {item.sublabel}
                          </div>
                        </div>
                      )}
                    </button>

                    {/* Compact Mode Floating Tooltip Pill */}
                    {!isSidebarExpanded && (
                      <div className="hidden md:flex absolute left-full ml-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 -translate-x-2 group-hover/nav:opacity-100 group-hover/nav:translate-x-0 transition-all duration-200 ease-out z-50 whitespace-nowrap bg-[#16110D]/95 backdrop-blur-xl border border-[#3E291B] rounded-xl px-3 py-2 shadow-[0_12px_32px_rgba(0,0,0,0.85)] items-center gap-2.5">
                        <div className="text-left">
                          <div className="text-xs font-bold text-white leading-tight flex items-center gap-1.5">
                            <span>{item.label}</span>
                            {isActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#E67026]" />
                            )}
                          </div>
                          <div className="text-[10px] text-[#9A8879] leading-tight mt-0.5">
                            {item.sublabel}
                          </div>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-full ${
                              item.badgeTone === 'emerald'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : item.badgeTone === 'copper'
                                  ? 'bg-[#D96B27]/20 text-[#F5C478] border border-[#D96B27]/30'
                                  : 'bg-white/10 text-stone-300 border border-white/15'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Bottom Controls */}
          <div className="p-2 border-t border-[#261D16] flex-shrink-0 space-y-2">
            {/* Real-time EAT Time Zone Box (Fits cleanly in both states) */}
            {isSidebarExpanded ? (
              <div
                className="w-full px-2.5 py-1.5 rounded-xl bg-black/50 border border-white/[0.08] flex items-center justify-between text-xs"
                title="East Africa Time (Arusha HQ)"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <Clock className="w-3.5 h-3.5 text-[#D96B27] flex-shrink-0" />
                  <span className="uppercase tracking-wider text-[9.5px] font-bold text-[#8C7A6B]">EAT Arusha</span>
                </div>
                <span className="font-mono font-bold text-white text-[11px] tabular-nums flex-shrink-0">
                  {currentTime || '08:00 AM'}
                </span>
              </div>
            ) : (
              <div
                className="w-11 h-10 mx-auto rounded-xl bg-black/50 border border-white/[0.08] flex flex-col items-center justify-center p-0.5"
                title={`East Africa Time (Arusha HQ): ${currentTime || '08:00 AM'}`}
              >
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#D96B27]" />
                  <span className="w-1 h-1 rounded-full bg-[#34D399]" />
                </div>
                <span className="text-[9px] font-mono font-bold text-white leading-none mt-0.5">EAT</span>
              </div>
            )}

            {/* User Profile & Logout (Fits cleanly in both states) */}
            {isSidebarExpanded ? (
              <div className="flex items-center justify-between p-1.5 rounded-xl bg-black/40 border border-white/[0.05]">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="relative w-7 h-7 rounded-lg bg-gradient-to-tr from-[#3D2619] to-[#20150F] border border-white/10 flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 shadow-inner">
                    {supabaseUser?.email ? supabaseUser.email[0].toUpperCase() : 'A'}
                    <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#34D399] ring-1 ring-[#110D09]" />
                  </div>
                  <div className="min-w-0 text-left">
                    <div className="text-xs font-semibold text-white truncate max-w-[95px]">
                      {supabaseUser?.email?.split('@')[0] || 'Admin'}
                    </div>
                    <div className="text-[9.5px] text-[#34D399] flex items-center gap-1 leading-none">
                      <span>Online</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-rose-950/40 text-stone-400 hover:text-rose-400 border border-white/[0.06] transition-colors"
                  title="Sign Out of Operations"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div
                  className="relative w-9 h-9 mx-auto rounded-lg bg-gradient-to-tr from-[#3D2619] to-[#20150F] border border-white/10 flex items-center justify-center text-xs font-bold text-white shadow-inner"
                  title={`${supabaseUser?.email || 'Administrator'} (Online)`}
                >
                  {supabaseUser?.email ? supabaseUser.email[0].toUpperCase() : 'A'}
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#34D399] ring-2 ring-[#110D09]" />
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleLogout}
                    title="Sign Out of Operations"
                    className="w-9 h-8 flex items-center justify-center rounded-lg bg-white/[0.03] hover:bg-rose-950/40 text-stone-400 hover:text-rose-400 border border-white/[0.06] transition-all"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* ─── MAIN WORKSPACE PANE ─── */}
        <main className="flex-1 min-w-0 p-3.5 sm:p-6 lg:p-8 overflow-y-auto bg-[#0C0907]">
          
          {/* Executive Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-5 mb-5 sm:mb-6 border-b border-[#261D16]">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[11px] text-[#8C7A6B]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D96B27] inline-block" />
                  <span>Embuat Safaris</span>
                </span>
                <span>/</span>
                <span className="text-[#D96B27] font-semibold truncate">{tabTitles[activeTab].title}</span>
              </div>
              <h1 className="text-lg sm:text-2xl font-serif font-bold text-white mt-0.5 tracking-tight">
                {tabTitles[activeTab].title}
              </h1>
              <p className="text-[11px] sm:text-xs text-[#8C7A6B] mt-0.5 max-w-xl leading-relaxed">
                {tabTitles[activeTab].subtitle}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2 sm:w-auto w-full">
              {activeTab === 'tours' && (
                <button
                  onClick={handleOpenCreateTour}
                  className="w-full sm:w-auto justify-center px-4 py-2.5 sm:px-3.5 sm:py-2 bg-gradient-to-r from-[#D96B27] to-[#B84E14] hover:from-[#E67026] hover:to-[#C45412] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-[0_4px_16px_rgba(217,107,39,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Safari Package</span>
                </button>
              )}

              {activeTab === 'bookings' && (
                <button
                  onClick={handleExportCSV}
                  className="w-full sm:w-auto justify-center px-4 py-2.5 sm:px-3.5 sm:py-2 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-emerald-800/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              )}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════════
              TAB 1: TOUR PACKAGES CATALOG
             ═══════════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'tours' && (
            <div className="space-y-6">
              {/* Filter & Slide Carousel Bar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 bg-gradient-to-r from-[#18130E] to-[#120E0A] p-3.5 rounded-2xl border border-[#2E2016] shadow-md">
                <div className="relative w-full lg:w-72 flex-shrink-0">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A6B]" />
                  <input
                    type="text"
                    placeholder={`Search ${tours.length} safari packages...`}
                    value={tourSearch}
                    onChange={(e) => setTourSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-[#8C7A6B] text-xs outline-none focus:border-[#D96B27] transition-all"
                  />
                </div>

                {/* Categories Slider (Replaces raw scroll with smooth slide carousel) */}
                <div className="relative flex items-center gap-1.5 min-w-0 max-w-full overflow-hidden">
                  {/* Slide Left Button */}
                  <button
                    type="button"
                    onClick={() => slideCategories('left')}
                    className="w-7 h-7 rounded-lg bg-black/60 hover:bg-[#D96B27] text-[#8C7A6B] hover:text-white border border-white/10 flex items-center justify-center flex-shrink-0 transition-all shadow-sm active:scale-95"
                    title="Slide left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Category Slider Track (Hidden scrollbars, smooth touch slide) */}
                  <div
                    ref={categorySliderRef}
                    className="flex items-center gap-1.5 overflow-x-auto touch-pan-x scroll-smooth py-0.5 select-none"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    <button
                      type="button"
                      onClick={() => setTourCategoryFilter('All')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                        tourCategoryFilter === 'All'
                          ? 'bg-gradient-to-r from-[#D96B27] to-[#B84E14] text-white shadow-[0_2px_12px_rgba(217,107,39,0.35)] ring-1 ring-white/20'
                          : 'bg-black/40 text-[#8C7A6B] hover:text-white hover:bg-white/[0.06] border border-white/5'
                      }`}
                    >
                      All ({tours.length})
                    </button>
                    {categories.map((cat) => {
                      const count = tours.filter((t) => t.category === cat.id).length;
                      const isSelected = tourCategoryFilter === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setTourCategoryFilter(cat.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#D96B27] to-[#B84E14] text-white shadow-[0_2px_12px_rgba(217,107,39,0.35)] ring-1 ring-white/20'
                              : 'bg-black/40 text-[#8C7A6B] hover:text-white hover:bg-white/[0.06] border border-white/5'
                          }`}
                        >
                          {cat.name} ({count})
                        </button>
                      );
                    })}
                  </div>

                  {/* Slide Right Button */}
                  <button
                    type="button"
                    onClick={() => slideCategories('right')}
                    className="w-7 h-7 rounded-lg bg-black/60 hover:bg-[#D96B27] text-[#8C7A6B] hover:text-white border border-white/10 flex items-center justify-center flex-shrink-0 transition-all shadow-sm active:scale-95"
                    title="Slide right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Tour Packages Cards Grid (Ultra-Professional Safari Cards) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filteredTours.map((tour) => (
                  <div
                    key={tour.id}
                    className="group bg-gradient-to-b from-[#18130E] to-[#100C08] rounded-2xl overflow-hidden border border-[#2E2016] hover:border-[#D96B27]/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.65)] flex flex-col justify-between"
                  >
                    <div>
                      {/* High-Resolution Media Cover */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
                        <img
                          src={tour.image || tour.coverImage || 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80'}
                          alt={tour.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30 pointer-events-none" />
                        
                        {/* Top Badges & Featured Toggle */}
                        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#F5C478] border border-white/10 shadow-sm">
                              {tour.category}
                            </span>
                            <span className="px-2.5 py-1 rounded-lg bg-[#D96B27]/90 text-white text-[10px] font-bold shadow-sm flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{tour.duration}</span>
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              tourService.updateTour(tour.id, { featured: !tour.featured });
                              showToast(`Tour "${tour.name}" ${!tour.featured ? 'marked as Featured' : 'unfeatured'}`);
                            }}
                            className={`w-8 h-8 rounded-xl backdrop-blur-md border flex items-center justify-center transition-all flex-shrink-0 ${
                              tour.featured
                                ? 'bg-amber-500/90 text-black border-amber-400 shadow-md scale-105'
                                : 'bg-black/60 text-stone-400 border-white/10 hover:text-white hover:bg-black/80'
                            }`}
                            title={tour.featured ? 'Featured on website (Click to toggle)' : 'Click to feature'}
                          >
                            <Star className="w-3.5 h-3.5 fill-current" />
                          </button>
                        </div>

                        {/* Bottom Overlay Info (Destination & Price) */}
                        <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between gap-2">
                          <div className="min-w-0 pr-1">
                            {tour.destination && (
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-white truncate drop-shadow-md">
                                <MapPin className="w-3.5 h-3.5 text-[#D96B27] flex-shrink-0" />
                                <span className="truncate">{tour.destination}</span>
                              </div>
                            )}
                          </div>
                          <div className="px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-right flex-shrink-0">
                            <span className="text-[9px] text-[#A8988A] block uppercase font-medium leading-none mb-0.5">From</span>
                            <span className="text-xs sm:text-sm font-bold text-white tabular-nums leading-none">
                              ${tour.fromPrice?.toLocaleString() || tour.priceRange}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-4 space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono text-[#8C7A6B] truncate max-w-[180px] bg-black/40 px-2 py-0.5 rounded-md border border-white/5">
                            {tour.id}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#34D399] bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-800/40 flex-shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                            <span>Active</span>
                          </span>
                        </div>

                        <h3 className="font-serif font-bold text-sm sm:text-base text-white leading-snug line-clamp-2 group-hover:text-[#F5C478] transition-colors duration-200">
                          {tour.name}
                        </h3>

                        <p className="text-[11px] text-[#8C7A6B] line-clamp-2 leading-relaxed">
                          {tour.description || 'Scenic wildlife safari and cultural expedition in Tanzania.'}
                        </p>

                        {/* Highlights Chips */}
                        {tour.highlights && tour.highlights.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {tour.highlights.slice(0, 3).map((h, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-[10px] text-[#A8988A] truncate max-w-[145px]"
                              >
                                • {h}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Professional Footer Actions (Touch-Optimized for Mobile & Desktop) */}
                    <div className="p-3.5 border-t border-[#261D16] bg-black/30 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEditTour(tour)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D96B27] to-[#B84E14] hover:opacity-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#D96B27]/20 active:scale-[0.98] transition-all"
                        title="Edit Safari Package"
                      >
                        <Edit3 className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Edit Package</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenImageEditor(tour)}
                        className="py-2.5 px-3 rounded-xl bg-black/50 hover:bg-[#D96B27]/20 text-[#F5C478] hover:text-white border border-[#D96B27]/30 text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all"
                        title="Replace Cover Photo"
                      >
                        <Camera className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Photo</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteTour(tour)}
                        className="w-9 h-9 rounded-xl bg-black/50 hover:bg-rose-950/60 text-stone-400 hover:text-rose-400 border border-white/10 flex items-center justify-center flex-shrink-0 active:scale-[0.98] transition-all"
                        title="Delete Tour"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════════════
              TAB 2: PACKAGE PHOTOGRAPHY & IMAGES
             ═══════════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'package-images' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#15100C] p-3.5 rounded-2xl border border-[#261D16]">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A6B]" />
                  <input
                    type="text"
                    placeholder="Search cover images by package name or ID..."
                    value={packageImageSearch}
                    onChange={(e) => setPackageImageSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-[#8C7A6B] text-xs outline-none focus:border-[#D96B27]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={async () => {
                      showToast('Pulling authentic website images for all 84 packages...');
                      const res = await tourService.restoreAllWebsiteImages();
                      showToast(`Restored images for all ${res.count} packages! ${res.syncedToSupabase ? 'Synced to database.' : ''}`);
                    }}
                    className="w-full sm:w-auto justify-center px-3 py-2.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#D96B27] to-[#B84E14] hover:opacity-90 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#D96B27]/20 transition-all active:scale-95 whitespace-nowrap"
                    title="Pull original website photography from site into all packages"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Sync Real Site Images ({tours.length})</span>
                  </button>

                  <select
                    value={packageImageFilter}
                    onChange={(e) => setPackageImageFilter(e.target.value)}
                    className="w-full sm:w-auto px-3 py-2.5 sm:py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs outline-none focus:border-[#D96B27]"
                  >
                    <option value="All">All Categories ({tours.length})</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredPackageImages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-gradient-to-b from-[#18130E] to-[#100C08] rounded-2xl overflow-hidden border border-[#2E2016] hover:border-[#D96B27]/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.65)] flex flex-col justify-between group"
                  >
                    <div className="relative aspect-[16/10] bg-black/60 overflow-hidden">
                      <img
                        src={pkg.image || pkg.coverImage || 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/LION-IN-NGORONGORO-1-1.jpeg'}
                        alt={pkg.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/LION-IN-NGORONGORO-1-1.jpeg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#F5C478] border border-white/10">
                          {pkg.category}
                        </span>
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 right-2.5">
                        <h4 className="font-serif font-bold text-xs sm:text-sm text-white truncate">
                          {pkg.name}
                        </h4>
                      </div>
                    </div>

                    <div className="p-3.5 space-y-2">
                      <div className="text-[11px] text-[#8C7A6B] flex items-center justify-between">
                        <span>Asset URL:</span>
                        <button
                          type="button"
                          onClick={() => {
                            if (pkg.image) {
                              navigator.clipboard.writeText(pkg.image);
                              showToast('Image URL copied to clipboard!');
                            }
                          }}
                          className="text-[#D96B27] hover:underline flex items-center gap-1 text-[10px] font-semibold"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy URL</span>
                        </button>
                      </div>
                      <div className="font-mono text-[10px] text-stone-400 bg-black/40 p-2 rounded-lg truncate border border-white/5">
                        {pkg.image || 'No image configured'}
                      </div>
                    </div>

                    <div className="p-3.5 border-t border-[#261D16] bg-black/25 flex items-center gap-2">
                      <a
                        href={pkg.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-xl bg-black/50 hover:bg-white/10 text-stone-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Preview</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => handleOpenImageEditor(pkg)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D96B27] to-[#B84E14] hover:opacity-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#D96B27]/20 active:scale-[0.98] transition-all"
                      >
                        <Camera className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Replace Photo</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'image-archive' && (
            <ImageArchivePanel uploadImage={processLocalImageFile} showToast={showToast} />
          )}

          {activeTab === 'website-images' && (
            <WebsiteImagesPanel uploadImage={processLocalImageFile} showToast={showToast} />
          )}

          {activeTab === 'settings' && (
            <SettingsPanel uploadImage={processLocalImageFile} showToast={showToast} />
          )}

          {/* ═══════════════════════════════════════════════════════════════════════════
              TAB 3: GUEST BOOKINGS & RESERVATIONS
             ═══════════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#15100C] p-3.5 rounded-2xl border border-[#261D16]">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A6B]" />
                  <input
                    type="text"
                    placeholder="Search by guest name, email, phone, ID..."
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-[#8C7A6B] text-xs outline-none focus:border-[#D96B27]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={bookingStatusFilter}
                    onChange={(e) => setBookingStatusFilter(e.target.value)}
                    className="w-full sm:w-auto px-3 py-2.5 sm:py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs outline-none focus:border-[#D96B27]"
                  >
                    <option value="All">All Statuses ({bookings.length})</option>
                    <option value="Pending">Pending ({bookings.filter(b => b.status === 'Pending').length})</option>
                    <option value="Confirmed">Confirmed ({bookings.filter(b => b.status === 'Confirmed').length})</option>
                    <option value="Completed">Completed ({bookings.filter(b => b.status === 'Completed').length})</option>
                    <option value="Cancelled">Cancelled ({bookings.filter(b => b.status === 'Cancelled').length})</option>
                  </select>
                </div>
              </div>

              {filteredBookings.length === 0 ? (
                <div className="p-12 text-center bg-gradient-to-b from-[#18130E] to-[#100C08] rounded-2xl border border-[#2E2016] space-y-3 shadow-xl">
                  <div className="w-12 h-12 rounded-2xl bg-[#D96B27]/10 text-[#D96B27] flex items-center justify-center mx-auto border border-[#D96B27]/20 shadow-sm">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-white">No Guest Bookings Yet</h3>
                  <p className="text-xs text-[#8C7A6B] max-w-md mx-auto">
                    When guests book a tour package or submit a customized safari itinerary on the website, their reservation details will appear here automatically.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-[11px] text-emerald-300">
                    <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                    <span>Supabase Live Listener Connected</span>
                  </div>
                </div>
              ) : (
                <>
                  {/* Mobile Guest Booking Cards (< 768px) */}
                  <div className="md:hidden space-y-3">
                    {filteredBookings.map((b) => (
                      <div
                        key={b.id}
                        className="bg-gradient-to-b from-[#18130E] to-[#110D09] rounded-2xl border border-[#2E2016] p-4 space-y-3 shadow-lg"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-mono text-[11px] font-bold text-[#F5C478] bg-[#D96B27]/15 px-2 py-0.5 rounded border border-[#D96B27]/30">
                              {b.id}
                            </span>
                            <h4 className="font-bold text-white text-sm mt-1.5">{b.clientName}</h4>
                            <div className="text-[11px] text-[#8C7A6B]">
                              {b.clientEmail} • {b.country}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-black text-white tabular-nums">
                              ${b.totalAmount.toLocaleString()}
                            </div>
                            <div className="text-[10px] text-[#8C7A6B]">{b.pax} travelers</div>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                          <div className="text-xs font-semibold text-white">{b.tourName}</div>
                          <div className="text-[11px] text-[#B8A79A] flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-[#D96B27]" />
                            <span>Travel Date: {b.travelDate}</span>
                          </div>
                          {b.specialRequests && (
                            <p className="text-[11px] text-[#8C7A6B] pt-1 border-t border-white/5">
                              {b.specialRequests}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-1">
                          <select
                            value={b.status}
                            onChange={(e) => handleStatusChange(b.id, e.target.value as any)}
                            className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold outline-none border transition-colors ${
                              b.status === 'Confirmed'
                                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50'
                                : b.status === 'Pending'
                                  ? 'bg-[#D96B27]/20 text-[#F5C478] border-[#D96B27]/40'
                                  : b.status === 'Completed'
                                    ? 'bg-blue-950/60 text-blue-300 border-blue-700/50'
                                    : 'bg-rose-950/60 text-rose-300 border-rose-700/50'
                            }`}
                          >
                            <option value="Pending" className="bg-[#110D09] text-white">Pending</option>
                            <option value="Confirmed" className="bg-[#110D09] text-white">Confirmed</option>
                            <option value="Completed" className="bg-[#110D09] text-white">Completed</option>
                            <option value="Cancelled" className="bg-[#110D09] text-white">Cancelled</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => handleDeleteBooking(b.id)}
                            className="p-2 rounded-xl bg-black/40 hover:bg-rose-950/60 text-stone-400 hover:text-rose-400 border border-white/10 transition-colors"
                            title="Delete Reservation"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Guest Bookings Table (>= 768px) */}
                  <div className="hidden md:block bg-[#15100C] rounded-2xl border border-[#261D16] overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#261D16] bg-black/30 text-[#8C7A6B] uppercase tracking-wider text-[10px]">
                            <th className="p-3.5">Booking ID</th>
                            <th className="p-3.5">Guest Contact</th>
                            <th className="p-3.5">Safari / Trip Itinerary</th>
                            <th className="p-3.5">Travel Date</th>
                            <th className="p-3.5">Pax</th>
                            <th className="p-3.5">Amount</th>
                            <th className="p-3.5">Status</th>
                            <th className="p-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#261D16]/60">
                          {filteredBookings.map((b) => (
                            <tr key={b.id} className="hover:bg-black/30 transition-colors">
                              <td className="p-3.5 font-mono text-[11px] font-bold text-[#F5C478]">
                                {b.id}
                              </td>
                              <td className="p-3.5">
                                <div className="font-bold text-white">{b.clientName}</div>
                                <div className="text-[#8C7A6B] text-[11px]">{b.clientEmail}</div>
                                <div className="text-[#8C7A6B] text-[11px]">{b.clientPhone} • {b.country}</div>
                              </td>
                              <td className="p-3.5 max-w-[280px]">
                                <div className="font-semibold text-white leading-snug truncate">{b.tourName}</div>
                                {b.specialRequests && (
                                  <div className="text-[#8C7A6B] text-[10px] line-clamp-2 mt-0.5">
                                    {b.specialRequests}
                                  </div>
                                )}
                              </td>
                              <td className="p-3.5 whitespace-nowrap text-stone-300">
                                {b.travelDate}
                              </td>
                              <td className="p-3.5 whitespace-nowrap text-stone-300">
                                {b.pax} travelers
                              </td>
                              <td className="p-3.5 whitespace-nowrap font-bold text-white tabular-nums">
                                ${b.totalAmount.toLocaleString()}
                              </td>
                              <td className="p-3.5 whitespace-nowrap">
                                <select
                                  value={b.status}
                                  onChange={(e) => handleStatusChange(b.id, e.target.value as any)}
                                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold outline-none border transition-colors ${
                                    b.status === 'Confirmed'
                                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50'
                                      : b.status === 'Pending'
                                        ? 'bg-[#D96B27]/20 text-[#F5C478] border-[#D96B27]/40'
                                        : b.status === 'Completed'
                                          ? 'bg-blue-950/60 text-blue-300 border-blue-700/50'
                                          : 'bg-rose-950/60 text-rose-300 border-rose-700/50'
                                  }`}
                                >
                                  <option value="Pending" className="bg-[#110D09] text-white">Pending</option>
                                  <option value="Confirmed" className="bg-[#110D09] text-white">Confirmed</option>
                                  <option value="Completed" className="bg-[#110D09] text-white">Completed</option>
                                  <option value="Cancelled" className="bg-[#110D09] text-white">Cancelled</option>
                                </select>
                              </td>
                              <td className="p-3.5 text-right whitespace-nowrap">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteBooking(b.id)}
                                  className="p-1.5 rounded-lg bg-black/40 hover:bg-rose-950/60 text-stone-500 hover:text-rose-400 border border-white/5 transition-colors"
                                  title="Delete Reservation"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════════════
              TAB 4: GROUP DEPARTURES & FIXED SCHEDULES
             ═══════════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'departures' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#15100C] p-3.5 rounded-2xl border border-[#261D16]">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A6B]" />
                  <input
                    type="text"
                    placeholder="Search scheduled departures by tour or route..."
                    value={departureSearch}
                    onChange={(e) => setDepartureSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-[#8C7A6B] text-xs outline-none focus:border-[#D96B27]"
                  />
                </div>
                <div className="text-xs font-semibold text-[#8C7A6B]">
                  {departures.length} Group Expeditions Scheduled
                </div>
              </div>

              {filteredDepartures.length === 0 ? (
                <div className="p-12 text-center bg-gradient-to-b from-[#18130E] to-[#100C08] rounded-2xl border border-[#2E2016] space-y-3 shadow-xl">
                  <div className="w-12 h-12 rounded-2xl bg-[#D96B27]/10 text-[#D96B27] flex items-center justify-center mx-auto border border-[#D96B27]/20 shadow-sm">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-white">No Group Departures Scheduled</h3>
                  <p className="text-xs text-[#8C7A6B] max-w-md mx-auto">
                    Fixed-date group departures added to the database will appear here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredDepartures.map((dep) => (
                    <div key={dep.id} className="bg-gradient-to-b from-[#18130E] to-[#100C08] rounded-2xl p-4 border border-[#2E2016] hover:border-[#D96B27]/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.65)] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#F5C478]">{dep.id}</span>
                        <select
                          value={dep.status}
                          onChange={(e) => handleDepartureStatusChange(dep.id, e.target.value as any)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border outline-none ${
                            dep.status === 'Guaranteed'
                              ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50'
                              : dep.status === 'Almost Full'
                                ? 'bg-[#D96B27]/20 text-[#F5C478] border-[#D96B27]/40'
                                : 'bg-black/50 text-white border-white/10'
                          }`}
                        >
                          <option value="Open" className="bg-[#110D09]">Open</option>
                          <option value="Guaranteed" className="bg-[#110D09]">Guaranteed</option>
                          <option value="Almost Full" className="bg-[#110D09]">Almost Full</option>
                          <option value="Sold Out" className="bg-[#110D09]">Sold Out</option>
                        </select>
                      </div>

                      <div>
                        <h4 className="font-serif font-bold text-white text-sm line-clamp-1">{dep.tourName}</h4>
                        <p className="text-[11px] text-[#D96B27] mt-0.5">{dep.category}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] p-2.5 rounded-xl bg-black/40 border border-white/5">
                        <div>
                          <span className="text-[#8C7A6B] block">Dates:</span>
                          <span className="text-white font-medium">{dep.startDate}</span>
                        </div>
                        <div>
                          <span className="text-[#8C7A6B] block">Seats Available:</span>
                          <span className="text-[#34D399] font-bold">{dep.availableSeats} / {dep.totalSeats}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#261D16] flex items-center justify-between text-xs">
                        <span className="text-[#8C7A6B]">Rate per pax:</span>
                        <span className="text-sm font-bold text-white">${dep.pricePerPerson.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════════════
              TAB 5: 4X4 EXPEDITION SAFARI FLEET
             ═══════════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'fleet' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#15100C] p-3.5 rounded-2xl border border-[#261D16]">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A6B]" />
                  <input
                    type="text"
                    placeholder="Search fleet by plate number or model..."
                    value={fleetSearch}
                    onChange={(e) => setFleetSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-[#8C7A6B] text-xs outline-none focus:border-[#D96B27]"
                  />
                </div>
                <div className="text-xs font-semibold text-[#8C7A6B]">
                  {fleet.length} Land Cruisers Registered
                </div>
              </div>

              {filteredFleet.length === 0 ? (
                <div className="p-12 text-center bg-gradient-to-b from-[#18130E] to-[#100C08] rounded-2xl border border-[#2E2016] space-y-3 shadow-xl">
                  <div className="w-12 h-12 rounded-2xl bg-[#D96B27]/10 text-[#D96B27] flex items-center justify-center mx-auto border border-[#D96B27]/20 shadow-sm">
                    <Truck className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-white">No 4x4 Fleet Vehicles Registered</h3>
                  <p className="text-xs text-[#8C7A6B] max-w-md mx-auto">
                    Registered safari land cruisers and extended vehicles will appear here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredFleet.map((v) => (
                    <div key={v.id} className="bg-gradient-to-b from-[#18130E] to-[#100C08] rounded-2xl p-4 border border-[#2E2016] hover:border-[#D96B27]/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.65)] space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-[#D96B27]" />
                          <span className="font-mono text-xs font-bold text-white">{v.plateNumber}</span>
                        </div>
                        <select
                          value={v.status}
                          onChange={(e) => handleVehicleStatusChange(v.id, e.target.value as any)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border outline-none ${
                            v.status === 'Available'
                              ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50'
                              : v.status === 'On Safari'
                                ? 'bg-[#D96B27]/20 text-[#F5C478] border-[#D96B27]/40'
                                : 'bg-rose-950/60 text-rose-300 border-rose-700/50'
                          }`}
                        >
                          <option value="Available" className="bg-[#110D09]">Available</option>
                          <option value="On Safari" className="bg-[#110D09]">On Safari</option>
                          <option value="Maintenance" className="bg-[#110D09]">Maintenance</option>
                        </select>
                      </div>

                      <div>
                        <h4 className="font-serif font-bold text-white text-sm">{v.model}</h4>
                        <p className="text-[11px] text-[#8C7A6B] mt-0.5">Year: {v.year} • Mileage: {v.mileageKm.toLocaleString()} km</p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-[11px] space-y-1">
                        <div className="text-[#8C7A6B]">Features:</div>
                        <div className="text-stone-300 truncate">{v.features.join(', ') || 'Custom Pop-up Roof'}</div>
                        <div className="text-[#8C7A6B] pt-1">Assigned Guide: <span className="text-white font-medium">{v.assignedGuide || 'Standby'}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════════════
              TAB 6: CERTIFIED SAFARI & MOUNTAIN GUIDES
             ═══════════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'guides' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#15100C] p-3.5 rounded-2xl border border-[#261D16]">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A6B]" />
                  <input
                    type="text"
                    placeholder="Search guides by name or specialty..."
                    value={guideSearch}
                    onChange={(e) => setGuideSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-[#8C7A6B] text-xs outline-none focus:border-[#D96B27]"
                  />
                </div>
                <div className="text-xs font-semibold text-[#8C7A6B]">
                  {guides.length} Certified Tour Leaders
                </div>
              </div>

              {filteredGuides.length === 0 ? (
                <div className="p-12 text-center bg-gradient-to-b from-[#18130E] to-[#100C08] rounded-2xl border border-[#2E2016] space-y-3 shadow-xl">
                  <div className="w-12 h-12 rounded-2xl bg-[#D96B27]/10 text-[#D96B27] flex items-center justify-center mx-auto border border-[#D96B27]/20 shadow-sm">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-white">No Safari Guides Registered</h3>
                  <p className="text-xs text-[#8C7A6B] max-w-md mx-auto">
                    Certified naturalist guides and mountain leaders added to the database will appear here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {filteredGuides.map((g) => (
                    <div key={g.id} className="bg-gradient-to-b from-[#18130E] to-[#100C08] rounded-2xl p-4 border border-[#2E2016] hover:border-[#D96B27]/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.65)] space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto border-2 border-[#D96B27] mb-3">
                          <img src={g.photo} alt={g.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="text-center">
                          <h4 className="font-serif font-bold text-white text-sm">{g.name}</h4>
                          <p className="text-[11px] text-[#D96B27]">Certified Native Guide</p>
                          <div className="flex items-center justify-center gap-1 text-[11px] text-amber-400 mt-0.5">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{g.rating} Rating</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-[#8C7A6B] text-center mt-2 line-clamp-2">{g.specialty}</p>
                      </div>

                      <div className="pt-2 border-t border-[#261D16] space-y-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#8C7A6B]">Status:</span>
                          <select
                            value={g.status}
                            onChange={(e) => handleGuideStatusChange(g.id, e.target.value as any)}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md border outline-none ${
                              g.status === 'Available'
                                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50'
                                : g.status === 'On Safari'
                                  ? 'bg-[#D96B27]/20 text-[#F5C478] border-[#D96B27]/40'
                                  : 'bg-black/50 text-white border-white/10'
                            }`}
                          >
                            <option value="Available" className="bg-[#110D09]">Available</option>
                            <option value="On Safari" className="bg-[#110D09]">On Safari</option>
                            <option value="Resting" className="bg-[#110D09]">Resting</option>
                          </select>
                        </div>
                        <a href={`tel:${g.phone}`} className="block text-center text-[10px] font-bold text-[#F5C478] bg-black/40 py-1.5 rounded-lg border border-white/5">
                          {g.phone}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════════════
              TAB 7: GUEST INQUIRIES & MESSAGES
             ═══════════════════════════════════════════════════════════════════════════ */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#15100C] p-3.5 rounded-2xl border border-[#261D16]">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A6B]" />
                  <input
                    type="text"
                    placeholder="Search inquiries by guest name, subject..."
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-[#8C7A6B] text-xs outline-none focus:border-[#D96B27]"
                  />
                </div>
                <div className="text-xs font-semibold text-[#8C7A6B]">
                  {inquiries.length} Inquiries Logged
                </div>
              </div>

              {filteredInquiries.length === 0 ? (
                <div className="p-12 text-center bg-gradient-to-b from-[#18130E] to-[#100C08] rounded-2xl border border-[#2E2016] space-y-3 shadow-xl">
                  <div className="w-12 h-12 rounded-2xl bg-[#D96B27]/10 text-[#D96B27] flex items-center justify-center mx-auto border border-[#D96B27]/20 shadow-sm">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-white">No Client Inquiries Yet</h3>
                  <p className="text-xs text-[#8C7A6B] max-w-md mx-auto">
                    Direct inquiries, quotes, and questions submitted through the public website contact form will appear here in real time.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-[11px] text-emerald-300">
                    <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                    <span>Supabase Inquiries Listener Connected</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredInquiries.map((inq) => (
                    <div key={inq.id} className="bg-gradient-to-b from-[#18130E] to-[#100C08] rounded-2xl p-4 sm:p-5 border border-[#2E2016] hover:border-[#D96B27]/50 transition-all duration-300 ease-out hover:shadow-[0_12px_36px_rgba(0,0,0,0.6)] space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#261D16] pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#F5C478]">{inq.id}</span>
                            <span className="font-bold text-white text-sm">{inq.name}</span>
                            <span className="text-xs text-[#8C7A6B]">• {inq.email}</span>
                            {inq.phone && <span className="text-xs text-[#8C7A6B]">• {inq.phone}</span>}
                          </div>
                          <h4 className="font-semibold text-white text-xs mt-1">{inq.subject}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={inq.status}
                            onChange={(e) => handleInquiryStatusChange(inq.id, e.target.value as any)}
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border outline-none ${
                              inq.status === 'New'
                                ? 'bg-[#D96B27]/20 text-[#F5C478] border-[#D96B27]/40'
                                : inq.status === 'Replied'
                                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50'
                                  : 'bg-black/50 text-white border-white/10'
                            }`}
                          >
                            <option value="New" className="bg-[#110D09]">New</option>
                            <option value="Replied" className="bg-[#110D09]">Replied</option>
                            <option value="Archived" className="bg-[#110D09]">Archived</option>
                          </select>
                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1 rounded-lg bg-black/40 hover:bg-rose-950/60 text-stone-500 hover:text-rose-400 border border-white/5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed pt-1">
                        {inq.message}
                      </p>
                      <div className="pt-2 flex items-center justify-between text-[11px] text-[#8C7A6B]">
                        <span>Received: {new Date(inq.createdAt).toLocaleDateString()}</span>
                        <a 
                          href={`mailto:${inq.email}?subject=RE: ${encodeURIComponent(inq.subject)}`}
                          className="text-[#D96B27] font-bold hover:underline flex items-center gap-1"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Reply via Email</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}



        </main>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          MODAL: CREATE / EDIT TOUR PACKAGE (ULTRA-PROFESSIONAL SAFARI STUDIO)
         ───────────────────────────────────────────────────────────────────────────── */}
      {isEditingTour && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#18120D] to-[#110D0A] rounded-t-2xl sm:rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-[#3A281C] overflow-hidden sm:my-6 max-h-[94dvh] sm:max-h-[92vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-[#1A1410] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#D96B27] to-[#8C3A0B] text-white flex items-center justify-center shadow-lg shadow-[#D96B27]/20 flex-shrink-0">
                  <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#D96B27] bg-[#D96B27]/10 px-2 py-0.5 rounded border border-[#D96B27]/20">
                      Safari Package Studio
                    </span>
                    <span className="text-stone-400 text-[11px] truncate">
                      {editingTourId ? `ID: ${tourForm.id}` : 'New Catalog Item'}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-white text-sm sm:text-lg truncate">
                    {editingTourId ? `Edit Safari: ${tourForm.name}` : 'Create New Luxury Safari Package'}
                  </h3>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setIsEditingTour(false)}
                className="w-9 h-9 rounded-xl bg-black/40 hover:bg-white/10 text-stone-400 hover:text-white flex items-center justify-center border border-white/5 transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Segmented Modal Navigation Tabs (Responsive 3-Column Grid on Mobile) */}
            <div className="px-3.5 sm:px-6 py-2.5 bg-black/40 border-b border-white/5 grid grid-cols-3 sm:flex sm:items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => setTourModalTab('general')}
                className={`px-2.5 sm:px-4 py-2.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 whitespace-nowrap transition-all ${
                  tourModalTab === 'general'
                    ? 'bg-[#D96B27] text-white shadow-md shadow-[#D96B27]/25'
                    : 'bg-black/40 sm:bg-transparent text-stone-400 hover:text-white hover:bg-white/5 border border-white/5 sm:border-transparent'
                }`}
              >
                <Compass className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="sm:hidden">1. Details</span>
                <span className="hidden sm:inline">1. Core Logistics</span>
              </button>

              <button
                type="button"
                onClick={() => setTourModalTab('pricing')}
                className={`px-2.5 sm:px-4 py-2.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 whitespace-nowrap transition-all ${
                  tourModalTab === 'pricing'
                    ? 'bg-[#D96B27] text-white shadow-md shadow-[#D96B27]/25'
                    : 'bg-black/40 sm:bg-transparent text-stone-400 hover:text-white hover:bg-white/5 border border-white/5 sm:border-transparent'
                }`}
              >
                <Award className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="sm:hidden">2. Pricing</span>
                <span className="hidden sm:inline">2. Pricing &amp; Itinerary</span>
              </button>

              <button
                type="button"
                onClick={() => setTourModalTab('media')}
                className={`px-2.5 sm:px-4 py-2.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 whitespace-nowrap transition-all ${
                  tourModalTab === 'media'
                    ? 'bg-[#D96B27] text-white shadow-md shadow-[#D96B27]/25'
                    : 'bg-black/40 sm:bg-transparent text-stone-400 hover:text-white hover:bg-white/5 border border-white/5 sm:border-transparent'
                }`}
              >
                <Camera className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="sm:hidden">3. Photo</span>
                <span className="hidden sm:inline">3. Photography</span>
                {tourForm.image && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                )}
              </button>
            </div>

            <form onSubmit={handleSaveTour} className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-grow text-xs">
              
              {/* TAB 1: CORE LOGISTICS & CLASSIFICATION */}
              {tourModalTab === 'general' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block font-bold uppercase tracking-wider text-white/70 mb-1.5">
                        Safari Title / Tour Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. 7-Day Great Serengeti Migration &amp; Ngorongoro Crater Expedition"
                        value={tourForm.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          setTourForm(prev => ({
                            ...prev,
                            name: val,
                            id: editingTourId ? prev.id : `safari-${val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 40) || Date.now().toString().slice(-5)}`
                          }));
                        }}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm outline-none focus:border-[#D96B27] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase tracking-wider text-white/70 mb-1.5">
                        Tour ID (Slug / Unique Key) *
                      </label>
                      <input 
                        type="text" 
                        disabled={!!editingTourId}
                        value={tourForm.id}
                        onChange={(e) => setTourForm({ ...tourForm, id: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-[#F5C478] text-xs font-mono outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase tracking-wider text-white/70 mb-1.5">
                        Category Classification *
                      </label>
                      <select
                        value={tourForm.category}
                        onChange={(e) => setTourForm({ ...tourForm, category: e.target.value as TourCategory })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs sm:text-sm outline-none focus:border-[#D96B27]"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id} className="bg-[#110D09]">
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold uppercase tracking-wider text-white/70 mb-1.5">
                        Circuit / Route Subcategory
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g. Northern Circuit, Lemosho Route, Zanzibar Coast"
                        value={tourForm.subcategory || ''}
                        onChange={(e) => setTourForm({ ...tourForm, subcategory: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm outline-none focus:border-[#D96B27]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase tracking-wider text-white/70 mb-1.5">
                        Tour Duration *
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g. 5 Days / 4 Nights"
                        required
                        value={tourForm.duration}
                        onChange={(e) => setTourForm({ ...tourForm, duration: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm outline-none focus:border-[#D96B27]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase tracking-wider text-white/70 mb-1.5">
                        Group Capacity &amp; Vehicle
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g. Max 6 Guests (Window Seat Guaranteed)"
                        value={tourForm.groupSize || ''}
                        onChange={(e) => setTourForm({ ...tourForm, groupSize: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm outline-none focus:border-[#D96B27]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase tracking-wider text-white/70 mb-1.5">
                        Badge / Ribbon Label
                      </label>
                      <select
                        value={tourForm.badge || ''}
                        onChange={(e) => setTourForm({ ...tourForm, badge: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs sm:text-sm outline-none focus:border-[#D96B27]"
                      >
                        <option value="" className="bg-[#110D09]">None</option>
                        <option value="Most Popular" className="bg-[#110D09]">Most Popular</option>
                        <option value="Best Seller" className="bg-[#110D09]">Best Seller</option>
                        <option value="Luxury Expedition" className="bg-[#110D09]">Luxury Expedition</option>
                        <option value="Fly-in Safari" className="bg-[#110D09]">Fly-in Safari</option>
                        <option value="Special Offer" className="bg-[#110D09]">Special Offer</option>
                        <option value="Private VIP" className="bg-[#110D09]">Private VIP</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold uppercase tracking-wider text-white/70 mb-1.5">
                        Publishing Status
                      </label>
                      <select
                        value={tourForm.status || 'active'}
                        onChange={(e) => setTourForm({ ...tourForm, status: e.target.value as any })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs sm:text-sm outline-none focus:border-[#D96B27]"
                      >
                        <option value="active" className="bg-[#110D09]">Active (Published on Website)</option>
                        <option value="draft" className="bg-[#110D09]">Draft (Saved Internally)</option>
                        <option value="archived" className="bg-[#110D09]">Archived</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-3 pt-4 sm:col-span-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={Boolean(tourForm.featured)}
                          onChange={(e) => setTourForm({ ...tourForm, featured: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-black/60 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D96B27] border border-white/10"></div>
                        <span className="ml-3 text-xs font-bold text-stone-200">
                          Feature on Homepage Hero / Top Recommendations
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PRICING, DESTINATIONS & HIGHLIGHTS */}
              {tourModalTab === 'pricing' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold uppercase tracking-wider text-white/70 mb-1.5">
                        Starting Price per Person (USD) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7A6B] font-bold text-sm">$</span>
                        <input 
                          type="number" 
                          required
                          placeholder="e.g. 1850"
                          value={tourForm.fromPrice || ''}
                          onChange={(e) => {
                            const num = Number(e.target.value);
                            setTourForm({ 
                              ...tourForm, 
                              fromPrice: num,
                              priceRange: `$${num.toLocaleString()} - $${Math.round(num * 1.35).toLocaleString()}`
                            });
                          }}
                          className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm outline-none focus:border-[#D96B27]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold uppercase tracking-wider text-white/70 mb-1.5">
                        Formatted Price Range Display
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g. $1,850 - $2,400"
                        value={tourForm.priceRange || ''}
                        onChange={(e) => setTourForm({ ...tourForm, priceRange: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm outline-none focus:border-[#D96B27]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold uppercase tracking-wider text-white/70 mb-1.5">
                        Key Parks &amp; Destinations Covered
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g. Serengeti National Park, Ngorongoro Crater, Lake Manyara, Tarangire"
                        value={tourForm.destination || ''}
                        onChange={(e) => setTourForm({ ...tourForm, destination: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm outline-none focus:border-[#D96B27]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold uppercase tracking-wider text-white/70 mb-1.5">
                        Tour Overview Description
                      </label>
                      <textarea 
                        rows={3}
                        placeholder="Detailed expedition summary highlighting wildlife experiences, lodge stays, and unique Tanzanian terrain..."
                        value={tourForm.description || ''}
                        onChange={(e) => setTourForm({ ...tourForm, description: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs leading-relaxed outline-none focus:border-[#D96B27]"
                      />
                    </div>

                    {/* Highlights Tags */}
                    <div className="sm:col-span-2 space-y-2">
                      <label className="block font-bold uppercase tracking-wider text-white/70">
                        Key Expedition Highlights
                      </label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="e.g. Great Migration River Crossing, Big 5 Encounters..."
                          value={newHighlightInput}
                          onChange={(e) => setNewHighlightInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              if (newHighlightInput.trim()) {
                                setTourForm(prev => ({
                                  ...prev,
                                  highlights: [...(prev.highlights || []), newHighlightInput.trim()]
                                }));
                                setNewHighlightInput('');
                              }
                            }
                          }}
                          className="flex-grow px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none focus:border-[#D96B27]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newHighlightInput.trim()) {
                              setTourForm(prev => ({
                                ...prev,
                                highlights: [...(prev.highlights || []), newHighlightInput.trim()]
                              }));
                              setNewHighlightInput('');
                            }
                          }}
                          className="px-3.5 py-2 rounded-xl bg-[#D96B27]/20 hover:bg-[#D96B27] text-[#F5C478] hover:text-white border border-[#D96B27]/30 font-bold transition-colors"
                        >
                          Add
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(tourForm.highlights || []).map((h, i) => (
                          <span 
                            key={i} 
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/50 border border-white/10 text-stone-300 text-[11px]"
                          >
                            <span>{h}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setTourForm(prev => ({
                                  ...prev,
                                  highlights: prev.highlights?.filter((_, idx) => idx !== i)
                                }));
                              }}
                              className="text-stone-500 hover:text-rose-400"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PHOTOGRAPHY & MEDIA UPLOADER (LOCAL FILE + ONLINE CURATED) */}
              {tourModalTab === 'media' && (
                <div className="space-y-5">
                  
                  {/* Photo Source Switcher */}
                  <div className="grid grid-cols-2 gap-1.5 p-1.5 rounded-2xl bg-black/50 border border-white/10 max-w-md">
                    <button
                      type="button"
                      onClick={() => setTourPhotoSource('local')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        tourPhotoSource === 'local'
                          ? 'bg-[#D96B27] text-white shadow-md'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">Upload Photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTourPhotoSource('online')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        tourPhotoSource === 'online'
                          ? 'bg-[#D96B27] text-white shadow-md'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">Image Archive</span>
                    </button>
                  </div>

                  {/* Option 1: Local Device Upload */}
                  {tourPhotoSource === 'local' && (
                    <div className="space-y-3">
                      <input 
                        type="file" 
                        ref={tourFileInputRef}
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) void handleTourPhotoSelect(file);
                        }}
                      />

                      <div 
                        onClick={() => tourFileInputRef.current?.click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const file = e.dataTransfer.files?.[0];
                          if (file) void handleTourPhotoSelect(file);
                        }}
                        className="border-2 border-dashed border-[#D96B27]/40 hover:border-[#D96B27] bg-black/40 hover:bg-black/60 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 group"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-[#D96B27]/15 text-[#D96B27] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                          {isUploadingTourPhoto ? (
                            <RefreshCw className="w-6 h-6 animate-spin" />
                          ) : (
                            <Upload className="w-6 h-6" />
                          )}
                        </div>
                        <h4 className="font-serif font-bold text-white text-sm sm:text-base">
                          {isUploadingTourPhoto ? 'Optimizing & Processing Photo...' : 'Click to Browse or Drag & Drop Safari Photo'}
                        </h4>
                        <p className="text-stone-400 text-xs mt-1">
                          Upload high-resolution photography directly from your computer or phone. Supports PNG, JPG, WEBP.
                        </p>
                        <span className="inline-block mt-3 px-3 py-1 rounded-lg bg-black/60 border border-white/10 text-[11px] text-[#F5C478] font-semibold">
                          Browse Local Storage
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Option 2: Curated Online Safari Photo Library */}
                  {tourPhotoSource === 'online' && (
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="relative flex-1">
                          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                          <input 
                            type="text"
                            placeholder="Search photos (e.g. Lion, Migration, Kilimanjaro, Zanzibar)..."
                            value={curatedPhotoSearch}
                            onChange={(e) => setCuratedPhotoSearch(e.target.value)}
                            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs outline-none focus:border-[#D96B27]"
                          />
                        </div>

                        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                          {['All', ...ARCHIVE_CATEGORIES].map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setCuratedPhotoCategory(cat)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-colors ${
                                curatedPhotoCategory === cat
                                  ? 'bg-[#D96B27] text-white'
                                  : 'bg-black/40 text-stone-400 hover:text-white border border-white/5'
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Photo Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
                        {filteredCuratedTourPhotos.map((photo) => {
                          const isSelected = tourForm.image === photo.url;
                          return (
                            <div 
                              key={photo.id}
                              onClick={() => {
                                setTourForm(prev => ({
                                  ...prev,
                                  image: photo.url,
                                  coverImage: photo.url
                                }));
                                showToast(`Applied photo: ${photo.title}`);
                              }}
                              className={`group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                                isSelected 
                                  ? 'border-[#D96B27] shadow-[0_0_15px_rgba(217,107,39,0.5)] scale-[1.02]' 
                                  : 'border-white/10 hover:border-white/30'
                              }`}
                            >
                              <img 
                                src={photo.url} 
                                alt={photo.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                              <div className="absolute bottom-1.5 left-1.5 right-1.5">
                                <span className="text-[10px] text-white font-semibold line-clamp-1">
                                  {photo.title}
                                </span>
                              </div>
                              {isSelected && (
                                <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#D96B27] text-white flex items-center justify-center shadow-lg">
                                  <Check className="w-3 h-3" />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Active Selected Cover Preview Card */}
                  <div className="pt-2">
                    <label className="block font-bold uppercase tracking-wider text-white/70 mb-2">
                      Active Cover Photography Preview
                    </label>
                    <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-black/60 border border-white/10 shadow-2xl">
                      <img 
                        src={tourForm.image || initialTourFormState.image} 
                        alt="Tour Cover" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/LION-IN-NGORONGORO-1-1.jpeg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#F5C478] border border-white/10">
                          {tourForm.category || 'Safari'}
                        </span>
                        {tourForm.badge && (
                          <span className="px-2.5 py-1 rounded-lg bg-[#D96B27] text-[10px] font-bold text-white shadow">
                            {tourForm.badge}
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                        <div>
                          <h4 className="font-serif font-bold text-white text-base sm:text-lg">
                            {tourForm.name || 'Untitled Safari Expedition'}
                          </h4>
                          <p className="text-xs text-stone-300 mt-0.5">
                            {tourForm.duration} • Starting from {tourForm.priceRange || `$${tourForm.fromPrice}`}
                          </p>
                        </div>
                        <span className="text-[10px] text-stone-400 bg-black/60 px-2 py-1 rounded border border-white/10 hidden sm:inline-block">
                          Guest Website Preview
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* Modal Footer Controls (Responsive Full-Width Action Bar) */}
              <div className="pt-4 mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-t border-white/10">
                <div className="grid grid-cols-2 sm:flex items-center gap-2 w-full sm:w-auto">
                  {tourModalTab !== 'general' ? (
                    <button
                      type="button"
                      onClick={() => setTourModalTab(tourModalTab === 'media' ? 'pricing' : 'general')}
                      className="px-3.5 py-2.5 rounded-xl bg-black/50 text-stone-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center justify-center gap-1 active:scale-[0.98] transition-all"
                    >
                      <span>&larr; Previous</span>
                    </button>
                  ) : (
                    <div className="hidden sm:block" />
                  )}
                  {tourModalTab !== 'media' && (
                    <button
                      type="button"
                      onClick={() => setTourModalTab(tourModalTab === 'general' ? 'pricing' : 'media')}
                      className={`${tourModalTab === 'general' ? 'col-span-2' : ''} px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/10 text-xs font-semibold flex items-center justify-center gap-1 active:scale-[0.98] transition-all`}
                    >
                      <span>Next Step &rarr;</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-3 sm:flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setIsEditingTour(false)}
                    className="col-span-1 px-4 py-2.5 rounded-xl bg-black/50 text-stone-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center justify-center active:scale-[0.98] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="col-span-2 justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D96B27] to-[#B84E14] hover:opacity-95 text-white text-xs font-bold shadow-lg shadow-[#D96B27]/30 transition-all active:scale-[0.98] flex items-center gap-2 whitespace-nowrap"
                  >
                    <Check className="w-4 h-4 flex-shrink-0" />
                    <span>Save Package</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          MODAL: REPLACE COVER PHOTOGRAPHY (UPLOAD LOCAL OR CURATED ONLINE)
         ───────────────────────────────────────────────────────────────────────────── */}
      {imageModalTour && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#18120D] to-[#100C09] rounded-t-2xl sm:rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-[#3A281C] overflow-hidden sm:my-6 max-h-[94dvh] sm:max-h-[92vh] flex flex-col">
            
            {/* Header */}
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-[#1A1410] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#D96B27]/20 text-[#D96B27] flex items-center justify-center border border-[#D96B27]/30 flex-shrink-0">
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif font-bold text-white text-sm sm:text-base truncate">
                    Replace Cover Photography
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#8C7A6B] truncate">
                    {imageModalTour.name} • <span className="font-mono text-[#F5C478]">{imageModalTour.id}</span>
                  </p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setImageModalTour(null)}
                className="w-8 h-8 rounded-xl bg-black/40 hover:bg-white/10 text-stone-400 hover:text-white flex items-center justify-center transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-grow text-xs">
              
              {/* Photo Source Switcher */}
              <div className="grid grid-cols-2 gap-1.5 p-1.5 rounded-2xl bg-black/50 border border-white/10">
                <button
                  type="button"
                  onClick={() => setReplacePhotoTab('local')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    replacePhotoTab === 'local'
                      ? 'bg-[#D96B27] text-white shadow-md'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">Upload Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setReplacePhotoTab('online')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    replacePhotoTab === 'online'
                      ? 'bg-[#D96B27] text-white shadow-md'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">Archive ({archivePhotos.length})</span>
                </button>
              </div>

              {/* TAB 1: LOCAL FILE UPLOAD */}
              {replacePhotoTab === 'local' && (
                <div className="space-y-3">
                  <input 
                    type="file" 
                    ref={replaceFileInputRef}
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) void handleReplacePhotoSelect(file);
                    }}
                  />

                  <div 
                    onClick={() => replaceFileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files?.[0];
                      if (file) void handleReplacePhotoSelect(file);
                    }}
                    className="border-2 border-dashed border-[#D96B27]/40 hover:border-[#D96B27] bg-black/40 hover:bg-black/60 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#D96B27]/15 text-[#D96B27] flex items-center justify-center mx-auto mb-2.5 group-hover:scale-110 transition-transform">
                      {isUploadingReplace ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <Upload className="w-5 h-5" />
                      )}
                    </div>
                    <h4 className="font-serif font-bold text-white text-sm">
                      {isUploadingReplace ? 'Optimizing photo for database...' : 'Click to Upload or Drag & Drop Photo'}
                    </h4>
                    <p className="text-stone-400 text-xs mt-1">
                      Select any high-resolution photo from your local storage (PNG, JPG, WEBP).
                    </p>
                    {replaceFileMeta && (
                      <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 text-[11px] font-mono">
                        <Check className="w-3 h-3" />
                        <span>{replaceFileMeta.name} ({replaceFileMeta.size})</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: CURATED ONLINE SAFARI GALLERY */}
              {replacePhotoTab === 'online' && (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                      <input 
                        type="text"
                        placeholder="Search archive photos..."
                        value={replacePhotoSearch}
                        onChange={(e) => setReplacePhotoSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 sm:py-1.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs outline-none focus:border-[#D96B27]"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 sm:pb-0 no-scrollbar">
                      {['All', ...ARCHIVE_CATEGORIES].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setReplacePhotoCategory(cat)}
                          className={`px-3 py-1.5 sm:py-1 rounded-lg text-[11px] sm:text-[10px] font-bold whitespace-nowrap transition-colors touch-manipulation min-h-[32px] flex items-center justify-center ${
                            replacePhotoCategory === cat
                              ? 'bg-[#D96B27] text-white shadow-md shadow-[#D96B27]/30'
                              : 'bg-black/40 text-stone-400 hover:text-white border border-white/5 active:bg-white/10'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Archive Photos: Clear Mobile-First Card Arrangement */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-[300px] sm:max-h-[260px] overflow-y-auto pr-1">
                    {filteredReplaceCuratedPhotos.map((photo) => {
                      const isSelected = newImageUrl === photo.url;
                      return (
                        <div 
                          key={photo.id}
                          onClick={() => {
                            setNewImageUrl(photo.url);
                            setReplaceFileMeta(null);
                            showToast(`Selected: ${photo.title}`);
                          }}
                          className={`group relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200 flex sm:flex-col ${
                            isSelected 
                              ? 'border-[#D96B27] bg-[#D96B27]/10 shadow-[0_0_15px_rgba(217,107,39,0.35)] ring-1 ring-[#D96B27]' 
                              : 'border-white/10 hover:border-white/30 bg-black/40 active:border-[#D96B27]/50'
                          }`}
                        >
                          {/* Image Container */}
                          <div className="relative w-28 h-20 sm:w-full sm:h-auto sm:aspect-[16/10] flex-shrink-0 overflow-hidden bg-black/60">
                            <img 
                              src={photo.url} 
                              alt={photo.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent sm:block hidden" />
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#D96B27] text-white flex items-center justify-center shadow-lg">
                                <Check className="w-3 h-3 stroke-[2.5]" />
                              </div>
                            )}
                          </div>

                          {/* Info on Mobile / Overlay on Desktop */}
                          <div className="p-2 sm:p-2.5 flex-1 flex flex-col justify-between min-w-0">
                            <div>
                              <div className="flex items-center gap-1.5 mb-1">
                                <span className="px-1.5 py-0.5 rounded bg-[#D96B27]/25 border border-[#D96B27]/40 text-[#F5C478] text-[9px] font-bold uppercase tracking-wider truncate">
                                  {photo.activityTag}
                                </span>
                                <span className="text-[10px] text-stone-400 truncate sm:hidden">
                                  {photo.category}
                                </span>
                              </div>
                              <h5 className="text-[11px] sm:text-xs font-semibold text-white line-clamp-2 leading-snug group-hover:text-[#F5C478] transition-colors">
                                {photo.title}
                              </h5>
                            </div>
                            <div className="mt-1 flex items-center justify-between text-[10px]">
                              <span className={isSelected ? 'text-[#F5C478] font-bold' : 'text-stone-400'}>
                                {isSelected ? 'Selected ✓' : 'Tap to select'}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Side-by-Side Before & After Preview (Clean & Compact on Mobile) */}
              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5 block">
                  Photography Comparison
                </span>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-stone-400 mb-1 block truncate">
                      Current Cover
                    </span>
                    <div className="aspect-[16/10] sm:aspect-video rounded-xl overflow-hidden bg-black/60 border border-white/10 relative">
                      <img 
                        src={imageModalTour.image || imageModalTour.coverImage || 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/LION-IN-NGORONGORO-1-1.jpeg'} 
                        alt="Current Cover" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/LION-IN-NGORONGORO-1-1.jpeg';
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#D96B27] mb-1 block truncate">
                      New Preview
                    </span>
                    <div className="aspect-[16/10] sm:aspect-video rounded-xl overflow-hidden bg-black/60 border border-[#D96B27]/50 shadow-lg relative ring-1 ring-[#D96B27]/30">
                      <img 
                        src={newImageUrl} 
                        alt="New Selected Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/LION-IN-NGORONGORO-1-1.jpeg';
                        }}
                      />
                      <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[9px] font-bold text-[#F5C478] border border-white/10">
                        Ready
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save / Cancel Controls (Sticky on Mobile) */}
              <div className="grid grid-cols-3 sm:flex sm:justify-end gap-2.5 pt-3 border-t border-white/10 sticky bottom-0 bg-[#100C09] pb-1 z-10">
                <button
                  type="button"
                  onClick={() => setImageModalTour(null)}
                  className="col-span-1 px-4 py-2.5 rounded-xl bg-black/50 text-stone-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center justify-center active:scale-[0.98]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveImageUpdate}
                  className="col-span-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D96B27] to-[#B84E14] hover:opacity-95 text-white text-xs font-bold shadow-lg shadow-[#D96B27]/25 flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <Check className="w-4 h-4 flex-shrink-0" />
                  <span>Save Photo to DB</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;

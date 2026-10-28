import React, { useState, useEffect, useMemo } from 'react';
import { 
  Compass, LayoutDashboard, Calendar, Users, Truck, UserCheck, 
  Settings, LogOut, Plus, Search, Filter, Edit3, Trash2, Copy, 
  CheckCircle2, AlertCircle, Eye, ExternalLink, ArrowRight, 
  DollarSign, Sparkles, Phone, Mail, MapPin, Globe, ShieldCheck, 
  ChevronDown, RefreshCw, Download, Upload, Database, Lock, KeyRound,
  FileText, Star, MessageSquare, Car, Layers, Check, X, Clock,
  Printer, TrendingUp, BarChart3, Image as ImageIcon, Send, Share2,
  FileSpreadsheet, History, Award, CheckCircle, Receipt, Camera, UploadCloud
} from 'lucide-react';
import { tourService, useLiveTours, AuditLogItem, MediaAsset } from '../../services/tourService';
import { siteContentService, useLiveSiteContent, SiteSectionContent } from '../../services/siteContentService';
import { TourPackage, TourBooking, DepartureSchedule, FleetVehicle, SafariGuide, TourCategory } from '../../types';

type AdminTab = 
  | 'overview' 
  | 'bookings' 
  | 'tours' 
  | 'package-images'
  | 'departures' 
  | 'fleet' 
  | 'vouchers' 
  | 'messages' 
  | 'media' 
  | 'sections' 
  | 'audit' 
  | 'database';

export const AdminDashboard: React.FC = () => {
  // Authentication Guard State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('embuat_admin_auth') === 'true' || localStorage.getItem('embuat_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Real-time East Africa Time (EAT) Clock
  const [currentTime, setCurrentTime] = useState<string>('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { timeZone: 'Africa/Nairobi', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Live Data Hooks
  const tours = useLiveTours();
  const siteContent = useLiveSiteContent();
  const [bookings, setBookings] = useState<TourBooking[]>(() => tourService.getBookings());
  const [departures, setDepartures] = useState<DepartureSchedule[]>(() => tourService.getDepartures());
  const [fleet, setFleet] = useState<FleetVehicle[]>(() => tourService.getFleet());
  const [guides, setGuides] = useState<SafariGuide[]>(() => tourService.getGuides());
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => tourService.getAuditLogs());
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() => tourService.getMediaAssets());

  // Toast Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ─── PACKAGE IMAGE REPLACEMENT STUDIO STATE ────────────────────────
  const [imageReplaceTarget, setImageReplaceTarget] = useState<{
    tourId: string;
    tourName: string;
    field: 'image' | 'coverImage' | 'hoverImage' | 'both';
    currentUrl: string;
  } | null>(null);

  const [replacementMethod, setReplacementMethod] = useState<'upload' | 'url' | 'library'>('upload');
  const [replacementUrl, setReplacementUrl] = useState<string>('');
  const [targetFieldOption, setTargetFieldOption] = useState<'image' | 'coverImage' | 'both'>('image');
  const [packageImageFilter, setPackageImageFilter] = useState<string>('All');
  const [packageImageSearch, setPackageImageSearch] = useState<string>('');

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert('Image file is larger than 8MB. Please select an image under 8MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setReplacementUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyImageReplacement = () => {
    if (!imageReplaceTarget || !replacementUrl) {
      alert('Please upload an image from your computer or provide a URL first.');
      return;
    }

    const updates: Partial<TourPackage> = {};
    if (targetFieldOption === 'image' || targetFieldOption === 'both') {
      updates.image = replacementUrl;
    }
    if (targetFieldOption === 'coverImage' || targetFieldOption === 'both') {
      updates.coverImage = replacementUrl;
    }
    if (imageReplaceTarget.field === 'hoverImage') {
      updates.hoverImage = replacementUrl;
    }

    tourService.updateTour(imageReplaceTarget.tourId, updates);
    tourService.logAction('Tour Image Replaced', 'tour', `Updated image for "${imageReplaceTarget.tourName}".`);
    setAuditLogs(tourService.getAuditLogs());
    showToast(`Updated image for "${imageReplaceTarget.tourName}"!`);
    setImageReplaceTarget(null);
    setReplacementUrl('');
  };

  // Sync internal operational state with custom window events
  useEffect(() => {
    const refreshData = () => {
      setBookings(tourService.getBookings());
      setDepartures(tourService.getDepartures());
      setFleet(tourService.getFleet());
      setGuides(tourService.getGuides());
      setAuditLogs(tourService.getAuditLogs());
      setMediaAssets(tourService.getMediaAssets());
    };

    window.addEventListener('embuat_bookings_updated', refreshData);
    window.addEventListener('embuat_departures_updated', refreshData);
    window.addEventListener('embuat_fleet_updated', refreshData);
    window.addEventListener('embuat_guides_updated', refreshData);
    window.addEventListener('storage', refreshData);

    return () => {
      window.removeEventListener('embuat_bookings_updated', refreshData);
      window.removeEventListener('embuat_departures_updated', refreshData);
      window.removeEventListener('embuat_fleet_updated', refreshData);
      window.removeEventListener('embuat_guides_updated', refreshData);
      window.removeEventListener('storage', refreshData);
    };
  }, []);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'embuat2026' || passcode === 'admin2026' || passcode === 'admin') {
      setIsAuthenticated(true);
      if (rememberMe) {
        localStorage.setItem('embuat_admin_auth', 'true');
      } else {
        sessionStorage.setItem('embuat_admin_auth', 'true');
      }
      setAuthError('');
      tourService.logAction('Admin Login', 'system', 'Administrator authenticated successfully.', 'Lead Admin');
      setAuditLogs(tourService.getAuditLogs());
    } else {
      setAuthError('Invalid administrator passcode. (Hint: embuat2026)');
    }
  };

  const handleLogout = () => {
    tourService.logAction('Admin Logout', 'system', 'Administrator session terminated.', 'Lead Admin');
    sessionStorage.removeItem('embuat_admin_auth');
    localStorage.removeItem('embuat_admin_auth');
    setIsAuthenticated(false);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. TOUR PACKAGES CRUD STATE & HANDLERS
  // ─────────────────────────────────────────────────────────────────────────────
  const [tourSearch, setTourSearch] = useState('');
  const [tourCategoryFilter, setTourCategoryFilter] = useState<string>('All');
  const [tourStatusFilter, setTourStatusFilter] = useState<string>('All');
  const [isEditingTour, setIsEditingTour] = useState(false);
  const [editingTourId, setEditingTourId] = useState<string | null>(null);

  const initialTourFormState: Partial<TourPackage> = {
    id: '',
    name: '',
    category: 'Safari',
    duration: '5 Days',
    priceRange: '$2,450',
    fromPrice: 2450,
    image: 'https://safari56.com/wp-content/uploads/2026/08/Tarangire-Ngorongoro-Serengeti-Safari-1.jpg',
    coverImage: 'https://safari56.com/wp-content/uploads/2026/08/Tarangire-Ngorongoro-Serengeti-Safari-1.jpg',
    highlights: ['Serengeti National Park Game Drives', 'Ngorongoro Crater 600m Descent', 'Big Five Wildlife Tracking'],
    included: ['All national park entrance & conservation fees', 'Private 4x4 Land Cruiser with pop-up roof', 'Full board luxury lodge & tented camp accommodation', 'Professional certified driver-guide', 'Chilled drinking water & emergency evacuation cover'],
    notIncluded: ['International flights & entry visa', 'Personal travel insurance', 'Gratuities for guide & staff'],
    itinerary: [
      { day: 1, title: 'Arusha to Tarangire National Park', activities: 'Morning departure from Arusha. Game drive in Tarangire famed for massive elephant herds and baobabs.', accommodation: 'Maramboi Tented Camp', meals: 'Lunch, Dinner' },
      { day: 2, title: 'Tarangire to Serengeti Plains', activities: 'Drive through Ngorongoro highlands into Central Serengeti with afternoon game drive.', accommodation: 'Serengeti Safari Camp', meals: 'Breakfast, Lunch, Dinner' }
    ],
    badge: 'Popular Choice',
    location: 'Northern Circuit, Tanzania',
    groupSize: '1 - 6 Persons (Private)',
    status: 'active'
  };

  const [tourForm, setTourForm] = useState<Partial<TourPackage>>(initialTourFormState);

  const filteredTours = useMemo(() => {
    return tours.filter(t => {
      const matchSearch = t.name.toLowerCase().includes(tourSearch.toLowerCase()) || 
                          t.id.toLowerCase().includes(tourSearch.toLowerCase());
      const matchCategory = tourCategoryFilter === 'All' || t.category === tourCategoryFilter;
      const matchStatus = tourStatusFilter === 'All' || (t.status || 'active') === tourStatusFilter;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [tours, tourSearch, tourCategoryFilter, tourStatusFilter]);

  const filteredPackageImages = useMemo(() => {
    return tours.filter(t => {
      const matchSearch = !packageImageSearch || 
                          t.name.toLowerCase().includes(packageImageSearch.toLowerCase()) || 
                          t.id.toLowerCase().includes(packageImageSearch.toLowerCase()) ||
                          (t.destination || '').toLowerCase().includes(packageImageSearch.toLowerCase());
      const matchCategory = packageImageFilter === 'All' || t.category === packageImageFilter;
      return matchSearch && matchCategory;
    });
  }, [tours, packageImageSearch, packageImageFilter]);

  const handleOpenCreateTour = () => {
    setTourForm({
      ...initialTourFormState,
      id: `custom-safari-${Date.now().toString().slice(-4)}`
    });
    setEditingTourId(null);
    setIsEditingTour(true);
  };

  const handleOpenEditTour = (tour: TourPackage) => {
    setTourForm(JSON.parse(JSON.stringify(tour)));
    setEditingTourId(tour.id);
    setIsEditingTour(true);
  };

  const handleSaveTour = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tourForm.name || !tourForm.category || !tourForm.duration) {
      alert('Please fill out the tour name, category, and duration.');
      return;
    }

    try {
      if (editingTourId) {
        tourService.updateTour(editingTourId, tourForm as TourPackage);
        tourService.logAction('Tour Package Updated', 'tour', `Updated "${tourForm.name}" (${editingTourId}).`);
        showToast(`Tour "${tourForm.name}" updated successfully!`);
      } else {
        tourService.createTour(tourForm as TourPackage);
        tourService.logAction('Tour Package Created', 'tour', `Created new package "${tourForm.name}".`);
        showToast(`Tour "${tourForm.name}" created successfully!`);
      }
      setAuditLogs(tourService.getAuditLogs());
      setIsEditingTour(false);
    } catch (err: any) {
      alert(`Error saving tour: ${err.message}`);
    }
  };

  const handleDeleteTour = (tour: TourPackage) => {
    if (confirm(`Are you sure you want to delete "${tour.name}"? This will remove it from the live catalog.`)) {
      tourService.deleteTour(tour.id);
      tourService.logAction('Tour Deleted', 'tour', `Deleted tour "${tour.name}" (${tour.id}).`);
      setAuditLogs(tourService.getAuditLogs());
      showToast(`Deleted "${tour.name}".`);
    }
  };

  const handleCloneTour = (tour: TourPackage) => {
    try {
      const cloned = tourService.cloneTour(tour.id);
      tourService.logAction('Tour Cloned', 'tour', `Duplicated "${tour.name}" to create "${cloned.name}".`);
      setAuditLogs(tourService.getAuditLogs());
      showToast(`Cloned tour as "${cloned.name}".`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. LIVE BOOKINGS & INQUIRIES STATE & HANDLERS
  // ─────────────────────────────────────────────────────────────────────────────
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>('All');
  const [isManualBookingOpen, setIsManualBookingOpen] = useState(false);
  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState<TourBooking | null>(null);
  const [selectedBookingForVoucher, setSelectedBookingForVoucher] = useState<TourBooking | null>(null);

  const [manualBookingForm, setManualBookingForm] = useState({
    tourId: tours[0]?.id || '7-days-serengeti-migration-safari',
    tourName: tours[0]?.name || '7-Day Serengeti Migration & Ngorongoro Luxury',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    country: 'United States',
    travelDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    pax: 2,
    totalAmount: 4900,
    currency: '$',
    status: 'Confirmed' as TourBooking['status'],
    specialRequests: 'Offline client booking created via Administrator Dashboard.',
    assignedGuide: 'Josephat Kavishe'
  });

  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchSearch = b.clientName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
                          b.tourName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
                          b.id.toLowerCase().includes(bookingSearch.toLowerCase()) ||
                          b.country.toLowerCase().includes(bookingSearch.toLowerCase());
      const matchStatus = bookingStatusFilter === 'All' || b.status === bookingStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [bookings, bookingSearch, bookingStatusFilter]);

  const handleCreateManualBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualBookingForm.clientName || !manualBookingForm.clientEmail) {
      alert('Please provide client name and email.');
      return;
    }
    const created = tourService.createBooking(manualBookingForm);
    tourService.logAction('Manual Booking Created', 'booking', `Created offline booking ${created.id} for ${created.clientName} ($${created.totalAmount}).`);
    setBookings(tourService.getBookings());
    setAuditLogs(tourService.getAuditLogs());
    setIsManualBookingOpen(false);
    showToast(`Manual booking ${created.id} created!`);
  };

  const handleUpdateBookingStatus = (id: string, status: TourBooking['status']) => {
    tourService.updateBookingStatus(id, status);
    tourService.logAction('Booking Status Changed', 'booking', `Booking ${id} status set to ${status}.`);
    setBookings(tourService.getBookings());
    setAuditLogs(tourService.getAuditLogs());
    showToast(`Booking ${id} status updated to ${status}`);
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm(`Are you sure you want to delete booking ${id}?`)) {
      tourService.deleteBooking(id);
      tourService.logAction('Booking Deleted', 'booking', `Deleted reservation ${id}.`);
      setBookings(tourService.getBookings());
      setAuditLogs(tourService.getAuditLogs());
      showToast(`Booking ${id} deleted.`);
    }
  };

  const handleExportCSV = () => {
    const csv = tourService.exportBookingsCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `embuat-bookings-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast('Bookings CSV exported successfully!');
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. SCHEDULED DEPARTURES CRUD
  // ─────────────────────────────────────────────────────────────────────────────
  const [isNewDepartureOpen, setIsNewDepartureOpen] = useState(false);
  const [newDepartureForm, setNewDepartureForm] = useState({
    tourId: tours[0]?.id || '',
    tourName: tours[0]?.name || '',
    category: 'Safari' as TourCategory,
    startDate: new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 67 * 86400000).toISOString().split('T')[0],
    availableSeats: 6,
    totalSeats: 6,
    pricePerPerson: 2850,
    guaranteed: true,
    status: 'Guaranteed' as DepartureSchedule['status']
  });

  const handleCreateDeparture = (e: React.FormEvent) => {
    e.preventDefault();
    const created = tourService.createDeparture(newDepartureForm);
    tourService.logAction('Departure Created', 'departure', `Created group departure ${created.id} for ${created.tourName}.`);
    setDepartures(tourService.getDepartures());
    setAuditLogs(tourService.getAuditLogs());
    setIsNewDepartureOpen(false);
    showToast('New departure date created successfully!');
  };

  const handleDeleteDeparture = (id: string) => {
    if (confirm('Delete this scheduled departure?')) {
      tourService.deleteDeparture(id);
      tourService.logAction('Departure Deleted', 'departure', `Removed departure ${id}.`);
      setDepartures(tourService.getDepartures());
      setAuditLogs(tourService.getAuditLogs());
      showToast('Departure deleted.');
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. FLEET & GUIDES CRUD
  // ─────────────────────────────────────────────────────────────────────────────
  const handleUpdateVehicleStatus = (id: string, status: FleetVehicle['status']) => {
    tourService.updateFleetVehicle(id, { status });
    tourService.logAction('Fleet Status Changed', 'fleet', `Vehicle ${id} marked as ${status}.`);
    setFleet(tourService.getFleet());
    setAuditLogs(tourService.getAuditLogs());
    showToast(`Vehicle ${id} marked as ${status}`);
  };

  const handleUpdateGuideStatus = (id: string, status: SafariGuide['status']) => {
    tourService.updateGuide(id, { status });
    tourService.logAction('Guide Status Changed', 'guide', `Guide ${id} status set to ${status}.`);
    setGuides(tourService.getGuides());
    setAuditLogs(tourService.getAuditLogs());
    showToast(`Guide status updated to ${status}`);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. SITE SECTIONS EDITOR (CRUD on Hero, About, Contact, Testimonials, FAQs)
  // ─────────────────────────────────────────────────────────────────────────────
  const [siteContentForm, setSiteContentForm] = useState<SiteSectionContent>(() => siteContentService.getContent());
  const [sectionTab, setSectionTab] = useState<'hero' | 'about' | 'contact' | 'testimonials' | 'faqs'>('hero');
  
  // Testimonial Form Modal
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({
    id: '',
    name: '',
    location: '',
    text: '',
    rating: 5,
    tour: '7-Day Serengeti Migration Luxury',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  });

  // FAQ Form Modal
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [faqForm, setFaqForm] = useState({
    id: '',
    question: '',
    answer: '',
    category: 'General'
  });

  const handleSaveSiteContent = (e: React.FormEvent) => {
    e.preventDefault();
    siteContentService.saveContent(siteContentForm);
    tourService.logAction('Site Content Published', 'cms', 'Updated global website sections & live CMS configuration.');
    setAuditLogs(tourService.getAuditLogs());
    showToast('Site section updates published live across the website!');
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. MEDIA ASSET MANAGER
  // ─────────────────────────────────────────────────────────────────────────────
  const [isAddMediaOpen, setIsAddMediaOpen] = useState(false);
  const [mediaFilterCategory, setMediaFilterCategory] = useState<string>('All');
  const [newMediaForm, setNewMediaForm] = useState({
    title: '',
    category: 'Wildlife' as MediaAsset['category'],
    url: '',
    tag: 'Serengeti / Safari'
  });

  const filteredMedia = useMemo(() => {
    return mediaAssets.filter(m => {
      return mediaFilterCategory === 'All' || m.category === mediaFilterCategory;
    });
  }, [mediaAssets, mediaFilterCategory]);

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaForm.title || !newMediaForm.url) return;
    tourService.addMediaAsset(newMediaForm);
    tourService.logAction('Media Asset Added', 'cms', `Added image asset "${newMediaForm.title}".`);
    setMediaAssets(tourService.getMediaAssets());
    setAuditLogs(tourService.getAuditLogs());
    setIsAddMediaOpen(false);
    showToast('Image asset added to media library!');
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 7. CLIENT MESSAGES & WHATSAPP TEMPLATES
  // ─────────────────────────────────────────────────────────────────────────────
  const [selectedTemplateBooking, setSelectedTemplateBooking] = useState<TourBooking>(bookings[0] || {} as TourBooking);
  const [selectedTemplateType, setSelectedTemplateType] = useState<'confirmation' | 'packing' | 'guide_assigned' | 'review'>('confirmation');

  const generatedMessage = useMemo(() => {
    const b = selectedTemplateBooking;
    if (!b || !b.clientName) return '';

    if (selectedTemplateType === 'confirmation') {
      return `Jambo ${b.clientName}!\n\nThis is the Director of Operations at Embuat Safaris in Arusha, Tanzania.\n\nWe have received and provisionally confirmed your reservation:\n📋 Booking Ref: ${b.id}\n🦁 Tour Package: ${b.tourName}\n📅 Travel Date: ${b.travelDate}\n👥 Guests: ${b.pax} Pax\n💰 Total Amount: $${b.totalAmount.toLocaleString()} USD (All park fees, private 4x4 Land Cruiser & taxes included)\n\nOur operations desk is now reserving your prime luxury tented lodge accommodations. Could you kindly let us know your arrival flight details into Kilimanjaro (JRO) or Arusha (ARK)?\n\nKaribu sana Tanzania!\nEmbuat Safaris Team\n+255 753 997 777`;
    }

    if (selectedTemplateType === 'packing') {
      return `Habari ${b.clientName}!\n\nYour Tanzanian expedition (${b.tourName}) is approaching on ${b.travelDate}!\n\nHere is your official Embuat Safaris Pre-Departure Checklist:\n1. 🧳 Soft Duffle Bags: Safari aircraft and 4x4s prefer soft duffle luggage (max 15kg).\n2. 🧥 Clothing: Neutral colors (khaki, tan, green). Avoid bright blues/blacks in tsetse fly zones.\n3. 🌄 Warm Layers: Ngorongoro crater rim and Serengeti dawn game drives are crisp (10°C / 50°F).\n4. 📸 Gear: High-capacity memory cards, binoculars, and universal power adapters (UK 3-pin standard in Tanzania).\n5. 💉 Health: Yellow fever certificate (if transiting endemic zone) & anti-malarials recommended.\n\nLet us know if you need any customized gear rentals!\nEmbuat Safaris Operations`;
    }

    if (selectedTemplateType === 'guide_assigned') {
      return `Dear ${b.clientName},\n\nWe are delighted to announce that your Lead Safari Naturalist has been officially assigned!\n\n🧑‍🌾 Guide: ${b.assignedGuide || 'Josephat Kavishe'} (15+ Years Native Bush Tracker)\n🚙 Vehicle: Custom 4x4 Toyota Land Cruiser (Pop-up photography roof, 220V inverter power, 40L chilled fridge)\n\nYour guide will meet you personally at the airport holding an Embuat Safaris sign with your name.\n\nKaribu Sana!`;
    }

    return `Hello ${b.clientName}!\n\nWe hope your journey back home was smooth and that the memories of the Serengeti lions, Kilimanjaro vistas, and Tanzanian sunsets stay with you forever.\n\nWould you mind sharing a brief review of your experience with Embuat Safaris on TripAdvisor or Google?\n🌟 Direct Review Link: https://tripadvisor.com\n\nAs a local Tanzanian-owned company, your feedback means the world to our native guides.\n\nAsante sana!\nEmbuat Safaris Family`;
  }, [selectedTemplateBooking, selectedTemplateType]);

  // ─────────────────────────────────────────────────────────────────────────────
  // 8. DATABASE IMPORT / EXPORT
  // ─────────────────────────────────────────────────────────────────────────────
  const handleExportFullJSON = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      platform: 'Embuat Safaris Operation System Enterprise v2.5',
      tours: tourService.getTours(),
      bookings: tourService.getBookings(),
      departures: tourService.getDepartures(),
      fleet: tourService.getFleet(),
      guides: tourService.getGuides(),
      siteContent: siteContentService.getContent(),
      auditLogs: tourService.getAuditLogs(),
      mediaAssets: tourService.getMediaAssets()
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `embuat-safaris-enterprise-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    tourService.logAction('System Snapshot Exported', 'system', 'Full JSON database backup downloaded.');
    setAuditLogs(tourService.getAuditLogs());
    showToast('Complete system backup JSON downloaded!');
  };

  // Analytics Metrics
  const metrics = useMemo(() => {
    const totalBookingsCount = bookings.length;
    const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
    const confirmedBookings = bookings.filter(b => b.status === 'Confirmed').length;
    const completedBookings = bookings.filter(b => b.status === 'Completed').length;
    const totalRevenue = bookings
      .filter(b => b.status === 'Confirmed' || b.status === 'Completed')
      .reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
    const averageBookingValue = confirmedBookings > 0 
      ? Math.round(totalRevenue / confirmedBookings) 
      : 4200;
    const activeToursCount = tours.filter(t => t.status === 'active').length;
    const availableVehicles = fleet.filter(v => v.status === 'Available').length;
    const availableGuides = guides.filter(g => g.status === 'Available').length;

    // Distribution
    const safariCount = tours.filter(t => t.category === 'Safari').length;
    const trekkingCount = tours.filter(t => t.category === 'Trekking').length;
    const zanzibarCount = tours.filter(t => t.category === 'Zanzibar').length;
    const dayTripsCount = tours.filter(t => t.category === 'Day Trips').length;

    return {
      totalBookingsCount,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      totalRevenue,
      averageBookingValue,
      activeToursCount,
      availableVehicles,
      availableGuides,
      categoryDistribution: {
        safari: safariCount,
        trekking: trekkingCount,
        zanzibar: zanzibarCount,
        dayTrips: dayTripsCount
      }
    };
  }, [bookings, tours, fleet, guides]);

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER: AUTHENTICATION BARRIER
  // ─────────────────────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0C0A09] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#16120E] rounded-3xl p-8 border border-white/[0.08] shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#DE6826]/25 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#DE6826] to-[#C08240] flex items-center justify-center mx-auto mb-4 shadow-xl border border-white/20">
              <Compass className="w-8 h-8 text-white" />
            </div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#F5C478] bg-black/40 px-3 py-1 rounded-full border border-amber-500/20">
              Embuat Safaris • Arusha HQ
            </span>
            <h1 className="text-2xl font-serif font-bold text-white mt-3">
              Operations & Admin Console
            </h1>
            <p className="text-xs text-white/60 mt-1">
              Internal Command Center for Bookings, Fleet, Packages & Live Site CMS
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5 flex items-center justify-between">
                <span>Passcode</span>
                <span className="text-[10px] text-emerald-400 font-normal">Demo: embuat2026</span>
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                <input 
                  type="password"
                  placeholder="Enter administrator passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#DE6826]"
                  autoFocus
                />
              </div>
            </div>

            {authError && (
              <div className="p-3 bg-rose-950/50 border border-rose-800/60 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-white/70">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#DE6826] focus:ring-0 bg-black/30 border-white/20"
                />
                <span>Remember session</span>
              </label>
              <button 
                type="button" 
                onClick={() => setPasscode('embuat2026')}
                className="text-[#F5C478] hover:underline"
              >
                Auto-fill Passcode
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#DE6826] via-[#D48B28] to-[#C08240] text-white font-bold text-sm rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Unlock Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <a 
              href="/" 
              className="text-xs text-white/50 hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <span>← Back to Public Website</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER: MAIN ADMIN COMMAND CENTER
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0C0A09] text-gray-100 flex flex-col font-sans selection:bg-[#DE6826] selection:text-white">
      
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#DE6826] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-bold border border-white/20 animate-bounce">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header / Executive Bar */}
      <header className="h-16 bg-[#14100D] border-b border-white/[0.08] px-4 sm:px-6 flex items-center justify-between flex-shrink-0 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#DE6826] to-[#C08240] flex items-center justify-center font-bold text-white shadow-md border border-white/10">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base text-white tracking-wide">Embuat Safaris</span>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Operations Live
              </span>
            </div>
            <p className="text-[10px] text-white/50">Internal Executive Control Panel • Arusha HQ</p>
          </div>
        </div>

        {/* Live EAT Clock & Action Shortcuts */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded-xl border border-white/10 text-xs">
            <Clock className="w-3.5 h-3.5 text-[#F5C478]" />
            <span className="text-white/60">Arusha Time (EAT):</span>
            <span className="font-mono font-bold text-[#F5C478]">{currentTime || '12:00:00 PM'}</span>
          </div>

          <button
            onClick={handleExportCSV}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 text-xs font-semibold border border-emerald-800/60 transition-colors"
            title="Download Bookings as CSV for Excel"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <a 
            href="/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-white/5 hover:bg-rose-950/40 text-white/60 hover:text-rose-400 transition-colors border border-white/10"
            title="Log out of Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Workspace with Sidebar & Tab Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-68 bg-gradient-to-b from-[#140F0C] via-[#110D0A] to-[#0A0806] border-r border-white/[0.08] p-3 sm:p-4 flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto flex-shrink-0 shadow-2xl backdrop-blur-md">
          
          <div className="flex items-center justify-between px-3 pt-2 pb-1.5 hidden md:flex border-b border-white/[0.04] mb-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#F5C478]/80 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DE6826] animate-pulse"></span>
              Operations & Field
            </span>
            <span className="text-[9px] font-mono text-white/40">Core</span>
          </div>

          {[
            { id: 'overview', label: 'Overview & Analytics', icon: LayoutDashboard, badge: null },
            { id: 'bookings', label: 'Guest Bookings', icon: Users, badge: metrics.pendingBookings ? `${metrics.pendingBookings} New` : null, badgeColor: 'bg-[#DE6826] text-white shadow-[0_2px_10px_rgba(222,104,38,0.5)]' },
            { id: 'tours', label: 'Safari Catalog (CRUD)', icon: Compass, badge: tours.length.toString(), badgeColor: 'bg-white/10 text-white/80' },
            { id: 'package-images', label: 'Package Photos (Replace)', icon: Camera, badge: 'Upload / Replace', badgeColor: 'bg-gradient-to-r from-[#DE6826] to-[#D48B28] text-white font-black shadow-[0_2px_8px_rgba(222,104,38,0.4)]' },
            { id: 'departures', label: 'Group Departures', icon: Calendar, badge: departures.length.toString(), badgeColor: 'bg-white/10 text-white/80' },
            { id: 'fleet', label: 'Fleet & Guides', icon: Truck, badge: `${metrics.availableVehicles} 4x4s`, badgeColor: 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/20' }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`group relative w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between transition-all duration-300 ease-out border whitespace-nowrap overflow-hidden ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#DE6826] via-[#D48B28] to-[#C08240] text-white shadow-[0_6px_25px_rgba(222,104,38,0.35)] border-[#F5C478]/40 translate-x-1 font-bold' 
                    : 'text-white/70 hover:text-white bg-white/[0.02] hover:bg-gradient-to-r hover:from-[#DE6826]/15 hover:via-white/[0.04] hover:to-transparent border-transparent hover:border-[#DE6826]/30 hover:translate-x-1.5 hover:shadow-[0_4px_20px_rgba(222,104,38,0.12)]'
                }`}
              >
                {/* Active/Hover Glow Indicator Line */}
                <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full transition-all duration-300 ${
                  isActive ? 'h-6 bg-white shadow-[0_0_8px_#ffffff]' : 'h-0 group-hover:h-4 bg-[#DE6826]'
                }`} />

                <div className="flex items-center gap-2.5 z-10">
                  <Icon className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                    isActive ? 'text-white scale-110' : 'text-amber-500/80 group-hover:text-[#F5C478] group-hover:scale-110'
                  }`} />
                  <span className="truncate tracking-wide">{tab.label}</span>
                </div>
                {tab.badge && (
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full transition-all duration-300 z-10 ${
                    isActive ? 'bg-black/25 text-white' : (tab.badgeColor || 'bg-white/10 text-white/80 group-hover:bg-[#DE6826]/20 group-hover:text-amber-300')
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="flex items-center justify-between px-3 pt-4 pb-1.5 hidden md:flex border-b border-white/[0.04] mb-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#F5C478]/80 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Guest Services & Media
            </span>
            <span className="text-[9px] font-mono text-white/40">Client</span>
          </div>

          {[
            { id: 'vouchers', label: 'Vouchers & Invoices', icon: Receipt, badge: 'Print', badgeColor: 'bg-indigo-950/80 text-indigo-300 border border-indigo-500/20' },
            { id: 'messages', label: 'WhatsApp Dispatch', icon: MessageSquare, badge: 'Templates', badgeColor: 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/20' },
            { id: 'media', label: 'Media Asset Library', icon: ImageIcon, badge: mediaAssets.length.toString(), badgeColor: 'bg-white/10 text-white/80' }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`group relative w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between transition-all duration-300 ease-out border whitespace-nowrap overflow-hidden ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#DE6826] via-[#D48B28] to-[#C08240] text-white shadow-[0_6px_25px_rgba(222,104,38,0.35)] border-[#F5C478]/40 translate-x-1 font-bold' 
                    : 'text-white/70 hover:text-white bg-white/[0.02] hover:bg-gradient-to-r hover:from-[#DE6826]/15 hover:via-white/[0.04] hover:to-transparent border-transparent hover:border-[#DE6826]/30 hover:translate-x-1.5 hover:shadow-[0_4px_20px_rgba(222,104,38,0.12)]'
                }`}
              >
                <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full transition-all duration-300 ${
                  isActive ? 'h-6 bg-white shadow-[0_0_8px_#ffffff]' : 'h-0 group-hover:h-4 bg-[#DE6826]'
                }`} />

                <div className="flex items-center gap-2.5 z-10">
                  <Icon className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                    isActive ? 'text-white scale-110' : 'text-amber-500/80 group-hover:text-[#F5C478] group-hover:scale-110'
                  }`} />
                  <span className="truncate tracking-wide">{tab.label}</span>
                </div>
                {tab.badge && (
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full transition-all duration-300 z-10 ${
                    isActive ? 'bg-black/25 text-white' : (tab.badgeColor || 'bg-white/10 text-white/80 group-hover:bg-[#DE6826]/20 group-hover:text-amber-300')
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="flex items-center justify-between px-3 pt-4 pb-1.5 hidden md:flex border-b border-white/[0.04] mb-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#F5C478]/80 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              CMS & Cloud System
            </span>
            <span className="text-[9px] font-mono text-white/40">System</span>
          </div>

          {[
            { id: 'sections', label: 'Website CMS (All)', icon: Layers, badge: 'Live', badgeColor: 'bg-amber-900/40 text-amber-300 border border-amber-500/20' },
            { id: 'audit', label: 'Audit Activity Log', icon: History, badge: `${auditLogs.length}`, badgeColor: 'bg-white/10 text-white/80' },
            { id: 'database', label: 'Database & Sync', icon: Database, badge: 'Ready', badgeColor: 'bg-blue-950/80 text-blue-300 border border-blue-500/20' }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`group relative w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between transition-all duration-300 ease-out border whitespace-nowrap overflow-hidden ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#DE6826] via-[#D48B28] to-[#C08240] text-white shadow-[0_6px_25px_rgba(222,104,38,0.35)] border-[#F5C478]/40 translate-x-1 font-bold' 
                    : 'text-white/70 hover:text-white bg-white/[0.02] hover:bg-gradient-to-r hover:from-[#DE6826]/15 hover:via-white/[0.04] hover:to-transparent border-transparent hover:border-[#DE6826]/30 hover:translate-x-1.5 hover:shadow-[0_4px_20px_rgba(222,104,38,0.12)]'
                }`}
              >
                <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full transition-all duration-300 ${
                  isActive ? 'h-6 bg-white shadow-[0_0_8px_#ffffff]' : 'h-0 group-hover:h-4 bg-[#DE6826]'
                }`} />

                <div className="flex items-center gap-2.5 z-10">
                  <Icon className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                    isActive ? 'text-white scale-110' : 'text-amber-500/80 group-hover:text-[#F5C478] group-hover:scale-110'
                  }`} />
                  <span className="truncate tracking-wide">{tab.label}</span>
                </div>
                {tab.badge && (
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full transition-all duration-300 z-10 ${
                    isActive ? 'bg-black/25 text-white' : (tab.badgeColor || 'bg-white/10 text-white/80 group-hover:bg-[#DE6826]/20 group-hover:text-amber-300')
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Pane */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto bg-[#0C0A09]">
          
          {/* TAB 1: OVERVIEW & ANALYTICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Executive Welcome Banner */}
              <div className="p-6 bg-gradient-to-r from-[#1A1410] via-[#241A14] to-[#16110D] rounded-3xl border border-white/[0.08] relative overflow-hidden shadow-xl">
                <div className="relative z-10 max-w-3xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#F5C478] bg-black/40 px-3 py-1 rounded-full border border-amber-500/20">
                      Operations Dashboard • Embuat Safaris Arusha
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800">
                      Sync: Active
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-3">
                    Jambo & Welcome Back, Director
                  </h2>
                  <p className="text-xs sm:text-sm text-white/70 mt-1 leading-relaxed">
                    All client reservations from the public website synchronize here in real time. You have full CRUD control over the 84 safari packages, group departures, 4x4 fleet assignments, and website content sections.
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mt-4">
                    <button 
                      onClick={() => setActiveTab('bookings')}
                      className="px-4 py-2 rounded-xl bg-[#DE6826] hover:bg-[#DE6826]/90 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Review Inquiries ({metrics.pendingBookings} Pending)</span>
                    </button>
                    <button 
                      onClick={handleOpenCreateTour}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-1.5 border border-white/10"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>New Tour Package</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('vouchers')}
                      className="px-4 py-2 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-indigo-200 font-bold text-xs flex items-center gap-1.5 border border-indigo-800/60"
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      <span>Generate Voucher</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 bg-[#16120E] rounded-2xl border border-white/[0.08] shadow-md">
                  <div className="flex items-center justify-between text-white/50 text-xs mb-2">
                    <span>Total Bookings</span>
                    <Users className="w-4 h-4 text-[#DE6826]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white">{metrics.totalBookingsCount}</div>
                  <div className="text-[11px] text-[#F5C478] mt-1 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <span>{metrics.pendingBookings} awaiting confirmation</span>
                  </div>
                </div>

                <div className="p-5 bg-[#16120E] rounded-2xl border border-white/[0.08] shadow-md">
                  <div className="flex items-center justify-between text-white/50 text-xs mb-2">
                    <span>Confirmed Revenue</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-400">
                    ${metrics.totalRevenue.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-white/50 mt-1">Avg group: ${metrics.averageBookingValue.toLocaleString()}</div>
                </div>

                <div className="p-5 bg-[#16120E] rounded-2xl border border-white/[0.08] shadow-md">
                  <div className="flex items-center justify-between text-white/50 text-xs mb-2">
                    <span>Active Tour Catalog</span>
                    <Compass className="w-4 h-4 text-[#C08240]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white">{metrics.activeToursCount}</div>
                  <div className="text-[11px] text-white/50 mt-1">84 packages published</div>
                </div>

                <div className="p-5 bg-[#16120E] rounded-2xl border border-white/[0.08] shadow-md">
                  <div className="flex items-center justify-between text-white/50 text-xs mb-2">
                    <span>Fleet Readiness</span>
                    <Truck className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    {metrics.availableVehicles} / {fleet.length} <span className="text-xs text-white/50 font-normal">Land Cruisers</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1">
                    {metrics.availableGuides} Native Guides available
                  </div>
                </div>
              </div>

              {/* Analytics & Destination Distribution Bar Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Visual Sales & Conversion Breakdown */}
                <div className="lg:col-span-2 p-5 sm:p-6 bg-[#16120E] rounded-3xl border border-white/[0.08] shadow-md space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-[#DE6826]" />
                        <span>Sales Trajectory & Pipeline Performance</span>
                      </h3>
                      <p className="text-xs text-white/50">Simulated monthly booking revenue and volume in USD</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
                      +28% YoY Growth
                    </span>
                  </div>

                  {/* Visual SVG Bar Chart */}
                  <div className="pt-4">
                    <div className="grid grid-cols-6 gap-2 sm:gap-4 items-end h-40 border-b border-white/10 pb-2">
                      {[
                        { month: 'May', amount: '$24.5k', height: '40%' },
                        { month: 'Jun', amount: '$38.2k', height: '65%' },
                        { month: 'Jul', amount: '$54.0k', height: '90%' },
                        { month: 'Aug', amount: '$62.5k', height: '100%' },
                        { month: 'Sep', amount: '$46.8k', height: '75%' },
                        { month: 'Oct', amount: '$41.2k', height: '70%' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                          <span className="text-[10px] font-mono text-white/60 opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.amount}
                          </span>
                          <div 
                            className="w-full max-w-[42px] bg-gradient-to-t from-[#DE6826] to-[#F5C478] rounded-t-lg transition-all group-hover:brightness-125"
                            style={{ height: item.height }}
                          ></div>
                          <span className="text-[11px] font-bold text-white/70">{item.month}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-white/40 pt-2">
                      <span>Low Season (Apr - May)</span>
                      <span>Peak Great Migration Season (Jul - Oct)</span>
                    </div>
                  </div>
                </div>

                {/* Destination Share Pie/Bar Distribution */}
                <div className="p-5 sm:p-6 bg-[#16120E] rounded-3xl border border-white/[0.08] shadow-md space-y-4">
                  <h3 className="font-serif font-bold text-lg text-white">Destination Breakdown</h3>
                  <p className="text-xs text-white/50">Package catalog allocation by circuit</p>

                  <div className="space-y-3 pt-2">
                    {[
                      { label: 'Northern Safari Circuit', count: metrics.categoryDistribution.safari, pct: 45, color: 'bg-[#DE6826]' },
                      { label: 'Kilimanjaro Treks', count: metrics.categoryDistribution.trekking, pct: 28, color: 'bg-[#C08240]' },
                      { label: 'Zanzibar Island', count: metrics.categoryDistribution.zanzibar, pct: 18, color: 'bg-emerald-500' },
                      { label: '1-Day Day Trips', count: metrics.categoryDistribution.dayTrips, pct: 9, color: 'bg-blue-500' }
                    ].map((item, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-white/80">{item.label}</span>
                          <span className="text-white">{item.count} Tours ({item.pct}%)</span>
                        </div>
                        <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-[11px] text-white/70 mt-4">
                    💡 <strong>Insight:</strong> 64% of travelers combine a Northern Circuit Wildlife Safari with a 4-night Zanzibar beach extension.
                  </div>
                </div>

              </div>

              {/* Recent Bookings Quick Table */}
              <div className="bg-[#16120E] rounded-3xl border border-white/[0.08] p-5 sm:p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-white">Recent Guest Inquiries</h3>
                    <p className="text-xs text-white/50">Direct bookings submitted through public tour pages</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs text-[#F5C478] hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>View All ({bookings.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-white/50">
                        <th className="py-2.5 px-3">Ref ID</th>
                        <th className="py-2.5 px-3">Client</th>
                        <th className="py-2.5 px-3">Safari Package</th>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Pax</th>
                        <th className="py-2.5 px-3">Total</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {bookings.slice(0, 5).map(b => (
                        <tr key={b.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 px-3 font-mono font-bold text-[#F5C478]">{b.id}</td>
                          <td className="py-3 px-3">
                            <div className="font-bold text-white">{b.clientName}</div>
                            <div className="text-[10px] text-white/50">{b.country}</div>
                          </td>
                          <td className="py-3 px-3 text-white/80 max-w-[200px] truncate">{b.tourName}</td>
                          <td className="py-3 px-3 text-white/70">{b.travelDate}</td>
                          <td className="py-3 px-3 text-white/70">{b.pax} Guests</td>
                          <td className="py-3 px-3 font-bold text-emerald-400">${b.totalAmount.toLocaleString()}</td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              b.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                              b.status === 'Pending' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                              b.status === 'Completed' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                              'bg-rose-950 text-rose-400 border border-rose-800'
                            }`}>
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: LIVE BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              
              {/* Controls Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#16120E] p-4 rounded-2xl border border-white/[0.08]">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input 
                      type="text"
                      placeholder="Search bookings by client, ID, tour..."
                      value={bookingSearch}
                      onChange={(e) => setBookingSearch(e.target.value)}
                      className="pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 text-xs w-64 focus:outline-none focus:ring-1 focus:ring-[#DE6826]"
                    />
                  </div>

                  <select
                    value={bookingStatusFilter}
                    onChange={(e) => setBookingStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="px-3 py-2 bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-emerald-800/60"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={() => setIsManualBookingOpen(true)}
                    className="px-4 py-2 bg-gradient-to-r from-[#DE6826] to-[#C08240] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Offline Booking</span>
                  </button>
                </div>
              </div>

              {/* Bookings List Table */}
              <div className="bg-[#16120E] rounded-3xl border border-white/[0.08] overflow-hidden shadow-md">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-black/40 border-b border-white/10 text-white/50">
                        <th className="py-3 px-4">Ref ID</th>
                        <th className="py-3 px-4">Client Contact</th>
                        <th className="py-3 px-4">Package</th>
                        <th className="py-3 px-4">Travel Date</th>
                        <th className="py-3 px-4">Pax</th>
                        <th className="py-3 px-4">Total (USD)</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Guide Assigned</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredBookings.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="py-8 text-center text-white/50">
                            No reservations found matching search criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredBookings.map(b => (
                          <tr key={b.id} className="hover:bg-white/5 transition-colors">
                            <td className="py-3 px-4 font-mono font-bold text-[#F5C478]">{b.id}</td>
                            <td className="py-3 px-4">
                              <div className="font-bold text-white">{b.clientName}</div>
                              <div className="text-[11px] text-white/50">{b.clientEmail}</div>
                              <div className="text-[10px] text-emerald-400">{b.clientPhone}</div>
                            </td>
                            <td className="py-3 px-4 max-w-[200px]">
                              <div className="font-semibold text-white truncate" title={b.tourName}>{b.tourName}</div>
                              <div className="text-[10px] text-white/50">{b.country}</div>
                            </td>
                            <td className="py-3 px-4 text-white/80">{b.travelDate}</td>
                            <td className="py-3 px-4 text-white/80">{b.pax} Pax</td>
                            <td className="py-3 px-4 font-bold text-emerald-400">${b.totalAmount.toLocaleString()}</td>
                            <td className="py-3 px-4">
                              <select
                                value={b.status}
                                onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value as TourBooking['status'])}
                                className={`text-[10px] font-bold rounded-lg px-2 py-1 outline-none border cursor-pointer ${
                                  b.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' :
                                  b.status === 'Pending' ? 'bg-amber-950 text-amber-400 border-amber-800' :
                                  b.status === 'Completed' ? 'bg-blue-950 text-blue-400 border-blue-800' :
                                  'bg-rose-950 text-rose-400 border-rose-800'
                                }`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="py-3 px-4">
                              <select
                                value={b.assignedGuide || ''}
                                onChange={(e) => {
                                  tourService.updateBooking(b.id, { assignedGuide: e.target.value });
                                  tourService.logAction('Guide Assigned', 'booking', `Assigned ${e.target.value} to booking ${b.id}.`);
                                  setBookings(tourService.getBookings());
                                  setAuditLogs(tourService.getAuditLogs());
                                  showToast(`Assigned ${e.target.value} to ${b.id}`);
                                }}
                                className="px-2 py-1 rounded bg-black/40 border border-white/10 text-white/80 text-[10px] outline-none"
                              >
                                <option value="">Unassigned</option>
                                {guides.map(g => (
                                  <option key={g.id} value={g.name}>{g.name}</option>
                                ))}
                              </select>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setSelectedBookingForVoucher(b)}
                                  className="p-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900 text-indigo-300"
                                  title="Generate Official Safari Voucher"
                                >
                                  <Receipt className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setSelectedBookingForDetails(b)}
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                                  title="View Full Booking Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteBooking(b.id)}
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-950 text-white/50 hover:text-rose-400"
                                  title="Delete Booking"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: TOUR PACKAGES (FULL CRUD) */}
          {activeTab === 'tours' && (
            <div className="space-y-6">
              
              {/* Filter & Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#16120E] p-4 rounded-2xl border border-white/[0.08]">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input 
                      type="text"
                      placeholder="Search safari catalog..."
                      value={tourSearch}
                      onChange={(e) => setTourSearch(e.target.value)}
                      className="pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 text-xs w-60 focus:outline-none focus:ring-1 focus:ring-[#DE6826]"
                    />
                  </div>

                  <select
                    value={tourCategoryFilter}
                    onChange={(e) => setTourCategoryFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none"
                  >
                    <option value="All">All Categories</option>
                    <option value="Safari">Safari (Northern Circuit)</option>
                    <option value="Trekking">Kilimanjaro Trekking</option>
                    <option value="Zanzibar">Zanzibar Island</option>
                    <option value="Day Trips">Day Trips & Excursions</option>
                  </select>

                  <select
                    value={tourStatusFilter}
                    onChange={(e) => setTourStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none"
                  >
                    <option value="All">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (confirm('Reset tour catalog back to initial default packages?')) {
                        tourService.resetToursToDefault();
                        tourService.logAction('Catalog Reset', 'tour', 'Reset all tours to default seed collection.');
                        setAuditLogs(tourService.getAuditLogs());
                        showToast('Tour catalog reset to default seeds.');
                      }
                    }}
                    className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-white/10"
                    title="Reset to default seeds"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>

                  <button
                    onClick={handleOpenCreateTour}
                    className="px-4 py-2 bg-gradient-to-r from-[#DE6826] to-[#C08240] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md hover:opacity-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create New Tour</span>
                  </button>
                </div>
              </div>

              {/* Tours Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTours.map(tour => (
                  <div key={tour.id} className="bg-[#16120E] rounded-2xl border border-white/[0.08] overflow-hidden shadow-md flex flex-col justify-between group hover:border-[#DE6826]/40 transition-all">
                    <div>
                      {/* Tour Image */}
                      <div className="relative h-44 overflow-hidden bg-black/50">
                        <img 
                          src={tour.image || tour.coverImage} 
                          alt={tour.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                        <div className="absolute top-2.5 left-2.5 flex gap-1.5 flex-wrap">
                          <span className="bg-black/75 backdrop-blur-sm text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
                            {tour.duration}
                          </span>
                          <span className="bg-[#DE6826] text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
                            {tour.category}
                          </span>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            tour.status === 'draft' ? 'bg-amber-600 text-white' : 
                            tour.status === 'archived' ? 'bg-gray-700 text-white' : 
                            'bg-emerald-700 text-white'
                          }`}>
                            {tour.status || 'active'}
                          </span>
                        </div>

                        <div className="absolute bottom-2 right-2 bg-black/85 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-[#F5C478]">
                          ${tour.fromPrice || 0}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h4 className="font-serif font-bold text-white text-base leading-snug line-clamp-1" title={tour.name}>
                          {tour.name}
                        </h4>
                        <p className="text-[11px] text-white/50 mt-1 line-clamp-2">
                          {tour.highlights?.[0] || 'Unforgettable wilderness safari encounter in Tanzania.'}
                        </p>
                        
                        <div className="mt-3 flex items-center justify-between text-[11px] text-white/60 border-t border-white/5 pt-2">
                          <span>Itinerary: {tour.itinerary?.length || 0} Days</span>
                          <span className="font-mono text-[10px] text-white/40">{tour.id}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="p-3 bg-black/40 border-t border-white/5 flex items-center justify-between">
                      <a 
                        href={`/itinerary/${tour.id}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[11px] text-white/60 hover:text-white flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Preview</span>
                      </a>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCloneTour(tour)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                          title="Clone Tour"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenEditTour(tour)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-amber-300 hover:text-amber-200"
                          title="Edit Tour Package"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTour(tour)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-950 text-white/40 hover:text-rose-400"
                          title="Delete Tour"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 4: SCHEDULED DEPARTURES */}
          {activeTab === 'departures' && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between bg-[#16120E] p-4 rounded-2xl border border-white/[0.08]">
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">Scheduled Group Departures</h3>
                  <p className="text-xs text-white/50">Manage fixed-date group climbs and migration expeditions</p>
                </div>
                <button
                  onClick={() => setIsNewDepartureOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-[#DE6826] to-[#C08240] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Departure Date</span>
                </button>
              </div>

              <div className="bg-[#16120E] rounded-3xl border border-white/[0.08] overflow-hidden shadow-md">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-black/40 border-b border-white/10 text-white/50">
                      <th className="py-3 px-4">Departure ID</th>
                      <th className="py-3 px-4">Tour Name</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Dates</th>
                      <th className="py-3 px-4">Seats Left</th>
                      <th className="py-3 px-4">Price / Person</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {departures.map(dep => (
                      <tr key={dep.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-[#F5C478]">{dep.id}</td>
                        <td className="py-3 px-4 font-bold text-white">{dep.tourName}</td>
                        <td className="py-3 px-4 text-white/70">{dep.category}</td>
                        <td className="py-3 px-4 text-white/80">{dep.startDate} to {dep.endDate}</td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-amber-400">{dep.availableSeats}</span> / {dep.totalSeats}
                        </td>
                        <td className="py-3 px-4 font-bold text-emerald-400">${dep.pricePerPerson}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            dep.status === 'Guaranteed' ? 'bg-emerald-950 text-emerald-400' :
                            dep.status === 'Almost Full' ? 'bg-amber-950 text-amber-400' :
                            dep.status === 'Sold Out' ? 'bg-rose-950 text-rose-400' :
                            'bg-blue-950 text-blue-400'
                          }`}>
                            {dep.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDeleteDeparture(dep.id)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-950 text-white/50 hover:text-rose-400"
                            title="Delete Departure"
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
          )}

          {/* TAB 5: FLEET & GUIDES */}
          {activeTab === 'fleet' && (
            <div className="space-y-8">
              
              {/* Fleet Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                      <Truck className="w-5 h-5 text-[#DE6826]" />
                      <span>Custom 4x4 Expedition Fleet</span>
                    </h3>
                    <p className="text-xs text-white/50">Toyota Land Cruiser extended safari vehicles tracking</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {fleet.map(veh => (
                    <div key={veh.id} className="p-4 bg-[#16120E] rounded-2xl border border-white/[0.08] shadow-md">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-bold text-sm text-[#F5C478]">{veh.plateNumber}</span>
                        <select
                          value={veh.status}
                          onChange={(e) => handleUpdateVehicleStatus(veh.id, e.target.value as FleetVehicle['status'])}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md outline-none cursor-pointer ${
                            veh.status === 'Available' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                            veh.status === 'On Safari' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                            'bg-rose-950 text-rose-400 border border-rose-800'
                          }`}
                        >
                          <option value="Available">Available</option>
                          <option value="On Safari">On Safari</option>
                          <option value="Maintenance">Maintenance</option>
                        </select>
                      </div>

                      <h4 className="font-bold text-white text-xs">{veh.model}</h4>
                      <p className="text-[11px] text-white/60 mt-1">
                        Driver: <strong className="text-white">{veh.assignedGuide || 'None Assigned'}</strong>
                      </p>
                      <p className="text-[11px] text-white/50 mt-0.5">
                        Mileage: {veh.mileageKm.toLocaleString()} km
                      </p>

                      <div className="mt-3 pt-2 border-t border-white/5 flex flex-wrap gap-1">
                        {veh.features.slice(0, 2).map((feat, i) => (
                          <span key={i} className="text-[9px] bg-white/5 text-white/70 px-1.5 py-0.5 rounded">
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guides Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-[#C08240]" />
                      <span>Certified Native Safari Naturalists & Mountain Guides</span>
                    </h3>
                    <p className="text-xs text-white/50">Field assignments and active duty status</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {guides.map(guide => (
                    <div key={guide.id} className="p-4 bg-[#16120E] rounded-2xl border border-white/[0.08] shadow-md flex items-center gap-3">
                      <img 
                        src={guide.photo} 
                        alt={guide.name} 
                        className="w-14 h-14 rounded-xl object-cover border border-amber-500/20 flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-white text-xs truncate">{guide.name}</h4>
                          <span className="text-[10px] text-[#F5C478] font-bold">★ {guide.rating}</span>
                        </div>
                        <p className="text-[10px] text-white/60 truncate mt-0.5">{guide.specialty}</p>
                        
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-[10px] text-white/40">{guide.experienceYears}y exp</span>
                          <select
                            value={guide.status}
                            onChange={(e) => handleUpdateGuideStatus(guide.id, e.target.value as SafariGuide['status'])}
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded outline-none cursor-pointer ${
                              guide.status === 'Available' ? 'bg-emerald-950 text-emerald-400' :
                              guide.status === 'On Safari' ? 'bg-amber-950 text-amber-400' :
                              'bg-gray-800 text-gray-300'
                            }`}
                          >
                            <option value="Available">Available</option>
                            <option value="On Safari">On Safari</option>
                            <option value="Resting">Resting</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 6: VOUCHERS & INVOICE GENERATOR */}
          {activeTab === 'vouchers' && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between bg-[#16120E] p-4 rounded-2xl border border-white/[0.08]">
                <div>
                  <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-indigo-400" />
                    <span>Official Guest Safari Voucher & Invoice Generator</span>
                  </h3>
                  <p className="text-xs text-white/50">Print or generate downloadable client vouchers with TANAPA registration</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {bookings.map(b => (
                  <div key={b.id} className="p-5 bg-[#16120E] rounded-2xl border border-white/[0.08] shadow-md flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="font-mono font-bold text-[#F5C478]">{b.id}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400">
                          {b.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-sm mt-1">{b.clientName}</h4>
                      <p className="text-xs text-white/60 truncate mt-0.5">{b.tourName}</p>
                      <p className="text-[11px] text-white/50 mt-1">Travel Date: {b.travelDate} ({b.pax} Guests)</p>
                      <p className="text-sm font-bold text-emerald-400 mt-2">${b.totalAmount.toLocaleString()} USD</p>
                    </div>

                    <button
                      onClick={() => setSelectedBookingForVoucher(b)}
                      className="w-full py-2 bg-indigo-950/80 hover:bg-indigo-900 text-indigo-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-indigo-800/60"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Generate Voucher</span>
                    </button>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 7: WHATSAPP & EMAIL TEMPLATES DISPATCH */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              
              <div className="bg-[#16120E] p-4 rounded-2xl border border-white/[0.08] flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-emerald-400" />
                    <span>Safari Operations Communication Dispatcher</span>
                  </h3>
                  <p className="text-xs text-white/50">Personalized automated messaging for WhatsApp Web and Email</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Select Client & Template Type */}
                <div className="p-5 bg-[#16120E] rounded-3xl border border-white/[0.08] space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                      1. Target Guest
                    </label>
                    <select
                      value={selectedTemplateBooking?.id || ''}
                      onChange={(e) => {
                        const b = bookings.find(x => x.id === e.target.value);
                        if (b) setSelectedTemplateBooking(b);
                      }}
                      className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none"
                    >
                      {bookings.map(b => (
                        <option key={b.id} value={b.id}>{b.clientName} ({b.id})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-2">
                      2. Template Category
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: 'confirmation', label: 'Booking Confirmation & Deposit' },
                        { id: 'packing', label: 'Pre-Safari Packing Checklist' },
                        { id: 'guide_assigned', label: 'Guide & 4x4 Assignment Notice' },
                        { id: 'review', label: 'Post-Safari TripAdvisor Feedback' }
                      ].map(t => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setSelectedTemplateType(t.id as any)}
                          className={`w-full text-left p-3 rounded-xl text-xs font-bold transition-all border ${
                            selectedTemplateType === t.id 
                              ? 'bg-[#DE6826]/20 border-[#DE6826] text-[#F5C478]' 
                              : 'bg-black/30 border-white/5 text-white/70 hover:text-white'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Preview and Send */}
                <div className="lg:col-span-2 p-5 bg-[#16120E] rounded-3xl border border-white/[0.08] space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-white/70">
                        Dispatch Message Preview
                      </span>
                      <span className="text-[11px] text-emerald-400 font-mono">
                        Sending to: {selectedTemplateBooking?.clientPhone}
                      </span>
                    </div>

                    <textarea 
                      rows={12}
                      readOnly
                      value={generatedMessage}
                      className="w-full p-4 rounded-2xl bg-black/50 border border-white/10 text-white/90 text-xs sm:text-sm font-mono outline-none leading-relaxed resize-none"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedMessage);
                        showToast('Message text copied to clipboard!');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold flex items-center gap-1.5 border border-white/10"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy to Clipboard</span>
                    </button>

                    <a
                      href={`https://wa.me/${(selectedTemplateBooking?.clientPhone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(generatedMessage)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Launch WhatsApp Web Dispatch</span>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 8: MEDIA ASSET LIBRARY */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#16120E] p-4 rounded-2xl border border-white/[0.08]">
                <div>
                  <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-amber-400" />
                    <span>High-Resolution Safari Media Library</span>
                  </h3>
                  <p className="text-xs text-white/50">Curated wildlife, lodge, and Kilimanjaro imagery for package builders</p>
                </div>

                <div className="flex gap-2">
                  <select
                    value={mediaFilterCategory}
                    onChange={(e) => setMediaFilterCategory(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none"
                  >
                    <option value="All">All Categories</option>
                    <option value="Wildlife">Wildlife & Migration</option>
                    <option value="Kilimanjaro">Mount Kilimanjaro</option>
                    <option value="Zanzibar">Zanzibar Island</option>
                    <option value="Lodges">Luxury Lodges</option>
                    <option value="Fleet">Expedition Fleet</option>
                  </select>

                  <button
                    onClick={() => setIsAddMediaOpen(true)}
                    className="px-4 py-2 bg-gradient-to-r from-[#DE6826] to-[#C08240] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Image URL</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredMedia.map(m => (
                  <div key={m.id} className="bg-[#16120E] rounded-2xl border border-white/[0.08] overflow-hidden group shadow-md flex flex-col justify-between">
                    <div className="relative h-40 bg-black/50 overflow-hidden">
                      <img 
                        src={m.url} 
                        alt={m.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                      <span className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-white font-bold">
                        {m.category}
                      </span>
                    </div>

                    <div className="p-3">
                      <h4 className="font-bold text-white text-xs truncate" title={m.title}>{m.title}</h4>
                      <p className="text-[10px] text-white/50 mt-0.5">{m.tag}</p>

                      <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(m.url);
                            showToast('Image URL copied to clipboard!');
                          }}
                          className="text-[10px] text-[#F5C478] hover:underline flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy URL</span>
                        </button>

                        <button
                          onClick={() => {
                            tourService.deleteMediaAsset(m.id);
                            setMediaAssets(tourService.getMediaAssets());
                            showToast('Image removed from library.');
                          }}
                          className="text-[10px] text-rose-400 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 9: SITE SECTIONS CONTENT (ALL SECTIONS CRUD) */}
          {activeTab === 'sections' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#16120E] p-4 rounded-2xl border border-white/[0.08]">
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">Website Content & Sections CMS</h3>
                  <p className="text-xs text-white/50">Edit text, hero headlines, story metrics, reviews, and FAQs across the live site</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveSiteContent}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#DE6826] to-[#C08240] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-lg hover:opacity-95"
                  >
                    <Check className="w-4 h-4" />
                    <span>Publish Changes to Live Site</span>
                  </button>
                </div>
              </div>

              {/* Sub-Tabs for Sections */}
              <div className="flex gap-2 border-b border-white/10 pb-2 overflow-x-auto">
                {[
                  { id: 'hero', label: 'Hero Headline' },
                  { id: 'about', label: 'About & Metrics' },
                  { id: 'contact', label: 'Company Contact Info' },
                  { id: 'testimonials', label: `Reviews (${siteContentForm.testimonials?.length || 0})` },
                  { id: 'faqs', label: `FAQs (${siteContentForm.faqs?.length || 0})` }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setSectionTab(sub.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      sectionTab === sub.id 
                        ? 'bg-white/15 text-white border border-white/20' 
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>

              {/* SECTION SUB-TAB 1: HERO */}
              {sectionTab === 'hero' && (
                <div className="p-6 bg-[#16120E] rounded-3xl border border-white/[0.08] space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">Badge Tagline</label>
                      <input 
                        type="text"
                        value={siteContentForm.hero.badge}
                        onChange={(e) => setSiteContentForm({
                          ...siteContentForm,
                          hero: { ...siteContentForm.hero, badge: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm focus:ring-1 focus:ring-[#DE6826] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">Hero Background Image URL</label>
                      <input 
                        type="text"
                        value={siteContentForm.hero.heroImage}
                        onChange={(e) => setSiteContentForm({
                          ...siteContentForm,
                          hero: { ...siteContentForm.hero, heroImage: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm focus:ring-1 focus:ring-[#DE6826] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">Headline Line 1</label>
                      <input 
                        type="text"
                        value={siteContentForm.hero.titleLine1}
                        onChange={(e) => setSiteContentForm({
                          ...siteContentForm,
                          hero: { ...siteContentForm.hero, titleLine1: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm focus:ring-1 focus:ring-[#DE6826] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">Headline Line 2 (Highlighted)</label>
                      <input 
                        type="text"
                        value={siteContentForm.hero.titleLine2}
                        onChange={(e) => setSiteContentForm({
                          ...siteContentForm,
                          hero: { ...siteContentForm.hero, titleLine2: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm focus:ring-1 focus:ring-[#DE6826] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">Hero Subtitle Narrative</label>
                    <textarea 
                      rows={3}
                      value={siteContentForm.hero.subtitle}
                      onChange={(e) => setSiteContentForm({
                        ...siteContentForm,
                        hero: { ...siteContentForm.hero, subtitle: e.target.value }
                      })}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm focus:ring-1 focus:ring-[#DE6826] outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* SECTION SUB-TAB 2: ABOUT */}
              {sectionTab === 'about' && (
                <div className="p-6 bg-[#16120E] rounded-3xl border border-white/[0.08] space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">About Badge</label>
                      <input 
                        type="text"
                        value={siteContentForm.about.badge}
                        onChange={(e) => setSiteContentForm({
                          ...siteContentForm,
                          about: { ...siteContentForm.about, badge: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">Founding Year</label>
                      <input 
                        type="text"
                        value={siteContentForm.about.foundingYear}
                        onChange={(e) => setSiteContentForm({
                          ...siteContentForm,
                          about: { ...siteContentForm.about, foundingYear: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">Story & Heritage Description</label>
                    <textarea 
                      rows={4}
                      value={siteContentForm.about.description}
                      onChange={(e) => setSiteContentForm({
                        ...siteContentForm,
                        about: { ...siteContentForm.about, description: e.target.value }
                      })}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">4 Highlight Milestone Metrics</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {siteContentForm.about.stats.map((stat, idx) => (
                        <div key={stat.id} className="p-3 bg-black/30 rounded-xl border border-white/10 space-y-1.5">
                          <input 
                            type="text"
                            value={stat.val}
                            onChange={(e) => {
                              const newStats = [...siteContentForm.about.stats];
                              newStats[idx].val = e.target.value;
                              setSiteContentForm({
                                ...siteContentForm,
                                about: { ...siteContentForm.about, stats: newStats }
                              });
                            }}
                            className="w-full px-2 py-1 rounded bg-black/40 border border-white/10 text-white text-xs font-bold"
                          />
                          <input 
                            type="text"
                            value={stat.label}
                            onChange={(e) => {
                              const newStats = [...siteContentForm.about.stats];
                              newStats[idx].label = e.target.value;
                              setSiteContentForm({
                                ...siteContentForm,
                                about: { ...siteContentForm.about, stats: newStats }
                              });
                            }}
                            className="w-full px-2 py-1 rounded bg-black/40 border border-white/10 text-white/70 text-[10px]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION SUB-TAB 3: CONTACT */}
              {sectionTab === 'contact' && (
                <div className="p-6 bg-[#16120E] rounded-3xl border border-white/[0.08] space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">Direct Phone</label>
                      <input 
                        type="text"
                        value={siteContentForm.contact.phone}
                        onChange={(e) => setSiteContentForm({
                          ...siteContentForm,
                          contact: { ...siteContentForm.contact, phone: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">Primary Email</label>
                      <input 
                        type="email"
                        value={siteContentForm.contact.email}
                        onChange={(e) => setSiteContentForm({
                          ...siteContentForm,
                          contact: { ...siteContentForm.contact, email: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">WhatsApp Number (e.g. +255753997777)</label>
                      <input 
                        type="text"
                        value={siteContentForm.contact.whatsappNumber}
                        onChange={(e) => setSiteContentForm({
                          ...siteContentForm,
                          contact: { ...siteContentForm.contact, whatsappNumber: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">24/7 Emergency Line</label>
                      <input 
                        type="text"
                        value={siteContentForm.contact.emergencyLine}
                        onChange={(e) => setSiteContentForm({
                          ...siteContentForm,
                          contact: { ...siteContentForm.contact, emergencyLine: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">Office Physical Address</label>
                    <input 
                      type="text"
                      value={siteContentForm.contact.officeAddress}
                      onChange={(e) => setSiteContentForm({
                        ...siteContentForm,
                        contact: { ...siteContentForm.contact, officeAddress: e.target.value }
                      })}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm outline-none"
                    />
                  </div>
                </div>
              )}

              {/* SECTION SUB-TAB 4: TESTIMONIALS (CRUD) */}
              {sectionTab === 'testimonials' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-white/50">Traveler reviews shown on the home page and tour cards</p>
                    <button
                      onClick={() => {
                        setTestimonialForm({
                          id: '',
                          name: '',
                          location: '',
                          text: '',
                          rating: 5,
                          tour: '7-Day Serengeti Migration Luxury',
                          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
                        });
                        setIsTestimonialModalOpen(true);
                      }}
                      className="px-3.5 py-1.5 bg-[#DE6826] text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Guest Review</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {siteContentForm.testimonials.map(t => (
                      <div key={t.id} className="p-4 bg-[#16120E] rounded-2xl border border-white/[0.08] space-y-2 relative flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-xs">{t.name}</span>
                            <span className="text-[10px] text-[#F5C478] font-bold">★ {t.rating}</span>
                          </div>
                          <p className="text-[10px] text-white/50">{t.location} • {t.tour}</p>
                          <p className="text-xs text-white/80 italic mt-2 leading-relaxed">"{t.text}"</p>
                        </div>

                        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                          <button
                            onClick={() => {
                              setTestimonialForm(t as any);
                              setIsTestimonialModalOpen(true);
                            }}
                            className="text-[10px] text-amber-300 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              siteContentService.deleteTestimonial(t.id);
                              setSiteContentForm(siteContentService.getContent());
                              showToast('Review removed.');
                            }}
                            className="text-[10px] text-rose-400 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION SUB-TAB 5: FAQS (CRUD) */}
              {sectionTab === 'faqs' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-white/50">Frequently asked questions shown on contact & tour pages</p>
                    <button
                      onClick={() => {
                        setFaqForm({
                          id: '',
                          question: '',
                          answer: '',
                          category: 'Booking & Timing'
                        });
                        setIsFaqModalOpen(true);
                      }}
                      className="px-3.5 py-1.5 bg-[#DE6826] text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add FAQ Item</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {siteContentForm.faqs.map(faq => (
                      <div key={faq.id} className="p-4 bg-[#16120E] rounded-2xl border border-white/[0.08] flex items-start justify-between gap-4">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-[#DE6826] bg-[#DE6826]/10 px-2 py-0.5 rounded-full">
                              {faq.category || 'General'}
                            </span>
                            <h4 className="font-bold text-white text-xs sm:text-sm">{faq.question}</h4>
                          </div>
                          <p className="text-xs text-white/70 leading-relaxed">{faq.answer}</p>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => {
                              setFaqForm(faq);
                              setIsFaqModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-amber-300"
                            title="Edit FAQ"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              siteContentService.deleteFaq(faq.id);
                              setSiteContentForm(siteContentService.getContent());
                              showToast('FAQ removed.');
                            }}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-950 text-white/40 hover:text-rose-400"
                            title="Delete FAQ"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 10: AUDIT ACTIVITY LOG */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between bg-[#16120E] p-4 rounded-2xl border border-white/[0.08]">
                <div>
                  <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                    <History className="w-5 h-5 text-amber-400" />
                    <span>Real-Time Administrator Activity Audit Log</span>
                  </h3>
                  <p className="text-xs text-white/50">Immutable event stream of all changes, bookings, and operations</p>
                </div>
                <button
                  onClick={() => {
                    setAuditLogs(tourService.getAuditLogs());
                    showToast('Audit log refreshed.');
                  }}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/70 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </button>
              </div>

              <div className="bg-[#16120E] rounded-3xl border border-white/[0.08] overflow-hidden shadow-md">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-black/40 border-b border-white/10 text-white/50 font-semibold">
                      <th className="py-3 px-4">Event ID</th>
                      <th className="py-3 px-4">Action</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Details</th>
                      <th className="py-3 px-4">Actor</th>
                      <th className="py-3 px-4 text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    {auditLogs.map(log => (
                      <tr key={log.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 text-[#F5C478] font-bold">{log.id}</td>
                        <td className="py-3 px-4 font-sans font-bold text-white">{log.action}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                            log.category === 'booking' ? 'bg-emerald-950 text-emerald-300' :
                            log.category === 'tour' ? 'bg-amber-950 text-amber-300' :
                            log.category === 'fleet' ? 'bg-blue-950 text-blue-300' :
                            'bg-gray-800 text-gray-300'
                          }`}>
                            {log.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-sans text-white/80 max-w-xs">{log.details}</td>
                        <td className="py-3 px-4 text-white/60">{log.user}</td>
                        <td className="py-3 px-4 text-right text-white/50">{new Date(log.timestamp).toLocaleTimeString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 11: DATABASE & EXPORT */}
          {activeTab === 'database' && (
            <div className="space-y-6">
              
              <div className="p-6 bg-[#16120E] rounded-3xl border border-white/[0.08] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-white">Database Migration & Backup Architecture</h3>
                    <p className="text-xs text-white/60">Export instant JSON or migrate to Supabase / PostgreSQL schema</p>
                  </div>
                </div>

                <p className="text-xs text-white/80 leading-relaxed">
                  The system currently uses an isolated, event-driven reactive storage architecture (<code className="text-[#F5C478]">tourService.ts</code> and <code className="text-[#F5C478]">siteContentService.ts</code>). Every change is synchronized instantaneously between the public traveler interface and this command center.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={handleExportFullJSON}
                    className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Full System JSON Snapshot</span>
                  </button>

                  <label className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs rounded-xl flex items-center gap-2 border border-white/10 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>Import JSON Backup</span>
                    <input 
                      type="file" 
                      accept=".json"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            try {
                              const data = JSON.parse(event.target?.result as string);
                              if (data.tours) tourService.importToursJSON(JSON.stringify(data.tours));
                              if (data.siteContent) siteContentService.saveContent(data.siteContent);
                              tourService.logAction('System Imported', 'system', 'Imported JSON state backup into localStorage.');
                              setAuditLogs(tourService.getAuditLogs());
                              showToast('System backup imported successfully!');
                            } catch (err) {
                              alert('Invalid JSON file format.');
                            }
                          };
                          reader.readAsText(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* PostgreSQL / Supabase Migration Schema Spec */}
              <div className="p-6 bg-[#16120E] rounded-3xl border border-white/[0.08] space-y-3">
                <span className="text-[10px] uppercase font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800">
                  Ready for Supabase / PostgreSQL Connection
                </span>
                <h4 className="font-serif font-bold text-white text-base">Schema Model Specifications</h4>
                <div className="bg-black/50 p-4 rounded-xl border border-white/10 text-[11px] font-mono text-white/80 overflow-x-auto space-y-2">
                  <p className="text-[#F5C478]">-- 1. Tour Packages Table</p>
                  <p>CREATE TABLE tours (id TEXT PRIMARY KEY, name TEXT, category TEXT, duration TEXT, from_price INT, status TEXT, itinerary JSONB, highlights TEXT[], included TEXT[], not_included TEXT[]);</p>
                  <p className="text-[#F5C478]">-- 2. Live Bookings Table</p>
                  <p>CREATE TABLE bookings (id TEXT PRIMARY KEY, tour_id TEXT, client_name TEXT, client_email TEXT, client_phone TEXT, travel_date DATE, pax INT, total_amount NUMERIC, status TEXT);</p>
                  <p className="text-[#F5C478]">-- 3. Fleet & Guides Tables</p>
                  <p>CREATE TABLE fleet (id TEXT PRIMARY KEY, plate_number TEXT, model TEXT, status TEXT, assigned_guide TEXT);</p>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          MODAL 1: CREATE / EDIT TOUR PACKAGE MODAL
         ───────────────────────────────────────────────────────────────────────────── */}
      {isEditingTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#16120E] rounded-3xl shadow-2xl border border-white/[0.08] overflow-hidden my-6 max-h-[92vh] flex flex-col">
            
            <div className="px-6 py-4 border-b border-white/10 bg-[#1A1410] flex items-center justify-between flex-shrink-0">
              <h3 className="font-serif font-bold text-white text-lg">
                {editingTourId ? `Edit Tour: ${tourForm.name}` : 'Create New Safari Package'}
              </h3>
              <button 
                onClick={() => setIsEditingTour(false)}
                className="text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTour} className="p-6 overflow-y-auto space-y-5 flex-grow text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-white/70 mb-1">Tour Name *</label>
                  <input 
                    type="text"
                    required
                    value={tourForm.name}
                    onChange={(e) => setTourForm({ ...tourForm, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm outline-none focus:ring-1 focus:ring-[#DE6826]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-white/70 mb-1">Unique Tour ID (Slug)</label>
                  <input 
                    type="text"
                    disabled={!!editingTourId}
                    value={tourForm.id}
                    onChange={(e) => setTourForm({ ...tourForm, id: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white/60 text-xs sm:text-sm font-mono outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-white/70 mb-1">Category</label>
                  <select
                    value={tourForm.category}
                    onChange={(e) => setTourForm({ ...tourForm, category: e.target.value as TourCategory })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none"
                  >
                    <option value="Safari">Safari</option>
                    <option value="Trekking">Trekking</option>
                    <option value="Zanzibar">Zanzibar</option>
                    <option value="Day Trips">Day Trips</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-white/70 mb-1">Duration</label>
                  <input 
                    type="text"
                    placeholder="e.g. 7 Days"
                    value={tourForm.duration}
                    onChange={(e) => setTourForm({ ...tourForm, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-white/70 mb-1">Starting Price ($)</label>
                  <input 
                    type="number"
                    value={tourForm.fromPrice}
                    onChange={(e) => setTourForm({ 
                      ...tourForm, 
                      fromPrice: Number(e.target.value),
                      priceRange: `$${Number(e.target.value).toLocaleString()}`
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-white/70 mb-1">Status</label>
                  <select
                    value={tourForm.status || 'active'}
                    onChange={(e) => setTourForm({ ...tourForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-white/70 mb-1">Card Image URL</label>
                  <input 
                    type="text"
                    value={tourForm.image}
                    onChange={(e) => setTourForm({ ...tourForm, image: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-white/70 mb-1">Cover / Banner Image URL</label>
                  <input 
                    type="text"
                    value={tourForm.coverImage}
                    onChange={(e) => setTourForm({ ...tourForm, coverImage: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
              </div>

              {/* Highlights (One per line) */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-white/70 mb-1">Key Highlights (One per line)</label>
                <textarea 
                  rows={3}
                  value={tourForm.highlights?.join('\n') || ''}
                  onChange={(e) => setTourForm({
                    ...tourForm,
                    highlights: e.target.value.split('\n').filter(Boolean)
                  })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none"
                />
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-emerald-400 mb-1">What is Included (One per line)</label>
                  <textarea 
                    rows={4}
                    value={tourForm.included?.join('\n') || ''}
                    onChange={(e) => setTourForm({
                      ...tourForm,
                      included: e.target.value.split('\n').filter(Boolean)
                    })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-rose-400 mb-1">What is Not Included (One per line)</label>
                  <textarea 
                    rows={4}
                    value={tourForm.notIncluded?.join('\n') || ''}
                    onChange={(e) => setTourForm({
                      ...tourForm,
                      notIncluded: e.target.value.split('\n').filter(Boolean)
                    })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
              </div>

              {/* Day-by-Day Itinerary Builder */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <label className="font-bold uppercase tracking-wider text-white/80">Day-by-Day Itinerary Schedule ({tourForm.itinerary?.length || 0} Days)</label>
                  <button
                    type="button"
                    onClick={() => {
                      const nextDay = (tourForm.itinerary?.length || 0) + 1;
                      setTourForm({
                        ...tourForm,
                        itinerary: [
                          ...(tourForm.itinerary || []),
                          {
                            day: nextDay,
                            title: `Day ${nextDay} Safari Expedition`,
                            activities: 'Morning and afternoon game drives with dedicated driver-guide.',
                            accommodation: 'Safari Lodge / Luxury Camp',
                            meals: 'Breakfast, Lunch, Dinner'
                          }
                        ]
                      });
                    }}
                    className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg text-[10px] flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Next Day</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {tourForm.itinerary?.map((item, idx) => (
                    <div key={idx} className="p-3 bg-black/30 rounded-xl border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#F5C478]">Day {item.day}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = tourForm.itinerary?.filter((_, i) => i !== idx);
                            setTourForm({ ...tourForm, itinerary: updated });
                          }}
                          className="text-rose-400 hover:text-rose-300 text-[10px]"
                        >
                          Remove Day
                        </button>
                      </div>

                      <input 
                        type="text"
                        placeholder="Day Title"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...(tourForm.itinerary || [])];
                          updated[idx].title = e.target.value;
                          setTourForm({ ...tourForm, itinerary: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                      />

                      <textarea 
                        rows={2}
                        placeholder="Day activities & wildlife focus"
                        value={item.activities}
                        onChange={(e) => {
                          const updated = [...(tourForm.itinerary || [])];
                          updated[idx].activities = e.target.value;
                          setTourForm({ ...tourForm, itinerary: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditingTour(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#DE6826] to-[#C08240] text-white font-bold rounded-xl text-xs shadow-md"
                >
                  {editingTourId ? 'Save & Update Package' : 'Create Safari Package'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          MODAL 2: MANUAL BOOKING CREATION
         ───────────────────────────────────────────────────────────────────────────── */}
      {isManualBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#16120E] rounded-3xl border border-white/[0.08] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif font-bold text-white text-base">Create Offline / Phone Booking</h3>
              <button onClick={() => setIsManualBookingOpen(false)} className="text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualBooking} className="space-y-3 text-xs">
              <div>
                <label className="block text-white/70 font-bold mb-1">Select Tour</label>
                <select
                  value={manualBookingForm.tourId}
                  onChange={(e) => {
                    const sel = tours.find(t => t.id === e.target.value);
                    setManualBookingForm({
                      ...manualBookingForm,
                      tourId: e.target.value,
                      tourName: sel ? sel.name : manualBookingForm.tourName
                    });
                  }}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
                >
                  {tours.map(t => (
                    <option key={t.id} value={t.id}>{t.name} (${t.fromPrice})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 font-bold mb-1">Client Name *</label>
                  <input 
                    type="text"
                    required
                    value={manualBookingForm.clientName}
                    onChange={(e) => setManualBookingForm({ ...manualBookingForm, clientName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white/70 font-bold mb-1">Client Email *</label>
                  <input 
                    type="email"
                    required
                    value={manualBookingForm.clientEmail}
                    onChange={(e) => setManualBookingForm({ ...manualBookingForm, clientEmail: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 font-bold mb-1">Phone / WhatsApp</label>
                  <input 
                    type="text"
                    value={manualBookingForm.clientPhone}
                    onChange={(e) => setManualBookingForm({ ...manualBookingForm, clientPhone: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white/70 font-bold mb-1">Travel Date</label>
                  <input 
                    type="date"
                    value={manualBookingForm.travelDate}
                    onChange={(e) => setManualBookingForm({ ...manualBookingForm, travelDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 font-bold mb-1">Number of Pax</label>
                  <input 
                    type="number"
                    min={1}
                    value={manualBookingForm.pax}
                    onChange={(e) => setManualBookingForm({ ...manualBookingForm, pax: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white/70 font-bold mb-1">Total Amount (USD)</label>
                  <input 
                    type="number"
                    value={manualBookingForm.totalAmount}
                    onChange={(e) => setManualBookingForm({ ...manualBookingForm, totalAmount: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsManualBookingOpen(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#DE6826] text-white rounded-xl font-bold"
                >
                  Create Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          MODAL 3: VIEW BOOKING DETAILS
         ───────────────────────────────────────────────────────────────────────────── */}
      {selectedBookingForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#16120E] rounded-3xl border border-white/[0.08] p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="font-mono text-[#F5C478] font-bold">{selectedBookingForDetails.id}</span>
                <h3 className="font-serif font-bold text-white text-base mt-0.5">{selectedBookingForDetails.clientName}</h3>
              </div>
              <button onClick={() => setSelectedBookingForDetails(null)} className="text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 bg-black/40 p-4 rounded-xl border border-white/5 text-white/80">
              <div><strong className="text-white">Tour:</strong> {selectedBookingForDetails.tourName}</div>
              <div><strong className="text-white">Email:</strong> {selectedBookingForDetails.clientEmail}</div>
              <div><strong className="text-white">Phone:</strong> {selectedBookingForDetails.clientPhone}</div>
              <div><strong className="text-white">Country:</strong> {selectedBookingForDetails.country}</div>
              <div><strong className="text-white">Travel Date:</strong> {selectedBookingForDetails.travelDate}</div>
              <div><strong className="text-white">Guests:</strong> {selectedBookingForDetails.pax}</div>
              <div><strong className="text-white">Total:</strong> ${selectedBookingForDetails.totalAmount.toLocaleString()}</div>
              <div><strong className="text-white">Guide Assigned:</strong> {selectedBookingForDetails.assignedGuide || 'None'}</div>
              <div><strong className="text-white">Special Requests:</strong> {selectedBookingForDetails.specialRequests || 'None'}</div>
              <div><strong className="text-white">Created At:</strong> {new Date(selectedBookingForDetails.createdAt).toLocaleString()}</div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  const b = selectedBookingForDetails;
                  setSelectedBookingForDetails(null);
                  setSelectedBookingForVoucher(b);
                }}
                className="px-4 py-2 bg-indigo-950 text-indigo-300 rounded-xl font-bold border border-indigo-800 flex items-center gap-1.5"
              >
                <Receipt className="w-3.5 h-3.5" />
                <span>Voucher</span>
              </button>
              <a 
                href={`https://wa.me/${selectedBookingForDetails.clientPhone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-[#25D366] text-white rounded-xl font-bold flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={() => setSelectedBookingForDetails(null)}
                className="px-4 py-2 bg-white/10 text-white rounded-xl font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          MODAL 4: OFFICIAL GUEST SAFARI VOUCHER & INVOICE
         ───────────────────────────────────────────────────────────────────────────── */}
      {selectedBookingForVoucher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white text-gray-900 rounded-3xl shadow-2xl overflow-hidden my-6 p-6 sm:p-8 flex flex-col font-sans">
            
            {/* Header / Brand */}
            <div className="flex justify-between items-start border-b-2 border-gray-900/10 pb-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#DE6826] text-white flex items-center justify-center font-bold">
                  <Compass className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="font-serif font-black text-xl tracking-tight text-gray-900">EMBUAT SAFARIS</h2>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#DE6826]">
                    Licensed Tanzanian Tour Operator • TTB/TANAPA Reg #2025/AR
                  </p>
                  <p className="text-[10px] text-gray-500">Arusha & Moshi, Tanzania • info@embuatsafaris.com</p>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-black uppercase tracking-wider">
                  Confirmed Voucher
                </span>
                <div className="font-mono font-bold text-sm text-gray-900 mt-2">
                  {selectedBookingForVoucher.id}
                </div>
                <div className="text-[10px] text-gray-400">Date: {new Date().toLocaleDateString()}</div>
              </div>
            </div>

            {/* Traveler & Expedition Details */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">Lead Guest</span>
                <strong className="text-sm font-bold text-gray-900">{selectedBookingForVoucher.clientName}</strong>
                <p className="text-gray-600">{selectedBookingForVoucher.clientEmail}</p>
                <p className="text-gray-600">{selectedBookingForVoucher.clientPhone}</p>
                <p className="text-gray-500 font-medium">Origin: {selectedBookingForVoucher.country}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">Expedition Details</span>
                <strong className="text-sm font-bold text-[#DE6826] block">{selectedBookingForVoucher.tourName}</strong>
                <p className="text-gray-700"><strong>Start Date:</strong> {selectedBookingForVoucher.travelDate}</p>
                <p className="text-gray-700"><strong>Group Size:</strong> {selectedBookingForVoucher.pax} Guests (Private 4x4)</p>
                <p className="text-gray-700"><strong>Assigned Guide:</strong> {selectedBookingForVoucher.assignedGuide || 'Josephat Kavishe'}</p>
              </div>
            </div>

            {/* Inclusions Breakdown */}
            <div className="space-y-2 mb-6 text-xs">
              <h4 className="font-bold uppercase tracking-wider text-gray-900 text-[11px] border-b pb-1">
                Guaranteed Inclusions & Permits
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-gray-700">
                <li className="flex items-center gap-1.5">✓ 100% TANAPA / NCAA Park Entrance & Conservation Fees</li>
                <li className="flex items-center gap-1.5">✓ Custom 4x4 Toyota Land Cruiser with 360° Pop-Up Roof</li>
                <li className="flex items-center gap-1.5">✓ AMREF Flying Doctors 30-Day Emergency Evacuation</li>
                <li className="flex items-center gap-1.5">✓ Full Board Lodge / Luxury Tented Camp Catering</li>
              </ul>
            </div>

            {/* Financial Summary */}
            <div className="bg-[#16120E] text-white p-5 rounded-2xl flex justify-between items-center mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold block">
                  Total Expedition Value (USD)
                </span>
                <span className="text-2xl font-black text-white">
                  ${selectedBookingForVoucher.totalAmount.toLocaleString()}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold block">
                  Status: All Taxes & Permits Paid
                </span>
                <span className="text-xs text-white/60">Authorized Signatory: Embuat Operations Desk</span>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="text-[10px] text-gray-500 leading-relaxed border-t pt-4">
              <p><strong>Note for Guide & Airport Desk:</strong> Please meet travelers at the international arrivals terminal with the official company sign. Chilled beverages and wildlife radio communication must be active prior to departure into national park gates.</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6 print:hidden">
              <button
                onClick={() => setSelectedBookingForVoucher(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-6 py-2 bg-[#DE6826] hover:bg-[#c4571c] text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-lg"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save as PDF</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          MODAL 5: ADD MEDIA ASSET MODAL
         ───────────────────────────────────────────────────────────────────────────── */}
      {isAddMediaOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#16120E] rounded-3xl border border-white/[0.08] p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif font-bold text-white text-base">Add Image to Media Library</h3>
              <button onClick={() => setIsAddMediaOpen(false)} className="text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMedia} className="space-y-3">
              <div>
                <label className="block text-white/70 font-bold mb-1">Image Title *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Serengeti Sunrise Acacia Landscape"
                  value={newMediaForm.title}
                  onChange={(e) => setNewMediaForm({ ...newMediaForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-white/70 font-bold mb-1">Category</label>
                <select
                  value={newMediaForm.category}
                  onChange={(e) => setNewMediaForm({ ...newMediaForm, category: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
                >
                  <option value="Wildlife">Wildlife & Migration</option>
                  <option value="Kilimanjaro">Mount Kilimanjaro</option>
                  <option value="Zanzibar">Zanzibar Island</option>
                  <option value="Lodges">Luxury Lodges</option>
                  <option value="Fleet">Expedition Fleet</option>
                </select>
              </div>

              <div>
                <label className="block text-white/70 font-bold mb-1">Direct Image URL *</label>
                <input 
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={newMediaForm.url}
                  onChange={(e) => setNewMediaForm({ ...newMediaForm, url: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-white/70 font-bold mb-1">Context Tag</label>
                <input 
                  type="text"
                  placeholder="e.g. Hero / Migration / Northern Circuit"
                  value={newMediaForm.tag}
                  onChange={(e) => setNewMediaForm({ ...newMediaForm, tag: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddMediaOpen(false)}
                  className="px-4 py-2 bg-white/5 text-white rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#DE6826] text-white rounded-xl font-bold"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          MODAL 6: CREATE DEPARTURE DATE MODAL
         ───────────────────────────────────────────────────────────────────────────── */}
      {isNewDepartureOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#16120E] rounded-3xl border border-white/[0.08] p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif font-bold text-white text-base">Schedule New Group Departure</h3>
              <button onClick={() => setIsNewDepartureOpen(false)} className="text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDeparture} className="space-y-3">
              <div>
                <label className="block text-white/70 font-bold mb-1">Select Tour</label>
                <select
                  value={newDepartureForm.tourId}
                  onChange={(e) => {
                    const sel = tours.find(t => t.id === e.target.value);
                    setNewDepartureForm({
                      ...newDepartureForm,
                      tourId: e.target.value,
                      tourName: sel ? sel.name : newDepartureForm.tourName,
                      category: sel ? sel.category : newDepartureForm.category
                    });
                  }}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
                >
                  {tours.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 font-bold mb-1">Start Date</label>
                  <input 
                    type="date"
                    required
                    value={newDepartureForm.startDate}
                    onChange={(e) => setNewDepartureForm({ ...newDepartureForm, startDate: e.target.value })}
                    className="w-full p-2 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white/70 font-bold mb-1">End Date</label>
                  <input 
                    type="date"
                    required
                    value={newDepartureForm.endDate}
                    onChange={(e) => setNewDepartureForm({ ...newDepartureForm, endDate: e.target.value })}
                    className="w-full p-2 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-white/70 font-bold mb-1">Price / Person ($)</label>
                  <input 
                    type="number"
                    value={newDepartureForm.pricePerPerson}
                    onChange={(e) => setNewDepartureForm({ ...newDepartureForm, pricePerPerson: Number(e.target.value) })}
                    className="w-full p-2 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white/70 font-bold mb-1">Total Seats</label>
                  <input 
                    type="number"
                    value={newDepartureForm.totalSeats}
                    onChange={(e) => setNewDepartureForm({ ...newDepartureForm, totalSeats: Number(e.target.value) })}
                    className="w-full p-2 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white/70 font-bold mb-1">Available Seats</label>
                  <input 
                    type="number"
                    value={newDepartureForm.availableSeats}
                    onChange={(e) => setNewDepartureForm({ ...newDepartureForm, availableSeats: Number(e.target.value) })}
                    className="w-full p-2 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox"
                  id="guaranteed-cb"
                  checked={newDepartureForm.guaranteed}
                  onChange={(e) => setNewDepartureForm({ ...newDepartureForm, guaranteed: e.target.checked })}
                  className="rounded text-[#DE6826] bg-black/40 border-white/20"
                />
                <label htmlFor="guaranteed-cb" className="text-white/80 font-bold cursor-pointer">
                  100% Guaranteed Departure (Will depart regardless of group size)
                </label>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewDepartureOpen(false)}
                  className="px-4 py-2 bg-white/5 text-white rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#DE6826] text-white rounded-xl font-bold"
                >
                  Create Departure
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          MODAL 7: TESTIMONIAL MODAL
         ───────────────────────────────────────────────────────────────────────────── */}
      {isTestimonialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#16120E] rounded-3xl border border-white/[0.08] p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif font-bold text-white text-base">
                {testimonialForm.id ? 'Edit Guest Review' : 'Add Guest Review'}
              </h3>
              <button onClick={() => setIsTestimonialModalOpen(false)} className="text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 font-bold mb-1">Traveler Name *</label>
                  <input 
                    type="text"
                    value={testimonialForm.name}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white/70 font-bold mb-1">Location</label>
                  <input 
                    type="text"
                    placeholder="e.g. London, UK"
                    value={testimonialForm.location}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, location: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 font-bold mb-1">Tour Experienced</label>
                <input 
                  type="text"
                  placeholder="e.g. 7-Day Serengeti Migration Luxury"
                  value={testimonialForm.tour}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, tour: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-white/70 font-bold mb-1">Review Quote</label>
                <textarea 
                  rows={3}
                  value={testimonialForm.text}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-white/70 font-bold mb-1">Star Rating (1 - 5)</label>
                <select
                  value={testimonialForm.rating}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
                >
                  <option value={5}>★★★★★ (5 Stars)</option>
                  <option value={4}>★★★★☆ (4 Stars)</option>
                  <option value={3}>★★★☆☆ (3 Stars)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsTestimonialModalOpen(false)}
                  className="px-4 py-2 bg-white/5 text-white rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (testimonialForm.id) {
                      siteContentService.updateTestimonial(testimonialForm.id, testimonialForm);
                    } else {
                      siteContentService.addTestimonial(testimonialForm);
                    }
                    tourService.logAction('Review Saved', 'cms', `Saved review from ${testimonialForm.name}.`);
                    setSiteContentForm(siteContentService.getContent());
                    setAuditLogs(tourService.getAuditLogs());
                    setIsTestimonialModalOpen(false);
                    showToast('Testimonial saved!');
                  }}
                  className="px-5 py-2 bg-[#DE6826] text-white rounded-xl font-bold"
                >
                  Save Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          MODAL 8: FAQ MODAL
         ───────────────────────────────────────────────────────────────────────────── */}
      {isFaqModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#16120E] rounded-3xl border border-white/[0.08] p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif font-bold text-white text-base">
                {faqForm.id ? 'Edit FAQ Item' : 'Add FAQ Item'}
              </h3>
              <button onClick={() => setIsFaqModalOpen(false)} className="text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-white/70 font-bold mb-1">Category</label>
                <input 
                  type="text"
                  placeholder="e.g. Booking & Timing, Fleet, Policies"
                  value={faqForm.category}
                  onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-white/70 font-bold mb-1">Question *</label>
                <input 
                  type="text"
                  value={faqForm.question}
                  onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-white/70 font-bold mb-1">Detailed Answer *</label>
                <textarea 
                  rows={4}
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white outline-none resize-none"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFaqModalOpen(false)}
                  className="px-4 py-2 bg-white/5 text-white rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (faqForm.id) {
                      siteContentService.updateFaq(faqForm.id, faqForm);
                    } else {
                      siteContentService.addFaq(faqForm);
                    }
                    tourService.logAction('FAQ Item Saved', 'cms', `Updated FAQ "${faqForm.question}".`);
                    setSiteContentForm(siteContentService.getContent());
                    setAuditLogs(tourService.getAuditLogs());
                    setIsFaqModalOpen(false);
                    showToast('FAQ saved!');
                  }}
                  className="px-5 py-2 bg-[#DE6826] text-white rounded-xl font-bold"
                >
                  Save FAQ
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

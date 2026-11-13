import React, { useState, useMemo } from 'react';
import { 
  X, Calendar, Users, CheckCircle, ShieldCheck, Sparkles, 
  Send, MessageCircle, ArrowRight, Check, Globe, Phone, 
  Mail, Award, Printer, Compass, ChevronDown 
} from 'lucide-react';
import { TourPackage, TourBooking } from '../types';
import { tourService } from '../services/tourService';
import { COUNTRIES, CountryData, DEFAULT_COUNTRY } from '../data/countries';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: TourPackage | null;
}

interface AddonOption {
  id: string;
  name: string;
  price: number;
  type: 'per_person' | 'fixed';
  description: string;
  badge?: string;
}

const AVAILABLE_ADDONS: AddonOption[] = [
  {
    id: 'balloon',
    name: 'Serengeti Sunrise Hot Air Balloon Safari',
    price: 550,
    type: 'per_person',
    description: '1-Hour sunrise flight over the savannah followed by a luxury champagne bush breakfast under an acacia.',
    badge: 'Most Popular'
  },
  {
    id: 'flying_doctors',
    name: 'AMREF Flying Doctors 30-Day Air Ambulance',
    price: 50,
    type: 'per_person',
    description: 'Comprehensive 24/7 aero-medical evacuation across Tanzania with specialized medical flight crew.',
    badge: 'Recommended'
  },
  {
    id: 'bush_dinner',
    name: 'Private Wilderness Candlelight Bush Dinner',
    price: 120,
    type: 'fixed',
    description: 'Chef-prepared 4-course banquet under the African star canopy with private campfire and safari lanterns.',
    badge: 'VIP Romance'
  },
  {
    id: 'binocs',
    name: 'Nikon Monarch 10x42 Safari Binocular Pair',
    price: 35,
    type: 'fixed',
    description: 'Pristine high-transmission telephoto optics for crisp predator spotting in dense brush.'
  }
];

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, tour }) => {
  const [step, setStep] = useState<'configure' | 'details' | 'confirmed'>('configure');

  // Form Configuration
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [travelDate, setTravelDate] = useState<string>('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Traveler Details
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<CountryData>(DEFAULT_COUNTRY);
  const [dialCode, setDialCode] = useState<string>(DEFAULT_COUNTRY.dial_code);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [dietaryRequirements, setDietaryRequirements] = useState<string>('Standard');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createdBooking, setCreatedBooking] = useState<TourBooking | null>(null);

  // Sync dial code when country changes
  const handleCountryChange = (countryName: string) => {
    const matched = COUNTRIES.find(c => c.name === countryName);
    if (matched) {
      setSelectedCountry(matched);
      setDialCode(matched.dial_code);
    }
  };

  // Price Calculation Engine
  const pricing = useMemo(() => {
    if (!tour) return { basePricePerAdult: 0, adultTotal: 0, childTotal: 0, addonsTotal: 0, grandTotal: 0, totalPax: 0 };

    const totalPax = adults + children;
    let basePricePerAdult = tour.fromPrice || 1500;

    // Check tiered rates if available
    if (tour.rates && tour.rates.length > 0) {
      if (totalPax === 1) {
        const r1 = tour.rates.find(r => r.pax.toLowerCase().includes('1 person') || r.pax.includes('1'));
        if (r1) basePricePerAdult = r1.price;
      } else if (totalPax >= 2 && totalPax <= 5) {
        const r2 = tour.rates.find(r => r.pax.includes('2-5') || r.pax.includes('2'));
        if (r2) basePricePerAdult = r2.price;
      } else if (totalPax >= 6 && totalPax <= 10) {
        const r6 = tour.rates.find(r => r.pax.includes('6-10') || r.pax.includes('6'));
        if (r6) basePricePerAdult = r6.price;
      } else if (totalPax >= 11) {
        const r11 = tour.rates.find(r => r.pax.includes('11+'));
        if (r11) basePricePerAdult = r11.price;
      }
    }

    const adultTotal = adults * basePricePerAdult;
    // Children receive 35% discount
    const childRate = Math.round(basePricePerAdult * 0.65);
    const childTotal = children * childRate;

    // Addons
    let addonsTotal = 0;
    selectedAddons.forEach(addonId => {
      const option = AVAILABLE_ADDONS.find(a => a.id === addonId);
      if (option) {
        if (option.type === 'per_person') {
          addonsTotal += option.price * totalPax;
        } else {
          addonsTotal += option.price;
        }
      }
    });

    const grandTotal = adultTotal + childTotal + addonsTotal;

    return {
      basePricePerAdult,
      childRate,
      adultTotal,
      childTotal,
      addonsTotal,
      grandTotal,
      totalPax
    };
  }, [tour, adults, children, selectedAddons]);

  if (!isOpen || !tour) return null;

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const fullPhoneNumber = `${dialCode} ${phoneNumber.trim()}`;

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim() || !phoneNumber.trim()) {
      alert('Please fill in your full name, email address, and phone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newBooking = tourService.createBooking({
        tourId: tour.id,
        tourName: tour.name,
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
        clientPhone: fullPhoneNumber,
        country: selectedCountry.name,
        travelDate: travelDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        pax: pricing.totalPax,
        totalAmount: pricing.grandTotal,
        currency: '$',
        status: 'Pending',
        specialRequests: `Adults: ${adults}, Children: ${children}. Dietary: ${dietaryRequirements}. Addons: ${selectedAddons.join(', ') || 'None'}. Requests: ${specialRequests || 'Standard VIP itinerary setup.'}`
      });

      setCreatedBooking(newBooking);
      setStep('confirmed');
    } catch (err) {
      console.error('Booking submission error:', err);
      alert('An error occurred while creating your reservation. Please try again or contact us directly on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setTimeout(() => {
      setStep('configure');
      setCreatedBooking(null);
      setSelectedAddons([]);
      setSpecialRequests('');
    }, 300);
    onClose();
  };

  const handlePrintVoucher = () => {
    window.print();
  };

  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#110D0A] text-[#F5EFEA] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] border border-[#382619] overflow-hidden my-4 sm:my-8 max-h-[94vh] flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ─── LUXURY CONCIERGE TOP HEADER ─── */}
        <div className="px-5 sm:px-7 py-4 border-b border-[#2B1D15] bg-[#16100B] flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-md ring-2 ring-[#D96B27] bg-[#F3EFE4] p-0.5 flex-shrink-0">
              <img
                src="/embuat-safaris-logo.jpg?v=2"
                alt="Embuat Safaris"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/embuat-safaris-logo.jpg?v=2';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-[0.2em] text-[#D96B27]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                <span>Embuat Safaris • Executive Concierge</span>
              </div>
              <h2 className="text-sm sm:text-base font-serif font-bold text-white tracking-tight">
                {step === 'confirmed' ? 'Official Safari Reservation Voucher' : 'Tailor-Made Safari Booking & Instant Quote'}
              </h2>
            </div>
          </div>

          <button 
            type="button"
            onClick={handleModalClose}
            className="w-8 h-8 rounded-xl bg-black/40 hover:bg-white/10 text-stone-400 hover:text-white flex items-center justify-center border border-white/5 transition-colors flex-shrink-0"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ─── PROGRESS STEPPER ─── */}
        {step !== 'confirmed' && (
          <div className="px-5 sm:px-7 py-2.5 bg-[#0D0A08] border-b border-[#241710] flex items-center justify-between text-xs flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                step === 'configure' ? 'bg-[#D96B27] text-white shadow-md' : 'bg-emerald-600 text-white'
              }`}>
                {step === 'details' ? <Check className="w-3 h-3" /> : '1'}
              </span>
              <span className={`font-semibold ${step === 'configure' ? 'text-white' : 'text-stone-400'}`}>
                1. Dates &amp; Guests
              </span>
            </div>

            <div className="w-8 sm:w-16 h-px bg-white/10" />

            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                step === 'details' ? 'bg-[#D96B27] text-white shadow-md' : 'bg-white/10 text-stone-400'
              }`}>
                2
              </span>
              <span className={`font-semibold ${step === 'details' ? 'text-white' : 'text-stone-500'}`}>
                2. Traveler &amp; Phone
              </span>
            </div>

            <div className="w-8 sm:w-16 h-px bg-white/10" />

            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center bg-white/10 text-stone-500">
                3
              </span>
              <span className="font-semibold text-stone-500 hidden sm:inline">
                3. Confirmation
              </span>
            </div>
          </div>
        )}

        {/* ─── MODAL CONTENT BODY ─── */}
        <div className="overflow-y-auto p-4 sm:p-7 flex-grow space-y-6">
          
          {/* PACKAGE HERO SUMMARY CARD */}
          <div className="relative rounded-2xl overflow-hidden border border-[#3A281C] bg-gradient-to-r from-[#1A130E] to-[#120D09] p-3.5 sm:p-4 shadow-lg flex items-center gap-4">
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 shadow-md border border-white/10 bg-black">
              <img 
                src={tour.coverImage || tour.image || 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/34/f5/09/a0/one-of-the-most-iconic.jpg?w=1200&h=800&s=1'} 
                alt={tour.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/LION-IN-NGORONGORO-1-1.jpeg';
                }}
              />
              <span className="absolute bottom-1 left-1 bg-black/75 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-bold uppercase text-[#F5C478] border border-white/10">
                {tour.duration}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-[#D96B27]/20 text-[#F5C478] border border-[#D96B27]/30">
                  {tour.category}
                </span>
                {tour.badge && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                    {tour.badge}
                  </span>
                )}
              </div>
              <h3 className="font-serif font-bold text-white text-base sm:text-xl leading-snug line-clamp-2">
                {tour.name}
              </h3>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-stone-400">
                <span className="inline-flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Private Custom 4×4 Cruiser</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[#F5C478]">
                  <Award className="w-3.5 h-3.5" />
                  <span>Licensed Naturalist Guide</span>
                </span>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              STEP 1: EXPEDITION DATES, TRAVELERS & UPGRADES
             ═══════════════════════════════════════════════════════════════ */}
          {step === 'configure' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Dates & Guests Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Desired Travel Date */}
                <div className="p-4 rounded-2xl bg-[#15100C] border border-[#2B1D15] space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#D96B27]" />
                    <span>Desired Departure Date *</span>
                  </label>
                  <input 
                    type="date"
                    min={tomorrowStr}
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-black/60 text-white text-xs sm:text-sm focus:border-[#D96B27] outline-none"
                  />
                  <p className="text-[11px] text-stone-400 leading-tight">
                    Flexible dates can be adjusted with our director before park permits are locked.
                  </p>
                </div>

                {/* Number of Guests */}
                <div className="p-4 rounded-2xl bg-[#15100C] border border-[#2B1D15] space-y-2.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#D96B27]" />
                    <span>Number of Travelers</span>
                  </label>

                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Adults */}
                    <div className="p-2.5 rounded-xl bg-black/50 border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">Adults</div>
                        <div className="text-[10px] text-stone-400">12+ years</div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button 
                          type="button" 
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-6 h-6 rounded-lg bg-white/10 font-bold text-xs flex items-center justify-center hover:bg-[#D96B27] hover:text-white transition-colors"
                        >–</button>
                        <span className="font-bold text-sm w-4 text-center text-white">{adults}</span>
                        <button 
                          type="button" 
                          onClick={() => setAdults(Math.min(16, adults + 1))}
                          className="w-6 h-6 rounded-lg bg-white/10 font-bold text-xs flex items-center justify-center hover:bg-[#D96B27] hover:text-white transition-colors"
                        >+</button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="p-2.5 rounded-xl bg-black/50 border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">Children</div>
                        <div className="text-[10px] text-[#F5C478] font-semibold">–35% Off</div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button 
                          type="button" 
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="w-6 h-6 rounded-lg bg-white/10 font-bold text-xs flex items-center justify-center hover:bg-[#D96B27] hover:text-white transition-colors"
                        >–</button>
                        <span className="font-bold text-sm w-4 text-center text-white">{children}</span>
                        <button 
                          type="button" 
                          onClick={() => setChildren(Math.min(10, children + 1))}
                          className="w-6 h-6 rounded-lg bg-white/10 font-bold text-xs flex items-center justify-center hover:bg-[#D96B27] hover:text-white transition-colors"
                        >+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional Upgrades */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D96B27]" />
                    <span>Curated Expedition Upgrades</span>
                  </span>
                  <span className="text-[11px] text-[#F5C478]">Optional VIP Enhancements</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {AVAILABLE_ADDONS.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <div 
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start gap-3 select-none ${
                          isSelected 
                            ? 'bg-[#2A180E] border-[#D96B27] shadow-lg shadow-[#D96B27]/10' 
                            : 'bg-[#15100C] border-white/5 hover:border-white/15'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0 transition-colors ${
                          isSelected ? 'bg-[#D96B27] text-white' : 'border border-white/20 bg-black/40'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-xs font-bold text-white line-clamp-1">{addon.name}</span>
                            <span className="text-xs font-mono font-bold text-[#F5C478] whitespace-nowrap">
                              +${addon.price} {addon.type === 'per_person' ? '/pax' : ''}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
                            {addon.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Live Quotation Summary Bar */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#1C140E] to-[#120E0A] border border-[#3E291C] shadow-xl space-y-3">
                <div className="text-xs space-y-1.5 border-b border-white/10 pb-3 text-stone-300">
                  <div className="flex justify-between">
                    <span>Adult Travelers ({adults} × ${pricing.basePricePerAdult}):</span>
                    <span className="font-bold text-white">${pricing.adultTotal.toLocaleString()}</span>
                  </div>
                  {children > 0 && (
                    <div className="flex justify-between text-[#F5C478]">
                      <span>Children with 35% Discount ({children} × ${pricing.childRate}):</span>
                      <span className="font-bold">${pricing.childTotal.toLocaleString()}</span>
                    </div>
                  )}
                  {pricing.addonsTotal > 0 && (
                    <div className="flex justify-between text-[#F5C478]">
                      <span>Selected Upgrades ({selectedAddons.length}):</span>
                      <span className="font-bold">+${pricing.addonsTotal.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 block font-semibold">
                      Total Guaranteed Quote:
                    </span>
                    <div className="text-2xl sm:text-3xl font-serif font-black text-[#D96B27]">
                      ${pricing.grandTotal.toLocaleString()}{' '}
                      <span className="text-xs font-sans text-stone-400 font-normal">USD ({pricing.totalPax} Guests)</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D96B27] to-[#B84E14] hover:opacity-95 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#D96B27]/30 flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <span>Proceed to Traveler Info</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              STEP 2: LEAD TRAVELER DETAILS (WITH COUNTRY & PHONE DROPDOWNS)
             ═══════════════════════════════════════════════════════════════ */}
          {step === 'details' && (
            <form onSubmit={handleSubmitBooking} className="space-y-5 animate-in fade-in duration-200">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D96B27] flex items-center gap-1.5">
                  <Compass className="w-4 h-4" />
                  <span>Lead Traveler &amp; Contact Credentials</span>
                </span>
                <button
                  type="button"
                  onClick={() => setStep('configure')}
                  className="text-xs text-stone-400 hover:text-white underline"
                >
                  ← Modify Dates &amp; Guests
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 1. Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300">
                    Lead Traveler Full Name *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Dr. Alexander Wright"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-stone-500 text-xs sm:text-sm outline-none focus:border-[#D96B27]"
                  />
                </div>

                {/* 2. Email Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#D96B27]" />
                    <span>Email Address (For Voucher &amp; Itinerary) *</span>
                  </label>
                  <input 
                    type="email"
                    required
                    placeholder="alexander@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-stone-500 text-xs sm:text-sm outline-none focus:border-[#D96B27]"
                  />
                </div>

                {/* 3. Country of Residence Dropdown */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#D96B27]" />
                    <span>Country of Residence *</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCountry.name}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs sm:text-sm outline-none focus:border-[#D96B27] cursor-pointer pr-10"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.name} className="bg-[#140E0A] text-white py-1">
                          {c.flag} {c.name} ({c.dial_code})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 4. Phone Number with Country Code Dropdown */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#D96B27]" />
                    <span>Phone / WhatsApp Number *</span>
                  </label>
                  
                  {/* Integrated Dial Code Dropdown + Subscriber Number Input */}
                  <div className="flex gap-2">
                    <div className="relative w-[130px] sm:w-[145px] flex-shrink-0">
                      <select
                        value={dialCode}
                        onChange={(e) => setDialCode(e.target.value)}
                        className="w-full appearance-none pl-3 pr-7 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs sm:text-sm outline-none focus:border-[#D96B27] cursor-pointer"
                        title="Select Country Calling Code"
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c.code} value={c.dial_code} className="bg-[#140E0A] text-white">
                            {c.flag} {c.dial_code} ({c.name})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <input 
                      type="tel"
                      required
                      placeholder="e.g. 747 253 975"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-stone-500 text-xs sm:text-sm outline-none focus:border-[#D96B27]"
                    />
                  </div>
                </div>

              </div>

              {/* Dietary & Expedition Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300">
                    Dietary Requirements &amp; Meal Preferences
                  </label>
                  <select
                    value={dietaryRequirements}
                    onChange={(e) => setDietaryRequirements(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs sm:text-sm outline-none focus:border-[#D96B27] cursor-pointer"
                  >
                    <option value="Standard" className="bg-[#140E0A]">Standard Chef Gourmet Menu</option>
                    <option value="Vegetarian" className="bg-[#140E0A]">Strict Vegetarian</option>
                    <option value="Vegan" className="bg-[#140E0A]">Plant-Based / Vegan</option>
                    <option value="Gluten-Free" className="bg-[#140E0A]">Gluten-Free / Celiac</option>
                    <option value="Halal" className="bg-[#140E0A]">Strict Halal Meals</option>
                    <option value="Kosher-Friendly" className="bg-[#140E0A]">Kosher-Friendly</option>
                    <option value="Nut-Allergy" className="bg-[#140E0A]">Severe Nut Allergy</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300">
                    Celebration or Custom Requests
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Honeymoon, 50th Birthday, photographer needs..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-stone-500 text-xs sm:text-sm outline-none focus:border-[#D96B27]"
                  />
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="p-4 rounded-2xl bg-[#16110D] border border-[#2E2016] flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Zero Upfront Charge Today</div>
                    <div className="text-[11px] text-stone-400">
                      Our safari director verifies live park gate permits &amp; luxury lodge rooms before payment request.
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-[10px] uppercase text-stone-400">Quote:</div>
                  <div className="text-lg font-bold text-[#D96B27]">${pricing.grandTotal.toLocaleString()} USD</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep('configure')}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-stone-300 hover:text-white text-xs font-semibold"
                >
                  ← Back to Options
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#D96B27] to-[#B84E14] hover:opacity-95 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#D96B27]/30 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Reservation...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Confirm &amp; Issue Safari Voucher</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              STEP 3: OFFICIAL EXPEDITION VOUCHER (PRINTABLE / SHAREABLE)
             ═══════════════════════════════════════════════════════════════ */}
          {step === 'confirmed' && createdBooking && (
            <div className="space-y-6 text-center animate-in fade-in duration-300">
              
              {/* Success Badge */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald-950/70 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#D96B27]">
                  Reservation Confirmed
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-black text-white mt-1">
                  Karibu Sana, {createdBooking.clientName}!
                </h3>
                <p className="text-xs text-stone-400 max-w-md mx-auto mt-1">
                  Your provisional booking for <strong>{createdBooking.tourName}</strong> is logged in our operations directory.
                </p>
              </div>

              {/* Official Voucher Card */}
              <div className="relative max-w-xl mx-auto rounded-3xl overflow-hidden border-2 border-[#D96B27]/40 bg-[#16100B] shadow-2xl p-5 sm:p-7 text-left space-y-4">
                
                {/* Voucher Header with Watermark & Logo */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#D96B27] bg-[#F3EFE4] p-0.5 flex-shrink-0">
                      <img src="/embuat-safaris-logo.jpg?v=2" alt="Embuat Safaris" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div className="font-serif font-bold text-white text-sm">EMBUAT SAFARIS LIMITED</div>
                      <div className="text-[10px] text-stone-400 uppercase tracking-wider">Arusha HQ • TANAPA Certified</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Voucher Reference</span>
                    <span className="text-sm font-mono font-extrabold text-[#F5C478] tracking-wider">
                      {createdBooking.id}
                    </span>
                  </div>
                </div>

                {/* Voucher Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Lead Traveler</span>
                    <span className="font-bold text-white truncate block">{createdBooking.clientName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Travel Date</span>
                    <span className="font-bold text-[#F5C478]">{createdBooking.travelDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Expedition Pax</span>
                    <span className="font-bold text-white">{createdBooking.pax} Guests</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Country</span>
                    <span className="font-bold text-white">{createdBooking.country || selectedCountry.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Contact Phone</span>
                    <span className="font-mono text-stone-200">{createdBooking.clientPhone}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Total Package Quote</span>
                    <span className="font-bold text-[#D96B27] text-sm">${createdBooking.totalAmount.toLocaleString()} USD</span>
                  </div>
                </div>

                {/* Tour Name & Status Banner */}
                <div className="p-3 rounded-xl bg-black/50 border border-white/5 flex items-center justify-between text-xs">
                  <div className="min-w-0 pr-2">
                    <div className="text-[10px] text-stone-400 uppercase">Selected Itinerary</div>
                    <div className="font-serif font-bold text-white truncate">{createdBooking.tourName}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 whitespace-nowrap">
                    Status: Directing to Concierge
                  </span>
                </div>

                {/* Concierge Guarantee */}
                <div className="text-[11px] text-stone-400 flex items-center gap-2 pt-1 border-t border-white/5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>A safari director will review lodge availability and message you within 2 hours with formal confirmation.</span>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto pt-2">
                <a
                  href={`https://wa.me/255785341091?text=Hello%20Embuat%20Safaris%2C%20I%20just%20submitted%20booking%20voucher%20${createdBooking.id}%20for%20${encodeURIComponent(createdBooking.tourName)}%20(${createdBooking.pax}%20pax%20on%20${createdBooking.travelDate}).%20Please%20confirm%20our%20expedition!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp Confirmation</span>
                </a>

                <button
                  type="button"
                  onClick={handlePrintVoucher}
                  className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/10 transition-colors"
                >
                  <Printer className="w-4 h-4 text-[#F5C478]" />
                  <span>Print Voucher</span>
                </button>

                <button
                  type="button"
                  onClick={handleModalClose}
                  className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#D96B27] to-[#B84E14] text-white font-bold text-xs sm:text-sm transition-all"
                >
                  Done
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default BookingModal;

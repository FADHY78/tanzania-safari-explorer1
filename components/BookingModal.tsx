import React, { useState, useMemo } from 'react';
import { X, Calendar, Users, CheckCircle, ShieldCheck, Sparkles, Send, MessageCircle, ArrowRight, Plane, Info, Check } from 'lucide-react';
import { TourPackage, TourBooking } from '../types';
import { tourService } from '../services/tourService';

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
}

const AVAILABLE_ADDONS: AddonOption[] = [
  {
    id: 'balloon',
    name: 'Serengeti Sunrise Hot Air Balloon Safari',
    price: 550,
    type: 'per_person',
    description: '1-Hour sunrise flight over the savannah followed by a luxury champagne bush breakfast under an acacia.'
  },
  {
    id: 'flying_doctors',
    name: 'AMREF Flying Doctors 30-Day Air Ambulance',
    price: 50,
    type: 'per_person',
    description: 'Comprehensive 24/7 aero-medical evacuation across Tanzania with specialized medical air-crew.'
  },
  {
    id: 'bush_dinner',
    name: 'Private Wilderness Candlelight Bush Dinner',
    price: 120,
    type: 'fixed',
    description: 'Chef-prepared 4-course banquet under the African star canopy with private campfire and safari lanterns.'
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

  // Form State
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [travelDate, setTravelDate] = useState<string>('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Client Details
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [country, setCountry] = useState<string>('United States');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createdBooking, setCreatedBooking] = useState<TourBooking | null>(null);

  // Price Calculation Engine
  const pricing = useMemo(() => {
    if (!tour) return { basePricePerAdult: 0, adultTotal: 0, childTotal: 0, addonsTotal: 0, grandTotal: 0 };

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

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) {
      alert('Please fill in your name, email, and phone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newBooking = tourService.createBooking({
        tourId: tour.id,
        tourName: tour.name,
        clientName,
        clientEmail,
        clientPhone,
        country,
        travelDate: travelDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        pax: pricing.totalPax,
        totalAmount: pricing.grandTotal,
        currency: '$',
        status: 'Pending',
        specialRequests: `Adults: ${adults}, Children: ${children}. Addons: ${selectedAddons.join(', ') || 'None'}. Requests: ${specialRequests || 'Standard package setup.'}`
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
    // Reset state after close
    setTimeout(() => {
      setStep('configure');
      setCreatedBooking(null);
      setSelectedAddons([]);
      setSpecialRequests('');
    }, 300);
    onClose();
  };

  // Tomorrow's date for minimum travel date
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-[#16120E] rounded-3xl shadow-2xl border border-amber-900/10 dark:border-[#2C241E] overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-[#241D17] bg-[#FAF7F2] dark:bg-[#1A1512] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DE6826] animate-pulse"></span>
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#DE6826] dark:text-[#F5C478]">
              {step === 'confirmed' ? 'Reservation Confirmed' : 'Instant Safari Reservation & Quote'}
            </span>
          </div>
          <button 
            onClick={handleModalClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-200/60 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-6 flex-grow space-y-6">
          
          {/* Tour Summary Banner */}
          <div className="flex items-center gap-4 p-3.5 bg-gradient-to-r from-amber-50 to-orange-50/50 dark:from-white/5 dark:to-white/[0.02] rounded-2xl border border-amber-200/60 dark:border-white/10">
            <img 
              src={tour.image || tour.coverImage} 
              alt={tour.name} 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover flex-shrink-0 shadow-sm"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=300&q=80';
              }}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-[11px] font-bold text-[#DE6826] dark:text-[#F5C478] uppercase tracking-wider mb-0.5">
                <span>{tour.category}</span>
                <span>•</span>
                <span>{tour.duration}</span>
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-gray-900 dark:text-white truncate">
                {tour.name}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>100% Guaranteed Park Permits & Private 4x4 Land Cruiser</span>
              </p>
            </div>
          </div>

          {/* STEP 1: CONFIGURE DATES & GUESTS & ADDONS */}
          {step === 'configure' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Date & Guests Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Desired Start Date */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#DE6826]" /> Desired Start Date
                  </label>
                  <input 
                    type="date"
                    min={tomorrowStr}
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-[#2C241E] bg-white dark:bg-[#1B1613] text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-[#DE6826] outline-none"
                  />
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Flexible dates can be changed anytime before permit issuance.</p>
                </div>

                {/* Pax Counters */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#DE6826]" /> Number of Guests
                  </label>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {/* Adults */}
                    <div className="p-2.5 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-gray-900 dark:text-white">Adults</div>
                        <div className="text-[10px] text-gray-500 dark:text-gray-400">12+ yrs</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          type="button" 
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-6 h-6 rounded-lg bg-gray-200 dark:bg-white/10 font-bold text-sm flex items-center justify-center hover:bg-[#DE6826] hover:text-white transition-colors"
                        >-</button>
                        <span className="font-bold text-sm w-4 text-center">{adults}</span>
                        <button 
                          type="button" 
                          onClick={() => setAdults(Math.min(16, adults + 1))}
                          className="w-6 h-6 rounded-lg bg-gray-200 dark:bg-white/10 font-bold text-sm flex items-center justify-center hover:bg-[#DE6826] hover:text-white transition-colors"
                        >+</button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="p-2.5 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-gray-900 dark:text-white">Children</div>
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">-35% Off</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          type="button" 
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="w-6 h-6 rounded-lg bg-gray-200 dark:bg-white/10 font-bold text-sm flex items-center justify-center hover:bg-[#DE6826] hover:text-white transition-colors"
                        >-</button>
                        <span className="font-bold text-sm w-4 text-center">{children}</span>
                        <button 
                          type="button" 
                          onClick={() => setChildren(Math.min(10, children + 1))}
                          className="w-6 h-6 rounded-lg bg-gray-200 dark:bg-white/10 font-bold text-sm flex items-center justify-center hover:bg-[#DE6826] hover:text-white transition-colors"
                        >+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional Signature Add-ons */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#DE6826]" /> Signature Safari Upgrades (Optional)
                  </label>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">Click to add/remove</span>
                </div>

                <div className="space-y-2">
                  {AVAILABLE_ADDONS.map(addon => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected 
                            ? 'bg-amber-50/80 dark:bg-[#DE6826]/15 border-[#DE6826] shadow-sm' 
                            : 'bg-white dark:bg-[#1B1613] border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected ? 'bg-[#DE6826] text-white' : 'border border-gray-300 dark:border-white/20'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">{addon.name}</span>
                            <span className="text-xs font-extrabold text-[#DE6826] dark:text-[#F5C478] whitespace-nowrap">
                              +${addon.price} {addon.type === 'per_person' ? '/ person' : ''}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5 leading-relaxed">
                            {addon.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Instant Price Breakdown Card */}
              <div className="p-4 bg-gradient-to-br from-gray-900 to-[#1F1915] text-white rounded-2xl shadow-lg border border-amber-500/20">
                <div className="text-xs text-amber-300/90 font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Transparent Price Calculation</span>
                  <span className="bg-amber-500/20 text-[#F5C478] px-2 py-0.5 rounded-full text-[10px]">All Taxes & Park Fees Included</span>
                </div>
                
                <div className="space-y-1.5 text-xs text-white/80 border-b border-white/10 pb-3">
                  <div className="flex justify-between">
                    <span>Adults ({adults} × ${pricing.basePricePerAdult}):</span>
                    <span className="font-semibold text-white">${pricing.adultTotal.toLocaleString()}</span>
                  </div>
                  {children > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Children ({children} × ${pricing.childRate}):</span>
                      <span className="font-semibold">${pricing.childTotal.toLocaleString()}</span>
                    </div>
                  )}
                  {pricing.addonsTotal > 0 && (
                    <div className="flex justify-between text-[#F5C478]">
                      <span>Selected Upgrades ({selectedAddons.length}):</span>
                      <span className="font-semibold">+${pricing.addonsTotal.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-baseline justify-between pt-3">
                  <div>
                    <span className="text-xs text-white/60">Estimated Total (USD):</span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#F5C478]">
                      ${pricing.grandTotal.toLocaleString()}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#DE6826] to-[#C08240] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <span>Proceed to Guest Info</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: TRAVELER DETAILS */}
          {step === 'details' && (
            <form onSubmit={handleSubmitBooking} className="space-y-4 animate-fadeIn">
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center justify-between">
                <span>Primary Traveler Contact Information</span>
                <button
                  type="button"
                  onClick={() => setStep('configure')}
                  className="text-[#DE6826] hover:underline normal-case text-xs font-semibold"
                >
                  ← Edit Guests / Addons
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Full Name *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Dr. Alexander Wright"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-[#2C241E] bg-white dark:bg-[#1B1613] text-gray-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-[#DE6826] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Email Address *
                  </label>
                  <input 
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-[#2C241E] bg-white dark:bg-[#1B1613] text-gray-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-[#DE6826] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input 
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-[#2C241E] bg-white dark:bg-[#1B1613] text-gray-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-[#DE6826] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Country of Residence
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. United Kingdom, USA, Germany"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-[#2C241E] bg-white dark:bg-[#1B1613] text-gray-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-[#DE6826] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Special Requests, Dietary Requirements or Rooming Preferences
                </label>
                <textarea 
                  rows={2}
                  placeholder="e.g., Honeymoon bed setup, vegetarian meals, airport transfer flight details, photography focus..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-[#2C241E] bg-white dark:bg-[#1B1613] text-gray-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-[#DE6826] outline-none resize-none"
                />
              </div>

              {/* Final Review & Submission */}
              <div className="p-3.5 bg-amber-50 dark:bg-white/5 rounded-2xl border border-amber-200 dark:border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Total Booking Quote:</span>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">${pricing.grandTotal.toLocaleString()} USD ({pricing.totalPax} Guests)</div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep('configure')}
                    className="px-3.5 py-2 rounded-xl border border-gray-300 dark:border-white/20 text-xs font-bold text-gray-700 dark:text-gray-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#DE6826] to-[#C08240] text-white font-bold text-xs sm:text-sm shadow-md hover:opacity-95 transition-all flex items-center gap-1.5"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Confirm Reservation</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-gray-500 dark:text-gray-400 text-center">
                🔒 No credit card charged today. A safari director will review lodge availability and contact you within 2 hours with formal confirmation.
              </p>
            </form>
          )}

          {/* STEP 3: CONFIRMATION & REFERENCE */}
          {step === 'confirmed' && createdBooking && (
            <div className="text-center py-6 space-y-5 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  Safari Booking Received!
                </span>
                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-1">
                  Karibu Sana, {createdBooking.clientName}!
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto mt-2">
                  Your provisional booking for <strong>{createdBooking.tourName}</strong> has been logged in our operations system.
                </p>
              </div>

              {/* Reference Card */}
              <div className="max-w-md mx-auto p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 text-xs space-y-2 text-left">
                <div className="flex justify-between border-b border-gray-200 dark:border-white/10 pb-1.5">
                  <span className="text-gray-500 dark:text-gray-400">Booking Reference:</span>
                  <span className="font-mono font-extrabold text-[#DE6826] dark:text-[#F5C478] text-sm">{createdBooking.id}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 dark:border-white/10 pb-1.5">
                  <span className="text-gray-500 dark:text-gray-400">Travel Date:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{createdBooking.travelDate}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 dark:border-white/10 pb-1.5">
                  <span className="text-gray-500 dark:text-gray-400">Guests:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{createdBooking.pax} Travelers</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Total Amount:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">${createdBooking.totalAmount.toLocaleString()} USD</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
                <a
                  href={`https://wa.me/255753997777?text=Hello%20Embuat%20Safaris%2C%20I%20just%20submitted%20booking%20${createdBooking.id}%20for%20${encodeURIComponent(createdBooking.tourName)}.%20Please%20confirm%20availability!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-[#25D366] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-lg shadow-emerald-500/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
                
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="py-3 px-6 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-800 dark:text-white rounded-xl font-bold text-xs sm:text-sm transition-colors"
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

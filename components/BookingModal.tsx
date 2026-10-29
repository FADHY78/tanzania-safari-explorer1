import React, { useState, useMemo } from 'react';
import { X, Calendar, Users, CheckCircle, ShieldCheck, Sparkles, Send, MessageCircle, ArrowRight, Check } from 'lucide-react';
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
    setTimeout(() => {
      setStep('configure');
      setCreatedBooking(null);
      setSelectedAddons([]);
      setSpecialRequests('');
    }, 300);
    onClose();
  };

  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-[#0A0A0A] rounded-3xl shadow-2xl border border-black/15 dark:border-white/15 overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-[#121212] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] animate-pulse"></span>
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#F97316]">
              {step === 'confirmed' ? 'Reservation Confirmed' : 'Instant Safari Reservation & Quote'}
            </span>
          </div>
          <button 
            onClick={handleModalClose}
            className="p-1.5 rounded-full text-neutral-500 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-6 flex-grow space-y-6">
          
          {/* Tour Summary Banner */}
          <div className="flex items-center gap-4 p-3.5 bg-neutral-50 dark:bg-[#121212] rounded-2xl border border-[#F97316]/30">
            <img 
              src={tour.image || tour.coverImage} 
              alt={tour.name} 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover flex-shrink-0 shadow-sm"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=300&q=80';
              }}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-[11px] font-bold text-[#F97316] uppercase tracking-wider mb-0.5">
                <span>{tour.category}</span>
                <span>•</span>
                <span>{tour.duration}</span>
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-black dark:text-white truncate">
                {tour.name}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0" />
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-black dark:text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#F97316]" /> Desired Start Date
                  </label>
                  <input 
                    type="date"
                    min={tomorrowStr}
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/20 dark:border-white/15 bg-white dark:bg-[#121212] text-black dark:text-white text-sm focus:ring-2 focus:ring-[#F97316] outline-none"
                  />
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">Flexible dates can be changed anytime before permit issuance.</p>
                </div>

                {/* Pax Counters */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-black dark:text-neutral-300 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#F97316]" /> Number of Guests
                  </label>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {/* Adults */}
                    <div className="p-2.5 bg-neutral-50 dark:bg-[#121212] rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-black dark:text-white">Adults</div>
                        <div className="text-[10px] text-neutral-500 dark:text-neutral-400">12+ yrs</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          type="button" 
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-6 h-6 rounded-lg bg-black/10 dark:bg-white/10 font-bold text-sm flex items-center justify-center hover:bg-[#F97316] hover:text-white transition-colors"
                        >-</button>
                        <span className="font-bold text-sm w-4 text-center">{adults}</span>
                        <button 
                          type="button" 
                          onClick={() => setAdults(Math.min(16, adults + 1))}
                          className="w-6 h-6 rounded-lg bg-black/10 dark:bg-white/10 font-bold text-sm flex items-center justify-center hover:bg-[#F97316] hover:text-white transition-colors"
                        >+</button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="p-2.5 bg-neutral-50 dark:bg-[#121212] rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-black dark:text-white">Children</div>
                        <div className="text-[10px] text-[#F97316] font-semibold">-35% Off</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          type="button" 
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="w-6 h-6 rounded-lg bg-black/10 dark:bg-white/10 font-bold text-sm flex items-center justify-center hover:bg-[#F97316] hover:text-white transition-colors"
                        >-</button>
                        <span className="font-bold text-sm w-4 text-center">{children}</span>
                        <button 
                          type="button" 
                          onClick={() => setChildren(Math.min(10, children + 1))}
                          className="w-6 h-6 rounded-lg bg-black/10 dark:bg-white/10 font-bold text-sm flex items-center justify-center hover:bg-[#F97316] hover:text-white transition-colors"
                        >+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional Signature Add-ons */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-black dark:text-neutral-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#F97316]" /> Signature Safari Upgrades (Optional)
                  </label>
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400">Click to add/remove</span>
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
                            ? 'bg-[#F97316]/10 border-[#F97316] shadow-sm' 
                            : 'bg-white dark:bg-[#121212] border-black/10 dark:border-white/10 hover:border-[#F97316]/50'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected ? 'bg-[#F97316] text-white' : 'border border-black/25 dark:border-white/20'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs sm:text-sm font-bold text-black dark:text-white">{addon.name}</span>
                            <span className="text-xs font-extrabold text-[#F97316] whitespace-nowrap">
                              +${addon.price} {addon.type === 'per_person' ? '/ person' : ''}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5 leading-relaxed">
                            {addon.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Instant Price Breakdown Card */}
              <div className="p-4 bg-black text-white rounded-2xl shadow-lg border border-[#F97316]/40">
                <div className="text-xs text-[#F97316] font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Transparent Price Calculation</span>
                  <span className="bg-[#F97316]/20 text-white px-2.5 py-0.5 rounded-full text-[10px]">All Taxes & Park Fees Included</span>
                </div>
                
                <div className="space-y-1.5 text-xs text-white/80 border-b border-white/15 pb-3">
                  <div className="flex justify-between">
                    <span>Adults ({adults} × ${pricing.basePricePerAdult}):</span>
                    <span className="font-semibold text-white">${pricing.adultTotal.toLocaleString()}</span>
                  </div>
                  {children > 0 && (
                    <div className="flex justify-between text-[#F97316]">
                      <span>Children ({children} × ${pricing.childRate}):</span>
                      <span className="font-semibold">${pricing.childTotal.toLocaleString()}</span>
                    </div>
                  )}
                  {pricing.addonsTotal > 0 && (
                    <div className="flex justify-between text-[#F97316]">
                      <span>Selected Upgrades ({selectedAddons.length}):</span>
                      <span className="font-semibold">+${pricing.addonsTotal.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-baseline justify-between pt-3">
                  <div>
                    <span className="text-xs text-white/60">Estimated Total (USD):</span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#F97316]">
                      ${pricing.grandTotal.toLocaleString()}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="px-5 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
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
              <div className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center justify-between">
                <span>Primary Traveler Contact Information</span>
                <button
                  type="button"
                  onClick={() => setStep('configure')}
                  className="text-[#F97316] hover:underline normal-case text-xs font-semibold"
                >
                  ← Edit Guests / Addons
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-black dark:text-neutral-300 mb-1">
                    Full Name *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Dr. Alexander Wright"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-black/20 dark:border-white/15 bg-white dark:bg-[#121212] text-black dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-[#F97316] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black dark:text-neutral-300 mb-1">
                    Email Address *
                  </label>
                  <input 
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-black/20 dark:border-white/15 bg-white dark:bg-[#121212] text-black dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-[#F97316] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black dark:text-neutral-300 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input 
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-black/20 dark:border-white/15 bg-white dark:bg-[#121212] text-black dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-[#F97316] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black dark:text-neutral-300 mb-1">
                    Country of Residence
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. United Kingdom, USA, Germany"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-black/20 dark:border-white/15 bg-white dark:bg-[#121212] text-black dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-[#F97316] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-black dark:text-neutral-300 mb-1">
                  Special Requests, Dietary Requirements or Rooming Preferences
                </label>
                <textarea 
                  rows={2}
                  placeholder="e.g., Honeymoon bed setup, vegetarian meals, airport transfer flight details, photography focus..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-black/20 dark:border-white/15 bg-white dark:bg-[#121212] text-black dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-[#F97316] outline-none resize-none"
                />
              </div>

              {/* Final Review & Submission */}
              <div className="p-3.5 bg-neutral-50 dark:bg-[#121212] rounded-2xl border border-[#F97316]/30 flex items-center justify-between text-xs">
                <div>
                  <span className="text-neutral-500 dark:text-neutral-400">Total Booking Quote:</span>
                  <div className="text-lg font-bold text-black dark:text-white">${pricing.grandTotal.toLocaleString()} USD ({pricing.totalPax} Guests)</div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep('configure')}
                    className="px-3.5 py-2 rounded-xl border border-black/20 dark:border-white/20 text-xs font-bold text-black dark:text-neutral-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5"
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

              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 text-center">
                🔒 No credit card charged today. A safari director will review lodge availability and contact you within 2 hours with formal confirmation.
              </p>
            </form>
          )}

          {/* STEP 3: CONFIRMATION & REFERENCE */}
          {step === 'confirmed' && createdBooking && (
            <div className="text-center py-6 space-y-5 animate-fadeIn">
              <div className="w-16 h-16 bg-[#F97316]/15 text-[#F97316] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#F97316]">
                  Safari Booking Received!
                </span>
                <h3 className="text-2xl font-serif font-bold text-black dark:text-white mt-1">
                  Karibu Sana, {createdBooking.clientName}!
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-md mx-auto mt-2">
                  Your provisional booking for <strong>{createdBooking.tourName}</strong> has been logged in our operations system.
                </p>
              </div>

              {/* Reference Card */}
              <div className="max-w-md mx-auto p-4 bg-neutral-50 dark:bg-[#121212] rounded-2xl border border-black/10 dark:border-white/10 text-xs space-y-2 text-left">
                <div className="flex justify-between border-b border-black/10 dark:border-white/10 pb-1.5">
                  <span className="text-neutral-500 dark:text-neutral-400">Booking Reference:</span>
                  <span className="font-mono font-extrabold text-[#F97316] text-sm">{createdBooking.id}</span>
                </div>
                <div className="flex justify-between border-b border-black/10 dark:border-white/10 pb-1.5">
                  <span className="text-neutral-500 dark:text-neutral-400">Travel Date:</span>
                  <span className="font-bold text-black dark:text-white">{createdBooking.travelDate}</span>
                </div>
                <div className="flex justify-between border-b border-black/10 dark:border-white/10 pb-1.5">
                  <span className="text-neutral-500 dark:text-neutral-400">Guests:</span>
                  <span className="font-bold text-black dark:text-white">{createdBooking.pax} Travelers</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400">Total Amount:</span>
                  <span className="font-bold text-[#F97316]">${createdBooking.totalAmount.toLocaleString()} USD</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
                <a
                  href={`https://wa.me/255753997777?text=Hello%20Embuat%20Safaris%2C%20I%20just%20submitted%20booking%20${createdBooking.id}%20for%20${encodeURIComponent(createdBooking.tourName)}.%20Please%20confirm%20availability!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#F97316]/25"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
                
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="py-3 px-6 bg-black text-white dark:bg-white dark:text-black rounded-xl font-bold text-xs sm:text-sm transition-colors"
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

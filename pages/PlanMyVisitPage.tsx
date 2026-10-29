import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Calendar,
  Users,
  Sparkles,
  CheckCircle,
  ArrowRight,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  MessageCircle,
  Mountain,
  Sun,
  Check
} from 'lucide-react';
import { useLiveTours, tourService } from '../services/tourService';
import BookingModal from '../components/BookingModal';
import { TourPackage } from '../types';

const DESTINATIONS_OPTIONS = [
  { id: 'serengeti', name: 'Serengeti National Park', tag: 'Great Migration & Big Cats', image: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Serengeti-34.jpg' },
  { id: 'ngorongoro', name: 'Ngorongoro Crater', tag: 'UNESCO Big Five Caldera', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80' },
  { id: 'tarangire', name: 'Tarangire & Manyara', tag: 'Elephant Herds & Baobabs', image: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/07/elep.jpg' },
  { id: 'kilimanjaro', name: 'Mount Kilimanjaro', tag: '5,895m Roof of Africa', image: 'https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?auto=format&fit=crop&w=600&q=80' },
  { id: 'zanzibar', name: 'Zanzibar Archipelago', tag: 'Turquoise Beaches & Spice', image: 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/zanzibar-beach-view-1024x576.jpg' },
  { id: 'cultural', name: 'Monduli Juu & Waterfalls', tag: 'Maasai Culture & Day Trips', image: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/MATERUNI-DT.jpg' }
];

const COMFORT_TIERS = [
  { id: 'adventure', name: 'Adventure Camping', desc: 'Authentic wilderness dome tents & public campsites with private chef', multiplier: 0.85 },
  { id: 'midrange', name: 'Classic Mid-Range Lodge', desc: 'Handpicked tented camps & comfortable en-suite safari lodges', multiplier: 1.0 },
  { id: 'luxury', name: '5-Star Luxury Sanctuary', desc: 'Boutique wilderness lodges, private plunge pools & fly-in options', multiplier: 1.35 }
];

const PlanMyVisitPage: React.FC = () => {
  const allTours = useLiveTours();
  const activeTours = allTours.filter(t => t.status !== 'draft' && t.status !== 'archived');

  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(['serengeti', 'ngorongoro']);
  const [durationDays, setDurationDays] = useState<number>(6);
  const [comfortTier, setComfortTier] = useState<string>('midrange');
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [travelDate, setTravelDate] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [bookingModalTour, setBookingModalTour] = useState<TourPackage | null>(null);

  const toggleDestination = (id: string) => {
    setSelectedDestinations(prev =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter(x => x !== id) : prev) : [...prev, id]
    );
  };

  // Match real tour packages based on selections
  const matchedTours = useMemo(() => {
    return activeTours
      .map(tour => {
        let score = 0;
        const hay = `${tour.name} ${tour.category} ${tour.highlights.join(' ')}`.toLowerCase();
        selectedDestinations.forEach(dest => {
          if (dest === 'kilimanjaro' && (tour.category === 'Trekking' || hay.includes('kilimanjaro') || hay.includes('machame') || hay.includes('lemosho'))) score += 5;
          if (dest === 'zanzibar' && (tour.category === 'Zanzibar' || hay.includes('zanzibar'))) score += 5;
          if (dest === 'serengeti' && hay.includes('serengeti')) score += 4;
          if (dest === 'ngorongoro' && hay.includes('ngorongoro')) score += 4;
          if (dest === 'tarangire' && (hay.includes('tarangire') || hay.includes('manyara'))) score += 3;
          if (dest === 'cultural' && (tour.category === 'Day Trips' || hay.includes('maasai') || hay.includes('materuni'))) score += 4;
        });

        const dMatch = tour.duration.match(/(\d+)/);
        const tourDays = dMatch ? parseInt(dMatch[1], 10) : 5;
        const dayDiff = Math.abs(tourDays - durationDays);
        if (dayDiff === 0) score += 4;
        else if (dayDiff <= 2) score += 2;

        return { tour, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(item => item.tour);
  }, [activeTours, selectedDestinations, durationDays]);

  const estimatedPerPerson = useMemo(() => {
    const tier = COMFORT_TIERS.find(c => c.id === comfortTier) || COMFORT_TIERS[1];
    const baseDaily = selectedDestinations.includes('kilimanjaro') ? 290 : selectedDestinations.includes('zanzibar') && selectedDestinations.length === 1 ? 160 : 320;
    return Math.round(durationDays * baseDaily * tier.multiplier);
  }, [durationDays, comfortTier, selectedDestinations]);

  const totalEstimate = useMemo(() => {
    return Math.round(adults * estimatedPerPerson + children * estimatedPerPerson * 0.65);
  }, [adults, children, estimatedPerPerson]);

  const handleSubmitCustomPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) return;

    const destNames = selectedDestinations
      .map(id => DESTINATIONS_OPTIONS.find(d => d.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const tierName = COMFORT_TIERS.find(c => c.id === comfortTier)?.name || 'Mid-Range';

    const booking = tourService.createBooking({
      tourId: 'custom-safari-plan',
      tourName: `Custom ${durationDays}-Day Safari (${destNames})`,
      clientName,
      clientEmail,
      clientPhone,
      country: 'International',
      travelDate: travelDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      pax: adults + children,
      totalAmount: totalEstimate,
      currency: '$',
      status: 'Pending',
      specialRequests: `Comfort: ${tierName} | Destinations: ${destNames} | Adults: ${adults}, Children: ${children} | Notes: ${notes || 'None'}`
    });

    setSubmittedRef(booking.id);
  };

  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-[#0A0A0A] text-black dark:text-white transition-colors duration-300">
      {/* Hero Banner */}
      <section className="relative py-12 sm:py-16 bg-black text-white overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <img
            src="https://safari56.com/wp-content/uploads/2026/08/Tarangire-Ngorongoro-Serengeti-Safari-1.jpg"
            alt="Plan Your Tanzania Safari Visit"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center max-w-3xl">
          <span className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-black/70 backdrop-blur-md rounded-xl sm:rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider border border-[#F97316]/50 mb-3 text-[#F97316]">
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0" /> Interactive Trip Designer • Monduli Juu
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold mb-3">
            Plan Your <span className="text-[#F97316]">Tanzania Visit</span>
          </h1>
          <p className="text-white/85 text-xs sm:text-base font-light leading-relaxed">
            Select your dream parks, duration, and comfort style below. Get instant package matches and a custom quote from our native Tanzanian guides.
          </p>
        </div>
      </section>

      {/* Main Interactive Builder */}
      <section className="py-8 sm:py-14">
        <div className="container mx-auto px-3.5 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Left 2 Columns: Interactive Steps */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              
              {/* Step 1: Select Destinations */}
              <div className="p-4 sm:p-6 bg-neutral-50 dark:bg-[#121212] rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2 text-[#F97316] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1">
                  <span>Step 01</span>
                  <span>•</span>
                  <span>Choose Ecosystems</span>
                </div>
                <h2 className="text-lg sm:text-2xl font-serif font-bold mb-3 sm:mb-4">Where Would You Like to Visit?</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
                  {DESTINATIONS_OPTIONS.map((dest) => {
                    const isSelected = selectedDestinations.includes(dest.id);
                    return (
                      <button
                        key={dest.id}
                        type="button"
                        onClick={() => toggleDestination(dest.id)}
                        className={`group relative h-32 sm:h-36 rounded-2xl overflow-hidden text-left border-2 transition-all ${
                          isSelected
                            ? 'border-[#F97316] ring-2 ring-[#F97316]/40 scale-[1.01]'
                            : 'border-black/10 dark:border-white/10 opacity-85 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        <div className={`absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-[#F97316] text-white shadow-md' : 'bg-black/60 text-white/60 border border-white/30'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                          <p className="font-bold text-xs sm:text-sm leading-tight">{dest.name}</p>
                          <p className="text-[9.5px] sm:text-[10px] text-[#F97316] font-semibold mt-0.5 leading-tight">{dest.tag}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Duration, Travelers & Comfort Style */}
              <div className="p-4 sm:p-6 bg-neutral-50 dark:bg-[#121212] rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-[#F97316] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1">
                    <span>Step 02</span>
                    <span>•</span>
                    <span>Duration &amp; Safari Style</span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-serif font-bold">Tailor Your Rhythm &amp; Comfort</h2>
                </div>

                {/* Duration Pills */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-2">
                    Preferred Trip Duration: <span className="text-[#F97316]">{durationDays} Days</span>
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {[1, 3, 4, 5, 6, 7, 10].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDurationDays(d)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                          durationDays === d
                            ? 'bg-[#F97316] text-white border-[#F97316] shadow-md'
                            : 'bg-white dark:bg-[#0A0A0A] text-black dark:text-white border-black/15 dark:border-white/15 hover:border-[#F97316]'
                        }`}
                      >
                        {d} {d === 1 ? 'Day' : 'Days'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comfort Tiers */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {COMFORT_TIERS.map((tier) => {
                    const isSelected = comfortTier === tier.id;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setComfortTier(tier.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'bg-[#F97316]/10 border-[#F97316] ring-1 ring-[#F97316]'
                            : 'bg-white dark:bg-[#0A0A0A] border-black/10 dark:border-white/10 hover:border-[#F97316]/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs sm:text-sm text-black dark:text-white">{tier.name}</span>
                          {isSelected && <CheckCircle className="w-4 h-4 text-[#F97316] flex-shrink-0" />}
                        </div>
                        <p className="text-[10.5px] sm:text-xs text-neutral-600 dark:text-neutral-400 leading-snug">{tier.desc}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Travelers & Start Date */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 bg-white dark:bg-[#0A0A0A] rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-between">
                    <div>
                      <span className="block text-xs font-bold">Adults</span>
                      <span className="text-[10px] text-neutral-500">12+ yrs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-white/10 font-bold">-</button>
                      <span className="font-bold text-sm w-4 text-center">{adults}</span>
                      <button type="button" onClick={() => setAdults(Math.min(16, adults + 1))} className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-white/10 font-bold">+</button>
                    </div>
                  </div>

                  <div className="p-3 bg-white dark:bg-[#0A0A0A] rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-between">
                    <div>
                      <span className="block text-xs font-bold">Children</span>
                      <span className="text-[10px] text-[#F97316] font-semibold">35% Off</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-white/10 font-bold">-</button>
                      <span className="font-bold text-sm w-4 text-center">{children}</span>
                      <button type="button" onClick={() => setChildren(Math.min(10, children + 1))} className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-white/10 font-bold">+</button>
                    </div>
                  </div>

                  <div className="p-3 bg-white dark:bg-[#0A0A0A] rounded-xl border border-black/10 dark:border-white/10">
                    <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-0.5">Estimated Date</label>
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-black dark:text-white outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Instant Matched Packages */}
              <div className="p-4 sm:p-6 bg-neutral-50 dark:bg-[#121212] rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-[#F97316] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1">
                      <span>Step 03</span>
                      <span>•</span>
                      <span>Recommended Itineraries</span>
                    </div>
                    <h2 className="text-lg sm:text-2xl font-serif font-bold">Matched Packages for Your Visit</h2>
                  </div>
                  <Link to="/tours" className="text-xs font-bold text-[#F97316] hover:underline flex items-center gap-1">
                    View All 84+ Tours <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {matchedTours.map((tour) => (
                    <div
                      key={tour.id}
                      className="bg-white dark:bg-[#0A0A0A] rounded-2xl border border-black/10 dark:border-white/10 hover:border-[#F97316] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                    >
                      <div className="relative h-36 bg-black overflow-hidden">
                        <img
                          src={tour.image || tour.coverImage}
                          alt={tour.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-lg bg-[#F97316]/90 text-white text-[10px] font-bold uppercase">
                          {tour.duration}
                        </span>
                        <span className="absolute bottom-2.5 left-2.5 text-sm font-extrabold text-[#F97316]">
                          From ${tour.fromPrice} <span className="text-[10px] text-white/80 font-normal">/ person</span>
                        </span>
                      </div>

                      <div className="p-3.5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-xs sm:text-sm text-black dark:text-white line-clamp-1 mb-1">{tour.name}</h3>
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-3">
                            {tour.highlights.slice(0, 2).join(' • ')}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            to={`/itinerary/${tour.id}`}
                            className="flex-1 py-2 px-2.5 rounded-xl border border-black dark:border-white text-black dark:text-white text-[11px] font-bold text-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                          >
                            Itinerary
                          </Link>
                          <button
                            type="button"
                            onClick={() => setBookingModalTour(tour)}
                            className="flex-1 py-2 px-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-[11px] font-bold text-center transition-colors"
                          >
                            Inquire
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Live Custom Trip Summary & Direct Submission */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-neutral-50 dark:bg-[#121212] rounded-2xl sm:rounded-3xl border-2 border-[#F97316]/40 p-4 sm:p-6 shadow-xl space-y-5">
                <div className="p-4 bg-black text-white rounded-2xl border border-[#F97316]/40">
                  <span className="text-[10px] uppercase tracking-widest text-[#F97316] font-extrabold">Your Custom Trip Estimate</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#F97316]">${totalEstimate.toLocaleString()}</span>
                    <span className="text-[11px] text-white/75">${estimatedPerPerson.toLocaleString()} / adult</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/15 space-y-1 text-[11px] text-white/80">
                    <div className="flex justify-between">
                      <span>Duration &amp; Guests:</span>
                      <span className="font-bold text-white">{durationDays} Days • {adults + children} Pax</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Selected Parks:</span>
                      <span className="font-bold text-[#F97316]">{selectedDestinations.length} Ecosystems</span>
                    </div>
                  </div>
                </div>

                {submittedRef ? (
                  <div className="text-center py-6 space-y-4">
                    <div className="w-14 h-14 mx-auto rounded-full bg-[#F97316]/15 text-[#F97316] flex items-center justify-center">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-serif font-bold">Custom Trip Logged!</h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300">
                      Reference: <strong className="text-[#F97316] font-mono">{submittedRef}</strong>. Our Monduli Juu team will send your tailored day-by-day proposal within 24 hours.
                    </p>
                    <a
                      href={`https://wa.me/255785341091?text=${encodeURIComponent(`Hello Embuat Safaris! I just planned my ${durationDays}-day Tanzania visit (Ref: ${submittedRef}) for ${adults + children} guests. Let's finalize my custom itinerary!`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                    >
                      <MessageCircle className="w-4 h-4" /> Chat Instantly on WhatsApp
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitCustomPlan} className="space-y-3">
                    <h3 className="font-serif font-bold text-base">Receive Your Custom Proposal</h3>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/15 dark:border-white/15 text-xs outline-none focus:ring-2 focus:ring-[#F97316]"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/15 dark:border-white/15 text-xs outline-none focus:ring-2 focus:ring-[#F97316]"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone / WhatsApp Number *"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/15 dark:border-white/15 text-xs outline-none focus:ring-2 focus:ring-[#F97316]"
                    />
                    <textarea
                      rows={2}
                      placeholder="Special wishes (e.g. honeymoon, balloon safari, photography)..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/15 dark:border-white/15 text-xs outline-none focus:ring-2 focus:ring-[#F97316] resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#F97316]/25 transition-all"
                    >
                      <Send className="w-3.5 h-3.5" /> Send My Custom Visit Plan
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <BookingModal
        isOpen={!!bookingModalTour}
        onClose={() => setBookingModalTour(null)}
        tour={bookingModalTour}
      />
    </div>
  );
};

export default PlanMyVisitPage;


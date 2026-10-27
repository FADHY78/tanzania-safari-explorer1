import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, MapPin, Star, CheckCircle, Camera, Heart, Sparkles, Shield, Clock, Binoculars, Sun, Mountain } from 'lucide-react';

const Home = () => {
  const destinations = [
    { name: 'Serengeti National Park', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2070', description: 'Witness the Great Migration across endless plains', tag: 'Most Popular' },
    { name: 'Ngorongoro Crater', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2071', description: 'UNESCO World Heritage crater teeming with wildlife', tag: 'Must Visit' },
    { name: 'Zanzibar Island', image: 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/zanzibar-beach-view-1024x576.jpg', description: 'Pristine beaches, spice tours & Stone Town culture', tag: 'Beach Escape' },
    { name: 'Mount Kilimanjaro', image: 'https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?q=80&w=2070', description: "Africa's highest peak — the roof of the continent", tag: 'Adventure' }
  ];

  const tours = [
    { 
      id: 'kilimanjaro-machame-7-days',
      name: '7 Days Kilimanjaro Climb – Machame Route', 
      duration: '7 Days', 
      price: '$2,279', 
      image: 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/7-days-machame-q7uhx4dl11xrr3ao020xabzqzwvm9oxm4gn0ke87mo.jpg', 
      highlights: ['Machame Camp & Shira Plateau', 'Barranco Wall & Karanga Camp', 'Uhuru Peak 5,895m Summit'],
      link: '/tour/kilimanjaro-machame-7-days'
    },
    { 
      id: 'safari-northern-circuit-6-days',
      name: '6-Day Northern Circuit Wildlife Safari', 
      duration: '6 Days', 
      price: '$2,650', 
      image: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/07/giraffe.jpg', 
      highlights: ['Serengeti National Park Game Drives', 'Ngorongoro Crater Floor Safari', 'Tarangire Elephant Herds & Baobabs'],
      link: '/tour/safari-northern-circuit-6-days'
    },
    { 
      id: 'zanzibar-prison-island-spice-4-days',
      name: '4 Days Zanzibar Island & Spice Tour', 
      duration: '4 Days', 
      price: '$750', 
      image: 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/mahali-zanzibar-1024x683.jpg', 
      highlights: ['Stone Town UNESCO World Heritage', 'Spice Farm Sensory Exploration', 'Prison Island Giant Aldabra Tortoises'],
      link: '/tour/zanzibar-prison-island-spice-4-days'
    }
  ];

  const testimonials = [
    { name: 'Sarah Mitchell', location: 'United Kingdom', text: 'The 5-day migration safari was life-changing. We saw a river crossing and the Big Five in just one trip. Our guide was incredibly knowledgeable!', rating: 5, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80' },
    { name: 'David Chen', location: 'Singapore', text: 'Perfectly organized from airport pickup to final farewell. Arusha to Zanzibar was seamless and exceeded all our expectations!', rating: 5, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
    { name: 'Emma & Mark', location: 'Australia', text: 'The Ngorongoro Crater was otherworldly. Our guide knew every animal by name. Truly an unforgettable luxury adventure.', rating: 5, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' }
  ];

  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068" alt="Tanzania Safari" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1]">
              Discover the Soul of
              <span className="block text-[#C08240] mt-1">Wild Tanzania</span>
            </h1>

            <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/15 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-widest border border-white/20">
              <Sparkles className="w-3.5 h-3.5" /> Africa's Premier Safari Destination
            </span>

            <p className="text-base md:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
              Journey through pristine wilderness, witness the Great Migration,
              and create memories that will last forever.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link to="/tours" className="group px-8 py-3.5 bg-[#C08240] hover:bg-[#A67134] text-white rounded-xl font-bold transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2 text-sm">
                Explore Tours <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/destinations" className="px-8 py-3.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/40 rounded-xl font-bold transition-all text-sm">
                View Destinations
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto pt-10">
              {[
                { icon: Users, val: '5,000+', label: 'Happy Travelers' },
                { icon: Award, val: '15+', label: 'Years Experience' },
                { icon: MapPin, val: '25+', label: 'Destinations' },
                { icon: Star, val: '4.9', label: 'Average Rating' }
              ].map((s, i) => (
                <div key={i} className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/15 text-center">
                  <s.icon className="w-5 h-5 mx-auto mb-2 text-[#C08240]" />
                  <div className="text-xl font-bold">{s.val}</div>
                  <div className="text-[11px] text-white/60 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ── TRUST BAR ── */}
      <section className="py-6 bg-white dark:bg-[#16120E] border-b border-gray-100 dark:border-white/10 transition-colors">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-xs sm:text-sm">
            <div className="flex items-center gap-2"><Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#C08240]" /> <span className="font-semibold text-gray-700 dark:text-gray-300">TripAdvisor Top Rated</span></div>
            <div className="hidden md:block w-px h-5 bg-gray-200 dark:bg-white/10"></div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" /> <span className="font-semibold text-gray-700 dark:text-gray-300">SafeTravels Verified</span></div>
            <div className="hidden md:block w-px h-5 bg-gray-200 dark:bg-white/10"></div>
            <div className="flex items-center gap-2"><Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#C08240]" /> <span className="font-semibold text-gray-700 dark:text-gray-300">Licensed by Tanzania Tourism Board</span></div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-16 bg-white dark:bg-[#120F0D] transition-colors">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#C08240] font-semibold text-xs uppercase tracking-widest">Why Choose Embuat Safaris</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mt-2 mb-3">What Makes <span className="text-[#C08240]">Your Safari</span> Unforgettable</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm">Decades of expertise paired with passionate local Maasai and Swahili knowledge</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Mountain, title: 'Diverse Landscapes', desc: 'From Serengeti plains to Kilimanjaro peaks and Zanzibar shores.' },
              { icon: Binoculars, title: 'Expert Guides', desc: 'Certified guides with 10+ years of wildlife tracking experience.' },
              { icon: Shield, title: 'Safety First', desc: 'Custom 4x4 vehicles, satellite phones, and first-aid equipped.' },
              { icon: Sun, title: 'Year-Round Safari', desc: 'Every season reveals a different spectacle across Tanzania.' }
            ].map((f, i) => (
              <div key={i} className="group p-5 bg-gray-50 dark:bg-[#1B1613] hover:bg-white dark:hover:bg-[#231D18] rounded-2xl border border-gray-100 dark:border-white/10 hover:border-[#C08240]/40 hover:shadow-xl transition-all">
                <f.icon className="w-7 h-7 text-[#C08240] mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-1.5 text-sm">{f.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED DESTINATIONS ── */}
      <section className="py-16 bg-gray-50 dark:bg-[#16120E] transition-colors">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10">
            <div>
              <span className="text-[#C08240] font-semibold text-xs uppercase tracking-widest">Top Destinations</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mt-2">Explore <span className="text-[#C08240]">Iconic Locations</span></h2>
            </div>
            <Link to="/destinations" className="inline-flex items-center gap-2 text-[#C08240] font-semibold hover:gap-3 transition-all text-sm">View all <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {destinations.map((d, i) => (
              <Link to="/destinations" key={i} className="group relative h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 bg-gray-900">
                <img 
                  src={d.image} 
                  alt={d.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#C08240] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">{d.tag}</span>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold mb-0.5">{d.name}</h3>
                  <p className="text-white/75 text-xs">{d.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR TOURS PREVIEW ── */}
      <section className="py-16 bg-white dark:bg-[#120F0D] transition-colors">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10">
            <div>
              <span className="text-[#C08240] font-semibold text-xs uppercase tracking-widest">Safari Packages</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mt-2">Popular <span className="text-[#C08240]">Tour Packages</span></h2>
            </div>
            <Link to="/tours" className="inline-flex items-center gap-2 text-[#C08240] font-semibold hover:gap-3 transition-all text-sm">Browse all 80+ Tours <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {tours.map((t, i) => (
              <Link to={t.link || "/tours"} key={i} className="group bg-white dark:bg-[#1B1613] rounded-2xl border border-gray-100 dark:border-white/10 hover:border-[#C08240]/40 overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 flex flex-col justify-between">
                <div className="relative h-48 overflow-hidden bg-gray-900">
                  <img 
                    src={t.image} 
                    alt={t.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1 border border-white/20">
                    <Clock className="w-3 h-3 text-[#C08240]" />{t.duration}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2.5 text-base group-hover:text-[#C08240] transition-colors">{t.name}</h3>
                    <ul className="space-y-1.5 mb-4">
                      {t.highlights.map((h, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300"><CheckCircle className="w-3.5 h-3.5 text-[#C08240] flex-shrink-0" />{h}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/10">
                    <span className="text-[#C08240] font-bold text-base">{t.price}<span className="text-xs text-gray-400 font-normal"> / person</span></span>
                    <span className="text-xs font-semibold text-[#C08240] group-hover:underline flex items-center gap-1">Details <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-14 bg-gray-50 dark:bg-[#16120E] transition-colors">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#C08240] font-semibold text-xs uppercase tracking-widest">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mt-2">How It <span className="text-[#C08240]">Works</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: '01', title: 'Choose Your Safari', desc: 'Browse our curated packages or tell us your dream trip.' },
              { step: '02', title: 'Customize & Book', desc: 'Work with our experts to tailor every detail.' },
              { step: '03', title: 'Arrive & Explore', desc: 'We handle transfers, lodges, and logistics.' },
              { step: '04', title: 'Make Memories', desc: 'Experience the wild and return transformed.' }
            ].map((s, i) => (
              <div key={i} className="text-center p-5 bg-white dark:bg-[#1B1613] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
                <div className="w-10 h-10 mx-auto mb-3 bg-[#C08240] text-white rounded-xl flex items-center justify-center font-bold text-xs shadow-md shadow-[#C08240]/30">{s.step}</div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-1 text-sm">{s.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 bg-white dark:bg-[#120F0D] transition-colors">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#C08240] font-semibold text-xs uppercase tracking-widest">Guest Reviews</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mt-2">Loved by <span className="text-[#C08240]">Travelers</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 bg-gray-50 dark:bg-[#1B1613] rounded-2xl border border-gray-100 dark:border-white/10 hover:shadow-xl transition-all">
                <div className="flex gap-0.5 mb-2.5">{[...Array(t.rating)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-[#C08240] fill-[#C08240]" />)}</div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img 
                    src={t.image} 
                    alt={t.name} 
                    className="w-10 h-10 rounded-full border-2 border-[#C08240]/40 object-cover" 
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
                    }}
                  />
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{t.name}</div>
                    <div className="text-[11px] text-gray-400 dark:text-gray-500">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/gallery" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-white/10 hover:bg-[#C08240] dark:hover:bg-[#C08240] text-gray-700 dark:text-gray-200 hover:text-white rounded-xl font-semibold transition-all text-sm">
              <Camera className="w-4 h-4" /> View Expedition Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* ── SUSTAINABILITY ── */}
      <section className="py-14 bg-gray-50 dark:bg-[#16120E] transition-colors">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-1/2">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs uppercase tracking-widest">Responsible Travel</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mt-2 mb-3">Safari with <span className="text-emerald-700 dark:text-emerald-400">Purpose</span></h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-5 leading-relaxed">We believe travel should be a force for good. Every Embuat safari supports local communities, conservation, and sustainable practices.</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: '$50k+', label: 'Community Investment' },
                  { val: '100%', label: 'Plastic-Free Ops' },
                  { val: '80%', label: 'Local Staff' },
                  { val: '5%', label: 'Profits to Conservation' }
                ].map((s, i) => (
                  <div key={i} className="p-3.5 bg-white dark:bg-[#1B1613] rounded-xl border border-gray-100 dark:border-white/10 shadow-sm">
                    <div className="font-bold text-[#C08240] text-base">{s.val}</div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="inline-flex items-center gap-2 text-[#C08240] font-semibold mt-5 hover:gap-3 transition-all text-sm">Learn more <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-3">
              <img 
                src="https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=600&q=80" 
                alt="Conservation Elephants" 
                className="rounded-2xl h-40 w-full object-cover" 
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80'; }}
              />
              <img 
                src="https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/maasai-boma1-quj0eomliq423umh5979wbutmmzg0963hchobwsin0.jpg" 
                alt="Community Maasai" 
                className="rounded-2xl h-40 w-full object-cover mt-6" 
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=600&q=80'; }}
              />
              <img 
                src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=400" 
                alt="Wildlife" 
                className="rounded-2xl h-40 w-full object-cover" 
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80'; }}
              />
              <img 
                src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=400" 
                alt="Landscape Ngorongoro" 
                className="rounded-2xl h-40 w-full object-cover mt-6" 
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80'; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 bg-gradient-to-r from-[#C08240] via-[#DE6826] to-[#A67134] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-56 h-56 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <Heart className="w-9 h-9 mx-auto mb-3" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">Your Embuat Safari Adventure Awaits</h2>
          <p className="max-w-lg mx-auto mb-6 opacity-90 text-sm">Let our expert team craft your once-in-a-lifetime journey. From first inquiry to final game drive, we handle every detail.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact" className="px-8 py-3.5 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all shadow-xl inline-flex items-center justify-center gap-2">Start Planning <ArrowRight className="w-4 h-4" /></Link>
            <Link to="/tours" className="px-8 py-3.5 bg-black/20 border border-white/40 text-white rounded-xl font-bold text-sm hover:bg-black/30 transition-all">Browse 80+ Tours</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

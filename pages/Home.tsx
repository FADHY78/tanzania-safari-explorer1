import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, MapPin, Star, CheckCircle, Camera, Heart, Compass, Shield, Clock, Binoculars, Sun, Mountain } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();

  const destinations = [
    { name: 'Serengeti National Park', image: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Serengeti-34.jpg', description: 'Witness the Great Migration across endless plains', tag: 'Most Popular' },
    { name: 'Ngorongoro Crater', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2071', description: 'UNESCO World Heritage crater teeming with wildlife', tag: 'Must Visit' },
    { name: 'Zanzibar Island', image: 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/zanzibar-beach-view-1024x576.jpg', description: 'Pristine beaches, spice tours & Stone Town culture', tag: 'Beach Escape' },
    { name: 'Mount Kilimanjaro', image: 'https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?q=80&w=2070', description: "Africa's highest peak — the roof of the continent", tag: 'Adventure' }
  ];

  const tours = [
    { 
      id: 'kilimanjaro-machame-7-days',
      name: '7 Days Kilimanjaro Climb – Machame Route', 
      duration: '7 Days', 
      price: '$2,079', 
      image: 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/7-days-machame-q7uhx4dl11xrr3ao020xabzqzwvm9oxm4gn0ke87mo.jpg', 
      highlights: ['Machame Camp & Shira Plateau', 'Barranco Wall & Karanga Camp', 'Uhuru Peak 5,895m Summit'],
      link: '/tour/kilimanjaro-machame-7-days'
    },
    { 
      id: 'safari-northern-circuit-6-days',
      name: '6-Day Northern Circuit Wildlife Safari', 
      duration: '6 Days', 
      price: '$2,450', 
      image: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/07/giraffe.jpg', 
      highlights: ['Serengeti National Park Game Drives', 'Ngorongoro Crater Floor Safari', 'Tarangire Elephant Herds & Baobabs'],
      link: '/tour/safari-northern-circuit-6-days'
    },
    { 
      id: 'zanzibar-prison-island-spice-4-days',
      name: '4 Days Zanzibar Island & Spice Tour', 
      duration: '4 Days', 
      price: '$550', 
      image: 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/mahali-zanzibar-1024x683.jpg', 
      highlights: ['Stone Town UNESCO World Heritage', 'Spice Farm Sensory Exploration', 'Prison Island Giant Aldabra Tortoises'],
      link: '/tour/zanzibar-prison-island-spice-4-days'
    }
  ];

  const testimonials = [
    { name: 'Sarah Mitchell', location: 'United Kingdom', text: 'The 5-day migration safari was life-changing. We saw a river crossing and the Big Five in just one trip. Our guide was incredibly knowledgeable!', rating: 5 },
    { name: 'David Chen', location: 'Singapore', text: 'Perfectly organized from airport pickup to final farewell. Arusha to Zanzibar was seamless and exceeded all our expectations!', rating: 5 },
    { name: 'Emma & Mark', location: 'Australia', text: 'The Ngorongoro Crater was otherworldly. Our guide knew every animal by name. Truly an unforgettable luxury adventure.', rating: 5 }
  ];

  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] sm:h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 sm:pt-20 sm:pb-0">
        <div className="absolute inset-0">
          <img 
            src="https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/LION-IN-NGORONGORO-1-1.jpeg" 
            alt="Tanzania Wildlife Safari" 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Serengeti-34.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/85"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.12]">
              {t('home.hero.title1')}
              <span className="block text-[#F97316] mt-1">{t('home.hero.title2')}</span>
            </h1>

            <span className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 bg-black/65 backdrop-blur-md rounded-xl sm:rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider sm:tracking-widest border border-[#F97316]/50 text-white max-w-full leading-snug shadow-md">
              <Compass className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0" /> <span>{t('home.hero.subtitle')}</span>
            </span>

            <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed px-2">
              {t('home.hero.desc')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 sm:pt-4 max-w-md sm:max-w-none mx-auto w-full">
              <Link to="/tours" className="group px-7 sm:px-8 py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl font-bold transition-all hover:scale-105 shadow-xl shadow-[#F97316]/30 flex items-center justify-center gap-2 text-sm">
                {t('home.hero.explore')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/destinations" className="px-7 sm:px-8 py-3.5 bg-white text-black hover:bg-neutral-100 rounded-xl font-bold transition-all text-sm flex items-center justify-center shadow-lg">
                {t('home.hero.destinations')}
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 max-w-3xl mx-auto pt-6 sm:pt-10">
              {[
                { icon: Users, val: '5,000+', label: t('home.stats.travelers') },
                { icon: Award, val: '15+', label: t('home.stats.experience') },
                { icon: MapPin, val: '25+', label: t('home.stats.destinations') },
                { icon: Star, val: '4.9', label: t('home.stats.rating') }
              ].map((s, i) => (
                <div key={i} className="p-3 sm:p-4 bg-black/60 backdrop-blur-md rounded-xl border border-white/15 text-center">
                  <s.icon className="w-4 sm:w-5 h-4 sm:h-5 mx-auto mb-1.5 sm:mb-2 text-[#F97316]" />
                  <div className="text-lg sm:text-xl font-bold text-white">{s.val}</div>
                  <div className="text-[10px] sm:text-[11px] text-white/70 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ── TRUST BAR ── */}
      <section className="py-6 bg-black text-white border-b border-white/10 transition-colors">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-xs sm:text-sm">
            <div className="flex items-center gap-2"><Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#F97316]" /> <span className="font-semibold text-white">{t('home.trust.tripadvisor')}</span></div>
            <div className="hidden md:block w-px h-5 bg-white/15"></div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#F97316]" /> <span className="font-semibold text-white">{t('home.trust.safetravels')}</span></div>
            <div className="hidden md:block w-px h-5 bg-white/15"></div>
            <div className="flex items-center gap-2"><Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#F97316]" /> <span className="font-semibold text-white">{t('home.trust.ttb')}</span></div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-16 bg-white dark:bg-[#0A0A0A] transition-colors">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">{t('home.why.tag')}</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-black dark:text-white mt-2 mb-3">{t('home.why.title')}</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-sm">{t('home.why.desc')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Mountain, title: t('home.why.f1.title'), desc: t('home.why.f1.desc') },
              { icon: Binoculars, title: t('home.why.f2.title'), desc: t('home.why.f2.desc') },
              { icon: Shield, title: t('home.why.f3.title'), desc: t('home.why.f3.desc') },
              { icon: Sun, title: t('home.why.f4.title'), desc: t('home.why.f4.desc') }
            ].map((f, i) => (
              <div key={i} className="group p-5 bg-neutral-50 dark:bg-[#121212] hover:bg-white dark:hover:bg-[#181818] rounded-2xl border border-black/10 dark:border-white/10 hover:border-[#F97316] hover:shadow-xl transition-all">
                <f.icon className="w-7 h-7 text-[#F97316] mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-black dark:text-white mb-1.5 text-sm">{f.title}</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED DESTINATIONS ── */}
      <section className="py-16 bg-neutral-50 dark:bg-[#121212] transition-colors">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10">
            <div>
              <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">{t('home.dest.tag')}</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-black dark:text-white mt-2">{t('home.dest.title')}</h2>
            </div>
            <Link to="/destinations" className="inline-flex items-center gap-2 text-[#F97316] font-bold hover:gap-3 transition-all text-sm">
              {t('home.hero.destinations')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {destinations.map((d, i) => (
              <Link to="/destinations" key={i} className="group relative h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 bg-black border border-black/10 dark:border-white/10 hover:border-[#F97316]">
                <img 
                  src={d.image} 
                  alt={d.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent"></div>
                <span className="absolute top-3 left-3 px-2.5 sm:px-3 py-1 bg-[#F97316]/90 backdrop-blur-md text-white text-[10px] font-bold rounded-lg sm:rounded-full uppercase tracking-wider shadow-md border border-white/20 leading-tight">{d.tag}</span>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold mb-0.5 group-hover:text-[#F97316] transition-colors">{d.name}</h3>
                  <p className="text-white/80 text-xs">{d.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR TOURS PREVIEW ── */}
      <section className="py-16 bg-white dark:bg-[#0A0A0A] transition-colors">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10">
            <div>
              <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Safari Packages</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-black dark:text-white mt-2">Popular <span className="text-[#F97316]">Tour Packages</span></h2>
            </div>
            <Link to="/tours" className="inline-flex items-center gap-2 text-[#F97316] font-bold hover:gap-3 transition-all text-sm">Browse all 80+ Tours <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {tours.map((t, i) => (
              <Link to={t.link || "/tours"} key={i} className="group bg-white dark:bg-[#121212] rounded-2xl border border-black/10 dark:border-white/10 hover:border-[#F97316] overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 flex flex-col justify-between">
                <div className="relative h-48 overflow-hidden bg-black">
                  <img 
                    src={t.image} 
                    alt={t.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-lg sm:rounded-full text-[11px] sm:text-xs font-bold text-white flex items-center gap-1.5 border border-[#F97316]/40 shadow-md leading-tight">
                    <Clock className="w-3 h-3 text-[#F97316] flex-shrink-0" />
                    <span>{t.duration}</span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-black dark:text-white mb-2.5 text-base group-hover:text-[#F97316] transition-colors">{t.name}</h3>
                    <ul className="space-y-1.5 mb-4">
                      {t.highlights.map((h, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300"><CheckCircle className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0" />{h}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-black/10 dark:border-white/10">
                    <span className="text-[#F97316] font-extrabold text-base">{t.price}<span className="text-xs text-neutral-400 font-normal"> / person</span></span>
                    <span className="text-xs font-bold text-[#F97316] group-hover:underline flex items-center gap-1">Details <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-14 bg-neutral-50 dark:bg-[#121212] transition-colors">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-black dark:text-white mt-2">How It <span className="text-[#F97316]">Works</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: '01', title: 'Choose Your Safari', desc: 'Browse our curated packages or tell us your dream trip.' },
              { step: '02', title: 'Customize & Book', desc: 'Work with our experts to tailor every detail.' },
              { step: '03', title: 'Arrive & Explore', desc: 'We handle transfers, lodges, and logistics.' },
              { step: '04', title: 'Make Memories', desc: 'Experience the wild and return transformed.' }
            ].map((s, i) => (
              <div key={i} className="text-center p-5 bg-white dark:bg-[#0A0A0A] rounded-2xl border border-black/10 dark:border-white/10 shadow-sm hover:border-[#F97316] transition-all">
                <div className="w-10 h-10 mx-auto mb-3 bg-[#F97316] text-white rounded-xl flex items-center justify-center font-bold text-xs shadow-md shadow-[#F97316]/30">{s.step}</div>
                <h3 className="font-bold text-black dark:text-white mb-1 text-sm">{s.title}</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 bg-white dark:bg-[#0A0A0A] transition-colors">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">{t('home.reviews.tag')}</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-black dark:text-white mt-2">{t('home.reviews.title')}</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-sm mt-1">{t('home.reviews.desc')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 bg-neutral-50 dark:bg-[#121212] rounded-2xl border border-black/10 dark:border-white/10 hover:border-[#F97316] hover:shadow-xl transition-all flex flex-col justify-between">
                <div>
                  <div className="flex gap-0.5 mb-2.5">{[...Array(t.rating)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-[#F97316] fill-[#F97316]" />)}</div>
                  <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed italic">"{t.text}"</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/gallery" className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white hover:bg-[#F97316] dark:hover:bg-[#F97316] text-white dark:text-black dark:hover:text-white rounded-xl font-bold transition-all text-sm">
              <Camera className="w-4 h-4" /> View Expedition Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* ── SUSTAINABILITY / SAFARI WITH PURPOSE ── */}
      <section className="py-14 sm:py-20 bg-neutral-50 dark:bg-[#121212] transition-colors">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-12">
            <div className="w-full lg:w-1/2">
              <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest bg-[#F97316]/10 px-3.5 py-1.5 rounded-full border border-[#F97316]/25 inline-block mb-2">
                Responsible Travel
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-black dark:text-white mt-1 mb-3">
                Safari with <span className="text-[#F97316]">Purpose</span>
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base mb-6 leading-relaxed font-light">
                We believe travel should be a force for good. Every Embuat safari directly funds local communities, ranger anti-poaching patrols, and plastic-free wilderness operations across Tanzania and Zanzibar.
              </p>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {[
                  { val: '$50k+', label: 'Community Investment' },
                  { val: '100%', label: 'Plastic-Free Ops' },
                  { val: '85%+', label: 'Local Native Staff' },
                  { val: '5%', label: 'Direct to Conservation' }
                ].map((s, i) => (
                  <div key={i} className="p-3 sm:p-4 bg-white dark:bg-[#0A0A0A] rounded-xl sm:rounded-2xl border border-black/10 dark:border-white/10 shadow-sm">
                    <div className="font-bold text-[#F97316] text-lg sm:text-xl">{s.val}</div>
                    <div className="text-[10px] sm:text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="inline-flex items-center gap-2 text-[#F97316] font-bold mt-5 hover:gap-3 transition-all text-sm">
                Learn more about our pledge <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Clear Safari & Zanzibar Image Collage */}
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-2.5 sm:gap-4">
              <div className="space-y-2.5 sm:space-y-4 pt-0 sm:pt-6">
                <div className="rounded-2xl overflow-hidden shadow-md border border-black/10 dark:border-white/10 group relative bg-black">
                  <img 
                    src="https://safari56.com/wp-content/uploads/2026/08/4-day-Tanzania-safari.jpg" 
                    alt="Crystal Clear Serengeti Safari Expedition" 
                    className="rounded-2xl h-40 sm:h-44 md:h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://safari56.com/wp-content/uploads/2026/08/Tarangire-Ngorongoro-Serengeti-Safari-1.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent flex items-end p-2 sm:p-3">
                    <span className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-1.5 text-[10px] sm:text-xs font-bold text-white bg-black/75 backdrop-blur-md px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-xl sm:rounded-full border border-[#F97316]/50 shadow-md leading-tight text-center sm:text-left">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] flex-shrink-0"></span>
                      <span>Serengeti Wildlife</span>
                    </span>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-md border border-black/10 dark:border-white/10 group relative bg-black">
                  <img 
                    src="https://safari56.com/wp-content/uploads/2026/08/Tarangire-Ngorongoro-Serengeti-Safari-1.jpg" 
                    alt="Crystal Clear Ngorongoro Big Cat Expedition" 
                    className="rounded-2xl h-40 sm:h-44 md:h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Serengeti-34.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent flex items-end p-2 sm:p-3">
                    <span className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-1.5 text-[10px] sm:text-xs font-bold text-white bg-black/75 backdrop-blur-md px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-xl sm:rounded-full border border-[#F97316]/50 shadow-md leading-tight text-center sm:text-left">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] flex-shrink-0"></span>
                      <span>Ngorongoro Crater</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 sm:space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-md border border-black/10 dark:border-white/10 group relative bg-black">
                  <img 
                    src="https://alulizanzibar.co.tz/images/Nakupenda_Sandbank_01.jpg" 
                    alt="Crystal Clear Zanzibar Nakupenda Turquoise Sandbank" 
                    className="rounded-2xl h-40 sm:h-44 md:h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://alulizanzibar.co.tz/images/Full_Day_Safari_Blue_Trip_01.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent flex items-end p-2 sm:p-3">
                    <span className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-1.5 text-[10px] sm:text-xs font-bold text-white bg-black/75 backdrop-blur-md px-2 sm:px-3 py-1.5 sm:py-1 rounded-xl sm:rounded-full border border-[#F97316]/50 shadow-md leading-tight text-center sm:text-left">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] flex-shrink-0"></span>
                      <span>Zanzibar Marine Sanctuary</span>
                    </span>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-md border border-black/10 dark:border-white/10 group relative bg-black">
                  <img 
                    src="https://alulizanzibar.co.tz/images/Full_Day_Safari_Blue_Trip_01.jpg" 
                    alt="Crystal Clear Zanzibar Safari Blue Ocean Dhow" 
                    className="rounded-2xl h-40 sm:h-44 md:h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://alulizanzibar.co.tz/images/Nakupenda_Sandbank_01.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent flex items-end p-2 sm:p-3">
                    <span className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-1.5 text-[10px] sm:text-xs font-bold text-white bg-black/75 backdrop-blur-md px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-xl sm:rounded-full border border-[#F97316]/50 shadow-md leading-tight text-center sm:text-left">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] flex-shrink-0"></span>
                      <span>Safari Blue Sailing</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 bg-[#F97316] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-56 h-56 bg-black rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <Heart className="w-9 h-9 mx-auto mb-3" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">{t('home.cta.title')}</h2>
          <p className="max-w-lg mx-auto mb-6 opacity-95 text-sm">{t('home.cta.desc')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact" className="px-8 py-3.5 bg-black text-white rounded-xl font-bold text-sm hover:bg-neutral-900 transition-all shadow-xl inline-flex items-center justify-center gap-2">
              {t('home.cta.button')} <ArrowRight className="w-4 h-4 text-[#F97316]" />
            </Link>
            <Link to="/tours" className="px-8 py-3.5 bg-white text-black rounded-xl font-bold text-sm hover:bg-neutral-100 transition-all shadow-lg">
              {t('home.hero.explore')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

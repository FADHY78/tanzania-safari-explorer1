import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Thermometer, Eye, Compass, Cloud, Sun } from 'lucide-react';
import Destinations from '../components/Destinations';
import { useLiveTours } from '../services/tourService';

const DestinationsPage = () => {
  const liveTours = useLiveTours();

  const circuitPackages = useMemo(() => {
    // 1. Northern Circuit: Serengeti, Ngorongoro, Tarangire, Manyara
    const northern =
      liveTours.find((t) => t.id === 'safari-56-great-migration-5-days') ||
      liveTours.find((t) => t.id === 'safari-56-tarangire-serengeti-ngorongoro-4-days') ||
      liveTours.find((t) => t.name.toLowerCase().includes('serengeti') || t.name.toLowerCase().includes('tarangire')) ||
      liveTours[0];

    // 2. Southern Wilderness: Selous (Nyerere), Mikumi, Ruaha
    const southern =
      liveTours.find((t) => t.id === 'safari-selous-game-reserve-5-days') ||
      liveTours.find((t) => t.id === 'safari-56-mikumi-3-days') ||
      liveTours.find((t) => t.id === 'safari-56-nyerere-fly-in-2-days') ||
      liveTours.find((t) => t.name.toLowerCase().includes('mikumi') || t.name.toLowerCase().includes('nyerere') || t.name.toLowerCase().includes('selous'));

    // 3. Western Sanctuaries & Kilimanjaro Highlands
    const westernKilimanjaro =
      liveTours.find((t) => t.id === 'shira-plateau-day-trip') ||
      liveTours.find((t) => t.id === 'marangu-waterfall-day-trip') ||
      liveTours.find((t) => t.id === 'mandara-huts-day-trip') ||
      liveTours.find((t) => t.category === 'Trekking' || t.category === 'Day Trips');

    // 4. Zanzibar & Swahili Coast
    const zanzibar =
      liveTours.find((t) => t.id === 'zanzibar-full-day-jozani-forest-spice-farm-prison-island') ||
      liveTours.find((t) => t.id === 'zanzibar-full-day-prison-island-nakupenda-sandbank') ||
      liveTours.find((t) => t.category === 'Zanzibar');

    return [
      {
        circuit: 'Northern Circuit',
        tag: 'The Big Five & Great Migration',
        parks: 'Serengeti • Ngorongoro Crater • Tarangire • Lake Manyara',
        desc: 'The world’s most celebrated wildlife amphitheatre — vast savannah plains, volcanic calderas, and millions of grazing wildebeest.',
        wildlife: 'Big Five, Tree-Climbing Lions, Cheetahs, Flamingos',
        tour: northern,
        defaultImage: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/35/0f/c6/39/caption.jpg?w=1200&h=800&s=1',
      },
      {
        circuit: 'Southern Wilderness',
        tag: 'Untamed Riverine Safaris',
        parks: 'Nyerere (Selous) • Mikumi • Ruaha National Park',
        desc: 'Vast, untouched African bushveld with exhilarating riverboat safaris, walking tracking, and raw predator encounters without the crowds.',
        wildlife: 'African Wild Dogs, Sable Antelopes, Hippos, Giant Crocodiles',
        tour: southern,
        defaultImage: 'https://unjtqownkamivgvtrjlc.supabase.co/storage/v1/object/public/package-images/tour-1794587332348-sdetn.jpg',
      },
      {
        circuit: 'Kilimanjaro & Highlands',
        tag: 'The Roof of Africa',
        parks: 'Mt. Kilimanjaro • Arusha NP • Materuni Falls • Shira Plateau',
        desc: 'Majestic volcanic peaks, lush rainforest waterfalls, and alpine moorlands. From gentle day hikes to summit expeditions.',
        wildlife: 'Colobus Monkeys, Alpine Raptors, Forest Antelopes',
        tour: westernKilimanjaro,
        defaultImage: 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/Mount-kilimanjaro.jpg',
      },
      {
        circuit: 'Zanzibar & Coast',
        tag: 'Turquoise Oceans & Spice History',
        parks: 'Stone Town • Jozani Forest • Prison Island • Kendwa Beach',
        desc: 'Pristine coral sands, UNESCO Swahili heritage alleys, aromatic organic spice plantations, and protected marine sanctuaries.',
        wildlife: 'Red Colobus, Green Sea Turtles, Spinner Dolphins, Tropical Reefs',
        tour: zanzibar,
        defaultImage: 'https://alulizanzibar.co.tz/images/Prison_Island_Tour_02.jpg',
      },
    ];
  }, [liveTours]);

  const seasons = [
    { period: 'Jan – Mar', label: 'Calving Season', temp: '25–30°C', best: 'Southern Serengeti calving, predator action, lush emerald plains', icon: Sun },
    { period: 'Apr – May', label: 'Green Rains', temp: '22–28°C', best: 'Lowest rates, migratory birding paradise, uncrowded photography', icon: Cloud },
    { period: 'Jun – Oct', label: 'Dry Migration', temp: '20–27°C', best: 'Dramatic Mara River crossings, optimum game viewing around waterholes', icon: Sun },
    { period: 'Nov – Dec', label: 'Short Rains', temp: '23–29°C', best: 'Fresh grasslands, migration returning south, newborn antelopes', icon: Cloud }
  ];

  const travelTips = [
    { title: 'Luggage & Packing', desc: 'Soft duffel bags recommended for light aircraft hops. Bring neutral khaki/beige layers and UV sun protection.' },
    { title: 'Health & Vaccination', desc: 'Yellow Fever certificate required depending on transit. Antimalarial prophylaxis strongly advised.' },
    { title: 'Best Wildlife Timing', desc: 'June to October delivers supreme game viewing; January to March offers the dramatic wildebeest calving spectacle.' },
    { title: 'Currency & Tipping', desc: 'USD (clean notes dated 2013+) and Tanzanian Shillings (TZS) widely used. Guide tips average $15–$25 per day per party.' },
    { title: 'Visa on Arrival', desc: 'Most nationalities can obtain an e-visa online or entry visa at JRO / DAR airports on arrival ($50–$100 USD).' },
    { title: 'Safari Rhythm', desc: 'Early 6:00 AM dawn game drives catch predators at peak activity, followed by relaxed bush brunches.' }
  ];

  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-[#0A0A0A] text-black dark:text-white transition-colors duration-300">
      {/* Hero */}
      <section className="relative h-[54vh] min-h-[440px] sm:min-h-[480px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/4e/73/81/ngorongoro-crater-is.jpg?w=1400&h=900&s=1"
            alt="Iconic Destinations in Tanzania"
            className="w-full h-full object-cover object-center"
            loading="eager"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://s3.amazonaws.com/cdn.micato.com/wp-content/uploads/2018/09/07230312/serengeti-national-park-1.jpg'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/85"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4 sm:px-6">
          <span className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 bg-black/65 backdrop-blur-md rounded-xl sm:rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider sm:tracking-widest border border-brand-gold/50 mb-4 text-brand-gold max-w-full leading-snug">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" /> <span>25+ Protected Reserves & Coastal Havens</span>
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-3 tracking-tight">Tanzania <span className="text-brand-gold">Destinations</span></h1>
          <p className="text-white/85 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            From the endless horizon of the Serengeti to the crystal lagoons of Zanzibar — explore Tanzania's most celebrated ecosystems with Embuat Safaris.
          </p>
        </div>
      </section>

      <Destinations />

      {/* Safari Regions */}
      <section className="py-16 bg-neutral-50 dark:bg-[#121212]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-brand-gold font-bold text-xs uppercase tracking-widest">Safari Circuits</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2 text-black dark:text-white">
              Tanzania's Iconic <span className="text-brand-gold">Safari Regions</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-sm mt-2 font-light">
              Each geographic region presents a distinctive biosphere, unique wildlife behaviors, and bespoke safari moods.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {circuitPackages.map((c, i) => {
              const imgUrl = c.tour?.coverImage || c.tour?.image || c.defaultImage;
              return (
                <div key={i} className="flex flex-col sm:flex-row bg-white dark:bg-[#0A0A0A] rounded-3xl border border-black/10 dark:border-white/10 overflow-hidden hover:border-brand-gold hover:shadow-2xl transition-all group">
                  <div className="sm:w-2/5 h-60 sm:h-auto overflow-hidden relative bg-black shrink-0">
                    <img
                      src={imgUrl}
                      alt={c.tour?.name || c.circuit}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = c.defaultImage; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest bg-brand-gold text-white shadow-md">
                        {c.circuit}
                      </span>
                    </div>
                  </div>
                  <div className="sm:w-3/5 p-5 sm:p-6 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-brand-gold mb-1">
                        {c.tag}
                      </div>
                      <h3 className="font-serif font-bold text-black dark:text-white text-base sm:text-lg mb-1 leading-snug group-hover:text-brand-gold transition-colors">
                        {c.tour?.name || c.circuit}
                      </h3>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 font-semibold mb-2">
                        {c.parks}
                      </p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-3 leading-relaxed font-light line-clamp-2">
                        {c.tour?.description || c.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-2">
                      {c.tour?.fromPrice ? (
                        <div>
                          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">From</span>
                          <span className="text-sm font-bold text-brand-gold">${c.tour.fromPrice}</span>
                          <span className="text-[10px] text-neutral-400"> / person</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                          <Eye className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                          <span className="truncate text-[11px]">{c.wildlife}</span>
                        </div>
                      )}

                      {c.tour ? (
                        <Link
                          to={`/itinerary/${c.tour.id}`}
                          className="px-3.5 py-1.5 rounded-xl bg-black dark:bg-white/10 text-white hover:bg-brand-gold dark:hover:bg-brand-gold text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                        >
                          <span>View Package</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <Link
                          to="/tours"
                          className="px-3.5 py-1.5 rounded-xl bg-black dark:bg-white/10 text-white hover:bg-brand-gold dark:hover:bg-brand-gold text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                        >
                          <span>Explore Tours</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Seasonal Guide */}
      <section className="py-12 sm:py-16 bg-white dark:bg-[#0A0A0A] border-y border-black/10 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-brand-gold font-bold text-xs uppercase tracking-widest">When to Visit</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold mt-1.5 sm:mt-2 text-black dark:text-white">
              Seasonal <span className="text-brand-gold">Safari Guide</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 max-w-sm sm:max-w-6xl mx-auto">
            {seasons.map((s, i) => (
              <div key={i} className="p-3.5 sm:p-6 bg-neutral-50 dark:bg-[#121212] rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 hover:border-brand-gold hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-2 sm:mb-3">
                    <s.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-bold text-black dark:text-white text-xs sm:text-base mb-0.5 leading-snug">{s.label}</h3>
                  <p className="text-brand-gold text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5 sm:mb-2">{s.period}</p>
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 mb-2 sm:mb-3 font-medium">
                    <Thermometer className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-gold flex-shrink-0" />
                    <span>{s.temp}</span>
                  </div>
                </div>
                <p className="text-[10.5px] sm:text-xs text-neutral-600 dark:text-neutral-300 leading-snug sm:leading-relaxed font-light">{s.best}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="py-16 bg-neutral-50 dark:bg-[#121212]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-brand-gold font-bold text-xs uppercase tracking-widest">Traveler Wisdom</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2 text-black dark:text-white">
              Essential <span className="text-brand-gold">Travel Tips</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {travelTips.map((t, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white dark:bg-[#0A0A0A] rounded-2xl border border-black/10 dark:border-white/10 hover:border-brand-gold shadow-sm transition-all">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold flex-shrink-0 mt-0.5">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-black dark:text-white text-sm mb-1">{t.title}</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="py-10 sm:py-16 bg-black text-white border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <span className="text-brand-gold font-bold text-[10px] sm:text-xs uppercase tracking-widest">Wildlife Sanctuary</span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold mt-1.5 sm:mt-2 mb-5 sm:mb-8 text-white">
            Tanzania at a <span className="text-brand-gold">Glance</span>
          </h2>
          <div className="max-w-xs sm:max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-5">
            {[
              { val: '947,303 km²', label: 'National Territory' },
              { val: '22', label: 'Protected National Parks' },
              { val: '7', label: 'UNESCO World Heritage Sites' },
              { val: '1,100+', label: 'Recorded Bird Species' }
            ].map((s, i) => (
              <div key={i} className="p-3 sm:p-6 bg-[#121212] rounded-xl sm:rounded-2xl border border-white/10 flex flex-col items-center justify-center">
                <div className="text-base sm:text-2xl font-extrabold text-brand-gold leading-tight">{s.val}</div>
                <div className="text-[10px] sm:text-xs text-white/75 mt-1 font-medium leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brand-gold text-white text-center shadow-xl">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-2">Can't Decide Which Region to Explore?</h2>
          <p className="text-sm opacity-95 mb-6 max-w-md mx-auto font-light">Our native safari planners craft custom multi-region circuits linking bush expeditions with Zanzibar beaches.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white rounded-xl font-bold text-sm hover:bg-neutral-900 hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            Design My Custom Route <ArrowRight className="w-4 h-4 text-brand-gold" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DestinationsPage;

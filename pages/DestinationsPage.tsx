import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Thermometer, Eye, Compass, Cloud, Sun } from 'lucide-react';
import Destinations from '../components/Destinations';

const DestinationsPage = () => {
  const regions = [
    { name: 'Northern Circuit', parks: 'Serengeti, Ngorongoro, Tarangire, Manyara', desc: 'The iconic safari route offering the Big Five, tree-climbing lions, and the Great Wildebeest Migration.', image: 'https://safari56.com/wp-content/uploads/2026/08/Tarangire-Ngorongoro-Serengeti-Safari-1.jpg', wildlife: 'Lions, Elephants, Black Rhinos, Wildebeest, Leopards' },
    { name: 'Southern Wilderness', parks: 'Selous (Nyerere NP), Ruaha, Mikumi', desc: 'Vast, untouched river valleys and baobab woodlands with exceptional boat safaris and walking expeditions.', image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80', wildlife: 'African Wild Dogs, Sable Antelope, Hippos, Giant Crocodiles' },
    { name: 'Western Sanctuaries', parks: 'Mahale Mountains, Katavi, Gombe Stream', desc: 'Deep ancestral wilderness on the shores of Lake Tanganyika — Africa\'s premier wild chimpanzee trekking haven.', image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=800&q=80', wildlife: 'Habituated Chimpanzees, Red Colobus, Rare Primates' },
    { name: 'Zanzibar & Coast', parks: 'Stone Town, Nungwi, Jozani, Mnemba Atoll', desc: 'Pristine white sand beaches, UNESCO Swahili heritage, coral reefs, and world-class snorkeling.', image: 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/zanzibar-beach-view-1024x576.jpg', wildlife: 'Spinner Dolphins, Green Sea Turtles, Red Colobus Monkeys' }
  ];

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
            src="https://zaratanzaniaadventures.com/wp-content/uploads/2024/07/giraffe.jpg" 
            alt="Iconic Destinations in Tanzania" 
            className="w-full h-full object-cover object-[center_35%]" 
            loading="eager"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://safari56.com/wp-content/uploads/2026/08/Tarangire-Ngorongoro-Serengeti-Safari-1.jpg'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/85"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4 sm:px-6">
          <span className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 bg-black/65 backdrop-blur-md rounded-xl sm:rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider sm:tracking-widest border border-[#F97316]/50 mb-4 text-[#F97316] max-w-full leading-snug">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" /> <span>25+ Protected Reserves & Coastal Havens</span>
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-3 tracking-tight">Tanzania <span className="text-[#F97316]">Destinations</span></h1>
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
            <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Safari Circuits</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2 text-black dark:text-white">
              Tanzania's Iconic <span className="text-[#F97316]">Safari Regions</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-sm mt-2 font-light">
              Each geographic region presents a distinctive biosphere, unique wildlife behaviors, and bespoke safari moods.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {regions.map((r, i) => (
              <div key={i} className="flex flex-col sm:flex-row bg-white dark:bg-[#0A0A0A] rounded-3xl border border-black/10 dark:border-white/10 overflow-hidden hover:border-[#F97316] hover:shadow-xl transition-all group">
                <div className="sm:w-2/5 h-52 sm:h-auto overflow-hidden relative">
                  <img 
                    src={r.image} 
                    alt={r.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent sm:hidden"></div>
                </div>
                <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-black dark:text-white text-lg mb-1">{r.name}</h3>
                    <p className="text-xs text-[#F97316] font-bold uppercase tracking-wider mb-2">{r.parks}</p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-4 leading-relaxed font-light">{r.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 border-t border-black/10 dark:border-white/10 pt-3">
                    <Eye className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0" />
                    <span className="truncate">{r.wildlife}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Guide */}
      <section className="py-16 bg-white dark:bg-[#0A0A0A] border-y border-black/10 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">When to Visit</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2 text-black dark:text-white">
              Seasonal <span className="text-[#F97316]">Safari Guide</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {seasons.map((s, i) => (
              <div key={i} className="p-6 bg-neutral-50 dark:bg-[#121212] rounded-3xl border border-black/10 dark:border-white/10 hover:border-[#F97316] hover:shadow-lg transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316] mb-3">
                  <s.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-black dark:text-white text-base mb-0.5">{s.label}</h3>
                <p className="text-[#F97316] text-xs font-bold uppercase tracking-wider mb-2">{s.period}</p>
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mb-3 font-medium">
                  <Thermometer className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>{s.temp}</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">{s.best}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="py-16 bg-neutral-50 dark:bg-[#121212]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Traveler Wisdom</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2 text-black dark:text-white">
              Essential <span className="text-[#F97316]">Travel Tips</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {travelTips.map((t, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white dark:bg-[#0A0A0A] rounded-2xl border border-black/10 dark:border-white/10 hover:border-[#F97316] shadow-sm transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316] flex-shrink-0 mt-0.5">
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
      <section className="py-16 bg-black text-white border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Wildlife Sanctuary</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2 mb-8 text-white">
            Tanzania at a <span className="text-[#F97316]">Glance</span>
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { val: '947,303 km²', label: 'National Territory' },
              { val: '22', label: 'Protected National Parks' },
              { val: '7', label: 'UNESCO World Heritage Sites' },
              { val: '1,100+', label: 'Recorded Bird Species' }
            ].map((s, i) => (
              <div key={i} className="p-6 bg-[#121212] rounded-2xl border border-white/10">
                <div className="text-xl sm:text-2xl font-extrabold text-[#F97316]">{s.val}</div>
                <div className="text-xs text-white/75 mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[#F97316] text-white text-center shadow-xl">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-2">Can't Decide Which Region to Explore?</h2>
          <p className="text-sm opacity-95 mb-6 max-w-md mx-auto font-light">Our native safari planners craft custom multi-region circuits linking bush expeditions with Zanzibar beaches.</p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white rounded-xl font-bold text-sm hover:bg-neutral-900 hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            Design My Custom Route <ArrowRight className="w-4 h-4 text-[#F97316]" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DestinationsPage;

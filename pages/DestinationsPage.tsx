import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Thermometer, Eye, Star, Compass, Cloud, Sun, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen pt-20 bg-[#FAF7F2] dark:bg-[#120F0D] text-gray-800 dark:text-[#E8E1D9] transition-colors duration-300">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[380px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=2072" 
            alt="Destinations in Tanzania" 
            className="w-full h-full object-cover" 
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4 sm:px-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[#DE6826]/30 via-[#D48B28]/30 to-[#C08240]/30 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-widest border border-[#D48B28]/40 mb-4 text-[#F5C478]">
            <MapPin className="w-3.5 h-3.5" /> 25+ Protected Reserves & Coastal Havens
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-3 tracking-tight">Tanzania Destinations</h1>
          <p className="text-white/85 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            From the endless horizon of the Serengeti to the crystal lagoons of Zanzibar — explore Tanzania's most celebrated ecosystems with Embuat Safaris.
          </p>
        </div>
      </section>

      <Destinations />

      {/* Safari Regions */}
      <section className="py-16 bg-[#FAF7F2] dark:bg-[#120F0D]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-[#DE6826] dark:text-[#F5C478] font-bold text-xs uppercase tracking-widest">Safari Circuits</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2 text-gray-900 dark:text-white">
              Tanzania's Iconic <span className="bg-gradient-to-r from-[#DE6826] to-[#C08240] bg-clip-text text-transparent">Safari Regions</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm mt-2 font-light">
              Each geographic region presents a distinctive biosphere, unique wildlife behaviors, and bespoke safari moods.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {regions.map((r, i) => (
              <div key={i} className="flex flex-col sm:flex-row bg-white dark:bg-[#1B1613] rounded-3xl border border-amber-900/10 dark:border-[#2C241E] overflow-hidden hover:border-[#DE6826]/40 hover:shadow-xl transition-all group">
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
                    <h3 className="font-serif font-bold text-gray-900 dark:text-white text-lg mb-1">{r.name}</h3>
                    <p className="text-xs text-[#DE6826] dark:text-[#F5C478] font-bold uppercase tracking-wider mb-2">{r.parks}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 leading-relaxed font-light">{r.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 border-t border-amber-900/10 dark:border-[#2C241E] pt-3">
                    <Eye className="w-3.5 h-3.5 text-[#DE6826] flex-shrink-0" />
                    <span className="truncate">{r.wildlife}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Guide */}
      <section className="py-16 bg-white dark:bg-[#1B1613] border-y border-amber-900/10 dark:border-[#2C241E]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-[#DE6826] dark:text-[#F5C478] font-bold text-xs uppercase tracking-widest">When to Visit</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2 text-gray-900 dark:text-white">
              Seasonal <span className="bg-gradient-to-r from-[#DE6826] to-[#C08240] bg-clip-text text-transparent">Safari Guide</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {seasons.map((s, i) => (
              <div key={i} className="p-6 bg-[#FAF7F2] dark:bg-[#120F0D] rounded-3xl border border-amber-900/10 dark:border-[#2C241E] hover:border-[#DE6826]/40 hover:shadow-lg transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DE6826]/15 to-[#C08240]/15 flex items-center justify-center text-[#DE6826] dark:text-[#F5C478] mb-3">
                  <s.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base mb-0.5">{s.label}</h3>
                <p className="text-[#DE6826] dark:text-[#F5C478] text-xs font-bold uppercase tracking-wider mb-2">{s.period}</p>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium">
                  <Thermometer className="w-3.5 h-3.5 text-[#DE6826]" />
                  <span>{s.temp}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-light">{s.best}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="py-16 bg-[#FAF7F2] dark:bg-[#120F0D]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-[#DE6826] dark:text-[#F5C478] font-bold text-xs uppercase tracking-widest">Traveler Wisdom</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2 text-gray-900 dark:text-white">
              Essential <span className="bg-gradient-to-r from-[#DE6826] to-[#C08240] bg-clip-text text-transparent">Travel Tips</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {travelTips.map((t, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white dark:bg-[#1B1613] rounded-2xl border border-amber-900/10 dark:border-[#2C241E] hover:border-[#DE6826]/40 shadow-sm transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DE6826]/15 to-[#C08240]/15 flex items-center justify-center text-[#DE6826] dark:text-[#F5C478] flex-shrink-0 mt-0.5">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{t.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-light">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="py-16 bg-white dark:bg-[#1B1613] border-t border-amber-900/10 dark:border-[#2C241E]">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <span className="text-[#DE6826] dark:text-[#F5C478] font-bold text-xs uppercase tracking-widest">Wildlife Sanctuary</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2 mb-8 text-gray-900 dark:text-white">
            Tanzania at a <span className="bg-gradient-to-r from-[#DE6826] to-[#C08240] bg-clip-text text-transparent">Glance</span>
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { val: '947,303 km²', label: 'National Territory' },
              { val: '22', label: 'Protected National Parks' },
              { val: '7', label: 'UNESCO World Heritage Sites' },
              { val: '1,100+', label: 'Recorded Bird Species' }
            ].map((s, i) => (
              <div key={i} className="p-6 bg-[#FAF7F2] dark:bg-[#120F0D] rounded-2xl border border-amber-900/10 dark:border-[#2C241E]">
                <div className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-[#DE6826] via-[#D48B28] to-[#C08240] bg-clip-text text-transparent">{s.val}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-gradient-to-r from-[#DE6826] via-[#D48B28] to-[#C08240] text-white text-center shadow-xl">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-2">Can't Decide Which Region to Explore?</h2>
          <p className="text-sm opacity-95 mb-6 max-w-md mx-auto font-light">Our native safari planners craft custom multi-region circuits linking bush expeditions with Zanzibar beaches.</p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            Design My Custom Route <ArrowRight className="w-4 h-4 text-[#F5C478]" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DestinationsPage;

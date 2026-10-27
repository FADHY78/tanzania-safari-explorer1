import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Thermometer, Eye, Star, Compass, Cloud, Sun } from 'lucide-react';
import Destinations from '../components/Destinations';

const DestinationsPage = () => {
  const regions = [
    { name: 'Northern Circuit', parks: 'Serengeti, Ngorongoro, Tarangire, Manyara', desc: 'The classic safari route offering the Big Five and the Great Migration.', image: 'https://images.unsplash.com/photo-1534177714502-0fa41e7293d0?q=80&w=800', wildlife: 'Lions, Elephants, Wildebeest, Zebras' },
    { name: 'Southern Parks', parks: 'Selous, Ruaha, Mikumi', desc: 'Off-the-beaten-path wilderness with fewer crowds and raw adventure.', image: 'https://images.unsplash.com/photo-1549194382-246df0824362?q=80&w=800', wildlife: 'Wild Dogs, Hippos, Crocodiles, Buffalo' },
    { name: 'Western Tanzania', parks: 'Mahale, Katavi, Gombe', desc: 'Chimpanzee trekking and untouched remote wilderness.', image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=800', wildlife: 'Chimpanzees, Primates, Rare Birds' },
    { name: 'Zanzibar & Coastal', parks: 'Stone Town, Jozani, Mnemba Atoll', desc: 'White sand beaches, coral reefs, and rich Swahili culture.', image: 'https://images.unsplash.com/photo-1583421664367-15c7cfd6f0f6?q=80&w=800', wildlife: 'Dolphins, Sea Turtles, Red Colobus Monkeys' }
  ];

  const seasons = [
    { period: 'Jan – Mar', label: 'Green Season', temp: '25–30°C', best: 'Calving season in Serengeti, fewer tourists, lush landscapes', icon: Cloud },
    { period: 'Apr – May', label: 'Long Rains', temp: '22–28°C', best: 'Lowest prices, birding paradise, dramatic storm photography', icon: Cloud },
    { period: 'Jun – Oct', label: 'Dry Season', temp: '20–27°C', best: 'Peak wildlife viewing, Migration crossings, best weather', icon: Sun },
    { period: 'Nov – Dec', label: 'Short Rains', temp: '23–29°C', best: 'Migration returns south, baby animals, wildflowers bloom', icon: Cloud }
  ];

  const travelTips = [
    { title: 'Pack Light & Smart', desc: 'Neutral colors, layered clothing, binoculars, and a good camera with zoom lens.' },
    { title: 'Health Precautions', desc: 'Yellow fever certificate required. Malaria prophylaxis recommended for all regions.' },
    { title: 'Best Time to Visit', desc: 'June–October for dry season. December–March for migration calving.' },
    { title: 'Currency & Tips', desc: 'Tanzanian Shilling (TZS). USD widely accepted. Tip guides $15–20/day per traveler.' },
    { title: 'Visa Information', desc: 'Most nationalities get visa on arrival ($50 USD). E-visa also available online.' },
    { title: 'What to Expect', desc: 'Early 6am starts, bumpy roads, incredible sunsets, and unforgettable wildlife moments.' }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=2072" alt="Destinations" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-widest border border-white/20 mb-4">
            <MapPin className="w-3.5 h-3.5" /> 25+ Destinations Across Tanzania
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3">Explore Destinations</h1>
          <p className="text-white/80 text-sm md:text-base">From the vast Serengeti plains to the turquoise waters of Zanzibar — every corner of Tanzania offers a unique, unforgettable experience.</p>
        </div>
      </section>

      <Destinations />

      {/* Safari Regions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#C08240] font-semibold text-xs uppercase tracking-widest">Safari Circuits</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2">Tanzania's <span className="text-[#C08240]">Safari Regions</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm mt-2">Each region offers a distinct character — choose one or combine several for the ultimate Tanzanian adventure.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {regions.map((r, i) => (
              <div key={i} className="flex flex-col sm:flex-row bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden">
                  <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="sm:w-3/5 p-5">
                  <h3 className="font-bold text-gray-800 text-base mb-1">{r.name}</h3>
                  <p className="text-xs text-[#C08240] font-semibold mb-2">{r.parks}</p>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">{r.desc}</p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Eye className="w-3 h-3" />{r.wildlife}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Guide */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#C08240] font-semibold text-xs uppercase tracking-widest">When to Visit</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2">Seasonal <span className="text-[#C08240]">Safari Guide</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {seasons.map((s, i) => (
              <div key={i} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#C08240]/30 hover:shadow-md transition-all">
                <s.icon className="w-6 h-6 text-[#C08240] mb-2" />
                <h3 className="font-bold text-gray-800 text-sm">{s.label}</h3>
                <p className="text-[#C08240] text-xs font-semibold mb-1">{s.period}</p>
                <div className="flex items-center gap-1 text-xs text-gray-400 mb-2"><Thermometer className="w-3 h-3" />{s.temp}</div>
                <p className="text-xs text-gray-500 leading-relaxed">{s.best}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#C08240] font-semibold text-xs uppercase tracking-widest">Traveler Info</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2">Essential <span className="text-[#C08240]">Travel Tips</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {travelTips.map((t, i) => (
              <div key={i} className="flex gap-3 p-4 bg-white rounded-xl border border-gray-100">
                <Compass className="w-5 h-5 text-[#C08240] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-1">{t.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map placeholder */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-6 text-center">
          <span className="text-[#C08240] font-semibold text-xs uppercase tracking-widest">Overview</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-6">Tanzania at a <span className="text-[#C08240]">Glance</span></h2>
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: '947,303 km²', label: 'Total Area' },
              { val: '16', label: 'National Parks' },
              { val: '4+', label: 'UNESCO Sites' },
              { val: '1,100+', label: 'Bird Species' }
            ].map((s, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-lg font-bold text-[#C08240]">{s.val}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-[#C08240] to-[#A67134] text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Can't Decide? We'll Help!</h2>
          <p className="text-sm opacity-90 mb-5 max-w-md mx-auto">Our experts will craft the perfect multi-destination itinerary for you.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3 bg-white text-gray-800 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all">
            Plan My Trip <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DestinationsPage;

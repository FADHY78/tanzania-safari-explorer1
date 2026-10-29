import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface DestinationItem {
  name: string;
  description: string;
  image: string;
  tag: string;
  link: string;
  highlights: string;
}

const Destinations: React.FC = () => {
  const { t } = useLanguage();
  const destinations: DestinationItem[] = [
    {
      name: "Serengeti National Park",
      description: "Infinite savannah plains hosting the world-famous Great Migration and the highest concentration of big cat predators.",
      image: "https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Serengeti-34.jpg",
      tag: "The Icon",
      link: "/tours?category=Safari",
      highlights: "Great Migration • Lions • Leopards"
    },
    {
      name: "Ngorongoro Crater",
      description: "A prehistoric Eden inside a massive collapsed caldera, sheltering over 25,000 animals including the endangered black rhino.",
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
      tag: "World Wonder",
      link: "/tours?category=Safari",
      highlights: "UNESCO Caldera • Black Rhino • Flamingos"
    },
    {
      name: "Mount Kilimanjaro",
      description: "Africa's highest peak and the world's tallest free-standing mountain, rising 5,895 meters above the East African plains.",
      image: "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?auto=format&fit=crop&w=800&q=80",
      tag: "Roof of Africa",
      link: "/tours?category=Trekking",
      highlights: "Uhuru Peak 5,895m • Machame • Lemosho"
    },
    {
      name: "Zanzibar Archipelago",
      description: "Ancient UNESCO Stone Town alleyways meet powdery white beaches, turquoise Indian Ocean waters, and spice plantations.",
      image: "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/zanzibar-beach-view-1024x576.jpg",
      tag: "Tropical Paradise",
      link: "/tours?category=Zanzibar",
      highlights: "Pristine Beaches • Spice Tour • Coral Reefs"
    },
    {
      name: "Tarangire National Park",
      description: "The land of giants—ancient multi-millennial Baobab trees and Tanzania's densest concentration of elephant herds.",
      image: "https://zaratanzaniaadventures.com/wp-content/uploads/2024/07/elep.jpg",
      tag: "Elephant Haven",
      link: "/tours?category=Safari",
      highlights: "Giant Baobabs • Massive Herds • Silale Swamp"
    },
    {
      name: "Arusha & Waterfalls",
      description: "Lush montane rainforests of Mount Meru, thundering Materuni cascades, Chagga coffee groves, and azure Chemka hot springs.",
      image: "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/MATERUNI-DT.jpg",
      tag: "Day Adventures",
      link: "/tours?category=Day%20Trips",
      highlights: "Materuni Falls • Chemka Springs • Walking Safaris"
    }
  ];

  return (
    <section id="destinations" className="py-20 bg-white dark:bg-[#0A0A0A] transition-colors">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <h4 className="text-[#F97316] font-bold tracking-widest uppercase text-xs bg-[#F97316]/10 border border-[#F97316]/25 px-4 py-1.5 rounded-full">
              Legendary Landscapes
            </h4>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-black dark:text-white mb-4 sm:mb-5">
            Explore the Realms of <span className="text-[#F97316]">Tanzania</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm md:text-base leading-relaxed">
            From the endless savannahs of the north to the spice-scented air of the Indian Ocean, discover the diverse ecosystems that make Tanzania the crown jewel of Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <Link
              to={dest.link}
              key={i}
              className="group relative h-[440px] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-black block border border-black/10 dark:border-white/10 hover:border-[#F97316]"
            >
              <img 
                src={dest.image} 
                alt={dest.name} 
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent group-hover:from-black transition-all duration-500"></div>
              
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
                <span className="bg-[#F97316]/90 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-full shadow-lg border border-white/20 leading-tight inline-block">
                  {dest.tag}
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                <div className="text-[10px] sm:text-[11px] font-semibold text-[#F97316] mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{dest.highlights}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 font-serif group-hover:text-[#F97316] transition-colors duration-300">
                  {dest.name}
                </h3>
                <p className="text-white/80 text-xs leading-relaxed mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                  {dest.description}
                </p>
                <div className="flex items-center gap-2 text-[#F97316] font-bold text-xs uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
                  <span>{t('home.hero.explore')}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;

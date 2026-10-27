import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

interface DestinationItem {
  name: string;
  description: string;
  image: string;
  tag: string;
  link: string;
  highlights: string;
}

const Destinations: React.FC = () => {
  const destinations: DestinationItem[] = [
    {
      name: "Serengeti National Park",
      description: "Infinite savannah plains hosting the world-famous Great Migration and the highest concentration of big cat predators.",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
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
    <section id="destinations" className="py-20 bg-white dark:bg-[#120F0D] transition-colors">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <h4 className="text-[#C08240] font-bold tracking-widest uppercase text-xs bg-[#C08240]/10 px-4 py-1.5 rounded-full">
              Legendary Landscapes
            </h4>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4 sm:mb-5">
            Explore the Realms of <span className="text-[#C08240]">Tanzania</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
            From the endless savannahs of the north to the spice-scented air of the Indian Ocean, discover the diverse ecosystems that make Tanzania the crown jewel of Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <Link
              to={dest.link}
              key={i}
              className="group relative h-[440px] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gray-900 block"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent group-hover:from-black/95 transition-all duration-500"></div>
              
              <div className="absolute top-5 left-5">
                <span className="bg-[#C08240] text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg">
                  {dest.tag}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-[11px] font-semibold text-[#F3C082] mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{dest.highlights}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 font-serif group-hover:text-[#F3C082] transition-colors duration-300">
                  {dest.name}
                </h3>
                <p className="text-white/75 text-xs leading-relaxed mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                  {dest.description}
                </p>
                <div className="flex items-center gap-2 text-[#C08240] font-bold text-xs uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
                  <span>Explore Tours</span>
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

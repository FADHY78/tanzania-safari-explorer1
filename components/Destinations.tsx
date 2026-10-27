
import React from 'react';

const Destinations: React.FC = () => {
  const destinations = [
    {
      name: "Serengeti",
      description: "Infinite plains hosting the Great Migration and the highest concentration of predators.",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
      tag: "The Icon"
    },
    {
      name: "Ngorongoro",
      description: "A prehistoric Eden inside a collapsed volcano, home to the rare Black Rhino.",
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
      tag: "World Wonder"
    },
    {
      name: "Zanzibar",
      description: "Ancient Stone Town culture meets turquoise waters and powdery white sands.",
      image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80",
      tag: "Tropical Paradise"
    },
    {
      name: "Tarangire",
      description: "The land of giants—ancient Baobab trees and massive elephant herds.",
      image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=800&q=80",
      tag: "Elephant Haven"
    }
  ];

  return (
    <section id="destinations" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4">
            <h4 className="text-[#C08240] font-bold tracking-widest uppercase text-sm bg-[#C08240]/10 px-4 py-2 rounded-full">Legendary Landscapes</h4>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Explore the Realms of Tanzania</h2>
          <p className="text-gray-600 text-lg">
            From the endless savannahs of the north to the spice-scented air of the Indian Ocean, discover the diverse ecosystems that make Tanzania the crown jewel of Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, i) => (
            <div key={i} className="group relative h-[480px] rounded-[2rem] overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/95 transition-all duration-500"></div>
              <div className="absolute top-6 left-6">
                <span className="bg-[#C08240] text-white text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full shadow-lg">
                  {dest.tag}
                </span>
              </div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-3xl font-bold mb-3 font-serif group-hover:text-[#C08240] transition-colors duration-300">{dest.name}</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {dest.description}
                </p>
                <div className="flex items-center gap-2 text-[#C08240] font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all duration-300">
                  <span>Explore Parks</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;

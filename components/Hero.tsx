
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Tanzania Wildlife" 
          className="w-full h-full object-cover animate-[zoom_30s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-3xl animate-[fadeInUp_1s_ease-out]">
          <div className="inline-block px-5 py-2 bg-[#C08240]/20 backdrop-blur-sm border border-[#C08240]/40 rounded-full mb-6 shadow-lg">
            <span className="text-[#C08240] font-semibold text-sm uppercase tracking-widest">✦ The Ultimate African Adventure ✦</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] drop-shadow-2xl">
            Discover Tanzania: Where <span className="text-[#C08240] animate-pulse">Safari Dreams</span> Come True
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl font-light">
            Experience the majestic Great Migration in the Serengeti, the prehistoric beauty of Ngorongoro, and the turquoise waters of Zanzibar. Authentic, ethical, and unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#tours" 
              className="bg-[#C08240] text-white text-center px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#A66F35] transition-all transform hover:-translate-y-1 shadow-2xl"
            >
              Explore Safaris
            </a>
            <a 
              href="#contact" 
              className="bg-white/10 backdrop-blur-md text-white border border-white/30 text-center px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-black transition-all transform hover:-translate-y-1"
            >
              Contact Us
            </a>
          </div>
          
          <div className="mt-16 flex items-center gap-8 text-white/70">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img key={i} className="w-10 h-10 rounded-full border-2 border-white shadow-md" src={`https://picsum.photos/id/${i+50}/100/100`} alt="User" />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-[#C08240] flex items-center justify-center text-xs font-bold text-white shadow-md">+2k</div>
            </div>
            <p className="text-sm">
              <span className="font-bold text-white text-base">4.9/5 Rating</span> from 2,000+ happy travelers
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-white/40 text-xs uppercase tracking-widest mb-2 font-medium">Scroll to Explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;

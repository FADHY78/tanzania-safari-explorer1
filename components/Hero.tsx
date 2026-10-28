import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Star } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background Image with Dynamic Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/LION-IN-NGORONGORO-1-1.jpeg" 
          alt="Embuat Safaris Wildlife Tanzania" 
          className="w-full h-full object-cover animate-[zoom_30s_ease-in-out_infinite_alternate]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Serengeti-34.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#120F0D]/90 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-24 sm:pt-28 pb-16">
        <div className="max-w-3xl animate-[fadeInUp_1s_ease-out]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[#DE6826]/30 via-[#D48B28]/30 to-[#C08240]/30 backdrop-blur-md border border-[#D48B28]/40 rounded-full mb-6 shadow-lg">
            <Compass className="w-4 h-4 text-[#F5C478]" />
            <span className="text-[#F5C478] font-bold text-xs uppercase tracking-widest notranslate" translate="no">Explore • Experience • Preserve</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold text-white mb-6 leading-[1.08] drop-shadow-2xl">
            Where African <span className="bg-gradient-to-r from-[#F5C478] via-[#DE6826] to-[#C08240] bg-clip-text text-transparent">Safari Dreams</span> Truly Awaken
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/85 mb-8 sm:mb-10 leading-relaxed max-w-2xl font-light">
            Private 4x4 expeditions through the Serengeti plains, Ngorongoro Crater, Mount Kilimanjaro, and the spice-island shores of Zanzibar with native Tanzanian guides.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
            <Link 
              to="/tours" 
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#DE6826] via-[#D48B28] to-[#C08240] text-white px-8 py-4 rounded-2xl font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-[#DE6826]/40 hover:scale-[1.02] active:scale-95 transition-all text-center"
            >
              <span>Explore All 84 Tours</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-white hover:text-gray-900 transition-all text-center"
            >
              <span>Tailor-Made Quote</span>
            </Link>
          </div>
          
          <div className="mt-12 sm:mt-16 flex flex-wrap items-center gap-6 text-white/80">
            <div className="flex -space-x-3">
              {[
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
              ].map((src, i) => (
                <img 
                  key={i} 
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-md" 
                  src={src} 
                  alt="Guest Reviewer" 
                />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-r from-[#DE6826] to-[#C08240] flex items-center justify-center text-xs font-bold text-white shadow-md">
                +5k
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#F5C478]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-white/80 font-medium mt-0.5">
                <span className="font-bold text-white">4.9/5 Rating</span> from 5,000+ worldwide travelers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center opacity-70">
        <span className="text-white/60 text-[10px] uppercase tracking-widest mb-2 font-medium">Scroll to explore</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-[#F5C478] to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;

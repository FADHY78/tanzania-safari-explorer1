import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, MountainSnow, Palmtree, Eye, LucideIcon } from 'lucide-react';

const About: React.FC = () => {
  const highlights: { title: string; desc: string; icon: LucideIcon }[] = [
    { title: "Serengeti NP", desc: "Witness the Great Wildebeest Migration, the world's largest land mammal spectacle.", icon: Eye },
    { title: "Ngorongoro Crater", desc: "Descend into the world's largest intact volcanic caldera, teeming with the Big Five.", icon: Compass },
    { title: "Mount Kilimanjaro", desc: "Stand before the Roof of Africa, the world's highest free-standing mountain.", icon: MountainSnow },
    { title: "Zanzibar Island", desc: "Unwind on powdery white-sand beaches with turquoise spice-island waters.", icon: Palmtree }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-[#FAF7F2] to-white dark:from-[#120F0D] dark:to-[#1B1613] relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2 relative group w-full flex items-center justify-center">
            {/* Outer Subtle Rotating Orbit Accent */}
            <div className="absolute w-[310px] h-[310px] sm:w-[410px] sm:h-[410px] md:w-[450px] md:h-[450px] rounded-full border-2 border-dashed border-[#DE6826]/30 -z-10 animate-spin" style={{ animationDuration: '60s' }}></div>

            {/* Ambient Glow */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] rounded-full bg-gradient-to-tr from-[#DE6826]/30 via-[#D48B28]/25 to-[#C08240]/30 blur-3xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Seamless Circular Logo Medallion */}
            <div className="relative z-10 w-72 h-72 sm:w-88 sm:h-88 md:w-[410px] md:h-[410px] aspect-square rounded-full overflow-hidden shadow-2xl ring-4 sm:ring-8 ring-[#C08240]/40 border-4 border-white dark:border-[#2C241E] bg-[#F9F8F6] flex items-center justify-center group-hover:shadow-[0_20px_50px_rgba(222,104,38,0.3)] transition-all duration-500">
              <img 
                src="/embuat-safaris-logo.jpg" 
                alt="Embuat Safaris Official Logo" 
                className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/embuat-safaris-logo.jpg';
                }}
              />
            </div>

            {/* Floating Brand Badge */}
            <div className="absolute -bottom-3 sm:-bottom-4 z-20 px-4 py-1.5 sm:px-5 sm:py-2 bg-white/95 dark:bg-[#1B1613]/95 backdrop-blur-md rounded-full shadow-lg border border-[#C08240]/40 flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-900 dark:text-white transform group-hover:-translate-y-1 transition-transform">
              <span className="w-2 h-2 rounded-full bg-[#DE6826] animate-pulse"></span>
              <span className="notranslate" translate="no">Embuat Safaris • Arusha</span>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="inline-block mb-4">
              <span className="text-[#DE6826] dark:text-[#F5C478] font-bold tracking-widest uppercase text-xs sm:text-sm bg-[#DE6826]/10 dark:bg-[#DE6826]/20 px-4 py-2 rounded-full border border-[#DE6826]/20 notranslate" translate="no">
                Explore • Experience • Preserve
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6 leading-tight text-gray-900 dark:text-white">
              Why Choose <br /> <span className="bg-gradient-to-r from-[#DE6826] via-[#D48B28] to-[#C08240] bg-clip-text text-transparent">Embuat Safaris?</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-8 leading-relaxed font-light">
              Tanzania is the crown jewel of African safari realms — blessed with the vast Serengeti plains, the ancient caldera of Ngorongoro, the snows of Kilimanjaro, and the idyllic turquoise shores of Zanzibar. At Embuat Safaris, every itinerary is designed for pure authenticity, luxury comfort, and positive conservation impact.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {highlights.map((h, i) => (
                <div key={i} className="flex gap-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1B1613] shadow-sm hover:shadow-md transition-all duration-300 border border-amber-900/10 dark:border-[#2C241E] hover:border-[#DE6826]/40 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DE6826]/10 to-[#C08240]/10 flex items-center justify-center text-[#DE6826] dark:text-[#F5C478] flex-shrink-0 group-hover:scale-110 transition-transform">
                    <h.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-1 group-hover:text-[#DE6826] dark:group-hover:text-[#F5C478] transition-colors">{h.title}</h5>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Link 
              to="/about" 
              className="mt-8 sm:mt-10 inline-flex items-center gap-2 text-[#DE6826] dark:text-[#F5C478] font-bold hover:gap-4 transition-all text-sm sm:text-base group"
            >
              <span>Read Our Full Story</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

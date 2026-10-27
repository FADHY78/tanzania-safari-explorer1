import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

const SafariPlanning: React.FC = () => {
  return (
    <section id="planning" className="py-20 sm:py-24 bg-gradient-to-br from-[#1B1613] via-[#120F0D] to-[#251E19] text-white relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#DE6826]/10 to-[#C08240]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          <div className="lg:w-1/2">
            <span className="text-[#DE6826] dark:text-[#F5C478] font-bold tracking-widest uppercase text-xs sm:text-sm bg-[#DE6826]/20 px-4 py-1.5 rounded-full border border-[#DE6826]/30 inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#F5C478]" /> Safari Insights & Wisdom
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-8 leading-tight">
              Exclusive Safari <br />
              <span className="bg-gradient-to-r from-[#F5C478] via-[#DE6826] to-[#C08240] bg-clip-text text-transparent">Planning Intelligence</span>
            </h2>
            
            <div className="space-y-6 sm:space-y-8">
              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-[#DE6826] to-[#C08240] rounded-2xl flex items-center justify-center font-extrabold text-white shadow-lg text-lg">1</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1 text-white">Family & Group Savings</h3>
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-light">
                    Traveling with family or companions? Enjoy private 4x4 vehicle exclusive buyouts and <span className="text-[#F5C478] font-bold">up to 15% off</span> per traveler on multi-day Northern Circuit circuits.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-[#DE6826] to-[#C08240] rounded-2xl flex items-center justify-center font-extrabold text-white shadow-lg text-lg">2</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1 text-white">Green Season Value (April & May)</h3>
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-light">
                    Experience dramatic thunderstorm light, lush green savannahs, newborn animals, and fewer crowds with premium lodge savings of <span className="text-[#F5C478] font-bold">$200+ off</span> standard peak rates.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-[#DE6826] to-[#C08240] rounded-2xl flex items-center justify-center font-extrabold text-white shadow-lg text-lg">3</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1 text-white">Optimal Great Migration Timing</h3>
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-light">
                    For iconic river crossings, target July to October in Northern Serengeti. For predator chases and 8,000 daily births, target January to March in Ndutu.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 bg-white/5 backdrop-blur-md p-6 sm:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl w-full">
            <h3 className="text-xl sm:text-2xl font-serif font-bold mb-6 text-white">Expert Bush Protocols</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#DE6826]/20 to-[#C08240]/20 flex items-center justify-center text-[#F5C478] flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-sm sm:text-base text-white">Pack Light Soft Luggage</p>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">Bush flights enforce 15kg soft bag limits. Bring neutral khakis/olives and avoid dark blue or black in tsetse-fly woodlands.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#DE6826]/20 to-[#C08240]/20 flex items-center justify-center text-[#F5C478] flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-sm sm:text-base text-white">Health & Flying Doctors</p>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">All Embuat Safaris guests receive AMREF Flying Doctors emergency bush medical evacuation coverage automatically.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#DE6826]/20 to-[#C08240]/20 flex items-center justify-center text-[#F5C478] flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-sm sm:text-base text-white">Respectful Wildlife & Village Photography</p>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">We adhere to Tanzania National Parks code of conduct — no off-roading, no feeding animals, and always honor Maasai customs.</p>
                </div>
              </li>
            </ul>
            <Link 
              to="/contact" 
              className="mt-8 block w-full text-center bg-gradient-to-r from-[#DE6826] via-[#D48B28] to-[#C08240] text-white py-4 rounded-2xl font-bold text-sm sm:text-base hover:shadow-xl transition-all"
            >
              Request Custom Safari Itinerary
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafariPlanning;

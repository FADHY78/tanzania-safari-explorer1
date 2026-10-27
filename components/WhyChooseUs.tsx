import React from 'react';
import { Compass, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      title: "Expert Native Guides",
      description: "Our certified guides average 12+ years in the bush with deep knowledge of animal behavior, tracking, and local ecology.",
      icon: Compass
    },
    {
      title: "Sustainable Tourism",
      description: "We partner exclusively with low-impact camps and channel 5% of all proceeds directly to Serengeti wildlife conservation.",
      icon: HeartHandshake
    },
    {
      title: "Uncompromising Safety",
      description: "Custom-built 4x4 Land Cruisers with pop-up roofs, GPS trackers, satellite radios, and first-aid kits on every single expedition.",
      icon: ShieldCheck
    },
    {
      title: "Bespoke Itineraries",
      description: "No cookie-cutter packages. Every journey is customized around your personal interests, travel rhythm, and dream encounters.",
      icon: Sparkles
    }
  ];

  return (
    <section id="why-us" className="py-20 sm:py-24 bg-gradient-to-b from-[#FAF7F2] to-white dark:from-[#120F0D] dark:to-[#1B1613] relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-br from-[#DE6826]/10 to-[#C08240]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="lg:w-1/3">
            <div className="inline-block mb-4">
              <span className="text-[#DE6826] dark:text-[#F5C478] font-bold tracking-widest uppercase text-xs sm:text-sm bg-[#DE6826]/10 dark:bg-[#DE6826]/20 px-4 py-1.5 rounded-full border border-[#DE6826]/20">
                The Embuat Difference
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6 leading-tight text-gray-900 dark:text-white">
              Committed to <br className="hidden lg:block" /> 
              <span className="bg-gradient-to-r from-[#DE6826] via-[#D48B28] to-[#C08240] bg-clip-text text-transparent">Excellence</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-8 leading-relaxed font-light">
              We know a safari is rarely an ordinary trip — it's often a lifelong dream. Our Arusha-based team handles every transfer, lodge, and game drive with meticulous precision.
            </p>
            <div className="p-6 bg-white dark:bg-[#1B1613] rounded-2xl border border-amber-900/10 dark:border-[#2C241E] shadow-sm">
              <p className="font-bold text-gray-900 dark:text-white mb-2 text-sm uppercase tracking-wider">Accredited Member of:</p>
              <div className="flex flex-wrap gap-4 items-center text-xs font-extrabold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                <span className="px-3 py-1 bg-amber-500/10 rounded-lg text-[#DE6826] dark:text-[#F5C478]">TATO Certified</span>
                <span className="px-3 py-1 bg-amber-500/10 rounded-lg text-[#DE6826] dark:text-[#F5C478]">Tanzania Tourist Board</span>
              </div>
            </div>
          </div>
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {features.map((f, i) => (
              <div key={i} className="group p-6 sm:p-8 bg-white dark:bg-[#1B1613] rounded-3xl border border-amber-900/10 dark:border-[#2C241E] hover:border-[#DE6826]/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-[#DE6826]/15 via-[#D48B28]/15 to-[#C08240]/15 rounded-2xl flex items-center justify-center text-[#DE6826] dark:text-[#F5C478] mb-6 shadow-sm group-hover:from-[#DE6826] group-hover:to-[#C08240] group-hover:text-white transition-all duration-300 group-hover:scale-105">
                  <f.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-[#DE6826] dark:group-hover:text-[#F5C478] transition-colors">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

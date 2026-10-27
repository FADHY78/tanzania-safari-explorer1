import React from 'react';
import { ShieldCheck, HeartHandshake, Leaf, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Sustainability: React.FC = () => {
  const { t } = useLanguage();

  const pillars = [
    {
      title: t('purpose.pillar1.title'),
      desc: t('purpose.pillar1.desc'),
      icon: ShieldCheck,
      stat: t('purpose.pillar1.stat'),
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: t('purpose.pillar2.title'),
      desc: t('purpose.pillar2.desc'),
      icon: HeartHandshake,
      stat: t('purpose.pillar2.stat'),
      image: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: t('purpose.pillar3.title'),
      desc: t('purpose.pillar3.desc'),
      icon: Leaf,
      stat: t('purpose.pillar3.stat'),
      image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section id="sustainability" className="py-20 sm:py-24 bg-[#FAF7F2] dark:bg-[#120F0D] relative overflow-hidden transition-colors duration-300">
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-gradient-to-tr from-[#DE6826]/10 to-[#C08240]/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Column: Mission & Pillars */}
          <div className="lg:w-1/2">
            <span className="text-[#DE6826] dark:text-[#F5C478] font-bold tracking-widest uppercase text-xs sm:text-sm bg-[#DE6826]/10 dark:bg-[#DE6826]/20 px-4 py-1.5 rounded-full border border-[#DE6826]/20 inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-3.5 h-3.5" /> {t('purpose.tag')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6 leading-tight text-gray-900 dark:text-white">
              {t('purpose.title')} <br />
              <span className="bg-gradient-to-r from-[#DE6826] via-[#D48B28] to-[#C08240] bg-clip-text text-transparent italic">{t('purpose.highlight')}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-8 leading-relaxed font-light">
              {t('purpose.desc')}
            </p>
            
            <div className="space-y-5">
              {pillars.map((p, i) => (
                <div key={i} className="flex gap-4 sm:gap-5 items-start p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1B1613] border border-amber-900/10 dark:border-[#2C241E] shadow-sm hover:border-[#DE6826]/40 transition-all group">
                  <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-[#DE6826]/15 via-[#D48B28]/15 to-[#C08240]/15 rounded-2xl flex items-center justify-center text-[#DE6826] dark:text-[#F5C478] group-hover:scale-105 transition-transform">
                    <p.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h5 className="text-base sm:text-lg font-serif font-bold text-gray-900 dark:text-white group-hover:text-[#DE6826] dark:group-hover:text-[#F5C478] transition-colors">
                        {p.title}
                      </h5>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-[#DE6826] dark:text-[#F5C478] text-[11px] font-bold">
                        {p.stat}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed font-light">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column: Visual Conservation Grid with Verified Images */}
          <div className="lg:w-1/2 relative w-full">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-6 sm:pt-10">
                <div className="rounded-3xl overflow-hidden shadow-xl border border-amber-900/10 dark:border-[#2C241E] group relative">
                  <img 
                    src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80" 
                    alt="Wildlife Conservation in Serengeti" 
                    className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500" 
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-bold text-white bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                      {t('purpose.badge.serengeti')}
                    </span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#1B1613] via-[#16120F] to-[#120F0D] border border-[#DE6826]/30 p-6 sm:p-7 rounded-3xl text-white shadow-xl">
                  <p className="text-3xl sm:text-4xl font-extrabold mb-1 bg-gradient-to-r from-[#F5C478] to-[#DE6826] bg-clip-text text-transparent">$50k+</p>
                  <p className="text-xs uppercase tracking-widest font-bold text-white/80">{t('purpose.stat.community')}</p>
                  <p className="text-[11px] text-white/50 mt-1 leading-relaxed">{t('purpose.stat.communityDesc')}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-[#DE6826] via-[#D48B28] to-[#C08240] p-6 sm:p-7 rounded-3xl text-white shadow-xl">
                  <p className="text-3xl sm:text-4xl font-extrabold mb-1">100%</p>
                  <p className="text-xs uppercase tracking-widest font-bold text-white/95">{t('purpose.stat.eco')}</p>
                  <p className="text-[11px] text-white/80 mt-1 leading-relaxed">{t('purpose.stat.ecoDesc')}</p>
                </div>
                <div className="rounded-3xl overflow-hidden shadow-xl border border-amber-900/10 dark:border-[#2C241E] group relative">
                  <img 
                    src="https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=800&q=80" 
                    alt="Tanzanian Local Communities" 
                    className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500" 
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-bold text-white bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                      {t('purpose.badge.heritage')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Sustainability;

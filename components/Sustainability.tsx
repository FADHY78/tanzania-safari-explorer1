import React from 'react';
import { ShieldCheck, HeartHandshake, Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Sustainability: React.FC = () => {
  const { t } = useLanguage();

  const pillars = [
    {
      title: t('purpose.pillar1.title'),
      desc: t('purpose.pillar1.desc'),
      icon: ShieldCheck,
      stat: t('purpose.pillar1.stat'),
      image: "https://safari56.com/wp-content/uploads/2026/08/Tarangire-Ngorongoro-Serengeti-Safari-1.jpg"
    },
    {
      title: t('purpose.pillar2.title'),
      desc: t('purpose.pillar2.desc'),
      icon: HeartHandshake,
      stat: t('purpose.pillar2.stat'),
      image: "https://alulizanzibar.co.tz/images/Historical_Stone_Town_walking_Tour_04.jpg"
    },
    {
      title: t('purpose.pillar3.title'),
      desc: t('purpose.pillar3.desc'),
      icon: Leaf,
      stat: t('purpose.pillar3.stat'),
      image: "https://alulizanzibar.co.tz/images/Nakupenda_Sandbank_01.jpg"
    }
  ];

  return (
    <section id="sustainability" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#0A0A0A] relative overflow-hidden transition-colors duration-300">
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-[#F97316]/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-12 lg:gap-16">
          
          {/* Left Column: Mission & Pillars */}
          <div className="w-full lg:w-1/2">
            <span className="text-[#F97316] font-bold tracking-widest uppercase text-xs sm:text-sm bg-[#F97316]/10 px-3.5 sm:px-4 py-1.5 rounded-full border border-[#F97316]/25 inline-flex items-center gap-2 mb-3 sm:mb-4">
              <Leaf className="w-3.5 h-3.5" /> {t('purpose.tag')}
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4 sm:mb-6 leading-tight text-black dark:text-white">
              {t('purpose.title')} <br />
              <span className="text-[#F97316] italic">{t('purpose.highlight')}</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed font-light">
              {t('purpose.desc')}
            </p>
            
            <div className="space-y-3.5 sm:space-y-4">
              {pillars.map((p, i) => (
                <div key={i} className="flex gap-3 sm:gap-4 items-start p-3.5 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-[#121212] border border-black/10 dark:border-white/10 shadow-sm hover:border-[#F97316] transition-all group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-[#F97316]/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white transition-all">
                    <p.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
                      <h5 className="text-sm sm:text-base lg:text-lg font-serif font-bold text-black dark:text-white group-hover:text-[#F97316] transition-colors truncate">
                        {p.title}
                      </h5>
                      <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-[#F97316]/15 text-[#F97316] text-[10px] sm:text-[11px] font-bold whitespace-nowrap">
                        {p.stat}
                      </span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column: Visual Conservation & Zanzibar Marine Collage */}
          <div className="w-full lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              
              {/* Left Sub-column */}
              <div className="space-y-2.5 sm:space-y-4 pt-0 sm:pt-8">
                {/* Authentic Maasai Culture Card */}
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-black/10 dark:border-white/10 group relative bg-black">
                  <img 
                    src="https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/maasai-boma1-quj0eomliq423umh5979wbutmmzg0963hchobwsin0.jpg" 
                    alt="Authentic Maasai Culture in Tanzania" 
                    className="w-full h-44 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500" 
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent flex items-end p-2 sm:p-4">
                    <span className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-1.5 text-[10px] sm:text-xs font-bold text-white bg-black/75 backdrop-blur-md px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-xl sm:rounded-full border border-[#F97316]/50 shadow-md leading-tight text-center sm:text-left">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] flex-shrink-0"></span>
                      <span>Maasai Heritage</span>
                    </span>
                  </div>
                </div>
                
                {/* Stat Card 1 */}
                <div className="bg-black border border-[#F97316]/40 p-4 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl text-white shadow-xl">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-0.5 sm:mb-1 text-[#F97316]">$50k+</p>
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-bold text-white">{t('purpose.stat.community')}</p>
                  <p className="text-[9.5px] sm:text-[11px] text-white/60 mt-1 leading-tight sm:leading-relaxed">{t('purpose.stat.communityDesc')}</p>
                </div>
              </div>

              {/* Right Sub-column */}
              <div className="space-y-2.5 sm:space-y-4">
                {/* Stat Card 2 */}
                <div className="bg-[#F97316] p-4 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl text-white shadow-xl">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-0.5 sm:mb-1">100%</p>
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-bold text-white">{t('purpose.stat.eco')}</p>
                  <p className="text-[9.5px] sm:text-[11px] text-white/90 mt-1 leading-tight sm:leading-relaxed">{t('purpose.stat.ecoDesc')}</p>
                </div>

                {/* Indigenous Hadzabe Tribe Card at Lake Eyasi */}
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-black/10 dark:border-white/10 group relative bg-black">
                  <img 
                    src="/images/hadzabe-cultural-visit.jpg" 
                    alt="Authentic Hadzabe Cultural Interaction at Lake Eyasi" 
                    className="w-full h-44 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500" 
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/An_Hadzabe_tribe_hunter.jpg/800px-An_Hadzabe_tribe_hunter.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent flex items-end p-2 sm:p-4">
                    <span className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-1.5 text-[10px] sm:text-xs font-bold text-white bg-black/75 backdrop-blur-md px-2 sm:px-3 py-1.5 sm:py-1 rounded-xl sm:rounded-full border border-[#F97316]/50 shadow-md leading-tight text-center sm:text-left">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] flex-shrink-0"></span>
                      <span>Indigenous Hadzabe Tribe</span>
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

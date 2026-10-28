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
    <section id="sustainability" className="py-16 sm:py-20 lg:py-24 bg-[#FAF7F2] dark:bg-[#120F0D] relative overflow-hidden transition-colors duration-300">
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-gradient-to-tr from-[#DE6826]/10 to-[#C08240]/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-12 lg:gap-16">
          
          {/* Left Column: Mission & Pillars */}
          <div className="w-full lg:w-1/2">
            <span className="text-[#DE6826] dark:text-[#F5C478] font-bold tracking-widest uppercase text-xs sm:text-sm bg-[#DE6826]/10 dark:bg-[#DE6826]/20 px-3.5 sm:px-4 py-1.5 rounded-full border border-[#DE6826]/20 inline-flex items-center gap-2 mb-3 sm:mb-4">
              <Leaf className="w-3.5 h-3.5" /> {t('purpose.tag')}
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4 sm:mb-6 leading-tight text-gray-900 dark:text-white">
              {t('purpose.title')} <br />
              <span className="bg-gradient-to-r from-[#DE6826] via-[#D48B28] to-[#C08240] bg-clip-text text-transparent italic">{t('purpose.highlight')}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed font-light">
              {t('purpose.desc')}
            </p>
            
            <div className="space-y-3.5 sm:space-y-4">
              {pillars.map((p, i) => (
                <div key={i} className="flex gap-3 sm:gap-4 items-start p-3.5 sm:p-5 rounded-2xl bg-white dark:bg-[#1B1613] border border-amber-900/10 dark:border-[#2C241E] shadow-sm hover:border-[#DE6826]/40 transition-all group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-gradient-to-br from-[#DE6826]/15 via-[#D48B28]/15 to-[#C08240]/15 rounded-xl sm:rounded-2xl flex items-center justify-center text-[#DE6826] dark:text-[#F5C478] group-hover:scale-105 transition-transform">
                    <p.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
                      <h5 className="text-sm sm:text-base lg:text-lg font-serif font-bold text-gray-900 dark:text-white group-hover:text-[#DE6826] dark:group-hover:text-[#F5C478] transition-colors truncate">
                        {p.title}
                      </h5>
                      <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-amber-500/10 text-[#DE6826] dark:text-[#F5C478] text-[10px] sm:text-[11px] font-bold whitespace-nowrap">
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
          
          {/* Right Column: Visual Conservation & Zanzibar Marine Collage */}
          <div className="w-full lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              
              {/* Left Sub-column */}
              <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-8">
                {/* Authentic Maasai Culture Card (No Label as requested) */}
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-amber-900/10 dark:border-[#2C241E] group relative bg-black">
                  <img 
                    src="https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/maasai-boma1-quj0eomliq423umh5979wbutmmzg0963hchobwsin0.jpg" 
                    alt="Authentic Maasai Culture in Tanzania" 
                    className="w-full h-44 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500" 
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                </div>
                
                {/* Stat Card 1 */}
                <div className="bg-gradient-to-br from-[#1B1613] via-[#16120F] to-[#120F0D] border border-[#DE6826]/30 p-4 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl text-white shadow-xl">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-0.5 sm:mb-1 bg-gradient-to-r from-[#F5C478] to-[#DE6826] bg-clip-text text-transparent">$50k+</p>
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-bold text-white/80">{t('purpose.stat.community')}</p>
                  <p className="text-[9.5px] sm:text-[11px] text-white/50 mt-1 leading-tight sm:leading-relaxed">{t('purpose.stat.communityDesc')}</p>
                </div>
              </div>

              {/* Right Sub-column */}
              <div className="space-y-3 sm:space-y-4">
                {/* Stat Card 2 */}
                <div className="bg-gradient-to-br from-[#DE6826] via-[#D48B28] to-[#C08240] p-4 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl text-white shadow-xl">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-0.5 sm:mb-1">100%</p>
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-bold text-white/95">{t('purpose.stat.eco')}</p>
                  <p className="text-[9.5px] sm:text-[11px] text-white/85 mt-1 leading-tight sm:leading-relaxed">{t('purpose.stat.ecoDesc')}</p>
                </div>

                {/* Indigenous Hadzabe Tribe Card at Lake Eyasi */}
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-amber-900/10 dark:border-[#2C241E] group relative bg-black">
                  <img 
                    src="/images/hadzabe-cultural-visit.jpg" 
                    alt="Authentic Hadzabe Cultural Interaction at Lake Eyasi" 
                    className="w-full h-44 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500" 
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/An_Hadzabe_tribe_hunter.jpg/800px-An_Hadzabe_tribe_hunter.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5 sm:p-4">
                    <span className="text-[10px] sm:text-xs font-bold text-white bg-black/50 backdrop-blur-sm px-2.5 sm:px-3 py-1 rounded-full border border-white/20">
                      Indigenous Hadzabe Tribe
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

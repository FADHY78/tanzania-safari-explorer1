import React from 'react';
import { ShieldCheck, Award, CheckCircle2, ExternalLink, Leaf } from 'lucide-react';

export interface TourismPartner {
  id: string;
  name: string;
  acronym: string;
  role: string;
  category: 'Statutory Authority' | 'Tourism Board' | 'Conservation Body' | 'Industry Association' | 'Aero-Medical';
  logoUrl: string;
  website: string;
  description: string;
  mandate: string;
}

export const PARTNERS_DATA: TourismPartner[] = [
  {
    id: 'tanapa',
    name: 'Tanzania National Parks Authority',
    acronym: 'TANAPA',
    role: 'Statutory Parks Custodian',
    category: 'Statutory Authority',
    logoUrl: '/images/partners/tanapa-logo.svg',
    website: 'https://www.tanzaniaparks.go.tz',
    description: 'Statutory custodian of Serengeti, Kilimanjaro, Tarangire, and 20+ pristine national parks.',
    mandate: 'Statutory Park Licensing & Ranger Permits'
  },
  {
    id: 'ttb',
    name: 'Tanzania Tourist Board (Visit Tanzania)',
    acronym: 'TTB',
    role: 'National Tourism Board',
    category: 'Tourism Board',
    logoUrl: '/images/partners/ttb-visit-tanzania-logo.svg',
    website: 'https://tanzaniatourism.go.tz',
    description: 'Official government agency championing destination Tanzania under Visit Tanzania.',
    mandate: 'Official Operator Accreditation & Registration'
  },
  {
    id: 'ncaa',
    name: 'Ngorongoro Conservation Area Authority',
    acronym: 'NCAA',
    role: 'UNESCO World Heritage Custodian',
    category: 'Conservation Body',
    logoUrl: '/images/partners/ncaa-logo.svg',
    website: 'https://www.ncaa.go.tz',
    description: 'Guardian of the world-famous volcanic caldera, Olduvai Gorge, and indigenous Maasai heritage.',
    mandate: 'Crater Access Clearances & Conservation'
  },
  {
    id: 'tato',
    name: 'Tanzania Association of Tour Operators',
    acronym: 'TATO',
    role: 'Peak Tour Operator Association',
    category: 'Industry Association',
    logoUrl: '/images/partners/tato-logo.svg',
    website: 'https://tatotz.org',
    description: 'Premier Arusha-based tour operator body enforcing highest ethics, safety, and service standards.',
    mandate: 'Guide Welfare & Vehicle Safety Certification'
  },
  {
    id: 'tawa',
    name: 'Tanzania Wildlife Management Authority',
    acronym: 'TAWA',
    role: 'Wildlife Reserves Authority',
    category: 'Statutory Authority',
    logoUrl: '/images/partners/tawa-logo.svg',
    website: 'https://tawa.go.tz',
    description: 'Managing vast protected game reserves, Ramsar wetland corridors, and the Selous ecosystem.',
    mandate: 'Game Reserve Concessions & Anti-Poaching'
  },
  {
    id: 'tawiri',
    name: 'Tanzania Wildlife Research Institute',
    acronym: 'TAWIRI',
    role: 'Apex Wildlife Science Body',
    category: 'Conservation Body',
    logoUrl: '/images/partners/tawiri-logo.svg',
    website: 'https://tawiri.or.tz',
    description: 'Leading biological monitoring, wildlife census, and Great Migration corridor tracking.',
    mandate: 'Scientific Conservation & Migration Policy'
  },
  {
    id: 'mnrt',
    name: 'Ministry of Natural Resources & Tourism',
    acronym: 'MNRT',
    role: 'United Republic of Tanzania',
    category: 'Statutory Authority',
    logoUrl: '/images/partners/mnrt-logo.svg',
    website: 'https://www.maliasili.go.tz',
    description: 'Government ministry governing wildlife conservation, forestry, and licensed tourism.',
    mandate: 'Class-A Tour Operator Licensing'
  },
  {
    id: 'amref',
    name: 'AMREF Flying Doctors',
    acronym: 'AMREF',
    role: '24/7 Bush Medical Evacuation',
    category: 'Aero-Medical',
    logoUrl: '/images/partners/amref-logo.svg',
    website: 'https://flydoc.org',
    description: 'Dedicated aero-medical bush evacuation coverage across all remote Tanzanian wilderness sectors.',
    mandate: 'Automatic Medical Coverage for All Guests'
  }
];

const PartnerCard: React.FC<{ partner: TourismPartner }> = ({ partner }) => {
  return (
    <div className="w-[320px] sm:w-[350px] flex-shrink-0 group relative bg-white dark:bg-[#1B1613] rounded-3xl border border-amber-900/10 dark:border-[#2C241E] p-6 shadow-sm hover:shadow-2xl hover:border-[#DE6826] transition-all duration-300 transform hover:-translate-y-2.5 hover:scale-[1.02] select-none mx-3.5 flex flex-col justify-between">
      {/* Top golden accent line that glows on hover */}
      <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-[#DE6826]/0 to-transparent group-hover:via-[#DE6826] transition-all duration-500 rounded-t-full"></div>

      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-500/10 text-[#DE6826] dark:text-[#F5C478] border border-[#DE6826]/20">
            {partner.category}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" /> Official
          </span>
        </div>

        {/* Real Logo Container (clean white/dark canvas for crisp vector presentation) */}
        <div className="h-32 flex items-center justify-center p-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#15110E] border border-amber-900/10 dark:border-[#261E18] mb-5 group-hover:border-[#DE6826]/40 transition-all duration-300 relative overflow-hidden">
          <img 
            src={partner.logoUrl} 
            alt={`${partner.name} Official Logo`} 
            className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-500"
            loading="eager"
          />
        </div>

        {/* Information */}
        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between gap-2">
            <h4 className="font-serif font-bold text-gray-900 dark:text-white text-lg leading-tight group-hover:text-[#DE6826] dark:group-hover:text-[#F5C478] transition-colors">
              {partner.acronym}
            </h4>
            <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 truncate text-right">
              {partner.role}
            </span>
          </div>
          
          <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">
            {partner.name}
          </p>

          <p className="text-[12px] text-gray-600 dark:text-gray-400 leading-relaxed font-light line-clamp-2 pt-1">
            {partner.description}
          </p>
        </div>
      </div>

      {/* Footer Info & Portal Link */}
      <div className="pt-4 mt-4 border-t border-amber-900/10 dark:border-[#2C241E] flex items-center justify-between text-xs">
        <span className="text-[11px] font-medium text-[#C08240] dark:text-[#F5C478] truncate max-w-[200px]">
          {partner.mandate}
        </span>
        <a 
          href={partner.website} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-1 font-bold text-[#DE6826] dark:text-[#F5C478] hover:underline text-[11px] group/link flex-shrink-0"
          title={`Visit ${partner.name} Portal`}
        >
          <span>Portal</span>
          <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
};

const TourismBoardsPartners: React.FC = () => {
  // Seamless loop with duplicated items
  const marqueeItems = [...PARTNERS_DATA, ...PARTNERS_DATA];

  return (
    <section className="py-20 bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] dark:from-[#120F0D] dark:via-[#171310] dark:to-[#120F0D] overflow-hidden transition-colors duration-300 border-t border-amber-900/10 dark:border-[#2C241E]">
      <div className="container mx-auto px-4 sm:px-6 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DE6826]/10 dark:bg-[#DE6826]/20 border border-[#DE6826]/20 mb-3">
            <ShieldCheck className="w-4 h-4 text-[#DE6826] dark:text-[#F5C478]" />
            <span className="text-[#DE6826] dark:text-[#F5C478] font-bold text-xs uppercase tracking-widest">
              Official Tourism Boards & Statutory Partners
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900 dark:text-white leading-tight">
            Recognized &amp; Licensed by <br />
            <span className="bg-gradient-to-r from-[#DE6826] via-[#D48B28] to-[#C08240] bg-clip-text text-transparent">
              Tanzania's Premier Authorities
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-3 font-light leading-relaxed">
            Embuat Safaris operates in complete legal and ethical alignment with Tanzania's statutory conservation bodies, national tourism regulators, and emergency medical services.
          </p>
        </div>
      </div>

      {/* Automatic Sliding Track with NO scrollbar (overflow-hidden, smooth continuous marquee, pauses on hover) */}
      <div className="relative w-full overflow-hidden pause-on-hover">
        {/* Soft edge gradients for seamless visual blending */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#FAF7F2] dark:from-[#120F0D] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#FAF7F2] dark:from-[#120F0D] to-transparent z-10 pointer-events-none"></div>

        {/* Marquee Track (Smooth, continuous auto-sliding without scrollbars) */}
        <div className="py-4 flex items-center overflow-hidden">
          <div className="animate-marquee flex items-center">
            {marqueeItems.map((partner, index) => (
              <PartnerCard key={`${partner.id}-${index}`} partner={partner} />
            ))}
          </div>
        </div>
      </div>

      {/* Trust Highlights Strip below the slide */}
      <div className="container mx-auto px-4 sm:px-6 mt-12">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-white dark:bg-[#1B1613] rounded-3xl border border-amber-900/10 dark:border-[#2C241E] shadow-sm text-center">
          <div className="p-2">
            <div className="text-[#DE6826] dark:text-[#F5C478] font-bold text-sm sm:text-base flex items-center justify-center gap-1.5 mb-1">
              <Award className="w-4 h-4" /> 100% Certified
            </div>
            <p className="text-[11px] text-gray-600 dark:text-gray-400">TANAPA &amp; TTB Authorized Operator</p>
          </div>
          <div className="p-2">
            <div className="text-[#DE6826] dark:text-[#F5C478] font-bold text-sm sm:text-base flex items-center justify-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4" /> AMREF Covered
            </div>
            <p className="text-[11px] text-gray-600 dark:text-gray-400">24/7 Remote Bush Evacuation Guarantee</p>
          </div>
          <div className="p-2">
            <div className="text-[#DE6826] dark:text-[#F5C478] font-bold text-sm sm:text-base flex items-center justify-center gap-1.5 mb-1">
              <CheckCircle2 className="w-4 h-4" /> TATO Ethics
            </div>
            <p className="text-[11px] text-gray-600 dark:text-gray-400">Fair Guide Wages &amp; Vehicle Safety</p>
          </div>
          <div className="p-2">
            <div className="text-[#DE6826] dark:text-[#F5C478] font-bold text-sm sm:text-base flex items-center justify-center gap-1.5 mb-1">
              <Leaf className="w-4 h-4" /> 5% Conservation
            </div>
            <p className="text-[11px] text-gray-600 dark:text-gray-400">Direct Funding for Anti-Poaching</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourismBoardsPartners;

import React from 'react';
import { useSiteSettings, DEFAULT_LOGO } from '../services/siteSettingsService';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'light',
  size = 'md',
  showText = true
}) => {
  const { branding } = useSiteSettings();

  const sizes = {
    sm: { img: 'w-8 h-8 sm:w-9 sm:h-9', title: 'text-xs sm:text-base', sub: 'text-[6.5px] sm:text-[8px] tracking-[0.14em] sm:tracking-[0.18em]' },
    md: { img: 'w-9 h-9 sm:w-11 sm:h-11', title: 'text-sm sm:text-xl', sub: 'text-[7px] sm:text-[9px] tracking-[0.15em] sm:tracking-[0.22em]' },
    lg: { img: 'w-12 h-12 sm:w-16 sm:h-16', title: 'text-lg sm:text-2xl md:text-3xl', sub: 'text-[8.5px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.25em]' }
  };

  const textColor = variant === 'light' ? 'text-white' : 'text-black';
  const subColor = variant === 'light' ? 'text-white/80' : 'text-neutral-600';

  // First word in plain colour, the rest in the brand colour (e.g. "EMBUAT" + "SAFARIS")
  const words = (branding.siteName || 'Embuat Safaris').trim().split(/\s+/);
  const firstWord = words[0];
  const restWords = words.slice(1).join(' ');

  return (
    <div className={`flex items-center gap-2 sm:gap-3 notranslate ${className}`} translate="no">
      {/* Official Emblem Logo (editable in Admin → Settings → Branding) */}
      <div className={`relative ${sizes[size].img} flex-shrink-0 rounded-full overflow-hidden shadow-md ring-2 ring-brand-gold bg-[#F3EFE4] notranslate`} translate="no">
        <img
          src={branding.logoUrl || DEFAULT_LOGO}
          alt={branding.siteName}
          className="w-full h-full object-contain notranslate"
          translate="no"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            if (!img.src.includes('/images/embuat-safaris-logo.jpg')) {
              img.src = '/images/embuat-safaris-logo.jpg?v=2';
            }
          }}
        />
      </div>

      {/* Logo Typography - Stays untranslated in all languages */}
      {showText && (
        <div className="flex flex-col justify-center leading-none notranslate" translate="no">
          <span className={`font-serif font-black tracking-tight ${sizes[size].title} ${textColor} transition-colors uppercase notranslate`} translate="no">
            {firstWord}{' '}
            {restWords && <span className="text-brand-gold notranslate" translate="no">{restWords}</span>}
          </span>
          {branding.slogan && (
            <span className={`font-sans font-bold uppercase mt-1 ${sizes[size].sub} ${subColor} transition-colors notranslate`} translate="no">
              {branding.slogan}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;

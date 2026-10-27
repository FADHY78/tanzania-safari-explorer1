import React from 'react';

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
  const sizes = {
    sm: { img: 'w-9 h-9', title: 'text-base', sub: 'text-[8px] tracking-[0.18em]' },
    md: { img: 'w-11 h-11', title: 'text-xl', sub: 'text-[9px] tracking-[0.22em]' },
    lg: { img: 'w-16 h-16', title: 'text-2xl md:text-3xl', sub: 'text-[11px] tracking-[0.25em]' }
  };

  const textColor = variant === 'light' ? 'text-white' : 'text-gray-900';
  const subColor = variant === 'light' ? 'text-[#F3C082]' : 'text-[#A67134]';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official Emblem Logo */}
      <div className={`relative ${sizes[size].img} flex-shrink-0 rounded-full overflow-hidden shadow-md ring-2 ring-[#C08240]/40 bg-white`}>
        <img
          src="/embuat-safaris-logo.jpg"
          alt="Embuat Safaris"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/images/embuat-safaris-logo.jpg';
          }}
        />
      </div>

      {/* Logo Typography */}
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span className={`font-serif font-black tracking-tight ${sizes[size].title} ${textColor} transition-colors uppercase`}>
            EMBUAT <span className="text-[#C08240]">SAFARIS</span>
          </span>
          <span className={`font-sans font-bold uppercase mt-1 ${sizes[size].sub} ${subColor} transition-colors`}>
            Explore • Experience • Preserve
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;

import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', variant = 'light', size = 'md' }) => {
  const sizes = {
    sm: { icon: 'w-8 h-8', text: 'text-lg' },
    md: { icon: 'w-12 h-12', text: 'text-2xl' },
    lg: { icon: 'w-16 h-16', text: 'text-3xl' }
  };

  const textColor = variant === 'light' ? 'text-white' : 'text-gray-800';
  const accentColor = variant === 'light' ? 'text-white/80' : 'text-[#C08240]';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`relative ${sizes[size].icon}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Background Circle with Gradient */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#C08240', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#A67134', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#FDB462', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#C08240', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          
          {/* Outer Ring */}
          <circle cx="50" cy="50" r="48" fill="url(#logoGradient)" />
          
          {/* Sun/Moon */}
          <circle cx="50" cy="28" r="10" fill="url(#sunGradient)" opacity="0.9" />
          
          {/* Mountain Silhouette (Kilimanjaro inspired) */}
          <path 
            d="M 15 65 L 30 45 L 40 52 L 50 35 L 60 48 L 70 45 L 85 65 Z" 
            fill="rgba(0,0,0,0.3)"
          />
          <path 
            d="M 15 65 L 30 45 L 40 52 L 50 35 L 60 48 L 70 45 L 85 65" 
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            opacity="0.5"
          />
          
          {/* Snow cap on main peak */}
          <path 
            d="M 47 35 L 50 35 L 53 35 L 52 38 L 48 38 Z" 
            fill="white"
            opacity="0.8"
          />
          
          {/* Acacia Tree Silhouette */}
          <path 
            d="M 25 75 Q 20 68 25 62 Q 30 68 25 75 Z" 
            fill="rgba(0,0,0,0.4)"
          />
          <rect x="24" y="75" width="2" height="8" fill="rgba(0,0,0,0.4)" />
          
          {/* Ground Line */}
          <path 
            d="M 10 75 Q 50 73 90 75" 
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
          />
          
          {/* Decorative Elements */}
          <circle cx="75" cy="60" r="1.5" fill="white" opacity="0.6" />
          <circle cx="82" cy="55" r="1" fill="white" opacity="0.5" />
        </svg>
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col leading-none">
        <span className={`font-serif font-bold tracking-tight ${sizes[size].text} ${textColor} transition-colors`}>
          Tanzania<span className={accentColor}>Wild</span>
        </span>
        <span className={`text-[10px] tracking-[0.2em] uppercase ${variant === 'light' ? 'text-white/70' : 'text-gray-500'} transition-colors -mt-0.5`}>
          Safari Adventures
        </span>
      </div>
    </div>
  );
};

export default Logo;

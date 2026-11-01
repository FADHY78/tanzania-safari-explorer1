export interface CountryData {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
}

export const COUNTRIES: CountryData[] = [
  // Top Inbound Safari Markets
  { name: 'United States', code: 'US', dial_code: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: 'GB', dial_code: '+44', flag: '🇬🇧' },
  { name: 'Germany', code: 'DE', dial_code: '+49', flag: '🇩🇪' },
  { name: 'France', code: 'FR', dial_code: '+33', flag: '🇫🇷' },
  { name: 'Canada', code: 'CA', dial_code: '+1', flag: '🇨🇦' },
  { name: 'Australia', code: 'AU', dial_code: '+61', flag: '🇦🇺' },
  { name: 'Italy', code: 'IT', dial_code: '+39', flag: '🇮🇹' },
  { name: 'Spain', code: 'ES', dial_code: '+34', flag: '🇪🇸' },
  { name: 'Switzerland', code: 'CH', dial_code: '+41', flag: '🇨🇭' },
  { name: 'Netherlands', code: 'NL', dial_code: '+31', flag: '🇳🇱' },
  { name: 'Belgium', code: 'BE', dial_code: '+32', flag: '🇧🇪' },
  { name: 'Austria', code: 'AT', dial_code: '+43', flag: '🇦🇹' },
  { name: 'Sweden', code: 'SE', dial_code: '+46', flag: '🇸🇪' },
  { name: 'Norway', code: 'NO', dial_code: '+47', flag: '🇳🇴' },
  { name: 'Denmark', code: 'DK', dial_code: '+45', flag: '🇩🇰' },
  { name: 'Finland', code: 'FI', dial_code: '+358', flag: '🇫🇮' },
  { name: 'Ireland', code: 'IE', dial_code: '+353', flag: '🇮🇪' },
  { name: 'Poland', code: 'PL', dial_code: '+48', flag: '🇵🇱' },
  { name: 'Czech Republic', code: 'CZ', dial_code: '+420', flag: '🇨🇿' },
  { name: 'Portugal', code: 'PT', dial_code: '+351', flag: '🇵🇹' },
  { name: 'Greece', code: 'GR', dial_code: '+30', flag: '🇬🇷' },

  // East & Southern Africa
  { name: 'Tanzania', code: 'TZ', dial_code: '+255', flag: '🇹🇿' },
  { name: 'Kenya', code: 'KE', dial_code: '+254', flag: '🇰🇪' },
  { name: 'Uganda', code: 'UG', dial_code: '+256', flag: '🇺🇬' },
  { name: 'Rwanda', code: 'RW', dial_code: '+250', flag: '🇷🇼' },
  { name: 'South Africa', code: 'ZA', dial_code: '+27', flag: '🇿🇦' },
  { name: 'Namibia', code: 'NA', dial_code: '+264', flag: '🇳🇦' },
  { name: 'Botswana', code: 'BW', dial_code: '+267', flag: '🇧🇼' },
  { name: 'Zambia', code: 'ZM', dial_code: '+260', flag: '🇿🇲' },
  { name: 'Zimbabwe', code: 'ZW', dial_code: '+263', flag: '🇿🇼' },
  { name: 'Seychelles', code: 'SC', dial_code: '+248', flag: '🇸🇨' },
  { name: 'Mauritius', code: 'MU', dial_code: '+230', flag: '🇲🇺' },
  { name: 'Egypt', code: 'EG', dial_code: '+20', flag: '🇪🇬' },
  { name: 'Morocco', code: 'MA', dial_code: '+212', flag: '🇲🇦' },
  { name: 'Nigeria', code: 'NG', dial_code: '+234', flag: '🇳🇬' },
  { name: 'Ghana', code: 'GH', dial_code: '+233', flag: '🇬🇭' },

  // Middle East & Asia-Pacific
  { name: 'United Arab Emirates', code: 'AE', dial_code: '+971', flag: '🇦🇪' },
  { name: 'Saudi Arabia', code: 'SA', dial_code: '+966', flag: '🇸🇦' },
  { name: 'Qatar', code: 'QA', dial_code: '+974', flag: '🇶🇦' },
  { name: 'Kuwait', code: 'KW', dial_code: '+965', flag: '🇰🇼' },
  { name: 'Bahrain', code: 'BH', dial_code: '+973', flag: '🇧🇭' },
  { name: 'Oman', code: 'OM', dial_code: '+968', flag: '🇴🇲' },
  { name: 'Israel', code: 'IL', dial_code: '+972', flag: '🇮🇱' },
  { name: 'India', code: 'IN', dial_code: '+91', flag: '🇮🇳' },
  { name: 'China', code: 'CN', dial_code: '+86', flag: '🇨🇳' },
  { name: 'Japan', code: 'JP', dial_code: '+81', flag: '🇯🇵' },
  { name: 'South Korea', code: 'KR', dial_code: '+82', flag: '🇰🇷' },
  { name: 'Singapore', code: 'SG', dial_code: '+65', flag: '🇸🇬' },
  { name: 'Malaysia', code: 'MY', dial_code: '+60', flag: '🇲🇾' },
  { name: 'Hong Kong', code: 'HK', dial_code: '+852', flag: '🇭🇰' },
  { name: 'Taiwan', code: 'TW', dial_code: '+886', flag: '🇹🇼' },
  { name: 'Thailand', code: 'TH', dial_code: '+66', flag: '🇹🇭' },
  { name: 'Indonesia', code: 'ID', dial_code: '+62', flag: '🇮🇩' },
  { name: 'Philippines', code: 'PH', dial_code: '+63', flag: '🇵🇭' },
  { name: 'New Zealand', code: 'NZ', dial_code: '+64', flag: '🇳🇿' },

  // Americas
  { name: 'Brazil', code: 'BR', dial_code: '+55', flag: '🇧🇷' },
  { name: 'Mexico', code: 'MX', dial_code: '+52', flag: '🇲🇽' },
  { name: 'Argentina', code: 'AR', dial_code: '+54', flag: '🇦🇷' },
  { name: 'Chile', code: 'CL', dial_code: '+56', flag: '🇨🇱' },
  { name: 'Colombia', code: 'CO', dial_code: '+57', flag: '🇨🇴' },
  { name: 'Peru', code: 'PE', dial_code: '+51', flag: '🇵🇪' },
  { name: 'Costa Rica', code: 'CR', dial_code: '+506', flag: '🇨🇷' },

  // Other European & Global
  { name: 'Turkey', code: 'TR', dial_code: '+90', flag: '🇹🇷' },
  { name: 'Hungary', code: 'HU', dial_code: '+36', flag: '🇭🇺' },
  { name: 'Romania', code: 'RO', dial_code: '+40', flag: '🇷🇴' },
  { name: 'Croatia', code: 'HR', dial_code: '+385', flag: '🇭🇷' },
  { name: 'Slovakia', code: 'SK', dial_code: '+421', flag: '🇸🇰' },
  { name: 'Slovenia', code: 'SI', dial_code: '+386', flag: '🇸🇮' },
  { name: 'Luxembourg', code: 'LU', dial_code: '+352', flag: '🇱🇺' },
  { name: 'Iceland', code: 'IS', dial_code: '+354', flag: '🇮🇸' },
  { name: 'Estonia', code: 'EE', dial_code: '+372', flag: '🇪🇪' },
  { name: 'Latvia', code: 'LV', dial_code: '+371', flag: '🇱🇻' },
  { name: 'Lithuania', code: 'LT', dial_code: '+370', flag: '🇱🇹' },
  { name: 'Cyprus', code: 'CY', dial_code: '+357', flag: '🇨🇾' },
  { name: 'Malta', code: 'MT', dial_code: '+356', flag: '🇲🇹' }
];

export const DEFAULT_COUNTRY = COUNTRIES[0]; // United States


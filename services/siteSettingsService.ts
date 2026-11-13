import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured, deleteStorageFileIfSupabase } from '../lib/supabase';
import { siteContentService } from './siteContentService';

// ─── TYPES ───────────────────────────────────────────────────────────────────
export interface GeneralSettings {
  siteTitle: string;
  metaDescription: string;
  showWhatsappButton: boolean;
  showAiAssistant: boolean;
  announcementEnabled: boolean;
  announcementText: string;
  maintenanceMode: boolean;
}

export interface CompanyProfile {
  legalName: string;
  registrationNumber: string;
  taxId: string;
  safariLicense: string;
  foundingYear: string;
  phone: string;
  whatsapp: string; // digits only, international format e.g. 255785341091
  email: string;
  website: string;
  address: string;
  city: string;
  country: string;
  officeHours: string;
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  tripadvisor: string;
}

export interface BrandingSettings {
  siteName: string;
  slogan: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  presetId: string;
}

export interface SiteSettings {
  general: GeneralSettings;
  company: CompanyProfile;
  branding: BrandingSettings;
  /** originalUrl -> replacement url (uploaded data-url / storage url / online url) */
  imageOverrides: Record<string, string>;
}

export const DEFAULT_LOGO = '/embuat-safaris-logo.jpg?v=2';

export const COLOR_PRESETS: { id: string; name: string; primary: string; secondary: string }[] = [
  { id: 'safari-orange', name: 'Safari Orange', primary: '#F97316', secondary: '#EA580C' },
  { id: 'savanna-gold', name: 'Savanna Gold', primary: '#D4A017', secondary: '#B8860B' },
  { id: 'serengeti-green', name: 'Serengeti Green', primary: '#16A34A', secondary: '#15803D' },
  { id: 'kilimanjaro-blue', name: 'Kilimanjaro Blue', primary: '#2563EB', secondary: '#1D4ED8' },
  { id: 'zanzibar-teal', name: 'Zanzibar Teal', primary: '#0D9488', secondary: '#0F766E' },
  { id: 'maasai-red', name: 'Maasai Red', primary: '#DC2626', secondary: '#B91C1C' },
  { id: 'royal-purple', name: 'Royal Purple', primary: '#7C3AED', secondary: '#6D28D9' },
  { id: 'rose-pink', name: 'Sunset Rose', primary: '#E11D48', secondary: '#BE123C' }
];

export const DEFAULT_SETTINGS: SiteSettings = {
  general: {
    siteTitle: 'Embuat Safaris | Authentic Tanzania Safaris & Kilimanjaro Treks',
    metaDescription:
      'Authentic Tanzanian safaris, Kilimanjaro treks and Zanzibar holidays with local guides based in Monduli Juu, Arusha.',
    showWhatsappButton: true,
    showAiAssistant: true,
    announcementEnabled: false,
    announcementText: '',
    maintenanceMode: false
  },
  company: {
    legalName: 'Embuat Safaris',
    registrationNumber: '',
    taxId: '',
    safariLicense: '',
    foundingYear: '2025',
    phone: '+255 785 341 091',
    whatsapp: '255785341091',
    email: 'embuatsafaris@gmail.com',
    website: '',
    address: 'Monduli Juu, Arusha Region, Tanzania',
    city: 'Monduli Juu',
    country: 'Tanzania',
    officeHours: '7:30 AM – 7:00 PM EAT (Emergency Line 24/7)',
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
    tripadvisor: ''
  },
  branding: {
    siteName: 'Embuat Safaris',
    slogan: 'Explore • Experience • Preserve',
    logoUrl: DEFAULT_LOGO,
    primaryColor: '#F97316',
    secondaryColor: '#EA580C',
    presetId: 'safari-orange'
  },
  imageOverrides: {}
};

const STORAGE_KEY = 'embuat_site_settings_v1';
const EVENT = 'embuat_site_settings_updated';

// ─── COLOUR HELPERS ──────────────────────────────────────────────────────────
export const hexToRgbTriplet = (hex: string): string => {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const n = parseInt(full, 16);
  if (Number.isNaN(n) || full.length !== 6) return '249 115 22';
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
};

export const darkenHex = (hex: string, amount = 0.12): string => {
  const [r, g, b] = hexToRgbTriplet(hex).split(' ').map(Number);
  const f = (v: number) => Math.max(0, Math.round(v * (1 - amount))).toString(16).padStart(2, '0');
  return `#${f(r)}${f(g)}${f(b)}`;
};

// ─── SERVICE ─────────────────────────────────────────────────────────────────
const merge = (stored: Partial<SiteSettings> | null): SiteSettings => ({
  general: { ...DEFAULT_SETTINGS.general, ...(stored?.general || {}) },
  company: { ...DEFAULT_SETTINGS.company, ...(stored?.company || {}) },
  branding: { ...DEFAULT_SETTINGS.branding, ...(stored?.branding || {}) },
  imageOverrides: { ...(stored?.imageOverrides || {}) }
});

class SiteSettingsService {
  private cache: SiteSettings | null = null;

  public getSettings(): SiteSettings {
    if (this.cache) return this.cache;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      this.cache = merge(raw ? JSON.parse(raw) : null);
    } catch {
      this.cache = merge(null);
    }
    return this.cache;
  }

  /** Returns false when the browser storage quota was exceeded. */
  public save(next: SiteSettings, pushRemote = true): boolean {
    this.cache = next;
    let ok = true;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      ok = false;
      console.error('Site settings could not be saved locally (storage full?)', e);
    }
    window.dispatchEvent(new CustomEvent(EVENT));
    if (pushRemote) void this.pushRemote(next);
    return ok;
  }

  public updateGeneral(patch: Partial<GeneralSettings>): boolean {
    const s = this.getSettings();
    return this.save({ ...s, general: { ...s.general, ...patch } });
  }

  public updateCompany(patch: Partial<CompanyProfile>): boolean {
    const s = this.getSettings();
    const company = { ...s.company, ...patch };
    const ok = this.save({ ...s, company });
    siteContentService.updateContact({
      phone: company.phone,
      email: company.email,
      officeAddress: company.address,
      officeHours: company.officeHours,
      whatsappNumber: company.whatsapp,
      emergencyLine: company.phone
    });
    return ok;
  }

  public updateBranding(patch: Partial<BrandingSettings>): boolean {
    const s = this.getSettings();
    return this.save({ ...s, branding: { ...s.branding, ...patch } });
  }

  public setImageOverride(originalUrl: string, replacement: string): boolean {
    const s = this.getSettings();
    const oldOverride = s.imageOverrides[originalUrl];
    if (oldOverride && oldOverride !== replacement) {
      void deleteStorageFileIfSupabase(oldOverride);
    }
    return this.save({ ...s, imageOverrides: { ...s.imageOverrides, [originalUrl]: replacement } });
  }

  public clearImageOverride(originalUrl: string): void {
    const s = this.getSettings();
    const oldOverride = s.imageOverrides[originalUrl];
    if (oldOverride) {
      void deleteStorageFileIfSupabase(oldOverride);
    }
    const rest = { ...s.imageOverrides };
    delete rest[originalUrl];
    this.save({ ...s, imageOverrides: rest });
  }

  public resetAll(): void {
    this.save(merge(null));
  }

  // Optional cloud persistence (table: public.site_settings)
  private async pushRemote(settings: SiteSettings) {
    if (!isSupabaseConfigured) return;
    try {
      await supabase
        .from('site_settings')
        .upsert({ key: 'site', value: settings, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    } catch (e) {
      console.warn('Could not sync site settings to Supabase', e);
    }
  }

  public async pullRemote(): Promise<void> {
    if (!isSupabaseConfigured) return;
    try {
      const { data, error } = await supabase.from('site_settings').select('value').eq('key', 'site').maybeSingle();
      if (!error && data?.value) {
        this.save(merge(data.value as Partial<SiteSettings>), false);
      }
    } catch (e) {
      console.warn('Could not load site settings from Supabase', e);
    }
  }
}

export const siteSettingsService = new SiteSettingsService();

export const useSiteSettings = (): SiteSettings => {
  const [settings, setSettings] = useState<SiteSettings>(() => siteSettingsService.getSettings());
  useEffect(() => {
    const handle = () => setSettings({ ...siteSettingsService.getSettings() });
    window.addEventListener(EVENT, handle);
    return () => window.removeEventListener(EVENT, handle);
  }, []);
  return settings;
};

// ─── THEME + DOCUMENT APPLICATION ────────────────────────────────────────────
export const applyThemeAndMeta = (s: SiteSettings) => {
  const root = document.documentElement;
  root.style.setProperty('--brand-rgb', hexToRgbTriplet(s.branding.primaryColor));
  root.style.setProperty('--brand-dark-rgb', hexToRgbTriplet(s.branding.secondaryColor));
  if (!window.location.pathname.startsWith('/admin') && s.general.siteTitle) document.title = s.general.siteTitle;
  const desc = document.querySelector('meta[name="description"]');
  if (desc && s.general.metaDescription) desc.setAttribute('content', s.general.metaDescription);
  const icon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
  if (icon && s.branding.logoUrl) icon.href = s.branding.logoUrl;
};

// ─── GLOBAL IMAGE OVERRIDES ──────────────────────────────────────────────────
const isLogoSrc = (src: string) => /embuat-safaris-logo\.jpg/i.test(src);

const resolveSrc = (src: string, s: SiteSettings): string | null => {
  if (!src) return null;
  if (isLogoSrc(src)) {
    const logo = s.branding.logoUrl || DEFAULT_LOGO;
    return isLogoSrc(logo) ? null : logo;
  }
  // Don't rewrite tour photos inside the admin dashboard (they reflect database values)
  if (window.location.pathname.startsWith('/admin')) return null;
  return s.imageOverrides[src] || null;
};

const processImage = (img: HTMLImageElement, s: SiteSettings) => {
  const cur = img.getAttribute('src') || '';
  const applied = img.dataset.siteApplied;
  if (applied && cur === applied) return;
  const target = resolveSrc(cur, s);
  if (target && target !== cur) {
    img.dataset.siteOrig = cur;
    img.dataset.siteApplied = target;
    img.setAttribute('src', target);
  } else if (applied) {
    delete img.dataset.siteApplied;
    delete img.dataset.siteOrig;
  }
};

const rescanAll = (s: SiteSettings) => {
  document.querySelectorAll<HTMLImageElement>('img').forEach((img) => {
    if (img.dataset.siteOrig) {
      const orig = img.dataset.siteOrig;
      delete img.dataset.siteApplied;
      delete img.dataset.siteOrig;
      img.setAttribute('src', orig);
    }
    processImage(img, s);
  });
};

let started = false;
export const startSiteCustomization = () => {
  if (started) return;
  started = true;

  const applyAll = () => {
    const s = siteSettingsService.getSettings();
    applyThemeAndMeta(s);
    rescanAll(s);
  };
  applyAll();

  window.addEventListener(EVENT, applyAll);
  window.addEventListener('storage', applyAll);

  const observer = new MutationObserver((mutations) => {
    const s = siteSettingsService.getSettings();
    for (const m of mutations) {
      if (m.type === 'attributes' && m.target instanceof HTMLImageElement) {
        processImage(m.target, s);
      } else if (m.type === 'childList') {
        m.addedNodes.forEach((n) => {
          if (n instanceof HTMLImageElement) processImage(n, s);
          else if (n instanceof HTMLElement) n.querySelectorAll('img').forEach((i) => processImage(i, s));
        });
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] });

  void siteSettingsService.pullRemote();
};

/** For canvas / print contexts that load images outside the DOM. */
export const resolveImageUrl = (url: string): string => {
  const s = siteSettingsService.getSettings();
  return resolveSrc(url, s) || url;
};
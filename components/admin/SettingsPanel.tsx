import React, { useEffect, useRef, useState } from 'react';
import {
  Settings as SettingsIcon, Building2, Palette, Save, Upload, RotateCcw, Check, ShieldAlert, Globe2
} from 'lucide-react';
import {
  siteSettingsService, useSiteSettings, COLOR_PRESETS, darkenHex, DEFAULT_LOGO,
  GeneralSettings, CompanyProfile
} from '../../services/siteSettingsService';

interface Props {
  uploadImage: (file: File) => Promise<string>;
  showToast: (msg: string) => void;
}

type SettingsPage = 'general' | 'company' | 'branding';

const inputCls =
  'w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-[#6F5F52] text-xs outline-none focus:border-[#D96B27]';
const labelCls = 'block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5';
const cardCls = 'bg-[#15100C] border border-[#261D16] rounded-2xl p-5 sm:p-6 space-y-5';

const Field: React.FC<{ label: string; hint?: string; children: React.ReactNode }> = ({ label, hint, children }) => (
  <div>
    <label className={labelCls}>{label}</label>
    {children}
    {hint && <p className="text-[10px] text-[#8C7A6B] mt-1">{hint}</p>}
  </div>
);

const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void; label: string; desc?: string }> = ({
  checked, onChange, label, desc
}) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className="w-full flex items-center justify-between gap-4 p-3.5 rounded-xl bg-black/30 border border-white/5 hover:border-white/15 transition-colors text-left"
  >
    <span>
      <span className="block text-xs font-semibold text-white">{label}</span>
      {desc && <span className="block text-[11px] text-[#8C7A6B] mt-0.5">{desc}</span>}
    </span>
    <span className={`w-10 h-6 rounded-full p-0.5 flex-shrink-0 transition-colors ${checked ? 'bg-[#D96B27]' : 'bg-stone-700'}`}>
      <span className={`block w-5 h-5 rounded-full bg-white transition-transform ${checked ? 'translate-x-4' : ''}`} />
    </span>
  </button>
);

const SettingsPanel: React.FC<Props> = ({ uploadImage, showToast }) => {
  const settings = useSiteSettings();
  const [page, setPage] = useState<SettingsPage>('general');

  const [general, setGeneral] = useState<GeneralSettings>(settings.general);
  const [company, setCompany] = useState<CompanyProfile>(settings.company);
  const [siteName, setSiteName] = useState(settings.branding.siteName);
  const [slogan, setSlogan] = useState(settings.branding.slogan);
  const [customColor, setCustomColor] = useState(settings.branding.primaryColor);
  const [logoBusy, setLogoBusy] = useState(false);
  const logoInput = useRef<HTMLInputElement>(null);

  // keep drafts in sync if settings change elsewhere (e.g. cloud pull)
  useEffect(() => {
    setGeneral(settings.general);
    setCompany(settings.company);
    setSiteName(settings.branding.siteName);
    setSlogan(settings.branding.slogan);
    setCustomColor(settings.branding.primaryColor);
  }, [settings.general, settings.company, settings.branding]);

  const saveGeneral = () => {
    siteSettingsService.updateGeneral(general);
    showToast('General settings saved.');
  };
  const saveCompany = () => {
    siteSettingsService.updateCompany({ ...company, whatsapp: company.whatsapp.replace(/[^\d]/g, '') });
    showToast('Company profile saved and applied across the website.');
  };

  const applyPreset = (p: (typeof COLOR_PRESETS)[number]) => {
    siteSettingsService.updateBranding({ primaryColor: p.primary, secondaryColor: p.secondary, presetId: p.id });
    showToast(`${p.name} theme applied to the whole website.`);
  };
  const applyCustom = () => {
    siteSettingsService.updateBranding({
      primaryColor: customColor,
      secondaryColor: darkenHex(customColor, 0.14),
      presetId: 'custom'
    });
    showToast('Custom brand colour applied to the whole website.');
  };

  const saveIdentity = () => {
    siteSettingsService.updateBranding({ siteName: siteName.trim() || 'Embuat Safaris', slogan: slogan.trim() });
    showToast('Business name and slogan updated.');
  };

  const handleLogo = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please choose an image file.');
      return;
    }
    setLogoBusy(true);
    try {
      const url = await uploadImage(file);
      const ok = siteSettingsService.updateBranding({ logoUrl: url });
      showToast(ok ? 'Logo updated everywhere on the website.' : 'Logo updated, but browser storage is full â€” connect Supabase to keep it permanently.');
    } finally {
      setLogoBusy(false);
      if (logoInput.current) logoInput.current.value = '';
    }
  };

  const setC = (k: keyof CompanyProfile) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setCompany((c) => ({ ...c, [k]: e.target.value }));
  const setG = (k: keyof GeneralSettings) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setGeneral((g) => ({ ...g, [k]: e.target.value }));

  const tabs: { id: SettingsPage; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'general', label: 'General Settings', icon: SettingsIcon },
    { id: 'company', label: 'Company Profile', icon: Building2 },
    { id: 'branding', label: 'Branding & Theme', icon: Palette }
  ];

  const SaveBtn: React.FC<{ onClick: () => void; label?: string }> = ({ onClick, label = 'Save Changes' }) => (
    <button
      type="button"
      onClick={onClick}
      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D96B27] to-[#B84E14] hover:opacity-90 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-[#D96B27]/20 active:scale-95 transition-all"
    >
      <Save className="w-3.5 h-3.5" /> {label}
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 bg-[#15100C] p-2 rounded-2xl border border-[#261D16]">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = page === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setPage(t.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                active ? 'bg-[#D96B27] text-white shadow-md' : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" /> {t.label}
            </button>
          );
        })}
      </div>

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ GENERAL SETTINGS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {page === 'general' && (
        <div className="space-y-5">
          <div className={cardCls}>
            <h3 className="font-serif font-bold text-white text-base flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-[#D96B27]" /> Website &amp; SEO
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Field label="Browser Tab / SEO Title">
                  <input className={inputCls} value={general.siteTitle} onChange={setG('siteTitle')} />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="Meta Description" hint="Shown in Google search results (about 150 characters).">
                  <textarea rows={2} className={`${inputCls} resize-none`} value={general.metaDescription} onChange={setG('metaDescription')} />
                </Field>
              </div>
            </div>
          </div>

          <div className={cardCls}>
            <h3 className="font-serif font-bold text-white text-base">Website Features</h3>
            <div className="space-y-2.5">
              <Toggle
                checked={general.showWhatsappButton}
                onChange={(v) => setGeneral((g) => ({ ...g, showWhatsappButton: v }))}
                label="Floating WhatsApp button"
                desc="Show the green chat bubble on every public page."
              />
              <Toggle
                checked={general.showAiAssistant}
                onChange={(v) => setGeneral((g) => ({ ...g, showAiAssistant: v }))}
                label="AI Safari Assistant"
                desc="Show the floating safari-planning chat assistant."
              />
              <Toggle
                checked={general.announcementEnabled}
                onChange={(v) => setGeneral((g) => ({ ...g, announcementEnabled: v }))}
                label="Announcement banner"
                desc="Display a promotional message bar at the bottom of the website."
              />
              {general.announcementEnabled && (
                <input
                  className={inputCls}
                  placeholder="e.g. Book before 31 March and save 10% on Serengeti safaris"
                  value={general.announcementText}
                  onChange={setG('announcementText')}
                />
              )}
              <Toggle
                checked={general.maintenanceMode}
                onChange={(v) => setGeneral((g) => ({ ...g, maintenanceMode: v }))}
                label="Maintenance mode"
                desc="Visitors see a â€œback soonâ€ page. The admin dashboard stays accessible."
              />
              {general.maintenanceMode && (
                <p className="text-[11px] text-amber-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" /> The public website will be hidden after you save.
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset ALL settings (general, company, branding, colours, logo and replaced images) to defaults?')) {
                  siteSettingsService.resetAll();
                  showToast('All settings restored to defaults.');
                }
              }}
              className="text-xs text-stone-500 hover:text-rose-400 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset everything to defaults
            </button>
            <SaveBtn onClick={saveGeneral} />
          </div>
        </div>
      )}

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ COMPANY PROFILE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {page === 'company' && (
        <div className="space-y-5">
          <div className={cardCls}>
            <h3 className="font-serif font-bold text-white text-base">Business Identity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Legal Company Name"><input className={inputCls} value={company.legalName} onChange={setC('legalName')} /></Field>
              <Field label="Year Founded"><input className={inputCls} value={company.foundingYear} onChange={setC('foundingYear')} /></Field>
              <Field label="Business Registration No."><input className={inputCls} value={company.registrationNumber} onChange={setC('registrationNumber')} /></Field>
              <Field label="TIN / Tax ID"><input className={inputCls} value={company.taxId} onChange={setC('taxId')} /></Field>
              <div className="md:col-span-2">
                <Field label="Tourism / Safari Operator Licence" hint="e.g. TALA licence number">
                  <input className={inputCls} value={company.safariLicense} onChange={setC('safariLicense')} />
                </Field>
              </div>
            </div>
          </div>

          <div className={cardCls}>
            <h3 className="font-serif font-bold text-white text-base">Contact Details</h3>
            <p className="text-[11px] text-[#8C7A6B] -mt-3">Shown on the Footer, Contact page, mobile menu and booking confirmations.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Phone"><input className={inputCls} value={company.phone} onChange={setC('phone')} /></Field>
              <Field label="WhatsApp Number" hint="Digits only with country code, e.g. 255785341091">
                <input className={inputCls} value={company.whatsapp} onChange={setC('whatsapp')} />
              </Field>
              <Field label="Email"><input type="email" className={inputCls} value={company.email} onChange={setC('email')} /></Field>
              <Field label="Website"><input className={inputCls} placeholder="https://" value={company.website} onChange={setC('website')} /></Field>
              <div className="md:col-span-2">
                <Field label="Office Address"><input className={inputCls} value={company.address} onChange={setC('address')} /></Field>
              </div>
              <Field label="City / Town"><input className={inputCls} value={company.city} onChange={setC('city')} /></Field>
              <Field label="Country"><input className={inputCls} value={company.country} onChange={setC('country')} /></Field>
              <div className="md:col-span-2">
                <Field label="Office Hours"><input className={inputCls} value={company.officeHours} onChange={setC('officeHours')} /></Field>
              </div>
            </div>
          </div>

          <div className={cardCls}>
            <h3 className="font-serif font-bold text-white text-base">Social Media</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Facebook"><input className={inputCls} placeholder="https://facebook.com/..." value={company.facebook} onChange={setC('facebook')} /></Field>
              <Field label="Instagram"><input className={inputCls} placeholder="https://instagram.com/..." value={company.instagram} onChange={setC('instagram')} /></Field>
              <Field label="X / Twitter"><input className={inputCls} placeholder="https://x.com/..." value={company.twitter} onChange={setC('twitter')} /></Field>
              <Field label="YouTube"><input className={inputCls} placeholder="https://youtube.com/..." value={company.youtube} onChange={setC('youtube')} /></Field>
              <div className="md:col-span-2">
                <Field label="TripAdvisor"><input className={inputCls} placeholder="https://tripadvisor.com/..." value={company.tripadvisor} onChange={setC('tripadvisor')} /></Field>
              </div>
            </div>
          </div>

          <div className="flex justify-end"><SaveBtn onClick={saveCompany} label="Save Company Profile" /></div>
        </div>
      )}

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ BRANDING & THEME â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {page === 'branding' && (
        <div className="space-y-5">
          <div className={cardCls}>
            <h3 className="font-serif font-bold text-white text-base">Logo</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-[#D96B27] bg-[#F3EFE4] flex-shrink-0">
                <img src={settings.branding.logoUrl || DEFAULT_LOGO} alt="Current logo" className="w-full h-full object-contain" />
              </div>
              <div className="space-y-2">
                <p className="text-[11px] text-[#8C7A6B] max-w-md">
                  Upload your logo (square or round works best, PNG with transparent background recommended). It updates the navbar,
                  footer, mobile menu, booking vouchers, shared itineraries and the browser tab icon.
                </p>
                <div className="flex gap-2">
                  <input ref={logoInput} type="file" accept="image/*" className="hidden" onChange={(e) => handleLogo(e.target.files?.[0])} />
                  <button
                    type="button"
                    disabled={logoBusy}
                    onClick={() => logoInput.current?.click()}
                    className="px-4 py-2 rounded-xl bg-[#D96B27] hover:opacity-90 text-white text-xs font-bold flex items-center gap-2 disabled:opacity-60"
                  >
                    <Upload className="w-3.5 h-3.5" /> {logoBusy ? 'Uploadingâ€¦' : 'Upload New Logo'}
                  </button>
                  {settings.branding.logoUrl !== DEFAULT_LOGO && (
                    <button
                      type="button"
                      onClick={() => {
                        siteSettingsService.updateBranding({ logoUrl: DEFAULT_LOGO });
                        showToast('Original logo restored.');
                      }}
                      className="px-4 py-2 rounded-xl border border-white/10 text-stone-300 hover:text-white text-xs font-semibold flex items-center gap-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Restore original
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={cardCls}>
            <h3 className="font-serif font-bold text-white text-base">Business Name &amp; Slogan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Business Name" hint="First word shows in white/black, the rest in your brand colour.">
                <input className={inputCls} value={siteName} onChange={(e) => setSiteName(e.target.value)} />
              </Field>
              <Field label="Slogan / Tagline" hint="Shown under the logo in the navbar and footer.">
                <input className={inputCls} value={slogan} onChange={(e) => setSlogan(e.target.value)} />
              </Field>
            </div>
            <div className="flex justify-end"><SaveBtn onClick={saveIdentity} label="Save Name & Slogan" /></div>
          </div>

          <div className={cardCls}>
            <h3 className="font-serif font-bold text-white text-base">Website Colour Theme</h3>
            <p className="text-[11px] text-[#8C7A6B] -mt-3">Pick a theme â€” buttons, links, badges and highlights across the whole website change instantly.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {COLOR_PRESETS.map((p) => {
                const active = settings.branding.presetId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      active ? 'border-white/60 bg-white/5' : 'border-white/10 hover:border-white/30 bg-black/30'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-7 h-7 rounded-full border-2 border-white/20 flex items-center justify-center" style={{ background: p.primary }}>
                        {active && <Check className="w-3.5 h-3.5 text-white" />}
                      </span>
                      <span className="w-4 h-4 rounded-full" style={{ background: p.secondary }} />
                    </div>
                    <span className="block text-[11px] font-semibold text-white">{p.name}</span>
                    <span className="block text-[10px] font-mono text-[#8C7A6B]">{p.primary}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/5 flex flex-wrap items-end gap-4">
              <Field label="Custom Colour">
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="w-12 h-10 rounded-lg bg-transparent border border-white/10 cursor-pointer"
                  />
                  <input
                    className={`${inputCls} w-28 font-mono`}
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    maxLength={7}
                  />
                </div>
              </Field>
              <button
                type="button"
                onClick={applyCustom}
                className="px-4 py-2.5 rounded-xl bg-[#D96B27] hover:opacity-90 text-white text-xs font-bold"
              >
                Apply Custom Colour
              </button>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5">
              <span className="block text-[10px] uppercase tracking-wider text-stone-500 mb-3">Live preview</span>
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-2 rounded-lg text-white text-xs font-bold" style={{ background: settings.branding.primaryColor }}>Book This Safari</span>
                <span className="px-4 py-2 rounded-lg text-white text-xs font-bold" style={{ background: settings.branding.secondaryColor }}>Hover shade</span>
                <span className="text-sm font-bold" style={{ color: settings.branding.primaryColor }}>Explore Tanzania</span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold border" style={{ color: settings.branding.primaryColor, borderColor: settings.branding.primaryColor }}>BEST SELLER</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;

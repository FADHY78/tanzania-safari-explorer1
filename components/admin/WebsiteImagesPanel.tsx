import React, { useMemo, useRef, useState } from 'react';
import { Search, Upload, RotateCcw, Link2, Check, ImageIcon, Layers, X, Tag } from 'lucide-react';
import { SITE_IMAGE_REGISTRY, SiteImageEntry } from '../../data/siteImageRegistry';
import { siteSettingsService, useSiteSettings } from '../../services/siteSettingsService';
import { ARCHIVE_CATEGORIES, useImageArchive } from '../../services/imageArchiveService';

interface Props {
  uploadImage: (file: File) => Promise<string>;
  showToast: (msg: string) => void;
}

const WebsiteImagesPanel: React.FC<Props> = ({ uploadImage, showToast }) => {
  const settings = useSiteSettings();
  const archiveItems = useImageArchive();
  const [search, setSearch] = useState('');
  const [pageFilter, setPageFilter] = useState('All');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [urlEditId, setUrlEditId] = useState<string | null>(null);
  const [urlDraft, setUrlDraft] = useState('');
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Archive Picker Modal state
  const [archivePickerTarget, setArchivePickerTarget] = useState<SiteImageEntry | null>(null);
  const [archiveSearch, setArchiveSearch] = useState('');
  const [archiveCat, setArchiveCat] = useState('All');

  const pages = useMemo(() => {
    const set = new Set<string>();
    SITE_IMAGE_REGISTRY.forEach((i) => i.usedOn.forEach((p) => set.add(p)));
    return ['All', ...Array.from(set).sort()];
  }, []);

  const items = useMemo(
    () =>
      SITE_IMAGE_REGISTRY.filter((i) => {
        const q = search.toLowerCase();
        const matchSearch = !q || i.label.toLowerCase().includes(q) || i.usedOn.join(' ').toLowerCase().includes(q);
        const matchPage = pageFilter === 'All' || i.usedOn.includes(pageFilter);
        return matchSearch && matchPage;
      }),
    [search, pageFilter]
  );

  const filteredArchive = useMemo(() => {
    const q = archiveSearch.toLowerCase().trim();
    return archiveItems.filter((a) => {
      const matchCat = archiveCat === 'All' || a.category === archiveCat;
      const matchQ =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.activityTag.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [archiveItems, archiveSearch, archiveCat]);

  const overriddenCount = Object.keys(settings.imageOverrides).length;

  const handleFile = async (originalUrl: string, id: string, file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please choose an image file (PNG, JPG, WEBP, SVG).');
      return;
    }
    setBusyId(id);
    try {
      const url = await uploadImage(file);
      const ok = siteSettingsService.setImageOverride(originalUrl, url);
      showToast(
        ok
          ? 'Image replaced — it is now live everywhere it appears on the website.'
          : 'Image replaced for this session, but browser storage is full. Connect Supabase (or use a smaller image) to keep it permanently.'
      );
    } catch {
      alert('Could not process this image. Please try another file.');
    } finally {
      setBusyId(null);
      const input = fileRefs.current[id];
      if (input) input.value = '';
    }
  };

  const applyUrl = (originalUrl: string) => {
    const v = urlDraft.trim();
    if (!/^https?:\/\//i.test(v) && !v.startsWith('/')) {
      alert('Enter a full image link starting with https://');
      return;
    }
    siteSettingsService.setImageOverride(originalUrl, v);
    showToast('Image link applied across the website.');
    setUrlEditId(null);
    setUrlDraft('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#15100C] p-4 rounded-2xl border border-[#261D16] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A6B]" />
            <input
              type="text"
              placeholder="Search website images or pages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-[#8C7A6B] text-xs outline-none focus:border-[#D96B27]"
            />
          </div>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
            <select
              value={pageFilter}
              onChange={(e) => setPageFilter(e.target.value)}
              className="flex-1 sm:flex-initial px-3 py-2.5 sm:py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs outline-none focus:border-[#D96B27]"
            >
              {pages.map((p) => (
                <option key={p} value={p}>
                  {p === 'All' ? `All Pages (${SITE_IMAGE_REGISTRY.length})` : p}
                </option>
              ))}
            </select>
            {overriddenCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Restore every website image to its original?')) {
                    const s = siteSettingsService.getSettings();
                    siteSettingsService.save({ ...s, imageOverrides: {} });
                    showToast('All website images restored to originals.');
                  }
                }}
                className="px-3 py-2.5 sm:py-2 rounded-xl border border-white/10 text-stone-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset all ({overriddenCount})
              </button>
            )}
          </div>
        </div>
        <p className="text-[11px] text-[#8C7A6B] leading-relaxed">
          Every photo on the public website is listed here (banners, destinations, gallery, cultural visits, partner logos).
          You can upload a local file, paste a link, or select directly from your named <b className="text-stone-300">Image Archive</b>.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {items.map((img) => {
          const override = settings.imageOverrides[img.url];
          const current = override || img.url;
          const isPartner = img.label.startsWith('Partner Logo');
          return (
            <div
              key={img.id}
              className="bg-gradient-to-b from-[#18130E] to-[#100C08] rounded-2xl overflow-hidden border border-[#2E2016] hover:border-[#D96B27]/50 transition-colors flex flex-col"
            >
              <div className={`relative aspect-[16/10] overflow-hidden ${isPartner ? 'bg-white/90' : 'bg-black/60'}`}>
                <img
                  src={current}
                  alt={img.label}
                  data-site-admin-preview="true"
                  className={`w-full h-full ${isPartner ? 'object-contain p-6' : 'object-cover'}`}
                />
                {override && (
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-emerald-500/90 text-white text-[10px] font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Customised
                  </span>
                )}
              </div>
              <div className="p-3.5 space-y-2.5 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-serif font-bold text-sm text-white leading-snug">{img.label}</h4>
                  {img.id.startsWith('hero-') && (
                    <span className="px-2 py-0.5 rounded-full bg-[#D96B27]/25 border border-[#D96B27]/40 text-[9px] font-bold text-[#F5C478] uppercase tracking-wider flex-shrink-0">
                      Hero Banner
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  {img.usedOn.map((p) => (
                    <span key={p} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-[#A8988A]">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {urlEditId === img.id && (
                <div className="px-3.5 pb-3 flex gap-2">
                  <input
                    autoFocus
                    value={urlDraft}
                    onChange={(e) => setUrlDraft(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs outline-none focus:border-[#D96B27]"
                  />
                  <button
                    type="button"
                    onClick={() => applyUrl(img.url)}
                    className="px-3 py-1.5 rounded-lg bg-[#D96B27] text-white text-xs font-bold"
                  >
                    Apply
                  </button>
                </div>
              )}

              <div className="p-3.5 border-t border-[#261D16] bg-black/25 flex items-center gap-2">
                <input
                  ref={(el) => {
                    fileRefs.current[img.id] = el;
                  }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFile(img.url, img.id, e.target.files?.[0])}
                />
                <button
                  type="button"
                  disabled={busyId === img.id}
                  onClick={() => fileRefs.current[img.id]?.click()}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D96B27] to-[#B84E14] hover:opacity-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#D96B27]/20 active:scale-[0.98] transition-all disabled:opacity-60"
                >
                  <Upload className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{busyId === img.id ? 'Uploading…' : 'Upload'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setArchivePickerTarget(img);
                    setArchiveSearch('');
                    setArchiveCat('All');
                  }}
                  title="Select named photo from Image Archive"
                  className="py-2.5 px-3 rounded-xl bg-black/50 border border-[#D96B27]/30 text-[#F5C478] hover:text-white hover:bg-[#D96B27]/20 text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-colors"
                >
                  <Layers className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Archive</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUrlEditId(urlEditId === img.id ? null : img.id);
                    setUrlDraft('');
                  }}
                  title="Use an image link instead"
                  className="w-9 h-9 rounded-xl bg-black/50 border border-white/10 text-stone-300 hover:text-white flex items-center justify-center flex-shrink-0 active:scale-[0.98]"
                >
                  <Link2 className="w-3.5 h-3.5" />
                </button>

                {override && (
                  <button
                    type="button"
                    onClick={() => {
                      siteSettingsService.clearImageOverride(img.url);
                      showToast('Original image restored.');
                    }}
                    title="Restore original"
                    className="w-9 h-9 rounded-xl bg-black/50 border border-white/10 text-stone-300 hover:text-rose-400 flex items-center justify-center flex-shrink-0 active:scale-[0.98]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {items.length === 0 && (
        <div className="text-center py-16 text-[#8C7A6B] text-sm flex flex-col items-center gap-2">
          <ImageIcon className="w-8 h-8 opacity-50" />
          No images match your search.
        </div>
      )}

      {/* ─── MODAL: SELECT PHOTO FROM IMAGE ARCHIVE ─── */}
      {archivePickerTarget && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-gradient-to-b from-[#18120D] to-[#100C09] rounded-t-2xl sm:rounded-2xl border border-[#3A281C] shadow-2xl overflow-hidden max-h-[92dvh] sm:max-h-[90vh] flex flex-col">
            <div className="px-5 py-4 border-b border-white/10 bg-[#1A1410] flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-white text-sm sm:text-base">
                  Select from Image Archive
                </h3>
                <p className="text-[11px] text-[#8C7A6B]">
                  Replacing: <span className="text-[#F5C478] font-semibold">{archivePickerTarget.label}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setArchivePickerTarget(null)}
                className="w-8 h-8 rounded-xl bg-black/40 hover:bg-white/10 text-stone-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 border-b border-white/10 space-y-2.5 bg-black/30">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                <input
                  type="text"
                  placeholder="Search archive by tour activity name or park..."
                  value={archiveSearch}
                  onChange={(e) => setArchiveSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-[#D96B27]"
                />
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {['All', ...ARCHIVE_CATEGORIES].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setArchiveCat(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap ${
                      archiveCat === cat
                        ? 'bg-[#D96B27] text-white'
                        : 'bg-black/40 text-stone-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 sm:p-4 overflow-y-auto space-y-2 sm:space-y-0 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-3 max-h-[60vh]">
              {filteredArchive.map((arch) => (
                <div
                  key={arch.id}
                  onClick={() => {
                    siteSettingsService.setImageOverride(archivePickerTarget.url, arch.url);
                    showToast(`Applied "${arch.title}" to ${archivePickerTarget.label}!`);
                    setArchivePickerTarget(null);
                  }}
                  className="group flex sm:flex-col items-center sm:items-stretch gap-3 sm:gap-0 p-2 sm:p-0 rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#D96B27] bg-[#1a1c1e] sm:bg-black/50 transition-all hover:bg-white/[0.04] relative"
                >
                  <div className="w-24 h-20 sm:w-full sm:h-auto sm:aspect-[16/10] rounded-lg sm:rounded-none overflow-hidden relative shrink-0">
                    <img
                      src={arch.url}
                      alt={arch.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="hidden sm:block absolute top-2 left-2">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#D96B27]/90 text-white text-[9px] font-bold">
                        <Tag className="w-2.5 h-2.5" /> {arch.activityTag}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 sm:p-2.5 sm:absolute sm:bottom-0 sm:left-0 sm:right-0">
                    <div className="sm:hidden mb-1 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#D96B27]/20 border border-[#D96B27]/40 text-[#F5C478] text-[9px] font-bold">
                        <Tag className="w-2.5 h-2.5" /> {arch.activityTag}
                      </span>
                      <span className="text-[10px] text-stone-400 truncate">
                        {arch.category}
                      </span>
                    </div>
                    <div className="text-xs sm:text-[11px] font-bold text-white leading-tight line-clamp-2 group-hover:text-[#F5C478] transition-colors">
                      {arch.title}
                    </div>
                    <div className="sm:hidden mt-1.5 text-[10px] text-[#D96B27] font-medium">
                      Tap to select →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteImagesPanel;

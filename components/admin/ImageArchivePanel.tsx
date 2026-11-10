import React, { useMemo, useRef, useState } from 'react';
import {
  Search,
  Plus,
  Upload,
  Copy,
  Trash2,
  Edit3,
  Check,
  X,
  ExternalLink,
  Layers,
  Sparkles,
  Camera,
  Tag,
  Compass,
  FileText,
  Database,
  RefreshCw,
} from 'lucide-react';
import {
  ARCHIVE_CATEGORIES,
  ArchiveCategory,
  ArchiveImageItem,
  imageArchiveService,
  useImageArchive,
} from '../../services/imageArchiveService';
import { tourService, useLiveTours } from '../../services/tourService';
import { TourPackage } from '../../types';

interface Props {
  uploadImage: (file: File) => Promise<string>;
  showToast: (msg: string) => void;
}

const ImageArchivePanel: React.FC<Props> = ({ uploadImage, showToast }) => {
  const archiveItems = useImageArchive();
  const tours = useLiveTours();

  // Search & Filter
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Add Single Image Form State
  const [isAddOpen, setIsAddOpen] = useState(true);
  const [addMode, setAddMode] = useState<'single' | 'bulk'>('single');
  const [title, setTitle] = useState('');
  const [activityTag, setActivityTag] = useState('');
  const [category, setCategory] = useState<ArchiveCategory>('Safari & Wildlife');
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Bulk Add State
  const [bulkText, setBulkText] = useState('');
  const [bulkCategory, setBulkCategory] = useState<ArchiveCategory>('Safari & Wildlife');

  // Inline Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editTag, setEditTag] = useState('');
  const [editCategory, setEditCategory] = useState<ArchiveCategory>('Safari & Wildlife');
  const [editUrl, setEditUrl] = useState('');

  // Quick "Apply to Tour Package" Modal State
  const [assigningPhoto, setAssigningPhoto] = useState<ArchiveImageItem | null>(null);
  const [assignTourSearch, setAssignTourSearch] = useState('');
  const [assignTourCat, setAssignTourCat] = useState('All');
  const [isSyncingDb, setIsSyncingDb] = useState(false);

  const filteredItems = useMemo(() => {
    const q = search.toLowerCase().trim();
    return archiveItems.filter((item) => {
      const matchCat = categoryFilter === 'All' || item.category === categoryFilter;
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.activityTag.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.url.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [archiveItems, search, categoryFilter]);

  const filteredAssignTours = useMemo(() => {
    const q = assignTourSearch.toLowerCase().trim();
    return tours.filter((t) => {
      const matchCat = assignTourCat === 'All' || t.category === assignTourCat;
      const matchSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        (t.destination || '').toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [tours, assignTourSearch, assignTourCat]);

  const handleFileUpload = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }
    setIsUploading(true);
    try {
      const uploadedUrl = await uploadImage(file);
      setImageUrl(uploadedUrl);
      if (!title.trim()) {
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ');
        setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
      }
      showToast(`Uploaded "${file.name}" — ready to save to Image Archive!`);
    } catch {
      alert('Failed to process image file.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAddSingle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter an Image Name so you know which tour activity it belongs to.');
      return;
    }
    if (!imageUrl.trim()) {
      alert('Please paste an image link or upload a photo.');
      return;
    }
    const created = imageArchiveService.addItem({
      title: title.trim(),
      activityTag: activityTag.trim() || title.trim(),
      category,
      url: imageUrl.trim(),
    });
    showToast(`Added "${created.title}" to Image Archive!`);
    setTitle('');
    setActivityTag('');
    setImageUrl('');
  };

  const handleAddBulk = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = bulkText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      alert('Paste one or more lines in the format: Image Name | https://image-link.jpg');
      return;
    }

    const parsed: { title: string; url: string; activityTag?: string; category: ArchiveCategory }[] = [];
    for (const line of lines) {
      // Support "Name | URL" or "Name - https://..." or "Name : https://..."
      if (line.includes('|')) {
        const parts = line.split('|').map((p) => p.trim());
        if (parts.length >= 2 && parts[0] && parts[1]) {
          parsed.push({
            title: parts[0],
            url: parts[1],
            activityTag: parts[2] || parts[0],
            category: bulkCategory,
          });
          continue;
        }
      }
      const urlMatch = line.match(/(https?:\/\/\S+)/i);
      if (urlMatch) {
        const url = urlMatch[1];
        const namePart = line
          .replace(url, '')
          .replace(/^[\s\-:|–—]+|[\s\-:|–—]+$/g, '')
          .trim();
        parsed.push({
          title: namePart || `Safari Activity Photo ${parsed.length + 1}`,
          url,
          activityTag: namePart || bulkCategory,
          category: bulkCategory,
        });
      }
    }

    if (parsed.length === 0) {
      alert('Could not find valid image URLs (starting with http:// or https://).');
      return;
    }

    const count = imageArchiveService.addBulk(parsed);
    showToast(`Added ${count} named image${count > 1 ? 's' : ''} to the Image Archive!`);
    setBulkText('');
  };

  const startEdit = (item: ArchiveImageItem) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditTag(item.activityTag);
    setEditCategory(item.category);
    setEditUrl(item.url);
  };

  const saveEdit = (id: string) => {
    if (!editTitle.trim() || !editUrl.trim()) return;
    const { updatedPackagesCount } = imageArchiveService.updateItem(id, {
      title: editTitle.trim(),
      activityTag: editTag.trim() || editTitle.trim(),
      category: editCategory,
      url: editUrl.trim(),
    });
    setEditingId(null);
    if (updatedPackagesCount > 0) {
      showToast(
        `Updated archive image & automatically synced ${updatedPackagesCount} Website Package${updatedPackagesCount > 1 ? 's' : ''} in Database!`
      );
    } else {
      showToast('Updated archive image details in Database.');
    }
  };

  const handleAssignToTour = (tour: TourPackage, photo: ArchiveImageItem) => {
    imageArchiveService.assignToTour(photo.id, tour.id);
    showToast(`Applied "${photo.title}" to website package "${tour.name}" & synced to Database!`);
  };

  const handleSyncToDatabase = async () => {
    setIsSyncingDb(true);
    try {
      const res = await imageArchiveService.syncArchiveAndPackagesToSupabase();
      if (res.success) {
        showToast(
          `Synced ${res.archiveCount} Archive Photos & ${res.packagesCount} Website Packages to Database!`
        );
      } else {
        showToast(res.error || 'Saved locally. Run the SQL migration in Supabase to enable remote table sync.');
      }
    } finally {
      setIsSyncingDb(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ─── TOP HEADER & ADD TO ARCHIVE STUDIO ─── */}
      <div className="bg-gradient-to-b from-[#18130E] to-[#120D09] rounded-2xl border border-[#2E2016] overflow-hidden shadow-xl">
        <div className="px-4 sm:px-5 py-4 border-b border-[#261D16] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#16110C]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D96B27]/15 text-[#D96B27] border border-[#D96B27]/30 flex items-center justify-center flex-shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-white text-sm sm:text-base">
                Named Tour Activity Image Archive ({archiveItems.length} Photos)
              </h3>
              <p className="text-[11px] text-[#8C7A6B]">
                Save image links with clear tour activity names so you can select them anytime when replacing package or website photos.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleSyncToDatabase}
              disabled={isSyncingDb}
              className="col-span-2 sm:col-span-1 justify-center px-3 py-2 sm:py-1.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/70 text-emerald-300 border border-emerald-700/50 text-xs font-bold flex items-center gap-1.5 transition-all"
              title="Push all Image Archive items and Website Package image changes to Supabase Database"
            >
              {isSyncingDb ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Database className="w-3.5 h-3.5" />
              )}
              <span>{isSyncingDb ? 'Syncing DB...' : 'Sync Archive & Packages to DB'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsAddOpen(true);
                setAddMode('single');
              }}
              className={`justify-center px-3 py-2 sm:py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                isAddOpen && addMode === 'single'
                  ? 'bg-[#D96B27] text-white shadow-md'
                  : 'bg-black/40 text-stone-300 hover:text-white border border-white/10'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Named Image</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsAddOpen(true);
                setAddMode('bulk');
              }}
              className={`justify-center px-3 py-2 sm:py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                isAddOpen && addMode === 'bulk'
                  ? 'bg-[#D96B27] text-white shadow-md'
                  : 'bg-black/40 text-stone-300 hover:text-white border border-white/10'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Bulk Paste Links</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAddOpen(!isAddOpen)}
              className="col-span-2 sm:col-span-1 justify-center px-2.5 py-1.5 rounded-xl bg-black/40 text-stone-400 hover:text-white border border-white/10 text-xs"
            >
              {isAddOpen ? 'Hide Form' : 'Show Form'}
            </button>
          </div>
        </div>

        {isAddOpen && addMode === 'single' && (
          <form onSubmit={handleAddSingle} className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B8A79A] mb-1.5">
                  Image Name / Tour Activity *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ndutu Calving Wildebeest & Lion"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-[#8C7A6B] text-xs outline-none focus:border-[#D96B27]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B8A79A] mb-1.5">
                  Tour Activity Tag / Park Label
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3-Day Ndutu Calving / Tarangire Safari"
                  value={activityTag}
                  onChange={(e) => setActivityTag(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-[#8C7A6B] text-xs outline-none focus:border-[#D96B27]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B8A79A] mb-1.5">
                  Activity Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ArchiveCategory)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs outline-none focus:border-[#D96B27]"
                >
                  {ARCHIVE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#140E0A] text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
              <div className="flex-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B8A79A] mb-1.5">
                  Direct Image URL (or Upload File) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-[#8C7A6B] text-xs font-mono outline-none focus:border-[#D96B27]"
                />
              </div>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => void handleFileUpload(e.target.files?.[0])}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-4 py-2.5 rounded-xl bg-black/60 hover:bg-white/10 text-stone-200 border border-white/15 text-xs font-semibold flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Upload className="w-3.5 h-3.5 text-[#D96B27]" />
                <span>{isUploading ? 'Uploading...' : 'Upload Local File'}</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D96B27] to-[#B84E14] hover:opacity-95 text-white text-xs font-bold shadow-lg shadow-[#D96B27]/25 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Save to Image Archive</span>
              </button>
            </div>

            {imageUrl && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/10">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-20 h-14 rounded-lg object-cover bg-black border border-white/10"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-white truncate">
                    {title || 'Untitled Activity Photo'}
                  </div>
                  <div className="text-[11px] text-[#D96B27] truncate">
                    {activityTag || category}
                  </div>
                  <div className="text-[10px] text-stone-500 font-mono truncate">{imageUrl}</div>
                </div>
              </div>
            )}
          </form>
        )}

        {isAddOpen && addMode === 'bulk' && (
          <form onSubmit={handleAddBulk} className="p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#B8A79A]">
                  Paste Multiple Named Image Links (One per line)
                </label>
                <p className="text-[11px] text-[#8C7A6B]">
                  Format each line as: <code className="text-[#F5C478]">Tour Activity Name | https://image-link.jpg</code>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#B8A79A] font-semibold">Category:</span>
                <select
                  value={bulkCategory}
                  onChange={(e) => setBulkCategory(e.target.value as ArchiveCategory)}
                  className="px-3 py-1.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs outline-none focus:border-[#D96B27]"
                >
                  {ARCHIVE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#140E0A] text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <textarea
              rows={5}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={`Ndutu Calving Wildebeest Herd | https://example.com/ndutu-calving.jpg\nTarangire Elephant & Baobab | https://example.com/tarangire-elephants.jpg\nNyerere Boat Safari Hippos | https://example.com/nyerere-boat.jpg`}
              className="w-full p-3.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-[#8C7A6B]/60 text-xs font-mono outline-none focus:border-[#D96B27]"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D96B27] to-[#B84E14] hover:opacity-95 text-white text-xs font-bold shadow-lg shadow-[#D96B27]/25 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Add All Links to Image Archive</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ─── SEARCH & CATEGORY FILTER BAR ─── */}
      <div className="bg-[#15100C] p-4 rounded-2xl border border-[#261D16] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="relative w-full lg:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A6B]" />
          <input
            type="text"
            placeholder="Search archive by tour activity name, park (e.g. Ndutu, Tarangire, Serengeti)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-[#8C7A6B] text-xs outline-none focus:border-[#D96B27]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {['All', ...ARCHIVE_CATEGORIES].map((cat) => {
            const count =
              cat === 'All'
                ? archiveItems.length
                : archiveItems.filter((i) => i.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
                  categoryFilter === cat
                    ? 'bg-[#D96B27] text-white shadow-md'
                    : 'bg-black/40 text-stone-400 hover:text-white border border-white/5'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── ARCHIVE PHOTO GRID ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => {
          const isEditing = editingId === item.id;
          const usedByTours = tours.filter(
            (t) => t.image === item.url || t.coverImage === item.url
          );

          return (
            <div
              key={item.id}
              className="bg-gradient-to-b from-[#18130E] to-[#100C08] rounded-2xl overflow-hidden border border-[#2E2016] hover:border-[#D96B27]/50 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="relative aspect-[16/10] bg-black/60 overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/LION-IN-NGORONGORO-1-1.jpeg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#F5C478] border border-white/10">
                      {item.category}
                    </span>
                    {usedByTours.length > 0 && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/90 text-white text-[10px] font-bold flex items-center gap-1 shadow">
                        <Check className="w-3 h-3" /> In Use ({usedByTours.length})
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#D96B27]/90 text-white text-[10px] font-bold mb-1">
                      <Tag className="w-2.5 h-2.5" />
                      <span>{item.activityTag}</span>
                    </div>
                    <h4 className="font-serif font-bold text-sm text-white leading-snug line-clamp-2">
                      {item.title}
                    </h4>
                  </div>
                </div>

                {isEditing ? (
                  <div className="p-3.5 space-y-2.5 bg-black/40 border-b border-[#261D16]">
                    <div>
                      <label className="text-[10px] text-[#8C7A6B] uppercase font-bold block mb-1">
                        Image Name (Tour Activity)
                      </label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-black border border-white/15 text-white text-xs outline-none focus:border-[#D96B27]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-[#8C7A6B] uppercase font-bold block mb-1">
                          Activity Tag
                        </label>
                        <input
                          type="text"
                          value={editTag}
                          onChange={(e) => setEditTag(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-black border border-white/15 text-white text-xs outline-none focus:border-[#D96B27]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#8C7A6B] uppercase font-bold block mb-1">
                          Category
                        </label>
                        <select
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value as ArchiveCategory)}
                          className="w-full px-2 py-1.5 rounded-lg bg-black border border-white/15 text-white text-xs outline-none focus:border-[#D96B27]"
                        >
                          {ARCHIVE_CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-[#8C7A6B] uppercase font-bold block mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={editUrl}
                        onChange={(e) => setEditUrl(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-black border border-white/15 text-white text-[11px] font-mono outline-none focus:border-[#D96B27]"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-2.5 py-1 rounded-lg bg-white/5 text-stone-300 text-xs flex items-center gap-1"
                      >
                        <X className="w-3 h-3" /> Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => saveEdit(item.id)}
                        className="px-3 py-1 rounded-lg bg-[#D96B27] text-white text-xs font-bold flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" /> Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#8C7A6B]">
                      <span>Image Link:</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(item.url);
                            showToast(`Copied link for "${item.title}"`);
                          }}
                          className="text-[#D96B27] hover:underline flex items-center gap-1 text-[10px] font-semibold"
                        >
                          <Copy className="w-3 h-3" /> Copy Link
                        </button>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-stone-400 hover:text-white flex items-center gap-1 text-[10px]"
                        >
                          <ExternalLink className="w-3 h-3" /> Open
                        </a>
                      </div>
                    </div>
                    <div className="font-mono text-[10px] text-stone-400 bg-black/40 p-2 rounded-lg truncate border border-white/5">
                      {item.url}
                    </div>
                    {(() => {
                      const activeToursForPhoto = tours.filter(
                        (t) =>
                          t.image === item.url ||
                          t.coverImage === item.url ||
                          (item.linkedTourIds && item.linkedTourIds.includes(t.id))
                      );
                      return activeToursForPhoto.length > 0 ? (
                        <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-[10px] text-emerald-300">
                          <span className="truncate font-semibold">
                            Active on {activeToursForPhoto.length} package{activeToursForPhoto.length > 1 ? 's' : ''}:{' '}
                            {activeToursForPhoto.map((t) => t.name).join(', ')}
                          </span>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="p-3.5 border-t border-[#261D16] bg-black/25 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAssigningPhoto(item);
                    setAssignTourSearch('');
                    setAssignTourCat('All');
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D96B27] to-[#B84E14] hover:opacity-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#D96B27]/20 active:scale-[0.98] transition-all"
                >
                  <Compass className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Apply to Package</span>
                </button>

                <button
                  type="button"
                  onClick={() => startEdit(item)}
                  className="py-2.5 px-3 rounded-xl bg-black/50 hover:bg-white/10 text-stone-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-colors"
                  title="Rename or Edit Activity Tag"
                >
                  <Edit3 className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Remove "${item.title}" from the Image Archive?`)) {
                      imageArchiveService.deleteItem(item.id);
                      showToast(`Removed "${item.title}" from archive.`);
                    }
                  }}
                  className="w-9 h-9 rounded-xl bg-black/50 hover:bg-rose-950/60 text-stone-400 hover:text-rose-400 border border-white/10 flex items-center justify-center flex-shrink-0 active:scale-[0.98] transition-colors"
                  title="Delete from Archive"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── MODAL: ASSIGN ARCHIVE PHOTO TO TOUR PACKAGE ─── */}
      {assigningPhoto && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#18120D] to-[#100C09] rounded-t-2xl sm:rounded-2xl border border-[#3A281C] shadow-2xl overflow-hidden max-h-[92dvh] sm:max-h-[90vh] flex flex-col">
            <div className="px-5 py-4 border-b border-white/10 bg-[#1A1410] flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={assigningPhoto.url}
                  alt={assigningPhoto.title}
                  className="w-12 h-10 rounded-lg object-cover border border-[#D96B27]/40 flex-shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-serif font-bold text-white text-sm sm:text-base truncate">
                    Apply "{assigningPhoto.title}"
                  </h3>
                  <p className="text-[11px] text-[#8C7A6B]">
                    Click any tour package below to set this archive photo as its cover image.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAssigningPhoto(null)}
                className="w-8 h-8 rounded-xl bg-black/40 hover:bg-white/10 text-stone-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row gap-2.5 bg-black/30">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                <input
                  type="text"
                  placeholder="Search tour packages by name or ID..."
                  value={assignTourSearch}
                  onChange={(e) => setAssignTourSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-[#D96B27]"
                />
              </div>
              <select
                value={assignTourCat}
                onChange={(e) => setAssignTourCat(e.target.value)}
                className="px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-[#D96B27]"
              >
                <option value="All">All Categories ({tours.length})</option>
                <option value="Safari">Safari</option>
                <option value="Trekking">Trekking</option>
                <option value="Zanzibar">Zanzibar</option>
                <option value="Day Trips">Day Trips</option>
              </select>
            </div>

            <div className="p-4 overflow-y-auto space-y-2 flex-1 max-h-[55vh]">
              {filteredAssignTours.map((tour) => {
                const isAlreadyApplied =
                  tour.image === assigningPhoto.url || tour.coverImage === assigningPhoto.url;
                return (
                  <div
                    key={tour.id}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={tour.image || tour.coverImage}
                        alt={tour.name}
                        className="w-14 h-10 rounded-lg object-cover bg-black border border-white/10 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">{tour.name}</div>
                        <div className="text-[10px] text-[#8C7A6B] flex items-center gap-2">
                          <span className="text-[#F5C478] font-semibold">{tour.category}</span>
                          <span>•</span>
                          <span>{tour.duration}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAssignToTour(tour, assigningPhoto)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 flex-shrink-0 transition-all ${
                        isAlreadyApplied
                          ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-700/50'
                          : 'bg-[#D96B27] hover:bg-[#B84E14] text-white shadow'
                      }`}
                    >
                      {isAlreadyApplied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Applied</span>
                        </>
                      ) : (
                        <>
                          <Camera className="w-3.5 h-3.5" />
                          <span>Use Photo</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="px-5 py-3 border-t border-white/10 bg-[#16110C] flex justify-end">
              <button
                type="button"
                onClick={() => setAssigningPhoto(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageArchivePanel;


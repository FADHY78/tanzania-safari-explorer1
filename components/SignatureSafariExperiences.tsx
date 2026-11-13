import React, { useMemo } from 'react';
import { Compass, Camera, ShieldCheck, Flame, Eye, MapPin, ArrowRight, Refrigerator, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLiveTours } from '../services/tourService';
import { useImageArchive } from '../services/imageArchiveService';
import { TourPackage } from '../types';

export interface SafariExperience {
  id: string;
  tourId?: string;
  title: string;
  subtitle: string;
  location: string;
  category: string;
  image: string;
  fallbackImage: string;
  highlight: string;
  season: string;
  priceRange?: string;
}

export const EXPERIENCES_DATA: SafariExperience[] = [
  {
    id: 'migration',
    title: 'Great Migration River Crossing',
    subtitle: 'Nature’s Rawest Spectacle',
    location: 'Northern Serengeti & Mara River',
    category: 'Wildlife Drama',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/35/0f/c6/39/caption.jpg?w=1200&h=800&s=1',
    fallbackImage: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Serengeti-34.jpg',
    highlight: 'Over 1.5 million wildebeest and zebras braving crocodile-patrolled waters in an epic survival race.',
    season: 'Peak: July – October'
  },
  {
    id: 'balloon',
    title: 'Sunrise Hot Air Balloon Flight',
    subtitle: 'Golden Dawn Above the Savannah',
    location: 'Central Serengeti Plains',
    category: 'Aerial Magic',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    highlight: 'Drifting silently at dawn as predator prides wake up, followed by a champagne bush breakfast under an acacia.',
    season: 'Year-Round Wonder'
  },
  {
    id: 'crater',
    title: 'The Lost World of Ngorongoro',
    subtitle: 'Eden of the Big Five',
    location: 'Ngorongoro Volcanic Caldera',
    category: 'UNESCO Heritage',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/LION-IN-NGORONGORO-1-1.jpeg',
    highlight: 'Descending 600m into the world’s largest intact caldera, home to dense lion prides and rare black rhinos.',
    season: 'Prime Big Five: All Year'
  },
  {
    id: 'elephants',
    title: 'Ancient Baobabs & Giant Herds',
    subtitle: 'Cathedrals of the Savannah',
    location: 'Tarangire River Valley',
    category: 'Elephant Realm',
    image: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/07/elep.jpg',
    fallbackImage: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/e5/22/0c/caption.jpg?w=1200&h=800&s=1',
    highlight: 'Close encounters with multi-generational elephant families gathering under ancient thousand-year-old baobabs.',
    season: 'Dry Season: June – Nov'
  },
  {
    id: 'walking',
    title: 'Armed Ranger Walking Safari',
    subtitle: 'Touch the African Wild on Foot',
    location: 'Arusha & Tarangire Sanctuaries',
    category: 'Active Adventure',
    image: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/ARUSHA-NP.jpg',
    fallbackImage: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/LION-IN-NGORONGORO-1-1.jpeg',
    highlight: 'Step out of the Land Cruiser to read fresh tracks, smell wild sage, and feel the thrill of walking with giraffes.',
    season: 'Year-Round Experience'
  },
  {
    id: 'sundowner',
    title: 'Bush Sundowners & Lantern Dinners',
    subtitle: 'Under the Milky Way Galaxy',
    location: 'Exclusive Wilderness Camps',
    category: 'Safari Romance',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
    highlight: 'Handcrafted cocktails as the sun dips crimson over the horizon, followed by a chef-prepared dinner by the roaring campfire.',
    season: 'Every Evening on Safari'
  },
  {
    id: 'predators',
    title: 'Lions of the Serengeti Kopjes',
    subtitle: 'Kings of Granite Boulders',
    location: 'Seronera & Moru Kopjes',
    category: 'Predator Action',
    image: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Serengeti-34.jpg',
    fallbackImage: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/34/f5/09/a0/one-of-the-most-iconic.jpg?w=1400&h=900&s=1',
    highlight: 'Watch lion prides survey the vast savannah from ancient granite rocks just like pride rock in real life.',
    season: 'All-Year Thrill'
  },
  {
    id: 'beach',
    title: 'Bush to Beach: Zanzibar Dhow Sail',
    subtitle: 'Turquoise Coral Paradise',
    location: 'Mnemba Atoll & Nakupenda Sandbank',
    category: 'Island Serenity',
    image: 'https://alulizanzibar.co.tz/images/Nakupenda_Sandbank_01.jpg',
    fallbackImage: 'https://alulizanzibar.co.tz/images/Full_Day_Safari_Blue_Trip_01.jpg',
    highlight: 'After dusty days on the savannah, glide across azure waters on a wooden dhow to snorkel with wild dolphins.',
    season: 'Ideal Safari Ending'
  }
];

const SIGNATURE_PACKAGE_IDS = [
  'safari-northern-circuit-6-days',
  'kilimanjaro-machame-7-days',
  'kilimanjaro-lemosho-8-days',
  'zanzibar-prison-island-spice-4-days',
  'safari-serengeti-ngorongoro-5-days',
  'safari-tarangire-manyara-ngorongoro-3-days',
  'daytrip-ngorongoro-crater-1-day',
  'daytrip-materuni-waterfalls-coffee',
  'zanzibar-safari-blue-full-day',
  'kilimanjaro-marangu-6-days'
];

const ExperienceCard: React.FC<{ item: SafariExperience }> = ({ item }) => {
  const targetLink = item.tourId ? `/tour/${item.tourId}` : '/tours';

  return (
    <div className="w-[300px] sm:w-[340px] md:w-[360px] flex-shrink-0 group relative bg-white dark:bg-[#121212] rounded-3xl border border-black/10 dark:border-white/10 overflow-hidden shadow-md hover:shadow-2xl hover:border-brand-gold transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] select-none mx-3 flex flex-col justify-between">
      {/* Image Container with Dynamic Gradient Overlay */}
      <div className="h-56 sm:h-60 overflow-hidden relative bg-neutral-900">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            if (target.src !== item.fallbackImage) {
              target.src = item.fallbackImage;
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex flex-wrap items-center justify-between gap-1.5">
          <span className="text-[9.5px] sm:text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg sm:rounded-full bg-brand-gold/90 backdrop-blur-md text-white shadow-sm leading-tight whitespace-nowrap">
            {item.category}
          </span>
          <span className="text-[9.5px] sm:text-[10px] font-bold text-white bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg sm:rounded-full border border-white/20 flex items-center gap-1 leading-tight whitespace-nowrap">
            <Calendar className="w-3 h-3 text-brand-gold flex-shrink-0" /> <span>{item.season}</span>
          </span>
        </div>

        {/* Title inside image gradient */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <div className="flex items-center gap-1.5 text-[11px] text-brand-gold font-semibold mb-1">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>
          <h3 className="font-serif font-bold text-lg sm:text-xl leading-tight text-white group-hover:text-brand-gold transition-colors line-clamp-2">
            {item.title}
          </h3>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white dark:bg-[#121212]">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-gold truncate">
              {item.subtitle}
            </p>
            {item.priceRange && (
              <span className="text-xs font-extrabold text-black dark:text-white bg-brand-gold/15 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                From {item.priceRange}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-light line-clamp-3">
            {item.highlight}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
            Embuat Private Expeditions
          </span>
          <Link 
            to={targetLink} 
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-gold group-hover:translate-x-1 transition-all"
          >
            <span>{item.tourId ? 'View Package' : 'Explore Tours'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const SignatureSafariExperiences: React.FC = () => {
  const liveTours = useLiveTours();
  const archivePhotos = useImageArchive();

  // Build sliding packages dynamically from the live database (Admin Dashboard / Supabase tour_packages)
  const slidingPackages: SafariExperience[] = useMemo(() => {
    const activeTours = liveTours.filter(
      (t) => t.status !== 'draft' && t.status !== 'archived'
    );

    if (activeTours.length === 0) {
      return EXPERIENCES_DATA;
    }

    // Map any tour ID to its latest assigned Image Archive photo if linked
    const archiveByTourId = new Map<string, string>();
    archivePhotos.forEach((photo) => {
      if (Array.isArray(photo.assignedTourIds)) {
        photo.assignedTourIds.forEach((tid) => {
          if (tid && photo.url) {
            archiveByTourId.set(tid, photo.url);
          }
        });
      }
    });

    const selectedTours: TourPackage[] = [];
    const seenIds = new Set<string>();

    const addTour = (t: TourPackage | undefined) => {
      if (!t || seenIds.has(t.id)) return;
      seenIds.add(t.id);
      selectedTours.push(t);
    };

    // 1. Prioritize packages updated or featured in the Admin Dashboard or linked in Image Archive
    activeTours
      .filter((t) => Boolean(t.updatedAt) || Boolean(t.featured) || archiveByTourId.has(t.id))
      .sort((a, b) => {
        const timeA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const timeB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        return timeB - timeA;
      })
      .forEach(addTour);

    // 2. Include flagship signature package IDs from the database
    SIGNATURE_PACKAGE_IDS.forEach((id) => {
      addTour(activeTours.find((t) => t.id === id));
    });

    // 3. Ensure balanced representation across Safari, Trekking, Zanzibar & Day Trips
    (['Safari', 'Trekking', 'Zanzibar', 'Day Trips'] as const).forEach((cat) => {
      activeTours
        .filter((t) => t.category === cat)
        .slice(0, 3)
        .forEach(addTour);
    });

    // Keep top 12 packages for a smooth, responsive marquee loop
    const finalTours = selectedTours.slice(0, 12);

    return finalTours.map((tour): SafariExperience => {
      const dbPicture =
        tour.image ||
        tour.coverImage ||
        archiveByTourId.get(tour.id) ||
        'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/LION-IN-NGORONGORO-1-1.jpeg';

      const fallbackPicture =
        tour.coverImage ||
        tour.image ||
        'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Serengeti-34.jpg';

      const highlightText =
        Array.isArray(tour.highlights) && tour.highlights.length > 0
          ? tour.highlights.slice(0, 2).join(' • ')
          : tour.description || `${tour.duration} private guided ${tour.category} expedition in Tanzania.`;

      return {
        id: tour.id,
        tourId: tour.id,
        title: tour.name,
        subtitle: tour.subcategory || `${tour.category} Expedition`,
        location: tour.destination || tour.location || `${tour.category} Circuit, Tanzania`,
        category: tour.badge || tour.category,
        image: dbPicture,
        fallbackImage: fallbackPicture,
        highlight: highlightText,
        season: tour.duration,
        priceRange: tour.priceRange || (tour.fromPrice ? `$${Number(tour.fromPrice).toLocaleString()}` : undefined)
      };
    });
  }, [liveTours, archivePhotos]);

  const marqueeItems = [...slidingPackages, ...slidingPackages];

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A] overflow-hidden transition-colors duration-300 border-t border-black/10 dark:border-white/10">
      
      {/* Section Header */}
      <div className="container mx-auto px-4 sm:px-6 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/25 mb-3">
            <Compass className="w-4 h-4 text-brand-gold" />
            <span className="text-brand-gold font-bold text-xs uppercase tracking-widest">
              Unrivaled African Moments
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-black dark:text-white leading-tight">
            Life in the African Wild: <br />
            <span className="text-brand-gold">
              Signature Safari Experiences
            </span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base mt-3 font-light leading-relaxed">
            From the thunder of the Great Migration and sunrise balloon flights to romantic bush campfire dining, here is what awaits you with Embuat Safaris.
          </p>
        </div>
      </div>

      {/* Automatic Smooth Slide Track */}
      <div className="relative w-full overflow-hidden pause-on-hover">
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-white dark:from-[#0A0A0A] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-white dark:from-[#0A0A0A] to-transparent z-10 pointer-events-none"></div>

        <div className="py-4 flex items-center overflow-hidden">
          <div className="animate-marquee flex items-center">
            {marqueeItems.map((item, index) => (
              <ExperienceCard key={`${item.id}-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Safari Fleet & Bush Comfort Showcase Bar */}
      <div className="container mx-auto px-4 sm:px-6 mt-8 sm:mt-12">
        <div className="max-w-5xl mx-auto p-4 sm:p-8 bg-neutral-50 dark:bg-[#121212] rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-6 pb-4 sm:pb-6 border-b border-black/10 dark:border-white/10 text-center md:text-left">
            <div>
              <span className="text-brand-gold font-bold text-[10px] sm:text-xs uppercase tracking-widest flex items-center justify-center md:justify-start gap-1.5">
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold flex-shrink-0" /> The Embuat Expedition Standard
              </span>
              <h4 className="text-lg sm:text-2xl font-serif font-bold text-black dark:text-white mt-1">
                Custom-Built 4x4 Safari Land Cruisers
              </h4>
            </div>
            <p className="text-[11px] sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md font-light leading-relaxed">
              Every private journey features our purpose-engineered safari vehicles, outfitted for total comfort across rugged wilderness terrain.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-4 sm:pt-6 text-center">
            <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 flex flex-col items-center justify-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto rounded-lg sm:rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-1.5 sm:mb-2 flex-shrink-0">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <p className="text-[11px] sm:text-xs font-bold text-black dark:text-white leading-tight">360° Pop-Up Roof</p>
              <p className="text-[9.5px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-tight">Unobstructed wildlife photos</p>
            </div>

            <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 flex flex-col items-center justify-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto rounded-lg sm:rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-1.5 sm:mb-2 flex-shrink-0">
                <Refrigerator className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <p className="text-[11px] sm:text-xs font-bold text-black dark:text-white leading-tight">Onboard Fridge &amp; Power</p>
              <p className="text-[9.5px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-tight">Cold drinks &amp; camera charging</p>
            </div>

            <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 flex flex-col items-center justify-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto rounded-lg sm:rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-1.5 sm:mb-2 flex-shrink-0">
                <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <p className="text-[11px] sm:text-xs font-bold text-black dark:text-white leading-tight">Pro Bush Optics</p>
              <p className="text-[9.5px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-tight">Nikon binoculars &amp; bean bags</p>
            </div>

            <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 flex flex-col items-center justify-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto rounded-lg sm:rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-1.5 sm:mb-2 flex-shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <p className="text-[11px] sm:text-xs font-bold text-black dark:text-white leading-tight">AMREF Evacuation</p>
              <p className="text-[9.5px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-tight">24/7 bush medical coverage</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default SignatureSafariExperiences;

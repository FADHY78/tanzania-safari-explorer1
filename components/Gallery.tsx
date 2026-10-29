import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Eye, X, ChevronLeft, ChevronRight, ArrowRight, MapPin } from 'lucide-react';
import CategoryIcon from './CategoryIcon';
import { useLanguage } from '../context/LanguageContext';

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: 'Safari' | 'Trekking' | 'Zanzibar' | 'Day Trips';
  location: string;
  description: string;
  tourLink?: string;
  tourName?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  // Wildlife Safari
  {
    id: 'safari-1',
    src: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    title: 'Lion Pride on Serengeti Kopje',
    category: 'Safari',
    location: 'Serengeti National Park',
    description: 'A majestic pride of lions resting atop granite rocks with panoramic savannah views.',
    tourLink: '/tour/safari-northern-circuit-6-days',
    tourName: '6-Day Northern Circuit Wildlife Safari'
  },
  {
    id: 'safari-2',
    src: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/07/elep.jpg',
    title: 'Elephant Family in Tarangire',
    category: 'Safari',
    location: 'Tarangire National Park',
    description: 'Centuries-old baobabs frame matriarch-led elephant herds along the riverbanks.',
    tourLink: '/tour/safari-ngorongoro-wild-camp-4-days',
    tourName: '4 Days Ngorongoro & Tarangire Wild Camp'
  },
  {
    id: 'safari-3',
    src: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    title: 'Ngorongoro Crater Floor',
    category: 'Safari',
    location: 'Ngorongoro Conservation Area',
    description: 'The world’s largest intact volcanic caldera hosting high predator densities and black rhinos.',
    tourLink: '/tour/safari-ngorongoro-crater-4-days',
    tourName: '4 Days Ngorongoro Crater Expedition'
  },
  {
    id: 'safari-4',
    src: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80',
    title: 'Cheetah on the Serengeti Plains',
    category: 'Safari',
    location: 'Central Serengeti (Seronera)',
    description: 'Fastest land animal scanning the vast grassland horizon during early morning hunt.',
    tourLink: '/tour/safari-56-great-migration-5-days',
    tourName: '5-Day Serengeti Great Migration Safari'
  },
  {
    id: 'safari-5',
    src: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=1200&q=80',
    title: 'African Leopard in Acacia Tree',
    category: 'Safari',
    location: 'Serengeti Seronera Valley',
    description: 'The elusive solitary predator relaxing on high tree branches after a successful twilight stalk.',
    tourLink: '/tour/safari-serengeti-flying-5-days',
    tourName: '5 Days Serengeti Flying Luxury Safari'
  },
  {
    id: 'safari-6',
    src: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1200&q=80',
    title: 'Towering Maasai Giraffes',
    category: 'Safari',
    location: 'Arusha & Lake Manyara',
    description: 'Graceful giraffes browsing acacia canopy beneath the shadows of Mount Meru.',
    tourLink: '/tour/safari-tanzania-classic-4-days',
    tourName: '4 Days Tanzania Classic Safari'
  },
  {
    id: 'safari-7',
    src: 'https://images.unsplash.com/photo-1504173010664-32509aeebb62?auto=format&fit=crop&w=1200&q=80',
    title: 'Plains Zebras at Sunset',
    category: 'Safari',
    location: 'Ndutu Plains',
    description: 'Dazzling black and white herds gathering on the southern Serengeti plains during calving season.',
    tourLink: '/tour/safari-56-ndutu-calving-5-days',
    tourName: '5-Day Ndutu Calving Season Safari'
  },
  {
    id: 'safari-8',
    src: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80',
    title: 'Majestic Bull Elephant',
    category: 'Safari',
    location: 'Tarangire National Park',
    description: 'Iconic African bush elephant moving silently through the golden grass beneath the acacia trees.',
    tourLink: '/tour/tarangire-national-park-day-trip',
    tourName: 'Tarangire National Park Day Trip'
  },

  // Kilimanjaro Treks
  {
    id: 'kili-1',
    src: 'https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?auto=format&fit=crop&w=1200&q=80',
    title: 'Uhuru Peak 5,895m Summit Sunrise',
    category: 'Trekking',
    location: 'Mount Kilimanjaro Summit',
    description: 'Standing at the Roof of Africa as the golden African dawn breaks over glaciers and clouds.',
    tourLink: '/tour/kilimanjaro-machame-7-days',
    tourName: '7 Days Kilimanjaro Climb – Machame Route'
  },
  {
    id: 'kili-2',
    src: 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/7-days-machame-q7uhx4dl11xrr3ao020xabzqzwvm9oxm4gn0ke87mo.jpg',
    title: 'Trekking Machame Ridge Trail',
    category: 'Trekking',
    location: 'Machame Route',
    description: 'Hikers navigating scenic afro-alpine ridges with breathtaking views of Kibo Crater.',
    tourLink: '/tour/kilimanjaro-machame-7-days',
    tourName: '7 Days Kilimanjaro Climb – Machame Route'
  },
  {
    id: 'kili-3',
    src: 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1200&q=80',
    title: 'Conquering the Barranco Wall',
    category: 'Trekking',
    location: 'Barranco Valley',
    description: 'The famous scramble up the volcanic wall rewarding climbers with epic mountain vistas.',
    tourLink: '/tour/kilimanjaro-machame-6-days',
    tourName: '6 Days Kilimanjaro Climb – Machame Route'
  },
  {
    id: 'kili-4',
    src: 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/Lemosho-Hiking-kilimajaro-climb-qu8sutmciqoioii2vyiflva3p689oa7o49v1aj8hpc.jpg',
    title: 'Lemosho Glades & Shira Plateau',
    category: 'Trekking',
    location: 'Lemosho Route',
    description: 'Remote wilderness approach offering exceptional high-altitude acclimatization and dramatic scenery.',
    tourLink: '/tour/kilimanjaro-lemosho-8-days',
    tourName: '8 Days Kilimanjaro Climb – Lemosho Route'
  },
  {
    id: 'kili-5',
    src: 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/marangu-6-days1-q7up38u1t7ag04cuqmqp072nn4ma1fo0y216xvi6xs.jpg',
    title: 'Classic Marangu Hut Trail',
    category: 'Trekking',
    location: 'Marangu Route (Coca-Cola Route)',
    description: 'The historic path through moss-draped montane rainforest up to Mandara and Horombo huts.',
    tourLink: '/tour/kilimanjaro-marangu-6-days',
    tourName: '6 Days Kilimanjaro Climb – Marangu Route'
  },
  {
    id: 'kili-6',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    title: 'High Altitude Camp Under the Stars',
    category: 'Trekking',
    location: 'Karanga & Barafu Camps',
    description: 'Tented base camp nestled beneath shimmering equatorial night skies before the midnight summit push.',
    tourLink: '/tour/kilimanjaro-lemosho-7-days',
    tourName: '7 Days Kilimanjaro Climb – Lemosho Route'
  },

  // Zanzibar Island
  {
    id: 'zanzibar-1',
    src: 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/zanzibar-beach-view-1024x576.jpg',
    title: 'Turquoise Waters of Nungwi & Kendwa',
    category: 'Zanzibar',
    location: 'North Coast Zanzibar',
    description: 'Crystal-clear Indian Ocean waters with non-tidal swimming and pristine white powder sands.',
    tourLink: '/tour/zanzibar-stone-town-2-days',
    tourName: '2 Days Zanzibar Stone Town & Beach'
  },
  {
    id: 'zanzibar-2',
    src: 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/mahali-zanzibar-1024x683.jpg',
    title: 'Paje Beach Ocean Breeze',
    category: 'Zanzibar',
    location: 'Southeast Coast Zanzibar',
    description: 'Vibrant coastal paradise famed for tidal sandbanks, kite surfing, and relaxed tropical vibes.',
    tourLink: '/tour/zanzibar-prison-island-spice-4-days',
    tourName: '4 Days Zanzibar Island & Spice Tour'
  },
  {
    id: 'zanzibar-3',
    src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    title: 'Sunset Dhow Cruise on the Swahili Coast',
    category: 'Zanzibar',
    location: 'Stone Town Harbor',
    description: 'Traditional wooden dhow sailboat gliding peacefully into dramatic crimson African sunsets.',
    tourLink: '/tour/zanzibar-sunset-dhow-cruise-half-day',
    tourName: 'Zanzibar Sunset Dhow Cruise Half Day Tour'
  },
  {
    id: 'zanzibar-4',
    src: 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/photo0jpg-1024x768.jpg',
    title: 'Stone Town Alleys & Swahili Doors',
    category: 'Zanzibar',
    location: 'Stone Town UNESCO World Heritage',
    description: 'Labyrinthine alleys lined with intricately carved teak doors, spice stalls, and historic coral stone architecture.',
    tourLink: '/tour/zanzibar-stone-town-spice-tour-half-day',
    tourName: 'Stone Town & Spice Tour Half Day'
  },
  {
    id: 'zanzibar-5',
    src: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80',
    title: 'Luxury Beachfront Villa Hideaway',
    category: 'Zanzibar',
    location: 'Matemwe & Kiwengwa',
    description: 'Exclusive Indian Ocean beach sanctuary overlooking turquoise coral reefs and swaying palms.',
    tourLink: '/tour/zanzibar-taste-of-zanzibar-6-days',
    tourName: '6 Days Taste of Zanzibar Luxury Holiday'
  },
  {
    id: 'zanzibar-6',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    title: 'Mnemba Atoll Coral Reef Waters',
    category: 'Zanzibar',
    location: 'Mnemba Marine Conservation Area',
    description: 'World-class snorkeling alongside playful bottlenose dolphins, green sea turtles, and kaleidoscopic reef fish.',
    tourLink: '/tour/zanzibar-mnemba-snorkeling-dolphins-half-day',
    tourName: 'Mnemba Atoll Snorkeling & Dolphin Tour'
  },

  // Day Trips & Cultural
  {
    id: 'day-1',
    src: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/MATERUNI-DT.jpg',
    title: 'Materuni Waterfall & Coffee Experience',
    category: 'Day Trips',
    location: 'Foothills of Mount Kilimanjaro',
    description: 'Hike through lush banana groves to a 80m roaring waterfall followed by authentic Chagga coffee roasting.',
    tourLink: '/tour/materuni-waterfall-day-trip',
    tourName: 'Materuni Waterfall & Coffee Tour Day Trip'
  },
  {
    id: 'day-2',
    src: 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/maasai-boma1-quj0eomliq423umh5979wbutmmzg0963hchobwsin0.jpg',
    title: 'Authentic Maasai Boma Cultural Visit',
    category: 'Day Trips',
    location: 'Monduli Maasai Village',
    description: 'Immersive cultural exchange featuring traditional adumu jumping dance, beadcraft, and ancient customs.',
    tourLink: '/tour/maasai-boma-day-trip',
    tourName: 'Maasai Boma Cultural Day Trip'
  },
  {
    id: 'day-3',
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    title: 'Emerald Waters of Lake Chala',
    category: 'Day Trips',
    location: 'Kilimanjaro-Kenya Border',
    description: 'A deep volcanic crater lake with strikingly clear turquoise waters ideal for kayaking and tranquil nature walks.',
    tourLink: '/tour/lake-chala-day-trip',
    tourName: 'Lake Chala Day Trip'
  },
  {
    id: 'day-4',
    src: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/ARUSHA-NP.jpg',
    title: 'Arusha National Park Walking Safari',
    category: 'Day Trips',
    location: 'Arusha National Park',
    description: 'Walk on foot alongside armed ranger guides past grazing zebras, giraffes, and colobus monkeys under Mount Meru.',
    tourLink: '/tour/arusha-national-park-day-trip',
    tourName: 'Arusha National Park Day Trip'
  },
  {
    id: 'day-5',
    src: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/MARANGU-WF-COVER.jpg',
    title: 'Marangu Waterfalls & Chagga Caves',
    category: 'Day Trips',
    location: 'Marangu Village, Moshi',
    description: 'Discover Ndoro waterfall cascade and explore the historic underground tunnels built by ancient Chagga warriors.',
    tourLink: '/tour/marangu-waterfall-day-trip',
    tourName: 'Marangu Waterfall Day Trip'
  },
  {
    id: 'day-6',
    src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    title: 'Traditional Arabica Coffee Roasting',
    category: 'Day Trips',
    location: 'Materuni Village',
    description: 'Hand-pick, pound, roast, and brew aromatic mountain coffee beans directly with local farmers.',
    tourLink: '/tour/materuni-waterfall-day-trip',
    tourName: 'Materuni Waterfall & Coffee Tour'
  }
];

const categories = ['All', 'Safari', 'Trekking', 'Zanzibar', 'Day Trips'] as const;

const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const openLightbox = (item: GalleryItem) => setSelectedImage(item);
  const closeLightbox = () => setSelectedImage(null);

  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex(i => i.id === selectedImage.id);
    if (currentIndex === -1) return;
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % filteredItems.length
      : (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[newIndex]);
  };

  return (
    <section id="gallery" className="py-20 bg-white dark:bg-[#0A0A0A] transition-colors">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#F97316]/10 border border-[#F97316]/25 text-[#F97316] rounded-full text-xs font-bold tracking-widest uppercase mb-4">
            <Camera className="w-3.5 h-3.5" /> Authentic Expeditions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-black dark:text-white mb-4">
            Moments Captured Across <span className="text-[#F97316]">Tanzania</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm md:text-base leading-relaxed">
            From the endless savannahs of Serengeti and summit glaciers of Kilimanjaro to the azure waters of Zanzibar and lush cultural foothill day tours.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-nowrap overflow-x-auto pb-3 sm:pb-0 sm:flex-wrap items-center justify-start sm:justify-center gap-2 mb-10 sm:mb-12 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 flex-shrink-0 flex items-center gap-2 ${activeCategory === cat
                ? 'bg-[#F97316] text-white shadow-lg shadow-[#F97316]/25 scale-105'
                : 'bg-neutral-100 hover:bg-neutral-200 text-black dark:bg-[#121212] dark:text-neutral-300 dark:hover:bg-white/15 dark:hover:text-white border border-black/10 dark:border-white/10'
                }`}
            >
              <CategoryIcon category={cat} className="w-4 h-4 flex-shrink-0" />
              <span>
                {cat === 'All' ? t('cat.all') : cat === 'Safari' ? t('cat.safari') : cat === 'Trekking' ? t('cat.kilimanjaro') : cat === 'Zanzibar' ? t('cat.zanzibar') : t('cat.daytrips')}
              </span>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1.5 bg-neutral-900 border border-black/10 dark:border-white/10 hover:border-[#F97316]"
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>

              {/* Category Badge */}
              <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4">
                <span className="px-2.5 sm:px-3 py-1 bg-[#F97316]/90 backdrop-blur-md text-white text-[10px] font-bold rounded-lg sm:rounded-full uppercase tracking-wider shadow-md border border-white/20 leading-tight inline-block">
                  {item.category}
                </span>
              </div>

              {/* View Overlay Button */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#F97316] transition-colors">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                <div className="flex items-center gap-1.5 text-[#F97316] text-xs font-semibold mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>
                <h3 className="font-serif font-bold text-sm sm:text-base text-white group-hover:text-[#F97316] transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info banner */}
        <div className="mt-12 sm:mt-14 p-6 bg-neutral-50 dark:bg-[#121212] rounded-2xl border border-black/10 dark:border-white/10 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-bold text-black dark:text-white text-sm">Love what you see?</h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">Every photo here comes from our authentic safari expeditions and climbs.</p>
          </div>
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl text-xs font-bold transition-all shadow-md flex-shrink-0"
          >
            Explore All 80+ Tours <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-[#F97316] text-white flex items-center justify-center transition-all z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-[#F97316] text-white flex items-center justify-center transition-all z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-[#F97316] text-white flex items-center justify-center transition-all z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div
            className="max-w-4xl w-full bg-[#0A0A0A] rounded-2xl overflow-hidden shadow-2xl border border-white/15 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-1 bg-black min-h-[350px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-h-[60vh] md:max-h-[70vh] w-auto max-w-full object-contain mx-auto"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80';
                }}
              />
            </div>
            <div className="p-6 bg-[#121212] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-[#F97316] text-white text-[11px] font-bold rounded-full uppercase">
                    {selectedImage.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-neutral-400">
                    <MapPin className="w-3 h-3 text-[#F97316]" />
                    {selectedImage.location}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-bold text-white">{selectedImage.title}</h3>
                <p className="text-xs text-neutral-400 max-w-xl">{selectedImage.description}</p>
              </div>

              {selectedImage.tourLink && (
                <Link
                  to={selectedImage.tourLink}
                  onClick={closeLightbox}
                  className="px-5 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 flex-shrink-0"
                >
                  View Related Tour <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;

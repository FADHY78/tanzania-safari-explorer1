import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Play, Download, Instagram } from 'lucide-react';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';

const GalleryPage = () => {
  const videoHighlights = [
    { title: 'Great Migration River Crossing', thumb: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=600', duration: '2:45' },
    { title: 'Sunrise at Ngorongoro Crater', thumb: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=600', duration: '1:30' },
    { title: 'Elephants of Tarangire Baobabs', thumb: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=600', duration: '3:12' }
  ];

  const instagramPosts = [
    'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=400',
    'https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=400',
    'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=400',
    'https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=400',
    'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=400',
    'https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?q=80&w=400'
  ];

  const photographyTips = [
    { title: 'Golden Hour Splendor', desc: 'The most magical wildlife photography occurs within the first 90 minutes after sunrise and before dusk.' },
    { title: 'Patience at Sightings', desc: 'Stay at quiet waterholes or lion prides. Dramatic hunting and social interactions require stillness.' },
    { title: 'Recommended Telephoto Kit', desc: 'A 100–400mm or 70–200mm f/2.8 zoom lens captures both expansive action and sharp wildlife portraits.' },
    { title: 'Eye-Level Perspectives', desc: 'Our Land Cruisers allow bean-bag resting directly on window sills for stable low-angle framing.' }
  ];

  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-[#0A0A0A] text-black dark:text-white transition-colors duration-300">
      {/* Hero */}
      <section className="relative h-[54vh] min-h-[440px] sm:min-h-[480px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Serengeti-34.jpg"
            alt="Embuat Safari Wildlife Gallery"
            className="w-full h-full object-cover object-[center_35%]"
            loading="eager"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://safari56.com/wp-content/uploads/2026/08/Tarangire-Ngorongoro-Serengeti-Safari-1.jpg'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/85"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4 sm:px-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-widest border border-[#F97316]/50 mb-4 text-[#F97316]">
            <Camera className="w-3.5 h-3.5" /> Captured on Expeditions Across Tanzania
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-3 tracking-tight">Embuat Safari <span className="text-[#F97316]">Gallery</span></h1>
          <p className="text-white/85 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Authentic moments from the Serengeti plains, Ngorongoro Crater floor, Kilimanjaro summits, and Zanzibar beaches.
          </p>
        </div>
      </section>

      <Gallery />

      {/* Video Highlights */}
      <section className="py-16 bg-neutral-50 dark:bg-[#121212]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Cinema In The Bush</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2 text-black dark:text-white">
              Expedition <span className="text-[#F97316]">Highlights</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-2 font-light">Short cinematic glimpses of wildlife drama recorded on recent safaris.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {videoHighlights.map((v, i) => (
              <div key={i} className="group relative h-56 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all border border-black/10 dark:border-white/10 hover:border-[#F97316]">
                <img
                  src={v.thumb}
                  alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80'; }}
                />
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-[#F97316] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                    <Play className="w-6 h-6 text-white fill-current ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black to-transparent text-white">
                  <h3 className="font-bold text-sm sm:text-base leading-snug">{v.title}</h3>
                  <span className="text-xs text-[#F97316] font-mono mt-1 inline-block">{v.duration} min</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photography Tips */}
      <section className="py-16 bg-white dark:bg-[#0A0A0A] border-y border-black/10 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Mastering Wildlife Stills</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2 text-black dark:text-white">
              Safari Photo <span className="text-[#F97316]">Techniques</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {photographyTips.map((t, i) => (
              <div key={i} className="flex gap-4 p-5 bg-neutral-50 dark:bg-[#121212] rounded-2xl border border-black/10 dark:border-white/10 hover:border-[#F97316] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316] flex-shrink-0 mt-0.5">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-black dark:text-white text-sm mb-1">{t.title}</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Instagram Feed */}
      <section className="py-16 bg-white dark:bg-[#0A0A0A]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-[#F97316] font-bold text-xs uppercase tracking-widest">
              <Instagram className="w-4 h-4" /> Live From The African Bush
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold mt-2 text-black dark:text-white">@embuatsafaris</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 max-w-5xl mx-auto">
            {instagramPosts.map((img, i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden group cursor-pointer border border-black/10 dark:border-white/10 hover:border-[#F97316] shadow-sm">
                <img
                  src={img}
                  alt="Embuat Safaris Instagram Post"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=400&q=80'; }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Brochure */}
      <section className="py-14 bg-neutral-50 dark:bg-[#121212] border-t border-black/10 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-xl mx-auto p-8 bg-white dark:bg-[#0A0A0A] rounded-3xl border border-black/10 dark:border-white/10 shadow-sm">
            <div className="w-14 h-14 mx-auto mb-4 bg-[#F97316]/10 rounded-2xl flex items-center justify-center text-[#F97316]">
              <Download className="w-7 h-7" />
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-black dark:text-white mb-2">2026 Expedition Guide</h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-6 font-light">Download our comprehensive safari catalogue covering all 84 itineraries, seasonal wildlife charts, and packing lists.</p>
            <Link
              to="/tours"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all"
            >
              Browse All Packages
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[#F97316] text-white text-center shadow-xl">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-2">Want to Create Your Own Memories?</h2>
          <p className="text-sm opacity-95 mb-6 max-w-md mx-auto font-light">Book your private safari with Embuat Safaris today and bring home photos that will stay with you forever.</p>
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white rounded-xl font-bold text-sm hover:bg-neutral-900 hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            Explore Safari Packages <ArrowRight className="w-4 h-4 text-[#F97316]" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;

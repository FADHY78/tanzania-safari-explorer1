import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Play, Download, Instagram, Star } from 'lucide-react';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';

const GalleryPage = () => {
  const videoHighlights = [
    { title: 'Great Migration River Crossing', thumb: 'https://images.unsplash.com/photo-1534177714502-0fa41e7293d0?q=80&w=600', duration: '2:45' },
    { title: 'Sunrise at Ngorongoro Crater', thumb: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=600', duration: '1:30' },
    { title: 'Elephants of Tarangire', thumb: 'https://images.unsplash.com/photo-1549194382-246df0824362?q=80&w=600', duration: '3:12' }
  ];

  const instagramPosts = [
    'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=400',
    'https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=400',
    'https://images.unsplash.com/photo-1583421664367-15c7cfd6f0f6?q=80&w=400',
    'https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=400',
    'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=400',
    'https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?q=80&w=400'
  ];

  const photographyTips = [
    { title: 'Golden Hour Magic', desc: 'The best photos happen in the first and last hour of daylight. Wake up early!' },
    { title: 'Patience Pays Off', desc: 'Stay at a sighting. The best animal behaviors reveal themselves over time.' },
    { title: 'Bring a Zoom Lens', desc: 'A 100–400mm lens covers most safari situations. Pair it with a 24–70mm for landscapes.' },
    { title: 'Shoot from Eye Level', desc: 'Get low when possible — eye-level wildlife shots are dramatically more compelling.' }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068" alt="Gallery" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-widest border border-white/20 mb-4">
            <Camera className="w-3.5 h-3.5" /> Through Our Lens
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3">Safari Gallery</h1>
          <p className="text-white/80 text-sm md:text-base">Stunning moments captured by our guides and guests — a window into the wild beauty of Tanzania.</p>
        </div>
      </section>

      <Gallery />

      {/* Video Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#C08240] font-semibold text-xs uppercase tracking-widest">Video</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2">Safari <span className="text-[#C08240]">Highlights</span></h2>
            <p className="text-gray-500 text-sm mt-2">Watch Tanzania come alive through our short films.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {videoHighlights.map((v, i) => (
              <div key={i} className="group relative h-52 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all">
                <img src={v.thumb} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-[#C08240] ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <h3 className="font-bold text-sm">{v.title}</h3>
                  <span className="text-xs text-white/70">{v.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photography Tips */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#C08240] font-semibold text-xs uppercase tracking-widest">For Photographers</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2">Safari <span className="text-[#C08240]">Photo Tips</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {photographyTips.map((t, i) => (
              <div key={i} className="flex gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <Camera className="w-5 h-5 text-[#C08240] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-0.5">{t.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Instagram Feed */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-[#C08240] font-semibold text-xs uppercase tracking-widest">
              <Instagram className="w-4 h-4" /> Follow Our Adventures
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold mt-2">@tanzaniasafariexplorer</h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 max-w-5xl mx-auto">
            {instagramPosts.map((img, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden group cursor-pointer">
                <img src={img} alt="Instagram" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Brochure */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-xl mx-auto p-8 bg-gray-50 rounded-2xl border border-gray-100">
            <Download className="w-8 h-8 text-[#C08240] mx-auto mb-3" />
            <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">Download Our Brochure</h3>
            <p className="text-xs text-gray-500 mb-4">Get a full-color PDF with all tour details, pricing, and stunning photography.</p>
            <button className="px-6 py-2.5 bg-[#C08240] hover:bg-[#A67134] text-white rounded-xl font-bold text-sm transition-all">Download PDF</button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-[#C08240] to-[#A67134] text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Want to Create Your Own Memories?</h2>
          <p className="text-sm opacity-90 mb-5 max-w-md mx-auto">Book your safari today and come back with photos you'll treasure forever.</p>
          <Link to="/tours" className="inline-flex items-center gap-2 px-7 py-3 bg-white text-gray-800 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all">
            View Tours <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;

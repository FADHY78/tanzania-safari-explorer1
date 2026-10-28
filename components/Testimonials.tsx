
import React from 'react';
import { TESTIMONIALS } from '../constants';
import { useLiveSiteContent } from '../services/siteContentService';

const Testimonials: React.FC = () => {
  const content = useLiveSiteContent();
  const testimonials = content?.testimonials?.length ? content.testimonials : TESTIMONIALS;

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-[#C08240] to-[#A67134] text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h4 className="text-[#C08240] font-bold tracking-widest uppercase text-sm mb-4">Guest Reviews</h4>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Travelers Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl relative">
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#C08240]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg text-white/80 italic mb-8 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <img 
                  src={t.image} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-full border-2 border-[#C08240]/50 object-cover" 
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
                  }}
                />
                <div>
                  <h5 className="font-bold text-white">{t.name}</h5>
                  <p className="text-sm text-white/50">{t.location}</p>
                </div>
              </div>
              <div className="absolute top-8 right-8 text-[#C08240]/20">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017V14C19.017 11.7909 17.2261 10 15.017 10H14.017V7H15.017C18.883 7 22.017 10.134 22.017 14V21H14.017ZM3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017V14C8.017 11.7909 6.22611 10 4.017 10H3.017V7H4.017C7.883 7 11.017 10.134 11.017 14V21H3.017Z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


import React from 'react';

const Gallery: React.FC = () => {
  const images = [
    { src: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80", span: "col-span-1 row-span-2" },
    { src: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=600&q=80", span: "col-span-1 row-span-1" },
    { src: "https://images.unsplash.com/photo-1549194382-246df0824362?auto=format&fit=crop&w=600&q=80", span: "col-span-1 row-span-1" },
    { src: "https://images.unsplash.com/photo-1534177714502-0fa41e7293d0?auto=format&fit=crop&w=800&q=80", span: "col-span-2 row-span-1" },
    { src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80", span: "col-span-1 row-span-1" }
  ];

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h4 className="text-[#C08240] font-bold tracking-widest uppercase text-sm mb-4">Visual Journey</h4>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Capture the Moment</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:h-[600px]">
          {images.map((img, i) => (
            <div key={i} className={`${img.span} relative group overflow-hidden rounded-2xl`}>
              <img 
                src={img.src} 
                alt="Safari" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="p-4 bg-white/20 backdrop-blur-md rounded-full text-white">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

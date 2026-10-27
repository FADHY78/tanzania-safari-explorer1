
import React from 'react';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      title: "Expert Local Guides",
      description: "Our guides have 10+ years of experience and deep knowledge of animal behavior and local ecology.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Sustainable Tourism",
      description: "We partner with eco-friendly lodges and contribute 5% of all profits to local wildlife conservation efforts.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: "Uncompromising Safety",
      description: "Our custom 4x4 vehicles are rigorously maintained and equipped with radio communication and first-aid kits.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Tailor-Made Itineraries",
      description: "We don't do cookie-cutter trips. Every safari is fine-tuned to your personal pace and specific interests.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#C08240]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/3">
            <div className="inline-block mb-4">
              <h4 className="text-[#C08240] font-bold tracking-widest uppercase text-sm bg-[#C08240]/10 px-4 py-2 rounded-full">The Tanzania Wild Edge</h4>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Committed to <br className="hidden lg:block" /> <span className="text-[#C08240]">Excellence</span></h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              We understand that a safari is more than a holiday—it's a bucket-list dream. Our team works tirelessly to ensure every detail is handled with precision and care.
            </p>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="font-bold text-gray-900 mb-2">Member of:</p>
              <div className="flex gap-4 items-center opacity-60">
                <span className="text-xs font-black uppercase tracking-tighter">Tanzania Tourist Board</span>
                <span className="text-xs font-black uppercase tracking-tighter">ATOI Member</span>
              </div>
            </div>
          </div>
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((f, i) => (
              <div key={i} className="group p-8 bg-white rounded-3xl border border-gray-200 hover:border-[#C08240] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#C08240]/10 to-[#C08240]/5 rounded-2xl flex items-center justify-center text-[#C08240] mb-6 shadow-sm group-hover:from-[#C08240] group-hover:to-[#A66F35] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#C08240] transition-colors">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

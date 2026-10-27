
import React from 'react';

const About: React.FC = () => {
  const highlights = [
    { title: "Serengeti NP", desc: "Witness the Great Wildebeest Migration, the world's largest land mammal migration.", icon: "🐘" },
    { title: "Ngorongoro Crater", desc: "Visit the world's largest inactive volcanic caldera, a UNESCO World Heritage site.", icon: "🌋" },
    { title: "Mount Kilimanjaro", desc: "The highest mountain in Africa and the highest single free-standing mountain.", icon: "🏔️" },
    { title: "Zanzibar Island", desc: "Relax on pristine white sand beaches and dive into crystal-clear turquoise waters.", icon: "🏖️" }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          <div className="lg:w-1/2 relative group">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500">
              <img src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Safari Experience" className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#C08240] rounded-full -z-10 opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-56 h-56 border-4 border-[#C08240] rounded-3xl -z-10 opacity-10"></div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="inline-block mb-4">
              <h4 className="text-[#C08240] font-bold tracking-widest uppercase text-sm bg-[#C08240]/10 px-4 py-2 rounded-full">Unmatched Luxury & Adventure</h4>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Why Choose a Tanzania <br /> <span className="italic text-gray-500 bg-clip-text">Safari Adventure?</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Tanzania is home to Africa's most famous national parks and the majestic Mount Kilimanjaro. Beyond the wilderness, the "Spice Island" of Zanzibar offers world-class beaches and a rich cultural history. 
              Our safaris are curated to provide an authentic immersion into this natural wonderland while supporting local conservation and communities.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((h, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#C08240]/20 group cursor-pointer">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{h.icon}</span>
                  <div>
                    <h5 className="font-bold text-gray-900 mb-1 group-hover:text-[#C08240] transition-colors">{h.title}</h5>
                    <p className="text-sm text-gray-600 leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-10 flex items-center gap-2 text-[#C08240] font-bold hover:gap-4 transition-all">
              <span>Read Our Full Story</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

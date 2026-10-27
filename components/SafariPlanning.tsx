
import React from 'react';

const SafariPlanning: React.FC = () => {
  return (
    <section id="planning" className="py-24 safari-gradient text-white relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/2">
            <h4 className="text-[#C08240] font-bold tracking-widest uppercase text-sm mb-4">Plan Your Adventure</h4>
            <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">Exclusive Safari <br /> Wisdom & Offers</h2>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 flex-shrink-0 bg-[#C08240] rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Group Savings</h3>
                  <p className="text-white/60">Traveling with family or friends? Enjoy <span className="text-[#C08240] font-bold">15% off</span> per person for groups of 4 or more on any Northern Circuit multi-day safari.</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-12 h-12 flex-shrink-0 bg-[#C08240] rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Seasonal Pricing Note</h3>
                  <p className="text-white/60">April and May are our "Green Season." Experience lush landscapes and fewer crowds with discounts up to <span className="text-[#C08240] font-bold">$200 off</span> standard rates.</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-12 h-12 flex-shrink-0 bg-[#C08240] rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Best Time to Visit</h3>
                  <p className="text-white/60">For the Great Migration, aim for June-August (Grumeti/Mara crossings) or January-March (Calving season in Southern Serengeti).</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 bg-white/5 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">Expert Travel Tips</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="mt-1 text-[#C08240]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">Pack Light & Practical</p>
                  <p className="text-sm text-white/50">Stick to soft bags for light aircraft transfers. Bring neutral-colored clothing and high-SPF sunscreen.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 text-[#C08240]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">Health & Visas</p>
                  <p className="text-sm text-white/50">Malaria prophylaxis is recommended. E-visas can be obtained in advance via the official Tanzania Immigration website.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 text-[#C08240]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">Photography Etiquette</p>
                  <p className="text-sm text-white/50">Always ask permission before photographing local people. Our guides will help you navigate cultural sensitivities.</p>
                </div>
              </li>
            </ul>
            <a 
              href="#contact" 
              className="mt-10 block w-full text-center bg-[#C08240] text-white py-4 rounded-xl font-bold hover:bg-[#A66F35] transition-all"
            >
              Get a Free Planning Guide
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafariPlanning;

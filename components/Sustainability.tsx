
import React from 'react';

const Sustainability: React.FC = () => {
  const pillars = [
    {
      title: "Wildlife Protection",
      desc: "We support anti-poaching units in the Serengeti and Ngorongoro through direct financial contributions and raising guest awareness.",
      icon: "🦏"
    },
    {
      title: "Community Empowerment",
      desc: "80% of our staff are from local Tanzanian villages. We invest in local schools and clean water projects in the Arusha region.",
      icon: "🤝"
    },
    {
      title: "Low Impact Travel",
      desc: "Our lodges are plastic-free and solar-powered. We follow 'Leave No Trace' principles on every single game drive.",
      icon: "🌿"
    }
  ];

  return (
    <section id="sustainability" className="py-24 bg-[#FDFBF7] relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-64 h-64 bg-green-900/5 rounded-full -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <h4 className="text-green-700 font-bold tracking-widest uppercase text-sm mb-4">Ethical Adventure</h4>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Safari with <br /><span className="text-green-800 italic">Purpose & Heart</span></h2>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              We believe that travel should be a force for good. Our mission is to preserve the pristine wilderness of Tanzania for generations to come, while ensuring the local communities thrive alongside our tourism efforts.
            </p>
            
            <div className="space-y-8">
              {pillars.map((p, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-14 h-14 flex-shrink-0 bg-white shadow-md rounded-2xl flex items-center justify-center text-3xl">
                    {p.icon}
                  </div>
                  <div>
                    <h5 className="text-xl font-bold mb-1 text-gray-900">{p.title}</h5>
                    <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <img src="https://images.unsplash.com/photo-1549194382-246df0824362?auto=format&fit=crop&w=400&q=80" alt="Conservation" className="rounded-3xl shadow-lg w-full h-64 object-cover" />
                <div className="bg-green-800 p-8 rounded-3xl text-white shadow-xl">
                  <p className="text-4xl font-bold mb-2">$50k+</p>
                  <p className="text-sm opacity-70 uppercase tracking-widest font-bold">Invested in Local Education</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-[#C08240] p-8 rounded-3xl text-white shadow-xl">
                  <p className="text-4xl font-bold mb-2">100%</p>
                  <p className="text-sm opacity-70 uppercase tracking-widest font-bold">Plastic-Free Operations</p>
                </div>
                <img src="https://images.unsplash.com/photo-1534177714502-0fa41e7293d0?auto=format&fit=crop&w=400&q=80" alt="Local Community" className="rounded-3xl shadow-lg w-full h-64 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, HelpCircle, Plane, Hotel, Camera, Utensils, Map, Shield, Users, Clock, Star, ChevronDown } from 'lucide-react';
import ToursSection from '../components/ToursSection';
import SafariPlanning from '../components/SafariPlanning';

const ToursPage = () => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const included = [
    { icon: Plane, title: 'Airport Transfers', desc: 'Pick-up and drop-off at Kilimanjaro or Arusha airports.' },
    { icon: Hotel, title: 'Accommodation', desc: 'Quality lodges, luxury tented camps, or budget camping.' },
    { icon: Utensils, title: 'All Meals', desc: 'Full board including breakfast, lunch boxes, and dinner.' },
    { icon: Map, title: 'Expert Guides', desc: 'Certified English-speaking driver-guides with 10+ years experience.' },
    { icon: Camera, title: 'Game Drives', desc: 'Custom 4x4 Land Cruiser with pop-up roof and charging ports.' },
    { icon: Shield, title: 'Park Fees', desc: 'All national park entrance and conservation fees covered.' }
  ];

  const steps = [
    { num: '1', title: 'Inquiry', desc: 'Tell us your dates, budget, and interests via our contact form.' },
    { num: '2', title: 'Custom Itinerary', desc: 'We design a personalized itinerary and send a detailed proposal.' },
    { num: '3', title: 'Confirm & Pay', desc: 'Secure your booking with a 30% deposit. Balance due 60 days before.' },
    { num: '4', title: 'Safari Time!', desc: 'We meet you at the airport and handle everything from there.' }
  ];

  const faqs = [
    { q: 'What is the best time for a safari in Tanzania?', a: 'The dry season (June–October) offers the best wildlife viewing. The Great Migration river crossings happen July–September. January–March is calving season in the Serengeti.' },
    { q: 'How fit do I need to be?', a: 'Most safaris require minimal fitness — you ride in a 4x4 vehicle. Walking safaris require moderate fitness. Kilimanjaro treks require good physical condition.' },
    { q: 'Is it safe to go on safari?', a: 'Yes! Tanzania is one of Africa\'s safest tourism destinations. Our guides are highly trained, vehicles are equipped with safety gear, and we maintain satellite communication at all times.' },
    { q: 'What should I pack?', a: 'Lightweight neutral-colored clothing, sun hat, sunscreen, binoculars, camera with zoom lens, comfortable walking shoes, and a light jacket for cool mornings.' },
    { q: 'Can I customize a tour package?', a: 'Absolutely! All our packages are fully customizable. Tell us your preferences and we\'ll design the perfect itinerary for your group.' },
    { q: 'Do you cater to families with children?', a: 'Yes! We offer family-friendly safaris with shorter game drives, kid-friendly lodges, and activities designed for young explorers aged 5+.' }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2071" alt="Safari Tours" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-widest border border-white/20 mb-4">
            <Star className="w-3.5 h-3.5" /> Handcrafted Safari Packages
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3">Safari Tours</h1>
          <p className="text-white/80 text-sm md:text-base">From budget-friendly camping adventures to ultra-luxury lodge experiences — find a package that fits your dream and your budget.</p>
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            {[
              { val: '20+', label: 'Tour Packages' },
              { val: '4.9★', label: 'Avg Rating' },
              { val: '100%', label: 'Customizable' }
            ].map((s, i) => (
              <div key={i} className="px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/15 text-center">
                <div className="font-bold text-sm">{s.val}</div>
                <div className="text-[10px] text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ToursSection />

      {/* What's Included */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#C08240] font-semibold text-xs uppercase tracking-widest">All-Inclusive</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2">What's <span className="text-[#C08240]">Included</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm mt-2">Every package includes everything you need for a hassle-free safari.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {included.map((item, i) => (
              <div key={i} className="flex gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#C08240]/30 hover:shadow-md transition-all">
                <item.icon className="w-6 h-6 text-[#C08240] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-0.5">{item.title}</h4>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#C08240] font-semibold text-xs uppercase tracking-widest">Easy Booking</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2">How to <span className="text-[#C08240]">Book</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {steps.map((s, i) => (
              <div key={i} className="relative text-center p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 mx-auto mb-3 bg-[#C08240] text-white rounded-lg flex items-center justify-center font-bold text-sm">{s.num}</div>
                <h3 className="font-bold text-gray-800 mb-1 text-sm">{s.title}</h3>
                <p className="text-xs text-gray-500">{s.desc}</p>
                {i < steps.length - 1 && <div className="hidden lg:block absolute top-1/2 -right-3 text-[#C08240]">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SafariPlanning />

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#C08240] font-semibold text-xs uppercase tracking-widest">Common Questions</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2">Safari <span className="text-[#C08240]">FAQ</span></h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-gray-100 transition-colors">
                  <span className="font-semibold text-gray-800 text-sm flex items-center gap-2"><HelpCircle className="w-4 h-4 text-[#C08240] flex-shrink-0" />{f.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 pl-10">
                    <p className="text-xs text-gray-600 leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-[#C08240] to-[#A67134] text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Ready to Book Your Safari?</h2>
          <p className="text-sm opacity-90 mb-5 max-w-md mx-auto">Custom itineraries available. No obligation — just reach out and we'll start planning.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3 bg-white text-gray-800 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all">
            Get a Free Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ToursPage;

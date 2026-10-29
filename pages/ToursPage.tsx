import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plane, Hotel, Camera, Utensils, Map, Shield, ChevronDown, HelpCircle, Award } from 'lucide-react';
import ToursSection from '../components/ToursSection';
import SafariPlanning from '../components/SafariPlanning';

const ToursPage = () => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const included = [
    { icon: Plane, title: 'Airport Transfers', desc: 'Complimentary private pick-up & drop-off at Kilimanjaro (JRO) or Arusha (ARK) airports.' },
    { icon: Hotel, title: 'Handpicked Lodges', desc: 'Authentic tented wilderness camps and luxury safari lodges in prime game viewing locations.' },
    { icon: Utensils, title: 'All Bush Meals', desc: 'Delicious full-board catering including hot safari breakfasts, packed bush lunches, and multi-course dinners.' },
    { icon: Map, title: 'Master Driver-Guides', desc: 'Certified English-speaking native naturalists with 10+ years field experience.' },
    { icon: Camera, title: 'Custom 4x4 Land Cruiser', desc: 'Pop-up roof for 360° wildlife photography, window seats for every traveler, and USB charging points.' },
    { icon: Shield, title: 'All Park & Crater Fees', desc: '100% of national park fees, conservation levies, and emergency flying doctor evacuation coverage.' }
  ];

  const steps = [
    { num: '01', title: 'Choose Your Safari', desc: 'Browse our 84 authentic packages or tell us your dream dates and desired wildlife encounters.' },
    { num: '02', title: 'Personalized Itinerary', desc: 'Our native trip architects craft a bespoke proposal with private 4x4 options and handpicked lodges.' },
    { num: '03', title: 'Secure Booking', desc: 'Confirm your safari with a flexible 30% deposit. Full balance due 60 days before your arrival.' },
    { num: '04', title: 'Touch Down in Tanzania', desc: 'Our team greets you with warm Karibu hospitality at the airport, and your African dream begins.' }
  ];

  const faqs = [
    { q: 'What is the best time for a wildlife safari in Tanzania?', a: 'Tanzania offers phenomenal year-round safari experiences. The dry season (June–October) delivers premier game viewing and dramatic Mara River wildebeest crossings. January to March features the legendary calving season in Southern Serengeti. April and May are lush with dramatic skies and fewer visitors.' },
    { q: 'What fitness level is required for a Tanzania safari?', a: 'Standard vehicle game drives require minimal physical fitness — you comfortably tour in custom 4x4 Land Cruisers. Walking safaris require moderate stamina, while Kilimanjaro treks require dedicated cardiovascular preparation.' },
    { q: 'Is Tanzania safe for international travelers and families?', a: 'Yes! Tanzania is celebrated as one of Africa\'s most peaceful and stable travel destinations. Our private Land Cruisers are maintained to the highest safety standards, equipped with satellite comms and first-aid kits, and your guides look after you 24/7.' },
    { q: 'Can I customize any tour package with Zanzibar beaches?', a: 'Absolutely! More than 60% of our travelers combine a Northern Circuit wildlife safari with 3 to 5 nights relaxing in Zanzibar, Pemba, or Mafia Island. We handle domestic flights and beach transfers seamlessly.' },
    { q: 'What gear and clothing should I pack?', a: 'We advise lightweight, neutral-colored clothing (khaki, tan, green), a warm fleece or windbreaker for crisp morning drives, high-SPF sunscreen, polarized sunglasses, binoculars, and a camera with a 200–400mm lens.' }
  ];

  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-[#0A0A0A] text-black dark:text-white transition-colors duration-300">
      {/* Hero */}
      <section className="relative h-[54vh] min-h-[440px] sm:min-h-[480px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://safari56.com/wp-content/uploads/2026/08/4-day-Tanzania-safari.jpg"
            alt="Safari Expedition in Tanzania"
            className="w-full h-full object-cover object-[center_38%]"
            loading="eager"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://safari56.com/wp-content/uploads/2026/08/Tarangire-Ngorongoro-Serengeti-Safari-1.jpg'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/85"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4 sm:px-6">
          <span className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 bg-black/65 backdrop-blur-md rounded-xl sm:rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider sm:tracking-widest border border-[#F97316]/50 mb-4 text-[#F97316] max-w-full leading-snug">
            <Award className="w-3.5 h-3.5 flex-shrink-0" /> <span>84 Handcrafted Packages • 100% Tanzanian Owned</span>
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-3 tracking-tight">Tanzania <span className="text-[#F97316]">Safari Packages</span></h1>
          <p className="text-white/85 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            From single-day wilderness excursions and classic migration safaris to luxury tented camps and Zanzibar beach sanctuaries.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mt-6">
            {[
              { val: '84 Tours', label: 'Complete Collection' },
              { val: '4.9 ★', label: 'Guest Rating' },
              { val: '100%', label: 'Customizable' }
            ].map((s, i) => (
              <div key={i} className="px-4 sm:px-5 py-2 bg-black/60 backdrop-blur-md rounded-xl border border-white/20 text-center">
                <div className="font-extrabold text-sm sm:text-base text-[#F97316]">{s.val}</div>
                <div className="text-[10px] text-white/75 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ToursSection />

      {/* What's Included */}
      <section className="py-16 bg-neutral-50 dark:bg-[#121212]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">All-Inclusive Value</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2 text-black dark:text-white">
              What's Always <span className="text-[#F97316]">Included</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-sm mt-2 font-light">
              Every Embuat Safaris adventure includes comprehensive ground arrangements so you can immerse yourself completely in the wild.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {included.map((item, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white dark:bg-[#0A0A0A] rounded-2xl border border-black/10 dark:border-white/10 hover:border-[#F97316] shadow-sm transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316] flex-shrink-0 mt-0.5">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-black dark:text-white text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-16 bg-white dark:bg-[#0A0A0A] border-y border-black/10 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Seamless Planning</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2 text-black dark:text-white">
              How to Book Your <span className="text-[#F97316]">Safari</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {steps.map((s, i) => (
              <div key={i} className="relative text-center p-6 bg-neutral-50 dark:bg-[#121212] rounded-3xl border border-black/10 dark:border-white/10">
                <div className="w-12 h-12 mx-auto mb-4 bg-[#F97316] text-white rounded-2xl flex items-center justify-center font-extrabold text-sm shadow-md">
                  {s.num}
                </div>
                <h3 className="font-bold text-black dark:text-white mb-2 text-sm">{s.title}</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SafariPlanning />

      {/* FAQ */}
      <section className="py-16 bg-neutral-50 dark:bg-[#121212]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Safari Answers</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2 text-black dark:text-white">
              Frequently Asked <span className="text-[#F97316]">Questions</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white dark:bg-[#0A0A0A] rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold text-black dark:text-white text-sm sm:text-base flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#F97316] flex-shrink-0" />
                    {f.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-[#F97316] flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pl-12">
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[#F97316] text-white text-center shadow-xl">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-2">Ready to Book Your Safari?</h2>
          <p className="text-sm opacity-95 mb-6 max-w-md mx-auto font-light">Custom private itineraries available. No obligation — tell us your dream dates and let's plan together.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white rounded-xl font-bold text-sm hover:bg-neutral-900 hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            Get a Free Tailor-Made Quote <ArrowRight className="w-4 h-4 text-[#F97316]" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ToursPage;

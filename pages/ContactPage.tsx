import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Globe, ChevronDown, HelpCircle, ArrowRight, Star } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const ContactPage = () => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const contactInfo = [
    { icon: Phone, title: 'Call / WhatsApp', detail: '+255 753 997 777', sub: 'Available 7 days a week', link: 'tel:+255753997777' },
    { icon: Mail, title: 'Email Specialists', detail: 'info@embuatsafaris.com', sub: 'We reply within 24 hours', link: 'mailto:info@embuatsafaris.com' },
    { icon: MapPin, title: 'Arusha Office', detail: 'Arusha & Moshi, Tanzania', sub: 'Gateway to Northern Circuit', link: 'https://maps.google.com' },
    { icon: Clock, title: 'Office Hours', detail: '7:30 AM – 7:00 PM EAT', sub: 'Emergency radio line 24/7', link: '#' }
  ];

  const reasons = [
    { title: 'Tailor-Made Safaris', desc: 'Custom private 4x4 itineraries fine-tuned to your dream sightings and timeline.' },
    { title: 'Zanzibar Add-Ons', desc: 'Seamless flights and luxury spice-island beach stays combined with your safari.' },
    { title: 'Kilimanjaro Treks', desc: 'Expert Marangu, Machame, and Lemosho climbs led by certified summit guides.' },
    { title: 'Small Group Journeys', desc: 'Family expeditions, honeymoon getaways, and private photography groups.' },
    { title: '1-Day Day Trips', desc: 'Short excursions to Tarangire, Ngorongoro, Materuni waterfalls, or Chemka hot springs.' },
    { title: 'Travel Partnerships', desc: 'Reliable ground handling and B2B partnerships with licensed global operators.' }
  ];

  const faqs = [
    { q: 'How far in advance should I book my safari?', a: 'For peak dry season and the Great Migration river crossings (June–October), we recommend booking 4 to 8 months in advance to secure top safari lodges and tented camps.' },
    { q: 'What is your cancellation and rebooking policy?', a: 'We offer flexible rebooking terms. Cancellations made 60+ days before departure receive a full refund minus minimal lodge registration deposits. Emergency date transfers are accommodated whenever feasible.' },
    { q: 'Are all park and conservation fees included?', a: 'Yes! Every Embuat Safaris package includes 100% of national park fees, Ngorongoro Crater service fees, conservation levies, and government taxes upfront.' },
    { q: 'What vehicle do we travel in?', a: 'You will travel in our customized 4x4 Toyota Land Cruisers featuring pop-up viewing roofs, individual window seats, charging sockets for cameras/phones, a cooler box with chilled water, and VHF wildlife radios.' }
  ];

  return (
    <div className="min-h-screen pt-20 bg-[#FAF7F2] dark:bg-[#120F0D] text-gray-800 dark:text-[#E8E1D9] transition-colors duration-300">
      {/* Hero */}
      <section className="relative h-[54vh] min-h-[440px] sm:min-h-[480px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://safari56.com/wp-content/uploads/2026/08/Tarangire-Ngorongoro-Serengeti-Safari-1.jpg" 
            alt="Contact Embuat Safaris" 
            className="w-full h-full object-cover object-[center_35%]" 
            loading="eager"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=85'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4 sm:px-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[#DE6826]/30 via-[#D48B28]/30 to-[#C08240]/30 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-widest border border-[#D48B28]/40 mb-4 text-[#F5C478]">
            <MessageCircle className="w-3.5 h-3.5" /> We're Here For You • 24/7 Support
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-3 tracking-tight">Contact Embuat Safaris</h1>
          <p className="text-white/85 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Have questions about wildlife seasons, customized itineraries, or lodge availability? Our Tanzanian safari specialists are ready to help.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-8 bg-transparent relative z-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto -mt-16 sm:-mt-20">
            {contactInfo.map((c, i) => (
              <a 
                key={i} 
                href={c.link}
                className="bg-white dark:bg-[#1B1613] p-6 rounded-2xl shadow-xl border border-amber-900/10 dark:border-[#2C241E] text-center hover:border-[#DE6826]/50 hover:shadow-2xl transition-all block group"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-[#DE6826]/15 to-[#C08240]/15 flex items-center justify-center text-[#DE6826] dark:text-[#F5C478] group-hover:scale-110 transition-transform">
                  <c.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{c.title}</h4>
                <p className="text-xs sm:text-sm font-bold text-[#DE6826] dark:text-[#F5C478] break-all">{c.detail}</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">{c.sub}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Reasons */}
      <section className="py-16 bg-[#FAF7F2] dark:bg-[#120F0D]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-[#DE6826] dark:text-[#F5C478] font-bold text-xs uppercase tracking-widest">How Can We Help You?</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mt-2 text-gray-900 dark:text-white">
              Specialist Services by <span className="bg-gradient-to-r from-[#DE6826] to-[#C08240] bg-clip-text text-transparent">Embuat Safaris</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {reasons.map((r, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white dark:bg-[#1B1613] rounded-2xl border border-amber-900/10 dark:border-[#2C241E] hover:border-[#DE6826]/40 shadow-sm transition-all">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#DE6826]/15 to-[#C08240]/15 flex items-center justify-center text-[#DE6826] dark:text-[#F5C478] flex-shrink-0 mt-0.5">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{r.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />

      {/* Map / Location */}
      <section className="py-16 bg-white dark:bg-[#1B1613] border-y border-amber-900/10 dark:border-[#2C241E]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-[#DE6826] dark:text-[#F5C478] font-bold text-xs uppercase tracking-widest">Our Operations Base</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mt-2 mb-3 text-gray-900 dark:text-white">
                Located in <span className="bg-gradient-to-r from-[#DE6826] to-[#C08240] bg-clip-text text-transparent">Arusha, Tanzania</span>
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed font-light">
                Arusha is the celebrated gateway to Tanzania's Northern Safari Circuit. Our local garage, fleet maintenance, and guide logistics hub operate 24/7 to guarantee your safari unfolds smoothly.
              </p>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <p className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#DE6826] flex-shrink-0" />
                  <span>Safari Road, Near Clock Tower, Arusha, Tanzania</span>
                </p>
                <p className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#DE6826] flex-shrink-0" />
                  <span>Mon–Sun: 7:30 AM – 7:00 PM (Emergency Desk 24/7)</span>
                </p>
                <p className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-[#DE6826] flex-shrink-0" />
                  <span>Free consultation & personalized itinerary planning</span>
                </p>
              </div>
            </div>
            <div className="h-72 bg-gray-100 dark:bg-[#120F0D] rounded-3xl overflow-hidden border border-amber-900/10 dark:border-[#2C241E] shadow-lg">
              <iframe
                title="Embuat Safaris Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63732.49367465741!2d36.63!3d-3.37!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18375b13c903eea9%3A0xbb855e7b6b5c!2sArusha%2C+Tanzania!5e0!3m2!1sen!2s!4v1"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#FAF7F2] dark:bg-[#120F0D]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-[#DE6826] dark:text-[#F5C478] font-bold text-xs uppercase tracking-widest">Booking Assistance</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold mt-2 text-gray-900 dark:text-white">
              Common <span className="bg-gradient-to-r from-[#DE6826] to-[#C08240] bg-clip-text text-transparent">Questions</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white dark:bg-[#1B1613] rounded-2xl border border-amber-900/10 dark:border-[#2C241E] overflow-hidden shadow-sm">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)} 
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50 dark:hover:bg-[#251E19] transition-colors"
                >
                  <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-base flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#DE6826] dark:text-[#F5C478] flex-shrink-0" />
                    {f.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-[#DE6826] flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pl-12">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-light">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-gradient-to-r from-[#DE6826] via-[#D48B28] to-[#C08240] text-white text-center shadow-xl">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-2">Prefer Instant WhatsApp Chat?</h2>
          <p className="text-sm opacity-95 mb-6 max-w-md mx-auto font-light">Chat with our resident guides for immediate pricing, advice, and date checking.</p>
          <a 
            href="https://wa.me/255753997777" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            <MessageCircle className="w-4 h-4 text-[#F5C478]" /> Chat on WhatsApp (+255 753 997 777)
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

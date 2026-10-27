import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, MessageCircle, Globe, ChevronDown, HelpCircle, ArrowRight, Star } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const ContactPage = () => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const contactInfo = [
    { icon: Phone, title: 'Phone / WhatsApp', detail: '+255 123 456 789', sub: 'Available 7 days a week' },
    { icon: Mail, title: 'Email', detail: 'info@tanzaniasafari.com', sub: 'We reply within 24 hours' },
    { icon: MapPin, title: 'Office', detail: 'Arusha, Tanzania', sub: 'Near Arusha Clock Tower' },
    { icon: Clock, title: 'Hours', detail: '8:00 AM – 6:00 PM EAT', sub: 'Emergency line 24/7' }
  ];

  const reasons = [
    { title: 'General Inquiry', desc: 'Questions about Tanzania, safaris, or travel logistics.' },
    { title: 'Custom Tour Request', desc: 'Want a tailor-made itinerary? Tell us your dream.' },
    { title: 'Group Booking', desc: 'Special rates for groups of 6+ travelers.' },
    { title: 'Corporate & Events', desc: 'Team-building safaris, retreats, and incentive trips.' },
    { title: 'Media & Press', desc: 'Journalist or content creator? Let\'s collaborate.' },
    { title: 'Partnership', desc: 'Travel agents and tour operators — let\'s work together.' }
  ];

  const faqs = [
    { q: 'How far in advance should I book?', a: 'We recommend booking 3–6 months in advance for peak season (June–October). Last-minute bookings are possible but availability may be limited.' },
    { q: 'What is your cancellation policy?', a: 'Free cancellation up to 60 days before departure. 50% refund 30–59 days before. Non-refundable within 30 days. We offer flexible rebooking options.' },
    { q: 'Do you offer travel insurance?', a: 'We strongly recommend travel insurance and can connect you with trusted providers. Insurance covering trip cancellation and emergency evacuation is essential.' },
    { q: 'What payment methods do you accept?', a: 'We accept bank transfers, credit/debit cards (Visa, Mastercard), and PayPal. A 30% deposit secures your booking with the balance due 60 days prior.' }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1484318571209-661cf29a69c3?q=80&w=2070" alt="Contact Us" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-widest border border-white/20 mb-4">
            <MessageCircle className="w-3.5 h-3.5" /> We'd Love to Hear from You
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3">Get in Touch</h1>
          <p className="text-white/80 text-sm md:text-base">Have a question, need a custom quote, or ready to book? Our team responds within 24 hours.</p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto -mt-16 relative z-20">
            {contactInfo.map((c, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all">
                <c.icon className="w-7 h-7 text-[#C08240] mx-auto mb-2" />
                <h4 className="font-bold text-gray-800 text-sm mb-0.5">{c.title}</h4>
                <p className="text-sm font-semibold text-[#C08240]">{c.detail}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Reasons */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <span className="text-[#C08240] font-semibold text-xs uppercase tracking-widest">How Can We Help?</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold mt-2">Reach Out <span className="text-[#C08240]">For Any Reason</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {reasons.map((r, i) => (
              <div key={i} className="flex gap-3 p-4 bg-white rounded-xl border border-gray-100">
                <Star className="w-4 h-4 text-[#C08240] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-0.5">{r.title}</h4>
                  <p className="text-xs text-gray-500">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />

      {/* Map / Location */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-center">
            <div>
              <span className="text-[#C08240] font-semibold text-xs uppercase tracking-widest">Visit Us</span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold mt-2 mb-3">Our Office in <span className="text-[#C08240]">Arusha</span></h2>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">Located in the heart of Arusha — the gateway to Tanzania's Northern Circuit safaris. We welcome walk-in visitors for consultations and trip planning.</p>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#C08240]" />Safari Road, Near Clock Tower, Arusha</p>
                <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#C08240]" />Mon–Sat: 8:00 AM – 6:00 PM</p>
                <p className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#C08240]" />Free consultation & trip planning</p>
              </div>
            </div>
            <div className="h-64 bg-gray-200 rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63732.49367465741!2d36.63!3d-3.37!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18375b13c903eea9%3A0xbb855e7b6b5c!2sArusha%2C+Tanzania!5e0!3m2!1sen!2s!4v1"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                className="rounded-2xl"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <span className="text-[#C08240] font-semibold text-xs uppercase tracking-widest">Booking Info</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold mt-2">Common <span className="text-[#C08240]">Questions</span></h2>
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
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Prefer WhatsApp?</h2>
          <p className="text-sm opacity-90 mb-5 max-w-md mx-auto">Chat with us instantly for quick answers and trip planning.</p>
          <a href="https://wa.me/255123456789" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3 bg-white text-gray-800 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all">
            <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

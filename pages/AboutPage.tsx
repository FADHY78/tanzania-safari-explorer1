import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Globe, Shield, Target, Eye, TreePine, Droplets, Sun, MapPin } from 'lucide-react';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import Sustainability from '../components/Sustainability';
import SignatureSafariExperiences from '../components/SignatureSafariExperiences';

const AboutPage = () => {
  const timeline = [
    {
      year: '2025',
      title: 'Founded in Arusha',
      desc: 'Embuat Safaris was founded in Arusha with custom 4x4 Land Cruisers and an authentic vision for sustainable wildlife exploration.'
    },
    {
      year: '2025',
      title: 'Conservation & Community Pledge',
      desc: 'Formally committed 5% of all booking proceeds directly to Serengeti anti-poaching and indigenous Maasai village development.'
    },
    {
      year: '2025',
      title: 'National Licensing & Accreditations',
      desc: 'Earned official operating accreditation from TANAPA, NCAA, and the Tanzania Tourist Board.'
    },
    {
      year: '2026',
      title: 'Pan-Tanzania Fleet & Routes',
      desc: 'Welcomed travelers from across the globe with bespoke expeditions across Serengeti, Ngorongoro, Kilimanjaro, and Zanzibar.'
    },
    {
      year: '2026+',
      title: 'The Future of Ethical Safaris',
      desc: 'Continuing to set new benchmarks for eco-conscious luxury, carbon-neutral safaris, and authentic Tanzanian hospitality.'
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-[#0A0A0A] text-black dark:text-white transition-colors duration-300">
      {/* Hero */}
      <section className="relative h-[54vh] min-h-[440px] sm:min-h-[480px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://zaratanzaniaadventures.com/wp-content/uploads/2024/07/elep.jpg"
            alt="About Embuat Safaris Heritage"
            className="w-full h-full object-cover object-[center_32%]"
            loading="eager"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://safari56.com/wp-content/uploads/2026/08/Tarangire-Ngorongoro-Serengeti-Safari-1.jpg'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/85"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4 sm:px-6">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-widest border border-[#F97316]/50 mb-4 text-[#F97316]">
            <MapPin className="w-3.5 h-3.5 text-[#F97316]" /> Founded 2025 • Arusha & Moshi, Tanzania
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-3 tracking-tight">Our Story & <span className="text-[#F97316]">Heritage</span></h1>
          <p className="text-white/85 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Founded in 2025 in Arusha, Embuat Safaris was created to offer Tanzania's most authentic safari experiences — built on native bush expertise, luxury comfort, and an unwavering commitment to conservation.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-black text-white border-b border-white/10 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: '2025', label: 'Founded in Arusha' },
              { val: '100%', label: 'Tanzanian Owned' },
              { val: '4.9 ★', label: 'TripAdvisor Rating' },
              { val: '25+', label: 'Protected Reserves' }
            ].map((s, i) => (
              <div key={i} className="p-2">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#F97316]">{s.val}</div>
                <div className="text-xs sm:text-sm text-white/75 font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-neutral-50 dark:bg-[#121212]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-8 bg-white dark:bg-[#0A0A0A] rounded-3xl border border-black/10 dark:border-white/10 hover:border-[#F97316] shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316] mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-black dark:text-white mb-3">Our Mission</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                To craft life-enriching Tanzanian safari experiences that connect travelers intimately with Africa's majestic wildlife, vibrant heritage, and breathtaking landscapes, while protecting natural sanctuaries and uplifting local host communities.
              </p>
            </div>
            <div className="p-8 bg-white dark:bg-[#0A0A0A] rounded-3xl border border-black/10 dark:border-white/10 hover:border-[#F97316] shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316] mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-black dark:text-white mb-3">Our Vision</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                To be East Africa's leading beacon for sustainable, authentic travel — demonstrating how deeply immersive safari tourism directly funds anti-poaching initiatives, reforests critical migration corridors, and empowers indigenous guides.
              </p>
            </div>
          </div>
        </div>
      </section>

      <About />

      {/* Expert Guides Highlight */}
      <section className="py-12 bg-black text-white border-y border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-[#121212] rounded-3xl border border-[#F97316]/40">
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="w-16 h-16 bg-[#F97316] rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl shadow-lg">
                  15+
                </div>
                <div>
                  <p className="font-bold text-white text-lg">Years Experience</p>
                  <p className="text-xs text-[#F97316] font-semibold uppercase tracking-wider">Certified Wilderness Guides</p>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-white/80 text-sm leading-relaxed">
                  Our professional guides average over 15 years in the field. With deep ancestral wisdom in wildlife tracking, birding taxonomy, and Swahili storytelling, every game drive transforms into an unforgettable classroom of the African wild.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white dark:bg-[#0A0A0A]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Our Journey</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2 text-black dark:text-white">Growing with <span className="text-[#F97316]">Tanzania</span></h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-0 relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#F97316]/40 -translate-x-1/2"></div>
            {timeline.map((t, i) => (
              <div key={i} className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} mb-8`}>
                <div className={`hidden md:block md:w-1/2 ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <div className="p-5 bg-neutral-50 dark:bg-[#121212] rounded-2xl border border-black/10 dark:border-white/10 hover:border-[#F97316] shadow-sm hover:shadow-md transition-all inline-block text-left">
                    <div className="text-[#F97316] font-extrabold text-sm mb-1">{t.year}</div>
                    <h3 className="font-bold text-black dark:text-white text-sm">{t.title}</h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">{t.desc}</p>
                  </div>
                </div>
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[#F97316] rounded-full -translate-x-1/2 mt-5 z-10 ring-4 ring-white dark:ring-[#0A0A0A] shadow-md"></div>
                <div className="md:hidden ml-10 p-5 bg-neutral-50 dark:bg-[#121212] rounded-2xl border border-black/10 dark:border-white/10 shadow-sm">
                  <div className="text-[#F97316] font-extrabold text-sm mb-1">{t.year}</div>
                  <h3 className="font-bold text-black dark:text-white text-sm">{t.title}</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">{t.desc}</p>
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />

      {/* Signature Safari Experiences Showcase */}
      <SignatureSafariExperiences />

      <Sustainability />

      {/* Values */}
      <section className="py-16 bg-neutral-50 dark:bg-[#121212] border-t border-black/10 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Core Values</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2 text-black dark:text-white">What We <span className="text-[#F97316]">Stand For</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Heart, title: 'Passion for Wildlife', desc: 'Every guide is a lifelong naturalist who lives and breathes the Tanzanian bush.' },
              { icon: Globe, title: 'Community First', desc: 'We hire locally, source locally, and invest tourism proceeds back into schools and villages.' },
              { icon: Shield, title: 'Guest Safety First', desc: 'Modern customized Land Cruisers, satellite comms, and first-aid trained personnel at all times.' },
              { icon: TreePine, title: 'Conservation Impact', desc: '5% of all bookings directly fund anti-poaching and habitat restoration initiatives.' },
              { icon: Droplets, title: 'Eco Operations', desc: 'Solar-powered wilderness camps, refillable thermos bottles, and zero single-use plastics.' },
              { icon: Sun, title: 'Authentic Experiences', desc: 'No rushed schedules, no mass crowds — just genuine, private encounters with nature.' }
            ].map((v, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white dark:bg-[#0A0A0A] rounded-2xl border border-black/10 dark:border-white/10 hover:border-[#F97316] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316] flex-shrink-0">
                  <v.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-black dark:text-white text-sm mb-1">{v.title}</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[#F97316] text-white text-center shadow-xl">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-2">Ready to Experience Tanzania with Embuat Safaris?</h2>
          <p className="text-sm opacity-95 mb-6 max-w-lg mx-auto font-light">Let our master guides create an authentic, personalized itinerary just for your family or group.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white rounded-xl font-bold text-sm hover:bg-neutral-900 hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            Start Planning With Us <ArrowRight className="w-4 h-4 text-[#F97316]" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

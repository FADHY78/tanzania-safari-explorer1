import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Users, Award, Globe, Shield, Target, Eye, TreePine, Droplets, Sun, Sparkles } from 'lucide-react';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import Sustainability from '../components/Sustainability';

const AboutPage = () => {
  const team = [
    { name: 'Joseph Mwamba', role: 'Founder & Lead Guide', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80', bio: '20+ years guiding safaris across the Serengeti, Ngorongoro, and Kilimanjaro.' },
    { name: 'Amina Hassan', role: 'Operations Director', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80', bio: 'Ensures every private expedition and luxury transfer runs with total precision.' },
    { name: 'David Kimaro', role: 'Senior Guide & Naturalist', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', bio: 'Expert wildlife tracker with deep ancestral Maasai heritage and bush knowledge.' },
    { name: 'Grace Mushi', role: 'Guest Relations & Planning', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80', bio: 'Your dedicated safari specialist from customized itineraries to final departure.' }
  ];

  const timeline = [
    { year: '2008', title: 'Founded in Arusha', desc: 'Started with one Land Cruiser and a passion for wildlife.' },
    { year: '2012', title: 'First 1,000 Guests', desc: 'Grew through word-of-mouth and stellar reviews.' },
    { year: '2016', title: 'Sustainability Pledge', desc: 'Committed to carbon-neutral operations and community investment.' },
    { year: '2020', title: 'Award-Winning Service', desc: 'Named Tanzania\'s top safari operator by Africa Travel Awards.' },
    { year: '2026', title: '5,000+ Happy Travelers', desc: 'Expanded fleet and routes with modern eco-principles and authentic Tanzanian warmth.' }
  ];

  return (
    <div className="min-h-screen pt-20 bg-[#FAF7F2] dark:bg-[#120F0D] text-gray-800 dark:text-[#E8E1D9] transition-colors duration-300">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[380px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Serengeti-34.jpg" 
            alt="About Embuat Safaris" 
            className="w-full h-full object-cover" 
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/07/elep.jpg'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4 sm:px-6">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-[#DE6826]/30 via-[#D48B28]/30 to-[#C08240]/30 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-widest border border-[#D48B28]/40 mb-4 text-[#F5C478]">
            <Sparkles className="w-3.5 h-3.5 text-[#F5C478]" /> Est. 2008 • Arusha & Moshi, Tanzania
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-3 tracking-tight">Our Story & Heritage</h1>
          <p className="text-white/85 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            What started as one guide's dream is now Tanzania's most trusted safari company — built on passion, native bush expertise, and an unwavering commitment to conservation.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-white dark:bg-[#1B1613] border-b border-amber-900/10 dark:border-[#2C241E] shadow-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: '18+', label: 'Years in Tanzania' },
              { val: '5,000+', label: 'Happy Travelers' },
              { val: '4.9 ★', label: 'TripAdvisor Rating' },
              { val: '25+', label: 'Protected Reserves' }
            ].map((s, i) => (
              <div key={i} className="p-2">
                <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#DE6826] via-[#D48B28] to-[#C08240] bg-clip-text text-transparent">{s.val}</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-[#FAF7F2] dark:bg-[#120F0D]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-8 bg-white dark:bg-[#1B1613] rounded-3xl border border-amber-900/10 dark:border-[#2C241E] shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#DE6826]/15 to-[#C08240]/15 flex items-center justify-center text-[#DE6826] dark:text-[#F5C478] mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Our Mission</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                To craft life-enriching Tanzanian safari experiences that connect travelers intimately with Africa's majestic wildlife, vibrant heritage, and breathtaking landscapes, while protecting natural sanctuaries and uplifting local host communities.
              </p>
            </div>
            <div className="p-8 bg-white dark:bg-[#1B1613] rounded-3xl border border-amber-900/10 dark:border-[#2C241E] shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C08240]/15 to-[#B83226]/15 flex items-center justify-center text-[#C08240] dark:text-[#F5C478] mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3">Our Vision</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                To be East Africa's leading beacon for sustainable, authentic travel — demonstrating how deeply immersive safari tourism directly funds anti-poaching initiatives, reforests critical migration corridors, and empowers indigenous guides.
              </p>
            </div>
          </div>
        </div>
      </section>

      <About />

      {/* Expert Guides Highlight */}
      <section className="py-12 bg-white dark:bg-[#1B1613] border-y border-amber-900/10 dark:border-[#2C241E]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent dark:from-[#251E19] dark:to-[#1B1613] rounded-3xl border border-[#C08240]/20">
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-[#DE6826] to-[#C08240] rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl shadow-lg">
                  15+
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-lg">Years Experience</p>
                  <p className="text-xs text-[#C08240] dark:text-[#F5C478] font-semibold uppercase tracking-wider">Certified Wilderness Guides</p>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  Our professional guides average over 15 years in the field. With deep ancestral wisdom in wildlife tracking, birding taxonomy, and Swahili storytelling, every game drive transforms into an unforgettable classroom of the African wild.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-[#FAF7F2] dark:bg-[#120F0D]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-[#DE6826] dark:text-[#F5C478] font-bold text-xs uppercase tracking-widest">Our Journey</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2 text-gray-900 dark:text-white">Growing with <span className="bg-gradient-to-r from-[#DE6826] to-[#C08240] bg-clip-text text-transparent">Tanzania</span></h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-0 relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#DE6826] via-[#D48B28] to-[#C08240] -translate-x-1/2 opacity-30"></div>
            {timeline.map((t, i) => (
              <div key={i} className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} mb-8`}>
                <div className={`hidden md:block md:w-1/2 ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <div className="p-5 bg-white dark:bg-[#1B1613] rounded-2xl border border-amber-900/10 dark:border-[#2C241E] hover:border-[#C08240]/40 shadow-sm hover:shadow-md transition-all inline-block text-left">
                    <div className="text-[#DE6826] dark:text-[#F5C478] font-extrabold text-sm mb-1">{t.year}</div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">{t.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{t.desc}</p>
                  </div>
                </div>
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-to-tr from-[#DE6826] to-[#C08240] rounded-full -translate-x-1/2 mt-5 z-10 ring-4 ring-white dark:ring-[#120F0D] shadow-md"></div>
                <div className="md:hidden ml-10 p-5 bg-white dark:bg-[#1B1613] rounded-2xl border border-amber-900/10 dark:border-[#2C241E] shadow-sm">
                  <div className="text-[#DE6826] dark:text-[#F5C478] font-extrabold text-sm mb-1">{t.year}</div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">{t.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{t.desc}</p>
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />

      {/* Team */}
      <section className="py-16 bg-[#FAF7F2] dark:bg-[#120F0D]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-[#DE6826] dark:text-[#F5C478] font-bold text-xs uppercase tracking-widest">Our Leadership</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2 text-gray-900 dark:text-white">The People Behind <span className="bg-gradient-to-r from-[#DE6826] to-[#C08240] bg-clip-text text-transparent">Your Safari</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {team.map((m, i) => (
              <div key={i} className="bg-white dark:bg-[#1B1613] rounded-3xl border border-amber-900/10 dark:border-[#2C241E] overflow-hidden hover:shadow-xl transition-all group">
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={m.image} 
                    alt={m.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-gray-900 dark:text-white text-base">{m.name}</h4>
                  <p className="text-[#DE6826] dark:text-[#F5C478] text-xs font-bold uppercase tracking-wide mb-2">{m.role}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Sustainability />

      {/* Values */}
      <section className="py-16 bg-white dark:bg-[#1B1613] border-t border-amber-900/10 dark:border-[#2C241E]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-[#DE6826] dark:text-[#F5C478] font-bold text-xs uppercase tracking-widest">Core Values</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2 text-gray-900 dark:text-white">What We <span className="bg-gradient-to-r from-[#DE6826] to-[#C08240] bg-clip-text text-transparent">Stand For</span></h2>
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
              <div key={i} className="flex gap-4 p-5 bg-[#FAF7F2] dark:bg-[#120F0D] rounded-2xl border border-amber-900/10 dark:border-[#2C241E] hover:border-[#C08240]/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DE6826]/15 to-[#C08240]/15 flex items-center justify-center text-[#DE6826] dark:text-[#F5C478] flex-shrink-0">
                  <v.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{v.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-gradient-to-r from-[#DE6826] via-[#D48B28] to-[#C08240] text-white text-center shadow-xl">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-2">Ready to Experience Tanzania with Embuat Safaris?</h2>
          <p className="text-sm opacity-95 mb-6 max-w-lg mx-auto font-light">Let our master guides create an authentic, personalized itinerary just for your family or group.</p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            Start Planning With Us <ArrowRight className="w-4 h-4 text-[#F5C478]" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Users, Award, Globe, Shield, Target, Eye, TreePine, Droplets, Sun } from 'lucide-react';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import Sustainability from '../components/Sustainability';

const AboutPage = () => {
  const team = [
    { name: 'Joseph Mwamba', role: 'Founder & Lead Guide', image: 'https://i.pravatar.cc/300?img=11', bio: '20+ years guiding safaris across East Africa.' },
    { name: 'Amina Hassan', role: 'Operations Director', image: 'https://i.pravatar.cc/300?img=49', bio: 'Ensures every trip runs with precision and care.' },
    { name: 'David Kimaro', role: 'Senior Guide', image: 'https://i.pravatar.cc/300?img=53', bio: 'Expert tracker with deep Maasai heritage knowledge.' },
    { name: 'Grace Mushi', role: 'Guest Relations', image: 'https://i.pravatar.cc/300?img=44', bio: 'Your first point of contact from inquiry to arrival.' }
  ];

  const timeline = [
    { year: '2008', title: 'Founded in Arusha', desc: 'Started with one Land Cruiser and a passion for wildlife.' },
    { year: '2012', title: 'First 1,000 Guests', desc: 'Grew through word-of-mouth and stellar reviews.' },
    { year: '2016', title: 'Sustainability Pledge', desc: 'Committed to carbon-neutral operations and community investment.' },
    { year: '2020', title: 'Award-Winning Service', desc: 'Named Tanzania\'s top safari operator by Africa Travel Awards.' },
    { year: '2024', title: '5,000+ Happy Travelers', desc: 'Expanded fleet and routes while keeping personal touch.' }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=2070" alt="About Us" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-6">
          <span className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-widest border border-white/20 mb-4">
            Est. 2008 — Arusha, Tanzania
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3">Our Story</h1>
          <p className="text-white/80 text-sm md:text-base">What started as one guide's dream is now Tanzania's most trusted safari company — built on passion, expertise, and deep respect for the wild.</p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { val: '15+', label: 'Years in Business' },
              { val: '5,000+', label: 'Guests Served' },
              { val: '4.9', label: 'Avg Rating' },
              { val: '25+', label: 'Destinations' }
            ].map((s, i) => (
              <div key={i}>
                <div className="text-xl font-bold text-[#C08240]">{s.val}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <Target className="w-8 h-8 text-[#C08240] mb-3" />
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">Our Mission</h3>
              <p className="text-sm text-gray-600 leading-relaxed">To provide world-class safari experiences that connect travelers with Tanzania's extraordinary wildlife and cultures, while preserving ecosystems and empowering local communities for generations to come.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <Eye className="w-8 h-8 text-[#C08240] mb-3" />
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">Our Vision</h3>
              <p className="text-sm text-gray-600 leading-relaxed">To be the benchmark for responsible safari tourism in Africa — proving that exceptional travel and environmental stewardship go hand in hand to create lasting positive impact.</p>
            </div>
          </div>
        </div>
      </section>

      <About />

      {/* Expert Guides Highlight */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gradient-to-r from-green-50 to-[#C08240]/5 rounded-2xl border border-green-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  15+
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-xl">Years Experience</p>
                  <p className="text-sm text-gray-600">Expert Safari Guides</p>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-gray-700 text-sm leading-relaxed">
                  Our certified guides average over 15 years in the field, with deep knowledge of wildlife behavior, 
                  local cultures, and conservation. Every safari is led by passionate naturalists who bring Tanzania's 
                  wilderness to life through their expertise and storytelling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#C08240] font-semibold text-xs uppercase tracking-widest">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2">Growing with <span className="text-[#C08240]">Tanzania</span></h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-0 relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#C08240]/20 -translate-x-1/2"></div>
            {timeline.map((t, i) => (
              <div key={i} className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} mb-8`}>
                <div className={`hidden md:block md:w-1/2 ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <div className="p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all inline-block">
                    <div className="text-[#C08240] font-bold text-sm mb-1">{t.year}</div>
                    <h3 className="font-bold text-gray-800 text-sm">{t.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{t.desc}</p>
                  </div>
                </div>
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#C08240] rounded-full -translate-x-1/2 mt-5 z-10 ring-4 ring-white"></div>
                <div className="md:hidden ml-10 p-4 bg-white rounded-xl border border-gray-100">
                  <div className="text-[#C08240] font-bold text-sm mb-1">{t.year}</div>
                  <h3 className="font-bold text-gray-800 text-sm">{t.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{t.desc}</p>
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#C08240] font-semibold text-xs uppercase tracking-widest">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2">The People Behind <span className="text-[#C08240]">Your Safari</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {team.map((m, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                <div className="h-48 overflow-hidden">
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-800 text-sm">{m.name}</h4>
                  <p className="text-[#C08240] text-xs font-semibold mb-2">{m.role}</p>
                  <p className="text-xs text-gray-500">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Sustainability />

      {/* Values */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#C08240] font-semibold text-xs uppercase tracking-widest">Core Values</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2">What We <span className="text-[#C08240]">Stand For</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { icon: Heart, title: 'Passion for Wildlife', desc: 'Every guide is a lifelong naturalist who lives and breathes the bush.' },
              { icon: Globe, title: 'Community First', desc: 'We hire locally, source locally, and invest profits back into villages.' },
              { icon: Shield, title: 'Guest Safety', desc: 'Modern vehicles, satellite comms, and first-aid trained staff at all times.' },
              { icon: TreePine, title: 'Conservation', desc: '5% of revenue goes directly to anti-poaching and habitat projects.' },
              { icon: Droplets, title: 'Eco Operations', desc: 'Solar camps, refillable bottles, and zero single-use plastics.' },
              { icon: Sun, title: 'Authentic Experiences', desc: 'No crowds, no rush — just genuine, immersive encounters with nature.' }
            ].map((v, i) => (
              <div key={i} className="flex gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <v.icon className="w-6 h-6 text-[#C08240] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-1">{v.title}</h4>
                  <p className="text-xs text-gray-500">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-[#C08240] to-[#A67134] text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Ready to Experience Tanzania?</h2>
          <p className="text-sm opacity-90 mb-5 max-w-md mx-auto">Let our team create a personalized safari just for you.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3 bg-white text-gray-800 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all">
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

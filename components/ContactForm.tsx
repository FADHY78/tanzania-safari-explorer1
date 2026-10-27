
import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      // Reset after 3 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-[#FDFBF7] relative overflow-hidden">
      {/* Decorative leaf/shape */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-[#C08240]/5 rounded-full"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          {/* Info Side */}
          <div className="lg:w-2/5 safari-gradient p-12 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold mb-6">Plan Your Trip</h2>
              <p className="text-white/70 mb-10">
                Ready to embark on the journey of a lifetime? Send us a message, and our travel specialists will get back to you within 24 hours.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#C08240]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white/50 uppercase tracking-widest font-bold">Call Us</p>
                    <p className="font-bold">+255 789 000 000</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#C08240]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white/50 uppercase tracking-widest font-bold">Email</p>
                    <p className="font-bold">hello@tanzaniawild.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#C08240]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white/50 uppercase tracking-widest font-bold">Main Office</p>
                    <p className="font-bold">Arusha, Tanzania</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-10 flex gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#C08240] transition-colors cursor-pointer">FB</div>
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#C08240] transition-colors cursor-pointer">IG</div>
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#C08240] transition-colors cursor-pointer">TW</div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-3/5 p-12 bg-white">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold mb-4">Message Sent!</h3>
                <p className="text-gray-500">
                  Thank you for reaching out. A safari consultant will contact you very soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Full Name</label>
                    <input required type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-[#C08240] focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Email Address</label>
                    <input required type="email" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-[#C08240] focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Phone Number</label>
                    <input type="tel" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-[#C08240] focus:border-transparent outline-none transition-all" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Interested In</label>
                    <select className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-[#C08240] focus:border-transparent outline-none transition-all appearance-none cursor-pointer">
                      <option>Select a Safari Category</option>
                      <option>1-Day Day Trips</option>
                      <option>2-3 Day Short Safaris</option>
                      <option>4-6 Day Migration Safaris</option>
                      <option>7-8 Day Grand Tours</option>
                      <option>Zanzibar Beach Escape</option>
                      <option>Custom Itinerary</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Message</label>
                  <textarea rows={4} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-[#C08240] focus:border-transparent outline-none transition-all" placeholder="Tell us more about your travel plans..."></textarea>
                </div>
                
                <button 
                  disabled={status === 'sending'}
                  type="submit" 
                  className={`w-full bg-[#C08240] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#A66F35] transition-all transform active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 ${status === 'sending' ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : 'Send Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

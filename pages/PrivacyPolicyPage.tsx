import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const PrivacyPolicyPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-24 pb-20 bg-white dark:bg-[#0A0A0A] min-h-screen text-black dark:text-white transition-colors">
      {/* Header Banner */}
      <section className="bg-black text-white py-14 sm:py-16 border-b border-[#F97316]/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F97316]/20 border border-[#F97316]/40 text-[#F97316] text-xs font-bold uppercase tracking-widest mb-4">
            <Shield className="w-4 h-4" /> {t('footer.privacy')}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-3">
            Privacy Policy & <span className="text-[#F97316]">Data Protection</span>
          </h1>
          <p className="text-white/75 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Embuat Safaris Ltd. is dedicated to protecting your personal information and respecting international and Tanzanian data privacy laws.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-white/60">
            <span>Effective Date: January 1, 2026</span>
            <span>•</span>
            <span>Applicable Law: Tanzania PDPA (2022) & GDPR</span>
            <span>•</span>
            <span>Arusha, United Republic of Tanzania</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-12">
        <div className="bg-neutral-50 dark:bg-[#121212] rounded-3xl p-6 sm:p-10 border border-black/10 dark:border-white/10 shadow-xl space-y-10 leading-relaxed text-sm sm:text-base">

          {/* Section 1 */}
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-black dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#F97316] text-white flex items-center justify-center text-sm font-sans font-bold">1</span>
              Who We Are & Scope of Policy
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300">
              <strong>Embuat Safaris Ltd.</strong> ("Embuat Safaris", "we", "us", or "our") is a licensed Tanzanian tour operator incorporated under the Laws of the United Republic of Tanzania (TTB License No. TTB/TO/2026, ATOI Member), with physical headquarters on Safari Road, Arusha, Tanzania.
            </p>
            <p className="text-neutral-600 dark:text-neutral-300 mt-3">
              This Privacy Policy explains how we collect, store, use, and safeguard personal information obtained when you browse our website (<Link to="/" className="text-[#F97316] font-semibold underline">embuatsafaris.com</Link>), submit booking inquiries, or contract tour and expedition services with us across Tanzania mainland and Zanzibar Island.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-black dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#F97316] text-white flex items-center justify-center text-sm font-sans font-bold">2</span>
              Information We Collect for Safari Bookings
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 mb-3">
              Due to strict regulatory requirements by the <strong>Tanzania National Parks Authority (TANAPA)</strong>, the <strong>Ngorongoro Conservation Area Authority (NCAA)</strong>, and civil aviation bodies, we collect specific traveler credentials:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 mt-4 text-xs sm:text-sm">
              <li className="p-3 rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#F97316] flex-shrink-0 mt-0.5" />
                <span><strong>Full Legal Name & Nationality:</strong> Exactly matching your international passport for national park entry permits.</span>
              </li>
              <li className="p-3 rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#F97316] flex-shrink-0 mt-0.5" />
                <span><strong>Passport Number & Expiry:</strong> Required by TANAPA electronic payment systems and internal bush flights.</span>
              </li>
              <li className="p-3 rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#F97316] flex-shrink-0 mt-0.5" />
                <span><strong>Medical & Dietary Needs:</strong> Essential for high-altitude Kilimanjaro climbs, bush emergency protocols, and camp catering.</span>
              </li>
              <li className="p-3 rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#F97316] flex-shrink-0 mt-0.5" />
                <span><strong>Emergency Contacts & Insurance:</strong> Policy details for AMREF Flying Doctors remote air ambulance enrollment.</span>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-black dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#F97316] text-white flex items-center justify-center text-sm font-sans font-bold">3</span>
              How We Use Your Data
            </h2>
            <div className="space-y-3 text-neutral-600 dark:text-neutral-300">
              <p>Your personal data is processed solely for lawful purposes associated with your safari travel:</p>
              <div className="space-y-2 pl-4 border-l-2 border-[#F97316]">
                <p><strong>• Securing Park Permits:</strong> Processing electronic Smart Cards and entry permits with TANAPA, NCAA, and TAWA.</p>
                <p><strong>• Lodging & Domestic Flights:</strong> Registering guest reservations at safari lodges, tented camps, and domestic charter airlines (e.g., Coastal Aviation, Auric Air).</p>
                <p><strong>• Medical Emergency Dispatch:</strong> Registering emergency air evacuation cover with AMREF Flying Doctors Tourist Scheme.</p>
                <p><strong>• Operational Communication:</strong> Keeping you informed of flight timing, luggage restrictions, safari briefings, and road conditions.</p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-black dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#F97316] text-white flex items-center justify-center text-sm font-sans font-bold">4</span>
              Tanzania Personal Data Protection Act (PDPA 2022) Compliance
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300">
              In strict accordance with the <strong>United Republic of Tanzania Personal Data Protection Act No. 11 of 2022</strong>, Embuat Safaris operates as a certified Data Controller and Processor. We guarantee:
            </p>
            <div className="mt-3 grid sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white dark:bg-[#0A0A0A] rounded-xl border border-[#F97316]/30">
                <h5 className="font-bold text-black dark:text-white mb-1">Zero Commercial Sale</h5>
                <p className="text-neutral-600 dark:text-neutral-400">We never sell, rent, or trade your contact info with third-party marketers or brokers.</p>
              </div>
              <div className="p-3 bg-white dark:bg-[#0A0A0A] rounded-xl border border-[#F97316]/30">
                <h5 className="font-bold text-black dark:text-white mb-1">Encrypted Storage</h5>
                <p className="text-neutral-600 dark:text-neutral-400">Passport scans and billing details are encrypted using enterprise AES-256 protocols.</p>
              </div>
              <div className="p-3 bg-white dark:bg-[#0A0A0A] rounded-xl border border-[#F97316]/30">
                <h5 className="font-bold text-black dark:text-white mb-1">Right to Erasure</h5>
                <p className="text-neutral-600 dark:text-neutral-400">You may request complete deletion of non-statutory records at any time following tour completion.</p>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-black dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#F97316] text-white flex items-center justify-center text-sm font-sans font-bold">5</span>
              Payment Security
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300">
              All credit card, debit card, and international telegraphic wire transfers (SWIFT) are processed through PCI-DSS compliant financial institutions and authorized Tanzanian commercial banks (e.g., CRDB Bank Plc and Stanbic Bank Tanzania). Embuat Safaris does not hold or store raw payment card CVV numbers on web servers.
            </p>
          </div>

          {/* Contact Box */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-[#F97316]/40">
            <h3 className="font-serif font-bold text-black dark:text-white text-base sm:text-lg mb-2">
              Data Protection Officer (DPO) Contact
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mb-4">
              To exercise your rights to access, amend, or delete personal data, please contact our Legal & Privacy desk in Arusha:
            </p>
            <div className="grid sm:grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F97316]" />
                <span className="font-semibold text-black dark:text-neutral-200">privacy@embuatsafaris.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F97316]" />
                <span className="font-semibold text-black dark:text-neutral-200">+255 753 997 777</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F97316]" />
                <span className="font-semibold text-black dark:text-neutral-200">Safari Road, Arusha, Tanzania</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

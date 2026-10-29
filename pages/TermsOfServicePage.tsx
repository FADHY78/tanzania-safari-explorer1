import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TermsOfServicePage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-24 pb-20 bg-white dark:bg-[#0A0A0A] min-h-screen text-black dark:text-white transition-colors">
      {/* Header Banner */}
      <section className="bg-black text-white py-14 sm:py-16 border-b border-[#F97316]/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F97316]/20 border border-[#F97316]/40 text-[#F97316] text-xs font-bold uppercase tracking-widest mb-4">
            <FileText className="w-4 h-4" /> {t('footer.terms')}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-3">
            Terms & Conditions <span className="text-[#F97316]">of Service</span>
          </h1>
          <p className="text-white/75 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Standard safari expedition agreement for private tours, Kilimanjaro climbs, wildlife safaris, and Zanzibar island packages.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-white/60">
            <span>Effective 2026 Season</span>
            <span>•</span>
            <span>Tanzania Tourism Board (TTB) Registered Operator</span>
            <span>•</span>
            <span>Jurisdiction: Arusha, Tanzania</span>
          </div>
        </div>
      </section>

      {/* Main Terms Body */}
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-12">
        <div className="bg-neutral-50 dark:bg-[#121212] rounded-3xl p-6 sm:p-10 border border-black/10 dark:border-white/10 shadow-xl space-y-10 leading-relaxed text-sm sm:text-base">

          {/* 1. Contract Formation */}
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-black dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#F97316] text-white flex items-center justify-center text-sm font-sans font-bold">1</span>
              Booking Confirmation & Contract Formation
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300">
              A legally binding contract between the client ("you") and <strong>Embuat Safaris Ltd.</strong> ("the Company") is established once the Company issues a formal Itinerary Confirmation Invoice and receives the required booking deposit.
            </p>
            <p className="text-neutral-600 dark:text-neutral-300 mt-3">
              By confirming a reservation, you confirm that you have full legal authority to accept these conditions on behalf of all persons listed in your party.
            </p>
          </div>

          {/* 2. Payment Terms */}
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-black dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#F97316] text-white flex items-center justify-center text-sm font-sans font-bold">2</span>
              Deposit & Final Payment Schedule
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 my-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-[#F97316]/30">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F97316] block mb-1">
                  Step 1 • Initial Deposit
                </span>
                <p className="text-lg font-bold text-black dark:text-white mb-1">30% Advance Deposit</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Required upon confirmation to lock in safari lodge allocations, private 4x4 Land Cruiser dispatches, and TANAPA / NCAA permits.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-[#F97316]/30">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F97316] block mb-1">
                  Step 2 • Final Balance
                </span>
                <p className="text-lg font-bold text-black dark:text-white mb-1">70% Final Payment</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Due strictly <strong>60 days prior</strong> to safari departure date. Bookings made within 60 days of departure require full 100% settlement.
                </p>
              </div>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              * Payment methods accepted: International SWIFT Telegraphic Transfer (USD account in Arusha) or Major Credit Cards via secure online checkout (+3.5% merchant processing surcharge).
            </p>
          </div>

          {/* 3. Cancellation Policy */}
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-black dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#F97316] text-white flex items-center justify-center text-sm font-sans font-bold">3</span>
              Cancellation & Refund Policy
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 mb-3">
              Any cancellation must be delivered in writing via verified email. The following cancellation fee schedule applies based on the date written notice is acknowledged:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-black/15 dark:border-white/10 text-black dark:text-white bg-white dark:bg-[#0A0A0A]">
                    <th className="py-2.5 px-3">Notice Window Before Departure</th>
                    <th className="py-2.5 px-3">Cancellation Fee / Refund</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10 dark:divide-white/5 text-neutral-600 dark:text-neutral-300">
                  <tr>
                    <td className="py-2.5 px-3 font-semibold">61+ days prior to arrival</td>
                    <td className="py-2.5 px-3">Loss of initial 30% deposit (covers non-refundable permits and lodge deposits)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold">60 to 31 days prior to arrival</td>
                    <td className="py-2.5 px-3">50% forfeiture of total package price</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold">30 to 0 days prior (or no-show)</td>
                    <td className="py-2.5 px-3">100% forfeiture of total package price</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Statutory Park Fees & Government Taxes */}
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-black dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#F97316] text-white flex items-center justify-center text-sm font-sans font-bold">4</span>
              Statutory Park Fees & Taxes (TANAPA / NCAA)
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300">
              National park entry fees, transit fees, crater service fees, and 18% Value Added Tax (VAT) are mandated by the <strong>Government of Tanzania</strong>. In the rare event that statutory park entrance tariffs or government concession taxes are officially increased between booking confirmation and tour execution, the statutory price adjustment will be passed along at direct cost without markup.
            </p>
          </div>

          {/* 5. Health, Travel Insurance & AMREF Evacuation */}
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-black dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#F97316] text-white flex items-center justify-center text-sm font-sans font-bold">5</span>
              Compulsory Medical & Travel Insurance
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300">
              All clients traveling with Embuat Safaris must hold comprehensive international travel insurance covering emergency medical treatment, trip cancellation, and international repatriation.
            </p>
            <div className="mt-3 p-4 rounded-2xl bg-[#F97316]/10 border border-[#F97316]/30 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-black dark:text-white">AMREF Flying Doctors Emergency Cover Included:</span>
                <p className="text-neutral-600 dark:text-neutral-300 mt-1">
                  For your peace of mind, all Embuat multi-day safari and mountain trekking clients are automatically enrolled in the <strong>AMREF Flying Doctors Tourist Scheme</strong>. In the event of acute trauma or severe medical condition in remote bush areas, air ambulance evacuation to a premier hospital in Arusha or Nairobi is covered.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Domestic Flights & Luggage Restrictions */}
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-black dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#F97316] text-white flex items-center justify-center text-sm font-sans font-bold">6</span>
              Bush Flight Baggage Limits (15 kg Soft Bags)
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300">
              Internal bush flights between Arusha, Serengeti airstrips, and Zanzibar (operated by Cessna Grand Caravans) strictly enforce a maximum weight limit of <strong>15 kilograms (33 lbs) per passenger</strong>, inclusive of carry-on. Baggage must be in <strong>soft-sided duffel bags</strong> without rigid internal frame wheels so they can fit into narrow aircraft luggage pods.
            </p>
          </div>

          {/* 7. Mountain Climbing Protocols (Kilimanjaro & Meru) */}
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-black dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#F97316] text-white flex items-center justify-center text-sm font-sans font-bold">7</span>
              Mountain Climbing Protocols & Safety
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300">
              For Kilimanjaro and Mount Meru climbs, the Lead Wilderness First Responder (WFR) Guide has final executive authority regarding client safety, altitude sickness descent decisions, and route pacing. We strictly follow the ethical porter welfare guidelines of the <strong>Kilimanjaro Porters Assistance Project (KPAP)</strong>, guaranteeing fair wages, nutrition, and warm gear for our mountain crew.
            </p>
          </div>

          {/* 8. Governing Law & Jurisdiction */}
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-black dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#F97316] text-white flex items-center justify-center text-sm font-sans font-bold">8</span>
              Governing Law & Legal Jurisdiction
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300">
              This contract and any dispute or claim arising out of or in connection with it shall be governed by and construed in accordance with the <strong>Laws of the United Republic of Tanzania</strong>. The parties irrevocably agree that the courts of Arusha, Tanzania shall have exclusive jurisdiction to settle any disputes.
            </p>
          </div>

          {/* Summary Box */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 text-center">
            <h3 className="font-serif font-bold text-black dark:text-white text-base sm:text-lg mb-2">
              Ready to Explore Tanzania?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mb-4 max-w-xl mx-auto">
              Have questions regarding custom terms, group contracts, or private charters? Our Arusha operations team is at your disposal.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-all"
              >
                Contact Safari Desk
              </Link>
              <Link
                to="/tours"
                className="bg-black text-white dark:bg-white dark:text-black px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all"
              >
                Browse All 84 Tours
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;

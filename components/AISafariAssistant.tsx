import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, X, Send, Compass, ArrowRight, Bot, MapPin, Clock, MessageCircle, RotateCcw } from 'lucide-react';
import { useLiveTours } from '../services/tourService';
import { TourPackage } from '../types';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  recommendedTours?: TourPackage[];
  timestamp: string;
}

const QUICK_PROMPTS = [
  'Best 5–7 day Serengeti & Ngorongoro safari?',
  'Compare Kilimanjaro Machame vs Lemosho routes',
  'Zanzibar beach & spice island packages',
  ' Safaris under $1,500 per person',
  'Best time of year for the Great Migration?'
];

const AISafariAssistant: React.FC = () => {
  const allTours = useLiveTours();
  const activeTours = allTours.filter(t => t.status !== 'draft' && t.status !== 'archived');

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Karibu! I'm your Embuat AI Safari Concierge. Ask me about our 84+ Tanzania safaris, Kilimanjaro climbs, Zanzibar beach holidays, wildlife seasons, or let me match a package to your budget!",
      recommendedTours: activeTours.slice(0, 2),
      timestamp: 'Just now'
    }
  ]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const generateSmartResponse = (query: string): { text: string; tours: TourPackage[] } => {
    const q = query.toLowerCase();

    // Budget queries
    const budgetMatch = q.match(/\$?\s*(\d{3,4})/);
    if (budgetMatch || q.includes('budget') || q.includes('cheap') || q.includes('affordable') || q.includes('under')) {
      const maxBudget = budgetMatch ? parseInt(budgetMatch[1], 10) : 1500;
      const matching = activeTours
        .filter(t => t.fromPrice <= maxBudget && t.fromPrice > 200)
        .sort((a, b) => b.fromPrice - a.fromPrice)
        .slice(0, 3);
      const fallback = matching.length > 0 ? matching : activeTours.sort((a, b) => a.fromPrice - b.fromPrice).slice(0, 3);
      return {
        text: `Here are our top-value Tanzania packages matching a budget around $${maxBudget.toLocaleString()} per person. Every package includes all park fees, meals, and a private 4x4 Land Cruiser:`,
        tours: fallback
      };
    }

    // Kilimanjaro / Trekking queries
    if (q.includes('kilimanjaro') || q.includes('machame') || q.includes('lemosho') || q.includes('marangu') || q.includes('climb') || q.includes('trek')) {
      const kiliTours = activeTours.filter(t =>
        t.category === 'Trekking' ||
        t.name.toLowerCase().includes('kilimanjaro') ||
        t.name.toLowerCase().includes('machame') ||
        t.name.toLowerCase().includes('lemosho')
      ).slice(0, 3);
      return {
        text: "Mount Kilimanjaro (5,895m) offers three premier routes:\n• Machame Route (6–7 Days): Scenic 'Whiskey' trail with high summit success.\n• Lemosho Route (7–8 Days): Our best acclimatization profile across Shira Plateau.\n• Marangu Route (5–6 Days): Classic hut accommodation trail.\n\nHere are our most popular summit expeditions:",
        tours: kiliTours
      };
    }

    // Zanzibar / Beach queries
    if (q.includes('zanzibar') || q.includes('beach') || q.includes('spice') || q.includes('island') || q.includes('snorkeling') || q.includes('dhow')) {
      const zanTours = activeTours.filter(t =>
        t.category === 'Zanzibar' || t.name.toLowerCase().includes('zanzibar')
      ).slice(0, 3);
      return {
        text: "Zanzibar is the ultimate Indian Ocean paradise after a bush safari! From UNESCO Stone Town and aromatic spice farms to Mnemba Atoll snorkeling and Nakupenda sandbank:",
        tours: zanTours
      };
    }

    // Day Trips
    if (q.includes('day trip') || q.includes('1 day') || q.includes('waterfall') || q.includes('materuni') || q.includes('chemka') || q.includes('maasai')) {
      const dayTours = activeTours.filter(t =>
        t.category === 'Day Trips' || t.duration.toLowerCase().includes('1 day')
      ).slice(0, 3);
      return {
        text: "Short on time? Our 1-day excursions from Arusha & Moshi cover Materuni Waterfalls & Coffee, Maasai Boma cultural visits in Monduli, Tarangire, and Ngorongoro:",
        tours: dayTours
      };
    }

    // Season / When to visit / Migration
    if (q.includes('when') || q.includes('season') || q.includes('month') || q.includes('migration') || q.includes('weather') || q.includes('best time')) {
      const migrationTours = activeTours.filter(t =>
        t.name.toLowerCase().includes('migration') || t.name.toLowerCase().includes('serengeti') || t.name.toLowerCase().includes('northern')
      ).slice(0, 3);
      return {
        text: "Tanzania is a year-round wildlife haven:\n• June – October (Dry Season): Mara River crossings & peak wildlife concentration.\n• January – March (Calving Season): Over 500,000 wildebeest births in Southern Serengeti / Ndutu.\n• November – December & April – May: Lush emerald landscapes & lower lodge rates.\n\nHere are our top Great Migration & Serengeti safaris:",
        tours: migrationTours
      };
    }

    // Contact / Location
    if (q.includes('contact') || q.includes('phone') || q.includes('whatsapp') || q.includes('email') || q.includes('location') || q.includes('where')) {
      return {
        text: "You can reach our safari specialists 24/7:\n• Phone & WhatsApp: +255 785 341 091\n• Email: gabrielzablon6@gmail.com\n• Headquarters: Monduli Juu, Arusha Region, Tanzania (-3.14150, 36.43046)",
        tours: activeTours.slice(0, 2)
      };
    }

    // Default Safari / Serengeti / Ngorongoro search
    const keywords = q.split(/\s+/).filter(w => w.length > 3);
    const scored = activeTours.map(tour => {
      let score = 0;
      const hay = `${tour.name} ${tour.category} ${tour.duration} ${tour.highlights.join(' ')}`.toLowerCase();
      keywords.forEach(kw => {
        if (hay.includes(kw)) score += 2;
      });
      if (tour.category === 'Safari') score += 1;
      return { tour, score };
    }).sort((a, b) => b.score - a.score);

    const bestTours = scored.slice(0, 3).map(s => s.tour);

    return {
      text: "Here are our top recommended Tanzania safari packages crafted by our native guides in Monduli Juu. Click any package below to view the full day-by-day itinerary with photos:",
      tours: bestTours
    };
  };

  const handleSend = (promptText?: string) => {
    const textToSend = (promptText ?? input).trim();
    if (!textToSend) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!promptText) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateSmartResponse(textToSend);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply.text,
        recommendedTours: reply.tours,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 550);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: "Karibu! I'm your Embuat AI Safari Concierge. Ask me about our 84+ Tanzania safaris, Kilimanjaro climbs, Zanzibar beach holidays, wildlife seasons, or let me match a package to your budget!",
        recommendedTours: activeTours.slice(0, 2),
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <>
      {/* Floating AI Button — Positioned directly ON TOP of the WhatsApp button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Embuat AI Safari Assistant"
        className="fixed bottom-[88px] sm:bottom-[96px] right-6 z-40 bg-black dark:bg-white text-white dark:text-black hover:bg-[#F97316] dark:hover:bg-[#F97316] dark:hover:text-white p-3.5 sm:p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group ring-4 ring-[#F97316]/60 border border-[#F97316]"
      >
        <div className="relative flex items-center justify-center">
          <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-[#F97316] group-hover:text-white transition-colors" />
          <span className="absolute -top-1.5 -right-1.5 px-1 py-0.2 bg-[#F97316] text-white text-[8px] font-extrabold rounded-full uppercase tracking-tighter shadow">
            AI
          </span>
        </div>
        <span className="hidden sm:inline-block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black text-white dark:bg-white dark:text-black px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#F97316]/40">
          AI Safari Assistant
        </span>
      </button>

      {/* AI Safari Concierge Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-50 flex items-end sm:items-stretch justify-center sm:justify-end p-2.5 sm:p-0 bg-black/60 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none animate-fadeIn">
          <div className="w-full sm:w-[390px] md:w-[420px] h-[85dvh] sm:h-[580px] max-h-[88dvh] bg-white dark:bg-[#0A0A0A] rounded-3xl shadow-2xl border-2 border-[#F97316]/50 flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="px-4 py-3.5 bg-black text-white border-b border-white/10 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#F97316]/20 border border-[#F97316]/50 flex items-center justify-center text-[#F97316] flex-shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif font-bold text-sm text-white truncate">Embuat AI Concierge</h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  <p className="text-[10px] text-white/70 truncate">Instant Safari &amp; Itinerary Advisor</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleReset}
                  title="Reset Conversation"
                  className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close AI Assistant"
                  className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-[#F97316] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 bg-neutral-50/70 dark:bg-[#111111]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#F97316] text-white font-medium rounded-br-xs'
                        : 'bg-white dark:bg-[#1A1A1A] text-black dark:text-neutral-200 border border-black/10 dark:border-white/10 rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Recommended Tour Cards with Photos */}
                  {msg.recommendedTours && msg.recommendedTours.length > 0 && (
                    <div className="mt-2.5 w-full space-y-2">
                      {msg.recommendedTours.map((tour) => (
                        <Link
                          key={tour.id}
                          to={`/itinerary/${tour.id}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 p-2.5 rounded-2xl bg-white dark:bg-[#161616] border border-black/10 dark:border-white/10 hover:border-[#F97316] shadow-xs hover:shadow-md transition-all group"
                        >
                          <img
                            src={tour.image || tour.coverImage}
                            alt={tour.name}
                            className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=300&q=80';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#F97316]">
                              <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" /> {tour.duration}</span>
                              <span>•</span>
                              <span>From ${tour.fromPrice}</span>
                            </div>
                            <h4 className="font-bold text-xs text-black dark:text-white truncate group-hover:text-[#F97316] transition-colors">
                              {tour.name}
                            </h4>
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 group-hover:text-[#F97316] mt-0.5">
                              View Itinerary <ArrowRight className="w-2.5 h-2.5" />
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 bg-white dark:bg-[#1A1A1A] px-3.5 py-2.5 rounded-2xl w-fit border border-black/10 dark:border-white/10">
                  <Sparkles className="w-3.5 h-3.5 text-[#F97316] animate-spin" />
                  <span>Searching 84+ Tanzania itineraries...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-3.5 py-2 bg-white dark:bg-[#0A0A0A] border-t border-black/10 dark:border-white/10 flex gap-1.5 overflow-x-auto scrollbar-hide flex-shrink-0">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-white/10 hover:bg-[#F97316]/15 hover:text-[#F97316] text-[10px] font-semibold text-black dark:text-neutral-200 whitespace-nowrap border border-black/10 dark:border-white/10 transition-colors flex-shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form & Direct Actions */}
            <div className="p-3 bg-white dark:bg-[#0A0A0A] border-t border-black/10 dark:border-white/10 space-y-2 flex-shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about safaris, prices, dates..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-neutral-100 dark:bg-[#161616] border border-black/15 dark:border-white/15 text-xs text-black dark:text-white focus:ring-2 focus:ring-[#F97316] outline-none"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white transition-all shadow-md flex-shrink-0"
                  aria-label="Send Message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center justify-between gap-2 pt-0.5 text-[10px]">
                <Link
                  to="/plan-my-visit"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#F97316]/10 text-[#F97316] font-bold flex items-center justify-center gap-1 hover:bg-[#F97316] hover:text-white transition-colors"
                >
                  <Compass className="w-3 h-3" /> Custom Trip Planner
                </Link>
                <a
                  href="https://wa.me/255785341091"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-1.5 px-2.5 rounded-lg bg-neutral-100 dark:bg-white/10 text-black dark:text-white font-bold flex items-center justify-center gap-1 hover:bg-[#F97316] hover:text-white transition-colors"
                >
                  <MessageCircle className="w-3 h-3 text-[#F97316]" /> Human Specialist
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default AISafariAssistant;


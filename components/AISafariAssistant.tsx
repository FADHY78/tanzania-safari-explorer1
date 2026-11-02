import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Send,
  Compass,
  ArrowRight,
  Clock,
  MessageCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { siteSettingsService } from '../services/siteSettingsService';
import { useLiveTours } from '../services/tourService';
import { TourPackage, TourCategory } from '../types';

const ConversationalBrainIcon: React.FC<{ className?: string }> = ({
  className = 'w-6 h-6',
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.85"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path d="M12 7.2v9.1" />
    <path d="M12 8.2a2.1 2.1 0 0 0-3.3-.6 1.9 1.9 0 0 0-.6 2.5 2.1 2.1 0 0 0-.4 3.1 2 2 0 0 0 2.3 2.1c.8.1 1.5-.3 2-.9" />
    <path d="M12 8.2a2.1 2.1 0 0 1 3.3-.6 1.9 1.9 0 0 1 .6 2.5 2.1 2.1 0 0 1 .4 3.1 2 2 0 0 1-2.3 2.1c-.8.1-1.5-.3-2-.9" />
    <path d="M9.6 10.6h1.2" />
    <path d="M13.2 10.6h1.2" />
    <path d="M9.4 13.1h1.4" />
    <path d="M13.2 13.1h1.4" />
  </svg>
);

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  recommendedTours?: TourPackage[];
  followUpSuggestions?: string[];
  timestamp: string;
}

interface ConversationMemory {
  lastCategory: TourCategory | null;
  lastDurationDays: number | null;
  lastBudget: number | null;
  lastTravelers: number | null;
  lastShownTours: TourPackage[];
  turnCount: number;
}

const INITIAL_SUGGESTIONS = [
  'Help me choose a safari',
  'Best 5-day Serengeti & Crater trip?',
  'Kilimanjaro Machame vs Lemosho',
  'Zanzibar beach packages',
  'Safaris under $1,800',
];

function parseDays(durationStr: string): number {
  const m = durationStr.match(/(\d+)\s*day/i);
  if (m) return parseInt(m[1], 10);
  if (/half\s*day|full\s*day/i.test(durationStr)) return 1;
  return 5;
}

const AISafariAssistant: React.FC = () => {
  const allTours = useLiveTours();
  const activeTours = useMemo(
    () => allTours.filter((t) => t.status !== 'draft' && t.status !== 'archived'),
    [allTours]
  );

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [memory, setMemory] = useState<ConversationMemory>({
    lastCategory: null,
    lastDurationDays: null,
    lastBudget: null,
    lastTravelers: null,
    lastShownTours: [],
    turnCount: 0,
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Karibu! Welcome to Embuat Safaris in Arusha. I'm your personal Tanzania trip specialist.\n\nAre you dreaming of a wildlife safari in the Serengeti & Ngorongoro, climbing Mount Kilimanjaro, or relaxing on Zanzibar's beaches? Tell me a bit about your plans (how many days, group size, or budget) and we'll craft it together!",
      followUpSuggestions: INITIAL_SUGGESTIONS,
      timestamp: 'Online',
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const activeSuggestions = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].sender === 'ai' && messages[i].followUpSuggestions?.length) {
        return messages[i].followUpSuggestions!;
      }
    }
    return INITIAL_SUGGESTIONS;
  }, [messages]);

  const generateConversationalReply = (
    rawQuery: string,
    currentMem: ConversationMemory
  ): {
    text: string;
    tours?: TourPackage[];
    suggestions: string[];
    nextMem: ConversationMemory;
  } => {
    const q = rawQuery.trim().toLowerCase();
    const nextMem: ConversationMemory = {
      ...currentMem,
      turnCount: currentMem.turnCount + 1,
    };

    // Extract signals from user's message
    const daysMatch = q.match(/\b(\d{1,2})\s*(?:-\s*(\d{1,2})\s*)?(?:day|days|night|nights)\b/);
    if (daysMatch) {
      nextMem.lastDurationDays = parseInt(daysMatch[2] || daysMatch[1], 10);
    }

    const budgetMatch =
      q.match(/\$\s*(\d[\d,]*)/) ||
      q.match(/(?:under|below|around|budget|max)\s*\$?\s*(\d{3,5})/);
    if (budgetMatch) {
      nextMem.lastBudget = parseInt(budgetMatch[1].replace(/,/g, ''), 10);
    }

    const paxMatch = q.match(/\b(\d{1,2})\s*(?:people|persons|guests|travelers|adults|of us|pax)\b/);
    if (paxMatch) {
      nextMem.lastTravelers = parseInt(paxMatch[1], 10);
    } else if (/\b(?:couple|honeymoon|two of us|wife|husband|partner)\b/.test(q)) {
      nextMem.lastTravelers = 2;
    } else if (/\b(?:solo|just me|myself|1 person)\b/.test(q)) {
      nextMem.lastTravelers = 1;
    }

    if (/\b(?:kilimanjaro|machame|lemosho|marangu|rongai|uhuru|climb|trek|trekking|mountain|meru)\b/.test(q)) {
      nextMem.lastCategory = 'Trekking';
    } else if (/\b(?:zanzibar|beach|stone town|mnemba|kendwa|matemwe|nungwi|prison island|spice|sandbank|dhow)\b/.test(q)) {
      nextMem.lastCategory = 'Zanzibar';
    } else if (/\b(?:day trip|half day|materuni|waterfall|chemka|hot spring|boma|arusha national)\b/.test(q)) {
      nextMem.lastCategory = 'Day Trips';
    } else if (/\b(?:safari|serengeti|ngorongoro|tarangire|manyara|ndutu|mikumi|nyerere|selous|migration|wildlife|game drive|big five|lion)\b/.test(q)) {
      nextMem.lastCategory = 'Safari';
    }

    // 1. Conversational Greetings / Small Talk
    if (
      /^(hi|hello|hey|jambo|mambo|habari|karibu|good morning|good afternoon|good evening|howdy|greetings|yo)\b/.test(
        q
      ) &&
      q.split(/\s+/).length <= 5
    ) {
      return {
        text: "Jambo! Great to chat with you. I'm based right here with our Embuat Safaris team in Arusha.\n\nTo help me recommend the best experience for you, what's at the top of your bucket list — a private 4x4 wildlife safari, summiting Mount Kilimanjaro, or unwinding in Zanzibar?",
        suggestions: [
          'Wildlife Safari in Serengeti & Crater',
          'Climbing Mount Kilimanjaro',
          'Safari + Zanzibar Beach Combo',
          'Short 1–3 Day Trips',
        ],
        nextMem,
      };
    }

    if (/\b(how are you|how's it going|who are you|are you real|are you a bot)\b/.test(q)) {
      return {
        text: "I'm doing wonderfully, thank you for asking! I'm the Embuat Safaris digital trip specialist — I have live access to all 84+ of our itineraries, seasonal rates, and park routes across Tanzania.\n\nAre you planning a trip for yourself, a couple, or a family/group?",
        suggestions: [
          'Planning for 2 people (Couple)',
          'Family safari with kids',
          'Solo traveler',
          'Show top-rated safaris',
        ],
        nextMem,
      };
    }

    if (/^(thanks|thank you|asante|awesome|great|perfect|cool|ok|okay)\b/.test(q) && q.split(/\s+/).length <= 5) {
      return {
        text: "Asante sana — you're very welcome! Whenever you're ready, we can look at day-by-day itineraries, check seasonal wildlife movements, or connect you with one of our Arusha guides on WhatsApp. What would you like to explore next?",
        suggestions: [
          'What is included in the price?',
          'Best month to visit Tanzania?',
          'How does booking & deposit work?',
          'Show Zanzibar beach extensions',
        ],
        nextMem,
      };
    }

    // 2. Follow-up about previously recommended tours ("tell me about the first one", "itinerary", "what's included")
    if (
      currentMem.lastShownTours.length > 0 &&
      /\b(first one|second one|third one|that one|this tour|itinerary|day by day|included|inclusions|details on|tell me more)\b/.test(
        q
      )
    ) {
      let targetIdx = 0;
      if (q.includes('second') || q.includes('2nd')) targetIdx = 1;
      if (q.includes('third') || q.includes('3rd')) targetIdx = 2;
      const tour = currentMem.lastShownTours[targetIdx] || currentMem.lastShownTours[0];

      if (/\b(included|inclusions|cover|what do we get|exclude)\b/.test(q)) {
        const inc =
          tour.included && tour.included.length > 0
            ? tour.included.slice(0, 5).map((i) => `• ${i}`).join('\n')
            : '• Private 4x4 Land Cruiser with pop-up roof\n• All National Park & Crater fees\n• Full-board handpicked lodges & tented camps\n• Professional English-speaking naturalist guide\n• Airport transfers & bottled water';
        return {
          text: `For **${tour.name}** (${tour.duration}, from $${tour.fromPrice.toLocaleString()}/person), here is what's included:\n\n${inc}\n\nWould you like to see the day-by-day route or check rates for your group size?`,
          tours: [tour],
          suggestions: [
            'Show day-by-day route',
            'Do you have a shorter option?',
            'Can we add Zanzibar to this?',
            'How do I book this package?',
          ],
          nextMem,
        };
      }

      const itinPreview =
        tour.itinerary && tour.itinerary.length > 0
          ? tour.itinerary
              .slice(0, 4)
              .map((d) => `• Day ${d.day}: ${d.title}`)
              .join('\n') + (tour.itinerary.length > 4 ? `\n• ...plus ${tour.itinerary.length - 4} more days` : '')
          : tour.highlights.map((h) => `• ${h}`).join('\n');

      const rateInfo =
        tour.rates && tour.rates.length > 0
          ? `\n\nGroup Rates: ${tour.rates.map((r) => `${r.pax}: ${r.currency}${r.price.toLocaleString()}`).join(' | ')}`
          : '';

      return {
        text: `Here is a closer look at **${tour.name}** (${tour.duration} • Starting at $${tour.fromPrice.toLocaleString()}/person):\n\n${itinPreview}${rateInfo}\n\nYou can tap the card below to open the full interactive itinerary page, or ask me how to customize it!`,
        tours: [tour],
        suggestions: [
          "What's included in this package?",
          'Show similar packages',
          'How do I reserve dates?',
        ],
        nextMem,
      };
    }

    // 3. Follow-up: "Shorter" or "Longer" or "Cheaper"
    if (/\b(shorter|fewer days|quick|less days)\b/.test(q)) {
      const targetCat = nextMem.lastCategory || 'Safari';
      const maxD = nextMem.lastDurationDays ? Math.max(1, nextMem.lastDurationDays - 1) : 3;
      const matches = activeTours
        .filter((t) => (targetCat ? t.category === targetCat : true) && parseDays(t.duration) <= maxD)
        .sort((a, b) => parseDays(a.duration) - parseDays(b.duration))
        .slice(0, 3);
      const finalTours = matches.length > 0 ? matches : activeTours.filter((t) => parseDays(t.duration) <= 3).slice(0, 3);
      nextMem.lastShownTours = finalTours;
      return {
        text: `Got it! If you're looking for a shorter ${targetCat.toLowerCase()} itinerary (${maxD} days or less), these compact packages pack in incredible highlights without needing a full week:`,
        tours: finalTours,
        suggestions: [
          'Tell me more about the first one',
          "What's included in the price?",
          'What about 5-day packages?',
        ],
        nextMem,
      };
    }

    if (/\b(longer|more days|extended|full week|7 days|8 days)\b/.test(q)) {
      const targetCat = nextMem.lastCategory || 'Safari';
      const matches = activeTours
        .filter((t) => (targetCat ? t.category === targetCat : true) && parseDays(t.duration) >= 6)
        .slice(0, 3);
      const finalTours = matches.length > 0 ? matches : activeTours.filter((t) => parseDays(t.duration) >= 6).slice(0, 3);
      nextMem.lastShownTours = finalTours;
      return {
        text: `For a deeper, unhurried expedition (6+ days), here are our comprehensive itineraries that give you plenty of time in each park:`,
        tours: finalTours,
        suggestions: [
          'Tell me more about the first one',
          'Can we combine with Zanzibar?',
          'Show shorter 4-day options',
        ],
        nextMem,
      };
    }

    // 4. Practical Travel Questions (Visa, Vaccines, Packing, Booking/Deposit, Family/Kids)
    if (/\b(visa|passport|yellow fever|vaccine|vaccination|malaria|safety|safe)\b/.test(q)) {
      return {
        text: "Great practical question! Here's what you need to know for Tanzania:\n\n• **Visa**: Most travelers (US, UK, EU, Canada, Australia) can get a Tanzania e-Visa online before flying or a Visa on Arrival ($50–$100 USD) at Kilimanjaro (JRO), Dar es Salaam (DAR), or Zanzibar (ZNZ) airports.\n• **Passport**: Must be valid for at least 6 months beyond your travel date.\n• **Health**: Yellow Fever vaccination is only required if arriving from a Yellow Fever endemic country (or a 12+ hour transit in one).\n\nWhich month are you thinking of traveling?",
        suggestions: [
          'Best time for Great Migration?',
          'Show popular 5-day safaris',
          'What should I pack for safari?',
        ],
        nextMem,
      };
    }

    if (/\b(pack|packing|clothes|gear|wear|bring)\b/.test(q)) {
      return {
        text: "For a Tanzania safari, we recommend:\n• Neutral, lightweight layers (khaki, olive, tan — avoid bright blue/black which attract tsetse flies).\n• A warm fleece or windbreaker for crisp early-morning game drives (especially on the Ngorongoro Crater rim!).\n• Sun hat, polarized sunglasses, SPF 50+, and binoculars (we also keep a pair in our 4x4 Land Cruiser).\n• Soft-sided duffel bag (15–20kg limit if taking domestic bush flights).\n\nWould you like me to suggest a safari or Kilimanjaro itinerary?",
        suggestions: [
          'Show top Wildlife Safaris',
          'Kilimanjaro packing & routes',
          'Fly-in luxury safaris',
        ],
        nextMem,
      };
    }

    if (/\b(how to book|book|deposit|payment|pay|cancel|reservation)\b/.test(q)) {
      return {
        text: "Booking with Embuat Safaris is simple and flexible:\n1. **Pick or Customize**: Choose any of our 84 packages (or tell us how you'd like to tweak the lodges/days).\n2. **30% Deposit**: Secure your private 4x4 Land Cruiser and lodge rooms with a 30% deposit.\n3. **Balance**: The remaining balance is due 60 days before arrival (or upon arrival by arrangement).\n\nYou can click **Book Now** on any package page, use our **Custom Trip Planner** below, or message our Arusha desk directly on WhatsApp!",
        tours: currentMem.lastShownTours.length > 0 ? currentMem.lastShownTours.slice(0, 2) : activeTours.slice(0, 2),
        suggestions: [
          'Show most popular packages',
          'Safaris under $1,500',
          'Contact details & WhatsApp',
        ],
        nextMem,
      };
    }

    if (/\b(family|kids|children|child|honeymoon|romantic|private)\b/.test(q)) {
      const isHoneymoon = /\b(honeymoon|romantic|couple)\b/.test(q);
      const tours = activeTours
        .filter((t) =>
          isHoneymoon
            ? t.name.toLowerCase().includes('luxury') ||
              t.name.toLowerCase().includes('fly-in') ||
              t.category === 'Zanzibar'
            : t.category === 'Safari' && parseDays(t.duration) >= 4 && parseDays(t.duration) <= 6
        )
        .slice(0, 3);
      nextMem.lastShownTours = tours;
      return {
        text: isHoneymoon
          ? "Hongera (Congratulations)! For a honeymoon or romantic escape, our private 4x4 safaris paired with luxury tented bush camps and a Zanzibar beach retreat are unforgettable. You get your own vehicle and guide so you travel at your own pace:"
          : "Tanzania is magical for families! Because all our safaris use a private 4x4 Land Cruiser exclusively for your family, your guide can tailor game-drive lengths to your kids' energy levels, and lodges offer family cottages and swimming pools:",
        tours,
        suggestions: [
          'Tell me more about the first one',
          'Can we combine Safari + Zanzibar?',
          "What's included in the price?",
        ],
        nextMem,
      };
    }

    // 5. Season / Migration / Calving / Best time
    if (/\b(when|season|month|migration|calving|ndutu|weather|best time|january|february|march|june|july|august|september|october|december)\b/.test(q)) {
      const isCalving = /\b(calving|ndutu|january|february|march)\b/.test(q);
      const matched = activeTours
        .filter((t) =>
          isCalving
            ? t.name.toLowerCase().includes('ndutu') || t.name.toLowerCase().includes('calving')
            : t.name.toLowerCase().includes('migration') ||
              t.name.toLowerCase().includes('serengeti') ||
              t.id.includes('safari-56')
        )
        .slice(0, 3);
      nextMem.lastShownTours = matched;
      nextMem.lastCategory = 'Safari';
      return {
        text: isCalving
          ? "January to March is the legendary **Ndutu Calving Season** in Southern Serengeti & Ngorongoro! Over 500,000 wildebeest calves are born on the short-grass plains, drawing huge prides of lions and cheetahs.\n\nHere are our dedicated Ndutu Calving expeditions:"
          : "Tanzania offers incredible wildlife viewing all year:\n• **Jan – Mar (Ndutu Calving)**: Half a million wildebeest births & predator action in Southern Serengeti.\n• **Jun – Oct (Dry Season)**: Great Migration river crossings & peak Big Five game viewing.\n• **Nov – Dec & Apr – May**: Lush green scenery, migratory birds, and quieter parks.\n\nHere are our top Great Migration & Serengeti safaris:",
        tours: matched,
        suggestions: [
          'Show 3–5 Day Ndutu Calving Safaris',
          'Tell me more about the first one',
          'What about Zanzibar weather?',
        ],
        nextMem,
      };
    }

    // 6. Contact / Location
    if (/\b(contact|phone|whatsapp|email|location|address|where are you|office)\b/.test(q)) {
      const company = siteSettingsService.getSettings().company;
      return {
        text: `You can reach our Arusha team anytime:\n• **Phone / WhatsApp**: ${company.phone}\n• **Email**: ${company.email}\n• **Headquarters**: ${company.address}\n• **Hours**: ${company.officeHours}\n\nTap **Human Specialist** at the bottom of this chat to open a direct WhatsApp conversation right now!`,
        suggestions: [
          'Help me choose a safari',
          'How does booking work?',
          'Show popular packages',
        ],
        nextMem,
      };
    }

    // 7. Smart Multi-Criteria Package Search (Category + Duration + Budget + Keywords)
    const stopWords = new Set([
      'the', 'and', 'for', 'with', 'that', 'this', 'from', 'have', 'what', 'about',
      'want', 'looking', 'show', 'best', 'good', 'trip', 'tour', 'tours', 'package',
      'packages', 'tanzania', 'please', 'can', 'you', 'recommend', 'help', 'choose',
    ]);
    const keywords = q
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 3 && !stopWords.has(w));

    const scored = activeTours.map((tour) => {
      let score = 0;
      const tourDays = parseDays(tour.duration);
      const hay = `${tour.name} ${tour.category} ${tour.subcategory || ''} ${tour.destination || ''} ${tour.duration} ${tour.highlights.join(' ')}`.toLowerCase();

      if (nextMem.lastCategory && tour.category === nextMem.lastCategory) {
        score += 6;
      }

      if (nextMem.lastDurationDays) {
        const diff = Math.abs(tourDays - nextMem.lastDurationDays);
        if (diff === 0) score += 8;
        else if (diff === 1) score += 4;
        else score -= diff;
      }

      if (nextMem.lastBudget) {
        if (tour.fromPrice <= nextMem.lastBudget && tour.fromPrice > 100) {
          score += 6;
        } else if (tour.fromPrice > nextMem.lastBudget) {
          score -= 4;
        }
      }

      keywords.forEach((kw) => {
        if (tour.name.toLowerCase().includes(kw)) score += 5;
        else if (hay.includes(kw)) score += 2;
      });

      if (tour.featured) score += 1;
      return { tour, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const topTours = scored.slice(0, 3).map((s) => s.tour);
    nextMem.lastShownTours = topTours;

    // Craft a natural, context-specific response header
    const parts: string[] = [];
    if (nextMem.lastCategory === 'Trekking') {
      parts.push(
        "Climbing Mount Kilimanjaro (5,895m) is a life-changing achievement! The **Machame Route (6–7 Days)** and **Lemosho Route (7–8 Days)** offer the best scenic variety and summit acclimatization."
      );
    } else if (nextMem.lastCategory === 'Zanzibar') {
      parts.push(
        "Zanzibar is pure paradise! Whether you want a multi-day beach holiday in Nungwi, Kendwa, or Matemwe, or half-day excursions to Stone Town, Spice Farms, and Mnemba Atoll:"
      );
    } else if (nextMem.lastCategory === 'Day Trips') {
      parts.push(
        "Here are our favorite single-day excursions departing from Arusha, Moshi, and Zanzibar — ideal if you want authentic wildlife or culture in a single day:"
      );
    } else {
      const filterDesc = [
        nextMem.lastDurationDays ? `${nextMem.lastDurationDays}-day` : '',
        nextMem.lastBudget ? `under $${nextMem.lastBudget.toLocaleString()}` : '',
        nextMem.lastTravelers ? `for ${nextMem.lastTravelers} guest${nextMem.lastTravelers > 1 ? 's' : ''}` : '',
      ]
        .filter(Boolean)
        .join(' ');

      parts.push(
        filterDesc
          ? `I've matched our top Tanzania safari packages (${filterDesc}) with private 4x4 Land Cruisers and handpicked lodges:`
          : `Here are our top-rated Tanzania wildlife safaris covering the Serengeti, Ngorongoro Crater, and Tarangire:`
      );
    }

    parts.push(
      "Tap any package below to view its full itinerary, or tell me if you'd like something shorter, longer, or tailored to a specific budget!"
    );

    return {
      text: parts.join('\n\n'),
      tours: topTours,
      suggestions: [
        'Tell me more about the first one',
        "What's included in the price?",
        'Show shorter options',
        'How do I book?',
      ],
      nextMem,
    };
  };

  const handleSend = (promptText?: string) => {
    const textToSend = (promptText ?? input).trim();
    if (!textToSend || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!promptText) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateConversationalReply(textToSend, memory);
      setMemory(reply.nextMem);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply.text,
        recommendedTours: reply.tours,
        followUpSuggestions: reply.suggestions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleReset = () => {
    setMemory({
      lastCategory: null,
      lastDurationDays: null,
      lastBudget: null,
      lastTravelers: null,
      lastShownTours: [],
      turnCount: 0,
    });
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: "Karibu! Welcome to Embuat Safaris in Arusha. I'm your personal Tanzania trip specialist.\n\nAre you dreaming of a wildlife safari in the Serengeti & Ngorongoro, climbing Mount Kilimanjaro, or relaxing on Zanzibar's beaches? Tell me a bit about your plans (how many days, group size, or budget) and we'll craft it together!",
        followUpSuggestions: INITIAL_SUGGESTIONS,
        timestamp: 'Online',
      },
    ]);
  };

  // Format **bold** segments cleanly
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-black dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const whatsappNum = siteSettingsService.getSettings().company.whatsapp || '255785341091';

  return (
    <>
      {/* Floating Launcher Button (Hidden while chat window is open so it never overlaps on mobile/laptop) */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setTimeout(() => inputRef.current?.focus(), 150);
          }}
          aria-label="Open Embuat AI Safari Assistant"
          className="fixed bottom-[84px] sm:bottom-[92px] right-4 sm:right-6 z-40 bg-brand-gold hover:bg-brand-orange text-white p-3.5 sm:p-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all group ring-4 ring-white/30 dark:ring-black/60"
        >
          <ConversationalBrainIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          <span className="hidden sm:inline-block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#0E0C0A] text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-brand-gold/40">
            Ask Safari Concierge
          </span>
        </button>
      )}

      {/* Responsive Chat Drawer / Window — Fits all phones, tablets, 13" laptops & desktops */}
      {isOpen && (
        <div
          className="fixed inset-0 sm:inset-auto sm:bottom-5 sm:right-5 z-50 flex items-end sm:items-stretch justify-center sm:justify-end bg-black/50 sm:bg-transparent backdrop-blur-[2px] sm:backdrop-blur-none"
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:w-[360px] md:w-[395px] h-[82dvh] sm:h-[min(540px,calc(100dvh-96px))] max-h-[calc(100dvh-12px)] bg-white dark:bg-[#0D0B09] rounded-t-2xl sm:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-black/15 dark:border-white/15 flex flex-col overflow-hidden"
          >
            {/* Compact Header */}
            <div className="px-3.5 py-2.5 sm:px-4 sm:py-3 bg-[#0E0C0A] text-white border-b border-white/10 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-white shadow flex-shrink-0">
                  <ConversationalBrainIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif font-bold text-xs sm:text-sm text-white truncate">
                      Embuat Safari Concierge
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                  </div>
                  <p className="text-[10px] text-neutral-400 truncate">
                    Arusha Specialist • {activeTours.length} Live Itineraries
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={handleReset}
                  title="New Conversation"
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Concierge"
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Messages Area */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 sm:p-3.5 space-y-3 bg-neutral-50 dark:bg-[#110E0C]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-brand-gold text-white font-medium rounded-br-xs'
                        : 'bg-white dark:bg-[#1A1613] text-neutral-800 dark:text-neutral-200 border border-black/10 dark:border-white/10 rounded-bl-xs'
                    }`}
                  >
                    {renderFormattedText(msg.text)}
                  </div>

                  {/* Compact Recommended Tour Cards */}
                  {msg.recommendedTours && msg.recommendedTours.length > 0 && (
                    <div className="mt-2 w-full space-y-1.5">
                      {msg.recommendedTours.map((tour) => (
                        <Link
                          key={tour.id}
                          to={`/itinerary/${tour.id}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-[#181411] border border-black/10 dark:border-white/10 hover:border-brand-gold shadow-xs transition-all group"
                        >
                          <img
                            src={tour.image || tour.coverImage}
                            alt={tour.name}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-neutral-900"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/LION-IN-NGORONGORO-1-1.jpeg';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-gold">
                              <span className="inline-flex items-center gap-0.5">
                                <Clock className="w-2.5 h-2.5" /> {tour.duration}
                              </span>
                              <span>•</span>
                              <span>From ${tour.fromPrice.toLocaleString()}</span>
                            </div>
                            <h4 className="font-bold text-xs text-black dark:text-white truncate group-hover:text-brand-gold transition-colors">
                              {tour.name}
                            </h4>
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-neutral-500 dark:text-neutral-400 group-hover:text-brand-gold">
                              View full itinerary <ArrowRight className="w-2.5 h-2.5" />
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="inline-flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 bg-white dark:bg-[#1A1613] px-3 py-2 rounded-2xl border border-black/10 dark:border-white/10">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-spin" />
                  <span>Typing a response...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Contextual Follow-Up Suggestion Chips */}
            <div className="px-3 py-1.5 bg-white dark:bg-[#0E0C0A] border-t border-black/10 dark:border-white/10 flex gap-1.5 overflow-x-auto scrollbar-hide flex-shrink-0">
              {activeSuggestions.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-white/10 hover:bg-brand-gold hover:text-white text-[10px] font-semibold text-neutral-800 dark:text-neutral-200 whitespace-nowrap border border-black/10 dark:border-white/10 transition-colors flex-shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form & Direct Actions */}
            <div className="p-2.5 sm:p-3 bg-white dark:bg-[#0E0C0A] border-t border-black/10 dark:border-white/10 space-y-2 flex-shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about your Tanzania trip..."
                  className="flex-1 px-3 py-2 rounded-xl bg-neutral-100 dark:bg-[#181411] border border-black/15 dark:border-white/15 text-[16px] sm:text-xs text-black dark:text-white focus:border-brand-gold outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-brand-gold hover:bg-brand-orange disabled:opacity-40 text-white transition-all shadow flex-shrink-0"
                  aria-label="Send Message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="flex items-center justify-between gap-2 text-[10px]">
                <Link
                  to="/plan-my-visit"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-brand-gold/15 text-brand-gold font-bold flex items-center justify-center gap-1 hover:bg-brand-gold hover:text-white transition-colors"
                >
                  <Compass className="w-3 h-3" /> Custom Trip Planner
                </Link>
                <a
                  href={`https://wa.me/${whatsappNum}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-1.5 px-2 rounded-lg bg-neutral-100 dark:bg-white/10 text-black dark:text-white font-bold flex items-center justify-center gap-1 hover:bg-[#25D366] hover:text-white transition-colors"
                >
                  <MessageCircle className="w-3 h-3 text-[#25D366]" /> WhatsApp Specialist
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

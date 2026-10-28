import { useState, useEffect } from 'react';
import { Testimonial } from '../types';

export interface SiteSectionContent {
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    heroImage: string;
    primaryCtaText: string;
    secondaryCtaText: string;
  };
  about: {
    badge: string;
    heading: string;
    subheading: string;
    description: string;
    foundingYear: string;
    stats: Array<{ id: string; val: string; label: string }>;
  };
  contact: {
    phone: string;
    email: string;
    officeAddress: string;
    officeHours: string;
    whatsappNumber: string;
    emergencyLine: string;
  };
  sustainability: {
    pledgePercentage: string;
    headline: string;
    description: string;
  };
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
    category?: string;
  }>;
  testimonials: Testimonial[];
}

const SITE_CONTENT_STORAGE_KEY = 'embuat_site_content_v1';
const SITE_CONTENT_EVENT = 'embuat_site_content_updated';

const DEFAULT_SITE_CONTENT: SiteSectionContent = {
  hero: {
    badge: 'Authentic Tanzanian Safaris & Expeditions',
    titleLine1: 'Experience Tanzania’s Untamed',
    titleLine2: 'Wilderness & Wonder',
    subtitle: 'From the Great Migration thunder across Serengeti plains to the snows of Kilimanjaro and the turquoise spice beaches of Zanzibar — travel with local Tanzanian masters.',
    heroImage: 'https://safari56.com/wp-content/uploads/2026/08/Tarangire-Ngorongoro-Serengeti-Safari-1.jpg',
    primaryCtaText: 'Explore Safari Packages',
    secondaryCtaText: 'Plan Tailor-Made Journey'
  },
  about: {
    badge: 'Founded 2025 • Arusha & Moshi, Tanzania',
    heading: 'Why Choose',
    subheading: 'Embuat Safaris?',
    description: 'Tanzania is the crown jewel of African safari realms — blessed with the vast Serengeti plains, the ancient caldera of Ngorongoro, the snows of Kilimanjaro, and the idyllic turquoise shores of Zanzibar. At Embuat Safaris, every itinerary is designed for pure authenticity, luxury comfort, and positive conservation impact.',
    foundingYear: '2025',
    stats: [
      { id: '1', val: '2025', label: 'Founded in Arusha' },
      { id: '2', val: '100%', label: 'Tanzanian Owned' },
      { id: '3', val: '4.9 ★', label: 'TripAdvisor Rating' },
      { id: '4', val: '25+', label: 'Protected Reserves' }
    ]
  },
  contact: {
    phone: '+255 753 997 777',
    email: 'info@embuatsafaris.com',
    officeAddress: 'Arusha & Moshi, Tanzania',
    officeHours: '7:30 AM – 7:00 PM EAT (Emergency Line 24/7)',
    whatsappNumber: '+255753997777',
    emergencyLine: '+255 754 000 000'
  },
  sustainability: {
    pledgePercentage: '5%',
    headline: 'Preserving Wild Tanzania For Future Generations',
    description: 'We believe genuine luxury travel must safeguard the ecosystems and indigenous cultures that make Tanzania incomparable. 5% of all booking revenues directly fund community schools in Maasailand and Serengeti ranger anti-poaching patrols.'
  },
  faqs: [
    {
      id: 'faq-1',
      question: 'How far in advance should I book my safari?',
      answer: 'For peak dry season and the Great Migration river crossings (June–October), we recommend booking 4 to 8 months in advance to secure top safari lodges and tented camps.',
      category: 'Booking & Timing'
    },
    {
      id: 'faq-2',
      question: 'What is your cancellation and rebooking policy?',
      answer: 'We offer flexible rebooking terms. Cancellations made 60+ days before departure receive a full refund minus minimal lodge registration deposits. Emergency date transfers are accommodated whenever feasible.',
      category: 'Policies'
    },
    {
      id: 'faq-3',
      question: 'Are all park and conservation fees included?',
      answer: 'Yes! Every Embuat Safaris package includes 100% of national park fees, Ngorongoro Crater service fees, conservation levies, and government taxes upfront with no hidden surcharges.',
      category: 'Inclusions'
    },
    {
      id: 'faq-4',
      question: 'What vehicle do we travel in on safari?',
      answer: 'You will travel in our customized 4x4 Toyota Land Cruisers featuring 360° pop-up viewing roofs, individual window seats, 220V power inverters for cameras/phones, a 40L refrigerator with chilled water, and long-range VHF wildlife radios.',
      category: 'Expedition Fleet'
    },
    {
      id: 'faq-5',
      question: 'Can I combine Kilimanjaro trekking with a safari and Zanzibar?',
      answer: 'Absolutely! Our "Bush, Peak & Beach" journeys are our most popular itineraries. We handle all bush flights, domestic transfers, mountain permits, and oceanfront resorts seamlessly.',
      category: 'Custom Packages'
    }
  ],
  testimonials: [
    {
      id: 't-1',
      name: 'Sarah & David Mitchell',
      location: 'London, United Kingdom',
      text: 'The 7-day Great Migration safari with Embuat Safaris exceeded every dream. We witnessed two Mara River crossings and saw leopards on consecutive mornings. Guide Josephat has superhuman spotting instincts!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      tour: '7-Day Serengeti Migration Luxury'
    },
    {
      id: 't-2',
      name: 'Marcus & Elena Lindqvist',
      location: 'Stockholm, Sweden',
      text: 'From the airport pickup in Kilimanjaro to our summit on Uhuru Peak and recovery on Nungwi beach in Zanzibar, every single transfer and tented camp was flawless. Unmatched professionalism.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      tour: 'Kilimanjaro Lemosho & Zanzibar'
    },
    {
      id: 't-3',
      name: 'Dr. James & Patricia Chen',
      location: 'San Francisco, USA',
      text: 'Travelling with our two teenagers, safety and comfort were top priorities. The Land Cruiser was immaculate, equipped with cold drinks, power for our telephoto cameras, and our guide felt like family.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      tour: '5-Day Classic Big Five Explorer'
    }
  ]
};

class SiteContentService {
  public getContent(): SiteSectionContent {
    try {
      const stored = localStorage.getItem(SITE_CONTENT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.hero && parsed.about) {
          return {
            ...DEFAULT_SITE_CONTENT,
            ...parsed,
            faqs: parsed.faqs || DEFAULT_SITE_CONTENT.faqs,
            testimonials: parsed.testimonials || DEFAULT_SITE_CONTENT.testimonials
          };
        }
      }
    } catch (e) {
      console.error('Error reading site content from localStorage:', e);
    }

    try {
      localStorage.setItem(SITE_CONTENT_STORAGE_KEY, JSON.stringify(DEFAULT_SITE_CONTENT));
    } catch (e) {
      console.warn('Could not persist default site content:', e);
    }

    return DEFAULT_SITE_CONTENT;
  }

  public saveContent(content: SiteSectionContent): void {
    try {
      localStorage.setItem(SITE_CONTENT_STORAGE_KEY, JSON.stringify(content));
      window.dispatchEvent(new CustomEvent(SITE_CONTENT_EVENT, { detail: content }));
    } catch (e) {
      console.error('Error saving site content:', e);
    }
  }

  public updateHero(hero: Partial<SiteSectionContent['hero']>): void {
    const current = this.getContent();
    const updated = {
      ...current,
      hero: { ...current.hero, ...hero }
    };
    this.saveContent(updated);
  }

  public updateAbout(about: Partial<SiteSectionContent['about']>): void {
    const current = this.getContent();
    const updated = {
      ...current,
      about: { ...current.about, ...about }
    };
    this.saveContent(updated);
  }

  public updateContact(contact: Partial<SiteSectionContent['contact']>): void {
    const current = this.getContent();
    const updated = {
      ...current,
      contact: { ...current.contact, ...contact }
    };
    this.saveContent(updated);
  }

  public updateSustainability(sustainability: Partial<SiteSectionContent['sustainability']>): void {
    const current = this.getContent();
    const updated = {
      ...current,
      sustainability: { ...current.sustainability, ...sustainability }
    };
    this.saveContent(updated);
  }

  // ─── TESTIMONIALS CRUD ───────────────────────────────────────────────
  public addTestimonial(t: Omit<Testimonial, 'id'>): Testimonial {
    const current = this.getContent();
    const newTestimonial: Testimonial = {
      ...t,
      id: `t-${Date.now()}`
    };
    const updated = {
      ...current,
      testimonials: [newTestimonial, ...current.testimonials]
    };
    this.saveContent(updated);
    return newTestimonial;
  }

  public updateTestimonial(id: string, updates: Partial<Testimonial>): void {
    const current = this.getContent();
    const updated = {
      ...current,
      testimonials: current.testimonials.map(t => t.id === id ? { ...t, ...updates } : t)
    };
    this.saveContent(updated);
  }

  public deleteTestimonial(id: string): void {
    const current = this.getContent();
    const updated = {
      ...current,
      testimonials: current.testimonials.filter(t => t.id !== id)
    };
    this.saveContent(updated);
  }

  // ─── FAQS CRUD ────────────────────────────────────────────────────────
  public addFaq(faq: Omit<SiteSectionContent['faqs'][0], 'id'>): SiteSectionContent['faqs'][0] {
    const current = this.getContent();
    const newFaq = {
      ...faq,
      id: `faq-${Date.now()}`
    };
    const updated = {
      ...current,
      faqs: [...current.faqs, newFaq]
    };
    this.saveContent(updated);
    return newFaq;
  }

  public updateFaq(id: string, updates: Partial<SiteSectionContent['faqs'][0]>): void {
    const current = this.getContent();
    const updated = {
      ...current,
      faqs: current.faqs.map(f => f.id === id ? { ...f, ...updates } : f)
    };
    this.saveContent(updated);
  }

  public deleteFaq(id: string): void {
    const current = this.getContent();
    const updated = {
      ...current,
      faqs: current.faqs.filter(f => f.id !== id)
    };
    this.saveContent(updated);
  }

  public resetToDefault(): void {
    this.saveContent(DEFAULT_SITE_CONTENT);
  }
}

export const siteContentService = new SiteContentService();

export const useLiveSiteContent = () => {
  const [content, setContent] = useState<SiteSectionContent>(() => siteContentService.getContent());

  useEffect(() => {
    const handleUpdate = () => {
      setContent(siteContentService.getContent());
    };

    window.addEventListener(SITE_CONTENT_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(SITE_CONTENT_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return content;
};

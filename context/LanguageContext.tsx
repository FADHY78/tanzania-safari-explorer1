import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type LanguageCode = 'en' | 'fr' | 'de' | 'it' | 'es' | 'sw';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  country: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', country: 'United States & UK', flag: '🇺🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', country: 'France', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', country: 'Germany', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', country: 'Italy', flag: '🇮🇹' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', country: 'Spain', flag: '🇪🇸' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', country: 'Tanzania', flag: '🇹🇿' }
];

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.tours': 'Tours',
    'nav.destinations': 'Destinations',
    'nav.gallery': 'Gallery',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.planSafari': 'Plan My Safari',
    'nav.chatWithExpert': 'Chat with an Expert',

    // Categories
    'cat.all': 'All Highlights',
    'cat.kilimanjaro': 'Kilimanjaro Treks',
    'cat.safari': 'Wildlife Safaris',
    'cat.zanzibar': 'Zanzibar Holidays',
    'cat.daytrips': 'Day Trips & Culture',

    // Safari with Purpose & Heart
    'purpose.tag': 'Ethical & Sustainable Tourism',
    'purpose.title': 'Safari with',
    'purpose.highlight': 'Purpose & Heart',
    'purpose.desc': 'We believe that genuine travel must be a force for good. Our mission is to preserve Tanzania\'s irreplaceable ecosystems for future generations while ensuring host communities prosper directly from every safari expedition.',
    'purpose.pillar1.title': 'Wildlife Sanctuary & Anti-Poaching',
    'purpose.pillar1.desc': 'We channel direct funding to community ranger patrols and anti-poaching operations in Serengeti and Ngorongoro, safeguarding rhinos and elephants.',
    'purpose.pillar1.stat': '5% Revenue Shared',
    'purpose.pillar2.title': 'Local Community Empowerment',
    'purpose.pillar2.desc': 'Over 85% of our guides, drivers, and camp staff are native Tanzanians from Arusha, Moshi, and surrounding Maasai and Chagga villages.',
    'purpose.pillar2.stat': '85%+ Native Staff',
    'purpose.pillar3.title': 'Low-Impact & Zero-Plastic Expeditions',
    'purpose.pillar3.desc': 'Our safari camps are solar-powered with gravity-fed water. Every guest receives a refillable stainless steel canteen to eliminate single-use plastics.',
    'purpose.pillar3.stat': '100% Plastic Free',
    'purpose.stat.community': 'Direct Community Investment',
    'purpose.stat.communityDesc': 'Funding local primary schools and clean water boreholes near Arusha.',
    'purpose.stat.eco': 'Plastic-Free Bush Operations',
    'purpose.stat.ecoDesc': 'Refillable stainless steel canteens and solar wilderness camps.',
    'purpose.badge.serengeti': 'Serengeti Anti-Poaching',
    'purpose.badge.heritage': 'Maasai & Chagga Heritage',

    // Footer & Legal
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.copyright': '© 2026 Embuat Safaris. Explore • Experience • Preserve. Proudly Tanzanian Owned.',
    'footer.ttb': 'TTB Licensed',
    'footer.atoi': 'ATOI Member',
    'footer.quickLinks': 'Explore Tours',
    'footer.circuits': 'Circuits & Parks',
    'footer.aboutDesc': 'Premier Tanzania tour operator based in Arusha. Specialists in Mount Kilimanjaro climbing, Serengeti wildlife safaris, and Zanzibar island beach holidays.',

    // Common UI
    'ui.verifiedPackages': 'verified packages',
    'ui.viewItinerary': 'View Full Itinerary',
    'ui.days': 'Days',
    'ui.person': 'person',
    'ui.from': 'From',
    'ui.bookNow': 'Book This Safari',
    'ui.customItinerary': 'Request Custom Itinerary',
    'ui.switchLanguage': 'Select Language'
  },

  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.tours': 'Circuits',
    'nav.destinations': 'Destinations',
    'nav.gallery': 'Galerie',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',
    'nav.planSafari': 'Créer Mon Safari',
    'nav.chatWithExpert': 'Parler à un Expert',

    // Categories
    'cat.all': 'Tous les Incontournables',
    'cat.kilimanjaro': 'Trek Kilimandjaro',
    'cat.safari': 'Safaris Animaliers',
    'cat.zanzibar': 'Séjours à Zanzibar',
    'cat.daytrips': 'Excursions d\'un Jour & Culture',

    // Safari with Purpose & Heart
    'purpose.tag': 'Tourisme Éthique & Durable',
    'purpose.title': 'Un Safari avec',
    'purpose.highlight': 'Cœur & Engagement',
    'purpose.desc': 'Nous croyons fermement que le voyage authentique doit avoir un impact positif. Notre mission est de préserver les écosystèmes irremplaçables de Tanzanie pour les générations futures tout en assurant la prospérité directe des communautés locales.',
    'purpose.pillar1.title': 'Sanctuaire Faunique & Lutte Anti-Braconnage',
    'purpose.pillar1.desc': 'Nous finançons directement les patrouilles de gardes forestiers et la protection des rhinocéros et éléphants dans le Serengeti et le Ngorongoro.',
    'purpose.pillar1.stat': '5% des Revenus Reversés',
    'purpose.pillar2.title': 'Autonomisation des Communautés Locales',
    'purpose.pillar2.desc': 'Plus de 85% de nos guides, chauffeurs et équipes de camp sont des Tanzaniens natifs d\'Arusha, Moshi et des villages Maasai et Chagga.',
    'purpose.pillar2.stat': '85%+ Équipe Locale',
    'purpose.pillar3.title': 'Expéditions Écoresponsables Sans Plastique',
    'purpose.pillar3.desc': 'Nos camps de brousse fonctionnent à l\'énergie solaire. Chaque voyageur reçoit une gourde isotherme inox pour bannir le plastique à usage unique.',
    'purpose.pillar3.stat': '100% Sans Plastique',
    'purpose.stat.community': 'Investissement Communautaire Direct',
    'purpose.stat.communityDesc': 'Financement des écoles primaires et puits d\'eau potable autour d\'Arusha.',
    'purpose.stat.eco': 'Opérations en Brousse Zéro Plastique',
    'purpose.stat.ecoDesc': 'Gourdes inox réutilisables et camps sous tentes solaires.',
    'purpose.badge.serengeti': 'Anti-Braconnage Serengeti',
    'purpose.badge.heritage': 'Héritage Maasai & Chagga',

    // Footer & Legal
    'footer.privacy': 'Politique de Confidentialité',
    'footer.terms': 'Conditions Générales de Vente',
    'footer.copyright': '© 2026 Embuat Safaris. Explorer • Vivre • Préserver. Société 100% Tanzanienne.',
    'footer.ttb': 'Licence TTB Officielle',
    'footer.atoi': 'Membre ATOI',
    'footer.quickLinks': 'Découvrir nos Circuits',
    'footer.circuits': 'Parcs & Réserves',
    'footer.aboutDesc': 'Voyagiste réceptif agréé en Tanzanie, basé à Arusha. Spécialiste de l\'ascension du Kilimandjaro, des safaris dans le Serengeti et des plages de Zanzibar.',

    // Common UI
    'ui.verifiedPackages': 'circuits certifiés',
    'ui.viewItinerary': 'Voir l\'Itinéraire Complet',
    'ui.days': 'Jours',
    'ui.person': 'personne',
    'ui.from': 'À partir de',
    'ui.bookNow': 'Réserver ce Safari',
    'ui.customItinerary': 'Devis Safari Sur-Mesure',
    'ui.switchLanguage': 'Changer de Langue'
  },

  de: {
    // Navigation
    'nav.home': 'Start',
    'nav.tours': 'Touren',
    'nav.destinations': 'Reiseziele',
    'nav.gallery': 'Galerie',
    'nav.about': 'Über Uns',
    'nav.contact': 'Kontakt',
    'nav.planSafari': 'Safari Planen',
    'nav.chatWithExpert': 'Experten Chatten',

    // Categories
    'cat.all': 'Alle Höhepunkte',
    'cat.kilimanjaro': 'Kilimandscharo Besteigung',
    'cat.safari': 'Tierwelt Safaris',
    'cat.zanzibar': 'Sansibar Urlaub',
    'cat.daytrips': 'Tagestouren & Kultur',

    // Safari with Purpose & Heart
    'purpose.tag': 'Ethischer & Nachhaltiger Tourismus',
    'purpose.title': 'Safari mit',
    'purpose.highlight': 'Sinn & Herzblut',
    'purpose.desc': 'Wir sind überzeugt, dass authentisches Reisen Gutes bewirken muss. Unsere Mission ist der Schutz der einzigartigen Ökosysteme Tansanias für zukünftige Generationen und der direkte Wohlstand der einheimischen Gemeinschaften.',
    'purpose.pillar1.title': 'Wildtierschutz & Anti-Wilderei-Patrouillen',
    'purpose.pillar1.desc': 'Direkte finanzielle Unterstützung für Ranger-Patrouillen im Serengeti- und Ngorongoro-Schutzgebiet zur Sicherung von Spitzmaulnashörnern und Elefanten.',
    'purpose.pillar1.stat': '5% Umsatzbeteiligung',
    'purpose.pillar2.title': 'Stärkung Lokaler Gemeinschaften',
    'purpose.pillar2.desc': 'Über 85% unserer Guides, Fahrer und Camp-Mitarbeiter stammen gebürtig aus Arusha, Moshi sowie umliegenden Massai- und Chagga-Dörfern.',
    'purpose.pillar2.stat': '85%+ Einheimische Mitarbeiter',
    'purpose.pillar3.title': 'Nachhaltige Plastikfreie Expeditionen',
    'purpose.pillar3.desc': 'Unsere Safaricamps werden mit Solarstrom betrieben. Jeder Reisegast erhält eine nachfüllbare Edelstahl-Trinkflasche zur Vermeidung von Einwegplastik.',
    'purpose.pillar3.stat': '100% Plastikfrei',
    'purpose.stat.community': 'Direkte Gemeinschaftsinvestition',
    'purpose.stat.communityDesc': 'Finanzierung von Grundschulen und Trinkwasserbrunnen bei Arusha.',
    'purpose.stat.eco': 'Plastikfreier Safaribetrieb',
    'purpose.stat.ecoDesc': 'Wiederverwendbare Trinkflaschen und solargetriebene Busch-Camps.',
    'purpose.badge.serengeti': 'Serengeti Wildtierschutz',
    'purpose.badge.heritage': 'Massai & Chagga Kultur',

    // Footer & Legal
    'footer.privacy': 'Datenschutzerklärung',
    'footer.terms': 'Allgemeine Geschäftsbedingungen',
    'footer.copyright': '© 2026 Embuat Safaris. Entdecken • Erleben • Bewahren. Tansanisches Unternehmen.',
    'footer.ttb': 'TTB Lizenziert',
    'footer.atoi': 'ATOI Mitglied',
    'footer.quickLinks': 'Touren Entdecken',
    'footer.circuits': 'Nationalparks & Regionen',
    'footer.aboutDesc': 'Staatlich lizenzierter Safariveranstalter mit Sitz in Arusha, Tansania. Spezialist für Kilimandscharo-Besteigungen, Serengeti-Safaris und Sansibar.',

    // Common UI
    'ui.verifiedPackages': 'geprüfte Touren',
    'ui.viewItinerary': 'Vollständigen Ablauf Anzeigen',
    'ui.days': 'Tage',
    'ui.person': 'Person',
    'ui.from': 'Ab',
    'ui.bookNow': 'Diese Safari Buchen',
    'ui.customItinerary': 'Maßgeschneiderte Anfrage',
    'ui.switchLanguage': 'Sprache Wählen'
  },

  it: {
    // Navigation
    'nav.home': 'Home',
    'nav.tours': 'Tour',
    'nav.destinations': 'Destinazioni',
    'nav.gallery': 'Galleria',
    'nav.about': 'Chi Siamo',
    'nav.contact': 'Contatti',
    'nav.planSafari': 'Pianifica Safari',
    'nav.chatWithExpert': 'Parla con un Esperto',

    // Categories
    'cat.all': 'Tutti i Tour',
    'cat.kilimanjaro': 'Trekking Kilimangiaro',
    'cat.safari': 'Safari Fauna Selvatica',
    'cat.zanzibar': 'Vacanze a Zanzibar',
    'cat.daytrips': 'Escursioni Giornaliere & Cultura',

    // Safari with Purpose & Heart
    'purpose.tag': 'Turismo Etico & Sostenibile',
    'purpose.title': 'Un Safari con',
    'purpose.highlight': 'Passione & Rispetto',
    'purpose.desc': 'Crediamo che il viaggio autentico debba creare impatto positivo. La nostra missione è proteggere gli ecosistemi insostituibili della Tanzania per le generazioni future, sostenendo al contempo le comunità locali.',
    'purpose.pillar1.title': 'Conservazione & Lotta Anti-Bracconaggio',
    'purpose.pillar1.desc': 'Sostegno economico diretto alle pattuglie di ranger comunitari nel Serengeti e nel cratere di Ngorongoro per proteggere rinoceronti ed elefanti.',
    'purpose.pillar1.stat': '5% Entrate Devolute',
    'purpose.pillar2.title': 'Supporto alle Comunità Locali',
    'purpose.pillar2.desc': 'Oltre l\'85% delle nostre guide, autisti e personale del campo sono tanzaniani nativi di Arusha, Moshi e dei villaggi Maasai e Chagga.',
    'purpose.pillar2.stat': '85%+ Personale Locale',
    'purpose.pillar3.title': 'Spedizioni a Basso Impatto Senza Plastica',
    'purpose.pillar3.desc': 'I nostri campi safari sono alimentati a energia solare. Ogni ospite riceve una borraccia termica in acciaio inox per azzerare la plastica monouso.',
    'purpose.pillar3.stat': '100% Senza Plastica',
    'purpose.stat.community': 'Investimenti Comunitari Diretti',
    'purpose.stat.communityDesc': 'Supporto a scuole primarie e pozzi di acqua potabile vicino ad Arusha.',
    'purpose.stat.eco': 'Operazioni Safari Sostenibili',
    'purpose.stat.ecoDesc': 'Borracce riutilizzabili e campi tendati a energia solare.',
    'purpose.badge.serengeti': 'Anti-Bracconaggio Serengeti',
    'purpose.badge.heritage': 'Tradizione Maasai & Chagga',

    // Footer & Legal
    'footer.privacy': 'Informativa sulla Privacy',
    'footer.terms': 'Termini e Condizioni di Servizio',
    'footer.copyright': '© 2026 Embuat Safaris. Esplora • Vivi • Preserva. Orgogliosamente Tanzaniana.',
    'footer.ttb': 'Licenza TTB Ufficiale',
    'footer.atoi': 'Membro ATOI',
    'footer.quickLinks': 'Esplora i Tour',
    'footer.circuits': 'Parchi & Riserve',
    'footer.aboutDesc': 'Tour operator autorizzato con sede ad Arusha, Tanzania. Specialisti in trekking sul Kilimangiaro, safari nel Serengeti e soggiorni mare a Zanzibar.',

    // Common UI
    'ui.verifiedPackages': 'pacchetti verificati',
    'ui.viewItinerary': 'Visualizza Itinerario Completo',
    'ui.days': 'Giorni',
    'ui.person': 'persona',
    'ui.from': 'Da',
    'ui.bookNow': 'Prenota Safari',
    'ui.customItinerary': 'Richiedi Itinerario su Misura',
    'ui.switchLanguage': 'Seleziona Lingua'
  },

  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.tours': 'Tours',
    'nav.destinations': 'Destinos',
    'nav.gallery': 'Galería',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',
    'nav.planSafari': 'Diseñar Safari',
    'nav.chatWithExpert': 'Hablar con un Experto',

    // Categories
    'cat.all': 'Todos los Destacados',
    'cat.kilimanjaro': 'Trekking Kilimanjaro',
    'cat.safari': 'Safaris de Vida Salvaje',
    'cat.zanzibar': 'Vacaciones en Zanzíbar',
    'cat.daytrips': 'Excursiones de un Día & Cultura',

    // Safari with Purpose & Heart
    'purpose.tag': 'Turismo Ético y Sostenible',
    'purpose.title': 'Un Safari con',
    'purpose.highlight': 'Propósito y Corazón',
    'purpose.desc': 'Creemos firmemente que viajar con autenticidad debe ser una fuerza transformadora. Nuestra misión es preservar los ecosistemas irreemplazables de Tanzania mientras aseguramos que las comunidades anfitrionas prosperen directamente.',
    'purpose.pillar1.title': 'Protección de Fauna & Contra la Caza Furtiva',
    'purpose.pillar1.desc': 'Financiamos directamente patrullas de guardabosques comunitarios en el Serengueti y Ngorongoro, protegiendo rinocerontes y elefantes.',
    'purpose.pillar1.stat': '5% Ingresos Destinados',
    'purpose.pillar2.title': 'Empoderamiento de Comunidades Locales',
    'purpose.pillar2.desc': 'Más del 85% de nuestros guías, conductores y personal de campamento son tanzanos nativos de Arusha, Moshi y aldeas Maasai y Chagga.',
    'purpose.pillar2.stat': '85%+ Personal Local',
    'purpose.pillar3.title': 'Expediciones Sostenibles Sin Plástico',
    'purpose.pillar3.desc': 'Nuestros campamentos safari funcionan con energía solar. Cada viajero recibe una cantimplora de acero inoxidable para eliminar el plástico de un solo uso.',
    'purpose.pillar3.stat': '100% Sin Plástico',
    'purpose.stat.community': 'Inversión Comunitaria Directa',
    'purpose.stat.communityDesc': 'Financiación de escuelas primarias y pozos de agua potable cerca de Arusha.',
    'purpose.stat.eco': 'Operaciones Libres de Plástico',
    'purpose.stat.ecoDesc': 'Botellas reutilizables y campamentos ecológicos solares.',
    'purpose.badge.serengeti': 'Vigilancia en Serengueti',
    'purpose.badge.heritage': 'Herencia Maasai y Chagga',

    // Footer & Legal
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos y Condiciones del Servicio',
    'footer.copyright': '© 2026 Embuat Safaris. Explora • Siente • Preserva. Empresa 100% Tanzana.',
    'footer.ttb': 'Licencia Oficial TTB',
    'footer.atoi': 'Miembro ATOI',
    'footer.quickLinks': 'Explorar Paquetes',
    'footer.circuits': 'Parques y Circuitos',
    'footer.aboutDesc': 'Operador turístico autorizado en Tanzania con sede en Arusha. Especialistas en ascensos al Kilimanjaro, safaris en el Serengueti y playas de Zanzíbar.',

    // Common UI
    'ui.verifiedPackages': 'paquetes verificados',
    'ui.viewItinerary': 'Ver Itinerario Completo',
    'ui.days': 'Días',
    'ui.person': 'persona',
    'ui.from': 'Desde',
    'ui.bookNow': 'Reservar Este Safari',
    'ui.customItinerary': 'Solicitar Safari Personalizado',
    'ui.switchLanguage': 'Cambiar Idioma'
  },

  sw: {
    // Navigation
    'nav.home': 'Mwanzo',
    'nav.tours': 'Safari',
    'nav.destinations': 'Vivutio',
    'nav.gallery': 'Matunzio',
    'nav.about': 'Kutuhusu',
    'nav.contact': 'Mawasiliano',
    'nav.planSafari': 'Panga Safari',
    'nav.chatWithExpert': 'Ongea na Mtaalamu',

    // Categories
    'cat.all': 'Vivutio Vyote',
    'cat.kilimanjaro': 'Kupanda Mlima Kilimanjaro',
    'cat.safari': 'Safari za Wanyamapori',
    'cat.zanzibar': 'Likizo ya Visiwa vya Zanzibar',
    'cat.daytrips': 'Ziara za Siku & Utamaduni',

    // Safari with Purpose & Heart
    'purpose.tag': 'Utalii Wenye Maadili na Endelevu',
    'purpose.title': 'Safari Yenye',
    'purpose.highlight': 'Moyo na Dhamira Njema',
    'purpose.desc': 'Tunaamini kusafiri ni chachu ya kubadili jamii. Lengo letu kuu ni kulinda mazingira na mifumo asilia ya Tanzania kwa vizazi vijavyo huku tukihakikisha jamii za asili zinanufaika moja kwa moja.',
    'purpose.pillar1.title': 'Ulinzi wa Wanyamapori & Kuzuia Ujangili',
    'purpose.pillar1.desc': 'Tunatoa michango ya moja kwa moja kuwezesha walinzi wa vijiji na shughuli za ulinzi wa faru na tembo katika mbuga za Serengeti na Ngorongoro.',
    'purpose.pillar1.stat': 'Asilimia 5 ya Mapato Hurejeshwa',
    'purpose.pillar2.title': 'Kuwezesha Jamii za Kitanzania',
    'purpose.pillar2.desc': 'Zaidi ya asilimia 85 ya waongoza watalii, madereva na wahudumu wetu ni wazawa kutoka Arusha, Moshi na vijiji vya Wamaasai na Wachagga.',
    'purpose.pillar2.stat': '85%+ Watanzania Wazawa',
    'purpose.pillar3.title': 'Safari Endelevu Bila Taka za Plastiki',
    'purpose.pillar3.desc': 'Kambi zetu za mbugani zinatumia umeme wa jua. Kila mgeni hupewa chupa ya chuma isiyo na kutu ili kumaliza matumizi ya plastiki ya mara moja.',
    'purpose.pillar3.stat': '100% Hakuna Plastiki',
    'purpose.stat.community': 'Uwekezaji wa Moja kwa Moja Jamiyani',
    'purpose.stat.communityDesc': 'Ujenzi wa madarasa ya shule za msingi na visima vya maji safi mkoani Arusha.',
    'purpose.stat.eco': 'Mazingira Salama ya Safari',
    'purpose.stat.ecoDesc': 'Chupa za kudumu na kambi za hema zinazotumia nishati ya jua.',
    'purpose.badge.serengeti': 'Ulinzi wa Serengeti',
    'purpose.badge.heritage': 'Urithi wa Maasai & Chagga',

    // Footer & Legal
    'footer.privacy': 'Sera ya Faragha',
    'footer.terms': 'Masharti na Vigezo vya Huduma',
    'footer.copyright': '© 2026 Embuat Safaris. Gundua • Furahia • Hifadhi. Kampuni ya Kitanzania.',
    'footer.ttb': 'Leseni Halali ya TTB',
    'footer.atoi': 'Mwanachama wa ATOI',
    'footer.quickLinks': 'Angalia Safari Zetu',
    'footer.circuits': 'Hifadhi na Maeneo Maarufu',
    'footer.aboutDesc': 'Kampuni rasmi ya utalii yenye makao makuu Arusha, Tanzania. Wataalamu wa safari za Kilimanjaro, wanyamapori Serengeti, na likizo ya ufukwe Zanzibar.',

    // Common UI
    'ui.verifiedPackages': 'vifurushi vilivyothibitishwa',
    'ui.viewItinerary': 'Tazama Ratiba Kamili',
    'ui.days': 'Siku',
    'ui.person': 'mtu',
    'ui.from': 'Kuanzia',
    'ui.bookNow': 'Agiza Safari Hii',
    'ui.customItinerary': 'Omba Mpangilio Maalum',
    'ui.switchLanguage': 'Chagua Lugha'
  }
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  currentLanguageInfo: LanguageInfo;
  t: (key: string) => string;
  supportedLanguages: LanguageInfo[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'embuat_safaris_lang';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (saved === 'en' || saved === 'fr' || saved === 'de' || saved === 'it' || saved === 'es' || saved === 'sw')) {
        return saved as LanguageCode;
      }
    } catch {
      // Ignore localStorage exceptions
    }
    return 'en';
  });

  const setLanguage = (code: LanguageCode) => {
    setLanguageState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
      document.documentElement.lang = code;
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    try {
      document.documentElement.lang = language;
    } catch {
      // Ignore
    }
  }, [language]);

  const currentLanguageInfo = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  const t = (key: string): string => {
    const langDict = TRANSLATIONS[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English
    return TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      currentLanguageInfo,
      t,
      supportedLanguages: SUPPORTED_LANGUAGES
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;

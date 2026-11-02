import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { tourService } from './tourService';

export type ArchiveCategory =
  | 'Safari & Wildlife'
  | 'Ndutu & Migration'
  | 'Kilimanjaro & Trekking'
  | 'Zanzibar & Coast'
  | 'Cultural & Day Trips'
  | 'Lodges & 4x4 Fleet';

export interface ArchiveImageItem {
  id: string;
  /** Clear human-readable name describing which tour activity this photo is for */
  title: string;
  /** Activity / National Park tag (e.g., "Serengeti", "Tarangire", "Ndutu Calving", "Mikumi") */
  activityTag: string;
  category: ArchiveCategory;
  url: string;
  /** Optional list of tour_packages IDs linked to this archive photo */
  linkedTourIds?: string[];
  createdAt: string;
  updatedAt?: string;
}

export const ARCHIVE_CATEGORIES: ArchiveCategory[] = [
  'Safari & Wildlife',
  'Ndutu & Migration',
  'Kilimanjaro & Trekking',
  'Zanzibar & Coast',
  'Cultural & Day Trips',
  'Lodges & 4x4 Fleet',
];

export const DEFAULT_IMAGE_ARCHIVE: ArchiveImageItem[] = [
  // ─── USER ADDED NAMED ARCHIVE ITEMS ───
  {
    id: 'arch-user-ngorongoro-safari',
    title: 'Ngorongoro Safari',
    activityTag: 'Ngorongoro Safari',
    category: 'Safari & Wildlife',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHAPlBrb9Sd3yCE_p2k1F7q5jDzRFPK5ayAyTPYDciDw&s=10',
    createdAt: '2026-11-02T23:49:00Z',
  },
  {
    id: 'arch-user-home-hero',
    title: 'Homepage Hero Safari',
    activityTag: 'Homepage Hero Section',
    category: 'Safari & Wildlife',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKHXQKGdI6WLNc4tELhoueIa-d6AMNk3qRk6Fxb_mfjA&s=10',
    createdAt: '2026-11-02T23:44:00Z',
  },
  {
    id: 'arch-user-tarangire',
    title: 'Tarangire',
    activityTag: 'Tarangire National Park',
    category: 'Safari & Wildlife',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs5kw0jiyOlZ49Cp7foy0GJOPq9yZ_bTKL-mcHY21aMA&s=10',
    createdAt: '2026-11-02T22:16:05Z',
  },
  {
    id: 'arch-user-serengeti',
    title: 'Serengeti',
    activityTag: 'Serengeti National Park',
    category: 'Safari & Wildlife',
    url: 'https://s3.amazonaws.com/cdn.micato.com/wp-content/uploads/2018/09/07230312/serengeti-national-park-1.jpg',
    createdAt: '2026-11-02T22:16:04Z',
  },
  {
    id: 'arch-user-ngorongoro-crater',
    title: 'Ngorongoro Crater',
    activityTag: 'Ngorongoro Conservation Area',
    category: 'Safari & Wildlife',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5_popDs9g8bulHkjq9s6dsn7JpS09tUtTjR-zg6MO1Q&s=10',
    createdAt: '2026-11-02T22:16:03Z',
  },
  {
    id: 'arch-user-matemwe',
    title: 'Matemwe',
    activityTag: 'Matemwe Beach, Zanzibar',
    category: 'Zanzibar & Coast',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Qdwfff1ewLy565S8KjOdKCnmg9m2hjlJUs3745JjgQ&s=10',
    createdAt: '2026-11-02T22:16:02Z',
  },
  {
    id: 'arch-user-kendwa',
    title: 'Kendwa',
    activityTag: 'Kendwa Beach, Zanzibar',
    category: 'Zanzibar & Coast',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaK7oxq4W3jg0vnjftMCkkcAn7MHekUqUu9L4rP5rBKA&s=10',
    createdAt: '2026-11-02T22:16:01Z',
  },
  {
    id: 'arch-user-mnrt',
    title: 'MNRT',
    activityTag: 'MNRT (Ministry of Natural Resources & Tourism)',
    category: 'Lodges & 4x4 Fleet',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr_aCg02Uvas3E6Ld8QpaC4ZVBpgBhlWbaz6HdFsvHoQ&s=10',
    createdAt: '2026-11-02T21:58:00Z',
  },
  {
    id: 'arch-user-machame-route',
    title: 'Machame Route',
    activityTag: 'Kilimanjaro Machame Route',
    category: 'Kilimanjaro & Trekking',
    url: 'https://inspiretanzaniasafaris.com/uploads/trekking_routes/d7e919cc2dbf4564.jpg',
    createdAt: '2026-11-02T22:05:00Z',
  },

  // ─── SAFARI & WILDLIFE (SERENGETI, NGORONGORO, TARANGIRE, MIKUMI, NYERERE) ───
  {
    id: 'arch-ngorongoro-lion-crater',
    title: 'Ngorongoro Crater — Lion Pride on Crater Floor',
    activityTag: 'Ngorongoro Crater Safari',
    category: 'Safari & Wildlife',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/LION-IN-NGORONGORO-1-1.jpeg',
    createdAt: '2026-11-02T10:00:00Z',
  },
  {
    id: 'arch-ngorongoro-lions-tripadvisor',
    title: 'Ngorongoro Crater — Lions Spotting Game Drive',
    activityTag: 'Ngorongoro & Ndutu 4-Day Safari',
    category: 'Safari & Wildlife',
    url: 'https://media-cdn.tripadvisor.com/media/photo-o/1c/4e/80/46/did-you-miss-to-see-lions.jpg',
    createdAt: '2026-11-02T10:01:00Z',
  },
  {
    id: 'arch-ngorongoro-crater-floor-view',
    title: 'Ngorongoro Crater — Panoramic Caldera & Wildlife',
    activityTag: '5-Day Serengeti & Ngorongoro Fly-In',
    category: 'Safari & Wildlife',
    url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/4e/73/81/ngorongoro-crater-is.jpg?w=1400&h=900&s=1',
    createdAt: '2026-11-02T10:02:00Z',
  },
  {
    id: 'arch-ngorongoro-wildlife-home',
    title: 'Ngorongoro Conservation Area — Crater Wildlife Sanctuary',
    activityTag: '6-Day Luxury Ndutu & Ngorongoro',
    category: 'Safari & Wildlife',
    url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/4e/76/ec/ngorongoro-crater-home.jpg?w=1400&h=900&s=1',
    createdAt: '2026-11-02T10:03:00Z',
  },
  {
    id: 'arch-ngorongoro-flamingos-magadi',
    title: 'Ngorongoro Lake Magadi — Flamingos & Soda Lake',
    activityTag: 'Ngorongoro Crater Day Tour',
    category: 'Safari & Wildlife',
    url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/4e/86/8d/flamingos-at-lake-magadi.jpg?w=1400&h=900&s=1',
    createdAt: '2026-11-02T10:04:00Z',
  },
  {
    id: 'arch-tarangire-elephants-baobab',
    title: 'Tarangire National Park — Elephant Herd & Ancient Baobabs',
    activityTag: 'Tarangire Wildlife Safari',
    category: 'Safari & Wildlife',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/07/elep.jpg',
    createdAt: '2026-11-02T10:05:00Z',
  },
  {
    id: 'arch-tarangire-savannah-view',
    title: 'Tarangire National Park — Fly-In Tarangire & Ngorongoro',
    activityTag: '2-Day Fly-In Tarangire & Ngorongoro',
    category: 'Safari & Wildlife',
    url: 'https://media-cdn.tripadvisor.com/media/photo-o/13/3d/07/6d/20180609-162455-01-largejpg.jpg',
    createdAt: '2026-11-02T10:06:00Z',
  },
  {
    id: 'arch-tarangire-iconic-wildlife',
    title: 'Tarangire National Park — Iconic Baobab & Wildlife Plains',
    activityTag: '4-Day Tarangire, Serengeti & Ngorongoro',
    category: 'Safari & Wildlife',
    url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/34/f5/09/a0/one-of-the-most-iconic.jpg?w=1400&h=900&s=1',
    createdAt: '2026-11-02T10:07:00Z',
  },
  {
    id: 'arch-serengeti-giraffes-acacia',
    title: 'Serengeti National Park — Giraffes & Acacia Trees',
    activityTag: 'Serengeti Classic Safari',
    category: 'Safari & Wildlife',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/07/giraffe.jpg',
    createdAt: '2026-11-02T10:08:00Z',
  },
  {
    id: 'arch-serengeti-fly-in-3d',
    title: 'Serengeti National Park — 3-Day Fly-In Safari Plains',
    activityTag: '3-Day Fly-In Serengeti from Zanzibar',
    category: 'Safari & Wildlife',
    url: 'https://media-cdn.tripadvisor.com/media/photo-o/23/4d/e4/8f/serengeti-national-park.jpg',
    createdAt: '2026-11-02T10:09:00Z',
  },
  {
    id: 'arch-seronera-valley-safari',
    title: 'Central Serengeti (Seronera) — 4-Day Luxury Fly-In Safari',
    activityTag: '4-Day Fly-In Luxury Serengeti & Ngorongoro',
    category: 'Safari & Wildlife',
    url: 'https://media-cdn.tripadvisor.com/media/photo-o/06/b4/80/99/serengeti.jpg',
    createdAt: '2026-11-02T10:10:00Z',
  },
  {
    id: 'arch-serengeti-elephants-bush',
    title: 'Serengeti & Tarangire — Bull Elephant in the Bush',
    activityTag: '5-Day Tarangire, Serengeti & Ngorongoro',
    category: 'Safari & Wildlife',
    url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/19/bd/d5/serengeti-elephant-breakin.jpg?w=1400&h=900&s=1',
    createdAt: '2026-11-02T10:11:00Z',
  },
  {
    id: 'arch-serengeti-hippo-pool',
    title: 'Serengeti Retima Hippo Pool — Hippos & Crocodiles',
    activityTag: 'Serengeti River & Hippo Pool Safari',
    category: 'Safari & Wildlife',
    url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/04/6e/a2/serengeti-hippo-pool.jpg?w=1400&h=900&s=1',
    createdAt: '2026-11-02T10:12:00Z',
  },
  {
    id: 'arch-mikumi-2d-safari',
    title: 'Mikumi National Park — 2-Day Wildlife Safari from Dar es Salaam',
    activityTag: '2-Day Mikumi National Park Safari',
    category: 'Safari & Wildlife',
    url: 'https://media-cdn.tripadvisor.com/media/photo-o/1b/79/5c/ca/caption.jpg',
    createdAt: '2026-11-02T10:13:00Z',
  },
  {
    id: 'arch-mikumi-3d-floodplain',
    title: 'Mikumi National Park — 3-Day Mkata Floodplain Game Drive',
    activityTag: '3-Day Mikumi National Park Safari',
    category: 'Safari & Wildlife',
    url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/c9/4c/1f/one-day-safari-in-tanzania.jpg?w=1400&h=900&s=1',
    createdAt: '2026-11-02T10:14:00Z',
  },
  {
    id: 'arch-nyerere-fly-in-2d',
    title: 'Nyerere National Park (Selous) — 2-Day Fly-In Rufiji Safari',
    activityTag: '2-Day Nyerere Fly-In from Zanzibar',
    category: 'Safari & Wildlife',
    url: 'https://media-cdn.tripadvisor.com/media/photo-o/2e/9b/d9/14/caption.jpg',
    createdAt: '2026-11-02T10:15:00Z',
  },
  {
    id: 'arch-nyerere-3d-wildlife',
    title: 'Nyerere National Park (Selous) — 3-Day Boat & 4x4 Game Safari',
    activityTag: '3-Day Nyerere Safari from Dar es Salaam',
    category: 'Safari & Wildlife',
    url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/91/55/00/nyerere-np-agosto-2024.jpg?w=1400&h=900&s=1',
    createdAt: '2026-11-02T10:16:00Z',
  },

  // ─── NDUTU CALVING & GREAT MIGRATION ───
  {
    id: 'arch-ndutu-calving-3d',
    title: 'Ndutu Calving Season — Predators Hunting on Lake Ndutu Plains',
    activityTag: '3-Day Ndutu Calving Season Safari',
    category: 'Ndutu & Migration',
    url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/47/c7/58/hunting-preparation-lake.jpg?w=1400&h=900&s=1',
    createdAt: '2026-11-02T10:17:00Z',
  },
  {
    id: 'arch-great-migration-5d',
    title: 'Serengeti Great Migration — 5-Day Wildebeest & Zebra Herds',
    activityTag: '5-Day Great Migration Safari',
    category: 'Ndutu & Migration',
    url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/35/00/3f/32/some-of-the-wild-animals.jpg?w=1400&h=900&s=1',
    createdAt: '2026-11-02T10:18:00Z',
  },
  {
    id: 'arch-ndutu-calving-5d',
    title: 'Ndutu Calving Season — 5-Day Southern Serengeti & Ngorongoro',
    activityTag: '5-Day Ndutu Calving Season Safari',
    category: 'Ndutu & Migration',
    url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/35/00/3f/34/some-of-the-wild-animals.jpg?w=1400&h=900&s=1',
    createdAt: '2026-11-02T10:19:00Z',
  },
  {
    id: 'arch-ndutu-calving-6d',
    title: 'Ndutu Calving Season — 6-Day Predator & Wildebeest Expedition',
    activityTag: '6-Day Ndutu Calving Season Safari',
    category: 'Ndutu & Migration',
    url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/47/c7/54/hunting-preparation-lake.jpg?w=1400&h=900&s=1',
    createdAt: '2026-11-02T10:20:00Z',
  },

  // ─── KILIMANJARO & TREKKING ───
  {
    id: 'arch-kili-uhuru-peak',
    title: 'Mount Kilimanjaro — Snowy Uhuru Peak Summit (5,895m)',
    activityTag: 'Kilimanjaro Summit Climb',
    category: 'Kilimanjaro & Trekking',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/Mount-kilimanjaro.jpg',
    createdAt: '2026-11-02T10:21:00Z',
  },
  {
    id: 'arch-kili-machame-7d',
    title: 'Kilimanjaro Machame Route — 7-Day Whiskey Route Expedition',
    activityTag: 'Machame Route Trekking',
    category: 'Kilimanjaro & Trekking',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/7-days-machame-q7uhx4dl11xrr3ao020xabzqzwvm9oxm4gn0ke87mo.jpg',
    createdAt: '2026-11-02T10:22:00Z',
  },
  {
    id: 'arch-kili-lemosho-8d',
    title: 'Kilimanjaro Lemosho Route — Scenic Glades & Moorland',
    activityTag: 'Lemosho Route Trekking',
    category: 'Kilimanjaro & Trekking',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/trekking-q6cddz690ts9x5xr22ez97y2b983qsmrgbyr3k3jq8.jpeg',
    createdAt: '2026-11-02T10:23:00Z',
  },
  {
    id: 'arch-kili-marangu-6d',
    title: 'Kilimanjaro Marangu Route — 6-Day Hut Accommodation Trail',
    activityTag: 'Marangu Route Trekking',
    category: 'Kilimanjaro & Trekking',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/marangu-6-days1-q7up38u1t7ag04cuqmqp072nn4ma1fo0y216xvi6xs.jpg',
    createdAt: '2026-11-02T10:24:00Z',
  },
  {
    id: 'arch-kili-rongai-7d',
    title: 'Kilimanjaro Rongai Route — 7-Day Northern Slope Wilderness',
    activityTag: 'Rongai Route Trekking',
    category: 'Kilimanjaro & Trekking',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/rongai-7-days-q7urww3qv8fpi2pk72hb51o485m7f472l5qg82sk2o.jpg',
    createdAt: '2026-11-02T10:25:00Z',
  },
  {
    id: 'arch-ol-doinyo-lengai',
    title: 'Mount Ol Doinyo Lengai — Active Volcano Trekking',
    activityTag: 'Lake Natron & Ol Doinyo Lengai',
    category: 'Kilimanjaro & Trekking',
    url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/35/17/eb/8b/mount-ol-doinyo-lengai.jpg?w=1400&h=900&s=1',
    createdAt: '2026-11-02T10:26:00Z',
  },

  // ─── ZANZIBAR & COAST ───
  {
    id: 'arch-zanzibar-beach-view',
    title: 'Zanzibar — Turquoise Indian Ocean & White Sand Beach',
    activityTag: 'Zanzibar Beach Holiday',
    category: 'Zanzibar & Coast',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/zanzibar-beach-view-1024x576.jpg',
    createdAt: '2026-11-02T10:27:00Z',
  },
  {
    id: 'arch-zanzibar-prison-island',
    title: 'Zanzibar — Prison Island & Spice Island Dhow Excursion',
    activityTag: '3-Day Zanzibar & Prison Island',
    category: 'Zanzibar & Coast',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/zanzibar-island-1024x683.jpg',
    createdAt: '2026-11-02T10:28:00Z',
  },
  {
    id: 'arch-zanzibar-jozani-forest',
    title: 'Zanzibar — Jozani Red Colobus Monkey Sanctuary',
    activityTag: '4-Day Zanzibar & Jozani Forest',
    category: 'Zanzibar & Coast',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/photo0jpg-1024x768.jpg',
    createdAt: '2026-11-02T10:29:00Z',
  },

  // ─── CULTURAL & DAY TRIPS ───
  {
    id: 'arch-marangu-waterfalls-day',
    title: 'Marangu Foothills — Rainforest Waterfall & Coffee Day Trip',
    activityTag: 'Marangu Waterfalls Day Trip',
    category: 'Cultural & Day Trips',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/MARANGU-WF-COVER.jpg',
    createdAt: '2026-11-02T10:30:00Z',
  },
  {
    id: 'arch-maasai-boma-cultural',
    title: 'Traditional Maasai Boma — Monduli Juu Cultural Immersion',
    activityTag: 'Maasai Village Cultural Visit',
    category: 'Cultural & Day Trips',
    url: 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/maasai-boma1-quj0eomliq423umh5979wbutmmzg0963hchobwsin0.jpg',
    createdAt: '2026-11-02T10:31:00Z',
  },
  {
    id: 'arch-hadzabe-lake-eyasi',
    title: 'Lake Eyasi — Hadzabe Bushmen & Datoga Tribe Visit',
    activityTag: 'Hadzabe Cultural Expedition',
    category: 'Cultural & Day Trips',
    url: '/images/hadzabe-cultural-visit.jpg',
    createdAt: '2026-11-02T10:32:00Z',
  },
  {
    id: 'arch-mount-meru-waterfall',
    title: 'Mount Meru Waterfalls — Arusha Foothills Nature Hike',
    activityTag: 'Mount Meru Waterfall Day Hike',
    category: 'Cultural & Day Trips',
    url: 'https://media-cdn.tripadvisor.com/media/photo-o/13/d0/7f/91/mount-meru-waterfalls.jpg',
    createdAt: '2026-11-02T10:33:00Z',
  },

  // ─── LODGES & 4X4 FLEET ───
  {
    id: 'arch-safari-cruiser-4x4',
    title: 'Extended 4x4 Safari Land Cruiser — Pop-Up Roof Game Drive',
    activityTag: 'Private 4x4 Safari Fleet',
    category: 'Lodges & 4x4 Fleet',
    url: 'https://media-cdn.tripadvisor.com/media/photo-o/1a/7a/6c/71/cover-photo-augustine.jpg',
    createdAt: '2026-11-02T10:34:00Z',
  },
  {
    id: 'arch-bush-picnic-safari',
    title: 'Savannah Bush Picnic — Private Safari Lunch in the Park',
    activityTag: 'Luxury Bush Dining Experience',
    category: 'Lodges & 4x4 Fleet',
    url: 'https://media-cdn.tripadvisor.com/media/photo-o/21/9b/1f/47/clients-enjoying-a-picnic.jpg',
    createdAt: '2026-11-02T10:35:00Z',
  },
];

const STORAGE_KEY = 'embuat_image_archive_v1';
const LOCAL_ARCHIVE_EDITS_KEY = 'embuat_image_archive_edits_v1';
const ARCHIVE_EVENT = 'embuat_image_archive_updated';
const REMOTE_KEY = 'image_archive';

function mapArchiveToDbRow(item: ArchiveImageItem) {
  return {
    id: item.id,
    title: item.title,
    activity_tag: item.activityTag,
    category: item.category,
    url: item.url,
    linked_tour_ids: item.linkedTourIds ?? [],
    created_at: item.createdAt || new Date().toISOString(),
    updated_at: item.updatedAt || new Date().toISOString(),
  };
}

function mapDbRowToArchive(row: Record<string, any>): ArchiveImageItem {
  return {
    id: String(row.id),
    title: String(row.title || ''),
    activityTag: String(row.activity_tag || row.title || ''),
    category: (row.category as ArchiveCategory) || 'Safari & Wildlife',
    url: String(row.url || ''),
    linkedTourIds: Array.isArray(row.linked_tour_ids) ? row.linked_tour_ids : [],
    createdAt: String(row.created_at || new Date().toISOString()),
    updatedAt: row.updated_at ? String(row.updated_at) : undefined,
  };
}

const getLocalArchiveEdits = (): Record<string, ArchiveImageItem> => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(LOCAL_ARCHIVE_EDITS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, ArchiveImageItem>) : {};
  } catch {
    return {};
  }
};

const saveLocalArchiveEdit = (item: ArchiveImageItem): void => {
  if (typeof window === 'undefined') return;
  try {
    const edits = getLocalArchiveEdits();
    edits[item.id] = item;
    localStorage.setItem(LOCAL_ARCHIVE_EDITS_KEY, JSON.stringify(edits));
  } catch {
    // ignore quota error
  }
};

const removeLocalArchiveEdit = (id: string): void => {
  if (typeof window === 'undefined') return;
  try {
    const edits = getLocalArchiveEdits();
    if (edits[id]) {
      delete edits[id];
      localStorage.setItem(LOCAL_ARCHIVE_EDITS_KEY, JSON.stringify(edits));
    }
  } catch {
    // ignore
  }
};

const readStorage = (): ArchiveImageItem[] => {
  if (typeof window === 'undefined') return DEFAULT_IMAGE_ARCHIVE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_IMAGE_ARCHIVE;
    const parsed = JSON.parse(raw) as ArchiveImageItem[];
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_IMAGE_ARCHIVE;
    const edits = getLocalArchiveEdits();
    // Keep code-defined user items ('arch-user-*') synced with latest URL/title unless edited by user
    const userDefaults = DEFAULT_IMAGE_ARCHIVE.filter((d) => d.id.startsWith('arch-user-')).map(
      (d) => edits[d.id] || d
    );
    const userDefaultIds = new Set(userDefaults.map((d) => d.id));
    const filteredParsed = parsed
      .filter((i) => !userDefaultIds.has(i.id))
      .map((i) => edits[i.id] || i);
    const existingIds = new Set([...userDefaultIds, ...filteredParsed.map((i) => i.id)]);
    const missingDefaults = DEFAULT_IMAGE_ARCHIVE.filter((d) => !existingIds.has(d.id));
    return [...userDefaults, ...filteredParsed, ...missingDefaults];
  } catch {
    return DEFAULT_IMAGE_ARCHIVE;
  }
};

export const imageArchiveService = {
  getAll(): ArchiveImageItem[] {
    return readStorage();
  },

  saveAll(items: ArchiveImageItem[]): boolean {
    let ok = true;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      ok = false;
    }
    if (isSupabaseConfigured) {
      // 1. Sync to dedicated public.image_archive table
      void supabase
        .from('image_archive')
        .upsert(items.map(mapArchiveToDbRow), { onConflict: 'id' });
      // 2. Also mirror to site_settings for backwards compatibility
      void supabase
        .from('site_settings')
        .upsert(
          { key: REMOTE_KEY, value: items, updated_at: new Date().toISOString() },
          { onConflict: 'key' }
        );
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(ARCHIVE_EVENT, { detail: items }));
    }
    return ok;
  },

  addItem(item: Omit<ArchiveImageItem, 'id' | 'createdAt'> & { id?: string }): ArchiveImageItem {
    const current = this.getAll();
    const now = new Date().toISOString();
    const newItem: ArchiveImageItem = {
      id: item.id || `arch-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title: item.title.trim(),
      activityTag: item.activityTag.trim() || item.category,
      category: item.category,
      url: item.url.trim(),
      linkedTourIds: item.linkedTourIds || [],
      createdAt: now,
      updatedAt: now,
    };
    saveLocalArchiveEdit(newItem);
    const next = [newItem, ...current.filter((i) => i.id !== newItem.id)];
    this.saveAll(next);
    if (isSupabaseConfigured) {
      void supabase.from('image_archive').upsert(mapArchiveToDbRow(newItem), { onConflict: 'id' });
    }
    return newItem;
  },

  addBulk(
    entries: { title: string; url: string; activityTag?: string; category?: ArchiveCategory }[]
  ): number {
    const current = this.getAll();
    const now = new Date().toISOString();
    const added: ArchiveImageItem[] = entries
      .filter((e) => e.title.trim() && e.url.trim())
      .map((e, idx) => {
        const created: ArchiveImageItem = {
          id: `arch-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 5)}`,
          title: e.title.trim(),
          activityTag: (e.activityTag || e.title).trim(),
          category: e.category || 'Safari & Wildlife',
          url: e.url.trim(),
          linkedTourIds: [],
          createdAt: now,
          updatedAt: now,
        };
        saveLocalArchiveEdit(created);
        return created;
      });
    if (added.length > 0) {
      this.saveAll([...added, ...current]);
    }
    return added.length;
  },

  /**
   * Updates an archive image item and automatically updates any Website Tour Package
   * that uses this archive image's URL or is linked to this archive item!
   */
  updateItem(id: string, patch: Partial<Omit<ArchiveImageItem, 'id'>>): { updatedPackagesCount: number } {
    const current = this.getAll();
    const target = current.find((item) => item.id === id);
    const oldUrl = target?.url || '';
    const now = new Date().toISOString();

    let updatedItem: ArchiveImageItem | null = null;
    const next = current.map((item) => {
      if (item.id === id) {
        updatedItem = {
          ...item,
          ...patch,
          updatedAt: now,
        };
        return updatedItem;
      }
      return item;
    });

    if (updatedItem) {
      saveLocalArchiveEdit(updatedItem);
      if (isSupabaseConfigured) {
        void supabase
          .from('image_archive')
          .upsert(mapArchiveToDbRow(updatedItem), { onConflict: 'id' });
      }
    }

    this.saveAll(next);

    // Automatically propagate URL changes to any Website Package using this archive photo
    let updatedPackagesCount = 0;
    if (updatedItem && (updatedItem as ArchiveImageItem).url) {
      const finalItem = updatedItem as ArchiveImageItem;
      if (oldUrl !== finalItem.url || (finalItem.linkedTourIds && finalItem.linkedTourIds.length > 0)) {
        updatedPackagesCount = tourService.updateToursByImageUrl(
          oldUrl,
          finalItem.url,
          finalItem.linkedTourIds || []
        );
      }
    }

    return { updatedPackagesCount };
  },

  /**
   * Assigns an archive image to a Website Tour Package, updating both `tour_packages`
   * and recording the link in `image_archive` in Supabase.
   */
  assignToTour(archiveId: string, tourId: string): void {
    const current = this.getAll();
    const photo = current.find((i) => i.id === archiveId);
    const tour = tourService.getTourById(tourId);
    if (!photo || !tour) return;

    // 1. Update the website tour package immediately (local + Supabase tour_packages)
    tourService.updateTour(tour.id, {
      image: photo.url,
      coverImage: photo.url,
    });

    // 2. Record the linked tour ID on the archive photo
    const existingLinks = new Set(photo.linkedTourIds || []);
    existingLinks.add(tour.id);
    const updatedPhoto: ArchiveImageItem = {
      ...photo,
      linkedTourIds: Array.from(existingLinks),
      updatedAt: new Date().toISOString(),
    };
    saveLocalArchiveEdit(updatedPhoto);

    const next = current.map((item) => (item.id === archiveId ? updatedPhoto : item));
    this.saveAll(next);
  },

  deleteItem(id: string): void {
    const current = this.getAll();
    removeLocalArchiveEdit(id);
    const next = current.filter((item) => item.id !== id);
    this.saveAll(next);
    if (isSupabaseConfigured) {
      void supabase.from('image_archive').delete().eq('id', id);
    }
  },

  resetToDefaults(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LOCAL_ARCHIVE_EDITS_KEY);
    }
    this.saveAll(DEFAULT_IMAGE_ARCHIVE);
  },

  /**
   * Pushes all Image Archive items and all Website Tour Packages to Supabase.
   */
  async syncArchiveAndPackagesToSupabase(): Promise<{
    success: boolean;
    archiveCount: number;
    packagesCount: number;
    error?: string;
  }> {
    if (!isSupabaseConfigured) {
      return {
        success: false,
        archiveCount: 0,
        packagesCount: 0,
        error: 'Supabase is not configured.',
      };
    }

    const items = this.getAll();
    // 1. Sync image_archive table
    const { error: archError } = await supabase
      .from('image_archive')
      .upsert(items.map(mapArchiveToDbRow), { onConflict: 'id' });

    // Also mirror to site_settings
    await supabase
      .from('site_settings')
      .upsert(
        { key: REMOTE_KEY, value: items, updated_at: new Date().toISOString() },
        { onConflict: 'key' }
      );

    // 2. Sync all tour_packages
    const pkgSync = await tourService.syncAllToursToSupabase();

    if (archError && !pkgSync.success) {
      return {
        success: false,
        archiveCount: items.length,
        packagesCount: pkgSync.count,
        error: archError.message || pkgSync.error,
      };
    }

    return {
      success: true,
      archiveCount: items.length,
      packagesCount: pkgSync.count,
      error: archError ? `Note: Run the SQL migration to create public.image_archive (${archError.message})` : pkgSync.error,
    };
  },

  async hydrateFromRemote(): Promise<void> {
    if (!isSupabaseConfigured) return;
    try {
      const edits = getLocalArchiveEdits();

      // 1. Try dedicated public.image_archive table first
      const { data: tableData, error: tableError } = await supabase
        .from('image_archive')
        .select('*')
        .order('created_at', { ascending: false });

      let remoteItems: ArchiveImageItem[] | null = null;
      if (!tableError && Array.isArray(tableData) && tableData.length > 0) {
        remoteItems = tableData.map(mapDbRowToArchive);
      } else {
        // 2. Fallback to site_settings
        const { data, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', REMOTE_KEY)
          .maybeSingle();
        if (!error && Array.isArray(data?.value) && data.value.length > 0) {
          remoteItems = data.value as ArchiveImageItem[];
        }
      }

      if (remoteItems && remoteItems.length > 0) {
        const userDefaults = DEFAULT_IMAGE_ARCHIVE.filter((d) => d.id.startsWith('arch-user-')).map(
          (d) => edits[d.id] || d
        );
        const userDefaultIds = new Set(userDefaults.map((d) => d.id));
        const filteredRemote = remoteItems
          .filter((i) => !userDefaultIds.has(i.id))
          .map((i) => edits[i.id] || i);
        const existingIds = new Set([...userDefaultIds, ...filteredRemote.map((i) => i.id)]);
        const missingDefaults = DEFAULT_IMAGE_ARCHIVE.filter((d) => !existingIds.has(d.id));
        const merged = [...userDefaults, ...filteredRemote, ...missingDefaults];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        } catch {
          // ignore quota errors
        }
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent(ARCHIVE_EVENT, { detail: merged }));
        }
      } else {
        // Seed remote table if empty
        const current = this.getAll();
        void supabase.from('image_archive').upsert(current.map(mapArchiveToDbRow), { onConflict: 'id' });
      }
    } catch {
      // ignore network error
    }
  },
};

export const useImageArchive = (): ArchiveImageItem[] => {
  const [items, setItems] = useState<ArchiveImageItem[]>(() => imageArchiveService.getAll());

  useEffect(() => {
    void imageArchiveService.hydrateFromRemote();
    const handler = () => setItems(imageArchiveService.getAll());
    window.addEventListener(ARCHIVE_EVENT, handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener(ARCHIVE_EVENT, handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  return items;
};


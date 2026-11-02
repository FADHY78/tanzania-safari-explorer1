-- ============================================================================
-- Migration: Create public.image_archive Table & Enable Live Website Package Sync
-- Project: Tanzania Safari Explorer (unjtqownkamivgvtrjlc)
-- ============================================================================

begin;

-- 1. Create the Image Archive table in Supabase
create table if not exists public.image_archive (
  id text primary key,
  title text not null,
  activity_tag text not null default '',
  category text not null default 'Safari & Wildlife',
  url text not null,
  linked_tour_ids jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists image_archive_category_idx on public.image_archive (category);
create index if not exists image_archive_created_at_idx on public.image_archive (created_at desc);

-- 2. Create site_settings table if not exists (for global website overrides)
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- 3. Enable Row Level Security (RLS) & Grant Admin Dashboard (anon + authenticated) Write Access
alter table public.image_archive enable row level security;
alter table public.site_settings enable row level security;
alter table public.tour_packages enable row level security;
alter table public.tour_categories enable row level security;

grant select, insert, update, delete on public.image_archive to anon, authenticated;
grant select, insert, update, delete on public.site_settings to anon, authenticated;
grant select, insert, update, delete on public.tour_packages to anon, authenticated;
grant select, insert, update, delete on public.tour_categories to anon, authenticated;

-- Policies for public.image_archive
drop policy if exists "Allow public select on image_archive" on public.image_archive;
create policy "Allow public select on image_archive"
  on public.image_archive for select to anon, authenticated using (true);

drop policy if exists "Allow public insert on image_archive" on public.image_archive;
create policy "Allow public insert on image_archive"
  on public.image_archive for insert to anon, authenticated with check (true);

drop policy if exists "Allow public update on image_archive" on public.image_archive;
create policy "Allow public update on image_archive"
  on public.image_archive for update to anon, authenticated using (true) with check (true);

drop policy if exists "Allow public delete on image_archive" on public.image_archive;
create policy "Allow public delete on image_archive"
  on public.image_archive for delete to anon, authenticated using (true);

-- Policies for public.site_settings
drop policy if exists "Allow public all on site_settings" on public.site_settings;
create policy "Allow public all on site_settings"
  on public.site_settings for all to anon, authenticated using (true) with check (true);

-- Policies for public.tour_packages (Allow Admin Dashboard changes to persist directly to Website Packages)
drop policy if exists "Authenticated users can insert tour packages" on public.tour_packages;
drop policy if exists "Allow insert on tour_packages" on public.tour_packages;
create policy "Allow insert on tour_packages"
  on public.tour_packages for insert to anon, authenticated with check (true);

drop policy if exists "Authenticated users can update tour packages" on public.tour_packages;
drop policy if exists "Allow update on tour_packages" on public.tour_packages;
create policy "Allow update on tour_packages"
  on public.tour_packages for update to anon, authenticated using (true) with check (true);

drop policy if exists "Authenticated users can delete tour packages" on public.tour_packages;
drop policy if exists "Allow delete on tour_packages" on public.tour_packages;
create policy "Allow delete on tour_packages"
  on public.tour_packages for delete to anon, authenticated using (true);

-- Policies for public.tour_categories
drop policy if exists "Allow write on tour_categories" on public.tour_categories;
create policy "Allow write on tour_categories"
  on public.tour_categories for all to anon, authenticated using (true) with check (true);

-- 4. Database Trigger: Automatically update public.tour_packages when an image in public.image_archive changes
create or replace function public.sync_archive_image_to_tour_packages()
returns trigger
language plpgsql
security definer
as $$
begin
  -- If the image URL was updated, update any tour package using the old URL
  if tg_op = 'UPDATE' and old.url is distinct from new.url then
    update public.tour_packages
    set image = new.url,
        cover_image = new.url,
        hover_image = null,
        updated_at = now()
    where image = old.url
       or cover_image = old.url;
  end if;

  -- If linked_tour_ids contains package IDs, ensure those packages use new.url
  if jsonb_typeof(new.linked_tour_ids) = 'array' and jsonb_array_length(new.linked_tour_ids) > 0 then
    update public.tour_packages
    set image = new.url,
        cover_image = new.url,
        hover_image = null,
        updated_at = now()
    where id in (select jsonb_array_elements_text(new.linked_tour_ids))
      and (image is distinct from new.url or cover_image is distinct from new.url);
  end if;

  return new;
end;
$$;

drop trigger if exists trg_sync_archive_image_to_tour_packages on public.image_archive;
create trigger trg_sync_archive_image_to_tour_packages
  after insert or update on public.image_archive
  for each row
  execute function public.sync_archive_image_to_tour_packages();

-- 5. Seed Named Tour Activity Images into public.image_archive
insert into public.image_archive (id, title, activity_tag, category, url, created_at, updated_at)
values
  ('arch-user-ngorongoro-safari', 'Ngorongoro Safari', 'Ngorongoro Safari', 'Safari & Wildlife', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHAPlBrb9Sd3yCE_p2k1F7q5jDzRFPK5ayAyTPYDciDw&s=10', '2026-11-02T23:49:00Z', now()),
  ('arch-user-tarangire', 'Tarangire', 'Tarangire National Park', 'Safari & Wildlife', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs5kw0jiyOlZ49Cp7foy0GJOPq9yZ_bTKL-mcHY21aMA&s=10', '2026-11-02T22:16:05Z', now()),
  ('arch-user-serengeti', 'Serengeti', 'Serengeti National Park', 'Safari & Wildlife', 'https://s3.amazonaws.com/cdn.micato.com/wp-content/uploads/2018/09/07230312/serengeti-national-park-1.jpg', '2026-11-02T22:16:04Z', now()),
  ('arch-user-ngorongoro-crater', 'Ngorongoro Crater', 'Ngorongoro Conservation Area', 'Safari & Wildlife', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5_popDs9g8bulHkjq9s6dsn7JpS09tUtTjR-zg6MO1Q&s=10', '2026-11-02T22:16:03Z', now()),
  ('arch-user-matemwe', 'Matemwe', 'Matemwe Beach, Zanzibar', 'Zanzibar & Coast', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Qdwfff1ewLy565S8KjOdKCnmg9m2hjlJUs3745JjgQ&s=10', '2026-11-02T22:16:02Z', now()),
  ('arch-user-kendwa', 'Kendwa', 'Kendwa Beach, Zanzibar', 'Zanzibar & Coast', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaK7oxq4W3jg0vnjftMCkkcAn7MHekUqUu9L4rP5rBKA&s=10', '2026-11-02T22:16:01Z', now()),
  ('arch-user-mnrt', 'MNRT', 'MNRT (Ministry of Natural Resources & Tourism)', 'Lodges & 4x4 Fleet', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr_aCg02Uvas3E6Ld8QpaC4ZVBpgBhlWbaz6HdFsvHoQ&s=10', '2026-11-02T21:58:00Z', now()),
  ('arch-user-machame-route', 'Machame Route', 'Kilimanjaro Machame Route', 'Kilimanjaro & Trekking', 'https://inspiretanzaniasafaris.com/uploads/trekking_routes/d7e919cc2dbf4564.jpg', '2026-11-02T22:05:00Z', now()),
  ('arch-ngorongoro-lion-crater', 'Ngorongoro Crater — Lion Pride on Crater Floor', 'Ngorongoro Crater Safari', 'Safari & Wildlife', 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/LION-IN-NGORONGORO-1-1.jpeg', '2026-11-02T10:00:00Z', now()),
  ('arch-ngorongoro-lions-tripadvisor', 'Ngorongoro Crater — Lions Spotting Game Drive', 'Ngorongoro & Ndutu 4-Day Safari', 'Safari & Wildlife', 'https://media-cdn.tripadvisor.com/media/photo-o/1c/4e/80/46/did-you-miss-to-see-lions.jpg', '2026-11-02T10:01:00Z', now()),
  ('arch-ngorongoro-crater-floor-view', 'Ngorongoro Crater — Panoramic Caldera & Wildlife', '5-Day Serengeti & Ngorongoro Fly-In', 'Safari & Wildlife', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/4e/73/81/ngorongoro-crater-is.jpg?w=1400&h=900&s=1', '2026-11-02T10:02:00Z', now()),
  ('arch-ngorongoro-wildlife-home', 'Ngorongoro Conservation Area — Crater Wildlife Sanctuary', '6-Day Luxury Ndutu & Ngorongoro', 'Safari & Wildlife', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/4e/76/ec/ngorongoro-crater-home.jpg?w=1400&h=900&s=1', '2026-11-02T10:03:00Z', now()),
  ('arch-ngorongoro-flamingos-magadi', 'Ngorongoro Lake Magadi — Flamingos & Soda Lake', 'Ngorongoro Crater Day Tour', 'Safari & Wildlife', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/4e/86/8d/flamingos-at-lake-magadi.jpg?w=1400&h=900&s=1', '2026-11-02T10:04:00Z', now()),
  ('arch-tarangire-elephants-baobab', 'Tarangire National Park — Elephant Herd & Ancient Baobabs', 'Tarangire Wildlife Safari', 'Safari & Wildlife', 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/07/elep.jpg', '2026-11-02T10:05:00Z', now()),
  ('arch-tarangire-savannah-view', 'Tarangire National Park — Fly-In Tarangire & Ngorongoro', '2-Day Fly-In Tarangire & Ngorongoro', 'Safari & Wildlife', 'https://media-cdn.tripadvisor.com/media/photo-o/13/3d/07/6d/20180609-162455-01-largejpg.jpg', '2026-11-02T10:06:00Z', now()),
  ('arch-tarangire-iconic-wildlife', 'Tarangire National Park — Iconic Baobab & Wildlife Plains', '4-Day Tarangire, Serengeti & Ngorongoro', 'Safari & Wildlife', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/34/f5/09/a0/one-of-the-most-iconic.jpg?w=1400&h=900&s=1', '2026-11-02T10:07:00Z', now()),
  ('arch-serengeti-giraffes-acacia', 'Serengeti National Park — Giraffes & Acacia Trees', 'Serengeti Classic Safari', 'Safari & Wildlife', 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/07/giraffe.jpg', '2026-11-02T10:08:00Z', now()),
  ('arch-serengeti-fly-in-3d', 'Serengeti National Park — 3-Day Fly-In Safari Plains', '3-Day Fly-In Serengeti from Zanzibar', 'Safari & Wildlife', 'https://media-cdn.tripadvisor.com/media/photo-o/23/4d/e4/8f/serengeti-national-park.jpg', '2026-11-02T10:09:00Z', now()),
  ('arch-seronera-valley-safari', 'Central Serengeti (Seronera) — 4-Day Luxury Fly-In Safari', '4-Day Fly-In Luxury Serengeti & Ngorongoro', 'Safari & Wildlife', 'https://media-cdn.tripadvisor.com/media/photo-o/06/b4/80/99/serengeti.jpg', '2026-11-02T10:10:00Z', now()),
  ('arch-serengeti-elephants-bush', 'Serengeti & Tarangire — Bull Elephant in the Bush', '5-Day Tarangire, Serengeti & Ngorongoro', 'Safari & Wildlife', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/19/bd/d5/serengeti-elephant-breakin.jpg?w=1400&h=900&s=1', '2026-11-02T10:11:00Z', now()),
  ('arch-serengeti-hippo-pool', 'Serengeti Retima Hippo Pool — Hippos & Crocodiles', 'Serengeti River & Hippo Pool Safari', 'Safari & Wildlife', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/04/6e/a2/serengeti-hippo-pool.jpg?w=1400&h=900&s=1', '2026-11-02T10:12:00Z', now()),
  ('arch-mikumi-2d-safari', 'Mikumi National Park — 2-Day Wildlife Safari from Dar es Salaam', '2-Day Mikumi National Park Safari', 'Safari & Wildlife', 'https://media-cdn.tripadvisor.com/media/photo-o/1b/79/5c/ca/caption.jpg', '2026-11-02T10:13:00Z', now()),
  ('arch-mikumi-3d-floodplain', 'Mikumi National Park — 3-Day Mkata Floodplain Game Drive', '3-Day Mikumi National Park Safari', 'Safari & Wildlife', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/c9/4c/1f/one-day-safari-in-tanzania.jpg?w=1400&h=900&s=1', '2026-11-02T10:14:00Z', now()),
  ('arch-nyerere-fly-in-2d', 'Nyerere National Park (Selous) — 2-Day Fly-In Rufiji Safari', '2-Day Nyerere Fly-In from Zanzibar', 'Safari & Wildlife', 'https://media-cdn.tripadvisor.com/media/photo-o/2e/9b/d9/14/caption.jpg', '2026-11-02T10:15:00Z', now()),
  ('arch-nyerere-3d-wildlife', 'Nyerere National Park (Selous) — 3-Day Boat & 4x4 Game Safari', '3-Day Nyerere Safari from Dar es Salaam', 'Safari & Wildlife', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/91/55/00/nyerere-np-agosto-2024.jpg?w=1400&h=900&s=1', '2026-11-02T10:16:00Z', now()),
  ('arch-ndutu-calving-3d', 'Ndutu Calving Season — Predators Hunting on Lake Ndutu Plains', '3-Day Ndutu Calving Season Safari', 'Ndutu & Migration', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/47/c7/58/hunting-preparation-lake.jpg?w=1400&h=900&s=1', '2026-11-02T10:17:00Z', now()),
  ('arch-great-migration-5d', 'Serengeti Great Migration — 5-Day Wildebeest & Zebra Herds', '5-Day Great Migration Safari', 'Ndutu & Migration', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/35/00/3f/32/some-of-the-wild-animals.jpg?w=1400&h=900&s=1', '2026-11-02T10:18:00Z', now()),
  ('arch-ndutu-calving-5d', 'Ndutu Calving Season — 5-Day Southern Serengeti & Ngorongoro', '5-Day Ndutu Calving Season Safari', 'Ndutu & Migration', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/35/00/3f/34/some-of-the-wild-animals.jpg?w=1400&h=900&s=1', '2026-11-02T10:19:00Z', now()),
  ('arch-ndutu-calving-6d', 'Ndutu Calving Season — 6-Day Predator & Wildebeest Expedition', '6-Day Ndutu Calving Season Safari', 'Ndutu & Migration', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/47/c7/54/hunting-preparation-lake.jpg?w=1400&h=900&s=1', '2026-11-02T10:20:00Z', now()),
  ('arch-kili-uhuru-peak', 'Mount Kilimanjaro — Snowy Uhuru Peak Summit (5,895m)', 'Kilimanjaro Summit Climb', 'Kilimanjaro & Trekking', 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/Mount-kilimanjaro.jpg', '2026-11-02T10:21:00Z', now()),
  ('arch-kili-machame-7d', 'Kilimanjaro Machame Route — 7-Day Whiskey Route Expedition', 'Machame Route Trekking', 'Kilimanjaro & Trekking', 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/7-days-machame-q7uhx4dl11xrr3ao020xabzqzwvm9oxm4gn0ke87mo.jpg', '2026-11-02T10:22:00Z', now()),
  ('arch-kili-lemosho-8d', 'Kilimanjaro Lemosho Route — Scenic Glades & Moorland', 'Lemosho Route Trekking', 'Kilimanjaro & Trekking', 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/trekking-q6cddz690ts9x5xr22ez97y2b983qsmrgbyr3k3jq8.jpeg', '2026-11-02T10:23:00Z', now()),
  ('arch-kili-marangu-6d', 'Kilimanjaro Marangu Route — 6-Day Hut Accommodation Trail', 'Marangu Route Trekking', 'Kilimanjaro & Trekking', 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/marangu-6-days1-q7up38u1t7ag04cuqmqp072nn4ma1fo0y216xvi6xs.jpg', '2026-11-02T10:24:00Z', now()),
  ('arch-kili-rongai-7d', 'Kilimanjaro Rongai Route — 7-Day Northern Slope Wilderness', 'Rongai Route Trekking', 'Kilimanjaro & Trekking', 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/rongai-7-days-q7urww3qv8fpi2pk72hb51o485m7f472l5qg82sk2o.jpg', '2026-11-02T10:25:00Z', now()),
  ('arch-ol-doinyo-lengai', 'Mount Ol Doinyo Lengai — Active Volcano Trekking', 'Lake Natron & Ol Doinyo Lengai', 'Kilimanjaro & Trekking', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/35/17/eb/8b/mount-ol-doinyo-lengai.jpg?w=1400&h=900&s=1', '2026-11-02T10:26:00Z', now()),
  ('arch-zanzibar-beach-view', 'Zanzibar — Turquoise Indian Ocean & White Sand Beach', 'Zanzibar Beach Holiday', 'Zanzibar & Coast', 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/zanzibar-beach-view-1024x576.jpg', '2026-11-02T10:27:00Z', now()),
  ('arch-zanzibar-prison-island', 'Zanzibar — Prison Island & Spice Island Dhow Excursion', '3-Day Zanzibar & Prison Island', 'Zanzibar & Coast', 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/zanzibar-island-1024x683.jpg', '2026-11-02T10:28:00Z', now()),
  ('arch-zanzibar-jozani-forest', 'Zanzibar — Jozani Red Colobus Monkey Sanctuary', '4-Day Zanzibar & Jozani Forest', 'Zanzibar & Coast', 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/photo0jpg-1024x768.jpg', '2026-11-02T10:29:00Z', now()),
  ('arch-marangu-waterfalls-day', 'Marangu Foothills — Rainforest Waterfall & Coffee Day Trip', 'Marangu Waterfalls Day Trip', 'Cultural & Day Trips', 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/MARANGU-WF-COVER.jpg', '2026-11-02T10:30:00Z', now()),
  ('arch-maasai-boma-cultural', 'Traditional Maasai Boma — Monduli Juu Cultural Immersion', 'Maasai Village Cultural Visit', 'Cultural & Day Trips', 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/maasai-boma1-quj0eomliq423umh5979wbutmmzg0963hchobwsin0.jpg', '2026-11-02T10:31:00Z', now()),
  ('arch-hadzabe-lake-eyasi', 'Lake Eyasi — Hadzabe Bushmen & Datoga Tribe Visit', 'Hadzabe Cultural Expedition', 'Cultural & Day Trips', '/images/hadzabe-cultural-visit.jpg', '2026-11-02T10:32:00Z', now()),
  ('arch-mount-meru-waterfall', 'Mount Meru Waterfalls — Arusha Foothills Nature Hike', 'Mount Meru Waterfall Day Hike', 'Cultural & Day Trips', 'https://media-cdn.tripadvisor.com/media/photo-o/13/d0/7f/91/mount-meru-waterfalls.jpg', '2026-11-02T10:33:00Z', now()),
  ('arch-safari-cruiser-4x4', 'Extended 4x4 Safari Land Cruiser — Pop-Up Roof Game Drive', 'Private 4x4 Safari Fleet', 'Lodges & 4x4 Fleet', 'https://media-cdn.tripadvisor.com/media/photo-o/1a/7a/6c/71/cover-photo-augustine.jpg', '2026-11-02T10:34:00Z', now()),
  ('arch-bush-picnic-safari', 'Savannah Bush Picnic — Private Safari Lunch in the Park', 'Luxury Bush Dining Experience', 'Lodges & 4x4 Fleet', 'https://media-cdn.tripadvisor.com/media/photo-o/21/9b/1f/47/clients-enjoying-a-picnic.jpg', '2026-11-02T10:35:00Z', now())
on conflict (id) do update set
  title = excluded.title,
  activity_tag = excluded.activity_tag,
  category = excluded.category,
  url = excluded.url,
  updated_at = now();

commit;


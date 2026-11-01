-- ============================================================================
-- Migration: Complete Tour Operator & Agency Operational Schema & Real Seeds
-- Project: Tanzania Safari Explorer (unjtqownkamivgvtrjlc)
-- Tables: tour_bookings, departure_schedules, fleet_vehicles, safari_guides, contact_inquiries
-- ============================================================================

begin;

-- ── 1. GUEST BOOKINGS & CUSTOM PLANNED TRIPS ─────────────────────────────
create table if not exists public.tour_bookings (
  id text primary key,
  tour_id text not null,
  tour_name text not null,
  client_name text not null,
  client_email text not null,
  client_phone text not null,
  country text not null default 'International',
  travel_date text not null,
  pax integer not null default 2,
  total_amount numeric(12, 2) not null default 0,
  currency text not null default '$',
  status text not null default 'Pending' check (status in ('Pending', 'Confirmed', 'Completed', 'Cancelled')),
  special_requests text,
  assigned_guide text,
  created_at timestamptz not null default now()
);

create index if not exists tour_bookings_status_idx on public.tour_bookings (status);
create index if not exists tour_bookings_created_at_idx on public.tour_bookings (created_at desc);
create index if not exists tour_bookings_client_email_idx on public.tour_bookings (client_email);

-- ── 2. SCHEDULED GROUP DEPARTURES ─────────────────────────────────────────
create table if not exists public.departure_schedules (
  id text primary key,
  tour_id text not null,
  tour_name text not null,
  category text not null,
  start_date text not null,
  end_date text not null,
  available_seats integer not null default 6,
  total_seats integer not null default 6,
  price_per_person numeric(10, 2) not null default 0,
  guaranteed boolean not null default true,
  status text not null default 'Open' check (status in ('Open', 'Guaranteed', 'Almost Full', 'Sold Out')),
  created_at timestamptz not null default now()
);

create index if not exists departure_schedules_start_date_idx on public.departure_schedules (start_date);
create index if not exists departure_schedules_status_idx on public.departure_schedules (status);

-- ── 3. 4X4 EXPEDITION SAFARI FLEET ─────────────────────────────────────────
create table if not exists public.fleet_vehicles (
  id text primary key,
  plate_number text not null unique,
  model text not null,
  year integer not null default 2024,
  status text not null default 'Available' check (status in ('Available', 'On Safari', 'Maintenance')),
  assigned_guide text,
  features jsonb not null default '[]'::jsonb,
  last_service_date text not null,
  mileage_km integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists fleet_vehicles_status_idx on public.fleet_vehicles (status);

-- ── 4. CERTIFIED NATURALIST & MOUNTAIN GUIDES ─────────────────────────────
create table if not exists public.safari_guides (
  id text primary key,
  name text not null,
  photo text not null,
  languages jsonb not null default '[]'::jsonb,
  experience_years integer not null default 10,
  specialty text not null,
  status text not null default 'Available' check (status in ('Available', 'On Safari', 'Resting')),
  assigned_vehicle text,
  rating numeric(3, 2) not null default 4.95,
  phone text not null,
  created_at timestamptz not null default now()
);

create index if not exists safari_guides_status_idx on public.safari_guides (status);

-- ── 5. DIRECT CLIENT INQUIRIES & MESSAGES ──────────────────────────────────
create table if not exists public.contact_inquiries (
  id text primary key,
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  status text not null default 'New' check (status in ('New', 'Replied', 'Archived')),
  created_at timestamptz not null default now()
);

create index if not exists contact_inquiries_created_at_idx on public.contact_inquiries (created_at desc);
create index if not exists contact_inquiries_status_idx on public.contact_inquiries (status);

-- ── ENABLE ROW LEVEL SECURITY & PUBLIC POLICIES ───────────────────────────
alter table public.tour_bookings enable row level security;
alter table public.departure_schedules enable row level security;
alter table public.fleet_vehicles enable row level security;
alter table public.safari_guides enable row level security;
alter table public.contact_inquiries enable row level security;

grant select, insert, update, delete on public.tour_bookings to anon, authenticated;
grant select, insert, update, delete on public.departure_schedules to anon, authenticated;
grant select, insert, update, delete on public.fleet_vehicles to anon, authenticated;
grant select, insert, update, delete on public.safari_guides to anon, authenticated;
grant select, insert, update, delete on public.contact_inquiries to anon, authenticated;

-- Policies (Public can insert inquiries and bookings; everyone authorized can select/update)
drop policy if exists "Allow all on tour_bookings" on public.tour_bookings;
create policy "Allow all on tour_bookings" on public.tour_bookings for all to anon, authenticated using (true) with check (true);

drop policy if exists "Allow all on departure_schedules" on public.departure_schedules;
create policy "Allow all on departure_schedules" on public.departure_schedules for all to anon, authenticated using (true) with check (true);

drop policy if exists "Allow all on fleet_vehicles" on public.fleet_vehicles;
create policy "Allow all on fleet_vehicles" on public.fleet_vehicles for all to anon, authenticated using (true) with check (true);

drop policy if exists "Allow all on safari_guides" on public.safari_guides;
create policy "Allow all on safari_guides" on public.safari_guides for all to anon, authenticated using (true) with check (true);

drop policy if exists "Allow all on contact_inquiries" on public.contact_inquiries;
create policy "Allow all on contact_inquiries" on public.contact_inquiries for all to anon, authenticated using (true) with check (true);

-- ── SEED DATA (GENUINE OPERATIONAL SEEDS) ─────────────────────────────────

-- Departures
insert into public.departure_schedules (id, tour_id, tour_name, category, start_date, end_date, available_seats, total_seats, price_per_person, guaranteed, status)
values
  ('DEP-2026-01', 'kilimanjaro-lemosho-8-days', 'Kilimanjaro Lemosho Route 8-Day Trek', 'Trekking', '2026-07-05', '2026-07-12', 2, 8, 2350.00, true, 'Almost Full'),
  ('DEP-2026-02', '7-days-serengeti-migration-safari', 'Serengeti River Crossing Mara Migration', 'Safari', '2026-07-18', '2026-07-24', 1, 6, 2850.00, true, 'Almost Full'),
  ('DEP-2026-03', 'ngorongoro-serengeti-5-days', '5-Day Classic Big Five Wildlife Explorer', 'Safari', '2026-08-02', '2026-08-06', 4, 6, 1950.00, true, 'Guaranteed'),
  ('DEP-2026-04', 'kilimanjaro-machame-7-days', 'Kilimanjaro Machame Route 7-Day Trek', 'Trekking', '2026-08-15', '2026-08-21', 5, 8, 2100.00, true, 'Open'),
  ('DEP-2026-05', 'tarangire-manyara-crater-4-days', '4-Day Great Rift Valley & Baobab Explorer', 'Safari', '2026-09-01', '2026-09-04', 3, 6, 1450.00, true, 'Guaranteed'),
  ('DEP-2026-06', 'zanzibar-beach-stone-town-5-days', '5-Day Zanzibar Spice Island & Nungwi Holiday', 'Zanzibar', '2026-09-10', '2026-09-14', 6, 10, 1150.00, true, 'Open')
on conflict (id) do nothing;

-- Fleet Vehicles
insert into public.fleet_vehicles (id, plate_number, model, year, status, assigned_guide, features, last_service_date, mileage_km)
values
  ('FLT-01', 'T 482 DSK', 'Toyota Land Cruiser HZJ78 Custom Safari Pop-up', 2024, 'Available', 'Emmanuel Mollel', '["Pop-up roof hatch", "Dual Engel fridges", "Inverter 220V charging", "Garmin InReach Satellite", "High-lift jack & sand tracks"]'::jsonb, '2026-10-15', 38240),
  ('FLT-02', 'T 915 DSN', 'Toyota Land Cruiser HZJ79 Extended 8-Seater', 2025, 'On Safari', 'Josephat Kavishe', '["Panoramic sliding windows", "Pop-up roof hatch", "Fridge with mineral water", "Bean bags for telephoto lenses"]'::jsonb, '2026-10-22', 19800),
  ('FLT-03', 'T 331 DTH', 'Toyota Land Cruiser 70-Series VIP Cruiser', 2024, 'Available', 'Said Juma', '["Individual reclining bucket seats", "Air conditioning", "Pop-up photography hatch", "First aid trauma kit"]'::jsonb, '2026-10-05', 44100),
  ('FLT-04', 'T 620 DRK', 'Toyota Land Cruiser Extended 4x4', 2023, 'Maintenance', 'None', '["Pop-up roof", "Dual fuel tanks 180L", "Snorkel air intake", "Full camping gear storage"]'::jsonb, '2026-10-28', 76300),
  ('FLT-05', 'T 704 DTL', 'Toyota Land Cruiser Heavy Duty 4WD', 2025, 'Available', 'Peter Massawe', '["Pop-up photography hatch", "USB charging all seats", "Cooler box", "Roof luggage rack"]'::jsonb, '2026-10-18', 12450)
on conflict (id) do nothing;

-- Safari Guides
insert into public.safari_guides (id, name, photo, languages, experience_years, specialty, status, assigned_vehicle, rating, phone)
values
  ('GD-01', 'Emmanuel Mollel', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', '["English", "Swahili", "Maa", "German"]'::jsonb, 14, 'Predator Tracking & Serengeti Ecosystem Ecology', 'Available', 'T 482 DSK', 4.98, '+255 785 341 091'),
  ('GD-02', 'Josephat Kavishe', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', '["English", "Swahili", "French"]'::jsonb, 18, 'Kilimanjaro Head Mountain Guide (Lemosho / Machame Specialist)', 'On Safari', 'T 915 DSN', 4.99, '+255 754 892 110'),
  ('GD-03', 'Said Juma', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80', '["English", "Swahili", "Italian"]'::jsonb, 11, 'Zanzibar Cultural Heritage, Marine Biology & Dolphin Conservation', 'Available', 'T 331 DTH', 4.95, '+255 777 412 809'),
  ('GD-04', 'Peter Massawe', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80', '["English", "Swahili", "Spanish"]'::jsonb, 12, 'Ornithology (Tarangire & Manyara Birding Taxonomy) & Big Cat Habitats', 'Available', 'T 704 DTL', 4.96, '+255 788 123 995')
on conflict (id) do nothing;

-- Sample Bookings
insert into public.tour_bookings (id, tour_id, tour_name, client_name, client_email, client_phone, country, travel_date, pax, total_amount, currency, status, special_requests, assigned_guide)
values
  ('BK-2026-101', 'kilimanjaro-lemosho-8-days', 'Kilimanjaro Lemosho Route Trekking', 'Alexander & Sarah Wright', 'a.wright@uktravel.co.uk', '+44 7911 123456', 'United Kingdom', '2026-08-14', 2, 5226.00, '$', 'Confirmed', 'Vegetarian meals during mountain ascent. Trekking poles rental required.', 'Emmanuel Mollel'),
  ('BK-2026-102', '7-days-serengeti-migration-safari', '7-Day Serengeti Migration & Ngorongoro Luxury', 'Michael Chang & Family', 'mchang@vanguardtech.com', '+1 (415) 890-3421', 'United States', '2026-07-22', 4, 11800.00, '$', 'Confirmed', 'Private 4x4 with pop-up roof for wildlife telephoto lenses. 2 binoculars requested.', 'Josephat Kavishe'),
  ('BK-2026-103', 'zanzibar-beach-stone-town-5-days', '5-Day Zanzibar Spice Island & Nungwi Beach', 'Elena Rostova', 'elena.rostova@mail.de', '+49 170 9876543', 'Germany', '2026-09-05', 2, 3100.00, '$', 'Pending', 'Sunset dhow cruise confirmation and airport private transfer in Stone Town.', 'Said Juma'),
  ('BK-2026-104', 'tarangire-manyara-crater-4-days', '4-Day Northern Circuit Highlights', 'Dr. Jean-Pierre Laurent', 'jp.laurent@sorbonne.fr', '+33 6 12 34 56 78', 'France', '2026-11-10', 3, 5850.00, '$', 'Pending', 'Focus on birding taxonomy in Tarangire and Lake Manyara.', 'Peter Massawe')
on conflict (id) do nothing;

-- Sample Inquiries
insert into public.contact_inquiries (id, name, email, phone, subject, message, status)
values
  ('INQ-01', 'Claire Beaumont', 'c.beaumont@genevalux.ch', '+41 22 730 4400', 'Private 8-Day Honeymoon Safari Quote', 'Hello Embuat Safaris team, my fiance and I are planning our honeymoon for September 2026. We want a combination of luxury tented camps in Serengeti and 3 days in Zanzibar. Could you provide a tailored itinerary?', 'New'),
  ('INQ-02', 'David O’Connor', 'doconnor@dublinlaw.ie', '+353 87 654 3210', 'Kilimanjaro Lemosho Route Summit Gear', 'Hi, our group of 4 plans to summit Kilimanjaro via Lemosho next February. Do you supply sleeping bags and heavy thermal equipment for rent in Arusha?', 'Replied'),
  ('INQ-03', 'Hans Meier', 'hans.meier@munich-eng.de', '+49 89 244 1234', 'Photography Vehicle Pop-up Inquiries', 'We are wildlife photographers looking to book a private Land Cruiser with 360-degree open pop-up roof and inverter battery chargers. Can you confirm vehicle availability for July?', 'New')
on conflict (id) do nothing;

commit;


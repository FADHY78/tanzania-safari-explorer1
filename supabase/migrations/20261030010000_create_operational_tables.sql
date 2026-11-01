-- ============================================================================
-- Migration: Operational Tables (Bookings, Departures, Fleet, Guides, Media, Audit)
-- Project: Tanzania Safari Explorer (unjtqownkamivgvtrjlc)
-- ============================================================================

begin;

-- 1. Guest Bookings & Inquiries
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
create index if not exists tour_bookings_client_email_idx on public.tour_bookings (client_email);

-- 2. Group Departure Schedules
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

-- 3. 4x4 Safari Fleet Vehicles
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

-- 4. Certified Native Safari & Mountain Guides
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

-- Enable RLS & Grants
alter table public.tour_bookings enable row level security;
alter table public.departure_schedules enable row level security;
alter table public.fleet_vehicles enable row level security;
alter table public.safari_guides enable row level security;

grant select, insert, update, delete on public.tour_bookings to anon, authenticated;
grant select, insert, update, delete on public.departure_schedules to anon, authenticated;
grant select, insert, update, delete on public.fleet_vehicles to anon, authenticated;
grant select, insert, update, delete on public.safari_guides to anon, authenticated;

drop policy if exists "Allow public & admin operations on tour_bookings" on public.tour_bookings;
create policy "Allow public & admin operations on tour_bookings"
  on public.tour_bookings for all to anon, authenticated using (true) with check (true);

drop policy if exists "Allow public & admin operations on departure_schedules" on public.departure_schedules;
create policy "Allow public & admin operations on departure_schedules"
  on public.departure_schedules for all to anon, authenticated using (true) with check (true);

drop policy if exists "Allow public & admin operations on fleet_vehicles" on public.fleet_vehicles;
create policy "Allow public & admin operations on fleet_vehicles"
  on public.fleet_vehicles for all to anon, authenticated using (true) with check (true);

drop policy if exists "Allow public & admin operations on safari_guides" on public.safari_guides;
create policy "Allow public & admin operations on safari_guides"
  on public.safari_guides for all to anon, authenticated using (true) with check (true);

commit;


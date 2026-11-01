-- ============================================================================
-- Migration: Create public.tour_bookings Table for Guest Bookings & Planned Trips
-- Project: Tanzania Safari Explorer (unjtqownkamivgvtrjlc)
-- ============================================================================

begin;

-- Create the tour_bookings table
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

-- Performance Indexes
create index if not exists tour_bookings_status_idx on public.tour_bookings (status);
create index if not exists tour_bookings_created_at_idx on public.tour_bookings (created_at desc);
create index if not exists tour_bookings_client_email_idx on public.tour_bookings (client_email);

-- Enable Row Level Security (RLS)
alter table public.tour_bookings enable row level security;

-- Grant permissions to public anon and authenticated users
grant select, insert, update, delete on public.tour_bookings to anon, authenticated;

-- Policies
drop policy if exists "Allow public insert on tour_bookings" on public.tour_bookings;
create policy "Allow public insert on tour_bookings"
  on public.tour_bookings for insert to anon, authenticated with check (true);

drop policy if exists "Allow select on tour_bookings" on public.tour_bookings;
create policy "Allow select on tour_bookings"
  on public.tour_bookings for select to anon, authenticated using (true);

drop policy if exists "Allow update on tour_bookings" on public.tour_bookings;
create policy "Allow update on tour_bookings"
  on public.tour_bookings for update to anon, authenticated using (true) with check (true);

drop policy if exists "Allow delete on tour_bookings" on public.tour_bookings;
create policy "Allow delete on tour_bookings"
  on public.tour_bookings for delete to anon, authenticated using (true);

commit;


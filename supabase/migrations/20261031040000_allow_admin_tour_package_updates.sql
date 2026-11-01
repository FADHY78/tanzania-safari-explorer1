-- =========================================================================
-- MIGRATION: 20261031040000_allow_admin_tour_package_updates.sql
-- PURPOSE: Ensure that when an admin replaces a cover photo or updates
--          a tour package from the Admin Dashboard, the changes are
--          accepted by Supabase RLS and immediately persist to PostgreSQL.
-- =========================================================================

-- 1. Ensure RLS is active on public.tour_packages
ALTER TABLE public.tour_packages ENABLE ROW LEVEL SECURITY;

-- 2. Drop any restrictive update/insert policies
DROP POLICY IF EXISTS "Authenticated users can update tour packages" ON public.tour_packages;
DROP POLICY IF EXISTS "Authenticated users can insert tour packages" ON public.tour_packages;
DROP POLICY IF EXISTS "Allow all updates to tour_packages" ON public.tour_packages;
DROP POLICY IF EXISTS "Allow all inserts to tour_packages" ON public.tour_packages;

-- 3. Allow updates to tour_packages (including image & cover_image) from admin dashboard
CREATE POLICY "Allow all updates to tour_packages"
  ON public.tour_packages
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- 4. Allow insertions to tour_packages from admin dashboard
CREATE POLICY "Allow all inserts to tour_packages"
  ON public.tour_packages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 5. Create storage bucket for uploaded package images if it does not already exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('package-images', 'package-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 6. Storage policies for package-images bucket so local file uploads work seamlessly
DROP POLICY IF EXISTS "Public can view package images" ON storage.objects;
CREATE POLICY "Public can view package images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'package-images');

DROP POLICY IF EXISTS "Anyone can upload package images" ON storage.objects;
CREATE POLICY "Anyone can upload package images"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'package-images');

DROP POLICY IF EXISTS "Anyone can update package images" ON storage.objects;
CREATE POLICY "Anyone can update package images"
  ON storage.objects
  FOR UPDATE
  TO public
  USING (bucket_id = 'package-images');


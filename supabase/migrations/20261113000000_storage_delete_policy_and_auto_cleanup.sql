-- ============================================================================
-- MIGRATION: 20261113000000_storage_delete_policy_and_auto_cleanup.sql
-- PURPOSE: 
--   1. Allow deletion of replaced/old images in package-images storage bucket.
--   2. Automatically delete previous image from storage when tour_packages is updated.
--   3. Ensure site_settings and image_archive cleanly support permanent updates.
-- ============================================================================

-- 1. Ensure storage policies for package-images allow DELETE and UPDATE
DROP POLICY IF EXISTS "Anyone can delete package images" ON storage.objects;
CREATE POLICY "Anyone can delete package images"
  ON storage.objects
  FOR DELETE
  TO public
  USING (bucket_id = 'package-images');

DROP POLICY IF EXISTS "Anyone can update package images" ON storage.objects;
CREATE POLICY "Anyone can update package images"
  ON storage.objects
  FOR UPDATE
  TO public
  USING (bucket_id = 'package-images')
  WITH CHECK (bucket_id = 'package-images');

-- 2. Trigger function to automatically remove previous storage file on package update or deletion
CREATE OR REPLACE FUNCTION public.cleanup_old_tour_package_storage_image()
RETURNS trigger AS $$
DECLARE
  old_img_name text;
  old_cover_name text;
BEGIN
  IF TG_OP = 'UPDATE' THEN
    -- If image changed, extract file name and delete from storage.objects
    IF OLD.image IS DISTINCT FROM NEW.image AND OLD.image LIKE '%/package-images/%' THEN
      old_img_name := split_part(split_part(OLD.image, '/package-images/', 2), '?', 1);
      IF old_img_name IS NOT NULL AND old_img_name <> '' THEN
        DELETE FROM storage.objects WHERE bucket_id = 'package-images' AND name = old_img_name;
      END IF;
    END IF;

    -- If cover_image changed
    IF OLD.cover_image IS DISTINCT FROM NEW.cover_image AND OLD.cover_image LIKE '%/package-images/%' AND OLD.cover_image <> OLD.image THEN
      old_cover_name := split_part(split_part(OLD.cover_image, '/package-images/', 2), '?', 1);
      IF old_cover_name IS NOT NULL AND old_cover_name <> '' THEN
        DELETE FROM storage.objects WHERE bucket_id = 'package-images' AND name = old_cover_name;
      END IF;
    END IF;

    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    -- When a tour package is deleted, delete its images from storage if stored in package-images
    IF OLD.image LIKE '%/package-images/%' THEN
      old_img_name := split_part(split_part(OLD.image, '/package-images/', 2), '?', 1);
      IF old_img_name IS NOT NULL AND old_img_name <> '' THEN
        DELETE FROM storage.objects WHERE bucket_id = 'package-images' AND name = old_img_name;
      END IF;
    END IF;

    IF OLD.cover_image LIKE '%/package-images/%' AND OLD.cover_image <> OLD.image THEN
      old_cover_name := split_part(split_part(OLD.cover_image, '/package-images/', 2), '?', 1);
      IF old_cover_name IS NOT NULL AND old_cover_name <> '' THEN
        DELETE FROM storage.objects WHERE bucket_id = 'package-images' AND name = old_cover_name;
      END IF;
    END IF;

    RETURN OLD;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger to tour_packages
DROP TRIGGER IF EXISTS trg_cleanup_tour_package_storage ON public.tour_packages;
CREATE TRIGGER trg_cleanup_tour_package_storage
  AFTER UPDATE OR DELETE ON public.tour_packages
  FOR EACH ROW
  EXECUTE FUNCTION public.cleanup_old_tour_package_storage_image();


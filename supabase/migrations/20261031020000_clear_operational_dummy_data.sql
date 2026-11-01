-- ═══════════════════════════════════════════════════════════════════════════════
-- EMBUAT SAFARIS: CLEAR DUMMY / MOCK OPERATIONAL DATA
-- ═══════════════════════════════════════════════════════════════════════════════
-- INSTRUCTIONS:
-- 1. This migration clears all placeholder seed data from operational tables:
--    - public.tour_bookings (Guest Bookings & Trip Planner)
--    - public.departure_schedules (Group Departures)
--    - public.fleet_vehicles (4x4 Safari Fleet)
--    - public.safari_guides (Certified Naturalist Guides)
--    - public.contact_inquiries (Client Inquiries & Messages)
--
-- 2. IMPORTANT:
--    - public.tour_packages (Tour Packages Catalog) IS LEFT COMPLETELY UNCHANGED.
--    - public.tour_categories (Tour Categories) IS LEFT COMPLETELY UNCHANGED.
-- ═══════════════════════════════════════════════════════════════════════════════

-- 1. Safely delete mock records from operational tables if they exist
DO $$
BEGIN
  IF to_regclass('public.tour_bookings') IS NOT NULL THEN
    EXECUTE 'DELETE FROM public.tour_bookings';
  END IF;

  IF to_regclass('public.departure_schedules') IS NOT NULL THEN
    EXECUTE 'DELETE FROM public.departure_schedules';
  END IF;

  IF to_regclass('public.fleet_vehicles') IS NOT NULL THEN
    EXECUTE 'DELETE FROM public.fleet_vehicles';
  END IF;

  IF to_regclass('public.safari_guides') IS NOT NULL THEN
    EXECUTE 'DELETE FROM public.safari_guides';
  END IF;

  IF to_regclass('public.contact_inquiries') IS NOT NULL THEN
    EXECUTE 'DELETE FROM public.contact_inquiries';
  END IF;
END $$;

-- 2. Verify: Check that tour_packages remains active and untouched
SELECT 
  'tour_packages (ACTIVE & UNCHANGED)' AS module_status, 
  count(*) AS total_records 
FROM public.tour_packages
UNION ALL
SELECT 
  'tour_categories (ACTIVE & UNCHANGED)', 
  count(*) 
FROM public.tour_categories;

-- ═══════════════════════════════════════════════════════════════════════════════
-- EMBUAT SAFARIS: SYNC AUTHENTIC WEBSITE PHOTOGRAPHY TO DATABASE
-- ═══════════════════════════════════════════════════════════════════════════════
-- Updates all 84 tour packages in public.tour_packages with their authentic website
-- photography (image and cover_image) from constants.tsx.
-- ═══════════════════════════════════════════════════════════════════════════════

DO $$
BEGIN
  UPDATE public.tour_packages
  SET image = 'https://safari56.com/assets/images/great-migration.webp',
      cover_image = 'https://safari56.com/assets/images/great-migration.webp',
      updated_at = now()
  WHERE id = 'safari-56-ndutu-calving-6-days';
  UPDATE public.tour_packages
  SET image = 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/zanzibar-beach-view-1024x576.jpg',
      cover_image = 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/zanzibar-beach-view-1024x576.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-stone-town-2-days';
  UPDATE public.tour_packages
  SET image = 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/zanzibar-island-1024x683.jpg',
      cover_image = 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/zanzibar-island-1024x683.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-prison-island-3-days';
  UPDATE public.tour_packages
  SET image = 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/photo0jpg-1024x768.jpg',
      cover_image = 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/photo0jpg-1024x768.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-jozani-forest-4-days';
  UPDATE public.tour_packages
  SET image = 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/mahali-zanzibar-1024x683.jpg',
      cover_image = 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/mahali-zanzibar-1024x683.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-prison-island-spice-4-days';
  UPDATE public.tour_packages
  SET image = 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/kuza-cave.jpg',
      cover_image = 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/kuza-cave.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-kuza-cave-4-days';
  UPDATE public.tour_packages
  SET image = 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Zanzibar-Fukuchani-Tour.jpg',
      cover_image = 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Zanzibar-Fukuchani-Tour.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-fukuchani-5-days';
  UPDATE public.tour_packages
  SET image = 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/suite-double-ocean-view-1024x684.jpg',
      cover_image = 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/suite-double-ocean-view-1024x684.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-matemwe-5-days';
  UPDATE public.tour_packages
  SET image = 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Zanzibar-tour-to-mnemba-Island1.jpg',
      cover_image = 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Zanzibar-tour-to-mnemba-Island1.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-mnemba-island-5-days';
  UPDATE public.tour_packages
  SET image = 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/gold-zanzibar-beach-house-3.jpg',
      cover_image = 'https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/gold-zanzibar-beach-house-3.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-kendwa-luxury-6-days';
  UPDATE public.tour_packages
  SET image = 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Nungwi-beach-zanzibar-Tour3.jpg',
      cover_image = 'https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Nungwi-beach-zanzibar-Tour3.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-nungwi-beach-6-days';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/Historical_Stone_Town_walking_Tour_04.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/Historical_Stone_Town_walking_Tour_02.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-half-day-stone-town-tour';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/Mnemba_Dolphins_Snorkeling_Trip_01.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/Mnemba_Dolphins_Snorkeling_Trip_01.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-half-day-mnemba-dolphins-snorkeling-trip';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/Prison_Island_Tour_01.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/Prison_Island_Tour_01.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-half-day-prison-island-tour';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/Spice_Farms_Tour_01.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/Spice_Farms_Tour_01.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-half-day-spice-farms-tour';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/Nakupenda_Sandbank_01.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/Nakupenda_Sandbank_01.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-half-day-nakupenda-sandbank';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/Jozani_Forest_Tour_01.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/Jozani_Forest_Tour_01.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-half-day-jozani-forest-tour';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/Sunset_Dhow_Cruise_01.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/Sunset_Dhow_Cruise_01.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-half-day-sunset-dhow-cruise';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/Kizimkazi_Dolphins_Tour_01.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/Kizimkazi_Dolphins_Tour_01.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-half-day-kizimkazi-dolphins-tour';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/The_Rock_Restaurant_01.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/The_Rock_Restaurant_01.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-half-day-the-rock-restaurant';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/Quad_Bike_Tour_01.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/Quad_Bike_Tour_01.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-half-day-quad-bike-tour';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/Nungwi_Beach_Tour_01.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/Nungwi_Beach_Tour_01.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-half-day-nungwi-beach-tour';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/Salaam_Cave_Tour_01.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/Salaam_Cave_Tour_01.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-half-day-salaam-cave-tour';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/Baraka_Aquarium_Tour_01.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/Baraka_Aquarium_Tour_01.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-half-day-baraka-aquarium-tour';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/Village_Tour_01.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/Village_Tour_01.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-half-day-village-tour';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/Fishing_Game_Tour_01.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/Fishing_Game_Tour_01.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-half-day-fishing-game-tour';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/Full_Day_Safari_Blue_Trip_01.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/Full_Day_Safari_Blue_Trip_01.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-full-day-safari-blue-trip';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/Historical_Stone_Town_walking_Tour_04.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/Historical_Stone_Town_walking_Tour_01.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-full-day-spice-farm-prison-island-stone-town';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/Jozani_Forest_Tour_03.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/Jozani_Forest_Tour_03.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-full-day-jozani-forest-spice-farm-stone-town';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/Prison_Island_Tour_02.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/Prison_Island_Tour_02.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-full-day-jozani-forest-spice-farm-prison-island';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/Nakupenda_Sandbank_01.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/Nakupenda_Sandbank_01.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-full-day-prison-island-nakupenda-sandbank';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/FullDay_Traditional_Cooking_Class_Local_Market_01.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/FullDay_Traditional_Cooking_Class_Local_Market_01.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-full-day-traditional-cooking-class-local-market';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/Kendwa_Beach_Tour_02.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/Kendwa_Beach_Tour_02.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-full-day-nungwi-kendwa-beach-experience';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/The_Rock_Restaurant_01.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/The_Rock_Restaurant_01.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-full-day-jozani-forest-kuza-cave-blue-lagoon-the-rock';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/Zanzibar_Sea_Walk_Tour_01.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/Zanzibar_Sea_Walk_Tour_01.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-full-day-sea-walk-tour';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/Kayaking_Adventures_01.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/Kayaking_Adventures_01.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-full-day-jozani-forest-kayaking-adventures';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/Mnemba_Dolphins_Snorkeling_Trip_01.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/Mnemba_Dolphins_Snorkeling_Trip_01.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-full-day-mnemba-snorkeling-nungwi-kendwa-beach';
  UPDATE public.tour_packages
  SET image = 'https://alulizanzibar.co.tz/images/Bawe_Island_Snorkeling_01.jpg',
      cover_image = 'https://alulizanzibar.co.tz/images/Bawe_Island_Snorkeling_01.jpg',
      updated_at = now()
  WHERE id = 'zanzibar-full-day-prison-island-bawe-island-snorkeling';

END $$;

-- Verify image counts in public.tour_packages
SELECT 
  'Total Packages with Real Photography' AS metric,
  count(*) AS total,
  count(image) AS with_image,
  count(cover_image) AS with_cover_image
FROM public.tour_packages;

-- ═══════════════════════════════════════════════════════════════════════════════
-- EMBUAT SAFARIS: SYNC KILIMANJARO TREKKING PACKAGE COVER IMAGES
-- ═══════════════════════════════════════════════════════════════════════════════
-- Ensures public.tour_packages cover_image matches the authentic route image
-- for all 13 Kilimanjaro mountain trekking expeditions.
-- ═══════════════════════════════════════════════════════════════════════════════

DO $$
BEGIN
  UPDATE public.tour_packages
  SET image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/trekking-q6cddz690ts9x5xr22ez97y2b983qsmrgbyr3k3jq8.jpeg',
      cover_image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/trekking-q6cddz690ts9x5xr22ez97y2b983qsmrgbyr3k3jq8.jpeg',
      updated_at = now()
  WHERE id = 'kilimanjaro-lemosho-8-days';
  UPDATE public.tour_packages
  SET image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/7-days-machame-q7uhx4dl11xrr3ao020xabzqzwvm9oxm4gn0ke87mo.jpg',
      cover_image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/7-days-machame-q7uhx4dl11xrr3ao020xabzqzwvm9oxm4gn0ke87mo.jpg',
      updated_at = now()
  WHERE id = 'kilimanjaro-machame-7-days';
  UPDATE public.tour_packages
  SET image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/marangu-6-days1-q7up38u1t7ag04cuqmqp072nn4ma1fo0y216xvi6xs.jpg',
      cover_image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/marangu-6-days1-q7up38u1t7ag04cuqmqp072nn4ma1fo0y216xvi6xs.jpg',
      updated_at = now()
  WHERE id = 'kilimanjaro-marangu-6-days';
  UPDATE public.tour_packages
  SET image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/rongai-7-days-q7urww3qv8fpi2pk72hb51o485m7f472l5qg82sk2o.jpg',
      cover_image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/rongai-7-days-q7urww3qv8fpi2pk72hb51o485m7f472l5qg82sk2o.jpg',
      updated_at = now()
  WHERE id = 'kilimanjaro-rongai-7-days';
  UPDATE public.tour_packages
  SET image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/Kilimanjaro-Umbwe-Route-6-q7utkom5luac13ux1wwyqyhokiwr1zke53od7q509s.jpeg',
      cover_image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/Kilimanjaro-Umbwe-Route-6-q7utkom5luac13ux1wwyqyhokiwr1zke53od7q509s.jpeg',
      updated_at = now()
  WHERE id = 'kilimanjaro-umbwe-6-days';
  UPDATE public.tour_packages
  SET image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/Londrossi-Gate-rh9062wybbmw7bwvey0zyf18w2hz2eb0vr07hmmjkw.jpeg',
      cover_image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/Londrossi-Gate-rh9062wybbmw7bwvey0zyf18w2hz2eb0vr07hmmjkw.jpeg',
      updated_at = now()
  WHERE id = 'kilimanjaro-shira-7-days';
  UPDATE public.tour_packages
  SET image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/safari-to-kilimanjaro-q6cetewb0g758z80pau0p8o4kbp6yitz6x5aintz8g.jpeg',
      cover_image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/safari-to-kilimanjaro-q6cetewb0g758z80pau0p8o4kbp6yitz6x5aintz8g.jpeg',
      updated_at = now()
  WHERE id = 'kilimanjaro-machame-6-days';
  UPDATE public.tour_packages
  SET image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/marangu-route-q7undhtqu0rbac1wbfu0pa1iquz7d9iu4f5uyh29pc.jpg',
      cover_image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/marangu-route-q7undhtqu0rbac1wbfu0pa1iquz7d9iu4f5uyh29pc.jpg',
      updated_at = now()
  WHERE id = 'kilimanjaro-marangu-5-days';
  UPDATE public.tour_packages
  SET image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/RONGAI-ROUTE-q7uqo8rq8jbe0vkawrp9pb9wf9ojsoy2g665kwzrmo.jpg',
      cover_image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/RONGAI-ROUTE-q7uqo8rq8jbe0vkawrp9pb9wf9ojsoy2g665kwzrmo.jpg',
      updated_at = now()
  WHERE id = 'kilimanjaro-rongai-6-days';
  UPDATE public.tour_packages
  SET image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/Lemosho-Hiking-kilimajaro-climb-qu8sutmciqoioii2vyiflva3p689oa7o49v1aj8hpc.jpg',
      cover_image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/Lemosho-Hiking-kilimajaro-climb-qu8sutmciqoioii2vyiflva3p689oa7o49v1aj8hpc.jpg',
      updated_at = now()
  WHERE id = 'kilimanjaro-lemosho-7-days';
  UPDATE public.tour_packages
  SET image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/Kilimanjaro-Northern-Circuit-Route1-q7uq22qr26yy7xrhcor0eenk34xx9nxyegax4zv0dc.jpeg',
      cover_image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/Kilimanjaro-Northern-Circuit-Route1-q7uq22qr26yy7xrhcor0eenk34xx9nxyegax4zv0dc.jpeg',
      updated_at = now()
  WHERE id = 'kilimanjaro-northern-circuit-9-days';
  UPDATE public.tour_packages
  SET image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/machame-luxury-rb78vyxh9rskw9nkluctbnyf7xxgiiukdlb2ymaug0.jpg',
      cover_image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/machame-luxury-rb78vyxh9rskw9nkluctbnyf7xxgiiukdlb2ymaug0.jpg',
      updated_at = now()
  WHERE id = 'kilimanjaro-machame-luxury-7-days';
  UPDATE public.tour_packages
  SET image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/KILIMANJARO-NORTHEN-ROOT-q7y87h14x1stw34ps8brqwg6myz3o9z2ga3m1oabvk.jpg',
      cover_image = 'https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/KILIMANJARO-NORTHEN-ROOT-q7y87h14x1stw34ps8brqwg6myz3o9z2ga3m1oabvk.jpg',
      updated_at = now()
  WHERE id = 'kilimanjaro-northern-circuit-8-days';
END $$;

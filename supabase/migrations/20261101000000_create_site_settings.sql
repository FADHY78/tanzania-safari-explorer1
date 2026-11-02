-- Stores the website's editable settings (branding, colours, company profile, replaced images) so they
-- persist across devices once Supabase is connected.
CREATE TABLE IF NOT EXISTS public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read site settings" ON public.site_settings;
CREATE POLICY "Anyone can read site settings"
  ON public.site_settings FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Admin dashboard can insert site settings" ON public.site_settings;
CREATE POLICY "Admin dashboard can insert site settings"
  ON public.site_settings FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Admin dashboard can update site settings" ON public.site_settings;
CREATE POLICY "Admin dashboard can update site settings"
  ON public.site_settings FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);


import { createClient, SupabaseClient } from '@supabase/supabase-js';

const env = (import.meta as unknown as { env: Record<string, string | undefined> }).env || {};

export const supabaseUrl =
  env.VITE_SUPABASE_URL || 'https://unjtqownkamivgvtrjlc.supabase.co';

export const supabasePublishableKey =
  env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  env.VITE_SUPABASE_ANON_KEY ||
  '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabasePublishableKey &&
    supabasePublishableKey !== 'YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY' &&
    !supabasePublishableKey.includes('PLACEHOLDER')
);

// Use a safe fallback key during initial setup so the app renders without crashing
// before the user adds their publishable/anon key to .env.local.
export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  isSupabaseConfigured ? supabasePublishableKey : 'sb-placeholder-publishable-key-not-configured',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);


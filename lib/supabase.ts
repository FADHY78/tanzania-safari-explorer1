import { createClient, SupabaseClient } from '@supabase/supabase-js';

declare global {
  interface ImportMeta {
    readonly env: Record<string, string | undefined>;
  }
}

export const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://unjtqownkamivgvtrjlc.supabase.co';

export const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_XKCyYo88vhY8l2tsNIa3EQ_dNsO2rwV';

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

/**
 * Safely removes an old file from Supabase Storage if the URL is an uploaded object.
 * e.g., https://.../storage/v1/object/public/package-images/tour-123.jpg
 */
export const deleteStorageFileIfSupabase = async (url?: string | null): Promise<boolean> => {
  if (!url || typeof url !== 'string' || !isSupabaseConfigured) return false;
  try {
    const bucketMatch = url.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)$/);
    if (bucketMatch) {
      const bucket = bucketMatch[1];
      const filePath = decodeURIComponent(bucketMatch[2].split('?')[0]);
      if (bucket && filePath) {
        const { error } = await supabase.storage.from(bucket).remove([filePath]);
        if (error) {
          console.warn(`Could not remove old image from storage (${filePath}):`, error.message);
          return false;
        }
        return true;
      }
    }
  } catch (err) {
    console.warn('Error deleting old storage image:', err);
  }
  return false;
};


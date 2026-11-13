const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://unjtqownkamivgvtrjlc.supabase.co';
const SUPABASE_KEY = 'sb_publishable_XKCyYo88vhY8l2tsNIa3EQ_dNsO2rwV';
const client = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
  console.log('Connecting to Supabase...');
  const { data: dbPackages, error: pkgErr } = await client
    .from('tour_packages')
    .select('*')
    .order('created_at', { ascending: true });

  if (pkgErr || !dbPackages) {
    console.error('Failed to fetch packages:', pkgErr);
    return;
  }

  const { data: categories } = await client.from('tour_categories').select('*');
  const { data: settings } = await client.from('site_settings').select('*');
  const { data: archive } = await client.from('image_archive').select('*');

  console.log(`Successfully fetched from live database:`);
  console.log(`- ${dbPackages.length} Tour Packages`);
  console.log(`- ${categories?.length || 0} Tour Categories`);
  console.log(`- ${settings?.length || 0} Site Settings records`);
  console.log(`- ${archive?.length || 0} Image Archive items`);

  // Save full database snapshot to a local JSON backup
  const backupDir = path.join(__dirname, 'db_backup');
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

  fs.writeFileSync(path.join(backupDir, 'tour_packages.json'), JSON.stringify(dbPackages, null, 2), 'utf8');
  fs.writeFileSync(path.join(backupDir, 'tour_categories.json'), JSON.stringify(categories || [], null, 2), 'utf8');
  fs.writeFileSync(path.join(backupDir, 'site_settings.json'), JSON.stringify(settings || [], null, 2), 'utf8');
  fs.writeFileSync(path.join(backupDir, 'image_archive.json'), JSON.stringify(archive || [], null, 2), 'utf8');

  console.log(`Snapshot saved to: ${backupDir}`);
}

main().catch(console.error);


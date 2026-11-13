const fs = require('fs');
const path = require('path');

const backupPath = path.join(__dirname, 'db_backup', 'tour_packages.json');
const constantsPath = 'e:/tanzania-safari-explorer/constants.tsx';

const rawDb = JSON.parse(fs.readFileSync(backupPath, 'utf8'));

function mapDbRowToTour(row) {
  const tour = {
    id: row.id,
    name: row.name,
    category: row.category,
    duration: row.duration,
    priceRange: row.price_range,
    fromPrice: Number(row.from_price) || 0,
    rates: Array.isArray(row.rates) ? row.rates : [],
    image: row.image,
    coverImage: row.cover_image || row.image
  };

  if (row.subcategory) tour.subcategory = row.subcategory;
  if (row.description) tour.description = row.description;
  if (row.hover_image) tour.hoverImage = row.hover_image;
  if (Array.isArray(row.highlights) && row.highlights.length) tour.highlights = row.highlights;
  if (Array.isArray(row.itinerary) && row.itinerary.length) tour.itinerary = row.itinerary;
  if (Array.isArray(row.included) && row.included.length) tour.included = row.included;
  if (Array.isArray(row.not_included) && row.not_included.length) tour.notIncluded = row.not_included;
  if (row.badge) tour.badge = row.badge;
  if (row.group_size) tour.groupSize = row.group_size;
  if (row.location) tour.location = row.location;
  if (row.destination) tour.destination = row.destination;
  tour.status = row.status || 'active';
  tour.featured = Boolean(row.featured);
  if (row.updated_at) tour.updatedAt = row.updated_at;

  return tour;
}

const tours = rawDb.map(mapDbRowToTour);
console.log(`Mapped ${tours.length} packages from Supabase.`);

const originalContent = fs.readFileSync(constantsPath, 'utf8');

// Find TESTIMONIALS position
const testimonialsIndex = originalContent.indexOf('export const TESTIMONIALS: Testimonial[]');
if (testimonialsIndex === -1) {
  console.error('Could not find TESTIMONIALS in constants.tsx');
  process.exit(1);
}

const testimonialsPart = originalContent.slice(testimonialsIndex);

const newContent = `import { TourPackage, Testimonial } from './types';\n\nexport const TOURS: TourPackage[] = ${JSON.stringify(
  tours,
  null,
  2
)};\n\n${testimonialsPart}`;

fs.writeFileSync(constantsPath, newContent, 'utf8');
console.log(`Updated constants.tsx successfully with all ${tours.length} packages from Supabase!`);


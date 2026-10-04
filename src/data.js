export const PHONE = { href: 'tel:+15063729417', label: '506-372-9417' };

export const ADDRESS = {
  lines: ['2856 Route 106', 'Boundary Creek, New Brunswick', 'Canada   E1G 4N4'],
  directions: 'https://www.google.com/maps/dir/?api=1&destination=2856+NB-106,+Boundary+Creek,+NB+E1G+4N4',
  embed: 'https://www.google.com/maps?q=2856+NB-106,+Boundary+Creek,+NB+E1G+4N4&z=15&output=embed',
};
export const WEBSITE = 'www.macnichollandscapingsupplies.com';

// Main navigation (product pages) and the utility links (home, contact, sitemap)
export const PRODUCT_NAV = [
  { to: '/decorative-mulches', label: 'Decorative Mulches' },
  { to: '/soils-aggregates', label: 'Soils & Aggregates' },
  { to: '/lumber-products', label: 'Lumber Products' },
  { to: '/rough-lumber-cabin', label: 'Rough Lumber Cabin' },
];
export const UTILITY_NAV = [
  { to: '/', label: 'Home' },
  { to: '/contact', label: 'Contact' },
  { to: '/sitemap', label: 'Sitemap' },
];
export const NAV = [{ to: '/', label: 'Home' }, ...PRODUCT_NAV, { to: '/contact', label: 'Contact' }];

export const IMAGES = {
  milling: 'assets/images/milling-timber-moncton.jpg',
  gardenBoxes: 'assets/images/hemlock-raised-garden-boxes.jpg',
  twoGardenBoxes: 'assets/images/two-raised-garden-boxes.jpg',
  sign: 'assets/images/hemlock-wooden-laser-sign.jpg',
  snowStakes: 'assets/images/snow-survey-stakes-hemlock.jpg',
  stakes: 'assets/images/pallet-wooden-stakes.jpg',
  woodchipsTexture: 'assets/images/hemlock-woodchips.jpg',
  woodchips: 'assets/images/natural-hemlock-woodchips.jpg',
  woodchipsBucket: 'assets/images/hemlock-woodchips-bucket-load.jpg',
  woodchipsTruck: 'assets/images/hemlock-woodchips-truck-load.jpg',
};

// Decorative Mulches: suggested amounts for 100 sq ft
export const MULCH_AMOUNTS = [
  { area: '100 square ft', depth: '4"', yards: 1.25 },
  { area: '100 square ft', depth: '3"', yards: 0.93 },
  { area: '100 square ft', depth: '2"', yards: 0.62 },
  { area: '100 square ft', depth: '1"', yards: 0.31 },
];

const SOIL_IMG = 'assets/images/soilandaggregates/';

// Soils & Aggregates products, in the order they appear on the page
export const SOILS = [
  { id: 'sand', group: 'aggregates', label: 'Sand', name: 'Sand', price: '90.00', image: SOIL_IMG + 'sand.jpg' },
  { id: 'gravel', group: 'aggregates', label: 'Crushed Stone - Gravel', name: '0 to 3/4" Crushed Stone (Gravel)', price: '65.00', image: SOIL_IMG + 'crushed-stone-gravel.jpg' },
  { id: 'drain', group: 'aggregates', label: 'Drain Stone', name: '1/4" to 3/4" Drain Stone', price: '65.00', image: SOIL_IMG + 'drain-stone.jpg' },
  { id: 'dust', group: 'aggregates', label: 'Crusher Dust - Tailings', name: 'Crusher Dust or Tailings', price: '65.00', note: 'Crusher dust, also known as tailings.', image: SOIL_IMG + 'crusher-dust-tailings.jpg' },
  { id: 'topsoil', group: 'soils', label: 'Top Soil', name: 'Top Soil', price: '45.00', note: 'Quality screened top soil. Specializing in small quantities.', image: SOIL_IMG + 'top-soil.jpg' },
  { id: 'blended', group: 'soils', label: 'Blended Soil', name: 'Blended Soil', price: '90.00', note: 'Consists of two thirds quality screened top soil blended with one third composted horse manure. Ideal for constructing new flower beds and gardens.', image: SOIL_IMG + 'blended-soil.jpg' },
];
export const SOIL_SHOWCASE = {
  load: SOIL_IMG + 'crushed-stone-3yards.jpg',
  blendedPile: SOIL_IMG + 'blended-soil-pile.jpg',
};

export const HOURS = [
  { label: 'Monday thru Friday', time: '8 AM to 4:30 PM', days: [1, 2, 3, 4, 5] },
  { label: 'Saturday', time: '8 AM to 11 AM', days: [6] },
];
export const HOURS_NOTE = 'CLOSED on ALL Holidays';

export const MARQUEE = ['Decorative Mulches', 'Soils & Aggregates', 'Hemlock Lumber', 'Milled Timber', 'Raised Garden Boxes', 'Wooden Stakes', 'Rig Mats', 'Custom Laser Signs'];

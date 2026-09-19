// Single place that knows how photos are organised in ./images.
// Files are picked up by name prefix, so adding a photo is: drop it in
// src/images with the right name and run scripts/compress-images.py.
//
//   hero-slideN             homepage slideshow
//   service-<slug>          card image for a service
//   <service-title-slug>-N  photos shown in a category grid
const ctx = require.context('./images', false, /\.(jpe?g|png|webp)$/i);

const byPrefix = (prefix) =>
  ctx
    .keys()
    .filter((key) => key.startsWith(`./${prefix}`))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map(ctx);

export const slugOf = (title) => title.toLowerCase().replace(/ /g, '-');

export const heroSlides = byPrefix('hero-slide');
export const serviceImage = (slug) => byPrefix(`service-${slug}`)[0];
export const categoryPhotos = (title) => byPrefix(`${slugOf(title)}-`);

export const services = [
  {
    title: 'Wedding Photography',
    image: serviceImage('wedding'),
    short: 'Capturing your special day with elegance and emotion.',
    details: 'Our wedding photography service ensures every magical moment is beautifully preserved, from candid smiles to grand celebrations. We blend creativity and professionalism to deliver timeless memories.'
  },
  {
    title: 'Model Shoots',
    image: serviceImage('model'),
    short: 'Professional model portfolios and creative shoots.',
    details: 'Whether you are a new or experienced model, our shoots are tailored to highlight your best features and unique style. We provide direction, styling, and a fun, relaxed environment.'
  },
  {
    title: 'Portfolio Creation',
    image: serviceImage('portfolio'),
    short: 'Build a stunning portfolio for your career.',
    details: 'We help you create a diverse and eye-catching portfolio, perfect for actors, artists, and professionals. Our team guides you through concepts, outfits, and poses for maximum impact.'
  },
  {
    title: 'Outdoor Sessions',
    image: serviceImage('outdoor'),
    short: 'Natural light, beautiful locations, unforgettable photos.',
    details: 'Enjoy a photoshoot in scenic outdoor locations. We use natural light and creative compositions to capture your personality and the beauty of the environment.'
  },
  {
    title: 'Baby Shoots',
    image: serviceImage('baby'),
    short: 'Adorable moments, forever memories.',
    details: 'Capture the precious early days of your baby with our gentle, creative, and safe baby photography sessions. We create a relaxed environment to ensure beautiful, heartwarming images.'
  }
];

// Curated carousel for the Gallery section: hero shots plus one cover per service.
// Deliberately small — everything else loads on demand from the category grids.
export const galleryImages = [...heroSlides, ...services.map((s) => s.image)].filter(Boolean);

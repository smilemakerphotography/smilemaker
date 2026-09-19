// Single place that knows how photos are organised under ./images.
// One folder per area; any filename works. Photos are shown in filename
// order, so prefix with 01-, 02-, ... to control ordering.
//
//   images/hero/        homepage slideshow
//   images/<service>/   photos for that service (wedding, model, portfolio, outdoor, baby)
//   images/<service>/cover.*   the service card image (falls back to the first photo)
//
// Owner-facing instructions live in ADMIN-GUIDE.md at the repo root.
const ctx = require.context('./images', true, /\.(jpe?g|png|webp|gif)$/i);

const folder = (name) =>
  ctx
    .keys()
    .filter((key) => key.startsWith(`./${name}/`))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

const isCover = (key) => /\/cover\.[a-z]+$/i.test(key);

export const photosIn = (name) => folder(name).filter((k) => !isCover(k)).map(ctx);
export const coverOf = (name) => {
  const keys = folder(name);
  const key = keys.find(isCover) || keys[0];
  return key ? ctx(key) : undefined;
};

export const heroSlides = photosIn('hero');

export const services = [
  {
    id: 'wedding',
    title: 'Wedding Photography',
    short: 'Capturing your special day with elegance and emotion.',
    details: 'Our wedding photography service ensures every magical moment is beautifully preserved, from candid smiles to grand celebrations. We blend creativity and professionalism to deliver timeless memories.'
  },
  {
    id: 'model',
    title: 'Model Shoots',
    short: 'Professional model portfolios and creative shoots.',
    details: 'Whether you are a new or experienced model, our shoots are tailored to highlight your best features and unique style. We provide direction, styling, and a fun, relaxed environment.'
  },
  {
    id: 'portfolio',
    title: 'Portfolio Creation',
    short: 'Build a stunning portfolio for your career.',
    details: 'We help you create a diverse and eye-catching portfolio, perfect for actors, artists, and professionals. Our team guides you through concepts, outfits, and poses for maximum impact.'
  },
  {
    id: 'outdoor',
    title: 'Outdoor Sessions',
    short: 'Natural light, beautiful locations, unforgettable photos.',
    details: 'Enjoy a photoshoot in scenic outdoor locations. We use natural light and creative compositions to capture your personality and the beauty of the environment.'
  },
  {
    id: 'baby',
    title: 'Baby Shoots',
    short: 'Adorable moments, forever memories.',
    details: 'Capture the precious early days of your baby with our gentle, creative, and safe baby photography sessions. We create a relaxed environment to ensure beautiful, heartwarming images.'
  }
].map((s) => ({ ...s, image: coverOf(s.id) }));

export const categoryPhotos = (service) => photosIn(service.id);

// Curated carousel for the Gallery section: hero shots plus one cover per service.
// Deliberately small — everything else loads on demand from the category grids.
export const galleryImages = [...heroSlides, ...services.map((s) => s.image)].filter(Boolean);

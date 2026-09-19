import { render, screen } from '@testing-library/react';
import App from './App';

// require.context is a webpack feature; jest doesn't have it.
jest.mock('./images', () => ({
  heroSlides: ['hero1.webp'],
  galleryImages: ['hero1.webp', 'service-wedding.webp'],
  categoryPhotos: () => [],
  services: [
    { id: 'wedding', title: 'Wedding Photography', image: 'service-wedding.webp', short: 'short', details: 'details' },
  ],
}));

test('renders the main sections', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /^service$/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /gallery/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument();
});

test('renders a service card that opens its details', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /view details for wedding photography/i })).toBeInTheDocument();
});

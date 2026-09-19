import React, { useEffect, useState } from 'react';
import { galleryImages, services } from './images';
import Lightbox from './components/Lightbox';
import PhotoGridPopup from './components/PhotoGridPopup';
import useOverlay from './hooks/useOverlay';
import './Gallery.css';

const INTERVAL_MS = 3000;
const VISIBLE = 5; // prev2, prev1, current, next1, next2

function CategoryPicker({ onPick, onClose }) {
  useOverlay({ onClose });
  return (
    <div className="overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="category-title">
      <div className="glass-panel dialog-panel category-panel" onClick={(e) => e.stopPropagation()}>
        <h3 id="category-title">Select Category</h3>
        <div className="dialog-actions">
          {services.map((svc, idx) => (
            <button key={svc.title} className="btn btn--primary" onClick={() => onPick(idx)} autoFocus={idx === 0}>
              {svc.title}
            </button>
          ))}
          <button className="btn btn--link" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function Gallery() {
  const [current, setCurrent] = useState(0);
  const [zoom, setZoom] = useState(null);
  const [picking, setPicking] = useState(false);
  const [category, setCategory] = useState(null);
  const total = galleryImages.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // Auto-advance, paused while any popup is open.
  const paused = zoom !== null || picking || category !== null;
  useEffect(() => {
    if (paused || total < 2) return undefined;
    const timer = setTimeout(next, INTERVAL_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, paused, total]);

  return (
    <section id="gallery" className="gallery-section">
      <h1 className="gallery-title">Gallery</h1>

      <div className="gallery-carousel" aria-roledescription="carousel" aria-label="Featured photos">
        {[...Array(Math.min(VISIBLE, total))].map((_, i) => {
          const offset = i - Math.floor(VISIBLE / 2);
          const idx = (current + offset + total) % total;
          const isCenter = offset === 0;
          return (
            <button
              key={idx}
              className={`gallery-slide${isCenter ? ' gallery-slide--center' : ''}`}
              style={{ '--offset': offset, zIndex: 10 - Math.abs(offset) }}
              onClick={() => (isCenter ? setZoom(idx) : setCurrent(idx))}
              aria-label={isCenter ? `Open photo ${idx + 1}` : `Show photo ${idx + 1}`}
              tabIndex={isCenter ? 0 : -1}
            >
              <img src={galleryImages[idx]} alt="" loading="lazy" decoding="async" />
            </button>
          );
        })}
      </div>

      <div className="gallery-controls">
        <button className="gallery-arrow" onClick={prev} aria-label="Previous photo">‹</button>
        <div className="gallery-dots" role="tablist" aria-label="Choose photo">
          {galleryImages.map((_, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={idx === current}
              aria-label={`Photo ${idx + 1}`}
              className={`gallery-dot${idx === current ? ' gallery-dot--active' : ''}`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
        <button className="gallery-arrow" onClick={next} aria-label="Next photo">›</button>
      </div>

      <button className="btn btn--primary gallery-more" onClick={() => setPicking(true)}>
        Browse by category
      </button>

      {zoom !== null && (
        <Lightbox images={galleryImages} start={zoom} title="Gallery" onClose={() => setZoom(null)} />
      )}
      {picking && (
        <CategoryPicker onPick={(idx) => { setCategory(idx); setPicking(false); }} onClose={() => setPicking(false)} />
      )}
      {category !== null && (
        <PhotoGridPopup service={services[category]} onClose={() => setCategory(null)} />
      )}
    </section>
  );
}

export default Gallery;

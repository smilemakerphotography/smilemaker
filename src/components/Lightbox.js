import React, { useCallback, useState } from 'react';
import useOverlay from '../hooks/useOverlay';
import './overlays.css';

// Full-screen photo viewer with prev/next. `images` is a list of srcs,
// `start` the index to open at.
export default function Lightbox({ images, start = 0, title = 'Photo', onClose }) {
  const [index, setIndex] = useState(start);
  const count = images.length;
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  useOverlay({ onClose, onPrev: count > 1 ? prev : undefined, onNext: count > 1 ? next : undefined });

  return (
    <div className="overlay overlay--dark" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${title} viewer`}>
      {count > 1 && (
        <button className="lightbox-nav lightbox-nav--prev" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); prev(); }}>‹</button>
      )}
      <img
        className="lightbox-img"
        src={images[index]}
        alt={`${title} ${index + 1} of ${count}`}
        onClick={(e) => e.stopPropagation()}
      />
      {count > 1 && (
        <button className="lightbox-nav lightbox-nav--next" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); next(); }}>›</button>
      )}
      <button className="overlay-close overlay-close--light" aria-label="Close" onClick={onClose} autoFocus>×</button>
    </div>
  );
}

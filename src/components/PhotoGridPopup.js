import React, { useState } from 'react';
import { categoryPhotos } from '../images';
import useOverlay from '../hooks/useOverlay';
import Lightbox from './Lightbox';
import './overlays.css';

// Grid of every photo in a service category; click one to open the Lightbox.
export default function PhotoGridPopup({ service, onClose }) {
  const photos = categoryPhotos(service);
  const [zoom, setZoom] = useState(null);
  useOverlay({ onClose });

  return (
    <>
      <div className="overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${service.title} photos`}>
        <div className="glass-panel photo-grid-panel" onClick={(e) => e.stopPropagation()}>
          <h2 className="photo-grid-title">{service.title} Photos</h2>
          <div className="photo-grid-scroll">
            {photos.length > 0 ? (
              <div className="photo-grid">
                {photos.map((src, i) => (
                  <button key={src} className="photo-grid-item" onClick={() => setZoom(i)} aria-label={`Open ${service.title} photo ${i + 1}`}>
                    <img src={src} alt="" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            ) : (
              <p className="photo-grid-empty">No photos available yet.</p>
            )}
          </div>
          <button className="overlay-close" aria-label="Close" onClick={onClose} autoFocus>×</button>
        </div>
      </div>
      {zoom !== null && (
        <Lightbox images={photos} start={zoom} title={service.title} onClose={() => setZoom(null)} />
      )}
    </>
  );
}

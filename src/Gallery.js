import React, { useState, useEffect, useRef } from 'react';
import { services, PhotoGridPopup } from './Service';

// Dynamically import all images in ./images
const importAll = (r) => r.keys().map(r);
const galleryImages = importAll(require.context('./images', false, /\.(jpe?g|png|webp|gif)$/));

function Gallery() {
  const [current, setCurrent] = useState(0);
  const [modal, setModal] = useState(null);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % galleryImages.length);
    }, 3000);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  useEffect(() => {
    const id = 'caveat-font';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <section id="gallery" className="gallery-section" style={{
      minHeight: 400,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f7f7f7',
      padding: '40px 0'
    }}>
      <h1 style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: 44 }}>Gallery</h1>

      {/* Image Carousel */}
      <div style={{
        position: 'relative',
        width: '90vw',
        maxWidth: 900,
        height: '45vw',
        maxHeight: 480,
        margin: '32px 0',
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {[...Array(5)].map((_, i) => {
          const total = galleryImages.length;
          const idx = (current + i - 2 + total) % total;
          const offset = i - 2;
          const scale = offset === 0 ? 1.18 : 0.8;
          const z = 10 - Math.abs(offset);
          const opacity = offset === 0 ? 1 : 0.5;

          return (
            <img
              key={idx}
              src={galleryImages[idx]}
              alt={`Gallery ${idx + 1}`}
              onClick={() => setModal(idx)}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '48vw',
                maxWidth: 480 * scale,
                height: '29vw',
                maxHeight: 290 * scale,
                objectFit: 'cover',
                borderRadius: 18,
                boxShadow: offset === 0
                  ? '0 8px 32px rgba(0,0,0,0.18)'
                  : '0 2px 8px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                transform: `translate(-50%, -50%) translateX(${offset * 16}vw) scale(${scale})`,
                zIndex: z,
                opacity,
                transition: 'all 0.6s cubic-bezier(.4,0,.2,1)'
              }}
            />
          );
        })}
      </div>

      {/* Arrow Buttons Below the Carousel */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 24
      }}>
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
          style={{
            border: 'none',
            borderRadius: '50%',
            width: 48,
            height: 48,
            backdropFilter: 'blur(10px)',
            background: 'rgba(255,255,255,0.2)',
            color: '#222',
            fontSize: 24,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transition: 'background 0.3s',
          }}
        >
          ‹
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % galleryImages.length)}
          style={{
            border: 'none',
            borderRadius: '50%',
            width: 48,
            height: 48,
            backdropFilter: 'blur(10px)',
            background: 'rgba(255,255,255,0.2)',
            color: '#222',
            fontSize: 24,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transition: 'background 0.3s',
          }}
        >
          ›
        </button>
      </div>

      {/* More Button */}
      <button
        style={{
          margin: '0 0 24px 0',
          padding: '12px 36px',
          borderRadius: 24,
          background: 'linear-gradient(135deg,#f5a623 70%,#f5d488 100%)',
          color: '#222',
          fontWeight: 700,
          fontSize: '1.1rem',
          border: 'none',
          boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)',
          cursor: 'pointer',
          transition: 'background 0.2s, color 0.2s',
        }}
        onClick={() => setShowCategoryPopup(true)}
      >
        more
      </button>

      {/* Modal View for Clicked Image */}
      {modal !== null && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(30,30,30,0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setModal(null)}
        >
          <img
            src={galleryImages[modal]}
            alt={`Large Gallery ${modal + 1}`}
            style={{
              maxWidth: '90vw',
              maxHeight: '80vh',
              borderRadius: 20,
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              background: '#fff',
            }}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}

      {/* Category Selection Popup */}
      {showCategoryPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.55)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setShowCategoryPopup(false)}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: 20,
              padding: 32,
              minWidth: 260,
              boxShadow: '0 8px 32px rgba(31,38,135,0.18)',
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              alignItems: 'center',
              position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            <h3 style={{ marginBottom: 12, fontWeight: 700, fontSize: 22, color: '#222' }}>
              Select Category
            </h3>
            {services.map((svc, idx) => (
              <button
                key={svc.title}
                style={{
                  width: 200,
                  padding: '10px 0',
                  borderRadius: 16,
                  background: '#f5a623',
                  color: '#222',
                  fontWeight: 600,
                  fontSize: '1rem',
                  border: 'none',
                  marginBottom: 4,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px #f5a62322',
                }}
                onClick={() => { setSelectedCategory(idx); setShowCategoryPopup(false); }}
              >
                {svc.title}
              </button>
            ))}
            <button
              onClick={() => setShowCategoryPopup(false)}
              style={{
                marginTop: 12,
                background: 'none',
                color: '#888',
                border: 'none',
                fontSize: 18,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Category Grid Photo Viewer */}
      {typeof selectedCategory === 'number' && (
        <PhotoGridPopup
          service={services[selectedCategory]}
          onClose={() => setSelectedCategory(null)}
          onPhotoClick={setSelectedPhoto}
        />
      )}

      {/* Large photo popup from category */}
      {selectedPhoto && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(30,30,30,0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 10001,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setSelectedPhoto(null)}
        >
          <img
            src={selectedPhoto}
            alt="Large view"
            style={{
              maxWidth: '90vw',
              maxHeight: '80vh',
              borderRadius: 20,
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              background: '#fff',
            }}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

export default Gallery;

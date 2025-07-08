import React from 'react';


import { useState, useEffect, useRef } from 'react';

const galleryImages = [
  require('./images/hero-slide1.jpg'),
  require('./images/hero-slide2.jpg'),
  require('./images/hero-slide3.jpg'),
  require('./images/service-wedding.jpeg'),
  require('./images/service-model.jpeg'),
  require('./images/service-portfolio.jpg'),
  require('./images/service-outdoor.jpg'),
];


function Gallery() {
  const [current, setCurrent] = useState(0);
  const [modal, setModal] = useState(null);
  const timeoutRef = useRef(null);
  // Drag code removed

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % galleryImages.length);
    }, 3000);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);


  React.useEffect(() => {
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
    <section id="gallery" className="gallery-section" style={{ minHeight: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f7f7f7', padding: '40px 0' }}>
      <h1 style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: 44 }}>Gallery</h1>
      <div
        style={{ position: 'relative', width: '90vw', maxWidth: 900, height: '45vw', maxHeight: 480, margin: '32px 0', overflow: 'visible', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {[...Array(5)].map((_, i) => {
          // Show 5 images in a circle: prev2, prev1, current, next1, next2
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
                boxShadow: offset === 0 ? '0 8px 32px rgba(0,0,0,0.18)' : '0 2px 8px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                transform: `translate(-50%, -50%) translateX(${offset * 16}vw) scale(${scale})`,
                zIndex: z,
                opacity,
                transition: 'all 0.6s cubic-bezier(.4,0,.2,1)',
              }}
            />
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {galleryImages.map((_, idx) => (
          <span
            key={idx}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: idx === current ? '#f5a623' : '#ccc',
              display: 'inline-block',
              cursor: 'pointer',
              border: idx === current ? '2px solid #f5a623' : '2px solid transparent',
              boxSizing: 'border-box',
            }}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to image ${idx + 1}`}
            tabIndex={0}
          />
        ))}
      </div>
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
    </section>
  );
}

export default Gallery;

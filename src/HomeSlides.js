import React, { useEffect, useRef, useState } from 'react';
import slide1 from './images/hero-slide1.jpg';
import slide2 from './images/hero-slide2.jpg';
import slide3 from './images/hero-slide3.jpg';
import './App.css';
import './HomeSlides.css';

const slides = [slide1, slide2, slide3];

function HomeSlides() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all images
  useEffect(() => {
    let loaded = 0;

    slides.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded === slides.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  // Start slideshow only after all images are loaded
  useEffect(() => {
    if (!imagesLoaded) return;

    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearTimeout(timeoutRef.current);
  }, [current, imagesLoaded]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;

  if (!imagesLoaded) {
    return (
      <div className="preloader">
        <p>Loading images...</p>
      </div>
    );
  }

  return (
    <section id="home" className="hero-slideshow" style={{ marginBottom: 0, paddingBottom: 0 }}>
      {slides.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Slide ${idx + 1}`}
          className={`slide-img${idx === current ? ' active' : ''}`}
        />
      ))}
      <div className="hero-overlay">
        <h1 style={{ fontSize: isMobile ? '2.1rem' : '3.2vw', lineHeight: isMobile ? 1.18 : 1.1, textAlign: 'center', color: '#fff', fontWeight: 900 }}>
          We Frame Emotions, Not<br />Just Faces
        </h1>
        <p style={{ fontSize: isMobile ? '1.08rem' : '1.5vw', color: '#f5d488', marginBottom: isMobile ? '1.2rem' : '2.5rem', textAlign: 'center', fontWeight: 600 }}>
          Wedding | Model | Portfolio | Outdoor Photography | Baby Shoots
        </p>
        <button
          style={{
            background: '#f5a623',
            color: '#222',
            fontWeight: 'bold',
            fontSize: isMobile ? '1.08rem' : '1.2rem',
            border: 'none',
            borderRadius: '6px',
            padding: isMobile ? '0.7rem 1.5rem' : '0.9rem 2.2rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
          }}
          onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })}
        >
          View Gallery
        </button>
      </div>
    </section>
  );
}

export default HomeSlides;

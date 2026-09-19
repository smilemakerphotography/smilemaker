import React, { useEffect, useState } from 'react';
import { heroSlides as slides } from './images';
import useIsMobile from './hooks/useIsMobile';
import './HomeSlides.css';

const INTERVAL_MS = 4000;

function HomeSlides() {
  const [current, setCurrent] = useState(0);
  const isMobile = useIsMobile();

  // Show slide 1 straight away; the crossfade only starts once the next
  // slide has actually arrived, so the user never sees a blank frame.
  useEffect(() => {
    if (slides.length < 2) return undefined;
    let cancelled = false;
    const nextIdx = (current + 1) % slides.length;
    const img = new Image();
    img.src = slides[nextIdx];
    const timer = setTimeout(() => {
      const advance = () => { if (!cancelled) setCurrent(nextIdx); };
      if (img.complete) advance();
      else { img.onload = advance; img.onerror = advance; }
    }, INTERVAL_MS);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [current]);

  return (
    <section id="home" className="hero-slideshow">
      {slides.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`slide-img${idx === current ? ' active' : ''}`}
          // First slide is the LCP element: fetch it first. Others can wait.
          fetchPriority={idx === 0 ? 'high' : 'low'}
          loading={idx === 0 ? 'eager' : 'lazy'}
          decoding="async"
        />
      ))}
      <div className="hero-overlay">
        <h1 className={`hero-title${isMobile ? ' hero-title--mobile' : ''}`}>
          We Frame Emotions, Not<br />Just Faces
        </h1>
        <p className={`hero-subtitle${isMobile ? ' hero-subtitle--mobile' : ''}`}>
          Wedding | Model | Portfolio | Outdoor Photography | Baby Shoots
        </p>
        <button
          className="hero-cta"
          onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
        >
          View Gallery
        </button>
      </div>
    </section>
  );
}

export default HomeSlides;

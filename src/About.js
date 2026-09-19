import React from 'react';
import { useEnquiry } from './EnquiryContext';
import './About.css';

const paragraphs = [
  <>At <b>Smile Maker Photography</b>, we believe photography is more than just capturing images — it’s about freezing moments, preserving emotions, and telling stories that last forever.</>,
  <>Specializing in portrait, event, and lifestyle photography, our work blends cinematic tones with a minimalist, natural-light style. Every frame is crafted with precision, creativity, and a focus on authenticity.</>,
  <>From vibrant weddings to brand shoots, we bring a fresh, refined aesthetic to every project. With an eye for detail and a commitment to quality, <b>Smile Maker Photography</b> transforms ordinary scenes into timeless visuals.</>,
  <>Whether you're looking to document a special day or build a visual identity for your brand, we’re here to deliver professional, story-driven imagery.</>,
];

function About() {
  const { goToContact } = useEnquiry();
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="about-section">
      <h1 className="about-title">About</h1>
      <div className="about-body">
        {paragraphs.map((text, i) => (
          <p key={i} className="about-row">
            <span className="about-icon" aria-hidden="true">📷</span>
            <span>{text}</span>
          </p>
        ))}
        <p className="about-row">
          <span className="about-icon" aria-hidden="true">📩</span>
          <span>
            Ready to capture your story?{' '}
            <a href="#gallery" className="about-link" onClick={scrollTo('gallery')}>View Our Work</a>
            <a href="#contact" className="about-link" onClick={(e) => { e.preventDefault(); goToContact(); }}>Get in Touch</a>
          </span>
        </p>
      </div>
    </section>
  );
}

export default About;

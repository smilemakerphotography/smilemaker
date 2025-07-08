import React from 'react';



function About() {
  React.useEffect(() => {
    const id = 'league-spartan-font';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=League+Spartan:wght@700&display=swap';
      document.head.appendChild(link);
    }
  }, []);
  // Responsive styles for mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
  return (
    <section
      id="about"
      style={{
        padding: isMobile ? '24px 0' : '40px 0',
        background: '#e5e5e5',
        borderRadius: 0,
        boxShadow: 'none',
        margin: isMobile ? '0 0 24px 0' : '0 0 40px 0',
        maxWidth: '100%',
        width: '100%',
        fontFamily: 'Caveat, cursive',
        fontWeight: 700,
        letterSpacing: 0.5,
        color: '#222',
      }}
    >
      <h1 style={{ fontFamily: 'inherit', fontWeight: 900, fontSize: isMobile ? 32 : 44, marginBottom: isMobile ? 8 : 12, textAlign: isMobile ? 'center' : 'left' }}>About</h1>
      <p style={{
        maxWidth: isMobile ? 340 : 900,
        margin: '0 auto',
        fontSize: isMobile ? '1.08rem' : '1.7rem',
        lineHeight: 1.4,
        fontFamily: '"League Spartan", sans-serif',
        fontWeight: 400,
        textAlign: isMobile ? 'center' : 'left',
        padding: isMobile ? '0 8px' : 0
      }}>
        At <b>Smile Maker Photography</b>, we believe photography is more than just capturing images — it’s about freezing moments, preserving emotions, and telling stories that last forever.<br /><br />
        Specializing in portrait, event, and lifestyle photography, our work blends cinematic tones with a minimalist, natural-light style. Every frame is crafted with precision, creativity, and a focus on authenticity.<br /><br />
        From vibrant weddings to brand shoots, we bring a fresh, refined aesthetic to every project. With an eye for detail and a commitment to quality, <b>Smile Maker Photography</b> transforms ordinary scenes into timeless visuals.<br /><br />
        Whether you're looking to document a special day or build a visual identity for your brand, we’re here to deliver professional, story-driven imagery.<br /><br />
        <span role="img" aria-label="mail">📩</span> Ready to capture your story?{' '}
        <a href="#gallery" style={{ color: '#f5a623', fontWeight: 'bold', textDecoration: 'none', marginRight: 16 }}>View Our Work</a>
        <a href="#contact" style={{ color: '#f5a623', fontWeight: 'bold', textDecoration: 'none' }}>Get in Touch</a>
      </p>
    </section>
  );
}

export default About;

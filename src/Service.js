import React, { useState } from 'react';
import './Service.css';

const services = [
  {
    title: 'Wedding Photography',
    image: require('./images/service-wedding.jpeg'),
    short: 'Capturing your special day with elegance and emotion.',
    details: 'Our wedding photography service ensures every magical moment is beautifully preserved, from candid smiles to grand celebrations. We blend creativity and professionalism to deliver timeless memories.'
  },
  {
    title: 'Model Shoots',
    image: require('./images/service-model.jpeg'),
    short: 'Professional model portfolios and creative shoots.',
    details: 'Whether you are a new or experienced model, our shoots are tailored to highlight your best features and unique style. We provide direction, styling, and a fun, relaxed environment.'
  },
  {
    title: 'Portfolio Creation',
    image: require('./images/service-portfolio.jpg'),
    short: 'Build a stunning portfolio for your career.',
    details: 'We help you create a diverse and eye-catching portfolio, perfect for actors, artists, and professionals. Our team guides you through concepts, outfits, and poses for maximum impact.'
  },
  {
    title: 'Outdoor Sessions',
    image: require('./images/service-outdoor.jpg'),
    short: 'Natural light, beautiful locations, unforgettable photos.',
    details: 'Enjoy a photoshoot in scenic outdoor locations. We use natural light and creative compositions to capture your personality and the beauty of the environment.'
  }
];

function Service() {
  const [hovered, setHovered] = useState(null);
  const [modal, setModal] = useState(null);

  // Helper to set shootType in contact form
  const handleEnquiry = (shootType) => {
    // Save shootType to sessionStorage so Contact can read it
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('autofillShootType', shootType);
    }
    window.location.href = '#contact';
    setModal(null);
  };

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
    <section id="service" className="service-section">
      <h1 className="service-title" style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: 44 }}>Service</h1>
      <p className="service-desc" style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: 24, marginBottom: 24 }}>Our main offerings</p>
      <div className="service-cards">
        {services.map((svc, idx) => (
          <div
            key={svc.title}
            className={`service-card glass ${hovered === idx ? 'hovered' : ''}`}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setModal(idx)}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${svc.title}`}
          >
        <img src={svc.image} alt={svc.title} className="service-img" style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: '16px 16px 0 0' }} />
            <div className="service-caption" style={{ fontWeight: 'bold' }}>{svc.title}</div>
            {hovered === idx && (
              <div className="service-popup">
                
                <p style={{ marginTop: 8 }}>{svc.short}</p>
                <span
                  className="service-popup-tip service-popup-btn"
                  style={{
                    display: 'inline-block',
                    marginTop: -10,
                    marginBottom: 8,
                    marginLeft: 0,
                    marginRight: 0,
                    alignSelf: 'flex-start',
                    padding: '6px 18px',
                    borderRadius: '18px',
                    background: 'rgba(20,20,20,0.85)',
                    boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >
                  more
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {modal !== null && (
        <div className="service-modal-bg" onClick={() => setModal(null)}>
          <div className="service-modal" onClick={e => e.stopPropagation()}>
            <img src={services[modal].image} alt={services[modal].title} className="service-modal-img" />
            <div className="service-modal-content" style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 200 }}>
              <h2>{services[modal].title}</h2>
              <p>{services[modal].details}</p>
              <button
                style={{
                  marginTop: 'auto',
                  alignSelf: 'flex-end',
                  padding: '10px 32px',
                  borderRadius: '24px',
                  background: 'rgba(20,20,20,0.85)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  border: 'none',
                  boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)',
                  cursor: 'pointer',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onClick={() => handleEnquiry(services[modal].title)}
              >
                Enquiry
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Service;

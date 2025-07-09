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
  },
  {
    title: 'Baby Shoots',
    image: require('./images/service-baby.jpg'),
    short: 'Adorable moments, forever memories.',
    details: 'Capture the precious early days of your baby with our gentle, creative, and safe baby photography sessions. We create a relaxed environment to ensure beautiful, heartwarming images.'
  }
];

function Service() {
  const [hovered, setHovered] = useState(null);
  const [modal, setModal] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  // Prevent background scroll when PhotoGridPopup is open
  React.useEffect(() => {
    if (typeof showMore === 'number') {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [showMore]);

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
            <div
              className="service-caption"
              style={{
                fontWeight: 'bold',
                position: 'relative',
                top: hovered === idx ? 0 : 50,
                transition: 'top 0.3s cubic-bezier(.4,2,.6,1)',
                zIndex: 2
              }}
            >
              {svc.title}
            </div>
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
                  onClick={e => { e.stopPropagation(); setShowMore(idx); }}
                >
                  more
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* More photos popup (grid) */}
      {typeof showMore === 'number' && (
        <PhotoGridPopup
          service={services[showMore]}
          onClose={() => setShowMore(false)}
          onPhotoClick={img => setSelectedPhoto(img)}
        />
      )}

      {/* Large photo popup (from grid) */}
      {selectedPhoto && (
        <div className="service-photo-bg" onClick={() => setSelectedPhoto(null)} style={{ position:'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(0,0,0,0.7)', zIndex: 10001, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <img src={selectedPhoto} alt="Large view" style={{ maxWidth:'90vw', maxHeight:'80vh', borderRadius:18, boxShadow:'0 8px 32px rgba(0,0,0,0.25)' }} />
        </div>
      )}

      {/* Service modal popup */}
      {modal !== null && (
        <div className="service-modal-bg" onClick={() => setModal(null)}>
          <div className="service-modal" onClick={e => e.stopPropagation()}>
            <img src={services[modal].image} alt={services[modal].title} className="service-modal-img" />
            <div className="service-modal-content" style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 200 }}>
              <h2 style={{marginBottom: 8}}>{services[modal].title}</h2>
              <p style={{marginBottom: 24}}>{services[modal].details}</p>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                marginTop: 'auto',
                width: '100%',
                alignItems: 'center',
              }}>
                <button
                  style={{
                    width: '100%',
                    maxWidth: 320,
                    padding: '10px 32px',
                    borderRadius: '24px',
                    background: 'rgba(255,255,255,0.18)',
                    color: '#222',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    border: '1.5px solid #fff3',
                    boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)',
                    cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s',
                    backdropFilter: 'blur(8px)',
                  }}
                  onClick={() => { setShowMore(modal); setModal(null); }}
                >
                  more
                </button>
                <button
                  style={{
                    width: '100%',
                    maxWidth: 320,
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
        </div>
      )}
    </section>
  );
}

// PhotoGridPopup component (must be outside Service)
function PhotoGridPopup({ service, onClose, onPhotoClick }) {
  return (
    <div className="service-more-bg" onClick={onClose} style={{ position: 'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(0,0,0,0.55)', zIndex: 10000, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div className="service-more-grid glass" onClick={e => e.stopPropagation()} style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.18)',
        borderRadius: 24,
        padding: 32,
        maxWidth: 900,
        width: '95vw',
        maxHeight: '80vh',
        boxShadow: '0 8px 32px rgba(31,38,135,0.18)',
        backdropFilter: 'blur(18px)',
        border: '1.5px solid #fff3',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        <h2 style={{marginBottom:24, color:'#222', fontWeight:700, fontSize:28, letterSpacing:1}}>{service.title} Photos</h2>
        <div style={{ width: '100%', flex: 1, minHeight: 0, maxHeight: '60vh', overflowY: 'auto', marginBottom: 12 }}>
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit, minmax(160px,1fr))',
            gap:12,
            width:'100%',
          }}>
            {
              (() => {
                const images = [];
                for (let i = 1; i <= 30; i++) {
                  try {
                    const img = require(`./images/${service.title.toLowerCase().replace(/ /g,'-')}-${i}.jpg`);
                    images.push(
                      <img
                        key={i}
                        src={img}
                        alt={service.title + ' ' + i}
                        style={{width:'100%', borderRadius:10, boxShadow:'0 1px 4px #0001', background:'#eee', display:'block', cursor:'pointer'}}
                        onClick={() => onPhotoClick(img)}
                      />
                    );
                  } catch (err) {
                    // Image does not exist, skip
                  }
                }
                if (images.length === 0) {
                  return <div style={{gridColumn:'1/-1', textAlign:'center', color:'#888', fontSize:18, padding:32}}>No photos available.</div>;
                }
                return images;
              })()
            }
          </div>
        </div>
        {/* Floating close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'linear-gradient(135deg,#f5a623 70%,#f5d488 100%)',
            color: '#222',
            fontWeight: 900,
            border: 'none',
            fontSize: 24,
            cursor: 'pointer',
            boxShadow: '0 2px 12px #f5a62322',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default Service;

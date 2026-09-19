import React, { useState } from 'react';
import { services } from './images';
import { useEnquiry } from './EnquiryContext';
import PhotoGridPopup from './components/PhotoGridPopup';
import useOverlay from './hooks/useOverlay';
import './Service.css';

function ServiceModal({ service, onMore, onEnquiry, onClose }) {
  useOverlay({ onClose });
  return (
    <div className="overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="service-modal-title">
      <div className="glass-panel dialog-panel" onClick={(e) => e.stopPropagation()}>
        <img src={service.image} alt="" />
        <h2 id="service-modal-title">{service.title}</h2>
        <p>{service.details}</p>
        <div className="dialog-actions">
          <button className="btn btn--ghost" onClick={onMore}>See more photos</button>
          <button className="btn btn--dark" onClick={onEnquiry} autoFocus>Enquiry</button>
        </div>
        <button className="overlay-close" aria-label="Close" onClick={onClose}>×</button>
      </div>
    </div>
  );
}

function Service() {
  const [hovered, setHovered] = useState(null);
  const [modal, setModal] = useState(null);
  const [showMore, setShowMore] = useState(null);
  const { goToContact } = useEnquiry();

  const activate = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <section id="service" className="service-section">
      <h1 className="service-title">Service</h1>
      <p className="service-desc">Our main offerings</p>
      <div className="service-cards">
        {services.map((svc, idx) => (
          <div
            key={svc.title}
            className={`service-card${hovered === idx ? ' hovered' : ''}`}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(idx)}
            onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setHovered(null); }}
            onClick={() => setModal(idx)}
            onKeyDown={(e) => activate(e, () => setModal(idx))}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${svc.title}`}
          >
            <img src={svc.image} alt="" loading="lazy" decoding="async" />
            <div className={`service-caption${hovered === idx ? ' service-caption--up' : ''}`}>
              {svc.title}
            </div>
            <div className={`service-popup${hovered === idx ? ' service-popup--open' : ''}`} aria-hidden={hovered !== idx}>
              <p>{svc.short}</p>
              <button
                className="btn btn--dark service-popup-btn"
                tabIndex={hovered === idx ? 0 : -1}
                onClick={(e) => { e.stopPropagation(); setShowMore(idx); }}
                onKeyDown={(e) => e.stopPropagation()}
              >
                more photos
              </button>
            </div>
          </div>
        ))}
      </div>

      {modal !== null && (
        <ServiceModal
          service={services[modal]}
          onClose={() => setModal(null)}
          onMore={() => { setShowMore(modal); setModal(null); }}
          onEnquiry={() => { goToContact(services[modal].title); setModal(null); }}
        />
      )}

      {showMore !== null && (
        <PhotoGridPopup service={services[showMore]} onClose={() => setShowMore(null)} />
      )}
    </section>
  );
}

export default Service;

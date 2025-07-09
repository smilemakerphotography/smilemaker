import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';

function Contact() {
  const [sending, setSending] = useState(false);
  const [dates, setDates] = useState(['']);
  const [shootType, setShootType] = useState('');
  const shootTypeRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('success'); // 'success' or 'error'

  const handleDateChange = (idx, value) => {
    setDates(dates => dates.map((d, i) => (i === idx ? value : d)));
  };
  const addDate = () => {
    setDates(dates => [...dates, '']);
  };
  const removeDate = idx => {
    setDates(dates => dates.length > 1 ? dates.filter((_, i) => i !== idx) : dates);
  };

  // Autofill shootType from sessionStorage if present
  // Autofill shootType from sessionStorage if present, and listen for hashchange
  useEffect(() => {
    const setAutofill = () => {
      if (typeof window !== 'undefined') {
        const autofill = window.sessionStorage.getItem('autofillShootType');
        if (autofill) {
          setShootType(autofill);
          if (shootTypeRef.current) {
            shootTypeRef.current.focus();
          }
          window.sessionStorage.removeItem('autofillShootType');
        }
      }
    };
    setAutofill();
    // Listen for hashchange and popstate to support in-page navigation and history
    window.addEventListener('hashchange', setAutofill);
    window.addEventListener('popstate', setAutofill);
    // Also run autofill if the section is scrolled into view (for single-page apps)
    const onScroll = () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setAutofill();
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('hashchange', setAutofill);
      window.removeEventListener('popstate', setAutofill);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

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

  // Responsive: optimize for mobile and align all textboxes
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
  const inputStyle = {
    width: '100%',
    minWidth: 0,
    maxWidth: '100%',
    padding: isMobile ? 10 : 12,
    borderRadius: 10,
    border: '1.5px solid #f5a62388',
    marginTop: 7,
    fontSize: isMobile ? '0.98rem' : '1rem',
    background: '#f7f7f7',
    outlineColor: '#f5a623',
    boxSizing: 'border-box',
    display: 'block',
  };
  const labelStyle = {
    fontWeight: 600,
    color: '#222',
    marginBottom: 0,
    width: '100%',
    display: 'block',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    const form = e.target;
    // Prepare date fields as a comma-separated string
    const dateString = dates.filter(Boolean).join(', ');
    const formData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      shootType: form.shootType.value,
      dates: dateString,
      location: form.location.value,
      details: form.details.value
    };
    emailjs.send('service_mo5rblx', 'template_4ylzxhk', formData, 'qxKPNzQuUeDmCJRPY')
      .then(() => {
        setSending(false);
        form.reset();
        setDates(['']);
        setPopupType('success');
        setPopupMessage('Thank you! Your message has been sent.');
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
      })
      .catch(() => {
        setSending(false);
        setPopupType('error');
        setPopupMessage('Failed to send. Please try again.');
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
      });
  };

  return (
    <section id="contact" className="contact-section" style={{ background: 'linear-gradient(135deg, #e5e5e5 60%, #f5a62322 100%)', padding: isMobile ? '24px 0' : '48px 0', minHeight: 400, width: '100%' }}>
      <h1 style={{ color: '#222', fontWeight: 700, letterSpacing: 1, marginBottom: 8, fontFamily: 'Caveat, cursive', fontSize: isMobile ? 32 : 44, textAlign: 'center' }}>Contact</h1>
      <p style={{ marginBottom: 32, color: '#444', fontSize: isMobile ? '1rem' : '1.1rem', textAlign: 'center' }}>We'd love to hear from you! Fill out the form below or reach us directly.</p>
      {/* Popup for success/error */}
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            background: popupType === 'success' ? 'linear-gradient(90deg,#d4fc79,#96e6a1)' : 'linear-gradient(90deg,#ffdde1,#ee9ca7)',
            color: popupType === 'success' ? '#222' : '#b71c1c',
            fontWeight: 700,
            fontSize: '1.08rem',
            borderRadius: 12,
            boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
            padding: '16px 32px',
            zIndex: 9999,
            minWidth: 220,
            textAlign: 'center',
            letterSpacing: 0.5,
            border: popupType === 'success' ? '2px solid #388e3c33' : '2px solid #d32f2f33',
            transition: 'opacity 0.3s',
          }}
        >
          {popupMessage}
        </div>
      )}
      <form className="contact-form" onSubmit={handleSubmit} style={{ maxWidth: isMobile ? 340 : 500, margin: '0 auto', background: 'rgba(255,255,255,0.95)', borderRadius: 20, boxShadow: '0 4px 32px 0 rgba(31,38,135,0.08)', padding: isMobile ? 18 : 36, display: 'flex', flexDirection: 'column', gap: 16, border: '1.5px solid #f5a62333', width: '100%' }}>
        <label style={labelStyle}>
          Full Name *
          <input type="text" name="name" required style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Email Address *
          <input type="email" name="email" required style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Phone Number
          <input type="tel" name="phone" style={{ ...inputStyle, border: '1.5px solid #f5a62333' }} />
        </label>
        <label style={labelStyle}>
          What kind of shoot?
          <select
            name="shootType"
            required
            style={inputStyle}
            value={shootType}
            onChange={e => setShootType(e.target.value)}
            ref={shootTypeRef}
          >
            <option value="">Select...</option>
            <option value="Wedding Photography">Wedding</option>
            <option value="Model Shoots">Model</option>
            <option value="Portfolio Creation">Portfolio</option>
            <option value="Outdoor Sessions">Outdoor</option>
            <option value="Baby Shoots">Baby Shoots</option>
            <option value="Maternity Photography">Maternity Photography</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label style={{ ...labelStyle, display: 'flex', flexDirection: 'column', gap: 8 }}>
          Preferred Date(s)
          {dates.map((date, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
              <input
                type="date"
                name={`date${idx}`}
                value={date}
                onChange={e => handleDateChange(idx, e.target.value)}
                style={{ ...inputStyle, border: '1.5px solid #f5a62333' }}
              />
              {dates.length > 1 && (
                <button type="button" onClick={() => removeDate(idx)} style={{ background: 'none', border: 'none', color: '#f5a623', fontWeight: 700, fontSize: 20, cursor: 'pointer', padding: 0, marginLeft: 2, lineHeight: 1 }} title="Remove date">×</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addDate} style={{ background: 'none', border: 'none', color: '#f5a623', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginTop: 2, alignSelf: 'flex-start' }}>+ Add another date</button>
        </label>
        <label style={labelStyle}>
          Location
          <input type="text" name="location" style={{ ...inputStyle, border: '1.5px solid #f5a62333' }} />
        </label>
        <label style={labelStyle}>
          Tell us about your session
          <textarea name="details" rows={4} style={{ ...inputStyle, border: '1.5px solid #f5a62333', resize: 'vertical' }} />
        </label>
        <button type="submit" disabled={sending} style={{ background: 'linear-gradient(90deg,#f5a623 70%,#f5d488 100%)', color: '#222', fontWeight: 700, fontSize: '1.1rem', border: 'none', borderRadius: 10, padding: '14px 0', marginTop: 10, cursor: sending ? 'not-allowed' : 'pointer', boxShadow: '0 2px 12px rgba(245,166,35,0.08)', letterSpacing: 1, transition: 'background 0.2s', opacity: sending ? 0.7 : 1 }}>
          {sending ? 'Sending...' : 'Submit'}
        </button>
      </form>
    </section>
  );
}
export default Contact;


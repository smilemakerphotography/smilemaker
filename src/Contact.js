import React, { useState } from 'react';

function Contact() {
  const [dates, setDates] = useState(['']);

  const handleDateChange = (idx, value) => {
    setDates(dates => dates.map((d, i) => (i === idx ? value : d)));
  };
  const addDate = () => {
    setDates(dates => [...dates, '']);
  };
  const removeDate = idx => {
    setDates(dates => dates.length > 1 ? dates.filter((_, i) => i !== idx) : dates);
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
    <section id="contact" className="contact-section" style={{ background: 'linear-gradient(135deg, #e5e5e5 60%, #f5a62322 100%)', padding: '48px 0', minHeight: 400, width: '100%' }}>
      <h1 style={{ color: '#222', fontWeight: 700, letterSpacing: 1, marginBottom: 8, fontFamily: 'Caveat, cursive', fontSize: 44 }}>Contact</h1>
      <p style={{ marginBottom: 32, color: '#444', fontSize: '1.1rem' }}>We'd love to hear from you! Fill out the form below or reach us directly.</p>
      <form className="contact-form" style={{ maxWidth: 500, margin: '0 auto', background: 'rgba(255,255,255,0.95)', borderRadius: 20, boxShadow: '0 4px 32px 0 rgba(31,38,135,0.08)', padding: 36, display: 'flex', flexDirection: 'column', gap: 20, border: '1.5px solid #f5a62333' }}>
        <label style={{ fontWeight: 600, color: '#222' }}>
          Full Name *
          <input type="text" name="name" required style={{ width: '100%', padding: 12, borderRadius: 10, border: '1.5px solid #f5a62388', marginTop: 7, fontSize: '1rem', background: '#f7f7f7', outlineColor: '#f5a623' }} />
        </label>
        <label style={{ fontWeight: 600, color: '#222' }}>
          Email Address *
          <input type="email" name="email" required style={{ width: '100%', padding: 12, borderRadius: 10, border: '1.5px solid #f5a62388', marginTop: 7, fontSize: '1rem', background: '#f7f7f7', outlineColor: '#f5a623' }} />
        </label>
        <label style={{ fontWeight: 600, color: '#222' }}>
          Phone Number
          <input type="tel" name="phone" style={{ width: '100%', padding: 12, borderRadius: 10, border: '1.5px solid #f5a62333', marginTop: 7, fontSize: '1rem', background: '#f7f7f7', outlineColor: '#f5a623' }} />
        </label>
        <label style={{ fontWeight: 600, color: '#222' }}>
          What kind of shoot?
          <select name="shootType" required style={{ width: '100%', padding: 12, borderRadius: 10, border: '1.5px solid #f5a62388', marginTop: 7, fontSize: '1rem', background: '#f7f7f7', outlineColor: '#f5a623' }}>
            <option value="">Select...</option>
            <option value="wedding">Wedding</option>
            <option value="model">Model</option>
            <option value="portfolio">Portfolio</option>
            <option value="outdoor">Outdoor</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label style={{ fontWeight: 600, color: '#222', display: 'flex', flexDirection: 'column', gap: 8 }}>
          Preferred Date(s)
          {dates.map((date, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="date"
                name={`date${idx}`}
                value={date}
                onChange={e => handleDateChange(idx, e.target.value)}
                style={{ width: '100%', padding: 12, borderRadius: 10, border: '1.5px solid #f5a62333', fontSize: '1rem', background: '#f7f7f7', outlineColor: '#f5a623' }}
              />
              {dates.length > 1 && (
                <button type="button" onClick={() => removeDate(idx)} style={{ background: 'none', border: 'none', color: '#f5a623', fontWeight: 700, fontSize: 20, cursor: 'pointer', padding: 0, marginLeft: 2, lineHeight: 1 }} title="Remove date">×</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addDate} style={{ background: 'none', border: 'none', color: '#f5a623', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginTop: 2, alignSelf: 'flex-start' }}>+ Add another date</button>
        </label>
        <label style={{ fontWeight: 600, color: '#222' }}>
          Location
          <input type="text" name="location" style={{ width: '100%', padding: 12, borderRadius: 10, border: '1.5px solid #f5a62333', marginTop: 7, fontSize: '1rem', background: '#f7f7f7', outlineColor: '#f5a623' }} />
        </label>
        <label style={{ fontWeight: 600, color: '#222' }}>
          Tell us about your session
          <textarea name="details" rows={4} style={{ width: '100%', padding: 12, borderRadius: 10, border: '1.5px solid #f5a62333', marginTop: 7, fontSize: '1rem', background: '#f7f7f7', outlineColor: '#f5a623', resize: 'vertical' }} />
        </label>
        <button type="submit" style={{ background: 'linear-gradient(90deg,#f5a623 70%,#f5d488 100%)', color: '#222', fontWeight: 700, fontSize: '1.1rem', border: 'none', borderRadius: 10, padding: '14px 0', marginTop: 10, cursor: 'pointer', boxShadow: '0 2px 12px rgba(245,166,35,0.08)', letterSpacing: 1, transition: 'background 0.2s' }}>
          Submit
        </button>
      </form>
    </section>
  );
}
export default Contact;


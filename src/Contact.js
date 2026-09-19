import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { services } from './images';
import { useEnquiry } from './EnquiryContext';
import './Contact.css';

// EmailJS identifiers are public by design (they ship in the bundle); restrict
// them in the EmailJS dashboard to this site's domain.
const EMAILJS = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
};

const shootOptions = [
  ...services.map((s) => ({ value: s.title, label: s.title.replace(/ (Photography|Shoots|Creation|Sessions)$/, '') })),
  { value: 'Maternity Photography', label: 'Maternity Photography' },
  { value: 'other', label: 'Other' },
];

function Contact() {
  const { shootType, setShootType } = useEnquiry();
  const shootTypeRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [dates, setDates] = useState(['']);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message }

  // When a service card's "Enquiry" button pre-selects a type, put focus on it.
  useEffect(() => {
    if (shootType) shootTypeRef.current?.focus({ preventScroll: true });
  }, [shootType]);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const handleDateChange = (idx, value) => setDates((d) => d.map((v, i) => (i === idx ? value : v)));
  const addDate = () => setDates((d) => [...d, '']);
  const removeDate = (idx) => setDates((d) => (d.length > 1 ? d.filter((_, i) => i !== idx) : d));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.website.value) return; // honeypot filled in: a bot, drop silently
    setSending(true);
    const formData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      shootType: form.shootType.value,
      dates: dates.filter(Boolean).join(', '),
      location: form.location.value,
      details: form.details.value,
    };
    try {
      await emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, formData, { publicKey: EMAILJS.publicKey });
      form.reset();
      setDates(['']);
      setShootType('');
      setToast({ type: 'success', message: 'Thank you! Your message has been sent.' });
    } catch {
      setToast({ type: 'error', message: 'Failed to send. Please try again or WhatsApp us.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <h1 className="contact-title">Contact</h1>
      <p className="contact-intro">We'd love to hear from you! Fill out the form below or reach us directly.</p>

      {toast && (
        <div className={`contact-toast contact-toast--${toast.type}`} role="status" aria-live="polite">
          {toast.message}
        </div>
      )}

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Full Name *
          <input type="text" name="name" required autoComplete="name" />
        </label>
        <label>
          Email Address *
          <input type="email" name="email" required autoComplete="email" />
        </label>
        <label>
          Phone Number
          <input type="tel" name="phone" autoComplete="tel" />
        </label>
        <label>
          What kind of shoot? *
          <select
            name="shootType"
            required
            value={shootType}
            onChange={(e) => setShootType(e.target.value)}
            ref={shootTypeRef}
          >
            <option value="">Select...</option>
            {shootOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </label>
        <fieldset className="contact-dates">
          <legend>Preferred Date(s)</legend>
          {dates.map((date, idx) => (
            <div key={idx} className="contact-date-row">
              <input
                type="date"
                aria-label={`Preferred date ${idx + 1}`}
                value={date}
                onChange={(e) => handleDateChange(idx, e.target.value)}
              />
              {dates.length > 1 && (
                <button type="button" className="contact-icon-btn" onClick={() => removeDate(idx)} aria-label={`Remove date ${idx + 1}`}>×</button>
              )}
            </div>
          ))}
          <button type="button" className="contact-text-btn" onClick={addDate}>+ Add another date</button>
        </fieldset>
        <label>
          Location
          <input type="text" name="location" />
        </label>
        <label>
          Tell us about your session
          <textarea name="details" rows={4} />
        </label>
        {/* Honeypot: hidden from people, bots tend to fill it */}
        <label className="contact-honeypot" aria-hidden="true">
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <button type="submit" className="btn btn--primary contact-submit" disabled={sending}>
          {sending ? 'Sending...' : 'Submit'}
        </button>
      </form>
    </section>
  );
}

export default Contact;

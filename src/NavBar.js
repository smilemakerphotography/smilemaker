import React, { useEffect, useState } from 'react';
import logo from './images/logo.png';
import './App.css';

const links = [
  ['home', 'Home'],
  ['about', 'About'],
  ['service', 'Service'],
  ['gallery', 'Gallery'],
  ['contact', 'Contact'],
];

const NAV_HEIGHT = 80;

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const handleLinkClick = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.getElementById(id);
    if (target) window.scrollTo({ top: target.offsetTop - NAV_HEIGHT, behavior: 'smooth' });
  };

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} aria-label="Main">
      <a href="#home" className="navbar__logo" onClick={handleLinkClick('home')}>
        <img src={logo} alt="Smile Maker Photography" className={`navbar__logo-img${scrolled ? ' navbar__logo-img--small' : ''}`} width="60" height="60" />
        {scrolled && (
          <span className="navbar__brand desktop-only" aria-hidden="true">
            <span className="navbar__brand-cap">S</span>mile{' '}
            <span className="navbar__brand-cap">M</span>aker{' '}
            <span className="navbar__brand-cap">P</span>hotography
          </span>
        )}
      </a>
      <div id="main-menu" className={`navbar__menu${menuOpen ? ' navbar__menu--open' : ''}`}>
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={handleLinkClick(id)}>{label}</a>
        ))}
      </div>
      <button
        className="navbar__toggle"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="main-menu"
      >
        <span className="navbar__hamburger" />
        <span className="navbar__hamburger" />
        <span className="navbar__hamburger" />
      </button>
    </nav>
  );
}

export default NavBar;

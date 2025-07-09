import React, { useState, useEffect } from 'react';
import logo from './images/logo.png'; // Adjust the path to your logo image


import './App.css';



function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = React.useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
        setHidden(true); // scrolling down
      } else {
        setHidden(false); // scrolling up
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const handleLinkClick = (e) => {
    setMenuOpen(false);
    // Smooth scroll
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80, // adjust for navbar height
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}${hidden ? ' navbar--hidden' : ''}`}> 
      <div className="navbar__logo">
        <img src={logo} alt="Logo" className={`navbar__logo-img${scrolled ? ' navbar__logo-img--small' : ''}`} style={{ transition: 'all 0.3s' }} />
        <span className="navbar__brand" style={{ transition: 'all 0.3s' }}></span>
      </div>
      <div className={`navbar__menu${menuOpen ? ' navbar__menu--open' : ''}`}> 
        <a href="#home" onClick={handleLinkClick}>Home</a>
        <a href="#about" onClick={handleLinkClick}>About</a>
        <a href="#service" onClick={handleLinkClick}>Service</a>
        <a href="#gallery" onClick={handleLinkClick}>Gallery</a>
        <a href="#contact" onClick={handleLinkClick}>Contact</a>
      </div>
      <button className="navbar__toggle" onClick={handleMenuToggle} aria-label="Toggle menu" style={{ background: 'none', border: 'none', padding: 0, marginLeft: 8, cursor: 'pointer' }}>
        <span className="navbar__hamburger" style={{ background: '#f5a623' }}></span>
        <span className="navbar__hamburger" style={{ background: '#f5a623' }}></span>
        <span className="navbar__hamburger" style={{ background: '#f5a623' }}></span>
      </button>
    </nav>
  );
}

export default NavBar;

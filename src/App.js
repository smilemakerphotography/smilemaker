import React from 'react';
<<<<<<< HEAD
=======

>>>>>>> 6d36a3b (inital push)
import './App.css';
import './smilemaker.css';
import HomeSlides from './HomeSlides';
import NavBar from './NavBar';
import About from './About';
import Service from './Service';
import Contact from './Contact';
import Gallery from './Gallery';

// Google Fonts: Caveat
if (!document.getElementById('caveat-font')) {
  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@700;900&display=swap';
  fontLink.rel = 'stylesheet';
  fontLink.id = 'caveat-font';
  document.head.appendChild(fontLink);
}


function Footer() {
  return (
    <footer style={{
      width: '100%',
      background: 'linear-gradient(90deg,#f5a623 60%,#f5d488 100%)',
      color: '#222',
      fontWeight: 600,
      fontSize: '1.1rem',
      textAlign: 'center',
      padding: '24px 0 12px 0',
      letterSpacing: 1,
      marginTop: 0,
      boxShadow: '0 -2px 16px rgba(0,0,0,0.04)'
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: 'Caveat, cursive', fontSize: 32, color: '#222', fontWeight: 900 }}>Smile Maker Photography</span>
        <span style={{ fontSize: 15, color: '#333', fontWeight: 500 }}>Capturing Emotions, Creating Memories</span>
        <span style={{ fontSize: 14, color: '#444', marginTop: 6 }}>
          &copy; {new Date().getFullYear()} Smile Maker Photography. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* Main content sections */}
      <HomeSlides />
      <About />
      <Service />

      <Gallery/>  
      <Contact/>  

      <Footer />
    </div>
  );
}

export default App;
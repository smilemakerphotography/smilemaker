import React from 'react';
import './App.css';
import { EnquiryProvider } from './EnquiryContext';
import HomeSlides from './HomeSlides';
import NavBar from './NavBar';
import About from './About';
import Service from './Service';
import Contact from './Contact';
import Gallery from './Gallery';

function Footer() {
  return (
    <footer className="site-footer">
      <span className="site-footer__brand">Smile Maker Photography</span>
      <span className="site-footer__tagline">Capturing Emotions, Creating Memories</span>
      <span className="site-footer__copy">
        &copy; {new Date().getFullYear()} Smile Maker Photography. All rights reserved.
      </span>
    </footer>
  );
}

function App() {
  return (
    <EnquiryProvider>
      <div className="App">
        <NavBar />
        <main>
          <HomeSlides />
          <About />
          <Service />
          <Gallery />
          <Contact />
        </main>
        <Footer />
      </div>
    </EnquiryProvider>
  );
}

export default App;

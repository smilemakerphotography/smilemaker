document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for "View Gallery" button
  const viewGalleryBtn = document.querySelector('.hero .btn[href="#gallery"]');
  if (viewGalleryBtn) {
    viewGalleryBtn.addEventListener('click', event => {
      event.preventDefault();
      const targetSection = document.getElementById('gallery');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Smooth scroll for all internal nav links
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Hamburger menu toggle
  const toggleButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleButton && navLinks) {
    toggleButton.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Fade-in sections on scroll using IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });

  // Close nav menu on window resize (desktop)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  });
});

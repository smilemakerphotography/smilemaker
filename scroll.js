document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for View Gallery button
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

    // Smooth scroll for nav links
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

    // Hamburger toggle
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
});

// Section fade-in on scroll
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
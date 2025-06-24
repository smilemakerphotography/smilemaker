document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll for "View Gallery" button
    const viewGalleryBtn = document.querySelector('.hero .btn[href="#gallery"]');

    if (viewGalleryBtn) {
        viewGalleryBtn.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Smooth scroll for other anchor links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // === Hamburger Menu Toggle ===
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('nav.mobile-nav');

    if (toggleButton && mobileNav) {
        toggleButton.addEventListener('click', function () {
            mobileNav.classList.toggle('active');
            toggleButton.classList.toggle('active'); // For hamburger animation
        });
    }
});

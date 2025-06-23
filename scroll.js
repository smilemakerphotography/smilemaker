document.addEventListener('DOMContentLoaded', function() {
    // Select the "View Gallery" button
    const viewGalleryBtn = document.querySelector('.hero .btn[href="#gallery"]');

    // Add a click event listener to the button
    if (viewGalleryBtn) {
        viewGalleryBtn.addEventListener('click', function(event) {
            // Prevent the default jump-to-anchor behavior
            event.preventDefault();

            // Get the target section's ID from the href attribute
            const targetId = this.getAttribute('href').substring(1); // Removes the '#'
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Use smooth scroll behavior
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Aligns the top of the element with the top of the viewport
                });
            }
        });
    }

    // Optional: Make other internal navigation links also smooth scroll
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
});
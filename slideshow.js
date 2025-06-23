document.addEventListener('DOMContentLoaded', function() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    const images = [
        'slides/hero-slide1.jpg', // Replace with your image paths
        'slides/hero-slide2.jpg',
        'slides/hero-slide3.jpg'
        // Add more image paths as needed
    ];

    let currentImageIndex = 0;

    // Preload images and create image elements
    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = "Hero Slideshow Image";
        slideshowContainer.appendChild(img);
    });

    const slideshowImages = slideshowContainer.querySelectorAll('img');

    function showSlides() {
        // Hide all images
        slideshowImages.forEach(img => {
            img.classList.remove('active');
        });

        // Show the current image
        slideshowImages[currentImageIndex].classList.add('active');

        // Move to the next image, loop back if at the end
        currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;

        // Change image every 5 seconds (5000 milliseconds)
        setTimeout(showSlides, 5000);
    }

    // Start the slideshow after a short delay to ensure images are loaded
    if (slideshowImages.length > 0) {
        setTimeout(showSlides, 100); // Small delay to let images render
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const slideshowContainer = document.querySelector('.slideshow-container');
    const images = [
        'slides/hero-slide1.jpg',
        'slides/hero-slide2.jpg',
        'slides/hero-slide3.jpg'
    ];

    let currentImageIndex = 0;

    // Preload and append images
    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = "Hero Slideshow Image";
        slideshowContainer.appendChild(img);
    });

    const slideshowImages = slideshowContainer.querySelectorAll('img');

    const showSlides = () => {
        slideshowImages.forEach(img => img.classList.remove('active'));
        slideshowImages[currentImageIndex].classList.add('active');
        currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
        setTimeout(showSlides, 5000);
    };

    if (slideshowImages.length > 0) {
        setTimeout(showSlides, 100);
    }
});

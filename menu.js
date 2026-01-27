// 1. Shared Menu Injection
const menuHTML = `
    <ul>
        <li><a href="index.html"><strong>Garth Dew</strong></a></li>
        <br>
        <li><a href="index.html">Index</a></li>
        <li><a href="publications.html">Publications (CAN-DID)</a></li>
        <li><a href="studio.html">Studio</a></li>
        <li><a href="info.html">Information</a></li>
    </ul>
`;

document.addEventListener("DOMContentLoaded", function() {
    const navElement = document.getElementById('main-nav');
    if (navElement) navElement.innerHTML = menuHTML;

    // 2. Carousel Initialization
    const track = document.querySelector('.carousel-track');
    if (!track) return; // Exit if no carousel on page

    const container = document.querySelector('.carousel-container');
    const images = document.querySelectorAll('.carousel-image');
    let currentSlide = 0;

    // Create Custom Cursor Element
    const cursor = document.createElement('div');
    cursor.id = 'carousel-cursor';
    document.body.appendChild(cursor);

    function updateSlide() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function next() {
        currentSlide = (currentSlide + 1) % images.length;
        updateSlide();
    }

    function prev() {
        currentSlide = (currentSlide - 1 + images.length) % images.length;
        updateSlide();
    }

    // Mouse Interactions (Cursor Arrows)
    container.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        const rect = container.getBoundingClientRect();
        if (e.clientX - rect.left < rect.width / 2) {
            cursor.innerHTML = '←';
        } else {
            cursor.innerHTML = '→';
        }
    });

    container.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });

    container.addEventListener('click', (e) => {
        const rect = container.getBoundingClientRect();
        if (e.clientX - rect.left < rect.width / 2) prev();
        else next();
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
    });

    // Mobile Swipe Support
    let touchStartX = 0;
    container.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
    container.addEventListener('touchend', e => {
        let touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) next();
        if (touchEndX - touchStartX > 50) prev();
    });
});

// 1. Shared Menu & Footer Content
const menuHTML = `
    <ul>
        <li>
        <li><a href="index.html">Garth Dew</a></li>
        </li>
        <br>
        <li><a href="index.html">Index</a></li>
        <li><a href="publications.html">Publications (CAN-DID)</a></li>
        <li><a href="studio.html">Studio</a></li>
        <li><a href="information.html">Information</a></li>
    </ul>
    
    <a href="index.html" class="nav-icon">
        <img src="images/icon.png" alt="Home">
    </a>
`;

const footerHTML = `
    <ul class="footer-links">
        <li><a href="mailto:hello@garthdew.com">Email</a></li>
        <li><a href="https://instagram.com/garthdew" target="_blank">Instagram</a></li>
        <li><a href="#">Mailing List</a></li>
        <li>&copy; 2026 Garth Dew</li>
    </ul>
`;

// ... keep the rest of your DOMContentLoaded logic exactly as it is ...

document.addEventListener("DOMContentLoaded", function() {
    // Inject Menu
    const navElement = document.getElementById('main-nav');
    if (navElement) navElement.innerHTML = menuHTML;

    // Inject Footer
    const footerElement = document.getElementById('main-footer');
    if (footerElement) footerElement.innerHTML = footerHTML;

    // 2. Carousel & Cursor Logic
    const track = document.querySelector('.carousel-track');
    const container = document.querySelector('.carousel-container');
    if (track && container) {
        const images = document.querySelectorAll('.carousel-image');
        let currentSlide = 0;

        const cursor = document.createElement('div');
        cursor.id = 'carousel-cursor';
        document.body.appendChild(cursor);

        const updateSlide = () => {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
        };

        const next = () => {
            currentSlide = (currentSlide + 1) % images.length;
            updateSlide();
        };

        const prev = () => {
            currentSlide = (currentSlide - 1 + images.length) % images.length;
            updateSlide();
        };

        container.addEventListener('mousemove', (e) => {
            cursor.style.display = 'block';
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            const rect = container.getBoundingClientRect();
            cursor.innerHTML = (e.clientX - rect.left < rect.width / 2) ? '←' : '→';
        });

        container.addEventListener('mouseleave', () => cursor.style.display = 'none');
        container.addEventListener('click', (e) => {
            const rect = container.getBoundingClientRect();
            (e.clientX - rect.left < rect.width / 2) ? prev() : next();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        });

        // Swipe Support
        let touchStartX = 0;
        container.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
        container.addEventListener('touchend', e => {
            let touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) next();
            if (touchEndX - touchStartX > 50) prev();
        });
    }
});

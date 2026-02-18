// Shared Menu & Footer Content
const menuHTML = `
    <div class="logo">
        <a href="index.html">NOW IN FLOW</a>
    </div>
    <button class="hamburger" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
    </button>
    <ul class="nav-menu">
        <li><a href="index.html">Features</a></li>
        <li><a href="magazine.html">Magazine</a></li>
        <li><a href="pledge.html">Pledge</a></li>
        <li><a href="studio.html">Studio</a></li>
        <li><a href="about.html">About</a></li>
    </ul>
`;

const footerHTML = `
    <div class="footer-newsletter">
        <form 
            action="https://buttondown.com/api/emails/embed-subscribe/garthdew" 
            method="post" 
            class="embeddable-buttondown-form" 
            referrerpolicy="unsafe-url">
            <input 
                type="email" 
                name="email" 
                id="bd-email" 
                placeholder="Your email" 
                required>
            <input type="submit" value="Join mailing list">
        </form>
    </div>
    <div class="footer-right">
        <a href="mailto:hello@nowinflow.com">Email</a>
        <span>&copy; 2026 Now In Flow</span>
    </div>
`;

// Keep all your existing DOMContentLoaded logic
document.addEventListener("DOMContentLoaded", function() {
    const navElement = document.getElementById('main-nav');
    if (navElement) navElement.innerHTML = menuHTML;
    
    const footerElement = document.getElementById('main-footer');
    if (footerElement) footerElement.innerHTML = footerHTML;
    
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Keep all your carousel logic exactly as is...
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
        let touchStartX = 0;
        container.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
        container.addEventListener('touchend', e => {
            let touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) next();
            if (touchEndX - touchStartX > 50) prev();
        });
    }
});

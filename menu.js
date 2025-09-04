// Menu system for Garth Dew Portfolio
document.addEventListener('DOMContentLoaded', function() {
    const navigation = document.getElementById('navigation');
    
    // Create navigation HTML
    const navHTML = `
        <div class="nav-desktop">
            <a href="index.html">Original</a>
            <a href="commercial.html">Commercial</a>
            <a href="shop.html">Shop</a>
            <a href="about.html">About</a>
        </div>
        
        <div class="nav-mobile">
            <div class="hamburger" onclick="toggleMobileMenu()">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        
        <div class="mobile-menu" id="mobileMenu">
            <a href="index.html">Original</a>
            <a href="commercial.html">Commercial</a>
            <a href="shop.html">Shop</a>
            <a href="about.html">About</a>
        </div>
    `;
    
    navigation.innerHTML = navHTML;
});

// Toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close mobile menu when clicking on a link
document.addEventListener('click', function(e) {
    if (e.target.matches('.mobile-menu a')) {
        const mobileMenu = document.getElementById('mobileMenu');
        const hamburger = document.querySelector('.hamburger');
        
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    
    if (!e.target.closest('.nav-mobile') && !e.target.closest('.mobile-menu')) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Menu configuration - add new menu items here
const menuItems = [
    { name: 'Photographs', href: '/index.html' },
    { name: 'Books', href: '/books.html' },
    { name: 'Newsletter', href: '/newsletter.html' },
    { name: 'About', href: '/about.html' }
];

// Generate navigation HTML
function generateNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Desktop navigation
    const desktopNav = menuItems.map(item => {
        const fileName = item.href.split('/').pop();
        const activeClass = fileName === currentPage ? ' active' : '';
        return `<a href="${item.href}" class="nav-link${activeClass}">${item.name}</a>`;
    }).join('');
    
    // Mobile navigation
    const mobileNav = menuItems.map(item => 
        `<a href="${item.href}" onclick="toggleMobileMenu();">${item.name}</a>`
    ).join('');
    
    return { desktop: desktopNav, mobile: mobileNav };
}

// Insert navigation into page
function loadNavigation() {
    const nav = generateNavigation();
    
    // Insert desktop navigation
    const desktopNavContainer = document.querySelector('.nav-desktop');
    if (desktopNavContainer) {
        desktopNavContainer.innerHTML = nav.desktop;
    }
    
    // Insert mobile navigation
    const mobileNavContainer = document.querySelector('.mobile-nav-links');
    if (mobileNavContainer) {
        mobileNavContainer.innerHTML = nav.mobile;
    }
}

// Mobile menu toggle functionality
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(event.target) && 
        !hamburger.contains(event.target)) {
        toggleMobileMenu();
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadNavigation();
});

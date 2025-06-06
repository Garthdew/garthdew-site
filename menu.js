// menu.js - Add this to every page with <script src="menu.js"></script>
document.addEventListener('DOMContentLoaded', function() {
  // Create the menu HTML
  const menuHTML = `
    <!-- Hamburger Button (Mobile Only) -->
    <button class="hamburger" onclick="toggleMenu()">☰</button>
    
    <!-- Overlay (Mobile Only) -->
    <div class="overlay" onclick="closeMenu()"></div>
    
    <!-- Sidebar -->
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-header">Garth Dew</div>
      
      <div class="sidebar-section">
        <h3 class="section-toggle" onclick="toggleSection('info')">Info</h3>
        <ul class="sidebar-nav section-content" id="info" style="display: none;">
          <li><a href="/about">About/Contact</a></li>
        </ul>
      </div>
      
      <div class="sidebar-section">
        <h3 class="section-toggle" onclick="toggleSection('photography')">Photography</h3>
        <ul class="sidebar-nav section-content" id="photography" style="display: none;">
          <li><a href="/projects/prestonians">Prestonians</a></li>
          <li><a href="/projects/everyday">Everyday</a></li>
          <li><a href="/projects/festival">Festival</a></li>
          <li><a href="/projects/kalkan">Kalkan</a></li>
        </ul>
      </div>
      
      <div class="sidebar-section">
        <h3 class="section-toggle" onclick="toggleSection('film')">Film</h3>
        <ul class="sidebar-nav section-content" id="film" style="display: none;">
          <li><a href="/projects/headabovewater">Head Above Water</a></li>
          <li><a href="/projects/fixedbythefells">Fixed by the Fells</a></li>
          <li><a href="/projects/workhardkeeppushing">Work Hard Keep Pushing</a></li>
          <li><a href="/projects/ridefor24">Ride for 24</a></li>
        </ul>
      </div>
      
      <div class="sidebar-section">
        <h3 class="section-toggle" onclick="toggleSection('music')">Music</h3>
        <ul class="sidebar-nav section-content" id="music" style="display: none;">
          <li><a href="/projects/flow">And Then, It Flowed</a></li>
          <li><a href="/projects/mellowpond">The Mellow Pond</a></li>
          <li><a href="/projects/graverthan">Graver Than</a></li>
          <li><a href="/projects/watermyfriend">Water My Friend</a></li>
          <li><a href="/projects/mindlessness">Mindlessness</a></li>
        </ul>
      </div>
      
    <div class="sidebar-section">
        <h3 class="section-toggle" onclick="toggleSection('brand')">Commissions</h3>
        <ul class="sidebar-nav section-content" id="brand" style="display: none;">
          <li><a href="/projects/neve">Neve</a></li>
          <li><a href="/projects/skiddle">Skiddle</a></li>
          <li><a href="/projects/volvo">Volvo</a></li>
          <li><a href="/projects/speedo">Speedo</a></li>
          <li><a href="/projects/salomon">Salomon</a></li>
          <li><a href="/projects/ellisbrigham">Ellis Brigham</a></li>
          <li><a href="/projects/lythamfestival">Lytham Festival</a></li>
          <li><a href="/projects/arla">Arla</a></li>
        </ul>
      </div>
    </nav>
  `;
  
  // Insert menu at the beginning of body
  document.body.insertAdjacentHTML('afterbegin', menuHTML);
  
  // Wrap existing content in layout structure
  const existingContent = document.body.innerHTML.replace(menuHTML, '');
  document.body.innerHTML = `
    <div class="layout-wrapper">
      ${menuHTML}
      <main class="main-content">
        ${existingContent}
      </main>
    </div>
  `;
  
  // Auto-open the correct section based on current page
  openCurrentSection();
});

// Function to auto-open the correct menu section based on current page
function openCurrentSection() {
  const currentPath = window.location.pathname;
  
  // Get all menu links and find which section the current page belongs to
  const sections = ['info', 'photography', 'film', 'music', 'brand'];
  
  for (const sectionId of sections) {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      const links = sectionElement.querySelectorAll('a');
      
      // Check if current page matches any link in this section
      for (const link of links) {
        const linkPath = link.getAttribute('href');
        if (currentPath === linkPath || 
            currentPath === linkPath + '.html' || 
            currentPath + '.html' === linkPath ||
            (linkPath === '/index' && (currentPath === '/' || currentPath === '/index'))) {
          sectionElement.style.display = 'block';
          return; // Found the section, stop looking
        }
      }
    }
  }
}

// Menu Functions
function toggleMenu() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.querySelector('.overlay');
  
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
}

function closeMenu() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.querySelector('.overlay');
  
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
}

// Section Toggle Function
function toggleSection(sectionId) {
  // Close all other sections first
  const allSections = document.querySelectorAll('.section-content');
  allSections.forEach(section => {
    if (section.id !== sectionId) {
      section.style.display = 'none';
    }
  });
  
  // Toggle the clicked section
  const section = document.getElementById(sectionId);
  const isVisible = section.style.display !== 'none';
  
  if (isVisible) {
    section.style.display = 'none';
  } else {
    section.style.display = 'block';
  }
}

// Close menu on escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeMenu();
  }
});

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
        <h3>Photography</h3>
        <ul class="sidebar-nav">
          <li><a href="/moments-preston.html">Moments: Preston</a></li>
          <li><a href="/moments-kalkan.html">Moments: Kalkan</a></li>
          <li><a href="/photo-stream.html">Photo Stream</a></li>
        </ul>
      </div>

      <div class="sidebar-section">
        <h3>Music</h3>
        <ul class="sidebar-nav">
          <li><a href="/music-recent.html">Recent Work</a></li>
          <li><a href="/music-archive.html">Archive</a></li>
        </ul>
      </div>

      <div class="sidebar-section">
        <h3>Commercial</h3>
        <ul class="sidebar-nav">
          <li><a href="/commercial-film.html">Film</a></li>
          <li><a href="/commercial-photo.html">Photography</a></li>
        </ul>
      </div>

      <div class="sidebar-section">
        <h3>Info</h3>
        <ul class="sidebar-nav">
          <li><a href="/about.html">About</a></li>
          <li><a href="/contact.html">Contact</a></li>
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
});

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

// Close menu on escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeMenu();
  }
});

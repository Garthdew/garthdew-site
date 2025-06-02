// gallery.js - Reusable gallery system
// Save this file as /gallery.js in your root directory
document.addEventListener('DOMContentLoaded', function() {
  const galleryContainer = document.getElementById('gallery-container');
  if (!galleryContainer) return;
  
  const images = JSON.parse(galleryContainer.dataset.images);
  const altPrefix = galleryContainer.dataset.altPrefix || 'Image';
  
  // Generate the gallery HTML
  const galleryHTML = `
    <!-- Thumbnail Grid (shown initially) -->
    <div class="thumbnail-grid" id="thumbnailGrid">
      ${images.map((src, index) => `
        <div class="thumbnail" onclick="openCarousel(${index})">
          <img src="${src}" alt="${altPrefix} ${index + 1}">
        </div>
      `).join('')}
    </div>

    <!-- Carousel (hidden initially) -->
    <div class="carousel" id="carousel">
      <button class="fullscreen-btn" onclick="toggleFullscreen()" title="Toggle fullscreen">⛶</button>
      <div class="carousel-clickable left" onclick="moveSlide(-1)"></div>
      <div class="carousel-clickable right" onclick="moveSlide(1)"></div>
      <div class="carousel-track">
        ${images.map((src, index) => `
          <div class="carousel-slide">
            <img src="${src}" alt="${altPrefix} moment ${index + 1}">
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Photo Stream (Mobile Only) -->
    <div class="photo-stream">
      ${images.map((src, index) => `
        <img src="${src}" alt="${altPrefix} ${index + 1}">
      `).join('')}
    </div>
  `;
  
  galleryContainer.innerHTML = galleryHTML;
  
  // Gallery functionality
  let currentSlide = 0;
  const slides = document.querySelectorAll('.carousel-slide');
  const totalSlides = slides.length;

  window.openCarousel = function(slideIndex) {
    currentSlide = slideIndex;
    document.getElementById('thumbnailGrid').style.display = 'none';
    document.getElementById('carousel').classList.add('show');
    document.querySelector('.gallery-nav').classList.add('show');
    showSlide(currentSlide);
    handleImageLoad();
  };

  window.showThumbnails = function() {
    document.getElementById('thumbnailGrid').style.display = 'grid';
    document.getElementById('carousel').classList.remove('show');
    document.querySelector('.gallery-nav').classList.remove('show');
  };

  function handleImageLoad() {
    const images = document.querySelectorAll('.carousel-slide img');
    images.forEach(img => {
      img.onload = function() {
        if (this.naturalHeight > this.naturalWidth) {
          this.classList.add('portrait');
        }
      };
      if (img.complete && img.naturalHeight > 0) {
        if (img.naturalHeight > img.naturalWidth) {
          img.classList.add('portrait');
        }
      }
    });
  }

  function showSlide(n) {
    if (n >= totalSlides) currentSlide = 0;
    if (n < 0) currentSlide = totalSlides - 1;
    
    const track = document.querySelector('.carousel-track');
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  window.moveSlide = function(direction) {
    currentSlide += direction;
    showSlide(currentSlide);
  };

  window.toggleFullscreen = function() {
    const carousel = document.getElementById('carousel');
    if (!document.fullscreenElement) {
      carousel.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Touch/swipe support
  const carousel = document.querySelector('.carousel');
  let startX = 0;
  let endX = 0;
  
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchmove', (e) => {
    e.preventDefault();
  });

  carousel.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        moveSlide(1);
      } else {
        moveSlide(-1);
      }
    }
  }

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (document.getElementById('carousel').classList.contains('show')) {
      if (e.key === 'ArrowLeft') {
        moveSlide(-1);
      } else if (e.key === 'ArrowRight') {
        moveSlide(1);
      } else if (e.key === 'Escape') {
        showThumbnails();
      }
    }
  });

  // Initialize
  handleImageLoad();
});

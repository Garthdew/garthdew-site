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
    <div class="thumbnail-grid" id="thumbnailGrid" style="grid-template-columns: repeat(${Math.min(images.length, 6)}, 1fr);">
      ${images.map((src, index) => `
        <div class="thumbnail" onclick="openCarousel(${index})">
          <img src="${src}" alt="${altPrefix} ${index + 1}" onload="handleThumbnailLoad(this)">
        </div>
      `).join('')}
    </div>

    <!-- Carousel (hidden initially) -->
    <div class="carousel" id="carousel">
      <div class="carousel-track">
        ${images.map((src, index) => `
          <div class="carousel-slide">
            <img src="${src}" alt="${altPrefix} moment ${index + 1}">
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Photo Stream (Mobile Only) -->
    <div class="photo-stream" style="display: none;">
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
    // Hide thumbnails and heading/text when entering carousel
    document.getElementById('thumbnailGrid').style.display = 'none';
    document.querySelector('.content-area').style.display = 'none';
    document.getElementById('carousel').classList.add('show');
    document.querySelector('.gallery-nav').classList.add('show');
    showSlide(currentSlide);
    handleImageLoad();
  };

  window.showThumbnails = function() {
    // Show thumbnails and heading/text when exiting carousel
    document.getElementById('thumbnailGrid').style.display = 'grid';
    document.querySelector('.content-area').style.display = 'block';
    document.getElementById('carousel').classList.remove('show');
    document.querySelector('.gallery-nav').classList.remove('show');
  };

  // Handle thumbnail image loading and classification
  window.handleThumbnailLoad = function(img) {
    if (img.naturalHeight > img.naturalWidth) {
      img.classList.add('thumb-portrait');
      img.parentElement.classList.add('thumb-portrait-container');
    } else {
      img.classList.add('thumb-landscape');
      img.parentElement.classList.add('thumb-landscape-container');
    }
  };

  function handleImageLoad() {
    const images = document.querySelectorAll('.carousel-slide img');
    images.forEach(img => {
      img.onload = function() {
        if (this.naturalHeight > this.naturalWidth) {
          this.classList.add('portrait');
          // Force left alignment for portrait images - with !important to override CSS
          this.parentElement.style.setProperty('justify-content', 'flex-start', 'important');
          this.parentElement.style.setProperty('align-items', 'center', 'important');
          this.parentElement.style.setProperty('display', 'flex', 'important');
          this.style.setProperty('margin-left', '0', 'important');
          this.style.setProperty('margin-right', 'auto', 'important');
        } else {
          // Landscape images - also left align for consistency
          this.parentElement.style.setProperty('justify-content', 'flex-start', 'important');
          this.parentElement.style.setProperty('align-items', 'center', 'important');
          this.parentElement.style.setProperty('display', 'flex', 'important');
          this.style.setProperty('margin-left', '0', 'important');
          this.style.setProperty('margin-right', 'auto', 'important');
        }
      };
      if (img.complete && img.naturalHeight > 0) {
        if (img.naturalHeight > img.naturalWidth) {
          img.classList.add('portrait');
          // Force left alignment for portrait images - with !important to override CSS
          img.parentElement.style.setProperty('justify-content', 'flex-start', 'important');
          img.parentElement.style.setProperty('align-items', 'center', 'important');
          img.parentElement.style.setProperty('display', 'flex', 'important');
          img.style.setProperty('margin-left', '0', 'important');
          img.style.setProperty('margin-right', 'auto', 'important');
        } else {
          // Landscape images - also left align for consistency
          img.parentElement.style.setProperty('justify-content', 'flex-start', 'important');
          img.parentElement.style.setProperty('align-items', 'center', 'important');
          img.parentElement.style.setProperty('display', 'flex', 'important');
          img.style.setProperty('margin-left', '0', 'important');
          img.style.setProperty('margin-right', 'auto', 'important');
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
    // Fullscreen functionality removed as requested
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

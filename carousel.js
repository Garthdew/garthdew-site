
document.addEventListener('DOMContentLoaded', function() {
  const carouselContainer = document.getElementById('carousel-container');
  if (!carouselContainer) return;
  
  const images = JSON.parse(carouselContainer.dataset.images);
  const altPrefix = carouselContainer.dataset.altPrefix || 'Image';
  
  // Generate the carousel HTML
  const carouselHTML = `
    <!-- Carousel (shown immediately) -->
    <div class="carousel show" id="carousel">
      <div class="carousel-track">
        ${images.map((src, index) => `
          <div class="carousel-slide">
            <img src="${src}" alt="${altPrefix} moment ${index + 1}">
          </div>
        `).join('')}
      </div>
      
      <!-- Click areas for navigation -->
      <div class="carousel-clickable left" onclick="moveSlide(-1)"></div>
      <div class="carousel-clickable right" onclick="moveSlide(1)"></div>
    </div>

    <!-- Navigation text (under the carousel) -->
    <div class="gallery-nav show">
      <button class="nav-button" onclick="moveSlide(-1)">Previous</button>
      <button class="nav-button" onclick="moveSlide(1)">Next</button>
      <span class="slide-counter" id="slideCounter">1 / ${images.length}</span>
    </div>

    <!-- Photo Stream (Mobile Only) -->
    <div class="photo-stream" style="display: none;">
      ${images.map((src, index) => `
        <img src="${src}" alt="${altPrefix} ${index + 1}">
      `).join('')}
    </div>
  `;
  
  carouselContainer.innerHTML = carouselHTML;
  
  // Carousel functionality
  let currentSlide = 0;
  const slides = document.querySelectorAll('.carousel-slide');
  const totalSlides = slides.length;

  // Handle image loading and classification
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
    
    // Update slide counter
    const slideCounter = document.getElementById('slideCounter');
    if (slideCounter) {
      slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
    }
  }

  window.moveSlide = function(direction) {
    currentSlide += direction;
    showSlide(currentSlide);
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
    if (e.key === 'ArrowLeft') {
      moveSlide(-1);
    } else if (e.key === 'ArrowRight') {
      moveSlide(1);
    }
  });

  // Initialize
  handleImageLoad();
  showSlide(0); // Initialize the slide counter
});

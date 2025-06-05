// galleryvideo.js - Final version with perfect left alignment
document.addEventListener('DOMContentLoaded', function() {
  const galleryContainer = document.getElementById('gallery-container');
  if (!galleryContainer) return;
  
  const items = JSON.parse(galleryContainer.dataset.items);
  const altPrefix = galleryContainer.dataset.altPrefix || 'Media';
  
  // Function to convert Vimeo URLs to embed format
  function convertToEmbedUrl(videoSrc) {
    if (videoSrc.includes('vimeo.com') && !videoSrc.includes('player.vimeo.com')) {
      // Convert regular Vimeo URL to embed URL
      const videoId = videoSrc.split('vimeo.com/')[1].split('?')[0];
      return `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`;
    }
    return videoSrc;
  }
  
  // Function to get video thumbnail URL
  function getVideoThumbnail(videoSrc) {
    if (videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be')) {
      // Extract YouTube video ID
      let videoId;
      if (videoSrc.includes('/embed/')) {
        videoId = videoSrc.split('/embed/')[1].split('?')[0];
      } else if (videoSrc.includes('watch?v=')) {
        videoId = videoSrc.split('watch?v=')[1].split('&')[0];
      } else if (videoSrc.includes('youtu.be/')) {
        videoId = videoSrc.split('youtu.be/')[1].split('?')[0];
      }
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    
    if (videoSrc.includes('vimeo.com')) {
      // Extract Vimeo video ID and use vumbnail service
      let videoId;
      if (videoSrc.includes('player.vimeo.com/video/')) {
        videoId = videoSrc.split('player.vimeo.com/video/')[1].split('?')[0];
      } else if (videoSrc.includes('vimeo.com/')) {
        videoId = videoSrc.split('vimeo.com/')[1].split('?')[0];
      }
      return `https://vumbnail.com/${videoId}.jpg`;
    }
    
    return '/images/video-placeholder.jpg';
  }
  
  // Generate the gallery HTML
  const galleryHTML = `
    <!-- Thumbnail Grid (shown initially) -->
    <div class="thumbnail-grid" id="thumbnailGrid" style="grid-template-columns: repeat(${Math.min(items.length, 6)}, 1fr);">
      ${items.map((item, index) => `
        <div class="thumbnail" onclick="openCarousel(${index})">
          ${item.type === 'video' ? 
            `<div class="video-thumbnail">
              <img src="${getVideoThumbnail(item.src)}" alt="${altPrefix} ${index + 1}" onload="handleThumbnailLoad(this)">
              <div class="play-overlay">▶</div>
            </div>` :
            `<img src="${item.src}" alt="${altPrefix} ${index + 1}" onload="handleThumbnailLoad(this)">`
          }
        </div>
      `).join('')}
    </div>

    <!-- Carousel (hidden initially) -->
    <div class="carousel" id="carousel">
      <div class="carousel-track">
        ${items.map((item, index) => `
          <div class="carousel-slide">
            ${item.type === 'video' ? 
              `<div class="video-container ${item.orientation === 'vertical' ? 'vertical' : ''}">
                <iframe src="${convertToEmbedUrl(item.src)}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" allowfullscreen title="${item.alt || altPrefix + ' video ' + (index + 1)}"></iframe>
              </div>` :
              `<img src="${item.src}" alt="${item.alt || altPrefix + ' moment ' + (index + 1)}">`
            }
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Photo Stream (Mobile Only) -->
    <div class="photo-stream" style="display: none;">
      ${items.map((item, index) => `
        ${item.type === 'video' ? 
          `<div class="mobile-video-container">
            <iframe src="${item.src}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" allowfullscreen title="${item.alt || altPrefix + ' video ' + (index + 1)}"></iframe>
          </div>` :
          `<img src="${item.src}" alt="${item.alt || altPrefix + ' ' + (index + 1)}">`
        }
      `).join('')}
    </div>

    <style>
      /* Video-specific styles */
      .video-thumbnail {
        position: relative;
        width: 100%;
        height: 100%;
      }
      
      .video-thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .play-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.9);
        color: rgba(0, 0, 0, 0.8);
        width: 45px;
        height: 45px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        pointer-events: none;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      }
      
      .video-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start !important;
        align-items: center;
      }
      
      .video-container iframe {
        height: 60vh;
        width: 106.67vh; /* 16:9 aspect ratio width */
        max-width: 70vw;
        max-height: 60vh;
        /* Hard maximum sizes to ensure controls are always visible */
        max-width: min(70vw, 1200px);
        max-height: min(60vh, 675px);
      }
      
      /* Support for vertical videos */
      .video-container.vertical {
        justify-content: flex-start !important;
        align-items: center;
      }
      
      .video-container.vertical iframe {
        height: 60vh;
        width: 33.75vh; /* 9:16 aspect ratio width for vertical videos */
        max-width: 70vw;
        max-height: 60vh;
        /* Hard maximum sizes */
        max-width: min(70vw, 400px);
        max-height: min(60vh, 675px);
      }
      
      .mobile-video-container {
        width: 100%;
        margin-bottom: 2rem;
      }
      
      .mobile-video-container iframe {
        width: 100%;
        height: 56.25vw; /* 16:9 aspect ratio */
        max-height: 400px;
      }
      
      @media (max-width: 768px) {
        .video-container iframe {
          height: 50vh;
          width: 100%;
        }
      }
    </style>
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
    handleMediaLoad();
  };

  window.showThumbnails = function() {
    // Show thumbnails and heading/text when exiting carousel
    document.getElementById('thumbnailGrid').style.display = 'grid';
    document.querySelector('.content-area').style.display = 'block';
    document.getElementById('carousel').classList.remove('show');
    document.querySelector('.gallery-nav').classList.remove('show');
    
    // Pause any playing videos
    const iframes = document.querySelectorAll('.carousel iframe');
    iframes.forEach(iframe => {
      const src = iframe.src;
      iframe.src = src; // This reloads the iframe and stops any playing video
    });
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

  function handleMediaLoad() {
    const images = document.querySelectorAll('.carousel-slide img');
    const videos = document.querySelectorAll('.carousel-slide .video-container');
    
    // Handle images - ensure left alignment with object-position
    images.forEach(img => {
      img.onload = function() {
        // Force left alignment for all images
        this.parentElement.style.setProperty('justify-content', 'flex-start', 'important');
        this.parentElement.style.setProperty('align-items', 'center', 'important');
        this.parentElement.style.setProperty('display', 'flex', 'important');
        this.style.setProperty('margin-left', '0', 'important');
        this.style.setProperty('margin-right', 'auto', 'important');
        this.style.setProperty('object-position', 'left center', 'important');
        
        if (this.naturalHeight > this.naturalWidth) {
          this.classList.add('portrait');
          this.style.setProperty('object-fit', 'contain', 'important');
        }
      };
      if (img.complete && img.naturalHeight > 0) {
        // Force left alignment for already loaded images
        img.parentElement.style.setProperty('justify-content', 'flex-start', 'important');
        img.parentElement.style.setProperty('align-items', 'center', 'important');
        img.parentElement.style.setProperty('display', 'flex', 'important');
        img.style.setProperty('margin-left', '0', 'important');
        img.style.setProperty('margin-right', 'auto', 'important');
        img.style.setProperty('object-position', 'left center', 'important');
        
        if (img.naturalHeight > img.naturalWidth) {
          img.classList.add('portrait');
          img.style.setProperty('object-fit', 'contain', 'important');
        }
      }
    });
    
    // Handle videos - ensure left alignment
    videos.forEach(videoContainer => {
      videoContainer.style.setProperty('justify-content', 'flex-start', 'important');
      videoContainer.style.setProperty('align-items', 'center', 'important');
      videoContainer.style.setProperty('margin-left', '0', 'important');
      videoContainer.style.setProperty('margin-right', 'auto', 'important');
      
      const iframe = videoContainer.querySelector('iframe');
      if (iframe) {
        iframe.style.setProperty('margin-left', '0', 'important');
        iframe.style.setProperty('margin-right', 'auto', 'important');
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
    // Pause all videos before moving to next slide
    const currentIframes = document.querySelectorAll('.carousel iframe');
    currentIframes.forEach(iframe => {
      // Stop video by reloading iframe src
      const src = iframe.src;
      iframe.src = '';
      setTimeout(() => iframe.src = src, 100);
    });
    
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
  handleMediaLoad();
});

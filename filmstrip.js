// filmstrip.js - Film Strip Gallery Component
// Usage: <script src="/filmstrip.js"></script>

class FilmStripGallery {
  constructor(containerId, images, options = {}) {
    this.container = document.getElementById(containerId);
    this.images = images;
    this.options = {
      height: 200,
      mobileHeight: 150,
      gap: '1rem',
      showPerforations: false,
      enableKeyboard: true,
      clickToView: false,
      ...options
    };
    
    this.init();
  }

  init() {
    if (!this.container) {
      console.error(`FilmStrip: Container with id "${this.containerId}" not found`);
      return;
    }

    this.createStyles();
    this.createFilmStrip();
    
    if (this.options.enableKeyboard) {
      this.addKeyboardNavigation();
    }
  }

  createStyles() {
    // Add styles dynamically if not already present
    if (!document.getElementById('filmstrip-styles')) {
      const style = document.createElement('style');
      style.id = 'filmstrip-styles';
      style.textContent = `
        .film-strip {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          margin-top: 2rem;
          margin-bottom: 2rem;
          padding: 1rem 0;
          scrollbar-width: thin;
          scrollbar-color: #ccc transparent;
        }

        .film-strip::-webkit-scrollbar {
          height: 8px;
        }

        .film-strip::-webkit-scrollbar-track {
          background: transparent;
        }

        .film-strip::-webkit-scrollbar-thumb {
          background-color: #ccc;
          border-radius: 4px;
        }

        .film-strip::-webkit-scrollbar-thumb:hover {
          background-color: #999;
        }

        .film-strip-container {
          display: flex;
          gap: ${this.options.gap};
          width: max-content;
          align-items: flex-end;
          padding-left: 2rem;
          padding-right: 2rem;
        }

        .film-frame {
          flex-shrink: 0;
          cursor: ${this.options.clickToView ? 'pointer' : 'default'};
          position: relative;
        }

        .film-frame img {
          display: block;
          height: ${this.options.height}px;
          width: auto;
          object-fit: cover;
          border: none;
          border-radius: 0;
        }

        .film-frame.landscape img,
        .film-frame.portrait img,
        .film-frame.square img {
          height: ${this.options.height}px;
          width: auto;
          object-fit: cover;
          max-width: none;
        }

        @media (max-width: 1200px) {
          .film-frame.landscape img,
          .film-frame.portrait img,
          .film-frame.square img {
            height: ${Math.floor(this.options.height * 0.8)}px;
          }
        }

        @media (max-width: 900px) {
          .film-strip {
            width: 100%;
            padding: 1rem 0;
          }
          
          .film-frame.landscape img,
          .film-frame.portrait img,
          .film-frame.square img {
            height: ${Math.floor(this.options.height * 0.6)}px;
          }
        }

        @media (max-width: 768px) {
          .film-strip {
            display: none !important;
          }
          
          .film-strip-mobile {
            display: block !important;
            max-width: 1000px;
            margin: 2rem auto;
            padding: 0 1rem;
          }
          
          .film-strip-mobile img {
            width: 100%;
            height: auto;
            margin-bottom: 2rem;
            display: block;
          }
        }
        
        .film-strip-mobile {
          display: none;
        }

        /* Perforations effect */
        .film-strip.perforated::before,
        .film-strip.perforated::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 8px;
          background: repeating-linear-gradient(
            to right,
            #333 0px,
            #333 8px,
            transparent 8px,
            transparent 16px
          );
          z-index: 1;
          pointer-events: none;
        }

        .film-strip.perforated::before {
          top: 0;
        }

        .film-strip.perforated::after {
          bottom: 0;
        }

        .film-strip.perforated {
          background-color: #f5f5f5;
          padding: 12px 0;
        }
      `;
      document.head.appendChild(style);
    }
  }

  createFilmStrip() {
    // Clear existing content
    this.container.innerHTML = '';

    // Create film strip wrapper for desktop
    const filmStrip = document.createElement('div');
    filmStrip.className = 'film-strip';

    // Create container for images
    const filmContainer = document.createElement('div');
    filmContainer.className = 'film-strip-container';

    // Create mobile vertical feed
    const mobileStrip = document.createElement('div');
    mobileStrip.className = 'film-strip-mobile';

    // Add images to both desktop and mobile versions
    this.images.forEach((image, index) => {
      // Desktop version
      const frame = this.createImageFrame(image, index);
      filmContainer.appendChild(frame);
      
      // Mobile version
      const mobileImg = document.createElement('img');
      mobileImg.src = image.src;
      mobileImg.alt = image.alt || `Image ${index + 1}`;
      mobileImg.loading = 'lazy';
      
      if (this.options.clickToView) {
        mobileImg.addEventListener('click', () => {
          this.onImageClick(image, index);
        });
        mobileImg.style.cursor = 'pointer';
      }
      
      mobileStrip.appendChild(mobileImg);
    });

    filmStrip.appendChild(filmContainer);
    this.container.appendChild(filmStrip);
    this.container.appendChild(mobileStrip);
  }

  createImageFrame(image, index) {
    const frame = document.createElement('div');
    
    // Determine aspect ratio if not provided
    const aspect = image.aspect || this.detectAspectRatio(image.src);
    frame.className = `film-frame ${aspect}`;

    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt || `Image ${index + 1}`;
    img.loading = 'lazy';

    // Add click handler if enabled
    if (this.options.clickToView) {
      frame.addEventListener('click', () => {
        this.onImageClick(image, index);
      });
    }

    frame.appendChild(img);
    return frame;
  }

  detectAspectRatio(src) {
    // Simple heuristic based on common naming patterns
    const filename = src.toLowerCase();
    if (filename.includes('portrait') || filename.includes('vert')) {
      return 'portrait';
    } else if (filename.includes('square') || filename.includes('sq')) {
      return 'square';
    }
    return 'landscape'; // default
  }

  onImageClick(image, index) {
    // Override this method or pass a callback in options
    if (this.options.onImageClick) {
      this.options.onImageClick(image, index);
    } else {
      console.log(`Clicked image ${index + 1}:`, image);
    }
  }

  addKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      const filmStrip = this.container.querySelector('.film-strip');
      if (!filmStrip) return;

      if (e.key === 'ArrowLeft') {
        filmStrip.scrollLeft -= 200;
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        filmStrip.scrollLeft += 200;
        e.preventDefault();
      }
    });
  }

  // Public methods
  scrollTo(direction) {
    const filmStrip = this.container.querySelector('.film-strip');
    if (filmStrip) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      filmStrip.scrollLeft += scrollAmount;
    }
  }

  addImage(image) {
    this.images.push(image);
    this.createFilmStrip(); // Rebuild
  }

  removeImage(index) {
    this.images.splice(index, 1);
    this.createFilmStrip(); // Rebuild
  }
}

// Simple function for quick usage (like your gallery.js)
window.createFilmStrip = function(containerId, images, options = {}) {
  return new FilmStripGallery(containerId, images, options);
};

// Auto-initialize film strips with data attributes
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if there are actual filmstrip containers
  const autoFilmStrips = document.querySelectorAll('[data-filmstrip]');
  
  autoFilmStrips.forEach(container => {
    const images = JSON.parse(container.dataset.filmstrip || '[]');
    const options = {
      showPerforations: container.hasAttribute('data-perforations'),
      clickToView: container.hasAttribute('data-clickable'),
      height: parseInt(container.dataset.height) || 200
    };
    
    new FilmStripGallery(container.id, images, options);
  });
  
  // Don't interfere with existing gallery functionality
});

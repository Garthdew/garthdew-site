// filmstrip.js - Film Strip Gallery Component (Isolated Version)
// Usage: <script src="/filmstrip.js"></script>

class FilmStripGallery {
  constructor(containerId, images, options = {}) {
    this.container = document.getElementById(containerId);
    this.images = images;
    this.options = {
      height: 500,
      gap: '1rem',
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
    // Only add styles if not already present
    if (!document.getElementById('filmstrip-styles-isolated')) {
      const style = document.createElement('style');
      style.id = 'filmstrip-styles-isolated';
      style.textContent = `
        /* Isolated Film Strip Styles - Won't interfere with gallery.js */
        .filmstrip-component {
          width: 100%;
          margin: 2rem 0;
        }

        .filmstrip-component .fs-horizontal-scroll {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 1rem 0;
          scrollbar-width: thin;
          scrollbar-color: #ccc transparent;
        }

        .filmstrip-component .fs-horizontal-scroll::-webkit-scrollbar {
          height: 8px;
        }

        .filmstrip-component .fs-horizontal-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .filmstrip-component .fs-horizontal-scroll::-webkit-scrollbar-thumb {
          background-color: #ccc;
          border-radius: 4px;
        }

        .filmstrip-component .fs-horizontal-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #999;
        }

        .filmstrip-component .fs-image-container {
          display: flex;
          gap: ${this.options.gap};
          width: max-content;
          align-items: flex-end;
          padding-left: 2rem;
          padding-right: 2rem;
        }

        .filmstrip-component .fs-image-frame {
          flex-shrink: 0;
          cursor: ${this.options.clickToView ? 'pointer' : 'default'};
          position: relative;
        }

        .filmstrip-component .fs-image-frame img {
          display: block;
          height: ${this.options.height}px;
          width: auto;
          object-fit: cover;
          border: none;
          border-radius: 0;
          max-width: none;
        }

        .filmstrip-component .fs-video-frame iframe {
          height: ${this.options.height}px;
          width: ${Math.floor(this.options.height * 1.78)}px;
          border: none;
          border-radius: 0;
        }

        @media (max-width: 1200px) {
          .filmstrip-component .fs-image-frame img {
            height: ${Math.floor(this.options.height * 0.8)}px;
          }
          .filmstrip-component .fs-video-frame iframe {
            height: ${Math.floor(this.options.height * 0.8)}px;
            width: ${Math.floor(this.options.height * 0.8 * 1.78)}px;
          }
        }

        @media (max-width: 900px) {
          .filmstrip-component .fs-image-frame img {
            height: ${Math.floor(this.options.height * 0.6)}px;
          }
          .filmstrip-component .fs-video-frame iframe {
            height: ${Math.floor(this.options.height * 0.6)}px;
            width: ${Math.floor(this.options.height * 0.6 * 1.78)}px;
          }
        }

        @media (max-width: 768px) {
          .filmstrip-component .fs-horizontal-scroll {
            display: none !important;
          }
          
          .filmstrip-component .fs-mobile-vertical {
            display: block !important;
            max-width: 1000px;
            margin: 2rem auto;
            padding: 0 1rem;
          }
          
          .filmstrip-component .fs-mobile-vertical img {
            width: 100%;
            height: auto;
            margin-bottom: 2rem;
            display: block;
          }
        }
        
        .filmstrip-component .fs-mobile-vertical {
          display: none;
        }
      `;
      document.head.appendChild(style);
    }
  }

  createFilmStrip() {
    // Clear and setup container
    this.container.innerHTML = '';
    this.container.className = 'filmstrip-component';

    // Create desktop horizontal scroll
    const horizontalScroll = document.createElement('div');
    horizontalScroll.className = 'fs-horizontal-scroll';

    const imageContainer = document.createElement('div');
    imageContainer.className = 'fs-image-container';

    // Create mobile vertical feed
    const mobileVertical = document.createElement('div');
    mobileVertical.className = 'fs-mobile-vertical';

    // Add images
    this.images.forEach((image, index) => {
      // Desktop version
      const frame = this.createImageFrame(image, index);
      imageContainer.appendChild(frame);
      
      // Mobile version
      if (image.type === 'video' && image.embedUrl) {
        // For mobile, create a simple iframe
        const mobileFrame = document.createElement('div');
        mobileFrame.style.marginBottom = '2rem';
        
        const mobileIframe = document.createElement('iframe');
        mobileIframe.src = image.embedUrl;
        mobileIframe.style.width = '100%';
        mobileIframe.style.height = '56.25vw'; // 16:9 aspect ratio
        mobileIframe.style.maxHeight = '300px';
        mobileIframe.frameBorder = '0';
        mobileIframe.allow = 'autoplay; fullscreen; picture-in-picture';
        mobileIframe.allowFullscreen = true;
        mobileIframe.title = image.alt || `Video ${index + 1}`;
        
        mobileFrame.appendChild(mobileIframe);
        mobileVertical.appendChild(mobileFrame);
      } else {
        // Regular image for mobile
        const mobileImg = document.createElement('img');
        mobileImg.src = image.src;
        mobileImg.alt = image.alt || `Image ${index + 1}`;
        mobileImg.loading = 'lazy';
        mobileImg.style.width = '100%';
        mobileImg.style.height = 'auto';
        mobileImg.style.marginBottom = '2rem';
        mobileImg.style.display = 'block';
        
        if (this.options.clickToView) {
          mobileImg.addEventListener('click', () => {
            this.onImageClick(image, index);
          });
          mobileImg.style.cursor = 'pointer';
        }
        
        mobileVertical.appendChild(mobileImg);
      }
    });

    horizontalScroll.appendChild(imageContainer);
    this.container.appendChild(horizontalScroll);
    this.container.appendChild(mobileVertical);
  }

  createImageFrame(image, index) {
    const frame = document.createElement('div');

    // Check if this is a video
    if (image.type === 'video' && image.embedUrl) {
      frame.className = 'fs-video-frame';
      
      const iframe = document.createElement('iframe');
      iframe.src = image.embedUrl;
      iframe.width = Math.floor(this.options.height * 1.78);
      iframe.height = this.options.height;
      iframe.frameBorder = '0';
      iframe.allow = 'autoplay; fullscreen; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.loading = 'lazy';
      iframe.title = image.alt || `Video ${index + 1}`;
      
      frame.appendChild(iframe);
    } else {
      // Regular image
      frame.className = 'fs-image-frame';

      const img = document.createElement('img');
      img.src = image.src;
      img.alt = image.alt || `Image ${index + 1}`;
      img.loading = 'lazy';

      frame.appendChild(img);
    }

    if (this.options.clickToView) {
      frame.addEventListener('click', () => {
        this.onImageClick(image, index);
      });
    }

    return frame;
  }

  onImageClick(image, index) {
    if (this.options.onImageClick) {
      this.options.onImageClick(image, index);
    } else {
      console.log(`Clicked image ${index + 1}:`, image);
    }
  }

  addKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      const scrollContainer = this.container.querySelector('.fs-horizontal-scroll');
      if (!scrollContainer) return;

      if (e.key === 'ArrowLeft') {
        scrollContainer.scrollLeft -= 200;
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        scrollContainer.scrollLeft += 200;
        e.preventDefault();
      }
    });
  }
}

// Simple function for quick usage
window.createFilmStrip = function(containerId, images, options = {}) {
  return new FilmStripGallery(containerId, images, options);
};

// Auto-initialize only film strips with specific data attribute
document.addEventListener('DOMContentLoaded', () => {
  const filmStripContainers = document.querySelectorAll('[data-filmstrip-auto]');
  
  filmStripContainers.forEach(container => {
    const images = JSON.parse(container.dataset.filmstripAuto || '[]');
    const options = {
      clickToView: container.hasAttribute('data-clickable'),
      height: parseInt(container.dataset.height) || 500
    };
    
    new FilmStripGallery(container.id, images, options);
  });
});

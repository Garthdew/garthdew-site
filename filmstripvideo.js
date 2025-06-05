// filmstripvideo.js - Film Strip Gallery with Video Support
// Usage: <script src="/filmstripvideo.js"></script>

class FilmStripVideoGallery {
  constructor(containerId, items, options = {}) {
    this.container = document.getElementById(containerId);
    this.items = items; // Can contain both images and videos
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
      console.error(`FilmStripVideo: Container with id "${this.containerId}" not found`);
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
    if (!document.getElementById('filmstrip-video-styles')) {
      const style = document.createElement('style');
      style.id = 'filmstrip-video-styles';
      style.textContent = `
        /* Film Strip Video Styles */
        .filmstrip-video-component {
          width: 100%;
          margin: 2rem 0;
        }

        .filmstrip-video-component .fsv-horizontal-scroll {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 1rem 0;
          scrollbar-width: thin;
          scrollbar-color: #ccc transparent;
        }

        .filmstrip-video-component .fsv-horizontal-scroll::-webkit-scrollbar {
          height: 8px;
        }

        .filmstrip-video-component .fsv-horizontal-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .filmstrip-video-component .fsv-horizontal-scroll::-webkit-scrollbar-thumb {
          background-color: #ccc;
          border-radius: 4px;
        }

        .filmstrip-video-component .fsv-horizontal-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #999;
        }

        .filmstrip-video-component .fsv-item-container {
          display: flex;
          gap: ${this.options.gap};
          width: max-content;
          align-items: flex-end;
          padding-left: 2rem;
          padding-right: 2rem;
        }

        .filmstrip-video-component .fsv-item-frame {
          flex-shrink: 0;
          cursor: ${this.options.clickToView ? 'pointer' : 'default'};
          position: relative;
          height: ${this.options.height}px;
          display: block;
        }

        .filmstrip-video-component .fsv-item-frame img {
          display: block;
          height: ${this.options.height}px;
          width: auto;
          object-fit: cover;
          border: none;
          border-radius: 0;
          max-width: none;
          vertical-align: bottom;
        }

        .filmstrip-video-component .fsv-item-frame iframe {
          display: block;
          height: ${this.options.height}px;
          width: auto;
          border: none;
          border-radius: 0;
          margin: 0;
          padding: 0;
          vertical-align: bottom;
        }

        /* Remove fixed width classes - let width be auto-calculated */

        @media (max-width: 1200px) {
          .filmstrip-video-component .fsv-item-frame {
            height: ${Math.floor(this.options.height * 0.8)}px;
          }
          
          .filmstrip-video-component .fsv-item-frame img {
            height: ${Math.floor(this.options.height * 0.8)}px;
          }
          
          .filmstrip-video-component .fsv-item-frame iframe {
            height: ${Math.floor(this.options.height * 0.8)}px;
          }
        }

        @media (max-width: 900px) {
          .filmstrip-video-component .fsv-item-frame {
            height: ${Math.floor(this.options.height * 0.6)}px;
          }
          
          .filmstrip-video-component .fsv-item-frame img {
            height: ${Math.floor(this.options.height * 0.6)}px;
          }
          
          .filmstrip-video-component .fsv-item-frame iframe {
            height: ${Math.floor(this.options.height * 0.6)}px;
          }
        }

        @media (max-width: 768px) {
          .filmstrip-video-component .fsv-horizontal-scroll {
            display: none !important;
          }
          
          .filmstrip-video-component .fsv-mobile-vertical {
            display: block !important;
            max-width: 1000px;
            margin: 2rem auto;
            padding: 0 1rem;
          }
          
          .filmstrip-video-component .fsv-mobile-vertical img {
            width: 100%;
            height: auto;
            margin-bottom: 2rem;
            display: block;
          }
          
          .filmstrip-video-component .fsv-mobile-vertical iframe {
            width: 100%;
            height: 56.25vw; /* 16:9 aspect ratio */
            max-height: 400px;
            margin-bottom: 2rem;
            display: block;
          }
        }
        
        .filmstrip-video-component .fsv-mobile-vertical {
          display: none;
        }
      `;
      document.head.appendChild(style);
    }
  }

  createFilmStrip() {
    // Clear and setup container
    this.container.innerHTML = '';
    this.container.className = 'filmstrip-video-component';

    // Create desktop horizontal scroll
    const horizontalScroll = document.createElement('div');
    horizontalScroll.className = 'fsv-horizontal-scroll';

    const itemContainer = document.createElement('div');
    itemContainer.className = 'fsv-item-container';

    // Create mobile vertical feed
    const mobileVertical = document.createElement('div');
    mobileVertical.className = 'fsv-mobile-vertical';

    // Add items (images and videos)
    this.items.forEach((item, index) => {
      // Desktop version
      const frame = this.createItemFrame(item, index);
      itemContainer.appendChild(frame);
      
      // Mobile version
      const mobileItem = this.createMobileItem(item, index);
      mobileVertical.appendChild(mobileItem);
    });

    horizontalScroll.appendChild(itemContainer);
    this.container.appendChild(horizontalScroll);
    this.container.appendChild(mobileVertical);
  }

  createItemFrame(item, index) {
    const frame = document.createElement('div');
    frame.className = 'fsv-item-frame';

    if (item.type === 'video') {
      const iframe = this.createVideoIframe(item);
      frame.appendChild(iframe);
    } else {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt || `Image ${index + 1}`;
      img.loading = 'lazy';
      frame.appendChild(img);
    }

    if (this.options.clickToView) {
      frame.addEventListener('click', () => {
        this.onItemClick(item, index);
      });
    }

    return frame;
  }

  createVideoIframe(item) {
    const iframe = document.createElement('iframe');
    
    // Extract clean embed URL
    let embedUrl = item.src;
    
    // Handle Vimeo URLs
    if (embedUrl.includes('vimeo.com')) {
      // Clean up Vimeo URL - remove unnecessary parameters but keep essential ones
      embedUrl = embedUrl.split('?')[0] + '?title=0&byline=0&portrait=0&badge=0&autopause=0';
    }
    
    // Handle YouTube URLs
    if (embedUrl.includes('youtube.com') || embedUrl.includes('youtu.be')) {
      // Convert regular YouTube URLs to embed format if needed
      if (embedUrl.includes('watch?v=')) {
        const videoId = embedUrl.split('watch?v=')[1].split('&')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    }
    
    iframe.src = embedUrl;
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media';
    iframe.title = item.alt || 'Video';
    
    // Let the browser calculate width automatically based on height and aspect ratio
    // No need to set width or aspect ratio classes
    
    return iframe;
  }

  createMobileItem(item, index) {
    if (item.type === 'video') {
      const iframe = this.createVideoIframe(item);
      iframe.style.width = '100%';
      iframe.style.height = '56.25vw'; // 16:9 aspect ratio
      iframe.style.maxHeight = '400px';
      iframe.style.marginBottom = '2rem';
      iframe.style.display = 'block';
      
      if (this.options.clickToView) {
        iframe.addEventListener('click', () => {
          this.onItemClick(item, index);
        });
        iframe.style.cursor = 'pointer';
      }
      
      return iframe;
    } else {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt || `Image ${index + 1}`;
      img.loading = 'lazy';
      img.style.width = '100%';
      img.style.height = 'auto';
      img.style.marginBottom = '2rem';
      img.style.display = 'block';
      
      if (this.options.clickToView) {
        img.addEventListener('click', () => {
          this.onItemClick(item, index);
        });
        img.style.cursor = 'pointer';
      }
      
      return img;
    }
  }

  onItemClick(item, index) {
    if (this.options.onItemClick) {
      this.options.onItemClick(item, index);
    } else {
      console.log(`Clicked ${item.type || 'image'} ${index + 1}:`, item);
    }
  }

  addKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      const scrollContainer = this.container.querySelector('.fsv-horizontal-scroll');
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
window.createFilmStripVideo = function(containerId, items, options = {}) {
  return new FilmStripVideoGallery(containerId, items, options);
};

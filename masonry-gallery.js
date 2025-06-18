// masonry-gallery.js - Automatic two-column masonry gallery with uniform spacing
document.addEventListener('DOMContentLoaded', function() {
  const galleryContainer = document.getElementById('gallery-container');
  if (!galleryContainer) return;

  // Get gallery data
  const galleryData = JSON.parse(galleryContainer.getAttribute('data-items'));
  
  // Create masonry gallery HTML
  let galleryHTML = '<div class="masonry-gallery">';
  
  galleryData.forEach((item, index) => {
    galleryHTML += `
      <div class="masonry-item" data-index="${index}">
        <img src="${item.src}" alt="${item.alt}" loading="lazy">
      </div>
    `;
  });
  
  galleryHTML += '</div>';
  
  // Insert gallery
  galleryContainer.innerHTML = galleryHTML;
  
  // Auto-detect orientations and create uniform layout
  const images = galleryContainer.querySelectorAll('.masonry-item img');
  let loadedCount = 0;
  
  function checkAllLoaded() {
    loadedCount++;
    if (loadedCount === images.length) {
      createUniformLayout();
    }
  }
  
  function createUniformLayout() {
    const items = Array.from(galleryContainer.querySelectorAll('.masonry-item'));
    
    // Calculate base height for landscape images (3:2 ratio)
    const containerWidth = galleryContainer.querySelector('.masonry-gallery').offsetWidth;
    const columnWidth = (containerWidth - 32) / 2; // Account for gap
    const landscapeHeight = Math.round(columnWidth * (2/3)); // 3:2 ratio
    const portraitHeight = Math.round(columnWidth * (3/2)); // 2:3 ratio
    
    items.forEach((item, index) => {
      const img = item.querySelector('img');
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      
      if (aspectRatio < 1) {
        // Portrait image
        item.classList.add('portrait');
        item.style.height = `${portraitHeight}px`;
      } else {
        // Landscape image  
        item.classList.add('landscape');
        item.style.height = `${landscapeHeight}px`;
      }
    });
  }
  
  images.forEach(img => {
    img.onload = checkAllLoaded;
    
    // Handle already loaded images
    if (img.complete) {
      checkAllLoaded();
    }
  });
  
  // Recalculate on window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(createUniformLayout, 250);
  });
});

// Add CSS styles
const masonryStyles = `
<style>
/* Masonry Gallery Styles */
.masonry-gallery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: auto;
  gap: 2rem;
  max-width: 1200px;
  margin: 0;
  padding: 0 1rem;
}

.masonry-item {
  overflow: visible;
  background-color: transparent;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.masonry-item img {
  width: 100%;
  max-width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  display: block;
  margin: 0;
  border-radius: 0;
  box-shadow: none;
  border: none;
}

/* Ensure consistent spacing */
.masonry-item.landscape {
  margin-bottom: 2rem;
}

.masonry-item.portrait {
  margin-bottom: 2rem;
}

/* Mobile: Single column, natural heights */
@media (max-width: 768px) {
  .masonry-gallery {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }
  
  .masonry-item {
    height: auto !important;
  }
  
  .masonry-item img {
    height: auto;
    width: 100%;
  }
  
  .masonry-item.landscape,
  .masonry-item.portrait {
    margin-bottom: 0;
  }
}

/* Wide content adjustments for masonry */
.wide-content:has(.masonry-gallery) {
  max-width: 1200px;
  margin: 2rem 0;
  margin-left: 2rem;
  padding: 0;
}

@media (max-width: 768px) {
  .wide-content:has(.masonry-gallery) {
    margin-left: 0;
    padding: 0 1rem;
  }
}
</style>
`;

// Inject styles into head
document.head.insertAdjacentHTML('beforeend', masonryStyles);

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
  
  // Auto-detect orientations and apply classes
  const images = galleryContainer.querySelectorAll('.masonry-item img');
  let loadedCount = 0;
  
  function checkAllLoaded() {
    loadedCount++;
    if (loadedCount === images.length) {
      applyOrientationClasses();
    }
  }
  
  function applyOrientationClasses() {
    const items = Array.from(galleryContainer.querySelectorAll('.masonry-item'));
    
    items.forEach((item) => {
      const img = item.querySelector('img');
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      
      if (aspectRatio < 1) {
        // Portrait image
        item.classList.add('portrait');
      } else {
        // Landscape image  
        item.classList.add('landscape');
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
});

// Add CSS styles
const masonryStyles = `
<style>
/* Masonry Gallery Styles */
.masonry-gallery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0;
  padding: 0 1rem;
  align-items: start;
}

.masonry-item {
  width: 100%;
  margin-bottom: 2rem;
}

.masonry-item img {
  width: 100%;
  height: auto;
  object-fit: contain;
  object-position: center;
  display: block;
  margin: 0;
  border-radius: 0;
  box-shadow: none;
  border: none;
}

/* Create visual balance - portraits get more bottom margin to balance height difference */
.masonry-item.portrait {
  margin-bottom: 1rem;
}

.masonry-item.landscape {
  margin-bottom: 2rem;
}

/* Mobile: Single column, natural heights */
@media (max-width: 768px) {
  .masonry-gallery {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }
  
  .masonry-item.landscape,
  .masonry-item.portrait {
    margin-bottom: 1.5rem;
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

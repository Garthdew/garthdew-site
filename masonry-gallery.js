// masonry-gallery.js - Automatic two-column masonry gallery
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
  
  // Auto-detect portrait images and apply masonry
  const images = galleryContainer.querySelectorAll('.masonry-item img');
  
  images.forEach(img => {
    img.onload = function() {
      const aspectRatio = this.naturalWidth / this.naturalHeight;
      
      // If height > width (portrait), span 2 rows
      if (aspectRatio < 1) {
        this.closest('.masonry-item').classList.add('portrait');
      }
    };
    
    // Handle already loaded images
    if (img.complete) {
      img.onload();
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
  grid-auto-rows: auto;
  gap: 2rem;
  max-width: 1200px;
  margin: 0;
  padding: 0 1rem;
}

.masonry-item {
  overflow: visible;
  background-color: transparent;
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

/* Portrait images - maintain aspect ratio but visually balance */
.masonry-item.portrait img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

/* Mobile: Single column, natural heights */
@media (max-width: 768px) {
  .masonry-gallery {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
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

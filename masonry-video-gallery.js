// masonry-video-gallery.js - True two-column masonry with images and videos
document.addEventListener('DOMContentLoaded', function() {
  const galleryContainer = document.getElementById('gallery-container');
  if (!galleryContainer) return;

  // Get gallery data
  const galleryData = JSON.parse(galleryContainer.getAttribute('data-items'));
  
  // Create two-column structure
  let galleryHTML = `
    <div class="masonry-gallery">
      <div class="masonry-column" id="column-1"></div>
      <div class="masonry-column" id="column-2"></div>
    </div>
  `;
  
  // Insert gallery structure
  galleryContainer.innerHTML = galleryHTML;
  
  const column1 = document.getElementById('column-1');
  const column2 = document.getElementById('column-2');
  
  // Distribute items alternately between columns
  galleryData.forEach((item, index) => {
    let itemHTML;
    
    if (item.type === 'video') {
      // Create video embed
      itemHTML = `
        <div class="masonry-item video-item">
          <div class="video-container">
            <iframe src="${item.src}?badge=0&autopause=0&player_id=0&app_id=58479" 
                    width="100%" 
                    height="100%" 
                    frameborder="0" 
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write" 
                    title="${item.alt}">
            </iframe>
          </div>
        </div>
      `;
    } else {
      // Create image
      itemHTML = `
        <div class="masonry-item image-item">
          <img src="${item.src}" alt="${item.alt}" loading="lazy">
        </div>
      `;
    }
    
    // Alternate between columns
    if (index % 2 === 0) {
      column1.insertAdjacentHTML('beforeend', itemHTML);
    } else {
      column2.insertAdjacentHTML('beforeend', itemHTML);
    }
  });
});

// Add CSS styles
const masonryStyles = `
<style>
/* True Masonry Gallery Styles with Video Support */
.masonry-gallery {
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 0;
  padding: 0 1rem;
}

.masonry-column {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.masonry-item {
  margin-bottom: 2rem;
  width: 100%;
}

.masonry-item:last-child {
  margin-bottom: 0;
}

/* Image styles */
.masonry-item.image-item img {
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

/* Video styles */
.masonry-item.video-item .video-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
}

.masonry-item.video-item .video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* Mobile: Single column */
@media (max-width: 768px) {
  .masonry-gallery {
    flex-direction: column;
    gap: 0;
    padding: 0 1rem;
  }
  
  .masonry-column {
    width: 100%;
  }
  
  .masonry-item {
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

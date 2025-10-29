// script.js — robust lightbox loader (replace existing file contents)

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

let currentLoader = null; // track a pending preloader

function openLightboxWithImage(imgEl) {
  // figure out full image URL (data-full preferred)
  const fullUrl = imgEl.dataset.full || imgEl.src;
  const fig = imgEl.closest('figure');
  const captionText = fig ? fig.querySelector('figcaption')?.textContent : imgEl.alt || '';

  // cancel previous loader if any
  if (currentLoader) {
    currentLoader.onload = null;
    currentLoader.onerror = null;
    currentLoader = null;
  }

  // show overlay but keep image invisible until loaded
  lightbox.classList.add('active');
  lightboxImg.classList.add('loading');
  lightboxImg.src = ''; // ensure no previous image is shown
  lightboxCaption.textContent = captionText;

  // preload the full image
  const loader = new Image();
  currentLoader = loader;

  loader.onload = () => {
    // only proceed if this loader is still the most recent
    if (currentLoader !== loader) return;
    lightboxImg.src = fullUrl;
    lightboxImg.classList.remove('loading');
    currentLoader = null;
  };

  loader.onerror = () => {
    // handle load error gracefully
    lightboxCaption.textContent = 'Image failed to load';
    lightboxImg.classList.remove('loading');
    currentLoader = null;
  };

  loader.src = fullUrl; // start loading
}

// attach click handlers to both grids (favourites + photo-grid)
document.querySelectorAll('.photo-grid img, .favourites-grid img').forEach(img => {
  img.addEventListener('click', (e) => {
    e.preventDefault();
    openLightboxWithImage(img);
  });
});

// Close when clicking outside the image (i.e., on the overlay)
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    // start closing
    lightbox.classList.remove('active');

    // cancel any pending loader
    if (currentLoader) {
      currentLoader.onload = null;
      currentLoader.onerror = null;
      currentLoader = null;
    }

    // clear image after a short delay to allow CSS fade-out (optional)
    setTimeout(() => {
      lightboxImg.src = '';
      lightboxCaption.textContent = '';
    }, 200);
  }
});

// Optional: close on Esc key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    lightbox.click();
  }
});

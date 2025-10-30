// === LIGHTBOX FUNCTIONALITY ===

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeButton = document.getElementById('lightboxClose');

let currentLoader = null; // track pending preload

function openLightboxWithImage(imgEl) {
  const fullUrl = imgEl.dataset.full || imgEl.src;
  const fig = imgEl.closest('figure');
  const captionText = fig ? fig.querySelector('figcaption')?.textContent : imgEl.alt || '';

  // cancel any previous preload
  if (currentLoader) {
    currentLoader.onload = null;
    currentLoader.onerror = null;
    currentLoader = null;
  }

  // show overlay but keep image hidden until loaded
  lightbox.classList.add('active');
  lightboxImg.classList.add('loading');
  lightboxImg.src = '';
  lightboxCaption.textContent = captionText;

  const loader = new Image();
  currentLoader = loader;

  loader.onload = () => {
    if (currentLoader !== loader) return;
    lightboxImg.src = fullUrl;
    lightboxImg.classList.remove('loading');
    currentLoader = null;
  };

  loader.onerror = () => {
    lightboxCaption.textContent = 'Image failed to load';
    lightboxImg.classList.remove('loading');
    currentLoader = null;
  };

  loader.src = fullUrl;
}

// attach click handlers
document.querySelectorAll('.photo-grid img, .favourites-grid img').forEach(img => {
  img.addEventListener('click', e => {
    e.preventDefault();
    openLightboxWithImage(img);
  });
});

// close when clicking outside image
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
    if (currentLoader) {
      currentLoader.onload = null;
      currentLoader.onerror = null;
      currentLoader = null;
    }
    setTimeout(() => {
      lightboxImg.src = '';
      lightboxCaption.textContent = '';
    }, 200);
  }
});

// close with Esc key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
    lightboxCaption.textContent = '';
  }
});

// close button
closeButton.addEventListener('click', () => {
  lightbox.classList.remove('active');
  lightboxImg.src = '';
  lightboxCaption.textContent = '';
});

// === RETURN TO GALLERY BUTTON FUNCTIONALITY ===
// I only want the button to appear below the perthshire section of the wesbite

// Grab the button and gallery nav
const returnButton = document.getElementById('returnToGallery');
const galleryNav = document.getElementById('galleryNav'); 
const perthshireSection = document.getElementById('Perthshire'); 

// Show the button when we've scrolled past the Perthshire section
window.addEventListener('scroll', () => {
  const perthshireBottom = perthshireSection.getBoundingClientRect().bottom;
  
  if (perthshireBottom < 0) { 
    // Section is completely above viewport
    returnButton.style.display = 'block';
  } else {
    returnButton.style.display = 'none';
  }
});

// Scroll smoothly to the gallery nav when clicked
returnButton.addEventListener('click', () => {
  galleryNav.scrollIntoView({ behavior: 'smooth' });
});

// Hide button when lightbox is active
function toggleReturnButton() {
  if (lightbox.classList.contains('active')) {
    returnButton.style.display = 'none';
  } else {
    // Only show it if we've scrolled past Perthshire
    if (window.scrollY > document.getElementById('Perthshire').offsetHeight) {
      returnButton.style.display = 'block';
    }
  }
}

// When a photo is clicked (lightbox opens)
document.querySelectorAll('.photo-grid img').forEach(img => {
  img.addEventListener('click', () => {
    returnButton.style.display = 'none';
  });
});

// When lightbox closes
document.getElementById('lightboxClose').addEventListener('click', () => {
  toggleReturnButton();
});

// Also check on scroll in case button should appear/disappear
window.addEventListener('scroll', toggleReturnButton);


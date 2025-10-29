const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

// When any gallery image is clicked
document.querySelectorAll('.photo-grid img, .favourites-grid img').forEach(img => {
  img.addEventListener('click', () => {
    // Make sure the lightbox is cleared before setting a new image
    lightboxImg.src = '';
    lightbox.classList.add('active');

    // Prefer full-size image if available
    const fullImage = img.getAttribute('data-full') || img.src;
    lightboxImg.src = fullImage;

    // Get the caption from the figure if available
    const fig = img.closest('figure');
    const captionText = fig ? fig.querySelector('figcaption')?.textContent : '';
    lightboxCaption.textContent = captionText || img.alt;
  });
});

// Close when clicking outside image
lightbox.addEventListener('click', e => {
  if (e.target === lightbox || e.target === lightboxImg) {
    lightbox.classList.remove('active');
    lightboxImg.src = ''; // Clear image to prevent stale display
  }
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

// When any gallery image is clicked
document.querySelectorAll('.photo-grid img').forEach(img => {
  img.addEventListener('click', () => {
    lightbox.classList.add('active');

    // Use full-size image if available
    lightboxImg.src = img.dataset.full || img.src;

    // Find the caption from the figure
    const fig = img.closest('figure');
    const captionText = fig ? fig.querySelector('figcaption')?.textContent : '';
    lightboxCaption.textContent = captionText || img.alt;
  });
});

// Close when clicking outside image
lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

// When any gallery image is clicked
document.querySelectorAll('.photo-grid img').forEach(img => {
  img.addEventListener('click', () => {
    lightbox.classList.add('active');
    lightboxImg.src = img.src;
  });
});

// Close when clicking outside image
lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

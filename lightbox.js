(function () {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'lb-overlay';
  overlay.innerHTML = `
    <button id="lb-close" aria-label="Close">&times;</button>
    <div id="lb-scroll">
      <img id="lb-img" src="" alt="" />
    </div>
  `;
  document.body.appendChild(overlay);

  const lbImg = document.getElementById('lb-img');

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    overlay.classList.add('lb-active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('lb-active');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  // Close on button or backdrop click
  document.getElementById('lb-close').addEventListener('click', closeLightbox);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target === document.getElementById('lb-scroll')) {
      closeLightbox();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  // Attach to eligible images — skip thumbnails (.case-card-image img, .demo-card-image img)
  function attachLightbox() {
    const imgs = document.querySelectorAll(
      '.cs-hero-image img, .cs-img-placeholder img, .cs-image-placeholder img, .cs-section img, .cs-design-step img, .cs-content img, .ui-img-slot img'
    );
    imgs.forEach(function (img) {
      if (img.hasAttribute('data-no-lightbox')) return;
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function () {
        openLightbox(img.src, img.alt);
      });
    });

    // Also handle bare <img> tags directly inside .cs-design-step or .cs-section
    const bareImgs = document.querySelectorAll('.cs-design-step > img, .cs-section > img, .cs-content > img');
    bareImgs.forEach(function (img) {
      if (img.hasAttribute('data-no-lightbox')) return;
      if (!img.dataset.lbAttached) {
        img.dataset.lbAttached = '1';
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function () {
          openLightbox(img.src, img.alt);
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachLightbox);
  } else {
    attachLightbox();
  }
})();

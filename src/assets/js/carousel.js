(function () {
  function initCarousel(gallery) {
    var items = gallery.querySelectorAll('.gallery-item');
    if (items.length < 2) return;

    var index = 0;
    gallery.classList.add('carousel');

    var track = document.createElement('div');
    track.className = 'carousel-track';
    while (gallery.firstChild) {
      track.appendChild(gallery.firstChild);
    }
    gallery.appendChild(track);

    var prev = document.createElement('button');
    prev.className = 'carousel-arrow carousel-prev';
    prev.setAttribute('aria-label', 'Previous image');
    prev.innerHTML = '&#8249;';

    var next = document.createElement('button');
    next.className = 'carousel-arrow carousel-next';
    next.setAttribute('aria-label', 'Next image');
    next.innerHTML = '&#8250;';

    var dots = document.createElement('div');
    dots.className = 'carousel-dots';
    var dotButtons = [];
    for (var i = 0; i < items.length; i++) {
      var dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', 'Go to image ' + (i + 1));
      (function (n) {
        dot.addEventListener('click', function () { go(n); });
      })(i);
      dots.appendChild(dot);
      dotButtons.push(dot);
    }

    gallery.appendChild(prev);
    gallery.appendChild(next);
    gallery.appendChild(dots);

    function go(n) {
      index = (n + items.length) % items.length;
      track.style.transform = 'translateX(' + (-index * 100) + '%)';
      for (var i = 0; i < dotButtons.length; i++) {
        dotButtons[i].classList.toggle('is-active', i === index);
      }
    }

    prev.addEventListener('click', function () { go(index - 1); });
    next.addEventListener('click', function () { go(index + 1); });

    var startX = 0;
    var dragging = false;
    track.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      dragging = true;
    }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (!dragging) return;
      dragging = false;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) {
        if (dx < 0) { go(index + 1); } else { go(index - 1); }
      }
    });

    gallery.setAttribute('tabindex', '0');
    gallery.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { go(index - 1); }
      else if (e.key === 'ArrowRight') { go(index + 1); }
    });

    go(0);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var galleries = document.querySelectorAll('.gallery');
    for (var i = 0; i < galleries.length; i++) {
      initCarousel(galleries[i]);
    }
  });
})();
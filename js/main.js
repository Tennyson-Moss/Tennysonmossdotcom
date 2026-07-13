// Progressive enhancement — the site is fully usable without this file.
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Scroll-in reveals -------------------------------------------------
  // .reveal is only ever added from here, so content stays visible when JS
  // doesn't run.
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll(
      '.slugline, .scene, .tile, .project-caption, .embed-wrap, .video-hero, .rive-frame, .city-buttons, .about-cols, .contact .big, .contact .email'
    );

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

    targets.forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });

    // Stagger the work tiles so each grid row cascades in.
    document.querySelectorAll('.grid').forEach(function (grid) {
      Array.prototype.forEach.call(grid.children, function (tile, i) {
        tile.style.transitionDelay = (i % 3) * 90 + 'ms';
      });
    });
  }

  // ---- Mobile hamburger menu ----------------------------------------------
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Nav scroll-spy ----------------------------------------------------
  var links = {};
  document.querySelectorAll('.nav a.navlink').forEach(function (a) {
    var id = (a.getAttribute('href') || '').replace('#', '');
    if (id) links[id] = a;
  });

  var sections = Object.keys(links)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    // A band around the middle of the viewport decides the active section.
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        links[entry.target.id].classList.toggle('active', entry.isIntersecting);
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (s) { spy.observe(s); });
  }
})();

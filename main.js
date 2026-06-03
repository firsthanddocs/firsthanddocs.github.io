// Firsthand Document Services — shared site behavior
(function () {
  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  var scrim = document.querySelector('.nav-scrim');

  function closeNav() {
    if (!nav) return;
    nav.classList.remove('open');
    scrim && scrim.classList.remove('show');
    toggle && toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function openNav() {
    nav.classList.add('open');
    scrim && scrim.classList.add('show');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      nav.classList.contains('open') ? closeNav() : openNav();
    });
  }
  if (scrim) scrim.addEventListener('click', closeNav);
  // close nav when a link is tapped (mobile)
  document.querySelectorAll('.nav a').forEach(function (a) {
    a.addEventListener('click', function () {
      if (window.innerWidth < 760) closeNav();
    });
  });

  // Scroll reveal — opt in by marking body, so content is never hidden if JS fails
  var els = document.querySelectorAll('.reveal');
  if (els.length && 'IntersectionObserver' in window) {
    document.body.classList.add('js-anim');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
    els.forEach(function (el) { io.observe(el); });
    // Safety net: if anything hasn't revealed shortly after load, show it.
    window.addEventListener('load', function () {
      setTimeout(function () {
        els.forEach(function (el) { el.classList.add('in'); });
      }, 1500);
    });
  }
})();

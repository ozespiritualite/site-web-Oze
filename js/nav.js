document.addEventListener('DOMContentLoaded', function () {
  const burger = document.getElementById('burger');
  const navMenu = document.getElementById('nav-menu');

  // Overlay
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  function openMenu() {
    navMenu.classList.add('ouvert');
    overlay.classList.add('actif');
    burger.textContent = '✕';
  }

  function closeMenu() {
    navMenu.classList.remove('ouvert');
    overlay.classList.remove('actif');
    burger.innerHTML = '&#9776;';
    document.querySelectorAll('.dropdown.ouvert').forEach(function (d) {
      d.classList.remove('ouvert');
    });
  }

  burger.addEventListener('click', function () {
    navMenu.classList.contains('ouvert') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  // Dropdown toggle en mobile (clic sur le lien parent)
  document.querySelectorAll('.dropdown > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        const dropdown = this.parentElement;
        const isOpen = dropdown.classList.contains('ouvert');
        document.querySelectorAll('.dropdown.ouvert').forEach(function (d) {
          d.classList.remove('ouvert');
        });
        if (!isOpen) dropdown.classList.add('ouvert');
      }
    });
  });

  // Fermer le menu sur clic d'un lien final (pas les parents de dropdown)
  document.querySelectorAll('.sous-menu a, #nav-menu > li:not(.dropdown) > a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
});

// ===== SCROLL ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function () {
  var els = document.querySelectorAll('.carte, .avis-carte');
  if (!els.length) return;

  els.forEach(function (el) {
    el.classList.add('will-animate');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var siblings = Array.from(el.parentElement.children);
        var index = siblings.indexOf(el);
        el.style.transitionDelay = (index * 0.18) + 's';
        el.classList.add('visible');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(function (el) { observer.observe(el); });
});

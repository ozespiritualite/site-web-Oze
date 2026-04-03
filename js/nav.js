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

const toggle = document.getElementById('toggle');
  const navLinks = document.getElementById('list-links');

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
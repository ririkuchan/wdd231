// nav toggle
const menuBtn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const exp = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!exp));
    nav.style.display = exp ? 'none' : 'flex';
  });
}
// footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// localStorage example: remember last visited page
try {
  localStorage.setItem('w06-last', location.pathname);
} catch {}


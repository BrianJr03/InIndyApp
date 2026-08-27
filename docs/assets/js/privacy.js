const root = document.documentElement;
const btn = document.getElementById('themeToggle');
const label = document.getElementById('themeLabel');

function currentTheme() {
  const t = root.getAttribute('data-theme');
  if (t) return t;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function syncLabel() {
  const isDark = currentTheme() === 'dark';
  label.textContent = isDark ? 'Light' : 'Dark';
  btn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
}

btn.addEventListener('click', function () {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('inindy-theme', next); } catch (e) {}
  syncLabel();
});

syncLabel();

const nav = document.getElementById('nav');
function onScroll() {
  if (window.scrollY > 4) nav.classList.add('is-scrolled');
  else nav.classList.remove('is-scrolled');
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

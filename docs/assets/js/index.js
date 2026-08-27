// Beta configuration — the only two knobs on this page.
// iOS: TestFlight public link. Requires the build to have cleared Beta App Review —
// leave null until it has, and the button renders in its muted "opening soon" state.
// Android: GitHub Releases page for the latest build. `releases/latest` always
// resolves to the newest published release, where users pick the APK from Assets.
const BETA = {
  ios:     "https://testflight.apple.com/join/Wab2AKJM",
  android: "https://github.com/BrianJr03/InIndyApp/releases/latest",
};

function iosButton() {
  if (BETA.ios) {
    const a = document.createElement('a');
    a.className = 'btn btn-primary';
    a.href = BETA.ios;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = 'Join the iOS beta';
    return a;
  }
  const s = document.createElement('span');
  s.className = 'btn btn-disabled';
  s.setAttribute('aria-disabled', 'true');
  s.setAttribute('tabindex', '-1');
  s.textContent = 'iOS beta — opening soon';
  return s;
}

function androidButton() {
  const a = document.createElement('a');
  a.className = 'btn btn-primary';
  a.href = '#android-setup';
  a.textContent = 'Join the Android beta';
  return a;
}

function renderCtaInto(row) {
  if (!row) return;
  row.appendChild(iosButton());
  row.appendChild(androidButton());
}

renderCtaInto(document.getElementById('ctaTop'));

const releaseLink = document.getElementById('releaseLink');
if (releaseLink) releaseLink.href = BETA.android;

// Theme toggle — persists via localStorage, gracefully fails in sandboxed contexts.
const root = document.documentElement;
const btn = document.getElementById('themeToggle');
const icon = document.getElementById('themeIcon');
const MOON = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
const SUN  = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>';

function currentTheme() {
  const t = root.getAttribute('data-theme');
  if (t) return t;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function syncLabel() {
  const isDark = currentTheme() === 'dark';
  icon.innerHTML = isDark ? SUN : MOON;
  btn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
}

btn.addEventListener('click', function () {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('inindy-theme', next); } catch (e) {}
  syncLabel();
});
syncLabel();

// Nav border appears once the user has scrolled past the header.
const nav = document.getElementById('nav');
function onScroll() {
  if (window.scrollY > 4) nav.classList.add('is-scrolled');
  else nav.classList.remove('is-scrolled');
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Beta configuration — the only knobs on this page.
// iOS: TestFlight public link. Requires the build to have cleared Beta App Review —
// leave null until it has, and the button renders in its muted "opening soon" state.
// Android: direct APK download. `releases/latest/download/<file>` always resolves to
// the newest published stable release (GitHub excludes prereleases from `latest`).
const BETA = {
  ios:         "https://testflight.apple.com/join/Wab2AKJM",
  androidApk:  "https://github.com/BrianJr03/InIndyApp/releases/latest/download/inindy.apk",
  androidPage: "https://github.com/BrianJr03/InIndyApp/releases/latest",
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
  a.className = 'btn btn-secondary';
  a.href = '#android-setup';
  a.innerHTML = 'Join the Android beta <span class="btn-arrow" aria-hidden="true">&darr;</span>';
  return a;
}

function renderCtaInto(row) {
  if (!row) return;
  row.appendChild(iosButton());
  row.appendChild(androidButton());
}

renderCtaInto(document.getElementById('ctaTop'));
renderCtaInto(document.getElementById('ctaBottom'));

const apkLink = document.getElementById('apkDownload');
if (apkLink) apkLink.href = BETA.androidApk;
const releaseLink = document.getElementById('releaseLink');
if (releaseLink) releaseLink.href = BETA.androidPage;

// Populate the version badge from docs/version.json, committed by the release
// workflow. Silent no-op if the file is missing or the fetch fails — the
// download still works via the stable /releases/latest/download/inindy.apk URL.
fetch('./version.json', { cache: 'no-cache' })
  .then(function (r) { return r.ok ? r.json() : null; })
  .then(function (v) {
    if (!v || !v.versionName) return;
    const el = document.getElementById('latestVersion');
    if (el) el.textContent = ' — v' + v.versionName;
  })
  .catch(function () {});

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

// Nav border and scroll-hint arrow both react to page position.
// The hint hides once the user scrolls at all OR when the screenshots
// below the fold have any pixel visible — whichever happens first.
const nav = document.getElementById('nav');
const scrollHint = document.getElementById('scrollHint');
const screensEl = document.querySelector('.screens');
let screensVisible = false;

function updateHint() {
  if (!scrollHint) return;
  const atTop = window.scrollY <= 4;
  scrollHint.classList.toggle('is-hidden', !atTop || screensVisible);
}

function onScroll() {
  nav.classList.toggle('is-scrolled', window.scrollY > 4);
  updateHint();
}

if (scrollHint && screensEl && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(function (entries) {
    screensVisible = entries[0].isIntersecting;
    updateHint();
  }, { threshold: 0.01 });
  io.observe(screensEl);
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

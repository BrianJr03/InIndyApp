<p align="center">
  <img src="docs/assets/logo.svg" alt="InIndy" width="88" height="88">
</p>

<h1 align="center">InIndy</h1>

<p align="center">Discover what's going on InIndy.</p>

<p align="center">
  <a href="https://inindy.co"><strong>inindy.co</strong></a>
  &nbsp;·&nbsp;
  <a href="https://inindy.co/privacy.html">Privacy</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/BrianJr03/InIndy">App source</a>
  &nbsp;·&nbsp;
  <a href="mailto:brian.walker@inindy.co">Contact</a>
</p>

---

InIndy is where folks share trail runs, pickup games, park picnics, and whatever else is going on in Indianapolis. Find one, join it, show up.

Free. No ads. Made in Indy.

**This repository holds the InIndy website.** It's a static site published with GitHub Pages from `docs/` and served at [inindy.co](https://inindy.co). The app itself lives in [BrianJr03/InIndy](https://github.com/BrianJr03/InIndy).

## The app

**Neighborhoods** — Posts stay in the neighborhood they belong to, so your feed looks like your part of the city.

**Groups** — Run clubs, pickup leagues, book swaps. Join a group and its posts find you.

**Photos** — See the trail, the field, the noteworthy view, before deciding to come.

Two ways to use it:

| If you're going | If you're hosting |
| --- | --- |
| Browse what's going on near you | Post the time and place |
| See who else is in | Pick a neighborhood |
| Show up | Connect with others |

## Getting the app

InIndy is in **Android beta**. It isn't on the Google Play Store yet, so builds are distributed as an APK from the [releases page](https://github.com/BrianJr03/InIndy/releases).

A few things worth knowing before you sideload:

- Android will ask permission to install unknown apps, and Play Protect will likely warn you. Both are expected for anything not installed from the Play Store.
- The beta will not auto-update. New builds have to be downloaded manually.
- Uninstall the beta before installing the eventual Play Store version — the two are signed with different keys and the upgrade will fail otherwise. Your account and posts live on the server and come back when you sign in again.

Full instructions, including the SHA-256 checksum, are on [inindy.co](https://inindy.co).

## Repository layout

```
docs/
├── index.html          # Landing page
├── privacy.html        # Privacy policy
├── CNAME               # Custom domain (inindy.co)
├── .nojekyll           # Serve files as-is, skip Jekyll
└── assets/
    ├── logo.svg        # Primary mark
    ├── logo-mono.svg   # Single-colour mark (currentColor)
    ├── favicon.svg
    ├── favicon-32.png
    ├── apple-touch-icon.png
    └── og-image.png    # Social preview
```

Both pages are self-contained: styles and scripts are inline, and the only external dependency is Google Fonts. There is no build step and no package manager.

## Running locally

```bash
python3 -m http.server 8000 --directory docs
```

Then open <http://localhost:8000>.

## Privacy

The website collects nothing — no analytics, no tracking scripts, no cookies, no forms. What the app collects is documented in the [privacy policy](https://inindy.co/privacy.html).

---

© 2026 InIndy · Made with 💜

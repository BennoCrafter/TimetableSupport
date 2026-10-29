# Timetable Manager — Website

[Website](https://timetablemanager.app) for [Timetable Manager](https://apps.apple.com/us/app/timetable-manager/id6738605424) iOS/iPadOS app. Static HTML/CSS/JS, deployed on Vercel.

No build step on deploy and no dependencies: what's in the repo is what gets served. The one generated file, `de/index.html`, is committed.

## Develop

```sh
open index.html                  # works without a server (all paths are relative)
python3 -m http.server 8000      # or serve it: http://localhost:8000/index.html
node scripts/build-de.mjs        # after editing index.html or translations/home.de.json
node --test tests/               # API tests + checks de/index.html is up to date (Node 20+)
```

Keep paths relative (`assets/...`, never `/assets/...`) so the site also works from `file://` and under a sub-path like GitHub Pages; `header.js`/`footer.js` resolve theirs from their own script URL. The feedback form needs the `/api` function, which only runs on Vercel (`vercel dev` locally, with `GITHUB_TOKEN` set).
`vercel.json` enables `cleanUrls`, so production serves `/imprint` as well as `/imprint.html`.

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | Landing page, English |
| `translations/home.de.json` | German strings for the landing page |
| `de/index.html` | German landing page, **generated** from `index.html` + `translations/home.de.json` by `scripts/build-de.mjs`, don't edit |
| `feedback.html` | Feedback form → posts to `/api/create-issue` |
| `privacy-policy.html`, `imprint.html` | Legal pages (`.page-hero` + `.content-card`) |
| `404.html` | Not-found page, served by Vercel at any depth, so its paths are root-absolute (`/assets/…`) |
| `new-event.html` | Redirects shared event links to the app (`timetablemanager://new-event?…`) |
| `styles.css` | All shared styles. Design tokens are CSS variables at the top: brand colors from the app icon (`--navy`, `--sun`, `--coral`) and the app's subject colors (`--s-*`, applied via `.s-de`, `.s-ma`, … which set `--c`) |
| `assets/js/theme.js` | Light/dark toggle; loaded in `<head>` to avoid a theme flash |
| `assets/js/header.js`, `assets/js/footer.js` | Render the shared header/footer into `<header class="site-header">` / `<footer class="site-footer">` |
| `assets/js/i18n.js` | EN/DE switching + strings shared by all pages; sends German visitors from `/` to `/de/` |
| `robots.txt`, `sitemap.xml` | For search engines. Add new indexable pages to the sitemap |
| `api/create-issue.js` | Vercel function: creates a GitHub issue in `BennoCrafter/Timetable` (env: `GITHUB_TOKEN`) |
| `assets/images/screenshots/{hero,app}/{en,de}/` | App screenshots, one set per language: `hero/` the iPad dashboard, `app/` raw iPhone screens (640px webp, converted from `Timetable/assets/screenshots/raw/`) |
| `assets/images/og/{en,de}/card.png` | 1200×630 social preview, a headless-Chrome screenshot of the homepage hero. Re-shoot it if the hero changes |

## How a page works

Every page uses the same skeleton. `theme.js` and `i18n.js` go in `<head>` so the saved theme and the `/` → `/de/` redirect happen before first paint; both act on the header/footer at `DOMContentLoaded`.

```html
<head>
  <script src="assets/js/theme.js"></script>   <!-- first: applies saved theme before paint -->
  <script src="assets/js/i18n.js"></script>
  ...
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header class="site-header"></header>        <!-- data-cta="home" swaps App Store button for "Back to home" -->
  ... page content with data-i18n="key" attributes ...
  <footer class="site-footer"></footer>

  <script>window.TRANSLATIONS = { en: { key: "…" }, de: { key: "…" } };</script>
  <script src="assets/js/header.js"></script>
  <script src="assets/js/footer.js"></script>
</body>
```

**Translations:** mark an element with `data-i18n="key"` (text) or `data-i18n-<attribute>="key"` (`placeholder`, `alt`, `content`), and add `key` to the page's `window.TRANSLATIONS` for both `en` and `de`. Strings used on every page go in `COMMON` in `i18n.js`. Localized images use `data-src-en` / `data-src-de`.

**Homepage is the exception:** it exists as two real pages (`/` and `/de/`) so Google indexes German too. English is the markup of `index.html`, German is `translations/home.de.json`. Edit either, then run `node scripts/build-de.mjs`; the build fails if a key has no German string. On these two pages the EN/DE buttons navigate between `/` and `/de/`. Visitors whose language is German (`?lang=`, saved choice, or browser) are redirected from `/` to `/de/`, never the other way, because Google crawls in English and must be able to reach `/de/`.

**Theme:** `theme.js` stores the choice in `localStorage["tm-theme"]`; with no choice the OS setting applies. Colors come from CSS variables, so new components should use `var(--ink)`, `var(--surface)`, `var(--accent)` etc. and get dark mode for free.

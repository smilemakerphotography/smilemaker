# Developer notes — Smile Maker Photography site

Read this first when coming back to the project. `ADMIN-GUIDE.md` is the
owner's guide (photos only); this file is for whoever touches the code.

## Where things are

| What | Where |
|---|---|
| Live site | https://smilemakerphotography.github.io/smilemaker/ |
| Repo | https://github.com/smilemakerphotography/smilemaker (branch `main`) |
| Local checkout | `E:\SCRIPT-PRACTICE\smilemaker\smilemaker` (the nested folder is the repo) |
| Build/deploy status | https://github.com/smilemakerphotography/smilemaker/actions |
| Published files | branch `gh-pages` (generated — never edit by hand) |
| GitHub Pages setting | Settings → Pages → Branch `gh-pages` / root |
| Contact-form email | EmailJS; IDs in `.env` (`REACT_APP_EMAILJS_*`) |

## How publishing works

Push to `main` → `.github/workflows/deploy.yml` runs:
compress new photos → commit them back (`[auto] compress photos`) → `npm test`
→ `npm run build` → publish `build/` to `gh-pages`. About 3 minutes.

There is nothing to run locally to deploy. `npm run deploy` still exists as a
manual fallback only.

## Photos

- One folder per area under `src/images/`: `hero`, `wedding`, `model`,
  `portfolio`, `outdoor`, `baby`. Any filename; alphabetical order;
  `cover.*` in a service folder is the card image.
- `src/images.js` is the only file that knows this layout (uses
  `require.context` recursively). Add a new service there: add an entry with
  an `id` and create the matching folder.
- `scripts/compress-images.py` — resizes to 1920px, converts to WebP in
  place. CI runs it; run locally with `python scripts/compress-images.py`
  (needs `pip install pillow pillow-heif`).
- `publish-photos.bat` — one-click commit+push of `src/images` from a PC.

## Code map (`src/`)

| File | Purpose |
|---|---|
| `App.js` | Page layout: NavBar, HomeSlides, About, Service, Gallery, Contact, Footer |
| `images.js` | Photo registry + service titles/descriptions (edit text here) |
| `EnquiryContext.js` | Lets a service card's "Enquiry" pre-select the shoot type in Contact |
| `components/Lightbox.js` | Full-screen viewer (← → Esc) |
| `components/PhotoGridPopup.js` | Grid of a category's photos → Lightbox |
| `components/overlays.css` | Shared popup/glass-panel/button styles (`.btn`, `.overlay`, …) |
| `hooks/useOverlay.js` | Esc/arrow keys + body scroll lock for every popup |
| `hooks/useIsMobile.js` | `matchMedia(max-width: 600px)`, updates on rotate |
| `*.css` next to each component | That component's styles (no inline style objects) |
| `public/index.html` | Title, description, Open Graph, JSON-LD, Google Fonts |

## Commands

```
npm start                                   # dev server
CI=true npm run build                       # production build, warnings = errors (same as CI)
CI=true npx react-scripts test --watchAll=false
python scripts/compress-images.py
```

## Git access

Pushing needs the `smilemakerphotography` GitHub login (or a collaborator).
If push returns 403 from another account:
`cmdkey /delete:git:https://github.com` then `git push` → sign in again.

## Changelog

### 2026-09-19 — performance, cleanup, owner-managed photos
- Images 37.5 MB → 4 MB (WebP, 1920px). First load ~10 MB → 1.7 MB.
- Hero shows the first slide immediately (no full-page spinner).
- Gallery carousel shows a curated set; category grids load on demand.
- One shared Lightbox/PhotoGridPopup instead of two copies; Esc/arrow keys,
  scroll lock, keyboard-operable cards and dots.
- Fonts loaded once in `<head>`; real title/description/OG image/JSON-LD/
  sitemap; favicon + icons generated from the logo (were 404).
- `emailjs-com` → `@emailjs/browser`; IDs in `.env`; honeypot field.
- Removed committed build output (`index.html`, `static/`, `build/`,
  `.git.zip`), `smilemaker.css` template junk, unused deps
  (`simple-react-lightbox`, `process`).
- Folder-per-area photos + GitHub Action auto-deploy + `ADMIN-GUIDE.md` +
  `publish-photos.bat`. GitHub Pages switched from `main` to `gh-pages`.
- Tests rewritten (`App.test.js`) and run in CI.

### Ideas not done yet
- Custom domain (~₹700/yr) — biggest SEO/trust win.
- WhatsApp click-to-chat button.
- Testimonials section.
- Free analytics (Cloudflare Web Analytics).
- Vite migration (CRA is unmaintained) — ~1–2 h.
- EmailJS: restrict allowed origins to `smilemakerphotography.github.io`
  (dashboard setting, not code).

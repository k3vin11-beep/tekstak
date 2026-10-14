# Speed tuning checklist (Premium)

**Why it matters:** fast sites keep visitors and are favoured by Google, especially on phones. The template is built to be fast
already. This checklist shows what was done and how to keep it fast.

## Already built in

- [x] **No heavy fonts.** The site uses fonts already on the visitor's device, so there is nothing to download.
- [x] **Images optimised.** Every photo is resized, converted to WebP and delivered in several sizes (`src/components/Img.astro`).
- [x] **Lazy-loading.** Photos below the first screen load only when scrolled to. The main photo loads at once and is marked
  `fetchpriority="high"` so it appears quickly.
- [x] **Photo sizes are declared** (width and height) so the page does not jump while loading.
- [x] **CSS is inlined** into each page (`build.inlineStylesheets` in `astro.config.mjs`), one request fewer.
- [x] **No JavaScript framework** is sent to the visitor. Pages are plain HTML.
- [x] **Hover prefetch.** When a visitor hovers a menu link the next page starts loading (`prefetch` in `astro.config.mjs`).
- [x] **Analytics is async** and only loads on the live site.

## How to test (do this before every launch)

1. Open <https://pagespeed.web.dev> and enter the live address.
2. Test **Mobile** first. Aim for green scores (90+) on Performance, Accessibility and SEO.
3. Read the "Opportunities" list.

## Things that slow a site down (watch for these)

| Problem | Fix |
|---|---|
| Client uploads a huge photo straight from a camera (20 MB) | It is shrunk automatically, but ask for photos under 5 MB to keep builds quick |
| Video added to the home page | Link to YouTube or use a small clip, and lazy-load it |
| Adding chat widgets, pop-ups or extra tracking scripts | Each one adds weight. Only add what the client really needs |
| A web font from Google Fonts | If the brand needs one, self-host one weight and use `font-display: swap` |
| Too many gallery photos on one page | Keep to 12 to 20 or split into pages |

## What "good" looks like

Largest Contentful Paint under about 2.5 seconds, no layout jumping, and a fast first tap. Report the before and after
scores to the client. It is a good talking point.

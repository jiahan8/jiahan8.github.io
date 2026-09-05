# Jeff Tan — Portfolio

React + TypeScript + Vite, prerendered to static HTML, deployed to GitHub Pages.

```bash
npm install
npm run dev       # dev server
npm run build     # type-check, build, prerender
npm run preview   # serve dist/
```

## Editing content

`src/data/portfolio.ts` is the single source of truth — experience, education, skills and
projects, plus `profile` and `certification`. It also exports `personJsonLd()`, which
builds the schema.org block from that same data, so changing a job updates the page and
the structured data together. Section copy lives in `src/pages/HomePage.tsx`.

## Build

Alongside the client bundle, `npm run build` does an SSR pass (`src/entry-server.tsx`) and
runs `scripts/prerender.mjs`, which writes the rendered HTML and JSON-LD into
`dist/index.html`. Without it the page ships an empty `<div id="root">` and crawlers that
don't run JS — LinkedIn, Slack, X — see nothing.

The client hydrates that markup, so two things need to stay as they are: the inline theme
script in `index.html` (sets `data-theme` before first paint) and the theme toggle
rendering both glyphs with CSS picking one. Changing either reintroduces hydration
mismatches.

## Social card

`public/images/og-image.jpg` is committed, not built. To regenerate: open
`scripts/og-card.html` in a browser, screenshot at exactly 1200×630, save over the jpg. It
uses `public/images/mountain.webp`, which is kept for that reason alone.

## Deploy

Push to `main` — `.github/workflows/deploy-pages.yml` builds and publishes `dist/`.
One-time setup: **Settings → Pages → Source → GitHub Actions**.

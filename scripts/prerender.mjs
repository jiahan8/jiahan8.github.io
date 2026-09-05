// Injects the server-rendered markup into the built index.html.
//
// The site is a single static page whose content lives in src/data/portfolio.ts, so a
// react-dom/server pass is enough — no headless browser, no SSR runtime. Crawlers that
// don't execute JavaScript (LinkedIn, Slack, X, most AI crawlers) get the full page.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = path.join(root, 'dist', 'index.html')
const ssrDir = path.join(root, 'dist-ssr')
const ssrEntry = path.join(ssrDir, 'entry-server.js')
const PLACEHOLDER = '<div id="root"></div>'
const JSONLD_PLACEHOLDER = '<script type="application/ld+json" data-jsonld>{}</script>'

if (!fs.existsSync(ssrEntry)) {
  throw new Error(`Missing SSR bundle at ${ssrEntry} — run the ssr build first.`)
}

let html = fs.readFileSync(htmlPath, 'utf8')
for (const [name, marker] of [
  ['root', PLACEHOLDER],
  ['json-ld', JSONLD_PLACEHOLDER],
]) {
  if (!html.includes(marker)) {
    throw new Error(`Could not find the ${name} placeholder in dist/index.html.`)
  }
}

const { render, personJsonLd } = await import(pathToFileURL(ssrEntry).href)

const appHtml = render()
if (!appHtml || appHtml.length < 500) {
  throw new Error(`Prerender produced suspiciously little markup (${appHtml.length} chars).`)
}

// Escaping "<" keeps a stray "</script>" in the data from closing the tag early.
const jsonLd = JSON.stringify(personJsonLd()).replace(/</g, '\\u003c')

html = html.replace(PLACEHOLDER, `<div id="root">${appHtml}</div>`)
html = html.replace(
  JSONLD_PLACEHOLDER,
  `<script type="application/ld+json">${jsonLd}</script>`,
)
fs.writeFileSync(htmlPath, html)
fs.rmSync(ssrDir, { recursive: true, force: true })

console.log(
  `prerender: ${appHtml.length.toLocaleString()} chars of markup + ` +
    `${jsonLd.length.toLocaleString()} chars of JSON-LD into dist/index.html`,
)

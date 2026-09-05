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

if (!fs.existsSync(ssrEntry)) {
  throw new Error(`Missing SSR bundle at ${ssrEntry} — run the ssr build first.`)
}

const html = fs.readFileSync(htmlPath, 'utf8')
if (!html.includes(PLACEHOLDER)) {
  throw new Error(`Could not find ${PLACEHOLDER} in dist/index.html — nothing to prerender into.`)
}

const { render } = await import(pathToFileURL(ssrEntry).href)
const appHtml = render()

if (!appHtml || appHtml.length < 500) {
  throw new Error(`Prerender produced suspiciously little markup (${appHtml.length} chars).`)
}

fs.writeFileSync(htmlPath, html.replace(PLACEHOLDER, `<div id="root">${appHtml}</div>`))
fs.rmSync(ssrDir, { recursive: true, force: true })

console.log(`prerender: injected ${appHtml.length.toLocaleString()} chars into dist/index.html`)

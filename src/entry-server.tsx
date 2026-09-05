import { renderToString } from 'react-dom/server'
import App from './App'

/**
 * Build-time entry point. `scripts/prerender.mjs` calls this and injects the result
 * into dist/index.html so crawlers that don't execute JavaScript still see the page.
 */
export function render() {
  return renderToString(<App />)
}

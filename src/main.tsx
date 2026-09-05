import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// The markup is prerendered at build time (scripts/prerender.mjs), so attach to it
// rather than throwing it away and re-rendering from scratch.
hydrateRoot(
  document.getElementById('root')!,
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

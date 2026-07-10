# Jeff Tan — Portfolio

A personal portfolio website built with React, TypeScript, and Vite, deployed to GitHub Pages.

## Sections

- About Me
- Education
- Work Experience
- Side Projects

## Local Development

1. Install dependencies:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npm run dev
   ```
3. Build for production:
   ```
   npm run build
   ```

## Customizing Content

Edit `src/data/portfolio.ts` to update work experience, education, and project listings.

Edit `src/pages/HomePage.tsx` to update the hero intro text, skills, and social links.

## GitHub Pages Deployment

Deployments are automated via GitHub Actions on every push to `main`.

1. In GitHub, go to **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `main` — the `Deploy to GitHub Pages` workflow will build and publish automatically.


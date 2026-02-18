# Senior Software Engineer Portfolio

A polished multi-page portfolio website built with React, TypeScript, Vite, and React Router.

## Sections included
- About Me
- Projects
- Working Experience
- Education

## Routes
- `/` Home
- `/about`
- `/projects`
- `/experience`
- `/education`

## Customize content
Edit these values in `src/App.tsx`:
- Name and intro text in the hero section
- Project list in `projects`
- Experience entries in `experiences`
- Education details

## Local development
1. Install Node.js (LTS) and npm.
2. Install dependencies:
   - `npm install`
3. Run development server:
   - `npm run dev`
4. Build for production:
   - `npm run build`

## Notes
This environment did not have Node.js tooling preinstalled during setup, so dependency installation and compile checks must be run after Node.js is installed.

## GitHub Pages deployment
This project is configured to deploy with GitHub Actions from the built `dist` output.

1. Push changes to the `main` branch.
2. In GitHub, go to **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Wait for the `Deploy to GitHub Pages` workflow to finish.

If Pages serves the repository files directly instead of `dist`, browsers may try to load `src/main.tsx` and fail with a MIME type error.

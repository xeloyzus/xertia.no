# Xertai

Personal portfolio and project site for Xertai — full-stack software, machine learning, and robotics. Built with React, TypeScript, Vite, Tailwind CSS, and GSAP.

## Stack

- **React 19** + **TypeScript** (strict)
- **Vite 7** for build tooling
- **Tailwind CSS 3** for styling
- **GSAP** with ScrollTrigger for scroll-driven animation
- **Lucide React** for icons

## Getting started

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (default `http://localhost:5173`).

## Scripts

| Command           | Description                                |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Start the development server with HMR.     |
| `npm run build`   | Type-check and produce a production build. |
| `npm run preview` | Preview the production build locally.      |
| `npm run lint`    | Run ESLint over the project.               |

## Adding projects

Projects are driven entirely by `src/data/projects.json` — no code changes needed.

```json
{
  "projects": [
    {
      "name": "Project name",
      "description": "Short description of what it does.",
      "url": "https://github.com/username/repo",
      "tags": ["typescript", "computer-vision"]
    }
  ]
}
```

Each project renders as a card linking to `url`. `tags` is optional.

## Project structure

```
src/
  components/    Shared components (Navigation, AsciiCore)
  data/          Editable content (projects.json)
  sections/      Page sections (Hero, Services, Capabilities, Projects, Contact)
  main.tsx       Entry point
  index.css      Global styles + Tailwind layers
public/          Static assets
```

## Deployment

`npm run build` outputs static assets to `dist/`. Host the contents on any static host (GitHub Pages, Vercel, Netlify, Cloudflare Pages, etc.).
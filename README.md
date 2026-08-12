# Xertai

Website for Xertai, an AI and automation startup. Built with React, TypeScript, Vite, Tailwind CSS, and GSAP.

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

| Command            | Description                              |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Start the development server with HMR.   |
| `npm run build`    | Type-check and produce a production build |
| `npm run preview`  | Preview the production build locally.    |
| `npm run lint`     | Run ESLint over the project.             |

## Project structure

```
src/
  components/    Shared components (Navigation)
  sections/      Page sections (Hero, Services, Tech, Projects, Contact)
  main.tsx       Entry point
  index.css      Global styles + Tailwind layers
public/          Static assets
```

## Deployment

`npm run build` outputs static assets to `dist/`. Host the contents on any static host (Vercel, Netlify, Cloudflare Pages, etc.).
# Portfolio — Iftekhar Anwar

My personal portfolio. Product work, shipped iOS apps, applied ML, and hackathon wins.

**Live:** [iftekharanwar.vercel.app](https://iftekharanwar.vercel.app)

## Built with

- **Next.js 16** (App Router) + **React 19**
- **TypeScript** + **Tailwind CSS v4**
- **GSAP** + **ScrollTrigger** for animation, **Lenis** for smooth scroll
- Image optimization with **sharp** → WebP

Accessibility and performance are first-class: a `useReducedMotion` hook disables motion for users who ask for it, the contact form is sanitized with DOMPurify, and all imagery is served as optimized WebP.

## Featured work

- **Shoebox** — a daily photo-guessing iOS game graded against your own EXIF, fully on-device (SwiftUI, Swift 6)
- **BrainCurve** — second-by-second neural engagement from video, built on Meta's TRIBE encoder (HuBERT + DINOv2)
- **3D Heritage Generator** — 1st prize, HackCultura (Italian Ministry of Culture); 2D archives → 3D across the Apple ecosystem
- **Pest Prediction** — 2nd place + i3p incubation, NASA Space Apps Turin; ML pest-outbreak forecasting

## Run locally

```bash
npm install
npm run dev               # http://localhost:3000
npm run build             # production build
npm run optimize-images   # regenerate WebP assets
```

## Structure

- `app/` — routes, layout, metadata, sitemap/robots
- `components/` — sections (Hero, About, Projects, Contact) and the project detail view
- `data/projects.ts` — the project content model
- `lib/animation-constants.ts` — shared animation tokens
- `public/images/projects/` — optimized project imagery

## License

MIT — see [LICENSE](./LICENSE).

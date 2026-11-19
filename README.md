# Kanigiri Restaurant — Taste of Andhra

Frontend-only restaurant website (mock data), built like the reference design:
Mutton Biryani hero, dish carousel, menu, reviews and footer.

- **Stack:** Svelte 5 + SvelteKit 3 + Vite 8 + TypeScript + Tailwind CSS 4,
  `@sveltejs/adapter-static` (prerendered, static output in `build/`)
- **Fonts:** Playfair Display + Great Vibes + Inter (self-hosted via
  `@fontsource`, no CDN)
- **Images:** generated PNG masters in `static/images/original/`, converted
  with sharp to AVIF → WebP → JPG @ 480/800/1200/1600 via `npm run images`,
  rendered through one reusable `#lib/components/Picture.svelte`
- **Mock data only:** all dishes, prices, reviews and contact details live in
  `src/lib/data/site.ts` — replace after the client approves the design

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run check      # svelte-check, 0 errors
npm run build      # static output in build/
npm run preview    # serve the built site
npm run images     # regenerate AVIF/WebP/JPG from PNG masters
```

## Deploy

Push to `main` → GitHub Actions builds and deploys to Cloudflare Pages
(`kanigiri-restaurant.pages.dev`). Repo secrets required:
`CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` (same setup as
`lumina-beauty-studio`).

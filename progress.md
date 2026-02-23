# Dad Skeleton Site Progress

Last updated: February 23, 2026
Repository: `jacobpopcantstop/dadskeleton`
Branch: `main`

## Current State

### Completed and Live
- Site deployed codebase now includes real photography across main pages (`/`, `/about`, `/gallery`, `/calendar`, `/get-involved`).
- Global site typography is set to Courier-family styling.
- Brand logo is integrated site-wide:
  - Header logo
  - Footer logo
  - Browser/app icon metadata (`app/icon.png`, `metadata.icons`)
- A full copywriting intake sheet is in place at `content/copywriting-sheet.csv` (243 structured rows).
- Gallery is no longer placeholder-based and now renders real images from `public/photos`.

### Content/UX Status by Page
- `/` Home: Real photos + core copy present.
- `/about`: Real photos + team grid populated with names/roles + improved alt text.
- `/gallery`: Real photo grid populated.
- `/calendar`: Real photos + seeded upcoming show entries.
- `/get-involved`: Real photos + class/discord/submit sections populated.
- `/videos`: Structure exists, but videos are still placeholder entries (`Coming Soon` and no embed URLs).
- `/tools`: Fully functional generators + writing tools directory links.
- `/bone-zone`: Gated experience works, but includes placeholder areas (secret video embed/wallpaper downloads).
- `404`: Custom themed page implemented.

## Open To-Dos

### High Priority
- [ ] Replace placeholder video data in `app/videos/page.tsx` with real YouTube embeds/titles.
- [ ] Fill `new_text` in `content/copywriting-sheet.csv` and apply finalized human-written copy site-wide.
- [ ] Update outdated dates/venues in `app/calendar/page.tsx` to current show schedule.
- [ ] Add real ticket links for each calendar event (currently informational only).

### Medium Priority
- [ ] Move hardcoded page copy into a single content source (JSON/TS config or CMS-style layer).
- [ ] Add admin/editor flow in this repo for updating copy/images without code edits.
- [ ] Improve image performance:
  - Convert large JPG/PNG assets to optimized web formats where appropriate.
  - Consider `next/image` for page image grids where practical.
- [ ] Complete SEO metadata per page (title/description/Open Graph image).

### Low Priority / Nice-to-Have
- [ ] Replace Bone Zone placeholder blocks:
  - Secret video embed
  - Downloadable wallpaper assets/links
- [ ] Add analytics/events for CTA tracking (Substack, Discord, ticket clicks).
- [ ] Add automated checks/lint in CI (repo currently does not have dependencies installed in this local environment).

## Notes
- Recent progress was recovered and shipped from local work into this repo on February 23, 2026.
- Related but separate repo exists: `jacobpopcantstop/Dad-Skeleton-Site` (different history and additional unsynced local work).

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- **Next.js 16** with App Router (all routes in `app/` directory)
- **React 19** with Server Components by default
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** using the new `@import "tailwindcss"` syntax
- **Inter font** loaded via `next/font/google`

## Architecture

- Uses Next.js App Router conventions: `layout.tsx` for layouts, `page.tsx` for routes
- Path alias `@/*` maps to project root
- Global `Header` component in `components/Header.tsx` included in root layout
- CSS custom properties for theming defined in `app/globals.css` with dark mode via `prefers-color-scheme`
- Static assets served from `public/`

## Theme Colors

The site uses a Black/White/Pink/Yellow color palette defined as CSS custom properties:
- `--pink` (#ff69b4) - Primary accent, used for links and CTAs
- `--purple-pink` (#da70d6) - Video borders
- `--yellow` (#ffd700) - Highlight color for dates and emphasis
- `--foreground` / `--background` - Swap between light and dark mode

Use Tailwind classes like `text-pink`, `border-purple-pink`, `bg-yellow` to apply theme colors.

## Pages

- `/` - Home page with hero and featured show
- `/about` - Troupe bio and mission
- `/videos` - Video grid with YouTube/Vimeo embeds
- `/calendar` - Upcoming shows listing
- `/gallery` - Image grid for production stills

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page portfolio website for Tennyson Moss — graphic designer, motion artist, and filmmaker. Pure static HTML/CSS with no build step, deployed to Cloudflare Pages via `wrangler.jsonc`.

## CSS workflow

Styles live in `css/` as LESS partials. After editing any `.less` file, recompile:

```
npm run build:css
```

To watch for changes automatically while working:

```
npm run watch:css
```

The compiled `css/main.css` is committed to the repo so Cloudflare Pages can serve it without a build step.

**Partial structure:**

| File | Covers |
|---|---|
| `_variables.less` | Colors, fonts, breakpoints |
| `_base.less` | Reset, `html`, `body`, focus styles |
| `_layout.less` | `.wrap`, `.stripe` |
| `_nav.less` | `header`, `.nav`, `.nav-toggle` hamburger |
| `_hero.less` | `.hero`, `.slateline` |
| `_sections.less` | `section`, `.scene`, `.project-caption`, `.placeholder-label` |
| `_work.less` | `.grid`, `.tile` |
| `_motion.less` | `.motion-stack`, `.video-hero`, `.logo-row` |
| `_interactive.less` | `.rive-frame`, `.city-buttons` |
| `_about.less` | `.about-cols`, `.facts` |
| `_contact.less` | `.contact` |
| `_footer.less` | `footer` |
| `_animations.less` | Scroll-in reveals, hero highlight sweep, scene-tag clap |
| `_responsive.less` | All `@media` breakpoints (incl. mobile hamburger menu) |

## Deployment

Hosted on Cloudflare Pages. The `wrangler.jsonc` config serves the entire repo root as static assets. To preview locally, run:

```
npx wrangler pages dev .
```

To deploy, push to `main` on GitHub — the Cloudflare Pages project is git-connected and deploys automatically (direct `npx wrangler deploy` requires a `CLOUDFLARE_API_TOKEN` that is not configured locally).

## Architecture

All markup is in `index.html`; styles come from the compiled `css/main.css`. JavaScript is vanilla, progressive enhancement only:
- `js/main.js` — scroll-in reveals (IntersectionObserver, respects `prefers-reduced-motion`), mobile hamburger toggle, nav scroll-spy
- `js/interactive.js` — Rive city skyline (SC 01): loads `assets/city_line.riv`, drives the `city_state` number input on `State Machine 1` (0 = initial, 1 = Seattle, 2 = St. Louis, 3 = Nashville) via the `.city-buttons`; runtime is `@rive-app/canvas` from unpkg

**Design system tokens** (CSS custom properties in `:root`):
- `--ink` `#16161a` — primary text/dark
- `--paper` `#f2f2ee` — background
- `--clapper` `#ffc700` — accent yellow (signature brand color)
- `--grey` `#6b6b66` — secondary text
- `--line` `#d8d8d2` — borders

**Fonts** (Google Fonts):
- `Anton` — display headings
- `Archivo` — body copy
- `Space Mono` — labels, tags, metadata

**Section structure** — five "scenes" with clapperboard-style scene numbers:
- `SC 01 #interactive` — Rive city skyline + city buttons
- `SC 02 #motion` — Motion & Film (video embeds)
- `SC 03 #work` — Graphic Design (image grid)
- `SC 04 #about` — Bio + facts table
- `SC 05 #contact` — Email CTA

**Assets** (`assets/`) — all media files referenced directly from HTML. No asset pipeline.

## Pending work (marked with `<!-- PLACEHOLDER -->` comments in HTML)

- SC 03: Second project caption for Costa Vida / FatCats print pieces when ready; lightbox for the work grid planned
- SC 04 About copy: rewrite in Tennyson's voice (3 short paragraphs max)
- SC 01: Verify `city_state` value 3 draws Nashville (the .riv also contains a New York state; mapping may need a remap in the Rive editor)

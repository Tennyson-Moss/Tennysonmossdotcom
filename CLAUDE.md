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
| `_nav.less` | `header`, `.nav` |
| `_hero.less` | `.hero`, `.slateline` |
| `_sections.less` | `section`, `.scene`, `.project-caption`, `.placeholder-label` |
| `_work.less` | `.grid`, `.tile` |
| `_motion.less` | `.motion-stack`, `.video-hero`, `.logo-row` |
| `_interactive.less` | `.rive-frame` |
| `_about.less` | `.about-cols`, `.facts` |
| `_contact.less` | `.contact` |
| `_footer.less` | `footer` |
| `_responsive.less` | All `@media` breakpoints |

## Deployment

Hosted on Cloudflare Pages. The `wrangler.jsonc` config serves the entire repo root as static assets. To preview locally, run:

```
npx wrangler pages dev .
```

To deploy:

```
npx wrangler deploy
```

## Architecture

Everything is in `index.html` — all CSS is in a `<style>` block in `<head>`, all markup is inline. There is no JavaScript yet (the Rive interactive section is a placeholder).

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
- `SC 01 #work` — Graphic Design (image grid)
- `SC 02 #motion` — Motion & Film (video embeds)
- `SC 03 #interactive` — Rive placeholder
- `SC 04 #about` — Bio + facts table
- `SC 05 #contact` — Email CTA

**Assets** (`assets/`) — all media files referenced directly from HTML. No asset pipeline.

## Pending work (marked with `<!-- PLACEHOLDER -->` comments in HTML)

- SC 03: Rive canvas demo — replace the `.rive-frame` placeholder with `@rive-app/canvas` runtime and mount
- SC 01: Second project caption for Costa Vida / FatCats print pieces when ready
- SC 04 About copy: rewrite in Tennyson's voice (3 short paragraphs max)

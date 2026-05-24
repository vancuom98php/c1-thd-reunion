# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Vietnamese-language landing page for a 10-year class reunion (class THĐ-C1-13_16, event date 2026-10-10). Built with Next.js 16 + React 19, backed by MySQL.

## Critical: Next.js 16 breaking changes

This project uses Next.js 16.2.6 which has breaking changes from training data. **Read the relevant guide in `node_modules/next/dist/docs/` before writing any Next.js code.** Heed deprecation notices. Do not assume APIs, conventions, or file structure match older versions.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npm run db:setup     # Create DB + run migrations + seed (first time)
npm run db:create    # Create database only
npm run migration    # Run schema.sql
npm run seeder       # Seed sample data
npm run seed-admin   # Create/reset admin account (admin / maiyeuc1)
npm run generate-blur # Generate LQIP blur placeholders for gallery photos
```

## Environment

Copy `.env.local.example` to `.env.local`. Required vars: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`, `JWT_SECRET`, `AWS_S3_BUCKET`, `AWS_S3_REGION`.

## Architecture

### App Router structure (`src/app/`)

- `layout.js` — Root layout (loads Google Fonts, S3 preconnect)
- `LayoutShell.jsx` — Client component wrapping all pages with Navbar, Footer, ShootingStars, MusicPlayer, ProgressBar. Admin routes (`/admin/*`) opt out of this chrome.
- Pages: `/`, `/about`, `/timeline`, `/program`, `/venue`, `/register`, `/guestbook`, `/gallery`, `/album`, `/livestream`, `/admin`, `/admin/login`

### API routes (`src/app/api/`)

- `POST /api/register` — Event registration (validated with Zod)
- `GET /api/gallery?year=&limit=` — Gallery photos from DB
- `POST /api/guestbook` — Submit guestbook entry
- `POST /api/admin/login` / `POST /api/admin/logout` — JWT-based admin auth
- `GET /api/admin/registrations` — Admin-only registration list

### Shared libraries (`src/lib/`)

- `db.js` — MySQL connection pool via `mysql2/promise`. Uses `pool.query()` (not `pool.execute()`) for LIMIT/OFFSET compatibility. Import as `import { query } from '@/lib/db'`.
- `auth.js` — JWT sessions via `jose`, password hashing via `bcryptjs`. Cookie-based (`admin_token`, 7-day expiry).
- `rateLimit.js` — Stub; `checkRateLimit()` currently always returns `{ ok: true }`.

### Database (`db/`)

MySQL 8+ with tables: `admins`, `registrations`, `guestbook`, `gallery_photos`, `timeline_photos`. Schema in `db/schema.sql`.

### Path alias

`@/*` maps to `./src/*` (configured in `jsconfig.json`).

### Images

Gallery/timeline images are stored in S3. `next.config.mjs` allows remote patterns for `*.s3.*.amazonaws.com` and `*.cloudfront.net`. Static assets in `public/`.

## Design system

The visual theme is a dark wine-and-gold palette ported from the original single-file SPA. Key conventions:

- **Global CSS** (`src/app/globals.css`): Keyframe animations, scrollbar styling, `.anim-in`/`.visible` intersection-observer pattern, `.page-enter` transition. Do not refactor these selectors — the look depends on exact values.
- **Fonts**: Cinzel (display), Playfair Display (serif), Be Vietnam Pro (body) — loaded via Google Fonts `<link>` in layout.js.
- **Colors**: Dark backgrounds (`#1A0B0B`, `#260D0D`), gold accents (`#C9A86C`, `#F5D7A1`).
- **Components use inline styles** composed from design tokens. Keep this pattern rather than introducing CSS modules or Tailwind.

## Conventions

- All user-facing text is Vietnamese with diacritics — preserve UTF-8.
- Components are `.jsx` files in `src/components/`. Pages are `page.js` in their route folder.
- Animation: use the `AnimateOnScroll` component or the `.anim-in` CSS class with intersection observer — don't introduce animation libraries.
- Validation: use Zod schemas in API routes.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **c1-thd-reunion** (446 symbols, 672 relationships, 18 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/c1-thd-reunion/context` | Codebase overview, check index freshness |
| `gitnexus://repo/c1-thd-reunion/clusters` | All functional areas |
| `gitnexus://repo/c1-thd-reunion/processes` | All execution flows |
| `gitnexus://repo/c1-thd-reunion/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->

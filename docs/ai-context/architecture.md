# Architecture — Claude Code Curso

## What this project is

Landing page for a Claude Code course in Spanish. Static-first site with no backend, no database, no API routes.

## Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js App Router | 16 |
| Styling | Tailwind CSS v4 | 4 |
| UI runtime | React | 19 |
| Language | TypeScript (strict) | latest |
| Fonts | Geist Sans + Geist Mono (Google Fonts) | via `next/font` |

## Folder structure

```
/
├── app/
│   ├── layout.tsx              # Root layout — font variables, metadata, html/body
│   ├── globals.css             # Tailwind v4 entry point + .grid-bg utility class
│   ├── page.tsx                # Route / — landing page (Server Component)
│   ├── comandos/
│   │   └── page.tsx            # Route /comandos — CLI reference (Client Component)
│   └── components/
│       └── ModulosInteractivos.tsx  # Client Component — interactive module selector
├── docs/
│   └── ai-context/             # AI context files (this directory)
├── public/                     # Static assets (default Next.js)
├── CLAUDE.md                   # Project instructions for Claude Code (references AGENTS.md)
├── AGENTS.md                   # Warning: Next.js APIs may differ from training data
├── SPEC.md                     # Full project specification (not approved for implementation)
└── package.json
```

## Routes

| Route | File | Rendering |
|---|---|---|
| `/` | `app/page.tsx` | Server Component (RSC) |
| `/comandos` | `app/comandos/page.tsx` | Client Component (`"use client"`) |

There are no API routes (`app/api/`) in this project.

## Component breakdown

### `app/layout.tsx` (Server)
- Loads `Geist` and `Geist_Mono` via `next/font/google`
- Exposes them as CSS variables `--font-geist-sans` and `--font-geist-mono`
- Sets global `metadata` (currently still the default Create Next App values — update `title` and `description` here)
- Renders `<html lang="en">` with antialiasing and full height

### `app/page.tsx` (Server Component)
- Main landing page. Composed entirely of inline Server Components plus one client import.
- Local types: `Agente`, `Skill`
- Local components: `AgentCard`, `SkillCard`, `AgentesYSkillsSection`
- Data arrays defined at module scope (after the default export): `agentes: Agente[]`, `skills: Skill[]`
- Delegates the interactive modules section to `<ModulosInteractivos />` (the only client boundary on this page)
- Uses `.grid-bg` CSS class for the background grid pattern (defined in `globals.css`)

### `app/components/ModulosInteractivos.tsx` (Client Component)
- `"use client"` — uses `useState`, `useCallback`, `useId`
- Implements a WAI-ARIA tablist/tabpanel pattern for keyboard-accessible module navigation
- State: `activo: number` (index of currently selected module, starts at 0)
- Keyboard support: ArrowUp, ArrowDown, Home, End, Enter, Space
- Data: `modulos: Modulo[]` array (10 items) defined at module scope inside the file

### `app/comandos/page.tsx` (Client Component)
- `"use client"` — uses `useState`, `useMemo`
- Full CLI reference with real-time search across all data sections
- State: `query: string`
- All data is hardcoded in the file (see `database-schema.md` for types and shapes)
- Search: flattens all data into `ALL_ITEMS: Item[]`, filters on `cmd`, `desc`, `section`, `tag`
- Results grouped by section in `SECTION_ORDER` order when a query is active

## Design system

All visual tokens are applied via Tailwind CSS v4 utility classes. There is no separate design token file beyond `globals.css`.

### Color palette (do not deviate without explicit request)

| Role | Class | Usage |
|---|---|---|
| Page background | `bg-zinc-950` | Base background of every page |
| Surface / cards | `bg-zinc-900` | Cards, navbars, code blocks |
| Subtle surface | `bg-zinc-900/60` | Semi-transparent panels |
| Borders | `border-zinc-800` | Default border color |
| Muted borders | `border-zinc-700` | Slightly lighter borders |
| Primary accent | `orange-500` / `orange-400` | CTAs, highlights, prompts |
| Accent glow | `bg-orange-500/20` (blurred) | Hero radial gradient |
| Body text | `text-zinc-100` | Default readable text |
| Muted text | `text-zinc-400` / `text-zinc-500` | Descriptions, secondary |
| Dimmed text | `text-zinc-600` | Tertiary, timestamps |

### Section-specific accent colors (comandos page only)

| Section | Color |
|---|---|
| Slash commands | `orange-400` / `orange-500` |
| CLI flags | `violet-400` |
| Keyboard shortcuts | `sky-400` |
| Special inputs | `emerald-400` |
| Configuration | `pink-400` |
| Pro tips | `yellow-400` |

### Typography

- All UI uses `font-mono` (Geist Mono) — terminal aesthetic throughout
- `globals.css` maps `--font-mono` to `--font-geist-mono` via `@theme inline`
- `globals.css` maps `--font-sans` to `--font-geist-sans` (not used in UI)
- Tailwind v4 config lives entirely in `globals.css` using `@theme inline` — there is no `tailwind.config.js`

### Background decoration

- Fixed grid: `.grid-bg` class in `globals.css` — orange-tinted 40×40px grid lines using `oklch`
- Fixed radial gradient: inline `bg-orange-500/20 blur-3xl` blurred circle at top center
- Both layers use `pointer-events-none fixed inset-0 z-0`; content sits in `relative z-10`

## Key conventions

- **Server Components by default** — use `"use client"` only when state or browser APIs are needed
- **No `any` in TypeScript** — build fails on type errors
- **No `tailwind.config.js`** — Tailwind v4 config goes in `globals.css` with `@theme`
- **Data stays in component files** — no separate data files until explicitly approved (see SPEC.md)
- **Accessibility** — ARIA roles and keyboard navigation are present; maintain them when editing components
- **No new dependencies** without asking the user first

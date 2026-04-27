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
│       ├── ModulosInteractivos.tsx  # Client Component — interactive module selector
│       └── HooksInteractivos.tsx    # Client Component — interactive hooks showcase
├── .claude/
│   ├── settings.json           # Hooks, permissions, model config (committed to repo)
│   ├── settings.local.json     # Local overrides (gitignored)
│   ├── hooks/
│   │   ├── post-edit/
│   │   │   ├── format.sh       # PostToolUse: Prettier on Write|Edit
│   │   │   ├── typecheck.sh   # PostToolUse: TypeScript check on Write|Edit
│   │   │   └── lint.sh        # PostToolUse: ESLint on Write|Edit (.ts/.tsx/.js/.jsx)
│   │   └── pre-tool/
│   │       └── safety-check.sh # PreToolUse: safety guard on Bash
│   └── commands/               # Prompts invocables (ej. vía @ en Claude Code)
│       ├── commit-push.md
│       ├── debug.md
│       ├── new-feature.md
│       ├── plan.md
│       └── update-ai-context.md
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
- Sets global `metadata` in `app/layout.tsx` (still the default Create Next App `title` and `description`; replace for production)
- Renders `<html lang="en">` with antialiasing and full height

### `app/page.tsx` (Server Component)
- Main landing page. Composed entirely of inline Server Components plus two client imports.
- Local types: `Agente`, `Skill`, `SpecSeccion`, `WorkflowStep`
- Local server components: `AgentCard`, `SkillCard`, `AgentesYSkillsSection`, `HooksSection`, `SpecMdSection`
- Data arrays defined at module scope (after the default export): `agentes: Agente[]`, `skills: Skill[]`, `workflowSteps: WorkflowStep[]`, `specSecciones: SpecSeccion[]`
- Client boundaries: `<ModulosInteractivos />` (modules section) and `<HooksInteractivos />` (hooks section)
- Uses `.grid-bg` CSS class for the background grid pattern (defined in `globals.css`)
- Page section order: Nav → Hero → Stats strip → Modules → Agentes & Skills → Hooks → Spec.md → Footer

### `app/components/ModulosInteractivos.tsx` (Client Component)
- `"use client"` — uses `useState`, `useCallback`, `useId`
- Implements a WAI-ARIA tablist/tabpanel pattern for keyboard-accessible module navigation
- State: `activo: number` (index of currently selected module, starts at 0)
- Keyboard support: ArrowUp, ArrowDown, Home, End, Enter, Space
- Data: `modulos: Modulo[]` array (10 items) defined at module scope inside the file

### `app/components/HooksInteractivos.tsx` (Client Component)
- `"use client"` — uses `useState`
- Implements a WAI-ARIA tablist/tabpanel pattern (same pattern as ModulosInteractivos)
- State: `activo: string` (id of selected hook case), `copiado: boolean` (clipboard feedback)
- Local types: `HookTipo = "PostToolUse" | "PreToolUse" | "Stop" | "GitHook"`, `HookCaso`
- Color map `tipoClase: Record<HookTipo, string>` maps each hook type to a colored badge variant
- Clipboard copy button with 2-second feedback via `navigator.clipboard.writeText`
- Data: `casos: HookCaso[]` — 3 items (format, notificacion, precommit) defined at module scope
- Rendered inside `HooksSection` in `app/page.tsx`, which also renders the hook anatomy explainer cards

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

- Landing (`/`): fixed grid via `.grid-bg` in `globals.css` (oklch orange-tinted 40×40px lines) plus top radial `bg-orange-500/20 blur-3xl`
- `/comandos`: same visual grid uses **inline `style` background** (not `.grid-bg`); see `design-system.md` if unifying
- Content always sits in `relative z-10` above `pointer-events-none` fixed background layers

## Claude Code Hooks Architecture

The project ships with a working hooks setup in `.claude/` (committed to the repo, only `settings.local.json` is gitignored).

### Hook configuration — `.claude/settings.json`

Three hook events are configured:

| Event | Matcher | Script | Purpose |
|---|---|---|---|
| `PreToolUse` | `Bash` | `.claude/hooks/pre-tool/safety-check.sh` | Guard against destructive shell commands |
| `PostToolUse` | `Write\|Edit` | `.claude/hooks/post-edit/format.sh` | Prettier on saved paths |
| `PostToolUse` | `Write\|Edit` | `.claude/hooks/post-edit/typecheck.sh` | `tsc --noEmit` on TypeScript/TSX files |
| `PostToolUse` | `Write\|Edit` | `.claude/hooks/post-edit/lint.sh` | ESLint (stdout carries rule output for the agent) |
| `Stop` | (none) | inline command | macOS notification + stderr log when Claude finishes |

Deny rules in `settings.json` block: `rm -rf /*`, `rm --no-preserve-root`, `git push --force origin main/master`, `git reset --hard`, `chmod -R 777`.

### Hook script conventions

- `format.sh` and `typecheck.sh` report status to **stderr**; avoid noisy stdout
- `lint.sh` writes ESLint diagnostics to **stdout** when there are issues (intentional, so the agent can fix them)
- Post-edit scripts read `file_path` from stdin JSON via a small `python3 -c` one-liner
- The Stop hook uses an inline command string in `settings.json` rather than a separate script file
- The `GitHook` type shown in `HooksInteractivos` is **not** a Claude Code hook — it refers to a native git pre-commit hook (`.git/hooks/pre-commit`), included as an educational counterexample

### `.claude/commands/*.md`

Markdown prompts bajo control de versiones (p. ej. `plan.md`, `update-ai-context.md`, `new-feature.md`, `commit-push.md`, `debug.md`). No son hooks; se usan como guías o comandos referenciados desde el flujo de Claude Code.

## Key conventions

- **Server Components by default** — use `"use client"` only when state or browser APIs are needed
- **No `any` in TypeScript** — build fails on type errors
- **No `tailwind.config.js`** — Tailwind v4 config goes in `globals.css` with `@theme`
- **Data stays in component files** — no separate data files until explicitly approved (see SPEC.md)
- **Accessibility** — ARIA roles and keyboard navigation are present; maintain them when editing components
- **No new dependencies** without asking the user first

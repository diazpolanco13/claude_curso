# Design System — Claude Code Curso

## Aesthetic

Dark terminal aesthetic throughout. The entire UI evokes a CLI/hacker environment:
- Near-black zinc backgrounds
- Orange accent (terminal prompt color)
- Monospace font everywhere
- Grid lines, blinking cursors, `>_` prefixes, `$` symbols, arrow indicators

## Typography

| Token | Value | Notes |
|---|---|---|
| Primary font | `font-mono` (Geist Mono) | Applied on every page root — `<div className="... font-mono">` |
| Fallback sans | Geist Sans | Loaded but not used in UI |
| Font loading | `next/font/google` in `layout.tsx` | Variables: `--font-geist-sans`, `--font-geist-mono` |
| Tailwind config | `@theme inline` in `globals.css` | Maps `--font-mono` → `--font-geist-mono` |

No `tailwind.config.js` exists. All Tailwind v4 configuration lives in `globals.css`.

Common text size patterns:
- Heading h1: `text-6xl font-bold tracking-tight` / `sm:text-7xl`
- Heading h2: `text-3xl font-bold`
- Section label above h2: `text-xs uppercase tracking-widest text-orange-500`
- Body: `text-sm leading-relaxed text-zinc-400`
- Small/muted: `text-xs text-zinc-500`
- Code: `text-sm text-orange-400` (in `<code>` tags)

## Color Palette

Do not introduce new colors without explicit user request.

### Core palette

| Role | Tailwind class | Usage |
|---|---|---|
| Page background | `bg-zinc-950` | Base of every page, always |
| Card / surface | `bg-zinc-900` | Cards, nav, terminals, input fields |
| Subtle surface | `bg-zinc-900/60` | Semi-transparent panels (modules list, agent cards) |
| Surface inset | `bg-zinc-950` | Code block inside a card (`ConfigCard` example) |
| Default border | `border-zinc-800` | All borders by default |
| Lighter border | `border-zinc-700` | Slightly elevated elements (badges, kbd) |
| Primary accent | `orange-500` | Prompt symbols (`>`, `$`, `~`), active states, CTAs |
| Accent light | `orange-400` | Code text, inline highlights, links |
| Accent glow | `bg-orange-500/20 blur-3xl` | Fixed radial gradient at page top |
| Body text | `text-zinc-100` | Default readable text |
| Secondary text | `text-zinc-400` | Body copy, descriptions |
| Muted text | `text-zinc-500` | Secondary descriptions, metadata |
| Dimmed text | `text-zinc-600` | Tertiary info, dividers, timestamps |
| White headings | `text-white` | `<h1>`, `<h2>`, `<h3>` in hero |

### Hover states pattern

```
hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5
```
Used on interactive cards throughout. Never use a fully opaque orange border on hover.

### Active / selected state

```
bg-orange-500/10 text-orange-400
```
Used in `ModulosInteractivos` tab list for the active module. Inactive: `text-zinc-400 hover:bg-zinc-800/40`.

### Section-specific accent colors (`/comandos` page only)

These colors appear only in tag badges on the `/comandos` page. Do not use them on the landing page.

| Section | Text | Border | Background |
|---|---|---|---|
| Slash Commands | `text-orange-400` | `border-orange-500/40` | `bg-orange-500/10` |
| CLI Flags | `text-violet-400` | `border-violet-500/40` | `bg-violet-500/10` |
| Keyboard Shortcuts | `text-sky-400` | `border-sky-500/40` | `bg-sky-500/10` |
| Special Inputs | `text-emerald-400` | `border-emerald-500/40` | `bg-emerald-500/10` |
| Configuration | `text-pink-400` | `border-pink-500/40` | `bg-pink-500/10` |
| Pro Tips | `text-yellow-400` | `border-yellow-500/40` | `bg-yellow-500/10` |

Also used in stats chips in the `/comandos` hero (same section-color mapping).

### Hook type badge colors (`HooksInteractivos` component — landing page)

The `HooksInteractivos` component on the landing page (`/`) uses a subset of this same color convention to distinguish hook types. These colors are now also present on the landing page via this component.

Defined in `tipoClase: Record<HookTipo, string>` in `app/components/HooksInteractivos.tsx`:

| HookTipo | Text | Border | Background |
|---|---|---|---|
| `PostToolUse` | `text-orange-400` | `border-orange-500/40` | `bg-orange-500/10` |
| `PreToolUse` | `text-violet-400` | `border-violet-500/40` | `bg-violet-500/10` |
| `Stop` | `text-emerald-400` | `border-emerald-500/40` | `bg-emerald-500/10` |
| `GitHook` | `text-sky-400` | `border-sky-500/40` | `bg-sky-500/10` |

`GitHook` is an educational type shown in the component to distinguish native git hooks from Claude Code hooks. It is not a real Claude Code event type.

## Background Decoration

Applied to every page. Both layers sit behind content:

```tsx
{/* Fixed grid */}
<div className="grid-bg pointer-events-none fixed inset-0 z-0" />

{/* Fixed radial glow */}
<div className="pointer-events-none fixed left-1/2 top-0 z-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl" />
```

The `.grid-bg` utility is defined in `globals.css`:

```css
.grid-bg {
  background-image:
    linear-gradient(oklch(0.65 0.2 40 / 0.07) 1px, transparent 1px),
    linear-gradient(90deg, oklch(0.65 0.2 40 / 0.07) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

Note: on the `/comandos` page the grid is applied with inline styles (not `.grid-bg`) — this is a minor inconsistency. If touching that file, migrate to `.grid-bg`.

Content always sits in `<div className="relative z-10">`.

## Layout

- Max content width: `max-w-5xl` (sections, including hooks and spec), `max-w-4xl` (agentes section), `max-w-2xl` (search bar), `max-w-lg` (body copy)
- Horizontal padding: `px-6` on sections, `px-8` on nav
- Vertical section padding: `py-24` for major sections, `py-16` for `/comandos` hero
- Responsive grid: `sm:grid-cols-2` for card grids, `lg:grid-cols-2` for two-column layouts, `lg:grid-cols-[320px_1fr]` for the module tablist, `lg:grid-cols-[220px_1fr]` for the hooks tablist

## Navigation Pattern

Both pages share the same nav structure:

```tsx
<nav className="flex items-center justify-between border-b border-zinc-800 px-8 py-4">
  <span className="text-sm font-bold tracking-widest text-orange-500 uppercase">
    &gt;_ Claude Code
  </span>
  <span className="rounded border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
    {label}  {/* "v1.0.0" on landing, "cheatsheet" on /comandos */}
  </span>
</nav>
```

On `/comandos` the brand is an `<a href="/">` link. On `/` it is a plain `<span>`.

## Component Patterns

### Card (standard interactive card)

Used in `AgentCard`, `CommandCard`, most grid items:

```tsx
<div className="rounded border border-zinc-800 bg-zinc-900/60 p-4 transition-colors hover:border-zinc-700">
```

Heavier version with shadow (used in `CommandCard`, `ShortcutCard`):

```tsx
<div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 transition-all hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5">
```

### Badge / tag

```tsx
<span className="rounded border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
  {label}
</span>
```

Section-specific colored badge (comandos only):

```tsx
<span className={`rounded border px-1.5 py-0.5 text-xs font-mono ${tagStyle}`}>
  {tag}
</span>
```

### Terminal window block

Used in hero and skill demo. Always includes macOS-style traffic-light dots:

```tsx
<div className="rounded-lg border border-zinc-800 bg-zinc-900 shadow-xl shadow-black/30">
  <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
    <span className="h-3 w-3 rounded-full bg-red-500" aria-hidden="true" />
    <span className="h-3 w-3 rounded-full bg-yellow-500" aria-hidden="true" />
    <span className="h-3 w-3 rounded-full bg-green-500" aria-hidden="true" />
    <span className="ml-2 text-xs text-zinc-500">{windowLabel}</span>
  </div>
  <div className="space-y-1 p-4 text-sm">
    {/* content */}
  </div>
</div>
```

Terminal text colors: prompt symbol `text-orange-500`, commands `text-zinc-300`, output `text-zinc-500`, success `text-green-400`.

### Blinking cursor

```tsx
<span className="inline-block h-4 w-2 animate-pulse bg-orange-500" />
```

### Pill / status badge (hero area)

```tsx
<div className="rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs text-orange-400">
  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400" />
  {text}
</div>
```

### Section label pattern (above h2)

```tsx
<p className="text-xs uppercase tracking-widest text-orange-500">
  {"// section name"}
</p>
<h2 className="mt-2 text-3xl font-bold text-white">Title</h2>
```

### CTA buttons

Primary (filled):
```tsx
<a className="rounded border border-orange-500 bg-orange-500 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20">
```

Secondary (ghost):
```tsx
<a className="rounded border border-zinc-700 bg-zinc-900 px-8 py-3 text-sm font-semibold text-zinc-300 transition-all hover:border-orange-500/50 hover:text-white">
```

### `<kbd>` element (keyboard shortcuts)

```tsx
<kbd className="rounded border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs text-orange-400 font-mono whitespace-nowrap">
  {key}
</kbd>
```

### Section divider line

```tsx
<div className="flex-1 border-t border-zinc-800" />
```

### Focus ring (accessibility)

```
focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-orange-500
```

Used consistently on all interactive elements.

## Priority Stars (comandos page)

Visual indicator of command importance. Three stars, filled count signals priority:

| Priority | Filled | Color |
|---|---|---|
| `essential` | 3 | `text-orange-500` |
| `important` | 2 | `text-yellow-400` |
| `useful` | 1 | `text-zinc-500` |
| Empty stars | — | `text-zinc-700` |

## Spacing Conventions

- Section gap: `space-y-16` (between major sections in default view)
- Card grid gap: `gap-3` (2-col grids), `gap-4` (config/tips grids)
- Internal card padding: `p-4` (standard), `p-5` (pro tips), `p-8` (module detail panel)
- Section vertical padding: `py-24` (landing sections), `py-16` (comandos hero), `py-8` (footer)

## Accessibility Conventions

- All decorative elements: `aria-hidden="true"`
- Interactive module list: WAI-ARIA `tablist` / `tabpanel` pattern with full keyboard support
- `aria-label` on search bar clear button and nav elements
- Focus ring always uses orange-500 to stay consistent with accent color

# API Endpoints & Routes — Claude Code Curso

## Overview

This project has **no API routes**. There is no `app/api/` directory. All data is rendered from hardcoded arrays defined inside component files.

## Page routes (Next.js App Router)

### `GET /`

- **File:** `app/page.tsx`
- **Rendering:** React Server Component (RSC) — no `"use client"` at top level
- **Client boundaries:** `<ModulosInteractivos />` and `<HooksInteractivos />` are the two client components rendered on this page
- **Sections rendered:**
  1. Nav bar
  2. Hero (headline, CTAs, terminal demo)
  3. Stats strip (10 Modules / 100% Spanish / CLI)
  4. Modules section — delegates to `<ModulosInteractivos />`
  5. Agentes y Skills section — server-rendered cards from hardcoded `agentes[]` and `skills[]` arrays
  6. Hooks section — anatomy explainer + delegates to `<HooksInteractivos />`
  7. Spec.md section — before/after terminal demo, workflow steps, spec structure reference
  8. Footer

### `GET /comandos`

- **File:** `app/comandos/page.tsx`
- **Rendering:** Client Component (`"use client"`) — the entire page is a client component because it owns real-time search state
- **Functionality:** Live search across all CLI reference data; no network requests are made at runtime
- **Sections:**
  1. Nav (link back to `/`)
  2. Hero with stats chips showing entry counts per category
  3. Search bar with hint buttons
  4. Results view (when `query` is non-empty) — grouped by section with highlighted matches
  5. Default view (when `query` is empty) — full sections: Slash Commands, CLI Flags, Keyboard Shortcuts, Special Inputs, Configuration, Pro Tips
  6. Footer

### `GET /flujo`

- **File:** `app/flujo/page.tsx`
- **Rendering:** Server Component — delegates interactive content to `<FlujoDeTrabajo />` (Client Component)
- **Functionality:** Static workflow reference guide with two tabs; no network requests
- **Sections:**
  1. Nav (link back to `/`, active `/flujo` link, link to `/comandos`, version badge `guía v1.0`)
  2. Header (page title + description)
  3. `<FlujoDeTrabajo />` — two tabs:
     - `# flujo de trabajo`: situation → tool/command cards with priority indicators
     - `# arquitectura`: two-column grid showing `~/.claude/` vs `.claude/` configuration levels
  4. Footer

## Navigation links

| From | Label | Target |
|---|---|---|
| `/` hero | `$ ver módulos` | `#modulos` (anchor on same page) |
| `/` hero | `# comandos & shortcuts` | `/comandos` |
| `/` nav | `flujo` | `/flujo` |
| `/comandos` nav | `>_ Claude Code` | `/` |
| `/flujo` nav | `>_ .claude/` | `/` |
| `/flujo` nav | `referencia CLI` | `/comandos` |

## No external API calls

The application makes zero runtime network requests from client code. All content is static/hardcoded. There is no data fetching, no `fetch()` calls, no SWR/React Query, no form submissions.

## Future considerations (not yet implemented)

Per `SPEC.md` (not approved), possible future additions include:
- Extracting module and command data to separate JSON/TypeScript data files
- Potentially adding a contact or enrollment form

Do not implement any of the above without explicit user approval.

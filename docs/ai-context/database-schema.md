# Data Structures — Claude Code Curso

## Overview

There is no database. All data is hardcoded in TypeScript arrays inside component files. This document describes every data type and its source location.

---

## `app/components/ModulosInteractivos.tsx`

### `Modulo`

```ts
type Modulo = {
  numero: string;      // Zero-padded string: "01" through "10"
  titulo: string;      // Module display title
  descripcion: string; // One-sentence summary shown in detail panel
  detalles: string[];  // 4 bullet points of module content
  icono: string;       // Currently same value as `numero` (reserved for future icon use)
};
```

### `modulos: Modulo[]` — 10 items (complete list)

| numero | titulo |
|---|---|
| 01 | Claude Code Setup |
| 02 | La carpeta .claude (El centro de control) |
| 03 | Skills vs Agents (La diferencia que nadie explica) |
| 04 | Cómo crear Skills profesionales |
| 05 | Cómo crear Agents poderosos |
| 06 | MCP y herramientas externas |
| 07 | Comandos slash y atajos avanzados |
| 08 | Tu sistema de Segundo Cerebro con Claude Code |
| 09 | Flujo de trabajo profesional recomendado |
| 10 | Errores comunes y cómo evitarlos |

---

## `app/page.tsx`

### `Agente`

```ts
type Agente = {
  tipo: string;        // Agent type identifier (e.g. "Explore", "Plan")
  descripcion: string; // Description of agent capabilities
  tag: string;         // Short label badge (e.g. "explore", "plan", "general")
};
```

### `agentes: Agente[]` — 4 items

| tipo | tag |
|---|---|
| Explore | explore |
| Plan | plan |
| general-purpose | general |
| claude-code-guide | guide |

### `Skill`

```ts
type Skill = {
  comando: string;     // Slash command name without leading slash (e.g. "review")
  descripcion: string; // What the skill does
  categoria: string;   // Category badge (e.g. "code", "security", "setup", "frontend")
};
```

### `skills: Skill[]` — 5 items

| comando | categoria |
|---|---|
| review | code |
| simplify | code |
| security-review | security |
| init | setup |
| react-19-tailwind-4-expert | frontend |

---

## `app/comandos/page.tsx`

### `Priority`

```ts
type Priority = "essential" | "important" | "useful";
```

Priority maps to visual star indicators:
- `essential` → 3 orange stars
- `important` → 2 yellow stars
- `useful` → 1 zinc star

### `Item` (unified search type)

```ts
type Item = {
  section: string;      // Section name (one of SECTION_ORDER values)
  tag: string;          // Category tag: "slash" | "flag" | "shortcut" | "input" | "config" | "tip"
  cmd: string;          // Command/key string (for shortcuts: keys joined with " + ")
  desc: string;         // Description text
  priority?: Priority;  // Optional — Pro Tips have no priority
};
```

### `slashCommands` — 38 items

```ts
{ cmd: string; desc: string; priority: Priority }[]
```

Slash commands prefixed with `/`. Priorities: 6 essential, 19 important, 13 useful.

### `cliFlags` — 16 items

```ts
{ flag: string; desc: string; priority: Priority }[]
```

Shell invocations starting with `claude`. Priorities: 4 essential, 7 important, 5 useful.

### `keyboardShortcuts` — 15 items

```ts
{ keys: string[]; desc: string; priority: Priority }[]
```

`keys` is an array of key labels rendered as `<kbd>` elements. Priorities: 4 essential, 4 important, 7 useful.

### `specialInputs` — 6 items

```ts
{ cmd: string; desc: string; priority: Priority }[]
```

Special prompt prefixes (`!`, `@`, `#`, etc.). Priorities: 2 essential, 3 important, 1 useful.

### `configKeys` — 5 items

```ts
{ key: string; example: string; desc: string; priority: Priority }[]
```

Top-level keys for `settings.json`. Each entry includes a short JSON `example`. Priorities: 2 essential, 3 important.

### `proTips` — 6 items

```ts
{ icon: string; title: string; desc: string }[]
```

No `priority` field. Icon is an emoji string.

### `ALL_ITEMS: Item[]`

Flat array combining all sections. Total count displayed in page hero. As of last audit: 86 items (38 + 16 + 15 + 6 + 5 + 6).

### `SECTION_ORDER: string[]`

Controls display and grouping order for search results:
```ts
["Slash Commands", "Flags del CLI", "Shortcuts", "Inputs Especiales", "Configuración", "Pro Tips"]
```

---

## Adding or editing data

- Modules: edit `modulos` array in `app/components/ModulosInteractivos.tsx`
- Agentes/Skills: edit `agentes`/`skills` arrays at the bottom of `app/page.tsx`
- CLI reference (any category): edit the relevant array in `app/comandos/page.tsx`
- Do not extract data to separate files without explicit user approval (per CLAUDE.md)

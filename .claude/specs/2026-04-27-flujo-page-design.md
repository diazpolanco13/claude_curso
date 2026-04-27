# Spec: Página /flujo — Referencia de Flujo de Trabajo y Arquitectura

**Fecha:** 2026-04-27  
**Estado:** Aprobado — listo para implementación  
**Scope:** Nueva ruta `/flujo` con dos tabs, datos tipados en `data/flujo.ts`, link en nav  
**Fuera de scope:** Cambios en `/comandos`, refactor de la landing, búsqueda en tiempo real

---

## Problema que resuelve

El usuario aprendió hoy un flujo de trabajo profesional con Claude Code (superpowers-first) y una arquitectura de configuración clara (global vs proyecto). Necesita una referencia visual en su propia web para consultar mientras internaliza el sistema, sin tener que buscar en conversaciones o documentos externos.

---

## Nueva ruta: `/flujo`

URL: `http://localhost:3000/flujo`  
Tipo: Server Component (`page.tsx`) que renderiza un Client Component (`FlujoDeTrabajo.tsx`)  
Navegación: Link `Flujo` agregado al nav existente con el mismo estilo que los otros links

---

## Archivos

| Archivo | Acción | Responsabilidad |
|---|---|---|
| `app/flujo/page.tsx` | Crear | Metadata de la página + importar FlujoDeTrabajo |
| `app/components/FlujoDeTrabajo.tsx` | Crear | Client Component con tabs y renderizado |
| `data/flujo.ts` | Crear | Datos tipados del flujo y arquitectura |
| `app/page.tsx` o `app/layout.tsx` | Modificar | Agregar link "Flujo" al nav |

**No se tocan:**
- `app/comandos/page.tsx`
- `app/globals.css`
- `app/layout.tsx` (salvo el nav)
- Archivos de memory, hooks, agents

---

## Datos (`data/flujo.ts`)

### Tab "Flujo de Trabajo"

Array de entradas con esta estructura:

```ts
type PrioridadFlujo = 'essential' | 'important' | 'useful'

type EntradaFlujo = {
  situacion: string
  usar: string        // skill o command
  prioridad: PrioridadFlujo
}
```

Contenido:

| Situación | Usar | Prioridad |
|---|---|---|
| Nueva feature o idea | `superpowers:brainstorming` → `superpowers:writing-plans` | essential |
| Bug o error inesperado | `superpowers:systematic-debugging` | essential |
| Antes de declarar algo listo | `superpowers:verification-before-completion` | important |
| Commit y push a GitHub | `/commit-push` | important |
| Actualizar docs de contexto | `/update-ai-context` | useful |

### Tab "Arquitectura"

Array de niveles con esta estructura:

```ts
type EntradaArquitectura = {
  nombre: string      // "Global" | "Proyecto"
  ruta: string        // "~/.claude/" | ".claude/"
  descripcion: string
  items: { path: string; descripcion: string }[]
  regla: string
}
```

**Nivel Global (`~/.claude/`):**
- `settings.json` — effortLevel, plugins, idioma
- `skills/` — stack tecnológico (nextjs-architect, react-19-tailwind-4-expert, supabase-expert)
- Regla: *"Si una skill sirve para múltiples proyectos, va aquí"*

**Nivel Proyecto (`.claude/`):**
- `CLAUDE.md` — instrucciones y restricciones del proyecto
- `commands/` — solo lo que superpowers no cubre
- `memory/` — decisiones y patrones rechazados
- `specs/` — diseños aprobados
- `agents/` — agentes específicos del dominio
- `hooks/` — automatizaciones post-edición
- Regla: *"Si describe el contexto del proyecto, va aquí"*

---

## Componente `FlujoDeTrabajo.tsx`

- `"use client"` — maneja estado de tab activo
- Estado: `activeTab: 'flujo' | 'arquitectura'`
- Importa datos desde `data/flujo.ts`
- Indicadores de prioridad con los mismos colores que `/comandos`:
  - `essential` → naranja (`text-orange-400`, `border-orange-500/30`)
  - `important` → amarillo (`text-yellow-400`, `border-yellow-500/30`)
  - `useful` → zinc (`text-zinc-400`, `border-zinc-700`)
- Estética idéntica al resto de la app: `font-mono`, `bg-zinc-950`, `border-zinc-800`

---

## Navegación

El nav actual está en `app/page.tsx` (Server Component). Se agrega el link:

```tsx
<a href="/flujo" className="...mismo estilo que links existentes...">
  Flujo
</a>
```

---

## Criterios de éxito

- [ ] La ruta `/flujo` existe y carga sin errores
- [ ] Los dos tabs (Flujo / Arquitectura) funcionan correctamente
- [ ] Los indicadores de prioridad muestran los colores correctos
- [ ] El link "Flujo" aparece en el nav y navega a la página
- [ ] `npm run build` pasa sin errores de TypeScript
- [ ] La estética es consistente con el resto de la app (zinc/orange/mono)

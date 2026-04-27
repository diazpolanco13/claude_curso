@AGENTS.md

# Claude Code Curso — instrucciones para Claude

## Qué es este proyecto

Landing page de un curso de Claude Code en español. Tres rutas:
- `/` — Página de presentación con módulos del curso
- `/comandos` — Referencia completa del CLI con búsqueda en tiempo real
- `/flujo` — Guía del flujo de trabajo con Claude Code (prioridades y arquitectura .claude/)

## Comandos esenciales

```bash
npm run dev      # Servidor en http://localhost:3000
npm run build    # Build de producción (verificar antes de hacer PR)
npm run lint     # ESLint — correr antes de cada commit
```

## Stack y convenciones

- **Next.js 16 con App Router** — leer `node_modules/next/dist/docs/` ante cualquier duda de API
- **Tailwind CSS v4** — la sintaxis cambió; no usar `tailwind.config.js`, la config va en `globals.css` con `@theme`
- **React 19** — Server Components por defecto; usar `"use client"` solo cuando sea necesario (estado, eventos del navegador)
- **TypeScript estricto** — no usar `any`; el build falla con errores de tipo

## Estructura de archivos clave

```
app/page.tsx                          # Landing — Server Component con dos client boundaries:
                                      #   ModulosInteractivos y HooksInteractivos
app/components/ModulosInteractivos.tsx  # Client Component — tabs de módulos
app/components/HooksInteractivos.tsx    # Client Component — tabs de hooks con código copiable
app/comandos/page.tsx                 # Referencia CLI — toda la data hardcodeada en el componente
app/flujo/page.tsx                    # Server Component — guía de flujo de trabajo con Claude Code
app/components/FlujoDeTrabajo.tsx     # Client Component — tabs de prioridades y arquitectura .claude/
data/flujo.ts                         # Único archivo de datos extraído aprobado (tipos y arrays de contenido)
app/layout.tsx                        # Metadata global del sitio — actualizar title/description aquí
app/globals.css                       # Tokens de color y fuente con @theme de Tailwind v4
```

## Sistema de diseño

- Fondo: `bg-zinc-950`, superficies: `bg-zinc-900`, bordes: `border-zinc-800`
- Acento principal: `orange-500` / `orange-400`
- Fuente: `font-mono` en toda la UI (estética terminal)
- No introducir colores ni fuentes fuera de esta paleta sin pedido explícito

## Herramientas disponibles

- **MCP de GitHub** — disponible via `mcp__github__*`. Usar para crear ramas, commits, pull requests y cualquier operación de Git remoto en lugar de `git push` manual cuando sea posible.

## Flujo de trabajo con Claude Code

| Situación | Usar |
|---|---|
| Nueva feature o idea | `superpowers:brainstorming` → `superpowers:writing-plans` |
| Bug o error inesperado | `superpowers:systematic-debugging` |
| Antes de declarar algo como listo | `superpowers:verification-before-completion` |
| Commit y push a GitHub | `/commit-push` |
| Actualizar docs de contexto | `/update-ai-context` |

**Skills de stack disponibles globalmente** (en cualquier proyecto):
- `nextjs-architect` — App Router, Server Components, caching
- `react-19-tailwind-4-expert` — React 19, Tailwind 4, componentes modernos
- `supabase-expert` — Auth, RLS, Edge Functions, Realtime

## Qué no hacer

- No cambiar la estética visual sin que el usuario lo pida
- No extraer datos a archivos separados sin confirmación (`data/flujo.ts` es el único caso aprobado hasta ahora)
- No agregar dependencias sin preguntar
- No crear archivos de documentación adicionales salvo que se solicite explícitamente

## Documentación de Contexto para IA

- Toda la documentación detallada del proyecto está en `docs/ai-context/`
- Para actualizar el contexto: usa el comando `/update-ai-context`
- El agente `documentation-specialist` es el responsable de mantener esta documentación actualizada.

## Memoria del proyecto

Lee estos archivos al inicio de cada sesión para no reabrir decisiones cerradas:

- `.claude/memory/decisions.md` — decisiones técnicas y de diseño ya tomadas
- `.claude/memory/rejected-patterns.md` — enfoques descartados y por qué
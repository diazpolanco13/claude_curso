@AGENTS.md

# Claude Code Curso — instrucciones para Claude

## Qué es este proyecto

Landing page de un curso de Claude Code en español. Dos rutas:
- `/` — Página de presentación con módulos del curso
- `/comandos` — Referencia completa del CLI con búsqueda en tiempo real

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
app/page.tsx              # Landing — datos de módulos al final del archivo (const modulos)
app/comandos/page.tsx     # Referencia CLI — toda la data hardcodeada en el componente
app/layout.tsx            # Metadata global del sitio — actualizar title/description aquí
app/globals.css           # Tokens de color y fuente con @theme de Tailwind v4
```

## Sistema de diseño

- Fondo: `bg-zinc-950`, superficies: `bg-zinc-900`, bordes: `border-zinc-800`
- Acento principal: `orange-500` / `orange-400`
- Fuente: `font-mono` en toda la UI (estética terminal)
- No introducir colores ni fuentes fuera de esta paleta sin pedido explícito

## Herramientas disponibles

- **MCP de GitHub** — disponible via `mcp__github__*`. Usar para crear ramas, commits, pull requests y cualquier operación de Git remoto en lugar de `git push` manual cuando sea posible.

## Qué no hacer

- No cambiar la estética visual sin que el usuario lo pida
- No extraer datos a archivos separados sin confirmación (hay una propuesta en SPEC.md pero no está aprobada)
- No agregar dependencias sin preguntar
- No crear archivos de documentación adicionales salvo que se solicite explícitamente

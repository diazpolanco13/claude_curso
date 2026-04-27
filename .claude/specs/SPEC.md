# SPEC.md — Claude Code Curso

## Descripción general

Sitio web de curso interactivo en español para aprender a usar **Claude Code**, el CLI de Anthropic. La aplicación es una landing page informativa con una sección de referencia de comandos con búsqueda en tiempo real.

---

## Stack tecnológico

| Capa | Tecnología | Versión |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.4 |
| UI | React | 19.2.4 |
| Lenguaje | TypeScript | ^5 |
| Estilos | Tailwind CSS | ^4 |
| Fuentes | Geist Sans / Geist Mono | via `next/font/google` |
| Linter | ESLint + eslint-config-next | ^9 / 16.2.4 |
| Gestor de paquetes | npm | — |

---

## Estructura del proyecto

```
/
├── app/
│   ├── layout.tsx              # Root layout — fuentes, metadata global
│   ├── globals.css             # Estilos base + tokens de Tailwind v4
│   ├── favicon.ico
│   ├── page.tsx                # Ruta / — Landing page principal
│   └── comandos/
│       └── page.tsx            # Ruta /comandos — Referencia CLI con búsqueda
├── public/                     # Assets estáticos
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
├── package.json
├── CLAUDE.md                   # Instrucciones para Claude Code
└── AGENTS.md                   # Instrucciones para agentes AI
```

---

## Páginas y rutas

### `/` — Landing page

Página de presentación del curso con estética terminal oscura.

**Secciones:**
1. **Nav** — Logo `>_ Claude Code` + badge de versión `v1.0.0`
2. **Hero** — Título, descripción, CTAs y mockup de terminal animado
3. **Stats** — 3 métricas: `6 Módulos`, `100% Español`, `CLI Terminal-first`
4. **Módulos** (`#modulos`) — Grid 2 columnas con los 6 módulos del curso
5. **Footer** — Copyright dinámico + créditos de stack

**Módulos del curso:**

| # | Título | Descripción |
|---|---|---|
| 01 | Introducción a Claude Code | Instalación, configuración inicial y primeros pasos con el CLI |
| 02 | Comandos y conversaciones | Prompts efectivos, comandos slash y manejo del contexto |
| 03 | Edición y refactorización | Editar archivos y aplicar cambios con herramientas integradas |
| 04 | Búsqueda y exploración de código | Navegar bases de código grandes y proyectos desconocidos |
| 05 | Agentes y automatización | Flujos de trabajo automáticos, subagentes y tareas recurrentes |
| 06 | Proyecto final | Construir una aplicación completa de principio a fin |

### `/comandos` — Referencia CLI

Página de referencia completa del CLI de Claude Code con ~32 KB de contenido estructurado.

**Funcionalidades:**
- **Sistema de prioridades** — 3 niveles con indicadores de color: `essential` (naranja), `important` (amarillo), `useful` (zinc)
- **Búsqueda 360 en tiempo real** — Filtra y resalta resultados en todas las secciones simultáneamente
- **Agrupación de resultados** — Los resultados se organizan por sección al buscar
- **Secciones cubiertas:** comandos slash, atajos de teclado, flags del CLI, inputs especiales, claves de `settings.json`

---

## Diseño y sistema visual

### Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| `zinc-950` | `#09090b` | Fondo principal |
| `zinc-900` | `#18181b` | Superficies de cards y nav |
| `zinc-800` | `#27272a` | Bordes |
| `zinc-400/500` | — | Texto secundario |
| `orange-500` | `#f97316` | Color de acento principal |
| `orange-400` | `#fb923c` | Acento secundario / highlights |
| `green-400` | `#4ade80` | Estados de éxito en terminal |

### Tipografía
- **`font-mono`** — Fuente monoespaciada (Geist Mono) usada en toda la UI para la estética terminal
- **`font-sans`** — Geist Sans cargada pero no utilizada actualmente

### Efectos visuales
- Grid overlay fijo con líneas naranja de baja opacidad (`rgba(249,115,22,0.07)`)
- Glow circular en la parte superior (blur naranja difuminado)
- Animación `animate-pulse` en el cursor de terminal y en el indicador de "en vivo"
- Transiciones `hover` en cards con `shadow-orange-500/5`

---

## Problemas conocidos

| Severidad | Archivo | Problema |
|---|---|---|
| Alta | `app/layout.tsx` | `metadata.title` y `description` son los valores por defecto de `create-next-app` |
| Media | `app/layout.tsx` | `lang="en"` pero el sitio está en español — debería ser `lang="es"` |
| Media | `app/comandos/page.tsx` | Toda la data de comandos está hardcodeada en el componente (32 KB) — extraer a `/data/comandos.ts` |
| Baja | `app/globals.css` | `body { font-family: Arial }` sobrescribe Geist pero el diseño ya usa `font-mono` de Tailwind |
| Baja | General | No hay tests (unitarios ni e2e) |
| Baja | General | No hay configuración de despliegue (Vercel, Docker, CI/CD) |

---

## Mejoras propuestas

### Corto plazo
- [ ] Actualizar `metadata` en `layout.tsx` con título, descripción y Open Graph del curso
- [ ] Cambiar `lang="en"` a `lang="es"` en `layout.tsx`
- [ ] Separar los datos de `/comandos` a un archivo `data/comandos.ts`
- [ ] Limpiar `globals.css` eliminando la regla `font-family: Arial` del body

### Medio plazo
- [ ] Añadir páginas individuales por módulo (`/modulos/[slug]`)
- [ ] Implementar navegación entre páginas con estado activo
- [ ] Añadir metadata Open Graph y `twitter:card` para compartir en redes
- [ ] Configurar despliegue en Vercel con `vercel.json`

### Largo plazo
- [ ] Sistema de progreso del curso por módulo (localStorage)
- [ ] Modo de búsqueda global en todo el sitio
- [ ] Tests e2e con Playwright para las rutas principales

---

## Comandos de desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (http://localhost:3000)
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm run start

# Linting
npm run lint
```

---

## Convenciones del repositorio

- **Rama principal:** `master`
- **Co-autoría con AI:** los commits incluyen `Co-Authored-By: Claude <noreply@anthropic.com>`
- **Idioma del código:** inglés (nombres de variables, funciones)
- **Idioma del contenido UI:** español

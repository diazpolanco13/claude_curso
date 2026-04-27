# Decisiones del proyecto

Decisiones técnicas y de diseño tomadas — con el razonamiento detrás.
Claude debe leer esto al inicio de cada sesión para no reabrir debates cerrados.

---

## Arquitectura

**Server Components por defecto**
React 19 + Next.js App Router. `"use client"` solo cuando hay estado o eventos del browser. Actualmente hay dos client boundaries en la landing: `ModulosInteractivos` y `HooksInteractivos`.

**Data hardcodeada en componentes**
Los datos de módulos, hooks y comandos están hardcodeados en sus componentes. No se extrae a archivos separados hasta que haya una fuente dinámica real (decisión pendiente de aprobación — ver SPEC.md).

**Estética terminal sin excepciones**
`font-mono` en toda la UI. Paleta zinc/orange. No se introducen colores o fuentes fuera de esta paleta sin aprobación explícita del usuario.

---

## Hooks de Claude Code

**stderr para feedback del usuario, stdout para Claude**
Todo output de hooks que sea solo informativo para el usuario va a `>&2`. Solo va a stdout lo que Claude debe leer y actuar (ej: errores de TypeScript).

**No llamar a `claude` desde hooks**
`session-start` y `update-docs` fueron descartados por riesgo de loop infinito. Documentado aquí para no volver a proponerlos.

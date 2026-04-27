---
name: update-design-system
description: Actualiza docs/ai-context/design-system.md manteniendo consistencia visual en toda la aplicación.
allowed-tools: Read, Write, Grep, Bash
---

Eres responsable de mantener actualizado y coherente el sistema de diseño de la aplicación.

**Cuando te invoquen:**

1. Revisa los cambios recientes en componentes, estilos, Tailwind classes, archivos CSS o variables de diseño.
2. Lee el archivo actual `docs/ai-context/design-system.md`.
3. Actualiza **solo** las secciones que cambiaron:
   - Paleta de colores (si se agregaron o modificaron colores)
   - Tipografía (si cambiaron fuentes o tamaños)
   - Componentes base (botones, inputs, tablas, cards, etc.)
   - Reglas de diseño o patrones prohibidos
   - Sistema de espaciado o breakpoints

**Reglas importantes:**
- Mantén **consistencia total**. Si detectas que se está usando un color, fuente o estilo fuera de lo definido, agrégalo al archivo o marca la sección como "Por revisar".
- Prioriza la coherencia visual por encima de todo.
- Si hay un cambio grande en el diseño (nueva paleta, nuevo sistema de componentes, dark mode, etc.), actualiza todo el archivo y agrega una nota de versión.

Al final, muestra qué secciones del design system fueron actualizadas.
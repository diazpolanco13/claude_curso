---
description: Actualiza todo el contexto de IA del proyecto (base de datos, APIs, arquitectura y diseño)
allowed-tools: Read, Write, Grep, Bash
---

# Actualizar Contexto de IA

Invoca al agente `documentation-specialist` y actualiza todos los archivos de `docs/ai-context/` con los últimos cambios del proyecto.

**Archivos que debe actualizar:**
- `database-schema.md`
- `api-endpoints.md`
- `architecture.md`
- `business-rules.md`
- `data-flows.md`
- `design-system.md` ← (muy importante para mantener consistencia visual)

**Pasos a seguir:**
1. Ejecuta `git status` y `git diff --name-only HEAD`
2. Llama al agente `documentation-specialist`
3. El agente debe analizar los cambios y actualizar **solo** los archivos relevantes
4. Al final muestra un resumen claro de lo que actualizó

Usa las skills disponibles (`update-database-context`, `update-api-context`, `sync-architecture-docs`) cuando sea necesario.
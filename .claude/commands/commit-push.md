---
description: Stage, commit y push a GitHub de forma inteligente
allowed-tools: Bash
---

# Commit + Push Inteligente

## Objetivo
Hacer commit de los últimos cambios y subirlos a GitHub de forma segura y con buen mensaje.

## Pasos a ejecutar:

1. **Ver estado actual**
   - Ejecuta: `git status --short`
   - Si no hay cambios (ni staged ni unstaged), responde:  
     **"✅ No hay cambios para commitear."** y termina.

2. **Preparar los cambios**
   - Ejecuta: `git add -A`

3. **Generar mensaje de commit**
   - Si el usuario pasó argumentos (`$ARGUMENTS`), úsalos como mensaje de commit.
   - Si **no** hay argumentos:
     - Analiza los cambios con `git diff --cached --stat` y `git diff --cached`
     - Genera un **buen mensaje de commit** siguiendo Conventional Commits cuando sea posible:
       - `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, etc.
     - El mensaje debe ser claro, conciso y en español (o en inglés si el proyecto lo usa).

4. **Crear el commit**
   - Ejecuta: `git commit -m "mensaje generado"`

5. **Hacer push**
   - Ejecuta: `git push origin HEAD`
   - Si falla por alguna razón (ej. upstream no configurado), avísame.

6. **Resumen final**
   - Muestra:
     - El hash corto del commit
     - El mensaje usado
     - El branch actual
     - Un mensaje de éxito tipo:  
       `✅ Commit y push completado con éxito.`

## Reglas importantes:
- Nunca uses `git push --force` a menos que el usuario lo indique explícitamente.
- Si hay conflictos o errores, detente y explica qué pasó.
- Sé transparente: muestra siempre qué comandos estás ejecutando.
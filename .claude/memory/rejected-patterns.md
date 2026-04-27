# Patrones rechazados

Enfoques que se probaron o propusieron y se descartaron — con el motivo.
Antes de sugerir algo, verifica que no esté aquí.

---

## Hooks

**`session-start` como evento de Claude Code**
No existe. El intento de crear hooks con este nombre fue un error. Los eventos válidos son solo: `PreToolUse`, `PostToolUse`, `Stop`, `Notification`.

**Llamar a `claude --command` desde dentro de un hook**
Causa loop infinito. Claude Code lanza Claude → que lanza hooks → que lanza Claude. Descartado definitivamente.

**Hooks completamente silenciosos (`>/dev/null 2>&1`)**
Rechazado por el usuario. Los hooks deben dar feedback visible en terminal via `>&2` para recordar que existen y reforzar buenas prácticas.

**`grep -P` en scripts de hooks**
No disponible en macOS (BSD grep no soporta Perl regex). Usar siempre `grep -E` con clases POSIX.

**Patrón `/console\.log/d` en sed**
Demasiado amplio — elimina líneas con el texto "console.log" aunque estén en strings o comentarios. El patrón correcto es `/^[[:space:]]*console\.log(/d`.

---

## Arquitectura

**Extraer datos a archivos separados**
Propuesto para `app/comandos/page.tsx` (32 KB de data hardcodeada). Pendiente de aprobación — no implementar hasta que el usuario lo confirme explícitamente.

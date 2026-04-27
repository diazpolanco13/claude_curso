---
description: Recopila contexto de un error automáticamente (logs, archivos relevantes, git diff) y diagnostica la causa raíz antes de proponer solución.
allowed-tools: Read, Bash, Glob
---

# Comando /debug — Diagnóstico estructurado

## Regla absoluta

No propongas soluciones hasta haber recopilado todo el contexto. Un fix adivinado sin contexto genera más bugs.

## Pasos obligatorios

### 1. Obtener el error

- Si el usuario pasó el error en `$ARGUMENTS`, úsalo directamente.
- Si no hay argumento, pregunta: **"¿Cuál es el error? Pégalo completo, incluyendo el stack trace."**

### 2. Recopilar contexto automáticamente

Ejecuta en paralelo:
- `git status --short` — estado actual del repo
- `git diff --name-only HEAD` — archivos modificados recientemente
- `npm run build 2>&1 | tail -30` — si el error parece de build
- `npx tsc --noEmit 2>&1 | head -20` — si el error parece de tipos

### 3. Identificar archivos relevantes

Del stack trace o mensaje de error, extrae:
- El archivo donde ocurre el error
- Los archivos que lo importan o que importa
- Lee esos archivos completos

### 4. Diagnosticar

Con todo el contexto recopilado, presenta:

```
## Causa raíz
[Qué está fallando realmente — no el síntoma, sino el por qué]

## Archivos afectados
- `ruta/archivo.tsx` línea X — [qué está mal]

## Solución propuesta
[La solución mínima necesaria, sin refactors oportunistas]

## Lo que NO voy a tocar
[Scope explícito para no introducir regresiones]
```

### 5. Esperar aprobación

Pregunta: **"¿Procedo con este fix?"**

Solo implementa cuando recibas confirmación. Si la causa raíz no está clara después de recopilar el contexto, dilo explícitamente en lugar de adivinar.

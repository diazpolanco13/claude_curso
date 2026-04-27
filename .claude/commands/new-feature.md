---
description: Captura el brief de una nueva feature antes de planearla. Define qué, por qué y para quién — luego delega a /plan para el cómo.
allowed-tools: Read, Write, Bash
---

# Comando /new-feature — Brief antes de implementar

## Objetivo

Antes de tocar código o llamar a `/plan`, captura la intención completa de la feature. Sin esto, Claude optimiza para "funciona" en lugar de "resuelve el problema correcto".

## Pasos obligatorios

### 1. Leer el contexto base
- Lee `CLAUDE.md` y `.claude/specs/SPEC.md`
- Ejecuta `git status --short` para ver el estado del repo

### 2. Hacerle al usuario estas preguntas (si no vienen en `$ARGUMENTS`)

Si el usuario no dio suficiente contexto, pregunta **en un solo mensaje**:

```
Para planear bien esta feature necesito entender:

1. ¿Qué problema resuelve? (no qué hace, sino qué problema)
2. ¿Quién lo usa y cuándo?
3. ¿Cómo sabremos que funcionó? (criterio de éxito concreto)
4. ¿Qué queda FUERA de esta feature? (scope explícito)
5. ¿Hay algún constraint de diseño o técnico que ya sepas?
```

Si el usuario ya dio suficiente contexto en `$ARGUMENTS`, sáltate las preguntas.

### 3. Crear el brief en `.claude/specs/features/`

Crea el archivo `.claude/specs/features/[nombre-kebab-case].md` con esta estructura:

```markdown
# Feature: [Nombre]

**Fecha:** [fecha actual]
**Estado:** En planeación

## Problema que resuelve
[Por qué existe esta feature. Qué pasa si no la hacemos.]

## Usuario y contexto de uso
[Quién la usa, en qué momento, con qué frecuencia.]

## Criterio de éxito
- [ ] [Criterio concreto y verificable]
- [ ] [Criterio concreto y verificable]

## Scope: dentro
- [Qué SÍ incluye esta feature]

## Scope: fuera
- [Qué NO incluye — igual de importante]

## Constraints conocidos
- [Diseño: debe seguir el sistema visual existente (zinc/orange/mono)]
- [Técnico: ...]
- [Otros: ...]

## Notas adicionales
[Cualquier contexto relevante que no cabe arriba]
```

### 4. Confirmar y delegar

Muestra el brief al usuario y di:

```
Brief guardado en `.claude/specs/features/[nombre].md`.

¿Procedo con `/plan` para definir el enfoque técnico?
```

Espera confirmación antes de continuar. Si el usuario pide ajustes, actualiza el archivo y vuelve a preguntar.

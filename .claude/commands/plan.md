---
description: Planea una feature o cambio antes de implementarlo. Genera PLAN.md para revisión y aprobación. No escribe código de producción hasta recibir luz verde.
allowed-tools: Read, Bash, Glob, Write
---

# Comando /plan — Planificación antes de implementar

## Regla absoluta

**No escribas código de producción hasta que el usuario apruebe el plan.**
Solo puedes escribir en `PLAN.md`. Ningún otro archivo.

## Pasos obligatorios

### 1. Leer el contexto del proyecto
- Lee `CLAUDE.md` y `.claude/specs/SPEC.md`
- Ejecuta `git status --short` para ver el estado actual
- Ejecuta `git diff --name-only HEAD` para ver cambios recientes

### 2. Analizar el impacto de lo que se pide
- Identifica con `find` o `grep` los archivos relevantes para la tarea
- Determina qué componentes, rutas o módulos se ven afectados
- Detecta posibles conflictos con código existente

### 3. Escribir PLAN.md con esta estructura exacta

```markdown
# Plan: [nombre de la feature o cambio]

## Qué se va a implementar
[Descripción clara en 2-3 oraciones. Qué hace, por qué, para quién.]

## Archivos que se van a tocar
| Archivo | Acción | Qué cambia |
|---|---|---|
| `app/components/X.tsx` | crear | Nuevo componente para... |
| `app/page.tsx` | modificar | Agregar sección de... |

## Archivos que NO se van a tocar
[Lista explícita para acotar el scope]

## Enfoque técnico
[Cómo se va a implementar — sin código. Decisiones de arquitectura, 
patrones a usar, por qué este enfoque y no otro.]

## Riesgos y efectos secundarios
- [Riesgo 1: qué podría romperse y por qué]
- [Riesgo 2: dependencias que hay que considerar]

## Pasos de implementación
1. [Paso concreto]
2. [Paso concreto]
3. [Paso concreto]

## Lo que queda fuera de este plan
[Qué no se va a hacer en esta iteración — importante para control de scope]

---
**¿Aprobado? Responde "sí" o "adelante" para que empiece la implementación.
Si quieres ajustar algo, dímelo antes de que toque un solo archivo.**
```

### 4. Esperar respuesta del usuario

No implementes nada. Muestra el plan y espera. Si el usuario pide ajustes, actualiza `PLAN.md` y vuelve a preguntar. Solo implementa cuando recibas aprobación explícita.

### 5. Al recibir aprobación

Implementa siguiendo el plan al pie de la letra. Si durante la implementación encuentras algo que requiere desviarte del plan, **detente y notifica** antes de continuar.

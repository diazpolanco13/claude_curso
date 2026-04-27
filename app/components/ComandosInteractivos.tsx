"use client";

import { useState } from "react";

type CmdTipo = "Planificación" | "Producto" | "Debug" | "Workflow" | "Docs";

type Comando = {
  id: string;
  comando: string;
  titulo: string;
  tipo: CmdTipo;
  cuando: string;
  descripcion: string;
  fragmento: string;
};

const tipoClase: Record<CmdTipo, string> = {
  Planificación: "text-violet-400 border-violet-500/40 bg-violet-500/10",
  Producto: "text-sky-400 border-sky-500/40 bg-sky-500/10",
  Debug: "text-rose-400 border-rose-500/40 bg-rose-500/10",
  Workflow: "text-orange-400 border-orange-500/40 bg-orange-500/10",
  Docs: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
};

export function ComandosInteractivos() {
  const [activo, setActivo] = useState(comandos[0].id);
  const [copiado, setCopiado] = useState(false);
  const cmd = comandos.find((c) => c.id === activo) ?? comandos[0];

  async function copiar() {
    try {
      await navigator.clipboard.writeText(cmd.comando);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // clipboard not available
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[200px_1fr]">
      <ul
        role="tablist"
        aria-label="Comandos slash"
        className="flex flex-col gap-1"
      >
        {comandos.map((c) => (
          <li key={c.id}>
            <button
              role="tab"
              aria-selected={activo === c.id}
              aria-controls={`cmd-panel-${c.id}`}
              id={`cmd-tab-${c.id}`}
              onClick={() => {
                setActivo(c.id);
                setCopiado(false);
              }}
              className={`w-full rounded border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-orange-500 ${
                activo === c.id
                  ? "border-orange-500/30 bg-orange-500/10"
                  : "border-transparent hover:bg-zinc-800/40"
              }`}
            >
              <code
                className={`text-xs font-bold ${activo === c.id ? "text-orange-400" : "text-zinc-300"}`}
              >
                {c.comando}
              </code>
              <p className="mt-0.5 text-xs text-zinc-500">{c.titulo}</p>
              <span
                className={`mt-2 inline-block rounded border px-1.5 py-0.5 text-xs ${tipoClase[c.tipo]}`}
              >
                {c.tipo}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div
        id={`cmd-panel-${cmd.id}`}
        role="tabpanel"
        aria-labelledby={`cmd-tab-${cmd.id}`}
        className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-6"
      >
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <button
            onClick={copiar}
            aria-label="Copiar nombre del comando"
            className="rounded border border-zinc-700 bg-zinc-800 px-3 py-1 font-mono text-sm text-orange-400 transition-colors hover:border-orange-500/40 hover:bg-orange-500/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500"
          >
            {copiado ? "✔ copiado" : cmd.comando}
          </button>
          <span
            className={`rounded border px-2 py-0.5 text-xs ${tipoClase[cmd.tipo]}`}
          >
            {cmd.tipo}
          </span>
        </div>

        <p className="mb-1 text-xs text-zinc-600">Cuándo usarlo</p>
        <p className="mb-5 text-sm font-medium text-zinc-300">{cmd.cuando}</p>

        <p className="mb-5 text-sm leading-relaxed text-zinc-400">
          {cmd.descripcion}
        </p>

        <div className="rounded-lg border border-zinc-700 bg-zinc-950">
          <div className="border-b border-zinc-800 px-4 py-2.5">
            <code className="text-xs text-zinc-500">
              .claude/commands/{cmd.id}.md
            </code>
          </div>
          <pre className="overflow-x-auto p-4" tabIndex={0}>
            <code className="text-xs leading-relaxed text-zinc-300">
              {cmd.fragmento}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

const comandos: Comando[] = [
  {
    id: "plan",
    comando: "/plan",
    titulo: "Planear antes de codear",
    tipo: "Planificación",
    cuando: "Antes de implementar cualquier cosa",
    descripcion:
      "Fuerza a Claude a analizar el proyecto, identificar archivos afectados y definir el enfoque técnico en un PLAN.md. Tú lo apruebas antes de que toque una sola línea de código de producción.",
    fragmento: `# Regla absoluta
No escribas código de producción hasta
que el usuario apruebe el plan.
Solo puedes escribir en PLAN.md.

# Qué incluye el plan
- Archivos que se van a crear o modificar
- Archivos que NO se van a tocar
- Enfoque técnico (sin código)
- Riesgos y efectos secundarios
- Pasos de implementación ordenados`,
  },
  {
    id: "new-feature",
    comando: "/new-feature",
    titulo: "Brief de producto primero",
    tipo: "Producto",
    cuando: "Antes de pedir una feature nueva",
    descripcion:
      "Captura el qué y el por qué antes del cómo. Genera un brief en .claude/specs/features/ con problema, usuario, criterio de éxito y scope explícito — luego delega a /plan para la parte técnica.",
    fragmento: `# Si no hay contexto suficiente, pregunta:

1. ¿Qué problema resuelve?
   (no qué hace, sino qué problema)
2. ¿Quién lo usa y cuándo?
3. ¿Cómo sabremos que funcionó?
4. ¿Qué queda FUERA de esta feature?
5. ¿Constraints de diseño o técnicos?`,
  },
  {
    id: "debug",
    comando: "/debug",
    titulo: "Diagnóstico estructurado",
    tipo: "Debug",
    cuando: "Cuando algo explota",
    descripcion:
      "Recopila automáticamente el contexto del error: stack trace, archivos relevantes, git diff reciente. Diagnostica la causa raíz antes de proponer cualquier fix — sin adivinar.",
    fragmento: `# Pasos obligatorios
1. Obtener el error completo con stack trace
2. git status + git diff --name-only HEAD
3. Leer archivos mencionados en el error
4. tsc / build si parece error de tipos

# Formato de diagnóstico
## Causa raíz (no el síntoma)
## Archivos afectados + línea exacta
## Solución mínima propuesta
## Lo que NO se va a tocar`,
  },
  {
    id: "commit-push",
    comando: "/commit-push",
    titulo: "Commit inteligente",
    tipo: "Workflow",
    cuando: "Al terminar una sesión de trabajo",
    descripcion:
      "Analiza los cambios staged, genera un mensaje Conventional Commits coherente y hace push. Si no hay cambios, lo dice y termina. Nunca usa --force ni commitea sin revisar el diff.",
    fragmento: `# Flujo automático
git status → git add -A
→ git diff --cached --stat
→ genera mensaje Conventional Commits
→ git commit → git push origin HEAD

# Nunca
- git push --force
- Commitear sin analizar el diff
- Continuar si hay conflictos`,
  },
  {
    id: "update-ai-context",
    comando: "/update-ai-context",
    titulo: "Sincronizar contexto de IA",
    tipo: "Docs",
    cuando: "Después de cambios estructurales",
    descripcion:
      "Invoca al agente documentation-specialist para actualizar docs/ai-context/ con los últimos cambios. El agente analiza el git diff y actualiza solo las secciones afectadas — sin inventar.",
    fragmento: `# Archivos que actualiza
- architecture.md
- design-system.md  ← prioridad máxima
- api-endpoints.md
- database-schema.md

# Flujo del agente
git diff → detectar cambios →
leer archivos afectados →
actualizar solo secciones relevantes`,
  },
];

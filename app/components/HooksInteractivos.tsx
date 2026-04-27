"use client";

import { useState } from "react";

type HookCaso = {
  id: string;
  titulo: string;
  subtitulo: string;
  tipo: "PostToolUse" | "PreToolUse" | "Stop";
  matcher?: string;
  descripcion: string;
  flujo: { trigger: string; accion: string; resultado: string };
  codigo: string;
  archivo: string;
};

const tipoClase: Record<string, string> = {
  PostToolUse: "text-orange-400 border-orange-500/40 bg-orange-500/10",
  PreToolUse: "text-violet-400 border-violet-500/40 bg-violet-500/10",
  Stop: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
};

export function HooksInteractivos() {
  const [activo, setActivo] = useState(casos[0].id);
  const [copiado, setCopiado] = useState(false);

  const caso = casos.find((c) => c.id === activo) ?? casos[0];

  async function copiar() {
    try {
      await navigator.clipboard.writeText(caso.codigo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Clipboard not available in insecure context
    }
  }

  function cambiarTab(id: string) {
    setActivo(id);
    setCopiado(false);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
      {/* Tab list */}
      <ul
        role="tablist"
        aria-label="Casos de uso de hooks"
        className="flex flex-col gap-1"
      >
        {casos.map((c) => (
          <li key={c.id}>
            <button
              role="tab"
              aria-selected={activo === c.id}
              aria-controls={`hook-panel-${c.id}`}
              id={`hook-tab-${c.id}`}
              onClick={() => cambiarTab(c.id)}
              className={`w-full rounded border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-orange-500 ${
                activo === c.id
                  ? "border-orange-500/30 bg-orange-500/10"
                  : "border-transparent hover:bg-zinc-800/40"
              }`}
            >
              <p
                className={`text-xs font-semibold ${
                  activo === c.id ? "text-orange-400" : "text-zinc-300"
                }`}
              >
                {c.titulo}
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">{c.subtitulo}</p>
              <span
                className={`mt-2 inline-block rounded border px-1.5 py-0.5 text-xs ${tipoClase[c.tipo]}`}
              >
                {c.tipo}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Detail panel */}
      <div
        id={`hook-panel-${caso.id}`}
        role="tabpanel"
        aria-labelledby={`hook-tab-${caso.id}`}
        className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-6"
      >
        {/* Badges */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span
            className={`rounded border px-2 py-0.5 text-xs font-mono ${tipoClase[caso.tipo]}`}
          >
            {caso.tipo}
          </span>
          {caso.matcher && (
            <span className="rounded border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
              matcher:{" "}
              <code className="text-zinc-300">&quot;{caso.matcher}&quot;</code>
            </span>
          )}
        </div>

        {/* Description */}
        <p className="mb-5 text-sm leading-relaxed text-zinc-400">
          {caso.descripcion}
        </p>

        {/* Flow */}
        <div className="mb-5 flex flex-wrap items-center gap-2 rounded border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs">
          <span className="text-zinc-500">{caso.flujo.trigger}</span>
          <span className="text-orange-500" aria-hidden="true">
            →
          </span>
          <code className="text-orange-400">{caso.flujo.accion}</code>
          <span className="text-orange-500" aria-hidden="true">
            →
          </span>
          <span className="text-zinc-500">{caso.flujo.resultado}</span>
        </div>

        {/* Code block */}
        <div className="rounded-lg border border-zinc-700 bg-zinc-950">
          <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
            <code className="text-xs text-zinc-500">{caso.archivo}</code>
            <button
              onClick={copiar}
              aria-label="Copiar configuración al portapapeles"
              className="rounded border border-zinc-700 px-3 py-1 text-xs text-zinc-400 transition-colors hover:border-orange-500/40 hover:text-orange-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500"
            >
              {copiado ? "✔ copiado" : "copiar"}
            </button>
          </div>
          <pre className="overflow-x-auto p-4" tabIndex={0}>
            <code className="text-xs leading-relaxed text-zinc-300">
              {caso.codigo}
            </code>
          </pre>
        </div>

        {/* File tip */}
        <p className="mt-4 text-xs leading-relaxed text-zinc-600">
          {caso.archivo.startsWith("~")
            ? "Archivo global — aplica a todos tus proyectos."
            : "Archivo de proyecto — aplica solo a este repo."}
          {" "}Crea el directorio con{" "}
          <code className="text-zinc-500">mkdir -p {caso.archivo.split("/").slice(0, -1).join("/")}</code>
          {" "}si no existe.
        </p>
      </div>
    </div>
  );
}

const casos: HookCaso[] = [
  {
    id: "lint",
    titulo: "Auto-lint",
    subtitulo: "Detecta errores al instante",
    tipo: "PostToolUse",
    matcher: "Write|Edit",
    descripcion:
      "Cada vez que Claude edita un archivo, el linter corre automáticamente. Los errores vuelven al contexto y Claude los corrige en la misma sesión — sin que tengas que pedírselo.",
    flujo: {
      trigger: "Claude edita un archivo",
      accion: "npm run lint",
      resultado: "Errores vuelven al contexto",
    },
    codigo: `{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint --silent"
          }
        ]
      }
    ]
  }
}`,
    archivo: ".claude/settings.json",
  },
  {
    id: "typecheck",
    titulo: "TypeScript check",
    subtitulo: "Errores de tipo en tiempo real",
    tipo: "PostToolUse",
    matcher: "Write|Edit",
    descripcion:
      "Corre el compilador de TypeScript después de cada cambio. Claude ve los errores de tipo y los resuelve antes de continuar — ideal para proyectos con TypeScript estricto.",
    flujo: {
      trigger: "Claude escribe código",
      accion: "tsc --noEmit",
      resultado: "Errores de tipo visibles",
    },
    codigo: `{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npx tsc --noEmit 2>&1 | head -20"
          }
        ]
      }
    ]
  }
}`,
    archivo: ".claude/settings.json",
  },
  {
    id: "tests",
    titulo: "Tests automáticos",
    subtitulo: "TDD sin intervención manual",
    tipo: "PostToolUse",
    matcher: "Write|Edit",
    descripcion:
      "Cada vez que Claude escribe código, los tests corren solos. Si fallan, Claude ve el output y los corrige. Un loop de feedback continuo que convierte a Claude en un desarrollador TDD.",
    flujo: {
      trigger: "Claude escribe código",
      accion: "npm test",
      resultado: "Fallos visibles para Claude",
    },
    codigo: `{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npm test -- --watchAll=false --passWithNoTests 2>&1 | tail -15"
          }
        ]
      }
    ]
  }
}`,
    archivo: ".claude/settings.json",
  },
  {
    id: "notificacion",
    titulo: "Notificación al terminar",
    subtitulo: "Avisa cuando Claude acaba",
    tipo: "Stop",
    descripcion:
      "Cuando Claude termina una tarea larga, el sistema operativo te notifica. Puedes lanzar a Claude en una tarea compleja, ir a hacer otra cosa, y recibir el aviso cuando esté listo.",
    flujo: {
      trigger: "Claude termina la sesión",
      accion: "osascript / notify-send",
      resultado: "Notificación del sistema",
    },
    codigo: `{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \\"Claude terminó\\" with title \\"Claude Code\\"'"
          }
        ]
      }
    ]
  }
}`,
    archivo: "~/.claude/settings.json",
  },
  {
    id: "git",
    titulo: "Git auto-stage",
    subtitulo: "Stagea cambios automáticamente",
    tipo: "PostToolUse",
    matcher: "Write|Edit",
    descripcion:
      "Cada archivo que Claude crea o modifica queda en stage automáticamente. Al terminar la sesión, solo tienes que revisar y hacer commit — Claude no toca tu historial git, pero te prepara el trabajo.",
    flujo: {
      trigger: "Claude escribe un archivo",
      accion: "git add -A",
      resultado: "Cambios listos para commit",
    },
    codigo: `{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "git add -A 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}`,
    archivo: ".claude/settings.json",
  },
];

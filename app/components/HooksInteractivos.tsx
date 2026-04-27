"use client";

import { useState } from "react";

type HookTipo = "PostToolUse" | "PreToolUse" | "Stop" | "GitHook";

type HookCaso = {
  id: string;
  titulo: string;
  subtitulo: string;
  tipo: HookTipo;
  matcher?: string;
  descripcion: string;
  flujo: { trigger: string; accion: string; resultado: string };
  codigo: string;
  archivo: string;
};

const tipoClase: Record<HookTipo, string> = {
  PostToolUse: "text-orange-400 border-orange-500/40 bg-orange-500/10",
  PreToolUse: "text-violet-400 border-violet-500/40 bg-violet-500/10",
  Stop: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
  GitHook: "text-sky-400 border-sky-500/40 bg-sky-500/10",
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
          {caso.tipo === "GitHook"
            ? "Git hook — no es un evento de Claude Code. Git lo ejecuta automáticamente antes de cada commit."
            : caso.archivo.startsWith("~")
              ? "Archivo global — aplica a todos tus proyectos."
              : "Archivo de proyecto — aplica solo a este repo."}
        </p>
      </div>
    </div>
  );
}

const casos: HookCaso[] = [
  {
    id: "format",
    titulo: "Prettier automático",
    subtitulo: "Formatea cada archivo al escribir",
    tipo: "PostToolUse",
    matcher: "Write|Edit",
    descripcion:
      "Cada vez que Claude escribe o edita un archivo, este script lee el path desde el JSON que Claude Code envía por stdin, y corre Prettier en silencio. El feedback aparece en tu terminal via stderr — sin consumir tokens.",
    flujo: {
      trigger: "Claude escribe o edita un archivo",
      accion: "format.sh lee stdin → prettier",
      resultado: "✨ [hook] prettier → archivo (stderr)",
    },
    codigo: `#!/bin/bash
FILE=$(python3 -c "import sys,json; print(json.load(sys.stdin).get('tool_input',{}).get('file_path',''))" 2>/dev/null)
if [[ "$FILE" =~ \\.(ts|tsx|js|jsx|json)$ ]]; then
  npx prettier --write "$FILE" >/dev/null 2>&1
  echo "✨ [hook] prettier → $FILE" >&2
fi`,
    archivo: ".claude/hooks/post-edit/format.sh",
  },
  {
    id: "notificacion",
    titulo: "Notificación al terminar",
    subtitulo: "Avisa cuando Claude acaba",
    tipo: "Stop",
    descripcion:
      "Cuando Claude termina una tarea larga, el sistema operativo te notifica con una alerta macOS y un mensaje en la terminal. La clave: todo va a stderr, así que Claude no lo lee y no gasta tokens.",
    flujo: {
      trigger: "Claude termina de responder",
      accion: "osascript + echo >&2",
      resultado: "Notificación macOS + log en terminal",
    },
    codigo: `{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \\"Claude terminó\\" with title \\"Claude Code\\"' 2>/dev/null || true; echo '🔔 [hook] sesión terminada' >&2"
          }
        ]
      }
    ]
  }
}`,
    archivo: ".claude/settings.json",
  },
  {
    id: "precommit",
    titulo: "Limpieza pre-commit",
    subtitulo: "Elimina console.log al commitear",
    tipo: "GitHook",
    descripcion:
      "Este no es un hook de Claude Code — es un git hook real. Se ejecuta automáticamente con cada git commit, busca console.log en archivos TypeScript y los elimina. Cero tokens, cero intervención de Claude.",
    flujo: {
      trigger: "git commit",
      accion: "find + sed elimina console.log",
      resultado: "🧹 [pre-commit] código limpio",
    },
    codigo: `#!/bin/bash
FOUND=$(find . -type f \\( -name "*.ts" -o -name "*.tsx" \\) \\
  ! -path "*/node_modules/*" ! -path "*/.next/*" \\
  ! -path "*/*.test.*" ! -path "*/*.spec.*" \\
  -exec grep -l "console\\.log" {} + 2>/dev/null)

if [[ -n "$FOUND" ]]; then
  echo "$FOUND" | while read -r file; do
    sed -i '' '/console\\.log/d' "$file"
    echo "🧹 [pre-commit] console.log eliminado → $file"
  done
else
  echo "✅ [pre-commit] sin console.log — código limpio"
fi`,
    archivo: ".git/hooks/pre-commit",
  },
];

"use client";

import { useState, useMemo } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type Priority = "essential" | "important" | "useful";

type Item = {
  section: string;
  tag: string;
  cmd: string;
  desc: string;
  priority?: Priority;
};

// ── Data ──────────────────────────────────────────────────────────────────────

const slashCommands: { cmd: string; desc: string; priority: Priority }[] = [
  // Essential
  { cmd: "/help",             desc: "Listar todos los comandos y ayuda disponible.",                                                                                                                                        priority: "essential" },
  { cmd: "/clear",            desc: "Limpiar ventana de contexto y sesión actual.",                                                                                                                                         priority: "essential" },
  { cmd: "/compact",          desc: "Compactar y limpiar historial para liberar contexto.",                                                                                                                                 priority: "essential" },
  { cmd: "/model",            desc: "Elegir y cambiar el modelo activo (Opus, Sonnet, Haiku).",                                                                                                                             priority: "essential" },
  { cmd: "/config",           desc: "Abrir menú interactivo de configuración de Claude Code.",                                                                                                                              priority: "essential" },
  { cmd: "/init",             desc: "Analizar proyecto y crear/actualizar CLAUDE.MD.",                                                                                                                                      priority: "essential" },
  // Important
  { cmd: "/tasks",            desc: "Ver y gestionar las tareas activas de la sesión.",                                                                                                                                     priority: "important" },
  { cmd: "/agents",           desc: "Ver y gestionar subagentes activos en la sesión.",                                                                                                                                     priority: "important" },
  { cmd: "/fast",             desc: "Activar/desactivar modo rápido — usa Opus 4.6 con output más veloz sin cambiar a un modelo inferior.",                                                                                 priority: "important" },
  { cmd: "/loop",             desc: "Ejecutar un prompt o slash command de forma recurrente. Omite el intervalo para que el modelo se autogestione. Ej: /loop 5m /review.",                                                priority: "important" },
  { cmd: "/skills",           desc: "Listar todos los skills disponibles y sus capacidades.",                                                                                                                               priority: "important" },
  { cmd: "/resume",           desc: "Reanudar la última sesión interrumpida.",                                                                                                                                              priority: "important" },
  { cmd: "/code-review",      desc: "Analizar el código del branch actual y generar un informe de revisión detallado.",                                                                                                     priority: "important" },
  { cmd: "/diff",             desc: "Mostrar las diferencias entre el estado actual y el anterior del código.",                                                                                                             priority: "important" },
  { cmd: "/btw",              desc: "Hacer una pregunta lateral sin agregar al historial. Claude ve el contexto completo pero responde sin herramientas ni turnos adicionales. Ideal para dudas rápidas mientras trabaja.", priority: "important" },
  { cmd: "/context",          desc: "Ver estadísticas de contexto y uso de tokens.",                                                                                                                                        priority: "important" },
  { cmd: "/usage",            desc: "Ver uso del plan activo y límites de la cuenta.",                                                                                                                                      priority: "important" },
  { cmd: "/permissions",      desc: "Ver y actualizar permisos de herramientas.",                                                                                                                                           priority: "important" },
  { cmd: "/mcp",              desc: "Ver y gestionar servidores MCP conectados.",                                                                                                                                           priority: "important" },
  { cmd: "/rewind",           desc: "Rebobinar a un punto anterior de la conversación (ESC+ESC).",                                                                                                                          priority: "important" },
  { cmd: "/memory",           desc: "Mostrar y editar archivos de memoria del proyecto.",                                                                                                                                   priority: "important" },
  // Useful
  { cmd: "/debug",            desc: "Activar modo debug para ver logs internos y trazas detalladas de cada acción.",                                                                                                        priority: "useful" },
  { cmd: "/review",           desc: "Lanzar revisión de código del branch actual o de un PR de GitHub.",                                                                                                                    priority: "useful" },
  { cmd: "/rename",           desc: "Renombrar la conversación o sesión actual.",                                                                                                                                           priority: "useful" },
  { cmd: "/theme",            desc: "Cambiar el tema visual de la interfaz de Claude Code.",                                                                                                                                priority: "useful" },
  { cmd: "/export",           desc: "Exportar la conversación actual a un archivo de texto o JSON.",                                                                                                                        priority: "useful" },
  { cmd: "/extra-usage",      desc: "Ver estadísticas de uso extendidas y desglose detallado de consumo de tokens.",                                                                                                        priority: "useful" },
  { cmd: "/plugin",           desc: "Ver y gestionar plugins instalados en Claude Code.",                                                                                                                                   priority: "useful" },
  { cmd: "/privacy-settings", desc: "Configurar opciones de privacidad y retención de datos de la sesión.",                                                                                                                 priority: "useful" },
  { cmd: "/mobile",           desc: "Ajustar configuración de visualización para dispositivos móviles.",                                                                                                                    priority: "useful" },
  { cmd: "/voice",            desc: "Activar/desactivar entrada de voz para el prompt.",                                                                                                                                    priority: "useful" },
  { cmd: "/statusline",       desc: "Configurar la línea de estado de Claude Code.",                                                                                                                                        priority: "useful" },
  { cmd: "/teleport",         desc: "Reanudar una sesión remota existente.",                                                                                                                                                priority: "useful" },
  { cmd: "/login",            desc: "Autenticarse con tu cuenta de Anthropic.",                                                                                                                                             priority: "useful" },
  { cmd: "/logout",           desc: "Cerrar sesión de la cuenta activa.",                                                                                                                                                   priority: "useful" },
  { cmd: "/vim",              desc: "Activar modo de edición estilo Vim en el prompt.",                                                                                                                                     priority: "useful" },
  { cmd: "/doctor",           desc: "Diagnosticar configuración e instalación del entorno.",                                                                                                                                priority: "useful" },
  { cmd: "/cost",             desc: "Mostrar el costo de tokens usados en la sesión.",                                                                                                                                      priority: "useful" },
];

const cliFlags: { flag: string; desc: string; priority: Priority }[] = [
  // Essential
  { flag: "claude",                                     desc: "Iniciar sesión interactiva de Claude Code.",                        priority: "essential" },
  { flag: 'claude "my prompt"',                         desc: "Iniciar sesión con un prompt inicial precargado.",                   priority: "essential" },
  { flag: "claude -p / --print",                        desc: 'Consulta rápida con "mi prompt" y salir. Ideal para scripts.',       priority: "essential" },
  { flag: "claude -c",                                  desc: "Continuar la sesión reciente donde se dejó.",                        priority: "essential" },
  // Important
  { flag: 'claude --allowedTools "Read" "Write"',       desc: "Pre-autorizar herramientas para omitir confirmación de permisos.",   priority: "important" },
  { flag: 'claude --disallowedTools "Write"',           desc: "Denegar herramientas específicas durante la sesión.",                priority: "important" },
  { flag: "claude --dangerously-skip-permissions",      desc: "Omitir TODAS las confirmaciones de permisos. ¡Usar con precaución!", priority: "important" },
  { flag: "claude --model opus",                        desc: "Establecer el modelo por defecto al iniciar (opus/sonnet/haiku).",   priority: "important" },
  { flag: "claude --permission-mode plan",              desc: "Iniciar en modo plan: Claude propone, tú apruebas.",                 priority: "important" },
  // Useful
  { flag: 'claude --agent DocsExplorer',                desc: "Iniciar Claude con un agente personalizado predefinido.",            priority: "useful" },
  { flag: 'claude --append-system-prompt "..."',        desc: "Añadir instrucciones extra al prompt del sistema.",                  priority: "useful" },
  { flag: 'claude --system-prompt "..."',               desc: "Reemplazar completamente el prompt del sistema.",                    priority: "useful" },
  { flag: 'claude --remote "Add dark mode"',            desc: "Iniciar una sesión remota desde la web con un prompt.",              priority: "useful" },
  { flag: "claude --output-format json",                desc: "Salida en formato JSON estructurado (útil en pipelines).",           priority: "useful" },
  { flag: "claude --verbose",                           desc: "Mostrar logs detallados de cada acción ejecutada.",                  priority: "useful" },
  { flag: "claude --no-markdown",                       desc: "Desactivar renderizado Markdown en la respuesta.",                   priority: "useful" },
];

const keyboardShortcuts: { keys: string[]; desc: string; priority: Priority }[] = [
  // Essential
  { keys: ["Shift", "Enter"],           desc: "Nueva línea sin enviar. También: Option+Enter o Ctrl+J.",          priority: "essential" },
  { keys: ["Ctrl", "C"],                desc: "Cancelar entrada actual o interrumpir generación en curso.",        priority: "essential" },
  { keys: ["Esc", "Esc"],               desc: "Rebobinar al estado anterior del código (rewind).",                 priority: "essential" },
  { keys: ["Shift", "Tab"],             desc: "Cambiar entre modos de entrada (normal, bash, editor).",            priority: "essential" },
  // Important
  { keys: ["↑ / ↓"],                    desc: "Ciclar por opciones del menú o mensajes anteriores.",               priority: "important" },
  { keys: ["Alt", "P"],                 desc: "Cambiar modelo activo. También: Arrow+P.",                          priority: "important" },
  { keys: ["Ctrl", "V"],                desc: "Insertar texto o imagen desde clipboard. También: Cmd+V, Alt+V.",   priority: "important" },
  { keys: ["Ctrl", "B"],                desc: "Mover tarea actual a segundo plano.",                               priority: "important" },
  // Useful
  { keys: ["Ctrl", "0"],                desc: "Alternar salida detallada (verbose output).",                       priority: "useful" },
  { keys: ["Tab"],                      desc: "Autocompletado de rutas de archivos y comandos.",                   priority: "useful" },
  { keys: ["Ctrl", "R"],                desc: "Búsqueda inversa en el historial de comandos del shell.",           priority: "useful" },
  { keys: ["Ctrl", "K"],                desc: "Borrar desde el cursor hasta el final de la línea.",               priority: "useful" },
  { keys: ["Ctrl", "U"],                desc: "Borrar toda la línea actual.",                                      priority: "useful" },
  { keys: ["Ctrl", "A"],                desc: "Mover cursor al inicio de la línea.",                              priority: "useful" },
  { keys: ["Ctrl", "E"],                desc: "Mover cursor al final de la línea.",                               priority: "useful" },
];

const specialInputs: { cmd: string; desc: string; priority: Priority }[] = [
  { cmd: "! <comando>",    desc: "Ejecutar un comando shell directamente desde el prompt.",  priority: "essential" },
  { cmd: "@<archivo>",     desc: "Incluir el contenido de un archivo en el mensaje.",        priority: "essential" },
  { cmd: "# <texto>",      desc: "Comentario local: no se envía al modelo.",                 priority: "important" },
  { cmd: "exit / quit",    desc: "Cerrar la sesión interactiva de forma limpia.",             priority: "important" },
  { cmd: "Ctrl+C (doble)", desc: "Salir completamente de Claude Code.",                      priority: "important" },
  { cmd: "/clear + Enter", desc: "Reiniciar el contexto para empezar una tarea nueva.",      priority: "useful" },
];

const configKeys: { key: string; example: string; desc: string; priority: Priority }[] = [
  { key: '"permissions"',           example: '{ "permissions": { "allow": ["Bash"] } }',         desc: "Gestionar permisos de herramientas para sesiones.",              priority: "essential" },
  { key: '"model"',                 example: '{ "model": "opus" }',                               desc: "Gestionar modelo IA por defecto al iniciar Claude Code.",        priority: "essential" },
  { key: '"alwaysThinkingEnabled"', example: '{ "alwaysThinkingEnabled": true }',                 desc: "Habilitar/deshabilitar el modo de pensamiento avanzado.",        priority: "important" },
  { key: '"hooks"',                 example: '{ "hooks": { "PostToolUse": [...] } }',              desc: "Gestionar hooks que se ejecutan antes/después de herramientas.", priority: "important" },
  { key: '"env"',                   example: '{ "env": { "IS_DEMO": "1", "API_URL": "..." } }',   desc: "Variables de entorno aplicadas automáticamente en cada sesión.",  priority: "important" },
];

const proTips = [
  { icon: "🎯", title: "CLAUDE.md como ancla",    desc: "Mantén un CLAUDE.md actualizado con convenciones. Claude lo lee en cada sesión como contexto permanente." },
  { icon: "⚡", title: "Modo no-interactivo",      desc: 'Usa claude -p "tarea" para pipelines CI/CD. Combina con --output-format json para procesar la salida.' },
  { icon: "🔄", title: "Compacta frecuente",       desc: "Llama /compact cuando el contexto supere el 70%. Mantiene la memoria sin perder progreso." },
  { icon: "📌", title: "Archivos con @",           desc: "Pasa @ruta/archivo.ts en tu prompt para acotar el contexto y obtener respuestas más precisas." },
  { icon: "🛡️", title: "Permisos granulares",      desc: "Usa --allowedTools en arranque o configura settings.json para pre-autorizar herramientas." },
  { icon: "🤖", title: "Subagentes paralelos",     desc: "Para tareas independientes Claude lanza subagentes en paralelo. Define bien el alcance de cada una." },
];

// ── Flatten all data for global search ───────────────────────────────────────

const ALL_ITEMS: Item[] = [
  ...slashCommands.map((x) => ({ section: "Slash Commands",     tag: "slash",   cmd: x.cmd,   desc: x.desc, priority: x.priority })),
  ...cliFlags.map((x)      => ({ section: "Flags del CLI",       tag: "flag",    cmd: x.flag,  desc: x.desc, priority: x.priority })),
  ...keyboardShortcuts.map((x) => ({ section: "Shortcuts",       tag: "shortcut",cmd: x.keys.join(" + "), desc: x.desc, priority: x.priority })),
  ...specialInputs.map((x) => ({ section: "Inputs Especiales",   tag: "input",   cmd: x.cmd,   desc: x.desc, priority: x.priority })),
  ...configKeys.map((x)    => ({ section: "Configuración",       tag: "config",  cmd: x.key,   desc: x.desc, priority: x.priority })),
  ...proTips.map((x)       => ({ section: "Pro Tips",            tag: "tip",     cmd: x.icon + " " + x.title, desc: x.desc })),
];

const SECTION_ORDER = ["Slash Commands", "Flags del CLI", "Shortcuts", "Inputs Especiales", "Configuración", "Pro Tips"];

// ── Utils ─────────────────────────────────────────────────────────────────────

const PRIORITY_STARS: Record<Priority, { filled: number; color: string }> = {
  essential: { filled: 3, color: "text-orange-500" },
  important: { filled: 2, color: "text-yellow-400" },
  useful:    { filled: 1, color: "text-zinc-500"   },
};
const PRIORITY_LABEL: Record<Priority, string> = {
  essential: "esencial",
  important: "importante",
  useful:    "útil",
};

function PriorityStars({ priority }: { priority?: Priority }) {
  if (!priority) return null;
  const { filled, color } = PRIORITY_STARS[priority];
  return (
    <span className="flex shrink-0 gap-px leading-none" title={PRIORITY_LABEL[priority]}>
      {[0, 1, 2].map((i) => (
        <span key={i} className={`text-sm ${i < filled ? color : "text-zinc-700"}`}>★</span>
      ))}
    </span>
  );
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${escapeRegex(query)})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="rounded bg-orange-500/25 px-0.5 text-orange-300 not-italic">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

const TAG_STYLES: Record<string, string> = {
  slash:   "border-orange-500/40 text-orange-400 bg-orange-500/10",
  flag:    "border-violet-500/40 text-violet-400 bg-violet-500/10",
  shortcut:"border-sky-500/40   text-sky-400    bg-sky-500/10",
  input:   "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
  config:  "border-pink-500/40  text-pink-400   bg-pink-500/10",
  tip:     "border-yellow-500/40 text-yellow-400 bg-yellow-500/10",
};

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ label, title, count }: { label: string; title: string; count?: number }) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        <p className="text-xs uppercase tracking-widest text-orange-500">{label}</p>
        <h2 className="mt-1 text-2xl font-bold text-white">{title}</h2>
      </div>
      {count !== undefined && (
        <span className="mb-1 text-xs text-zinc-600">{count} entradas</span>
      )}
    </div>
  );
}

function PriorityLegend() {
  return (
    <div className="mb-3 flex items-center gap-5 text-xs text-zinc-600">
      {(["essential", "important", "useful"] as Priority[]).map((p) => {
        const { filled, color } = PRIORITY_STARS[p];
        return (
          <span key={p} className="flex items-center gap-1.5">
            <span className="flex gap-px">
              {[0, 1, 2].map((i) => (
                <span key={i} className={`text-xs ${i < filled ? color : "text-zinc-700"}`}>★</span>
              ))}
            </span>
            {PRIORITY_LABEL[p]}
          </span>
        );
      })}
    </div>
  );
}

function CommandCard({ cmd, desc, priority }: { cmd: string; desc: string; priority?: Priority }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-4 transition-all hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5">
      <div className="mt-0.5 shrink-0">
        <PriorityStars priority={priority} />
      </div>
      <div className="min-w-0">
        <code className="block text-sm font-bold text-orange-400 break-all">{cmd}</code>
        <span className="mt-1 block text-xs text-zinc-500 leading-relaxed">{desc}</span>
      </div>
    </div>
  );
}

function ShortcutCard({ keys, desc, priority }: { keys: string[]; desc: string; priority?: Priority }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-4 transition-all hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5">
      <div className="mt-0.5 shrink-0">
        <PriorityStars priority={priority} />
      </div>
      <div className="min-w-0">
        <div className="mb-1.5 flex flex-wrap items-center gap-1">
          {keys.map((k, i) => (
            <span key={i} className="flex items-center gap-1">
              <kbd className="rounded border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs text-orange-400 font-mono whitespace-nowrap">
                {k}
              </kbd>
              {i < keys.length - 1 && <span className="text-zinc-600 text-xs">+</span>}
            </span>
          ))}
        </div>
        <span className="text-xs text-zinc-500 leading-relaxed">{desc}</span>
      </div>
    </div>
  );
}

function ConfigCard({ entry }: { entry: typeof configKeys[number] }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 transition-all hover:border-pink-500/30 hover:shadow-lg hover:shadow-pink-500/5">
      <div className="flex items-start gap-3">
        <PriorityStars priority={entry.priority} />
        <div className="min-w-0 flex-1">
          <code className="text-sm font-bold text-pink-400">{entry.key}</code>
          <p className="mt-1 text-xs text-zinc-500 leading-relaxed">{entry.desc}</p>
          <div className="mt-3 rounded border border-zinc-800 bg-zinc-950 px-3 py-2">
            <code className="text-xs text-zinc-400 break-all">{entry.example}</code>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Search result card ────────────────────────────────────────────────────────

function ResultCard({ item, query }: { item: Item; query: string }) {
  const tagStyle = TAG_STYLES[item.tag] ?? TAG_STYLES.slash;
  const isShortcut = item.tag === "shortcut";
  const keys = isShortcut ? item.cmd.split(" + ") : [];

  return (
    <div className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-4 transition-all hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5">
      <div className="flex shrink-0 flex-col items-center gap-2 pt-0.5">
        {item.priority && <PriorityStars priority={item.priority} />}
        <span className={`rounded border px-1.5 py-0.5 text-xs font-mono ${tagStyle}`}>
          {item.tag}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        {isShortcut ? (
          <div className="mb-1.5 flex flex-wrap items-center gap-1">
            {keys.map((k, i) => (
              <span key={i} className="flex items-center gap-1">
                <kbd className="rounded border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs text-orange-400 font-mono">
                  <Highlight text={k} query={query} />
                </kbd>
                {i < keys.length - 1 && <span className="text-zinc-600 text-xs">+</span>}
              </span>
            ))}
          </div>
        ) : (
          <code className="mb-1 block text-sm font-bold text-orange-400 break-all">
            <Highlight text={item.cmd} query={query} />
          </code>
        )}
        <p className="text-xs text-zinc-500 leading-relaxed">
          <Highlight text={item.desc} query={query} />
        </p>
      </div>
    </div>
  );
}

// ── Search bar ────────────────────────────────────────────────────────────────

const HINTS = ["/compact", "Ctrl+C", "--allowedTools", "@archivo", "permissions", "hooks", "model"];

function SearchBar({
  value,
  onChange,
  total,
  found,
}: {
  value: string;
  onChange: (v: string) => void;
  total: number;
  found: number;
}) {
  return (
    <div className="mx-auto mb-14 max-w-2xl">
      <div
        className={`flex items-center gap-3 rounded-lg border bg-zinc-900 px-4 py-3 transition-all ${
          value
            ? "border-orange-500/60 shadow-lg shadow-orange-500/10"
            : "border-zinc-700 hover:border-zinc-600"
        }`}
      >
        <span className="shrink-0 select-none text-sm font-bold text-orange-500">$</span>
        <input
          type="text"
          autoFocus
          autoComplete="off"
          spellCheck={false}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="buscar comandos, shortcuts, flags, config..."
          className="min-w-0 flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-600 outline-none caret-orange-500"
        />
        {value ? (
          <div className="flex shrink-0 items-center gap-2">
            <span className="text-xs text-zinc-500">
              <span className={found === 0 ? "text-red-400" : "text-orange-400"}>{found}</span>
              {" "}/ {total}
            </span>
            <button
              onClick={() => onChange("")}
              className="flex h-5 w-5 items-center justify-center rounded text-zinc-600 hover:text-zinc-300 transition-colors"
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          </div>
        ) : (
          <span className="inline-block h-4 w-2 animate-pulse bg-orange-500 shrink-0" />
        )}
      </div>

      {!value && (
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {HINTS.map((hint) => (
            <button
              key={hint}
              onClick={() => onChange(hint)}
              className="rounded border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-500 transition-all hover:border-orange-500/40 hover:text-orange-400"
            >
              {hint}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Comandos() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    return ALL_ITEMS.filter(
      (item) =>
        item.cmd.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.section.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q)
    );
  }, [query]);

  const groupedResults = useMemo(() => {
    if (!filtered) return null;
    const map: Record<string, Item[]> = {};
    for (const item of filtered) {
      if (!map[item.section]) map[item.section] = [];
      map[item.section].push(item);
    }
    return SECTION_ORDER.filter((s) => map[s]).map((s) => ({ section: s, items: map[s] }));
  }, [filtered]);

  return (
    <div className="min-h-screen bg-zinc-950 font-mono text-zinc-100">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,115,22,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="pointer-events-none fixed left-1/2 top-0 z-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl" />

      <div className="relative z-10">
        {/* Nav */}
        <nav className="flex items-center justify-between border-b border-zinc-800 px-8 py-4">
          <a
            href="/"
            className="text-sm font-bold tracking-widest text-orange-500 uppercase hover:text-orange-400 transition-colors"
          >
            &gt;_ Claude Code
          </a>
          <span className="rounded border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
            cheatsheet
          </span>
        </nav>

        {/* Hero */}
        <header className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="mb-4 flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs text-orange-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400" />
            Referencia rápida · Úsala como pro
          </div>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
            <span className="text-orange-500">&gt;</span> Comandos{" "}
            <span className="text-orange-500">&amp;</span> Shortcuts
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400">
            Busca entre{" "}
            <span className="text-orange-400">{ALL_ITEMS.length} entradas</span>: slash
            commands, flags CLI, atajos, inputs especiales, config y pro tips.
          </p>

          {/* Stats chips */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { label: "Slash Commands", count: slashCommands.length,  color: "text-orange-400 border-orange-500/30 bg-orange-500/10" },
              { label: "Flags CLI",       count: cliFlags.length,       color: "text-violet-400 border-violet-500/30 bg-violet-500/10" },
              { label: "Shortcuts",       count: keyboardShortcuts.length, color: "text-sky-400 border-sky-500/30 bg-sky-500/10" },
              { label: "Config",          count: configKeys.length,     color: "text-pink-400 border-pink-500/30 bg-pink-500/10" },
            ].map((s) => (
              <span
                key={s.label}
                className={`rounded-full border px-3 py-1 text-xs ${s.color}`}
              >
                {s.count} {s.label}
              </span>
            ))}
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-6 pb-24">
          <SearchBar
            value={query}
            onChange={setQuery}
            total={ALL_ITEMS.length}
            found={filtered?.length ?? ALL_ITEMS.length}
          />

          {/* ── Search results ── */}
          {groupedResults !== null && (
            groupedResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
                <span className="text-4xl text-zinc-700">_</span>
                <p className="text-sm text-zinc-500">
                  Sin resultados para{" "}
                  <span className="text-orange-400">&quot;{query}&quot;</span>
                </p>
                <button
                  onClick={() => setQuery("")}
                  className="mt-2 rounded border border-zinc-700 px-4 py-1.5 text-xs text-zinc-400 hover:border-orange-500/40 hover:text-orange-400 transition-all"
                >
                  limpiar búsqueda
                </button>
              </div>
            ) : (
              <div className="space-y-10">
                <p className="text-xs text-zinc-600">
                  {filtered!.length} resultado{filtered!.length !== 1 ? "s" : ""} para{" "}
                  <span className="text-orange-400">&quot;{query}&quot;</span>
                </p>
                {groupedResults.map(({ section, items }) => (
                  <div key={section}>
                    <p className="mb-3 text-xs uppercase tracking-widest text-orange-500/70">
                      // {section}{" "}
                      <span className="text-zinc-600 normal-case tracking-normal">({items.length})</span>
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {items.map((item) => (
                        <ResultCard key={item.cmd + item.section} item={item} query={query} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {/* ── Default view (no query) ── */}
          {groupedResults === null && (
            <div className="space-y-16">

              {/* Slash Commands */}
              <section>
                <SectionHeader label="// comandos cruciales" title="Slash Commands" count={slashCommands.length} />
                <PriorityLegend />
                <div className="grid gap-3 sm:grid-cols-2">
                  {slashCommands.map((cmd) => (
                    <CommandCard key={cmd.cmd} cmd={cmd.cmd} desc={cmd.desc} priority={cmd.priority} />
                  ))}
                </div>
              </section>

              {/* CLI Flags */}
              <section>
                <SectionHeader label="// comandos cli y flags" title="Flags del CLI" count={cliFlags.length} />
                <PriorityLegend />
                <div className="rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
                  <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
                    <span className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500" />
                    <span className="h-3 w-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-xs text-zinc-500">terminal</span>
                  </div>
                  <div className="divide-y divide-zinc-800/50">
                    {cliFlags.map((f) => (
                      <div key={f.flag} className="flex items-start gap-3 px-4 py-3 hover:bg-zinc-800/30 transition-colors">
                        <PriorityStars priority={f.priority} />
                        <div className="min-w-0">
                          <code className="block text-sm text-violet-400 break-all">{f.flag}</code>
                          <span className="mt-0.5 block text-xs text-zinc-500">{f.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Keyboard Shortcuts */}
              <section>
                <SectionHeader label="// interacción con claude code" title="Keyboard Shortcuts" count={keyboardShortcuts.length} />
                <PriorityLegend />
                <div className="grid gap-3 sm:grid-cols-2">
                  {keyboardShortcuts.map((s) => (
                    <ShortcutCard key={s.keys.join()} keys={s.keys} desc={s.desc} priority={s.priority} />
                  ))}
                </div>
              </section>

              {/* Special Inputs */}
              <section>
                <SectionHeader label="// entradas especiales" title="Inputs Especiales" count={specialInputs.length} />
                <PriorityLegend />
                <div className="grid gap-3 sm:grid-cols-2">
                  {specialInputs.map((s) => (
                    <CommandCard key={s.cmd} cmd={s.cmd} desc={s.desc} priority={s.priority} />
                  ))}
                </div>
              </section>

              {/* Configuration */}
              <section>
                <SectionHeader label="// settings.json" title="Configuración" count={configKeys.length} />
                <PriorityLegend />
                <div className="grid gap-4 sm:grid-cols-2">
                  {configKeys.map((c) => (
                    <ConfigCard key={c.key} entry={c} />
                  ))}
                </div>
              </section>

              {/* Pro Tips */}
              <section>
                <SectionHeader label="// flujo profesional" title="Pro Tips" count={proTips.length} />
                <div className="grid gap-4 sm:grid-cols-3">
                  {proTips.map((tip, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 hover:border-orange-500/40 transition-all hover:shadow-lg hover:shadow-orange-500/5"
                    >
                      <span className="text-2xl">{tip.icon}</span>
                      <h3 className="mt-3 text-sm font-semibold text-zinc-100">{tip.title}</h3>
                      <p className="mt-1 text-xs text-zinc-500 leading-relaxed">{tip.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-600">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-orange-500/70">Claude Code Curso</span> ·
            Hecho con Next.js y Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}

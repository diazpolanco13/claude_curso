import { HooksInteractivos } from "./components/HooksInteractivos";
import { ComandosInteractivos } from "./components/ComandosInteractivos";

// ─── Árbol de archivos ────────────────────────────────────────────────────────

type TreeLine = {
  prefix: string;
  name: string;
  comment: string;
  nameColor: string;
};

const arbol: TreeLine[] = [
  {
    prefix: "",
    name: ".claude/",
    comment: "",
    nameColor: "text-white font-semibold",
  },
  {
    prefix: "├── ",
    name: "settings.json",
    comment: "permisos · deny rules · modelo · hooks",
    nameColor: "text-orange-400",
  },
  {
    prefix: "├── ",
    name: "settings.local.json",
    comment: "overrides locales — gitignored",
    nameColor: "text-zinc-500",
  },
  {
    prefix: "├── ",
    name: "hooks/",
    comment: "automatización sin prompts extra",
    nameColor: "text-violet-400",
  },
  {
    prefix: "│   ├── ",
    name: "post-edit/",
    comment: "",
    nameColor: "text-zinc-400",
  },
  {
    prefix: "│   │   ├── ",
    name: "format.sh",
    comment: "prettier al escribir",
    nameColor: "text-violet-300",
  },
  {
    prefix: "│   │   ├── ",
    name: "typecheck.sh",
    comment: "tsc — errores van a Claude",
    nameColor: "text-violet-300",
  },
  {
    prefix: "│   │   └── ",
    name: "lint.sh",
    comment: "eslint cierra el trifecta",
    nameColor: "text-violet-300",
  },
  {
    prefix: "│   └── ",
    name: "pre-tool/",
    comment: "",
    nameColor: "text-zinc-400",
  },
  {
    prefix: "│       └── ",
    name: "safety-check.sh",
    comment: "bloquea comandos peligrosos",
    nameColor: "text-rose-400",
  },
  {
    prefix: "├── ",
    name: "commands/",
    comment: "slash commands personalizados",
    nameColor: "text-sky-400",
  },
  {
    prefix: "│   ├── ",
    name: "plan.md",
    comment: "/plan",
    nameColor: "text-sky-300",
  },
  {
    prefix: "│   ├── ",
    name: "new-feature.md",
    comment: "/new-feature",
    nameColor: "text-sky-300",
  },
  {
    prefix: "│   ├── ",
    name: "debug.md",
    comment: "/debug",
    nameColor: "text-sky-300",
  },
  {
    prefix: "│   └── ",
    name: "commit-push.md",
    comment: "/commit-push",
    nameColor: "text-sky-300",
  },
  {
    prefix: "├── ",
    name: "agents/",
    comment: "sub-agentes especializados",
    nameColor: "text-emerald-400",
  },
  {
    prefix: "│   ├── ",
    name: "documentation-specialist/",
    comment: "",
    nameColor: "text-emerald-300",
  },
  {
    prefix: "│   └── ",
    name: "react-component-polisher/",
    comment: "",
    nameColor: "text-emerald-300",
  },
  {
    prefix: "├── ",
    name: "skills/",
    comment: "skills de dominio",
    nameColor: "text-emerald-400",
  },
  {
    prefix: "│   ├── ",
    name: "nextjs-architect/",
    comment: "",
    nameColor: "text-emerald-300",
  },
  {
    prefix: "│   └── ",
    name: "react-19-tailwind-4-expert/",
    comment: "",
    nameColor: "text-emerald-300",
  },
  {
    prefix: "├── ",
    name: "memory/",
    comment: "conocimiento persistente entre sesiones",
    nameColor: "text-yellow-400",
  },
  {
    prefix: "│   ├── ",
    name: "decisions.md",
    comment: "decisiones ya tomadas",
    nameColor: "text-yellow-300",
  },
  {
    prefix: "│   └── ",
    name: "rejected-patterns.md",
    comment: "patrones descartados y por qué",
    nameColor: "text-yellow-300",
  },
  {
    prefix: "└── ",
    name: "specs/",
    comment: "especificaciones del proyecto",
    nameColor: "text-zinc-400",
  },
  {
    prefix: "    ├── ",
    name: "SPEC.md",
    comment: "definición del proyecto",
    nameColor: "text-zinc-300",
  },
  {
    prefix: "    └── ",
    name: "features/",
    comment: "briefs de /new-feature",
    nameColor: "text-zinc-500",
  },
];

// ─── Secciones ────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <header className="relative overflow-hidden border-b border-zinc-800/50">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,115,22,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[500px] -translate-x-1/2 rounded-full bg-orange-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 py-28 text-center">
        <p className="text-xs uppercase tracking-widest text-orange-500">
          {"// .claude/ — guía profesional"}
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
          La carpeta que convierte
          <br />a Claude en un senior
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-zinc-400">
          Una carpeta <code className="text-orange-400">.claude/</code> bien
          diseñada no es opcional — es la diferencia entre un asistente que
          adivina y un colaborador que planea, detecta errores y nunca repite
          los mismos mistakes.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4">
          {[
            { n: "3", label: "hooks activos" },
            { n: "5", label: "slash commands" },
            { n: "6", label: "deny rules" },
            { n: "3+7", label: "agents + skills" },
            { n: "2", label: "archivos de memoria" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold text-orange-400">{s.n}</p>
              <p className="text-xs text-zinc-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-3">
          <a
            href="/comandos"
            className="rounded border border-zinc-700 bg-zinc-900 px-6 py-2.5 text-sm text-zinc-300 transition-colors hover:border-orange-500/50 hover:text-white"
          >
            # referencia CLI completa
          </a>
        </div>
      </div>
    </header>
  );
}

function AnatomiaSection() {
  return (
    <section
      id="anatomia"
      aria-labelledby="anatomia-heading"
      className="border-t border-zinc-800/50"
    >
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-widest text-orange-500">
            {"// estructura"}
          </p>
          <h2
            id="anatomia-heading"
            className="mt-2 text-3xl font-bold text-white"
          >
            Anatomía de la carpeta ideal
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">
            Cada carpeta tiene un propósito específico. Ninguna es decorativa —
            cada una resuelve un problema real del flujo de vibe coding.
          </p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900">
          <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
            <span
              className="h-3 w-3 rounded-full bg-red-500/70"
              aria-hidden="true"
            />
            <span
              className="h-3 w-3 rounded-full bg-yellow-500/70"
              aria-hidden="true"
            />
            <span
              className="h-3 w-3 rounded-full bg-green-500/70"
              aria-hidden="true"
            />
            <code className="ml-2 text-xs text-zinc-500">tu-proyecto/</code>
          </div>
          <div className="overflow-x-auto p-6">
            <table
              className="w-full text-xs"
              aria-label="Estructura de la carpeta .claude"
            >
              <tbody>
                {arbol.map((line, i) => (
                  <tr key={i} className="group">
                    <td className="py-0.5 pr-2 text-zinc-700 whitespace-pre">
                      {line.prefix}
                    </td>
                    <td
                      className={`py-0.5 pr-6 whitespace-nowrap font-mono ${line.nameColor}`}
                    >
                      {line.name}
                    </td>
                    <td className="py-0.5 text-zinc-600 group-hover:text-zinc-400 transition-colors">
                      {line.comment && <span># {line.comment}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              color: "bg-orange-400",
              label: "settings.json",
              desc: "config central del proyecto",
            },
            {
              color: "bg-violet-400",
              label: "hooks/",
              desc: "automatización con shell",
            },
            {
              color: "bg-sky-400",
              label: "commands/",
              desc: "slash commands propios",
            },
            {
              color: "bg-yellow-400",
              label: "memory/",
              desc: "contexto entre sesiones",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-2 rounded border border-zinc-800 bg-zinc-900/60 p-3"
            >
              <span
                className={`mt-1 h-2 w-2 shrink-0 rounded-full ${item.color}`}
                aria-hidden="true"
              />
              <div>
                <code className="text-xs text-zinc-300">{item.label}</code>
                <p className="mt-0.5 text-xs text-zinc-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SettingsSection() {
  const json = `{
  "model": "sonnet",

  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git *)",
      "Bash(find *)"
    ],
    "deny": [
      "Bash(rm -rf /*)",
      "Bash(git push --force origin main)",
      "Bash(git reset --hard *)",
      "Bash(chmod -R 777 *)"
    ]
  },

  "hooks": {
    "PreToolUse": [{ "matcher": "Bash", ... }],
    "PostToolUse": [{ "matcher": "Write|Edit", ... }],
    "Stop": [{ ... }]
  }
}`;

  const claves = [
    {
      key: "model",
      color: "text-orange-400",
      desc: "Modelo por defecto para el proyecto. Se puede sobreescribir por sesión con /model.",
    },
    {
      key: "permissions.allow",
      color: "text-emerald-400",
      desc: "Comandos que Claude puede ejecutar sin pedir confirmación. Acota el scope de autonomía.",
    },
    {
      key: "permissions.deny",
      color: "text-rose-400",
      desc: "Bloqueados nativamente antes de cualquier hook. La primera línea de defensa contra operaciones destructivas.",
    },
    {
      key: "hooks",
      color: "text-violet-400",
      desc: "PreToolUse puede bloquear. PostToolUse da feedback. Stop avisa cuando Claude termina.",
    },
  ];

  return (
    <section
      id="settings"
      aria-labelledby="settings-heading"
      className="border-t border-zinc-800/50"
    >
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-widest text-orange-500">
            {"// settings.json"}
          </p>
          <h2
            id="settings-heading"
            className="mt-2 text-3xl font-bold text-white"
          >
            El archivo que lo controla todo
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">
            Define qué puede hacer Claude, qué está prohibido y qué se ejecuta
            automáticamente. Es el cerebro de la configuración.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <div className="rounded-lg border border-zinc-700 bg-zinc-950">
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
              <code className="text-xs text-zinc-500">
                .claude/settings.json
              </code>
              <span className="rounded border border-zinc-800 px-2 py-0.5 text-xs text-zinc-600">
                trackeado en git
              </span>
            </div>
            <pre className="overflow-x-auto p-5">
              <code className="text-xs leading-loose text-zinc-300">
                {json}
              </code>
            </pre>
          </div>

          <ul
            className="flex flex-col gap-3"
            aria-label="Claves del settings.json"
          >
            {claves.map((c) => (
              <li
                key={c.key}
                className="rounded border border-zinc-800 bg-zinc-900/60 p-4"
              >
                <code className={`text-xs font-semibold ${c.color}`}>
                  {c.key}
                </code>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                  {c.desc}
                </p>
              </li>
            ))}
            <li className="rounded border border-zinc-800 bg-zinc-900/60 p-4">
              <code className="text-xs font-semibold text-zinc-400">
                settings.local.json
              </code>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                Overrides locales — rutas absolutas y preferencias personales.
                Está en <code className="text-zinc-400">.gitignore</code>, nunca
                se sube al repo.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function HooksSection() {
  return (
    <section
      id="hooks"
      aria-labelledby="hooks-heading"
      className="border-t border-zinc-800/50"
    >
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-widest text-orange-500">
            {"// hooks/"}
          </p>
          <h2 id="hooks-heading" className="mt-2 text-3xl font-bold text-white">
            Automatización sin interrupciones
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">
            Los hooks ejecutan shell scripts automáticamente antes o después de
            que Claude use herramientas. El feedback correcto en el momento
            correcto — sin prompts extra.
          </p>
        </div>

        <div className="mb-10 grid gap-3 sm:grid-cols-3">
          {[
            {
              campo: "tipo",
              desc: "cuándo se dispara",
              ejemplos: "PostToolUse · PreToolUse · Stop",
              color: "text-orange-400",
            },
            {
              campo: "matcher",
              desc: "qué herramienta lo activa",
              ejemplos: "Write · Edit · Bash",
              color: "text-violet-400",
            },
            {
              campo: "command",
              desc: "qué ejecuta en shell",
              ejemplos: "prettier · tsc · eslint",
              color: "text-sky-400",
            },
          ].map((f) => (
            <div
              key={f.campo}
              className="rounded border border-zinc-800 bg-zinc-900/60 p-4"
            >
              <code className={`text-sm ${f.color}`}>{f.campo}</code>
              <p className="mt-1 text-xs text-zinc-500">{f.desc}</p>
              <p className="mt-2 text-xs text-zinc-700">{f.ejemplos}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 rounded border border-zinc-800/60 bg-zinc-900/30 px-4 py-3 text-xs text-zinc-500">
          <span className="text-zinc-400">Regla de oro: </span>
          stdout → Claude lo lee → consume tokens.{" "}
          <code className="text-zinc-400">{">&2"}</code> → solo tu terminal → 0
          tokens. Usa stdout solo para errores que quieres que Claude corrija.
        </div>

        <HooksInteractivos />
      </div>
    </section>
  );
}

function CommandsSection() {
  return (
    <section
      id="commands"
      aria-labelledby="commands-heading"
      className="border-t border-zinc-800/50"
    >
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-widest text-orange-500">
            {"// commands/"}
          </p>
          <h2
            id="commands-heading"
            className="mt-2 text-3xl font-bold text-white"
          >
            Slash commands personalizados
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">
            Archivos Markdown en{" "}
            <code className="text-orange-400">.claude/commands/</code> que se
            convierten en comandos invocables con{" "}
            <code className="text-orange-400">/nombre</code>. Cada uno define
            herramientas permitidas, flujo y reglas estrictas de comportamiento.
          </p>
        </div>

        <ComandosInteractivos />
      </div>
    </section>
  );
}

function AgentsSkillsSection() {
  return (
    <section
      id="agentes"
      aria-labelledby="agentes-heading"
      className="border-t border-zinc-800/50"
    >
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-widest text-orange-500">
            {"// agents/ + skills/"}
          </p>
          <h2
            id="agentes-heading"
            className="mt-2 text-3xl font-bold text-white"
          >
            Especialistas invocables
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">
            Los <span className="text-zinc-300">agents</span> son sub-agentes
            con su propio contexto y herramientas. Las{" "}
            <span className="text-zinc-300">skills</span> son instrucciones de
            dominio que extienden a Claude con expertise específico.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="text-emerald-500" aria-hidden="true">
                →
              </span>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                agents/
              </h3>
              <div className="flex-1 border-t border-zinc-800" />
            </div>
            <p className="mb-4 text-xs leading-relaxed text-zinc-600">
              Se invocan con{" "}
              <code className="text-zinc-400">
                Agent(subagent_type: "nombre")
              </code>
              . Corren en su propio contexto — no consumen tokens de la sesión
              principal.
            </p>
            <ul className="space-y-3">
              {agentes.map((a) => (
                <li
                  key={a.nombre}
                  className="rounded border border-zinc-800 bg-zinc-900/60 p-4 transition-colors hover:border-zinc-700"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <code className="text-sm text-emerald-400">{a.nombre}</code>
                    <span className="shrink-0 rounded border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs text-zinc-500">
                      {a.tools}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-500">
                    {a.descripcion}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="text-emerald-500" aria-hidden="true">
                →
              </span>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                skills/
              </h3>
              <div className="flex-1 border-t border-zinc-800" />
            </div>
            <p className="mb-4 text-xs leading-relaxed text-zinc-600">
              Se invocan con <code className="text-zinc-400">/nombre</code> o
              cuando Claude detecta que aplica. Inyectan expertise de dominio en
              la sesión actual.
            </p>
            <ul className="space-y-3">
              {skills.map((s) => (
                <li
                  key={s.nombre}
                  className="rounded border border-zinc-800 bg-zinc-900/60 p-4 transition-colors hover:border-orange-500/20"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <code className="text-sm text-zinc-200">{s.nombre}</code>
                    <span className="shrink-0 rounded border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs text-zinc-500">
                      {s.categoria}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-500">
                    {s.descripcion}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function MemorySection() {
  return (
    <section
      id="memory"
      aria-labelledby="memory-heading"
      className="border-t border-zinc-800/50"
    >
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-widest text-orange-500">
            {"// memory/"}
          </p>
          <h2
            id="memory-heading"
            className="mt-2 text-3xl font-bold text-white"
          >
            Claude no repite los mismos errores
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">
            Sin memoria, cada sesión empieza de cero. Claude vuelve a sugerir
            enfoques que ya rechazaste, reabre debates cerrados y olvida las
            decisiones de arquitectura. Dos archivos lo resuelven.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-zinc-700 bg-zinc-950">
            <div className="border-b border-zinc-800 px-4 py-2.5">
              <code className="text-xs text-yellow-400">
                .claude/memory/decisions.md
              </code>
            </div>
            <pre className="overflow-x-auto p-5 text-xs leading-loose text-zinc-400">{`# Decisiones del proyecto

## Arquitectura
**Server Components por defecto**
React 19 + Next.js App Router.
"use client" solo con estado o
eventos del browser.

**Data hardcodeada en componentes**
No extraer a archivos separados hasta
tener una fuente dinámica real.

## Hooks
**stderr para feedback del usuario**
stdout solo para errores que Claude
debe leer y corregir.`}</pre>
          </div>

          <div className="rounded-lg border border-zinc-700 bg-zinc-950">
            <div className="border-b border-zinc-800 px-4 py-2.5">
              <code className="text-xs text-yellow-400">
                .claude/memory/rejected-patterns.md
              </code>
            </div>
            <pre className="overflow-x-auto p-5 text-xs leading-loose text-zinc-400">{`# Patrones rechazados

**session-start como evento**
No existe en Claude Code. Los eventos
válidos son: PreToolUse, PostToolUse,
Stop, Notification.

**Llamar a claude desde un hook**
Causa loop infinito. Descartado.

**Hooks completamente silenciosos**
El usuario quiere feedback en terminal.
Usar >&2, no suprimir todo.

**grep -P en scripts**
No disponible en macOS (BSD grep).
Usar siempre grep -E con POSIX.`}</pre>
          </div>
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-zinc-600">
          Referenciados en <code className="text-zinc-500">CLAUDE.md</code> —
          Claude los lee automáticamente al iniciar cada sesión.
        </p>
      </div>
    </section>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 font-mono text-zinc-100">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,115,22,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <nav className="flex items-center justify-between border-b border-zinc-800 px-8 py-4">
          <code className="text-sm font-bold text-orange-500">
            &gt;_ .claude/
          </code>
          <div className="flex items-center gap-3">
            <a
              href="/comandos"
              className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
            >
              referencia CLI
            </a>
            <span className="rounded border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
              guía v1.0
            </span>
          </div>
        </nav>

        <HeroSection />
        <AnatomiaSection />
        <SettingsSection />
        <HooksSection />
        <CommandsSection />
        <AgentsSkillsSection />
        <MemorySection />

        <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-600">
          <p>
            Construido con{" "}
            <span className="text-orange-500/70">Claude Code</span> · Next.js ·
            Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const agentes = [
  {
    nombre: "documentation-specialist",
    tools: "Read · Write · Bash",
    descripcion:
      "Mantiene docs/ai-context/ actualizado. Se invoca con /update-ai-context tras cambios estructurales. Nunca inventa — marca como 'por verificar' si no está seguro.",
  },
  {
    nombre: "fullstack-feature-builder",
    tools: "All tools",
    descripcion:
      "Crea features completas de principio a fin: DB → backend → frontend. Sigue el orden análisis → schema → API → UI sin saltarse pasos.",
  },
  {
    nombre: "react-component-polisher",
    tools: "All tools",
    descripcion:
      "Convierte componentes mediocres en código senior. Aplica TypeScript estricto, accesibilidad completa y patrones React 19 modernos.",
  },
];

const skills = [
  {
    nombre: "nextjs-architect",
    categoria: "frontend",
    descripcion:
      "Server Components por defecto, Server Actions para mutaciones, caching strategy correcta. Estricto con las mejores prácticas de App Router.",
  },
  {
    nombre: "react-19-tailwind-4-expert",
    categoria: "frontend",
    descripcion:
      "Código moderno sin AI slop. Prohíbe useEffect para fetching, gradientes morados por defecto y componentes de más de 250 líneas.",
  },
  {
    nombre: "supabase-expert",
    categoria: "backend",
    descripcion:
      "RLS siempre activo, service_role key nunca expuesta, Server Actions para mutaciones. Domina Auth, Edge Functions y Realtime.",
  },
  {
    nombre: "sync-architecture-docs",
    categoria: "docs",
    descripcion:
      "Actualiza architecture.md, business-rules.md y design-system.md tras cambios de arquitectura o diseño.",
  },
  {
    nombre: "update-design-system",
    categoria: "docs",
    descripcion:
      "Mantiene design-system.md coherente. Detecta nuevos colores, componentes o patrones y los documenta inmediatamente.",
  },
];

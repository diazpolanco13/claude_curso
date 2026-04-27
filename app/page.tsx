import { ModulosInteractivos } from "./components/ModulosInteractivos";
import { HooksInteractivos } from "./components/HooksInteractivos";

type SpecSeccion = {
  numero: string;
  nombre: string;
};

type WorkflowStep = {
  cmd: string;
  titulo: string;
  descripcion: string;
};

type Agente = {
  tipo: string;
  descripcion: string;
  tag: string;
};

type Skill = {
  comando: string;
  descripcion: string;
  categoria: string;
};

function AgentCard({ agente }: { agente: Agente }) {
  return (
    <div className="rounded border border-zinc-800 bg-zinc-900/60 p-4 transition-colors hover:border-zinc-700">
      <div className="mb-2 flex items-center justify-between gap-2">
        <code className="text-sm text-orange-400">{agente.tipo}</code>
        <span className="rounded border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
          {agente.tag}
        </span>
      </div>
      <p className="text-xs leading-relaxed text-zinc-500">{agente.descripcion}</p>
    </div>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="rounded border border-zinc-800 bg-zinc-900/60 p-4 transition-colors hover:border-orange-500/30">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs text-orange-500/70" aria-hidden="true">/</span>
        <code className="text-sm text-zinc-200">{skill.comando}</code>
        <span className="ml-auto rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-500">
          {skill.categoria}
        </span>
      </div>
      <p className="text-xs leading-relaxed text-zinc-500">{skill.descripcion}</p>
    </div>
  );
}

function AgentesYSkillsSection() {
  return (
    <section
      id="agentes"
      aria-labelledby="agentes-heading"
      className="border-t border-zinc-800/50"
    >
      <div className="mx-auto max-w-4xl px-6 py-24">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-widest text-orange-500">
            {"// agentes & skills"}
          </p>
          <h2
            id="agentes-heading"
            className="mt-2 text-3xl font-bold text-white"
          >
            Automatiza con inteligencia
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">
            Claude Code puede lanzar{" "}
            <span className="text-zinc-300">agentes especializados</span> para
            tareas complejas y ejecutar{" "}
            <span className="text-zinc-300">skills personalizadas</span> con un
            simple comando.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-orange-500" aria-hidden="true">→</span>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Agentes
              </h3>
              <div className="flex-1 border-t border-zinc-800" />
            </div>
            <p className="mb-5 text-xs leading-relaxed text-zinc-500">
              Subagentes especializados que Claude lanza para tareas paralelas.
              Cada tipo tiene herramientas y capacidades distintas.
            </p>
            <ul className="space-y-3" aria-label="Tipos de agentes disponibles">
              {agentes.map((a) => (
                <li key={a.tipo}>
                  <AgentCard agente={a} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-orange-500" aria-hidden="true">→</span>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Skills
              </h3>
              <div className="flex-1 border-t border-zinc-800" />
            </div>
            <p className="mb-5 text-xs leading-relaxed text-zinc-500">
              Instrucciones especializadas que invocas con{" "}
              <code className="text-orange-400">/nombre</code>. Extienden a
              Claude con contexto experto y comportamientos personalizados.
            </p>
            <ul className="space-y-3" aria-label="Skills disponibles">
              {skills.map((s) => (
                <li key={s.comando}>
                  <SkillCard skill={s} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Terminal demo */}
        <div className="mt-12 rounded-lg border border-zinc-800 bg-zinc-900 shadow-xl shadow-black/30">
          <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-500" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-green-500" aria-hidden="true" />
            <span className="ml-2 text-xs text-zinc-500">skill en acción</span>
          </div>
          <div
            aria-label="Ejemplo de ejecución de una skill"
            className="space-y-1.5 p-4 text-sm"
          >
            <p>
              <span className="text-orange-500">~</span>{" "}
              <span className="text-zinc-300">/review</span>
            </p>
            <p className="text-zinc-500">→ Cargando skill: review...</p>
            <p className="text-zinc-500">→ Lanzando agente de revisión de PR...</p>
            <p className="text-zinc-500">→ Analizando cambios en 4 archivos...</p>
            <p>
              <span className="text-green-400">✔ 2 sugerencias de mejora encontradas</span>
            </p>
            <p className="flex items-center gap-1">
              <span className="text-orange-500">~</span>
              <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-orange-500" />
            </p>
          </div>
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
            {"// hooks"}
          </p>
          <h2
            id="hooks-heading"
            className="mt-2 text-3xl font-bold text-white"
          >
            Automatiza tu flujo con Hooks
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">
            Los hooks ejecutan comandos shell automáticamente en respuesta a
            acciones de Claude — antes o después de usar herramientas, o al
            terminar la sesión. Sin prompts extra, sin interrupciones.
          </p>
        </div>

        {/* Anatomía de un hook */}
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
              ejemplos: "Write · Edit · Bash · .*",
              color: "text-violet-400",
            },
            {
              campo: "command",
              desc: "qué ejecuta en shell",
              ejemplos: "npm run lint · git add · tsc",
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

        <HooksInteractivos />
      </div>
    </section>
  );
}

function SpecMdSection() {
  return (
    <section
      id="spec"
      aria-labelledby="spec-heading"
      className="border-t border-zinc-800/50"
    >
      <div className="mx-auto max-w-5xl px-6 py-24">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="text-xs uppercase tracking-widest text-orange-500">
            {"// spec.md"}
          </p>
          <h2
            id="spec-heading"
            className="mt-2 text-3xl font-bold text-white"
          >
            Escribe el spec. Luego construye.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">
            Sin contexto, Claude improvisa decisiones de arquitectura. Con un{" "}
            <code className="text-orange-400">SPEC.md</code>, ejecuta con
            precisión desde el primer token — cero preguntas, cero retrabajo.
          </p>
        </div>

        {/* Before / After */}
        <div className="mb-14 grid gap-4 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-xs text-zinc-600 uppercase tracking-widest">
              sin spec
            </p>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 shadow-xl shadow-black/30">
              <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-500" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-green-500" aria-hidden="true" />
                <span className="ml-2 text-xs text-zinc-500">terminal</span>
              </div>
              <div
                aria-label="Ejemplo sin SPEC.md: Claude hace preguntas y aborta"
                className="space-y-1 p-4 text-xs leading-relaxed"
              >
                <p>
                  <span className="text-orange-500">~</span>{" "}
                  <span className="text-zinc-300">claude</span>{" "}
                  <span className="text-zinc-500">&quot;implementa el sistema de pagos&quot;</span>
                </p>
                <p className="text-zinc-500">→ ¿Usamos Stripe o PayPal?</p>
                <p className="text-zinc-500">→ ¿El carrito persiste en sesión o en DB?</p>
                <p className="text-zinc-500">→ ¿Necesitamos webhooks o polling?</p>
                <p className="text-zinc-500">→ ¿Enviamos emails de confirmación?</p>
                <p className="text-zinc-500">→ ¿Multi-divisa o solo USD?</p>
                <p className="text-red-400/70 pt-1">
                  ✖ Demasiada ambigüedad — abortando.
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs text-orange-500/70 uppercase tracking-widest">
              con SPEC.md
            </p>
            <div className="rounded-lg border border-orange-500/20 bg-zinc-900 shadow-xl shadow-black/30">
              <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-500" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-green-500" aria-hidden="true" />
                <span className="ml-2 text-xs text-zinc-500">terminal</span>
              </div>
              <div
                aria-label="Ejemplo con SPEC.md: Claude ejecuta sin preguntas"
                className="space-y-1 p-4 text-xs leading-relaxed"
              >
                <p>
                  <span className="text-orange-500">~</span>{" "}
                  <span className="text-zinc-300">claude</span>
                </p>
                <p className="text-zinc-500">→ Leyendo SPEC.md...</p>
                <p className="text-zinc-500">→ Stripe Checkout — definido en spec</p>
                <p className="text-zinc-500">→ Carrito en DB — definido en spec</p>
                <p className="text-zinc-500">→ Creando webhook handler...</p>
                <p className="text-zinc-500">→ Configurando emails con Resend...</p>
                <p className="text-green-400 pt-1">
                  ✔ 4 archivos. 0 preguntas. Listo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Workflow */}
        <div className="mb-14">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-orange-500" aria-hidden="true">→</span>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              El flujo
            </h3>
            <div className="flex-1 border-t border-zinc-800" />
          </div>
          <ol
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
            aria-label="Flujo de trabajo con SPEC.md"
          >
            {workflowSteps.map((step, i) => (
              <li
                key={step.cmd}
                className="relative rounded border border-zinc-800 bg-zinc-900/60 p-4"
              >
                <span className="absolute right-3 top-3 tabular-nums text-xs text-zinc-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <code className="mb-2 block text-sm text-orange-400">
                  {step.cmd}
                </code>
                <p className="text-xs font-semibold text-zinc-300">
                  {step.titulo}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  {step.descripcion}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Estructura como referencia compacta */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="text-orange-500" aria-hidden="true">→</span>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Estructura típica
            </h3>
            <div className="flex-1 border-t border-zinc-800" />
          </div>
          <ul
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5"
            aria-label="Secciones de un SPEC.md"
          >
            {specSecciones.map((s) => (
              <li
                key={s.numero}
                className="rounded border border-zinc-800 bg-zinc-900/60 px-3 py-2.5"
              >
                <span className="text-xs text-orange-500/50">{s.numero}</span>
                <p className="mt-0.5 text-xs text-zinc-400">{s.nombre}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 font-mono text-zinc-100">
      {/* Grid background — CSS class defined in globals.css (no inline styles) */}
      <div className="grid-bg pointer-events-none fixed inset-0 z-0" />
      <div className="pointer-events-none fixed left-1/2 top-0 z-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl" />

      <div className="relative z-10">
        <nav className="flex items-center justify-between border-b border-zinc-800 px-8 py-4">
          <span className="text-sm font-bold tracking-widest text-orange-500 uppercase">
            &gt;_ Claude Code
          </span>
          <span className="rounded border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
            v1.0.0
          </span>
        </nav>

        <header className="flex flex-col items-center justify-center px-6 py-28 text-center">
          <div className="mb-4 flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs text-orange-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400" />
            Curso en Español · Disponible ahora
          </div>

          <h1 className="mt-4 text-6xl font-bold tracking-tight text-white sm:text-7xl">
            <span className="text-orange-500">&gt;</span> Claude{" "}
            <span className="text-orange-500">Code</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400">
            Aprende a usar{" "}
            <span className="text-orange-400">Claude Code</span> para
            desarrollar software de forma inteligente, rápida y eficiente
            directamente desde tu terminal.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="#modulos"
              className="rounded border border-orange-500 bg-orange-500 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20"
            >
              $ ver módulos
            </a>
            <a
              href="/comandos"
              className="rounded border border-zinc-700 bg-zinc-900 px-8 py-3 text-sm font-semibold text-zinc-300 transition-all hover:border-orange-500/50 hover:text-white"
            >
              # comandos &amp; shortcuts
            </a>
          </div>

          <div className="mt-14 w-full max-w-lg rounded-lg border border-zinc-800 bg-zinc-900 text-left shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-yellow-500" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-green-500" aria-hidden="true" />
              <span className="ml-2 text-xs text-zinc-500">terminal</span>
            </div>
            <div className="space-y-1 p-4 text-sm">
              <p>
                <span className="text-orange-500">~</span>{" "}
                <span className="text-zinc-300">claude</span>{" "}
                <span className="text-zinc-500">{'"construye mi app"'}</span>
              </p>
              <p className="text-zinc-500">✔ Analizando estructura del proyecto...</p>
              <p className="text-zinc-500">✔ Generando componentes...</p>
              <p className="text-zinc-500">✔ Escribiendo tests...</p>
              <p>
                <span className="text-green-400">✔ Listo en 3.2s</span>
              </p>
              <p className="flex items-center gap-1">
                <span className="text-orange-500">~</span>
                <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-orange-500" />
              </p>
            </div>
          </div>
        </header>

        <section className="border-y border-zinc-800 bg-zinc-900/50 py-10">
          <div className="mx-auto grid max-w-3xl grid-cols-3 gap-8 px-6 text-center">
            {[
              { value: "10", label: "Módulos" },
              { value: "100%", label: "Español" },
              { value: "CLI", label: "Terminal-first" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-orange-500">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-zinc-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="modulos"
          aria-labelledby="modulos-heading"
          className="mx-auto max-w-5xl px-6 py-24"
        >
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-widest text-orange-500">
              {"// módulos del curso"}
            </p>
            <h2
              id="modulos-heading"
              className="mt-2 text-3xl font-bold text-white"
            >
              ¿Qué vas a aprender?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-zinc-500">
              10 módulos diseñados para llevarte de cero a profesional.
              Haz clic en cualquier módulo para explorar su contenido.
            </p>
          </div>

          <ModulosInteractivos />
        </section>

        <AgentesYSkillsSection />

        <HooksSection />

        <SpecMdSection />

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

const workflowSteps: WorkflowStep[] = [
  {
    cmd: "$ vim SPEC.md",
    titulo: "Escribe el spec",
    descripcion:
      "Define requisitos, flujo de usuario y contexto técnico antes de abrir Claude.",
  },
  {
    cmd: "/review",
    titulo: "Claude lo revisa",
    descripcion:
      "Detecta ambigüedades y huecos. Tú los resuelves — sin haber escrito código aún.",
  },
  {
    cmd: "✔ aprobado",
    titulo: "Confirman juntos",
    descripcion:
      "Acuerdan el alcance. Claude ya no necesita inventar ni preguntar nada.",
  },
  {
    cmd: "$ claude",
    titulo: "Claude construye",
    descripcion:
      "Ejecuta el spec de principio a fin. Sin improvisación. Sin retrabajo.",
  },
];

const specSecciones: SpecSeccion[] = [
  { numero: "01", nombre: "Nombre de la feature" },
  { numero: "02", nombre: "Objetivo / Problema" },
  { numero: "03", nombre: "Requisitos funcionales" },
  { numero: "04", nombre: "Requisitos no funcionales" },
  { numero: "05", nombre: "Flujo de usuario" },
  { numero: "06", nombre: "Estructura de datos" },
  { numero: "07", nombre: "Endpoints / Backend" },
  { numero: "08", nombre: "Consideraciones UI/UX" },
  { numero: "09", nombre: "Criterios de aceptación" },
  { numero: "10", nombre: "Notas técnicas" },
];

const agentes: Agente[] = [
  {
    tipo: "Explore",
    descripcion:
      "Exploración rápida de codebases: busca archivos, keywords y patrones en el código fuente.",
    tag: "explore",
  },
  {
    tipo: "Plan",
    descripcion:
      "Diseña planes de implementación, identifica archivos clave y evalúa trade-offs arquitectónicos.",
    tag: "plan",
  },
  {
    tipo: "general-purpose",
    descripcion:
      "Tareas complejas multi-paso: research, análisis y ejecución de flujos automáticos.",
    tag: "general",
  },
  {
    tipo: "claude-code-guide",
    descripcion:
      "Responde preguntas sobre el CLI de Claude Code, SDK, MCP servers y configuración.",
    tag: "guide",
  },
];

const skills: Skill[] = [
  {
    comando: "review",
    descripcion:
      "Revisa pull requests con análisis detallado de calidad, bugs y mejoras sugeridas.",
    categoria: "code",
  },
  {
    comando: "simplify",
    descripcion:
      "Refactoriza el código cambiado para mejorar reutilización, calidad y eficiencia.",
    categoria: "code",
  },
  {
    comando: "security-review",
    descripcion:
      "Auditoría completa de seguridad sobre los cambios pendientes de la rama actual.",
    categoria: "security",
  },
  {
    comando: "init",
    descripcion:
      "Inicializa un CLAUDE.md con documentación completa del proyecto para futuros agentes.",
    categoria: "setup",
  },
  {
    comando: "react-19-tailwind-4-expert",
    descripcion:
      "Experto senior en React 19 + Tailwind CSS 4. Código moderno, accesible y sin AI slop.",
    categoria: "frontend",
  },
];

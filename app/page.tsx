export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 font-mono text-zinc-100">
      {/* Grid background */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,115,22,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow top */}
      <div className="pointer-events-none fixed left-1/2 top-0 z-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl" />

      <div className="relative z-10">
        {/* Nav */}
        <nav className="flex items-center justify-between border-b border-zinc-800 px-8 py-4">
          <span className="text-sm font-bold tracking-widest text-orange-500 uppercase">
            &gt;_ Claude Code
          </span>
          <span className="rounded border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
            v1.0.0
          </span>
        </nav>

        {/* Hero */}
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

          {/* Terminal mockup */}
          <div className="mt-14 w-full max-w-lg rounded-lg border border-zinc-800 bg-zinc-900 text-left shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-zinc-500">terminal</span>
            </div>
            <div className="space-y-1 p-4 text-sm">
              <p>
                <span className="text-orange-500">~</span>{" "}
                <span className="text-zinc-300">claude</span>{" "}
                <span className="text-zinc-500">"construye mi app"</span>
              </p>
              <p className="text-zinc-500">
                ✔ Analizando estructura del proyecto...
              </p>
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

        {/* Stats */}
        <section className="border-y border-zinc-800 bg-zinc-900/50 py-10">
          <div className="mx-auto grid max-w-3xl grid-cols-3 gap-8 px-6 text-center">
            {[
              { value: "6", label: "Módulos" },
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

        {/* Módulos */}
        <section id="modulos" className="mx-auto max-w-4xl px-6 py-24">
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-widest text-orange-500">
              // módulos del curso
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white">
              ¿Qué vas a aprender?
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {modulos.map((modulo, i) => (
              <div
                key={i}
                className="group rounded-lg border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-orange-500/50 hover:bg-zinc-900/80 hover:shadow-lg hover:shadow-orange-500/5"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-zinc-700 bg-zinc-800 text-lg group-hover:border-orange-500/40">
                    {modulo.icono}
                  </span>
                  <div>
                    <p className="text-xs text-orange-500/70 mb-1">
                      módulo_{String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-semibold text-zinc-100">
                      {modulo.titulo}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500">
                      {modulo.descripcion}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

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

const modulos = [
  {
    icono: "⚡",
    titulo: "Introducción a Claude Code",
    descripcion:
      "Instalación, configuración inicial y primeros pasos con el CLI de Claude Code.",
  },
  {
    icono: "💬",
    titulo: "Comandos y conversaciones",
    descripcion:
      "Aprende a formular prompts efectivos, usar comandos slash y manejar el contexto.",
  },
  {
    icono: "🛠️",
    titulo: "Edición y refactorización",
    descripcion:
      "Edita archivos, refactoriza código y aplica cambios con precisión usando las herramientas integradas.",
  },
  {
    icono: "🔍",
    titulo: "Búsqueda y exploración de código",
    descripcion:
      "Navega bases de código grandes, encuentra archivos y comprende proyectos desconocidos.",
  },
  {
    icono: "🤖",
    titulo: "Agentes y automatización",
    descripcion:
      "Crea flujos de trabajo automáticos, usa subagentes y programa tareas recurrentes.",
  },
  {
    icono: "🚀",
    titulo: "Proyecto final",
    descripcion:
      "Construye una aplicación completa de principio a fin guiado por Claude Code.",
  },
];

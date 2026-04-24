export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans">
      {/* Hero */}
      <header className="flex flex-col items-center justify-center px-6 py-24 text-center">
        <span className="mb-4 rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-700 dark:bg-orange-950 dark:text-orange-300">
          Curso en Español
        </span>
        <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
          Claude Code
        </h1>
        <p className="mt-4 max-w-xl text-lg text-zinc-500 dark:text-zinc-400">
          Aprende a usar Claude Code para desarrollar software de forma
          inteligente, rápida y eficiente directamente desde tu terminal.
        </p>
        <a
          href="#modulos"
          className="mt-8 rounded-full bg-orange-500 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-orange-600"
        >
          Ver módulos
        </a>
      </header>

      {/* Módulos */}
      <section id="modulos" className="mx-auto max-w-4xl px-6 pb-24">
        <h2 className="mb-10 text-center text-3xl font-bold text-zinc-900 dark:text-white">
          Módulos del curso
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {modulos.map((modulo, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="text-2xl">{modulo.icono}</span>
              <h3 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-white">
                {modulo.titulo}
              </h3>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                {modulo.descripcion}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-8 text-center text-sm text-zinc-400 dark:border-zinc-800">
        © {new Date().getFullYear()} Claude Code Curso · Hecho con Next.js y Tailwind CSS
      </footer>
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

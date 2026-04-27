import type { Metadata } from 'next'
import { FlujoDeTrabajo } from '@/app/components/FlujoDeTrabajo'

export const metadata: Metadata = {
  title: 'Flujo de Trabajo — .claude/ guía',
  description: 'Flujo de trabajo superpowers-first y arquitectura de configuración global vs proyecto para Claude Code.',
}

export default function FlujoPage() {
  return (
    <div className="min-h-screen bg-zinc-950 font-mono text-zinc-100">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(249,115,22,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <nav className="flex items-center justify-between border-b border-zinc-800 px-8 py-4">
          <a href="/" className="text-sm font-bold text-orange-500">
            &gt;_ .claude/
          </a>
          <div className="flex items-center gap-3">
            <a
              href="/flujo"
              className="text-xs text-orange-400 transition-colors hover:text-orange-300"
            >
              flujo
            </a>
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

        <header className="border-b border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-6 py-16 text-center">
            <p className="text-xs uppercase tracking-widest text-orange-500">
              {'// workflow · arquitectura'}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">
              Flujo de Trabajo
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
              Qué usar en cada situación y dónde vive cada pieza de tu configuración.
              Referencia personal para internalizar el workflow{' '}
              <code className="text-orange-400">superpowers-first</code>.
            </p>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-6 py-16">
          <FlujoDeTrabajo />
        </main>

        <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-600">
          <p>
            Construido con{' '}
            <span className="text-orange-500/70">Claude Code</span> · Next.js ·
            Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  )
}

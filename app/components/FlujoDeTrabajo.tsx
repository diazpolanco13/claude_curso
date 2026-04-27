'use client'

import { useState } from 'react'
import { flujoData, arquitecturaData, type Prioridad } from '@/data/flujo'

const prioridadConfig: Record<Prioridad, { label: string; textColor: string; borderColor: string; dotColor: string }> = {
  essential: {
    label: 'essential',
    textColor: 'text-orange-400',
    borderColor: 'border-orange-500/30',
    dotColor: 'bg-orange-400',
  },
  important: {
    label: 'important',
    textColor: 'text-yellow-400',
    borderColor: 'border-yellow-500/30',
    dotColor: 'bg-yellow-400',
  },
  useful: {
    label: 'useful',
    textColor: 'text-zinc-400',
    borderColor: 'border-zinc-700',
    dotColor: 'bg-zinc-500',
  },
}

type Tab = 'flujo' | 'arquitectura'

export function FlujoDeTrabajo() {
  const [activeTab, setActiveTab] = useState<Tab>('flujo')

  return (
    <div>
      {/* Tabs */}
      <div className="mb-8 flex gap-1 border-b border-zinc-800">
        {(['flujo', 'arquitectura'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-xs transition-colors ${
              activeTab === tab
                ? 'border-b-2 border-orange-500 text-orange-400'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {tab === 'flujo' ? '# flujo de trabajo' : '# arquitectura'}
          </button>
        ))}
      </div>

      {/* Tab: Flujo de Trabajo */}
      {activeTab === 'flujo' && (
        <div>
          <div className="mb-4 flex items-center gap-6 text-xs text-zinc-600">
            {(['essential', 'important', 'useful'] as Prioridad[]).map((p) => (
              <span key={p} className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${prioridadConfig[p].dotColor}`} aria-hidden="true" />
                {p}
              </span>
            ))}
          </div>

          <ul className="space-y-2">
            {flujoData.map((entrada) => {
              const config = prioridadConfig[entrada.prioridad]
              return (
                <li
                  key={entrada.situacion}
                  className={`rounded border ${config.borderColor} bg-zinc-900/60 p-4`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm text-zinc-300">{entrada.situacion}</p>
                      <code className="mt-1 block text-xs text-orange-400">{entrada.usar}</code>
                    </div>
                    <span className={`shrink-0 text-xs ${config.textColor}`}>
                      {config.label}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* Tab: Arquitectura */}
      {activeTab === 'arquitectura' && (
        <div className="grid gap-6 lg:grid-cols-2">
          {arquitecturaData.map((nivel) => (
            <div key={nivel.nombre} className="rounded-lg border border-zinc-800 bg-zinc-900/40">
              <div className="border-b border-zinc-800 px-4 py-3">
                <div className="flex items-center justify-between">
                  <code className="text-sm font-semibold text-orange-400">{nivel.ruta}</code>
                  <span className="text-xs text-zinc-500">{nivel.nombre}</span>
                </div>
                <p className="mt-1 text-xs text-zinc-600">{nivel.descripcion}</p>
              </div>

              <ul className="divide-y divide-zinc-800/50">
                {nivel.items.map((item) => (
                  <li key={item.path} className="flex items-start gap-3 px-4 py-3">
                    <code className="shrink-0 text-xs text-sky-400">{item.path}</code>
                    <p className="text-xs leading-relaxed text-zinc-500">{item.descripcion}</p>
                  </li>
                ))}
              </ul>

              <div className="border-t border-zinc-800 px-4 py-3">
                <p className="text-xs text-zinc-600">
                  <span className="text-zinc-400">Regla: </span>
                  {nivel.regla}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

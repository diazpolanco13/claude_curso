export type Prioridad = 'essential' | 'important' | 'useful'

export type EntradaFlujo = {
  situacion: string
  usar: string
  prioridad: Prioridad
}

export type ItemArquitectura = {
  path: string
  descripcion: string
}

export type NivelArquitectura = {
  nombre: string
  ruta: string
  descripcion: string
  items: ItemArquitectura[]
  regla: string
}

export const flujoData: EntradaFlujo[] = [
  {
    situacion: 'Nueva feature o idea',
    usar: 'superpowers:brainstorming → superpowers:writing-plans',
    prioridad: 'essential',
  },
  {
    situacion: 'Bug o error inesperado',
    usar: 'superpowers:systematic-debugging',
    prioridad: 'essential',
  },
  {
    situacion: 'Antes de declarar algo listo',
    usar: 'superpowers:verification-before-completion',
    prioridad: 'important',
  },
  {
    situacion: 'Commit y push a GitHub',
    usar: '/commit-push',
    prioridad: 'important',
  },
  {
    situacion: 'Actualizar docs de contexto',
    usar: '/update-ai-context',
    prioridad: 'useful',
  },
]

export const arquitecturaData: NivelArquitectura[] = [
  {
    nombre: 'Global',
    ruta: '~/.claude/',
    descripcion: 'Afecta todos tus proyectos. Solo va aquí lo que es útil en cualquier proyecto.',
    items: [
      { path: 'settings.json', descripcion: 'effortLevel, plugins, idioma' },
      { path: 'skills/', descripcion: 'Stack tecnológico: nextjs-architect, react-19-tailwind-4-expert, supabase-expert' },
    ],
    regla: 'Si una skill sirve para múltiples proyectos, va aquí',
  },
  {
    nombre: 'Proyecto',
    ruta: '.claude/',
    descripcion: 'Contexto específico del proyecto. No contiene workflows genéricos.',
    items: [
      { path: 'CLAUDE.md', descripcion: 'Instrucciones y restricciones del proyecto' },
      { path: 'commands/', descripcion: 'Solo lo que superpowers no cubre (/commit-push, /update-ai-context)' },
      { path: 'memory/', descripcion: 'decisions.md y rejected-patterns.md' },
      { path: 'specs/', descripcion: 'Diseños aprobados listos para implementar' },
      { path: 'agents/', descripcion: 'Agentes especializados del dominio' },
      { path: 'hooks/', descripcion: 'Automatizaciones post-edición (format, lint, typecheck)' },
    ],
    regla: 'Si describe el contexto del proyecto, va aquí',
  },
]

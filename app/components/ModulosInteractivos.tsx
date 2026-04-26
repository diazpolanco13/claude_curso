"use client";

import { useState, useCallback, useId } from "react";

type Modulo = {
  numero: string;
  titulo: string;
  descripcion: string;
  detalles: string[];
  icono: string;
};

const modulos: Modulo[] = [
  {
    numero: "01",
    titulo: "Claude Code Setup",
    descripcion:
      "Instalación, autenticación y configuración inicial del CLI de Claude Code en tu entorno local.",
    detalles: [
      "Instalación global con npm y autenticación con Anthropic API",
      "Configuración del entorno: terminal, permisos y variables de entorno",
      "Primera sesión: comandos básicos y navegación del CLI",
      "Ajustes de modelo, temperatura y límites de tokens",
    ],
    icono: "01",
  },
  {
    numero: "02",
    titulo: "La carpeta .claude (El centro de control)",
    descripcion:
      "Domina el sistema de archivos de configuración que convierte a Claude Code en una herramienta personalizada para cada proyecto.",
    detalles: [
      "Estructura de la carpeta .claude y para qué sirve cada archivo",
      "CLAUDE.md: instrucciones de proyecto que Claude siempre lee",
      "settings.json: permisos, herramientas permitidas y comportamiento",
      "Jerarquía: configuración global vs. configuración de proyecto",
    ],
    icono: "02",
  },
  {
    numero: "03",
    titulo: "Skills vs Agents (La diferencia que nadie explica)",
    descripcion:
      "Entiende la distinción fundamental entre Skills y Agents — el conocimiento que separa a los usuarios avanzados del resto.",
    detalles: [
      "Qué es una Skill: instrucciones especializadas invocadas con /comando",
      "Qué es un Agent: subproceso autónomo con herramientas propias",
      "Cuándo usar cada uno y cómo se complementan",
      "Ejemplos reales: /review como Skill vs. agente de exploración",
    ],
    icono: "03",
  },
  {
    numero: "04",
    titulo: "Cómo crear Skills profesionales",
    descripcion:
      "Diseña y construye Skills reutilizables que conviertan a Claude en un experto especializado bajo demanda.",
    detalles: [
      "Anatomía de una Skill: estructura, prompt y metadatos",
      "Técnicas de prompt engineering para Skills precisas",
      "Skills de código: review, refactor, security-audit",
      "Publicar y compartir Skills con tu equipo",
    ],
    icono: "04",
  },
  {
    numero: "05",
    titulo: "Cómo crear Agents poderosos",
    descripcion:
      "Construye agentes autónomos que ejecutan flujos complejos multi-paso con acceso a herramientas externas.",
    detalles: [
      "Tipos de agentes: Explore, Plan, general-purpose",
      "Configuración de herramientas y permisos por agente",
      "Orquestación: agentes que lanzan subagentes",
      "Control de errores y límites de ejecución autónoma",
    ],
    icono: "05",
  },
  {
    numero: "06",
    titulo: "MCP y herramientas externas",
    descripcion:
      "Conecta Claude Code con APIs, bases de datos y servicios externos mediante el protocolo MCP.",
    detalles: [
      "Qué es MCP (Model Context Protocol) y cómo funciona",
      "Configurar MCP servers: GitHub, Supabase, Vercel, Notion",
      "Crear tu propio MCP server personalizado",
      "Seguridad y buenas prácticas en integraciones externas",
    ],
    icono: "06",
  },
  {
    numero: "07",
    titulo: "Comandos slash y atajos avanzados",
    descripcion:
      "Domina todos los comandos internos del CLI y flujos de teclado que multiplican tu velocidad de trabajo.",
    detalles: [
      "Referencia completa de comandos slash nativos",
      "Atajos de teclado: navegación, edición y control de sesión",
      "Comandos de contexto: /add, /clear, /compact",
      "Automatización con hooks en settings.json",
    ],
    icono: "07",
  },
  {
    numero: "08",
    titulo: "Tu sistema de Segundo Cerebro con Claude Code",
    descripcion:
      "Diseña un sistema personal de conocimiento y memoria que hace a Claude Code más inteligente con cada proyecto.",
    detalles: [
      "CLAUDE.md como memoria persistente del proyecto",
      "Templates de documentación para distintos tipos de proyectos",
      "Estrategias para compartir contexto entre sesiones",
      "Integración con herramientas de notas (Notion, Obsidian)",
    ],
    icono: "08",
  },
  {
    numero: "09",
    titulo: "Flujo de trabajo profesional recomendado",
    descripcion:
      "El proceso paso a paso que usan los desarrolladores senior para integrar Claude Code en su día a día de forma efectiva.",
    detalles: [
      "Ciclo de desarrollo: plan → implementa → revisa con Claude",
      "Integración con Git: commits, PRs y code review asistidos",
      "Trabajo en equipo: convenciones y configuración compartida",
      "Métricas: cómo medir el impacto real en tu productividad",
    ],
    icono: "09",
  },
  {
    numero: "10",
    titulo: "Errores comunes y cómo evitarlos",
    descripcion:
      "Los 10 errores más frecuentes de usuarios de Claude Code y las estrategias concretas para no caer en ellos.",
    detalles: [
      "Prompts demasiado vagos: cómo dar contexto preciso",
      "Delegar demasiado: cuándo revisar el código generado",
      "Ignorar el CLAUDE.md: el error que más tiempo cuesta",
      "Gestión de costos: evitar tokens innecesarios",
    ],
    icono: "10",
  },
];

export function ModulosInteractivos() {
  const [activo, setActivo] = useState(0);
  const panelId = useId();
  const listId = useId();

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActivo((prev) => Math.min(prev + 1, modulos.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActivo((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Home") {
        e.preventDefault();
        setActivo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setActivo(modulos.length - 1);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setActivo(index);
      }
    },
    [],
  );

  const moduloActivo = modulos[activo];

  return (
    <div className="grid gap-0 lg:grid-cols-[320px_1fr]">
      {/* Lista de módulos */}
      <nav
        role="tablist"
        aria-label="Módulos del curso"
        aria-orientation="vertical"
        id={listId}
        className="border border-zinc-800 bg-zinc-900/60 lg:rounded-l-lg"
      >
        <ul className="flex flex-col">
          {modulos.map((modulo, index) => {
            const isActivo = index === activo;
            return (
              <li key={modulo.numero} role="presentation">
                <button
                  role="tab"
                  aria-selected={isActivo}
                  aria-controls={`${panelId}-panel`}
                  id={`${panelId}-tab-${index}`}
                  tabIndex={isActivo ? 0 : -1}
                  onClick={() => setActivo(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={[
                    "group w-full border-b border-zinc-800/70 px-4 py-3 text-left transition-all last:border-b-0",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-orange-500",
                    isActivo
                      ? "bg-orange-500/10 text-orange-400"
                      : "text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={[
                        "shrink-0 text-xs tabular-nums",
                        isActivo ? "text-orange-500" : "text-zinc-600 group-hover:text-zinc-500",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      {modulo.numero}
                    </span>
                    <span className="line-clamp-1 text-xs font-medium leading-snug">
                      {modulo.titulo}
                    </span>
                    {isActivo && (
                      <span
                        className="ml-auto shrink-0 text-orange-500"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Panel de detalle */}
      <div
        role="tabpanel"
        id={`${panelId}-panel`}
        aria-labelledby={`${panelId}-tab-${activo}`}
        className="rounded-b-lg border border-t-0 border-zinc-800 bg-zinc-900/30 p-8 lg:rounded-r-lg lg:rounded-bl-none lg:border-l-0 lg:border-t"
      >
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs tabular-nums text-orange-500/70">
            módulo_{moduloActivo.numero}
          </span>
          <span className="text-xs text-zinc-700">/</span>
          <span className="text-xs text-zinc-600">{activo + 1} de {modulos.length}</span>
        </div>

        <h3 className="mb-3 text-xl font-bold leading-tight text-zinc-100">
          {moduloActivo.titulo}
        </h3>

        <p className="mb-8 text-sm leading-relaxed text-zinc-400">
          {moduloActivo.descripcion}
        </p>

        <div className="mb-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            {"// Contenido del módulo"}
          </p>
          <ul className="space-y-3">
            {moduloActivo.detalles.map((detalle, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-0.5 shrink-0 text-orange-500"
                  aria-hidden="true"
                >
                  →
                </span>
                <span className="text-sm leading-relaxed text-zinc-300">
                  {detalle}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Navegación inferior */}
        <div className="flex items-center justify-between border-t border-zinc-800/60 pt-6">
          <button
            onClick={() => setActivo((prev) => Math.max(prev - 1, 0))}
            disabled={activo === 0}
            className="flex items-center gap-2 text-xs text-zinc-500 transition-colors hover:text-zinc-300 disabled:pointer-events-none disabled:opacity-30"
            aria-label="Módulo anterior"
          >
            <span aria-hidden="true">←</span>
            anterior
          </button>

          {/* Indicadores de posición */}
          <div
            className="flex items-center gap-1"
            role="group"
            aria-label="Posición en el curso"
          >
            {modulos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActivo(i)}
                aria-label={`Ir al módulo ${i + 1}`}
                aria-current={i === activo ? "true" : undefined}
                className={[
                  "h-1 rounded-full transition-all",
                  i === activo
                    ? "w-6 bg-orange-500"
                    : "w-1.5 bg-zinc-700 hover:bg-zinc-500",
                ].join(" ")}
              />
            ))}
          </div>

          <button
            onClick={() => setActivo((prev) => Math.min(prev + 1, modulos.length - 1))}
            disabled={activo === modulos.length - 1}
            className="flex items-center gap-2 text-xs text-zinc-500 transition-colors hover:text-zinc-300 disabled:pointer-events-none disabled:opacity-30"
            aria-label="Módulo siguiente"
          >
            siguiente
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

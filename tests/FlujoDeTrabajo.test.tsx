import { render, screen, fireEvent } from "@testing-library/react";
import { FlujoDeTrabajo } from "@/app/components/FlujoDeTrabajo";

describe("FlujoDeTrabajo", () => {
  test("muestra el tab de flujo por defecto", () => {
    render(<FlujoDeTrabajo />);
    expect(screen.getByText("Nueva feature o idea")).toBeInTheDocument();
    expect(screen.getByText("Bug o error inesperado")).toBeInTheDocument();
  });

  test("renderiza todas las entradas del flujo de trabajo", () => {
    render(<FlujoDeTrabajo />);
    expect(
      screen.getByText("Antes de declarar algo listo"),
    ).toBeInTheDocument();
    expect(screen.getByText("Commit y push a GitHub")).toBeInTheDocument();
    expect(screen.getByText("Actualizar docs de contexto")).toBeInTheDocument();
  });

  test("muestra los comandos asociados a cada situación", () => {
    render(<FlujoDeTrabajo />);
    expect(
      screen.getByText("superpowers:systematic-debugging"),
    ).toBeInTheDocument();
    expect(screen.getByText("/commit-push")).toBeInTheDocument();
    expect(screen.getByText("/update-ai-context")).toBeInTheDocument();
  });

  test("muestra la leyenda de prioridades", () => {
    render(<FlujoDeTrabajo />);
    // "essential" aparece en la leyenda y en los items de la lista — usamos getAllByText
    expect(screen.getAllByText("essential").length).toBeGreaterThan(0);
    expect(screen.getAllByText("important").length).toBeGreaterThan(0);
    expect(screen.getAllByText("useful").length).toBeGreaterThan(0);
  });

  test("cambia a la pestaña de arquitectura", () => {
    render(<FlujoDeTrabajo />);
    fireEvent.click(screen.getByText("# arquitectura"));
    expect(screen.getByText("~/.claude/")).toBeInTheDocument();
    expect(screen.getByText(".claude/")).toBeInTheDocument();
  });

  test("la pestaña de arquitectura muestra los archivos clave", () => {
    render(<FlujoDeTrabajo />);
    fireEvent.click(screen.getByText("# arquitectura"));
    expect(screen.getByText("CLAUDE.md")).toBeInTheDocument();
    expect(screen.getByText("settings.json")).toBeInTheDocument();
    expect(screen.getByText("memory/")).toBeInTheDocument();
  });

  test("la pestaña de arquitectura muestra las reglas de cada nivel", () => {
    render(<FlujoDeTrabajo />);
    fireEvent.click(screen.getByText("# arquitectura"));
    expect(
      screen.getByText(/Si una skill sirve para múltiples proyectos/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Si describe el contexto del proyecto/),
    ).toBeInTheDocument();
  });

  test("volver al tab flujo oculta el contenido de arquitectura", () => {
    render(<FlujoDeTrabajo />);
    fireEvent.click(screen.getByText("# arquitectura"));
    fireEvent.click(screen.getByText("# flujo de trabajo"));
    expect(screen.getByText("Nueva feature o idea")).toBeInTheDocument();
    expect(screen.queryByText("~/.claude/")).not.toBeInTheDocument();
  });
});

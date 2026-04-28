import { render, screen, fireEvent } from "@testing-library/react";
import { ModulosInteractivos } from "@/app/components/ModulosInteractivos";

describe("ModulosInteractivos", () => {
  test("muestra el primer módulo activo por defecto", () => {
    render(<ModulosInteractivos />);
    const primerTab = screen.getByRole("tab", { name: /Claude Code Setup/ });
    expect(primerTab).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getByText(/Instalación, autenticación y configuración inicial/),
    ).toBeInTheDocument();
  });

  test("cambia el panel al hacer clic en otro módulo", () => {
    render(<ModulosInteractivos />);
    fireEvent.click(screen.getByRole("tab", { name: /La carpeta .claude/ }));
    expect(
      screen.getByRole("tab", { name: /La carpeta .claude/ }),
    ).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getByText(/Domina el sistema de archivos de configuración/),
    ).toBeInTheDocument();
  });

  test('el botón "anterior" está deshabilitado en el primer módulo', () => {
    render(<ModulosInteractivos />);
    expect(
      screen.getByRole("button", { name: /módulo anterior/i }),
    ).toBeDisabled();
  });

  test('el botón "siguiente" navega al módulo 2', () => {
    render(<ModulosInteractivos />);
    fireEvent.click(screen.getByRole("button", { name: /módulo siguiente/i }));
    expect(
      screen.getByRole("tab", { name: /La carpeta .claude/ }),
    ).toHaveAttribute("aria-selected", "true");
  });

  test('el botón "siguiente" se deshabilita al llegar al último módulo', () => {
    render(<ModulosInteractivos />);
    const siguiente = screen.getByRole("button", { name: /módulo siguiente/i });
    for (let i = 0; i < 9; i++) {
      fireEvent.click(siguiente);
    }
    expect(siguiente).toBeDisabled();
  });

  test("ArrowDown cambia al siguiente módulo", () => {
    render(<ModulosInteractivos />);
    const primerTab = screen.getByRole("tab", { name: /Claude Code Setup/ });
    fireEvent.keyDown(primerTab, { key: "ArrowDown" });
    const tabs = screen.getAllByRole("tab");
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
  });

  test("ArrowUp no cambia nada en el primer módulo", () => {
    render(<ModulosInteractivos />);
    const primerTab = screen.getByRole("tab", { name: /Claude Code Setup/ });
    fireEvent.keyDown(primerTab, { key: "ArrowUp" });
    expect(primerTab).toHaveAttribute("aria-selected", "true");
  });

  test("End salta al último módulo", () => {
    render(<ModulosInteractivos />);
    const primerTab = screen.getByRole("tab", { name: /Claude Code Setup/ });
    fireEvent.keyDown(primerTab, { key: "End" });
    const tabs = screen.getAllByRole("tab");
    expect(tabs[tabs.length - 1]).toHaveAttribute("aria-selected", "true");
  });

  test("Home vuelve al primer módulo desde el último", () => {
    render(<ModulosInteractivos />);
    // Ir al último módulo
    const siguiente = screen.getByRole("button", { name: /módulo siguiente/i });
    for (let i = 0; i < 9; i++) {
      fireEvent.click(siguiente);
    }
    const tabs = screen.getAllByRole("tab");
    fireEvent.keyDown(tabs[9], { key: "Home" });
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
  });

  test("muestra el contador de posición correctamente", () => {
    render(<ModulosInteractivos />);
    expect(screen.getByText(/1 de 10/)).toBeInTheDocument();
  });
});

import { render, screen, fireEvent, act } from "@testing-library/react";
import { HooksInteractivos } from "@/app/components/HooksInteractivos";

const mockWriteText = vi.fn().mockResolvedValue(undefined);

Object.defineProperty(navigator, "clipboard", {
  value: { writeText: mockWriteText },
  writable: true,
});

describe("HooksInteractivos", () => {
  beforeEach(() => {
    mockWriteText.mockClear();
  });

  test("muestra el primer caso activo por defecto", () => {
    render(<HooksInteractivos />);
    expect(
      screen.getByRole("tab", { name: /Prettier automático/i }),
    ).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getByText(/Cada vez que Claude escribe o edita un archivo/),
    ).toBeInTheDocument();
  });

  test("cambia de caso al hacer clic en otro tab", () => {
    render(<HooksInteractivos />);
    fireEvent.click(
      screen.getByRole("tab", { name: /Notificación al terminar/i }),
    );
    expect(
      screen.getByRole("tab", { name: /Notificación al terminar/i }),
    ).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getByText(/Cuando Claude termina una tarea larga/),
    ).toBeInTheDocument();
  });

  test("el tab de GitHook muestra su contenido", () => {
    render(<HooksInteractivos />);
    fireEvent.click(screen.getByRole("tab", { name: /Limpieza pre-commit/i }));
    expect(
      screen.getByText(/este no es un hook de Claude Code/i),
    ).toBeInTheDocument();
  });

  test("el botón copiar invoca clipboard.writeText", async () => {
    render(<HooksInteractivos />);
    const boton = screen.getByRole("button", {
      name: /copiar configuración al portapapeles/i,
    });
    await act(async () => {
      fireEvent.click(boton);
    });
    expect(mockWriteText).toHaveBeenCalledOnce();
  });

  test('el botón copiar muestra "copiado" tras hacer clic', async () => {
    render(<HooksInteractivos />);
    const boton = screen.getByRole("button", {
      name: /copiar configuración al portapapeles/i,
    });
    await act(async () => {
      fireEvent.click(boton);
    });
    expect(screen.getByText(/✔ copiado/)).toBeInTheDocument();
  });

  test('cambiar de tab resetea el estado "copiado"', async () => {
    render(<HooksInteractivos />);
    const boton = screen.getByRole("button", {
      name: /copiar configuración al portapapeles/i,
    });
    await act(async () => {
      fireEvent.click(boton);
    });
    expect(screen.getByText(/✔ copiado/)).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("tab", { name: /Notificación al terminar/i }),
    );
    expect(screen.getByText("copiar")).toBeInTheDocument();
  });

  test("el panel muestra el archivo de destino del hook activo", () => {
    render(<HooksInteractivos />);
    expect(
      screen.getByText(".claude/hooks/post-edit/format.sh"),
    ).toBeInTheDocument();
  });
});

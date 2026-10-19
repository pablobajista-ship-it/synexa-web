import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App";

const abrir = (ruta: string) =>
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <App />
    </MemoryRouter>,
  );

describe("rutas principales", () => {
  it("muestra el catálogo con los 19 paquetes", () => {
    abrir("/servicios-y-precios");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Conoce, compara y prueba");
    expect(screen.getAllByRole("article")).toHaveLength(19);
  });

  it("filtra por necesidad", async () => {
    abrir("/servicios-y-precios");
    await userEvent.click(screen.getByRole("button", { name: "Vender online" }));
    expect(screen.getAllByRole("article")).toHaveLength(2);
  });

  it("filtra por familia", async () => {
    abrir("/servicios-y-precios");
    await userEvent.click(screen.getByRole("button", { name: "Radio y multimedia" }));
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it("abre la ficha de un paquete con su precio neto", () => {
    abrir("/servicios-y-precios/vertice-no-existe");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("No encontramos");
  });

  it("muestra la ficha completa de Catálogo Avanzado", () => {
    abrir("/servicios-y-precios/catalogo-avanzado");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Catálogo Avanzado");
    const aside = screen.getByRole("complementary");
    expect(within(aside).getByText("$1.990.000")).toBeInTheDocument();
    expect(screen.getByText(/Diferencia con Catálogo Básico/)).toBeInTheDocument();
  });

  it("una demostración que no existe muestra la página de no encontrada", () => {
    abrir("/demos/marca-inexistente");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("No encontramos");
  });
});

import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { App } from "@/app/App";

const abrir = async (ruta = "/demos/lumina-pro", esperar: RegExp | string = /Elige el equipo correcto/i) => {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <App />
    </MemoryRouter>,
  );
  await screen.findByRole("heading", { level: 1, name: esperar }, { timeout: 15000 });
};

const tarjeta = (n: string) => screen.getByRole("heading", { level: 3, name: n }).closest("article")!;

beforeEach(() => localStorage.clear());

describe("demo Lúmina Pro", () => {
  it("muestra el inicio con la barra de SYNEXA", async () => {
    await abrir();
    expect(screen.getByText("Demostración SYNEXA")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Compra según tu evento" })).toBeInTheDocument();
  });

  it("el catálogo lista los 10 equipos y filtra por categoría", async () => {
    await abrir("/demos/lumina-pro/catalogo", "Todos los equipos");
    expect(screen.getAllByRole("article")).toHaveLength(10);
    await userEvent.click(screen.getByRole("checkbox", { name: "Audio" }));
    expect(screen.getAllByRole("article")).toHaveLength(2);
  });

  it("filtra por exterior, DMX y texto, y avisa si no hay resultados", async () => {
    await abrir("/demos/lumina-pro/catalogo", "Todos los equipos");
    await userEvent.click(screen.getByRole("checkbox", { name: /Apto exterior/ }));
    expect(screen.getAllByRole("article")).toHaveLength(1);
    await userEvent.click(screen.getByRole("checkbox", { name: /Apto exterior/ }));
    await userEvent.click(screen.getByRole("checkbox", { name: "Control DMX" }));
    expect(screen.getAllByRole("article")).toHaveLength(7);
    await userEvent.type(screen.getByLabelText("Buscar"), "zzz");
    expect(screen.getByText("Ningún equipo cumple esos filtros.")).toBeInTheDocument();
  });

  it("ordena por precio", async () => {
    await abrir("/demos/lumina-pro/catalogo?orden=precio-asc", "Todos los equipos");
    const primero = within(screen.getAllByRole("article")[0]).getByRole("heading", { level: 3 });
    expect(primero).toHaveTextContent("Barra LED Pixel 8");
  });

  it("compara equipos, resalta el mejor valor y limita a tres", async () => {
    await abrir("/demos/lumina-pro/catalogo", "Todos los equipos");
    await userEvent.click(within(tarjeta("Par LED Wash 18×12 W")).getByRole("button", { name: /Comparar/ }));
    await userEvent.click(within(tarjeta("Barra LED Pixel 8")).getByRole("button", { name: /Comparar/ }));
    await userEvent.click(within(tarjeta("Foco LED Fresnel 200")).getByRole("button", { name: /Comparar/ }));
    expect(within(tarjeta("Máquina de humo 1500")).getByRole("button", { name: /Comparar/ })).toBeDisabled();
    await userEvent.click(within(screen.getByRole("banner")).getByRole("link", { name: /Comparar/ }));
    expect(await screen.findByRole("heading", { level: 1, name: "Comparando 3 equipos" })).toBeInTheDocument();
    const fila = screen.getByRole("row", { name: /Precio/ });
    expect(within(fila).getByText(/mejor valor/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Quitar Barra LED Pixel 8 del comparador" }));
    expect(screen.getByRole("heading", { level: 1, name: "Comparando 2 equipos" })).toBeInTheDocument();
  });

  it("el comparador vacío explica qué hacer", async () => {
    await abrir("/demos/lumina-pro/comparar", /Compara equipos/);
    expect(screen.getByText(/Aún no has elegido equipos/)).toBeInTheDocument();
  });

  it("la ficha muestra especificaciones y valida la consulta", async () => {
    await abrir("/demos/lumina-pro/equipo/par-wash-18", "Par LED Wash 18×12 W");
    expect(screen.getByText("IP65 (exterior)")).toBeInTheDocument();
    expect(screen.getByText("$390.000")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Enviar consulta" }));
    expect(screen.getByText("Escribe tu nombre.")).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText("Nombre"), "Sofía Díaz");
    await userEvent.type(screen.getByLabelText("Correo"), "sofia@evento.example");
    await userEvent.click(screen.getByRole("button", { name: "Enviar consulta" }));
    expect(screen.getByRole("status")).toHaveTextContent(/no se envió ni se guardó ningún dato/);
  });

  it("un equipo inexistente muestra un estado de error", async () => {
    await abrir("/demos/lumina-pro/equipo/no-existe", "Equipo no encontrado");
  });

  it("el recomendador calcula la sugerencia según evento y tamaño", async () => {
    await abrir("/demos/lumina-pro/recomendador", "¿Qué necesita tu evento?");
    expect(screen.getByText(/Elige un tipo de evento/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("radio", { name: /Matrimonio/ }));
    await userEvent.click(screen.getByRole("radio", { name: /Mediano/ }));
    expect(screen.getByText(/Sugerencia para: matrimonio/)).toBeInTheDocument();
    // 8 pares LED (4 × factor 2): 8 × 390.000 = 3.120.000
    expect(within(screen.getByRole("row", { name: /Par LED Wash/ })).getByText("$3.120.000")).toBeInTheDocument();
    expect(screen.getByText(/no un cálculo de ingeniería/)).toBeInTheDocument();
  });

  it("muestra los 3 kits sugeridos", async () => {
    await abrir("/demos/lumina-pro/kits", "Kits listos para tu evento");
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it("las guías se abren desde la lista", async () => {
    await abrir("/demos/lumina-pro/guias", "Guías de compra");
    await userEvent.click(screen.getByRole("link", { name: /Qué significa el grado de protección IP/ }));
    expect(await screen.findByRole("heading", { level: 1, name: /grado de protección IP/ })).toBeInTheDocument();
  });

  it("«Reiniciar demo» vacía el comparador y vuelve al inicio", async () => {
    await abrir("/demos/lumina-pro/catalogo", "Todos los equipos");
    await userEvent.click(within(tarjeta("Barra LED Pixel 8")).getByRole("button", { name: /Comparar/ }));
    expect(screen.getByLabelText("1 equipos seleccionados")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Reiniciar demo" }));
    expect(await screen.findByRole("heading", { level: 1, name: /Elige el equipo correcto/ })).toBeInTheDocument();
    expect(screen.getByLabelText("0 equipos seleccionados")).toBeInTheDocument();
  });
});

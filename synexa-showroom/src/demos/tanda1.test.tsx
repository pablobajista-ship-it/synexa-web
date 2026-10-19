import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { App } from "@/app/App";
import { proximosDias } from "./barba-norte/agenda";

const abrir = async (ruta: string, esperar: RegExp | string) => {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <App />
    </MemoryRouter>,
  );
  await screen.findByRole("heading", { level: 1, name: esperar }, { timeout: 15000 });
};

beforeEach(() => localStorage.clear());

describe("demo Molino Sur", () => {
  it("muestra el inicio y navega por el menú", async () => {
    await abrir("/demos/molino-sur", /Pan de verdad/);
    expect(screen.getByText("Demostración SYNEXA")).toBeInTheDocument();
    await userEvent.click(within(screen.getByRole("navigation", { name: "Principal" })).getByRole("link", { name: "Productos" }));
    expect(await screen.findByRole("heading", { level: 1, name: "Productos" })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(4);
  });

  it("la galería abre y cierra una imagen ampliada", async () => {
    await abrir("/demos/molino-sur/galeria", /Un vistazo/);
    await userEvent.click(screen.getAllByRole("button", { name: /Ampliar/ })[0]);
    expect(screen.getByRole("dialog", { name: "Imagen ampliada" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Cerrar" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("muestra horarios y valida el contacto", async () => {
    await abrir("/demos/molino-sur/contacto", /Ven a vernos/);
    expect(screen.getByRole("table", { name: "Horario de atención" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));
    expect(screen.getByText("Escribe tu nombre.")).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText("Nombre"), "Lía Pino");
    await userEvent.type(screen.getByLabelText("Correo"), "lia@correo.example");
    await userEvent.type(screen.getByLabelText("Mensaje"), "Quisiera encargar una torta");
    await userEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));
    expect(screen.getByRole("status")).toHaveTextContent(/no se envió ni se guardó ningún dato/);
  });
});

describe("demo Punto Barrio Market", () => {
  it("el catálogo muestra los 24 productos y filtra por categoría y texto", async () => {
    await abrir("/demos/punto-barrio/catalogo", "Catálogo");
    expect(screen.getAllByRole("article")).toHaveLength(24);
    await userEvent.click(screen.getByRole("button", { name: "Bebidas" }));
    expect(screen.getAllByRole("article")).toHaveLength(3);
    await userEvent.click(screen.getByRole("button", { name: "Todas" }));
    await userEvent.type(screen.getByLabelText("Buscar un producto"), "arroz");
    expect(screen.getAllByRole("article")).toHaveLength(1);
    await userEvent.clear(screen.getByLabelText("Buscar un producto"));
    await userEvent.type(screen.getByLabelText("Buscar un producto"), "zzzz");
    expect(screen.getByText(/No encontramos productos/)).toBeInTheDocument();
  });

  it("no hay carrito ni botón de compra", async () => {
    await abrir("/demos/punto-barrio/producto/arroz", "Arroz grado 1");
    expect(screen.queryByRole("button", { name: /carrito|comprar|agregar/i })).not.toBeInTheDocument();
    expect(screen.getByText(/Precio referencial/)).toBeInTheDocument();
  });

  it("la consulta desde una ficha preselecciona el producto", async () => {
    await abrir("/demos/punto-barrio/producto/huevos", "Huevos de campo");
    await userEvent.click(screen.getByRole("link", { name: "Consultar disponibilidad" }));
    await screen.findByRole("heading", { level: 1, name: /Contacto y consultas/ });
    expect(screen.getByLabelText("Producto (opcional)")).toHaveValue("huevos");
    await userEvent.click(screen.getByRole("button", { name: "Enviar consulta" }));
    expect(screen.getByText("Escribe tu nombre.")).toBeInTheDocument();
  });

  it("un producto inexistente muestra un error", async () => {
    await abrir("/demos/punto-barrio/producto/xx", "Producto no encontrado");
  });
});

describe("demo Barba Norte", () => {
  const diaAbierto = () => proximosDias(new Date()).find((d) => d.abierto)!;

  async function reservar(nombre = "Ana Ruiz") {
    await userEvent.click(screen.getByLabelText(/Perfilado de barba/));
    await userEvent.click(screen.getByRole("button", { name: "Continuar" }));
    await userEvent.click(screen.getByLabelText(/Diego Fuentes/));
    await userEvent.click(screen.getByRole("button", { name: "Continuar" }));
    const grupoDias = screen.getByRole("group", { name: "Días disponibles" });
    // Prueba con los primeros días abiertos hasta encontrar horas libres.
    const botones = within(grupoDias).getAllByRole("button").filter((b) => !(b as HTMLButtonElement).disabled);
    for (const b of botones) {
      await userEvent.click(b);
      const horas = screen.queryByRole("group", { name: "Horas disponibles" });
      if (horas) {
        await userEvent.click(within(horas).getAllByRole("button")[0]);
        break;
      }
    }
    await userEvent.click(screen.getByRole("button", { name: "Continuar" }));
    await userEvent.type(screen.getByLabelText("Nombre"), nombre);
    await userEvent.type(screen.getByLabelText("Teléfono"), "+56 9 8765 4321");
    await userEvent.click(screen.getByRole("button", { name: "Confirmar reserva" }));
  }

  it("exige elegir cada paso antes de avanzar", async () => {
    await abrir("/demos/barba-norte/reservar", "Reservar hora");
    await userEvent.click(screen.getByRole("button", { name: "Continuar" }));
    expect(screen.getByRole("alert")).toHaveTextContent(/Elige un servicio/);
    expect(diaAbierto()).toBeTruthy();
  });

  it("completa una reserva, aparece en el panel y se puede cancelar", async () => {
    await abrir("/demos/barba-norte/reservar", "Reservar hora");
    await reservar();
    expect(await screen.findByRole("status")).toHaveTextContent(/BN-0001/);
    expect(screen.getByRole("status")).toHaveTextContent(/simulación/);
    await userEvent.click(screen.getByRole("link", { name: "Ver en el panel" }));
    await screen.findByRole("heading", { level: 1, name: "Panel de agenda" });
    expect(screen.getByText(/Tus reservas \(1\)/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Cancelar reserva BN-0001" }));
    expect(screen.getByText(/Aún no tienes reservas/)).toBeInTheDocument();
  });

  it("valida los datos de contacto", async () => {
    await abrir("/demos/barba-norte/reservar", "Reservar hora");
    await userEvent.click(screen.getByLabelText(/Corte clásico/));
    await userEvent.click(screen.getByRole("button", { name: "Continuar" }));
    await userEvent.click(screen.getByLabelText(/Andrea Molina/));
    await userEvent.click(screen.getByRole("button", { name: "Continuar" }));
    const botones = within(screen.getByRole("group", { name: "Días disponibles" })).getAllByRole("button").filter((b) => !(b as HTMLButtonElement).disabled);
    for (const b of botones) {
      await userEvent.click(b);
      const horas = screen.queryByRole("group", { name: "Horas disponibles" });
      if (horas) { await userEvent.click(within(horas).getAllByRole("button")[0]); break; }
    }
    await userEvent.click(screen.getByRole("button", { name: "Continuar" }));
    await userEvent.click(screen.getByRole("button", { name: "Confirmar reserva" }));
    expect(screen.getByText("Escribe tu nombre.")).toBeInTheDocument();
    expect(screen.getByText(/teléfono de al menos 8 dígitos/)).toBeInTheDocument();
  });

  it("«Reiniciar demo» borra las reservas", async () => {
    await abrir("/demos/barba-norte/reservar", "Reservar hora");
    await reservar("Luis Paz");
    await screen.findByRole("status");
    expect(localStorage.getItem("synexa:barba-norte:reservas")).toContain("Luis Paz");
    await userEvent.click(screen.getByRole("button", { name: "Reiniciar demo" }));
    await screen.findByRole("heading", { level: 1, name: /Corte, barba y tiempo/ });
    expect(localStorage.getItem("synexa:barba-norte:reservas") ?? "").not.toContain("Luis Paz");
  });
});

describe("demo Brasa Costa", () => {
  it("arranca en el sitio antiguo y alterna a la versión rediseñada", async () => {
    await abrir("/demos/brasa-costa", /Mismo restaurante/);
    expect(screen.getByRole("tab", { name: "Sitio antiguo" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText(/RESTAURANT BRASA COSTA/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("tab", { name: "Sitio rediseñado" }));
    expect(screen.getByRole("heading", { name: "Brasa, mar y buena mesa." })).toBeInTheDocument();
    expect(screen.queryByText(/RESTAURANT BRASA COSTA/)).not.toBeInTheDocument();
  });

  it("alterna la vista móvil", async () => {
    await abrir("/demos/brasa-costa", /Mismo restaurante/);
    expect(screen.getByTestId("marco")).toHaveAttribute("data-movil", "false");
    await userEvent.click(screen.getByRole("button", { name: "Móvil" }));
    expect(screen.getByTestId("marco")).toHaveAttribute("data-movil", "true");
    expect(screen.getByText(/desplazarse horizontalmente/)).toBeInTheDocument();
  });

  it("el comparador responde al deslizador", async () => {
    await abrir("/demos/brasa-costa", /Mismo restaurante/);
    await userEvent.click(screen.getByRole("tab", { name: "Comparar" }));
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuetext", "50% muestra el sitio antiguo");
  });

  it("lista las mejoras y lo que no incluye el paquete", async () => {
    await abrir("/demos/brasa-costa", /Mismo restaurante/);
    expect(screen.getByRole("table", { name: /Problemas del sitio antiguo/ })).toBeInTheDocument();
    expect(screen.getByText(/reconstrucción tecnológica completa/)).toBeInTheDocument();
  });

  it("el formulario de reserva del sitio nuevo valida y confirma como demostración", async () => {
    await abrir("/demos/brasa-costa", /Mismo restaurante/);
    await userEvent.click(screen.getByRole("tab", { name: "Sitio rediseñado" }));
    await userEvent.click(screen.getByRole("button", { name: "Reservar" }));
    expect(screen.getByRole("alert")).toHaveTextContent(/Completa tu nombre/);
    await userEvent.type(screen.getByLabelText("Nombre"), "Raúl");
    await userEvent.type(screen.getByLabelText("Fecha"), "2026-11-20");
    await userEvent.click(screen.getByRole("button", { name: "Reservar" }));
    expect(screen.getByRole("status")).toHaveTextContent(/Demostración: no se envió nada/);
  });
});

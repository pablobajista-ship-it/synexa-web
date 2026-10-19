import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { App } from "@/app/App";

const abrir = async (ruta = "/demos/novasur", esperar = /Ingeniería que mantiene/i) => {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <App />
    </MemoryRouter>,
  );
  await screen.findByRole("heading", { level: 1, name: esperar }, { timeout: 15000 });
};

beforeEach(() => localStorage.clear());

describe("demo NovaSur", () => {
  it("muestra el inicio con servicios, proyectos y las noticias publicadas", async () => {
    await abrir();
    expect(screen.getByText("Demostración SYNEXA")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Proyectos destacados" })).toBeInTheDocument();
    expect(screen.getByText(/entrega el centro logístico/)).toBeInTheDocument();
    expect(screen.queryByText(/Borrador: alianza/)).not.toBeInTheDocument();
  });

  it("navega a la ficha de un proyecto y al siguiente", async () => {
    await abrir("/demos/novasur/proyectos", /Obras y servicios/i);
    await userEvent.click(screen.getByRole("link", { name: /Subestación eléctrica Norte/ }));
    expect(await screen.findByRole("heading", { level: 1, name: "Subestación eléctrica Norte" })).toBeInTheDocument();
    expect(screen.getByText("El desafío")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("link", { name: /Siguiente:/ }));
    expect(await screen.findByRole("heading", { level: 1, name: /Sala de bombas/ })).toBeInTheDocument();
  });

  it("filtra proyectos por categoría", async () => {
    await abrir("/demos/novasur/proyectos", /Obras y servicios/i);
    await userEvent.click(screen.getByRole("button", { name: "Mantenimiento" }));
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(1);
  });

  it("un proyecto inexistente muestra un estado de error", async () => {
    await abrir("/demos/novasur/proyectos/no-existe", /Proyecto no encontrado/i);
  });

  it("valida el formulario de contacto y confirma como demostrativo", async () => {
    await abrir("/demos/novasur/contacto", /Conversemos/i);
    await userEvent.click(screen.getByRole("button", { name: "Enviar consulta" }));
    expect(screen.getByText("Escribe tu nombre.")).toBeInTheDocument();
    expect(screen.getByText("Ingresa un correo válido.")).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText("Nombre"), "Luis Mora");
    await userEvent.type(screen.getByLabelText("Correo"), "luis@empresa.example");
    await userEvent.type(screen.getByLabelText("Mensaje"), "Necesitamos cotizar un mantenimiento.");
    await userEvent.click(screen.getByRole("button", { name: "Enviar consulta" }));
    expect(screen.getByRole("status")).toHaveTextContent(/no se envió ni se guardó ningún dato/);
  });

  it("el panel de administración publica una noticia y aparece en el sitio", async () => {
    await abrir("/demos/novasur/admin", /Administrar noticias/i);
    const fila = screen.getByText(/Borrador: alianza/).closest("tr")!;
    await userEvent.click(within(fila).getByRole("button", { name: "Publicar" }));
    expect(within(fila).getByText("Publicada")).toBeInTheDocument();
    await userEvent.click(within(screen.getByRole("navigation", { name: "Principal" })).getByRole("link", { name: "Noticias" }));
    expect(await screen.findByRole("heading", { level: 2, name: /Borrador: alianza/ })).toBeInTheDocument();
  });

  it("crea una noticia con validación y la elimina", async () => {
    await abrir("/demos/novasur/admin", /Administrar noticias/i);
    await userEvent.click(screen.getByRole("button", { name: "Nueva noticia" }));
    await userEvent.click(screen.getByRole("button", { name: "Guardar" }));
    expect(screen.getByRole("alert")).toHaveTextContent(/título/);
    await userEvent.type(screen.getByLabelText("Título"), "Nueva certificación ambiental");
    await userEvent.type(screen.getByLabelText("Resumen"), "Obtuvimos la certificación.");
    await userEvent.click(screen.getByRole("button", { name: "Guardar" }));
    expect(screen.getByText("Nueva certificación ambiental")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Eliminar Nueva certificación ambiental" }));
    expect(screen.queryByText("Nueva certificación ambiental")).not.toBeInTheDocument();
  });

  it("«Reiniciar demo» restablece los cambios del panel", async () => {
    await abrir("/demos/novasur/admin", /Administrar noticias/i);
    await userEvent.click(screen.getByRole("button", { name: "Eliminar Borrador: alianza con proveedor de transformadores" }));
    expect(screen.queryByText(/Borrador: alianza/)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Reiniciar demo" }));
    expect(await screen.findByRole("heading", { level: 1, name: /Ingeniería que mantiene/ })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("link", { name: /Administración de contenidos/ }));
    expect(await screen.findByText(/Borrador: alianza/)).toBeInTheDocument();
  });

  it("el menú móvil se abre y se cierra", async () => {
    await abrir();
    const boton = screen.getByRole("button", { name: "Abrir menú" });
    await userEvent.click(boton);
    expect(screen.getByRole("navigation", { name: "Principal móvil" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Cerrar menú" }));
    expect(screen.queryByRole("navigation", { name: "Principal móvil" })).not.toBeInTheDocument();
  });
});

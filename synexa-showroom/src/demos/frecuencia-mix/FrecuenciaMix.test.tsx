import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { App } from "@/app/App";
import { programaAlAire } from "./Reproductor";

const abrir = async (ruta = "/demos/frecuencia-mix", esperar: RegExp | string = /La música se escucha mejor/i) => {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <App />
    </MemoryRouter>,
  );
  await screen.findByRole("heading", { level: 1, name: esperar }, { timeout: 15000 });
};

beforeEach(() => localStorage.clear());

describe("demo Frecuencia Mix", () => {
  it("muestra el inicio, los locutores y el reproductor", async () => {
    await abrir();
    expect(screen.getByText("Demostración SYNEXA")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Las voces de Frecuencia Mix" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /Reproductor/ })).toBeInTheDocument();
  });

  it("el reproductor alterna entre reproducir y pausar y avisa que es una señal de prueba", async () => {
    await abrir();
    const boton = screen.getByRole("button", { name: "Reproducir la señal" });
    expect(boton).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(boton);
    expect(screen.getByRole("button", { name: "Pausar la señal" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/Señal de prueba generada en tu navegador/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Pausar la señal" }));
    expect(screen.getByRole("button", { name: "Reproducir la señal" })).toBeInTheDocument();
  });

  it("calcula el programa al aire según día y hora", () => {
    expect(programaAlAire(new Date(2026, 9, 19, 8, 30))?.id).toBe("buenos-dias"); // lunes 08:30
    expect(programaAlAire(new Date(2026, 9, 19, 3, 0))).toBeNull();
    expect(programaAlAire(new Date(2026, 9, 24, 11, 0))?.id).toBe("sabado-descubrimientos");
    expect(programaAlAire(new Date(2026, 9, 25, 12, 0))?.id).toBe("domingo-acustico");
  });

  it("la programación cambia por día", async () => {
    await abrir("/demos/frecuencia-mix/programacion", /Qué suena y cuándo/);
    await userEvent.click(screen.getByRole("button", { name: "Sábado" }));
    expect(screen.getByRole("heading", { level: 2, name: "Sábado" })).toBeInTheDocument();
    expect(screen.getByText("Sábado de Descubrimientos")).toBeInTheDocument();
    expect(screen.queryByText("Buenos días, Frecuencia")).not.toBeInTheDocument();
  });

  it("los artículos se expanden", async () => {
    await abrir("/demos/frecuencia-mix/musica", /Para seguir escuchando/);
    expect(screen.getAllByRole("article")).toHaveLength(4);
  });

  it("el chat envía mensajes y retiene los que usan palabras bloqueadas", async () => {
    await abrir("/demos/frecuencia-mix/comunidad", "Participa en la radio");
    await userEvent.type(screen.getByLabelText("Mensaje"), "Hola a todos");
    await userEvent.click(screen.getByRole("button", { name: "Enviar" }));
    expect(within(screen.getByRole("log")).getByText("Hola a todos")).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText("Mensaje"), "esto es spam");
    await userEvent.click(screen.getByRole("button", { name: "Enviar" }));
    expect(screen.getByText(/retenido por el filtro de moderación/)).toBeInTheDocument();
    expect(screen.queryByText("esto es spam")).not.toBeInTheDocument();
  });

  it("no envía mensajes vacíos", async () => {
    await abrir("/demos/frecuencia-mix/comunidad", "Participa en la radio");
    await userEvent.click(screen.getByRole("button", { name: "Enviar" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Escribe un mensaje.");
  });

  it("permite votar una sola vez y muestra resultados", async () => {
    await abrir("/demos/frecuencia-mix/comunidad?tab=votaciones", "Participa en la radio");
    await userEvent.click(screen.getByRole("button", { name: /Pulso — Ruta 45/ }));
    expect(screen.getByRole("status")).toHaveTextContent(/tu voto/);
    expect(screen.queryByRole("button", { name: /Satélite — Mar de Fondo/ })).not.toBeInTheDocument();
  });

  it("la trivia se juega completa y se puede repetir", async () => {
    await abrir("/demos/frecuencia-mix/comunidad?tab=trivia", "Participa en la radio");
    const correctas = ["6", "Tocadiscos", "Pulsos por minuto", "Saxofón", "Fade in"];
    for (const c of correctas) {
      await userEvent.click(screen.getByRole("button", { name: new RegExp(`^${c}$`) }));
      await userEvent.click(screen.getByRole("button", { name: /Siguiente|Ver resultado/ }));
    }
    expect(screen.getByRole("status")).toHaveTextContent("5 / 5");
    await userEvent.click(screen.getByRole("button", { name: "Jugar de nuevo" }));
    expect(screen.getByText("Pregunta 1 de 5")).toBeInTheDocument();
  });

  it("una dedicatoria queda pendiente hasta que un moderador la aprueba", async () => {
    await abrir("/demos/frecuencia-mix/comunidad?tab=dedicatorias", "Participa en la radio");
    await userEvent.click(screen.getByRole("button", { name: "Enviar dedicatoria" }));
    expect(screen.getByText("¿Para quién es?")).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText("Para"), "Abuela");
    await userEvent.type(screen.getByLabelText("De parte de"), "Tomás");
    await userEvent.type(screen.getByLabelText("Mensaje"), "Gracias por todo");
    await userEvent.click(screen.getByRole("button", { name: "Enviar dedicatoria" }));
    expect(screen.getByText(/pendiente de moderación/)).toBeInTheDocument();
    expect(screen.queryByText(/Gracias por todo/, { selector: "li *" })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("link", { name: "panel de moderación" }));
    await screen.findByRole("heading", { name: "Cola de moderación" });
    await userEvent.click(screen.getByRole("button", { name: "Aprobar dedicatoria de Tomás" }));
    expect(screen.queryByText("“Gracias por todo”")).not.toBeInTheDocument();
  });

  it("el panel silencia usuarios y administra palabras bloqueadas", async () => {
    await abrir("/demos/frecuencia-mix/moderacion", "Cola de moderación");
    await userEvent.click(screen.getByRole("button", { name: "Silenciar a Valentina" }));
    expect(screen.getByText("Silenciado")).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText("Nueva palabra"), "Basura");
    await userEvent.click(screen.getByRole("button", { name: "Agregar" }));
    expect(screen.getByText("basura")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Quitar la palabra basura" }));
    expect(screen.queryByText("basura")).not.toBeInTheDocument();
  });

  it("«Reiniciar demo» restablece el estado de la comunidad", async () => {
    await abrir("/demos/frecuencia-mix/comunidad", "Participa en la radio");
    await userEvent.type(screen.getByLabelText("Mensaje"), "Mensaje de prueba");
    await userEvent.click(screen.getByRole("button", { name: "Enviar" }));
    expect(localStorage.getItem("synexa:frecuencia-mix:estado")).toContain("Mensaje de prueba");
    await userEvent.click(screen.getByRole("button", { name: "Reiniciar demo" }));
    expect(await screen.findByRole("heading", { level: 1, name: /La música se escucha mejor/ })).toBeInTheDocument();
    expect(localStorage.getItem("synexa:frecuencia-mix:estado") ?? "").not.toContain("Mensaje de prueba");
  });
});

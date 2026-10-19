import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { App } from "@/app/App";

const abrir = async () => {
  render(
    <MemoryRouter initialEntries={["/demos/brillo-car"]}>
      <App />
    </MemoryRouter>,
  );
  await screen.findByRole("heading", { level: 1, name: /Tu auto, como el primer día/i }, { timeout: 15000 });
};

describe("demo BrilloCar", () => {
  it("muestra la barra de SYNEXA y la landing completa", async () => {
    await abrir();
    expect(screen.getByText("Demostración SYNEXA")).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getByText("$120.000")).toBeInTheDocument();
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("valida el formulario antes de enviar", async () => {
    await abrir();
    await userEvent.click(screen.getByRole("button", { name: "Solicitar cotización" }));
    expect(screen.getByText("Escribe tu nombre.")).toBeInTheDocument();
    expect(screen.getByText(/teléfono de al menos 8 dígitos/)).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("confirma una solicitud válida como demostrativa y no guarda datos", async () => {
    await abrir();
    await userEvent.type(screen.getByLabelText("Nombre"), "Ana Pérez");
    await userEvent.type(screen.getByLabelText("Teléfono"), "+56 9 1234 5678");
    await userEvent.click(screen.getByRole("button", { name: "Solicitar cotización" }));
    expect(screen.getByRole("status")).toHaveTextContent(/Gracias, Ana/);
    expect(screen.getByRole("status")).toHaveTextContent(/no se envió ni se guardó ningún dato/);
  });

  it("el paquete elegido preselecciona el formulario", async () => {
    await abrir();
    await userEvent.click(screen.getByRole("link", { name: "Cotizar Cerámico" }));
    expect(screen.getByLabelText("Paquete de interés")).toHaveValue("ceramico");
  });

  it("reinicia la demo a su estado inicial", async () => {
    await abrir();
    await userEvent.type(screen.getByLabelText("Nombre"), "Ana");
    await userEvent.click(screen.getByRole("button", { name: "Reiniciar demo" }));
    expect(await screen.findByLabelText("Nombre")).toHaveValue("");
  });

  it("el acordeón de preguntas se abre y se cierra", async () => {
    await abrir();
    const q = screen.getByRole("button", { name: /Cómo reservo/ });
    expect(q).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(q);
    expect(q).toHaveAttribute("aria-expanded", "true");
  });
});

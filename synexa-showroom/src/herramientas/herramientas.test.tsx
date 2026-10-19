import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { App } from "@/app/App";
import { PAQUETES } from "@/datos/catalogo";

const abrir = (ruta: string) =>
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <App />
    </MemoryRouter>,
  );

describe("comparador", () => {
  it("pide al menos dos paquetes", () => {
    abrir("/servicios-y-precios/comparar");
    expect(screen.getByRole("status")).toHaveTextContent(/al menos dos paquetes/);
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("compara paquetes elegidos por URL y permite quitar uno", async () => {
    const [a, b] = PAQUETES;
    abrir(`/servicios-y-precios/comparar?ids=${a.id},${b.id}`);
    const tabla = screen.getByRole("table", { name: "Comparación de paquetes" });
    expect(within(tabla).getByRole("columnheader", { name: new RegExp(a.nombre) })).toBeInTheDocument();
    expect(within(tabla).getByRole("rowheader", { name: "Precio base" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: `Quitar ${b.nombre} de la comparación` }));
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("agrega paquetes desde el selector y llega al máximo de cuatro", async () => {
    abrir("/servicios-y-precios/comparar");
    for (let i = 0; i < 4; i++) {
      await userEvent.selectOptions(screen.getByLabelText("Agregar un paquete"), PAQUETES[i].id);
    }
    expect(screen.queryByLabelText("Agregar un paquete")).not.toBeInTheDocument();
    expect(within(screen.getByRole("table")).getAllByRole("columnheader")).toHaveLength(4);
  });
});

describe("Arma tu solución", () => {
  it("suma el paquete con IVA y muestra los módulos sin tarifa como «Por cotizar»", async () => {
    const p = PAQUETES.find((x) => x.modulos.length >= 2)!;
    abrir("/servicios-y-precios/arma-tu-solucion");
    expect(screen.getByText("Aún no eliges un paquete.")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("radio", { name: new RegExp(p.nombre) }));
    const resumen = screen.getByRole("complementary", { name: "Resumen de tu solución" });
    expect(within(resumen).getByText("Total referencial")).toBeInTheDocument();
    const checks = screen.getAllByRole("checkbox");
    await userEvent.click(checks[0]);
    expect(within(resumen).getByText("Por cotizar")).toBeInTheDocument();
    expect(within(resumen).getByText(/no incluye los módulos «Por cotizar»/)).toBeInTheDocument();
  });

  it("los planes mensuales con precio se reflejan y el empresarial queda por cotizar", async () => {
    abrir(`/servicios-y-precios/arma-tu-solucion?paquete=${PAQUETES[0].id}`);
    const resumen = screen.getByRole("complementary", { name: "Resumen de tu solución" });
    await userEvent.click(screen.getByRole("radio", { name: /Infraestructura Business/ }));
    expect(within(resumen).getByText(/Desde \$49\.900 \/ mes/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("radio", { name: /Infraestructura Empresarial/ }));
    expect(within(resumen).getByText("Por cotizar")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("radio", { name: /SYNEXA Care Plus/ }));
    expect(within(resumen).getByText(/\$119\.900 \/ mes/)).toBeInTheDocument();
  });

  it("filtrar por necesidad reduce los paquetes", async () => {
    abrir("/servicios-y-precios/arma-tu-solucion");
    expect(screen.getByRole("status")).toHaveTextContent("19 paquetes");
    await userEvent.click(screen.getByRole("button", { name: "Vender online" }));
    expect(screen.getByRole("status")).toHaveTextContent("2 paquetes");
  });
});

describe("resumen de cotización", () => {
  it("sin selección invita a armar la solución", () => {
    abrir("/servicios-y-precios/resumen");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Aún no hay una solución");
    expect(screen.getByRole("link", { name: "Armar mi solución" })).toBeInTheDocument();
  });

  it("muestra el total, los servicios mensuales y el aviso de no vinculante", () => {
    const p = PAQUETES[0];
    abrir(`/servicios-y-precios/resumen?paquete=${p.id}&infra=infra-web&soporte=care`);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(p.nombre);
    expect(screen.getByText("Total referencial")).toBeInTheDocument();
    expect(screen.getByText(/Desde \$24\.900 \+ IVA \/ mes/)).toBeInTheDocument();
    expect(screen.getByText(/\$59\.900 \+ IVA \/ mes/)).toBeInTheDocument();
    expect(screen.getByText(/No es una oferta vinculante/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Imprimir o guardar como PDF" })).toBeInTheDocument();
  });

  it("ignora ids inválidos en la URL", () => {
    abrir("/servicios-y-precios/resumen?paquete=no-existe");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Aún no hay una solución");
  });
});

describe("Infraestructura y soporte", () => {
  it("muestra los planes del documento vigente sin inventar precios", () => {
    abrir("/servicios-y-precios/infraestructura-y-soporte");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/sigue funcionando/);
    expect(screen.getByRole("heading", { level: 3, name: "Infraestructura Empresarial" })).toBeInTheDocument();
    expect(screen.getByText("A cotizar")).toBeInTheDocument();
    expect(screen.getByText("$24.900")).toBeInTheDocument();
    expect(screen.getByText("$399.900")).toBeInTheDocument();
    expect(screen.getByText("Tiempos de respuesta acordados")).toBeInTheDocument();
    expect(screen.getByText("Servicio sujeto a disponibilidad.")).toBeInTheDocument();
  });

  it("la navegación superior enlaza las nuevas secciones", () => {
    abrir("/servicios-y-precios");
    const nav = within(screen.getByRole("navigation", { name: "Servicios y Precios" }));
    expect(nav.getByRole("link", { name: "Comparar" })).toHaveAttribute("href", "/servicios-y-precios/comparar");
    expect(nav.getByRole("link", { name: "Infraestructura y soporte" })).toBeInTheDocument();
  });
});

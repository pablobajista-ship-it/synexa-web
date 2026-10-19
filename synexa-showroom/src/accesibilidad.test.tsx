import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axe from "axe-core";
import { App } from "@/app/App";
import { MARCAS } from "@/datos/marcas";
import { PAQUETES } from "@/datos/catalogo";

/**
 * Revisión automática de accesibilidad con axe-core sobre todas las pantallas principales.
 * jsdom no calcula colores ni layout, así que las reglas de contraste (`color-contrast`) y las de
 * región (`region`) quedan fuera: el contraste se revisa en el navegador (docs/pruebas/validacion.md).
 */
const REGLAS_FUERA = ["color-contrast", "region", "scrollable-region-focusable"];

async function violaciones(ruta: string) {
  const { container, unmount } = render(
    <MemoryRouter initialEntries={[ruta]}>
      <App />
    </MemoryRouter>,
  );
  // Espera a que cargue la demo (lazy) o la página.
  await screen.findAllByRole("heading", {}, { timeout: 15000 });
  const r = await axe.run(container, { rules: Object.fromEntries(REGLAS_FUERA.map((id) => [id, { enabled: false }])) });
  unmount();
  return r.violations.map((v) => `${v.id}: ${v.nodes.length} nodo(s) — ${v.nodes[0].html.slice(0, 120)}`);
}

const RUTAS_SERVICIOS = [
  "/servicios-y-precios",
  `/servicios-y-precios/${PAQUETES[0].id}`,
  `/servicios-y-precios/comparar?ids=${PAQUETES[0].id},${PAQUETES[1].id}`,
  "/servicios-y-precios/arma-tu-solucion",
  `/servicios-y-precios/arma-tu-solucion?paquete=${PAQUETES[0].id}&infra=infra-web&soporte=care`,
  `/servicios-y-precios/resumen?paquete=${PAQUETES[0].id}`,
  "/servicios-y-precios/infraestructura-y-soporte",
  "/servicios-y-precios/proyectos-realizados",
];

describe("accesibilidad (axe-core)", () => {
  it("control: el verificador sí detecta un problema real", async () => {
    const { container, unmount } = render(<main><h1>Prueba</h1><img src="x.png" /><button /></main>);
    const r = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    unmount();
    expect(r.violations.map((v) => v.id)).toEqual(expect.arrayContaining(["image-alt", "button-name"]));
  });

  it.each(RUTAS_SERVICIOS)("sin violaciones en %s", async (ruta) => {
    expect(await violaciones(ruta)).toEqual([]);
  });

  it.each(PAQUETES.map((p) => p.id))("la ficha de %s no tiene violaciones", async (id) => {
    expect(await violaciones(`/servicios-y-precios/${id}`)).toEqual([]);
  });

  it.each(MARCAS.map((m) => m.id))("la portada de la demo %s no tiene violaciones", async (id) => {
    expect(await violaciones(`/demos/${id}`)).toEqual([]);
  });
});

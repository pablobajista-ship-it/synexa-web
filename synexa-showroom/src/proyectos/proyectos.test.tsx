import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "@/app/App";
import { PROYECTOS } from "@/datos/proyectos";
import { paquetePorId } from "@/datos/catalogo";

describe("Proyectos realizados", () => {
  it("presenta los tres proyectos con enlace externo seguro y paquete de referencia", () => {
    render(<MemoryRouter initialEntries={["/servicios-y-precios/proyectos-realizados"]}><App /></MemoryRouter>);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Sitios reales");
    for (const nombre of ["Radio Décadas 106.1", "Nexorium", "Iluminación DJ"]) expect(screen.getByRole("heading", { level: 2, name: nombre })).toBeInTheDocument();
    const enlaces = screen.getAllByRole("link", { name: /Visitar/ });
    expect(enlaces).toHaveLength(3);
    for (const a of enlaces) {
      expect(a).toHaveAttribute("target", "_blank");
      expect(a.getAttribute("rel")).toContain("noopener");
    }
    expect(within(screen.getByRole("article", { name: "Nexorium" })).getByRole("link", { name: "Portal Comercial Especializado" })).toBeInTheDocument();
  });

  it("separa lo visto en producción de lo que solo dice la documentación", () => {
    render(<MemoryRouter initialEntries={["/servicios-y-precios/proyectos-realizados"]}><App /></MemoryRouter>);
    expect(screen.getAllByText("Visto en el sitio público")).toHaveLength(3);
    expect(screen.getAllByText("Según la documentación del proyecto")).toHaveLength(3);
    expect(screen.getByText(/falta aplicar la migración de base de datos/)).toBeInTheDocument();
  });

  it("los datos son consistentes: paquetes y capturas existen, y no hay credenciales", () => {
    for (const p of PROYECTOS) {
      expect(paquetePorId(p.paqueteReferencia)).toBeDefined();
      expect(p.capturas.length).toBeGreaterThanOrEqual(2);
      for (const c of p.capturas) {
        expect(existsSync(`public/${c.archivo}`)).toBe(true);
        expect(c.alt.length).toBeGreaterThan(10);
      }
      expect(JSON.stringify(p)).not.toMatch(/key|token|secret|password/i);
    }
  });
});

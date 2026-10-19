import { describe, expect, it } from "vitest";
import { DOCUMENTOS, ETAPAS, estadoEtapa, pendientesAprobacion, porcentajeAvance, puedeAprobar, validarMensaje } from "./portal";

describe("portal de Trama", () => {
  it("calcula el estado de cada etapa", () => {
    expect(ETAPAS.map((_, i) => estadoEtapa(i, 2))).toEqual(["completada", "completada", "en curso", "pendiente", "pendiente"]);
  });
  it("el avance es proporcional y está acotado", () => {
    expect(porcentajeAvance(2)).toBe(40);
    expect(porcentajeAvance(99)).toBe(100);
    expect(porcentajeAvance(-1)).toBe(0);
  });
  it("solo se aprueban documentos que lo requieren y una vez", () => {
    const [plano, informe] = DOCUMENTOS;
    expect(puedeAprobar(plano, [])).toBe(true);
    expect(puedeAprobar(plano, [plano.id])).toBe(false);
    expect(puedeAprobar(informe, [])).toBe(false);
    expect(pendientesAprobacion([])).toBe(2);
    expect(pendientesAprobacion(["d1", "d3"])).toBe(0);
  });
  it("valida los mensajes", () => {
    expect(validarMensaje("  ")).toMatch(/Escribe/);
    expect(validarMensaje("x".repeat(501))).toMatch(/500/);
    expect(validarMensaje("Hola")).toBeNull();
  });
});

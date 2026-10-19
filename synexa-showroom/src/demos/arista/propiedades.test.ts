import { describe, expect, it } from "vitest";
import { FILTROS_VACIOS, PROPIEDADES_INICIALES, filtrar, precioTexto, validarPropiedad } from "./propiedades";

describe("filtros de Arista", () => {
  it("sin filtros devuelve las 8 publicadas", () => expect(filtrar(PROPIEDADES_INICIALES, FILTROS_VACIOS)).toHaveLength(8));
  it("filtra por operación y tipo", () => {
    expect(filtrar(PROPIEDADES_INICIALES, { ...FILTROS_VACIOS, operacion: "Arriendo" })).toHaveLength(4);
    expect(filtrar(PROPIEDADES_INICIALES, { ...FILTROS_VACIOS, tipo: "Casa" })).toHaveLength(4);
  });
  it("aplica dormitorios mínimos y precio máximo", () => {
    expect(filtrar(PROPIEDADES_INICIALES, { ...FILTROS_VACIOS, dormitoriosMin: 4 }).every((p) => p.dormitorios >= 4)).toBe(true);
    expect(filtrar(PROPIEDADES_INICIALES, { ...FILTROS_VACIOS, operacion: "Arriendo", precioMax: 1_000_000 })).toHaveLength(1);
  });
  it("ordena por precio", () => {
    const l = filtrar(PROPIEDADES_INICIALES, { ...FILTROS_VACIOS, operacion: "Venta", orden: "menor" });
    expect(l.map((p) => p.precio)).toEqual([...l.map((p) => p.precio)].sort((a, b) => a - b));
  });
  it("no muestra las ocultas", () => {
    const l = PROPIEDADES_INICIALES.map((p, i) => (i === 0 ? { ...p, publicada: false } : p));
    expect(filtrar(l, FILTROS_VACIOS)).toHaveLength(7);
  });
  it("formatea el arriendo por mes y valida el alta", () => {
    expect(precioTexto({ precio: 980000, operacion: "Arriendo" })).toBe("$980.000 / mes");
    expect(Object.keys(validarPropiedad({ titulo: "ab", precio: 0, m2: 0 }))).toEqual(["titulo", "precio", "m2"]);
  });
});

import { describe, expect, it } from "vitest";
import { PRODUCTOS_INICIALES as P } from "./datos";
import { filtrar, normalizar, relacionados, validarProducto, type Filtros } from "./filtros";

const vacio: Filtros = { q: "", categorias: [], precioMax: null, materiales: [], suspensiones: [], soloEnStock: false };

describe("filtros de Vértice Bikes", () => {
  it("sin filtros devuelve todos los activos", () => {
    expect(filtrar(P, vacio, "destacados")).toHaveLength(P.length);
    expect(filtrar(P.map((p, i) => (i === 0 ? { ...p, activo: false } : p)), vacio, "destacados")).toHaveLength(P.length - 1);
  });

  it("filtra por categoría y precio máximo", () => {
    expect(filtrar(P, { ...vacio, categorias: ["montana"] }, "destacados").map((p) => p.id)).toEqual(["trail-pro", "ridge-hardtail"]);
    expect(filtrar(P, { ...vacio, categorias: ["montana"], precioMax: 1500000 }, "destacados").map((p) => p.id)).toEqual(["ridge-hardtail"]);
  });

  it("filtra por material y suspensión; los accesorios quedan fuera", () => {
    expect(filtrar(P, { ...vacio, materiales: ["Carbono"] }, "destacados").map((p) => p.id)).toEqual(["aero-carbon"]);
    const completa = filtrar(P, { ...vacio, suspensiones: ["Completa"] }, "destacados");
    expect(completa.map((p) => p.id)).toEqual(["trail-pro"]);
  });

  it("la búsqueda ignora tildes y mayúsculas y exige todas las palabras", () => {
    expect(normalizar("Montaña")).toBe("montana");
    expect(filtrar(P, { ...vacio, q: "MONTANA hidraulico" }, "destacados").length).toBeGreaterThan(0);
    expect(filtrar(P, { ...vacio, q: "ruta carbono" }, "destacados").map((p) => p.id)).toEqual(["aero-carbon"]);
    expect(filtrar(P, { ...vacio, q: "zzzz" }, "destacados")).toEqual([]);
  });

  it("combina filtros y excluye sin stock cuando se pide", () => {
    const sinStock = P.map((p) => (p.id === "aero-carbon" ? { ...p, stock: 0 } : p));
    expect(filtrar(sinStock, { ...vacio, categorias: ["ruta"], soloEnStock: true }, "destacados")).toEqual([]);
    expect(filtrar(sinStock, { ...vacio, categorias: ["ruta"] }, "destacados")).toHaveLength(1);
  });

  it("ordena por precio y por peso", () => {
    const asc = filtrar(P, vacio, "precio-asc").map((p) => p.precio);
    expect(asc).toEqual([...asc].sort((a, b) => a - b));
    const peso = filtrar(P, { ...vacio, categorias: ["montana", "ruta", "urbana"] }, "peso").map((p) => p.id);
    expect(peso[0]).toBe("aero-carbon");
  });

  it("los relacionados priorizan la misma categoría y no incluyen el propio producto", () => {
    const r = relacionados(P, P.find((p) => p.id === "trail-pro")!);
    expect(r[0].id).toBe("ridge-hardtail");
    expect(r.some((p) => p.id === "trail-pro")).toBe(false);
    expect(r).toHaveLength(4);
  });

  it("valida productos nuevos", () => {
    expect(validarProducto({ nombre: "ab", precio: 0, stock: -1 })).toEqual({ nombre: expect.any(String), precio: expect.any(String), stock: expect.any(String) });
    expect(validarProducto({ nombre: "Bici nueva", precio: 100000, stock: 3 })).toEqual({});
  });
});

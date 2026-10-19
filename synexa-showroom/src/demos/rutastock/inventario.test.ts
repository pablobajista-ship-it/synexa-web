import { describe, expect, it } from "vitest";
import { ESTADO_INICIAL, ITEMS_INICIALES, aCSV, estadoStock, filtrarItems, kpis, movimientosPorDia, porCategoria, registrarMovimiento, validarItem } from "./inventario";

describe("inventario de RutaStock", () => {
  it("clasifica el estado de stock", () => {
    expect(estadoStock({ stock: 0, minimo: 10 })).toBe("sin stock");
    expect(estadoStock({ stock: 5, minimo: 10 })).toBe("bajo");
    expect(estadoStock({ stock: 10, minimo: 10 })).toBe("ok");
  });
  it("calcula indicadores coherentes con los datos", () => {
    const k = kpis(ITEMS_INICIALES);
    expect(k.skus).toBe(14);
    expect(k.sinStock).toBe(1);
    expect(k.bajos).toBe(ITEMS_INICIALES.filter((i) => i.stock > 0 && i.stock < i.minimo).length);
    expect(porCategoria(ITEMS_INICIALES).reduce((a, c) => a + c.valor, 0)).toBe(k.valor);
  });
  it("agrupa movimientos en siete días", () => {
    const d = movimientosPorDia(ESTADO_INICIAL.movimientos);
    expect(d).toHaveLength(7);
    expect(d.reduce((a, x) => a + x.entradas + x.salidas, 0)).toBe(ESTADO_INICIAL.movimientos.reduce((a, x) => a + x.cantidad, 0));
  });
  it("una entrada suma y una salida resta", () => {
    const r1 = registrarMovimiento(ESTADO_INICIAL, "RS-1004", "entrada", 50);
    expect("estado" in r1 && r1.estado.items.find((i) => i.sku === "RS-1004")?.stock).toBe(50);
    const r2 = registrarMovimiento(ESTADO_INICIAL, "RS-1001", "salida", 80);
    expect("estado" in r2 && r2.estado.items.find((i) => i.sku === "RS-1001")?.stock).toBe(400);
  });
  it("rechaza salidas mayores al stock y cantidades inválidas", () => {
    expect(registrarMovimiento(ESTADO_INICIAL, "RS-1004", "salida", 1)).toHaveProperty("error");
    expect(registrarMovimiento(ESTADO_INICIAL, "RS-1001", "entrada", 0)).toHaveProperty("error");
    expect(registrarMovimiento(ESTADO_INICIAL, "RS-1001", "entrada", 1.5)).toHaveProperty("error");
    expect(registrarMovimiento(ESTADO_INICIAL, "XX", "entrada", 1)).toHaveProperty("error");
  });
  it("filtra por texto, categoría y alertas", () => {
    expect(filtrarItems(ITEMS_INICIALES, "arroz", "", false)).toHaveLength(1);
    expect(filtrarItems(ITEMS_INICIALES, "", "Limpieza", false)).toHaveLength(3);
    expect(filtrarItems(ITEMS_INICIALES, "", "", true).every((i) => estadoStock(i) !== "ok")).toBe(true);
  });
  it("valida el alta y exporta CSV con comillas escapadas", () => {
    expect(Object.keys(validarItem({ nombre: "x", stock: -1, minimo: 1.5, costo: 0 }))).toEqual(["nombre", "stock", "minimo", "costo"]);
    const csv = aCSV([{ ...ITEMS_INICIALES[0], nombre: 'Arroz "premium"' }]);
    expect(csv.split("\n")).toHaveLength(2);
    expect(csv).toContain('"Arroz ""premium"""');
  });
});

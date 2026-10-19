import { describe, expect, it } from "vitest";
import { CAPACIDAD, ORDENES_INICIALES, asignar, cambiarEstado, cargaTecnico, crearOrden, resumenPorEstado, tecnicosElegibles, transicionesDe, type Orden } from "./ordenes";

const ok = (r: { ordenes: Orden[] } | { error: string }) => { if ("error" in r) throw new Error(r.error); return r.ordenes; };

describe("órdenes de trabajo de Servimant", () => {
  it("las transiciones permitidas siguen el flujo", () => {
    expect(transicionesDe("Pendiente")).toEqual(["Asignada", "Cancelada"]);
    expect(transicionesDe("Cerrada")).toEqual([]);
  });
  it("asigna un técnico con la especialidad correcta", () => {
    const o = ok(asignar(ORDENES_INICIALES, "o1", "t4"));
    const x = o.find((y) => y.id === "o1")!;
    expect(x.estado).toBe("Asignada");
    expect(x.tecnicoId).toBe("t4");
    expect(x.historial.at(-1)?.texto).toBe("Asignada a Daniela Pinto");
  });
  it("rechaza técnicos sin la especialidad", () => {
    expect(asignar(ORDENES_INICIALES, "o1", "t2")).toEqual({ error: "Camila Orrego no tiene la especialidad neumático." });
  });
  it("respeta la capacidad máxima de órdenes activas", () => {
    let o = ORDENES_INICIALES;
    o = ok(asignar(o, "o1", "t1"));
    expect(cargaTecnico(o, "t1")).toBe(CAPACIDAD);
    const nueva = ok(crearOrden(o, { cliente: "Cliente Prueba", equipo: "Prensa P-1", tipo: "Mecánico", prioridad: "Normal", descripcion: "Revisión general del equipo" }));
    const r = asignar(nueva, nueva[0].id, "t1");
    expect(r).toHaveProperty("error");
    expect(tecnicosElegibles(nueva, nueva[0]).map((t) => t.id)).toEqual(["t3"]);
  });
  it("no se puede ejecutar sin técnico ni saltar etapas", () => {
    expect(cambiarEstado(ORDENES_INICIALES, "o1", "En ejecución")).toHaveProperty("error");
    expect(cambiarEstado(ORDENES_INICIALES, "o1", "Cerrada", "Informe suficientemente largo")).toHaveProperty("error");
  });
  it("cerrar exige informe y deja el historial", () => {
    expect(cambiarEstado(ORDENES_INICIALES, "o4", "Cerrada", "corto")).toHaveProperty("error");
    const o = ok(cambiarEstado(ORDENES_INICIALES, "o4", "Cerrada", "Sello reemplazado y prueba de presión correcta."));
    const x = o.find((y) => y.id === "o4")!;
    expect(x.estado).toBe("Cerrada");
    expect(x.informe).toMatch(/Sello reemplazado/);
  });
  it("devolver a pendiente libera al técnico", () => {
    const o = ok(cambiarEstado(ORDENES_INICIALES, "o2", "Pendiente"));
    expect(o.find((y) => y.id === "o2")?.tecnicoId).toBeNull();
    expect(cargaTecnico(o, "t2")).toBe(0);
  });
  it("valida la creación y resume por estado", () => {
    expect(crearOrden([], { cliente: "x", equipo: "y", tipo: "Mecánico", prioridad: "Normal", descripcion: "" })).toHaveProperty("error");
    expect(resumenPorEstado(ORDENES_INICIALES).reduce((a, r) => a + r.cantidad, 0)).toBe(6);
  });
});

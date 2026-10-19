import { describe, expect, it } from "vitest";
import { PAQUETES } from "./catalogo";
import { aParametros, conceptosDeLimite, cotizar, incluyeUnico, leerIdsComparar, leerSeleccion, textoResumen, type Seleccion } from "./cotizacion";

const base = PAQUETES[0];
const sel = (o: Partial<Seleccion> = {}): Seleccion => ({ paquete: base.id, modulos: [], infra: "", soporte: "", ...o });
const clp = (n: number) => `$${n}`;

describe("cotización referencial", () => {
  it("sin extras: neto = precio base, IVA 19 % y total", () => {
    const c = cotizar(sel())!;
    expect(c.neto).toBe(base.precio);
    expect(c.iva).toBe(Math.round(base.precio * 0.19));
    expect(c.total).toBe(c.neto + c.iva);
    expect(c.incompleta).toBe(false);
  });
  it("un módulo sin tarifa aprobada no suma y deja la cotización incompleta", () => {
    const m = base.modulos[0];
    const c = cotizar(sel({ modulos: [m] }))!;
    expect(c.neto).toBe(base.precio);
    expect(c.modulosPorCotizar.map((x) => x.id)).toEqual([m]);
    expect(c.incompleta).toBe(true);
  });
  it("suma los planes mensuales con precio y marca el empresarial como por cotizar", () => {
    const c = cotizar(sel({ infra: "infra-business", soporte: "care-plus" }))!;
    expect(c.mensualNeto).toBe(49900 + 119900);
    const e = cotizar(sel({ infra: "infra-empresarial", soporte: "care" }))!;
    expect(e.mensualNeto).toBe(59900);
    expect(e.incompleta).toBe(true);
  });
  it("devuelve null si el paquete no existe", () => expect(cotizar(sel({ paquete: "xx" }))).toBeNull());
  it("el resumen en texto distingue «Por cotizar» y trae el aviso de no vinculante", () => {
    const t = textoResumen(cotizar(sel({ modulos: [base.modulos[0]], infra: "infra-empresarial" }))!, clp);
    expect(t).toMatch(/Por cotizar/);
    expect(t).toMatch(/No es una oferta vinculante/);
    expect(t).toMatch(/Infraestructura Empresarial: Por cotizar/);
  });
});

describe("selección en la URL", () => {
  it("ida y vuelta", () => {
    const s = sel({ modulos: [base.modulos[0], base.modulos[1]], infra: "infra-web", soporte: "care" });
    expect(leerSeleccion(aParametros(s))).toEqual(s);
  });
  it("descarta ids inválidos, repetidos o módulos que el paquete no admite", () => {
    const p = new URLSearchParams({ paquete: base.id, modulos: `${base.modulos[0]},${base.modulos[0]},no-existe,pasarela-x`, infra: "zzz", soporte: "care" });
    const r = leerSeleccion(p);
    expect(r.modulos).toEqual([base.modulos[0]]);
    expect(r.infra).toBe("");
    expect(r.soporte).toBe("care");
    expect(leerSeleccion(new URLSearchParams({ paquete: "zzz" })).paquete).toBe("");
  });
});

describe("comparación", () => {
  it("limita a 4 paquetes válidos sin repetir", () => {
    const ids = PAQUETES.slice(0, 6).map((p) => p.id);
    expect(leerIdsComparar(new URLSearchParams({ ids: `${ids.join(",")},${ids[0]}` }))).toHaveLength(4);
    expect(leerIdsComparar(new URLSearchParams({ ids: "x,y" }))).toEqual([]);
  });
  it("calcula lo propio de cada paquete y la unión de límites", () => {
    const [a, b] = PAQUETES.slice(0, 2);
    const u = incluyeUnico([a, b]);
    for (const i of u.get(a.id)!) expect(b.incluye).not.toContain(i);
    expect(conceptosDeLimite([a, b]).length).toBeGreaterThanOrEqual(1);
  });
});

import { describe, expect, it } from "vitest";
import { FAMILIAS, LINEAS, MODULOS, NECESIDADES, PAQUETES } from "./catalogo";
import { MARCAS } from "./marcas";
import { EQUIVALENCIA_VIGENTE } from "./equivalenciaVigente";

/** Tabla de precios propuesta en el brief (netos, CLP). */
const PRECIOS: Record<string, number> = {
  "landing-captacion": 349000, "web-pyme": 649000, "corporativa-estandar": 949000, "corporativa-plus": 1290000,
  "catalogo-basico": 749000, "catalogo-avanzado": 1990000, "portal-comercial-especializado": 3490000,
  "ecommerce-esencial": 990000, "ecommerce-crecimiento": 1490000, "radio-esencial": 790000,
  "radio-profesional": 1990000, "portal-multimedia": 3490000, "agenda-online": 890000, "portal-clientes": 1490000,
  "panel-datos": 1290000, "plataforma-procesos": 1990000, "mvp-medida": 2490000, "rediseno-acotado": 490000,
  "integracion-api-simple": 390000,
};

describe("catálogo", () => {
  it("tiene 19 paquetes, 10 líneas y 5 familias", () => {
    expect(PAQUETES).toHaveLength(19);
    expect(LINEAS).toHaveLength(10);
    expect(FAMILIAS).toHaveLength(5);
  });

  it("coincide con la tabla de precios propuesta", () => {
    expect(Object.fromEntries(PAQUETES.map((p) => [p.id, p.precio]))).toEqual(PRECIOS);
  });

  it("tiene ids únicos y referencias válidas", () => {
    expect(new Set(PAQUETES.map((p) => p.id)).size).toBe(19);
    const lineas = new Set(LINEAS.map((l) => l.id));
    const familias = new Set(FAMILIAS.map((f) => f.id));
    const necesidades = new Set(NECESIDADES.map((n) => n.id));
    const modulos = new Set(MODULOS.map((m) => m.id));
    LINEAS.forEach((l) => expect(familias.has(l.familia)).toBe(true));
    PAQUETES.forEach((p) => {
      expect(lineas.has(p.linea), p.id).toBe(true);
      p.necesidades.forEach((n) => expect(necesidades.has(n), `${p.id}:${n}`).toBe(true));
      p.modulos.forEach((m) => expect(modulos.has(m), `${p.id}:${m}`).toBe(true));
    });
  });

  it("cada línea y cada familia tiene al menos un paquete", () => {
    LINEAS.forEach((l) => expect(PAQUETES.some((p) => p.linea === l.id), l.id).toBe(true));
    FAMILIAS.forEach((f) => expect(PAQUETES.some((p) => LINEAS.find((l) => l.id === p.linea)!.familia === f.id), f.id).toBe(true));
  });

  it("completa todos los campos de la ficha comercial", () => {
    PAQUETES.forEach((p) => {
      for (const campo of ["resumen", "publico", "problema", "resultado"] as const) expect(p[campo].length, `${p.id}.${campo}`).toBeGreaterThan(10);
      expect(p.incluye.length, p.id).toBeGreaterThan(0);
      expect(p.noIncluye.length, p.id).toBeGreaterThan(0);
      expect(p.limites.length, p.id).toBeGreaterThan(0);
      expect(p.costosExternos.length, p.id).toBeGreaterThan(0);
    });
  });

  it("los niveles superiores de una línea cuestan más y explican la diferencia", () => {
    for (const l of LINEAS) {
      const hermanos = PAQUETES.filter((p) => p.linea === l.id);
      hermanos.forEach((p, i) => {
        if (i === 0) return;
        expect(p.precio, p.id).toBeGreaterThan(hermanos[i - 1].precio);
        expect(p.diferenciaNivelAnterior, p.id).toBeTruthy();
      });
    }
  });

  it("no inventa precios de módulos ni límites", () => {
    MODULOS.forEach((m) => expect(m.precio, m.id).toBeNull());
  });

  it("asocia cada paquete a una marca ficticia distinta", () => {
    expect(MARCAS).toHaveLength(19);
    expect(new Set(PAQUETES.map((p) => p.demo)).size).toBe(19);
    PAQUETES.forEach((p) => expect(MARCAS.some((m) => m.id === p.demo), p.demo).toBe(true));
  });

  it("documenta la equivalencia con el catálogo vigente para todos los paquetes", () => {
    expect(Object.keys(EQUIVALENCIA_VIGENTE).sort()).toEqual(PAQUETES.map((p) => p.id).sort());
  });
});

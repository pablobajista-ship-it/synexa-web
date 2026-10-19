import { moduloPorId, paquetePorId } from "./catalogo";
import { infraPorId, soportePorId, type PlanInfra, type PlanSoporte } from "./infraSoporte";
import type { ModuloAdicional, Paquete } from "./tipos";

/** IVA vigente en Chile, usado solo para mostrar el total referencial. */
export const TASA_IVA = 0.19;

export interface Seleccion { paquete: string; modulos: string[]; infra: string; soporte: string }
export const SELECCION_VACIA: Seleccion = { paquete: "", modulos: [], infra: "", soporte: "" };

/** Lee la selección desde la URL descartando ids que no existen o módulos que el paquete no admite. */
export function leerSeleccion(params: URLSearchParams): Seleccion {
  const paquete = paquetePorId(params.get("paquete") ?? "");
  if (!paquete) return SELECCION_VACIA;
  const modulos = (params.get("modulos") ?? "").split(",").filter((m, i, a) => m && a.indexOf(m) === i && paquete.modulos.includes(m));
  const infra = infraPorId(params.get("infra") ?? "") ? params.get("infra")! : "";
  const soporte = soportePorId(params.get("soporte") ?? "") ? params.get("soporte")! : "";
  return { paquete: paquete.id, modulos, infra, soporte };
}

export function aParametros(s: Seleccion): URLSearchParams {
  const p = new URLSearchParams();
  if (s.paquete) p.set("paquete", s.paquete);
  if (s.modulos.length) p.set("modulos", s.modulos.join(","));
  if (s.infra) p.set("infra", s.infra);
  if (s.soporte) p.set("soporte", s.soporte);
  return p;
}

export interface Cotizacion {
  paquete: Paquete;
  /** Módulos con tarifa aprobada (suman al total). */
  modulosConPrecio: ModuloAdicional[];
  /** Módulos sin tarifa aprobada: no suman y se muestran «Por cotizar». */
  modulosPorCotizar: ModuloAdicional[];
  neto: number;
  iva: number;
  total: number;
  infra: PlanInfra | null;
  soporte: PlanSoporte | null;
  /** Suma de planes mensuales con precio (neto). */
  mensualNeto: number;
  /** Hay conceptos que aún no tienen valor definido. */
  incompleta: boolean;
  costosExternos: string[];
}

export function cotizar(s: Seleccion): Cotizacion | null {
  const paquete = paquetePorId(s.paquete);
  if (!paquete) return null;
  const modulos = s.modulos.map((id) => moduloPorId(id)).filter((m): m is ModuloAdicional => !!m && paquete.modulos.includes(m.id));
  const modulosConPrecio = modulos.filter((m) => m.precio !== null);
  const modulosPorCotizar = modulos.filter((m) => m.precio === null);
  const neto = paquete.precio + modulosConPrecio.reduce((a, m) => a + (m.precio ?? 0), 0);
  const iva = Math.round(neto * TASA_IVA);
  const infra = infraPorId(s.infra) ?? null;
  const soporte = soportePorId(s.soporte) ?? null;
  return {
    paquete, modulosConPrecio, modulosPorCotizar, neto, iva, total: neto + iva, infra, soporte,
    mensualNeto: (infra?.precio ?? 0) + (soporte?.precio ?? 0),
    incompleta: modulosPorCotizar.length > 0 || (!!infra && infra.precio === null),
    costosExternos: paquete.costosExternos,
  };
}

/** Texto plano del resumen, para copiar o compartir. */
export function textoResumen(c: Cotizacion, formato: (n: number) => string): string {
  const l: string[] = [
    `Resumen referencial SYNEXA — ${c.paquete.nombre}`,
    "",
    "PAGO POR PROYECTO (neto)",
    `- ${c.paquete.nombre}: ${formato(c.paquete.precio)}`,
    ...c.modulosConPrecio.map((m) => `- ${m.nombre}: ${formato(m.precio ?? 0)}`),
    ...c.modulosPorCotizar.map((m) => `- ${m.nombre}: Por cotizar`),
    `Subtotal neto: ${formato(c.neto)}${c.modulosPorCotizar.length ? " (sin los módulos por cotizar)" : ""}`,
    `IVA 19%: ${formato(c.iva)}`,
    `Total referencial: ${formato(c.total)}`,
    "",
    "MENSUAL (neto + IVA)",
    c.infra ? `- ${c.infra.nombre}: ${c.infra.precio === null ? "Por cotizar" : `${c.infra.desde ? "Desde " : ""}${formato(c.infra.precio)}`}` : "- Infraestructura: no seleccionada",
    c.soporte ? `- ${c.soporte.nombre}: ${c.soporte.desde ? "Desde " : ""}${formato(c.soporte.precio ?? 0)}` : "- Soporte: no seleccionado",
    "",
    "COSTOS DE TERCEROS (no incluidos)",
    ...c.costosExternos.map((x) => `- ${x}`),
    "",
    "Estimación referencial sujeta a validación del alcance. No es una oferta vinculante.",
  ];
  return l.join("\n");
}

/** Qué incluye cada paquete que los demás no: base de la comparación. */
export function incluyeUnico(paquetes: Paquete[]): Map<string, Set<string>> {
  const r = new Map<string, Set<string>>();
  for (const p of paquetes) {
    const otros = new Set(paquetes.filter((x) => x.id !== p.id).flatMap((x) => x.incluye));
    r.set(p.id, new Set(p.incluye.filter((i) => !otros.has(i))));
  }
  return r;
}

export function conceptosDeLimite(paquetes: Paquete[]): string[] {
  return [...new Set(paquetes.flatMap((p) => p.limites.map((l) => l.concepto)))];
}

export const MAX_COMPARAR = 4;
export function leerIdsComparar(params: URLSearchParams): string[] {
  return (params.get("ids") ?? "").split(",").filter((id, i, a) => id && a.indexOf(id) === i && paquetePorId(id)).slice(0, MAX_COMPARAR);
}

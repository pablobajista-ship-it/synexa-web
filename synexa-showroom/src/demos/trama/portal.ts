export const BASE = "/demos/trama";
export const CLAVE = "synexa:trama:estado";
export const C = { negro: "#161616", arena: "#c9b28a", arenaOscura: "#8a7650", hueso: "#f4f1ea" };

export interface Proyecto { id: string; nombre: string; lugar: string; anio: number; texto: string; imagen: string }
export const PROYECTOS: Proyecto[] = [
  { id: "duna", nombre: "Casa Duna", lugar: "Costa Norte", anio: 2025, texto: "Vivienda de hormigón y madera oscura frente a la playa.", imagen: "assets/trama/proyecto-4.webp" },
  { id: "cobertizo", nombre: "Centro Cobertizo", lugar: "Desierto Interior", anio: 2024, texto: "Equipamiento comunitario de volúmenes bajos y patios sombreados.", imagen: "assets/trama/proyecto-1.webp" },
  { id: "celosia", nombre: "Casa Celosía", lugar: "Valle Seco", anio: 2024, texto: "Cerramiento de listones que filtra la luz y protege los patios.", imagen: "assets/trama/proyecto-2.webp" },
  { id: "malla", nombre: "Oficinas Malla", lugar: "Dunas del Sur", anio: 2023, texto: "Edificio de oficinas con fachada de metal perforado.", imagen: "assets/trama/proyecto-3.webp" },
];

export const ETAPAS = ["Anteproyecto", "Permisos", "Proyecto de detalle", "Construcción", "Entrega"] as const;
export type EstadoEtapa = "completada" | "en curso" | "pendiente";
export const estadoEtapa = (indice: number, actual: number): EstadoEtapa => (indice < actual ? "completada" : indice === actual ? "en curso" : "pendiente");
export const porcentajeAvance = (actual: number, total = ETAPAS.length) => Math.round((Math.min(Math.max(actual, 0), total) / total) * 100);

export interface Documento { id: string; nombre: string; tipo: "Plano" | "Informe" | "Presupuesto" | "Acta"; fecha: string; version: string; requiereAprobacion: boolean }
export const DOCUMENTOS: Documento[] = [
  { id: "d1", nombre: "Planos de arquitectura — plantas y cortes", tipo: "Plano", fecha: "2026-09-12", version: "v3", requiereAprobacion: true },
  { id: "d2", nombre: "Informe de mecánica de suelos", tipo: "Informe", fecha: "2026-08-30", version: "v1", requiereAprobacion: false },
  { id: "d3", nombre: "Presupuesto de obra gruesa", tipo: "Presupuesto", fecha: "2026-09-20", version: "v2", requiereAprobacion: true },
  { id: "d4", nombre: "Acta de reunión de coordinación", tipo: "Acta", fecha: "2026-10-02", version: "v1", requiereAprobacion: false },
];

export interface Mensaje { id: string; de: "cliente" | "estudio"; texto: string; fecha: string }
export const MENSAJES_INICIALES: Mensaje[] = [
  { id: "m1", de: "estudio", texto: "Subimos la versión 3 de los planos con los ajustes de la terraza. Quedamos atentos a su aprobación.", fecha: "2026-09-12" },
  { id: "m2", de: "cliente", texto: "Gracias. ¿El presupuesto incluye el cierre perimetral?", fecha: "2026-09-14" },
];

export interface EstadoPortal { sesion: boolean; etapa: number; aprobados: string[]; mensajes: Mensaje[] }
export const ESTADO_INICIAL: EstadoPortal = { sesion: false, etapa: 2, aprobados: [], mensajes: MENSAJES_INICIALES };

export const CLIENTE_DEMO = { nombre: "Familia Rojas Ibáñez", proyecto: "Casa Duna", ubicacion: "Costa Norte (ficticio)" };

/** Solo se aprueba un documento que lo requiere y que aún no fue aprobado. */
export const puedeAprobar = (d: Documento, aprobados: string[]) => d.requiereAprobacion && !aprobados.includes(d.id);
export const pendientesAprobacion = (aprobados: string[]) => DOCUMENTOS.filter((d) => puedeAprobar(d, aprobados)).length;

export function validarMensaje(texto: string): string | null {
  const t = texto.trim();
  if (!t) return "Escribe un mensaje.";
  if (t.length > 500) return "El mensaje no puede superar los 500 caracteres.";
  return null;
}

export const fechaCorta = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("es-CL", { day: "numeric", month: "short", year: "numeric" });

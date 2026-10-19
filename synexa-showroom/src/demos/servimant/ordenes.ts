export const BASE = "/demos/servimant";
export const CLAVE = "synexa:servimant:ordenes";
export const C = { marino: "#0b1f44", naranja: "#f26a1b", naranjaBtn: "#c2490a", gris: "#d6dbe3", fondo: "#f3f5f8" };

export const ESTADOS = ["Pendiente", "Asignada", "En ejecución", "En revisión", "Cerrada", "Cancelada"] as const;
export type EstadoOrden = (typeof ESTADOS)[number];
export const TIPOS = ["Mecánico", "Eléctrico", "Neumático"] as const;
export type TipoTrabajo = (typeof TIPOS)[number];
export const PRIORIDADES = ["Normal", "Alta", "Urgente"] as const;
export type Prioridad = (typeof PRIORIDADES)[number];

export interface Tecnico { id: string; nombre: string; especialidades: TipoTrabajo[]; foto?: string }
export const TECNICOS: Tecnico[] = [
  { id: "t1", nombre: "Matías Fuentes", especialidades: ["Mecánico", "Neumático"], foto: "assets/servimant/tecnico-1.webp" },
  { id: "t2", nombre: "Camila Orrego", especialidades: ["Eléctrico"], foto: "assets/servimant/tecnico-2.webp" },
  { id: "t3", nombre: "Joaquín Salas", especialidades: ["Mecánico"] },
  { id: "t4", nombre: "Daniela Pinto", especialidades: ["Neumático", "Eléctrico"] },
];
/** Máximo de órdenes activas (asignadas o en ejecución) por técnico. */
export const CAPACIDAD = 2;

export interface Evento { fecha: string; texto: string }
export interface Orden {
  id: string; codigo: string; cliente: string; equipo: string; tipo: TipoTrabajo; prioridad: Prioridad; descripcion: string;
  estado: EstadoOrden; tecnicoId: string | null; informe: string; historial: Evento[];
}

const TRANSICIONES: Record<EstadoOrden, EstadoOrden[]> = {
  Pendiente: ["Asignada", "Cancelada"],
  Asignada: ["En ejecución", "Pendiente", "Cancelada"],
  "En ejecución": ["En revisión"],
  "En revisión": ["Cerrada", "En ejecución"],
  Cerrada: [],
  Cancelada: [],
};
export const transicionesDe = (e: EstadoOrden) => TRANSICIONES[e];
export const esActiva = (o: Orden) => o.estado === "Asignada" || o.estado === "En ejecución";
export const cargaTecnico = (ordenes: Orden[], id: string) => ordenes.filter((o) => o.tecnicoId === id && esActiva(o)).length;
export const tecnicoPorId = (id: string | null) => TECNICOS.find((t) => t.id === id);

/** Técnicos que pueden tomar esta orden: misma especialidad y capacidad libre. */
export function tecnicosElegibles(ordenes: Orden[], o: Orden): Tecnico[] {
  return TECNICOS.filter((t) => t.especialidades.includes(o.tipo) && (cargaTecnico(ordenes, t.id) < CAPACIDAD || t.id === o.tecnicoId));
}

const ev = (fecha: string, texto: string): Evento => ({ fecha, texto });
const base = (n: number, cliente: string, equipo: string, tipo: TipoTrabajo, prioridad: Prioridad, descripcion: string, estado: EstadoOrden, tecnicoId: string | null, historial: Evento[], informe = ""): Orden =>
  ({ id: `o${n}`, codigo: `OT-${String(100 + n)}`, cliente, equipo, tipo, prioridad, descripcion, estado, tecnicoId, informe, historial });
export const ORDENES_INICIALES: Orden[] = [
  base(1, "Planta Envasadora Norte", "Compresor de tornillo C-12", "Neumático", "Urgente", "Pérdida de presión en la línea principal.", "Pendiente", null, [ev("2026-10-15 08:10", "Orden creada")]),
  base(2, "Frigorífico Altamar", "Tablero de control TC-3", "Eléctrico", "Alta", "Disparos intermitentes del térmico general.", "Asignada", "t2", [ev("2026-10-14 16:40", "Orden creada"), ev("2026-10-14 16:55", "Asignada a Camila Orrego")]),
  base(3, "Molinera del Valle", "Motor de molino M-2", "Mecánico", "Normal", "Cambio de rodamientos y alineación.", "En ejecución", "t1", [ev("2026-10-13 09:00", "Orden creada"), ev("2026-10-13 09:20", "Asignada a Matías Fuentes"), ev("2026-10-14 08:30", "Pasa a En ejecución")]),
  base(4, "Textil Andes", "Bomba de proceso B-7", "Mecánico", "Alta", "Sello mecánico con filtración.", "En revisión", "t3", [ev("2026-10-10 10:00", "Orden creada"), ev("2026-10-10 10:15", "Asignada a Joaquín Salas"), ev("2026-10-11 09:00", "Pasa a En ejecución"), ev("2026-10-12 17:30", "Pasa a En revisión")]),
  base(5, "Planta Envasadora Norte", "Línea neumática L-4", "Neumático", "Normal", "Revisión preventiva trimestral.", "Cerrada", "t4", [ev("2026-10-01 09:00", "Orden creada"), ev("2026-10-01 09:10", "Asignada a Daniela Pinto"), ev("2026-10-02 08:00", "Pasa a En ejecución"), ev("2026-10-02 15:00", "Pasa a En revisión"), ev("2026-10-03 09:00", "Cerrada con informe")], "Se reemplazaron dos mangueras y se calibraron las válvulas. Sin hallazgos adicionales."),
  base(6, "Frigorífico Altamar", "Cámara de frío CF-1", "Eléctrico", "Normal", "Cotización de cambio de luminarias.", "Cancelada", null, [ev("2026-10-05 11:00", "Orden creada"), ev("2026-10-06 09:00", "Cancelada por el cliente")]),
];

const ahora = () => new Date().toISOString().slice(0, 16).replace("T", " ");
type R = { ordenes: Orden[] } | { error: string };
const mapear = (ordenes: Orden[], id: string, f: (o: Orden) => Orden) => ordenes.map((o) => (o.id === id ? f(o) : o));

export function crearOrden(ordenes: Orden[], d: { cliente: string; equipo: string; tipo: TipoTrabajo; prioridad: Prioridad; descripcion: string }): R {
  if (d.cliente.trim().length < 3) return { error: "Escribe el nombre del cliente." };
  if (d.equipo.trim().length < 3) return { error: "Indica el equipo a intervenir." };
  if (d.descripcion.trim().length < 10) return { error: "Describe el trabajo con al menos 10 caracteres." };
  const n = ordenes.length + 1;
  const o: Orden = { id: `o${Date.now()}`, codigo: `OT-${100 + n}`, ...d, cliente: d.cliente.trim(), equipo: d.equipo.trim(), descripcion: d.descripcion.trim(), estado: "Pendiente", tecnicoId: null, informe: "", historial: [ev(ahora(), "Orden creada")] };
  return { ordenes: [o, ...ordenes] };
}

export function asignar(ordenes: Orden[], id: string, tecnicoId: string): R {
  const o = ordenes.find((x) => x.id === id);
  const t = tecnicoPorId(tecnicoId);
  if (!o || !t) return { error: "Elige un técnico." };
  if (o.estado !== "Pendiente" && o.estado !== "Asignada") return { error: "Solo se puede asignar una orden pendiente o asignada." };
  if (!t.especialidades.includes(o.tipo)) return { error: `${t.nombre} no tiene la especialidad ${o.tipo.toLowerCase()}.` };
  if (t.id !== o.tecnicoId && cargaTecnico(ordenes, t.id) >= CAPACIDAD) return { error: `${t.nombre} ya tiene ${CAPACIDAD} órdenes activas.` };
  return { ordenes: mapear(ordenes, id, (x) => ({ ...x, estado: "Asignada", tecnicoId: t.id, historial: [...x.historial, ev(ahora(), `Asignada a ${t.nombre}`)] })) };
}

export function cambiarEstado(ordenes: Orden[], id: string, a: EstadoOrden, informe = ""): R {
  const o = ordenes.find((x) => x.id === id);
  if (!o) return { error: "La orden no existe." };
  if (!transicionesDe(o.estado).includes(a)) return { error: `Una orden ${o.estado.toLowerCase()} no puede pasar a ${a.toLowerCase()}.` };
  if (a === "En ejecución" && !o.tecnicoId) return { error: "Asigna un técnico antes de iniciar la ejecución." };
  if (a === "Cerrada" && informe.trim().length < 10) return { error: "Para cerrar la orden escribe un informe de al menos 10 caracteres." };
  return {
    ordenes: mapear(ordenes, id, (x) => ({
      ...x, estado: a, tecnicoId: a === "Pendiente" || a === "Cancelada" ? null : x.tecnicoId, informe: a === "Cerrada" ? informe.trim() : x.informe,
      historial: [...x.historial, ev(ahora(), a === "Cerrada" ? "Cerrada con informe" : a === "Pendiente" ? "Vuelve a Pendiente (sin técnico)" : `Pasa a ${a}`)],
    })),
  };
}

export function resumenPorEstado(ordenes: Orden[]) {
  return ESTADOS.map((e) => ({ estado: e, cantidad: ordenes.filter((o) => o.estado === e).length }));
}

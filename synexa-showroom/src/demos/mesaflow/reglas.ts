export const BASE = "/demos/mesaflow";
export const CLAVE = "synexa:mesaflow:estado";
export const C = { marino: "#0b1f44", turquesa: "#14b8a6", turquesaOscuro: "#0f766e", fondo: "#f1f5f9" };

export type Rol = "solicitante" | "agente" | "admin";
export const ROLES: { id: Rol; nombre: string; usuario: string }[] = [
  { id: "solicitante", nombre: "Solicitante", usuario: "Valentina Ruiz" },
  { id: "agente", nombre: "Agente de soporte", usuario: "Tomás Lagos" },
  { id: "admin", nombre: "Administrador", usuario: "Admin MesaFlow" },
];
export const AGENTES = ["Tomás Lagos", "Paula Díaz"];

export const ESTADOS = ["Nuevo", "En atención", "En espera", "Resuelto", "Cerrado"] as const;
export type EstadoTicket = (typeof ESTADOS)[number];
export const PRIORIDADES = ["Baja", "Media", "Alta", "Crítica"] as const;
export type Prioridad = (typeof PRIORIDADES)[number];
export const CATEGORIAS = ["Acceso y cuentas", "Equipos", "Software", "Red"] as const;
export type Categoria = (typeof CATEGORIAS)[number];

/** Horas máximas para resolver según prioridad (reglas de ejemplo de la demostración). */
export const SLA_HORAS: Record<Prioridad, number> = { Crítica: 4, Alta: 8, Media: 24, Baja: 72 };

export interface Comentario { autor: string; rol: Rol; texto: string }
export interface Ticket {
  id: string; codigo: string; titulo: string; descripcion: string; categoria: Categoria; prioridad: Prioridad; estado: EstadoTicket;
  solicitante: string; agente: string | null; creadoEn: number; resolucion: string; comentarios: Comentario[];
}
export interface Estado { tickets: Ticket[]; reloj: number; rol: Rol }

const t = (n: number, titulo: string, categoria: Categoria, prioridad: Prioridad, estado: EstadoTicket, solicitante: string, agente: string | null, creadoEn: number, descripcion: string, resolucion = "", comentarios: Comentario[] = []): Ticket =>
  ({ id: `t${n}`, codigo: `TK-${200 + n}`, titulo, descripcion, categoria, prioridad, estado, solicitante, agente, creadoEn, resolucion, comentarios });
export const RELOJ_INICIAL = 48;
export const TICKETS_INICIALES: Ticket[] = [
  t(1, "No puedo entrar al correo corporativo", "Acceso y cuentas", "Alta", "Nuevo", "Valentina Ruiz", null, 44, "Me pide un código que no recibo."),
  t(2, "Impresora del piso 2 no imprime", "Equipos", "Media", "En atención", "Valentina Ruiz", "Tomás Lagos", 30, "Aparece fuera de línea desde la mañana.", "", [{ autor: "Tomás Lagos", rol: "agente", texto: "Revisando el controlador en el servidor de impresión." }]),
  t(3, "Se cayó la red de la sucursal norte", "Red", "Crítica", "En atención", "Marcos Vera", "Paula Díaz", 46, "Sin conexión a internet ni a los sistemas internos."),
  t(4, "Instalar el programa de diseño", "Software", "Baja", "En espera", "Valentina Ruiz", "Tomás Lagos", 20, "Necesito la licencia para el proyecto nuevo.", "", [{ autor: "Tomás Lagos", rol: "agente", texto: "En espera de la aprobación de la licencia." }]),
  t(5, "Notebook con pantalla rota", "Equipos", "Media", "Resuelto", "Valentina Ruiz", "Paula Díaz", 10, "Se cayó al suelo.", "Se entregó un equipo de reemplazo y se retiró el dañado."),
  t(6, "Cambio de clave de la VPN", "Acceso y cuentas", "Baja", "Cerrado", "Marcos Vera", "Tomás Lagos", 2, "Olvidé mi clave.", "Clave restablecida y verificada con el usuario."),
];
export const ESTADO_INICIAL: Estado = { tickets: TICKETS_INICIALES, reloj: RELOJ_INICIAL, rol: "solicitante" };

export const usuarioDe = (rol: Rol) => ROLES.find((r) => r.id === rol)!.usuario;
export const esAbierto = (x: Ticket) => x.estado !== "Resuelto" && x.estado !== "Cerrado";

/** El solicitante solo ve sus tickets; agentes y administradores ven todos. */
export const visibles = (tickets: Ticket[], rol: Rol) => (rol === "solicitante" ? tickets.filter((x) => x.solicitante === usuarioDe("solicitante")) : tickets);

export type Semaforo = "En plazo" | "Por vencer" | "Vencido" | "No aplica";
export function semaforo(x: Ticket, reloj: number): Semaforo {
  if (!esAbierto(x)) return "No aplica";
  const usado = reloj - x.creadoEn;
  const limite = SLA_HORAS[x.prioridad];
  return usado > limite ? "Vencido" : usado >= limite * 0.75 ? "Por vencer" : "En plazo";
}
export const horasRestantes = (x: Ticket, reloj: number) => SLA_HORAS[x.prioridad] - (reloj - x.creadoEn);

/** Estados a los que puede pasar el ticket según el rol (no incluye validaciones de datos). */
export function destinosPermitidos(x: Ticket, rol: Rol): EstadoTicket[] {
  const base: Record<EstadoTicket, EstadoTicket[]> = { Nuevo: ["En atención"], "En atención": ["En espera", "Resuelto"], "En espera": ["En atención"], Resuelto: ["Cerrado", "En atención"], Cerrado: [] };
  const posibles = base[x.estado];
  if (rol === "solicitante") return x.estado === "Resuelto" ? posibles : [];
  if (rol === "agente") return posibles.filter((d) => d !== "Cerrado");
  return posibles;
}

type R = { estado: Estado } | { error: string };
const mapear = (e: Estado, id: string, f: (x: Ticket) => Ticket): Estado => ({ ...e, tickets: e.tickets.map((x) => (x.id === id ? f(x) : x)) });

export function crearTicket(e: Estado, d: { titulo: string; descripcion: string; categoria: Categoria; prioridad: Prioridad }): R {
  if (e.rol !== "solicitante") return { error: "Solo un solicitante puede abrir tickets." };
  if (d.titulo.trim().length < 5) return { error: "El título debe tener al menos 5 caracteres." };
  if (d.descripcion.trim().length < 10) return { error: "Describe el problema con al menos 10 caracteres." };
  const n = e.tickets.length + 1;
  const nuevo: Ticket = { id: `t${Date.now()}`, codigo: `TK-${200 + n}`, titulo: d.titulo.trim(), descripcion: d.descripcion.trim(), categoria: d.categoria, prioridad: d.prioridad, estado: "Nuevo", solicitante: usuarioDe("solicitante"), agente: null, creadoEn: e.reloj, resolucion: "", comentarios: [] };
  return { estado: { ...e, tickets: [nuevo, ...e.tickets] } };
}

export function cambiarEstado(e: Estado, id: string, a: EstadoTicket, resolucion = ""): R {
  const x = e.tickets.find((y) => y.id === id);
  if (!x) return { error: "El ticket no existe." };
  if (!destinosPermitidos(x, e.rol).includes(a)) return { error: `Con el rol ${ROLES.find((r) => r.id === e.rol)!.nombre.toLowerCase()} no puedes pasar un ticket ${x.estado.toLowerCase()} a ${a.toLowerCase()}.` };
  if (a === "Resuelto" && resolucion.trim().length < 10) return { error: "Para resolver escribe cómo se resolvió (al menos 10 caracteres)." };
  const yo = usuarioDe(e.rol);
  return {
    estado: mapear(e, id, (y) => ({
      ...y, estado: a,
      agente: a === "En atención" && !y.agente && e.rol !== "solicitante" ? yo : y.agente,
      resolucion: a === "Resuelto" ? resolucion.trim() : y.resolucion,
    })),
  };
}

export function comentar(e: Estado, id: string, texto: string): R {
  const x = e.tickets.find((y) => y.id === id);
  if (!x) return { error: "El ticket no existe." };
  if (e.rol === "solicitante" && x.solicitante !== usuarioDe("solicitante")) return { error: "Solo puedes comentar tus propios tickets." };
  if (x.estado === "Cerrado") return { error: "Un ticket cerrado no admite comentarios." };
  if (!texto.trim()) return { error: "Escribe un comentario." };
  return { estado: mapear(e, id, (y) => ({ ...y, comentarios: [...y.comentarios, { autor: usuarioDe(e.rol), rol: e.rol, texto: texto.trim() }] })) };
}

export function reasignar(e: Estado, id: string, agente: string): R {
  if (e.rol !== "admin") return { error: "Solo un administrador puede reasignar tickets." };
  const x = e.tickets.find((y) => y.id === id);
  if (!x || !esAbierto(x)) return { error: "Solo se reasignan tickets abiertos." };
  if (!AGENTES.includes(agente)) return { error: "Elige un agente." };
  return { estado: mapear(e, id, (y) => ({ ...y, agente })) };
}

export function cambiarPrioridad(e: Estado, id: string, p: Prioridad): R {
  if (e.rol !== "admin") return { error: "Solo un administrador puede cambiar la prioridad." };
  return { estado: mapear(e, id, (y) => ({ ...y, prioridad: p })) };
}

export const avanzarReloj = (e: Estado, horas: number): Estado => ({ ...e, reloj: e.reloj + horas });

export function metricas(tickets: Ticket[], reloj: number) {
  const abiertos = tickets.filter(esAbierto);
  return {
    total: tickets.length,
    abiertos: abiertos.length,
    vencidos: abiertos.filter((x) => semaforo(x, reloj) === "Vencido").length,
    sinAgente: abiertos.filter((x) => !x.agente).length,
    porEstado: ESTADOS.map((s) => ({ estado: s, cantidad: tickets.filter((x) => x.estado === s).length })),
    cumplimiento: abiertos.length ? Math.round(((abiertos.length - abiertos.filter((x) => semaforo(x, reloj) === "Vencido").length) / abiertos.length) * 100) : 100,
  };
}

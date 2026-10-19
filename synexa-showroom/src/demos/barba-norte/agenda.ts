/** Lógica pura de la agenda de Barba Norte. Sin React: se prueba con fechas fijas. */

export const BASE = "/demos/barba-norte";
export const C = { negro: "#121212", carbon: "#1c1c1c", beige: "#e9dfcb", cobre: "#96592a", cobreClaro: "#d9955a" };
export const PASO_MIN = 30;
export const APERTURA = 10; // hora
export const CIERRE = 20;
/** Días abiertos (0 = domingo): martes a sábado. */
export const DIAS_ABIERTOS = [2, 3, 4, 5, 6];

export const SERVICIOS = [
  { id: "corte", nombre: "Corte clásico", min: 30, precio: 12000, texto: "Corte a tijera o máquina, con lavado y peinado." },
  { id: "barba", nombre: "Perfilado de barba", min: 30, precio: 9000, texto: "Toalla caliente, navaja y aceite para la barba." },
  { id: "combo", nombre: "Corte + barba", min: 60, precio: 19000, texto: "El servicio completo, en una sola sesión." },
  { id: "afeitado", nombre: "Afeitado tradicional", min: 30, precio: 11000, texto: "Navaja, espuma caliente y bálsamo posafeitado." },
] as const;

export const BARBEROS = [
  { id: "diego", nombre: "Diego Fuentes", especialidad: "Cortes clásicos y degradados", imagen: "assets/barba-norte/barbero-1.webp", alt: "Retrato de Diego Fuentes con delantal negro" },
  { id: "tomas", nombre: "Tomás Rivera", especialidad: "Pompadour y peinados", imagen: "assets/barba-norte/barbero-2.webp", alt: "Retrato de Tomás Rivera sonriendo" },
  { id: "andrea", nombre: "Andrea Molina", especialidad: "Barba y afeitado tradicional", imagen: "assets/barba-norte/barbero-3.webp", alt: "Retrato de Andrea Molina con tatuajes en los brazos" },
] as const;

export interface Reserva { id: string; codigo: string; servicio: string; barbero: string; fecha: string; hora: string; nombre: string; telefono: string }

export const servicioPorId = (id: string) => SERVICIOS.find((s) => s.id === id);
export const barberoPorId = (id: string) => BARBEROS.find((b) => b.id === id);

export const aISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const desdeISO = (iso: string) => new Date(`${iso}T12:00:00`);
export const minutos = (hhmm: string) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3));
export const hhmm = (min: number) => `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

export const estaAbierto = (iso: string) => DIAS_ABIERTOS.includes(desdeISO(iso).getDay());

/** Próximos `n` días (incluye hoy) con su estado de apertura. */
export function proximosDias(hoy: Date, n = 14) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + i, 12);
    const iso = aISO(d);
    return { iso, abierto: estaAbierto(iso) };
  });
}

/** Ocupación simulada y determinista de otros clientes (≈ 30 % de los bloques). */
export function ocupadoSimulado(barbero: string, fecha: string, min: number): boolean {
  let h = 2166136261;
  for (const ch of `${barbero}|${fecha}|${min}`) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return ((h >>> 0) % 100) < 30;
}

const ocupadoReal = (reservas: Reserva[], barbero: string, fecha: string, min: number) =>
  reservas.some((r) => {
    if (r.barbero !== barbero || r.fecha !== fecha) return false;
    const ini = minutos(r.hora);
    const dur = servicioPorId(r.servicio)?.min ?? PASO_MIN;
    return min >= ini && min < ini + dur;
  });

export const bloqueOcupado = (reservas: Reserva[], barbero: string, fecha: string, min: number) =>
  ocupadoSimulado(barbero, fecha, min) || ocupadoReal(reservas, barbero, fecha, min);

/** Horas de inicio disponibles para un servicio de `duracion` minutos. */
export function horasDisponibles(reservas: Reserva[], barbero: string, fecha: string, duracion: number, ahora: Date): string[] {
  if (!estaAbierto(fecha)) return [];
  const hoyISO = aISO(ahora);
  if (fecha < hoyISO) return [];
  const minAhora = ahora.getHours() * 60 + ahora.getMinutes();
  const res: string[] = [];
  for (let ini = APERTURA * 60; ini + duracion <= CIERRE * 60; ini += PASO_MIN) {
    if (fecha === hoyISO && ini <= minAhora) continue;
    let libre = true;
    for (let m = ini; m < ini + duracion; m += PASO_MIN) if (bloqueOcupado(reservas, barbero, fecha, m)) { libre = false; break; }
    if (libre) res.push(hhmm(ini));
  }
  return res;
}

export const codigoReserva = (n: number) => `BN-${String(n).padStart(4, "0")}`;
export const clp = (n: number) => `$${n.toLocaleString("es-CL")}`;
export const fechaLarga = (iso: string) => desdeISO(iso).toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" });

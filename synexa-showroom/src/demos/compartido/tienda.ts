/**
 * Lógica pura de comercio electrónico de las demostraciones (Huella Viva y Rango).
 * Sin React: se prueba con datos fijos. No procesa pagos ni toca servicios externos.
 */

export interface Linea {
  /** Clave única de la línea: producto + variante. */
  clave: string;
  productoId: string;
  cantidad: number;
  talla?: string;
  color?: string;
}

export interface Cupon {
  codigo: string;
  tipo: "pct" | "monto";
  valor: number;
  /** Subtotal mínimo para aplicarlo. */
  minimo?: number;
  descripcion: string;
}

export interface Totales {
  subtotal: number;
  descuento: number;
  envio: number;
  total: number;
}

export type EstadoPedido = "pendiente" | "pagado" | "preparando" | "enviado" | "entregado" | "cancelado";
export const ESTADOS: EstadoPedido[] = ["pendiente", "pagado", "preparando", "enviado", "entregado", "cancelado"];
export const ETIQUETA_ESTADO: Record<EstadoPedido, string> = {
  pendiente: "Pendiente de pago", pagado: "Pagado (simulado)", preparando: "Preparando", enviado: "Enviado", entregado: "Entregado", cancelado: "Cancelado",
};
/** Transiciones válidas del flujo de un pedido. */
export const SIGUIENTES: Record<EstadoPedido, EstadoPedido[]> = {
  pendiente: ["pagado", "cancelado"], pagado: ["preparando", "cancelado"], preparando: ["enviado", "cancelado"], enviado: ["entregado"], entregado: [], cancelado: [],
};

export interface LineaPedido { productoId: string; nombre: string; cantidad: number; precio: number; talla?: string; color?: string }
export interface Pedido {
  id: string;
  numero: string;
  fecha: string; // ISO
  cliente: { nombre: string; correo: string; direccion: string };
  lineas: LineaPedido[];
  totales: Totales;
  cupon?: string;
  estado: EstadoPedido;
}

export const claveLinea = (productoId: string, talla?: string, color?: string) => [productoId, talla ?? "", color ?? ""].join("|");

export function agregarLinea(lineas: Linea[], productoId: string, cantidad = 1, talla?: string, color?: string, maximo = 10): Linea[] {
  const clave = claveLinea(productoId, talla, color);
  const existe = lineas.find((l) => l.clave === clave);
  if (existe) return lineas.map((l) => (l.clave === clave ? { ...l, cantidad: Math.min(maximo, l.cantidad + cantidad) } : l));
  return [...lineas, { clave, productoId, cantidad: Math.min(maximo, Math.max(1, cantidad)), talla, color }];
}

export function cambiarCantidad(lineas: Linea[], clave: string, cantidad: number, maximo = 10): Linea[] {
  if (cantidad <= 0) return lineas.filter((l) => l.clave !== clave);
  return lineas.map((l) => (l.clave === clave ? { ...l, cantidad: Math.min(maximo, Math.floor(cantidad)) } : l));
}

export const cantidadTotal = (lineas: Linea[]) => lineas.reduce((a, l) => a + l.cantidad, 0);

export interface ReglasEnvio { gratisDesde: number; costo: number }

/** Descuento de un cupón sobre un subtotal; 0 si no aplica. */
export function descuentoCupon(subtotal: number, cupon?: Cupon): number {
  if (!cupon) return 0;
  if (cupon.minimo && subtotal < cupon.minimo) return 0;
  const bruto = cupon.tipo === "pct" ? Math.round((subtotal * cupon.valor) / 100) : cupon.valor;
  return Math.min(subtotal, bruto);
}

export function validarCupon(codigo: string, cupones: Cupon[], subtotal: number): { ok: true; cupon: Cupon } | { ok: false; motivo: string } {
  const c = cupones.find((x) => x.codigo === codigo.trim().toUpperCase());
  if (!c) return { ok: false, motivo: "Ese cupón no existe." };
  if (c.minimo && subtotal < c.minimo) return { ok: false, motivo: `Este cupón requiere una compra mínima de $${c.minimo.toLocaleString("es-CL")}.` };
  return { ok: true, cupon: c };
}

export function calcularTotales(lineas: Linea[], precioDe: (id: string) => number, envio: ReglasEnvio, cupon?: Cupon): Totales {
  const subtotal = lineas.reduce((a, l) => a + precioDe(l.productoId) * l.cantidad, 0);
  const descuento = descuentoCupon(subtotal, cupon);
  const base = subtotal - descuento;
  const costoEnvio = lineas.length === 0 || base >= envio.gratisDesde ? 0 : envio.costo;
  return { subtotal, descuento, envio: costoEnvio, total: base + costoEnvio };
}

export const numeroPedido = (prefijo: string, n: number) => `${prefijo}-${String(n).padStart(4, "0")}`;

export const puedePasar = (de: EstadoPedido, a: EstadoPedido) => SIGUIENTES[de].includes(a);

/** Resumen de ventas: solo cuentan los pedidos pagados o posteriores (no cancelados ni pendientes). */
export function resumenVentas(pedidos: Pedido[]) {
  const validos = pedidos.filter((p) => p.estado !== "cancelado" && p.estado !== "pendiente");
  const ingresos = validos.reduce((a, p) => a + p.totales.total, 0);
  const unidades = validos.reduce((a, p) => a + p.lineas.reduce((x, l) => x + l.cantidad, 0), 0);
  return { pedidos: validos.length, ingresos, unidades, ticketMedio: validos.length ? Math.round(ingresos / validos.length) : 0 };
}

export const validarCheckout = (c: { nombre: string; correo: string; direccion: string }) => {
  const e: Partial<Record<"nombre" | "correo" | "direccion", string>> = {};
  if (c.nombre.trim().length < 2) e.nombre = "Escribe tu nombre.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.correo)) e.correo = "Ingresa un correo válido.";
  if (c.direccion.trim().length < 5) e.direccion = "Escribe una dirección de despacho (ficticia).";
  return e;
};

const iso10 = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Ingresos por día de los últimos `dias` días (incluye hoy). Solo pedidos pagados o posteriores. */
export function ventasPorDia(pedidos: Pedido[], hoy: Date, dias = 7): { dia: string; ingresos: number }[] {
  const validos = pedidos.filter((p) => p.estado !== "cancelado" && p.estado !== "pendiente");
  return Array.from({ length: dias }, (_, i) => {
    const d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - (dias - 1 - i), 12);
    const clave = iso10(d);
    return { dia: clave, ingresos: validos.filter((p) => iso10(new Date(p.fecha)) === clave).reduce((a, p) => a + p.totales.total, 0) };
  });
}

/** Productos más vendidos por unidades. */
export function topProductos(pedidos: Pedido[], n = 5): { nombre: string; unidades: number }[] {
  const mapa = new Map<string, number>();
  for (const p of pedidos.filter((x) => x.estado !== "cancelado" && x.estado !== "pendiente")) {
    for (const l of p.lineas) mapa.set(l.nombre, (mapa.get(l.nombre) ?? 0) + l.cantidad);
  }
  return [...mapa.entries()].map(([nombre, unidades]) => ({ nombre, unidades })).sort((a, b) => b.unidades - a.unidades || a.nombre.localeCompare(b.nombre)).slice(0, n);
}

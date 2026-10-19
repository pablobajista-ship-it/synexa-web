export const BASE = "/demos/puentesync";
export const CLAVE = "synexa:puentesync:estado";
export const C = { marino: "#0b1f44", turquesa: "#14b8a6", turquesaOscuro: "#0f766e", fondo: "#f1f5f9" };

export type EstadoPedido = "pendiente" | "sincronizado" | "error";
export interface Pedido { id: string; numero: string; cliente: string; rut: string; monto: number; estado: EstadoPedido; motivo: string; reintentable: boolean; folio: number | null }
export interface Documento { folio: number; pedido: string; cliente: string; rut: string; neto: number; iva: number; total: number }
export interface Registro { id: number; nivel: "info" | "ok" | "error"; texto: string }
export interface Estado { pedidos: Pedido[]; documentos: Documento[]; destinoCaido: boolean; registro: Registro[]; proximoFolio: number }

/** Dígito verificador chileno (módulo 11). Acepta puntos y guion. */
export function validarRut(entrada: string): boolean {
  const limpio = entrada.replace(/[.\s]/g, "").toUpperCase();
  const m = /^(\d{7,8})-?([\dK])$/.exec(limpio);
  if (!m) return false;
  let suma = 0;
  let f = 2;
  for (const d of m[1].split("").reverse()) { suma += Number(d) * f; f = f === 7 ? 2 : f + 1; }
  const r = 11 - (suma % 11);
  const dv = r === 11 ? "0" : r === 10 ? "K" : String(r);
  return dv === m[2];
}

const p = (n: number, cliente: string, rut: string, monto: number): Pedido => ({ id: `p${n}`, numero: `PED-${3000 + n}`, cliente, rut, monto, estado: "pendiente", motivo: "", reintentable: false, folio: null });
export const PEDIDOS_INICIALES: Pedido[] = [
  p(1, "Ferretería Los Aromos", "11.111.111-1", 59_990),
  p(2, "Librería Rayuela", "12.345.678-5", 124_500),
  p(3, "Cafetería El Pasaje", "", 38_200),
  p(4, "Taller Mecánico Rivas", "22.222.222-2", 214_990),
  p(5, "Panadería La Espiga", "12.345.678-9", 17_800),
  p(6, "Estudio Contable Norte", "7.654.321-6", 89_000),
];
export const ESTADO_INICIAL: Estado = { pedidos: PEDIDOS_INICIALES, documentos: [], destinoCaido: false, registro: [], proximoFolio: 5001 };

export function validarPedido(x: Pick<Pedido, "rut" | "monto" | "cliente">): string | null {
  if (x.cliente.trim().length < 3) return "Falta el nombre del cliente.";
  if (!x.rut.trim()) return "Falta el RUT del cliente.";
  if (!validarRut(x.rut)) return "El RUT no es válido (dígito verificador incorrecto).";
  if (!(x.monto > 0)) return "El monto debe ser mayor que cero.";
  return null;
}

/** Transformación entre sistemas: el monto del pedido es bruto (con IVA 19 %); contabilidad pide neto, IVA y total. */
export function aDocumento(x: Pedido, folio: number): Documento {
  const neto = Math.round(x.monto / 1.19);
  return { folio, pedido: x.numero, cliente: x.cliente, rut: x.rut.replace(/\./g, "").toUpperCase(), neto, iva: x.monto - neto, total: x.monto };
}

const sinProcesar = (x: Pedido) => x.estado === "pendiente" || (x.estado === "error" && x.reintentable);

/** Sincroniza los pedidos pendientes y los que fallaron solo por caída del destino. */
export function sincronizar(e: Estado): Estado {
  let n = e.registro.length;
  const registro: Registro[] = [];
  const log = (nivel: Registro["nivel"], texto: string) => registro.push({ id: ++n, nivel, texto });
  const cola = e.pedidos.filter(sinProcesar);
  if (!cola.length) { log("info", "No hay pedidos por sincronizar."); return { ...e, registro: [...e.registro, ...registro] }; }
  log("info", `Inicio: ${cola.length} pedido(s) por sincronizar.`);
  let folio = e.proximoFolio;
  const documentos = [...e.documentos];
  const pedidos = e.pedidos.map((x): Pedido => {
    if (!sinProcesar(x)) return x;
    const falla = validarPedido(x);
    if (falla) { log("error", `${x.numero}: validación fallida — ${falla}`); return { ...x, estado: "error", motivo: falla, reintentable: false }; }
    if (documentos.some((d) => d.pedido === x.numero)) { log("info", `${x.numero}: ya existía en contabilidad; se omite para no duplicar.`); return { ...x, estado: "sincronizado", motivo: "", reintentable: false, folio: documentos.find((d) => d.pedido === x.numero)!.folio }; }
    if (e.destinoCaido) { log("error", `${x.numero}: el sistema de contabilidad no responde; se reintentará.`); return { ...x, estado: "error", motivo: "Contabilidad no disponible.", reintentable: true }; }
    const doc = aDocumento(x, folio++);
    documentos.push(doc);
    log("ok", `${x.numero}: documento ${doc.folio} creado (neto ${doc.neto}, IVA ${doc.iva}).`);
    return { ...x, estado: "sincronizado", motivo: "", reintentable: false, folio: doc.folio };
  });
  const ok = pedidos.filter((x) => cola.some((c) => c.id === x.id) && x.estado === "sincronizado").length;
  log("info", `Fin: ${ok} sincronizado(s), ${cola.length - ok} con error.`);
  return { ...e, pedidos, documentos, proximoFolio: folio, registro: [...e.registro, ...registro] };
}

export function corregirRut(e: Estado, id: string, rut: string): { estado: Estado } | { error: string } {
  const x = e.pedidos.find((y) => y.id === id);
  if (!x) return { error: "El pedido no existe." };
  if (!validarRut(rut)) return { error: "El RUT no es válido (dígito verificador incorrecto)." };
  return { estado: { ...e, pedidos: e.pedidos.map((y) => (y.id === id ? { ...y, rut, estado: "pendiente", motivo: "", reintentable: false } : y)) } };
}

export function agregarPedido(e: Estado, d: { cliente: string; rut: string; monto: number }): { estado: Estado } | { error: string } {
  if (d.cliente.trim().length < 3) return { error: "Escribe el nombre del cliente." };
  if (!(d.monto > 0)) return { error: "El monto debe ser mayor que cero." };
  const n = e.pedidos.length + 1;
  return { estado: { ...e, pedidos: [...e.pedidos, { id: `p${Date.now()}`, numero: `PED-${3000 + n}`, cliente: d.cliente.trim(), rut: d.rut.trim(), monto: d.monto, estado: "pendiente", motivo: "", reintentable: false, folio: null }] } };
}

export const resumen = (e: Estado) => ({
  pendientes: e.pedidos.filter((x) => x.estado === "pendiente").length,
  sincronizados: e.pedidos.filter((x) => x.estado === "sincronizado").length,
  errores: e.pedidos.filter((x) => x.estado === "error").length,
});

export const clp = (n: number) => `$${Math.round(n).toLocaleString("es-CL")}`;

/** Correspondencia de campos entre el sistema de origen y el de destino (se muestra como documentación). */
export const MAPEO: { origen: string; destino: string; regla: string }[] = [
  { origen: "numero", destino: "pedido", regla: "Se copia tal cual." },
  { origen: "cliente", destino: "cliente", regla: "Se copia; mínimo 3 caracteres." },
  { origen: "rut", destino: "rut", regla: "Se valida el dígito verificador y se normaliza sin puntos." },
  { origen: "monto (bruto)", destino: "neto", regla: "monto ÷ 1,19, redondeado al peso." },
  { origen: "monto (bruto)", destino: "iva", regla: "monto − neto." },
  { origen: "monto (bruto)", destino: "total", regla: "Se copia tal cual." },
  { origen: "—", destino: "folio", regla: "Correlativo asignado por contabilidad." },
];

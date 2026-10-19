import { useState } from "react";
import { Link } from "react-router-dom";
import { rutaAsset } from "@/utilidades/assets";
import { ESTADOS, ETIQUETA_ESTADO, SIGUIENTES, validarCheckout, validarCupon, type EstadoPedido, type Pedido, type Totales, type Cupon } from "./tienda";
import { useTienda } from "./TiendaProvider";

export const clp = (n: number) => `$${n.toLocaleString("es-CL")}`;

export interface Tema {
  /** Color de acción principal y su color de texto. */
  acento: string;
  acentoTexto: string;
  /** Fondo de paneles, borde y texto. */
  panel: string;
  borde: string;
  texto: string;
  suave: string;
}

export function Resumen({ totales, cupon, tema }: { totales: Totales; cupon?: Cupon; tema: Tema }) {
  const fila = (k: string, v: string, fuerte = false) => <div className={`flex justify-between ${fuerte ? "border-t pt-3 text-lg font-bold" : ""}`} style={fuerte ? { borderColor: tema.borde } : undefined}><dt style={{ opacity: fuerte ? 1 : 0.7 }}>{k}</dt><dd className="tabular-nums">{v}</dd></div>;
  return (
    <dl className="space-y-2 text-sm">
      {fila("Subtotal", clp(totales.subtotal))}
      {totales.descuento > 0 && fila(`Descuento${cupon ? ` (${cupon.codigo})` : ""}`, `− ${clp(totales.descuento)}`)}
      {fila("Envío", totales.envio === 0 ? "Gratis" : clp(totales.envio))}
      {fila("Total", clp(totales.total), true)}
    </dl>
  );
}

interface CarritoProps { base: string; tema: Tema; imagenDe: (id: string) => string; cupones?: Cupon[]; envioGratisDesde: number }

export function CarritoVista({ base, tema, imagenDe, cupones, envioGratisDesde }: CarritoProps) {
  const t = useTienda();
  const [codigo, setCodigo] = useState("");
  const [aviso, setAviso] = useState<{ ok: boolean; texto: string } | null>(null);
  const boton = "rounded-md px-6 py-3 text-sm font-bold hover:opacity-90";

  if (!t.lineas.length) {
    return (
      <div className="rounded-2xl border border-dashed p-12 text-center" style={{ borderColor: tema.borde }}>
        <p className="text-lg font-semibold">Tu carrito está vacío.</p>
        <p className="mt-1 text-sm opacity-70">Agrega productos desde el catálogo para continuar.</p>
        <Link to={`${base}/catalogo`} className={`mt-6 inline-flex ${boton}`} style={{ background: tema.acento, color: tema.acentoTexto }}>Ver catálogo</Link>
      </div>
    );
  }
  const falta = Math.max(0, envioGratisDesde - (t.totales.subtotal - t.totales.descuento));
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
      <section aria-label="Productos en el carrito">
        <ul className="divide-y" style={{ borderColor: tema.borde }}>
          {t.lineas.map((l) => {
            const p = t.detalle(l)!;
            return (
              <li key={l.clave} className="flex gap-4 py-5">
                <img src={rutaAsset(imagenDe(l.productoId))} alt="" className="h-24 w-24 shrink-0 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-semibold"><Link to={`${base}/producto/${p.id}`} className="hover:underline">{p.nombre}</Link></p>
                  {(l.talla || l.color) && <p className="text-sm opacity-65">{[l.talla && `Talla ${l.talla}`, l.color].filter(Boolean).join(" · ")}</p>}
                  <p className="mt-1 text-sm tabular-nums">{clp(p.precio)} c/u</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center rounded-md ring-1" style={{ ["--tw-ring-color" as string]: tema.borde }}>
                      <button type="button" onClick={() => t.cambiar(l.clave, l.cantidad - 1)} className="px-3 py-1.5 text-lg leading-none" aria-label={`Quitar una unidad de ${p.nombre}`}>−</button>
                      <span className="min-w-8 text-center text-sm tabular-nums" aria-live="polite" aria-label={`Cantidad de ${p.nombre}`}>{l.cantidad}</span>
                      <button type="button" onClick={() => t.cambiar(l.clave, l.cantidad + 1)} disabled={l.cantidad >= 10} className="px-3 py-1.5 text-lg leading-none disabled:opacity-30" aria-label={`Agregar una unidad de ${p.nombre}`}>+</button>
                    </div>
                    <button type="button" onClick={() => t.cambiar(l.clave, 0)} className="text-sm underline opacity-70 hover:opacity-100" aria-label={`Eliminar ${p.nombre} del carrito`}>Eliminar</button>
                  </div>
                </div>
                <p className="font-semibold tabular-nums">{clp(p.precio * l.cantidad)}</p>
              </li>
            );
          })}
        </ul>
      </section>
      <aside aria-label="Resumen del pedido" className="h-fit rounded-2xl p-6 ring-1" style={{ background: tema.panel, ["--tw-ring-color" as string]: tema.borde }}>
        <h2 className="text-lg font-bold">Resumen</h2>
        {cupones && (
          <div className="mt-4">
            {t.cupon ? (
              <p className="flex items-center justify-between rounded-md p-3 text-sm" style={{ background: tema.suave }}>Cupón <strong>{t.cupon.codigo}</strong> aplicado <button type="button" onClick={() => { t.aplicarCupon(null); setAviso(null); }} className="underline">Quitar</button></p>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); const r = validarCupon(codigo, cupones, t.totales.subtotal); if (r.ok) { t.aplicarCupon(r.cupon); setAviso({ ok: true, texto: `Cupón aplicado: ${r.cupon.descripcion}.` }); setCodigo(""); } else setAviso({ ok: false, texto: r.motivo }); }} aria-label="Cupón de descuento" className="flex gap-2">
                <label htmlFor="cupon" className="sr-only">Código de cupón</label>
                <input id="cupon" value={codigo} onChange={(e) => setCodigo(e.target.value)} placeholder="Código de cupón" className="min-w-0 flex-1 rounded-md border bg-transparent px-3 py-2 text-sm outline-none" style={{ borderColor: tema.borde }} />
                <button type="submit" className="rounded-md px-4 py-2 text-sm font-bold ring-1" style={{ ["--tw-ring-color" as string]: tema.borde }}>Aplicar</button>
              </form>
            )}
            <p className="mt-2 min-h-5 text-xs" role="status" aria-live="polite" style={{ color: aviso?.ok ? undefined : "#e57373" }}>{aviso?.texto}</p>
            <p className="text-xs opacity-75">Cupones de demostración: {cupones.map((c) => c.codigo).join(", ")}.</p>
          </div>
        )}
        <div className="mt-4"><Resumen totales={t.totales} cupon={t.cupon} tema={tema} /></div>
        {falta > 0 && <p className="mt-3 text-xs opacity-70">Te faltan {clp(falta)} para el envío gratis.</p>}
        <Link to={`${base}/checkout`} className={`mt-5 flex justify-center ${boton}`} style={{ background: tema.acento, color: tema.acentoTexto }}>Ir al pago simulado</Link>
        <button type="button" onClick={t.vaciar} className="mt-3 w-full text-center text-sm underline opacity-70 hover:opacity-100">Vaciar carrito</button>
      </aside>
    </div>
  );
}

export function CheckoutVista({ base, tema, onCreado }: { base: string; tema: Tema; onCreado: (numero: string) => void }) {
  const t = useTienda();
  const [c, setC] = useState({ nombre: "", correo: "", direccion: "" });
  const [err, setErr] = useState<Partial<Record<"nombre" | "correo" | "direccion", string>>>({});
  if (!t.lineas.length) return <div className="rounded-2xl border border-dashed p-12 text-center" style={{ borderColor: tema.borde }}><p className="font-semibold">No hay productos para pagar.</p><Link to={`${base}/catalogo`} className="mt-4 inline-block underline">Volver al catálogo</Link></div>;
  const campo = "w-full rounded-md border bg-transparent px-3.5 py-2.5 outline-none focus:ring-2";
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
      <form noValidate aria-label="Datos de compra" className="space-y-5" onSubmit={(ev) => { ev.preventDefault(); const e = validarCheckout(c); setErr(e); if (Object.keys(e).length) return; const p = t.crearPedido({ nombre: c.nombre.trim(), correo: c.correo.trim(), direccion: c.direccion.trim() }); if (p) onCreado(p.numero); }}>
        <p className="rounded-md p-3 text-sm" style={{ background: tema.suave }} role="note"><strong>Compra de demostración.</strong> No se cobra nada ni se piden datos de tarjeta. Usa datos inventados: no se envían a ningún servidor.</p>
        {([["nombre", "Nombre completo", "text"], ["correo", "Correo", "email"], ["direccion", "Dirección de despacho (ficticia)", "text"]] as const).map(([k, et, tipo]) => (
          <div key={k}><label htmlFor={`co-${k}`} className="mb-1.5 block text-sm font-medium">{et}</label><input id={`co-${k}`} type={tipo} value={c[k]} onChange={(e) => setC({ ...c, [k]: e.target.value })} aria-invalid={!!err[k]} aria-describedby={err[k] ? `co-${k}-e` : undefined} className={campo} style={{ borderColor: tema.borde }} autoComplete="off" />{err[k] && <p id={`co-${k}-e`} className="mt-1.5 text-sm" style={{ color: "#e57373" }}>{err[k]}</p>}</div>
        ))}
        <fieldset><legend className="mb-2 text-sm font-medium">Medio de pago</legend><label className="flex items-center gap-3 rounded-md p-3 ring-1" style={{ ["--tw-ring-color" as string]: tema.borde }}><input type="radio" checked readOnly name="pago" className="h-4 w-4" /><span className="text-sm">Pago simulado <span className="opacity-75">(sin cobro real)</span></span></label></fieldset>
        <button type="submit" className="rounded-md px-7 py-3 text-sm font-bold hover:opacity-90" style={{ background: tema.acento, color: tema.acentoTexto }}>Confirmar compra simulada</button>
      </form>
      <aside aria-label="Resumen del pedido" className="h-fit rounded-2xl p-6 ring-1" style={{ background: tema.panel, ["--tw-ring-color" as string]: tema.borde }}>
        <h2 className="text-lg font-bold">Tu pedido</h2>
        <ul className="mt-3 space-y-1 text-sm">{t.lineas.map((l) => <li key={l.clave} className="flex justify-between gap-3"><span>{l.cantidad} × {t.detalle(l)?.nombre}{l.talla ? ` (${l.talla})` : ""}</span><span className="tabular-nums">{clp((t.detalle(l)?.precio ?? 0) * l.cantidad)}</span></li>)}</ul>
        <div className="mt-4 border-t pt-4" style={{ borderColor: tema.borde }}><Resumen totales={t.totales} cupon={t.cupon} tema={tema} /></div>
      </aside>
    </div>
  );
}

const fechaCorta = (iso: string) => new Date(iso).toLocaleDateString("es-CL", { day: "2-digit", month: "short" });

export function ListaPedidos({ tema, ver }: { tema: Tema; ver?: (p: Pedido) => string }) {
  const t = useTienda();
  const [filtro, setFiltro] = useState<EstadoPedido | "todos">("todos");
  const lista = t.pedidos.filter((p) => filtro === "todos" || p.estado === filtro);
  if (!t.pedidos.length) return <p className="rounded-2xl border border-dashed p-10 text-center text-sm opacity-75" style={{ borderColor: tema.borde }}>Aún no hay pedidos. Haz una compra simulada para verla aquí.</p>;
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por estado">
        {(["todos", ...ESTADOS] as const).map((e) => <button key={e} type="button" aria-pressed={filtro === e} onClick={() => setFiltro(e)} className="rounded-full px-3 py-1.5 text-xs font-semibold ring-1" style={filtro === e ? { background: tema.acento, color: tema.acentoTexto, ["--tw-ring-color" as string]: tema.acento } : { ["--tw-ring-color" as string]: tema.borde }}>{e === "todos" ? "Todos" : ETIQUETA_ESTADO[e]}</button>)}
      </div>
      <div className="relative mt-5 overflow-x-auto rounded-xl ring-1" style={{ ["--tw-ring-color" as string]: tema.borde }}>
        <table className="w-full min-w-[680px] text-left text-sm"><caption className="sr-only">Pedidos</caption>
          <thead className="text-xs uppercase tracking-wider opacity-70"><tr><th scope="col" className="px-4 py-3">Pedido</th><th scope="col" className="px-4 py-3">Fecha</th><th scope="col" className="px-4 py-3">Cliente</th><th scope="col" className="px-4 py-3 text-right">Total</th><th scope="col" className="px-4 py-3">Estado</th><th scope="col" className="px-4 py-3">Acción</th></tr></thead>
          <tbody>{lista.map((p) => (
            <tr key={p.id} className="border-t" style={{ borderColor: tema.borde }}>
              <td className="px-4 py-3 font-semibold">{ver ? <Link to={ver(p)} className="underline">{p.numero}</Link> : p.numero}</td>
              <td className="px-4 py-3 opacity-70">{fechaCorta(p.fecha)}</td>
              <td className="px-4 py-3">{p.cliente.nombre}</td>
              <td className="px-4 py-3 text-right tabular-nums">{clp(p.totales.total)}</td>
              <td className="px-4 py-3"><span className="rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: tema.suave }}>{ETIQUETA_ESTADO[p.estado]}</span></td>
              <td className="px-4 py-3">{SIGUIENTES[p.estado].length ? (
                <label className="flex items-center gap-2"><span className="sr-only">Cambiar estado del pedido {p.numero}</span>
                  <select value="" onChange={(e) => e.target.value && t.cambiarEstado(p.id, e.target.value as EstadoPedido)} aria-label={`Cambiar estado del pedido ${p.numero}`} className="rounded-md border bg-transparent px-2 py-1.5 text-xs" style={{ borderColor: tema.borde }}>
                    <option value="" style={{ color: "#000" }}>Mover a…</option>
                    {SIGUIENTES[p.estado].map((s) => <option key={s} value={s} style={{ color: "#000" }}>{ETIQUETA_ESTADO[s]}</option>)}
                  </select></label>
              ) : <span className="text-xs opacity-75">Sin cambios posibles</span>}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

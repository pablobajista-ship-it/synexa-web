import { createContext, useContext, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import { IsotipoMarca } from "@/componentes/IsotipoMarca";
import { marcaPorId } from "@/datos/marcas";
import { rutaAsset } from "@/utilidades/assets";
import { MenuMovil, ScrollArriba, usePersistente } from "../compartido/utiles";
import { BASE, C, CLAVE, ESTADO_INICIAL, MAPEO, agregarPedido, clp, corregirRut, resumen, sincronizar, type Estado, type Pedido } from "./sync";

const marca = marcaPorId("puentesync")!;

interface Ctx { e: Estado; sincronizar: () => void; alternarDestino: () => void; corregir: (id: string, rut: string) => string | null; agregar: (d: { cliente: string; rut: string; monto: number }) => string | null; limpiarRegistro: () => void }
const Contexto = createContext<Ctx | null>(null);
const useSync = () => { const c = useContext(Contexto); if (!c) throw new Error("falta ProveedorSync"); return c; };

function ProveedorSync({ children }: { children: ReactNode }) {
  const [e, setE] = usePersistente<Estado>(CLAVE, ESTADO_INICIAL);
  const valor = useMemo<Ctx>(() => ({
    e,
    sincronizar: () => setE((p) => sincronizar(p)),
    alternarDestino: () => setE((p) => ({ ...p, destinoCaido: !p.destinoCaido })),
    corregir: (id, rut) => { const r = corregirRut(e, id, rut); if ("error" in r) return r.error; setE(r.estado); return null; },
    agregar: (d) => { const r = agregarPedido(e, d); if ("error" in r) return r.error; setE(r.estado); return null; },
    limpiarRegistro: () => setE((p) => ({ ...p, registro: [] })),
  }), [e, setE]);
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

const Cont = ({ children, className = "" }: { children: ReactNode; className?: string }) => <div className={`mx-auto max-w-6xl px-4 py-12 ${className}`}>{children}</div>;
const Boton = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={to} className="inline-flex rounded-md px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90" style={{ background: C.turquesaOscuro }}>{children}</Link>
);
const campo = "w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#14b8a6]/30";

function Cabecera() {
  const MENU = [["", "Inicio"], ["flujo", "Flujo de sincronización"], ["mapeo", "Reglas y campos"]] as const;
  const estilo = ({ isActive }: { isActive: boolean }) => `rounded-md px-3 py-2 text-sm font-semibold ${isActive ? "bg-white/15 text-white" : "text-white/70 hover:text-white"}`;
  return (
    <header className="sticky top-11 z-40 text-white" style={{ background: C.marino }}>
      <div className="relative"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to={BASE} className="flex items-center gap-3" aria-label="PuenteSync, inicio"><IsotipoMarca marca={marca} size={32} /><span className="font-display text-xl font-semibold">PuenteSync</span></Link>
        <nav aria-label="Principal" className="hidden md:flex">{MENU.map(([r, t]) => <NavLink key={r} to={r ? `${BASE}/${r}` : BASE} end={r === ""} className={estilo}>{t}</NavLink>)}</nav>
        <MenuMovil id="ps-menu"><ul style={{ background: C.marino }}>{MENU.map(([r, t]) => <li key={r}><NavLink to={r ? `${BASE}/${r}` : BASE} end={r === ""} className="block rounded px-3 py-3 text-white">{t}</NavLink></li>)}</ul></MenuMovil>
      </div></div>
    </header>
  );
}

function Inicio() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={rutaAsset("assets/puentesync/hero.webp")} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(90deg, rgba(11,31,68,.94), rgba(11,31,68,.65) 60%, rgba(11,31,68,.3))" }} />
        <div className="mx-auto max-w-6xl px-4 py-28 sm:py-36">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: C.turquesa }}>Integración de sistemas</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">Que tus sistemas se hablen entre sí.</h1>
          <p className="mt-6 max-w-lg text-lg text-white/85">Una integración acotada: los pedidos de la tienda llegan a contabilidad sin digitar dos veces.</p>
          <div className="mt-9"><Boton to={`${BASE}/flujo`}>Probar la sincronización</Boton></div>
        </div>
      </section>
      <section className="bg-white"><Cont>
        <h2 className="font-display text-3xl font-semibold text-slate-900">Un flujo, bien definido</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-4">{[["Leer", "Se toman los pedidos pendientes del sistema de origen."], ["Validar", "Se revisa RUT, monto y cliente. Lo inválido se aparta con su motivo."], ["Transformar", "El monto bruto se convierte en neto, IVA y total."], ["Enviar", "Se crea el documento en contabilidad, sin duplicar."]].map(([t, d], i) => <li key={t} className="rounded-md p-5 ring-1 ring-slate-200"><p className="text-xs font-bold uppercase tracking-widest" style={{ color: C.turquesaOscuro }}>Paso {i + 1}</p><h3 className="mt-1 font-display text-xl font-semibold text-slate-900">{t}</h3><p className="mt-2 text-sm text-slate-600">{d}</p></li>)}</ol>
      </Cont></section>
      <section style={{ background: C.fondo }}><Cont className="grid items-center gap-8 md:grid-cols-2">
        <img src={rutaAsset("assets/puentesync/equipo.webp")} alt="Dos personas revisando un diagrama de flujo en pantalla" loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover" />
        <div><h2 className="font-display text-3xl font-semibold text-slate-900">Simulación, sin sistemas reales</h2><p className="mt-4 text-slate-700">Los dos sistemas son simulados en tu navegador: no se conecta ninguna API real ni se guardan datos. Las empresas, RUT y montos son ficticios.</p></div>
      </Cont></section>
    </>
  );
}

const COLOR: Record<Pedido["estado"], string> = { pendiente: "bg-slate-200 text-slate-800", sincronizado: "bg-green-100 text-green-800", error: "bg-red-100 text-red-800" };

function FilaPedido({ x }: { x: Pedido }) {
  const { corregir } = useSync();
  const [rut, setRut] = useState("");
  const [err, setErr] = useState<string | null>(null);
  return (
    <li className="rounded-md bg-white p-3 ring-1 ring-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-semibold text-slate-900">{x.numero} · {x.cliente}</p><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${COLOR[x.estado]}`}>{x.estado === "pendiente" ? "Pendiente" : x.estado === "sincronizado" ? `Sincronizado (folio ${x.folio})` : "Con error"}</span></div>
      <p className="mt-1 text-sm text-slate-600">RUT {x.rut || "—"} · {clp(x.monto)}</p>
      {x.estado === "error" && <p className="mt-1 text-sm text-red-700">{x.motivo}</p>}
      {x.estado === "error" && !x.reintentable && (
        <form className="mt-2 flex flex-wrap items-end gap-2" noValidate onSubmit={(ev) => { ev.preventDefault(); const r = corregir(x.id, rut); setErr(r); if (!r) setRut(""); }}>
          <label className="text-xs font-medium text-slate-700">Corregir RUT de {x.numero}<input className={`${campo} mt-1 w-44`} value={rut} onChange={(ev) => setRut(ev.target.value)} placeholder="11.111.111-1" /></label>
          <button className="rounded-md px-4 py-2.5 text-sm font-bold text-white" style={{ background: C.marino }}>Corregir y reintentar</button>
          {err && <p role="alert" className="w-full text-sm text-red-700">{err}</p>}
        </form>)}
    </li>
  );
}

function Flujo() {
  const { e, sincronizar: sync, alternarDestino, agregar, limpiarRegistro } = useSync();
  const r = resumen(e);
  const [d, setD] = useState({ cliente: "", rut: "", monto: 0 });
  const [err, setErr] = useState<string | null>(null);
  const alta = (ev: FormEvent) => { ev.preventDefault(); const m = agregar(d); setErr(m); if (!m) setD({ cliente: "", rut: "", monto: 0 }); };
  return (
    <Cont>
      <h1 className="font-display text-4xl font-semibold text-slate-900">Flujo de sincronización</h1>
      <p className="mt-2 max-w-2xl text-slate-600">Sistema A (Tienda) envía sus pedidos al Sistema B (Contabilidad). Los dos son simulados.</p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="button" onClick={sync} className="rounded-md px-6 py-3 text-sm font-bold text-white" style={{ background: C.turquesaOscuro }}>Sincronizar ahora</button>
        <label className="flex items-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-medium ring-1 ring-slate-200"><input type="checkbox" checked={e.destinoCaido} onChange={alternarDestino} />Simular caída de contabilidad</label>
        <p role="status" className="text-sm text-slate-700">Pendientes: <strong>{r.pendientes}</strong> · Sincronizados: <strong>{r.sincronizados}</strong> · Con error: <strong>{r.errores}</strong></p>
      </div>
      {e.destinoCaido && <p role="alert" className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-900 ring-1 ring-amber-200">Contabilidad figura caída: los pedidos válidos quedarán con error «reintentable» hasta que el sistema vuelva.</p>}

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <section aria-labelledby="ps-a">
          <h2 id="ps-a" className="font-display text-2xl font-semibold text-slate-900">Sistema A · Tienda (pedidos)</h2>
          <ul className="mt-4 space-y-3">{e.pedidos.map((x) => <FilaPedido key={x.id} x={x} />)}</ul>
          <form onSubmit={alta} noValidate aria-label="Nuevo pedido en la tienda" className="mt-5 grid gap-3 rounded-md bg-white p-4 ring-1 ring-slate-200 sm:grid-cols-3">
            <label className="text-sm font-medium text-slate-700">Cliente<input className={`${campo} mt-1`} value={d.cliente} onChange={(ev) => setD({ ...d, cliente: ev.target.value })} /></label>
            <label className="text-sm font-medium text-slate-700">RUT<input className={`${campo} mt-1`} value={d.rut} onChange={(ev) => setD({ ...d, rut: ev.target.value })} /></label>
            <label className="text-sm font-medium text-slate-700">Monto (CLP)<input type="number" className={`${campo} mt-1`} value={d.monto || ""} onChange={(ev) => setD({ ...d, monto: Number(ev.target.value) })} /></label>
            {err && <p role="alert" className="text-sm text-red-700 sm:col-span-3">{err}</p>}
            <div className="sm:col-span-3"><button className="rounded-md px-5 py-2.5 text-sm font-bold text-white" style={{ background: C.marino }}>Agregar pedido</button></div>
          </form>
        </section>
        <section aria-labelledby="ps-b">
          <h2 id="ps-b" className="font-display text-2xl font-semibold text-slate-900">Sistema B · Contabilidad (documentos)</h2>
          {e.documentos.length ? (
            <div className="relative mt-4 overflow-x-auto rounded-md bg-white ring-1 ring-slate-200"><table className="w-full min-w-[420px] text-left text-sm">
              <caption className="sr-only">Documentos creados en contabilidad</caption>
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="p-3">Folio</th><th className="p-3">Pedido</th><th className="p-3 text-right">Neto</th><th className="p-3 text-right">IVA</th><th className="p-3 text-right">Total</th></tr></thead>
              <tbody className="divide-y divide-slate-100">{e.documentos.map((x) => <tr key={x.folio}><td className="p-3 font-mono">{x.folio}</td><td className="p-3">{x.pedido}<span className="block text-xs text-slate-500">{x.cliente}</span></td><td className="p-3 text-right tabular-nums">{clp(x.neto)}</td><td className="p-3 text-right tabular-nums">{clp(x.iva)}</td><td className="p-3 text-right tabular-nums">{clp(x.total)}</td></tr>)}</tbody>
            </table></div>
          ) : <p className="mt-4 rounded-md bg-white p-6 text-sm text-slate-600 ring-1 ring-slate-200">Contabilidad aún no recibe documentos. Pulsa «Sincronizar ahora».</p>}
        </section>
      </div>

      <section aria-labelledby="ps-log" className="mt-10">
        <div className="flex items-center justify-between"><h2 id="ps-log" className="font-display text-2xl font-semibold text-slate-900">Registro de la integración</h2>{e.registro.length > 0 && <button type="button" onClick={limpiarRegistro} className="text-sm font-semibold underline" style={{ color: C.turquesaOscuro }}>Limpiar registro</button>}</div>
        {e.registro.length ? <ol className="mt-4 max-h-72 space-y-1 overflow-auto rounded-md bg-slate-900 p-4 font-mono text-xs">{e.registro.map((l) => <li key={l.id} className={l.nivel === "error" ? "text-red-300" : l.nivel === "ok" ? "text-emerald-300" : "text-slate-300"}>{String(l.id).padStart(3, "0")} · {l.texto}</li>)}</ol> : <p className="mt-3 text-sm text-slate-600">Todavía no hay ejecuciones.</p>}
      </section>
    </Cont>
  );
}

function Mapeo() {
  return (
    <Cont>
      <h1 className="font-display text-4xl font-semibold text-slate-900">Reglas y campos</h1>
      <p className="mt-2 max-w-2xl text-slate-600">Cómo se traduce un pedido de la tienda a un documento de contabilidad.</p>
      <div className="relative mt-6 overflow-x-auto rounded-md bg-white ring-1 ring-slate-200"><table className="w-full min-w-[520px] text-left text-sm">
        <caption className="sr-only">Mapeo de campos entre sistemas</caption>
        <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="p-3">Campo de la tienda</th><th className="p-3">Campo de contabilidad</th><th className="p-3">Regla</th></tr></thead>
        <tbody className="divide-y divide-slate-100">{MAPEO.map((m, i) => <tr key={i}><td className="p-3 font-mono text-xs">{m.origen}</td><td className="p-3 font-mono text-xs">{m.destino}</td><td className="p-3">{m.regla}</td></tr>)}</tbody>
      </table></div>
      <h2 className="mt-10 font-display text-2xl font-semibold text-slate-900">Qué pasa cuando algo falla</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
        <li><strong>Dato inválido:</strong> el pedido se aparta con su motivo y el resto sigue. Se corrige el dato y se reintenta.</li>
        <li><strong>Sistema destino caído:</strong> los pedidos válidos quedan como «reintentables» y se envían cuando el sistema vuelve.</li>
        <li><strong>Pedido repetido:</strong> si ya existe un documento para ese pedido, no se crea otro.</li>
      </ul>
      <img src={rutaAsset("assets/puentesync/editorial.webp")} alt="" loading="lazy" className="mt-10 aspect-[21/9] w-full rounded-md object-cover" />
    </Cont>
  );
}

export default function PuenteSync() {
  return (
    <ProveedorSync>
      <div style={{ background: C.fondo }} className="text-slate-800">
        <ScrollArriba />
        <Cabecera />
        <main className="min-h-[60vh]">
          <Routes>
            <Route index element={<Inicio />} />
            <Route path="flujo" element={<Flujo />} />
            <Route path="mapeo" element={<Mapeo />} />
            <Route path="*" element={<Cont className="text-center"><h1 className="font-display text-3xl font-semibold">Página no encontrada</h1><div className="mt-6"><Boton to={BASE}>Volver al inicio</Boton></div></Cont>} />
          </Routes>
        </main>
        <footer style={{ background: C.marino }} className="text-white/75"><div className="mx-auto max-w-6xl px-4 py-9 text-sm"><p className="font-display text-lg text-white">PuenteSync</p><p className="mt-5 text-xs text-white/80">PuenteSync es una empresa ficticia creada para una demostración de SYNEXA. Los sistemas, RUT y montos son simulados y los datos se guardan solo en tu navegador. Fotografías generadas con IA.</p></div></footer>
      </div>
    </ProveedorSync>
  );
}

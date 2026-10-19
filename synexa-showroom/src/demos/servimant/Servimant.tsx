import { createContext, useContext, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import { IsotipoMarca } from "@/componentes/IsotipoMarca";
import { marcaPorId } from "@/datos/marcas";
import { rutaAsset } from "@/utilidades/assets";
import { MenuMovil, ScrollArriba, usePersistente } from "../compartido/utiles";
import {
  BASE, C, CAPACIDAD, CLAVE, ESTADOS, ORDENES_INICIALES, PRIORIDADES, TECNICOS, TIPOS, asignar, cambiarEstado, cargaTecnico, crearOrden, resumenPorEstado,
  tecnicoPorId, tecnicosElegibles, transicionesDe, type EstadoOrden, type Orden, type Prioridad, type TipoTrabajo,
} from "./ordenes";

const marca = marcaPorId("servimant")!;

interface Ctx { ordenes: Orden[]; aplicar: (r: { ordenes: Orden[] } | { error: string }) => string | null }
const Contexto = createContext<Ctx | null>(null);
const useOrdenes = () => { const c = useContext(Contexto); if (!c) throw new Error("falta ProveedorOrdenes"); return c; };

function ProveedorOrdenes({ children }: { children: ReactNode }) {
  const [ordenes, setOrdenes] = usePersistente<Orden[]>(CLAVE, ORDENES_INICIALES);
  const valor = useMemo<Ctx>(() => ({
    ordenes,
    aplicar: (r) => {
      if ("error" in r) return r.error;
      setOrdenes(r.ordenes);
      return null;
    },
  }), [ordenes, setOrdenes]);
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

const Cont = ({ children, className = "" }: { children: ReactNode; className?: string }) => <div className={`mx-auto max-w-6xl px-4 py-12 ${className}`}>{children}</div>;
const Boton = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={to} className="inline-flex rounded-md px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90" style={{ background: C.naranjaBtn }}>{children}</Link>
);
const campo = "w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-[#0b1f44] focus:ring-2 focus:ring-[#0b1f44]/25";

const COLOR_ESTADO: Record<EstadoOrden, string> = {
  Pendiente: "bg-slate-200 text-slate-800", Asignada: "bg-blue-100 text-blue-900", "En ejecución": "bg-orange-100 text-orange-900",
  "En revisión": "bg-purple-100 text-purple-900", Cerrada: "bg-green-100 text-green-800", Cancelada: "bg-red-100 text-red-800",
};
const Insignia = ({ e }: { e: EstadoOrden }) => <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${COLOR_ESTADO[e]}`}>{e}</span>;

function Cabecera() {
  const MENU = [["", "Inicio"], ["ordenes", "Órdenes de trabajo"], ["tecnicos", "Técnicos"]] as const;
  const estilo = ({ isActive }: { isActive: boolean }) => `rounded-md px-3 py-2 text-sm font-semibold ${isActive ? "bg-white/15 text-white" : "text-white/70 hover:text-white"}`;
  return (
    <header className="sticky top-11 z-40 text-white" style={{ background: C.marino }}>
      <div className="relative"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to={BASE} className="flex items-center gap-3" aria-label="Servimant, inicio"><IsotipoMarca marca={marca} size={32} /><span className="font-display text-xl font-semibold">Servimant</span></Link>
        <nav aria-label="Principal" className="hidden md:flex">{MENU.map(([r, t]) => <NavLink key={r} to={r ? `${BASE}/${r}` : BASE} end={r === ""} className={estilo}>{t}</NavLink>)}</nav>
        <MenuMovil id="sm-menu"><ul style={{ background: C.marino }}>{MENU.map(([r, t]) => <li key={r}><NavLink to={r ? `${BASE}/${r}` : BASE} end={r === ""} className="block rounded px-3 py-3 text-white">{t}</NavLink></li>)}</ul></MenuMovil>
      </div></div>
    </header>
  );
}

function Inicio() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={rutaAsset("assets/servimant/hero.webp")} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(90deg, rgba(11,31,68,.93), rgba(11,31,68,.6) 60%, rgba(11,31,68,.25))" }} />
        <div className="mx-auto max-w-6xl px-4 py-28 sm:py-36">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: C.naranja }}>Mantenimiento industrial</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">Cada intervención, con su orden y su responsable.</h1>
          <p className="mt-6 max-w-lg text-lg text-white/85">Órdenes de trabajo, técnicos con carga visible y un historial que nadie tiene que reconstruir.</p>
          <div className="mt-9"><Boton to={`${BASE}/ordenes`}>Ver órdenes de trabajo</Boton></div>
        </div>
      </section>
      <section className="bg-white"><Cont>
        <h2 className="font-display text-3xl font-semibold text-slate-900">Cómo trabaja el equipo</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-3">{[
          ["taller", "1. Se registra la orden", "Cliente, equipo, tipo de trabajo y prioridad quedan en una sola ficha."],
          ["tecnicos", "2. Se asigna al técnico adecuado", "Solo se ofrecen técnicos con la especialidad y con carga disponible."],
          ["instalaciones", "3. Se ejecuta, revisa y cierra", "El cierre exige un informe y todo el recorrido queda en el historial."],
        ].map(([img, t, d]) => <li key={t}><img src={rutaAsset(`assets/servimant/${img}.webp`)} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover" /><h3 className="mt-4 font-display text-xl font-semibold text-slate-900">{t}</h3><p className="mt-1 text-slate-600">{d}</p></li>)}</ol>
      </Cont></section>
      <section style={{ background: C.fondo }}><Cont className="grid items-center gap-10 md:grid-cols-2">
        <div><h2 className="font-display text-3xl font-semibold text-slate-900">Demostración con datos ficticios</h2><p className="mt-4 text-slate-700">Clientes, equipos y técnicos son inventados. Los cambios se guardan solo en tu navegador.</p><div className="mt-6"><Boton to={`${BASE}/tecnicos`}>Ver a los técnicos</Boton></div></div>
        <img src={rutaAsset("assets/servimant/vehiculo.webp")} alt="Furgón de servicio dentro de un taller" loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover" />
      </Cont></section>
    </>
  );
}

function Ordenes() {
  const { ordenes, aplicar } = useOrdenes();
  const [estado, setEstado] = useState<"" | EstadoOrden>("");
  const [tec, setTec] = useState("");
  const [d, setD] = useState({ cliente: "", equipo: "", tipo: "Mecánico" as TipoTrabajo, prioridad: "Normal" as Prioridad, descripcion: "" });
  const [err, setErr] = useState<string | null>(null);
  const lista = ordenes.filter((o) => (!estado || o.estado === estado) && (!tec || o.tecnicoId === tec));
  const crear = (e: FormEvent) => {
    e.preventDefault();
    const r = aplicar(crearOrden(ordenes, d));
    setErr(r);
    if (!r) setD({ ...d, cliente: "", equipo: "", descripcion: "" });
  };
  return (
    <Cont>
      <h1 className="font-display text-4xl font-semibold text-slate-900">Órdenes de trabajo</h1>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6" aria-label="Resumen por estado">{resumenPorEstado(ordenes).map((r) => (
        <li key={r.estado} className="rounded-md bg-white p-3 shadow-sm ring-1 ring-slate-200"><p className="text-xs text-slate-500">{r.estado}</p><p className="text-2xl font-bold tabular-nums text-slate-900">{r.cantidad}</p></li>))}</ul>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">Estado<select className={`${campo} mt-1`} value={estado} onChange={(e) => setEstado(e.target.value as "" | EstadoOrden)}><option value="">Todos</option>{ESTADOS.map((s) => <option key={s}>{s}</option>)}</select></label>
        <label className="text-sm font-medium text-slate-700">Técnico<select className={`${campo} mt-1`} value={tec} onChange={(e) => setTec(e.target.value)}><option value="">Todos</option>{TECNICOS.map((t) => <option key={t.id} value={t.id}>{t.nombre}</option>)}</select></label>
      </div>
      <p className="mt-4 text-sm text-slate-600" role="status">{lista.length === 1 ? "1 orden" : `${lista.length} órdenes`}</p>
      <ul className="mt-2 space-y-3">{lista.map((o) => (
        <li key={o.id}><Link to={`${BASE}/ordenes/${o.id}`} className="block rounded-md bg-white p-4 shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-mono text-sm font-semibold" style={{ color: C.marino }}>{o.codigo}</p><Insignia e={o.estado} /></div>
          <p className="mt-1 font-semibold text-slate-900">{o.equipo} <span className="font-normal text-slate-500">· {o.cliente}</span></p>
          <p className="mt-1 text-sm text-slate-600">{o.tipo} · Prioridad {o.prioridad.toLowerCase()} · {tecnicoPorId(o.tecnicoId)?.nombre ?? "Sin técnico"}</p></Link></li>))}</ul>
      {!lista.length && <p className="mt-4 rounded-md bg-white p-8 text-center text-slate-600 ring-1 ring-slate-200">No hay órdenes con ese filtro.</p>}

      <form onSubmit={crear} noValidate aria-label="Nueva orden de trabajo" className="mt-12 grid gap-4 rounded-md bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:grid-cols-2">
        <h2 className="font-display text-xl font-semibold text-slate-900 sm:col-span-2">Nueva orden de trabajo</h2>
        <label className="text-sm font-medium text-slate-700">Cliente<input className={`${campo} mt-1`} value={d.cliente} onChange={(e) => setD({ ...d, cliente: e.target.value })} /></label>
        <label className="text-sm font-medium text-slate-700">Equipo<input className={`${campo} mt-1`} value={d.equipo} onChange={(e) => setD({ ...d, equipo: e.target.value })} /></label>
        <label className="text-sm font-medium text-slate-700">Tipo de trabajo<select className={`${campo} mt-1`} value={d.tipo} onChange={(e) => setD({ ...d, tipo: e.target.value as TipoTrabajo })}>{TIPOS.map((t) => <option key={t}>{t}</option>)}</select></label>
        <label className="text-sm font-medium text-slate-700">Prioridad<select className={`${campo} mt-1`} value={d.prioridad} onChange={(e) => setD({ ...d, prioridad: e.target.value as Prioridad })}>{PRIORIDADES.map((t) => <option key={t}>{t}</option>)}</select></label>
        <label className="text-sm font-medium text-slate-700 sm:col-span-2">Descripción<textarea rows={3} className={`${campo} mt-1`} value={d.descripcion} onChange={(e) => setD({ ...d, descripcion: e.target.value })} /></label>
        {err && <p role="alert" className="text-sm text-red-700 sm:col-span-2">{err}</p>}
        <div className="sm:col-span-2"><button className="rounded-md px-6 py-3 text-sm font-bold text-white" style={{ background: C.marino }}>Crear orden</button></div>
      </form>
    </Cont>
  );
}

function Detalle() {
  const { id } = useParams();
  const { ordenes, aplicar } = useOrdenes();
  const o = ordenes.find((x) => x.id === id);
  const [tec, setTec] = useState("");
  const [informe, setInforme] = useState("");
  const [msj, setMsj] = useState<string | null>(null);
  if (!o) return <Cont className="text-center"><h1 className="font-display text-3xl font-semibold text-slate-900">Orden no encontrada</h1><div className="mt-6"><Boton to={`${BASE}/ordenes`}>Volver a las órdenes</Boton></div></Cont>;
  const elegibles = tecnicosElegibles(ordenes, o);
  const puedeAsignar = o.estado === "Pendiente" || o.estado === "Asignada";
  const mover = (a: EstadoOrden) => setMsj(aplicar(cambiarEstado(ordenes, o.id, a, informe)));
  return (
    <Cont>
      <Link to={`${BASE}/ordenes`} className="text-sm font-semibold underline" style={{ color: C.marino }}>← Volver a las órdenes</Link>
      <div className="mt-4 flex flex-wrap items-center gap-3"><h1 className="font-display text-4xl font-semibold text-slate-900">{o.codigo}</h1><Insignia e={o.estado} /></div>
      <p className="mt-2 text-lg text-slate-700">{o.equipo} · {o.cliente}</p>
      <dl className="mt-6 grid gap-3 sm:grid-cols-4">{([["Tipo", o.tipo], ["Prioridad", o.prioridad], ["Técnico", tecnicoPorId(o.tecnicoId)?.nombre ?? "Sin asignar"], ["Estado", o.estado]] as const).map(([k, v]) => <div key={k} className="rounded-md bg-white p-3 ring-1 ring-slate-200"><dt className="text-xs text-slate-500">{k}</dt><dd className="font-semibold text-slate-900">{v}</dd></div>)}</dl>
      <p className="mt-6 text-slate-700">{o.descripcion}</p>
      {o.informe && <div className="mt-4 rounded-md bg-green-50 p-4 text-sm text-green-900 ring-1 ring-green-200"><p className="font-semibold">Informe de cierre</p><p className="mt-1">{o.informe}</p></div>}

      <section aria-labelledby="sm-acc" className="mt-8 rounded-md bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 id="sm-acc" className="font-display text-xl font-semibold text-slate-900">Acciones</h2>
        {puedeAsignar && (
          <div className="mt-4 flex flex-wrap items-end gap-3">
            <label className="text-sm font-medium text-slate-700">Asignar técnico<select className={`${campo} mt-1 min-w-56`} value={tec} onChange={(e) => setTec(e.target.value)}><option value="">Elige un técnico</option>{elegibles.map((t) => <option key={t.id} value={t.id}>{t.nombre} ({cargaTecnico(ordenes, t.id)}/{CAPACIDAD})</option>)}</select></label>
            <button type="button" onClick={() => setMsj(aplicar(asignar(ordenes, o.id, tec)))} className="rounded-md px-5 py-2.5 text-sm font-bold text-white" style={{ background: C.marino }}>Asignar</button>
          </div>)}
        {o.estado === "En revisión" && <label className="mt-4 block text-sm font-medium text-slate-700">Informe de cierre<textarea rows={3} className={`${campo} mt-1`} value={informe} onChange={(e) => setInforme(e.target.value)} /></label>}
        <div className="mt-4 flex flex-wrap gap-3">{transicionesDe(o.estado).map((a) => (
          <button key={a} type="button" onClick={() => mover(a)} className={`rounded-md px-5 py-2.5 text-sm font-bold ${a === "Cancelada" ? "text-red-700 ring-1 ring-red-300" : "text-white"}`} style={a === "Cancelada" ? undefined : { background: C.naranjaBtn }}>{a === "Pendiente" ? "Devolver a pendiente" : a === "En ejecución" && o.estado === "En revisión" ? "Rechazar y volver a ejecución" : `Pasar a ${a}`}</button>))}
          {!transicionesDe(o.estado).length && <p className="text-sm text-slate-600">Esta orden está {o.estado.toLowerCase()} y no admite más cambios.</p>}</div>
        {msj && <p role="alert" className="mt-3 text-sm text-red-700">{msj}</p>}
      </section>

      <section aria-labelledby="sm-hist" className="mt-8">
        <h2 id="sm-hist" className="font-display text-xl font-semibold text-slate-900">Historial</h2>
        <ol className="mt-3 space-y-2 border-l-2 pl-4" style={{ borderColor: C.gris }}>{o.historial.map((h, i) => <li key={i} className="text-sm"><span className="font-mono text-xs text-slate-500">{h.fecha}</span> — {h.texto}</li>)}</ol>
      </section>
    </Cont>
  );
}

function Tecnicos() {
  const { ordenes } = useOrdenes();
  return (
    <Cont>
      <h1 className="font-display text-4xl font-semibold text-slate-900">Técnicos</h1>
      <p className="mt-2 text-slate-600">Cada técnico puede tener hasta {CAPACIDAD} órdenes activas (asignadas o en ejecución).</p>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2">{TECNICOS.map((t) => {
        const carga = cargaTecnico(ordenes, t.id);
        return (
          <li key={t.id} className="flex gap-4 rounded-md bg-white p-4 shadow-sm ring-1 ring-slate-200">
            {t.foto ? <img src={rutaAsset(t.foto)} alt={`Retrato de ${t.nombre}`} loading="lazy" className="h-24 w-20 rounded-md object-cover object-top" /> : <div aria-hidden="true" className="flex h-24 w-20 items-center justify-center rounded-md text-2xl font-bold text-white" style={{ background: C.marino }}>{t.nombre.split(" ").map((p) => p[0]).join("")}</div>}
            <div><h2 className="font-display text-lg font-semibold text-slate-900">{t.nombre}</h2><p className="text-sm text-slate-600">{t.especialidades.join(" · ")}</p>
              <p className={`mt-2 text-sm font-semibold ${carga >= CAPACIDAD ? "text-red-700" : "text-green-700"}`}>Carga: {carga}/{CAPACIDAD} {carga >= CAPACIDAD ? "(completa)" : "(disponible)"}</p></div></li>);
      })}</ul>
    </Cont>
  );
}

export default function Servimant() {
  return (
    <ProveedorOrdenes>
      <div style={{ background: C.fondo }} className="text-slate-800">
        <ScrollArriba />
        <Cabecera />
        <main className="min-h-[60vh]">
          <Routes>
            <Route index element={<Inicio />} />
            <Route path="ordenes" element={<Ordenes />} />
            <Route path="ordenes/:id" element={<Detalle />} />
            <Route path="tecnicos" element={<Tecnicos />} />
            <Route path="*" element={<Cont className="text-center"><h1 className="font-display text-3xl font-semibold">Página no encontrada</h1><div className="mt-6"><Boton to={BASE}>Volver al inicio</Boton></div></Cont>} />
          </Routes>
        </main>
        <footer style={{ background: C.marino }} className="text-white/75"><div className="mx-auto max-w-6xl px-4 py-9 text-sm"><p className="font-display text-lg text-white">Servimant</p><p className="mt-5 text-xs text-white/80">Servimant es una empresa ficticia creada para una demostración de SYNEXA. Clientes, equipos y personas son inventados y los datos se guardan solo en tu navegador. Fotografías generadas con IA.</p></div></footer>
      </div>
    </ProveedorOrdenes>
  );
}

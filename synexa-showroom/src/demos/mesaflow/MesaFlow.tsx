import { createContext, useContext, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import { IsotipoMarca } from "@/componentes/IsotipoMarca";
import { marcaPorId } from "@/datos/marcas";
import { rutaAsset } from "@/utilidades/assets";
import { MenuMovil, ScrollArriba, usePersistente } from "../compartido/utiles";
import {
  AGENTES, BASE, C, CATEGORIAS, CLAVE, ESTADO_INICIAL, PRIORIDADES, ROLES, SLA_HORAS, avanzarReloj, cambiarEstado, cambiarPrioridad, comentar, crearTicket,
  destinosPermitidos, horasRestantes, metricas, reasignar, semaforo, usuarioDe, visibles,
  type Categoria, type Estado, type EstadoTicket, type Prioridad, type Rol, type Semaforo, type Ticket,
} from "./reglas";

const marca = marcaPorId("mesaflow")!;

interface Ctx { e: Estado; aplicar: (r: { estado: Estado } | { error: string }) => string | null; setRol: (r: Rol) => void; reloj: (h: number) => void }
const Contexto = createContext<Ctx | null>(null);
const useMesa = () => { const c = useContext(Contexto); if (!c) throw new Error("falta ProveedorMesa"); return c; };

function ProveedorMesa({ children }: { children: ReactNode }) {
  const [e, setE] = usePersistente<Estado>(CLAVE, ESTADO_INICIAL);
  const valor = useMemo<Ctx>(() => ({
    e,
    aplicar: (r) => { if ("error" in r) return r.error; setE(r.estado); return null; },
    setRol: (rol) => setE((p) => ({ ...p, rol })),
    reloj: (h) => setE((p) => avanzarReloj(p, h)),
  }), [e, setE]);
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

const Cont = ({ children, className = "" }: { children: ReactNode; className?: string }) => <div className={`mx-auto max-w-6xl px-4 py-12 ${className}`}>{children}</div>;
const Boton = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={to} className="inline-flex rounded-md px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90" style={{ background: C.turquesaOscuro }}>{children}</Link>
);
const campo = "w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#14b8a6]/30";

const COLOR_SLA: Record<Semaforo, string> = { "En plazo": "bg-green-100 text-green-800", "Por vencer": "bg-amber-100 text-amber-900", Vencido: "bg-red-100 text-red-800", "No aplica": "bg-slate-100 text-slate-600" };
const COLOR_ESTADO: Record<EstadoTicket, string> = { Nuevo: "bg-sky-100 text-sky-900", "En atención": "bg-teal-100 text-teal-900", "En espera": "bg-slate-200 text-slate-800", Resuelto: "bg-green-100 text-green-800", Cerrado: "bg-slate-100 text-slate-600" };
const Pastilla = ({ clase, children }: { clase: string; children: ReactNode }) => <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${clase}`}>{children}</span>;

function Cabecera() {
  const { e, setRol } = useMesa();
  const MENU = [["", "Inicio"], ["tickets", "Tickets"], ["reportes", "Reportes"]] as const;
  const estilo = ({ isActive }: { isActive: boolean }) => `rounded-md px-3 py-2 text-sm font-semibold ${isActive ? "bg-white/15 text-white" : "text-white/70 hover:text-white"}`;
  return (
    <header className="sticky top-11 z-40 text-white" style={{ background: C.marino }}>
      <div className="relative"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link to={BASE} className="flex items-center gap-3" aria-label="MesaFlow, inicio"><IsotipoMarca marca={marca} size={32} /><span className="font-display text-xl font-semibold">MesaFlow</span></Link>
        <nav aria-label="Principal" className="hidden md:flex">{MENU.map(([r, t]) => <NavLink key={r} to={r ? `${BASE}/${r}` : BASE} end={r === ""} className={estilo}>{t}</NavLink>)}</nav>
        <MenuMovil id="mf-menu"><ul style={{ background: C.marino }}>{MENU.map(([r, t]) => <li key={r}><NavLink to={r ? `${BASE}/${r}` : BASE} end={r === ""} className="block rounded px-3 py-3 text-white">{t}</NavLink></li>)}</ul></MenuMovil>
      </div></div>
      <div className="border-t border-white/10 bg-black/25"><div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2">
        <label htmlFor="mf-rol" className="text-xs text-white/75">Ver como</label>
        <select id="mf-rol" value={e.rol} onChange={(ev) => setRol(ev.target.value as Rol)} className="min-w-0 rounded-md border border-white/30 bg-[#0b1f44] px-2 py-1.5 text-sm text-white">{ROLES.map((r) => <option key={r.id} value={r.id}>{r.nombre}</option>)}</select>
        <span className="hidden text-xs text-white/80 sm:inline">Sesión simulada de {usuarioDe(e.rol)}</span>
      </div></div>
    </header>
  );
}

function Inicio() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={rutaAsset("assets/mesaflow/hero.webp")} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(90deg, rgba(11,31,68,.93), rgba(11,31,68,.6) 60%, rgba(11,31,68,.3))" }} />
        <div className="mx-auto max-w-6xl px-4 py-28 sm:py-36">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: C.turquesa }}>Soporte informático empresarial</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">Cada solicitud, con dueño y con plazo.</h1>
          <p className="mt-6 max-w-lg text-lg text-white/85">Una mesa de ayuda con reglas propias: quién puede hacer qué, y cuánto tiempo hay para resolver.</p>
          <div className="mt-9"><Boton to={`${BASE}/tickets`}>Abrir la mesa de ayuda</Boton></div>
        </div>
      </section>
      <section className="bg-white"><Cont>
        <h2 className="font-display text-3xl font-semibold text-slate-900">Tres roles, tres vistas</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-3">{[
          ["especialista-1", "Solicitante", "Abre tickets y ve solo los suyos. Cierra o reabre cuando se resuelven."],
          ["especialista-2", "Agente de soporte", "Toma tickets, los pone en espera, comenta y los resuelve con una explicación."],
          ["especialista-3", "Administrador", "Reasigna, cambia prioridades y mira el cumplimiento de los plazos."],
        ].map(([img, t, d]) => <li key={t}><img src={rutaAsset(`assets/mesaflow/${img}.webp`)} alt="" loading="lazy" className="aspect-[3/4] w-full rounded-md object-cover object-top" /><h3 className="mt-4 font-display text-xl font-semibold text-slate-900">{t}</h3><p className="mt-1 text-slate-600">{d}</p></li>)}</ul>
        <p className="mt-8 text-sm text-slate-600">Cambia de rol con el selector «Ver como» de la parte superior. Plazos de ejemplo: crítica 4 h, alta 8 h, media 24 h, baja 72 h.</p>
      </Cont></section>
      <section style={{ background: C.fondo }}><Cont className="grid items-center gap-8 md:grid-cols-2">
        <img src={rutaAsset("assets/mesaflow/mesa-soporte.webp")} alt="Escritorio con pantallas de soporte" loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover" />
        <div><h2 className="font-display text-3xl font-semibold text-slate-900">Demostración con datos ficticios</h2><p className="mt-4 text-slate-700">Personas, empresas y tickets son inventados. Todo se guarda solo en tu navegador.</p></div>
      </Cont></section>
    </>
  );
}

function Tickets() {
  const { e, aplicar } = useMesa();
  const lista = visibles(e.tickets, e.rol);
  const [d, setD] = useState({ titulo: "", descripcion: "", categoria: CATEGORIAS[0] as Categoria, prioridad: "Media" as Prioridad });
  const [err, setErr] = useState<string | null>(null);
  const crear = (ev: FormEvent) => {
    ev.preventDefault();
    const r = aplicar(crearTicket(e, d));
    setErr(r);
    if (!r) setD({ ...d, titulo: "", descripcion: "" });
  };
  return (
    <Cont>
      <h1 className="font-display text-4xl font-semibold text-slate-900">Tickets</h1>
      <p className="mt-2 text-slate-600" role="status">{e.rol === "solicitante" ? "Estás viendo solo tus tickets." : "Estás viendo todos los tickets."} {lista.length === 1 ? "1 ticket." : `${lista.length} tickets.`}</p>
      <ul className="mt-6 space-y-3">{lista.map((x) => (
        <li key={x.id}><Link to={`${BASE}/tickets/${x.id}`} className="block rounded-md bg-white p-4 shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-mono text-sm font-semibold" style={{ color: C.turquesaOscuro }}>{x.codigo}</p><span className="flex gap-2"><Pastilla clase={COLOR_ESTADO[x.estado]}>{x.estado}</Pastilla><Pastilla clase={COLOR_SLA[semaforo(x, e.reloj)]}>{semaforo(x, e.reloj) === "No aplica" ? "Sin plazo" : semaforo(x, e.reloj)}</Pastilla></span></div>
          <p className="mt-1 font-semibold text-slate-900">{x.titulo}</p>
          <p className="mt-1 text-sm text-slate-600">{x.categoria} · Prioridad {x.prioridad.toLowerCase()} · {x.agente ?? "Sin agente"}{e.rol !== "solicitante" ? ` · Solicita ${x.solicitante}` : ""}</p></Link></li>))}</ul>
      {!lista.length && <p className="mt-4 rounded-md bg-white p-8 text-center text-slate-600 ring-1 ring-slate-200">No hay tickets para mostrar.</p>}

      {e.rol === "solicitante" ? (
        <form onSubmit={crear} noValidate aria-label="Nuevo ticket" className="mt-12 grid gap-4 rounded-md bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:grid-cols-2">
          <h2 className="font-display text-xl font-semibold text-slate-900 sm:col-span-2">Abrir un ticket</h2>
          <label className="text-sm font-medium text-slate-700 sm:col-span-2">Título<input className={`${campo} mt-1`} value={d.titulo} onChange={(ev) => setD({ ...d, titulo: ev.target.value })} /></label>
          <label className="text-sm font-medium text-slate-700">Categoría<select className={`${campo} mt-1`} value={d.categoria} onChange={(ev) => setD({ ...d, categoria: ev.target.value as Categoria })}>{CATEGORIAS.map((c) => <option key={c}>{c}</option>)}</select></label>
          <label className="text-sm font-medium text-slate-700">Prioridad<select className={`${campo} mt-1`} value={d.prioridad} onChange={(ev) => setD({ ...d, prioridad: ev.target.value as Prioridad })}>{PRIORIDADES.map((c) => <option key={c} value={c}>{c} ({SLA_HORAS[c]} h)</option>)}</select></label>
          <label className="text-sm font-medium text-slate-700 sm:col-span-2">Descripción<textarea rows={3} className={`${campo} mt-1`} value={d.descripcion} onChange={(ev) => setD({ ...d, descripcion: ev.target.value })} /></label>
          {err && <p role="alert" className="text-sm text-red-700 sm:col-span-2">{err}</p>}
          <div className="sm:col-span-2"><button className="rounded-md px-6 py-3 text-sm font-bold text-white" style={{ background: C.turquesaOscuro }}>Crear ticket</button></div>
        </form>
      ) : <p className="mt-10 rounded-md bg-white p-4 text-sm text-slate-600 ring-1 ring-slate-200">Solo los solicitantes abren tickets. Cambia a «Solicitante» para crear uno.</p>}
    </Cont>
  );
}

function Detalle() {
  const { id } = useParams();
  const { e, aplicar } = useMesa();
  const x = visibles(e.tickets, e.rol).find((y) => y.id === id);
  const [resol, setResol] = useState("");
  const [coment, setComent] = useState("");
  const [msj, setMsj] = useState<string | null>(null);
  if (!x) return <Cont className="text-center"><h1 className="font-display text-3xl font-semibold text-slate-900">Ticket no disponible</h1><p className="mt-3 text-slate-600">No existe o no tienes permiso para verlo con este rol.</p><div className="mt-6"><Boton to={`${BASE}/tickets`}>Volver a los tickets</Boton></div></Cont>;
  const sla = semaforo(x, e.reloj);
  const destinos = destinosPermitidos(x, e.rol);
  const mover = (a: EstadoTicket) => setMsj(aplicar(cambiarEstado(e, x.id, a, resol)));
  const nombreAccion = (a: EstadoTicket) => (x.estado === "Nuevo" ? "Tomar ticket" : x.estado === "Resuelto" && a === "En atención" ? "Reabrir" : x.estado === "Resuelto" ? "Cerrar ticket" : `Pasar a ${a.toLowerCase()}`);
  const comentarForm = (ev: FormEvent) => { ev.preventDefault(); const r = aplicar(comentar(e, x.id, coment)); setMsj(r); if (!r) setComent(""); };
  return (
    <Cont>
      <Link to={`${BASE}/tickets`} className="text-sm font-semibold underline" style={{ color: C.turquesaOscuro }}>← Volver a los tickets</Link>
      <div className="mt-4 flex flex-wrap items-center gap-3"><h1 className="font-display text-3xl font-semibold text-slate-900 sm:text-4xl">{x.codigo} · {x.titulo}</h1></div>
      <p className="mt-3 flex flex-wrap gap-2"><Pastilla clase={COLOR_ESTADO[x.estado]}>{x.estado}</Pastilla><Pastilla clase={COLOR_SLA[sla]}>{sla === "No aplica" ? "Sin plazo" : `${sla} · ${horasRestantes(x, e.reloj) >= 0 ? `quedan ${horasRestantes(x, e.reloj)} h` : `${-horasRestantes(x, e.reloj)} h de atraso`}`}</Pastilla></p>
      <dl className="mt-6 grid gap-3 sm:grid-cols-4">{([["Categoría", x.categoria], ["Prioridad", `${x.prioridad} (${SLA_HORAS[x.prioridad]} h)`], ["Solicitante", x.solicitante], ["Agente", x.agente ?? "Sin asignar"]] as const).map(([k, v]) => <div key={k} className="rounded-md bg-white p-3 ring-1 ring-slate-200"><dt className="text-xs text-slate-500">{k}</dt><dd className="font-semibold text-slate-900">{v}</dd></div>)}</dl>
      <p className="mt-6 text-slate-700">{x.descripcion}</p>
      {x.resolucion && <div className="mt-4 rounded-md bg-green-50 p-4 text-sm text-green-900 ring-1 ring-green-200"><p className="font-semibold">Resolución</p><p className="mt-1">{x.resolucion}</p></div>}

      <section aria-labelledby="mf-acc" className="mt-8 rounded-md bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 id="mf-acc" className="font-display text-xl font-semibold text-slate-900">Acciones disponibles para tu rol</h2>
        {x.estado === "En atención" && destinos.includes("Resuelto") && <label className="mt-4 block text-sm font-medium text-slate-700">Cómo se resolvió<textarea rows={2} className={`${campo} mt-1`} value={resol} onChange={(ev) => setResol(ev.target.value)} /></label>}
        <div className="mt-4 flex flex-wrap gap-3">{destinos.map((a) => <button key={a} type="button" onClick={() => mover(a)} className="rounded-md px-5 py-2.5 text-sm font-bold text-white" style={{ background: C.turquesaOscuro }}>{nombreAccion(a)}</button>)}
          {!destinos.length && <p className="text-sm text-slate-600">{x.estado === "Cerrado" ? "El ticket está cerrado." : "Con este rol no hay acciones de estado para este ticket."}</p>}</div>
        {e.rol === "admin" && esAbiertoUI(x) && (
          <div className="mt-5 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">Reasignar a<select className={`${campo} mt-1`} value={x.agente ?? ""} onChange={(ev) => setMsj(aplicar(reasignar(e, x.id, ev.target.value)))}><option value="" disabled>Sin asignar</option>{AGENTES.map((a) => <option key={a}>{a}</option>)}</select></label>
            <label className="text-sm font-medium text-slate-700">Prioridad<select className={`${campo} mt-1`} value={x.prioridad} onChange={(ev) => setMsj(aplicar(cambiarPrioridad(e, x.id, ev.target.value as Prioridad)))}>{PRIORIDADES.map((p) => <option key={p}>{p}</option>)}</select></label>
          </div>)}
        {msj && <p role="alert" className="mt-3 text-sm text-red-700">{msj}</p>}
      </section>

      <section aria-labelledby="mf-com" className="mt-8">
        <h2 id="mf-com" className="font-display text-xl font-semibold text-slate-900">Comentarios</h2>
        <ul className="mt-3 space-y-2">{x.comentarios.map((c, i) => <li key={i} className="rounded-md bg-white p-3 text-sm ring-1 ring-slate-200"><p className="text-xs text-slate-500">{c.autor} · {ROLES.find((r) => r.id === c.rol)!.nombre}</p><p className="mt-1">{c.texto}</p></li>)}</ul>
        {!x.comentarios.length && <p className="mt-2 text-sm text-slate-600">Aún no hay comentarios.</p>}
        {x.estado !== "Cerrado" && (
          <form onSubmit={comentarForm} noValidate className="mt-4 max-w-xl" aria-label="Agregar comentario">
            <label htmlFor="mf-coment" className="text-sm font-medium text-slate-700">Nuevo comentario</label>
            <textarea id="mf-coment" rows={2} className={campo} value={coment} onChange={(ev) => setComent(ev.target.value)} />
            <button className="mt-3 rounded-md px-5 py-2.5 text-sm font-bold text-white" style={{ background: C.marino }}>Comentar</button>
          </form>)}
      </section>
    </Cont>
  );
}
const esAbiertoUI = (x: Ticket) => x.estado !== "Resuelto" && x.estado !== "Cerrado";

function Reportes() {
  const { e, reloj } = useMesa();
  if (e.rol !== "admin") return <Cont className="text-center"><h1 className="font-display text-3xl font-semibold text-slate-900">Reportes</h1><p className="mx-auto mt-3 max-w-md rounded-md bg-amber-50 p-4 text-amber-900 ring-1 ring-amber-200">Los reportes son solo para administradores. Cambia el rol con «Ver como» para verlos.</p></Cont>;
  const m = metricas(e.tickets, e.reloj);
  return (
    <Cont>
      <h1 className="font-display text-4xl font-semibold text-slate-900">Reportes</h1>
      <dl className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-5">{([["Tickets", m.total], ["Abiertos", m.abiertos], ["Vencidos", m.vencidos], ["Sin agente", m.sinAgente], ["Cumplimiento de plazos", `${m.cumplimiento}%`]] as const).map(([k, v]) => <div key={k} className="rounded-md bg-white p-4 shadow-sm ring-1 ring-slate-200"><dt className="text-xs uppercase tracking-wider text-slate-500">{k}</dt><dd className="mt-1 text-2xl font-bold tabular-nums text-slate-900">{v}</dd></div>)}</dl>
      <section aria-labelledby="mf-est" className="mt-8 rounded-md bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 id="mf-est" className="font-display text-xl font-semibold text-slate-900">Tickets por estado</h2>
        <ul className="mt-4 space-y-3">{m.porEstado.map((s) => <li key={s.estado}><div className="flex justify-between text-sm"><span>{s.estado}</span><span className="font-semibold tabular-nums">{s.cantidad}</span></div><div className="mt-1 h-2.5 rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: `${m.total ? (s.cantidad / m.total) * 100 : 0}%`, background: C.turquesaOscuro }} /></div></li>)}</ul>
      </section>
      <section aria-labelledby="mf-reloj" className="mt-6 rounded-md bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 id="mf-reloj" className="font-display text-xl font-semibold text-slate-900">Reloj de la demostración</h2>
        <p className="mt-2 text-sm text-slate-600">El reloj es simulado: avánzalo para ver cómo los tickets abiertos pasan a «por vencer» y «vencido». Transcurridas: <strong>{e.reloj} h</strong>.</p>
        <button type="button" onClick={() => reloj(4)} className="mt-4 rounded-md px-5 py-2.5 text-sm font-bold text-white" style={{ background: C.turquesaOscuro }}>Avanzar el reloj 4 horas</button>
      </section>
    </Cont>
  );
}

export default function MesaFlow() {
  return (
    <ProveedorMesa>
      <div style={{ background: C.fondo }} className="text-slate-800">
        <ScrollArriba />
        <Cabecera />
        <main className="min-h-[60vh]">
          <Routes>
            <Route index element={<Inicio />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="tickets/:id" element={<Detalle />} />
            <Route path="reportes" element={<Reportes />} />
            <Route path="*" element={<Cont className="text-center"><h1 className="font-display text-3xl font-semibold">Página no encontrada</h1><div className="mt-6"><Boton to={BASE}>Volver al inicio</Boton></div></Cont>} />
          </Routes>
        </main>
        <footer style={{ background: C.marino }} className="text-white/75"><div className="mx-auto max-w-6xl px-4 py-9 text-sm"><p className="font-display text-lg text-white">MesaFlow</p><p className="mt-5 text-xs text-white/80">MesaFlow es una empresa ficticia creada para una demostración de SYNEXA. Personas, empresas y tickets son inventados y los datos se guardan solo en tu navegador. Fotografías generadas con IA.</p></div></footer>
      </div>
    </ProveedorMesa>
  );
}

import { createContext, useContext, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link, NavLink, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { IsotipoMarca } from "@/componentes/IsotipoMarca";
import { marcaPorId } from "@/datos/marcas";
import { rutaAsset } from "@/utilidades/assets";
import { MenuMovil, ScrollArriba, usePersistente } from "../compartido/utiles";
import {
  BASE, C, CLAVE, CLIENTE_DEMO, DOCUMENTOS, ESTADO_INICIAL, ETAPAS, PROYECTOS, estadoEtapa, fechaCorta, pendientesAprobacion, porcentajeAvance, puedeAprobar,
  validarMensaje, type EstadoPortal,
} from "./portal";

const marca = marcaPorId("trama")!;

interface Ctx { e: EstadoPortal; entrar: () => void; salir: () => void; aprobar: (id: string) => void; enviar: (texto: string) => void }
const Contexto = createContext<Ctx | null>(null);
const usePortal = () => { const c = useContext(Contexto); if (!c) throw new Error("falta ProveedorPortal"); return c; };

function ProveedorPortal({ children }: { children: ReactNode }) {
  const [e, setE] = usePersistente<EstadoPortal>(CLAVE, ESTADO_INICIAL);
  const valor = useMemo<Ctx>(() => ({
    e,
    entrar: () => setE((p) => ({ ...p, sesion: true })),
    salir: () => setE((p) => ({ ...p, sesion: false })),
    aprobar: (id) => setE((p) => (p.aprobados.includes(id) ? p : { ...p, aprobados: [...p.aprobados, id] })),
    enviar: (texto) => setE((p) => ({ ...p, mensajes: [...p.mensajes, { id: `m${Date.now()}`, de: "cliente", texto: texto.trim(), fecha: new Date().toISOString().slice(0, 10) }] })),
  }), [e, setE]);
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

const Cont = ({ children, className = "" }: { children: ReactNode; className?: string }) => <div className={`mx-auto max-w-6xl px-4 py-14 ${className}`}>{children}</div>;
const Boton = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={to} className="inline-flex rounded-none px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black" style={{ background: C.negro }}>{children}</Link>
);
const campo = "w-full border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/20";

function Cabecera() {
  const { e } = usePortal();
  const MENU = [["", "Estudio"], ["proyectos", "Proyectos"], ["portal", e.sesion ? "Mi proyecto" : "Portal de clientes"]] as const;
  const estilo = ({ isActive }: { isActive: boolean }) => `px-3 py-2 text-sm font-medium uppercase tracking-widest ${isActive ? "text-black underline underline-offset-8 decoration-[#c9b28a]" : "text-neutral-600 hover:text-black"}`;
  return (
    <header className="sticky top-11 z-40 border-b border-neutral-200 bg-white">
      <div className="relative"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to={BASE} className="flex items-center gap-3" aria-label="Trama Arquitectura, inicio"><IsotipoMarca marca={marca} size={32} /><span className="font-display text-xl font-semibold tracking-wide">Trama</span></Link>
        <nav aria-label="Principal" className="hidden md:flex">{MENU.map(([r, t]) => <NavLink key={r} to={r ? `${BASE}/${r}` : BASE} end={r === ""} className={estilo}>{t}</NavLink>)}</nav>
        <MenuMovil id="tr-menu"><ul className="bg-white">{MENU.map(([r, t]) => <li key={r}><NavLink to={r ? `${BASE}/${r}` : BASE} end={r === ""} className="block px-3 py-3">{t}</NavLink></li>)}</ul></MenuMovil>
      </div></div>
    </header>
  );
}

function Inicio() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={rutaAsset("assets/trama/hero.webp")} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-32 sm:py-44">
          <p className="text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: C.arena }}>Estudio de arquitectura</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">Casas y edificios que dialogan con el paisaje.</h1>
          <div className="mt-9 flex flex-wrap gap-3"><Boton to={`${BASE}/proyectos`}>Ver proyectos</Boton><Link to={`${BASE}/portal`} className="inline-flex border border-white/70 px-7 py-3.5 text-sm font-semibold uppercase tracking-widest hover:bg-white hover:text-black">Portal de clientes</Link></div>
        </div>
      </section>
      <section style={{ background: C.hueso }}><Cont className="grid items-center gap-10 md:grid-cols-2">
        <img src={rutaAsset("assets/trama/equipo.webp")} alt="Equipo del estudio alrededor de una maqueta" loading="lazy" className="aspect-[4/3] w-full object-cover" />
        <div><h2 className="font-display text-3xl font-semibold">Del anteproyecto a la entrega, con el cliente dentro del proceso.</h2>
          <p className="mt-4 text-neutral-700">Cada proyecto tiene un espacio privado donde se ve la etapa en curso, se revisan y aprueban los documentos y se conversa con el equipo. Esta es una demostración con datos ficticios.</p>
          <div className="mt-7"><Boton to={`${BASE}/portal`}>Probar el portal</Boton></div></div>
      </Cont></section>
      <section className="bg-white"><Cont>
        <h2 className="font-display text-3xl font-semibold">Obra reciente</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2">{PROYECTOS.slice(0, 2).map((p) => <li key={p.id}><img src={rutaAsset(p.imagen)} alt={p.nombre} loading="lazy" className="aspect-[4/3] w-full object-cover" /><h3 className="mt-3 font-display text-xl font-semibold">{p.nombre}</h3><p className="text-sm text-neutral-600">{p.lugar} · {p.anio}</p></li>)}</ul>
      </Cont></section>
    </>
  );
}

function Proyectos() {
  return (
    <Cont>
      <h1 className="font-display text-4xl font-semibold">Proyectos</h1>
      <ul className="mt-10 grid gap-8 sm:grid-cols-2">{PROYECTOS.map((p) => (
        <li key={p.id}><img src={rutaAsset(p.imagen)} alt={p.nombre} loading="lazy" className="aspect-[4/3] w-full object-cover" />
          <h2 className="mt-4 font-display text-2xl font-semibold">{p.nombre}</h2><p className="text-sm uppercase tracking-widest text-neutral-500">{p.lugar} · {p.anio}</p><p className="mt-2 text-neutral-700">{p.texto}</p></li>))}</ul>
      <div className="mt-14 grid gap-5 sm:grid-cols-3">{["interior-1", "interior-2", "interior-3"].map((i) => <img key={i} src={rutaAsset(`assets/trama/${i}.webp`)} alt="Interior de un proyecto del estudio" loading="lazy" className="aspect-[3/4] w-full object-cover" />)}</div>
      <p className="mt-6 text-xs text-neutral-500">Trama es un estudio ficticio; los proyectos son imágenes generadas con IA.</p>
    </Cont>
  );
}

function Acceso() {
  const { e, entrar } = usePortal();
  const ir = useNavigate();
  if (e.sesion) return <Navigate to={`${BASE}/portal/panel`} replace />;
  return (
    <Cont className="grid items-center gap-10 md:grid-cols-2">
      <div>
        <h1 className="font-display text-4xl font-semibold">Portal de clientes</h1>
        <p className="mt-4 text-neutral-700">Aquí cada cliente ve el avance de su proyecto, revisa y aprueba documentos y conversa con el estudio.</p>
        <div className="mt-8 border border-neutral-300 bg-white p-6">
          <p className="text-sm text-neutral-600">Esta demostración no usa cuentas reales ni contraseñas. Entra con un cliente ficticio para recorrer el panel.</p>
          <button type="button" onClick={() => { entrar(); ir(`${BASE}/portal/panel`); }} className="mt-5 w-full px-6 py-3.5 text-sm font-semibold uppercase tracking-widest text-white" style={{ background: C.negro }}>Entrar como cliente de demostración</button>
        </div>
      </div>
      <img src={rutaAsset("assets/trama/planos.webp")} alt="Planos y regla de escala sobre una mesa" className="aspect-[4/3] w-full object-cover" />
    </Cont>
  );
}

function Panel() {
  const { e, salir, aprobar, enviar } = usePortal();
  const ir = useNavigate();
  const [texto, setTexto] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [aviso, setAviso] = useState("");
  if (!e.sesion) return <Navigate to={`${BASE}/portal`} replace />;
  const pend = pendientesAprobacion(e.aprobados);
  const mandar = (ev: FormEvent) => {
    ev.preventDefault();
    const m = validarMensaje(texto);
    setErr(m);
    if (m) return;
    enviar(texto);
    setTexto("");
  };
  return (
    <Cont>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: C.arenaOscura }}>Cliente de demostración</p>
          <h1 className="mt-2 font-display text-4xl font-semibold">{CLIENTE_DEMO.proyecto}</h1><p className="mt-1 text-neutral-600">{CLIENTE_DEMO.nombre} · {CLIENTE_DEMO.ubicacion}</p></div>
        <button type="button" onClick={() => { salir(); ir(`${BASE}/portal`); }} className="border border-neutral-400 px-5 py-2.5 text-sm font-semibold uppercase tracking-widest hover:bg-neutral-900 hover:text-white">Salir</button>
      </div>

      <section aria-labelledby="tr-avance" className="mt-10">
        <h2 id="tr-avance" className="font-display text-2xl font-semibold">Avance del proyecto: {porcentajeAvance(e.etapa)}%</h2>
        <div className="mt-4 h-2 w-full bg-neutral-200" role="progressbar" aria-valuenow={porcentajeAvance(e.etapa)} aria-valuemin={0} aria-valuemax={100} aria-label="Avance del proyecto"><div className="h-full" style={{ width: `${porcentajeAvance(e.etapa)}%`, background: C.negro }} /></div>
        <ol className="mt-6 grid gap-3 sm:grid-cols-5">{ETAPAS.map((t, i) => { const s = estadoEtapa(i, e.etapa); return (
          <li key={t} className="border p-4" style={{ borderColor: s === "en curso" ? C.negro : "#d4d4d4", background: s === "pendiente" ? "#fafafa" : "#fff" }}>
            <p className="text-xs uppercase tracking-widest text-neutral-500">Etapa {i + 1}</p><p className="mt-1 font-semibold">{t}</p>
            <p className={`mt-2 text-xs font-semibold ${s === "completada" ? "text-green-700" : s === "en curso" ? "text-neutral-900" : "text-neutral-400"}`}>{s === "completada" ? "✓ Completada" : s === "en curso" ? "● En curso" : "Pendiente"}</p></li>); })}</ol>
      </section>

      <section aria-labelledby="tr-docs" className="mt-12">
        <h2 id="tr-docs" className="font-display text-2xl font-semibold">Documentos</h2>
        <p role="status" className="mt-2 text-sm text-neutral-600">{pend === 0 ? "No tienes documentos pendientes de aprobación." : pend === 1 ? "Tienes 1 documento pendiente de aprobación." : `Tienes ${pend} documentos pendientes de aprobación.`}</p>
        <ul className="mt-4 divide-y divide-neutral-200 border-y border-neutral-200">{DOCUMENTOS.map((d) => (
          <li key={d.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div><p className="font-medium">{d.nombre}</p><p className="text-sm text-neutral-500">{d.tipo} · {d.version} · {fechaCorta(d.fecha)}</p></div>
            <div className="flex items-center gap-3">
              <button type="button" className="text-sm font-semibold underline" onClick={() => setAviso(`Descarga simulada de «${d.nombre}»: esta demostración no contiene archivos reales.`)} aria-label={`Descargar ${d.nombre}`}>Descargar</button>
              {d.requiereAprobacion && (e.aprobados.includes(d.id) ? <span className="bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-800">Aprobado</span>
                : puedeAprobar(d, e.aprobados) && <button type="button" onClick={() => aprobar(d.id)} className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white" style={{ background: C.negro }} aria-label={`Aprobar ${d.nombre}`}>Aprobar</button>)}
            </div></li>))}</ul>
        {aviso && <p role="status" className="mt-3 bg-amber-50 p-3 text-sm text-amber-900">{aviso}</p>}
      </section>

      <section aria-labelledby="tr-msj" className="mt-12">
        <h2 id="tr-msj" className="font-display text-2xl font-semibold">Mensajes con el estudio</h2>
        <ul className="mt-4 space-y-3">{e.mensajes.map((m) => (
          <li key={m.id} className={`max-w-xl border p-4 text-sm ${m.de === "cliente" ? "ml-auto bg-neutral-900 text-white" : "bg-white"}`}><p className="text-xs uppercase tracking-widest opacity-75">{m.de === "cliente" ? "Tú" : "Estudio"} · {fechaCorta(m.fecha)}</p><p className="mt-1">{m.texto}</p></li>))}</ul>
        <form onSubmit={mandar} noValidate className="mt-5 max-w-xl" aria-label="Enviar mensaje al estudio">
          <label htmlFor="tr-msg" className="text-sm font-medium">Nuevo mensaje</label>
          <textarea id="tr-msg" rows={3} className={campo} value={texto} onChange={(ev) => setTexto(ev.target.value)} aria-invalid={!!err} />
          {err && <p className="mt-1 text-sm text-red-700">{err}</p>}
          <button className="mt-3 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white" style={{ background: C.negro }}>Enviar mensaje</button>
          <p className="mt-3 text-xs text-neutral-500">Demostración: el mensaje queda solo en este navegador y el estudio ficticio no responde.</p>
        </form>
      </section>
    </Cont>
  );
}

export default function Trama() {
  return (
    <ProveedorPortal>
      <div className="bg-white text-neutral-900">
        <ScrollArriba />
        <Cabecera />
        <main className="min-h-[60vh]">
          <Routes>
            <Route index element={<Inicio />} />
            <Route path="proyectos" element={<Proyectos />} />
            <Route path="portal" element={<Acceso />} />
            <Route path="portal/panel" element={<Panel />} />
            <Route path="*" element={<Cont className="text-center"><h1 className="font-display text-3xl font-semibold">Página no encontrada</h1><div className="mt-6"><Boton to={BASE}>Volver al inicio</Boton></div></Cont>} />
          </Routes>
        </main>
        <footer style={{ background: C.negro }} className="text-white/70"><div className="mx-auto max-w-6xl px-4 py-9 text-sm"><p className="font-display text-lg text-white">Trama Arquitectura</p><p className="mt-5 text-xs text-white/80">Trama es un estudio ficticio creado para una demostración de SYNEXA. El portal no usa cuentas reales ni guarda datos personales. Fotografías generadas con IA.</p></div></footer>
      </div>
    </ProveedorPortal>
  );
}

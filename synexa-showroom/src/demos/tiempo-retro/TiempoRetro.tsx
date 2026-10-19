import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { Link, NavLink, Route, Routes, useParams, useSearchParams } from "react-router-dom";
import { IsotipoMarca } from "@/componentes/IsotipoMarca";
import { marcaPorId } from "@/datos/marcas";
import { rutaAsset } from "@/utilidades/assets";
import { MenuMovil, ScrollArriba, usePersistente } from "../compartido/utiles";
import { DIAS_SEMANA, ORDEN_DIAS, ReproductorRadio, hhmm, programaAlAire, type Dia } from "../compartido/ReproductorRadio";
import {
  BANNER, BASE, C, CONTENIDOS_INICIALES, DECADAS, DEDICATORIAS_INICIALES, ESTUDIO, LOCUTORES, PROGRAMAS, TIPOS, CANCIONES,
  type Contenido, type Dedicatoria,
} from "./datos";

export const CLAVE = "synexa:tiempo-retro:estado";
const marca = marcaPorId("tiempo-retro")!;

interface Estado { contenidos: Contenido[]; dedicatorias: Dedicatoria[] }
interface Ctx extends Estado {
  guardar: (c: Contenido) => void;
  eliminar: (id: string) => void;
  alternar: (id: string) => void;
  dedicar: (d: Omit<Dedicatoria, "id" | "estado">) => void;
  resolver: (id: string, e: "aprobada" | "rechazada") => void;
}
const Contexto = createContext<Ctx | null>(null);
const useEstado = () => { const c = useContext(Contexto); if (!c) throw new Error("falta Proveedor"); return c; };

function Proveedor({ children }: { children: ReactNode }) {
  const [e, setE] = usePersistente<Estado>(CLAVE, { contenidos: CONTENIDOS_INICIALES, dedicatorias: DEDICATORIAS_INICIALES });
  const valor = useMemo<Ctx>(() => ({
    ...e,
    guardar: (c) => setE((p) => ({ ...p, contenidos: p.contenidos.some((x) => x.id === c.id) ? p.contenidos.map((x) => (x.id === c.id ? c : x)) : [c, ...p.contenidos] })),
    eliminar: (id) => setE((p) => ({ ...p, contenidos: p.contenidos.filter((x) => x.id !== id) })),
    alternar: (id) => setE((p) => ({ ...p, contenidos: p.contenidos.map((x) => (x.id === id ? { ...x, publicada: !x.publicada } : x)) })),
    dedicar: (d) => setE((p) => ({ ...p, dedicatorias: [{ ...d, id: `d${Date.now()}`, estado: "pendiente" }, ...p.dedicatorias] })),
    resolver: (id, estado) => setE((p) => ({ ...p, dedicatorias: p.dedicatorias.map((x) => (x.id === id ? { ...x, estado } : x)) })),
  }), [e, setE]);
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

const fechaLarga = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
const nombresLoc = (ids: readonly string[]) => ids.map((i) => LOCUTORES.find((l) => l.id === i)?.nombre.split(" ")[0]).join(" y ");
const Cont = ({ children, className = "" }: { children: ReactNode; className?: string }) => <div className={`mx-auto max-w-6xl px-4 py-14 ${className}`}>{children}</div>;
const Titulo = ({ pre, children, h1 = false }: { pre?: string; children: ReactNode; h1?: boolean }) => {
  const H = h1 ? "h1" : "h2";
  return <div>{pre && <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: C.naranja }}>{pre}</p>}<H className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{children}</H></div>;
};
const campo = "w-full rounded-md border border-white/25 bg-[#0a3640] px-3.5 py-2.5 text-white outline-none focus:border-[#e8742a] focus:ring-2 focus:ring-[#e8742a]/40";
const btn = "rounded-md px-6 py-3 text-sm font-bold text-[#0a3640] hover:opacity-90";

function Cabecera() {
  const MENU = [["", "Inicio"], ["programacion", "Programación"], ["archivo", "Archivo"], ["dedicatorias", "Dedicatorias"]] as const;
  const est = ({ isActive }: { isActive: boolean }) => `rounded px-3 py-2 text-sm font-semibold ${isActive ? "text-white" : "text-white/65 hover:text-white"}`;
  return (
    <header className="sticky top-11 z-30 border-b border-white/10 text-white" style={{ background: C.petroleo }}>
      <div className="relative"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to={BASE} className="flex items-center gap-3" aria-label="Tiempo Retro, inicio"><IsotipoMarca marca={marca} size={34} /><span className="font-display text-xl font-semibold">Tiempo <span style={{ color: C.naranja }}>Retro</span></span></Link>
        <nav aria-label="Principal" className="hidden md:flex">{MENU.map(([r, t]) => <NavLink key={r} to={r ? `${BASE}/${r}` : BASE} end={r === ""} className={est}>{t}</NavLink>)}</nav>
        <MenuMovil id="tr-menu"><ul style={{ background: C.petroleo }}>{MENU.map(([r, t]) => <li key={r}><NavLink to={r ? `${BASE}/${r}` : BASE} end={r === ""} className="block rounded px-3 py-3 text-white">{t}</NavLink></li>)}</ul></MenuMovil>
      </div></div>
    </header>
  );
}

function Inicio() {
  const { contenidos } = useEstado();
  const alAire = programaAlAire(PROGRAMAS);
  const recientes = contenidos.filter((c) => c.publicada).sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 3);
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={rutaAsset(ESTUDIO)} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0a3640] via-[#0a3640]/75 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-24 sm:py-32">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: C.naranja }}>La radio de los clásicos</p>
          <h1 className="mt-4 max-w-xl font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">Las canciones que no pasan de moda.</h1>
          <p className="mt-5 max-w-lg text-lg text-white/80">Música de los 70, 80 y 90, historias detrás de cada disco y un archivo para volver a escuchar.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link to={`${BASE}/programacion`} className={btn} style={{ background: C.naranja }}>Ver programación</Link><Link to={`${BASE}/dedicatorias`} className="rounded-md px-6 py-3 text-sm font-bold ring-1 ring-inset ring-white/40 hover:bg-white/10">Mandar una dedicatoria</Link></div>
        </div>
      </section>
      <section style={{ background: C.suave }} className="text-white"><Cont>
        <div className="grid gap-8 md:grid-cols-[1fr_1.3fr]">
          <div className="rounded-2xl p-6 ring-1 ring-white/15" style={{ background: C.petroleo }}>
            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: C.naranja }}>Al aire ahora</h2>
            {alAire ? <><p className="mt-3 font-display text-2xl font-semibold">{alAire.nombre}</p><p className="mt-1 text-sm text-white/65">Con {nombresLoc(alAire.locutores)} · {hhmm(alAire.inicio)} a {hhmm(alAire.fin)}</p><p className="mt-3 text-sm text-white/75">{alAire.descripcion}</p></> : <p className="mt-3 text-white/75">Ahora suena nuestra selección musical continua.</p>}
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold">Lo último</h2>
            {recientes.length ? <ul className="mt-4 divide-y divide-white/15 border-y border-white/15">{recientes.map((c) => <li key={c.id}><Link to={`${BASE}/archivo/${c.id}`} className="block py-4 hover:bg-white/5"><p className="text-xs text-white/80">{c.tipo} · {fechaLarga(c.fecha)}</p><p className="font-semibold">{c.titulo}</p></Link></li>)}</ul> : <p className="mt-4 text-white/65">Aún no hay contenidos publicados.</p>}
          </div>
        </div>
      </Cont></section>
      <Cont className="text-white">
        <Titulo pre="Nuestros programas">Una radio, tres décadas</Titulo>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">{PROGRAMAS.slice(0, 3).map((p) => <li key={p.id} className="rounded-2xl p-6 ring-1 ring-white/15" style={{ background: C.suave }}><p className="text-xs font-bold uppercase tracking-wider" style={{ color: C.naranja }}>{p.decada}</p><h3 className="mt-2 font-display text-xl font-semibold"><Link to={`${BASE}/programa/${p.id}`} className="hover:underline">{p.nombre}</Link></h3><p className="mt-2 text-sm text-white/70">{p.descripcion}</p></li>)}</ul>
      </Cont>
    </>
  );
}

function Programacion() {
  const [dia, setDia] = useState<Dia>(ORDEN_DIAS[new Date().getDay()]);
  const lista = PROGRAMAS.filter((p) => p.dias.includes(dia)).sort((a, b) => a.inicio - b.inicio);
  return (
    <Cont className="text-white">
      <Titulo h1 pre="Programación">Parrilla semanal</Titulo>
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Día de la semana">{DIAS_SEMANA.map((d) => <button key={d.id} type="button" aria-pressed={dia === d.id} onClick={() => setDia(d.id)} className={`rounded-full px-4 py-2 text-sm font-semibold ${dia === d.id ? "text-[#0a3640]" : "bg-white/10 hover:bg-white/20"}`} style={dia === d.id ? { background: C.naranja } : undefined}><span aria-hidden="true">{d.corto}</span><span className="sr-only">{d.nombre}</span></button>)}</div>
      <h2 className="mt-10 text-xl font-bold">{DIAS_SEMANA.find((d) => d.id === dia)!.nombre}</h2>
      {lista.length ? <ol className="mt-4 space-y-4">{lista.map((p) => <li key={p.id} className="rounded-xl p-5 ring-1 ring-white/15" style={{ background: C.suave }}><div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="font-display text-xl font-semibold"><Link to={`${BASE}/programa/${p.id}`} className="hover:underline">{p.nombre}</Link></h3><p className="text-sm tabular-nums" style={{ color: C.naranja }}>{hhmm(p.inicio)} a {hhmm(p.fin)}</p></div><p className="mt-2 text-sm text-white/75">{p.descripcion}</p><p className="mt-2 text-sm text-white/80">Con {nombresLoc(p.locutores)}</p></li>)}</ol> : <p className="mt-4 rounded-xl border border-dashed border-white/25 p-8 text-center text-white/65">No hay programas en vivo este día. Escucha la selección musical.</p>}
    </Cont>
  );
}

function FichaPrograma() {
  const { id } = useParams();
  const p = PROGRAMAS.find((x) => x.id === id);
  if (!p) return <Cont className="text-center text-white"><h1 className="font-display text-3xl font-semibold">Programa no encontrado</h1><Link to={`${BASE}/programacion`} className="mt-6 inline-block underline" style={{ color: C.naranja }}>Ver la programación</Link></Cont>;
  return (
    <Cont className="max-w-4xl text-white">
      <Link to={`${BASE}/programacion`} className="text-sm underline" style={{ color: C.naranja }}>← Programación</Link>
      <Titulo h1 pre={`Década ${p.decada} · ${p.genero}`}>{p.nombre}</Titulo>
      <p className="mt-4 text-lg text-white/80">{p.descripcion}</p>
      <p className="mt-4 text-sm text-white/80">{p.dias.map((d) => DIAS_SEMANA.find((x) => x.id === d)!.corto).join(", ")} · {hhmm(p.inicio)} a {hhmm(p.fin)}</p>
      <h2 className="mt-10 font-display text-xl font-semibold">Conducción</h2>
      <ul className="mt-4 grid gap-5 sm:grid-cols-2">{p.locutores.map((l) => { const x = LOCUTORES.find((y) => y.id === l)!; return <li key={l} className="flex gap-4 rounded-xl p-4 ring-1 ring-white/15" style={{ background: C.suave }}><img src={rutaAsset(x.img)} alt={x.alt} loading="lazy" className="h-24 w-24 shrink-0 rounded-full object-cover object-top" /><div><h3 className="font-bold">{x.nombre}</h3><p className="mt-1 text-sm text-white/70">{x.bio}</p></div></li>; })}</ul>
    </Cont>
  );
}

function Archivo() {
  const { contenidos } = useEstado();
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "", dec = params.get("decada") ?? "", tipo = params.get("tipo") ?? "";
  const poner = (k: string, v: string) => { const n = new URLSearchParams(params); if (v) n.set(k, v); else n.delete(k); setParams(n, { replace: true }); };
  const lista = contenidos.filter((c) => c.publicada && (!dec || c.decada === dec) && (!tipo || c.tipo === tipo) && (!q.trim() || `${c.titulo} ${c.resumen}`.toLowerCase().includes(q.trim().toLowerCase()))).sort((a, b) => b.fecha.localeCompare(a.fecha));
  return (
    <>
      <div className="relative isolate overflow-hidden"><img src={rutaAsset(BANNER)} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35" /><Cont className="py-16 text-white"><Titulo h1 pre="Archivo">Todo lo que hemos contado</Titulo><Link to={`${BASE}/editorial`} className="mt-4 inline-block text-sm font-semibold underline" style={{ color: C.naranja }}>Panel editorial (demo)</Link></Cont></div>
      <Cont className="pt-0 text-white">
        <form role="search" onSubmit={(e) => e.preventDefault()} className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr]">
          <div><label htmlFor="tr-q" className="sr-only">Buscar en el archivo</label><input id="tr-q" type="search" placeholder="Buscar…" value={q} onChange={(e) => poner("q", e.target.value)} className={campo} /></div>
          <div><label htmlFor="tr-dec" className="sr-only">Década</label><select id="tr-dec" value={dec} onChange={(e) => poner("decada", e.target.value)} className={campo}><option value="">Todas las décadas</option>{DECADAS.map((d) => <option key={d}>{d}</option>)}</select></div>
          <div><label htmlFor="tr-tipo" className="sr-only">Tipo</label><select id="tr-tipo" value={tipo} onChange={(e) => poner("tipo", e.target.value)} className={campo}><option value="">Todos los tipos</option>{TIPOS.map((d) => <option key={d}>{d}</option>)}</select></div>
        </form>
        <p className="mt-5 text-sm text-white/65" role="status" aria-live="polite">{lista.length} {lista.length === 1 ? "contenido" : "contenidos"}</p>
        {lista.length ? <div className="mt-4 grid gap-6 md:grid-cols-2">{lista.map((c) => <article key={c.id} className="overflow-hidden rounded-2xl ring-1 ring-white/15" style={{ background: C.suave }}>{c.imagen && <img src={rutaAsset(c.imagen)} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />}<div className="p-5"><p className="text-xs font-bold uppercase tracking-wider" style={{ color: C.naranja }}>{c.tipo} · {c.decada}</p><h2 className="mt-1 font-display text-lg font-semibold"><Link to={`${BASE}/archivo/${c.id}`} className="hover:underline">{c.titulo}</Link></h2><p className="mt-2 text-sm text-white/70">{c.resumen}</p></div></article>)}</div> : <div className="mt-4 rounded-xl border border-dashed border-white/25 p-10 text-center"><p className="font-semibold">No hay contenidos con esos filtros.</p><button type="button" onClick={() => setParams({}, { replace: true })} className="mt-3 text-sm font-bold underline" style={{ color: C.naranja }}>Quitar filtros</button></div>}
      </Cont>
    </>
  );
}

function VerContenido() {
  const { id } = useParams();
  const { contenidos } = useEstado();
  const c = contenidos.find((x) => x.id === id);
  if (!c || !c.publicada) return <Cont className="text-center text-white"><h1 className="font-display text-3xl font-semibold">Contenido no disponible</h1><p className="mt-2 text-white/65">Puede haber sido despublicado o eliminado.</p><Link to={`${BASE}/archivo`} className="mt-6 inline-block underline" style={{ color: C.naranja }}>Volver al archivo</Link></Cont>;
  return (
    <Cont className="max-w-3xl text-white">
      <Link to={`${BASE}/archivo`} className="text-sm underline" style={{ color: C.naranja }}>← Archivo</Link>
      <p className="mt-6 text-xs font-bold uppercase tracking-wider" style={{ color: C.naranja }}>{c.tipo} · {c.decada} · {fechaLarga(c.fecha)}</p>
      <h1 className="mt-2 font-display text-4xl font-semibold leading-tight">{c.titulo}</h1>
      {c.imagen && <img src={rutaAsset(c.imagen)} alt="" className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover" />}
      <div className="mt-8 space-y-4 text-lg leading-relaxed text-white/80">{c.cuerpo.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}</div>
    </Cont>
  );
}

function Dedicatorias() {
  const { dedicatorias, dedicar } = useEstado();
  const [c, setC] = useState({ para: "", de: "", mensaje: "", cancion: CANCIONES[0].titulo });
  const [err, setErr] = useState<Record<string, string>>({});
  const [enviada, setEnviada] = useState(false);
  const aprobadas = dedicatorias.filter((d) => d.estado === "aprobada");
  return (
    <Cont className="text-white">
      <Titulo h1 pre="Dedicatorias">Dile algo con una canción</Titulo>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <form noValidate aria-label="Enviar dedicatoria" className="space-y-4 rounded-2xl p-6 ring-1 ring-white/15" style={{ background: C.suave }} onSubmit={(ev) => { ev.preventDefault(); const x: Record<string, string> = {}; if (!c.para.trim()) x.para = "¿Para quién es?"; if (!c.de.trim()) x.de = "Dinos de parte de quién."; if (c.mensaje.trim().length < 5) x.mensaje = "Escribe un mensaje de al menos 5 caracteres."; setErr(x); if (Object.keys(x).length) return; dedicar({ para: c.para.trim(), de: c.de.trim(), mensaje: c.mensaje.trim(), cancion: c.cancion }); setC({ para: "", de: "", mensaje: "", cancion: CANCIONES[0].titulo }); setEnviada(true); }}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label htmlFor="tr-para" className="mb-1.5 block text-sm font-medium">Para</label><input id="tr-para" value={c.para} onChange={(e) => setC({ ...c, para: e.target.value })} aria-invalid={!!err.para} className={campo} />{err.para && <p className="mt-1 text-sm text-red-300">{err.para}</p>}</div>
            <div><label htmlFor="tr-de" className="mb-1.5 block text-sm font-medium">De parte de</label><input id="tr-de" value={c.de} onChange={(e) => setC({ ...c, de: e.target.value })} aria-invalid={!!err.de} className={campo} />{err.de && <p className="mt-1 text-sm text-red-300">{err.de}</p>}</div>
          </div>
          <div><label htmlFor="tr-cancion" className="mb-1.5 block text-sm font-medium">Canción</label><select id="tr-cancion" value={c.cancion} onChange={(e) => setC({ ...c, cancion: e.target.value })} className={campo}>{CANCIONES.map((s) => <option key={s.titulo}>{s.titulo}</option>)}</select></div>
          <div><label htmlFor="tr-msg" className="mb-1.5 block text-sm font-medium">Mensaje</label><textarea id="tr-msg" rows={3} value={c.mensaje} onChange={(e) => setC({ ...c, mensaje: e.target.value })} aria-invalid={!!err.mensaje} className={campo} />{err.mensaje && <p className="mt-1 text-sm text-red-300">{err.mensaje}</p>}</div>
          <button type="submit" className={btn} style={{ background: C.naranja }}>Enviar dedicatoria</button>
          {enviada && <p role="status" className="rounded-md bg-black/25 p-3 text-sm text-white/75">Dedicatoria enviada: queda <strong>pendiente de revisión</strong>. Puedes aprobarla en el <Link to={`${BASE}/editorial`} className="underline" style={{ color: C.naranja }}>panel editorial</Link>.</p>}
          <p className="text-xs text-white/80">Demostración: no se envía ni se guarda nada fuera de este navegador.</p>
        </form>
        <section aria-labelledby="tr-rec"><h2 id="tr-rec" className="font-display text-xl font-semibold">Dedicatorias recientes</h2>
          {aprobadas.length ? <ul className="mt-4 space-y-3">{aprobadas.map((d) => <li key={d.id} className="rounded-xl p-4 ring-1 ring-white/15" style={{ background: C.suave }}><p className="text-sm text-white/80">Para <strong className="text-white">{d.para}</strong>, de parte de {d.de}</p><p className="mt-1">“{d.mensaje}”</p><p className="mt-2 text-xs" style={{ color: C.naranja }}>♪ {d.cancion}</p></li>)}</ul> : <p className="mt-4 rounded-xl border border-dashed border-white/25 p-6 text-white/65">Aún no hay dedicatorias aprobadas.</p>}
        </section>
      </div>
    </Cont>
  );
}

const nuevo = (): Contenido => ({ id: `c${Date.now()}`, titulo: "", tipo: "Artículo", decada: "Todas", fecha: new Date().toISOString().slice(0, 10), resumen: "", cuerpo: "", publicada: false });

function Editorial() {
  const { contenidos, guardar, eliminar, alternar, dedicatorias, resolver } = useEstado();
  const [edit, setEdit] = useState<Contenido | null>(null);
  const [error, setError] = useState("");
  const pend = dedicatorias.filter((d) => d.estado === "pendiente");
  const lista = [...contenidos].sort((a, b) => b.fecha.localeCompare(a.fecha));
  const peq = "rounded-md px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ring-white/25 hover:bg-white/10";
  return (
    <Cont className="text-white">
      <div className="rounded-md bg-[#2b2400] p-3 text-sm text-[#f3d77a]" role="note"><strong>Panel de demostración.</strong> Así administraría su contenido el equipo de la emisora. Los cambios viven solo en este navegador; «Reiniciar demo» los borra.</div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4"><Titulo h1>Panel editorial</Titulo><button type="button" onClick={() => { setEdit(nuevo()); setError(""); }} className={btn} style={{ background: C.naranja }}>Nuevo contenido</button></div>

      {edit && (
        <form noValidate aria-label="Editar contenido" className="mt-6 space-y-4 rounded-2xl p-6 ring-1 ring-white/15" style={{ background: C.suave }} onSubmit={(ev) => { ev.preventDefault(); if (edit.titulo.trim().length < 5) return setError("El título debe tener al menos 5 caracteres."); if (edit.resumen.trim().length < 5) return setError("Escribe un resumen."); guardar({ ...edit, titulo: edit.titulo.trim(), resumen: edit.resumen.trim(), cuerpo: edit.cuerpo.trim() || edit.resumen.trim() }); setEdit(null); setError(""); }}>
          <div><label htmlFor="ed-titulo" className="mb-1 block text-sm font-medium">Título</label><input id="ed-titulo" value={edit.titulo} onChange={(e) => setEdit({ ...edit, titulo: e.target.value })} className={campo} /></div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div><label htmlFor="ed-tipo" className="mb-1 block text-sm font-medium">Tipo</label><select id="ed-tipo" value={edit.tipo} onChange={(e) => setEdit({ ...edit, tipo: e.target.value as Contenido["tipo"] })} className={campo}>{TIPOS.map((t) => <option key={t}>{t}</option>)}</select></div>
            <div><label htmlFor="ed-dec" className="mb-1 block text-sm font-medium">Década</label><select id="ed-dec" value={edit.decada} onChange={(e) => setEdit({ ...edit, decada: e.target.value })} className={campo}>{DECADAS.map((t) => <option key={t}>{t}</option>)}</select></div>
            <div><label htmlFor="ed-fecha" className="mb-1 block text-sm font-medium">Fecha</label><input id="ed-fecha" type="date" value={edit.fecha} onChange={(e) => setEdit({ ...edit, fecha: e.target.value })} className={campo} /></div>
          </div>
          <div><label htmlFor="ed-res" className="mb-1 block text-sm font-medium">Resumen</label><input id="ed-res" value={edit.resumen} onChange={(e) => setEdit({ ...edit, resumen: e.target.value })} className={campo} /></div>
          <div><label htmlFor="ed-cuerpo" className="mb-1 block text-sm font-medium">Texto (párrafos separados por una línea en blanco)</label><textarea id="ed-cuerpo" rows={5} value={edit.cuerpo} onChange={(e) => setEdit({ ...edit, cuerpo: e.target.value })} className={campo} /></div>
          <label className="flex items-center gap-3 text-sm font-medium"><input type="checkbox" checked={edit.publicada} onChange={(e) => setEdit({ ...edit, publicada: e.target.checked })} className="h-4 w-4 accent-[#e8742a]" />Publicado en el sitio</label>
          {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
          <div className="flex gap-3"><button type="submit" className={btn} style={{ background: C.naranja }}>Guardar</button><button type="button" onClick={() => { setEdit(null); setError(""); }} className="rounded-md px-6 py-3 text-sm font-bold ring-1 ring-inset ring-white/30 hover:bg-white/10">Cancelar</button></div>
        </form>
      )}

      <div className="mt-8 overflow-x-auto rounded-xl ring-1 ring-white/15">
        <table className="w-full min-w-[640px] text-left text-sm"><caption className="sr-only">Contenidos del archivo</caption>
          <thead className="bg-black/25 text-xs uppercase tracking-wider text-white/80"><tr><th scope="col" className="px-4 py-3">Título</th><th scope="col" className="px-4 py-3">Tipo</th><th scope="col" className="px-4 py-3">Estado</th><th scope="col" className="px-4 py-3 text-right">Acciones</th></tr></thead>
          <tbody className="divide-y divide-white/10">{lista.map((c) => <tr key={c.id}><td className="px-4 py-3 font-medium">{c.titulo || "(sin título)"}</td><td className="px-4 py-3 text-white/65">{c.tipo}</td><td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${c.publicada ? "bg-green-500/20 text-green-200" : "bg-white/10 text-white/65"}`}>{c.publicada ? "Publicado" : "Borrador"}</span></td><td className="space-x-2 px-4 py-3 text-right"><button type="button" className={peq} onClick={() => alternar(c.id)}>{c.publicada ? "Despublicar" : "Publicar"}</button><button type="button" className={peq} onClick={() => { setEdit(c); setError(""); }}>Editar</button><button type="button" className={`${peq} text-red-200`} onClick={() => eliminar(c.id)} aria-label={`Eliminar ${c.titulo}`}>Eliminar</button></td></tr>)}</tbody>
        </table>
      </div>

      <section aria-labelledby="ed-ded" className="mt-12"><h2 id="ed-ded" className="font-display text-xl font-semibold">Dedicatorias pendientes ({pend.length})</h2>
        {pend.length ? <ul className="mt-4 space-y-3">{pend.map((d) => <li key={d.id} className="rounded-xl p-4 ring-1 ring-white/15" style={{ background: C.suave }}><p className="text-sm">Para <strong>{d.para}</strong> · de {d.de} · ♪ {d.cancion}</p><p className="mt-1 text-white/75">“{d.mensaje}”</p><div className="mt-3 flex gap-2"><button type="button" className={peq} onClick={() => resolver(d.id, "aprobada")} aria-label={`Aprobar dedicatoria de ${d.de}`}>Aprobar</button><button type="button" className={peq} onClick={() => resolver(d.id, "rechazada")} aria-label={`Rechazar dedicatoria de ${d.de}`}>Rechazar</button></div></li>)}</ul> : <p className="mt-4 text-sm text-white/80">No hay dedicatorias pendientes.</p>}
      </section>
    </Cont>
  );
}

export default function TiempoRetro() {
  const alAire = programaAlAire(PROGRAMAS);
  return (
    <Proveedor>
      <div className="min-h-screen pb-24" style={{ background: C.petroleoOsc, color: "#fff" }}>
        <ScrollArriba />
        <Cabecera />
        <main>
          <Routes>
            <Route index element={<Inicio />} />
            <Route path="programacion" element={<Programacion />} />
            <Route path="programa/:id" element={<FichaPrograma />} />
            <Route path="archivo" element={<Archivo />} />
            <Route path="archivo/:id" element={<VerContenido />} />
            <Route path="dedicatorias" element={<Dedicatorias />} />
            <Route path="editorial" element={<Editorial />} />
            <Route path="*" element={<Cont className="text-center"><h1 className="font-display text-3xl font-semibold">Página no encontrada</h1><Link to={BASE} className="mt-6 inline-block underline" style={{ color: C.naranja }}>Volver al inicio</Link></Cont>} />
          </Routes>
        </main>
        <footer className="border-t border-white/10 bg-black/25"><div className="mx-auto max-w-6xl px-4 py-9 text-xs text-white/80">Tiempo Retro es una emisora ficticia creada para una demostración de SYNEXA. Locutores, programas, artículos y canciones son inventados. Fotografías generadas con IA.</div></footer>
        <ReproductorRadio emisora="Tiempo Retro" ahora={alAire ? `${alAire.nombre} · con ${nombresLoc(alAire.locutores)}` : `${CANCIONES[0].titulo} · ${CANCIONES[0].artista}`} fondo={C.petroleoOsc} acento={C.naranja} />
      </div>
    </Proveedor>
  );
}

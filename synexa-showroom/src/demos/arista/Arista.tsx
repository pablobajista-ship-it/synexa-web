import { createContext, useContext, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import { IsotipoMarca } from "@/componentes/IsotipoMarca";
import { marcaPorId } from "@/datos/marcas";
import { rutaAsset } from "@/utilidades/assets";
import { MenuMovil, ScrollArriba, esCorreo, usePersistente } from "../compartido/utiles";
import {
  BASE, C, FILTROS_VACIOS, GALERIA, IMAGEN_POR_TIPO, OPERACIONES, PROPIEDADES_INICIALES, SECTORES, TIPOS, filtrar, precioTexto, validarPropiedad,
  type Filtros, type Operacion, type Propiedad, type Tipo,
} from "./propiedades";

const marca = marcaPorId("arista")!;
export const CLAVE = "synexa:arista:propiedades";

interface Ctx { lista: Propiedad[]; agregar: (p: Omit<Propiedad, "id" | "publicada" | "imagen" | "texto">) => void; alternar: (id: string) => void; quitar: (id: string) => void }
const Contexto = createContext<Ctx | null>(null);
const usePropiedades = () => { const c = useContext(Contexto); if (!c) throw new Error("falta ProveedorPropiedades"); return c; };

function ProveedorPropiedades({ children }: { children: ReactNode }) {
  const [lista, setLista] = usePersistente<Propiedad[]>(CLAVE, PROPIEDADES_INICIALES);
  const valor = useMemo<Ctx>(() => ({
    lista,
    agregar: (p) => setLista((l) => [{ ...p, id: `n${Date.now()}`, publicada: true, imagen: IMAGEN_POR_TIPO[p.tipo], texto: "Propiedad ingresada desde el panel de demostración." }, ...l]),
    alternar: (id) => setLista((l) => l.map((p) => (p.id === id ? { ...p, publicada: !p.publicada } : p))),
    quitar: (id) => setLista((l) => l.filter((p) => p.id !== id)),
  }), [lista, setLista]);
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

const Cont = ({ children, className = "" }: { children: ReactNode; className?: string }) => <div className={`mx-auto max-w-6xl px-4 py-12 ${className}`}>{children}</div>;
const Boton = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={to} className="inline-flex rounded-sm px-7 py-3.5 text-sm font-bold uppercase tracking-wider transition-opacity hover:opacity-90" style={{ background: C.oro, color: C.marino }}>{children}</Link>
);
const campo = "w-full rounded-sm border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-[#1c3d73] focus:ring-2 focus:ring-[#1c3d73]/30";

function Cabecera() {
  const MENU = [["", "Inicio"], ["propiedades", "Propiedades"], ["admin", "Administración"]] as const;
  const estilo = ({ isActive }: { isActive: boolean }) => `rounded px-3 py-2 text-sm font-semibold ${isActive ? "text-white" : "text-white/65 hover:text-white"}`;
  return (
    <header className="sticky top-11 z-40 text-white" style={{ background: C.marino }}>
      <div className="relative"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to={BASE} className="flex items-center gap-3" aria-label="Arista Propiedades, inicio"><IsotipoMarca marca={marca} size={34} /><span className="font-display text-xl font-semibold">Arista Propiedades</span></Link>
        <nav aria-label="Principal" className="hidden md:flex">{MENU.map(([r, t]) => <NavLink key={r} to={r ? `${BASE}/${r}` : BASE} end={r === ""} className={estilo}>{t}</NavLink>)}</nav>
        <MenuMovil id="ar-menu"><ul style={{ background: C.marino }}>{MENU.map(([r, t]) => <li key={r}><NavLink to={r ? `${BASE}/${r}` : BASE} end={r === ""} className="block rounded px-3 py-3 text-white">{t}</NavLink></li>)}</ul></MenuMovil>
      </div></div>
    </header>
  );
}

function Tarjeta({ p }: { p: Propiedad }) {
  return (
    <article className="group overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-slate-200">
      <Link to={`${BASE}/propiedades/${p.id}`} className="block">
        <div className="relative"><img src={rutaAsset(p.imagen)} alt={p.titulo} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
          <span className="absolute left-3 top-3 rounded-sm px-2.5 py-1 text-xs font-bold uppercase tracking-wider" style={{ background: C.oro, color: C.marino }}>{p.operacion}</span></div>
        <div className="p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">{p.tipo} · {p.sector}</p>
          <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-slate-900">{p.titulo}</h3>
          <p className="mt-3 text-sm text-slate-600">{p.dormitorios} dorm. · {p.banos} baños · {p.m2} m²</p>
          <p className="mt-3 text-xl font-bold" style={{ color: C.azul }}>{precioTexto(p)}</p>
        </div>
      </Link>
    </article>
  );
}

function Inicio() {
  const { lista } = usePropiedades();
  const destacadas = lista.filter((p) => p.publicada).slice(0, 3);
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={rutaAsset("assets/arista/hero.webp")} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(90deg, rgba(11,31,63,.92), rgba(11,31,63,.55) 60%, transparent)" }} />
        <div className="mx-auto max-w-6xl px-4 py-28 sm:py-36">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: C.oroClaro }}>Corretaje e inversión inmobiliaria</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">Encuentra tu próxima propiedad.</h1>
          <p className="mt-6 max-w-lg text-lg text-white/80">Casas, departamentos y lofts seleccionados, con información clara antes de visitar.</p>
          <div className="mt-9"><Boton to={`${BASE}/propiedades`}>Ver propiedades</Boton></div>
        </div>
      </section>
      <section style={{ background: C.hueso }}><Cont>
        <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: C.azul }}>Destacadas</p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-slate-900">Seleccionadas esta semana</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{destacadas.map((p) => <Tarjeta key={p.id} p={p} />)}</div>
        <div className="mt-10 text-center"><Boton to={`${BASE}/propiedades`}>Buscar con filtros</Boton></div>
      </Cont></section>
      <section className="bg-white"><Cont className="grid items-center gap-10 md:grid-cols-2">
        <img src={rutaAsset("assets/arista/agente.webp")} alt="Agente inmobiliario" loading="lazy" className="mx-auto aspect-[3/4] w-full max-w-sm rounded-sm object-cover object-top" />
        <div><h2 className="font-display text-3xl font-semibold text-slate-900">Acompañamiento de principio a fin</h2>
          <p className="mt-4 text-slate-600">Tasación, publicación, visitas y cierre con un solo equipo. Esta es una demostración: los datos, precios y agentes son ficticios.</p></div>
      </Cont></section>
    </>
  );
}

function Listado() {
  const { lista } = usePropiedades();
  const [f, setF] = useState<Filtros>(FILTROS_VACIOS);
  const res = filtrar(lista, f);
  const set = <K extends keyof Filtros>(k: K, v: Filtros[K]) => setF((p) => ({ ...p, [k]: v }));
  return (
    <Cont>
      <h1 className="font-display text-4xl font-semibold text-slate-900">Propiedades</h1>
      <form className="mt-8 grid gap-4 rounded-sm bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:grid-cols-2 lg:grid-cols-6" onSubmit={(e) => e.preventDefault()} aria-label="Filtros de búsqueda">
        <label className="text-sm font-medium text-slate-700">Operación<select className={`${campo} mt-1`} value={f.operacion} onChange={(e) => set("operacion", e.target.value as Operacion | "")}><option value="">Todas</option>{OPERACIONES.map((o) => <option key={o}>{o}</option>)}</select></label>
        <label className="text-sm font-medium text-slate-700">Tipo<select className={`${campo} mt-1`} value={f.tipo} onChange={(e) => set("tipo", e.target.value as Tipo | "")}><option value="">Todos</option>{TIPOS.map((o) => <option key={o}>{o}</option>)}</select></label>
        <label className="text-sm font-medium text-slate-700">Sector<select className={`${campo} mt-1`} value={f.sector} onChange={(e) => set("sector", e.target.value)}><option value="">Todos</option>{SECTORES.map((o) => <option key={o}>{o}</option>)}</select></label>
        <label className="text-sm font-medium text-slate-700">Dormitorios (mín.)<select className={`${campo} mt-1`} value={f.dormitoriosMin} onChange={(e) => set("dormitoriosMin", Number(e.target.value))}>{[0, 1, 2, 3, 4].map((n) => <option key={n} value={n}>{n === 0 ? "Cualquiera" : `${n}+`}</option>)}</select></label>
        <label className="text-sm font-medium text-slate-700">Precio máximo<select className={`${campo} mt-1`} value={f.precioMax} onChange={(e) => set("precioMax", Number(e.target.value))}>
          <option value={0}>Sin tope</option><option value={1_500_000}>Hasta $1.500.000</option><option value={300_000_000}>Hasta $300.000.000</option><option value={500_000_000}>Hasta $500.000.000</option></select></label>
        <label className="text-sm font-medium text-slate-700">Ordenar<select className={`${campo} mt-1`} value={f.orden} onChange={(e) => set("orden", e.target.value as Filtros["orden"])}><option value="recientes">Más recientes</option><option value="menor">Menor precio</option><option value="mayor">Mayor precio</option></select></label>
      </form>
      <p className="mt-6 text-sm text-slate-600" role="status">{res.length === 1 ? "1 propiedad encontrada" : `${res.length} propiedades encontradas`}
        <button type="button" onClick={() => setF(FILTROS_VACIOS)} className="ml-4 font-semibold underline" style={{ color: C.azul }}>Limpiar filtros</button></p>
      {res.length ? <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{res.map((p) => <Tarjeta key={p.id} p={p} />)}</div>
        : <p className="mt-10 rounded-sm bg-white p-10 text-center text-slate-600 ring-1 ring-slate-200">Ninguna propiedad coincide con los filtros. Prueba ampliando el precio o el sector.</p>}
    </Cont>
  );
}

function Ficha() {
  const { id } = useParams();
  const { lista } = usePropiedades();
  const p = lista.find((x) => x.id === id);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [err, setErr] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);
  if (!p || !p.publicada) return <Cont className="text-center"><h1 className="font-display text-3xl font-semibold text-slate-900">Propiedad no disponible</h1><p className="mt-3 text-slate-600">Puede haber sido retirada del portal.</p><div className="mt-6"><Boton to={`${BASE}/propiedades`}>Volver al listado</Boton></div></Cont>;
  const enviar = (e: FormEvent) => {
    e.preventDefault();
    const x: Record<string, string> = {};
    if (!nombre.trim()) x.nombre = "Escribe tu nombre.";
    if (!esCorreo(correo)) x.correo = "Escribe un correo válido.";
    setErr(x);
    setOk(Object.keys(x).length === 0);
  };
  return (
    <Cont>
      <Link to={`${BASE}/propiedades`} className="text-sm font-semibold underline" style={{ color: C.azul }}>← Volver al listado</Link>
      <div className="mt-5 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <img src={rutaAsset(p.imagen)} alt={p.titulo} className="aspect-[16/10] w-full rounded-sm object-cover" />
          <div className="mt-3 grid grid-cols-3 gap-3">{GALERIA.map((g) => <img key={g} src={rutaAsset(g)} alt="Interior de referencia" loading="lazy" className="aspect-[4/3] w-full rounded-sm object-cover" />)}</div>
          <p className="mt-2 text-xs text-slate-500">Las fotos interiores son referenciales y no corresponden necesariamente a esta propiedad.</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: C.azul }}>{p.operacion} · {p.tipo}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-slate-900">{p.titulo}</h1>
          <p className="mt-2 text-slate-600">{p.sector}</p>
          <p className="mt-5 text-3xl font-bold" style={{ color: C.azul }}>{precioTexto(p)}</p>
          <dl className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">{([["Dormitorios", p.dormitorios], ["Baños", p.banos], ["Superficie", `${p.m2} m²`]] as const).map(([k, v]) => <div key={k} className="rounded-sm bg-white p-3 ring-1 ring-slate-200"><dt className="text-xs text-slate-500">{k}</dt><dd className="mt-1 text-lg font-semibold text-slate-900">{v}</dd></div>)}</dl>
          <p className="mt-5 text-slate-700">{p.texto}</p>
          {ok ? <p role="status" className="mt-6 rounded-sm bg-green-50 p-4 text-sm text-green-900 ring-1 ring-green-200">Consulta de demostración: no se envió ni se guardó ningún dato.</p> : (
            <form onSubmit={enviar} noValidate className="mt-6 space-y-3 rounded-sm bg-white p-5 ring-1 ring-slate-200" aria-label="Consultar por esta propiedad">
              <h2 className="font-display text-lg font-semibold text-slate-900">Consultar por esta propiedad</h2>
              <div><label htmlFor="ar-nombre" className="text-sm font-medium text-slate-700">Nombre</label><input id="ar-nombre" className={campo} value={nombre} onChange={(e) => setNombre(e.target.value)} aria-invalid={!!err.nombre} />{err.nombre && <p className="mt-1 text-sm text-red-700">{err.nombre}</p>}</div>
              <div><label htmlFor="ar-correo" className="text-sm font-medium text-slate-700">Correo</label><input id="ar-correo" className={campo} value={correo} onChange={(e) => setCorreo(e.target.value)} aria-invalid={!!err.correo} />{err.correo && <p className="mt-1 text-sm text-red-700">{err.correo}</p>}</div>
              <button className="w-full rounded-sm py-3 text-sm font-bold uppercase tracking-wider" style={{ background: C.marino, color: "#fff" }}>Enviar consulta</button>
            </form>)}
        </div>
      </div>
    </Cont>
  );
}

function Admin() {
  const { lista, agregar, alternar, quitar } = usePropiedades();
  const [d, setD] = useState({ titulo: "", operacion: "Venta" as Operacion, tipo: "Casa" as Tipo, sector: SECTORES[0], dormitorios: 3, banos: 2, m2: 0, precio: 0 });
  const [err, setErr] = useState<Record<string, string>>({});
  const enviar = (e: FormEvent) => {
    e.preventDefault();
    const x = validarPropiedad(d);
    setErr(x);
    if (Object.keys(x).length) return;
    agregar(d);
    setD({ ...d, titulo: "", m2: 0, precio: 0 });
  };
  const num = (k: "dormitorios" | "banos" | "m2" | "precio") => (e: React.ChangeEvent<HTMLInputElement>) => setD({ ...d, [k]: Number(e.target.value) });
  return (
    <Cont>
      <h1 className="font-display text-4xl font-semibold text-slate-900">Administración de propiedades</h1>
      <p className="mt-3 max-w-2xl rounded-sm bg-amber-50 p-3 text-sm text-amber-900 ring-1 ring-amber-200">Panel simulado: los cambios se guardan solo en este navegador y puedes volver al estado inicial con «Reiniciar demo».</p>
      <form onSubmit={enviar} noValidate aria-label="Nueva propiedad" className="mt-8 grid gap-4 rounded-sm bg-white p-5 ring-1 ring-slate-200 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2"><label htmlFor="ad-titulo" className="text-sm font-medium text-slate-700">Título</label><input id="ad-titulo" className={campo} value={d.titulo} onChange={(e) => setD({ ...d, titulo: e.target.value })} aria-invalid={!!err.titulo} />{err.titulo && <p className="mt-1 text-sm text-red-700">{err.titulo}</p>}</div>
        <label className="text-sm font-medium text-slate-700">Operación<select className={campo} value={d.operacion} onChange={(e) => setD({ ...d, operacion: e.target.value as Operacion })}>{OPERACIONES.map((o) => <option key={o}>{o}</option>)}</select></label>
        <label className="text-sm font-medium text-slate-700">Tipo<select className={campo} value={d.tipo} onChange={(e) => setD({ ...d, tipo: e.target.value as Tipo })}>{TIPOS.map((o) => <option key={o}>{o}</option>)}</select></label>
        <label className="text-sm font-medium text-slate-700">Sector<select className={campo} value={d.sector} onChange={(e) => setD({ ...d, sector: e.target.value })}>{SECTORES.map((o) => <option key={o}>{o}</option>)}</select></label>
        <label className="text-sm font-medium text-slate-700">Dormitorios<input type="number" min={0} className={campo} value={d.dormitorios} onChange={num("dormitorios")} /></label>
        <label className="text-sm font-medium text-slate-700">Baños<input type="number" min={0} className={campo} value={d.banos} onChange={num("banos")} /></label>
        <div><label htmlFor="ad-m2" className="text-sm font-medium text-slate-700">Superficie (m²)</label><input id="ad-m2" type="number" min={0} className={campo} value={d.m2 || ""} onChange={num("m2")} aria-invalid={!!err.m2} />{err.m2 && <p className="mt-1 text-sm text-red-700">{err.m2}</p>}</div>
        <div><label htmlFor="ad-precio" className="text-sm font-medium text-slate-700">Precio (CLP)</label><input id="ad-precio" type="number" min={0} className={campo} value={d.precio || ""} onChange={num("precio")} aria-invalid={!!err.precio} />{err.precio && <p className="mt-1 text-sm text-red-700">{err.precio}</p>}</div>
        <div className="flex items-end sm:col-span-2 lg:col-span-4"><button className="rounded-sm px-7 py-3 text-sm font-bold uppercase tracking-wider" style={{ background: C.marino, color: "#fff" }}>Agregar propiedad</button></div>
      </form>
      <h2 className="mt-10 font-display text-2xl font-semibold text-slate-900">Cartera ({lista.length})</h2>
      <div className="relative mt-4 overflow-x-auto rounded-sm bg-white ring-1 ring-slate-200">
        <table className="w-full min-w-[640px] text-left text-sm">
          <caption className="sr-only">Propiedades de la cartera</caption>
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="p-3">Propiedad</th><th className="p-3">Operación</th><th className="p-3">Precio</th><th className="p-3">Estado</th><th className="p-3"><span className="sr-only">Acciones</span></th></tr></thead>
          <tbody className="divide-y divide-slate-100">{lista.map((p) => (
            <tr key={p.id}><td className="p-3 font-medium text-slate-900">{p.titulo}<span className="block text-xs font-normal text-slate-500">{p.tipo} · {p.sector}</span></td><td className="p-3">{p.operacion}</td><td className="p-3 tabular-nums">{precioTexto(p)}</td>
              <td className="p-3"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${p.publicada ? "bg-green-100 text-green-800" : "bg-slate-200 text-slate-700"}`}>{p.publicada ? "Publicada" : "Oculta"}</span></td>
              <td className="space-x-3 p-3 text-right"><button type="button" className="font-semibold underline" style={{ color: C.azul }} onClick={() => alternar(p.id)} aria-label={`${p.publicada ? "Ocultar" : "Publicar"} ${p.titulo}`}>{p.publicada ? "Ocultar" : "Publicar"}</button>
                <button type="button" className="font-semibold text-red-700 underline" onClick={() => quitar(p.id)} aria-label={`Eliminar ${p.titulo}`}>Eliminar</button></td></tr>))}</tbody>
        </table>
      </div>
    </Cont>
  );
}

export default function Arista() {
  return (
    <ProveedorPropiedades>
      <div className="bg-slate-50 text-slate-800">
        <ScrollArriba />
        <Cabecera />
        <main className="min-h-[60vh]">
          <Routes>
            <Route index element={<Inicio />} />
            <Route path="propiedades" element={<Listado />} />
            <Route path="propiedades/:id" element={<Ficha />} />
            <Route path="admin" element={<Admin />} />
            <Route path="*" element={<Cont className="text-center"><h1 className="font-display text-3xl font-semibold">Página no encontrada</h1><div className="mt-6"><Boton to={BASE}>Volver al inicio</Boton></div></Cont>} />
          </Routes>
        </main>
        <footer style={{ background: C.marino }} className="text-white/70"><div className="mx-auto max-w-6xl px-4 py-9 text-sm"><p className="font-display text-lg text-white">Arista Propiedades</p><p className="mt-5 text-xs text-white/80">Arista Propiedades es una inmobiliaria ficticia creada para una demostración de SYNEXA. Propiedades, precios y personas son inventados. Fotografías generadas con IA.</p></div></footer>
      </div>
    </ProveedorPropiedades>
  );
}

import { useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useParams, useSearchParams } from "react-router-dom";
import { IsotipoMarca } from "@/componentes/IsotipoMarca";
import { marcaPorId } from "@/datos/marcas";
import { rutaAsset } from "@/utilidades/assets";
import { MenuMovil, ScrollArriba, esCorreo } from "../compartido/utiles";
import { BASE, C, CATEGORIAS, NEGOCIO, PRODUCTOS, categoriaPorId, clp, productoPorId, type Producto } from "./datos";

const marca = marcaPorId("punto-barrio")!;
const MENU = [["", "Inicio"], ["catalogo", "Catálogo"], ["contacto", "Contacto"]] as const;
const Cont = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <div className={`mx-auto max-w-6xl px-4 py-12 ${className}`}>{children}</div>;
const Btn = ({ to, children, claro = false }: { to: string; children: React.ReactNode; claro?: boolean }) => (
  <Link to={to} className="inline-flex rounded-lg px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90" style={claro ? { background: "#fff", color: C.verde } : { background: C.naranja, color: "#2a1700" }}>{children}</Link>
);

function Tarjeta({ p }: { p: Producto }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-black/10">
      <Link to={`${BASE}/producto/${p.id}`} tabIndex={-1} aria-hidden="true"><img src={rutaAsset(p.imagen)} alt="" loading="lazy" className="aspect-square w-full object-cover" /></Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: C.naranjaOsc }}>{categoriaPorId(p.categoria).nombre}</p>
        <h3 className="mt-1 font-bold"><Link to={`${BASE}/producto/${p.id}`} className="hover:underline">{p.nombre}</Link></h3>
        <p className="mt-auto pt-3 text-sm"><strong>{clp(p.precio)}</strong> <span className="opacity-75">/ {p.unidad}</span></p>
      </div>
    </article>
  );
}

function Cabecera() {
  const estilo = ({ isActive }: { isActive: boolean }) => `rounded px-3 py-2 text-sm font-semibold ${isActive ? "bg-white/20" : "hover:bg-white/10"}`;
  return (
    <header className="sticky top-11 z-40 text-white" style={{ background: C.verde }}>
      <div className="relative"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to={BASE} className="flex items-center gap-3" aria-label="Punto Barrio Market, inicio"><IsotipoMarca marca={marca} size={34} /><span className="text-lg font-extrabold">Punto Barrio <span style={{ color: C.naranja }}>Market</span></span></Link>
        <nav aria-label="Principal" className="hidden md:flex">{MENU.map(([r, t]) => <NavLink key={r} to={r ? `${BASE}/${r}` : BASE} end={r === ""} className={estilo}>{t}</NavLink>)}</nav>
        <MenuMovil id="pb-menu"><ul>{MENU.map(([r, t]) => <li key={r}><NavLink to={r ? `${BASE}/${r}` : BASE} end={r === ""} className="block rounded px-3 py-3 text-white">{t}</NavLink></li>)}</ul></MenuMovil>
      </div></div>
    </header>
  );
}

function Inicio() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={rutaAsset("assets/punto-barrio/hero.webp")} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#10301c]/90 via-[#10301c]/55 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-24 sm:py-32">
          <p className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: C.naranja }}>Tu almacén de barrio</p>
          <h1 className="mt-3 max-w-xl text-4xl font-extrabold leading-tight sm:text-6xl">Lo de todos los días, a la vuelta de la esquina.</h1>
          <p className="mt-5 max-w-lg text-lg text-white/85">Mira el catálogo, encuentra lo que necesitas y consúltanos por stock antes de venir.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Btn to={`${BASE}/catalogo`}>Ver catálogo</Btn><Btn to={`${BASE}/contacto`} claro>Cómo llegar</Btn></div>
        </div>
      </section>
      <section style={{ background: C.suave }}><Cont>
        <h2 className="text-2xl font-extrabold" style={{ color: C.verde }}>Categorías</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIAS.map((c) => {
            const n = PRODUCTOS.filter((x) => x.categoria === c.id).length;
            return <li key={c.id}><Link to={`${BASE}/catalogo?cat=${c.id}`} className="block h-full rounded-xl bg-white p-5 ring-1 ring-black/10 transition-shadow hover:shadow-md"><h3 className="font-bold" style={{ color: C.verde }}>{c.nombre}</h3><p className="mt-1 text-sm opacity-70">{c.texto}</p><p className="mt-3 text-xs font-semibold" style={{ color: C.naranjaOsc }}>{n} productos →</p></Link></li>;
          })}
        </ul>
      </Cont></section>
      <Cont>
        <div className="flex flex-wrap items-end justify-between gap-3"><h2 className="text-2xl font-extrabold" style={{ color: C.verde }}>Productos del día</h2><Link to={`${BASE}/catalogo`} className="text-sm font-bold underline" style={{ color: C.naranjaOsc }}>Ver los {PRODUCTOS.length} →</Link></div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">{["manzanas", "pan-molde", "huevos", "cafe"].map((id) => <Tarjeta key={id} p={productoPorId(id)!} />)}</div>
        <p className="mt-4 text-xs opacity-75">Precios de demostración.</p>
      </Cont>
    </>
  );
}

function Catalogo() {
  const [params, setParams] = useSearchParams();
  const cat = params.get("cat") ?? "";
  const q = params.get("q") ?? "";
  const poner = (k: string, v: string) => { const n = new URLSearchParams(params); if (v) n.set(k, v); else n.delete(k); setParams(n, { replace: true }); };
  const lista = useMemo(() => {
    const t = q.trim().toLowerCase();
    return PRODUCTOS.filter((x) => (!cat || x.categoria === cat) && (!t || `${x.nombre} ${x.descripcion}`.toLowerCase().includes(t)));
  }, [cat, q]);
  return (
    <Cont>
      <h1 className="text-3xl font-extrabold" style={{ color: C.verde }}>Catálogo</h1>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="mt-6 flex flex-wrap gap-3">
        <div className="min-w-[14rem] flex-1"><label htmlFor="pb-q" className="sr-only">Buscar un producto</label><input id="pb-q" type="search" value={q} onChange={(e) => poner("q", e.target.value)} placeholder="Buscar un producto…" className="w-full rounded-lg border border-black/20 px-4 py-3 outline-none focus:border-[#1f5a34] focus:ring-2 focus:ring-[#1f5a34]/30" /></div>
      </form>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Categorías">
        {[{ id: "", nombre: "Todas" }, ...CATEGORIAS].map((c) => <button key={c.id} type="button" aria-pressed={cat === c.id} onClick={() => poner("cat", c.id)} className={`rounded-full px-4 py-2 text-sm font-semibold ${cat === c.id ? "text-white" : "bg-[#e7f2ea] hover:bg-[#d4e8da]"}`} style={cat === c.id ? { background: C.verde } : undefined}>{c.nombre}</button>)}
      </div>
      <p className="mt-6 text-sm opacity-70" role="status" aria-live="polite">{lista.length} {lista.length === 1 ? "producto" : "productos"}</p>
      {lista.length ? <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">{lista.map((x) => <Tarjeta key={x.id} p={x} />)}</div> : (
        <div className="mt-4 rounded-xl border border-dashed border-black/25 p-12 text-center"><p className="font-semibold">No encontramos productos con esa búsqueda.</p><button type="button" onClick={() => setParams({}, { replace: true })} className="mt-3 text-sm font-bold underline" style={{ color: C.naranjaOsc }}>Quitar filtros</button></div>
      )}
      <p className="mt-8 text-xs opacity-75">Catálogo informativo, sin venta en línea. Precios de demostración.</p>
    </Cont>
  );
}

function FichaProducto() {
  const { id = "" } = useParams();
  const x = productoPorId(id);
  if (!x) return <Cont className="text-center"><h1 className="text-3xl font-extrabold">Producto no encontrado</h1><div className="mt-6"><Btn to={`${BASE}/catalogo`}>Volver al catálogo</Btn></div></Cont>;
  const similares = PRODUCTOS.filter((y) => y.categoria === x.categoria && y.id !== x.id).slice(0, 4);
  return (
    <Cont>
      <nav aria-label="Ruta de navegación" className="mb-6 text-sm"><Link to={`${BASE}/catalogo`} className="underline" style={{ color: C.verde }}>← Catálogo</Link> / {categoriaPorId(x.categoria).nombre}</nav>
      <div className="grid gap-10 md:grid-cols-2">
        <img src={rutaAsset(x.imagen)} alt={x.nombre} className="aspect-square w-full rounded-2xl object-cover ring-1 ring-black/10" />
        <div>
          <h1 className="text-3xl font-extrabold" style={{ color: C.verde }}>{x.nombre}</h1>
          <p className="mt-3 text-2xl font-bold">{clp(x.precio)} <span className="text-base font-normal opacity-75">/ {x.unidad}</span></p>
          <p className="mt-4 leading-relaxed opacity-80">{x.descripcion}</p>
          <p className="mt-4 rounded-lg p-3 text-sm" style={{ background: C.verdeClaro }}>Precio referencial. La disponibilidad se confirma por consulta.</p>
          <div className="mt-6"><Btn to={`${BASE}/contacto?producto=${x.id}`}>Consultar disponibilidad</Btn></div>
        </div>
      </div>
      {similares.length > 0 && <section className="mt-14"><h2 className="text-xl font-extrabold" style={{ color: C.verde }}>Más de {categoriaPorId(x.categoria).nombre.toLowerCase()}</h2><div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">{similares.map((s) => <Tarjeta key={s.id} p={s} />)}</div></section>}
    </Cont>
  );
}

function Contacto() {
  const [params] = useSearchParams();
  const inicial = productoPorId(params.get("producto") ?? "")?.id ?? "";
  const [c, setC] = useState({ nombre: "", correo: "", producto: inicial, mensaje: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);
  const campo = "w-full rounded-lg border border-black/20 bg-white px-3.5 py-2.5 outline-none focus:border-[#1f5a34] focus:ring-2 focus:ring-[#1f5a34]/30";
  const prod = productoPorId(c.producto);
  return (
    <Cont>
      <h1 className="text-3xl font-extrabold" style={{ color: C.verde }}>Contacto y consultas</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div>
          <address className="not-italic leading-relaxed"><strong>{NEGOCIO.direccion}</strong><br />{NEGOCIO.telefono}<br />{NEGOCIO.correo}</address>
          <p className="mt-3 text-sm opacity-80">{NEGOCIO.horario}</p>
          <p className="mt-4 text-xs opacity-75">Datos de contacto ficticios.</p>
        </div>
        {ok ? (
          <div role="status" className="h-fit rounded-xl p-7" style={{ background: C.verdeClaro }}>
            <h2 className="text-xl font-extrabold">Consulta recibida, {c.nombre.split(" ")[0]}.</h2>
            <p className="mt-2">En un sitio real te responderíamos a {c.correo}{prod ? ` sobre «${prod.nombre}»` : ""}.</p>
            <p className="mt-3 rounded-lg bg-white p-3 text-sm opacity-80">Esto es una demostración: no se envió ni se guardó ningún dato.</p>
            <button type="button" onClick={() => { setOk(false); setC({ nombre: "", correo: "", producto: "", mensaje: "" }); }} className="mt-4 text-sm font-bold underline" style={{ color: C.naranjaOsc }}>Hacer otra consulta</button>
          </div>
        ) : (
          <form noValidate aria-label="Consulta comercial" className="space-y-4" onSubmit={(ev) => {
            ev.preventDefault();
            const x: Record<string, string> = {};
            if (c.nombre.trim().length < 2) x.nombre = "Escribe tu nombre.";
            if (!esCorreo(c.correo)) x.correo = "Ingresa un correo válido.";
            setErr(x);
            if (!Object.keys(x).length) setOk(true);
          }}>
            <div><label htmlFor="pb-nombre" className="mb-1.5 block text-sm font-semibold">Nombre</label><input id="pb-nombre" value={c.nombre} onChange={(e) => setC({ ...c, nombre: e.target.value })} aria-invalid={!!err.nombre} aria-describedby={err.nombre ? "pb-nombre-e" : undefined} className={campo} />{err.nombre && <p id="pb-nombre-e" className="mt-1 text-sm text-red-700">{err.nombre}</p>}</div>
            <div><label htmlFor="pb-correo" className="mb-1.5 block text-sm font-semibold">Correo</label><input id="pb-correo" type="email" value={c.correo} onChange={(e) => setC({ ...c, correo: e.target.value })} aria-invalid={!!err.correo} aria-describedby={err.correo ? "pb-correo-e" : undefined} className={campo} />{err.correo && <p id="pb-correo-e" className="mt-1 text-sm text-red-700">{err.correo}</p>}</div>
            <div><label htmlFor="pb-producto" className="mb-1.5 block text-sm font-semibold">Producto (opcional)</label><select id="pb-producto" value={c.producto} onChange={(e) => setC({ ...c, producto: e.target.value })} className={campo}><option value="">Consulta general</option>{PRODUCTOS.map((x) => <option key={x.id} value={x.id}>{x.nombre}</option>)}</select></div>
            <div><label htmlFor="pb-mensaje" className="mb-1.5 block text-sm font-semibold">Mensaje (opcional)</label><textarea id="pb-mensaje" rows={3} value={c.mensaje} onChange={(e) => setC({ ...c, mensaje: e.target.value })} className={campo} /></div>
            <button type="submit" className="rounded-lg px-7 py-3 text-sm font-bold" style={{ background: C.naranja, color: "#2a1700" }}>Enviar consulta</button>
            <p className="text-xs opacity-75">Formulario demostrativo: no se envía ni se guarda ningún dato.</p>
          </form>
        )}
      </div>
    </Cont>
  );
}

export default function PuntoBarrio() {
  return (
    <div className="bg-white" style={{ color: "#17261c" }}>
      <ScrollArriba />
      <Cabecera />
      <main>
        <Routes>
          <Route index element={<Inicio />} />
          <Route path="catalogo" element={<Catalogo />} />
          <Route path="producto/:id" element={<FichaProducto />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="*" element={<Cont className="text-center"><h1 className="text-3xl font-extrabold">Página no encontrada</h1><div className="mt-6"><Btn to={BASE}>Volver al inicio</Btn></div></Cont>} />
        </Routes>
      </main>
      <footer className="text-white/75" style={{ background: C.verde }}><div className="mx-auto max-w-6xl px-4 py-9 text-sm"><p className="font-bold text-white">Punto Barrio Market</p><p className="mt-2">{NEGOCIO.direccion}</p><p className="mt-5 text-xs text-white/80">Punto Barrio Market es un negocio ficticio creado para una demostración de SYNEXA. Productos genéricos sin marcas. Fotografías generadas con IA.</p></div></footer>
    </div>
  );
}

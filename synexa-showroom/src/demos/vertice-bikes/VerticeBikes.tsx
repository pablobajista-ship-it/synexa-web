import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { Link, NavLink, Route, Routes, useParams, useSearchParams } from "react-router-dom";
import { IsotipoMarca } from "@/componentes/IsotipoMarca";
import { marcaPorId } from "@/datos/marcas";
import { rutaAsset } from "@/utilidades/assets";
import { MenuMovil, ScrollArriba, esCorreo, usePersistente } from "../compartido/utiles";
import { BASE, C, CATEGORIAS, HERO, IMAGENES_DISPONIBLES, MATERIALES, NOMBRES_ORDEN, PRODUCTOS_INICIALES, SUSPENSIONES, categoriaPor, clp, type CategoriaId, type Producto } from "./datos";
import { filtrar, relacionados, validarProducto, type Orden } from "./filtros";

export const CLAVE = "synexa:vertice-bikes:productos";
const marca = marcaPorId("vertice-bikes")!;

interface Ctx { productos: Producto[]; guardar: (p: Producto) => void; eliminar: (id: string) => void }
const Contexto = createContext<Ctx | null>(null);
const useCatalogo = () => { const c = useContext(Contexto); if (!c) throw new Error("falta Proveedor"); return c; };

function Proveedor({ children }: { children: ReactNode }) {
  const [productos, setProductos] = usePersistente<Producto[]>(CLAVE, PRODUCTOS_INICIALES);
  const valor = useMemo<Ctx>(() => ({
    productos,
    guardar: (p) => setProductos((l) => (l.some((x) => x.id === p.id) ? l.map((x) => (x.id === p.id ? p : x)) : [p, ...l])),
    eliminar: (id) => setProductos((l) => l.filter((x) => x.id !== id)),
  }), [productos, setProductos]);
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

const Cont = ({ children, className = "" }: { children: ReactNode; className?: string }) => <div className={`mx-auto max-w-6xl px-4 py-12 ${className}`}>{children}</div>;
const campo = "w-full rounded-md border border-white/20 bg-[#0d0d0d] px-3.5 py-2.5 text-white placeholder-white/35 outline-none focus:border-[#2ecc71] focus:ring-2 focus:ring-[#2ecc71]/40";
const btn = "rounded-md px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-[#0d0d0d] hover:opacity-90";

function Cabecera() {
  const MENU = [["", "Inicio"], ["catalogo", "Catálogo"], ["gestion", "Gestión (demo)"]] as const;
  const est = ({ isActive }: { isActive: boolean }) => `rounded px-3 py-2 text-sm font-semibold uppercase tracking-wider ${isActive ? "text-white" : "text-white/80 hover:text-white"}`;
  return (
    <header className="sticky top-11 z-30 border-b border-white/10 text-white" style={{ background: C.negro }}>
      <div className="relative"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to={BASE} className="flex items-center gap-3" aria-label="Vértice Bikes, inicio"><IsotipoMarca marca={marca} size={34} /><span className="text-lg font-extrabold uppercase tracking-[0.15em]">Vértice <span style={{ color: C.verde }}>Bikes</span></span></Link>
        <nav aria-label="Principal" className="hidden md:flex">{MENU.map(([r, t]) => <NavLink key={r} to={r ? `${BASE}/${r}` : BASE} end={r === ""} className={est}>{t}</NavLink>)}</nav>
        <MenuMovil id="vb-menu"><ul style={{ background: C.negro }}>{MENU.map(([r, t]) => <li key={r}><NavLink to={r ? `${BASE}/${r}` : BASE} end={r === ""} className="block rounded px-3 py-3 text-white">{t}</NavLink></li>)}</ul></MenuMovil>
      </div></div>
    </header>
  );
}

function Tarjeta({ p }: { p: Producto }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-[#171717] ring-1 ring-white/10 transition-colors hover:ring-[#2ecc71]/60">
      <Link to={`${BASE}/producto/${p.id}`} tabIndex={-1} aria-hidden="true"><img src={rutaAsset(p.imagen)} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" /></Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: C.verde }}>{categoriaPor(p.categoria).nombre}</p>
        <h3 className="mt-1 font-bold leading-snug"><Link to={`${BASE}/producto/${p.id}`} className="hover:text-[#2ecc71]">{p.nombre}</Link></h3>
        <p className="mt-2 flex-1 text-sm text-white/65">{p.resumen}</p>
        <div className="mt-3 flex items-end justify-between"><p className="text-lg font-extrabold tabular-nums">{clp(p.precio)}</p><p className={`text-xs font-semibold ${p.stock > 0 ? "text-white/80" : "text-red-300"}`}>{p.stock > 0 ? (p.stock <= 3 ? `Quedan ${p.stock}` : "En stock") : "Sin stock"}</p></div>
      </div>
    </article>
  );
}

function Inicio() {
  const { productos } = useCatalogo();
  const destacados = productos.filter((p) => p.activo).slice(0, 4);
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={rutaAsset(HERO)} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/55 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-28 sm:py-36">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: C.verde }}>Bicicletas, repuestos y accesorios</p>
          <h1 className="mt-4 max-w-xl text-5xl font-extrabold uppercase leading-[1.02] sm:text-6xl">Encuentra la bici que se ajusta a tu ruta.</h1>
          <p className="mt-5 max-w-lg text-lg text-white/80">Filtra por tipo, material, suspensión y precio, y compara fichas técnicas completas.</p>
          <div className="mt-8"><Link to={`${BASE}/catalogo`} className={`inline-flex ${btn}`} style={{ background: C.verde }}>Ver catálogo</Link></div>
        </div>
      </section>
      <section className="text-white"><Cont>
        <h2 className="text-2xl font-extrabold uppercase">Categorías</h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">{CATEGORIAS.map((c) => <li key={c.id}><Link to={`${BASE}/catalogo?cat=${c.id}`} className="block rounded-lg bg-[#171717] p-4 text-center text-sm font-bold ring-1 ring-white/10 hover:ring-[#2ecc71]">{c.nombre}</Link></li>)}</ul>
        <h2 className="mt-14 text-2xl font-extrabold uppercase">Destacados</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{destacados.map((p) => <Tarjeta key={p.id} p={p} />)}</div>
        <p className="mt-4 text-xs text-white/80">Precios de demostración.</p>
      </Cont></section>
    </>
  );
}

const Grupo = ({ titulo, children }: { titulo: string; children: ReactNode }) => <fieldset><legend className="mb-2 text-sm font-bold uppercase tracking-wider">{titulo}</legend>{children}</fieldset>;
const Check = ({ k, v, actuales, texto, alternar }: { k: string; v: string; actuales: string[]; texto: string; alternar: (k: string, v: string, a: string[]) => void }) => (
  <label className="flex items-center gap-2.5 py-1 text-sm"><input type="checkbox" checked={actuales.includes(v)} onChange={() => alternar(k, v, actuales)} className="h-4 w-4 accent-[#2ecc71]" />{texto}</label>
);

function Catalogo() {
  const { productos } = useCatalogo();
  const [params, setParams] = useSearchParams();
  const maximo = Math.max(...productos.map((p) => p.precio), 1);
  const f = {
    q: params.get("q") ?? "",
    categorias: params.getAll("cat"),
    precioMax: params.get("precio") ? Number(params.get("precio")) : null,
    materiales: params.getAll("mat"),
    suspensiones: params.getAll("sus"),
    soloEnStock: params.get("stock") === "1",
  };
  const orden = (params.get("orden") as Orden) in NOMBRES_ORDEN ? (params.get("orden") as Orden) : "destacados";
  const poner = (fn: (n: URLSearchParams) => void) => { const n = new URLSearchParams(params); fn(n); setParams(n, { replace: true }); };
  const alternar = (k: string, v: string, actuales: string[]) => poner((n) => { n.delete(k); (actuales.includes(v) ? actuales.filter((x) => x !== v) : [...actuales, v]).forEach((x) => n.append(k, x)); });
  const lista = filtrar(productos, f, orden);
  const hay = f.q || f.categorias.length || f.materiales.length || f.suspensiones.length || f.precioMax !== null || f.soloEnStock;
  const precio = f.precioMax ?? maximo;

  return (
    <Cont className="text-white">
      <h1 className="text-3xl font-extrabold uppercase">Catálogo</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <form role="search" aria-label="Filtros" onSubmit={(e) => e.preventDefault()} className="h-fit space-y-6 rounded-xl bg-[#171717] p-5 ring-1 ring-white/10">
          <div><label htmlFor="vb-q" className="mb-1.5 block text-sm font-bold uppercase tracking-wider">Buscar</label><input id="vb-q" type="search" value={f.q} onChange={(e) => poner((n) => (e.target.value ? n.set("q", e.target.value) : n.delete("q")))} placeholder="Ej.: carbono hidráulico" className={campo} /></div>
          <Grupo titulo="Categoría">{CATEGORIAS.map((c) => <Check key={c.id} alternar={alternar} k="cat" v={c.id} actuales={f.categorias} texto={c.nombre} />)}</Grupo>
          <div><label htmlFor="vb-precio" className="mb-1 block text-sm font-bold uppercase tracking-wider">Precio máximo</label><input id="vb-precio" type="range" min={10000} max={maximo} step={10000} value={precio} onChange={(e) => poner((n) => (Number(e.target.value) >= maximo ? n.delete("precio") : n.set("precio", e.target.value)))} className="w-full accent-[#2ecc71]" /><p className="text-sm text-white/70" aria-live="polite">Hasta {clp(precio)}</p></div>
          <Grupo titulo="Material">{MATERIALES.map((m) => <Check key={m} alternar={alternar} k="mat" v={m} actuales={f.materiales} texto={m} />)}</Grupo>
          <Grupo titulo="Suspensión">{SUSPENSIONES.map((m) => <Check key={m} alternar={alternar} k="sus" v={m} actuales={f.suspensiones} texto={m} />)}</Grupo>
          <label className="flex items-center gap-2.5 text-sm"><input type="checkbox" checked={f.soloEnStock} onChange={(e) => poner((n) => (e.target.checked ? n.set("stock", "1") : n.delete("stock")))} className="h-4 w-4 accent-[#2ecc71]" />Solo con stock</label>
          {hay && <button type="button" onClick={() => setParams({}, { replace: true })} className="text-sm font-bold underline" style={{ color: C.verde }}>Quitar filtros</button>}
        </form>
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-white/70" role="status" aria-live="polite">{lista.length} {lista.length === 1 ? "producto" : "productos"}</p><label className="flex items-center gap-2 text-sm"><span className="text-white/70">Ordenar</span><select value={orden} onChange={(e) => poner((n) => (e.target.value === "destacados" ? n.delete("orden") : n.set("orden", e.target.value)))} className="rounded-md border border-white/20 bg-[#171717] px-3 py-2 text-sm">{Object.entries(NOMBRES_ORDEN).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label></div>
          {lista.length ? <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{lista.map((p) => <Tarjeta key={p.id} p={p} />)}</div> : <div className="mt-5 rounded-xl border border-dashed border-white/25 p-12 text-center"><p className="font-semibold">Ningún producto cumple esos filtros.</p><button type="button" onClick={() => setParams({}, { replace: true })} className="mt-3 text-sm font-bold underline" style={{ color: C.verde }}>Quitar filtros</button></div>}
        </div>
      </div>
    </Cont>
  );
}

function Ficha() {
  const { id = "" } = useParams();
  const { productos } = useCatalogo();
  const p = productos.find((x) => x.id === id && x.activo);
  const [c, setC] = useState({ nombre: "", correo: "", mensaje: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);
  if (!p) return <Cont className="text-center text-white"><h1 className="text-3xl font-extrabold uppercase">Producto no encontrado</h1><Link to={`${BASE}/catalogo`} className="mt-6 inline-block underline" style={{ color: C.verde }}>Volver al catálogo</Link></Cont>;
  const filas: [string, string][] = [...(p.material ? ([["Material", p.material]] as [string, string][]) : []), ...(p.velocidades ? ([["Velocidades", String(p.velocidades)]] as [string, string][]) : []), ...(p.suspension ? ([["Suspensión", p.suspension]] as [string, string][]) : []), ...(p.pesoKg ? ([["Peso", `${String(p.pesoKg).replace(".", ",")} kg`]] as [string, string][]) : []), ...Object.entries(p.specs)];
  return (
    <Cont className="text-white">
      <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-white/80"><Link to={`${BASE}/catalogo`} className="hover:text-white">← Catálogo</Link> / <Link to={`${BASE}/catalogo?cat=${p.categoria}`} className="hover:text-white">{categoriaPor(p.categoria).nombre}</Link></nav>
      <div className="grid gap-10 lg:grid-cols-2">
        <img src={rutaAsset(p.imagen)} alt={p.nombre} className="aspect-[4/3] w-full rounded-2xl object-cover ring-1 ring-white/10" />
        <div>
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: C.verde }}>{categoriaPor(p.categoria).nombre}</p>
          <h1 className="mt-2 text-3xl font-extrabold uppercase leading-tight">{p.nombre}</h1>
          <p className="mt-4 text-white/75">{p.descripcion}</p>
          <p className="mt-5 text-3xl font-extrabold tabular-nums">{clp(p.precio)}</p>
          <p className={`text-sm font-semibold ${p.stock > 0 ? "text-white/80" : "text-red-300"}`}>{p.stock > 0 ? `${p.stock} en stock · precio referencial` : "Sin stock · consulta por reposición"}</p>
          <a href="#consulta" className={`mt-5 inline-flex ${btn}`} style={{ background: C.verde }}>Consultar este producto</a>
          <h2 className="mb-3 mt-9 text-lg font-extrabold uppercase">Ficha técnica</h2>
          <dl className="divide-y divide-white/10 rounded-xl bg-[#171717] ring-1 ring-white/10">{filas.map(([k, v]) => <div key={k} className="flex justify-between gap-4 px-4 py-3 text-sm"><dt className="text-white/80">{k}</dt><dd className="text-right font-medium">{v}</dd></div>)}</dl>
        </div>
      </div>
      <section id="consulta" className="mt-14 max-w-2xl scroll-mt-32">
        <h2 className="text-xl font-extrabold uppercase">Consulta comercial</h2>
        {ok ? <div role="status" className="mt-4 rounded-xl bg-[#171717] p-6 ring-1 ring-[#2ecc71]/50"><p className="font-bold">Gracias, {c.nombre.split(" ")[0]}.</p><p className="mt-2 text-white/75">En una tienda real, te responderíamos a {c.correo} sobre «{p.nombre}».</p><p className="mt-3 rounded-md bg-black/30 p-3 text-sm text-white/80">Esto es una demostración: no se envió ni se guardó ningún dato.</p><button type="button" onClick={() => { setOk(false); setC({ nombre: "", correo: "", mensaje: "" }); }} className="mt-4 text-sm font-bold underline" style={{ color: C.verde }}>Hacer otra consulta</button></div> : (
          <form noValidate aria-label="Consulta comercial" className="mt-4 space-y-4" onSubmit={(ev) => { ev.preventDefault(); const x: Record<string, string> = {}; if (c.nombre.trim().length < 2) x.nombre = "Escribe tu nombre."; if (!esCorreo(c.correo)) x.correo = "Ingresa un correo válido."; setErr(x); if (!Object.keys(x).length) setOk(true); }}>
            <div className="grid gap-4 sm:grid-cols-2">{(["nombre", "correo"] as const).map((k) => <div key={k}><label htmlFor={`vb-c-${k}`} className="mb-1.5 block text-sm font-medium">{k === "nombre" ? "Nombre" : "Correo"}</label><input id={`vb-c-${k}`} type={k === "correo" ? "email" : "text"} value={c[k]} onChange={(e) => setC({ ...c, [k]: e.target.value })} aria-invalid={!!err[k]} aria-describedby={err[k] ? `vb-c-${k}-e` : undefined} className={campo} />{err[k] && <p id={`vb-c-${k}-e`} className="mt-1.5 text-sm text-red-300">{err[k]}</p>}</div>)}</div>
            <div><label htmlFor="vb-c-msg" className="mb-1.5 block text-sm font-medium">Mensaje (opcional)</label><textarea id="vb-c-msg" rows={3} value={c.mensaje} onChange={(e) => setC({ ...c, mensaje: e.target.value })} className={campo} /></div>
            <button type="submit" className={btn} style={{ background: C.verde }}>Enviar consulta</button>
            <p className="text-xs text-white/80">Formulario demostrativo: no se envía ni se guarda ningún dato.</p>
          </form>
        )}
      </section>
      <section className="mt-16"><h2 className="text-2xl font-extrabold uppercase">Productos relacionados</h2><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{relacionados(productos, p).map((r) => <Tarjeta key={r.id} p={r} />)}</div></section>
    </Cont>
  );
}

function Gestion() {
  const { productos, guardar, eliminar } = useCatalogo();
  const [edit, setEdit] = useState<Producto | null>(null);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const nuevo = (): Producto => ({ id: `p${Date.now()}`, nombre: "", categoria: "urbana", precio: 0, stock: 0, activo: true, imagen: IMAGENES_DISPONIBLES[0], resumen: "Producto nuevo.", descripcion: "Descripción pendiente.", specs: {} });
  const peq = "rounded-md px-3 py-1.5 text-xs font-bold ring-1 ring-inset ring-white/25 hover:bg-white/10";
  return (
    <Cont className="text-white">
      <div className="rounded-md bg-[#2b2400] p-3 text-sm text-[#f3d77a]" role="note"><strong>Panel de demostración.</strong> Así administraría el equipo de Vértice Bikes su catálogo. Los cambios se ven en el sitio y viven solo en este navegador; «Reiniciar demo» los borra.</div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4"><h1 className="text-3xl font-extrabold uppercase">Gestión de productos</h1><button type="button" onClick={() => { setEdit(nuevo()); setErrores({}); }} className={btn} style={{ background: C.verde }}>Nuevo producto</button></div>
      {edit && (
        <form noValidate aria-label="Editar producto" className="mt-6 space-y-4 rounded-2xl bg-[#171717] p-6 ring-1 ring-white/10" onSubmit={(ev) => { ev.preventDefault(); const e = validarProducto(edit); setErrores(e); if (Object.keys(e).length) return; guardar({ ...edit, nombre: edit.nombre.trim() }); setEdit(null); }}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2"><label htmlFor="g-nombre" className="mb-1 block text-sm font-medium">Nombre</label><input id="g-nombre" value={edit.nombre} onChange={(e) => setEdit({ ...edit, nombre: e.target.value })} aria-invalid={!!errores.nombre} aria-describedby={errores.nombre ? "g-nombre-e" : undefined} className={campo} />{errores.nombre && <p id="g-nombre-e" className="mt-1 text-sm text-red-300">{errores.nombre}</p>}</div>
            <div><label htmlFor="g-cat" className="mb-1 block text-sm font-medium">Categoría</label><select id="g-cat" value={edit.categoria} onChange={(e) => setEdit({ ...edit, categoria: e.target.value as CategoriaId })} className={campo}>{CATEGORIAS.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}</select></div>
            <div><label htmlFor="g-img" className="mb-1 block text-sm font-medium">Imagen</label><select id="g-img" value={edit.imagen} onChange={(e) => setEdit({ ...edit, imagen: e.target.value })} className={campo}>{IMAGENES_DISPONIBLES.map((i) => <option key={i} value={i}>{i.split("/").pop()}</option>)}</select></div>
            <div><label htmlFor="g-precio" className="mb-1 block text-sm font-medium">Precio (CLP)</label><input id="g-precio" type="number" min={0} value={edit.precio || ""} onChange={(e) => setEdit({ ...edit, precio: Number(e.target.value) })} aria-invalid={!!errores.precio} aria-describedby={errores.precio ? "g-precio-e" : undefined} className={campo} />{errores.precio && <p id="g-precio-e" className="mt-1 text-sm text-red-300">{errores.precio}</p>}</div>
            <div><label htmlFor="g-stock" className="mb-1 block text-sm font-medium">Stock</label><input id="g-stock" type="number" min={0} value={edit.stock} onChange={(e) => setEdit({ ...edit, stock: Number(e.target.value) })} aria-invalid={!!errores.stock} aria-describedby={errores.stock ? "g-stock-e" : undefined} className={campo} />{errores.stock && <p id="g-stock-e" className="mt-1 text-sm text-red-300">{errores.stock}</p>}</div>
          </div>
          <label className="flex items-center gap-3 text-sm font-medium"><input type="checkbox" checked={edit.activo} onChange={(e) => setEdit({ ...edit, activo: e.target.checked })} className="h-4 w-4 accent-[#2ecc71]" />Visible en el catálogo</label>
          <div className="flex gap-3"><button type="submit" className={btn} style={{ background: C.verde }}>Guardar</button><button type="button" onClick={() => setEdit(null)} className="rounded-md px-6 py-3 text-sm font-bold ring-1 ring-inset ring-white/30 hover:bg-white/10">Cancelar</button></div>
        </form>
      )}
      <div className="mt-8 overflow-x-auto rounded-xl ring-1 ring-white/10">
        <table className="w-full min-w-[720px] text-left text-sm"><caption className="sr-only">Productos del catálogo</caption>
          <thead className="bg-[#171717] text-xs uppercase tracking-wider text-white/80"><tr><th scope="col" className="px-4 py-3">Producto</th><th scope="col" className="px-4 py-3">Categoría</th><th scope="col" className="px-4 py-3 text-right">Precio</th><th scope="col" className="px-4 py-3 text-right">Stock</th><th scope="col" className="px-4 py-3">Estado</th><th scope="col" className="px-4 py-3 text-right">Acciones</th></tr></thead>
          <tbody className="divide-y divide-white/10">{productos.map((p) => <tr key={p.id}><td className="px-4 py-3 font-medium">{p.nombre}</td><td className="px-4 py-3 text-white/65">{categoriaPor(p.categoria).nombre}</td><td className="px-4 py-3 text-right tabular-nums">{clp(p.precio)}</td><td className="px-4 py-3 text-right tabular-nums">{p.stock}</td><td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${p.activo ? "bg-green-500/20 text-green-200" : "bg-white/10 text-white/80"}`}>{p.activo ? "Visible" : "Oculto"}</span></td><td className="space-x-2 px-4 py-3 text-right"><button type="button" className={peq} onClick={() => guardar({ ...p, activo: !p.activo })} aria-label={`${p.activo ? "Ocultar" : "Mostrar"} ${p.nombre}`}>{p.activo ? "Ocultar" : "Mostrar"}</button><button type="button" className={peq} onClick={() => { setEdit(p); setErrores({}); }} aria-label={`Editar ${p.nombre}`}>Editar</button><button type="button" className={`${peq} text-red-200`} onClick={() => eliminar(p.id)} aria-label={`Eliminar ${p.nombre}`}>Eliminar</button></td></tr>)}</tbody>
        </table>
      </div>
    </Cont>
  );
}

export default function VerticeBikes() {
  return (
    <Proveedor>
      <div className="min-h-screen" style={{ background: C.negro, color: "#fff" }}>
        <ScrollArriba />
        <Cabecera />
        <main>
          <Routes>
            <Route index element={<Inicio />} />
            <Route path="catalogo" element={<Catalogo />} />
            <Route path="producto/:id" element={<Ficha />} />
            <Route path="gestion" element={<Gestion />} />
            <Route path="*" element={<Cont className="text-center"><h1 className="text-3xl font-extrabold uppercase">Página no encontrada</h1><Link to={BASE} className="mt-6 inline-block underline" style={{ color: C.verde }}>Volver al inicio</Link></Cont>} />
          </Routes>
        </main>
        <footer className="border-t border-white/10 bg-black"><div className="mx-auto max-w-6xl px-4 py-9 text-xs text-white/80">Vértice Bikes es un negocio ficticio creado para una demostración de SYNEXA. Modelos, especificaciones y precios son inventados. Fotografías generadas con IA.</div></footer>
      </div>
    </Proveedor>
  );
}

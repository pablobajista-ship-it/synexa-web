import { createContext, useContext, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import { IsotipoMarca } from "@/componentes/IsotipoMarca";
import { marcaPorId } from "@/datos/marcas";
import { rutaAsset } from "@/utilidades/assets";
import { MenuMovil, ScrollArriba, usePersistente } from "../compartido/utiles";
import {
  BASE, C, CATEGORIAS, CLAVE, ESTADO_INICIAL, aCSV, clp, estadoStock, filtrarItems, kpis, movimientosPorDia, porCategoria, registrarMovimiento, validarItem, valorItem,
  type Categoria, type Estado, type Item, type TipoMov,
} from "./inventario";

const marca = marcaPorId("rutastock")!;

interface Ctx { e: Estado; mover: (sku: string, tipo: TipoMov, cantidad: number) => string | null; agregar: (i: Omit<Item, "id" | "sku">) => void; quitar: (id: string) => void }
const Contexto = createContext<Ctx | null>(null);
const useInventario = () => { const c = useContext(Contexto); if (!c) throw new Error("falta ProveedorInventario"); return c; };

function ProveedorInventario({ children }: { children: ReactNode }) {
  const [e, setE] = usePersistente<Estado>(CLAVE, ESTADO_INICIAL);
  const valor = useMemo<Ctx>(() => ({
    e,
    mover: (sku, tipo, cantidad) => {
      const r = registrarMovimiento(e, sku, tipo, cantidad);
      if ("error" in r) return r.error;
      setE(r.estado);
      return null;
    },
    agregar: (i) => setE((p) => {
      const mayor = Math.max(1000, ...p.items.map((x) => Number(x.sku.slice(3)) || 0));
      return { ...p, items: [...p.items, { ...i, id: `i${Date.now()}`, sku: `RS-${mayor + 1}` }] };
    }),
    quitar: (id) => setE((p) => ({ ...p, items: p.items.filter((i) => i.id !== id) })),
  }), [e, setE]);
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

const Cont = ({ children, className = "" }: { children: ReactNode; className?: string }) => <div className={`mx-auto max-w-6xl px-4 py-12 ${className}`}>{children}</div>;
const Boton = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={to} className="inline-flex rounded-md px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: C.azul }}>{children}</Link>
);
const campo = "w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-[#0f3d75] focus:ring-2 focus:ring-[#0f3d75]/25";

function Cabecera() {
  const MENU = [["", "Inicio"], ["panel", "Panel"], ["inventario", "Inventario"], ["reportes", "Reportes"]] as const;
  const estilo = ({ isActive }: { isActive: boolean }) => `rounded-md px-3 py-2 text-sm font-semibold ${isActive ? "bg-white/15 text-white" : "text-white/70 hover:text-white"}`;
  return (
    <header className="sticky top-11 z-40 text-white" style={{ background: C.azul }}>
      <div className="relative"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to={BASE} className="flex items-center gap-3" aria-label="RutaStock, inicio"><IsotipoMarca marca={marca} size={32} /><span className="font-display text-xl font-semibold">RutaStock</span></Link>
        <nav aria-label="Principal" className="hidden md:flex">{MENU.map(([r, t]) => <NavLink key={r} to={r ? `${BASE}/${r}` : BASE} end={r === ""} className={estilo}>{t}</NavLink>)}</nav>
        <MenuMovil id="rs-menu"><ul style={{ background: C.azul }}>{MENU.map(([r, t]) => <li key={r}><NavLink to={r ? `${BASE}/${r}` : BASE} end={r === ""} className="block rounded px-3 py-3 text-white">{t}</NavLink></li>)}</ul></MenuMovil>
      </div></div>
    </header>
  );
}

function Inicio() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={rutaAsset("assets/rutastock/hero.webp")} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(90deg, rgba(15,61,117,.92), rgba(15,61,117,.6) 60%, rgba(15,61,117,.2))" }} />
        <div className="mx-auto max-w-6xl px-4 py-28 sm:py-36">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-300">Distribución e inventario</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">Tu bodega, bajo control.</h1>
          <p className="mt-6 max-w-lg text-lg text-white/85">Stock, movimientos y alertas en un solo panel, sin planillas dispersas.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link to={`${BASE}/panel`} className="inline-flex rounded-md bg-white px-6 py-3 text-sm font-semibold" style={{ color: C.azul }}>Abrir el panel</Link><Link to={`${BASE}/inventario`} className="inline-flex rounded-md px-6 py-3 text-sm font-semibold ring-1 ring-inset ring-white/60 hover:bg-white/10">Ver inventario</Link></div>
        </div>
      </section>
      <section className="bg-white"><Cont>
        <h2 className="font-display text-3xl font-semibold text-slate-900">Qué resuelve</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-3">{[
          ["bodega", "Inventario al día", "Cada entrada y salida actualiza el stock y deja registro."],
          ["escaneo", "Alertas de reposición", "Los productos bajo su mínimo o sin stock se destacan solos."],
          ["distribucion", "Reportes exportables", "Valor del inventario por categoría y detalle en CSV."],
        ].map(([img, t, d]) => <li key={t}><img src={rutaAsset(`assets/rutastock/${img}.webp`)} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover" /><h3 className="mt-4 font-display text-xl font-semibold text-slate-900">{t}</h3><p className="mt-1 text-slate-600">{d}</p></li>)}</ul>
      </Cont></section>
      <section style={{ background: C.azulClaro }}><Cont className="grid items-center gap-10 md:grid-cols-2">
        <div><h2 className="font-display text-3xl font-semibold text-slate-900">Un equipo que opera con datos</h2><p className="mt-4 text-slate-700">Esta es una demostración con productos, cifras y personas ficticios. Los datos se guardan solo en tu navegador.</p><div className="mt-6"><Boton to={`${BASE}/panel`}>Probar el panel</Boton></div></div>
        <img src={rutaAsset("assets/rutastock/operaciones-2.webp")} alt="Operaria con tableta en la bodega" loading="lazy" className="mx-auto aspect-[3/4] w-full max-w-xs rounded-md object-cover object-top" />
      </Cont></section>
    </>
  );
}

const etiquetaDia = (d: number) => (d === 6 ? "Hoy" : `-${6 - d} d`);

function GraficoMovimientos({ datos }: { datos: ReturnType<typeof movimientosPorDia> }) {
  const max = Math.max(1, ...datos.flatMap((d) => [d.entradas, d.salidas]));
  const x = (i: number) => 30 + (i * 280) / (datos.length - 1);
  const y = (v: number) => 130 - (v / max) * 110;
  const linea = (k: "entradas" | "salidas") => datos.map((d, i) => `${x(i)},${y(d[k])}`).join(" ");
  return (
    <div>
      <svg viewBox="0 0 340 160" role="img" aria-label="Entradas y salidas de unidades en los últimos siete días" className="w-full">
        <line x1="30" y1="130" x2="310" y2="130" stroke="#cbd5e1" />
        <polyline points={linea("entradas")} fill="none" stroke={C.verde} strokeWidth="3" /><polyline points={linea("salidas")} fill="none" stroke={C.azul} strokeWidth="3" strokeDasharray="6 4" />
        {datos.map((d, i) => <text key={d.dia} x={x(i)} y="150" textAnchor="middle" fontSize="9" fill="#64748b">{etiquetaDia(d.dia)}</text>)}
        <text x="2" y="24" fontSize="9" fill="#64748b">{max}</text>
      </svg>
      <p className="mt-1 flex gap-5 text-xs text-slate-600"><span><span className="mr-1 inline-block h-0.5 w-5 align-middle" style={{ background: C.verde }} />Entradas</span><span><span className="mr-1 inline-block h-0.5 w-5 align-middle border-t-2 border-dashed" style={{ borderColor: C.azul }} />Salidas</span></p>
    </div>
  );
}

function Panel() {
  const { e } = useInventario();
  const k = kpis(e.items);
  const cat = porCategoria(e.items);
  const maxV = Math.max(1, ...cat.map((c) => c.valor));
  const alertas = e.items.filter((i) => estadoStock(i) !== "ok");
  return (
    <Cont>
      <h1 className="font-display text-4xl font-semibold text-slate-900">Panel de control</h1>
      <dl className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-5">{([["Productos", k.skus], ["Unidades", k.unidades.toLocaleString("es-CL")], ["Valor del inventario", clp(k.valor)], ["Bajo mínimo", k.bajos], ["Sin stock", k.sinStock]] as const).map(([t, v]) => (
        <div key={t} className="rounded-md bg-white p-4 shadow-sm ring-1 ring-slate-200"><dt className="text-xs uppercase tracking-wider text-slate-500">{t}</dt><dd className="mt-1 text-2xl font-bold tabular-nums text-slate-900">{v}</dd></div>))}</dl>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="rs-cat" className="rounded-md bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 id="rs-cat" className="font-display text-xl font-semibold text-slate-900">Valor por categoría</h2>
          <ul className="mt-4 space-y-3">{cat.map((c) => <li key={c.categoria}><div className="flex justify-between text-sm"><span>{c.categoria}</span><span className="font-semibold tabular-nums">{clp(c.valor)}</span></div><div className="mt-1 h-2.5 rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: `${(c.valor / maxV) * 100}%`, background: C.azul }} /></div></li>)}</ul>
        </section>
        <section aria-labelledby="rs-mov" className="rounded-md bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 id="rs-mov" className="font-display text-xl font-semibold text-slate-900">Movimientos de la semana</h2>
          <GraficoMovimientos datos={movimientosPorDia(e.movimientos)} />
        </section>
      </div>
      <section aria-labelledby="rs-alert" className="mt-6 rounded-md bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 id="rs-alert" className="font-display text-xl font-semibold text-slate-900">Alertas de reposición ({alertas.length})</h2>
        {alertas.length ? <ul className="mt-3 divide-y divide-slate-100">{alertas.map((i) => <li key={i.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-sm"><span>{i.nombre} <span className="text-slate-500">({i.sku})</span></span><span><Insignia i={i} /> <span className="ml-2 tabular-nums text-slate-600">{i.stock} / mín. {i.minimo}</span></span></li>)}</ul> : <p className="mt-3 text-sm text-slate-600">Todo el inventario está sobre su mínimo.</p>}
      </section>
    </Cont>
  );
}

function Insignia({ i }: { i: Item }) {
  const s = estadoStock(i);
  const est = s === "ok" ? "bg-green-100 text-green-800" : s === "bajo" ? "bg-amber-100 text-amber-900" : "bg-red-100 text-red-800";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${est}`}>{s === "ok" ? "En stock" : s === "bajo" ? "Bajo mínimo" : "Sin stock"}</span>;
}

function Inventario() {
  const { e, mover, agregar, quitar } = useInventario();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<"" | Categoria>("");
  const [alertas, setAlertas] = useState(false);
  const [mov, setMov] = useState({ sku: "", tipo: "entrada" as TipoMov, cantidad: 0 });
  const [msjMov, setMsjMov] = useState<{ ok: boolean; texto: string } | null>(null);
  const [n, setN] = useState({ nombre: "", categoria: "Abarrotes" as Categoria, stock: 0, minimo: 0, costo: 0, ubicacion: "Z-01" });
  const [err, setErr] = useState<Record<string, string>>({});
  const lista = filtrarItems(e.items, q, cat, alertas);
  const registrar = (ev: FormEvent) => {
    ev.preventDefault();
    const r = mover(mov.sku, mov.tipo, mov.cantidad);
    setMsjMov(r ? { ok: false, texto: r } : { ok: true, texto: `Movimiento registrado: ${mov.tipo} de ${mov.cantidad} unidades.` });
    if (!r) setMov({ ...mov, cantidad: 0 });
  };
  const alta = (ev: FormEvent) => {
    ev.preventDefault();
    const x = validarItem(n);
    setErr(x);
    if (Object.keys(x).length) return;
    agregar(n);
    setN({ ...n, nombre: "", stock: 0, minimo: 0, costo: 0 });
  };
  const num = (k: "stock" | "minimo" | "costo") => (ev: React.ChangeEvent<HTMLInputElement>) => setN({ ...n, [k]: Number(ev.target.value) });
  return (
    <Cont>
      <h1 className="font-display text-4xl font-semibold text-slate-900">Inventario</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-[2fr_1fr_auto] sm:items-end">
        <label className="text-sm font-medium text-slate-700">Buscar por nombre o SKU<input className={`${campo} mt-1`} value={q} onChange={(ev) => setQ(ev.target.value)} /></label>
        <label className="text-sm font-medium text-slate-700">Categoría<select className={`${campo} mt-1`} value={cat} onChange={(ev) => setCat(ev.target.value as "" | Categoria)}><option value="">Todas</option>{CATEGORIAS.map((c) => <option key={c}>{c}</option>)}</select></label>
        <label className="flex items-center gap-2 pb-2.5 text-sm font-medium text-slate-700"><input type="checkbox" checked={alertas} onChange={(ev) => setAlertas(ev.target.checked)} />Solo con alerta</label>
      </div>
      <p className="mt-4 text-sm text-slate-600" role="status">{lista.length === 1 ? "1 producto" : `${lista.length} productos`}</p>
      <div className="relative mt-2 overflow-x-auto rounded-md bg-white shadow-sm ring-1 ring-slate-200">
        <table className="w-full min-w-[720px] text-left text-sm">
          <caption className="sr-only">Inventario de productos</caption>
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="p-3">SKU</th><th className="p-3">Producto</th><th className="p-3">Categoría</th><th className="p-3 text-right">Stock</th><th className="p-3 text-right">Mínimo</th><th className="p-3 text-right">Valor</th><th className="p-3">Estado</th><th className="p-3"><span className="sr-only">Acciones</span></th></tr></thead>
          <tbody className="divide-y divide-slate-100">{lista.map((i) => (
            <tr key={i.id}><td className="p-3 font-mono text-xs">{i.sku}</td><td className="p-3 font-medium text-slate-900">{i.nombre}<span className="block text-xs font-normal text-slate-500">Ubicación {i.ubicacion}</span></td><td className="p-3">{i.categoria}</td>
              <td className="p-3 text-right tabular-nums">{i.stock}</td><td className="p-3 text-right tabular-nums">{i.minimo}</td><td className="p-3 text-right tabular-nums">{clp(valorItem(i))}</td><td className="p-3"><Insignia i={i} /></td>
              <td className="p-3 text-right"><button type="button" className="font-semibold text-red-700 underline" onClick={() => quitar(i.id)} aria-label={`Eliminar ${i.nombre}`}>Eliminar</button></td></tr>))}</tbody>
        </table>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <form onSubmit={registrar} noValidate aria-label="Registrar movimiento" className="space-y-3 rounded-md bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="font-display text-xl font-semibold text-slate-900">Registrar movimiento</h2>
          <label className="block text-sm font-medium text-slate-700">Producto<select className={`${campo} mt-1`} value={mov.sku} onChange={(ev) => setMov({ ...mov, sku: ev.target.value })}><option value="">Elige un producto</option>{e.items.map((i) => <option key={i.id} value={i.sku}>{i.nombre} (stock {i.stock})</option>)}</select></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm font-medium text-slate-700">Tipo<select className={`${campo} mt-1`} value={mov.tipo} onChange={(ev) => setMov({ ...mov, tipo: ev.target.value as TipoMov })}><option value="entrada">Entrada</option><option value="salida">Salida</option></select></label>
            <label className="block text-sm font-medium text-slate-700">Cantidad<input type="number" className={`${campo} mt-1`} value={mov.cantidad || ""} onChange={(ev) => setMov({ ...mov, cantidad: Number(ev.target.value) })} /></label>
          </div>
          <button className="rounded-md px-5 py-2.5 text-sm font-semibold text-white" style={{ background: C.azul }}>Registrar</button>
          {msjMov && <p role={msjMov.ok ? "status" : "alert"} className={`text-sm ${msjMov.ok ? "text-green-800" : "text-red-700"}`}>{msjMov.texto}</p>}
        </form>
        <form onSubmit={alta} noValidate aria-label="Nuevo producto" className="space-y-3 rounded-md bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="font-display text-xl font-semibold text-slate-900">Nuevo producto</h2>
          <div><label htmlFor="rs-nombre" className="text-sm font-medium text-slate-700">Nombre</label><input id="rs-nombre" className={campo} value={n.nombre} onChange={(ev) => setN({ ...n, nombre: ev.target.value })} aria-invalid={!!err.nombre} />{err.nombre && <p className="mt-1 text-sm text-red-700">{err.nombre}</p>}</div>
          <label className="block text-sm font-medium text-slate-700">Categoría<select className={`${campo} mt-1`} value={n.categoria} onChange={(ev) => setN({ ...n, categoria: ev.target.value as Categoria })}>{CATEGORIAS.map((c) => <option key={c}>{c}</option>)}</select></label>
          <div className="grid grid-cols-3 gap-3">
            <div><label htmlFor="rs-stock" className="text-sm font-medium text-slate-700">Stock</label><input id="rs-stock" type="number" className={campo} value={n.stock} onChange={num("stock")} aria-invalid={!!err.stock} />{err.stock && <p className="mt-1 text-xs text-red-700">{err.stock}</p>}</div>
            <div><label htmlFor="rs-min" className="text-sm font-medium text-slate-700">Mínimo</label><input id="rs-min" type="number" className={campo} value={n.minimo} onChange={num("minimo")} aria-invalid={!!err.minimo} />{err.minimo && <p className="mt-1 text-xs text-red-700">{err.minimo}</p>}</div>
            <div><label htmlFor="rs-costo" className="text-sm font-medium text-slate-700">Costo</label><input id="rs-costo" type="number" className={campo} value={n.costo || ""} onChange={num("costo")} aria-invalid={!!err.costo} />{err.costo && <p className="mt-1 text-xs text-red-700">{err.costo}</p>}</div>
          </div>
          <button className="rounded-md px-5 py-2.5 text-sm font-semibold text-white" style={{ background: C.azul }}>Agregar producto</button>
        </form>
      </div>
    </Cont>
  );
}

function Reportes() {
  const { e } = useInventario();
  const cat = porCategoria(e.items);
  const csv = aCSV(e.items);
  const total = cat.reduce((a, c) => a + c.valor, 0);
  const bajar = () => {
    const url = URL.createObjectURL(new Blob([`﻿${csv}`], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "inventario-demostracion.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <Cont>
      <h1 className="font-display text-4xl font-semibold text-slate-900">Reportes</h1>
      <section aria-labelledby="rs-r1" className="mt-8">
        <h2 id="rs-r1" className="font-display text-2xl font-semibold text-slate-900">Valor del inventario por categoría</h2>
        <div className="relative mt-4 overflow-x-auto rounded-md bg-white shadow-sm ring-1 ring-slate-200"><table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="p-3">Categoría</th><th className="p-3 text-right">Unidades</th><th className="p-3 text-right">Valor</th><th className="p-3 text-right">% del total</th></tr></thead>
          <tbody className="divide-y divide-slate-100">{cat.map((c) => <tr key={c.categoria}><td className="p-3">{c.categoria}</td><td className="p-3 text-right tabular-nums">{c.unidades}</td><td className="p-3 text-right tabular-nums">{clp(c.valor)}</td><td className="p-3 text-right tabular-nums">{total ? Math.round((c.valor / total) * 100) : 0}%</td></tr>)}</tbody>
          <tfoot><tr className="bg-slate-50 font-semibold"><td className="p-3">Total</td><td className="p-3 text-right tabular-nums">{cat.reduce((a, c) => a + c.unidades, 0)}</td><td className="p-3 text-right tabular-nums">{clp(total)}</td><td className="p-3 text-right">100%</td></tr></tfoot>
        </table></div>
      </section>
      <section aria-labelledby="rs-r2" className="mt-10">
        <h2 id="rs-r2" className="font-display text-2xl font-semibold text-slate-900">Exportar inventario</h2>
        <p className="mt-2 text-sm text-slate-600">El archivo se genera en tu navegador; no se envía a ningún servidor.</p>
        <button type="button" onClick={bajar} className="mt-4 rounded-md px-5 py-2.5 text-sm font-semibold text-white" style={{ background: C.azul }}>Descargar CSV</button>
        <pre className="mt-4 max-h-56 overflow-auto rounded-md bg-slate-900 p-4 text-xs text-slate-100" aria-label="Vista previa del CSV">{csv}</pre>
      </section>
    </Cont>
  );
}

export default function RutaStock() {
  return (
    <ProveedorInventario>
      <div className="bg-slate-50 text-slate-800">
        <ScrollArriba />
        <Cabecera />
        <main className="min-h-[60vh]">
          <Routes>
            <Route index element={<Inicio />} />
            <Route path="panel" element={<Panel />} />
            <Route path="inventario" element={<Inventario />} />
            <Route path="reportes" element={<Reportes />} />
            <Route path="*" element={<Cont className="text-center"><h1 className="font-display text-3xl font-semibold">Página no encontrada</h1><div className="mt-6"><Boton to={BASE}>Volver al inicio</Boton></div></Cont>} />
          </Routes>
        </main>
        <footer style={{ background: C.azul }} className="text-white/75"><div className="mx-auto max-w-6xl px-4 py-9 text-sm"><p className="font-display text-lg text-white">RutaStock</p><p className="mt-5 text-xs text-white/80">RutaStock es una empresa ficticia creada para una demostración de SYNEXA. Productos, cifras y personas son inventados y los datos se guardan solo en tu navegador. Fotografías generadas con IA.</p></div></footer>
      </div>
    </ProveedorInventario>
  );
}

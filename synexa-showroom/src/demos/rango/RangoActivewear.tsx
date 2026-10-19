import { useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IsotipoMarca } from "@/componentes/IsotipoMarca";
import { marcaPorId } from "@/datos/marcas";
import { rutaAsset } from "@/utilidades/assets";
import { MenuMovil, ScrollArriba } from "../compartido/utiles";
import { TiendaProvider, useTienda } from "../compartido/TiendaProvider";
import { CarritoVista, CheckoutVista, ListaPedidos, Resumen, clp, type Tema } from "../compartido/TiendaUI";
import { ETIQUETA_ESTADO, resumenVentas, topProductos, ventasPorDia, type Cupon, type Pedido } from "../compartido/tienda";

export const BASE = "/demos/rango";
export const CLAVE = "synexa:rango:tienda";
const marca = marcaPorId("rango")!;
const C = { negro: "#0d0d0d", naranja: "#ff6a1a", blanco: "#fff" };
const TEMA: Tema = { acento: C.naranja, acentoTexto: "#1a0a00", panel: "#171717", borde: "rgba(255,255,255,.16)", texto: "#fff", suave: "rgba(255,255,255,.09)" };
const ENVIO = { gratisDesde: 60000, costo: 4990 };
export const CUPONES: Cupon[] = [
  { codigo: "RANGO10", tipo: "pct", valor: 10, descripcion: "10 % de descuento" },
  { codigo: "VUELVE5000", tipo: "monto", valor: 5000, minimo: 30000, descripcion: "$5.000 de descuento en compras desde $30.000" },
];

type CategoriaId = "ropa" | "calzado" | "accesorios";
const CATEGORIAS: { id: CategoriaId; nombre: string }[] = [{ id: "ropa", nombre: "Ropa" }, { id: "calzado", nombre: "Calzado" }, { id: "accesorios", nombre: "Accesorios" }];
const TALLAS_ROPA = ["XS", "S", "M", "L", "XL"], TALLAS_CALZADO = ["39", "40", "41", "42", "43"], TALLAS_SOCKS = ["S/M", "L/XL"];
const img = (n: number) => `assets/rango/producto-${String(n).padStart(2, "0")}.webp`;
const COLORES: Record<string, string> = { Negro: "#111", Naranja: "#ff6a1a", Gris: "#8a8a8a", Blanco: "#f2f2f2" };

interface Producto { id: string; nombre: string; categoria: CategoriaId; precio: number; imagen: string; descripcion: string; tallas: string[]; colores: string[] }
export const PRODUCTOS: Producto[] = [
  { id: "polera", nombre: "Polera técnica Pace", categoria: "ropa", precio: 24900, imagen: img(1), descripcion: "Tela liviana que evacúa la humedad y costuras planas para no rozar.", tallas: TALLAS_ROPA, colores: ["Negro", "Gris"] },
  { id: "short", nombre: "Short de running Sprint", categoria: "ropa", precio: 22900, imagen: img(2), descripcion: "Short ligero con bolsillo interior y paneles de ventilación.", tallas: TALLAS_ROPA, colores: ["Naranja", "Negro"] },
  { id: "calza", nombre: "Calza de compresión Flex", categoria: "ropa", precio: 34900, imagen: img(3), descripcion: "Compresión media y cintura alta que no se enrolla.", tallas: TALLAS_ROPA, colores: ["Negro"] },
  { id: "poleron", nombre: "Polerón con capucha Core", categoria: "ropa", precio: 44900, imagen: img(4), descripcion: "Polerón de interior suave para antes y después de entrenar.", tallas: TALLAS_ROPA, colores: ["Gris", "Negro"] },
  { id: "top", nombre: "Top deportivo Impact", categoria: "ropa", precio: 26900, imagen: img(5), descripcion: "Sujeción alta para entrenamientos de impacto.", tallas: ["XS", "S", "M", "L"], colores: ["Negro", "Naranja"] },
  { id: "cortaviento", nombre: "Cortaviento Storm", categoria: "ropa", precio: 54900, imagen: img(6), descripcion: "Chaqueta liviana, repelente al agua y plegable en su propio bolsillo.", tallas: TALLAS_ROPA, colores: ["Naranja", "Negro"] },
  { id: "zapatilla-run", nombre: "Zapatilla Run Cloud", categoria: "calzado", precio: 69900, imagen: img(7), descripcion: "Amortiguación suave para rodajes largos sobre asfalto.", tallas: TALLAS_CALZADO, colores: ["Blanco"] },
  { id: "zapatilla-train", nombre: "Zapatilla Train Grip", categoria: "calzado", precio: 64900, imagen: img(8), descripcion: "Base estable para levantar pesas y entrenamiento funcional.", tallas: TALLAS_CALZADO, colores: ["Negro"] },
  { id: "bolso", nombre: "Bolso de entrenamiento 40 L", categoria: "accesorios", precio: 39900, imagen: img(9), descripcion: "Compartimento para calzado, bolsillo térmico y correa ajustable.", tallas: [], colores: ["Negro"] },
  { id: "gorra", nombre: "Gorra Rango Cap", categoria: "accesorios", precio: 14900, imagen: img(10), descripcion: "Gorra liviana con ajuste trasero y banda que absorbe el sudor.", tallas: [], colores: ["Negro"] },
  { id: "botella", nombre: "Botella térmica 750 ml", categoria: "accesorios", precio: 17900, imagen: img(11), descripcion: "Acero inoxidable de doble pared, mantiene el frío por 12 horas.", tallas: [], colores: ["Negro"] },
  { id: "calcetines", nombre: "Calcetines técnicos (par)", categoria: "accesorios", precio: 7900, imagen: img(12), descripcion: "Refuerzo en talón y puntera, tobillo corto.", tallas: TALLAS_SOCKS, colores: ["Negro"] },
];
const productoPorId = (id: string) => PRODUCTOS.find((p) => p.id === id);
const catNombre = (id: CategoriaId) => CATEGORIAS.find((c) => c.id === id)!.nombre;
const BASE_PRODUCTOS = PRODUCTOS.map((p) => ({ id: p.id, nombre: p.nombre, precio: p.precio }));

/** Pedidos de ejemplo para que el panel de ventas tenga datos desde el inicio. Fechas relativas a hoy. */
export function pedidosDeEjemplo(hoy = new Date()): Pedido[] {
  const dia = (n: number, h = 12) => new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - n, h).toISOString();
  const ln = (id: string, cantidad: number, talla?: string, color?: string) => { const p = productoPorId(id)!; return { productoId: id, nombre: p.nombre, cantidad, precio: p.precio, talla, color }; };
  const mk = (n: number, d: number, estado: Pedido["estado"], nombre: string, lineas: ReturnType<typeof ln>[], cupon?: string): Pedido => {
    const subtotal = lineas.reduce((a, l) => a + l.precio * l.cantidad, 0);
    const descuento = cupon === "RANGO10" ? Math.round(subtotal * 0.1) : 0;
    const envio = subtotal - descuento >= ENVIO.gratisDesde ? 0 : ENVIO.costo;
    return { id: `ej${n}`, numero: `RG-${String(n).padStart(4, "0")}`, fecha: dia(d), cliente: { nombre, correo: "cliente@demo.example", direccion: "Dirección ficticia 123" }, lineas, totales: { subtotal, descuento, envio, total: subtotal - descuento + envio }, cupon, estado };
  };
  return [
    mk(8, 0, "pagado", "Paula Reyes", [ln("zapatilla-run", 1, "40", "Blanco"), ln("calcetines", 2, "S/M")]),
    mk(7, 1, "preparando", "Iván Soto", [ln("cortaviento", 1, "L", "Naranja")], "RANGO10"),
    mk(6, 2, "enviado", "Marisol Vera", [ln("calza", 2, "M", "Negro"), ln("top", 1, "M", "Naranja")]),
    mk(5, 3, "entregado", "Joaquín Ríos", [ln("polera", 3, "L", "Gris")]),
    mk(4, 4, "entregado", "Daniela Cruz", [ln("zapatilla-train", 1, "42", "Negro"), ln("botella", 1, undefined, "Negro")]),
    mk(3, 5, "cancelado", "Esteban Lira", [ln("bolso", 1, undefined, "Negro")]),
    mk(2, 6, "entregado", "Ana Pizarro", [ln("short", 2, "S", "Naranja"), ln("gorra", 1, undefined, "Negro")]),
    mk(1, 6, "pendiente", "Cristóbal Mena", [ln("poleron", 1, "XL", "Gris")]),
  ];
}

const Cont = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <div className={`mx-auto max-w-6xl px-4 py-12 ${className}`}>{children}</div>;
const btn = "inline-flex rounded-md px-6 py-3 text-sm font-extrabold uppercase tracking-wider hover:opacity-90";
const estiloBtn = { background: C.naranja, color: "#1a0a00" };

function Cabecera() {
  const t = useTienda();
  const MENU = [["", "Inicio"], ["catalogo", "Tienda"], ["panel", "Panel (demo)"]] as const;
  const est = ({ isActive }: { isActive: boolean }) => `rounded px-3 py-2 text-sm font-bold uppercase tracking-wider ${isActive ? "text-white" : "text-white/80 hover:text-white"}`;
  return (
    <header className="sticky top-11 z-40 border-b border-white/10 text-white" style={{ background: C.negro }}>
      <div className="relative"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link to={BASE} className="flex items-center gap-3" aria-label="Rango Activewear, inicio"><IsotipoMarca marca={marca} size={34} /><span className="text-lg font-extrabold uppercase tracking-[0.2em]">Rango</span></Link>
        <nav aria-label="Principal" className="hidden md:flex">{MENU.map(([r, tx]) => <NavLink key={r} to={r ? `${BASE}/${r}` : BASE} end={r === ""} className={est}>{tx}</NavLink>)}</nav>
        <div className="flex items-center gap-1">
          <Link to={`${BASE}/carrito`} className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-bold ring-1 ring-inset ring-white/25 hover:bg-white/10" aria-label={`Carrito, ${t.unidades} ${t.unidades === 1 ? "producto" : "productos"}`}>Carrito <span className="grid h-5 min-w-5 place-items-center rounded-full px-1 text-xs text-[#1a0a00]" style={{ background: C.naranja }}>{t.unidades}</span></Link>
          <MenuMovil id="rg-menu"><ul style={{ background: C.negro }}>{MENU.map(([r, tx]) => <li key={r}><NavLink to={r ? `${BASE}/${r}` : BASE} end={r === ""} className="block rounded px-3 py-3 text-white">{tx}</NavLink></li>)}</ul></MenuMovil>
        </div>
      </div></div>
    </header>
  );
}

function Tarjeta({ p }: { p: Producto }) {
  return (
    <article className="overflow-hidden rounded-xl bg-[#171717] ring-1 ring-white/10 transition-colors hover:ring-[#ff6a1a]/60">
      <Link to={`${BASE}/producto/${p.id}`} tabIndex={-1} aria-hidden="true"><img src={rutaAsset(p.imagen)} alt="" loading="lazy" className="aspect-square w-full object-cover" /></Link>
      <div className="p-4">
        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: C.naranja }}>{catNombre(p.categoria)}</p>
        <h3 className="mt-1 font-bold leading-snug"><Link to={`${BASE}/producto/${p.id}`} className="hover:text-[#ff6a1a]">{p.nombre}</Link></h3>
        <p className="mt-2 font-extrabold tabular-nums">{clp(p.precio)}</p>
        <div className="mt-2 flex gap-1.5" aria-label={`Colores: ${p.colores.join(", ")}`}>{p.colores.map((c) => <span key={c} title={c} className="h-4 w-4 rounded-full ring-1 ring-white/40" style={{ background: COLORES[c] }} />)}</div>
      </div>
    </article>
  );
}

function Inicio() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={rutaAsset("assets/rango/hero.webp")} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-28 sm:py-36">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: C.naranja }}>Ropa y accesorios deportivos</p>
          <h1 className="mt-4 max-w-xl text-5xl font-extrabold uppercase leading-[1.02] sm:text-6xl">Entrena sin excusas.</h1>
          <p className="mt-5 max-w-lg text-lg text-white/80">Prendas técnicas y calzado para cada rutina. Elige talla y color, y usa el cupón <strong>RANGO10</strong> en tu primera compra.</p>
          <div className="mt-8"><Link to={`${BASE}/catalogo`} className={btn} style={estiloBtn}>Comprar ahora</Link></div>
        </div>
      </section>
      <Cont className="text-white">
        <h2 className="text-2xl font-extrabold uppercase">Categorías</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">{CATEGORIAS.map((c) => <li key={c.id}><Link to={`${BASE}/catalogo?cat=${c.id}`} className="block rounded-xl bg-[#171717] p-6 text-center font-bold uppercase tracking-wider ring-1 ring-white/10 hover:ring-[#ff6a1a]">{c.nombre}</Link></li>)}</ul>
        <h2 className="mt-14 text-2xl font-extrabold uppercase">Lo más pedido</h2>
        <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">{["zapatilla-run", "cortaviento", "calza", "polera"].map((id) => <Tarjeta key={id} p={productoPorId(id)!} />)}</div>
        <p className="mt-4 text-xs text-white/80">Precios de demostración. Envío gratis desde {clp(ENVIO.gratisDesde)}.</p>
      </Cont>
    </>
  );
}

function Catalogo() {
  const [params, setParams] = useSearchParams();
  const cat = params.get("cat") ?? "", talla = params.get("talla") ?? "", color = params.get("color") ?? "";
  const maximo = Math.max(...PRODUCTOS.map((p) => p.precio));
  const precio = params.get("precio") ? Number(params.get("precio")) : maximo;
  const poner = (k: string, v: string) => { const n = new URLSearchParams(params); if (v) n.set(k, v); else n.delete(k); setParams(n, { replace: true }); };
  const todasTallas = [...new Set(PRODUCTOS.flatMap((p) => p.tallas))];
  const lista = PRODUCTOS.filter((p) => (!cat || p.categoria === cat) && (!talla || p.tallas.includes(talla)) && (!color || p.colores.includes(color)) && p.precio <= precio);
  const hay = cat || talla || color || precio < maximo;
  return (
    <Cont className="text-white">
      <h1 className="text-3xl font-extrabold uppercase">Tienda</h1>
      <form aria-label="Filtros" onSubmit={(e) => e.preventDefault()} className="mt-6 grid gap-4 rounded-xl bg-[#171717] p-5 ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {([["cat", "Categoría", cat, CATEGORIAS.map((c) => [c.id, c.nombre])], ["talla", "Talla", talla, todasTallas.map((t) => [t, t])], ["color", "Color", color, Object.keys(COLORES).map((c) => [c, c])]] as const).map(([k, et, val, ops]) => (
          <div key={k}><label htmlFor={`rg-${k}`} className="mb-1.5 block text-xs font-bold uppercase tracking-wider">{et}</label><select id={`rg-${k}`} value={val} onChange={(e) => poner(k, e.target.value)} className="w-full rounded-md border border-white/20 bg-[#0d0d0d] px-3 py-2.5 text-sm">{[["", "Todas"], ...ops].map(([v, t]) => <option key={v} value={v}>{t}</option>)}</select></div>
        ))}
        <div><label htmlFor="rg-precio" className="mb-1.5 block text-xs font-bold uppercase tracking-wider">Precio máximo</label><input id="rg-precio" type="range" min={5000} max={maximo} step={1000} value={precio} onChange={(e) => poner("precio", Number(e.target.value) >= maximo ? "" : e.target.value)} className="w-full accent-[#ff6a1a]" /><p className="text-xs text-white/65" aria-live="polite">Hasta {clp(precio)}</p></div>
      </form>
      <div className="mt-4 flex items-center justify-between"><p className="text-sm text-white/70" role="status" aria-live="polite">{lista.length} {lista.length === 1 ? "producto" : "productos"}</p>{hay && <button type="button" onClick={() => setParams({}, { replace: true })} className="text-sm font-bold underline" style={{ color: C.naranja }}>Quitar filtros</button>}</div>
      {lista.length ? <div className="mt-4 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">{lista.map((p) => <Tarjeta key={p.id} p={p} />)}</div> : <div className="mt-4 rounded-xl border border-dashed border-white/25 p-12 text-center"><p className="font-semibold">Ningún producto cumple esos filtros.</p></div>}
    </Cont>
  );
}

function Ficha() {
  const { id = "" } = useParams();
  const t = useTienda();
  const p = productoPorId(id);
  const [talla, setTalla] = useState("");
  const [color, setColor] = useState(p?.colores[0] ?? "");
  const [cant, setCant] = useState(1);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);
  if (!p) return <Cont className="text-center text-white"><h1 className="text-3xl font-extrabold uppercase">Producto no encontrado</h1><div className="mt-6"><Link to={`${BASE}/catalogo`} className={btn} style={estiloBtn}>Volver a la tienda</Link></div></Cont>;
  return (
    <Cont className="text-white">
      <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-white/80"><Link to={`${BASE}/catalogo`} className="hover:text-white">← Tienda</Link> / {catNombre(p.categoria)}</nav>
      <div className="grid gap-10 md:grid-cols-2">
        <img src={rutaAsset(p.imagen)} alt={p.nombre} className="aspect-square w-full rounded-2xl object-cover ring-1 ring-white/10" />
        <div>
          <h1 className="text-3xl font-extrabold uppercase leading-tight">{p.nombre}</h1>
          <p className="mt-3 text-3xl font-extrabold tabular-nums">{clp(p.precio)}</p>
          <p className="mt-4 text-white/75">{p.descripcion}</p>
          {p.colores.length > 1 && <fieldset className="mt-6"><legend className="mb-2 text-sm font-bold uppercase tracking-wider">Color: <span className="font-normal normal-case text-white/70">{color}</span></legend><div className="flex gap-3">{p.colores.map((c) => <label key={c} className="cursor-pointer"><input type="radio" name="color" value={c} checked={color === c} onChange={() => setColor(c)} className="peer sr-only" /><span className="block h-9 w-9 rounded-full ring-2 ring-white/25 peer-checked:ring-[#ff6a1a] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-white" style={{ background: COLORES[c] }}><span className="sr-only">{c}</span></span></label>)}</div></fieldset>}
          {p.tallas.length > 0 && <fieldset className="mt-6"><legend className="mb-2 text-sm font-bold uppercase tracking-wider">Talla</legend><div className="flex flex-wrap gap-2">{p.tallas.map((s) => <label key={s} className="cursor-pointer"><input type="radio" name="talla" value={s} checked={talla === s} onChange={() => { setTalla(s); setError(""); }} className="peer sr-only" /><span className="block min-w-12 rounded-md px-3 py-2 text-center text-sm font-bold ring-1 ring-white/25 peer-checked:bg-[#ff6a1a] peer-checked:text-[#1a0a00] peer-checked:ring-[#ff6a1a] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-white">{s}</span></label>)}</div></fieldset>}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center rounded-md ring-1 ring-white/25"><button type="button" onClick={() => setCant((c) => Math.max(1, c - 1))} className="px-4 py-2.5 text-lg leading-none" aria-label="Disminuir cantidad">−</button><span className="min-w-8 text-center tabular-nums" aria-label="Cantidad">{cant}</span><button type="button" onClick={() => setCant((c) => Math.min(10, c + 1))} className="px-4 py-2.5 text-lg leading-none" aria-label="Aumentar cantidad">+</button></div>
            <button type="button" onClick={() => { if (p.tallas.length && !talla) return setError("Elige una talla para continuar."); t.agregar(p.id, cant, talla || undefined, color); setOk(true); setError(""); }} className={btn} style={estiloBtn}>Agregar al carrito</button>
          </div>
          {error && <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
          {ok && <p role="status" className="mt-4 rounded-lg bg-white/10 p-3 text-sm">Agregado al carrito. <Link to={`${BASE}/carrito`} className="font-bold underline">Ver carrito</Link></p>}
          <p className="mt-6 text-xs text-white/80">Compra de demostración: no se cobra nada.</p>
        </div>
      </div>
    </Cont>
  );
}

function Carrito() {
  return <Cont className="text-white"><h1 className="text-3xl font-extrabold uppercase">Tu carrito</h1><div className="mt-8"><CarritoVista base={BASE} tema={TEMA} imagenDe={(id) => productoPorId(id)!.imagen} cupones={CUPONES} envioGratisDesde={ENVIO.gratisDesde} /></div></Cont>;
}
function Checkout() {
  const nav = useNavigate();
  return <Cont className="text-white"><h1 className="text-3xl font-extrabold uppercase">Pago</h1><div className="mt-8"><CheckoutVista base={BASE} tema={TEMA} onCreado={(n) => nav(`${BASE}/confirmacion/${n}`)} /></div></Cont>;
}
function Confirmacion() {
  const { numero } = useParams();
  const t = useTienda();
  const p = t.pedidos.find((x) => x.numero === numero);
  if (!p) return <Cont className="text-center text-white"><h1 className="text-3xl font-extrabold uppercase">Pedido no encontrado</h1><div className="mt-6"><Link to={`${BASE}/catalogo`} className={btn} style={estiloBtn}>Volver a la tienda</Link></div></Cont>;
  return (
    <Cont className="max-w-2xl text-white">
      <div role="status" className="rounded-2xl bg-[#171717] p-8 ring-1 ring-white/15">
        <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: C.naranja }}>Compra de demostración</p>
        <h1 className="mt-2 text-3xl font-extrabold uppercase">¡Gracias, {p.cliente.nombre.split(" ")[0]}!</h1>
        <p className="mt-2">Pedido <strong>{p.numero}</strong> · {ETIQUETA_ESTADO[p.estado]}</p>
        <ul className="mt-5 divide-y divide-white/10 text-sm">{p.lineas.map((l, i) => <li key={i} className="flex justify-between gap-3 py-2"><span>{l.cantidad} × {l.nombre}{l.talla ? ` · ${l.talla}` : ""}{l.color ? ` · ${l.color}` : ""}</span><span className="tabular-nums">{clp(l.precio * l.cantidad)}</span></li>)}</ul>
        <div className="mt-4"><Resumen totales={p.totales} tema={TEMA} /></div>
        <p className="mt-5 rounded-lg bg-black/30 p-3 text-sm text-white/70">Es una simulación: no se cobró nada. Míralo en el <Link to={`${BASE}/panel`} className="font-bold underline">panel</Link>.</p>
        <div className="mt-6"><Link to={`${BASE}/catalogo`} className={btn} style={estiloBtn}>Seguir comprando</Link></div>
      </div>
    </Cont>
  );
}

function Panel() {
  const t = useTienda();
  const r = resumenVentas(t.pedidos);
  const dias = ventasPorDia(t.pedidos, new Date(), 7);
  const maxDia = Math.max(...dias.map((d) => d.ingresos), 1);
  const top = topProductos(t.pedidos, 5);
  const maxTop = Math.max(...top.map((x) => x.unidades), 1);
  const nombreDia = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("es-CL", { weekday: "short" });
  const Kpi = ({ k, v }: { k: string; v: string }) => <div className="rounded-xl bg-[#171717] p-5 ring-1 ring-white/10"><dt className="text-xs font-bold uppercase tracking-wider text-white/80">{k}</dt><dd className="mt-2 text-2xl font-extrabold tabular-nums">{v}</dd></div>;
  return (
    <Cont className="text-white">
      <div className="rounded-md bg-[#2b2400] p-3 text-sm text-[#f3d77a]" role="note"><strong>Panel de demostración.</strong> Los pedidos de ejemplo se mezclan con las compras que hagas aquí. Todo vive solo en este navegador; «Reiniciar demo» lo restablece.</div>
      <h1 className="mt-8 text-3xl font-extrabold uppercase">Panel de ventas</h1>
      <dl className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4"><Kpi k="Ingresos" v={clp(r.ingresos)} /><Kpi k="Pedidos pagados" v={String(r.pedidos)} /><Kpi k="Unidades" v={String(r.unidades)} /><Kpi k="Ticket medio" v={clp(r.ticketMedio)} /></dl>
      <p className="mt-2 text-xs text-white/80">Cuentan los pedidos pagados o posteriores; se excluyen los pendientes y cancelados.</p>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section aria-labelledby="rg-dias" className="rounded-xl bg-[#171717] p-6 ring-1 ring-white/10"><h2 id="rg-dias" className="text-lg font-extrabold uppercase">Ingresos, últimos 7 días</h2>
          <ol className="mt-6 flex h-48 items-end gap-2" aria-label="Ingresos por día">{dias.map((d) => <li key={d.dia} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5"><span className="text-[10px] tabular-nums text-white/80">{d.ingresos ? `${Math.round(d.ingresos / 1000)}k` : ""}</span><div className="w-full rounded-t" style={{ height: `${Math.max(2, (d.ingresos / maxDia) * 100)}%`, background: d.ingresos ? C.naranja : "rgba(255,255,255,.12)" }} role="img" aria-label={`${nombreDia(d.dia)}: ${clp(d.ingresos)}`} /><span className="text-[11px] capitalize text-white/80">{nombreDia(d.dia)}</span></li>)}</ol>
        </section>
        <section aria-labelledby="rg-top" className="rounded-xl bg-[#171717] p-6 ring-1 ring-white/10"><h2 id="rg-top" className="text-lg font-extrabold uppercase">Más vendidos</h2>
          {top.length ? <ol className="mt-5 space-y-4">{top.map((x) => <li key={x.nombre}><div className="flex justify-between text-sm"><span>{x.nombre}</span><span className="tabular-nums text-white/70">{x.unidades} u.</span></div><div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full" style={{ width: `${(x.unidades / maxTop) * 100}%`, background: C.naranja }} /></div></li>)}</ol> : <p className="mt-4 text-sm text-white/80">Aún no hay ventas pagadas.</p>}
        </section>
      </div>
      <h2 className="mt-12 text-2xl font-extrabold uppercase">Pedidos</h2>
      <div className="mt-5"><ListaPedidos tema={TEMA} ver={(p) => `${BASE}/confirmacion/${p.numero}`} /></div>
    </Cont>
  );
}

export default function RangoActivewear() {
  const ejemplo = useMemo(() => pedidosDeEjemplo(), []);
  return (
    <TiendaProvider config={{ clave: CLAVE, prefijoPedido: "RG", productos: BASE_PRODUCTOS, envio: ENVIO, cupones: CUPONES, pedidosIniciales: ejemplo }}>
      <div style={{ background: C.negro, color: "#fff" }} className="min-h-screen">
        <ScrollArriba />
        <Cabecera />
        <main>
          <Routes>
            <Route index element={<Inicio />} />
            <Route path="catalogo" element={<Catalogo />} />
            <Route path="producto/:id" element={<Ficha />} />
            <Route path="carrito" element={<Carrito />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="confirmacion/:numero" element={<Confirmacion />} />
            <Route path="panel" element={<Panel />} />
            <Route path="*" element={<Cont className="text-center"><h1 className="text-3xl font-extrabold uppercase">Página no encontrada</h1><div className="mt-6"><Link to={BASE} className={btn} style={estiloBtn}>Volver al inicio</Link></div></Cont>} />
          </Routes>
        </main>
        <footer className="border-t border-white/10 bg-black"><div className="mx-auto max-w-6xl px-4 py-9 text-xs text-white/80">Rango Activewear es una marca ficticia creada para una demostración de SYNEXA. Productos, precios, pedidos y clientes son inventados; las compras son simuladas. Fotografías generadas con IA.</div></footer>
      </div>
    </TiendaProvider>
  );
}

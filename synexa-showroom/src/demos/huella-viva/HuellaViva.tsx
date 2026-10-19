import { useState } from "react";
import { Link, NavLink, Route, Routes, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IsotipoMarca } from "@/componentes/IsotipoMarca";
import { marcaPorId } from "@/datos/marcas";
import { rutaAsset } from "@/utilidades/assets";
import { MenuMovil, ScrollArriba } from "../compartido/utiles";
import { TiendaProvider, useTienda } from "../compartido/TiendaProvider";
import { CarritoVista, CheckoutVista, ListaPedidos, Resumen, clp, type Tema } from "../compartido/TiendaUI";
import { ETIQUETA_ESTADO } from "../compartido/tienda";

export const BASE = "/demos/huella-viva";
export const CLAVE = "synexa:huella-viva:tienda";
const marca = marcaPorId("huella-viva")!;
const C = { salvia: "#4d6b57", crema: "#f5efe2", terracota: "#a4552f", terracotaOsc: "#8a4426", tinta: "#2a3a2f" };
const TEMA: Tema = { acento: C.terracota, acentoTexto: "#fff", panel: "#fbf7ee", borde: "#ddd2bd", texto: C.tinta, suave: "#ece4d0" };
const ENVIO = { gratisDesde: 30000, costo: 3990 };

type CategoriaId = "perros" | "gatos" | "alimento" | "accesorios";
const CATEGORIAS: { id: CategoriaId; nombre: string }[] = [{ id: "perros", nombre: "Perros" }, { id: "gatos", nombre: "Gatos" }, { id: "alimento", nombre: "Alimento" }, { id: "accesorios", nombre: "Accesorios" }];
const img = (n: number) => `assets/huella-viva/producto-${String(n).padStart(2, "0")}.webp`;

interface Producto { id: string; nombre: string; categoria: CategoriaId; precio: number; imagen: string; descripcion: string }
export const PRODUCTOS: Producto[] = [
  { id: "alimento-perro", nombre: "Alimento seco para perro 3 kg", categoria: "alimento", precio: 18900, imagen: img(1), descripcion: "Receta con pollo y arroz, sin colorantes artificiales. Bolsa resellable de 3 kg." },
  { id: "alimento-gato", nombre: "Alimento seco para gato 1,5 kg", categoria: "alimento", precio: 12900, imagen: img(2), descripcion: "Croquetas con pescado y vegetales, pensadas para gatos adultos." },
  { id: "latas-gato", nombre: "Pack 6 latas de alimento húmedo", categoria: "alimento", precio: 9900, imagen: img(3), descripcion: "Seis latas de 85 g en tres sabores. Fáciles de abrir." },
  { id: "cuerda", nombre: "Cuerda de algodón para morder", categoria: "perros", precio: 6900, imagen: img(4), descripcion: "Cuerda trenzada de algodón natural, ideal para jugar a tirar y limpiar los dientes." },
  { id: "peluche", nombre: "Peluche resistente con sonido", categoria: "perros", precio: 7900, imagen: img(5), descripcion: "Peluche suave con costuras reforzadas y un chifle interior." },
  { id: "rascador", nombre: "Rascador de sisal con plataforma", categoria: "gatos", precio: 24900, imagen: img(6), descripcion: "Poste de sisal natural con base de madera y una plataforma para descansar." },
  { id: "cama", nombre: "Cama redonda acolchada", categoria: "accesorios", precio: 21900, imagen: img(7), descripcion: "Cama de tela suave con bordes elevados. Funda lavable." },
  { id: "plato", nombre: "Plato de acero inoxidable", categoria: "accesorios", precio: 5900, imagen: img(8), descripcion: "Plato antideslizante, fácil de lavar y apto para lavavajillas." },
  { id: "correa", nombre: "Set de collar y correa", categoria: "perros", precio: 14900, imagen: img(9), descripcion: "Collar ajustable y correa de 1,5 m de tela resistente con herrajes metálicos." },
  { id: "bolso", nombre: "Bolso de transporte", categoria: "accesorios", precio: 29900, imagen: img(10), descripcion: "Bolso ventilado con correa de hombro para mascotas pequeñas." },
  { id: "varita", nombre: "Varita de plumas para gatos", categoria: "gatos", precio: 4900, imagen: img(11), descripcion: "Caña de madera con plumas naturales para jugar a cazar." },
  { id: "tunel", nombre: "Túnel de juego plegable", categoria: "gatos", precio: 11900, imagen: img(12), descripcion: "Túnel acolchado que se pliega para guardarlo. Interior suave." },
];
const productoPorId = (id: string) => PRODUCTOS.find((p) => p.id === id);
const catNombre = (id: CategoriaId) => CATEGORIAS.find((c) => c.id === id)!.nombre;
const BASE_PRODUCTOS = PRODUCTOS.map((p) => ({ id: p.id, nombre: p.nombre, precio: p.precio }));

const Cont = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <div className={`mx-auto max-w-6xl px-4 py-12 ${className}`}>{children}</div>;
const Btn = ({ to, children, claro = false }: { to: string; children: React.ReactNode; claro?: boolean }) => <Link to={to} className="inline-flex rounded-full px-6 py-3 text-sm font-bold hover:opacity-90" style={claro ? { background: C.crema, color: C.tinta } : { background: C.terracota, color: "#fff" }}>{children}</Link>;

function Cabecera() {
  const t = useTienda();
  const MENU = [["", "Inicio"], ["catalogo", "Tienda"], ["pedidos", "Pedidos (demo)"]] as const;
  const est = ({ isActive }: { isActive: boolean }) => `rounded px-3 py-2 text-sm font-semibold ${isActive ? "underline decoration-2 underline-offset-8" : "opacity-80 hover:opacity-100"}`;
  return (
    <header className="sticky top-11 z-40" style={{ background: C.crema, color: C.tinta }}>
      <div className="relative"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link to={BASE} className="flex items-center gap-3" aria-label="Huella Viva, inicio"><IsotipoMarca marca={marca} size={34} /><span className="font-display text-xl font-semibold">Huella Viva</span></Link>
        <nav aria-label="Principal" className="hidden md:flex">{MENU.map(([r, tx]) => <NavLink key={r} to={r ? `${BASE}/${r}` : BASE} end={r === ""} className={est}>{tx}</NavLink>)}</nav>
        <div className="flex items-center gap-1">
          <Link to={`${BASE}/carrito`} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ring-1 ring-inset" style={{ ["--tw-ring-color" as string]: "#bfb39a" }} aria-label={`Carrito, ${t.unidades} ${t.unidades === 1 ? "producto" : "productos"}`}>Carrito <span className="grid h-5 min-w-5 place-items-center rounded-full px-1 text-xs text-white" style={{ background: C.terracota }}>{t.unidades}</span></Link>
          <MenuMovil id="hv-menu"><ul style={{ background: C.crema }}>{MENU.map(([r, tx]) => <li key={r}><NavLink to={r ? `${BASE}/${r}` : BASE} end={r === ""} className="block rounded px-3 py-3">{tx}</NavLink></li>)}</ul></MenuMovil>
        </div>
      </div></div>
    </header>
  );
}

function Tarjeta({ p }: { p: Producto }) {
  const t = useTienda();
  const [ok, setOk] = useState(false);
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/10">
      <Link to={`${BASE}/producto/${p.id}`} tabIndex={-1} aria-hidden="true"><img src={rutaAsset(p.imagen)} alt="" loading="lazy" className="aspect-square w-full object-cover" /></Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-bold uppercase tracking-wide" style={{ color: C.terracotaOsc }}>{catNombre(p.categoria)}</p>
        <h3 className="mt-1 font-semibold leading-snug"><Link to={`${BASE}/producto/${p.id}`} className="hover:underline">{p.nombre}</Link></h3>
        <p className="mt-auto pt-3 font-bold tabular-nums">{clp(p.precio)}</p>
        <button type="button" onClick={() => { t.agregar(p.id); setOk(true); window.setTimeout(() => setOk(false), 1500); }} className="mt-3 rounded-full px-4 py-2.5 text-sm font-bold text-white hover:opacity-90" style={{ background: C.salvia }} aria-label={`Agregar ${p.nombre} al carrito`}>{ok ? "✓ Agregado" : "Agregar al carrito"}</button>
      </div>
    </article>
  );
}

function Inicio() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={rutaAsset("assets/huella-viva/hero.webp")} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1f3326]/85 via-[#1f3326]/50 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-24 sm:py-32">
          <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: "#f0c7a8" }}>Tienda de mascotas</p>
          <h1 className="mt-4 max-w-xl font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">Todo lo que tu mascota necesita, en casa.</h1>
          <p className="mt-5 max-w-lg text-lg text-white/85">Alimento, juguetes y accesorios elegidos con cariño. Compra en línea y recíbelo en la puerta.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Btn to={`${BASE}/catalogo`}>Ver la tienda</Btn><Btn to={`${BASE}/catalogo?cat=alimento`} claro>Alimento</Btn></div>
        </div>
      </section>
      <section style={{ background: "#fbf7ee" }}><Cont>
        <h2 className="font-display text-3xl font-semibold">Compra por categoría</h2>
        <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">{CATEGORIAS.map((c) => <li key={c.id}><Link to={`${BASE}/catalogo?cat=${c.id}`} className="block rounded-2xl bg-white p-6 text-center font-semibold ring-1 ring-black/10 hover:shadow-md">{c.nombre}<span className="mt-1 block text-xs font-normal opacity-75">{PRODUCTOS.filter((p) => p.categoria === c.id).length} productos</span></Link></li>)}</ul>
      </Cont></section>
      <Cont>
        <h2 className="font-display text-3xl font-semibold">Favoritos de la casa</h2>
        <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">{["alimento-perro", "rascador", "cama", "cuerda"].map((id) => <Tarjeta key={id} p={productoPorId(id)!} />)}</div>
        <p className="mt-4 text-xs opacity-75">Precios de demostración. Envío gratis desde {clp(ENVIO.gratisDesde)}.</p>
      </Cont>
      <section style={{ background: C.salvia }} className="text-white"><Cont className="grid items-center gap-8 md:grid-cols-2"><img src={rutaAsset("assets/huella-viva/gato.webp")} alt="Gato durmiendo en una cama junto a la ventana" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover" /><div><h2 className="font-display text-3xl font-semibold">Pensado para su descanso</h2><p className="mt-4 text-white/85">Camas, rascadores y juguetes con materiales naturales para que tu mascota esté cómoda y activa.</p><div className="mt-6"><Btn to={`${BASE}/catalogo?cat=gatos`} claro>Ver productos para gatos</Btn></div></div></Cont></section>
    </>
  );
}

function Catalogo() {
  const [params, setParams] = useSearchParams();
  const cat = params.get("cat") ?? "";
  const lista = PRODUCTOS.filter((p) => !cat || p.categoria === cat);
  return (
    <Cont>
      <h1 className="font-display text-4xl font-semibold">Tienda</h1>
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Categorías">{[{ id: "", nombre: "Todo" }, ...CATEGORIAS].map((c) => <button key={c.id} type="button" aria-pressed={cat === c.id} onClick={() => setParams(c.id ? { cat: c.id } : {}, { replace: true })} className={`rounded-full px-4 py-2 text-sm font-semibold ${cat === c.id ? "text-white" : "bg-[#ece4d0] hover:bg-[#e2d8bf]"}`} style={cat === c.id ? { background: C.salvia } : undefined}>{c.nombre}</button>)}</div>
      <p className="mt-6 text-sm opacity-70" role="status" aria-live="polite">{lista.length} productos</p>
      <div className="mt-4 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">{lista.map((p) => <Tarjeta key={p.id} p={p} />)}</div>
    </Cont>
  );
}

function Ficha() {
  const { id = "" } = useParams();
  const t = useTienda();
  const p = productoPorId(id);
  const [cant, setCant] = useState(1);
  const [ok, setOk] = useState(false);
  if (!p) return <Cont className="text-center"><h1 className="font-display text-3xl font-semibold">Producto no encontrado</h1><div className="mt-6"><Btn to={`${BASE}/catalogo`}>Volver a la tienda</Btn></div></Cont>;
  return (
    <Cont>
      <nav aria-label="Ruta de navegación" className="mb-6 text-sm"><Link to={`${BASE}/catalogo`} className="underline">← Tienda</Link> / {catNombre(p.categoria)}</nav>
      <div className="grid gap-10 md:grid-cols-2">
        <img src={rutaAsset(p.imagen)} alt={p.nombre} className="aspect-square w-full rounded-3xl object-cover ring-1 ring-black/10" />
        <div>
          <h1 className="font-display text-3xl font-semibold">{p.nombre}</h1>
          <p className="mt-3 text-2xl font-bold tabular-nums">{clp(p.precio)}</p>
          <p className="mt-4 leading-relaxed opacity-80">{p.descripcion}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center rounded-full ring-1 ring-black/20"><button type="button" onClick={() => setCant((c) => Math.max(1, c - 1))} className="px-4 py-2 text-lg leading-none" aria-label="Disminuir cantidad">−</button><span className="min-w-8 text-center tabular-nums" aria-label="Cantidad">{cant}</span><button type="button" onClick={() => setCant((c) => Math.min(10, c + 1))} className="px-4 py-2 text-lg leading-none" aria-label="Aumentar cantidad">+</button></div>
            <button type="button" onClick={() => { t.agregar(p.id, cant); setOk(true); }} className="rounded-full px-7 py-3 text-sm font-bold text-white hover:opacity-90" style={{ background: C.terracota }}>Agregar al carrito</button>
          </div>
          {ok && <p role="status" className="mt-4 rounded-lg p-3 text-sm" style={{ background: "#ece4d0" }}>Agregado al carrito. <Link to={`${BASE}/carrito`} className="font-bold underline">Ver carrito</Link></p>}
          <p className="mt-6 text-xs opacity-75">Compra de demostración: no se cobra nada.</p>
        </div>
      </div>
      <section className="mt-16"><h2 className="font-display text-2xl font-semibold">También te puede gustar</h2><div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-4">{PRODUCTOS.filter((x) => x.categoria === p.categoria && x.id !== p.id).concat(PRODUCTOS.filter((x) => x.categoria !== p.categoria)).slice(0, 4).map((x) => <Tarjeta key={x.id} p={x} />)}</div></section>
    </Cont>
  );
}

function Carrito() {
  return <Cont><h1 className="font-display text-4xl font-semibold">Tu carrito</h1><div className="mt-8"><CarritoVista base={BASE} tema={TEMA} imagenDe={(id) => productoPorId(id)!.imagen} envioGratisDesde={ENVIO.gratisDesde} /></div></Cont>;
}

function Checkout() {
  const nav = useNavigate();
  return <Cont><h1 className="font-display text-4xl font-semibold">Pago</h1><div className="mt-8"><CheckoutVista base={BASE} tema={TEMA} onCreado={(n) => nav(`${BASE}/confirmacion/${n}`)} /></div></Cont>;
}

function Confirmacion() {
  const { numero } = useParams();
  const t = useTienda();
  const p = t.pedidos.find((x) => x.numero === numero);
  if (!p) return <Cont className="text-center"><h1 className="font-display text-3xl font-semibold">Pedido no encontrado</h1><div className="mt-6"><Btn to={`${BASE}/catalogo`}>Volver a la tienda</Btn></div></Cont>;
  return (
    <Cont className="max-w-2xl">
      <div role="status" className="rounded-3xl p-8 ring-1 ring-black/10" style={{ background: "#fbf7ee" }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.terracotaOsc }}>Compra de demostración</p>
        <h1 className="mt-2 font-display text-3xl font-semibold">¡Gracias, {p.cliente.nombre.split(" ")[0]}!</h1>
        <p className="mt-2">Tu pedido <strong>{p.numero}</strong> quedó registrado como «{ETIQUETA_ESTADO[p.estado]}».</p>
        <ul className="mt-5 divide-y divide-black/10 text-sm">{p.lineas.map((l, i) => <li key={i} className="flex justify-between gap-3 py-2"><span>{l.cantidad} × {l.nombre}</span><span className="tabular-nums">{clp(l.precio * l.cantidad)}</span></li>)}</ul>
        <div className="mt-4"><Resumen totales={p.totales} tema={TEMA} /></div>
        <p className="mt-5 rounded-lg bg-white p-3 text-sm opacity-80">Es una simulación: no se cobró nada ni se envió ningún pedido. Mira cómo lo vería el equipo en <Link to={`${BASE}/pedidos`} className="font-bold underline">Pedidos</Link>.</p>
        <div className="mt-6"><Btn to={`${BASE}/catalogo`}>Seguir comprando</Btn></div>
      </div>
    </Cont>
  );
}

function Pedidos() {
  return (
    <Cont>
      <div className="rounded-md bg-[#fff6dd] p-3 text-sm text-[#6b5200]" role="note"><strong>Panel de demostración.</strong> Así gestionaría el equipo de Huella Viva los pedidos. Los datos viven solo en este navegador; «Reiniciar demo» los borra.</div>
      <h1 className="mt-8 font-display text-3xl font-semibold">Gestión de pedidos</h1>
      <div className="mt-6"><ListaPedidos tema={TEMA} ver={(p) => `${BASE}/confirmacion/${p.numero}`} /></div>
    </Cont>
  );
}

export default function HuellaViva() {
  return (
    <TiendaProvider config={{ clave: CLAVE, prefijoPedido: "HV", productos: BASE_PRODUCTOS, envio: ENVIO }}>
      <div className="bg-white" style={{ color: C.tinta }}>
        <ScrollArriba />
        <Cabecera />
        <main className="min-h-[60vh]">
          <Routes>
            <Route index element={<Inicio />} />
            <Route path="catalogo" element={<Catalogo />} />
            <Route path="producto/:id" element={<Ficha />} />
            <Route path="carrito" element={<Carrito />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="confirmacion/:numero" element={<Confirmacion />} />
            <Route path="pedidos" element={<Pedidos />} />
            <Route path="*" element={<Cont className="text-center"><h1 className="font-display text-3xl font-semibold">Página no encontrada</h1><div className="mt-6"><Btn to={BASE}>Volver al inicio</Btn></div></Cont>} />
          </Routes>
        </main>
        <footer style={{ background: C.salvia }} className="text-white/80"><div className="mx-auto max-w-6xl px-4 py-9 text-sm"><p className="font-display text-lg text-white">Huella Viva</p><p className="mt-5 text-xs text-white/90">Huella Viva es un negocio ficticio creado para una demostración de SYNEXA. Productos y precios inventados; las compras son simuladas. Fotografías generadas con IA.</p></div></footer>
      </div>
    </TiendaProvider>
  );
}

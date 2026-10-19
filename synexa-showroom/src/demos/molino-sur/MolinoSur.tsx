import { useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import { IsotipoMarca } from "@/componentes/IsotipoMarca";
import { marcaPorId } from "@/datos/marcas";
import { rutaAsset } from "@/utilidades/assets";
import { MenuMovil, ScrollArriba, esCorreo } from "../compartido/utiles";
import { BASE, C, DIAS, GALERIA, HORARIO, NEGOCIO, PRODUCTOS, estadoAhora } from "./datos";

const marca = marcaPorId("molino-sur")!;
const MENU = [["", "Inicio"], ["nosotros", "Nosotros"], ["productos", "Productos"], ["galeria", "Galería"], ["contacto", "Contacto"]] as const;

const Seccion = ({ children, fondo = "transparent", className = "" }: { children: React.ReactNode; fondo?: string; className?: string }) => (
  <section style={{ background: fondo }}><div className={`mx-auto max-w-6xl px-4 py-16 ${className}`}>{children}</div></section>
);
const Titulo = ({ pre, children, h1 = false }: { pre?: string; children: React.ReactNode; h1?: boolean }) => {
  const H = h1 ? "h1" : "h2";
  return <div>{pre && <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: C.terracota }}>{pre}</p>}<H className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{children}</H></div>;
};
const Boton = ({ to, children, claro = false }: { to: string; children: React.ReactNode; claro?: boolean }) => (
  <Link to={to} className="inline-flex rounded-full px-6 py-3 text-sm font-semibold transition-colors" style={claro ? { background: C.crema, color: C.cafe } : { background: C.terracota, color: "#fff" }}>{children}</Link>
);

function Cabecera() {
  const e = estadoAhora();
  const estilo = ({ isActive }: { isActive: boolean }) => `rounded px-3 py-2 text-sm font-medium ${isActive ? "underline decoration-2 underline-offset-8" : "opacity-80 hover:opacity-100"}`;
  return (
    <header className="sticky top-11 z-40" style={{ background: C.crema, color: C.cafe }}>
      <div className="relative">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to={BASE} className="flex items-center gap-3" aria-label="Molino Sur, inicio"><IsotipoMarca marca={marca} size={34} /><span className="font-display text-xl font-semibold">Molino Sur</span></Link>
          <nav aria-label="Principal" className="hidden items-center md:flex">
            {MENU.map(([r, t]) => <NavLink key={r} to={r ? `${BASE}/${r}` : BASE} end={r === ""} className={estilo}>{t}</NavLink>)}
          </nav>
          <p className="hidden text-xs lg:block" aria-live="polite"><span className={`mr-1.5 inline-block h-2 w-2 rounded-full ${e.abierto ? "bg-green-600" : "bg-red-600"}`} aria-hidden="true" />{e.texto}</p>
          <MenuMovil id="ms-menu">
            <ul>{MENU.map(([r, t]) => <li key={r}><NavLink to={r ? `${BASE}/${r}` : BASE} end={r === ""} className="block rounded px-3 py-3">{t}</NavLink></li>)}</ul>
          </MenuMovil>
        </div>
      </div>
    </header>
  );
}

function Inicio() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={rutaAsset("assets/molino-sur/hero.webp")} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#2a1d15]/85 via-[#2a1d15]/50 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-24 sm:py-32 lg:py-40">
          <p className="text-sm font-semibold uppercase tracking-[0.25em]" style={{ color: "#f0b48f" }}>Panadería y cafetería artesanal</p>
          <h1 className="mt-4 max-w-xl font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">Pan de verdad, horneado cada madrugada.</h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/85">Masa madre, mantequilla y café de especialidad en el corazón del Barrio Sur.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Boton to={`${BASE}/productos`}>Ver nuestros productos</Boton><Boton to={`${BASE}/contacto`} claro>Cómo llegar</Boton></div>
        </div>
      </section>
      <Seccion fondo={C.suave}>
        <Titulo pre="Destacados">Lo que no puede faltar en tu mesa</Titulo>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTOS.map((p) => (
            <li key={p.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
              <img src={rutaAsset(p.imagen)} alt={p.alt} loading="lazy" className="aspect-square w-full object-cover" />
              <div className="p-5"><h3 className="font-semibold">{p.nombre}</h3><p className="mt-1 text-sm opacity-70">{p.texto}</p><p className="mt-3 text-sm font-semibold" style={{ color: C.terracotaOsc }}>{p.precio}</p></div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs opacity-75">Precios de demostración.</p>
      </Seccion>
      <Seccion>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <img src={rutaAsset("assets/molino-sur/cafeteria.webp")} alt="Mujer tomando café junto a la ventana" loading="lazy" className="aspect-[4/5] w-full rounded-3xl object-cover" />
          <div><Titulo pre="Nuestra casa">Un lugar para quedarse</Titulo><p className="mt-5 leading-relaxed opacity-80">Molino Sur nació como un horno de barrio y hoy es cafetería, panadería y punto de encuentro. Las mesas junto a la ventana son las preferidas de quienes vienen a leer, trabajar o conversar sin apuro.</p><div className="mt-7"><Boton to={`${BASE}/nosotros`}>Conoce nuestra historia</Boton></div></div>
        </div>
      </Seccion>
    </>
  );
}

function Nosotros() {
  return (
    <>
      <Seccion fondo={C.suave}><Titulo h1 pre="Nosotros">Hacemos pan como lo hacían en casa</Titulo><p className="mt-5 max-w-2xl leading-relaxed opacity-80">Empezamos en 2016 con un horno de leña y una receta de masa madre heredada. Nuestro equipo hornea de madrugada para que cada mañana encuentres pan fresco.</p></Seccion>
      <Seccion>
        <div className="grid gap-10 lg:grid-cols-3">
          {[["Ingredientes simples", "Harina, agua, sal y tiempo. Sin aditivos ni mejoradores."], ["Producción pequeña", "Horneamos en tandas cortas para que nada espere en la vitrina."], ["Hecho en el barrio", "Compramos a productores locales de harina, lácteos y café."]].map(([t, d]) => (
            <div key={t}><h3 className="font-display text-xl font-semibold">{t}</h3><p className="mt-2 opacity-75">{d}</p></div>
          ))}
        </div>
        <img src={rutaAsset("assets/molino-sur/banner.webp")} alt="Interior de la panadería con mostrador de pasteles" loading="lazy" className="mt-14 aspect-[21/9] w-full rounded-3xl object-cover" />
      </Seccion>
    </>
  );
}

function Productos() {
  return (
    <Seccion>
      <Titulo h1 pre="Carta">Productos</Titulo>
      <p className="mt-3 text-sm opacity-75">Precios de demostración. Este sitio no vende en línea.</p>
      <ul className="mt-10 space-y-6">
        {PRODUCTOS.map((p, i) => (
          <li key={p.id} className={`grid items-center gap-6 overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 md:grid-cols-2 ${i % 2 ? "md:[&>img]:order-2" : ""}`}>
            <img src={rutaAsset(p.imagen)} alt={p.alt} loading="lazy" className="aspect-[4/3] h-full w-full object-cover" />
            <div className="p-8"><h2 className="font-display text-2xl font-semibold">{p.nombre}</h2><p className="mt-3 opacity-75">{p.texto}</p><p className="mt-4 font-semibold" style={{ color: C.terracotaOsc }}>{p.precio}</p></div>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}

function Galeria() {
  const [abierta, setAbierta] = useState<number | null>(null);
  return (
    <Seccion>
      <Titulo h1 pre="Galería">Un vistazo a Molino Sur</Titulo>
      <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
        {GALERIA.map((g, i) => (
          <li key={g.src}><button type="button" onClick={() => setAbierta(i)} className="block w-full overflow-hidden rounded-2xl" aria-label={`Ampliar: ${g.alt}`}><img src={rutaAsset(g.src)} alt={g.alt} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105" /></button></li>
        ))}
      </ul>
      {abierta !== null && (
        <div role="dialog" aria-modal="true" aria-label="Imagen ampliada" className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-4" onClick={() => setAbierta(null)} onKeyDown={(e) => e.key === "Escape" && setAbierta(null)}>
          <img src={rutaAsset(GALERIA[abierta].src)} alt={GALERIA[abierta].alt} className="max-h-[85vh] max-w-full rounded-xl" />
          <button type="button" autoFocus onClick={() => setAbierta(null)} className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">Cerrar</button>
        </div>
      )}
    </Seccion>
  );
}

function Contacto() {
  const e = estadoAhora();
  const [c, setC] = useState({ nombre: "", correo: "", mensaje: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);
  const campo = "w-full rounded-xl border border-[#d8c8ad] bg-white px-4 py-3 outline-none focus:border-[#c2693f] focus:ring-2 focus:ring-[#c2693f]/30";
  return (
    <Seccion>
      <Titulo h1 pre="Contacto">Ven a vernos o escríbenos</Titulo>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <address className="not-italic leading-relaxed"><strong>{NEGOCIO.direccion}</strong><br />{NEGOCIO.telefono}<br />{NEGOCIO.correo}</address>
          <p className="mt-3 text-sm" aria-live="polite"><span className={`mr-1.5 inline-block h-2 w-2 rounded-full ${e.abierto ? "bg-green-600" : "bg-red-600"}`} aria-hidden="true" />{e.texto}</p>
          <h3 className="mt-8 font-semibold">Horarios</h3>
          <table className="mt-3 w-full max-w-sm text-sm"><caption className="sr-only">Horario de atención</caption><tbody>
            {[1, 2, 3, 4, 5, 6, 0].map((d) => <tr key={d} className="border-b border-black/10"><th scope="row" className="py-2 text-left font-normal">{DIAS[d]}</th><td className="py-2 text-right tabular-nums">{HORARIO[d] ? `${HORARIO[d]![0]}:00 – ${HORARIO[d]![1]}:00` : "Cerrado"}</td></tr>)}
          </tbody></table>
          <p className="mt-4 text-xs opacity-75">Dirección y datos de contacto ficticios.</p>
        </div>
        {ok ? (
          <div role="status" className="h-fit rounded-3xl p-8" style={{ background: C.suave }}>
            <h3 className="font-display text-2xl font-semibold">¡Gracias, {c.nombre.split(" ")[0]}!</h3>
            <p className="mt-3 opacity-80">En un sitio real, Molino Sur te respondería a {c.correo}.</p>
            <p className="mt-4 rounded-xl bg-white p-3 text-sm opacity-70">Esto es una demostración: no se envió ni se guardó ningún dato.</p>
            <button type="button" onClick={() => { setOk(false); setC({ nombre: "", correo: "", mensaje: "" }); }} className="mt-5 text-sm font-semibold underline" style={{ color: C.terracotaOsc }}>Enviar otro mensaje</button>
          </div>
        ) : (
          <form noValidate aria-label="Formulario de contacto" className="space-y-4" onSubmit={(ev) => {
            ev.preventDefault();
            const x: Record<string, string> = {};
            if (c.nombre.trim().length < 2) x.nombre = "Escribe tu nombre.";
            if (!esCorreo(c.correo)) x.correo = "Ingresa un correo válido.";
            if (c.mensaje.trim().length < 5) x.mensaje = "Escribe tu mensaje.";
            setErr(x);
            if (!Object.keys(x).length) setOk(true);
          }}>
            {(["nombre", "correo"] as const).map((k) => (
              <div key={k}><label htmlFor={`ms-${k}`} className="mb-1.5 block text-sm font-medium">{k === "nombre" ? "Nombre" : "Correo"}</label>
                <input id={`ms-${k}`} type={k === "correo" ? "email" : "text"} value={c[k]} onChange={(e) => setC({ ...c, [k]: e.target.value })} aria-invalid={!!err[k]} aria-describedby={err[k] ? `ms-${k}-e` : undefined} className={campo} />
                {err[k] && <p id={`ms-${k}-e`} className="mt-1.5 text-sm text-red-700">{err[k]}</p>}</div>
            ))}
            <div><label htmlFor="ms-mensaje" className="mb-1.5 block text-sm font-medium">Mensaje</label><textarea id="ms-mensaje" rows={4} value={c.mensaje} onChange={(e) => setC({ ...c, mensaje: e.target.value })} aria-invalid={!!err.mensaje} aria-describedby={err.mensaje ? "ms-mensaje-e" : undefined} className={campo} />{err.mensaje && <p id="ms-mensaje-e" className="mt-1.5 text-sm text-red-700">{err.mensaje}</p>}</div>
            <button type="submit" className="rounded-full px-7 py-3 text-sm font-semibold text-white" style={{ background: C.terracota }}>Enviar mensaje</button>
            <p className="text-xs opacity-75">Formulario demostrativo: no se envía ni se guarda ningún dato.</p>
          </form>
        )}
      </div>
    </Seccion>
  );
}

export default function MolinoSur() {
  return (
    <div style={{ background: "#fff", color: C.cafe }}>
      <ScrollArriba />
      <Cabecera />
      <main>
        <Routes>
          <Route index element={<Inicio />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="productos" element={<Productos />} />
          <Route path="galeria" element={<Galeria />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="*" element={<Seccion className="text-center"><h1 className="font-display text-3xl font-semibold">Página no encontrada</h1><div className="mt-6"><Boton to={BASE}>Volver al inicio</Boton></div></Seccion>} />
        </Routes>
      </main>
      <footer style={{ background: C.cafe }} className="text-white/70"><div className="mx-auto max-w-6xl px-4 py-10 text-sm"><p className="font-display text-lg text-white">Molino Sur</p><p className="mt-2">{NEGOCIO.direccion}</p><p className="mt-6 text-xs text-white/80">Molino Sur es un negocio ficticio creado para una demostración de SYNEXA. Fotografías generadas con IA.</p></div></footer>
    </div>
  );
}

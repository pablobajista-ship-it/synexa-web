import { useState } from "react";
import { rutaAsset } from "@/utilidades/assets";
import { ScrollArriba } from "../compartido/utiles";

const C = { terracota: "#b04a28", crema: "#f3e6d2", negro: "#1a1210" };

const PLATOS = [
  { nombre: "Parrillada de mar", precio: "$24.900", img: "plato-1", alt: "Parrillada de mariscos y pescado sobre plato terracota" },
  { nombre: "Filete con salsa de vino", precio: "$19.500", img: "plato-2", alt: "Filete en láminas con espárragos y zanahorias" },
  { nombre: "Ceviche de la casa", precio: "$12.900", img: "plato-3", alt: "Ceviche en cuenco de cerámica con cilantro" },
  { nombre: "Volcán de chocolate", precio: "$6.900", img: "plato-4", alt: "Postre de chocolate con frutos rojos" },
];

function FormReserva({ nuevo }: { nuevo: boolean }) {
  const [c, setC] = useState({ nombre: "", personas: "2", fecha: "" });
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");
  const id = nuevo ? "bc-n" : "bc-a";
  if (ok) return <p role="status" className={nuevo ? "rounded-2xl bg-white p-5 text-[#1a1210]" : ""} style={nuevo ? undefined : { color: "#b00", fontFamily: "Times New Roman, serif" }}>Solicitud simulada de mesa para {c.personas} a nombre de {c.nombre}. <em>Demostración: no se envió nada.</em> <button type="button" onClick={() => { setOk(false); setC({ nombre: "", personas: "2", fecha: "" }); }} className="underline">Volver</button></p>;
  const enviar = (e: React.FormEvent) => { e.preventDefault(); if (c.nombre.trim().length < 2 || !c.fecha) return setErr("Completa tu nombre y la fecha."); setErr(""); setOk(true); };
  if (!nuevo) {
    return (
      <form onSubmit={enviar} noValidate aria-label="Reserva de mesa (sitio antiguo)" style={{ fontFamily: "Times New Roman, serif", fontSize: 14 }}>
        <table border={1} cellPadding={4} style={{ borderCollapse: "collapse", background: "#ffffcc" }}><tbody>
          <tr><td><label htmlFor={`${id}-n`}>Nombre:</label></td><td><input id={`${id}-n`} value={c.nombre} onChange={(e) => setC({ ...c, nombre: e.target.value })} /></td></tr>
          <tr><td><label htmlFor={`${id}-p`}>Personas:</label></td><td><input id={`${id}-p`} size={3} value={c.personas} onChange={(e) => setC({ ...c, personas: e.target.value })} /></td></tr>
          <tr><td><label htmlFor={`${id}-f`}>Fecha:</label></td><td><input id={`${id}-f`} value={c.fecha} onChange={(e) => setC({ ...c, fecha: e.target.value })} placeholder="dd/mm/aaaa" /></td></tr>
          <tr><td colSpan={2} align="center"><input type="submit" value="ENVIAR" /></td></tr>
        </tbody></table>
        {err && <p style={{ color: "red" }}>{err}</p>}
      </form>
    );
  }
  const campo = "w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[#1a1210] outline-none focus:border-[#c2552f] focus:ring-2 focus:ring-[#c2552f]/30";
  return (
    <form onSubmit={enviar} noValidate aria-label="Reserva de mesa (sitio nuevo)" className="grid gap-3 sm:grid-cols-[1fr_8rem_11rem_auto]">
      <div><label htmlFor={`${id}-n`} className="sr-only">Nombre</label><input id={`${id}-n`} placeholder="Nombre" value={c.nombre} onChange={(e) => setC({ ...c, nombre: e.target.value })} className={campo} /></div>
      <div><label htmlFor={`${id}-p`} className="sr-only">Personas</label><select id={`${id}-p`} value={c.personas} onChange={(e) => setC({ ...c, personas: e.target.value })} className={campo}>{[1, 2, 3, 4, 5, 6, 8].map((n) => <option key={n} value={n}>{n} {n === 1 ? "persona" : "personas"}</option>)}</select></div>
      <div><label htmlFor={`${id}-f`} className="sr-only">Fecha</label><input id={`${id}-f`} type="date" value={c.fecha} onChange={(e) => setC({ ...c, fecha: e.target.value })} className={campo} /></div>
      <button type="submit" className="rounded-xl px-6 py-3 text-sm font-bold text-white" style={{ background: C.terracota }}>Reservar</button>
      {err && <p role="alert" className="text-sm text-red-200 sm:col-span-4">{err}</p>}
    </form>
  );
}

/** Reproduce un sitio de restaurante de hace 15 años: tablas, Times, colores chillones, fotos diminutas. */
function SitioAntiguo() {
  return (
    <div style={{ fontFamily: "Times New Roman, serif", background: "#ffffcc", color: "#000", minWidth: 760 }}>
      <table width="100%" cellPadding={6} style={{ background: "#990000", color: "#ffff00" }}><tbody><tr><td align="center"><p style={{ margin: 0, fontSize: 36, fontWeight: "bold", textShadow: "2px 2px #000" }}>*** RESTAURANT BRASA COSTA ***</p><p style={{ margin: 0 }}>La mejor comida de la costa - Visite nuestra pagina web!!!</p></td></tr></tbody></table>
      <table width="100%" cellPadding={4} style={{ background: "#ffcc00" }}><tbody><tr>{["INICIO", "NOSOTROS", "MENU", "FOTOS", "CONTACTO", "LIBRO DE VISITAS"].map((m) => <td key={m} align="center"><a href="#antiguo" onClick={(e) => e.preventDefault()} style={{ color: "#0000ee", fontWeight: "bold" }}>{m}</a></td>)}</tr></tbody></table>
      <table width="100%" cellPadding={10}><tbody><tr style={{ verticalAlign: "top" }}>
        <td width="30%"><img src={rutaAsset("assets/brasa-costa/interior.webp")} alt="Foto antigua del salón, de baja resolución" width={150} height={100} style={{ border: "3px ridge gray", imageRendering: "pixelated", filter: "saturate(.7) contrast(.9) blur(.4px)" }} /><p style={{ fontSize: 12 }}><em>Nuestro salon</em></p><p style={{ color: "#cc0000", fontWeight: "bold" }}>¡¡OFERTA!! Almuerzo ejecutivo $4.990</p></td>
        <td><h2 style={{ color: "#990000" }}>Bienvenidos</h2><p>Restaurant Brasa Costa lleva mas de 10 años sirviendo los mejores platos de la costa. Contamos con parrillas, mariscos, carnes, pescados, postres, bebidas, vinos, cafe, eventos, matrimonios, cumpleaños, banquetes y mucho mas.</p><p>Nuestro menu incluye: Parrillada, Filete, Ceviche, Postres. Consulte precios en el local.</p><p style={{ background: "#000", color: "#0f0", fontFamily: "monospace", padding: 4 }}>&gt;&gt;&gt; ESTAMOS ABIERTOS TODOS LOS DIAS DE 12:00 A 23:00 HRS &lt;&lt;&lt;</p><hr /><h3>Reserve su mesa:</h3><FormReserva nuevo={false} /></td>
      </tr></tbody></table>
      <p style={{ textAlign: "center", fontSize: 11, background: "#990000", color: "#fff", margin: 0, padding: 6 }}>Visitas: 004521 · Optimizado para Internet Explorer 6 · 800x600 · © 2009</p>
    </div>
  );
}

function SitioNuevo() {
  return (
    <div className="bg-white" style={{ color: C.negro }}>
      <header className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-white" style={{ background: C.negro }}>
        <p className="font-display text-xl font-semibold">Brasa Costa</p>
        <nav aria-label="Principal (sitio nuevo)" className="flex flex-wrap gap-4 text-sm">{["Carta", "Ambiente", "Reservas"].map((m) => <a key={m} href={`#bc-${m.toLowerCase()}`} className="opacity-80 hover:opacity-100">{m}</a>)}</nav>
      </header>
      <section className="relative isolate overflow-hidden text-white">
        <img src={rutaAsset("assets/brasa-costa/hero.webp")} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="px-5 py-20 sm:py-28"><p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "#f0b48f" }}>Cocina de fuego frente al mar</p><h2 className="mt-3 max-w-lg font-display text-4xl font-semibold leading-tight sm:text-5xl">Brasa, mar y buena mesa.</h2><a href="#bc-reservas" className="mt-7 inline-block rounded-xl px-6 py-3 text-sm font-bold text-white" style={{ background: C.terracota }}>Reservar mesa</a></div>
      </section>
      <section id="bc-carta" className="px-5 py-14" style={{ background: C.crema }}>
        <h2 className="font-display text-3xl font-semibold">Nuestra carta</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {PLATOS.map((p) => <li key={p.nombre} className="flex gap-4 overflow-hidden rounded-2xl bg-white p-3 shadow-sm"><img src={rutaAsset(`assets/brasa-costa/${p.img}.webp`)} alt={p.alt} loading="lazy" className="h-24 w-24 shrink-0 rounded-xl object-cover" /><div className="self-center"><h3 className="font-semibold">{p.nombre}</h3><p className="text-sm font-bold" style={{ color: C.terracota }}>{p.precio}</p></div></li>)}
        </ul>
      </section>
      <section id="bc-ambiente" className="px-5 py-14"><h2 className="font-display text-3xl font-semibold">El ambiente</h2><div className="mt-8 grid gap-4 sm:grid-cols-2"><img src={rutaAsset("assets/brasa-costa/terraza.webp")} alt="Terraza al atardecer con luces cálidas" loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" /><img src={rutaAsset("assets/brasa-costa/interior.webp")} alt="Salón interior con sillones de cuero" loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" /></div></section>
      <section id="bc-reservas" className="px-5 py-14 text-white" style={{ background: C.terracota }}><h2 className="font-display text-3xl font-semibold">Reserva tu mesa</h2><p className="mb-6 mt-2 text-white/85">Abierto todos los días de 12:00 a 23:00.</p><FormReserva nuevo /></section>
    </div>
  );
}

const MEJORAS = [
  ["Diseño de 2009: colores chillones, tablas y texto en movimiento", "Identidad sobria, tipografía legible y paleta cálida (terracota, crema y negro)"],
  ["No se adapta a móviles: hay que desplazarse de lado", "Diseño fluido que se ajusta a cualquier pantalla"],
  ["Fotografía pequeña, pixelada y sin contexto", "Fotografía de gran formato que muestra el ambiente y los platos"],
  ["Menú escrito en un párrafo y «consulte precios en el local»", "Carta con foto, nombre y precio de cada plato"],
  ["Navegación con 6 enlaces que no llevan a ningún lugar", "Navegación simple de 3 secciones, con anclas funcionales"],
  ["Formulario de reserva con campos sin etiquetas claras ni validación", "Formulario accesible con selector de fecha, etiquetas y mensajes de error"],
];
const VISTAS = ["antes", "despues", "comparar"] as const;
const NOMBRES = { antes: "Sitio antiguo", despues: "Sitio rediseñado", comparar: "Comparar" } as const;

function Comparador() {
  const [pos, setPos] = useState(50);
  return (
    <div>
      <div className="relative h-[560px] overflow-hidden rounded-xl ring-1 ring-black/15">
        <div className="absolute inset-0 overflow-hidden"><SitioNuevo /></div>
        <div className="absolute inset-0 overflow-hidden bg-[#ffffcc]" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} aria-hidden="true"><div style={{ width: "min(100%, 900px)" }}><SitioAntiguo /></div></div>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,.6)]" style={{ left: `${pos}%` }} />
        <span className="absolute left-3 top-3 rounded bg-black/75 px-2 py-1 text-xs font-bold text-white">ANTES</span>
        <span className="absolute right-3 top-3 rounded px-2 py-1 text-xs font-bold text-white" style={{ background: C.terracota }}>DESPUÉS</span>
      </div>
      <label className="mt-4 block"><span className="sr-only">Deslizar para comparar</span><input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} className="w-full accent-[#c2552f]" aria-valuetext={`${pos}% muestra el sitio antiguo`} /></label>
    </div>
  );
}

export default function BrasaCosta() {
  const [vista, setVista] = useState<(typeof VISTAS)[number]>("antes");
  const [movil, setMovil] = useState(false);
  return (
    <div className="min-h-screen bg-[#f6f2ee] text-[#1a1210]">
      <ScrollArriba />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: C.terracota }}>Rediseño web acotado · Brasa Costa</p>
        <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Mismo restaurante, un sitio que por fin lo representa.</h1>
        <p className="mt-3 max-w-2xl opacity-75">Esto es lo que mejora un rediseño acotado: la imagen, el orden del contenido y la adaptación a móviles. El restaurante y sus textos son los mismos; no se reconstruye la tecnología.</p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div role="tablist" aria-label="Vista" className="flex gap-1 rounded-xl bg-white p-1 ring-1 ring-black/10">
            {VISTAS.map((v) => <button key={v} type="button" role="tab" aria-selected={vista === v} onClick={() => setVista(v)} className={`rounded-lg px-4 py-2 text-sm font-semibold ${vista === v ? "text-white" : "hover:bg-black/5"}`} style={vista === v ? { background: C.negro } : undefined}>{NOMBRES[v]}</button>)}
          </div>
          {vista !== "comparar" && (
            <div role="group" aria-label="Tamaño de pantalla" className="flex gap-1 rounded-xl bg-white p-1 ring-1 ring-black/10">
              {([[false, "Escritorio"], [true, "Móvil"]] as const).map(([m, t]) => <button key={t} type="button" aria-pressed={movil === m} onClick={() => setMovil(m)} className={`rounded-lg px-4 py-2 text-sm font-semibold ${movil === m ? "text-white" : "hover:bg-black/5"}`} style={movil === m ? { background: C.terracota } : undefined}>{t}</button>)}
            </div>
          )}
        </div>

        <div role="tabpanel" className="mt-5">
          {vista === "comparar" ? <Comparador /> : (
            <div className="rounded-xl bg-[#d9d4ce] p-3 sm:p-5">
              <div className={`mx-auto overflow-x-auto overflow-y-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/15 transition-[max-width] ${movil ? "max-w-[375px]" : "max-w-full"}`} data-testid="marco" data-movil={movil}>
                {vista === "antes" ? <SitioAntiguo /> : <SitioNuevo />}
              </div>
              <p className="mt-3 text-center text-xs opacity-65">{vista === "antes" && movil ? "En móvil el sitio antiguo obliga a desplazarse horizontalmente." : vista === "despues" && movil ? "En móvil el sitio nuevo se adapta al ancho de la pantalla." : "Vista " + (vista === "antes" ? "del sitio antiguo (ficticio)." : "del sitio rediseñado.")}</p>
            </div>
          )}
        </div>

        <section aria-labelledby="bc-mejoras" className="mt-14">
          <h2 id="bc-mejoras" className="font-display text-2xl font-semibold">Qué se mejoró</h2>
          <div className="mt-5 overflow-x-auto rounded-xl bg-white ring-1 ring-black/10">
            <table className="w-full min-w-[560px] text-left text-sm"><caption className="sr-only">Problemas del sitio antiguo y su mejora</caption>
              <thead className="text-xs uppercase tracking-wider opacity-75"><tr><th scope="col" className="p-4">Antes</th><th scope="col" className="p-4">Después</th></tr></thead>
              <tbody className="divide-y divide-black/10">{MEJORAS.map(([a, d]) => <tr key={a}><td className="p-4 align-top opacity-75">{a}</td><td className="p-4 align-top font-medium">{d}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="mt-4 rounded-xl bg-white p-4 text-sm ring-1 ring-black/10"><strong>Qué no incluye este paquete:</strong> reconstrucción tecnológica completa, nuevas funcionalidades ni cambios de contenido de fondo.</p>
        </section>
        <p className="mt-10 text-xs opacity-75">Brasa Costa es un restaurante ficticio creado para una demostración de SYNEXA. El «sitio antiguo» es una recreación ficticia. Fotografías generadas con IA.</p>
      </div>
    </div>
  );
}

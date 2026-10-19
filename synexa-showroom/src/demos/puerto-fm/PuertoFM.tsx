import { useState } from "react";
import { Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import { IsotipoMarca } from "@/componentes/IsotipoMarca";
import { marcaPorId } from "@/datos/marcas";
import { rutaAsset } from "@/utilidades/assets";
import { MenuMovil, ScrollArriba, esCorreo } from "../compartido/utiles";
import { DIAS_SEMANA, ORDEN_DIAS, ReproductorRadio, hhmm, programaAlAire, type Dia, type ProgramaRadio } from "../compartido/ReproductorRadio";

const BASE = "/demos/puerto-fm";
const C = { marino: "#0f2a52", naranja: "#ff8a33", suave: "#16386b", claro: "#fff" };
const marca = marcaPorId("puerto-fm")!;
const LV: Dia[] = ["lun", "mar", "mie", "jue", "vie"];

const LOCUTORES = [
  { id: "hugo", nombre: "Hugo Salinas", img: "assets/puerto-fm/locutor-1.webp", alt: "Retrato de Hugo Salinas en el estudio", bio: "Voz de las mañanas. Informa el pulso de la ciudad y el puerto." },
  { id: "marta", nombre: "Marta Quiroga", img: "assets/puerto-fm/locutor-2.webp", alt: "Retrato de Marta Quiroga con micrófono", bio: "Conduce las tardes y entrevista a vecinos, comerciantes y autoridades." },
  { id: "tomas", nombre: "Tomás Rey", img: "assets/puerto-fm/locutor-3.webp", alt: "Retrato de Tomás Rey en cabina", bio: "Deportes y música de la noche, con los resultados al día." },
] as const;

const PROGRAMAS: (ProgramaRadio & { locutores: readonly string[] })[] = [
  { id: "amanecer", nombre: "Amanecer en el Puerto", locutores: ["hugo"], dias: LV, inicio: 6, fin: 10, descripcion: "Noticias locales, clima y el estado de los muelles." },
  { id: "mediodia", nombre: "Voces del Mediodía", locutores: ["marta"], dias: LV, inicio: 12, fin: 15, descripcion: "Entrevistas con vecinos y la agenda comunitaria." },
  { id: "deportes", nombre: "Marea Deportiva", locutores: ["tomas"], dias: LV, inicio: 18, fin: 20, descripcion: "Resultados, comentarios y fútbol de barrio." },
  { id: "sabado", nombre: "Sábado Familiar", locutores: ["marta", "hugo"], dias: ["sab"], inicio: 10, fin: 13, descripcion: "Música, concursos y saludos de la comunidad." },
];

const NOTICIAS = [
  { id: "feria", titulo: "Feria costanera abre su temporada de verano", fecha: "12 de octubre de 2026", resumen: "Más de 60 puestos de productores locales se instalan cada sábado frente al muelle.", cuerpo: "La Feria Costanera inicia su temporada con 60 productores locales. Habrá música en vivo y un patio de comidas.\n\nEl horario será de sábados y domingos, de 10:00 a 19:00." },
  { id: "muelle", titulo: "Reabren el muelle norte tras obras de mejoramiento", fecha: "8 de octubre de 2026", resumen: "Los trabajos incluyeron nueva iluminación y barandas.", cuerpo: "Tras cuatro meses de trabajos, el muelle norte vuelve a recibir visitantes.\n\nSe renovó la iluminación y se instalaron nuevas barandas." },
  { id: "aniversario", titulo: "Puerto FM celebra 15 años con un concierto abierto", fecha: "2 de octubre de 2026", resumen: "Bandas locales tocarán gratis en la plaza principal.", cuerpo: "Para celebrar sus 15 años, Puerto FM organizó un concierto gratuito con tres bandas locales.\n\nLa entrada es libre hasta completar el aforo." },
];

const Cont = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <div className={`mx-auto max-w-6xl px-4 py-14 ${className}`}>{children}</div>;
const Titulo = ({ pre, children, h1 = false }: { pre?: string; children: React.ReactNode; h1?: boolean }) => {
  const H = h1 ? "h1" : "h2";
  return <div>{pre && <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: C.naranja }}>{pre}</p>}<H className="mt-2 text-3xl font-extrabold sm:text-4xl">{children}</H></div>;
};

function Cabecera() {
  const MENU = [["", "Inicio"], ["programacion", "Programación"], ["locutores", "Locutores"], ["noticias", "Noticias"], ["contacto", "Contacto"]] as const;
  const est = ({ isActive }: { isActive: boolean }) => `rounded px-3 py-2 text-sm font-semibold ${isActive ? "text-white" : "text-white/65 hover:text-white"}`;
  return (
    <header className="sticky top-11 z-30 border-b border-white/10 text-white" style={{ background: C.marino }}>
      <div className="relative"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to={BASE} className="flex items-center gap-3" aria-label="Puerto FM, inicio"><IsotipoMarca marca={marca} size={34} /><span className="text-lg font-extrabold">Puerto <span style={{ color: C.naranja }}>FM</span> <span className="text-sm font-medium text-white/80">98.1</span></span></Link>
        <nav aria-label="Principal" className="hidden md:flex">{MENU.map(([r, t]) => <NavLink key={r} to={r ? `${BASE}/${r}` : BASE} end={r === ""} className={est}>{t}</NavLink>)}</nav>
        <MenuMovil id="pf-menu"><ul style={{ background: C.marino }}>{MENU.map(([r, t]) => <li key={r}><NavLink to={r ? `${BASE}/${r}` : BASE} end={r === ""} className="block rounded px-3 py-3 text-white">{t}</NavLink></li>)}</ul></MenuMovil>
      </div></div>
    </header>
  );
}

const nombresLocutores = (ids: readonly string[]) => ids.map((i) => LOCUTORES.find((l) => l.id === i)?.nombre.split(" ")[0]).join(" y ");

function Inicio() {
  const alAire = programaAlAire(PROGRAMAS);
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={rutaAsset("assets/puerto-fm/hero.webp")} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0f2a52] via-[#0f2a52]/75 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-24 sm:py-32">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: C.naranja }}>Radio local · 98.1 FM</p>
          <h1 className="mt-4 max-w-xl text-4xl font-extrabold leading-tight sm:text-6xl">La voz del puerto, todo el día.</h1>
          <p className="mt-5 max-w-lg text-lg text-white/80">Noticias de la ciudad, entrevistas con la gente del barrio y la mejor música. Escúchanos en vivo desde cualquier lugar.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link to={`${BASE}/programacion`} className="rounded-md px-6 py-3 text-sm font-bold text-[#0f2a52]" style={{ background: C.naranja }}>Ver programación</Link></div>
        </div>
      </section>
      <section style={{ background: C.suave }} className="text-white"><Cont>
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <div className="rounded-2xl p-6 ring-1 ring-white/15" style={{ background: C.marino }}>
            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: C.naranja }}>Al aire ahora</h2>
            {alAire ? <><p className="mt-3 text-2xl font-extrabold">{alAire.nombre}</p><p className="mt-1 text-sm text-white/65">Con {nombresLocutores(alAire.locutores)} · {hhmm(alAire.inicio)} a {hhmm(alAire.fin)}</p><p className="mt-3 text-sm text-white/75">{alAire.descripcion}</p></> : <><p className="mt-3 text-2xl font-extrabold">Música continua</p><p className="mt-2 text-sm text-white/70">Ahora no hay un programa en vivo. Revisa la programación.</p></>}
          </div>
          <div>
            <h2 className="text-xl font-bold">Últimas noticias</h2>
            <ul className="mt-4 divide-y divide-white/15 border-y border-white/15">
              {NOTICIAS.map((n) => <li key={n.id}><Link to={`${BASE}/noticias/${n.id}`} className="block py-4 hover:bg-white/5"><p className="text-xs text-white/80">{n.fecha}</p><p className="font-semibold">{n.titulo}</p></Link></li>)}
            </ul>
          </div>
        </div>
      </Cont></section>
      <Cont className="text-white">
        <Titulo pre="El equipo">Las voces de Puerto FM</Titulo>
        <ul className="mt-8 grid gap-6 sm:grid-cols-3">{LOCUTORES.map((l) => <li key={l.id}><img src={rutaAsset(l.img)} alt={l.alt} loading="lazy" className="aspect-[4/5] w-full rounded-xl object-cover object-top" /><h3 className="mt-3 font-bold">{l.nombre}</h3><p className="text-sm text-white/65">{l.bio}</p></li>)}</ul>
      </Cont>
    </>
  );
}

function Programacion() {
  const [dia, setDia] = useState<Dia>(ORDEN_DIAS[new Date().getDay()]);
  const lista = PROGRAMAS.filter((p) => p.dias.includes(dia)).sort((a, b) => a.inicio - b.inicio);
  return (
    <Cont className="text-white">
      <Titulo h1 pre="Programación">Qué escuchar y cuándo</Titulo>
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Día de la semana">
        {DIAS_SEMANA.map((d) => <button key={d.id} type="button" aria-pressed={dia === d.id} onClick={() => setDia(d.id)} className={`rounded-full px-4 py-2 text-sm font-semibold ${dia === d.id ? "text-[#0f2a52]" : "bg-white/10 hover:bg-white/20"}`} style={dia === d.id ? { background: C.naranja } : undefined}><span aria-hidden="true">{d.corto}</span><span className="sr-only">{d.nombre}</span></button>)}
      </div>
      <h2 className="mt-10 text-xl font-bold">{DIAS_SEMANA.find((d) => d.id === dia)!.nombre}</h2>
      {lista.length ? <ol className="mt-4 space-y-4">{lista.map((p) => <li key={p.id} className="rounded-xl p-5 ring-1 ring-white/15" style={{ background: C.suave }}><div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="text-lg font-bold">{p.nombre}</h3><p className="text-sm tabular-nums" style={{ color: C.naranja }}>{hhmm(p.inicio)} a {hhmm(p.fin)}</p></div><p className="mt-2 text-sm text-white/75">{p.descripcion}</p><p className="mt-2 text-sm text-white/80">Con {nombresLocutores(p.locutores)}</p></li>)}</ol> : <p className="mt-4 rounded-xl border border-dashed border-white/25 p-8 text-center text-white/65">No hay programas en vivo este día. Escucha nuestra música continua.</p>}
    </Cont>
  );
}

function Locutores() {
  return (
    <Cont className="text-white">
      <Titulo h1 pre="Locutores">Quiénes están detrás del micrófono</Titulo>
      <ul className="mt-10 grid gap-8 md:grid-cols-3">{LOCUTORES.map((l) => <li key={l.id} className="overflow-hidden rounded-2xl ring-1 ring-white/15" style={{ background: C.suave }}><img src={rutaAsset(l.img)} alt={l.alt} loading="lazy" className="aspect-[4/5] w-full object-cover object-top" /><div className="p-5"><h2 className="text-lg font-bold">{l.nombre}</h2><p className="mt-2 text-sm text-white/70">{l.bio}</p><p className="mt-3 text-xs text-white/80">Programas: {PROGRAMAS.filter((p) => p.locutores.includes(l.id)).map((p) => p.nombre).join(" · ")}</p></div></li>)}</ul>
      <img src={rutaAsset("assets/puerto-fm/consola.webp")} alt="Consola de audio de la emisora" loading="lazy" className="mt-12 aspect-[21/9] w-full rounded-2xl object-cover" />
    </Cont>
  );
}

function Noticias() {
  return (
    <Cont className="text-white">
      <Titulo h1 pre="Noticias">Lo que pasa en el puerto</Titulo>
      <ul className="mt-8 space-y-5">{NOTICIAS.map((n) => <li key={n.id} className="rounded-xl p-6 ring-1 ring-white/15" style={{ background: C.suave }}><p className="text-xs text-white/80">{n.fecha}</p><h2 className="mt-1 text-lg font-bold"><Link to={`${BASE}/noticias/${n.id}`} className="hover:underline">{n.titulo}</Link></h2><p className="mt-2 text-sm text-white/75">{n.resumen}</p></li>)}</ul>
    </Cont>
  );
}

function VerNoticia() {
  const { id } = useParams();
  const n = NOTICIAS.find((x) => x.id === id);
  if (!n) return <Cont className="text-center text-white"><h1 className="text-3xl font-extrabold">Noticia no encontrada</h1><Link to={`${BASE}/noticias`} className="mt-6 inline-block underline" style={{ color: C.naranja }}>Ver todas las noticias</Link></Cont>;
  return (
    <Cont className="max-w-3xl text-white">
      <Link to={`${BASE}/noticias`} className="text-sm underline" style={{ color: C.naranja }}>← Noticias</Link>
      <p className="mt-6 text-sm text-white/80">{n.fecha}</p>
      <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">{n.titulo}</h1>
      <div className="mt-6 space-y-4 text-lg leading-relaxed text-white/80">{n.cuerpo.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}</div>
    </Cont>
  );
}

function Contacto() {
  const [c, setC] = useState({ nombre: "", correo: "", mensaje: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);
  const campo = "w-full rounded-md border border-white/20 bg-[#0f2a52] px-3.5 py-2.5 text-white outline-none focus:border-[#ff7a1a] focus:ring-2 focus:ring-[#ff7a1a]/40";
  return (
    <Cont className="max-w-3xl text-white">
      <Titulo h1 pre="Contacto">Escríbele a la radio</Titulo>
      <p className="mt-3 text-white/70">Cabina: +56 2 2300 0000 · contacto@puertofm.example · Muelle Prat 120, Ciudad Ficticia (datos ficticios).</p>
      {ok ? (
        <div role="status" className="mt-8 rounded-xl p-6 ring-1 ring-[#ff7a1a]/50" style={{ background: C.suave }}>
          <h2 className="text-xl font-bold">¡Gracias, {c.nombre.split(" ")[0]}!</h2>
          <p className="mt-2 text-white/75">En una radio real, tu mensaje llegaría a la producción a {c.correo}.</p>
          <p className="mt-3 rounded-md bg-black/25 p-3 text-sm text-white/80">Esto es una demostración: no se envió ni se guardó ningún dato.</p>
          <button type="button" onClick={() => { setOk(false); setC({ nombre: "", correo: "", mensaje: "" }); }} className="mt-4 text-sm font-semibold underline" style={{ color: C.naranja }}>Enviar otro mensaje</button>
        </div>
      ) : (
        <form noValidate aria-label="Formulario de contacto" className="mt-8 space-y-4" onSubmit={(ev) => { ev.preventDefault(); const x: Record<string, string> = {}; if (c.nombre.trim().length < 2) x.nombre = "Escribe tu nombre."; if (!esCorreo(c.correo)) x.correo = "Ingresa un correo válido."; if (c.mensaje.trim().length < 5) x.mensaje = "Escribe tu mensaje."; setErr(x); if (!Object.keys(x).length) setOk(true); }}>
          {(["nombre", "correo"] as const).map((k) => <div key={k}><label htmlFor={`pf-${k}`} className="mb-1.5 block text-sm font-medium">{k === "nombre" ? "Nombre" : "Correo"}</label><input id={`pf-${k}`} type={k === "correo" ? "email" : "text"} value={c[k]} onChange={(e) => setC({ ...c, [k]: e.target.value })} aria-invalid={!!err[k]} aria-describedby={err[k] ? `pf-${k}-e` : undefined} className={campo} />{err[k] && <p id={`pf-${k}-e`} className="mt-1.5 text-sm text-red-300">{err[k]}</p>}</div>)}
          <div><label htmlFor="pf-mensaje" className="mb-1.5 block text-sm font-medium">Mensaje</label><textarea id="pf-mensaje" rows={4} value={c.mensaje} onChange={(e) => setC({ ...c, mensaje: e.target.value })} aria-invalid={!!err.mensaje} aria-describedby={err.mensaje ? "pf-mensaje-e" : undefined} className={campo} />{err.mensaje && <p id="pf-mensaje-e" className="mt-1.5 text-sm text-red-300">{err.mensaje}</p>}</div>
          <button type="submit" className="rounded-md px-7 py-3 text-sm font-bold text-[#0f2a52]" style={{ background: C.naranja }}>Enviar mensaje</button>
          <p className="text-xs text-white/80">Formulario demostrativo: no se envía ni se guarda ningún dato.</p>
        </form>
      )}
    </Cont>
  );
}

export default function PuertoFM() {
  const alAire = programaAlAire(PROGRAMAS);
  return (
    <div className="min-h-screen pb-24" style={{ background: C.marino, color: C.claro }}>
      <ScrollArriba />
      <Cabecera />
      <main>
        <Routes>
          <Route index element={<Inicio />} />
          <Route path="programacion" element={<Programacion />} />
          <Route path="locutores" element={<Locutores />} />
          <Route path="noticias" element={<Noticias />} />
          <Route path="noticias/:id" element={<VerNoticia />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="*" element={<Cont className="text-center"><h1 className="text-3xl font-extrabold">Página no encontrada</h1><Link to={BASE} className="mt-6 inline-block underline" style={{ color: C.naranja }}>Volver al inicio</Link></Cont>} />
        </Routes>
      </main>
      <footer className="border-t border-white/10 bg-black/25"><div className="mx-auto max-w-6xl px-4 py-9 text-xs text-white/80">Puerto FM es una emisora ficticia creada para una demostración de SYNEXA. Locutores, programas y noticias son inventados. Fotografías generadas con IA.</div></footer>
      <ReproductorRadio emisora="Puerto FM" ahora={alAire ? `${alAire.nombre} · con ${nombresLocutores(alAire.locutores)}` : "Música continua"} fondo={C.marino} acento={C.naranja} />
    </div>
  );
}

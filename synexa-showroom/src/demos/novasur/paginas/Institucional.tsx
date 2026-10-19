import { rutaAsset } from "@/utilidades/assets";
import { BASE, CIFRAS, DIRECTIVOS, EQUIPO_TECNICO, SERVICIOS } from "../datos";
import { Boton, Contenedor, Encabezado } from "./Comun";

const VALORES = [
  ["Seguridad primero", "Ningún plazo justifica un riesgo. Cada obra parte con un plan de prevención aprobado."],
  ["Cumplimiento", "Comprometemos fechas realistas y las cumplimos; si algo cambia, lo informamos a tiempo."],
  ["Rigor técnico", "Decisiones basadas en cálculo, ensayos y experiencia, no en supuestos."],
  ["Transparencia", "Informes claros de avance, costo y calidad durante todo el proyecto."],
];

export function Nosotros() {
  return (
    <>
      <Encabezado etiqueta="Quiénes somos" titulo="Una empresa de ingenieros que construye y mantiene lo que diseña." texto="Desde hace 18 años acompañamos a plantas industriales, operadores logísticos y empresas de energía." imagen="assets/novasur/banner.webp" />
      <Contenedor>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-4 leading-relaxed text-[#3c5560]">
            <h2 className="font-display text-3xl font-semibold text-[#10252d]">Nuestra historia</h2>
            <p>NovaSur nació como un pequeño equipo de ingeniería de detalle. Al ver que muchos proyectos se retrasaban entre el diseño y la obra, sumamos construcción y mantenimiento para responsabilizarnos de todo el ciclo.</p>
            <p>Hoy trabajamos con {CIFRAS[2].valor} profesionales y técnicos, y mantenemos relaciones de largo plazo con nuestros clientes: la mayoría vuelve a contratarnos.</p>
          </div>
          <img src={rutaAsset("assets/novasur/ingenieros.webp")} alt="Ingenieros revisando planos en una planta" loading="lazy" className="aspect-[4/3] w-full rounded-xl object-cover" />
        </div>
      </Contenedor>
      <section className="bg-[#e8eef0]">
        <Contenedor>
          <h2 className="font-display text-3xl font-semibold">Nuestros valores</h2>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            {VALORES.map(([t, d]) => (
              <div key={t} className="rounded-xl bg-white p-6 ring-1 ring-[#d3dde1]">
                <dt className="font-bold">{t}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#3c5560]">{d}</dd>
              </div>
            ))}
          </dl>
        </Contenedor>
      </section>
    </>
  );
}

export function Servicios() {
  return (
    <>
      <Encabezado etiqueta="Servicios" titulo="Del diseño a la operación, en un mismo equipo." texto="Seis líneas de servicio que se combinan según la etapa de tu proyecto." imagen="assets/novasur/equipamiento.webp" />
      <Contenedor className="space-y-6">
        {SERVICIOS.map((s) => (
          <article key={s.id} id={s.id} className="grid gap-6 rounded-xl p-6 ring-1 ring-[#d3dde1] md:grid-cols-[1fr_1.4fr]">
            <h2 className="font-display text-2xl font-semibold">{s.titulo}</h2>
            <div>
              <p className="leading-relaxed text-[#3c5560]">{s.texto}</p>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-1">
                {s.puntos.map((p) => (
                  <li key={p} className="flex gap-2"><span aria-hidden="true" className="font-bold text-[#246b7a]">✓</span>{p}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
        <div className="pt-6"><Boton to={`${BASE}/contacto`}>Cotizar un servicio</Boton></div>
      </Contenedor>
    </>
  );
}

const iniciales = (n: string) => n.split(" ").map((p) => p[0]).slice(0, 2).join("");

export function Equipo() {
  return (
    <>
      <Encabezado etiqueta="Equipo" titulo="Las personas detrás de cada proyecto." />
      <Contenedor>
        <h2 className="font-display text-2xl font-semibold">Dirección</h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {DIRECTIVOS.map((d) => (
            <article key={d.nombre} className="overflow-hidden rounded-xl ring-1 ring-[#d3dde1]">
              <img src={rutaAsset(d.imagen)} alt={d.alt} loading="lazy" className="aspect-[3/2] w-full object-cover object-top" />
              <div className="p-6">
                <h3 className="text-lg font-bold">{d.nombre}</h3>
                <p className="text-sm font-semibold text-[#246b7a]">{d.cargo}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#3c5560]">{d.bio}</p>
              </div>
            </article>
          ))}
        </div>
        <h2 className="mt-14 font-display text-2xl font-semibold">Equipo técnico</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EQUIPO_TECNICO.map((p) => (
            <li key={p.nombre} className="flex items-center gap-4 rounded-xl p-4 ring-1 ring-[#d3dde1]">
              <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#0e3b4a] text-sm font-bold text-white">{iniciales(p.nombre)}</span>
              <span><strong className="block text-sm">{p.nombre}</strong><span className="text-xs text-[#5b727b]">{p.cargo}</span></span>
            </li>
          ))}
        </ul>
      </Contenedor>
    </>
  );
}

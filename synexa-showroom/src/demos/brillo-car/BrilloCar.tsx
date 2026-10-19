import { useState } from "react";
import { rutaAsset } from "@/utilidades/assets";
import { formatoCLP } from "@/utilidades/formato";
import { IsotipoMarca } from "@/componentes/IsotipoMarca";
import { marcaPorId } from "@/datos/marcas";
import { AntesDespues } from "./AntesDespues";
import { FormularioCotizacion } from "./FormularioCotizacion";
import { BENEFICIOS, FAQ, GALERIA, PAQUETES, TESTIMONIOS } from "./datos";

const AZUL = "#6b95ff";
const marca = marcaPorId("brillo-car")!;

const ancla = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView?.({ behavior: "smooth" });
};

export default function BrilloCar() {
  const [paquete, setPaquete] = useState("premium");
  const [abierta, setAbierta] = useState<number | null>(0);

  return (
    <div className="bg-[#14161b] text-white">
      <header className="sticky top-11 z-40 border-b border-white/10 bg-[#14161b]/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <a href="#inicio" onClick={ancla("inicio")} className="flex items-center gap-2.5" aria-label="BrilloCar Detailing, ir al inicio">
            <IsotipoMarca marca={marca} size={34} />
            <span className="text-sm font-extrabold uppercase tracking-[0.2em]">BrilloCar</span>
          </a>
          <nav aria-label="Secciones" className="hidden items-center gap-7 text-sm font-medium text-white/75 md:flex">
            {[["paquetes", "Paquetes"], ["resultados", "Resultados"], ["preguntas", "Preguntas"]].map(([id, t]) => (
              <a key={id} href={`#${id}`} onClick={ancla(id)} className="hover:text-white">{t}</a>
            ))}
          </nav>
          <a href="#cotizar" onClick={ancla("cotizar")} className="rounded-lg bg-[#2a62f5] px-4 py-2 text-sm font-bold hover:bg-[#4a80ff]">Cotizar</a>
        </div>
      </header>

      <section id="inicio" className="relative isolate overflow-hidden">
        <img src={rutaAsset("assets/brillo-car/hero.webp")} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#14161b] via-[#14161b]/75 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-24 sm:py-32 lg:py-40">
          <p className="text-sm font-bold uppercase tracking-[0.25em]" style={{ color: AZUL }}>Detailing automotriz profesional</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold uppercase leading-[1.05] sm:text-6xl">Tu auto, como el primer día.</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            Limpieza profunda, pulido y protección cerámica hechos a mano. Cotiza en un minuto y te respondemos con valor y fecha.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#cotizar" onClick={ancla("cotizar")} className="rounded-lg bg-[#2a62f5] px-7 py-3.5 text-sm font-bold uppercase tracking-wider hover:bg-[#4a80ff]">Cotizar mi auto</a>
            <a href="#paquetes" onClick={ancla("paquetes")} className="rounded-lg px-7 py-3.5 text-sm font-bold uppercase tracking-wider ring-1 ring-inset ring-white/30 hover:bg-white/10">Ver paquetes</a>
          </div>
        </div>
      </section>

      <section aria-labelledby="beneficios" className="mx-auto max-w-6xl px-4 py-20">
        <h2 id="beneficios" className="max-w-xl text-3xl font-extrabold uppercase sm:text-4xl">Por qué elegir BrilloCar</h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFICIOS.map((b, i) => (
            <div key={b.titulo} className="bg-[#14161b] p-6">
              <span className="text-sm font-bold" style={{ color: AZUL }}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-bold">{b.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{b.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="resultados" className="scroll-mt-28 bg-[#1d2027]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em]" style={{ color: AZUL }}>Resultados</p>
            <h2 className="mt-3 text-3xl font-extrabold uppercase sm:text-4xl">El antes y el después</h2>
            <p className="mt-4 leading-relaxed text-white/70">Mismo auto, mismo taller, mismo ángulo. Desliza para ver lo que logra un tratamiento completo de pintura.</p>
            <div className="mt-8 flex items-center gap-4">
              <img src={rutaAsset("assets/brillo-car/profesional.webp")} alt="Profesional aplicando tratamiento a la puerta de un auto" className="h-24 w-36 rounded-lg object-cover" loading="lazy" />
              <p className="text-sm text-white/65">Cada auto lo trabaja un especialista, no una máquina de lavado.</p>
            </div>
          </div>
          <AntesDespues />
        </div>
      </section>

      <section id="paquetes" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-20">
        <p className="text-sm font-bold uppercase tracking-[0.25em]" style={{ color: AZUL }}>Paquetes</p>
        <h2 className="mt-3 text-3xl font-extrabold uppercase sm:text-4xl">Elige tu nivel de protección</h2>
        <p className="mt-2 text-sm text-white/80">Precios de demostración, en pesos chilenos.</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PAQUETES.map((p) => (
            <article key={p.id} className={`flex flex-col rounded-2xl p-7 ${p.destacado ? "bg-[#2a62f5] shadow-[0_20px_60px_-20px_rgba(47,107,255,.7)]" : "bg-[#1d2027] ring-1 ring-white/10"}`}>
              {p.destacado && <span className="mb-3 w-fit rounded bg-white px-2 py-0.5 text-xs font-bold uppercase text-[#14161b]">Más elegido</span>}
              <h3 className="text-2xl font-extrabold uppercase">{p.nombre}</h3>
              <p className={`mt-1 text-sm ${p.destacado ? "text-white" : "text-white/80"}`}>{p.resumen}</p>
              <p className="mt-5 text-4xl font-extrabold tabular-nums">{formatoCLP(p.precio)}</p>
              <p className={`text-sm ${p.destacado ? "text-white" : "text-white/80"}`}>Duración: {p.duracion}</p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                {p.incluye.map((i) => (
                  <li key={i} className="flex gap-2.5"><span aria-hidden="true" className="font-bold">✓</span>{i}</li>
                ))}
              </ul>
              <a
                href="#cotizar"
                onClick={(e) => { setPaquete(p.id); ancla("cotizar")(e); }}
                className={`mt-7 rounded-lg px-5 py-3 text-center text-sm font-bold uppercase tracking-wider ${p.destacado ? "bg-white text-[#14161b] hover:bg-white/90" : "bg-[#2a62f5] hover:bg-[#4a80ff]"}`}
              >
                Cotizar {p.nombre}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="galeria" className="bg-[#1d2027] py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="galeria" className="text-3xl font-extrabold uppercase sm:text-4xl">Trabajos recientes</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {GALERIA.map((g) => (
              <img key={g.src} src={rutaAsset(g.src)} alt={g.alt} loading="lazy" className="aspect-square w-full rounded-xl object-cover ring-1 ring-white/10" />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="testimonios" className="mx-auto max-w-6xl px-4 py-20">
        <h2 id="testimonios" className="text-3xl font-extrabold uppercase sm:text-4xl">Lo que dicen nuestros clientes</h2>
        <p className="mt-2 text-sm text-white/80">Testimonios demostrativos: personas y comentarios ficticios.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIOS.map((t) => (
            <figure key={t.nombre} className="rounded-2xl bg-[#1d2027] p-6 ring-1 ring-white/10">
              <blockquote className="leading-relaxed text-white/80">“{t.texto}”</blockquote>
              <figcaption className="mt-5 text-sm"><strong>{t.nombre}</strong> <span className="text-white/80">· {t.auto}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="preguntas" className="scroll-mt-28 bg-[#1d2027] py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-extrabold uppercase sm:text-4xl">Preguntas frecuentes</h2>
          <div className="mt-8 divide-y divide-white/10 rounded-2xl ring-1 ring-white/10">
            {FAQ.map((f, i) => (
              <div key={f.q}>
                <h3>
                  <button type="button" aria-expanded={abierta === i} aria-controls={`faq-${i}`} onClick={() => setAbierta(abierta === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold hover:bg-white/5">
                    {f.q}
                    <span aria-hidden="true" className="text-xl text-[#2f6bff]">{abierta === i ? "−" : "+"}</span>
                  </button>
                </h3>
                {abierta === i && <p id={`faq-${i}`} className="px-5 pb-5 leading-relaxed text-white/70">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cotizar" className="mx-auto max-w-3xl scroll-mt-28 px-4 py-20">
        <p className="text-sm font-bold uppercase tracking-[0.25em]" style={{ color: AZUL }}>Cotización</p>
        <h2 className="mt-3 text-3xl font-extrabold uppercase sm:text-4xl">Cuéntanos de tu auto</h2>
        <div className="mt-8"><FormularioCotizacion key={paquete} paqueteInicial={paquete} /></div>
      </section>

      <footer className="border-t border-white/10 py-10 text-center text-sm text-white/80">
        <p>BrilloCar Detailing · Marca ficticia creada para una demostración de SYNEXA.</p>
        <p className="mt-1">Fotografías generadas con IA. Precios y testimonios de ejemplo.</p>
      </footer>
    </div>
  );
}

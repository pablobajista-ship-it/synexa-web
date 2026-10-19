import { Link } from "react-router-dom";
import { rutaAsset } from "@/utilidades/assets";
import { ARTICULOS, BASE, COLOR, DIAS, LOCUTORES, PROGRAMAS, locutorPorId, type DiaId } from "../datos";
import { programaAlAire } from "../Reproductor";
import { BotonLink, Contenedor } from "./Comun";

const ORDEN: DiaId[] = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"];
const hh = (n: number) => `${String(n === 24 ? 0 : n).padStart(2, "0")}:00`;

export function Inicio() {
  const ahora = new Date();
  const alAire = programaAlAire(ahora);
  const hoy = ORDEN[ahora.getDay()];
  const delDia = PROGRAMAS.filter((p) => (p.dias as readonly DiaId[]).includes(hoy)).sort((a, b) => a.inicio - b.inicio);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={rutaAsset("assets/frecuencia-mix/hero.webp")} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#070f2b] via-[#070f2b]/75 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-24 sm:py-32 lg:py-40">
          <p className="text-sm font-semibold uppercase tracking-[0.25em]" style={{ color: COLOR.tealClaro }}>Radio y comunidad musical</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-[1.05] sm:text-6xl">La música se escucha mejor en comunidad.</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">Escucha en vivo, conversa en el chat, vota por la próxima canción y manda tu dedicatoria.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <BotonLink to={`${BASE}/comunidad`}>Entrar a la comunidad</BotonLink>
            <Link to={`${BASE}/programacion`} className="inline-flex items-center rounded-md px-6 py-3 text-sm font-bold ring-1 ring-inset ring-white/35 hover:bg-white/10">Ver programación</Link>
          </div>
        </div>
      </section>

      <Contenedor>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <section aria-labelledby="fm-ahora" className="rounded-2xl p-6 ring-1 ring-white/10" style={{ background: COLOR.panel }}>
            <h2 id="fm-ahora" className="text-sm font-semibold uppercase tracking-wider" style={{ color: COLOR.tealClaro }}>Al aire ahora</h2>
            {alAire ? (
              <>
                <p className="mt-3 text-2xl font-extrabold">{alAire.nombre}</p>
                <p className="mt-1 text-sm text-white/65">Con {alAire.locutores.map((l) => locutorPorId(l)?.nombre).join(" y ")} · {hh(alAire.inicio)} a {hh(alAire.fin)}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{alAire.descripcion}</p>
              </>
            ) : (
              <>
                <p className="mt-3 text-2xl font-extrabold">Selección musical</p>
                <p className="mt-2 text-sm text-white/70">En este horario la emisora transmite música continua. Revisa la programación para ver el próximo programa.</p>
              </>
            )}
            <p className="mt-5 text-xs text-white/80">Usa el reproductor de abajo para escuchar la señal de prueba.</p>
          </section>

          <section aria-labelledby="fm-hoy">
            <h2 id="fm-hoy" className="text-xl font-bold">Hoy, {DIAS.find((d) => d.id === hoy)!.nombre.toLowerCase()}</h2>
            {delDia.length ? (
              <ul className="mt-4 divide-y divide-white/10 rounded-xl ring-1 ring-white/10">
                {delDia.map((p) => (
                  <li key={p.id} className="flex flex-wrap items-baseline gap-x-5 gap-y-1 px-4 py-3">
                    <span className="w-24 shrink-0 text-sm tabular-nums text-white/80">{hh(p.inicio)}–{hh(p.fin)}</span>
                    <span className="font-semibold">{p.nombre}</span>
                    <span className="text-sm text-white/80">{p.locutores.map((l) => locutorPorId(l)?.nombre.split(" ")[0]).join(" y ")}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 rounded-xl border border-dashed border-white/25 p-6 text-white/65">Hoy no hay programas en vivo. ¡Escucha nuestra selección musical!</p>
            )}
          </section>
        </div>
      </Contenedor>

      <section className="bg-black/20">
        <Contenedor>
          <h2 className="text-2xl font-extrabold">Las voces de Frecuencia Mix</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {LOCUTORES.map((l) => (
              <li key={l.id} className="overflow-hidden rounded-2xl ring-1 ring-white/10" style={{ background: COLOR.panel }}>
                <img src={rutaAsset(l.imagen)} alt={l.alt} loading="lazy" className="aspect-[4/5] w-full object-cover object-top" />
                <div className="p-5"><h3 className="font-bold">{l.nombre}</h3><p className="mt-2 text-sm text-white/65">{l.bio}</p></div>
              </li>
            ))}
          </ul>
        </Contenedor>
      </section>

      <Contenedor>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-extrabold">Música y cultura</h2>
          <Link to={`${BASE}/musica`} className="text-sm font-semibold hover:underline" style={{ color: COLOR.tealClaro }}>Ver todo →</Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {ARTICULOS.slice(0, 2).map((a) => (
            <Link key={a.id} to={`${BASE}/musica#${a.id}`} className="group flex gap-5 rounded-2xl p-4 ring-1 ring-white/10 hover:ring-[#14b8a6]/50" style={{ background: COLOR.panel }}>
              <img src={rutaAsset(a.imagen)} alt={a.alt} loading="lazy" className="h-28 w-28 shrink-0 rounded-xl object-cover" />
              <div><h3 className="font-bold group-hover:underline">{a.titulo}</h3><p className="mt-2 text-sm text-white/65">{a.resumen}</p></div>
            </Link>
          ))}
        </div>
      </Contenedor>
    </>
  );
}

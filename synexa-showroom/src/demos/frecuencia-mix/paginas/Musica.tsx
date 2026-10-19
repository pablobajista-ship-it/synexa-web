import { rutaAsset } from "@/utilidades/assets";
import { ARTICULOS, BANNER, COLOR } from "../datos";
import { Contenedor, Titulo } from "./Comun";

export function Musica() {
  return (
    <>
      <div className="relative isolate overflow-hidden">
        <img src={rutaAsset(BANNER)} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#070f2b] to-transparent" />
        <Contenedor className="py-20"><Titulo etiqueta="Música y cultura" texto="Notas, historias y tendencias del mundo de la música.">Para seguir escuchando</Titulo></Contenedor>
      </div>
      <Contenedor className="pt-0">
        <div className="grid gap-8 md:grid-cols-2">
          {ARTICULOS.map((a) => (
            <article key={a.id} id={a.id} className="scroll-mt-32 overflow-hidden rounded-2xl ring-1 ring-white/10" style={{ background: COLOR.panel }}>
              <img src={rutaAsset(a.imagen)} alt={a.alt} loading="lazy" className="aspect-[16/9] w-full object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-bold">{a.titulo}</h2>
                <p className="mt-2 text-sm text-white/70">{a.resumen}</p>
                <details className="group mt-4">
                  <summary className="cursor-pointer text-sm font-semibold marker:content-none" style={{ color: COLOR.tealClaro }}>
                    <span className="group-open:hidden">Leer más ▾</span><span className="hidden group-open:inline">Leer menos ▴</span>
                  </summary>
                  <div className="mt-3 space-y-3 text-sm leading-relaxed text-white/75">{a.cuerpo.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}</div>
                </details>
              </div>
            </article>
          ))}
        </div>
      </Contenedor>
    </>
  );
}

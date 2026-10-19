import { Link, useSearchParams } from "react-router-dom";
import { formatoCLP } from "@/utilidades/formato";
import { BASE, EVENTOS, TAMANOS, recomendar, type EventoId, type Tamano } from "../datos";
import { Contenedor, Titulo } from "./Comun";

export function Recomendador() {
  const [params, setParams] = useSearchParams();
  const evento = (EVENTOS.some((e) => e.id === params.get("evento")) ? params.get("evento") : "") as EventoId | "";
  const tamano = (TAMANOS.some((t) => t.id === params.get("tamano")) ? params.get("tamano") : "") as Tamano | "";
  const fijar = (k: string, v: string) => {
    const n = new URLSearchParams(params);
    n.set(k, v);
    setParams(n, { replace: true });
  };

  const rec = evento && tamano ? recomendar(evento, tamano) : null;
  const ev = EVENTOS.find((e) => e.id === evento);

  return (
    <Contenedor>
      <Titulo etiqueta="Recomendador" texto="Responde dos preguntas y te sugerimos una combinación de equipos para empezar a cotizar.">¿Qué necesita tu evento?</Titulo>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <fieldset>
          <legend className="mb-3 font-semibold">1. Tipo de evento</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {EVENTOS.map((e) => (
              <label key={e.id} className={`cursor-pointer rounded-xl p-4 ring-1 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[#a98bf0] ${evento === e.id ? "bg-[#7c4ddb]/25 ring-[#7c4ddb]" : "bg-[#17173f] ring-white/10 hover:ring-white/30"}`}>
                <input type="radio" name="evento" value={e.id} checked={evento === e.id} onChange={() => fijar("evento", e.id)} className="sr-only" />
                <span className="block font-semibold">{e.nombre}</span>
                <span className="mt-1 block text-xs text-white/65">{e.descripcion}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-3 font-semibold">2. Tamaño del evento</legend>
          <div className="space-y-3">
            {TAMANOS.map((t) => (
              <label key={t.id} className={`flex cursor-pointer items-center gap-3 rounded-xl p-4 ring-1 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[#a98bf0] ${tamano === t.id ? "bg-[#7c4ddb]/25 ring-[#7c4ddb]" : "bg-[#17173f] ring-white/10 hover:ring-white/30"}`}>
                <input type="radio" name="tamano" value={t.id} checked={tamano === t.id} onChange={() => fijar("tamano", t.id)} className="h-4 w-4 accent-[#7c4ddb]" />
                <span className="text-sm font-medium">{t.nombre}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <section className="mt-12" aria-live="polite">
        {rec && ev ? (
          <div className="rounded-2xl bg-[#17173f] p-6 ring-1 ring-white/10">
            <h2 className="text-2xl font-bold">Sugerencia para: {ev.nombre.toLowerCase()}, {TAMANOS.find((t) => t.id === tamano)!.nombre.toLowerCase()}</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <caption className="sr-only">Equipos sugeridos</caption>
                <thead className="text-xs uppercase tracking-wider text-white/80"><tr><th scope="col" className="pb-3">Equipo</th><th scope="col" className="pb-3">Por qué</th><th scope="col" className="pb-3 text-right">Cant.</th><th scope="col" className="pb-3 text-right">Subtotal</th></tr></thead>
                <tbody className="divide-y divide-white/10">
                  {rec.lineas.map((l) => (
                    <tr key={l.producto.id}>
                      <td className="py-3 pr-4 font-medium"><Link to={`${BASE}/equipo/${l.producto.id}`} className="hover:text-[#a98bf0]">{l.producto.nombre}</Link></td>
                      <td className="py-3 pr-4 text-white/65">{l.motivo}</td>
                      <td className="py-3 text-right tabular-nums">{l.cantidad}</td>
                      <td className="py-3 text-right tabular-nums">{formatoCLP(l.producto.precio * l.cantidad)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 flex flex-wrap items-baseline justify-between gap-3 border-t border-white/10 pt-4">
              <span className="text-white/70">Total referencial neto + IVA</span>
              <strong className="text-2xl tabular-nums">{formatoCLP(rec.total)}</strong>
            </p>
            <p className="mt-4 rounded-md bg-black/30 p-3 text-xs leading-relaxed text-white/80">
              Es una guía comercial para iniciar la cotización, no un cálculo de ingeniería. Las cantidades reales dependen del espacio, la altura y el montaje; un asesor las confirma.
            </p>
            <div className="mt-5"><Link to={`${BASE}/consulta`} className="inline-flex rounded-md bg-[#7c4ddb] px-6 py-3 text-sm font-semibold hover:bg-[#8b5fe6]">Pedir cotización de esta sugerencia</Link></div>
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-white/25 p-8 text-center text-white/65">Elige un tipo de evento y un tamaño para ver la sugerencia.</p>
        )}
      </section>
    </Contenedor>
  );
}

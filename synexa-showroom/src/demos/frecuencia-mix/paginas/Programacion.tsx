import { useState } from "react";
import { rutaAsset } from "@/utilidades/assets";
import { COLOR, DIAS, LOCUTORES, PROGRAMAS, locutorPorId, type DiaId } from "../datos";
import { Contenedor, Titulo } from "./Comun";

const ORDEN: DiaId[] = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"];
const hh = (n: number) => `${String(n === 24 ? 0 : n).padStart(2, "0")}:00`;

export function Programacion() {
  const [dia, setDia] = useState<DiaId>(ORDEN[new Date().getDay()]);
  const programas = PROGRAMAS.filter((p) => (p.dias as readonly DiaId[]).includes(dia)).sort((a, b) => a.inicio - b.inicio);
  const nombreDia = DIAS.find((d) => d.id === dia)!.nombre;

  return (
    <Contenedor>
      <Titulo etiqueta="Programación" texto="Elige un día para ver los programas y quién los conduce. Fuera de esos horarios, la emisora transmite selección musical.">Qué suena y cuándo</Titulo>
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Día de la semana">
        {DIAS.map((d) => (
          <button key={d.id} type="button" aria-pressed={dia === d.id} onClick={() => setDia(d.id)} className={`rounded-full px-4 py-2 text-sm font-semibold ${dia === d.id ? "text-[#070f2b]" : "bg-white/10 text-white hover:bg-white/20"}`} style={dia === d.id ? { background: COLOR.teal } : undefined}>
            <span aria-hidden="true">{d.corto}</span><span className="sr-only">{d.nombre}</span>
          </button>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-bold">{nombreDia}</h2>
      {programas.length ? (
        <ol className="mt-4 space-y-4">
          {programas.map((p) => (
            <li key={p.id} className="rounded-xl p-5 ring-1 ring-white/10" style={{ background: COLOR.panel }}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-bold">{p.nombre}</h3>
                <p className="text-sm tabular-nums" style={{ color: COLOR.tealClaro }}>{hh(p.inicio)} a {hh(p.fin)}</p>
              </div>
              <p className="mt-2 text-sm text-white/70">{p.descripcion}</p>
              <p className="mt-3 text-sm text-white/80">Conducción: {p.locutores.map((l) => locutorPorId(l)?.nombre).join(" y ")}</p>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-4 rounded-xl border border-dashed border-white/25 p-8 text-center text-white/65">No hay programas en vivo este día. Escucha nuestra selección musical.</p>
      )}

      <h2 className="mt-16 text-xl font-bold">Quiénes conducen</h2>
      <ul className="mt-6 grid gap-6 sm:grid-cols-3">
        {LOCUTORES.map((l) => (
          <li key={l.id} className="flex gap-4 rounded-xl p-4 ring-1 ring-white/10" style={{ background: COLOR.panel }}>
            <img src={rutaAsset(l.imagen)} alt={l.alt} loading="lazy" className="h-20 w-20 shrink-0 rounded-full object-cover object-top" />
            <div><h3 className="font-bold">{l.nombre}</h3><p className="mt-1 text-sm text-white/65">{l.bio}</p></div>
          </li>
        ))}
      </ul>
    </Contenedor>
  );
}

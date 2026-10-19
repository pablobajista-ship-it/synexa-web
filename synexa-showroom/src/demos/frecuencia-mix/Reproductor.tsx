import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BASE, CANCIONES, COLOR, locutorPorId, PROGRAMAS, type DiaId } from "./datos";
import { crearSenal, type Senal } from "./senal";

const ORDEN_DIAS: DiaId[] = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"];

/** Programa al aire según el reloj del visitante, o null si la emisora está en programación musical. */
export function programaAlAire(ahora = new Date()) {
  const dia = ORDEN_DIAS[ahora.getDay()];
  const h = ahora.getHours() + ahora.getMinutes() / 60;
  return PROGRAMAS.find((p) => (p.dias as readonly DiaId[]).includes(dia) && h >= p.inicio && h < p.fin) ?? null;
}

export function Reproductor() {
  const [sonando, setSonando] = useState(false);
  const [volumen, setVolumen] = useState(0.5);
  const [tema, setTema] = useState(0);
  const senal = useRef<Senal | null>(null);
  const [ahora, setAhora] = useState(() => new Date());

  // La señal se crea una sola vez y se libera al salir de la demo.
  useEffect(() => {
    senal.current = crearSenal();
    return () => {
      senal.current?.detener();
    };
  }, []);

  // «Ahora suena» rota cada 30 s; el reloj se actualiza cada minuto.
  useEffect(() => {
    const a = window.setInterval(() => setTema((t) => (t + 1) % CANCIONES.length), 30000);
    const b = window.setInterval(() => setAhora(new Date()), 60000);
    return () => {
      window.clearInterval(a);
      window.clearInterval(b);
    };
  }, []);

  const alAire = useMemo(() => programaAlAire(ahora), [ahora]);
  const cancion = CANCIONES[tema];

  const alternar = () => {
    if (sonando) senal.current?.detener();
    else senal.current?.iniciar();
    setSonando((s) => !s);
  };

  return (
    <div role="region" aria-label="Reproductor de Frecuencia Mix" className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0b1740]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <button
          type="button"
          onClick={alternar}
          aria-pressed={sonando}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-[#070f2b] transition-transform hover:scale-105"
          style={{ background: COLOR.teal }}
        >
          <span className="sr-only">{sonando ? "Pausar la señal" : "Reproducir la señal"}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{sonando ? <path d="M6 5h4v14H6zM14 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}</svg>
        </button>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider" style={{ color: COLOR.tealClaro }}>
            <span className={`h-2 w-2 rounded-full ${sonando ? "animate-pulse bg-red-400" : "bg-white/30"}`} aria-hidden="true" />
            {sonando ? "En vivo" : "Pausado"}{alAire ? ` · ${alAire.nombre}` : ""}
          </p>
          <p className="truncate text-sm font-semibold" aria-live="off">{cancion.titulo} <span className="font-normal text-white/80">· {cancion.artista}</span></p>
          <p className="hidden text-[11px] text-white/80 sm:block">Señal de prueba generada en tu navegador. No es música real: las canciones y artistas mostrados son ficticios.</p>
        </div>
        <label className="hidden items-center gap-2 text-xs text-white/70 sm:flex">
          Volumen
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volumen}
            onChange={(e) => {
              const v = Number(e.target.value);
              setVolumen(v);
              senal.current?.volumen(v);
            }}
            className="w-24 accent-[#14b8a6]"
          />
        </label>
        {alAire && (
          <Link to={`${BASE}/programacion`} className="hidden text-xs font-semibold text-white/80 underline-offset-4 hover:underline md:block">
            Con {alAire.locutores.map((l) => locutorPorId(l)?.nombre.split(" ")[0]).join(" y ")}
          </Link>
        )}
      </div>
    </div>
  );
}

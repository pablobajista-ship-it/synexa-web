import { useEffect, useRef, useState } from "react";
import { crearSenal, type Senal } from "../frecuencia-mix/senal";

interface Props {
  /** Nombre de la emisora. */
  emisora: string;
  /** Texto de «ahora suena» (programa al aire o tema). */
  ahora: string;
  fondo: string;
  acento: string;
  texto?: string;
}

/**
 * Reproductor de las radios de demostración. Genera una señal de prueba con Web Audio
 * (sin archivos ni música de terceros) y lo declara en pantalla. Se libera al desmontar.
 */
export function ReproductorRadio({ emisora, ahora, fondo, acento, texto = "#fff" }: Props) {
  const [sonando, setSonando] = useState(false);
  const [volumen, setVolumen] = useState(0.5);
  const senal = useRef<Senal | null>(null);

  useEffect(() => {
    senal.current = crearSenal();
    return () => senal.current?.detener();
  }, []);

  const alternar = () => {
    if (sonando) senal.current?.detener();
    else senal.current?.iniciar();
    setSonando((s) => !s);
  };

  return (
    <div role="region" aria-label={`Reproductor de ${emisora}`} className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 backdrop-blur" style={{ background: `${fondo}f2`, color: texto }}>
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <button type="button" onClick={alternar} aria-pressed={sonando} className="grid h-12 w-12 shrink-0 place-items-center rounded-full transition-transform hover:scale-105" style={{ background: acento, color: fondo }}>
          <span className="sr-only">{sonando ? "Pausar la señal" : "Reproducir la señal"}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{sonando ? <path d="M6 5h4v14H6zM14 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}</svg>
        </button>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider" style={{ color: acento }}>
            <span className={`h-2 w-2 rounded-full ${sonando ? "animate-pulse bg-red-400" : "bg-white/30"}`} aria-hidden="true" />
            {sonando ? "En vivo" : "Pausado"} · {emisora}
          </p>
          <p className="truncate text-sm font-semibold">{ahora}</p>
          <p className="hidden text-[11px] opacity-75 sm:block">Señal de prueba generada en tu navegador. No es música real: programas, locutores y canciones son ficticios.</p>
        </div>
        <label className="hidden items-center gap-2 text-xs opacity-80 sm:flex">
          Volumen
          <input type="range" min={0} max={1} step={0.05} value={volumen} onChange={(e) => { const v = Number(e.target.value); setVolumen(v); senal.current?.volumen(v); }} className="w-24" style={{ accentColor: acento }} />
        </label>
      </div>
    </div>
  );
}

export const hhmm = (n: number) => `${String(n === 24 ? 0 : n).padStart(2, "0")}:00`;
export type Dia = "lun" | "mar" | "mie" | "jue" | "vie" | "sab" | "dom";
export const ORDEN_DIAS: Dia[] = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"];
export const DIAS_SEMANA: { id: Dia; nombre: string; corto: string }[] = [
  { id: "lun", nombre: "Lunes", corto: "Lun" }, { id: "mar", nombre: "Martes", corto: "Mar" }, { id: "mie", nombre: "Miércoles", corto: "Mié" },
  { id: "jue", nombre: "Jueves", corto: "Jue" }, { id: "vie", nombre: "Viernes", corto: "Vie" }, { id: "sab", nombre: "Sábado", corto: "Sáb" }, { id: "dom", nombre: "Domingo", corto: "Dom" },
];

export interface ProgramaRadio { id: string; nombre: string; locutores: readonly string[]; dias: readonly Dia[]; inicio: number; fin: number; descripcion: string }

export function programaAlAire<T extends ProgramaRadio>(programas: readonly T[], ahora = new Date()): T | null {
  const dia = ORDEN_DIAS[ahora.getDay()];
  const h = ahora.getHours() + ahora.getMinutes() / 60;
  return programas.find((p) => p.dias.includes(dia) && h >= p.inicio && h < p.fin) ?? null;
}

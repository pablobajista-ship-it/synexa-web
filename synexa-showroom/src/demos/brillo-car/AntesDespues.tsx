import { useState } from "react";
import { rutaAsset } from "@/utilidades/assets";

/** Comparador antes/después accesible: un control deslizante nativo mueve la línea de corte. */
export function AntesDespues() {
  const [pos, setPos] = useState(50);
  return (
    <div>
      <div className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl bg-black ring-1 ring-white/10">
        <img src={rutaAsset("assets/brillo-car/despues.webp")} alt="Auto después del tratamiento de detailing: pintura profunda y brillante" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        <img
          src={rutaAsset("assets/brillo-car/antes.webp")}
          alt="El mismo auto antes del tratamiento: pintura opaca con marcas"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          draggable={false}
        />
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgba(47,107,255,.9)]" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-xs font-bold text-[#14161b]" aria-hidden="true">↔</span>
        </div>
        <span className="absolute left-3 top-3 rounded bg-black/70 px-2 py-1 text-xs font-semibold text-white">ANTES</span>
        <span className="absolute right-3 top-3 rounded bg-[#2a62f5] px-2 py-1 text-xs font-semibold text-white">DESPUÉS</span>
      </div>
      <label className="mt-4 block">
        <span className="sr-only">Deslizar para comparar antes y después</span>
        <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} className="w-full accent-[#2f6bff]" aria-valuetext={`${pos}% muestra el antes`} />
      </label>
    </div>
  );
}

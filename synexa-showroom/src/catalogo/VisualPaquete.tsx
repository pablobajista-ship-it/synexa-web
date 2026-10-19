import type { Marca } from "@/datos/tipos";
import { IsotipoMarca } from "@/componentes/IsotipoMarca";

/**
 * Portada visual de un paquete. Mientras no exista la fotografía aprobada
 * (Fase 2, FAL) se compone con la identidad vectorial de la empresa ficticia.
 * Si `foto` existe, se usa como imagen principal.
 */
export function VisualPaquete({ marca, foto, className = "" }: { marca: Marca; foto?: string; className?: string }) {
  const [fondo, principal, acento] = marca.colores;
  return (
    <div className={`relative isolate overflow-hidden ${className}`} style={{ background: fondo }}>
      {foto ? (
        <img src={foto} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      ) : (
        <>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <linearGradient id={`g-${marca.id}`} x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor={principal} stopOpacity="0.95" />
                <stop offset="1" stopColor={principal} stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <path d="M-20 300 L-20 190 C90 120 170 190 260 110 C330 50 380 70 430 20 V300Z" fill={`url(#g-${marca.id})`} />
            <circle cx="320" cy="82" r="74" fill={acento} opacity="0.07" />
            <circle cx="320" cy="82" r="38" fill={acento} opacity="0.09" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <IsotipoMarca marca={marca} size={72} />
          </div>
        </>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10">
        <p className="text-sm font-semibold text-white">{marca.nombre}</p>
        <p className="text-xs text-white/75">{marca.rubro}</p>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import type { Paquete } from "@/datos/tipos";
import { IVA_LABEL } from "@/datos/catalogo";
import { formatoCLP } from "@/utilidades/formato";
import { LogoMark } from "@/componentes/Logo";

/**
 * Barra discreta de las demostraciones. Mantiene el contexto comercial
 * (servicio y precio) y permite volver al catálogo conservando los filtros.
 */
export function BarraDemo({ paquete, busqueda, onReiniciar }: { paquete: Paquete; busqueda: string; onReiniciar?: () => void }) {
  return (
    <div className="sticky top-0 z-50 flex h-11 items-center justify-between gap-4 bg-navy px-4 text-xs text-white shadow">
      <p className="flex min-w-0 items-center gap-3">
        <LogoMark size={22} />
        <span className="hidden font-semibold sm:inline">Demostración SYNEXA</span>
        <span className="hidden text-white/80 sm:inline" aria-hidden="true">|</span>
        <span className="truncate text-white/85">{paquete.nombre}</span>
      </p>
      <div className="flex items-center gap-4">
        <span className="hidden font-semibold tabular-nums md:block">
          Desde {formatoCLP(paquete.precio)} {IVA_LABEL}
        </span>
        {onReiniciar && (
          <button type="button" onClick={onReiniciar} className="rounded-md px-3 py-1.5 font-semibold text-white/80 hover:bg-white/10">
            Reiniciar demo
          </button>
        )}
        <Link to={`/servicios-y-precios${busqueda}`} className="rounded-md bg-white/10 px-3 py-1.5 font-semibold hover:bg-white/20">
          ← Volver al catálogo
        </Link>
      </div>
    </div>
  );
}

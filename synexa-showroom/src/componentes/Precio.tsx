import { IVA_LABEL } from "@/datos/catalogo";
import { formatoCLP } from "@/utilidades/formato";

export function Precio({ valor, grande = false }: { valor: number; grande?: boolean }) {
  return (
    <p className="leading-none">
      <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">Desde</span>
      <span className={`font-display font-semibold tabular-nums ${grande ? "text-4xl" : "text-2xl"}`}>{formatoCLP(valor)}</span>
      <span className="ml-1.5 text-xs font-medium text-muted">{IVA_LABEL}</span>
    </p>
  );
}

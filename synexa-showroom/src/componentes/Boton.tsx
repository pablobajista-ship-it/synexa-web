import { Link, type LinkProps } from "react-router-dom";

type Variante = "primario" | "secundario" | "fantasma" | "claro";

const ESTILOS: Record<Variante, string> = {
  primario: "bg-blue text-white hover:bg-blue-dark shadow-sm",
  secundario: "bg-white text-navy ring-1 ring-inset ring-line hover:bg-surface",
  fantasma: "text-blue hover:text-blue-dark",
  claro: "bg-white text-navy hover:bg-white/90",
};

export function BotonEnlace({ variante = "primario", className = "", ...props }: LinkProps & { variante?: Variante }) {
  return (
    <Link
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${ESTILOS[variante]} ${className}`}
    />
  );
}

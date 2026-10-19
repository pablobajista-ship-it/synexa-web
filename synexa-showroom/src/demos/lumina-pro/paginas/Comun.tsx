import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { rutaAsset } from "@/utilidades/assets";
import { formatoCLP } from "@/utilidades/formato";
import { BASE, type Producto } from "../datos";
import { useComparador } from "../almacen";

export const Contenedor = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-6xl px-4 py-14 ${className}`}>{children}</div>
);

export function Titulo({ etiqueta, children, texto }: { etiqueta?: string; children: ReactNode; texto?: string }) {
  return (
    <div className="max-w-2xl">
      {etiqueta && <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a98bf0]">{etiqueta}</p>}
      <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">{children}</h1>
      {texto && <p className="mt-3 text-white/70">{texto}</p>}
    </div>
  );
}

export const BotonPrimario = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={to} className="inline-flex items-center rounded-md bg-[#7c4ddb] px-6 py-3 text-sm font-semibold text-white hover:bg-[#8b5fe6]">{children}</Link>
);

export function BotonComparar({ id, nombre }: { id: string; nombre: string }) {
  const { esta, llena, alternar } = useComparador();
  const activo = esta(id);
  const bloqueado = !activo && llena;
  return (
    <button
      type="button"
      onClick={() => alternar(id)}
      disabled={bloqueado}
      aria-pressed={activo}
      title={bloqueado ? "Puedes comparar hasta 3 equipos" : undefined}
      className={`rounded-md px-3 py-2 text-xs font-semibold ring-1 ring-inset transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${activo ? "bg-[#7c4ddb] text-white ring-[#7c4ddb]" : "text-white ring-white/25 hover:bg-white/10"}`}
    >
      {activo ? "✓ En comparador" : "Comparar"}
      <span className="sr-only"> {nombre}</span>
    </button>
  );
}

export function TarjetaProducto({ p }: { p: Producto }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-[#17173f] ring-1 ring-white/10 transition-colors hover:ring-[#7c4ddb]/60">
      <Link to={`${BASE}/equipo/${p.id}`} tabIndex={-1} aria-hidden="true">
        <img src={rutaAsset(p.imagen)} alt="" loading="lazy" className="aspect-square w-full object-cover" />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#a98bf0]">{p.categoria}</p>
        <h3 className="mt-1 font-bold leading-snug"><Link to={`${BASE}/equipo/${p.id}`} className="hover:text-[#a98bf0]">{p.nombre}</Link></h3>
        <p className="mt-2 flex-1 text-sm text-white/65">{p.resumen}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-medium text-white/80">
          <li className="rounded bg-white/10 px-2 py-0.5">{p.potenciaW} W</li>
          <li className="rounded bg-white/10 px-2 py-0.5">IP{p.ip}</li>
          {p.dmx && <li className="rounded bg-white/10 px-2 py-0.5">DMX</li>}
        </ul>
        <div className="mt-4 flex items-center justify-between gap-2">
          <p className="font-bold tabular-nums">{formatoCLP(p.precio)}</p>
          <BotonComparar id={p.id} nombre={p.nombre} />
        </div>
      </div>
    </article>
  );
}

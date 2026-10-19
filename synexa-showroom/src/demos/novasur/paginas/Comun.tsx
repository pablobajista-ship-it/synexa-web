import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { rutaAsset } from "@/utilidades/assets";
import { COLOR } from "../datos";

export function Encabezado({ etiqueta, titulo, texto, imagen }: { etiqueta: string; titulo: string; texto?: string; imagen?: string }) {
  return (
    <section className="relative isolate overflow-hidden text-white" style={{ background: COLOR.petroleo }}>
      {imagen && <img src={rutaAsset(imagen)} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" />}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5fb3c4]">{etiqueta}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">{titulo}</h1>
        {texto && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75">{texto}</p>}
      </div>
    </section>
  );
}

export const Contenedor = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-6xl px-4 py-16 ${className}`}>{children}</div>
);

export function Boton({ to, children, claro = false }: { to: string; children: ReactNode; claro?: boolean }) {
  return (
    <Link to={to} className={`inline-flex items-center rounded-md px-6 py-3 text-sm font-semibold transition-colors ${claro ? "bg-white text-[#0e3b4a] hover:bg-white/90" : "bg-[#246b7a] text-white hover:bg-[#236a7a]"}`}>
      {children}
    </Link>
  );
}

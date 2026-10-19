import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { COLOR } from "../datos";

export const Contenedor = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-6xl px-4 py-14 ${className}`}>{children}</div>
);

export function Titulo({ etiqueta, children, texto }: { etiqueta?: string; children: ReactNode; texto?: string }) {
  return (
    <div className="max-w-2xl">
      {etiqueta && <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: COLOR.tealClaro }}>{etiqueta}</p>}
      <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">{children}</h1>
      {texto && <p className="mt-3 text-white/70">{texto}</p>}
    </div>
  );
}

export const BotonLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={to} className="inline-flex items-center rounded-md px-6 py-3 text-sm font-bold text-[#070f2b] hover:opacity-90" style={{ background: COLOR.teal }}>{children}</Link>
);

export const entrada = "w-full rounded-md border border-white/20 bg-[#070f2b] px-3.5 py-2.5 text-white placeholder-white/35 outline-none focus:border-[#14b8a6] focus:ring-2 focus:ring-[#14b8a6]/40";

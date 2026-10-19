import { Link } from "react-router-dom";
import type { Paquete } from "@/datos/tipos";
import { lineaPorId } from "@/datos/catalogo";
import { marcaPorId } from "@/datos/marcas";
import { Precio } from "@/componentes/Precio";
import { VisualPaquete } from "./VisualPaquete";
import { FOTO_PORTADA } from "@/demos/registro";
import { rutaAsset } from "@/utilidades/assets";

export function TarjetaPaquete({ paquete, busqueda }: { paquete: Paquete; busqueda: string }) {
  const marca = marcaPorId(paquete.demo)!;
  const linea = lineaPorId(paquete.linea);
  const demoLista = marca.estado !== "pendiente";
  const ficha = `/servicios-y-precios/${paquete.id}`;
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line transition-shadow hover:shadow-xl hover:shadow-navy/10">
      <Link to={ficha} state={{ busqueda }} aria-hidden tabIndex={-1}>
        <VisualPaquete marca={marca} foto={FOTO_PORTADA[marca.id] ? rutaAsset(FOTO_PORTADA[marca.id]) : undefined} className="aspect-[4/3]" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-dark">{linea.nombre}</p>
        <h3 className="mt-1 text-lg font-bold leading-snug">
          <Link to={ficha} state={{ busqueda }} className="hover:text-blue">
            {paquete.nombre}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{paquete.resumen}</p>
        <div className="mt-5 border-t border-line pt-4">
          <Precio valor={paquete.precio} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm font-semibold">
          <Link to={ficha} state={{ busqueda }} className="rounded-lg bg-blue px-3 py-2.5 text-center text-white hover:bg-blue-dark">
            Ver características
          </Link>
          {demoLista ? (
            <Link to={`/demos/${marca.id}`} state={{ busqueda }} className="rounded-lg px-3 py-2.5 text-center text-navy ring-1 ring-inset ring-line hover:bg-surface">
              Ver demostración
            </Link>
          ) : (
            <span className="rounded-lg bg-surface px-3 py-2.5 text-center text-xs font-medium leading-tight text-muted">
              Demostración en preparación
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

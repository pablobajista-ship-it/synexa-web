import { Link } from "react-router-dom";
import { rutaAsset } from "@/utilidades/assets";
import { formatoCLP } from "@/utilidades/formato";
import { BASE, KITS, productoPorId } from "../datos";
import { Contenedor, Titulo } from "./Comun";

export function Kits() {
  return (
    <Contenedor>
      <Titulo etiqueta="Kits sugeridos" texto="Combinaciones armadas por nuestro equipo comercial. Los precios son la suma de cada equipo.">Kits listos para tu evento</Titulo>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {KITS.map((k) => {
          const lineas = k.items.map(([id, cant]) => ({ p: productoPorId(id)!, cant }));
          const total = lineas.reduce((a, l) => a + l.p.precio * l.cant, 0);
          return (
            <article key={k.id} className="flex flex-col overflow-hidden rounded-2xl bg-[#17173f] ring-1 ring-white/10">
              <div className="flex gap-1 bg-black/30 p-1" aria-hidden="true">
                {lineas.slice(0, 3).map((l) => <img key={l.p.id} src={rutaAsset(l.p.imagen)} alt="" loading="lazy" className="aspect-square min-w-0 flex-1 rounded-lg object-cover" />)}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-lg font-bold">{k.nombre}</h2>
                <p className="text-sm text-white/80">{k.para}</p>
                <ul className="mt-4 flex-1 space-y-2 text-sm">
                  {lineas.map((l) => (
                    <li key={l.p.id} className="flex justify-between gap-3"><Link to={`${BASE}/equipo/${l.p.id}`} className="hover:text-[#a98bf0]">{l.cant} × {l.p.nombre}</Link></li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-white/10 pt-4"><span className="block text-xs text-white/80">Total referencial neto + IVA</span><strong className="text-2xl tabular-nums">{formatoCLP(total)}</strong></p>
                <Link to={`${BASE}/consulta`} className="mt-4 inline-flex justify-center rounded-md bg-[#7c4ddb] px-5 py-3 text-sm font-semibold hover:bg-[#8b5fe6]">Consultar este kit</Link>
              </div>
            </article>
          );
        })}
      </div>
    </Contenedor>
  );
}

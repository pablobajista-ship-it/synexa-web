import { Link, useParams } from "react-router-dom";
import { rutaAsset } from "@/utilidades/assets";
import { BASE } from "../datos";
import { fechaLarga, useNoticias } from "../almacen";
import { Boton, Contenedor, Encabezado } from "./Comun";

export function ListaNoticias() {
  const { noticias } = useNoticias();
  const publicas = noticias.filter((n) => n.publicada).sort((a, b) => b.fecha.localeCompare(a.fecha));
  return (
    <>
      <Encabezado etiqueta="Noticias" titulo="Novedades de NovaSur." />
      <Contenedor>
        {publicas.length ? (
          <div className="grid gap-8 md:grid-cols-2">
            {publicas.map((n) => (
              <article key={n.id} className="overflow-hidden rounded-xl ring-1 ring-[#d3dde1]">
                {n.imagen && <img src={rutaAsset(n.imagen)} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />}
                <div className="p-6">
                  <time dateTime={n.fecha} className="text-sm text-[#5b727b]">{fechaLarga(n.fecha)}</time>
                  <h2 className="mt-1 text-lg font-bold"><Link to={`${BASE}/noticias/${n.id}`} className="hover:text-[#246b7a]">{n.titulo}</Link></h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#3c5560]">{n.resumen}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[#c3d0d5] p-12 text-center">
            <p className="font-semibold">No hay noticias publicadas.</p>
            <p className="mt-1 text-sm text-[#5b727b]">Vuelve pronto, o publica una desde el panel de administración de la demostración.</p>
          </div>
        )}
      </Contenedor>
    </>
  );
}

export function VerNoticia() {
  const { id } = useParams();
  const { noticias } = useNoticias();
  const n = noticias.find((x) => x.id === id);
  if (!n || !n.publicada) {
    return (
      <Contenedor className="text-center">
        <h1 className="font-display text-3xl font-semibold">Noticia no disponible</h1>
        <p className="mt-2 text-[#5b727b]">Puede haber sido despublicada o eliminada.</p>
        <div className="mt-6"><Boton to={`${BASE}/noticias`}>Ver todas las noticias</Boton></div>
      </Contenedor>
    );
  }
  return (
    <Contenedor className="max-w-3xl">
      <nav aria-label="Ruta de navegación" className="mb-6 text-sm"><Link to={`${BASE}/noticias`} className="text-[#246b7a] hover:underline">← Noticias</Link></nav>
      <time dateTime={n.fecha} className="text-sm text-[#5b727b]">{fechaLarga(n.fecha)}</time>
      <h1 className="mt-2 font-display text-4xl font-semibold leading-tight">{n.titulo}</h1>
      {n.imagen && <img src={rutaAsset(n.imagen)} alt="" className="mt-8 aspect-[16/9] w-full rounded-xl object-cover" />}
      <div className="mt-8 space-y-4 text-lg leading-relaxed text-[#3c5560]">
        {n.cuerpo.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </Contenedor>
  );
}

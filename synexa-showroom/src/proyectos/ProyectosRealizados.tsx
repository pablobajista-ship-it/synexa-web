import { Link } from "react-router-dom";
import { IVA_LABEL, paquetePorId } from "@/datos/catalogo";
import { FECHA_CAPTURAS, PROYECTOS } from "@/datos/proyectos";
import { formatoCLP } from "@/utilidades/formato";
import { rutaAsset } from "@/utilidades/assets";

export function ProyectosRealizados() {
  return (
    <div>
      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">Proyectos realizados</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">Sitios reales, funcionando hoy.</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">Tres proyectos de SYNEXA publicados en internet. Las capturas son de los sitios en producción ({FECHA_CAPTURAS}); cada dato indica si lo vimos funcionando o si proviene de la documentación del proyecto.</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-14 sm:px-6">
        {PROYECTOS.map((p) => {
          const ref = paquetePorId(p.paqueteReferencia)!;
          return (
            <article key={p.id} aria-labelledby={`pr-${p.id}`}>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-teal-dark">{p.rubro}</p>
                  <h2 id={`pr-${p.id}`} className="mt-1 font-display text-3xl font-semibold">{p.nombre}</h2>
                </div>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="rounded-lg px-4 py-2.5 text-sm font-semibold text-blue ring-1 ring-inset ring-line hover:bg-surface">
                  Visitar {p.url.replace("https://", "")}<span className="sr-only"> (se abre en una pestaña nueva)</span> ↗
                </a>
              </div>
              <p className="mt-3 max-w-3xl text-muted">{p.resumen}</p>

              <div className={`mt-8 grid gap-4 ${p.capturas.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                {p.capturas.map((c) => (
                  <figure key={c.archivo} className="overflow-hidden rounded-xl ring-1 ring-line">
                    <img src={rutaAsset(c.archivo)} alt={c.alt} loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
                    <figcaption className="bg-surface p-3 text-xs text-muted">{c.pie}</figcaption>
                  </figure>
                ))}
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-3">
                <section aria-label={`Lo verificado en ${p.nombre}`}>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-teal-dark">Visto en el sitio público</h3>
                  <ul className="mt-3 space-y-2 text-sm">{p.verificado.map((v) => <li key={v} className="flex gap-2"><span aria-hidden="true" className="font-bold text-teal-dark">✓</span>{v}</li>)}</ul>
                </section>
                <section aria-label={`Según la documentación de ${p.nombre}`}>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-blue">Según la documentación del proyecto</h3>
                  <ul className="mt-3 space-y-3 text-sm">{p.documentado.map((d) => <li key={d.texto}><p>{d.texto}</p><p className="mt-0.5 text-xs text-muted">Estado: {d.estado}</p></li>)}</ul>
                </section>
                <section aria-label={`Tecnología de ${p.nombre}`}>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted">Tecnología</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">{p.tecnologia.map((t) => <li key={t} className="rounded-full bg-surface px-3 py-1 text-xs ring-1 ring-inset ring-line">{t}</li>)}</ul>
                  <div className="mt-6 rounded-xl bg-surface p-4 text-sm ring-1 ring-line">
                    <p className="font-semibold">Paquete de referencia: <Link to={`/servicios-y-precios/${ref.id}`} className="text-blue hover:underline">{ref.nombre}</Link></p>
                    <p className="mt-1 text-xs text-muted">Es el paquete del catálogo más cercano por alcance. Su precio base propuesto ({formatoCLP(ref.precio)} {IVA_LABEL}) no es el valor de este proyecto.</p>
                  </div>
                </section>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mx-auto max-w-7xl px-4 pb-14 text-xs text-muted sm:px-6">
        Las capturas muestran los sitios tal como estaban en la fecha indicada y pueden diferir de su estado actual. Los titulares de noticias de terceros que aparecen en la portada de Radio Décadas pertenecen a sus medios.
      </p>
    </div>
  );
}

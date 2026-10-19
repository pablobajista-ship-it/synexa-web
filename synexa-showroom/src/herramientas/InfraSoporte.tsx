import { Link } from "react-router-dom";
import { PLANES_INFRA, PLANES_SOPORTE, SOPORTE_POR_HORA } from "@/datos/infraSoporte";
import { formatoCLP } from "@/utilidades/formato";
import { IVA_LABEL } from "@/datos/catalogo";

const Recomendado = () => <span className="rounded-full bg-teal/15 px-2.5 py-1 text-xs font-semibold text-teal-dark">Recomendado</span>;
const Precio = ({ valor, desde, unidad }: { valor: number | null; desde: boolean; unidad: string }) => (
  <p className="mt-3">
    {valor === null ? <span className="font-display text-2xl font-semibold">A cotizar</span> : (
      <>{desde && <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">Desde</span>}
        <span className="font-display text-3xl font-semibold tabular-nums">{formatoCLP(valor)}</span>
        <span className="ml-1.5 text-xs font-medium text-muted">{IVA_LABEL} / {unidad}</span></>
    )}
  </p>
);
const Lista = ({ items }: { items: string[] }) => <ul className="mt-4 space-y-2 text-sm">{items.map((i) => <li key={i} className="flex gap-2"><span aria-hidden="true" className="font-bold text-teal-dark">✓</span>{i}</li>)}</ul>;

export function InfraSoporte() {
  return (
    <div>
      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">Infraestructura y soporte</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">Después de entregar, tu solución sigue funcionando.</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">Dos servicios mensuales independientes del desarrollo: quién mantiene la infraestructura y quién te acompaña cuando necesitas cambios o ayuda.</p>
        </div>
      </section>

      <section aria-labelledby="is-infra" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 id="is-infra" className="font-display text-3xl font-semibold">Infraestructura administrada</h2>
        <p className="mt-2 max-w-2xl text-muted">Nos encargamos de la infraestructura para que te concentres en tu negocio. Estos valores corresponden a la administración de SYNEXA; el costo del proveedor de infraestructura se informa por separado.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {PLANES_INFRA.map((p) => (
            <article key={p.id} className={`flex flex-col rounded-2xl bg-white p-6 ring-1 ${p.recomendado ? "ring-2 ring-teal" : "ring-line"}`}>
              <div className="flex items-start justify-between gap-2"><h3 className="text-xl font-bold">{p.nombre}</h3>{p.recomendado && <Recomendado />}</div>
              <p className="mt-2 text-sm text-muted">{p.descripcion}</p>
              <Precio valor={p.precio} desde={p.desde} unidad="mes" />
              {p.nota && <p className="mt-2 text-xs text-muted">{p.nota}</p>}
              {p.incluye.length > 0 && <Lista items={p.incluye} />}
              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-blue">Pensado para</p>
              <p className="mt-1 text-sm text-muted">{p.paraProyectos.join(" · ")}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="is-sop" className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h2 id="is-sop" className="font-display text-3xl font-semibold">Continuidad y soporte</h2>
          <p className="mt-2 max-w-2xl text-muted">Planes mensuales de acompañamiento posteriores al período de puesta en marcha de tu proyecto.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PLANES_SOPORTE.map((p) => (
              <article key={p.id} className={`flex flex-col rounded-2xl bg-white p-6 ring-1 ${p.recomendado ? "ring-2 ring-teal" : "ring-line"}`}>
                <div className="flex items-start justify-between gap-2"><h3 className="text-lg font-bold">{p.nombre}</h3>{p.recomendado && <Recomendado />}</div>
                <p className="mt-2 text-sm text-muted">{p.descripcion}</p>
                <Precio valor={p.precio} desde={p.desde} unidad="mes" />
                <Lista items={p.incluye} />
                <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm"><div><dt className="text-xs font-semibold uppercase tracking-wider text-blue">Respuesta</dt><dd>{p.respuesta}</dd></div><div><dt className="text-xs font-semibold uppercase tracking-wider text-blue">Horas incluidas</dt><dd>{p.horas}</dd></div></dl>
                {p.nota && <p className="mt-3 text-xs text-muted">{p.nota}</p>}
              </article>
            ))}
          </div>

          <h3 className="mt-14 font-display text-2xl font-semibold">Soporte sin plan, por hora</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {SOPORTE_POR_HORA.map((p) => (
              <article key={p.id} className="rounded-2xl bg-white p-6 ring-1 ring-line">
                <h4 className="text-lg font-bold">{p.nombre}</h4>
                <Precio valor={p.precio} desde={p.desde} unidad="hora" />
                {p.incluye.length > 0 && <Lista items={p.incluye} />}
                {p.nota && <p className="mt-3 text-xs text-muted">{p.nota}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6">
        <h2 className="font-display text-2xl font-semibold">¿Quieres verlo junto a tu proyecto?</h2>
        <p className="mx-auto mt-2 max-w-xl text-muted">En «Arma tu solución» puedes sumar un plan de infraestructura y uno de soporte al paquete que elijas.</p>
        <Link to="/servicios-y-precios/arma-tu-solucion" className="mt-6 inline-block rounded-lg bg-blue px-5 py-3 text-sm font-semibold text-white hover:bg-blue-dark">Armar mi solución</Link>
        <p className="mt-8 text-xs text-muted">Valores netos en pesos chilenos. Los precios por plan provienen del documento comercial vigente; «Desde» indica que el valor final depende de las características del proyecto.</p>
      </section>
    </div>
  );
}

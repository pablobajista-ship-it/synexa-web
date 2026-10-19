import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FAMILIAS, NECESIDADES, PAQUETES, lineaPorId } from "@/datos/catalogo";
import type { NecesidadId } from "@/datos/tipos";
import { TarjetaPaquete } from "./TarjetaPaquete";
import { TresCostos } from "./TresCostos";
import { rutaAsset } from "@/utilidades/assets";

const TODAS = "todas";

const chip = (activo: boolean) =>
  `rounded-full px-4 py-2 text-sm font-medium transition-colors ${activo ? "bg-navy text-white" : "bg-surface text-navy ring-1 ring-inset ring-line hover:bg-white"}`;

export function PaginaCatalogo() {
  const [params, setParams] = useSearchParams();
  const familia = params.get("familia") ?? TODAS;
  const necesidad = params.get("necesidad") as NecesidadId | null;

  const actualizar = (clave: string, valor: string | null) => {
    const siguiente = new URLSearchParams(params);
    if (valor && valor !== TODAS) siguiente.set(clave, valor);
    else siguiente.delete(clave);
    setParams(siguiente, { replace: true });
  };

  const visibles = useMemo(
    () =>
      PAQUETES.filter(
        (p) =>
          (familia === TODAS || lineaPorId(p.linea).familia === familia) &&
          (!necesidad || p.necesidades.includes(necesidad)),
      ),
    [familia, necesidad],
  );

  const busqueda = params.toString() ? `?${params.toString()}` : "";

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-900 text-white">
        <img
          src={rutaAsset("assets/synexa/hero-servicios.webp")}
          alt=""
          className="absolute inset-y-0 right-0 -z-10 h-full w-full object-cover object-right opacity-60 [mask-image:linear-gradient(to_right,transparent_5%,black_75%)] lg:w-3/4"
        />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <p className="anim-subir text-sm font-semibold uppercase tracking-[0.18em] text-teal">Servicios y Precios</p>
          <h1 className="anim-subir mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.08] sm:text-6xl" style={{ animationDelay: "80ms" }}>
            Conoce, compara y prueba tu próxima solución digital.
          </h1>
          <p className="anim-subir mt-6 max-w-xl text-lg leading-relaxed text-white/75" style={{ animationDelay: "160ms" }}>
            Explora nuestras páginas web, tiendas online y sistemas empresariales. Descubre sus funcionalidades mediante
            demostraciones interactivas y elige la solución que mejor se adapta a tu negocio.
          </p>
          <div className="anim-subir mt-8 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
            <a href="#catalogo" className="rounded-lg bg-teal px-5 py-3 text-sm font-semibold text-navy-900 hover:bg-teal/90">
              Explorar los {PAQUETES.length} paquetes
            </a>
            <Link to="/servicios-y-precios/arma-tu-solucion" className="rounded-lg px-5 py-3 text-sm font-semibold ring-1 ring-inset ring-white/40 hover:bg-white/10">Arma tu solución</Link>
            <Link to="/servicios-y-precios/comparar" className="rounded-lg px-5 py-3 text-sm font-semibold ring-1 ring-inset ring-white/40 hover:bg-white/10">Comparar paquetes</Link>
          </div>
          <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/15 pt-6 text-sm">
            {[
              [String(PAQUETES.length), "paquetes con precio base"],
              [String(FAMILIAS.length), "familias de soluciones"],
              ["Netos", "valores en CLP + IVA"],
            ].map(([n, t]) => (
              <div key={t}>
                <dt className="font-display text-3xl font-semibold">{n}</dt>
                <dd className="mt-1 text-white/65">{t}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="catalogo" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-14 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold">¿Qué necesitas resolver?</h2>
          <p className="mt-2 text-muted">Elige una necesidad y te mostramos solo los paquetes que la cubren.</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filtrar por necesidad">
          <button type="button" aria-pressed={!necesidad} onClick={() => actualizar("necesidad", null)} className={chip(!necesidad)}>
            Todas
          </button>
          {NECESIDADES.map((n) => (
            <button key={n.id} type="button" aria-pressed={necesidad === n.id} onClick={() => actualizar("necesidad", n.id)} className={chip(necesidad === n.id)} title={n.pregunta}>
              {n.etiqueta}
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-line" role="group" aria-label="Familias de soluciones">
          {[{ id: TODAS, nombre: "Todas las familias" }, ...FAMILIAS].map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={familia === f.id}
              onClick={() => actualizar("familia", f.id)}
              className={`-mb-px border-b-2 pb-3 text-sm font-semibold transition-colors ${familia === f.id ? "border-blue text-blue" : "border-transparent text-muted hover:text-navy"}`}
            >
              {f.nombre}
            </button>
          ))}
        </div>
        {familia !== TODAS && <p className="mt-4 text-sm text-muted">{FAMILIAS.find((f) => f.id === familia)?.descripcion}</p>}

        <p className="mt-6 text-sm text-muted" aria-live="polite">
          {visibles.length} {visibles.length === 1 ? "paquete" : "paquetes"}
        </p>

        {visibles.length ? (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibles.map((p) => (
              <TarjetaPaquete key={p.id} paquete={p} busqueda={busqueda} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-line p-10 text-center">
            <p className="font-semibold">Ningún paquete coincide con esa combinación.</p>
            <button type="button" onClick={() => setParams({}, { replace: true })} className="mt-3 text-sm font-semibold text-blue hover:underline">
              Quitar filtros
            </button>
          </div>
        )}
      </section>

      <TresCostos />
    </>
  );
}

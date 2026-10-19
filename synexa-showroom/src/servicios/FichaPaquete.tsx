import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { IVA_LABEL, POR_DEFINIR, familiaDePaquete, lineaPorId, moduloPorId, nivelAnterior, paquetePorId } from "@/datos/catalogo";
import { marcaPorId } from "@/datos/marcas";
import type { Paquete } from "@/datos/tipos";
import { Precio } from "@/componentes/Precio";
import { formatoCLP, formatoPlazo } from "@/utilidades/formato";
import { VisualPaquete } from "@/catalogo/VisualPaquete";
import { FOTO_PORTADA } from "@/demos/registro";
import { rutaAsset } from "@/utilidades/assets";
import { NoEncontrada } from "@/app/NoEncontrada";

const Seccion = ({ n, titulo, children }: { n: number; titulo: string; children: React.ReactNode }) => (
  <section className="border-t border-line py-8 first:border-t-0">
    <h2 className="flex items-baseline gap-3 text-xl font-bold">
      <span className="font-display text-sm font-semibold text-teal-dark" aria-hidden="true">{String(n).padStart(2, "0")}</span>
      {titulo}
    </h2>
    <div className="mt-4 text-[15px] leading-relaxed">{children}</div>
  </section>
);

const Lista = ({ items, marca }: { items: string[]; marca: "si" | "no" }) => (
  <ul className="space-y-2">
    {items.map((t) => (
      <li key={t} className="flex gap-3">
        <span aria-hidden="true" className={`mt-0.5 font-bold ${marca === "si" ? "text-teal-dark" : "text-muted"}`}>{marca === "si" ? "✓" : "–"}</span>
        <span>{t}</span>
      </li>
    ))}
  </ul>
);

export function resumenCotizacion(p: Paquete): string {
  const lineas = [
    `Cotización referencial SYNEXA — ${p.nombre}`,
    `Desarrollo (pago por proyecto): ${formatoCLP(p.precio)} ${IVA_LABEL}`,
    "Infraestructura y servicios de terceros: se informan antes de iniciar el proyecto",
    "Continuidad y soporte mensual: opcional, no incluido en este valor",
    "",
    "Incluye:",
    ...p.incluye.map((i) => `- ${i}`),
    "",
    "No incluye:",
    ...p.noIncluye.map((i) => `- ${i}`),
    "",
    "Valor referencial sujeto a validación del alcance. No constituye una oferta vinculante.",
  ];
  return lineas.join("\n");
}

export function FichaPaquete() {
  const { paqueteId = "" } = useParams();
  const location = useLocation();
  const [copiado, setCopiado] = useState<"si" | "error" | null>(null);

  const paquete = paquetePorId(paqueteId);
  if (!paquete) return <NoEncontrada />;

  const marca = marcaPorId(paquete.demo)!;
  const linea = lineaPorId(paquete.linea);
  const familia = familiaDePaquete(paquete);
  const anterior = nivelAnterior(paquete);
  const busqueda = (location.state as { busqueda?: string } | null)?.busqueda ?? "";
  const demoLista = marca.estado !== "pendiente";

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(resumenCotizacion(paquete));
      setCopiado("si");
    } catch {
      setCopiado("error");
    }
  };

  return (
    <article>
      <div className="bg-navy-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-14">
          <div>
            <nav aria-label="Ruta de navegación" className="text-sm text-white/65">
              <Link to={`/servicios-y-precios${busqueda}`} className="hover:text-white">← Servicios y Precios</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              {familia.nombre}
            </nav>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-teal">{linea.nombre}</p>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">{paquete.nombre}</h1>
            <p className="mt-4 max-w-xl text-lg text-white/75">{paquete.resumen}</p>
            <div className="mt-8 flex flex-wrap items-end gap-x-8 gap-y-4">
              <div className="rounded-xl bg-white px-5 py-4 text-navy"><Precio valor={paquete.precio} grande /></div>
              <div className="flex flex-wrap gap-3">
                <a href="#cotizacion" className="rounded-lg bg-teal px-5 py-3 text-sm font-semibold text-navy-900 hover:bg-teal/90">Solicitar cotización</a>
                {demoLista ? (
                  <Link to={`/demos/${marca.id}`} state={{ busqueda, paqueteId: paquete.id }} className="rounded-lg px-5 py-3 text-sm font-semibold ring-1 ring-inset ring-white/30 hover:bg-white/10">
                    Ver demostración
                  </Link>
                ) : (
                  <span className="rounded-lg px-5 py-3 text-sm text-white/60 ring-1 ring-inset ring-white/15">Demostración en preparación</span>
                )}
              </div>
            </div>
          </div>
          <VisualPaquete marca={marca} foto={FOTO_PORTADA[marca.id] ? rutaAsset(FOTO_PORTADA[marca.id]) : undefined} className="aspect-[16/10] rounded-2xl ring-1 ring-white/10" />
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px]">
        <div>
          <Seccion n={1} titulo="Para quién es"><p>{paquete.publico}</p></Seccion>
          <Seccion n={2} titulo="Problema que resuelve"><p>{paquete.problema}</p></Seccion>
          <Seccion n={3} titulo="Resultado para tu negocio"><p>{paquete.resultado}</p></Seccion>
          <Seccion n={4} titulo="Funcionalidades incluidas"><Lista items={paquete.incluye} marca="si" /></Seccion>
          <Seccion n={5} titulo="Cantidades y límites del paquete">
            <dl className="divide-y divide-line rounded-xl ring-1 ring-line">
              {paquete.limites.map((l) => (
                <div key={l.concepto} className="flex justify-between gap-4 px-4 py-3">
                  <dt className="text-muted">{l.concepto}</dt>
                  <dd className={l.valor ? "font-semibold" : "text-muted"}>{l.valor ?? POR_DEFINIR}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm text-muted">
              Los límites «Por definir» se confirman en la propuesta. Las cantidades que ves en la demostración son solo ejemplos.
            </p>
          </Seccion>
          <Seccion n={6} titulo="No incluido en este paquete"><Lista items={paquete.noIncluye} marca="no" /></Seccion>
          <Seccion n={7} titulo="Plazos">
            <p>
              Entrega estimada: <strong>{formatoPlazo(paquete.plazoSemanas) ?? "se confirma en la propuesta"}</strong>.
              {paquete.puestaEnMarcha && <> Después de la entrega, período de puesta en marcha de <strong>{paquete.puestaEnMarcha} días</strong> para ajustes y correcciones del alcance acordado.</>}
            </p>
          </Seccion>
          <Seccion n={8} titulo="Costos externos posibles">
            <p className="mb-3 text-muted">Son de terceros, no forman parte del precio de desarrollo y se informan antes de comenzar.</p>
            <Lista items={paquete.costosExternos} marca="no" />
          </Seccion>
          <Seccion n={9} titulo={anterior ? `Diferencia con ${anterior.nombre}` : "Primer nivel de su línea"}>
            <p>{paquete.diferenciaNivelAnterior ?? `Es el punto de partida de la línea ${linea.nombre}.`}</p>
          </Seccion>
          <Seccion n={10} titulo="Módulos adicionales posibles">
            <ul className="grid gap-3 sm:grid-cols-2">
              {paquete.modulos.map((id) => {
                const m = moduloPorId(id)!;
                return (
                  <li key={id} className="rounded-xl p-4 ring-1 ring-line">
                    <p className="font-semibold">{m.nombre}</p>
                    <p className="mt-1 text-sm text-muted">{m.descripcion}</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-blue">{m.precio ? formatoCLP(m.precio) : "Por cotizar"}</p>
                  </li>
                );
              })}
            </ul>
          </Seccion>
        </div>

        <aside id="cotizacion" className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl bg-surface p-6 ring-1 ring-line">
            <h2 className="text-lg font-bold">Solicitar cotización</h2>
            <p className="mt-2 text-sm text-muted">
              Copia este resumen referencial y compártelo con SYNEXA. En esta versión local no se envían ni almacenan datos.
            </p>
            <dl className="mt-4 space-y-2 border-y border-line py-4 text-sm">
              <div className="flex justify-between"><dt className="text-muted">Desarrollo</dt><dd className="font-semibold">{formatoCLP(paquete.precio)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Infraestructura</dt><dd className="text-muted">Se informa antes</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Soporte mensual</dt><dd className="text-muted">Opcional</dd></div>
            </dl>
            <button type="button" onClick={copiar} className="mt-4 w-full rounded-lg bg-blue px-4 py-3 text-sm font-semibold text-white hover:bg-blue-dark">
              Copiar resumen de cotización
            </button>
            <Link to={`/servicios-y-precios/arma-tu-solucion?paquete=${paquete.id}`} className="mt-3 block rounded-lg px-4 py-3 text-center text-sm font-semibold ring-1 ring-inset ring-line hover:bg-white">Armar con este paquete</Link>
            <Link to={`/servicios-y-precios/comparar?ids=${paquete.id}`} className="mt-2 block text-center text-sm font-semibold text-blue hover:underline">Comparar con otros paquetes</Link>
            <p className="mt-3 text-sm" role="status" aria-live="polite">
              {copiado === "si" && "Resumen copiado al portapapeles."}
              {copiado === "error" && "No pudimos copiarlo automáticamente. Selecciona el texto de la ficha manualmente."}
            </p>
          </div>
        </aside>
      </div>
    </article>
  );
}

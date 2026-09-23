import Link from "next/link";
import AppIcon from "@/components/marketing/appIcons";
import { IconArrowRight } from "@/components/marketing/icons";
import { getApplicationHref } from "@/data/businessApplications";

/**
 * Tarjeta de un ejemplo de aplicación.
 *
 * Encuadre comercial: la etiqueta superior y el encabezado "Posibles módulos"
 * dejan explícito que se trata de una solución que SYNEXA *puede desarrollar*,
 * no de un producto disponible.
 *
 * `flow` dibuja las etapas del proceso cuando el negocio trabaja por estados
 * (órdenes de trabajo, cotizaciones). En móvil el flujo se apila.
 */
export default function BusinessApplicationCard({ application }) {
  const {
    title,
    subtitle,
    shortDescription,
    icon,
    modules = [],
    flow,
    flowLabel,
    examples = [],
    note,
    featured = false,
  } = application;

  const href = getApplicationHref(application);

  return (
    <article
      className={`card-hover h-full flex flex-col p-7 lg:p-8 rounded-[1.75rem] bg-white shadow-[0_1px_2px_rgba(11,31,68,0.04)] ${
        featured
          ? "border-2 border-[var(--color-teal)]/45 shadow-[0_18px_44px_-22px_rgba(20,184,166,0.4)]"
          : "border border-[var(--color-border)]/80 hover:border-[var(--color-teal)]/35"
      }`}
    >
      <div className="flex items-start gap-4 mb-5">
        <span
          className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${
            featured
              ? "bg-[var(--color-teal)]/12 text-[var(--color-teal-dark)]"
              : "bg-[var(--color-blue)]/10 text-[var(--color-blue)]"
          }`}
        >
          <AppIcon name={icon} className="w-6 h-6" />
        </span>
        <div className="min-w-0">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[var(--color-gray-dark)]/55 mb-1.5">
            Ejemplo de solución que podemos desarrollar
          </p>
          <h4 className="text-[20px] font-bold text-[var(--color-navy)] leading-snug">
            {title}
          </h4>
        </div>
      </div>

      {subtitle ? (
        <p className="text-[15.5px] font-semibold text-[var(--color-navy)]/85 leading-snug mb-3">
          {subtitle}
        </p>
      ) : null}

      <p className="text-[15px] text-[var(--color-gray-dark)] leading-[1.65] mb-6">
        {shortDescription}
      </p>

      {/* ---------- Flujo de estados ---------- */}
      {flow?.length ? (
        <div className="mb-6 p-5 rounded-2xl bg-[var(--color-surface-muted)] border border-[var(--color-border)]/60">
          {flowLabel ? (
            <p className="text-[11.5px] font-bold uppercase tracking-[0.1em] text-[var(--color-gray-dark)]/60 mb-3.5">
              {flowLabel}
            </p>
          ) : null}
          <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
            {flow.map((step, i) => (
              <li key={step} className="flex items-center gap-1.5">
                <span className="text-[12.5px] font-semibold text-[var(--color-navy)] bg-white border border-[var(--color-border)] rounded-full px-3 py-1">
                  {step}
                </span>
                {i < flow.length - 1 ? (
                  <IconArrowRight
                    className="w-3.5 h-3.5 text-[var(--color-teal)]/70"
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {/* ---------- Módulos ---------- */}
      {modules.length ? (
        <div className="mb-6">
          <p className="text-[11.5px] font-bold uppercase tracking-[0.1em] text-[var(--color-gray-dark)]/60 mb-3">
            Posibles módulos
          </p>
          <ul className="flex flex-wrap gap-2">
            {modules.map((module) => (
              <li
                key={module}
                className="text-[13px] text-[var(--color-gray-dark)] bg-[var(--color-surface-muted)] border border-[var(--color-border)]/70 rounded-full px-3 py-1"
              >
                {module}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* ---------- Tipos de negocio ---------- */}
      {examples.length ? (
        <p className="text-[14px] text-[var(--color-gray-dark)]/85 leading-[1.6] mb-6">
          <span className="font-semibold text-[var(--color-navy)]">Aplicable a: </span>
          {examples.join(" · ")}
        </p>
      ) : null}

      {note ? (
        <p className="text-[13.5px] text-[var(--color-gray-dark)]/85 leading-[1.65] mb-6 pl-4 border-l-2 border-[var(--color-blue)]/30">
          {note}
        </p>
      ) : null}

      <div className="mt-auto pt-2">
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-[14.5px] font-bold text-[var(--color-blue)] hover:text-[var(--color-blue-dark)] rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] group/cta"
        >
          Consultar solución
          <span className="sr-only"> para {title}</span>
          <IconArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1 motion-reduce:transform-none" />
        </Link>
      </div>
    </article>
  );
}

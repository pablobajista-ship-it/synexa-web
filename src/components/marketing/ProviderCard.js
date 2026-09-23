import AppIcon from "@/components/marketing/appIcons";
import { IconExternal } from "@/components/marketing/icons";

/**
 * Tarjeta de un proveedor externo.
 *
 * Nunca muestra un precio: solo el `pricingLabel` de texto que trae el dato
 * ("Tarifa vigente del proveedor", "Según plan y consumo"). Si un proveedor
 * declara `referenceLabel`, se muestra siempre acompañado de la advertencia
 * de que es un valor referencial.
 *
 * El enlace externo se abre en pestaña nueva con rel seguro.
 */
export default function ProviderCard({ provider, icon = "server" }) {
  const {
    provider: name,
    extension,
    role,
    recommendedFor,
    pricingLabel,
    referenceLabel,
    url,
    managedBySynexa,
    benefits = [],
  } = provider;

  return (
    <div className="card-hover h-full flex flex-col p-6 rounded-2xl bg-white border border-[var(--color-border)]/80 shadow-[0_1px_2px_rgba(11,31,68,0.04)] hover:border-[var(--color-teal)]/35">
      <div className="flex items-start gap-3.5 mb-4">
        <span className="flex-shrink-0 w-11 h-11 rounded-xl bg-[var(--color-blue)]/[0.08] text-[var(--color-blue)] flex items-center justify-center">
          <AppIcon name={icon} className="w-5 h-5" />
        </span>
        <div className="min-w-0">
          <p className="text-[16.5px] font-bold text-[var(--color-navy)] leading-tight">
            {name}
          </p>
          {extension ? (
            <p className="text-[13px] text-[var(--color-gray-dark)]/80 mt-0.5">
              {extension}
            </p>
          ) : null}
        </div>
      </div>

      {role ? (
        <p className="text-[14.5px] text-[var(--color-gray-dark)] leading-[1.6] mb-3">
          {role}
        </p>
      ) : null}

      {recommendedFor ? (
        <p className="text-[13.5px] text-[var(--color-gray-dark)]/85 leading-[1.6] mb-4">
          <span className="font-semibold text-[var(--color-navy)]">Sugerido para: </span>
          {recommendedFor}
        </p>
      ) : null}

      {benefits.length ? (
        <ul className="flex flex-wrap gap-1.5 mb-4">
          {benefits.map((benefit) => (
            <li
              key={benefit}
              className="text-[12.5px] text-[var(--color-gray-dark)] bg-[var(--color-surface-muted)] border border-[var(--color-border)]/70 rounded-full px-2.5 py-1"
            >
              {benefit}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto pt-4 border-t border-[var(--color-border)]/80">
        <p className="text-[11.5px] font-bold uppercase tracking-[0.1em] text-[var(--color-gray-dark)]/60 mb-1.5">
          Costo
        </p>
        <p className="text-[14.5px] font-semibold text-[var(--color-navy)] leading-snug">
          {pricingLabel}
        </p>
        {referenceLabel ? (
          <p className="text-[13px] text-[var(--color-gray-dark)]/80 mt-1.5">
            {referenceLabel} — <em>valor referencial, consultar tarifa vigente</em>
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4">
          {managedBySynexa ? (
            <span className="text-[12.5px] font-semibold text-[var(--color-teal-dark)]">
              SYNEXA puede administrarlo
            </span>
          ) : null}
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--color-blue)] hover:text-[var(--color-blue-dark)] rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)]"
            >
              Sitio del proveedor
              <span className="sr-only"> {name} (se abre en una pestaña nueva)</span>
              <IconExternal className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

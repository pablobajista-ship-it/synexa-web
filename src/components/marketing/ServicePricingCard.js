import Button from "@/components/ui/Button";
import { IconCheck, IconClock } from "@/components/marketing/icons";
import ServiceIcon from "@/components/marketing/serviceIcons";
import { resolvePricing } from "@/lib/pricing";
import { getLaunchPeriod } from "@/data/servicesPricing";

/**
 * Tarjeta de servicio. Mantiene el bloque visible corto —ícono, nombre,
 * descripción, precio y CTA— y esconde el detalle de lo que incluye tras un
 * <details> nativo ("Conocer servicio"), accesible por teclado y sin JS.
 *
 * Todos los importes que recibe son netos: siempre muestra "+ IVA".
 */
export default function ServicePricingCard({ service }) {
  const {
    name,
    icon,
    shortDescription,
    features = [],
    featuresNote,
    featured = false,
    customQuote = false,
    cta,
  } = service;

  const pricing = resolvePricing(service);
  const launch = getLaunchPeriod(service);
  const hasDetail = features.length > 0 || Boolean(featuresNote);

  return (
    <article
      className={`card-hover h-full flex flex-col p-7 lg:p-8 rounded-[1.75rem] bg-white shadow-[0_1px_2px_rgba(11,31,68,0.04)] ${
        featured
          ? "border-2 border-[var(--color-teal)]/45 shadow-[0_18px_44px_-22px_rgba(20,184,166,0.4)]"
          : "border border-[var(--color-border)]/80 hover:border-[var(--color-teal)]/35"
      }`}
    >
      <span
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
          featured
            ? "bg-[var(--color-teal)]/12 text-[var(--color-teal-dark)]"
            : "bg-[var(--color-blue)]/10 text-[var(--color-blue)]"
        }`}
      >
        <ServiceIcon name={icon} className="w-6 h-6" />
      </span>

      <h4 className="text-[20px] font-bold text-[var(--color-navy)] leading-snug mb-2.5">
        {name}
      </h4>
      <p className="text-[15px] text-[var(--color-gray-dark)] leading-[1.65] mb-6">
        {shortDescription}
      </p>

      {/* ---------- Precio ---------- */}
      <div className="mt-auto pt-6 border-t border-[var(--color-border)]/80">
        {pricing.prefix ? (
          <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-gray-dark)]/70 mb-1">
            {pricing.prefix}
          </p>
        ) : null}
        <p className="flex flex-wrap items-baseline gap-x-2 text-[var(--color-navy)]">
          <span className="text-[28px] lg:text-[30px] font-bold tracking-[-0.02em] leading-none">
            {pricing.amount}
          </span>
          {pricing.tax ? (
            <span className="text-[14px] font-semibold text-[var(--color-gray-dark)]/80">
              {pricing.tax}
            </span>
          ) : null}
        </p>

        {customQuote ? (
          <p className="text-[13px] font-semibold text-[var(--color-teal-dark)] mt-2">
            Cotización personalizada
          </p>
        ) : null}

        {launch ? (
          <p className="flex items-center gap-1.5 text-[13px] text-[var(--color-gray-dark)]/85 mt-2.5">
            <IconClock className="w-4 h-4 flex-shrink-0 text-[var(--color-gray-dark)]/60" />
            Puesta en marcha: {launch.label}
          </p>
        ) : null}
      </div>

      {/* ---------- Detalle desplegable ---------- */}
      {hasDetail ? (
        <details className="group/detail mt-5">
          <summary className="flex items-center justify-between gap-3 cursor-pointer list-none text-[14px] font-bold text-[var(--color-blue)] hover:text-[var(--color-blue-dark)] rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] [&::-webkit-details-marker]:hidden">
            <span>
              Conocer servicio
              <span className="sr-only"> — detalle de {name}</span>
            </span>
            <span
              className="flex-shrink-0 w-7 h-7 rounded-full border border-[var(--color-border)] flex items-center justify-center transition-transform duration-300 group-open/detail:rotate-45 motion-reduce:transition-none"
              aria-hidden="true"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>

          <div className="pt-5">
            {features.length > 0 ? (
              <>
                <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--color-gray-dark)]/60 mb-3">
                  Puede incluir
                </p>
                <ul className="space-y-2.5">
                  {features.map((feature) => (
                    <li key={feature} className="flex gap-2.5">
                      <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-[var(--color-teal)]/15 text-[var(--color-teal-dark)] flex items-center justify-center">
                        <IconCheck className="w-3 h-3" />
                      </span>
                      <span className="text-[14.5px] text-[var(--color-gray-dark)] leading-[1.55]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {featuresNote ? (
              <p
                className={`text-[14px] text-[var(--color-gray-dark)]/85 leading-[1.6] ${
                  features.length > 0 ? "mt-4" : ""
                }`}
              >
                {featuresNote}
              </p>
            ) : null}
          </div>
        </details>
      ) : null}

      <div className="mt-6">
        <Button
          href={cta?.href ?? "#contacto"}
          variant={featured ? "accent" : "primary"}
          size="lg"
          className="w-full"
        >
          {cta?.label ?? "Solicitar cotización"}
          <span className="sr-only"> — {name}</span>
        </Button>
      </div>
    </article>
  );
}

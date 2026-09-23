import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Reveal from "@/components/marketing/Reveal";
import { IconArrowRight, IconShield, IconSpark } from "@/components/marketing/icons";
import { formatAmount } from "@/lib/pricing";

/**
 * §25 + §26 + §27 — Precio de referencia, puesta en marcha y continuidad.
 *
 * Esta página responde "qué se puede construir"; el detalle comercial vive en
 * /servicios-y-precios. Por eso aquí solo van los dos valores de entrada y
 * enlaces a esa página, sin repetir planes ni condiciones.
 */
export default function AppPricingBlock({ pricing }) {
  return (
    <section id="precios" className="section-pad bg-[var(--color-surface-muted)] scroll-mt-20">
      <Container>
        <Reveal className="max-w-[760px] mb-12 lg:mb-14">
          <Eyebrow>Inversión</Eyebrow>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
            {pricing.title}
          </h2>
          <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7]">
            {pricing.text}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {pricing.tiers.map((tier, i) => (
            <Reveal key={tier.id} delay={i * 70} className="h-full">
              <article
                className={`card-hover h-full flex flex-col p-8 lg:p-9 rounded-[1.75rem] bg-white shadow-[0_1px_2px_rgba(11,31,68,0.04)] ${
                  tier.featured
                    ? "border-2 border-[var(--color-teal)]/45 shadow-[0_18px_44px_-22px_rgba(20,184,166,0.4)]"
                    : "border border-[var(--color-border)]/80 hover:border-[var(--color-teal)]/35"
                }`}
              >
                <span
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                    tier.featured
                      ? "bg-[var(--color-teal)]/12 text-[var(--color-teal-dark)]"
                      : "bg-[var(--color-blue)]/10 text-[var(--color-blue)]"
                  }`}
                >
                  <IconSpark className="w-5 h-5" />
                </span>

                <h3 className="text-[21px] font-bold text-[var(--color-navy)] leading-snug mb-3">
                  {tier.name}
                </h3>
                <p className="text-[15px] text-[var(--color-gray-dark)] leading-[1.65] mb-7">
                  {tier.text}
                </p>

                <div className="mt-auto pt-6 border-t border-[var(--color-border)]/80">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-gray-dark)]/70 mb-1">
                    {tier.pricePrefix}
                  </p>
                  <p className="flex flex-wrap items-baseline gap-x-2 text-[var(--color-navy)]">
                    <span className="text-[30px] lg:text-[34px] font-bold tracking-[-0.02em] leading-none">
                      {formatAmount(tier.price)}
                    </span>
                    <span className="text-[14px] font-semibold text-[var(--color-gray-dark)]/80">
                      {tier.taxLabel}
                    </span>
                  </p>
                  <p className="text-[13px] font-semibold text-[var(--color-teal-dark)] mt-2">
                    Cotización personalizada
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={60}>
          <p className="mt-6 text-[14.5px] text-[var(--color-gray-dark)]/90 leading-[1.7] max-w-[680px]">
            {pricing.disclaimer}
          </p>
        </Reveal>

        <Reveal delay={90}>
          <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-4">
            <Button href="#contacto" variant="primary" size="xl">
              Solicitar evaluación
            </Button>
          </div>
        </Reveal>

        {/* ---------- Puesta en marcha + continuidad ---------- */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6 mt-12 lg:mt-14">
          <Reveal className="h-full">
            <div className="h-full p-8 rounded-[1.75rem] bg-white border border-[var(--color-border)]/80">
              <span className="w-11 h-11 rounded-2xl bg-[var(--color-teal)]/12 text-[var(--color-teal-dark)] flex items-center justify-center mb-5">
                <IconShield className="w-5 h-5" />
              </span>
              <h3 className="text-[19px] font-bold text-[var(--color-navy)] mb-3">
                Puesta en marcha
              </h3>
              <p className="text-[15px] text-[var(--color-gray-dark)] leading-[1.7] mb-6">
                {pricing.launchNote}
              </p>
              <a
                href="/servicios-y-precios#puesta-en-marcha"
                className="inline-flex items-center gap-2 text-[14.5px] font-bold text-[var(--color-blue)] hover:text-[var(--color-blue-dark)] rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] group/cta"
              >
                Conocer condiciones y soporte
                <IconArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1 motion-reduce:transform-none" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={70} className="h-full">
            <div className="h-full p-8 rounded-[1.75rem] bg-white border border-[var(--color-border)]/80">
              <span className="w-11 h-11 rounded-2xl bg-[var(--color-blue)]/10 text-[var(--color-blue)] flex items-center justify-center mb-5">
                <IconSpark className="w-5 h-5" />
              </span>
              <h3 className="text-[19px] font-bold text-[var(--color-navy)] mb-3">
                Tu sistema puede seguir creciendo
              </h3>
              <p className="text-[15px] text-[var(--color-gray-dark)] leading-[1.7] mb-6">
                Después de la puesta en marcha puedes contratar continuidad y soporte
                para monitoreo, respaldos, ajustes, optimización y evolución de la
                plataforma.
              </p>
              <a
                href="/servicios-y-precios#soporte"
                className="inline-flex items-center gap-2 text-[14.5px] font-bold text-[var(--color-blue)] hover:text-[var(--color-blue-dark)] rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] group/cta"
              >
                Ver planes de soporte
                <IconArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1 motion-reduce:transform-none" />
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

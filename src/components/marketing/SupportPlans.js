import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Reveal from "@/components/marketing/Reveal";
import { IconCheck, IconClock, IconSettings } from "@/components/marketing/icons";
import { resolvePricing } from "@/lib/pricing";

/**
 * "Continuidad y Soporte SYNEXA" (§18–§24).
 * Cuatro planes mensuales + soporte por hora sin plan. El plan recomendado
 * se marca de forma discreta, en lenguaje B2B: sin ofertas ni descuentos.
 */
export default function SupportPlans({ plans, hourly }) {
  return (
    <section id="soporte" className="section-pad bg-white scroll-mt-20">
      <Container>
        <Reveal className="max-w-[780px] mb-12 lg:mb-14">
          <Eyebrow>Continuidad</Eyebrow>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
            Continuidad y Soporte SYNEXA
          </h2>
          <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7]">
            Después del período de puesta en marcha puedes mantener acompañamiento
            técnico mediante nuestros planes de soporte.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
          {plans.map((plan, i) => {
            const pricing = resolvePricing(plan);

            return (
              <Reveal key={plan.id} delay={i * 60} className="h-full">
                <article
                  className={`card-hover h-full flex flex-col p-7 rounded-[1.75rem] bg-white shadow-[0_1px_2px_rgba(11,31,68,0.04)] ${
                    plan.recommended
                      ? "border-2 border-[var(--color-teal)]/45 shadow-[0_18px_44px_-22px_rgba(20,184,166,0.4)]"
                      : "border border-[var(--color-border)]/80 hover:border-[var(--color-teal)]/35"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5 min-h-[28px]">
                    <h3 className="text-[19px] font-bold text-[var(--color-navy)] leading-snug">
                      {plan.name}
                    </h3>
                    {plan.recommended ? (
                      <span className="flex-shrink-0 text-[10.5px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full bg-[var(--color-teal)]/12 text-[var(--color-teal-dark)]">
                        Recomendado
                      </span>
                    ) : null}
                  </div>

                  <p className="text-[14.5px] text-[var(--color-gray-dark)] leading-[1.6] mb-6 min-h-[46px]">
                    {plan.description}
                  </p>

                  <div className="pb-6 mb-6 border-b border-[var(--color-border)]/80">
                    {pricing.prefix ? (
                      <p className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[var(--color-gray-dark)]/70 mb-1">
                        {pricing.prefix}
                      </p>
                    ) : null}
                    <p className="flex flex-wrap items-baseline gap-x-2 text-[var(--color-navy)]">
                      <span className="text-[26px] font-bold tracking-[-0.02em] leading-none">
                        {pricing.amount}
                      </span>
                      <span className="text-[13.5px] font-semibold text-[var(--color-gray-dark)]/80">
                        {pricing.tax} {pricing.period}
                      </span>
                    </p>
                    {plan.priceNote ? (
                      <p className="text-[12.5px] text-[var(--color-gray-dark)]/80 leading-[1.5] mt-2">
                        {plan.priceNote}
                      </p>
                    ) : null}
                  </div>

                  {/* Horas y tiempo de respuesta, destacados */}
                  <ul className="space-y-2.5 mb-6">
                    <li className="flex gap-2.5 items-start">
                      <IconSettings className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--color-blue)]" />
                      <span className="text-[13.5px] font-semibold text-[var(--color-navy)] leading-[1.5]">
                        {plan.includedHours}
                      </span>
                    </li>
                    <li className="flex gap-2.5 items-start">
                      <IconClock className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--color-blue)]" />
                      <span className="text-[13.5px] font-semibold text-[var(--color-navy)] leading-[1.5]">
                        {plan.responseTime}
                      </span>
                    </li>
                  </ul>

                  <ul className="space-y-2.5 mb-7">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-2.5">
                        <span className="flex-shrink-0 w-[18px] h-[18px] mt-0.5 rounded-full bg-[var(--color-teal)]/15 text-[var(--color-teal-dark)] flex items-center justify-center">
                          <IconCheck className="w-2.5 h-2.5" />
                        </span>
                        <span className="text-[14px] text-[var(--color-gray-dark)] leading-[1.55]">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Button
                      href="#contacto"
                      variant={plan.recommended ? "accent" : "secondary"}
                      size="md"
                      className="w-full"
                    >
                      Contratar plan
                      <span className="sr-only"> {plan.name}</span>
                    </Button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* ---------- Soporte sin plan ---------- */}
        <Reveal delay={80}>
          <div className="mt-8 lg:mt-10 p-8 lg:p-10 rounded-[1.75rem] bg-[var(--color-surface-muted)] border border-[var(--color-border)]/70">
            <h3 className="text-[22px] font-bold text-[var(--color-navy)] mb-2">
              Soporte puntual, sin plan
            </h3>
            <p className="text-[15.5px] text-[var(--color-gray-dark)] leading-[1.7] mb-8 max-w-[640px]">
              Si no necesitas acompañamiento continuo, también puedes contratar horas de
              soporte cuando las requieras.
            </p>

            <div className="grid md:grid-cols-2 gap-5">
              {hourly.map((item) => {
                const pricing = resolvePricing(item);

                return (
                  <div
                    key={item.id}
                    className="p-7 rounded-2xl bg-white border border-[var(--color-border)]/80"
                  >
                    <h4 className="text-[17px] font-bold text-[var(--color-navy)] mb-3">
                      {item.name}
                    </h4>
                    <p className="flex flex-wrap items-baseline gap-x-2 text-[var(--color-navy)] mb-4">
                      {pricing.prefix ? (
                        <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-gray-dark)]/70">
                          {pricing.prefix}
                        </span>
                      ) : null}
                      <span className="text-[26px] font-bold tracking-[-0.02em] leading-none">
                        {pricing.amount}
                      </span>
                      <span className="text-[13.5px] font-semibold text-[var(--color-gray-dark)]/80">
                        {pricing.tax} {pricing.period}
                      </span>
                    </p>

                    {item.features.length > 0 ? (
                      <ul className="flex flex-wrap gap-2">
                        {item.features.map((feature) => (
                          <li
                            key={feature}
                            className="text-[13px] font-semibold text-[var(--color-gray-dark)] bg-[var(--color-surface-muted)] border border-[var(--color-border)] rounded-full px-3 py-1"
                          >
                            {feature}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {item.note ? (
                      <p className="text-[13.5px] text-[var(--color-gray-dark)]/85 leading-[1.6] mt-3">
                        {item.note}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

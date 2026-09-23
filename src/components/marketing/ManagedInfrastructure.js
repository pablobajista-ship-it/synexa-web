import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Reveal from "@/components/marketing/Reveal";
import AppIcon from "@/components/marketing/appIcons";
import {
  IconCheck,
  IconPlus,
  IconEquals,
  IconServer,
  IconShield,
} from "@/components/marketing/icons";
import { formatAmount } from "@/lib/pricing";

/**
 * §20–§27 — Modalidades de contratación, planes de Infraestructura
 * Administrada SYNEXA, la distinción infraestructura ≠ soporte y la
 * combinación con SYNEXA Care.
 *
 * `managed` (SYNEXA Managed) solo se renderiza cuando el dato viene
 * habilitado; hoy llega como null a propósito.
 */
export default function ManagedInfrastructure({
  modes,
  intro,
  plans,
  managed,
  comparison,
}) {
  return (
    <section
      id="infraestructura-administrada"
      className="section-pad bg-[var(--color-surface-muted)] scroll-mt-20"
    >
      <Container>
        {/* ---------- §20 ¿Quién paga los servicios externos? ---------- */}
        <Reveal className="max-w-[780px] mb-10 lg:mb-12">
          <Eyebrow>Modalidades</Eyebrow>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
            ¿Quién paga los servicios externos?
          </h2>
          <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7]">
            Puedes contratarlos tú directamente o delegarnos la parte técnica. Ambas
            opciones son válidas: cambia quién administra, no quién es dueño.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6 mb-16 lg:mb-20">
          {modes.map((mode, i) => (
            <Reveal key={mode.id} delay={i * 70} className="h-full">
              <article className="card-hover h-full flex flex-col p-8 rounded-[1.75rem] bg-white border border-[var(--color-border)]/80 shadow-[0_1px_2px_rgba(11,31,68,0.04)] hover:border-[var(--color-teal)]/35">
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex-shrink-0 text-[11.5px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full bg-[var(--color-surface-muted)] text-[var(--color-gray-dark)]/70">
                    Opción {i + 1}
                  </span>
                </div>

                <span className="w-12 h-12 rounded-2xl bg-[var(--color-blue)]/10 text-[var(--color-blue)] flex items-center justify-center mb-5">
                  <AppIcon name={mode.icon} className="w-5 h-5" />
                </span>

                <h3 className="text-[20px] font-bold text-[var(--color-navy)] leading-snug mb-3">
                  {mode.title}
                </h3>
                <p className="text-[15px] text-[var(--color-gray-dark)] leading-[1.65] mb-7">
                  {mode.text}
                </p>

                <ul className="space-y-2.5 mb-6">
                  {mode.points.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <span className="flex-shrink-0 w-[18px] h-[18px] mt-0.5 rounded-full bg-[var(--color-teal)]/15 text-[var(--color-teal-dark)] flex items-center justify-center">
                        <IconCheck className="w-2.5 h-2.5" />
                      </span>
                      <span className="text-[14.5px] text-[var(--color-gray-dark)] leading-[1.55]">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>

                {mode.footer ? (
                  <p className="mt-auto pt-5 border-t border-[var(--color-border)]/80 text-[14px] font-semibold text-[var(--color-navy)]">
                    {mode.footer}
                  </p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>

        {/* ---------- §21–§24 Planes ---------- */}
        <Reveal className="max-w-[780px] mb-10 lg:mb-12">
          <Eyebrow>{intro.eyebrow}</Eyebrow>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
            {intro.title}
          </h2>
          <p className="text-[19px] font-semibold text-[var(--color-navy)]/85 leading-[1.5] mb-4">
            {intro.text}
          </p>
          <p className="text-[var(--color-gray-dark)] text-[16px] leading-[1.7]">
            {intro.note}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 70} className="h-full">
              <article
                className={`card-hover h-full flex flex-col p-8 rounded-[1.75rem] bg-white shadow-[0_1px_2px_rgba(11,31,68,0.04)] ${
                  plan.recommended
                    ? "border-2 border-[var(--color-teal)]/45 shadow-[0_18px_44px_-22px_rgba(20,184,166,0.4)]"
                    : "border border-[var(--color-border)]/80 hover:border-[var(--color-teal)]/35"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3 min-h-[28px]">
                  <h3 className="text-[19px] font-bold text-[var(--color-navy)] leading-snug">
                    {plan.name}
                  </h3>
                  {plan.recommended ? (
                    <span className="flex-shrink-0 text-[10.5px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full bg-[var(--color-teal)]/12 text-[var(--color-teal-dark)]">
                      Recomendado
                    </span>
                  ) : null}
                </div>

                <p className="text-[14.5px] text-[var(--color-gray-dark)] leading-[1.6] mb-6">
                  {plan.description}
                </p>

                <div className="pb-6 mb-6 border-b border-[var(--color-border)]/80">
                  {plan.pricePrefix && !plan.customQuote ? (
                    <p className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[var(--color-gray-dark)]/70 mb-1">
                      {plan.pricePrefix}
                    </p>
                  ) : null}
                  <p className="flex flex-wrap items-baseline gap-x-2 text-[var(--color-navy)]">
                    {plan.customQuote ? (
                      <span className="text-[20px] font-bold leading-snug">
                        Cotización personalizada
                      </span>
                    ) : (
                      <>
                        <span className="text-[26px] font-bold tracking-[-0.02em] leading-none">
                          {formatAmount(plan.price)}
                        </span>
                        <span className="text-[13.5px] font-semibold text-[var(--color-gray-dark)]/80">
                          {plan.taxLabel} / {plan.billingPeriod}
                        </span>
                      </>
                    )}
                  </p>
                  {plan.priceNote ? (
                    <p className="text-[12.5px] text-[var(--color-gray-dark)]/85 leading-[1.5] mt-2">
                      {plan.priceNote}
                    </p>
                  ) : null}
                </div>

                {plan.recommendedFor?.length ? (
                  <div className="mb-6">
                    <p className="text-[11.5px] font-bold uppercase tracking-[0.1em] text-[var(--color-gray-dark)]/60 mb-2.5">
                      Orientado a
                    </p>
                    <ul className="flex flex-wrap gap-1.5">
                      {plan.recommendedFor.map((item) => (
                        <li
                          key={item}
                          className="text-[12.5px] text-[var(--color-gray-dark)] bg-[var(--color-surface-muted)] border border-[var(--color-border)]/70 rounded-full px-2.5 py-1"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {plan.features.length ? (
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
                ) : null}

                <div className="mt-auto">
                  <Button
                    href="#contacto"
                    variant={plan.recommended ? "accent" : "secondary"}
                    size="md"
                    className="w-full"
                  >
                    {plan.customQuote ? "Solicitar cotización" : "Contratar"}
                    <span className="sr-only"> {plan.name}</span>
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* §27 — SYNEXA Managed, solo si está habilitado en los datos */}
        {managed ? (
          <Reveal delay={80}>
            <div className="mt-6 p-8 rounded-[1.75rem] bg-[var(--color-navy)] text-white">
              <h3 className="text-[21px] font-bold mb-3">{managed.name}</h3>
              <p className="text-white/70 text-[15.5px] leading-[1.7] mb-6">
                {managed.description}
              </p>
              <ul className="flex flex-wrap gap-2">
                {managed.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-[12.5px] font-semibold text-white/85 bg-white/[0.08] border border-white/15 rounded-full px-3 py-1"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ) : null}

        {/* ---------- §25 y §26 Infraestructura ≠ soporte ---------- */}
        <Reveal delay={60}>
          <div className="mt-16 lg:mt-20 p-8 lg:p-10 rounded-[1.75rem] bg-white border border-[var(--color-border)]/80">
            <h3 className="text-[1.5rem] sm:text-[1.75rem] leading-[1.22] font-bold tracking-[-0.02em] text-[var(--color-navy)] mb-8 text-balance">
              Infraestructura y soporte no son lo mismo
            </h3>

            <div className="grid md:grid-cols-2 gap-5 mb-10">
              <div className="p-6 rounded-2xl bg-[var(--color-surface-muted)] border border-[var(--color-border)]/60">
                <span className="w-10 h-10 rounded-xl bg-[var(--color-blue)]/10 text-[var(--color-blue)] flex items-center justify-center mb-4">
                  <IconServer className="w-[18px] h-[18px]" />
                </span>
                <p className="text-[17px] font-bold text-[var(--color-navy)] mb-2">
                  {comparison.infrastructure.title}
                </p>
                <p className="text-[14.5px] text-[var(--color-gray-dark)] leading-[1.65]">
                  {comparison.infrastructure.text}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[var(--color-surface-muted)] border border-[var(--color-border)]/60">
                <span className="w-10 h-10 rounded-xl bg-[var(--color-teal)]/12 text-[var(--color-teal-dark)] flex items-center justify-center mb-4">
                  <IconShield className="w-[18px] h-[18px]" />
                </span>
                <p className="text-[17px] font-bold text-[var(--color-navy)] mb-2">
                  {comparison.support.title}
                </p>
                <p className="text-[14.5px] text-[var(--color-gray-dark)] leading-[1.65]">
                  {comparison.support.text}
                </p>
              </div>
            </div>

            {/* §26 — La ecuación */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              <Pill>{comparison.combined.a}</Pill>
              <Operator icon="plus" />
              <Pill>{comparison.combined.b}</Pill>
              <Operator icon="equals" />
              <Pill highlight>{comparison.combined.result}</Pill>
            </div>

            <p className="text-[14.5px] text-[var(--color-gray-dark)]/85 leading-[1.7] text-center mt-7 max-w-[620px] mx-auto">
              {comparison.combined.note}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Pill({ children, highlight = false }) {
  return (
    <span
      className={`flex-1 text-center px-5 py-3.5 rounded-2xl text-[15px] font-bold ${
        highlight
          ? "bg-[var(--color-navy)] text-white"
          : "bg-[var(--color-surface-muted)] text-[var(--color-navy)] border border-[var(--color-border)]"
      }`}
    >
      {children}
    </span>
  );
}

function Operator({ icon }) {
  return (
    <span
      className="flex items-center justify-center text-[var(--color-teal)] flex-shrink-0"
      aria-hidden="true"
    >
      {icon === "plus" ? (
        <IconPlus className="w-5 h-5" />
      ) : (
        <IconEquals className="w-5 h-5" />
      )}
    </span>
  );
}

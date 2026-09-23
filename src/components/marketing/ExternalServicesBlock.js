import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import { IconChart } from "@/components/marketing/icons";

/**
 * §18 y §19 — Servicios externos y costos por consumo.
 * El tono es informativo, no de advertencia: se explica por qué un costo
 * puede variar sin dramatizarlo.
 */
export default function ExternalServicesBlock({ services, consumption }) {
  return (
    <section id="infra-externos" className="section-pad bg-white scroll-mt-20">
      <Container>
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-start">
          <Reveal>
            <Eyebrow>Servicios externos</Eyebrow>
            <h3 className="text-[1.9rem] sm:text-[2.25rem] leading-[1.16] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
              {services.title}
            </h3>
            <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7] mb-8">
              {services.intro}
            </p>

            <ul className="flex flex-wrap gap-2.5">
              {services.items.map((item) => (
                <li
                  key={item}
                  className="text-[14px] font-semibold text-[var(--color-navy)] bg-[var(--color-surface-muted)] border border-[var(--color-border)]/80 rounded-full px-4 py-2 transition-colors duration-300 hover:border-[var(--color-teal)]/40"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80}>
            <div className="p-8 lg:p-9 rounded-[1.75rem] bg-gradient-to-b from-white to-[var(--color-surface-muted)] border border-[var(--color-border)]/80 shadow-[0_1px_2px_rgba(11,31,68,0.04)]">
              <span className="w-12 h-12 rounded-2xl bg-[var(--color-blue)]/10 text-[var(--color-blue)] flex items-center justify-center mb-6">
                <IconChart className="w-5 h-5" />
              </span>
              <h4 className="text-[1.4rem] sm:text-[1.6rem] leading-[1.22] font-bold tracking-[-0.02em] text-[var(--color-navy)] mb-4 text-balance">
                {consumption.title}
              </h4>
              <p className="text-[var(--color-gray-dark)] text-[15.5px] leading-[1.7] mb-7">
                {consumption.text}
              </p>

              <p className="text-[11.5px] font-bold uppercase tracking-[0.1em] text-[var(--color-gray-dark)]/60 mb-3.5">
                Qué puede influir
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-2.5">
                {consumption.factors.map((factor) => (
                  <li key={factor} className="flex items-center gap-2.5">
                    <span
                      className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-teal)]"
                      aria-hidden="true"
                    />
                    <span className="text-[14.5px] text-[var(--color-gray-dark)]">
                      {factor}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

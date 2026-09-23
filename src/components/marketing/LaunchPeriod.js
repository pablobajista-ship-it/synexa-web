import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import { IconCheck, IconX, IconShield } from "@/components/marketing/icons";

/**
 * "Período de puesta en marcha SYNEXA" (§14–§17).
 * Fondo gris azulado para marcar ritmo entre las dos secciones blancas
 * que la rodean.
 */
export default function LaunchPeriod({ periods, coverage }) {
  return (
    <section
      id="puesta-en-marcha"
      className="section-pad bg-[var(--color-surface-muted)] scroll-mt-20"
    >
      <Container>
        <Reveal className="max-w-[760px] mb-12 lg:mb-14">
          <Eyebrow>Garantía</Eyebrow>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
            Período de puesta en marcha SYNEXA
          </h2>
          <p className="text-[19px] sm:text-[21px] font-semibold text-[var(--color-navy)] leading-[1.5] mb-4">
            Tu proyecto no termina cuando lo publicamos.
          </p>
          <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7]">
            Después de la entrega existe un período de acompañamiento para comprobar que
            la solución funcione de acuerdo con lo originalmente acordado.
          </p>
        </Reveal>

        {/* Duración según tipo de solución */}
        <div className="grid sm:grid-cols-3 gap-5 mb-14 lg:mb-16">
          {periods.map((period, i) => (
            <Reveal key={period.id} delay={i * 70} className="h-full">
              <div className="card-hover h-full p-7 rounded-[1.75rem] bg-white border border-[var(--color-border)]/80 shadow-[0_1px_2px_rgba(11,31,68,0.04)] hover:border-[var(--color-teal)]/35">
                <span className="w-12 h-12 rounded-2xl bg-[var(--color-teal)]/12 text-[var(--color-teal-dark)] flex items-center justify-center mb-5">
                  <IconShield className="w-6 h-6" />
                </span>
                <p className="text-[34px] font-bold text-[var(--color-navy)] tracking-[-0.02em] leading-none mb-2">
                  {period.days}
                  <span className="text-[17px] font-semibold text-[var(--color-gray-dark)]/80 ml-1.5">
                    días
                  </span>
                </p>
                <p className="text-[15px] text-[var(--color-gray-dark)] leading-[1.6]">
                  {period.scope}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Qué cubre / qué no cubre */}
        <div className="grid lg:grid-cols-2 gap-5 lg:gap-6">
          <Reveal className="h-full">
            <div className="h-full p-8 rounded-[1.75rem] bg-white border border-[var(--color-teal)]/25 shadow-[0_1px_2px_rgba(11,31,68,0.04)]">
              <h3 className="text-[20px] font-bold text-[var(--color-navy)] mb-6">
                Qué cubre la puesta en marcha
              </h3>
              <ul className="space-y-3">
                {coverage.covered.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-[var(--color-teal)]/15 text-[var(--color-teal-dark)] flex items-center justify-center">
                      <IconCheck className="w-3 h-3" />
                    </span>
                    <span className="text-[15px] text-[var(--color-gray-dark)] leading-[1.6]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={80} className="h-full">
            <div className="h-full p-8 rounded-[1.75rem] bg-white border border-[var(--color-border)]/80 shadow-[0_1px_2px_rgba(11,31,68,0.04)]">
              <h3 className="text-[20px] font-bold text-[var(--color-navy)] mb-6">
                Qué no cubre
              </h3>
              <ul className="space-y-3 mb-6">
                {coverage.notCovered.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-[var(--color-gray-light)] text-[var(--color-gray-dark)]/70 flex items-center justify-center">
                      <IconX className="w-3 h-3" />
                    </span>
                    <span className="text-[15px] text-[var(--color-gray-dark)] leading-[1.6]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="p-5 rounded-2xl bg-[var(--color-surface-muted)] text-[14.5px] text-[var(--color-gray-dark)] leading-[1.7]">
                {coverage.notCoveredNote}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Cambios menores */}
        <Reveal delay={60}>
          <div className="mt-6 p-8 rounded-[1.75rem] bg-[var(--color-navy)]/[0.03] border border-[var(--color-border)]/70">
            <h3 className="text-[18px] font-bold text-[var(--color-navy)] mb-3">
              Cambios menores incluidos
            </h3>
            <p className="text-[15.5px] text-[var(--color-gray-dark)] leading-[1.7] mb-5 max-w-[760px]">
              {coverage.minorChangesNote}
            </p>
            <ul className="flex flex-wrap gap-2.5">
              {coverage.minorChangesExamples.map((item) => (
                <li
                  key={item}
                  className="text-[13.5px] font-semibold text-[var(--color-gray-dark)] bg-white border border-[var(--color-border)] rounded-full px-4 py-1.5"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

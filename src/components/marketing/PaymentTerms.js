import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import { IconWallet } from "@/components/marketing/icons";

/**
 * "Forma de pago" (§25). Se presenta explícitamente como esquema de
 * referencia: las condiciones definitivas van en cada propuesta comercial.
 */
export default function PaymentTerms({ schemes, note }) {
  return (
    <section className="section-pad bg-[var(--color-surface-muted)]">
      <Container>
        <Reveal className="max-w-[760px] mb-12">
          <Eyebrow>Forma de pago</Eyebrow>
          <h2 className="text-[2rem] sm:text-[2.5rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
            Cómo se estructura el pago de un proyecto
          </h2>
          <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7]">
            Este es un esquema de referencia: los pagos se asocian a hitos del proyecto,
            no a fechas fijas.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {schemes.map((scheme, i) => (
            <Reveal key={scheme.id} delay={i * 70} className="h-full">
              <div className="card-hover h-full p-8 rounded-[1.75rem] bg-white border border-[var(--color-border)]/80 shadow-[0_1px_2px_rgba(11,31,68,0.04)] hover:border-[var(--color-teal)]/35">
                <span className="w-11 h-11 rounded-2xl bg-[var(--color-blue)]/10 text-[var(--color-blue)] flex items-center justify-center mb-5">
                  <IconWallet className="w-5 h-5" />
                </span>
                <h3 className="text-[18px] font-bold text-[var(--color-navy)] mb-6">
                  {scheme.title}
                </h3>
                <ol className="space-y-4">
                  {scheme.milestones.map((milestone) => (
                    <li key={milestone.label} className="flex items-baseline gap-4">
                      <span className="flex-shrink-0 w-[52px] text-[19px] font-bold text-[var(--color-teal-dark)] tabular-nums">
                        {milestone.pct}
                      </span>
                      <span className="text-[15px] text-[var(--color-gray-dark)] leading-[1.5]">
                        {milestone.label}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={60}>
          <p className="mt-8 text-[15px] text-[var(--color-gray-dark)]/90 leading-[1.7] text-center max-w-[640px] mx-auto">
            {note}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import AppIcon from "@/components/marketing/appIcons";

/**
 * §1 y §40 — Los tres tipos de costo de un proyecto, presentados como tres
 * bloques claramente separados para que no se confundan entre sí:
 * desarrollo (pago de proyecto), infraestructura (terceros, recurrente) y
 * continuidad y soporte (servicio mensual SYNEXA).
 *
 * Cierra con la frase de transparencia (§30), que tiene peso propio.
 */
const TONES = {
  blue: "bg-[var(--color-blue)]/10 text-[var(--color-blue)]",
  teal: "bg-[var(--color-teal)]/12 text-[var(--color-teal-dark)]",
};

export default function CostModelExplainer({ model, statement }) {
  return (
    <section id="tipos-de-costo" className="section-pad bg-white scroll-mt-20">
      <Container>
        <Reveal className="max-w-[780px] mb-12 lg:mb-14">
          <Eyebrow>Cómo se compone el costo</Eyebrow>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
            Desarrollo, infraestructura y soporte son cosas distintas
          </h2>
          <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7]">
            Separarlos evita sorpresas: cada uno se cobra de una forma diferente y
            algunos ni siquiera los cobra SYNEXA.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {model.map((item, i) => (
            <Reveal key={item.id} delay={i * 70} className="h-full">
              <article className="card-hover h-full flex flex-col p-8 rounded-[1.75rem] bg-gradient-to-b from-white to-[var(--color-surface-muted)] border border-[var(--color-border)]/80 shadow-[0_1px_2px_rgba(11,31,68,0.04)] hover:border-[var(--color-teal)]/35">
                <span
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                    TONES[item.tone] ?? TONES.blue
                  }`}
                >
                  <AppIcon name={item.icon} className="w-5 h-5" />
                </span>

                <h3 className="text-[19px] font-bold text-[var(--color-navy)] leading-snug mb-2">
                  {item.label}
                </h3>
                <p className="text-[15.5px] font-semibold text-[var(--color-navy)]/80 leading-snug mb-4">
                  {item.summary}
                </p>
                <p className="text-[15px] text-[var(--color-gray-dark)] leading-[1.65] mb-7">
                  {item.text}
                </p>

                <div className="mt-auto pt-5 border-t border-[var(--color-border)]/80">
                  <p className="text-[11.5px] font-bold uppercase tracking-[0.1em] text-[var(--color-gray-dark)]/60 mb-1.5">
                    Cómo se cobra
                  </p>
                  <p className="text-[15px] font-bold text-[var(--color-navy)]">
                    {item.billing}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* §30 — Transparencia, con presencia propia */}
        <Reveal delay={80}>
          <p className="mt-10 lg:mt-12 p-8 lg:p-10 rounded-[1.75rem] bg-[var(--color-navy)] text-white text-[18px] sm:text-[20px] leading-[1.6] font-semibold text-balance text-center">
            {statement}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

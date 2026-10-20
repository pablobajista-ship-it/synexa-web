import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import AppIcon from "@/components/marketing/appIcons";
import { APP_CAPABILITIES } from "@/data/appExamples";

export default function AppsCapabilities() {
  return (
    <section className="py-12 sm:py-14 lg:py-16 bg-white">
      <Container>
        <Reveal className="max-w-[640px] mb-8 lg:mb-10">
          <Eyebrow>Qué puede hacer una solución digital</Eyebrow>
          <h2 className="text-[1.75rem] sm:text-[2.25rem] leading-[1.15] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-3 text-balance">
            Tres formas en que tu negocio puede aprovecharla.
          </h2>
        </Reveal>
        <ul className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {APP_CAPABILITIES.map((c, i) => (
            <Reveal key={c.title} as="li" delay={i * 70}>
              <div className="h-full rounded-2xl border border-[var(--color-border)]/80 bg-gradient-to-b from-white to-[var(--color-surface-muted)] p-6 shadow-[0_1px_2px_rgba(11,31,68,0.04)]">
                <span className="w-11 h-11 rounded-xl bg-[var(--color-blue)]/[0.09] text-[var(--color-blue)] flex items-center justify-center mb-4">
                  <AppIcon name={c.icon} className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-bold text-[var(--color-navy)] mb-2">{c.title}</h3>
                <p className="text-[15px] leading-[1.6] text-[var(--color-gray-dark)] mb-3">{c.text}</p>
                <p className="text-[13.5px] leading-[1.55] text-[var(--color-gray-dark)]/80 border-t border-[var(--color-border)] pt-3">
                  <span className="font-semibold text-[var(--color-teal-dark)]">Ejemplo: </span>
                  {c.example}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

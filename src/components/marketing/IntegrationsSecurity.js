import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import AppIcon from "@/components/marketing/appIcons";
import { IconShield, IconCheck } from "@/components/marketing/icons";

/**
 * §23 + §24 — Integraciones y seguridad.
 * El texto evita promesas absolutas: la seguridad se describe como un
 * conjunto de decisiones de diseño, no como una garantía.
 */
export default function IntegrationsSecurity({ integrations, security }) {
  return (
    <section className="section-pad bg-white">
      <Container>
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-start">
          {/* ---------- Integraciones ---------- */}
          <Reveal>
            <Eyebrow>Integraciones</Eyebrow>
            <h2 className="text-[1.9rem] sm:text-[2.25rem] leading-[1.16] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-4 text-balance">
              {integrations.title}
            </h2>
            <p className="text-[var(--color-gray-dark)] text-[16.5px] leading-[1.7] mb-8">
              {integrations.text}
            </p>

            <ul className="grid sm:grid-cols-2 gap-3">
              {integrations.items.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--color-surface-muted)]/70 border border-[var(--color-border)]/60 transition-colors duration-300 hover:border-[var(--color-teal)]/35"
                >
                  <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-white border border-[var(--color-border)] text-[var(--color-blue)] flex items-center justify-center">
                    <AppIcon name={item.icon} className="w-[18px] h-[18px]" />
                  </span>
                  <span className="text-[14.5px] font-semibold text-[var(--color-navy)] leading-snug">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* ---------- Seguridad ---------- */}
          <Reveal delay={80}>
            <div className="p-8 lg:p-9 rounded-[1.75rem] bg-gradient-to-b from-white to-[var(--color-surface-muted)] border border-[var(--color-border)]/80 shadow-[0_1px_2px_rgba(11,31,68,0.04)]">
              <span className="w-12 h-12 rounded-2xl bg-[var(--color-teal)]/12 text-[var(--color-teal-dark)] flex items-center justify-center mb-6">
                <IconShield className="w-6 h-6" />
              </span>
              <h2 className="text-[1.6rem] sm:text-[1.8rem] leading-[1.2] font-bold tracking-[-0.02em] text-[var(--color-navy)] mb-4 text-balance">
                {security.title}
              </h2>
              <p className="text-[var(--color-gray-dark)] text-[15.5px] leading-[1.7] mb-7">
                {security.text}
              </p>

              <ul className="space-y-2.5">
                {security.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-teal)]/15 text-[var(--color-teal-dark)] flex items-center justify-center">
                      <IconCheck className="w-3 h-3" />
                    </span>
                    <span className="text-[15px] text-[var(--color-gray-dark)]">{item}</span>
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

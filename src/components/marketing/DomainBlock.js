import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import ProviderCard from "@/components/marketing/ProviderCard";
import { IconShield, IconCheck } from "@/components/marketing/icons";

/**
 * §4–§8 — Dominio.
 *
 * La política de propiedad (§7) va en un bloque destacado y no dentro de un
 * desplegable: es el punto más importante de toda la sección para el cliente.
 */
export default function DomainBlock({ domain, providers }) {
  return (
    <section id="infra-dominio" className="section-pad bg-white scroll-mt-20">
      <Container>
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-start">
          {/* ---------- Izquierda: qué es y qué implica ---------- */}
          <Reveal>
            <Eyebrow>Dominio</Eyebrow>
            <h3 className="text-[1.9rem] sm:text-[2.25rem] leading-[1.16] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
              La dirección de tu empresa en Internet
            </h3>
            <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7] mb-6">
              {domain.intro}
            </p>

            <ul className="flex flex-wrap gap-2.5 mb-8">
              {domain.examples.map((example) => (
                <li
                  key={example}
                  className="text-[14.5px] font-semibold text-[var(--color-navy)] bg-[var(--color-surface-muted)] border border-[var(--color-border)] rounded-full px-4 py-1.5"
                >
                  {example}
                </li>
              ))}
            </ul>

            <ul className="space-y-3 mb-9">
              {domain.facts.map((fact) => (
                <li key={fact} className="flex gap-3">
                  <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-[var(--color-teal)]/15 text-[var(--color-teal-dark)] flex items-center justify-center">
                    <IconCheck className="w-3 h-3" />
                  </span>
                  <span className="text-[15px] text-[var(--color-gray-dark)] leading-[1.65]">
                    {fact}
                  </span>
                </li>
              ))}
            </ul>

            {/* §7 — Propiedad del dominio */}
            <div className="relative overflow-hidden p-8 rounded-[1.75rem] bg-[var(--color-navy)]">
              <div className="pointer-events-none absolute inset-0 text-white/[0.07] dot-grid" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(70% 70% at 90% 10%, rgba(20,184,166,0.28), transparent 70%)",
                }}
              />
              <div className="relative">
                <span className="w-12 h-12 rounded-2xl bg-[var(--color-teal)]/20 text-[var(--color-teal)] flex items-center justify-center mb-5">
                  <IconShield className="w-6 h-6" />
                </span>
                <p className="text-[21px] sm:text-[23px] font-bold text-white leading-snug mb-3 text-balance">
                  {domain.ownership.title}
                </p>
                <p className="text-white/70 text-[15.5px] leading-[1.7] mb-6">
                  {domain.ownership.text}
                </p>
                <p className="text-[11.5px] font-bold uppercase tracking-[0.1em] text-[var(--color-teal)] mb-3">
                  SYNEXA puede encargarse de
                </p>
                <ul className="flex flex-wrap gap-2">
                  {domain.ownership.synexaHandles.map((item) => (
                    <li
                      key={item}
                      className="text-[12.5px] font-semibold text-white/85 bg-white/[0.08] border border-white/15 rounded-full px-3 py-1"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* ---------- Derecha: registradores + servicio ---------- */}
          <Reveal delay={80}>
            <p className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-[var(--color-gray-dark)]/60 mb-4">
              Dónde se registra
            </p>
            <div className="grid sm:grid-cols-2 gap-5 mb-6">
              {providers.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} icon="globe" />
              ))}
            </div>

            {/* §8 — Administración de dominio */}
            <div className="p-8 rounded-[1.75rem] bg-gradient-to-b from-white to-[var(--color-surface-muted)] border border-[var(--color-border)]/80">
              <h4 className="text-[19px] font-bold text-[var(--color-navy)] mb-2.5">
                {domain.managedService.title}
              </h4>
              <p className="text-[15px] text-[var(--color-gray-dark)] leading-[1.65] mb-6">
                {domain.managedService.text}
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-2.5 mb-6">
                {domain.managedService.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="flex-shrink-0 w-[18px] h-[18px] rounded-full bg-[var(--color-teal)]/15 text-[var(--color-teal-dark)] flex items-center justify-center">
                      <IconCheck className="w-2.5 h-2.5" />
                    </span>
                    <span className="text-[14.5px] text-[var(--color-gray-dark)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-[13.5px] font-semibold text-[var(--color-navy)] pt-5 border-t border-[var(--color-border)]/80">
                {domain.managedService.priceLabel}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

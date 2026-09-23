import Container from "@/components/ui/Container";
import Reveal from "@/components/marketing/Reveal";
import { IconWallet, IconExternal } from "@/components/marketing/icons";

/**
 * §28, §29 y §31 — Caja informativa de costos de terceros, moneda extranjera
 * y la separación explícita entre el costo del proveedor y el servicio de
 * administración de SYNEXA (sin márgenes ocultos).
 */
export default function ThirdPartyCosts({ costs }) {
  return (
    <section className="section-pad bg-white">
      <Container>
        <Reveal>
          <div className="p-8 lg:p-10 rounded-[1.75rem] bg-[var(--color-surface-muted)] border border-[var(--color-border)]/80">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14">
              <div>
                <span className="w-12 h-12 rounded-2xl bg-[var(--color-blue)]/10 text-[var(--color-blue)] flex items-center justify-center mb-6">
                  <IconWallet className="w-5 h-5" />
                </span>
                <h3 className="text-[1.5rem] sm:text-[1.75rem] leading-[1.22] font-bold tracking-[-0.02em] text-[var(--color-navy)] mb-4 text-balance">
                  {costs.title}
                </h3>
                <p className="text-[var(--color-gray-dark)] text-[16px] leading-[1.75]">
                  {costs.text}
                </p>
              </div>

              <div className="space-y-5">
                <div className="p-6 rounded-2xl bg-white border border-[var(--color-border)]/80">
                  <div className="flex items-center gap-2.5 mb-3">
                    <IconExternal
                      className="w-4 h-4 text-[var(--color-teal-dark)]"
                      aria-hidden="true"
                    />
                    <p className="text-[15.5px] font-bold text-[var(--color-navy)] leading-snug">
                      {costs.currencyTitle}
                    </p>
                  </div>
                  <p className="text-[14.5px] text-[var(--color-gray-dark)] leading-[1.7]">
                    {costs.currencyText}
                  </p>
                </div>

                {/* §31 — Sin márgenes ocultos */}
                <div className="p-6 rounded-2xl bg-white border-l-[3px] border-[var(--color-teal)] border-y border-r border-y-[var(--color-border)]/80 border-r-[var(--color-border)]/80">
                  <p className="text-[14.5px] text-[var(--color-gray-dark)] leading-[1.7]">
                    {costs.marginNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

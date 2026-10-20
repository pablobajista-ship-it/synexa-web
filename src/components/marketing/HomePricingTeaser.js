import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Reveal from "@/components/marketing/Reveal";
import { IconArrowRight } from "@/components/marketing/icons";
import { TAX_LABEL } from "@/data/servicesPricing";
import {
  SHOWROOM_FAMILIES,
  SHOWROOM_HREF,
  SHOWROOM_TOTAL_PACKAGES,
} from "@/data/showroomTeaser";
import { formatAmount } from "@/lib/pricing";

/**
 * Bloque de la Homepage que presenta el SYNEXA Showroom (/servicios-y-precios):
 * un resumen por familia con el precio de entrada. Los datos salen de
 * src/data/showroomTeaser.js, copia mínima del catálogo del Showroom.
 */
export default function HomePricingTeaser() {
  return (
    <section className="section-pad bg-[var(--color-surface-muted)]">
      <Container>
        <Reveal className="max-w-[780px] mb-12 lg:mb-14">
          <Eyebrow>Servicios y precios</Eyebrow>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.6rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
            Explora {SHOWROOM_TOTAL_PACKAGES} paquetes con precio y demo.
          </h2>
          <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7]">
            Compara paquetes, mira una demostración de cada uno y arma tu solución en
            nuestro Showroom. Los valores son de referencia y el precio final depende
            del alcance.
          </p>
        </Reveal>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {SHOWROOM_FAMILIES.map((family, i) => (
            <Reveal key={family.id} delay={i * 70} as="li" className="h-full">
              <a
                href={SHOWROOM_HREF}
                className="card-hover group h-full flex flex-col p-7 rounded-[1.75rem] border border-[var(--color-border)]/80 bg-white shadow-[0_1px_2px_rgba(11,31,68,0.04)] hover:border-[var(--color-teal)]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] focus-visible:ring-offset-2"
              >
                <span className="block text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-blue)] mb-2.5">
                  {family.name}
                </span>
                <p className="text-[15px] text-[var(--color-gray-dark)] leading-snug mb-5">
                  {family.description}
                </p>
                <p className="text-[13px] font-semibold text-[var(--color-gray-dark)] mb-1">
                  {family.packages} {family.packages === 1 ? "paquete" : "paquetes"}
                </p>
                <p className="mt-auto text-[var(--color-navy)]">
                  <span className="text-[13px] font-semibold text-[var(--color-gray-dark)] mr-1.5">
                    Desde
                  </span>
                  <span className="text-[1.75rem] font-bold tracking-[-0.01em]">
                    {formatAmount(family.from)}
                  </span>
                  <span className="text-[13px] font-semibold text-[var(--color-gray-dark)] ml-1.5">
                    {TAX_LABEL}
                  </span>
                </p>
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 text-center">
          <Button href={SHOWROOM_HREF} variant="primary" size="lg">
            Entrar al Showroom
            <IconArrowRight className="w-4 h-4" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

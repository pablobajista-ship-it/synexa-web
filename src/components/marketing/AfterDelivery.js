import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Reveal from "@/components/marketing/Reveal";
import { IconCheck } from "@/components/marketing/icons";
import { AFTER_DELIVERY, CONTRACT_MODES, MAINTENANCE_HREF } from "@/data/maintenance";

/**
 * Explica las dos modalidades de contratación y qué ocurre tras la entrega.
 * No toca el catálogo: solo aporta contexto comercial.
 */
export default function AfterDelivery() {
  return (
    <section id="despues-de-la-entrega" className="section-pad bg-white scroll-mt-20">
      <Container>
        <Reveal className="max-w-[780px] mb-10 lg:mb-12">
          <Eyebrow>Modalidades de contratación</Eyebrow>
          <h2 className="text-[2rem] sm:text-[2.5rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 text-balance">
            ¿Qué ocurre después de entregar tu sitio web?
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6 mb-6">
          {CONTRACT_MODES.map((mode, i) => (
            <Reveal key={mode.id} delay={i * 60} className="h-full">
              <div className="h-full rounded-2xl border border-[var(--color-border)]/80 bg-[var(--color-surface-muted)]/60 p-6 sm:p-7">
                <h3 className="text-[18px] font-bold text-[var(--color-navy)] mb-2">{mode.title}</h3>
                <p className="text-[15px] leading-[1.65] text-[var(--color-gray-dark)]">{mode.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="rounded-2xl border border-[var(--color-border)]/80 p-6 sm:p-8">
            <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {AFTER_DELIVERY.map((text, i) => (
                <li key={text} className="flex gap-3.5">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-navy)] text-white text-[13px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-[15px] leading-[1.6] text-[var(--color-gray-dark)] pt-1">{text}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 flex gap-2.5 text-[13.5px] leading-[1.6] text-[var(--color-gray-dark)]/90">
              <span className="flex-shrink-0 w-[18px] h-[18px] mt-0.5 rounded-full bg-[var(--color-teal)]/15 text-[var(--color-teal-dark)] flex items-center justify-center">
                <IconCheck className="w-2.5 h-2.5" />
              </span>
              Mantenimiento, hosting, dominio, garantía del trabajo entregado y nuevas funcionalidades son
              conceptos distintos: no se asumen incluidos salvo que la propuesta lo indique.
            </p>
            <div className="mt-6">
              <Button href={MAINTENANCE_HREF} variant="secondary" size="md">
                Consultar planes de mantenimiento
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

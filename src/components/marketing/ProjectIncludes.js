import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import { IconCheck } from "@/components/marketing/icons";

/**
 * "Todo proyecto SYNEXA incluye" (§12) + aclaración de costos externos (§13).
 * Los ítems marcados como `conditional` se muestran con la nota
 * "cuando corresponda" para no presentarlos como obligatorios.
 */
export default function ProjectIncludes({ items, externalCostsNote }) {
  return (
    <section className="section-pad bg-white">
      <Container>
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
          <Reveal>
            <Eyebrow>Siempre incluido</Eyebrow>
            <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
              Todo proyecto SYNEXA incluye
            </h2>
            <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7]">
              Independiente del tamaño del proyecto, hay una base de trabajo que no se
              negocia. Lo que depende del servicio contratado va marcado como{" "}
              <span className="font-semibold text-[var(--color-navy)]">
                cuando corresponda
              </span>
              .
            </p>
          </Reveal>

          <Reveal delay={80}>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
              {items.map((item) => (
                <li
                  key={item.label}
                  className="flex gap-3 p-4 rounded-2xl bg-[var(--color-surface-muted)]/70 border border-[var(--color-border)]/60"
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-xl bg-[var(--color-teal)]/15 text-[var(--color-teal-dark)] flex items-center justify-center">
                    <IconCheck className="w-4 h-4" />
                  </span>
                  <span className="text-[15px] text-[var(--color-navy)] font-semibold leading-snug">
                    {item.label}
                    {item.conditional ? (
                      <span className="block text-[13px] font-normal text-[var(--color-gray-dark)]/80 mt-0.5">
                        cuando corresponda
                      </span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-8 p-6 rounded-2xl bg-[var(--color-blue)]/[0.05] border border-[var(--color-blue)]/15 text-[14.5px] text-[var(--color-gray-dark)] leading-[1.7]">
              <span className="font-bold text-[var(--color-navy)] block mb-1.5">
                Costos de terceros
              </span>
              {externalCostsNote}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

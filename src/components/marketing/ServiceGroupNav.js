import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/marketing/Reveal";
import { IconArrowRight } from "@/components/marketing/icons";

/**
 * Tres accesos visuales bajo el hero: Presencia Digital, Comercio y Procesos,
 * Sistemas y Plataformas. Cada tarjeta ancla al bloque de servicios de ese
 * grupo más abajo en la página.
 */
export default function ServiceGroupNav({ groups }) {
  return (
    <section className="relative bg-white py-14 sm:py-16 lg:py-20">
      <Container>
        <nav aria-label="Categorías de servicios">
          <ul className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {groups.map((group, i) => (
              <Reveal key={group.id} delay={i * 80} as="li" className="h-full">
                <a
                  href={`#grupo-${group.id}`}
                  className="card-hover group h-full flex flex-col p-7 lg:p-8 rounded-[1.75rem] border border-[var(--color-border)]/80 bg-gradient-to-b from-white to-[var(--color-surface-muted)] shadow-[0_1px_2px_rgba(11,31,68,0.04)] hover:border-[var(--color-teal)]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] focus-visible:ring-offset-2"
                >
                  <div className="relative w-[72px] h-[72px] mb-5 transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transform-none">
                    <Image
                      src={group.image}
                      alt=""
                      fill
                      sizes="72px"
                      loading="lazy"
                      className="object-contain"
                    />
                  </div>

                  <span className="block text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-blue)] mb-2.5">
                    {group.name}
                  </span>
                  <p className="text-[16px] font-semibold text-[var(--color-navy)] leading-snug mb-4">
                    {group.tagline}
                  </p>

                  <ul className="flex flex-wrap gap-2 mb-6">
                    {group.highlights.map((item) => (
                      <li
                        key={item}
                        className="text-[12.5px] font-semibold text-[var(--color-gray-dark)] bg-white border border-[var(--color-border)] rounded-full px-3 py-1"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto inline-flex items-center gap-2 text-[14px] font-bold text-[var(--color-blue)] group-hover:text-[var(--color-blue-dark)]">
                    Ver servicios
                    <IconArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}

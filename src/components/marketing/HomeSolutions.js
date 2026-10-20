import Image from "next/image";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import { IconArrowRight } from "@/components/marketing/icons";
import { HOME_SOLUTIONS } from "@/data/home";

/** Tres grandes soluciones comerciales; cada una enlaza a su familia del Showroom. */
export default function HomeSolutions() {
  return (
    <section id="soluciones" className="section-pad bg-white scroll-mt-20">
      <Container>
        <Reveal className="max-w-[680px] mb-12 lg:mb-14">
          <Eyebrow>Qué podemos hacer por ti</Eyebrow>
          <h2 className="text-[2rem] sm:text-[2.5rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 text-balance">
            Tres formas de llevar tu negocio al siguiente nivel.
          </h2>
        </Reveal>
        <ul className="grid md:grid-cols-3 gap-6">
          {HOME_SOLUTIONS.map((s, i) => (
            <Reveal key={s.id} as="li" delay={i * 80} className="h-full">
              <a
                href={s.href}
                className="card-hover group h-full flex flex-col overflow-hidden rounded-[1.75rem] border border-[var(--color-border)]/80 bg-white shadow-[0_1px_2px_rgba(11,31,68,0.04)] hover:border-[var(--color-teal)]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-navy)]">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 1200px) 380px, (min-width: 768px) 33vw, 92vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
                  />
                </div>
                <div className="flex flex-col flex-1 p-7">
                  <h3 className="text-[1.3rem] font-bold text-[var(--color-navy)] mb-2.5">{s.title}</h3>
                  <p className="text-[15.5px] leading-[1.65] text-[var(--color-gray-dark)] mb-6">{s.text}</p>
                  <span className="mt-auto inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--color-blue)]">
                    Ver opciones y precios
                    <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

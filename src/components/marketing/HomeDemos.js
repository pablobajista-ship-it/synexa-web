import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/marketing/Reveal";
import { IconArrowRight } from "@/components/marketing/icons";
import { HOME_DEMOS } from "@/data/home";
import { SHOWROOM_HREF } from "@/data/showroomTeaser";

/** Capturas reales de demos del Showroom dentro de un marco de navegador. */
export default function HomeDemos() {
  return (
    <section className="section-pad relative overflow-hidden bg-[var(--color-navy)]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 50% at 85% 5%, rgba(37,99,235,0.3), transparent 70%), radial-gradient(40% 45% at 5% 95%, rgba(20,184,166,0.2), transparent 70%)",
        }}
      />
      <Container className="relative">
        <Reveal className="max-w-[720px] mb-12 lg:mb-14">
          <span className="inline-flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.14em] text-[var(--color-teal)]">
            <span className="w-7 h-px bg-[var(--color-teal)]" />
            Explora nuestros diseños
          </span>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] leading-[1.12] font-bold tracking-[-0.02em] text-white mt-4 mb-5 text-balance">
            Mira cómo podría verse tu próximo proyecto.
          </h2>
          <p className="text-white/72 text-[17px] leading-[1.7]">
            Explora ejemplos de páginas web y soluciones digitales diseñadas para distintos
            tipos de negocios.
          </p>
        </Reveal>

        <ul className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {HOME_DEMOS.map((d, i) => (
            <Reveal key={d.id} as="li" delay={(i % 2) * 80}>
              <a
                href={`/demos/${d.id}`}
                aria-label={`Visitar la demo ${d.name}`}
                className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-navy)]"
              >
                <div className="rounded-2xl overflow-hidden bg-[#0d2550] ring-1 ring-white/12 shadow-2xl shadow-black/40 transition-transform duration-300 group-hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                  <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0a1b3d] border-b border-white/10" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                  </div>
                  <div className="relative aspect-[1440/862]">
                    <Image
                      src={d.image}
                      alt={`Captura de la demo ${d.name}`}
                      fill
                      sizes="(min-width: 1200px) 560px, (min-width: 640px) 46vw, 92vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                <div className="flex items-end justify-between gap-4 mt-5 px-1">
                  <div>
                    <h3 className="text-xl font-bold text-white">{d.name}</h3>
                    <p className="text-[14.5px] text-[var(--color-teal)] font-semibold mt-0.5">{d.category}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-[14.5px] font-semibold text-white/85 group-hover:text-white whitespace-nowrap">
                    Visitar demo
                    <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 text-center">
          <Button href={SHOWROOM_HREF} plain variant="accent" size="lg">
            Explorar todas las demos y precios
            <IconArrowRight className="w-4 h-4" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

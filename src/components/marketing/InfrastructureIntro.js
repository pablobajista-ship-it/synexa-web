import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import AppIcon from "@/components/marketing/appIcons";

/**
 * §2 y §3 — Cabecera de la nueva área comercial y sus tres pilares.
 * Los pilares son anclas hacia los bloques de detalle que vienen después.
 */
export default function InfrastructureIntro({ pillars }) {
  return (
    <section
      id="infraestructura"
      className="section-pad bg-[var(--color-surface-muted)] scroll-mt-20"
    >
      <Container>
        <Reveal className="max-w-[800px] mb-12 lg:mb-14">
          <Eyebrow>Infraestructura</Eyebrow>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-4 text-balance">
            Infraestructura y servicios externos
          </h2>
          <p className="text-[19px] sm:text-[21px] font-semibold text-[var(--color-navy)] leading-[1.5] mb-5">
            La tecnología que mantiene tu proyecto funcionando.
          </p>
          <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7] mb-4">
            Además del desarrollo, algunos proyectos requieren servicios externos como
            dominio, alojamiento, base de datos, almacenamiento o plataformas de
            terceros.
          </p>
          <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7]">
            Estos costos dependen de las características y consumo de cada proyecto y se
            informan antes de su contratación.
          </p>
        </Reveal>

        <nav aria-label="Áreas de infraestructura">
          <ul className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.id} delay={i * 70} as="li" className="h-full">
                <a
                  href={`#infra-${pillar.id}`}
                  className="card-hover group h-full flex flex-col p-7 rounded-[1.75rem] bg-white border border-[var(--color-border)]/80 shadow-[0_1px_2px_rgba(11,31,68,0.04)] hover:border-[var(--color-teal)]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] focus-visible:ring-offset-2"
                >
                  <span className="w-12 h-12 rounded-2xl bg-[var(--color-teal)]/12 text-[var(--color-teal-dark)] flex items-center justify-center mb-5 transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transform-none">
                    <AppIcon name={pillar.icon} className="w-5 h-5" />
                  </span>
                  <h3 className="text-[19px] font-bold text-[var(--color-navy)] leading-snug mb-2.5">
                    {pillar.title}
                  </h3>
                  <p className="text-[15px] text-[var(--color-gray-dark)] leading-[1.65]">
                    {pillar.text}
                  </p>
                </a>
              </Reveal>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}

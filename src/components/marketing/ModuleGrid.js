import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import AppIcon from "@/components/marketing/appIcons";

/**
 * §8 — "¿Qué puede tener una aplicación?".
 * Módulos reutilizables presentados como piezas combinables, no como una
 * lista de funcionalidades obligatorias.
 */
export default function ModuleGrid({ modules }) {
  return (
    <section className="section-pad bg-[var(--color-surface-muted)]">
      <Container>
        <Reveal className="max-w-[760px] mb-12 lg:mb-14">
          <Eyebrow>Módulos</Eyebrow>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
            ¿Qué puede tener una aplicación?
          </h2>
          <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7]">
            Cada sistema puede combinar diferentes módulos según las necesidades del
            negocio. Ninguno es obligatorio: se eligen los que resuelven tu operación.
          </p>
        </Reveal>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3 lg:gap-4">
          {modules.map((module, i) => (
            <Reveal key={module.label} delay={i * 25} as="li" className="h-full">
              <div className="group h-full flex flex-col items-center text-center gap-3 px-3 py-6 rounded-2xl bg-white border border-[var(--color-border)]/70 transition-colors duration-300 hover:border-[var(--color-teal)]/40">
                <span className="w-11 h-11 rounded-xl bg-[var(--color-blue)]/[0.08] text-[var(--color-blue)] flex items-center justify-center transition-colors duration-300 group-hover:bg-[var(--color-teal)]/12 group-hover:text-[var(--color-teal-dark)]">
                  <AppIcon name={module.icon} className="w-5 h-5" />
                </span>
                <span className="text-[13.5px] font-semibold text-[var(--color-navy)] leading-snug">
                  {module.label}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import AppIcon from "@/components/marketing/appIcons";
import { APP_LEVELS, APP_NOTES } from "@/data/appExamples";

/** Diferencia web / aplicación y notas breves (permisos, dispositivos, integraciones, seguridad). */
export default function AppsLevels() {
  return (
    <section className="py-12 sm:py-14 lg:py-16 bg-[var(--color-surface-muted)]">
      <Container>
        <Reveal className="max-w-[680px] mb-8 lg:mb-10">
          <Eyebrow>Web o aplicación</Eyebrow>
          <h2 className="text-[1.75rem] sm:text-[2.25rem] leading-[1.15] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-3 mb-3 text-balance">
            Soluciones de distinta complejidad.
          </h2>
          <p className="text-[var(--color-gray-dark)] text-[16px] leading-[1.65]">
            Cada nivel suma posibilidades. Las funciones dependen del alcance que definamos contigo.
          </p>
        </Reveal>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-10">
          {APP_LEVELS.map((l, i) => (
            <Reveal key={l.title} as="li" delay={i * 50}>
              <div className="h-full rounded-xl border border-[var(--color-border)]/80 bg-white p-4">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-8 h-8 rounded-lg bg-[var(--color-blue)]/[0.09] text-[var(--color-blue)] flex items-center justify-center flex-shrink-0">
                    <AppIcon name={l.icon} className="w-4 h-4" />
                  </span>
                  <h3 className="text-[15px] font-bold leading-tight text-[var(--color-navy)]">{l.title}</h3>
                </div>
                <p className="text-[13.5px] leading-[1.55] text-[var(--color-gray-dark)]">{l.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 border-t border-[var(--color-border)] pt-8">
          {APP_NOTES.map((n) => (
            <li key={n.title} className="flex gap-3">
              <span className="w-9 h-9 rounded-lg bg-[var(--color-teal)]/12 text-[var(--color-teal-dark)] flex items-center justify-center flex-shrink-0">
                <AppIcon name={n.icon} className="w-[18px] h-[18px]" />
              </span>
              <div>
                <h3 className="text-[14.5px] font-bold text-[var(--color-navy)] mb-1">{n.title}</h3>
                <p className="text-[13.5px] leading-[1.55] text-[var(--color-gray-dark)]">{n.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

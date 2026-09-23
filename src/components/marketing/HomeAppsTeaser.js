import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Reveal from "@/components/marketing/Reveal";
import AppIcon from "@/components/marketing/appIcons";
import { IconArrowRight } from "@/components/marketing/icons";

/**
 * §35 — Bloque de la Homepage que presenta "Aplicaciones para Negocios".
 * Deliberadamente breve: su trabajo es despertar el interés y llevar a
 * /aplicaciones-para-negocios, no explicar la oferta completa.
 */
const EXAMPLES = [
  { label: "Veterinarias", icon: "paw" },
  { label: "Clínicas", icon: "pulse" },
  { label: "Talleres", icon: "wrench" },
  { label: "Reservas", icon: "calendar" },
  { label: "Servicios técnicos", icon: "route" },
  { label: "Gestión empresarial", icon: "grid" },
];

export default function HomeAppsTeaser() {
  return (
    <section className="section-pad bg-white">
      <Container>
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
          <Reveal>
            <Eyebrow>Aplicaciones para negocios</Eyebrow>
            <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.6rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
              Software para la forma en que trabaja tu empresa.
            </h2>
            <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7] mb-8 max-w-[520px]">
              Clientes, reservas, fichas, documentos, órdenes de servicio y procesos
              empresariales dentro de soluciones desarrolladas a medida.
            </p>
            <Button href="/aplicaciones-para-negocios" variant="primary" size="lg">
              Descubrir aplicaciones para negocios
              <IconArrowRight className="w-4 h-4" />
            </Button>
          </Reveal>

          <Reveal delay={90}>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {EXAMPLES.map((example) => (
                <li key={example.label}>
                  <div className="card-hover h-full flex flex-col items-center text-center gap-3 px-3 py-6 rounded-2xl border border-[var(--color-border)]/80 bg-gradient-to-b from-white to-[var(--color-surface-muted)] shadow-[0_1px_2px_rgba(11,31,68,0.04)] hover:border-[var(--color-teal)]/35">
                    <span className="w-11 h-11 rounded-xl bg-[var(--color-blue)]/[0.08] text-[var(--color-blue)] flex items-center justify-center">
                      <AppIcon name={example.icon} className="w-5 h-5" />
                    </span>
                    <span className="text-[13.5px] font-semibold text-[var(--color-navy)] leading-snug">
                      {example.label}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-[13.5px] text-[var(--color-gray-dark)]/75 leading-[1.6] mt-5 text-center">
              Ejemplos de soluciones que podemos desarrollar.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

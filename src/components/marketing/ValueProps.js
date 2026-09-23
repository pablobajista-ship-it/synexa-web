import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import DashboardShowcase from "@/components/marketing/DashboardShowcase";
import { IconCheck } from "@/components/marketing/icons";

const VALUES = [
  {
    title: "Soluciones a medida",
    text: "Cada proyecto se diseña para tu negocio, no al revés.",
  },
  {
    title: "Soporte confiable",
    text: "Acompañamiento real después del lanzamiento, no solo durante la entrega.",
  },
  {
    title: "Enfoque en resultados",
    text: "Medimos el impacto de cada solución en tu operación, no solo su entrega.",
  },
  {
    title: "Visión tecnológica",
    text: "Elegimos la tecnología correcta para cada problema, sin sobre-ingeniería.",
  },
  {
    title: "Atención a empresas",
    text: "Entendemos los tiempos y las prioridades de un negocio en crecimiento.",
  },
];

export default function ValueProps() {
  return (
    <section id="nosotros" className="section-pad bg-[var(--color-surface-muted)]">
      <Container className="grid lg:grid-cols-2 gap-14 lg:gap-16 xl:gap-20 items-center">
        <Reveal>
          <Eyebrow>Por qué SYNEXA</Eyebrow>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
            Un mundo más conectado para tu negocio
          </h2>
          <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7] mb-9 max-w-[540px]">
            Desarrollamos soluciones digitales que conectan personas, procesos y
            oportunidades — con la seriedad de un partner tecnológico de largo plazo.
          </p>

          <ul className="space-y-6">
            {VALUES.map((v) => (
              <li key={v.title} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-[var(--color-teal)]/15 text-[var(--color-teal-dark)] flex items-center justify-center mt-0.5">
                  <IconCheck className="w-[18px] h-[18px]" />
                </span>
                <div>
                  <p className="font-bold text-[var(--color-navy)] text-[16px] mb-1">{v.title}</p>
                  <p className="text-[15px] text-[var(--color-gray-dark)] leading-[1.65]">
                    {v.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100}>
          <DashboardShowcase />
        </Reveal>
      </Container>
    </section>
  );
}

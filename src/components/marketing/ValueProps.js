import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
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
    <section id="nosotros" className="py-20 sm:py-24 bg-[var(--color-surface-muted)]">
      <Container className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-start">
        <div>
          <Eyebrow>Por qué SYNEXA</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-navy)] mt-3 mb-4">
            Un mundo más conectado para tu negocio
          </h2>
          <p className="text-[var(--color-gray-dark)] leading-relaxed">
            Desarrollamos soluciones digitales que conectan personas, procesos y
            oportunidades — con la seriedad de un partner tecnológico de largo plazo.
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 gap-5">
          {VALUES.map((v) => (
            <li key={v.title} className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-teal)]/15 text-[var(--color-teal-dark)] flex items-center justify-center mt-0.5">
                <IconCheck className="w-4 h-4" />
              </span>
              <div>
                <p className="font-bold text-[var(--color-navy)] text-sm mb-0.5">{v.title}</p>
                <p className="text-[13.5px] text-[var(--color-gray-dark)] leading-relaxed">{v.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

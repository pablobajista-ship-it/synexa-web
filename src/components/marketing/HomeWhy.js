import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import { IconSliders, IconTag, IconShield } from "@/components/marketing/icons";

const REASONS = [
  { icon: IconSliders, title: "Diseño adaptado a tu negocio", text: "Cada proyecto responde a las características, necesidades y objetivos de tu empresa." },
  { icon: IconTag, title: "Precios y alcances claros", text: "Conoces las características de cada servicio y comprendes los costos involucrados." },
  { icon: IconShield, title: "Acompañamiento técnico", text: "Te orientamos durante la implementación y en los servicios posteriores, según lo contratado." },
];

export default function HomeWhy() {
  return (
    <section id="nosotros" className="section-pad bg-[var(--color-surface-muted)] scroll-mt-20">
      <Container>
        <Reveal className="max-w-[680px] mb-12">
          <Eyebrow>Por qué elegir SYNEXA</Eyebrow>
          <h2 className="text-[2rem] sm:text-[2.5rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 text-balance">
            Soluciones claras, pensadas para tu negocio.
          </h2>
        </Reveal>
        <ul className="grid md:grid-cols-3 gap-x-10 gap-y-9">
          {REASONS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} as="li" delay={i * 80} className="border-t-2 border-[var(--color-teal)]/60 pt-6">
              <span className="w-11 h-11 rounded-xl bg-[var(--color-blue)]/[0.09] text-[var(--color-blue)] flex items-center justify-center mb-4">
                <Icon className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-bold text-[var(--color-navy)] mb-2">{title}</h3>
              <p className="text-[15.5px] leading-[1.65] text-[var(--color-gray-dark)]">{text}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

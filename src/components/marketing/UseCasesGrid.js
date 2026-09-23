import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import {
  IconCart,
  IconCalendar,
  IconUsers,
  IconLayers,
  IconDatabase,
  IconLayout,
  IconSettings,
  IconTag,
  IconLink,
  IconSliders,
} from "@/components/marketing/icons";

const USE_CASES = [
  {
    icon: IconCart,
    label: "Tienda Online",
    text: "Vende productos y servicios desde una plataforma adaptada a tu negocio.",
  },
  {
    icon: IconCalendar,
    label: "Sistema de Reservas",
    text: "Automatiza horas, agenda y disponibilidad sin planillas.",
  },
  {
    icon: IconUsers,
    label: "Portal de Clientes",
    text: "Centraliza documentos, solicitudes y comunicación con tus clientes.",
  },
  {
    icon: IconLayers,
    label: "Catálogo Digital",
    text: "Muestra tu oferta completa, siempre actualizada y fácil de navegar.",
  },
  {
    icon: IconDatabase,
    label: "Base de Datos Empresarial",
    text: "Ordena tu información y consúltala sin depender de archivos sueltos.",
  },
  {
    icon: IconLayout,
    label: "Landing Page",
    text: "Una página enfocada en un objetivo concreto: captar y convertir.",
  },
  {
    icon: IconSettings,
    label: "Sistema Interno",
    text: "Digitaliza los procesos que hoy resuelves a mano en tu equipo.",
  },
  {
    icon: IconTag,
    label: "Portal de Promociones",
    text: "Publica campañas y beneficios con control total del contenido.",
  },
  {
    icon: IconLink,
    label: "Integraciones",
    text: "Conecta los sistemas que ya usas para que hablen entre sí.",
  },
  {
    icon: IconSliders,
    label: "Soluciones Personalizadas",
    text: "Si tu necesidad no encaja en una caja, la diseñamos contigo.",
  },
];

export default function UseCasesGrid() {
  return (
    <section className="section-pad bg-[var(--color-surface-muted)]">
      <Container>
        <Reveal className="max-w-[720px] mb-12 lg:mb-14">
          <Eyebrow>Casos de uso</Eyebrow>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
            ¿Qué podemos construir para tu negocio?
          </h2>
          <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7]">
            Cada empresa tiene necesidades diferentes. Diseñamos soluciones digitales
            adaptadas a la forma en que trabajas.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5">
          {USE_CASES.map(({ icon: Icon, label, text }, i) => (
            <Reveal key={label} delay={i * 40} className="h-full">
              <article className="card-hover group h-full flex flex-col gap-3 p-6 rounded-2xl border border-[var(--color-border)]/80 bg-white shadow-[0_1px_2px_rgba(11,31,68,0.04)] hover:border-[var(--color-teal)]/35">
                <span
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transform-none ${
                    i % 2 === 0
                      ? "bg-[var(--color-blue)]/10 text-[var(--color-blue)]"
                      : "bg-[var(--color-teal)]/12 text-[var(--color-teal-dark)]"
                  }`}
                >
                  <Icon className="w-[22px] h-[22px]" />
                </span>
                <h3 className="text-[15.5px] font-bold text-[var(--color-navy)] leading-snug">
                  {label}
                </h3>
                <p className="text-[14px] text-[var(--color-gray-dark)] leading-[1.6]">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

import Image from "next/image";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";

export const HOME_PROCESS_STEPS = [
  {
    n: "01",
    title: "Analizamos",
    text: "Entendemos tu negocio, tus procesos y el problema real a resolver.",
    image: "/images/proceso/01-analizamos.webp",
  },
  {
    n: "02",
    title: "Diseñamos",
    text: "Proponemos una solución clara, con alcance y expectativas definidas.",
    image: "/images/proceso/02-disenamos.webp",
  },
  {
    n: "03",
    title: "Desarrollamos",
    text: "Construimos con buenas prácticas, pensando en que el proyecto escale.",
    image: "/images/proceso/03-desarrollamos.webp",
  },
  {
    n: "04",
    title: "Implementamos",
    text: "Ponemos la solución en producción sin sorpresas ni tiempos muertos.",
    image: "/images/proceso/04-implementamos.webp",
  },
  {
    n: "05",
    title: "Acompañamos",
    text: "Seguimos disponibles después del lanzamiento, con soporte real.",
    image: "/images/proceso/05-acompanamos.webp",
  },
];

/**
 * Proceso de trabajo en 5 etapas. Los textos son props para poder reutilizar
 * el mismo bloque en la Homepage y en /aplicaciones-para-negocios, donde el
 * proceso es el mismo pero el contenido se adapta a aplicaciones
 * empresariales. Los valores por defecto son los de la Homepage.
 */
export default function ProcessSteps({
  id = "servicios",
  eyebrow = "Cómo trabajamos",
  title = "Un proceso simple, de principio a fin",
  description = "Cinco etapas claras, sin tecnicismos: sabes en todo momento en qué punto está tu proyecto y qué viene después.",
  steps = HOME_PROCESS_STEPS,
  className = "bg-white",
}) {
  return (
    <section id={id} className={`section-pad scroll-mt-20 ${className}`}>
      <Container>
        <Reveal className="max-w-[720px] mb-12 lg:mb-16">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
            {title}
          </h2>
          <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7]">
            {description}
          </p>
        </Reveal>

        {/* El <Reveal> exterior dispara el "dibujado" de la línea conectora
            (.process-line) al entrar en viewport. */}
        <Reveal className="relative">
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12">
            {/* línea conectora con gradiente azul → teal, solo desktop */}
            <div
              className="process-line hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-[2px] rounded-full"
              aria-hidden="true"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(37,99,235,0.45) 15%, rgba(20,184,166,0.55) 85%, transparent)",
              }}
            />

            {steps.map((step, i) => (
              <div
                key={step.n}
                className="group relative flex items-start gap-6 lg:block lg:gap-0 transition-transform duration-300 ease-out lg:hover:-translate-y-1 motion-reduce:transform-none"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="relative w-[84px] h-[84px] lg:w-[104px] lg:h-[104px] shrink-0 lg:mb-6 bg-white rounded-2xl lg:z-10">
                  {/* glow teal al hover */}
                  <span className="absolute inset-2 rounded-full bg-[var(--color-teal)]/0 blur-xl transition-colors duration-300 group-hover:bg-[var(--color-teal)]/25" />
                  <Image
                    src={step.image}
                    alt=""
                    fill
                    sizes="104px"
                    loading="lazy"
                    className="relative object-contain transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transform-none"
                  />
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[var(--color-navy)] text-white text-[12px] font-bold flex items-center justify-center ring-4 ring-white">
                    {step.n}
                  </span>
                </div>
                <div className="lg:pr-3">
                  <h3 className="font-bold text-[var(--color-navy)] text-[20px] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[15px] text-[var(--color-gray-dark)] leading-[1.65]">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

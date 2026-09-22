import Image from "next/image";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";

const STEPS = [
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

export default function ProcessSteps() {
  return (
    <section id="servicios" className="py-20 sm:py-24 bg-white">
      <Container>
        <div className="max-w-2xl mb-14">
          <Eyebrow>Cómo trabajamos</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-navy)] mt-3 mb-4">
            Un proceso simple, de principio a fin
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {STEPS.map((step, i) => (
            <div key={step.n} className="relative">
              <div className="relative w-16 h-16 mb-4">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="64px"
                  className="object-contain"
                />
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--color-navy)] text-white text-[10px] font-bold flex items-center justify-center">
                  {step.n}
                </span>
              </div>
              <h3 className="font-bold text-[var(--color-navy)] mb-1.5">{step.title}</h3>
              <p className="text-[13.5px] text-[var(--color-gray-dark)] leading-relaxed">
                {step.text}
              </p>
              {i < STEPS.length - 1 ? (
                <span className="hidden lg:block absolute top-8 -right-3 w-6 h-px bg-[var(--color-border)]" />
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

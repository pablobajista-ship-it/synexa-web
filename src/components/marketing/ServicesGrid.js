import Image from "next/image";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import Button from "@/components/ui/Button";
import { IconArrowRight } from "@/components/marketing/icons";

const SERVICES = [
  {
    image: "/images/servicios/01-sitios-web.webp",
    title: "Sitios Web",
    text: "Sitios corporativos rápidos, responsivos y fáciles de mantener.",
  },
  {
    image: "/images/servicios/02-bases-de-datos.webp",
    title: "Bases de Datos",
    text: "Diseño y administración de datos ordenados, seguros y escalables.",
  },
  {
    image: "/images/servicios/03-ecommerce.webp",
    title: "E-commerce",
    text: "Tiendas online listas para vender, desde el catálogo hasta el pago.",
  },
  {
    image: "/images/servicios/04-portales-plataformas.webp",
    title: "Portales y Plataformas",
    text: "Portales de clientes, promociones y servicios a medida de tu negocio.",
  },
  {
    image: "/images/servicios/05-soluciones-medida.webp",
    title: "Soluciones a Medida",
    text: "Integraciones y desarrollos a medida cuando lo estándar no alcanza.",
  },
  {
    image: "/images/servicios/06-soporte-optimizacion.webp",
    title: "Soporte y Optimización",
    text: "Acompañamiento técnico continuo y mejoras de rendimiento.",
  },
];

export default function ServicesGrid() {
  return (
    <section id="soluciones" className="section-pad bg-white">
      <Container>
        <Reveal className="max-w-[720px] mb-12 lg:mb-14">
          <Eyebrow>Soluciones</Eyebrow>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
            Todo lo que tu empresa necesita, en un mismo lugar
          </h2>
          <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7]">
            Desde el primer sitio web hasta plataformas complejas: te acompañamos en cada
            etapa del crecimiento digital de tu negocio.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {SERVICES.map(({ image, title, text }, i) => (
            <Reveal key={title} delay={i * 60} className="h-full">
              <article className="card-hover group h-full flex flex-col p-8 lg:p-9 rounded-[1.75rem] border border-[var(--color-border)]/80 bg-gradient-to-b from-white to-[var(--color-surface-muted)] shadow-[0_1px_2px_rgba(11,31,68,0.04)] hover:border-[var(--color-teal)]/35">
                <div className="relative w-[76px] h-[76px] lg:w-[88px] lg:h-[88px] mb-6 transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transform-none">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="88px"
                    loading="lazy"
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bold text-[var(--color-navy)] text-[21px] leading-snug mb-3">
                  {title}
                </h3>
                <p className="text-[15px] text-[var(--color-gray-dark)] leading-[1.7] mb-7">
                  {text}
                </p>
                <a
                  href="#contacto"
                  className="mt-auto inline-flex items-center gap-2 text-[14px] font-bold text-[var(--color-blue)] hover:text-[var(--color-blue-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] rounded"
                >
                  <span>
                    Conversemos
                    <span className="sr-only"> sobre {title}</span>
                  </span>
                  <IconArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-12 flex flex-col sm:flex-row sm:items-center justify-center gap-4 text-center">
          <p className="text-[15px] text-[var(--color-gray-dark)]">
            ¿Quieres ver el detalle de cada servicio?
          </p>
          <Button href="/servicios-y-precios" variant="secondary" size="lg">
            Ver servicios y precios
            <IconArrowRight className="w-4 h-4" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

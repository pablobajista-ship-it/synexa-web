import Image from "next/image";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Eyebrow from "@/components/ui/Eyebrow";
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
    <section id="soluciones" className="py-20 sm:py-24 bg-white">
      <Container>
        <div className="max-w-2xl mb-12">
          <Eyebrow>Soluciones</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-navy)] mt-3 mb-4">
            Todo lo que tu empresa necesita, en un mismo lugar
          </h2>
          <p className="text-[var(--color-gray-dark)] text-base leading-relaxed">
            Desde el primer sitio web hasta plataformas complejas: te acompañamos en
            cada etapa del crecimiento digital de tu negocio.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(({ image, title, text }) => (
            <Card key={title} className="p-6 hover:border-[var(--color-blue)] transition-colors">
              <div className="relative w-14 h-14 mb-4">
                <Image src={image} alt={title} fill sizes="56px" className="object-contain" />
              </div>
              <h3 className="font-bold text-[var(--color-navy)] mb-1.5">{title}</h3>
              <p className="text-[13.5px] text-[var(--color-gray-dark)] leading-relaxed mb-4">
                {text}
              </p>
              <a
                href="#contacto"
                className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--color-blue)] hover:text-[var(--color-blue-dark)]"
              >
                Conversemos
                <IconArrowRight className="w-3.5 h-3.5" />
              </a>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

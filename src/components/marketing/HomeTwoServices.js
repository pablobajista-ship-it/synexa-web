import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Reveal from "@/components/marketing/Reveal";
import { IconArrowRight, IconCheck, IconLayout, IconWrench } from "@/components/marketing/icons";
import { TWO_SERVICES } from "@/data/maintenance";

/**
 * Dos líneas de servicio: desarrollo (principal, acento azul y botón relleno)
 * y mantenimiento (opcional, acento turquesa y botón secundario).
 */
function ServiceCard({ service, icon: Icon, tone, primary, delay }) {
  const accent =
    tone === "blue"
      ? "bg-[var(--color-blue)]/10 text-[var(--color-blue)]"
      : "bg-[var(--color-teal)]/15 text-[var(--color-teal-dark)]";

  return (
    <Reveal delay={delay} className="h-full">
      <article
        className={`card-hover h-full flex flex-col rounded-[1.75rem] bg-white p-7 sm:p-9 ${
          primary
            ? "border-2 border-[var(--color-blue)]/25 shadow-[0_18px_44px_-24px_rgba(37,99,235,0.35)]"
            : "border border-[var(--color-border)]/80 shadow-[0_1px_2px_rgba(11,31,68,0.04)] hover:border-[var(--color-teal)]/40"
        }`}
      >
        <div className="flex items-center justify-between gap-3 mb-6">
          <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accent}`}>
            <Icon className="w-6 h-6" />
          </span>
          <span className={`text-[11.5px] font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full ${accent}`}>
            {service.badge}
          </span>
        </div>
        <h3 className="text-[1.6rem] font-bold tracking-[-0.01em] text-[var(--color-navy)] mb-3">{service.title}</h3>
        <p className="text-[15.5px] leading-[1.7] text-[var(--color-gray-dark)] mb-6">{service.text}</p>
        <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-2.5 mb-6">
          {service.benefits.map((b) => (
            <li key={b} className="flex gap-2.5">
              <span className="flex-shrink-0 w-[18px] h-[18px] mt-0.5 rounded-full bg-[var(--color-teal)]/15 text-[var(--color-teal-dark)] flex items-center justify-center">
                <IconCheck className="w-2.5 h-2.5" />
              </span>
              <span className="text-[14.5px] leading-[1.55] text-[var(--color-gray-dark)]">{b}</span>
            </li>
          ))}
        </ul>
        {service.note ? (
          <p className="text-[13px] text-[var(--color-gray-dark)]/80 mb-6">{service.note}</p>
        ) : null}
        <div className="mt-auto pt-2">
          <Button
            href={service.cta.href}
            plain={service.cta.href.startsWith("/servicios-y-precios")}
            variant={primary ? "primary" : "secondary"}
            size="lg"
          >
            {service.cta.label}
            <IconArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </article>
    </Reveal>
  );
}

export default function HomeTwoServices() {
  return (
    <section id="servicios-y-mantenimiento" className="section-pad bg-[var(--color-surface-muted)] scroll-mt-20">
      <Container>
        <Reveal className="max-w-[780px] mb-12 lg:mb-14">
          <Eyebrow>Desarrollo y mantenimiento</Eyebrow>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
            Creamos tu sitio web. También te ayudamos a mantenerlo.
          </h2>
          <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7]">
            Desde el desarrollo inicial hasta el soporte posterior, puedes elegir los servicios que tu negocio realmente necesita.
          </p>
        </Reveal>
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <ServiceCard service={TWO_SERVICES.development} icon={IconLayout} tone="blue" primary delay={0} />
          <ServiceCard service={TWO_SERVICES.maintenance} icon={IconWrench} tone="teal" delay={80} />
        </div>
      </Container>
    </section>
  );
}

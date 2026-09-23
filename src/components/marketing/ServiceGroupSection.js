import Image from "next/image";
import Reveal from "@/components/marketing/Reveal";
import ServicePricingCard from "@/components/marketing/ServicePricingCard";

/**
 * Un grupo de servicios: encabezado con el ícono 3D corporativo + la grilla
 * de tarjetas de ese grupo. Soporta cualquier cantidad de servicios sin
 * cambios de diseño.
 */
export default function ServiceGroupSection({ group, services, index = 0 }) {
  if (!services?.length) return null;

  return (
    <div id={`grupo-${group.id}`} className="scroll-mt-28">
      <Reveal delay={index * 60} className="flex items-center gap-5 mb-8">
        <div className="relative w-[64px] h-[64px] lg:w-[72px] lg:h-[72px] shrink-0">
          <Image
            src={group.image}
            alt=""
            fill
            sizes="72px"
            loading="lazy"
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="text-[24px] sm:text-[28px] font-bold text-[var(--color-navy)] leading-tight tracking-[-0.01em]">
            {group.name}
          </h3>
          <p className="text-[15px] text-[var(--color-gray-dark)] leading-[1.6] mt-1">
            {group.tagline}
          </p>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
        {services.map((service, i) => (
          <Reveal key={service.id} delay={i * 50} className="h-full">
            <ServicePricingCard service={service} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

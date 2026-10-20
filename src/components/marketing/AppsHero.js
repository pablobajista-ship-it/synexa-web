import Image from "next/image";
import Button from "@/components/ui/Button";
import { IconArrowRight } from "@/components/marketing/icons";

/** Marco de navegador con una captura real de una demostración de SYNEXA. */
function Frame({ src, alt, label, className, priority = false, sizes }) {
  return (
    <figure className={`absolute rounded-xl overflow-hidden bg-[#0d2550] ring-1 ring-white/15 shadow-2xl shadow-black/50 ${className}`}>
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0a1b3d] border-b border-white/10" aria-hidden="true">
        <span className="w-2 h-2 rounded-full bg-white/25" />
        <span className="w-2 h-2 rounded-full bg-white/25" />
        <span className="w-2 h-2 rounded-full bg-white/25" />
        <span className="ml-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-teal)]">{label}</span>
      </div>
      <div className="relative aspect-[1440/862]">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </div>
    </figure>
  );
}

export default function AppsHero({ contactHref }) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)]">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-60" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(48% 60% at 8% 15%, rgba(37,99,235,0.3), transparent 70%), radial-gradient(40% 55% at 92% 90%, rgba(20,184,166,0.22), transparent 70%)",
        }}
      />
      <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8 grid lg:grid-cols-[46%_54%] items-center gap-10 lg:gap-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-[540px]">
          <span
            className="hero-enter inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[var(--color-teal)] mb-6"
            style={{ "--d": "0ms" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-teal)] shadow-[0_0_10px_2px_rgba(20,184,166,0.7)]" />
            Aplicaciones para negocios
          </span>
          <h1
            className="hero-enter text-[2.3rem] leading-[1.08] sm:text-[3rem] xl:text-[3.4rem] font-bold tracking-[-0.025em] text-white mb-5 text-balance"
            style={{ "--d": "90ms" }}
          >
            Descubre lo que una solución digital puede hacer{" "}
            <span className="bg-gradient-to-r from-[#5b93ff] to-[var(--color-teal)] bg-clip-text text-transparent">
              por tu negocio.
            </span>
          </h1>
          <p className="hero-enter text-[17px] text-white/75 leading-[1.65] mb-8" style={{ "--d": "180ms" }}>
            Desde mostrar tus productos y recibir reservas hasta organizar clientes y procesos
            internos. Explora ejemplos de cómo una página web o aplicación puede ayudarte a
            trabajar mejor.
          </p>
          <div className="hero-enter flex flex-col sm:flex-row sm:flex-wrap gap-3.5" style={{ "--d": "270ms" }}>
            <Button href="#ejemplos" variant="accent" size="xl">
              Explorar aplicaciones
              <IconArrowRight className="w-4 h-4 rotate-90" />
            </Button>
            <Button href={contactHref} variant="on-dark-outline" size="xl">
              Cuéntanos tu proyecto
            </Button>
          </div>
        </div>

        {/* Composición de capturas reales de demostraciones */}
        <div className="hero-enter relative" style={{ "--d": "200ms" }}>
          <div className="relative w-full aspect-[16/12] sm:aspect-[16/11]">
            <Frame
              src="/images/aplicaciones/demo-servimant.webp"
              alt="Captura de una demostración de gestión de órdenes de trabajo"
              label="Gestión"
              sizes="(min-width: 1200px) 420px, 60vw"
              priority
              className="left-0 top-0 w-[68%]"
            />
            <Frame
              src="/images/aplicaciones/demo-minimarket.webp"
              alt="Captura de una demostración de catálogo para minimarket"
              label="Catálogo y tienda"
              sizes="(min-width: 1200px) 340px, 50vw"
              priority
              className="right-0 top-[22%] w-[56%]"
            />
            <Frame
              src="/images/aplicaciones/demo-reservas.webp"
              alt="Captura de una demostración de reserva de horas para una barbería"
              label="Reservas"
              sizes="(min-width: 1200px) 300px, 45vw"
              priority
              className="left-[12%] bottom-0 w-[50%]"
            />
          </div>
          <p className="mt-3 text-[12px] text-white/50 text-right">
            Capturas de demostraciones de SYNEXA.
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-teal)]/40 to-transparent" />
    </section>
  );
}

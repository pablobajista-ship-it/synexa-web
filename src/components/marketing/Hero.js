import Image from "next/image";
import Button from "@/components/ui/Button";
import HeroCards from "@/components/marketing/HeroCards";
import { IconCheck } from "@/components/marketing/icons";

const HIGHLIGHTS = ["Soluciones a medida", "Soporte cercano", "Tecnología escalable"];

const HERO_ALT = "Sala de reuniones moderna de SYNEXA con vista nocturna a la ciudad";

/* Luz de marca (azul → teal) que unifica la foto con la paleta. */
const BRAND_LIGHT =
  "linear-gradient(135deg, rgba(37,99,235,0.45), transparent 45%, rgba(20,184,166,0.35))";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)] lg:min-h-[640px] xl:min-h-[680px] flex">
      {/* ---------- Fondo tecnológico (profundidad, muy sutil) ---------- */}
      <div className="pointer-events-none absolute inset-0 tech-grid" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 12% 18%, rgba(37,99,235,0.28), transparent 70%), radial-gradient(40% 50% at 92% 88%, rgba(20,184,166,0.2), transparent 70%)",
        }}
      />
      {/* Línea geométrica diagonal, casi imperceptible */}
      <div
        className="pointer-events-none absolute -top-40 left-[46%] h-[160%] w-px rotate-[18deg] opacity-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(20,184,166,0.5) 40%, rgba(37,99,235,0.4) 60%, transparent)",
        }}
      />
      {/* Puntos luminosos mínimos */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        <span className="absolute left-[8%] top-[22%] w-1 h-1 rounded-full bg-[var(--color-teal)]/70 shadow-[0_0_12px_2px_rgba(20,184,166,0.5)]" />
        <span className="absolute left-[40%] top-[12%] w-1.5 h-1.5 rounded-full bg-[var(--color-blue)]/70 shadow-[0_0_14px_3px_rgba(37,99,235,0.5)]" />
        <span className="absolute left-[30%] bottom-[16%] w-1 h-1 rounded-full bg-white/50 shadow-[0_0_10px_2px_rgba(255,255,255,0.35)]" />
      </div>

      {/* ---------- Fotografía desktop: avanza hacia el centro ----------
          Ocupa el 62% derecho de la sección y se funde con el navy por la
          izquierda y por la base, sin división dura. object-position hacia
          la derecha para mostrar la mesa de reuniones y el skyline. */}
      <div className="absolute inset-y-0 right-0 hidden lg:block w-[58%] xl:w-[62%]">
        <Image
          src="/images/hero-synexa.webp"
          alt={HERO_ALT}
          fill
          sizes="(min-width: 1280px) 62vw, (min-width: 1024px) 58vw, 100vw"
          className="object-cover object-[78%_center]"
          priority
        />
        {/* Fusión hacia el navy: izquierda (ancha) + base + techo */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #0b1f44 0%, rgba(11,31,68,0.96) 18%, rgba(11,31,68,0.7) 34%, rgba(11,31,68,0.25) 52%, transparent 72%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)] via-[var(--color-navy)]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy)]/45 via-transparent to-transparent" />
        <div className="absolute inset-0 mix-blend-overlay opacity-80" style={{ background: BRAND_LIGHT }} />
        {/* Tarjetas glass sobre la mitad derecha de la foto */}
        <HeroCards className="left-[30%]" />
      </div>

      {/* ---------- Contenido ---------- */}
      <div className="relative w-full max-w-[1200px] mx-auto px-5 sm:px-8 grid lg:grid-cols-[54%_46%] items-center pt-14 pb-10 sm:pt-20 sm:pb-12 lg:py-24">
        <div className="relative z-10 max-w-[600px]">
          <span
            className="hero-enter inline-flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.16em] text-[var(--color-teal)] mb-5"
            style={{ "--d": "0ms" }}
          >
            <span className="w-7 h-px bg-[var(--color-teal)]" />
            Soluciones digitales para empresas
          </span>
          <h1
            className="hero-enter text-[2.75rem] leading-[1.06] sm:text-[3.4rem] lg:text-[3.6rem] xl:text-[4.15rem] font-bold tracking-[-0.02em] text-white mb-6 text-balance"
            style={{ "--d": "90ms" }}
          >
            Tecnología que conecta, simplifica y hace crecer tu negocio.
          </h1>
          <p
            className="hero-enter text-[17px] sm:text-lg lg:text-[19px] text-white/72 leading-[1.65] mb-9 max-w-[540px]"
            style={{ "--d": "180ms" }}
          >
            Diseñamos y desarrollamos sitios web, e-commerce, bases de datos, portales y
            soluciones digitales a medida para empresas que quieren avanzar.
          </p>
          <div
            className="hero-enter flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3.5 mb-10"
            style={{ "--d": "270ms" }}
          >
            <Button href="#contacto" variant="accent" size="xl">
              Cuéntanos tu proyecto
            </Button>
            <Button href="#soluciones" variant="on-dark-outline" size="xl">
              Ver soluciones
            </Button>
          </div>

          <ul className="hero-enter flex flex-wrap items-center gap-x-8 gap-y-3" style={{ "--d": "360ms" }}>
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[15px] text-white/85">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-teal)]/20 text-[var(--color-teal)] flex items-center justify-center">
                  <IconCheck className="w-3.5 h-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile / tablet: la foto se apila bajo el texto, con el mismo
            tratamiento y las tarjetas glass encima. */}
        <div className="hero-enter lg:hidden relative mt-12 sm:mt-14" style={{ "--d": "420ms" }}>
          <div className="absolute -inset-6 rounded-[2rem] bg-[var(--color-blue)]/20 blur-3xl" />
          <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-black/40">
            <Image
              src="/images/hero-synexa.webp"
              alt={HERO_ALT}
              fill
              sizes="(min-width: 640px) 90vw, 100vw"
              className="object-cover object-[75%_center]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/70 via-transparent to-[var(--color-navy)]/20" />
            <div className="absolute inset-0 mix-blend-overlay opacity-80" style={{ background: BRAND_LIGHT }} />
            <HeroCards compact />
          </div>
        </div>
      </div>

      {/* Transición suave hacia la sección blanca siguiente */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-teal)]/40 to-transparent" />
    </section>
  );
}

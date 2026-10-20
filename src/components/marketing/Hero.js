import Image from "next/image";
import Button from "@/components/ui/Button";
import { IconArrowRight } from "@/components/marketing/icons";
import {
  SHOWROOM_FAMILIES,
  SHOWROOM_HREF,
  SHOWROOM_TOTAL_PACKAGES,
} from "@/data/showroomTeaser";
import { formatAmount } from "@/lib/pricing";

const HERO_ALT =
  "Monitor, notebook y teléfono mostrando diseños de páginas web modernas sobre un escritorio oscuro";

const FROM_PRICE = Math.min(...SHOWROOM_FAMILIES.map((f) => f.from));

/* Datos reales del Showroom, no inventados. */
const STATS = [
  { value: String(SHOWROOM_TOTAL_PACKAGES), label: "paquetes con demo" },
  { value: String(SHOWROOM_FAMILIES.length), label: "familias de soluciones" },
  { value: formatAmount(FROM_PRICE), label: "precio de entrada + IVA" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)] lg:min-h-[760px] xl:min-h-[820px] flex flex-col">
      {/* Imagen a sangre: ocupa el fondo completo en desktop y se funde con el navy a la izquierda */}
      <div
        className="absolute right-[-6%] top-1/2 -translate-y-[52%] hidden lg:block w-[60%] aspect-[3/2]"
        style={{
          WebkitMaskImage: "radial-gradient(ellipse 72% 72% at 55% 50%, #000 45%, transparent 100%)",
          maskImage: "radial-gradient(ellipse 72% 72% at 55% 50%, #000 45%, transparent 100%)",
        }}
      >
        <Image
          src="/images/home/hero-home.webp"
          alt={HERO_ALT}
          fill
          sizes="62vw"
          className="object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #0b1f44 0%, rgba(11,31,68,0.85) 14%, rgba(11,31,68,0.4) 34%, rgba(11,31,68,0.05) 55%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--color-navy)] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[var(--color-navy)]/60 to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-60" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 55% at 8% 20%, rgba(37,99,235,0.3), transparent 70%), radial-gradient(35% 45% at 70% 100%, rgba(20,184,166,0.22), transparent 70%)",
        }}
      />

      <div className="relative flex-1 w-full max-w-[1240px] mx-auto px-5 sm:px-8 flex items-center pt-16 pb-10 sm:pt-24 lg:pt-28 lg:pb-12">
        <div className="relative z-10 max-w-[640px]">
          <span
            className="hero-enter inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur px-4 py-1.5 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[var(--color-teal)] mb-7"
            style={{ "--d": "0ms" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-teal)] shadow-[0_0_10px_2px_rgba(20,184,166,0.7)]" />
            Soluciones digitales para empresas
          </span>
          <h1
            className="hero-enter text-[2.9rem] leading-[1.04] sm:text-[4rem] xl:text-[4.75rem] font-bold tracking-[-0.03em] text-white mb-7 text-balance"
            style={{ "--d": "90ms" }}
          >
            Creamos páginas web y soluciones digitales{" "}
            <span className="bg-gradient-to-r from-[#5b93ff] to-[var(--color-teal)] bg-clip-text text-transparent">
              para tu negocio.
            </span>
          </h1>
          <p
            className="hero-enter text-[17px] sm:text-[19px] text-white/75 leading-[1.65] mb-10 max-w-[540px]"
            style={{ "--d": "180ms" }}
          >
            Diseñamos sitios web, tiendas online y sistemas personalizados. Conoce nuestros
            ejemplos, revisa los precios y descubre qué podemos crear para ti.
          </p>
          <div
            className="hero-enter flex flex-col sm:flex-row sm:flex-wrap gap-4"
            style={{ "--d": "270ms" }}
          >
            <Button href={SHOWROOM_HREF} plain variant="accent" size="xl" className="shadow-xl shadow-teal-500/30">
              Ver ejemplos y precios
              <IconArrowRight className="w-4 h-4" />
            </Button>
            <Button href="/contacto" variant="on-dark-outline" size="xl">
              Solicitar cotización
            </Button>
          </div>
        </div>
      </div>

      {/* Imagen en móvil/tablet, bajo el texto */}
      <div className="lg:hidden relative px-5 sm:px-8 pb-10">
        <div className="relative aspect-[3/2] rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-2xl shadow-black/50">
          <Image
            src="/images/home/hero-home.webp"
            alt={HERO_ALT}
            fill
            sizes="92vw"
            className="object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>

      {/* Franja de datos reales del Showroom */}
      <div className="relative w-full max-w-[1240px] mx-auto px-5 sm:px-8 pb-8 lg:pb-12">
        <dl className="glass-card rounded-2xl grid grid-cols-3 divide-x divide-white/10 max-w-[760px]">
          {STATS.map((s) => (
            <div key={s.label} className="px-4 sm:px-7 py-4 sm:py-5">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block text-xl sm:text-[1.65rem] font-bold text-white tracking-[-0.01em]">{s.value}</span>
                <span className="block text-[12px] sm:text-[13px] text-white/65 mt-0.5 leading-snug">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-teal)]/40 to-transparent" />
    </section>
  );
}

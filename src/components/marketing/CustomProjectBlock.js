import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/marketing/Reveal";
import { LogoMark } from "@/components/Logo";

/**
 * Bloque oscuro reutilizable para el mensaje "esto también lo diseñamos
 * contigo". Comparte el lenguaje visual del DarkBrandBlock de la Homepage
 * (navy + glows + marca de agua) para que las páginas interiores se sientan
 * parte del mismo sitio. Los textos por defecto son los de
 * /servicios-y-precios.
 */
export default function CustomProjectBlock({
  title = "¿Tu proyecto no encaja en un plan?",
  text = "Cada empresa trabaja de manera distinta. Podemos diseñar una solución completamente adaptada a tus procesos, usuarios y objetivos.",
  secondaryText,
  cta = { label: "Solicitar cotización", href: "#contacto" },
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)] section-pad">
      <div className="pointer-events-none absolute inset-0 text-white/[0.06] dot-grid" />
      <div className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-[3rem] border border-[var(--color-blue)]/20 rotate-12" />
      <div className="pointer-events-none absolute -bottom-24 -right-14 w-72 h-72 rounded-[3rem] border border-[var(--color-teal)]/20 -rotate-12" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(42% 60% at 10% 24%, rgba(37,99,235,0.3), transparent 70%), radial-gradient(42% 60% at 90% 78%, rgba(20,184,166,0.24), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.045]"
        aria-hidden="true"
      >
        <LogoMark size={520} rounded={false} className="w-[min(520px,90vw)] h-auto" />
      </div>

      <Reveal className="relative">
        <Container className="flex flex-col items-center text-center gap-6 max-w-[820px]">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] leading-[1.14] font-bold tracking-[-0.02em] text-white text-balance">
            {title}
          </h2>
          <p className="text-white/72 text-[17px] sm:text-lg leading-[1.7] max-w-[660px]">
            {text}
          </p>
          {secondaryText ? (
            <p className="text-white/60 text-[16px] leading-[1.75] max-w-[680px]">
              {secondaryText}
            </p>
          ) : null}
          <Button href={cta.href} variant="accent" size="xl" className="mt-2">
            {cta.label}
          </Button>
        </Container>
      </Reveal>
    </section>
  );
}

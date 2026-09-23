import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/marketing/Reveal";
import { LogoMark } from "@/components/Logo";

export default function DarkBrandBlock() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)] section-pad">
      {/* patrón de puntos y formas extremadamente sutiles */}
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

      {/* Isotipo SYNEXA como marca de agua, casi transparente */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.045]"
        aria-hidden="true"
      >
        <LogoMark size={560} rounded={false} className="w-[min(560px,90vw)] h-auto" />
      </div>

      <Reveal className="relative">
        <Container className="flex flex-col items-center text-center gap-6 max-w-[820px]">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] leading-[1.12] font-bold tracking-[-0.02em] text-white text-balance">
            No necesitas saber qué tecnología utilizar.
          </h2>
          <p className="text-white/72 text-[17px] sm:text-lg leading-[1.7] max-w-[620px]">
            Cuéntanos qué necesita tu negocio y diseñaremos contigo la solución adecuada.
          </p>
          <Button href="#contacto" variant="accent" size="xl" className="mt-2">
            Conversemos
          </Button>
        </Container>
      </Reveal>
    </section>
  );
}

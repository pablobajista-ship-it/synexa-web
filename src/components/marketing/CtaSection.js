import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function CtaSection() {
  return (
    <section id="contacto" className="py-20 sm:py-24 bg-[var(--color-navy)] relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(40% 60% at 15% 20%, rgba(20,184,166,0.25), transparent), radial-gradient(40% 60% at 85% 80%, rgba(37,99,235,0.3), transparent)",
        }}
      />
      <Container className="relative text-center max-w-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Conversemos sobre tu proyecto
        </h2>
        <p className="text-white/70 leading-relaxed mb-9">
          Contanos qué necesita tu empresa y te ayudamos a definir la mejor solución,
          sin compromiso.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href="mailto:hola@synexa.com" variant="accent" size="lg">
            Hablemos
          </Button>
          <Button href="/login" variant="on-dark-outline" size="lg">
            Portal de clientes
          </Button>
        </div>
      </Container>
    </section>
  );
}

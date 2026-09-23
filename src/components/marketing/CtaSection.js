import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/marketing/Reveal";
import { isPortalEnabled, isPortalHref } from "@/lib/portal";

/**
 * CTA final oscuro. Se usa tanto en la Homepage como en páginas interiores:
 * los textos y botones son configurables por props y mantienen los valores
 * de la Homepage como defecto.
 */
export default function CtaSection({
  id = "contacto",
  eyebrow,
  title = "Conversemos sobre tu proyecto",
  description = "Cuéntanos qué quieres lograr, qué problema necesitas resolver o qué idea tienes en mente. Podemos ayudarte a convertirla en una solución digital.",
  primaryAction = { href: "mailto:hola@synexa.com", label: "Hablemos" },
  secondaryAction = { href: "/login", label: "Portal de Clientes" },
}) {
  /* Si el portal está oculto no se renderizan los botones que llevan a él;
     el CTA queda con una sola acción en vez de ofrecer un acceso roto. */
  const hidePortal = !isPortalEnabled();
  const primary = hidePortal && isPortalHref(primaryAction?.href) ? null : primaryAction;
  const secondary =
    hidePortal && isPortalHref(secondaryAction?.href) ? null : secondaryAction;

  return (
    <section
      id={id}
      className="section-pad bg-[#081736] border-t border-white/10 relative overflow-hidden scroll-mt-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(45% 65% at 15% 15%, rgba(20,184,166,0.28), transparent 70%), radial-gradient(45% 65% at 85% 85%, rgba(37,99,235,0.32), transparent 70%)",
        }}
      />
      {/* Líneas horizontales muy suaves */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-teal)]/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-[12%] top-1/2 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <Reveal className="relative">
        <Container className="text-center max-w-[820px]">
          {eyebrow ? (
            <span className="inline-flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.16em] text-[var(--color-teal)] mb-5">
              <span className="w-7 h-px bg-[var(--color-teal)]" />
              {eyebrow}
            </span>
          ) : null}
          <h2 className="text-[2.15rem] sm:text-[2.75rem] lg:text-[3.25rem] leading-[1.1] font-bold tracking-[-0.02em] text-white mb-6 text-balance">
            {title}
          </h2>
          <p className="text-white/72 text-[17px] sm:text-lg leading-[1.7] mb-10 max-w-[640px] mx-auto">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
            {primary ? (
              <Button href={primary.href} variant="accent" size="xl">
                {primary.label}
              </Button>
            ) : null}
            {secondary ? (
              <Button href={secondary.href} variant="on-dark-outline" size="xl">
                {secondary.label}
              </Button>
            ) : null}
          </div>
        </Container>
      </Reveal>
    </section>
  );
}

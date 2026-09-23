import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";

/**
 * FAQ reutilizable. Usa <details>/<summary> nativos: accesible por teclado
 * y funcional sin JavaScript, sin necesidad de un componente cliente.
 */
export default function FaqSection({
  eyebrow = "Preguntas frecuentes",
  title,
  description,
  items = [],
  className = "",
}) {
  if (!items.length) return null;

  return (
    <section className={`section-pad bg-white ${className}`}>
      <Container>
        <Reveal className="max-w-[720px] mb-10 lg:mb-12">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
            {title}
          </h2>
          {description ? (
            <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7]">{description}</p>
          ) : null}
        </Reveal>

        <div className="max-w-[860px] space-y-4">
          {items.map((item, i) => (
            <Reveal key={item.q} delay={i * 50}>
              <details className="group rounded-2xl border border-[var(--color-border)]/80 bg-[var(--color-surface-muted)]/50 transition-colors duration-200 open:bg-white open:border-[var(--color-teal)]/30 hover:border-[var(--color-teal)]/35">
                <summary className="flex items-center justify-between gap-5 cursor-pointer list-none px-6 py-5 text-[16.5px] font-bold text-[var(--color-navy)] rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-[var(--color-border)] text-[var(--color-blue)] flex items-center justify-center transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                    aria-hidden="true"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 -mt-1">
                  <p className="text-[15.5px] text-[var(--color-gray-dark)] leading-[1.7] max-w-[680px]">
                    {item.a}
                  </p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

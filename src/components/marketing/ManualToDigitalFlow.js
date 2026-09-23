import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import { LogoMark } from "@/components/Logo";
import { IconCheck } from "@/components/marketing/icons";

/**
 * §7 — "De los procesos manuales a una solución digital".
 *
 * Diagrama de tres etapas: lo disperso → la aplicación → el resultado.
 * En desktop las etapas van en fila con flechas; en móvil se apilan en
 * vertical con conectores, sin diagonales ni superposiciones.
 */
export default function ManualToDigitalFlow({ before, after }) {
  return (
    <section className="section-pad bg-white">
      <Container>
        <Reveal className="max-w-[760px] mb-14 lg:mb-16">
          <Eyebrow>El punto de partida</Eyebrow>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
            De los procesos manuales a una solución digital.
          </h2>
          <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7] mb-4">
            Muchas empresas gestionan clientes, reservas, documentos, cotizaciones y
            procesos internos utilizando planillas, correos, WhatsApp y documentos
            separados.
          </p>
          <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7]">
            SYNEXA puede integrar estos procesos dentro de una aplicación web diseñada
            específicamente para la forma en que trabaja tu empresa.
          </p>
        </Reveal>

        <Reveal>
          <div className="grid lg:grid-cols-[1fr_auto_1.1fr_auto_1fr] gap-6 lg:gap-4 items-center">
            {/* ---- Antes ---- */}
            <div className="p-7 rounded-[1.75rem] bg-[var(--color-surface-muted)] border border-[var(--color-border)]/70">
              <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-gray-dark)]/60 mb-5">
                Hoy
              </p>
              <ul className="space-y-2.5">
                {before.map((item) => (
                  <li
                    key={item}
                    className="px-4 py-2.5 rounded-xl bg-white border border-dashed border-[var(--color-border)] text-[14.5px] text-[var(--color-gray-dark)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Arrow />

            {/* ---- La aplicación ---- */}
            <div className="relative overflow-hidden p-8 rounded-[1.75rem] bg-[var(--color-navy)] text-center">
              <div className="pointer-events-none absolute inset-0 text-white/[0.07] dot-grid" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 70% at 50% 0%, rgba(37,99,235,0.35), transparent 70%), radial-gradient(60% 70% at 50% 100%, rgba(20,184,166,0.28), transparent 70%)",
                }}
              />
              <div className="relative flex flex-col items-center">
                <LogoMark size={56} className="mb-5" />
                <p className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-[var(--color-teal)] mb-2">
                  Aplicación SYNEXA
                </p>
                <p className="text-[19px] sm:text-[21px] font-bold text-white leading-snug text-balance">
                  Un solo lugar para la información y los procesos
                </p>
              </div>
            </div>

            <Arrow />

            {/* ---- Después ---- */}
            <div className="p-7 rounded-[1.75rem] bg-white border border-[var(--color-teal)]/30 shadow-[0_18px_44px_-26px_rgba(20,184,166,0.5)]">
              <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-teal-dark)] mb-5">
                Después
              </p>
              <ul className="space-y-2.5">
                {after.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-teal)]/15 text-[var(--color-teal-dark)] flex items-center justify-center">
                      <IconCheck className="w-3 h-3" />
                    </span>
                    <span className="text-[14.5px] font-semibold text-[var(--color-navy)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** Conector: flecha hacia abajo en móvil, hacia la derecha en desktop. */
function Arrow() {
  return (
    <div className="flex lg:block justify-center" aria-hidden="true">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-teal)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="rotate-90 lg:rotate-0 opacity-70"
      >
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
    </div>
  );
}

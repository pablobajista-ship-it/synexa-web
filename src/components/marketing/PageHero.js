import Image from "next/image";
import Container from "@/components/ui/Container";
import { LogoMark } from "@/components/Logo";

/* Luz de marca (azul → teal) que unifica la foto con la paleta; la misma
   que usa el hero de la Homepage. */
const BRAND_LIGHT =
  "linear-gradient(135deg, rgba(37,99,235,0.45), transparent 45%, rgba(20,184,166,0.35))";

/**
 * Hero interior reutilizable para páginas que no son la Homepage.
 * Comparte el lenguaje del hero principal —azul profundo, glows azul/teal,
 * cuadrícula tecnológica, isotipo tenue— con menos altura.
 *
 * `badges` renderiza pequeñas cápsulas glassmorphism bajo el CTA, `note`
 * una frase de apoyo y `aside` una pieza visual a la derecha (que además
 * convierte el hero en dos columnas en desktop).
 *
 * `image` ({ src, alt, position, variant }) agrega una fotografía:
 * - variant "side" (por defecto): ocupa la derecha en desktop y se funde con
 *   el navy hacia la izquierda, como en la Homepage.
 * - variant "backdrop": fondo tenue a lo ancho, para heros con `aside`, donde
 *   la pieza visual debe seguir siendo protagonista.
 * En mobile ambas se muestran como fondo tenue detrás del texto.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  actions,
  badges = [],
  note,
  aside,
  image,
}) {
  const imageVariant = image?.variant ?? "side";

  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)] pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24">
      {image ? <HeroPhoto image={image} variant={imageVariant} /> : null}
      <div className="pointer-events-none absolute inset-0 tech-grid" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(48% 62% at 10% 12%, rgba(37,99,235,0.3), transparent 70%), radial-gradient(42% 58% at 92% 88%, rgba(20,184,166,0.22), transparent 70%)",
        }}
      />
      {/* Formas geométricas sutiles */}
      <div className="pointer-events-none absolute -top-28 right-[12%] w-72 h-72 rounded-[3rem] border border-[var(--color-blue)]/20 rotate-12" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 w-72 h-72 rounded-[3rem] border border-[var(--color-teal)]/18 -rotate-12" />
      <div
        className="pointer-events-none absolute -top-40 left-[58%] h-[180%] w-px rotate-[18deg] opacity-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(20,184,166,0.5) 40%, rgba(37,99,235,0.4) 60%, transparent)",
        }}
      />
      {/* Isotipo como marca de agua (solo sin foto: sobre ella ensucia) */}
      {image ? null : (
        <div
          className="pointer-events-none absolute -right-16 top-1/2 -translate-y-1/2 opacity-[0.06] hidden lg:block"
          aria-hidden="true"
        >
          <LogoMark size={460} rounded={false} className="w-[460px] h-auto" />
        </div>
      )}

      <Container className="relative">
        <div
          className={
            aside
              ? "grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.8fr)] gap-14 lg:gap-12 items-center"
              : ""
          }
        >
        <div className={aside ? "max-w-[660px]" : "max-w-[820px]"}>
          {eyebrow ? (
            <span
              className="hero-enter inline-flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.16em] text-[var(--color-teal)] mb-5"
              style={{ "--d": "0ms" }}
            >
              <span className="w-7 h-px bg-[var(--color-teal)]" />
              {eyebrow}
            </span>
          ) : null}

          <h1
            className="hero-enter text-[2.35rem] sm:text-[2.9rem] lg:text-[3.4rem] leading-[1.08] font-bold tracking-[-0.02em] text-white mb-6 text-balance"
            style={{ "--d": "90ms" }}
          >
            {title}
          </h1>

          {description ? (
            <p
              className="hero-enter text-[17px] sm:text-lg text-white/72 leading-[1.7] max-w-[640px]"
              style={{ "--d": "180ms" }}
            >
              {description}
            </p>
          ) : null}

          {actions ? (
            <div
              className="hero-enter flex flex-col sm:flex-row sm:flex-wrap gap-3.5 mt-9"
              style={{ "--d": "270ms" }}
            >
              {actions}
            </div>
          ) : null}

          {note ? (
            <p
              className="hero-enter text-[14.5px] text-white/60 leading-[1.7] max-w-[560px] mt-7 pl-4 border-l-2 border-[var(--color-teal)]/50"
              style={{ "--d": "330ms" }}
            >
              {note}
            </p>
          ) : null}

          {badges.length > 0 ? (
            <ul
              className="hero-enter flex flex-wrap gap-2.5 mt-9"
              style={{ "--d": "360ms" }}
            >
              {badges.map((badge) => (
                <li
                  key={badge}
                  className="glass-card rounded-full px-4 py-2 text-[13px] font-semibold text-white/85"
                >
                  {badge}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {aside ? (
          <div className="hero-enter" style={{ "--d": "450ms" }}>
            {aside}
          </div>
        ) : null}
        </div>
      </Container>

      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-teal)]/40 to-transparent" />
    </section>
  );
}

/* Fotografía del hero. Una sola <Image> cuyo contenedor cambia por CSS
   (fondo tenue en mobile, panel derecho en desktop) para que el navegador
   descargue un único archivo; con dos <Image> ocultas por breakpoint se
   bajarían ambas. */
function HeroPhoto({ image, variant }) {
  const side = variant === "side";

  return (
    <div
      className={
        side
          ? "pointer-events-none absolute inset-0 lg:left-auto lg:w-[55%] xl:w-[58%]"
          : "pointer-events-none absolute inset-0"
      }
      aria-hidden={image.alt ? undefined : "true"}
    >
      <Image
        src={image.src}
        alt={image.alt ?? ""}
        fill
        sizes={side ? "(min-width: 1280px) 58vw, (min-width: 1024px) 55vw, 100vw" : "100vw"}
        className={side ? "object-cover opacity-30 lg:opacity-100" : "object-cover opacity-80"}
        style={{ objectPosition: image.position ?? "center" }}
        loading="eager"
        fetchPriority="high"
      />

      {side ? (
        <>
          {/* Mobile: velo navy para que el texto se lea sobre la foto */}
          <div className="absolute inset-0 bg-[var(--color-navy)]/60 lg:hidden" />
          {/* Desktop: fusión hacia el navy por la izquierda, base y techo */}
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(to right, #0b1f44 0%, rgba(11,31,68,0.95) 16%, rgba(11,31,68,0.65) 34%, rgba(11,31,68,0.2) 56%, transparent 76%)",
            }}
          />
          <div className="absolute inset-0 hidden lg:block bg-gradient-to-t from-[var(--color-navy)] via-[var(--color-navy)]/10 to-transparent" />
          <div className="absolute inset-0 hidden lg:block bg-gradient-to-b from-[var(--color-navy)]/50 via-transparent to-transparent" />
        </>
      ) : (
        /* Backdrop: más denso a la izquierda (texto) y abierto a la derecha */
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(11,31,68,0.95) 0%, rgba(11,31,68,0.78) 36%, rgba(11,31,68,0.4) 66%, rgba(11,31,68,0.22) 100%)",
          }}
        />
      )}

      <div className="absolute inset-0 mix-blend-overlay opacity-80" style={{ background: BRAND_LIGHT }} />
    </div>
  );
}

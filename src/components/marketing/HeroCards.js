import { IconSliders, IconDatabase, IconLayers } from "@/components/marketing/icons";

/**
 * Pequeñas tarjetas de interfaz (glassmorphism) que flotan sobre la
 * fotografía del hero. Comunican "software moderno" sin competir con el
 * texto. Se posicionan de forma absoluta dentro de un contenedor relativo.
 *
 * `compact` se usa en la versión apilada (mobile/tablet), donde la foto es
 * mucho más pequeña: allí solo caben dos tarjetas y sin la tercera línea.
 */
const CARDS = [
  {
    icon: IconSliders,
    title: "Soluciones a medida",
    text: "Diseñadas para tu negocio",
    tone: "teal",
    position: "left-[6%] top-[20%]",
    compactPosition: "left-[5%] top-[8%]",
    delay: 700,
  },
  {
    icon: IconDatabase,
    title: "Datos + Sistemas",
    text: "Conectados en un solo lugar",
    tone: "blue",
    position: "right-[8%] top-[46%]",
    compactPosition: "right-[5%] bottom-[8%]",
    delay: 850,
  },
  {
    icon: IconLayers,
    title: "Web · E-commerce · Plataformas",
    text: "Un mismo equipo, de principio a fin",
    tone: "teal",
    position: "left-[14%] bottom-[14%] hidden xl:block",
    compactPosition: null, // no cabe en la foto pequeña
    delay: 1000,
  },
];

const TONES = {
  teal: "bg-[var(--color-teal)]/20 text-[var(--color-teal)]",
  blue: "bg-[var(--color-blue)]/25 text-[#7fa6ff]",
};

export default function HeroCards({ className = "", compact = false }) {
  const cards = compact ? CARDS.filter((c) => c.compactPosition) : CARDS;

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {cards.map(({ icon: Icon, title, text, tone, position, compactPosition, delay }, i) => (
        <div
          key={title}
          className={`glass-card hero-enter absolute ${
            compact ? `${compactPosition} max-w-[62%]` : `${position} max-w-[270px]`
          } rounded-2xl ${compact ? "px-3 py-2.5" : "px-4 py-3"}`}
          style={{ "--d": `${delay}ms` }}
        >
          <div
            className={`float-soft flex items-center ${compact ? "gap-2.5" : "gap-3"}`}
            style={{ "--d": `${i * 1300}ms` }}
          >
            <span
              className={`flex-shrink-0 rounded-xl flex items-center justify-center ${
                compact ? "w-7 h-7" : "w-9 h-9"
              } ${TONES[tone]}`}
            >
              <Icon className={compact ? "w-4 h-4" : "w-[18px] h-[18px]"} />
            </span>
            <div className="min-w-0">
              <p
                className={`font-bold text-white leading-tight ${
                  compact ? "text-[12px]" : "text-[13px] whitespace-nowrap"
                }`}
              >
                {title}
              </p>
              <p
                className={`text-white/65 leading-tight mt-0.5 ${
                  compact ? "text-[10.5px]" : "text-[11.5px]"
                }`}
              >
                {text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

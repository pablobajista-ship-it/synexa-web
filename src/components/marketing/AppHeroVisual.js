import AppIcon from "@/components/marketing/appIcons";

/**
 * Pieza visual abstracta del hero: tarjetas de interfaz empresarial
 * conectadas por líneas y nodos. No representa un producto real — es una
 * abstracción de "software y datos" en el lenguaje visual de SYNEXA.
 */
const CARDS = [
  { icon: "users", label: "Clientes", hint: "Ficha e historial", tone: "blue" },
  { icon: "calendar", label: "Agenda", hint: "Citas y disponibilidad", tone: "teal" },
  { icon: "clipboard", label: "Órdenes", hint: "Estados y seguimiento", tone: "teal" },
  { icon: "chart", label: "Reportes", hint: "Actividad del negocio", tone: "blue" },
];

const TONES = {
  blue: "bg-[var(--color-blue)]/25 text-[#7fa6ff]",
  teal: "bg-[var(--color-teal)]/20 text-[var(--color-teal)]",
};

export default function AppHeroVisual() {
  return (
    <div className="relative" aria-hidden="true">
      {/* Glow detrás del conjunto */}
      <div className="absolute -inset-8 rounded-[3rem] bg-[var(--color-blue)]/20 blur-3xl" />

      {/* Líneas de conexión entre las tarjetas */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M110 78 L200 150 L110 222 M290 78 L200 150 L290 222"
          stroke="url(#app-hero-line)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="app-hero-line" x1="0" y1="0" x2="400" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#2563eb" stopOpacity="0.55" />
            <stop offset="1" stopColor="#14b8a6" stopOpacity="0.55" />
          </linearGradient>
        </defs>
      </svg>

      {/* Nodo central */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="float-soft w-16 h-16 rounded-2xl glass-card flex items-center justify-center">
          <AppIcon name="grid" className="w-7 h-7 text-white/85" />
        </div>
      </div>

      <div className="relative grid grid-cols-2 gap-x-14 gap-y-8 sm:gap-x-20">
        {CARDS.map((card, i) => (
          <div
            key={card.label}
            className="glass-card float-soft rounded-2xl px-4 py-3.5"
            style={{ "--d": `${i * 900}ms` }}
          >
            <span
              className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${TONES[card.tone]}`}
            >
              <AppIcon name={card.icon} className="w-[18px] h-[18px]" />
            </span>
            <p className="text-[13.5px] font-bold text-white leading-tight">{card.label}</p>
            <p className="text-[11.5px] text-white/60 leading-tight mt-0.5">{card.hint}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

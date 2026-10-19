import { useId } from "react";

/** Isotipo SYNEXA (misma construcción que el sitio principal). */
export function LogoMark({ size = 36 }: { size?: number }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <rect width="100" height="100" rx="22" fill="#0b1f44" />
      <defs>
        <linearGradient id={id} x1="10" y1="10" x2="70" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6e8fd6" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      <g transform="translate(6 6) scale(0.88)">
        <polygon points="10,10 50,10 70,30 50,50 10,50 28,30" fill={`url(#${id})`} />
        <polygon points="90,50 50,50 30,70 50,90 90,90 72,70" fill="#14b8a6" />
      </g>
    </svg>
  );
}

export function Logo({ oscuro = false }: { oscuro?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark />
      <span className={`text-lg font-bold tracking-tight ${oscuro ? "text-white" : "text-navy"}`}>SYNEXA</span>
    </span>
  );
}

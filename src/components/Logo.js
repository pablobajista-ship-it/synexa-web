"use client";

import { useId } from "react";

/**
 * Isotipo SYNEXA: dos chevrones entrelazados formando una "S" abstracta.
 * Interpretación propia de la guía de marca (gradiente navy→azul arriba,
 * teal abajo) hecha en SVG para no depender de un archivo de imagen.
 * Reemplazable 1:1 por el SVG/PNG definitivo el día que exista: basta con
 * sustituir el contenido de <LogoMark> sin tocar dónde se usa el componente.
 */
export function LogoMark({ size = 40, rounded = true, className = "" }) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {rounded ? (
        <rect x="0" y="0" width="100" height="100" rx="22" fill="var(--color-navy)" />
      ) : null}
      <defs>
        <linearGradient id={`${gradientId}-top`} x1="10" y1="10" x2="70" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--color-navy)" />
          <stop offset="1" stopColor="var(--color-blue)" />
        </linearGradient>
      </defs>
      <g transform={rounded ? "translate(6 6) scale(0.88)" : undefined}>
        <polygon
          points="10,10 50,10 70,30 50,50 10,50 28,30"
          fill={`url(#${gradientId}-top)`}
        />
        <polygon points="90,50 50,50 30,70 50,90 90,90 72,70" fill="var(--color-teal)" />
      </g>
    </svg>
  );
}

export default function Logo({ theme = "light", withTagline = false, size = 40, className = "" }) {
  const textColor = theme === "dark" ? "text-white" : "text-[var(--color-navy)]";
  const taglineColor = theme === "dark" ? "text-white/60" : "text-[var(--color-gray-dark)]/70";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      <span className="leading-tight">
        <span className={`block font-bold tracking-tight ${textColor}`} style={{ fontSize: size * 0.5 }}>
          SYNEXA
        </span>
        {withTagline ? (
          <span className={`block text-[11px] font-medium uppercase tracking-wide ${taglineColor}`}>
            Soluciones Web para Empresas
          </span>
        ) : null}
      </span>
    </span>
  );
}

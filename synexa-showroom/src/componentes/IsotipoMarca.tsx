import type { Marca } from "@/datos/tipos";

/**
 * Isotipo vectorial de una empresa ficticia. Los logotipos finales se dibujan en
 * SVG (no con IA generativa) para evitar letras deformadas.
 */
export function IsotipoMarca({ marca, size = 56 }: { marca: Marca; size?: number }) {
  const [fondo, principal, acento] = marca.colores;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label={`Logotipo de ${marca.nombre}`}>
      <rect width="64" height="64" rx="14" fill={fondo} />
      <path d="M0 46 L64 22 V64 H0Z" fill={principal} opacity="0.9" />
      <text x="32" y="38" textAnchor="middle" fontFamily="Inter Variable, sans-serif" fontWeight="800" fontSize="22" fill={acento} letterSpacing="-1">
        {marca.sigla}
      </text>
    </svg>
  );
}

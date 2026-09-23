/**
 * Marcas tecnológicas en versión monocromática (currentColor), dibujadas
 * como SVG simplificados para mantener un aspecto sobrio y coherente con
 * la paleta SYNEXA. No son logotipos oficiales a escala: son íconos
 * reconocibles, deliberadamente discretos.
 */
function Mark({ children, className = "", viewBox = "0 0 24 24" }) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function TechJavaScript(props) {
  return (
    <Mark {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M10 9v5.4a1.6 1.6 0 0 1-3.1.6" />
      <path d="M17.3 10a1.9 1.9 0 0 0-3.3 1.2c0 2 3.2 1.4 3.2 3.3A1.9 1.9 0 0 1 14 15.4" />
    </Mark>
  );
}

export function TechReact(props) {
  return (
    <Mark {...props}>
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.8" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)" />
    </Mark>
  );
}

export function TechNext(props) {
  return (
    <Mark {...props}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M8.6 16V8.4l7.4 9.1" />
      <path d="M15.4 8.4V14" />
    </Mark>
  );
}

export function TechPostgres(props) {
  return (
    <Mark {...props}>
      <ellipse cx="12" cy="5.8" rx="7.5" ry="2.8" />
      <path d="M4.5 5.8v5.6c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8V5.8" />
      <path d="M4.5 11.4V17c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8v-5.6" />
    </Mark>
  );
}

export function TechSupabase(props) {
  return (
    <Mark {...props}>
      <path d="M13 2.5 5 13h6v8.5L19 11h-6V2.5z" />
    </Mark>
  );
}

export function TechVercel(props) {
  return (
    <Mark {...props}>
      <path d="M12 4 21 19.5H3L12 4z" />
    </Mark>
  );
}

export function TechGitHub(props) {
  return (
    <Mark {...props}>
      <path d="M9.2 20.4v-2.6c-3 .6-3.7-1.4-3.7-1.4-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.4-.3-4.9-1.2-4.9-5.4 0-1.2.4-2.2 1.1-2.9-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10.3 10.3 0 0 1 5.5 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.7 1.1 1.7 1.1 2.9 0 4.2-2.5 5.1-4.9 5.4.4.3.8 1 .8 2.1v3.1" />
    </Mark>
  );
}

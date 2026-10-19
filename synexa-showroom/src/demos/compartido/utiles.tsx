import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

/** Sube al inicio al cambiar de ruta interna de una demo. */
export function ScrollArriba() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo?.({ top: 0 });
  }, [pathname]);
  return null;
}

/**
 * Estado persistido en localStorage. «Reiniciar demo» borra la clave (ver CLAVES_REINICIO)
 * y vuelve a montar la demo, que arranca con `inicial`. Si no hay almacenamiento,
 * funciona en memoria.
 */
export function usePersistente<T>(clave: string, inicial: T): [T, (v: T | ((p: T) => T)) => void] {
  const [valor, setValor] = useState<T>(() => {
    try {
      const crudo = localStorage.getItem(clave);
      if (crudo) return JSON.parse(crudo) as T;
    } catch {
      /* sin almacenamiento */
    }
    return inicial;
  });
  useEffect(() => {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
    } catch {
      /* se mantiene en memoria */
    }
  }, [clave, valor]);
  return [valor, setValor];
}

/** Botón hamburguesa + panel móvil. El contenido se pasa ya con sus enlaces. */
export function MenuMovil({ id, color = "currentColor", children }: { id: string; color?: string; children: ReactNode }) {
  const [abierto, setAbierto] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setAbierto(false);
  }, [pathname]);
  return (
    <>
      <button type="button" className="rounded p-2 md:hidden" style={{ color }} aria-expanded={abierto} aria-controls={id} onClick={() => setAbierto((v) => !v)}>
        <span className="sr-only">{abierto ? "Cerrar menú" : "Abrir menú"}</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          {abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      {abierto && (
        <nav id={id} aria-label="Principal móvil" className="absolute inset-x-0 top-full border-t border-black/10 bg-inherit px-4 pb-4 shadow-lg md:hidden">
          {children}
        </nav>
      )}
    </>
  );
}

export const esCorreo = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
export const soloDigitos = (s: string) => s.replace(/\D/g, "");

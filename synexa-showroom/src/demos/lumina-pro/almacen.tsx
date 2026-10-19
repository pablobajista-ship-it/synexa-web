import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/** Clave de localStorage; PaginaDemo la borra al pulsar «Reiniciar demo». */
export const CLAVE_COMPARAR = "synexa:lumina-pro:comparar";
export const MAX_COMPARAR = 3;

function leer(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(CLAVE_COMPARAR) ?? "[]");
    return Array.isArray(v) ? v.filter((x) => typeof x === "string").slice(0, MAX_COMPARAR) : [];
  } catch {
    return [];
  }
}

interface Comparador {
  ids: string[];
  esta: (id: string) => boolean;
  llena: boolean;
  alternar: (id: string) => void;
  quitar: (id: string) => void;
  vaciar: () => void;
}

const Contexto = createContext<Comparador | null>(null);

export function ProveedorComparador({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(leer);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_COMPARAR, JSON.stringify(ids));
    } catch {
      /* sin almacenamiento: se mantiene en memoria */
    }
  }, [ids]);

  const valor = useMemo<Comparador>(
    () => ({
      ids,
      esta: (id) => ids.includes(id),
      llena: ids.length >= MAX_COMPARAR,
      alternar: (id) => setIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length >= MAX_COMPARAR ? p : [...p, id])),
      quitar: (id) => setIds((p) => p.filter((x) => x !== id)),
      vaciar: () => setIds([]),
    }),
    [ids],
  );
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useComparador() {
  const c = useContext(Contexto);
  if (!c) throw new Error("useComparador requiere ProveedorComparador");
  return c;
}

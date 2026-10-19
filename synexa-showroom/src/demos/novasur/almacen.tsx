import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { NOTICIAS_INICIALES, type Noticia } from "./datos";

/** Clave de localStorage. PaginaDemo la limpia al pulsar «Reiniciar demo». */
export const CLAVE_NOTICIAS = "synexa:novasur:noticias";

function leer(): Noticia[] {
  try {
    const crudo = localStorage.getItem(CLAVE_NOTICIAS);
    if (crudo) return JSON.parse(crudo) as Noticia[];
  } catch {
    /* sin almacenamiento: se usan los datos iniciales */
  }
  return NOTICIAS_INICIALES;
}

interface Almacen {
  noticias: Noticia[];
  guardar: (n: Noticia) => void;
  eliminar: (id: string) => void;
  alternar: (id: string) => void;
}

const Contexto = createContext<Almacen | null>(null);

export function ProveedorNoticias({ children }: { children: ReactNode }) {
  const [noticias, setNoticias] = useState<Noticia[]>(leer);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_NOTICIAS, JSON.stringify(noticias));
    } catch {
      /* ignorado: la demo sigue funcionando en memoria */
    }
  }, [noticias]);

  const valor = useMemo<Almacen>(
    () => ({
      noticias,
      guardar: (n) => setNoticias((p) => (p.some((x) => x.id === n.id) ? p.map((x) => (x.id === n.id ? n : x)) : [n, ...p])),
      eliminar: (id) => setNoticias((p) => p.filter((x) => x.id !== id)),
      alternar: (id) => setNoticias((p) => p.map((x) => (x.id === id ? { ...x, publicada: !x.publicada } : x))),
    }),
    [noticias],
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useNoticias() {
  const c = useContext(Contexto);
  if (!c) throw new Error("useNoticias requiere ProveedorNoticias");
  return c;
}

export const fechaLarga = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });

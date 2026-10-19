import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ENCUESTA, PALABRAS_BLOQUEADAS_INICIALES, RESPUESTAS, USUARIOS } from "./datos";

/** Clave de localStorage; PaginaDemo la borra al pulsar «Reiniciar demo». */
export const CLAVE_ESTADO = "synexa:frecuencia-mix:estado";

export interface Mensaje { id: string; autor: string; texto: string; hora: string; propio: boolean; moderado: boolean }
export interface Dedicatoria { id: string; para: string; de: string; mensaje: string; cancion: string; estado: "pendiente" | "aprobada" | "rechazada" }

interface Estado {
  mensajes: Mensaje[];
  dedicatorias: Dedicatoria[];
  voto: string | null;
  silenciados: string[];
  palabras: string[];
}

const hora = () => new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" });
let contador = 0;
const nuevoId = (p: string) => `${p}${Date.now().toString(36)}${(contador++).toString(36)}`;

const INICIAL: Estado = {
  mensajes: [
    { id: "m1", autor: "Valentina", texto: "¡Buenas tardes a todos!", hora: "16:02", propio: false, moderado: false },
    { id: "m2", autor: "Joaquín", texto: "Esa canción nueva de Vértigo Azul está genial.", hora: "16:04", propio: false, moderado: false },
    { id: "m3", autor: "Cami", texto: "¿Quién conduce hoy el programa?", hora: "16:05", propio: false, moderado: false },
  ],
  dedicatorias: [
    { id: "d1", para: "Mamá", de: "Lucía", mensaje: "Para la mejor cocinera del mundo.", cancion: "Domingo en Cámara Lenta", estado: "aprobada" },
    { id: "d2", para: "Equipo de bodega", de: "Marcos", mensaje: "Ánimo para el cierre de mes.", cancion: "Pulso", estado: "aprobada" },
  ],
  voto: null,
  silenciados: [],
  palabras: PALABRAS_BLOQUEADAS_INICIALES,
};

function leer(): Estado {
  try {
    const crudo = localStorage.getItem(CLAVE_ESTADO);
    if (crudo) return { ...INICIAL, ...(JSON.parse(crudo) as Partial<Estado>) };
  } catch {
    /* sin almacenamiento: estado inicial */
  }
  return INICIAL;
}

interface Almacen extends Estado {
  enviarMensaje: (autor: string, texto: string) => { ok: boolean; motivo?: string };
  restaurar: (id: string) => void;
  eliminarMensaje: (id: string) => void;
  silenciar: (autor: string) => void;
  quitarSilencio: (autor: string) => void;
  votar: (opcion: string) => void;
  resultados: { id: string; texto: string; votos: number; pct: number }[];
  enviarDedicatoria: (d: Omit<Dedicatoria, "id" | "estado">) => void;
  resolverDedicatoria: (id: string, estado: "aprobada" | "rechazada") => void;
  agregarPalabra: (p: string) => void;
  quitarPalabra: (p: string) => void;
}

const Contexto = createContext<Almacen | null>(null);

export function ProveedorEstado({ children }: { children: ReactNode }) {
  const [e, setE] = useState<Estado>(leer);
  const temporizadores = useRef<number[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_ESTADO, JSON.stringify(e));
    } catch {
      /* se mantiene en memoria */
    }
  }, [e]);

  useEffect(() => {
    const ts = temporizadores.current;
    return () => {
      ts.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const enviarMensaje = useCallback(
    (autor: string, texto: string) => {
      const t = texto.trim();
      if (!t) return { ok: false, motivo: "Escribe un mensaje." };
      if (e.silenciados.includes(autor)) return { ok: false, motivo: "Un moderador silenció a este usuario." };
      const bloqueado = e.palabras.some((p) => t.toLowerCase().includes(p.toLowerCase()));
      const msg: Mensaje = { id: nuevoId("m"), autor, texto: t, hora: hora(), propio: true, moderado: bloqueado };
      setE((p) => ({ ...p, mensajes: [...p.mensajes, msg] }));
      if (!bloqueado) {
        // Respuesta simulada de otro oyente.
        const u = USUARIOS[Math.floor(Math.random() * USUARIOS.length)];
        const r = RESPUESTAS[Math.floor(Math.random() * RESPUESTAS.length)];
        const id = window.setTimeout(() => {
          setE((p) => ({ ...p, mensajes: [...p.mensajes, { id: nuevoId("m"), autor: u.nombre, texto: r, hora: hora(), propio: false, moderado: false }] }));
        }, 1400);
        temporizadores.current.push(id);
      }
      return { ok: true };
    },
    [e.silenciados, e.palabras],
  );

  const valor = useMemo<Almacen>(() => {
    const totalBase = ENCUESTA.opciones.reduce((a, o) => a + o.base, 0) + (e.voto ? 1 : 0);
    const resultados = ENCUESTA.opciones.map((o) => {
      const votos = o.base + (e.voto === o.id ? 1 : 0);
      return { id: o.id, texto: o.texto, votos, pct: Math.round((votos / totalBase) * 100) };
    });
    return {
      ...e,
      enviarMensaje,
      restaurar: (id) => setE((p) => ({ ...p, mensajes: p.mensajes.map((m) => (m.id === id ? { ...m, moderado: false } : m)) })),
      eliminarMensaje: (id) => setE((p) => ({ ...p, mensajes: p.mensajes.filter((m) => m.id !== id) })),
      silenciar: (a) => setE((p) => (p.silenciados.includes(a) ? p : { ...p, silenciados: [...p.silenciados, a] })),
      quitarSilencio: (a) => setE((p) => ({ ...p, silenciados: p.silenciados.filter((x) => x !== a) })),
      votar: (o) => setE((p) => (p.voto ? p : { ...p, voto: o })),
      resultados,
      enviarDedicatoria: (d) => setE((p) => ({ ...p, dedicatorias: [{ ...d, id: nuevoId("d"), estado: "pendiente" }, ...p.dedicatorias] })),
      resolverDedicatoria: (id, estado) => setE((p) => ({ ...p, dedicatorias: p.dedicatorias.map((d) => (d.id === id ? { ...d, estado } : d)) })),
      agregarPalabra: (w) => setE((p) => (w.trim() && !p.palabras.includes(w.trim().toLowerCase()) ? { ...p, palabras: [...p.palabras, w.trim().toLowerCase()] } : p)),
      quitarPalabra: (w) => setE((p) => ({ ...p, palabras: p.palabras.filter((x) => x !== w) })),
    };
  }, [e, enviarMensaje]);

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useEstado() {
  const c = useContext(Contexto);
  if (!c) throw new Error("useEstado requiere ProveedorEstado");
  return c;
}

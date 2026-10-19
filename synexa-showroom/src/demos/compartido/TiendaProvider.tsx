import { createContext, useContext, useMemo, type ReactNode } from "react";
import { usePersistente } from "./utiles";
import {
  agregarLinea, cambiarCantidad, calcularTotales, numeroPedido, puedePasar,
  type Cupon, type EstadoPedido, type Linea, type LineaPedido, type Pedido, type ReglasEnvio, type Totales,
} from "./tienda";

export interface ProductoBase { id: string; nombre: string; precio: number }

interface Config {
  /** Prefijo de las claves de localStorage (ver CLAVES_REINICIO en registro.ts). */
  clave: string;
  prefijoPedido: string;
  productos: ProductoBase[];
  envio: ReglasEnvio;
  cupones?: Cupon[];
  /** Pedidos de ejemplo con los que arranca el panel. */
  pedidosIniciales?: Pedido[];
}

interface Datos {
  lineas: Linea[];
  codigoCupon: string | null;
  pedidos: Pedido[];
}

interface Tienda {
  lineas: Linea[];
  unidades: number;
  agregar: (productoId: string, cantidad?: number, talla?: string, color?: string) => void;
  cambiar: (clave: string, cantidad: number) => void;
  vaciar: () => void;
  cupon: Cupon | undefined;
  aplicarCupon: (c: Cupon | null) => void;
  totales: Totales;
  detalle: (l: Linea) => ProductoBase | undefined;
  pedidos: Pedido[];
  crearPedido: (cliente: Pedido["cliente"]) => Pedido | null;
  cambiarEstado: (id: string, estado: EstadoPedido) => boolean;
  productoPorId: (id: string) => ProductoBase | undefined;
}

const Contexto = createContext<Tienda | null>(null);
export const useTienda = () => {
  const c = useContext(Contexto);
  if (!c) throw new Error("useTienda requiere TiendaProvider");
  return c;
};

export function TiendaProvider({ config, children }: { config: Config; children: ReactNode }) {
  const [datos, setDatos] = usePersistente<Datos>(config.clave, { lineas: [], codigoCupon: null, pedidos: config.pedidosIniciales ?? [] });
  const { productos, envio, cupones = [], prefijoPedido } = config;

  const valor = useMemo<Tienda>(() => {
    const productoPorId = (id: string) => productos.find((p) => p.id === id);
    const precioDe = (id: string) => productoPorId(id)?.precio ?? 0;
    const cupon = cupones.find((c) => c.codigo === datos.codigoCupon);
    const totales = calcularTotales(datos.lineas, precioDe, envio, cupon);
    return {
      lineas: datos.lineas,
      unidades: datos.lineas.reduce((a, l) => a + l.cantidad, 0),
      agregar: (id, c = 1, talla, color) => setDatos((d) => ({ ...d, lineas: agregarLinea(d.lineas, id, c, talla, color) })),
      cambiar: (clave, c) => setDatos((d) => ({ ...d, lineas: cambiarCantidad(d.lineas, clave, c) })),
      vaciar: () => setDatos((d) => ({ ...d, lineas: [], codigoCupon: null })),
      cupon,
      aplicarCupon: (c) => setDatos((d) => ({ ...d, codigoCupon: c?.codigo ?? null })),
      totales,
      detalle: (l) => productoPorId(l.productoId),
      pedidos: datos.pedidos,
      productoPorId,
      crearPedido: (cliente) => {
        if (!datos.lineas.length) return null;
        const lineas: LineaPedido[] = datos.lineas.map((l) => ({ productoId: l.productoId, nombre: productoPorId(l.productoId)?.nombre ?? l.productoId, cantidad: l.cantidad, precio: precioDe(l.productoId), talla: l.talla, color: l.color }));
        const n = datos.pedidos.length + 1;
        const pedido: Pedido = { id: `p${Date.now()}${n}`, numero: numeroPedido(prefijoPedido, n), fecha: new Date().toISOString(), cliente, lineas, totales, cupon: cupon?.codigo, estado: "pendiente" };
        setDatos((d) => ({ ...d, lineas: [], codigoCupon: null, pedidos: [pedido, ...d.pedidos] }));
        return pedido;
      },
      cambiarEstado: (id, estado) => {
        const p = datos.pedidos.find((x) => x.id === id);
        if (!p || !puedePasar(p.estado, estado)) return false;
        setDatos((d) => ({ ...d, pedidos: d.pedidos.map((x) => (x.id === id ? { ...x, estado } : x)) }));
        return true;
      },
    };
  }, [datos, setDatos, productos, envio, cupones, prefijoPedido]);

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

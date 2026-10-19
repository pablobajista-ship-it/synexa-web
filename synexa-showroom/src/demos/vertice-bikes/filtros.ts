/** Lógica pura de filtrado y orden del catálogo de Vértice Bikes. */
import type { Producto } from "./datos";

export interface Filtros {
  q: string;
  categorias: string[];
  precioMax: number | null;
  materiales: string[];
  suspensiones: string[];
  soloEnStock: boolean;
}

export type Orden = "destacados" | "precio-asc" | "precio-desc" | "peso";

export function normalizar(s: string) {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

export function filtrar(productos: Producto[], f: Filtros, orden: Orden): Producto[] {
  const t = normalizar(f.q.trim());
  const lista = productos.filter((p) => {
    if (!p.activo) return false;
    if (f.categorias.length && !f.categorias.includes(p.categoria)) return false;
    if (f.precioMax !== null && p.precio > f.precioMax) return false;
    if (f.materiales.length && (!p.material || !f.materiales.includes(p.material))) return false;
    if (f.suspensiones.length && (!p.suspension || !f.suspensiones.includes(p.suspension))) return false;
    if (f.soloEnStock && p.stock <= 0) return false;
    if (t) {
      const pajar = normalizar(`${p.nombre} ${p.resumen} ${p.descripcion} ${Object.values(p.specs).join(" ")}`);
      if (!t.split(/\s+/).every((palabra) => pajar.includes(palabra))) return false;
    }
    return true;
  });
  if (orden === "precio-asc") lista.sort((a, b) => a.precio - b.precio);
  if (orden === "precio-desc") lista.sort((a, b) => b.precio - a.precio);
  if (orden === "peso") lista.sort((a, b) => (a.pesoKg ?? Infinity) - (b.pesoKg ?? Infinity));
  return lista;
}

/** Productos relacionados: misma categoría primero, luego accesorios o precio cercano. */
export function relacionados(productos: Producto[], p: Producto, n = 4): Producto[] {
  const activos = productos.filter((x) => x.activo && x.id !== p.id);
  const misma = activos.filter((x) => x.categoria === p.categoria);
  const resto = activos.filter((x) => x.categoria !== p.categoria).sort((a, b) => Math.abs(a.precio - p.precio) - Math.abs(b.precio - p.precio));
  const accesorios = p.categoria === "accesorios" ? [] : resto.filter((x) => x.categoria === "accesorios");
  return [...misma, ...accesorios, ...resto].filter((x, i, a) => a.findIndex((y) => y.id === x.id) === i).slice(0, n);
}

export const validarProducto = (p: { nombre: string; precio: number; stock: number }) => {
  const e: Partial<Record<"nombre" | "precio" | "stock", string>> = {};
  if (p.nombre.trim().length < 3) e.nombre = "El nombre debe tener al menos 3 caracteres.";
  if (!Number.isFinite(p.precio) || p.precio <= 0) e.precio = "Ingresa un precio mayor que 0.";
  if (!Number.isInteger(p.stock) || p.stock < 0) e.stock = "El stock debe ser un número entero, 0 o más.";
  return e;
};

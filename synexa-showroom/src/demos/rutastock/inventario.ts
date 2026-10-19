export const BASE = "/demos/rutastock";
export const CLAVE = "synexa:rutastock:inventario";
export const C = { azul: "#0f3d75", azulClaro: "#e8f0fa", verde: "#1fa463", rojo: "#c0392b", ambar: "#b7791f" };

export const CATEGORIAS = ["Abarrotes", "Bebidas", "Limpieza", "Papelería", "Ferretería"] as const;
export type Categoria = (typeof CATEGORIAS)[number];

export interface Item { id: string; sku: string; nombre: string; categoria: Categoria; stock: number; minimo: number; costo: number; ubicacion: string }
export type TipoMov = "entrada" | "salida";
export interface Movimiento { id: string; dia: number; sku: string; tipo: TipoMov; cantidad: number }
export interface Estado { items: Item[]; movimientos: Movimiento[] }

const it = (n: number, nombre: string, categoria: Categoria, stock: number, minimo: number, costo: number, ubicacion: string): Item => ({ id: `i${n}`, sku: `RS-${String(1000 + n)}`, nombre, categoria, stock, minimo, costo, ubicacion });
export const ITEMS_INICIALES: Item[] = [
  it(1, "Arroz grano largo 1 kg", "Abarrotes", 480, 200, 1100, "A-01"),
  it(2, "Fideos espagueti 400 g", "Abarrotes", 90, 150, 650, "A-02"),
  it(3, "Aceite vegetal 900 ml", "Abarrotes", 210, 120, 2300, "A-03"),
  it(4, "Azúcar 1 kg", "Abarrotes", 0, 100, 1000, "A-04"),
  it(5, "Agua mineral 1,5 L (pack 6)", "Bebidas", 320, 150, 3400, "B-01"),
  it(6, "Jugo de naranja 1 L", "Bebidas", 140, 100, 1500, "B-02"),
  it(7, "Detergente líquido 3 L", "Limpieza", 75, 60, 6200, "C-01"),
  it(8, "Cloro 1 L", "Limpieza", 40, 80, 900, "C-02"),
  it(9, "Papel higiénico (pack 12)", "Limpieza", 260, 100, 5200, "C-03"),
  it(10, "Resma de papel carta", "Papelería", 180, 80, 3900, "D-01"),
  it(11, "Cuaderno universitario", "Papelería", 410, 200, 1100, "D-02"),
  it(12, "Cinta de embalaje", "Ferretería", 55, 50, 1300, "E-01"),
  it(13, "Guantes de trabajo (par)", "Ferretería", 30, 40, 2100, "E-02"),
  it(14, "Caja plástica 40 L", "Ferretería", 120, 50, 7500, "E-03"),
];

// Siete días de movimientos de ejemplo (dia 0 = hace seis días … dia 6 = hoy).
const m = (n: number, dia: number, sku: string, tipo: TipoMov, cantidad: number): Movimiento => ({ id: `m${n}`, dia, sku, tipo, cantidad });
export const MOVIMIENTOS_INICIALES: Movimiento[] = [
  m(1, 0, "RS-1001", "entrada", 200), m(2, 0, "RS-1005", "salida", 60), m(3, 1, "RS-1002", "salida", 80), m(4, 1, "RS-1009", "entrada", 120),
  m(5, 2, "RS-1004", "salida", 100), m(6, 2, "RS-1010", "salida", 40), m(7, 3, "RS-1003", "entrada", 150), m(8, 3, "RS-1007", "salida", 25),
  m(9, 4, "RS-1011", "salida", 90), m(10, 4, "RS-1005", "entrada", 100), m(11, 5, "RS-1008", "salida", 50), m(12, 6, "RS-1001", "salida", 70),
];
export const ESTADO_INICIAL: Estado = { items: ITEMS_INICIALES, movimientos: MOVIMIENTOS_INICIALES };

export type EstadoStock = "sin stock" | "bajo" | "ok";
export const estadoStock = (i: Pick<Item, "stock" | "minimo">): EstadoStock => (i.stock <= 0 ? "sin stock" : i.stock < i.minimo ? "bajo" : "ok");
export const valorItem = (i: Item) => i.stock * i.costo;

export function kpis(items: Item[]) {
  return {
    skus: items.length,
    unidades: items.reduce((a, i) => a + i.stock, 0),
    valor: items.reduce((a, i) => a + valorItem(i), 0),
    bajos: items.filter((i) => estadoStock(i) === "bajo").length,
    sinStock: items.filter((i) => estadoStock(i) === "sin stock").length,
  };
}

export function porCategoria(items: Item[]) {
  return CATEGORIAS.map((c) => ({ categoria: c, unidades: items.filter((i) => i.categoria === c).reduce((a, i) => a + i.stock, 0), valor: items.filter((i) => i.categoria === c).reduce((a, i) => a + valorItem(i), 0) }));
}

export function movimientosPorDia(movs: Movimiento[], dias = 7) {
  return Array.from({ length: dias }, (_, d) => ({
    dia: d,
    entradas: movs.filter((x) => x.dia === d && x.tipo === "entrada").reduce((a, x) => a + x.cantidad, 0),
    salidas: movs.filter((x) => x.dia === d && x.tipo === "salida").reduce((a, x) => a + x.cantidad, 0),
  }));
}

/** Registra un movimiento (hoy = día 6). Una salida no puede superar el stock disponible. */
export function registrarMovimiento(e: Estado, sku: string, tipo: TipoMov, cantidad: number): { estado: Estado } | { error: string } {
  const item = e.items.find((i) => i.sku === sku);
  if (!item) return { error: "Elige un producto." };
  if (!Number.isInteger(cantidad) || cantidad <= 0) return { error: "La cantidad debe ser un número entero mayor que cero." };
  if (tipo === "salida" && cantidad > item.stock) return { error: `Solo hay ${item.stock} unidades de «${item.nombre}»; no se puede sacar ${cantidad}.` };
  return {
    estado: {
      items: e.items.map((i) => (i.sku === sku ? { ...i, stock: i.stock + (tipo === "entrada" ? cantidad : -cantidad) } : i)),
      movimientos: [...e.movimientos, { id: `m${Date.now()}`, dia: 6, sku, tipo, cantidad }],
    },
  };
}

export function validarItem(d: { nombre: string; stock: number; minimo: number; costo: number }): Record<string, string> {
  const e: Record<string, string> = {};
  if (d.nombre.trim().length < 3) e.nombre = "Escribe un nombre de al menos 3 caracteres.";
  if (!Number.isInteger(d.stock) || d.stock < 0) e.stock = "El stock debe ser un entero de 0 o más.";
  if (!Number.isInteger(d.minimo) || d.minimo < 0) e.minimo = "El mínimo debe ser un entero de 0 o más.";
  if (!(d.costo > 0)) e.costo = "El costo debe ser mayor que cero.";
  return e;
}

export function filtrarItems(items: Item[], texto: string, categoria: "" | Categoria, soloAlertas: boolean) {
  const q = texto.trim().toLowerCase();
  return items.filter((i) => (!q || i.nombre.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q)) && (!categoria || i.categoria === categoria) && (!soloAlertas || estadoStock(i) !== "ok"));
}

export function aCSV(items: Item[]): string {
  const esc = (s: string | number) => `"${String(s).replace(/"/g, '""')}"`;
  const filas = items.map((i) => [i.sku, i.nombre, i.categoria, i.stock, i.minimo, i.costo, valorItem(i), estadoStock(i)].map(esc).join(","));
  return ["SKU,Producto,Categoría,Stock,Mínimo,Costo,Valor,Estado", ...filas].join("\n");
}

export const clp = (n: number) => `$${Math.round(n).toLocaleString("es-CL")}`;

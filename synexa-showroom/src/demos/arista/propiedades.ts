export const BASE = "/demos/arista";
export const C = { marino: "#0b1f3f", azul: "#1c3d73", oro: "#c9a24b", oroClaro: "#e3c477", hueso: "#f6f3ec" };

export type Operacion = "Venta" | "Arriendo";
export type Tipo = "Casa" | "Departamento" | "Penthouse" | "Loft";
export interface Propiedad {
  id: string; titulo: string; operacion: Operacion; tipo: Tipo; sector: string;
  dormitorios: number; banos: number; m2: number; precio: number;
  imagen: string; texto: string; publicada: boolean;
}

export const OPERACIONES: Operacion[] = ["Venta", "Arriendo"];
export const TIPOS: Tipo[] = ["Casa", "Departamento", "Penthouse", "Loft"];
export const SECTORES = ["Costa Dorada", "Parque Central", "Barrio Jardín", "Lomas Verdes", "Centro Alto", "Barrio Antiguo"];

const img = (n: number) => `assets/arista/propiedad-${n}.webp`;
export const PROPIEDADES_INICIALES: Propiedad[] = [
  { id: "p1", titulo: "Casa con terraza y piscina frente al mar", operacion: "Venta", tipo: "Casa", sector: "Costa Dorada", dormitorios: 4, banos: 4, m2: 320, precio: 780_000_000, imagen: img(1), texto: "Amplia casa de líneas limpias con terraza de piedra, piscina y vista abierta.", publicada: true },
  { id: "p2", titulo: "Departamento con balcón de cristal", operacion: "Venta", tipo: "Departamento", sector: "Parque Central", dormitorios: 3, banos: 2, m2: 118, precio: 245_000_000, imagen: img(2), texto: "Edificio de seis pisos con balcones corridos y áreas verdes comunes.", publicada: true },
  { id: "p3", titulo: "Casa adosada de madera y hormigón", operacion: "Arriendo", tipo: "Casa", sector: "Barrio Jardín", dormitorios: 3, banos: 3, m2: 190, precio: 2_100_000, imagen: img(3), texto: "Diseño contemporáneo con doble altura, patio interior y estacionamiento.", publicada: true },
  { id: "p4", titulo: "Casa familiar con doble garaje", operacion: "Venta", tipo: "Casa", sector: "Lomas Verdes", dormitorios: 4, banos: 3, m2: 260, precio: 410_000_000, imagen: img(4), texto: "Casa de dos pisos con living integrado a la cocina y jardín al frente.", publicada: true },
  { id: "p5", titulo: "Penthouse con terraza panorámica", operacion: "Venta", tipo: "Penthouse", sector: "Centro Alto", dormitorios: 3, banos: 3, m2: 240, precio: 690_000_000, imagen: img(5), texto: "Último piso con terraza con vista a la ciudad y atardeceres abiertos.", publicada: true },
  { id: "p6", titulo: "Casa de techo alto y vigas a la vista", operacion: "Arriendo", tipo: "Casa", sector: "Lomas Verdes", dormitorios: 4, banos: 3, m2: 230, precio: 1_850_000, imagen: img(6), texto: "Living de doble altura con ventanales al jardín y cocina abierta.", publicada: true },
  { id: "p7", titulo: "Loft de ladrillo con altillo", operacion: "Arriendo", tipo: "Loft", sector: "Barrio Antiguo", dormitorios: 1, banos: 1, m2: 78, precio: 980_000, imagen: img(7), texto: "Antigua fábrica reconvertida, ventanales industriales y escalera de caracol.", publicada: true },
  { id: "p8", titulo: "Departamento frente a la playa", operacion: "Arriendo", tipo: "Departamento", sector: "Costa Dorada", dormitorios: 2, banos: 2, m2: 95, precio: 1_350_000, imagen: img(8), texto: "Terraza con vista al mar, living amplio y gastos comunes incluidos.", publicada: true },
];

export const GALERIA = ["assets/arista/living.webp", "assets/arista/cocina.webp", "assets/arista/dormitorio.webp"];
export const IMAGEN_POR_TIPO: Record<Tipo, string> = { Casa: img(4), Departamento: img(2), Penthouse: img(5), Loft: img(7) };

export interface Filtros { operacion: "" | Operacion; tipo: "" | Tipo; sector: string; dormitoriosMin: number; precioMax: number; orden: "recientes" | "menor" | "mayor" }
export const FILTROS_VACIOS: Filtros = { operacion: "", tipo: "", sector: "", dormitoriosMin: 0, precioMax: 0, orden: "recientes" };

/** Solo se muestran las publicadas. precioMax 0 = sin tope. */
export function filtrar(lista: Propiedad[], f: Filtros): Propiedad[] {
  const r = lista.filter((p) =>
    p.publicada && (!f.operacion || p.operacion === f.operacion) && (!f.tipo || p.tipo === f.tipo) && (!f.sector || p.sector === f.sector) &&
    p.dormitorios >= f.dormitoriosMin && (!f.precioMax || p.precio <= f.precioMax));
  if (f.orden === "menor") return [...r].sort((a, b) => a.precio - b.precio);
  if (f.orden === "mayor") return [...r].sort((a, b) => b.precio - a.precio);
  return r;
}

export const clp = (n: number) => `$${Math.round(n).toLocaleString("es-CL")}`;
export const precioTexto = (p: Pick<Propiedad, "precio" | "operacion">) => (p.operacion === "Arriendo" ? `${clp(p.precio)} / mes` : clp(p.precio));

export function validarPropiedad(d: { titulo: string; precio: number; m2: number }): Record<string, string> {
  const e: Record<string, string> = {};
  if (d.titulo.trim().length < 5) e.titulo = "Escribe un título de al menos 5 caracteres.";
  if (!(d.precio > 0)) e.precio = "Ingresa un precio mayor que cero.";
  if (!(d.m2 > 0)) e.m2 = "Ingresa la superficie en m².";
  return e;
}

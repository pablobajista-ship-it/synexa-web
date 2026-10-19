/** Contenido ficticio de Punto Barrio Market. Productos genéricos, sin marcas; precios de demostración. */

export const BASE = "/demos/punto-barrio";
export const C = { verde: "#1f5a34", verdeClaro: "#e7f2ea", naranja: "#ffb766", naranjaOsc: "#a35708", suave: "#f7faf5" };

export const NEGOCIO = { direccion: "Pasaje Los Nogales 88, Villa Esperanza, Ciudad Ficticia", telefono: "+56 9 6000 0000", correo: "pedidos@puntobarrio.example", horario: "Lunes a sábado 8:30 a 21:00 · Domingo 9:00 a 14:00" };

export type CategoriaId = "frutas-verduras" | "panaderia-lacteos" | "bebidas" | "despensa" | "hogar";
export const CATEGORIAS: { id: CategoriaId; nombre: string; texto: string }[] = [
  { id: "frutas-verduras", nombre: "Frutas y verduras", texto: "Frescas, de temporada." },
  { id: "panaderia-lacteos", nombre: "Panadería y lácteos", texto: "Pan, leche, huevos y quesos." },
  { id: "bebidas", nombre: "Bebidas", texto: "Jugos, agua y gaseosas." },
  { id: "despensa", nombre: "Despensa", texto: "Abarrotes y conservas." },
  { id: "hogar", nombre: "Hogar y limpieza", texto: "Lo básico para la casa." },
];

export interface Producto { id: string; nombre: string; categoria: CategoriaId; precio: number; unidad: string; imagen: string; descripcion: string }
const p = (n: number) => `assets/punto-barrio/producto-${String(n).padStart(2, "0")}.webp`;

export const PRODUCTOS: Producto[] = [
  { id: "bananas", nombre: "Plátanos", categoria: "frutas-verduras", precio: 1590, unidad: "kg", imagen: p(1), descripcion: "Maduros en su punto, ideales para el desayuno o para llevar." },
  { id: "manzanas", nombre: "Manzanas rojas", categoria: "frutas-verduras", precio: 1890, unidad: "kg", imagen: p(2), descripcion: "Dulces y crujientes. Se venden por kilo." },
  { id: "tomates", nombre: "Tomates en rama", categoria: "frutas-verduras", precio: 2490, unidad: "kg", imagen: p(3), descripcion: "Para ensaladas y salsas. Seleccionados por tamaño." },
  { id: "lechuga", nombre: "Repollo verde", categoria: "frutas-verduras", precio: 1290, unidad: "unidad", imagen: p(4), descripcion: "Compacto y fresco, rinde para varias comidas." },
  { id: "zanahorias", nombre: "Zanahorias", categoria: "frutas-verduras", precio: 990, unidad: "atado", imagen: p(5), descripcion: "Atado con hojas, de sabor dulce." },
  { id: "papas", nombre: "Papas en malla", categoria: "frutas-verduras", precio: 2190, unidad: "2 kg", imagen: p(6), descripcion: "Malla de 2 kg, aptas para cocer, freír u hornear." },
  { id: "pan-molde", nombre: "Pan de molde", categoria: "panaderia-lacteos", precio: 2290, unidad: "unidad", imagen: p(7), descripcion: "Rebanado, bolsa sellada, sin marca." },
  { id: "leche", nombre: "Leche entera", categoria: "panaderia-lacteos", precio: 1190, unidad: "litro", imagen: p(8), descripcion: "Caja de 1 litro, larga vida." },
  { id: "huevos", nombre: "Huevos de campo", categoria: "panaderia-lacteos", precio: 3990, unidad: "docena", imagen: p(9), descripcion: "Docena en bandeja de cartón." },
  { id: "queso", nombre: "Queso gauda", categoria: "panaderia-lacteos", precio: 2490, unidad: "250 g", imagen: p(10), descripcion: "Trozo de 250 g, ideal para sándwiches." },
  { id: "jugo", nombre: "Jugo de naranja", categoria: "bebidas", precio: 1990, unidad: "botella 1 L", imagen: p(11), descripcion: "Exprimido, sin azúcar agregada." },
  { id: "agua", nombre: "Agua mineral", categoria: "bebidas", precio: 790, unidad: "botella 500 ml", imagen: p(12), descripcion: "Sin gas, botella individual." },
  { id: "gaseosa", nombre: "Bebida cola", categoria: "bebidas", precio: 1690, unidad: "botella 1,5 L", imagen: p(13), descripcion: "Bebida gaseosa de sabor cola." },
  { id: "arroz", nombre: "Arroz grado 1", categoria: "despensa", precio: 1490, unidad: "kg", imagen: p(14), descripcion: "Grano largo, rinde y no se pasa." },
  { id: "fideos", nombre: "Espagueti", categoria: "despensa", precio: 990, unidad: "400 g", imagen: p(15), descripcion: "Pasta de sémola de trigo duro." },
  { id: "aceite", nombre: "Aceite de oliva", categoria: "despensa", precio: 6990, unidad: "botella 500 ml", imagen: p(16), descripcion: "Extra virgen, para aliñar y cocinar." },
  { id: "cereal", nombre: "Cereal de desayuno", categoria: "despensa", precio: 2990, unidad: "caja 400 g", imagen: p(17), descripcion: "Hojuelas crocantes, caja de 400 g." },
  { id: "conservas", nombre: "Tomate en conserva", categoria: "despensa", precio: 1190, unidad: "lata 400 g", imagen: p(18), descripcion: "Tomate pelado en lata, listo para salsas." },
  { id: "mermelada", nombre: "Mermelada casera", categoria: "despensa", precio: 2790, unidad: "frasco 300 g", imagen: p(19), descripcion: "Frasco de vidrio, receta tradicional." },
  { id: "azucar", nombre: "Azúcar blanca", categoria: "despensa", precio: 1390, unidad: "kg", imagen: p(20), descripcion: "Bolsa de 1 kg." },
  { id: "limpiador", nombre: "Limpiador multiuso", categoria: "hogar", precio: 2490, unidad: "botella 500 ml", imagen: p(21), descripcion: "Con gatillo, para cocina y baño." },
  { id: "toalla", nombre: "Toalla de papel", categoria: "hogar", precio: 1890, unidad: "rollo", imagen: p(22), descripcion: "Rollo absorbente de doble hoja." },
  { id: "cafe", nombre: "Café en grano", categoria: "despensa", precio: 5490, unidad: "frasco 250 g", imagen: p(23), descripcion: "Tueste medio, frasco hermético." },
  { id: "galletas", nombre: "Galletas de avena", categoria: "despensa", precio: 1590, unidad: "bolsa", imagen: p(24), descripcion: "Bolsa individual con galletas caseras." },
];

export const productoPorId = (id: string) => PRODUCTOS.find((x) => x.id === id);
export const categoriaPorId = (id: string) => CATEGORIAS.find((c) => c.id === id)!;
export const clp = (n: number) => `$${n.toLocaleString("es-CL")}`;

/** Contenido ficticio de Vértice Bikes. Modelos, especificaciones y precios son inventados. */

export const BASE = "/demos/vertice-bikes";
export const C = { negro: "#0d0d0d", carbon: "#171717", verde: "#2ecc71", verdeOsc: "#1fa65a", linea: "rgba(255,255,255,.12)" };

export type CategoriaId = "montana" | "ruta" | "urbana" | "gravel" | "electrica" | "infantil" | "accesorios";
export const CATEGORIAS: { id: CategoriaId; nombre: string }[] = [
  { id: "montana", nombre: "Montaña" }, { id: "ruta", nombre: "Ruta" }, { id: "urbana", nombre: "Urbanas" }, { id: "gravel", nombre: "Gravel" },
  { id: "electrica", nombre: "Eléctricas" }, { id: "infantil", nombre: "Infantiles" }, { id: "accesorios", nombre: "Accesorios" },
];

export interface Producto {
  id: string;
  nombre: string;
  categoria: CategoriaId;
  precio: number;
  stock: number;
  activo: boolean;
  imagen: string;
  resumen: string;
  descripcion: string;
  /** Características filtrables. Solo las bicicletas las traen. */
  material?: "Aluminio" | "Carbono";
  velocidades?: number;
  suspension?: "Rígida" | "Delantera" | "Completa";
  pesoKg?: number;
  specs: Record<string, string>;
}

const img = (n: string) => `assets/vertice-bikes/${n}.webp`;

export const PRODUCTOS_INICIALES: Producto[] = [
  { id: "trail-pro", nombre: "Trail Pro 29 doble suspensión", categoria: "montana", precio: 2890000, stock: 4, activo: true, imagen: img("bici-01"), resumen: "Doble suspensión de 130 mm para senderos exigentes.", descripcion: "Pensada para descensos técnicos y rutas largas. Su geometría estable y la suspensión trasera mantienen el control en terreno irregular.", material: "Aluminio", velocidades: 12, suspension: "Completa", pesoKg: 14.2, specs: { Rodado: "29\"", Recorrido: "130 mm", Frenos: "Disco hidráulico", Transmisión: "1×12", Uso: "Enduro y trail" } },
  { id: "ridge-hardtail", nombre: "Ridge Hardtail 29", categoria: "montana", precio: 1190000, stock: 9, activo: true, imagen: img("bici-02"), resumen: "Montaña ligera con horquilla delantera, ideal para empezar.", descripcion: "Una bicicleta de montaña eficiente y fácil de mantener. Horquilla de 100 mm y cuadro de aluminio liviano.", material: "Aluminio", velocidades: 10, suspension: "Delantera", pesoKg: 13.1, specs: { Rodado: "29\"", Recorrido: "100 mm", Frenos: "Disco hidráulico", Transmisión: "1×10", Uso: "Cross country" } },
  { id: "ciudad-flow", nombre: "Ciudad Flow con portaequipaje", categoria: "urbana", precio: 690000, stock: 14, activo: true, imagen: img("bici-03"), resumen: "Urbana cómoda con guardabarros y portaequipaje.", descripcion: "Para ir al trabajo o hacer los trámites. Postura erguida, guardabarros completos y portaequipaje trasero.", material: "Aluminio", velocidades: 8, suspension: "Rígida", pesoKg: 13.8, specs: { Rodado: "28\"", Frenos: "Disco mecánico", Transmisión: "1×8", Accesorios: "Guardabarros y portaequipaje", Uso: "Ciudad" } },
  { id: "aero-carbon", nombre: "Aero Carbon Ruta", categoria: "ruta", precio: 3590000, stock: 2, activo: true, imagen: img("bici-04"), resumen: "Ruta de carbono de 8,1 kg para competir y rodar largo.", descripcion: "Cuadro de carbono aerodinámico y manillar integrado. Rigidez y comodidad para largas distancias.", material: "Carbono", velocidades: 22, suspension: "Rígida", pesoKg: 8.1, specs: { Rodado: "700c", Frenos: "Disco hidráulico", Transmisión: "2×11", Manillar: "Curvo", Uso: "Ruta y competencia" } },
  { id: "gravel-explora", nombre: "Explora Gravel", categoria: "gravel", precio: 1990000, stock: 5, activo: true, imagen: img("bici-05"), resumen: "Gravel versátil para asfalto y caminos de tierra.", descripcion: "Neumáticos anchos, geometría cómoda y puntos de anclaje para bolsas. Para aventuras de varios días.", material: "Aluminio", velocidades: 22, suspension: "Rígida", pesoKg: 10.4, specs: { Rodado: "700c", Frenos: "Disco hidráulico", Transmisión: "2×11", Neumáticos: "40 mm", Uso: "Aventura" } },
  { id: "volt-urbana", nombre: "Volt Urbana eléctrica", categoria: "electrica", precio: 2490000, stock: 3, activo: true, imagen: img("bici-06"), resumen: "Eléctrica con motor central y batería integrada.", descripcion: "Asistencia hasta 25 km/h y autonomía de hasta 80 km. Batería integrada en el cuadro y luces incorporadas.", material: "Aluminio", velocidades: 9, suspension: "Rígida", pesoKg: 22.5, specs: { Rodado: "28\"", Motor: "250 W central", Autonomía: "Hasta 80 km", Frenos: "Disco hidráulico", Uso: "Ciudad y trabajo" } },
  { id: "junior-trail", nombre: "Junior Trail 24", categoria: "infantil", precio: 390000, stock: 11, activo: true, imagen: img("bici-07"), resumen: "Montaña infantil de 24 pulgadas para 8 a 11 años.", descripcion: "Liviana y segura, con frenos de disco y cambios fáciles. Crece con el niño gracias al sillín regulable.", material: "Aluminio", velocidades: 7, suspension: "Delantera", pesoKg: 11.2, specs: { Rodado: "24\"", Edad: "8 a 11 años", Frenos: "Disco mecánico", Transmisión: "1×7", Uso: "Iniciación" } },
  { id: "casco-ruta", nombre: "Casco Ruta Aero", categoria: "accesorios", precio: 89000, stock: 25, activo: true, imagen: img("accesorio-01"), resumen: "Casco ventilado y liviano con ajuste de dial.", descripcion: "Diecinueve ventilaciones y espuma de impacto multidensidad. Ajuste de precisión en la nuca.", specs: { Peso: "245 g", Ventilaciones: "19", Tallas: "S, M, L", Certificación: "Norma de impacto vigente" } },
  { id: "guantes-pro", nombre: "Guantes Pro con gel", categoria: "accesorios", precio: 29000, stock: 40, activo: true, imagen: img("accesorio-02"), resumen: "Guantes con palma acolchada y dedos táctiles.", descripcion: "Reducen la vibración en tramos largos y permiten usar el teléfono sin quitarlos.", specs: { Material: "Sintético transpirable", Palma: "Almohadillas de gel", Tallas: "S, M, L, XL", Dedos: "Compatibles con pantalla táctil" } },
  { id: "bidon-soporte", nombre: "Bidón con portabidón", categoria: "accesorios", precio: 19000, stock: 60, activo: true, imagen: img("accesorio-03"), resumen: "Bidón de 750 ml con soporte liviano de aluminio.", descripcion: "Material sin BPA y tapa antigoteo. El portabidón se adapta a cuadros estándar.", specs: { Capacidad: "750 ml", Material: "Sin BPA", Soporte: "Aluminio", Peso: "92 g" } },
  { id: "luces-set", nombre: "Set de luces delantera y trasera", categoria: "accesorios", precio: 39000, stock: 30, activo: true, imagen: img("accesorio-04"), resumen: "Luces recargables por USB con tres modos.", descripcion: "Visibilidad a 400 m. Se recargan por USB y duran hasta 12 horas en modo continuo.", specs: { Carga: "USB", Autonomía: "Hasta 12 h", Modos: "3", Resistencia: "Resistente al agua" } },
];

export const IMAGENES_DISPONIBLES = [...new Set(PRODUCTOS_INICIALES.map((p) => p.imagen))];
export const HERO = img("hero");
export const clp = (n: number) => `$${n.toLocaleString("es-CL")}`;
export const categoriaPor = (id: string) => CATEGORIAS.find((c) => c.id === id)!;
export const SUSPENSIONES = ["Rígida", "Delantera", "Completa"] as const;
export const MATERIALES = ["Aluminio", "Carbono"] as const;
export const NOMBRES_ORDEN = { destacados: "Destacados", "precio-asc": "Precio: menor a mayor", "precio-desc": "Precio: mayor a menor", peso: "Peso: menor a mayor" } as const;

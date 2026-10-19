/** Contenido ficticio de Lúmina Pro. Marcas, modelos, especificaciones y precios son inventados. */

export const BASE = "/demos/lumina-pro";
export const COLOR = { fondo: "#0d0d2b", panel: "#17173f", violeta: "#7c4ddb", violetaClaro: "#a98bf0", linea: "rgba(255,255,255,.12)" };

export type Categoria = "Cabezas móviles" | "Luces LED" | "Efectos" | "Audio" | "DJ";
export const CATEGORIAS: Categoria[] = ["Cabezas móviles", "Luces LED", "Efectos", "Audio", "DJ"];

export interface Producto {
  id: string;
  nombre: string;
  categoria: Categoria;
  imagen: string;
  alt: string;
  precio: number;
  potenciaW: number;
  pesoKg: number;
  /** Grado de protección IP (20 = interior, 65 = exterior). */
  ip: number;
  dmx: boolean;
  resumen: string;
  descripcion: string;
  /** Especificaciones adicionales; el comparador une las etiquetas de todos los productos. */
  specs: Record<string, string>;
}

export const PRODUCTOS: Producto[] = [
  { id: "moving-spot-250", nombre: "Cabeza móvil Spot 250", categoria: "Cabezas móviles", imagen: "assets/lumina-pro/equipo-01.webp", alt: "Cabeza móvil spot sobre fondo de estudio con haz de luz", precio: 1290000, potenciaW: 250, pesoKg: 21, ip: 20, dmx: true, resumen: "Spot LED de 250 W con gobos y zoom, para escenarios medianos.", descripcion: "Cabeza móvil de haz definido, con rueda de gobos y zoom motorizado. Su fuente LED de larga vida reduce el mantenimiento frente a lámparas de descarga.", specs: { "Fuente de luz": "LED 250 W", "Ángulo de haz": "12° a 28°", "Gobos": "14 fijos", "Canales DMX": "18" } },
  { id: "moving-beam-230", nombre: "Cabeza móvil Beam 230", categoria: "Cabezas móviles", imagen: "assets/lumina-pro/equipo-02.webp", alt: "Cabeza móvil beam proyectando haces sobre un escenario", precio: 1490000, potenciaW: 230, pesoKg: 19, ip: 20, dmx: true, resumen: "Haz fino de 2,5° con prismas, ideal para efectos aéreos.", descripcion: "Cabeza móvil de haz muy estrecho para efectos aéreos de gran alcance. Incluye dos prismas intercambiables y rueda de color.", specs: { "Fuente de luz": "LED 230 W", "Ángulo de haz": "2,5°", "Prismas": "2", "Canales DMX": "20" } },
  { id: "par-wash-18", nombre: "Par LED Wash 18×12 W", categoria: "Luces LED", imagen: "assets/lumina-pro/equipo-03.webp", alt: "Par LED de lavado con haz violeta", precio: 390000, potenciaW: 216, pesoKg: 6.5, ip: 65, dmx: true, resumen: "Par LED resistente al agua, para fachadas, carpas y escenarios.", descripcion: "Luz de lavado RGBW con carcasa sellada, apta para exterior. Es la base de la iluminación ambiental en eventos.", specs: { "Fuente de luz": "18 LED RGBW × 12 W", "Ángulo de haz": "25°", "Canales DMX": "8", "Uso": "Interior y exterior" } },
  { id: "barra-led-8", nombre: "Barra LED Pixel 8", categoria: "Luces LED", imagen: "assets/lumina-pro/equipo-04.webp", alt: "Barra LED blanca con humo", precio: 210000, potenciaW: 80, pesoKg: 3.2, ip: 20, dmx: true, resumen: "Barra de 8 segmentos controlables, para efectos de fondo y frentes de escenario.", descripcion: "Barra con ocho segmentos de color independientes. Se monta en trípode, truss o piso y permite animaciones rápidas.", specs: { "Fuente de luz": "8 segmentos RGB", "Longitud": "1 m", "Canales DMX": "24", "Uso": "Interior" } },
  { id: "proyector-laser-rgb", nombre: "Proyector láser RGB 3 W", categoria: "Efectos", imagen: "assets/lumina-pro/equipo-05.webp", alt: "Proyector de haces láser en un estudio oscuro", precio: 980000, potenciaW: 90, pesoKg: 8, ip: 20, dmx: true, resumen: "Láser de haces y patrones para discotecas y conciertos.", descripcion: "Proyector de 3 W de potencia óptica con patrones preprogramados y control DMX. Requiere cumplir la normativa de uso de láser vigente.", specs: { "Potencia óptica": "3 W RGB", "Patrones": "60 preprogramados", "Canales DMX": "12", "Uso": "Interior" } },
  { id: "foco-fresnel-200", nombre: "Foco LED Fresnel 200", categoria: "Luces LED", imagen: "assets/lumina-pro/equipo-06.webp", alt: "Foco LED tipo fresnel", precio: 520000, potenciaW: 200, pesoKg: 7, ip: 20, dmx: true, resumen: "Foco de luz continua con zoom manual, para teatro y presentaciones.", descripcion: "Foco de luz blanca de alta calidad cromática con zoom manual, pensado para escenarios de teatro y presentaciones corporativas.", specs: { "Fuente de luz": "LED blanco 200 W", "Ángulo de haz": "10° a 55°", "Índice de color (CRI)": "95", "Canales DMX": "4" } },
  { id: "humo-1500", nombre: "Máquina de humo 1500", categoria: "Efectos", imagen: "assets/lumina-pro/equipo-07.webp", alt: "Máquina de humo negra con niebla", precio: 240000, potenciaW: 1500, pesoKg: 6, ip: 20, dmx: true, resumen: "Máquina de humo de alto rendimiento con control DMX.", descripcion: "Genera niebla densa que hace visibles los haces de luz. Control DMX para ajustar el volumen según la escena.", specs: { "Salida": "420 m³/min", "Tanque": "2,5 L", "Calentamiento": "4 min", "Canales DMX": "1" } },
  { id: "controlador-dj-4", nombre: "Controlador DJ 4 canales", categoria: "DJ", imagen: "assets/lumina-pro/equipo-09.webp", alt: "Controlador de DJ con platos y pads", precio: 890000, potenciaW: 40, pesoKg: 7, ip: 20, dmx: false, resumen: "Controlador de 4 canales con platos de tamaño completo.", descripcion: "Controlador de cuatro canales con platos y pads de colores, pensado para cabinas profesionales y eventos.", specs: { "Canales": "4", "Platos": "Tamaño completo", "Interfaz de audio": "Integrada", "Conexión": "USB" } },
  { id: "line-array-12", nombre: "Módulo line array activo 12″", categoria: "Audio", imagen: "assets/lumina-pro/equipo-10.webp", alt: "Columna de módulos line array colgada", precio: 1690000, potenciaW: 1000, pesoKg: 28, ip: 44, dmx: false, resumen: "Módulo activo de 1.000 W para sistemas de sonido de gran alcance.", descripcion: "Módulo de line array con amplificación integrada. Varios módulos se combinan en columnas para cubrir salas y espacios abiertos.", specs: { "Respuesta en frecuencia": "55 Hz a 20 kHz", "Presión máxima": "132 dB", "Cobertura": "90° × 10°", "Conexión": "XLR" } },
  { id: "sub-15", nombre: "Subwoofer activo 15″", categoria: "Audio", imagen: "assets/lumina-pro/equipo-11.webp", alt: "Subwoofer negro de gran tamaño", precio: 1190000, potenciaW: 1200, pesoKg: 38, ip: 20, dmx: false, resumen: "Subwoofer activo para reforzar graves en eventos y discotecas.", descripcion: "Subwoofer de 15 pulgadas con amplificación integrada y filtro ajustable, para complementar los módulos line array o los parlantes de PA.", specs: { "Respuesta en frecuencia": "35 Hz a 120 Hz", "Presión máxima": "129 dB", "Filtro": "Ajustable", "Conexión": "XLR" } },
];

export const productoPorId = (id: string) => PRODUCTOS.find((p) => p.id === id);

export type EventoId = "matrimonio" | "corporativo" | "concierto" | "discoteca";
export type Tamano = "pequeno" | "mediano" | "grande";

export const EVENTOS: { id: EventoId; nombre: string; descripcion: string }[] = [
  { id: "matrimonio", nombre: "Matrimonio", descripcion: "Ambiente cálido, luz de acento y sonido claro para discursos y baile." },
  { id: "corporativo", nombre: "Evento corporativo", descripcion: "Presentaciones con buena luz sobre el escenario y sonido inteligible." },
  { id: "concierto", nombre: "Concierto en vivo", descripcion: "Luz dinámica de escenario y sonido de alto rendimiento." },
  { id: "discoteca", nombre: "Discoteca / DJ", descripcion: "Efectos intensos, láser y refuerzo de graves." },
];

export const TAMANOS: { id: Tamano; nombre: string; factor: number }[] = [
  { id: "pequeno", nombre: "Pequeño (hasta 100 personas)", factor: 1 },
  { id: "mediano", nombre: "Mediano (100 a 300)", factor: 2 },
  { id: "grande", nombre: "Grande (más de 300)", factor: 3 },
];

/** Cantidad base por evento (tamaño pequeño). Se multiplica por el factor del tamaño. */
const BASE_EVENTO: Record<EventoId, { id: string; cantidad: number; motivo: string }[]> = {
  matrimonio: [
    { id: "par-wash-18", cantidad: 4, motivo: "Luz de acento en muros y mesas" },
    { id: "moving-spot-250", cantidad: 1, motivo: "Seguimiento de los novios en pista" },
    { id: "humo-1500", cantidad: 1, motivo: "Hace visibles los haces en el baile" },
    { id: "line-array-12", cantidad: 1, motivo: "Sonido claro para discursos y música" },
  ],
  corporativo: [
    { id: "foco-fresnel-200", cantidad: 2, motivo: "Luz uniforme sobre el expositor" },
    { id: "par-wash-18", cantidad: 2, motivo: "Fondo de escenario con color de marca" },
    { id: "line-array-12", cantidad: 1, motivo: "Voz inteligible en toda la sala" },
  ],
  concierto: [
    { id: "moving-beam-230", cantidad: 2, motivo: "Efectos aéreos y barridos" },
    { id: "moving-spot-250", cantidad: 2, motivo: "Luz principal sobre los músicos" },
    { id: "barra-led-8", cantidad: 2, motivo: "Frente y fondo de escenario" },
    { id: "line-array-12", cantidad: 2, motivo: "Cobertura de sonido de alto nivel" },
    { id: "sub-15", cantidad: 1, motivo: "Refuerzo de graves" },
  ],
  discoteca: [
    { id: "proyector-laser-rgb", cantidad: 1, motivo: "Láser sobre la pista" },
    { id: "moving-beam-230", cantidad: 2, motivo: "Haces rápidos y sincronizados" },
    { id: "humo-1500", cantidad: 1, motivo: "Visibilidad de láser y haces" },
    { id: "controlador-dj-4", cantidad: 1, motivo: "Cabina de DJ" },
    { id: "sub-15", cantidad: 2, motivo: "Graves potentes" },
  ],
};

export interface LineaRecomendacion { producto: Producto; cantidad: number; motivo: string }

export function recomendar(evento: EventoId, tamano: Tamano): { lineas: LineaRecomendacion[]; total: number } {
  const f = TAMANOS.find((t) => t.id === tamano)!.factor;
  const lineas = BASE_EVENTO[evento].map((l) => ({ producto: productoPorId(l.id)!, cantidad: l.cantidad * f, motivo: l.motivo }));
  return { lineas, total: lineas.reduce((a, l) => a + l.producto.precio * l.cantidad, 0) };
}

export const KITS = [
  { id: "kit-matrimonio", nombre: "Kit Matrimonio · 120 invitados", para: "Salón o carpa de tamaño mediano", items: [["par-wash-18", 8], ["moving-spot-250", 2], ["humo-1500", 1], ["line-array-12", 2]] },
  { id: "kit-escenario", nombre: "Kit Escenario banda en vivo", para: "Escenario de 6 × 4 m", items: [["moving-spot-250", 2], ["moving-beam-230", 2], ["barra-led-8", 2], ["line-array-12", 2], ["sub-15", 1]] },
  { id: "kit-dj", nombre: "Kit Cabina DJ", para: "Local o evento con pista de baile", items: [["controlador-dj-4", 1], ["proyector-laser-rgb", 1], ["humo-1500", 1], ["sub-15", 2]] },
] as const;

export const GUIAS = [
  {
    id: "cabeza-movil",
    titulo: "Cómo elegir una cabeza móvil",
    resumen: "Spot, beam o wash: qué hace cada tipo y cuándo conviene.",
    cuerpo: [
      "Una cabeza móvil es un proyector motorizado que puede girar, inclinarse y cambiar de color, gobo o forma del haz sin intervención manual.",
      "El tipo spot entrega un haz definido con bordes nítidos y permite proyectar formas (gobos). Es la opción versátil para escenarios y presentaciones.",
      "El tipo beam entrega un haz muy fino y potente, pensado para efectos aéreos. Luce mejor con humo y en espacios oscuros.",
      "El tipo wash baña una superficie con color suave, sin bordes marcados; sirve para ambientar fondos y personas.",
      "Antes de decidir, considera el tamaño del espacio, la altura de montaje y si necesitas rotación rápida. Si dudas, nuestro equipo puede orientarte.",
    ],
  },
  {
    id: "par-vs-movil",
    titulo: "Par LED o cabeza móvil: cuál necesito",
    resumen: "Diferencias de costo, movimiento y mantenimiento.",
    cuerpo: [
      "Los pares LED son fijos: iluminan una zona con un color y no se mueven. Son económicos, livianos y muy confiables.",
      "Las cabezas móviles se mueven y cambian de efecto, a cambio de un costo y un peso mayores.",
      "Para ambientar una sala o una fachada, los pares LED suelen ser suficientes. Para dinamismo en un escenario, conviene sumar cabezas móviles.",
      "Una combinación frecuente es usar pares LED para la base de color y unas pocas cabezas móviles para los puntos de atención.",
    ],
  },
  {
    id: "proteccion-ip",
    titulo: "Qué significa el grado de protección IP",
    resumen: "Cómo saber si un equipo puede usarse en exterior.",
    cuerpo: [
      "El código IP indica cuánta protección tiene un equipo frente al polvo y al agua. El primer dígito se refiere a sólidos y el segundo a líquidos.",
      "IP20 es protección básica y significa que el equipo es para interior. IP44 resiste salpicaduras. IP65 resiste polvo y chorros de agua, y se usa en exterior.",
      "Un equipo de interior usado en exterior puede fallar con la humedad y perder la garantía. Revisa siempre el grado IP antes de comprar.",
    ],
  },
] as const;

export const CONTACTO = { correo: "ventas@lumina-pro.example", telefono: "+56 2 2111 0000", horario: "Lunes a viernes, 9:00 a 18:30" };

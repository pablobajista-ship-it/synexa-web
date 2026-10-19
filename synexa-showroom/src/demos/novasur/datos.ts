/** Contenido ficticio de NovaSur Ingeniería. Empresa, personas, cifras y proyectos son inventados. */

export const BASE = "/demos/novasur";
export const COLOR = { petroleo: "#0e3b4a", acento: "#246b7a", claro: "#e8eef0", oscuro: "#0a2833" };

export const CONTACTO = {
  direccion: "Av. Industrial 1450, Parque Tecnológico Sur, Región Ficticia",
  telefono: "+56 2 2000 0000",
  correo: "contacto@novasur.example",
  horario: "Lunes a viernes, 8:30 a 18:00",
};

export const CIFRAS = [
  { valor: "18", texto: "años de trayectoria" },
  { valor: "240+", texto: "proyectos entregados" },
  { valor: "65", texto: "profesionales y técnicos" },
  { valor: "0,4", texto: "tasa de accidentes por millón de horas" },
];

export const SERVICIOS = [
  { id: "ingenieria", titulo: "Ingeniería y diseño", texto: "Ingeniería básica y de detalle para plantas, sistemas eléctricos y mecánicos, con modelado 3D y revisión de constructabilidad.", puntos: ["Ingeniería básica y de detalle", "Modelado 3D y planos as-built", "Estudios de factibilidad"] },
  { id: "construccion", titulo: "Construcción industrial", texto: "Obras civiles, montaje de estructuras y de equipos, con control de calidad y de seguridad en cada etapa.", puntos: ["Obras civiles y estructuras", "Montaje electromecánico", "Puesta en marcha"] },
  { id: "mantenimiento", titulo: "Mantenimiento industrial", texto: "Planes preventivos y correctivos para equipos rotatorios, sistemas de bombeo y tableros de control.", puntos: ["Mantenimiento preventivo y predictivo", "Paradas de planta", "Contratos de disponibilidad"] },
  { id: "electrico", titulo: "Instalaciones eléctricas", texto: "Subestaciones, canalizaciones y tableros para media y baja tensión, con pruebas y certificación.", puntos: ["Subestaciones y transformadores", "Tableros y control", "Pruebas y certificación"] },
  { id: "seguridad", titulo: "Seguridad y cumplimiento", texto: "Planes de prevención, auditorías y capacitación para operar con estándares exigentes.", puntos: ["Planes de prevención de riesgos", "Auditorías internas", "Capacitación en terreno"] },
  { id: "asesoria", titulo: "Asesoría técnica", texto: "Revisión de proyectos, inspección técnica de obra y apoyo en licitaciones.", puntos: ["Inspección técnica de obra", "Revisión de bases y presupuestos", "Peritajes"] },
];

export const PROYECTOS = [
  {
    slug: "centro-logistico-parque-sur",
    titulo: "Centro logístico Parque Sur",
    categoria: "Construcción",
    anio: 2025,
    ubicacion: "Región Ficticia",
    imagen: "assets/novasur/proyecto-1.webp",
    alt: "Bodega industrial con andenes de carga y camiones",
    resumen: "Bodega de 18.000 m² con 12 andenes, oficinas y urbanización completa.",
    desafio: "Entregar la obra gruesa en 7 meses, con un terreno de baja capacidad de soporte y entregas de acero concentradas en el invierno.",
    solucion: "Reforzamos el suelo con una malla de pilotes y planificamos el montaje por módulos, lo que permitió trabajar en paralelo en tres frentes.",
    resultados: ["Obra entregada 3 semanas antes del plazo", "Sin accidentes con tiempo perdido", "Reducción de 12 % en el consumo de acero respecto al diseño original"],
    datos: [["Superficie", "18.000 m²"], ["Plazo", "7 meses"], ["Cliente", "Operador logístico (ficticio)"]],
  },
  {
    slug: "subestacion-electrica-norte",
    titulo: "Subestación eléctrica Norte",
    categoria: "Instalaciones eléctricas",
    anio: 2024,
    ubicacion: "Región Ficticia",
    imagen: "assets/novasur/proyecto-2.webp",
    alt: "Subestación eléctrica con transformadores y canalizaciones",
    resumen: "Nueva subestación de 66/13,8 kV con dos transformadores y sistema de control remoto.",
    desafio: "Conectar la nueva subestación sin interrumpir el suministro de una planta que opera las 24 horas.",
    solucion: "Diseñamos una conexión por etapas, con ventanas de corte de menos de 4 horas y pruebas previas en banco.",
    resultados: ["Cero cortes no programados durante la conexión", "Monitoreo remoto de 140 puntos", "Certificación sin observaciones"],
    datos: [["Potencia", "2 × 25 MVA"], ["Plazo", "10 meses"], ["Cliente", "Empresa industrial (ficticia)"]],
  },
  {
    slug: "sala-de-bombas-planta-oriente",
    titulo: "Sala de bombas Planta Oriente",
    categoria: "Mantenimiento",
    anio: 2025,
    ubicacion: "Región Ficticia",
    imagen: "assets/novasur/proyecto-3.webp",
    alt: "Técnicos trabajando en bombas industriales",
    resumen: "Renovación y mantenimiento mayor de seis bombas de proceso durante una parada programada.",
    desafio: "Intervenir seis equipos críticos en solo 9 días de parada.",
    solucion: "Preparamos kits de repuestos y ensayos previos, y organizamos tres cuadrillas con relevos de turno.",
    resultados: ["Parada terminada en 8 días", "Eficiencia energética de las bombas +9 %", "Plan de mantenimiento predictivo incorporado"],
    datos: [["Equipos", "6 bombas"], ["Parada", "8 días"], ["Cliente", "Planta de proceso (ficticia)"]],
  },
] as const;

export const DIRECTIVOS = [
  { nombre: "Rodrigo Valdés M.", cargo: "Gerente general", imagen: "assets/novasur/equipo-1.webp", alt: "Retrato del gerente general", bio: "Ingeniero civil con 22 años de experiencia en obras industriales." },
  { nombre: "Marcela Torres A.", cargo: "Directora de ingeniería", imagen: "assets/novasur/equipo-2.webp", alt: "Retrato de la directora de ingeniería", bio: "Ingeniera eléctrica, especialista en subestaciones y sistemas de control." },
];

export const EQUIPO_TECNICO = [
  { nombre: "Felipe Araya", cargo: "Jefe de obras" },
  { nombre: "Camila Soto", cargo: "Jefa de prevención de riesgos" },
  { nombre: "Ignacio Peña", cargo: "Ingeniero de mantenimiento" },
  { nombre: "Valentina Rojas", cargo: "Ingeniera de proyectos" },
];

export interface Noticia {
  id: string;
  titulo: string;
  fecha: string; // AAAA-MM-DD
  resumen: string;
  cuerpo: string;
  imagen?: string;
  publicada: boolean;
}

export const NOTICIAS_INICIALES: Noticia[] = [
  { id: "n1", titulo: "NovaSur entrega el centro logístico Parque Sur antes del plazo", fecha: "2026-08-12", resumen: "La obra de 18.000 m² terminó tres semanas antes de lo comprometido.", cuerpo: "Con 12 andenes y oficinas, el centro logístico Parque Sur ya opera.\n\nEl equipo trabajó en tres frentes en paralelo y mantuvo cero accidentes con tiempo perdido durante toda la obra.", imagen: "assets/novasur/proyecto-1.webp", publicada: true },
  { id: "n2", titulo: "Nuevo plan de mantenimiento predictivo para plantas de proceso", fecha: "2026-07-03", resumen: "Incorporamos análisis de vibraciones y termografía a nuestros contratos de mantenimiento.", cuerpo: "El nuevo plan permite anticipar fallas en equipos rotatorios y programar las intervenciones en las paradas.\n\nEstá disponible para todos los contratos de disponibilidad.", imagen: "assets/novasur/equipamiento.webp", publicada: true },
  { id: "n3", titulo: "Capacitación en terreno: 120 trabajadores certificados en trabajo en altura", fecha: "2026-05-20", resumen: "Completamos el programa anual de formación en seguridad.", cuerpo: "Más de 120 trabajadores de nuestras obras recibieron capacitación práctica y certificación en trabajo en altura.", imagen: "assets/novasur/ingenieros.webp", publicada: true },
  { id: "n4", titulo: "Borrador: alianza con proveedor de transformadores", fecha: "2026-09-01", resumen: "Noticia en revisión, aún no publicada.", cuerpo: "Texto en elaboración.", publicada: false },
];

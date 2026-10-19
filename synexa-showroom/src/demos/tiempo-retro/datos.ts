/** Contenido ficticio de Tiempo Retro. Locutores, programas, artistas y canciones son inventados. */
import type { Dia, ProgramaRadio } from "../compartido/ReproductorRadio";

export const BASE = "/demos/tiempo-retro";
export const C = { petroleo: "#0f4a56", petroleoOsc: "#0a3640", naranja: "#ffbc80", crema: "#f5ead3", suave: "#145a68" };
const LV: Dia[] = ["lun", "mar", "mie", "jue", "vie"];

export const LOCUTORES = [
  { id: "ernesto", nombre: "Ernesto Valle", img: "assets/tiempo-retro/locutor-1.webp", alt: "Retrato de Ernesto Valle con chaleco y micrófono", bio: "Más de 30 años en la radio. Conoce cada disco por su portada." },
  { id: "luz", nombre: "Luz Amaranto", img: "assets/tiempo-retro/locutor-2.webp", alt: "Retrato de Luz Amaranto con auriculares", bio: "Especialista en música de los años 80 y en las historias detrás de las canciones." },
  { id: "bruno", nombre: "Bruno Ledesma", img: "assets/tiempo-retro/locutor-3.webp", alt: "Retrato de Bruno Ledesma con cárdigan", bio: "Presenta los programas de los 90 y del archivo sonoro." },
] as const;

export const PROGRAMAS: (ProgramaRadio & { decada: string; genero: string })[] = [
  { id: "madrugada-vinilo", nombre: "Madrugada de Vinilo", locutores: ["ernesto"], dias: LV, inicio: 7, fin: 10, decada: "1970", genero: "Rock y soul", descripcion: "Los grandes discos de los 70 para empezar el día, con anécdotas de cada grabación." },
  { id: "neones-80", nombre: "Neones del 80", locutores: ["luz"], dias: LV, inicio: 12, fin: 15, decada: "1980", genero: "Pop y new wave", descripcion: "Sintetizadores, baladas y los éxitos que bailamos en los 80." },
  { id: "cd-90", nombre: "Disco Compacto 90", locutores: ["bruno"], dias: LV, inicio: 17, fin: 20, decada: "1990", genero: "Pop y rock alternativo", descripcion: "Los himnos de los 90, de las bandas de garaje al pop de estadio." },
  { id: "archivo", nombre: "Archivo Sonoro", locutores: ["ernesto", "bruno"], dias: ["sab"], inicio: 11, fin: 14, decada: "Todas", genero: "Mixto", descripcion: "Joyas del archivo de la emisora, entrevistas históricas y pedidos del público." },
  { id: "domingo-dedicado", nombre: "Domingo Dedicado", locutores: ["luz"], dias: ["dom"], inicio: 10, fin: 13, decada: "Todas", genero: "Mixto", descripcion: "Un programa hecho con las dedicatorias de los oyentes." },
];

export interface Contenido { id: string; titulo: string; tipo: "Artículo" | "Noticia" | "Entrevista"; decada: string; fecha: string; resumen: string; cuerpo: string; imagen?: string; publicada: boolean }

export const CONTENIDOS_INICIALES: Contenido[] = [
  { id: "c1", titulo: "El renacer del casete: por qué vuelve a venderse", tipo: "Noticia", decada: "1980", fecha: "2026-10-10", resumen: "Tiendas y bandas independientes editan de nuevo en cinta.", cuerpo: "El casete vuelve a los mostradores. Bandas independientes lo eligen por su precio y por el ritual de dar vuelta el lado A.\n\nLos coleccionistas valoran su sonido cálido y sus portadas pequeñas, pensadas para un bolsillo.", imagen: "assets/tiempo-retro/decada-80.webp", publicada: true },
  { id: "c2", titulo: "Cómo se grababa un disco en 1975", tipo: "Artículo", decada: "1970", fecha: "2026-09-28", resumen: "Cinta de carrete, mesas analógicas y una sola toma.", cuerpo: "En los 70, grabar un disco era una operación de equipo: ingenieros, músicos y una máquina de carrete que no perdonaba errores.\n\nMuchas voces se registraban en una sola toma, y esa imperfección es parte de su encanto.", imagen: "assets/tiempo-retro/equipos.webp", publicada: true },
  { id: "c3", titulo: "Entrevista a Ernesto Valle: treinta años frente al micrófono", tipo: "Entrevista", decada: "1970", fecha: "2026-09-15", resumen: "El locutor repasa su carrera y los discos que lo marcaron.", cuerpo: "«Mi primer día me temblaban las manos», recuerda Ernesto. «Hoy sigo sintiendo lo mismo cuando se enciende la luz roja».\n\nEl conductor cuenta cómo cambió la radio y por qué cree que la voz humana sigue siendo insustituible.", imagen: "assets/tiempo-retro/locutor-1.webp", publicada: true },
  { id: "c3b", titulo: "Los 90 en diez canciones", tipo: "Artículo", decada: "1990", fecha: "2026-08-30", resumen: "Una selección para entender la década del disco compacto.", cuerpo: "Los 90 fueron la década del disco compacto, de las bandas alternativas y del portátil con salto antigolpes.\n\nEsta lista recorre diez canciones que definieron una generación.", imagen: "assets/tiempo-retro/decada-90.webp", publicada: true },
  { id: "c4", titulo: "Borrador: especial de fin de año", tipo: "Artículo", decada: "Todas", fecha: "2026-10-18", resumen: "Texto en preparación.", cuerpo: "Contenido en elaboración por el equipo editorial.", publicada: false },
];

export const CANCIONES = [
  { titulo: "Noche de Neón", artista: "Los Faroles del Sur" },
  { titulo: "Cinta Rebobinada", artista: "Ana Beltrán" },
  { titulo: "Verano del 85", artista: "Vértigo Azul" },
  { titulo: "Radio Despierta", artista: "Noa y los Cuarzos" },
];

export const DECADAS = ["1970", "1980", "1990", "Todas"];
export const TIPOS: Contenido["tipo"][] = ["Artículo", "Noticia", "Entrevista"];
export const BANNER = "assets/tiempo-retro/banner.webp";
export const ESTUDIO = "assets/tiempo-retro/hero.webp";

export interface Dedicatoria { id: string; para: string; de: string; mensaje: string; cancion: string; estado: "pendiente" | "aprobada" | "rechazada" }
export const DEDICATORIAS_INICIALES: Dedicatoria[] = [
  { id: "d1", para: "Papá", de: "Camila", mensaje: "Por enseñarme a querer esta música.", cancion: "Noche de Neón", estado: "aprobada" },
  { id: "d2", para: "Mi curso del 95", de: "Fabián", mensaje: "¡Qué tiempos aquellos!", cancion: "Verano del 85", estado: "aprobada" },
];

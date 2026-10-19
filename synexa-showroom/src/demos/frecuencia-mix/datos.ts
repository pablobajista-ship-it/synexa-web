/** Contenido ficticio de Frecuencia Mix. Personas, programas, canciones y artistas son inventados. */

export const BASE = "/demos/frecuencia-mix";
export const COLOR = { fondo: "#070f2b", panel: "#0f1d4d", teal: "#14b8a6", violeta: "#8b5cf6", tealClaro: "#5eead4" };

export const LOCUTORES = [
  { id: "julia", nombre: "Julia Marín", imagen: "assets/frecuencia-mix/locutor-1.webp", alt: "Retrato de Julia Marín en la cabina", bio: "Conduce las mañanas. Le gusta el indie, el soul y las historias detrás de cada disco." },
  { id: "mateo", nombre: "Mateo Ibarra", imagen: "assets/frecuencia-mix/locutor-2.webp", alt: "Retrato de Mateo Ibarra con audífonos", bio: "Voz del mediodía y de la noche. Experto en música electrónica y en recomendar lo que nadie conoce." },
  { id: "sam", nombre: "Sam Cortés", imagen: "assets/frecuencia-mix/locutor-3.webp", alt: "Retrato de Sam Cortés con chaqueta de mezclilla", bio: "Presenta las tardes y los domingos acústicos. Creció tocando en bandas de garaje." },
] as const;

export type DiaId = "lun" | "mar" | "mie" | "jue" | "vie" | "sab" | "dom";
export const DIAS: { id: DiaId; nombre: string; corto: string }[] = [
  { id: "lun", nombre: "Lunes", corto: "Lun" }, { id: "mar", nombre: "Martes", corto: "Mar" }, { id: "mie", nombre: "Miércoles", corto: "Mié" },
  { id: "jue", nombre: "Jueves", corto: "Jue" }, { id: "vie", nombre: "Viernes", corto: "Vie" }, { id: "sab", nombre: "Sábado", corto: "Sáb" }, { id: "dom", nombre: "Domingo", corto: "Dom" },
];
const LV: DiaId[] = ["lun", "mar", "mie", "jue", "vie"];

export const PROGRAMAS = [
  { id: "buenos-dias", nombre: "Buenos días, Frecuencia", locutores: ["julia"], dias: LV, inicio: 7, fin: 10, descripcion: "Música para despertar, noticias breves y la agenda cultural del día." },
  { id: "mix-mediodia", nombre: "Mix de Mediodía", locutores: ["mateo"], dias: LV, inicio: 12, fin: 14, descripcion: "Una hora y media de clásicos y novedades, con tus pedidos y dedicatorias." },
  { id: "tarde-en-vivo", nombre: "Tarde en Vivo", locutores: ["sam"], dias: LV, inicio: 16, fin: 19, descripcion: "Entrevistas, sesiones en vivo y la trivia musical de la tarde." },
  { id: "noche-electrica", nombre: "Noche Eléctrica", locutores: ["mateo", "sam"], dias: LV, inicio: 21, fin: 24, descripcion: "Electrónica, synth y mezclas para cerrar el día." },
  { id: "sabado-descubrimientos", nombre: "Sábado de Descubrimientos", locutores: ["julia"], dias: ["sab"] as DiaId[], inicio: 10, fin: 13, descripcion: "Bandas emergentes, entrevistas y la votación semanal de la comunidad." },
  { id: "domingo-acustico", nombre: "Domingo Acústico", locutores: ["sam"], dias: ["dom"] as DiaId[], inicio: 11, fin: 14, descripcion: "Versiones acústicas y sesiones íntimas para un domingo tranquilo." },
] as const;

export const locutorPorId = (id: string) => LOCUTORES.find((l) => l.id === id);

export const CANCIONES = [
  { titulo: "Luz de Neón", artista: "Los Faroles del Sur" },
  { titulo: "Marea Alta", artista: "Ana Beltrán" },
  { titulo: "Ciudad de Cristal", artista: "Vértigo Azul" },
  { titulo: "Domingo en Cámara Lenta", artista: "Noa y los Cuarzos" },
  { titulo: "Pulso", artista: "Ruta 45" },
  { titulo: "Satélite", artista: "Mar de Fondo" },
];

export const ARTICULOS = [
  { id: "vinilo", titulo: "Por qué el vinilo volvió a sonar", imagen: "assets/frecuencia-mix/editorial.webp", alt: "Audífonos sobre un disco de vinilo", resumen: "Un repaso a la nueva generación de coleccionistas.", cuerpo: "El vinilo no desapareció: se reinventó. Hoy se compra tanto por el sonido como por el ritual de elegir un disco, sacarlo de su funda y escucharlo completo.\n\nLas bandas emergentes lo usan como forma de conectar con su público: ediciones pequeñas, con arte propio, que se agotan en horas." },
  { id: "mezcla", titulo: "El arte de mezclar en vivo", imagen: "assets/frecuencia-mix/equipamiento.webp", alt: "Faders de una consola de mezcla con luces turquesa", resumen: "Cómo se decide qué suena y cuándo en una radio.", cuerpo: "Mezclar en vivo es decidir en segundos: cuánto sube una voz, cuándo entra una canción, cómo se enlaza un tema con otro.\n\nUn buen ingeniero de sonido se nota cuando no se nota: todo fluye y nadie piensa en la consola." },
  { id: "club", titulo: "La nueva escena de clubes pequeños", imagen: "assets/frecuencia-mix/ambiente-1.webp", alt: "DJ frente a una pista llena en un club oscuro", resumen: "Salas íntimas que están cambiando la música en vivo.", cuerpo: "Lejos de los grandes festivales, pequeños clubes de 200 personas están formando públicos fieles y dando espacio a artistas que no llegan a la radio comercial.\n\nEsa cercanía hace que cada noche sea distinta." },
  { id: "guitarra", titulo: "Guitarras: el sonido de lo imperfecto", imagen: "assets/frecuencia-mix/ambiente-2.webp", alt: "Guitarrista en silueta sobre un escenario", resumen: "Qué buscan los músicos en un instrumento con historia.", cuerpo: "Una guitarra con años encima tiene marcas, desgaste y un carácter que no se fabrica. Para muchos músicos, esas imperfecciones son parte de su sonido.\n\nPor eso las sesiones acústicas de los domingos se graban sin retoques." },
] as const;

export const BANNER = "assets/frecuencia-mix/banner.webp";

// ---- Comunidad ----
export const USUARIOS = [
  { id: "vale", nombre: "Valentina" }, { id: "joaquin", nombre: "Joaquín" }, { id: "cami", nombre: "Cami" }, { id: "nico", nombre: "Nico" }, { id: "fran", nombre: "Fran" },
];

export const RESPUESTAS = [
  "¡Qué buena canción para esta hora!",
  "Saludos desde el sur, ¡los escucho a diario!",
  "¿Alguien más con ganas de pedir algo de Ruta 45?",
  "Esa mezcla de recién estuvo increíble.",
  "Dedicada para todos los que están trabajando 🎧",
  "Voto por Satélite en la encuesta, ¡vamos!",
];

export const PALABRAS_BLOQUEADAS_INICIALES = ["spam", "estafa", "idiota"];

export const ENCUESTA = {
  pregunta: "¿Qué canción cierra el programa de hoy?",
  opciones: [
    { id: "satelite", texto: "Satélite — Mar de Fondo", base: 42 },
    { id: "pulso", texto: "Pulso — Ruta 45", base: 31 },
    { id: "marea", texto: "Marea Alta — Ana Beltrán", base: 27 },
  ],
};

export const TRIVIA = [
  { q: "¿Cuántas cuerdas tiene una guitarra clásica?", opciones: ["4", "6", "8", "12"], correcta: 1 },
  { q: "¿Qué aparato se usa para reproducir discos de vinilo?", opciones: ["Tocadiscos", "Radiograbador", "Amplificador", "Sintetizador"], correcta: 0 },
  { q: "¿Qué significa BPM en música?", opciones: ["Bajos por minuto", "Pulsos por minuto", "Bandas por mes", "Bits por melodía"], correcta: 1 },
  { q: "¿Cuál de estos es un instrumento de viento?", opciones: ["Violonchelo", "Batería", "Saxofón", "Arpa"], correcta: 2 },
  { q: "¿Cómo se llama el aumento gradual de volumen al empezar una canción?", opciones: ["Fade out", "Fade in", "Loop", "Sample"], correcta: 1 },
] as const;

/** Contenido ficticio de Molino Sur. Negocio, personas, horarios y dirección son inventados. */

export const BASE = "/demos/molino-sur";
export const C = { crema: "#f6ecd9", cafe: "#3b2a20", terracota: "#a4552f", terracotaOsc: "#8a4426", suave: "#fbf5ea" };

export const NEGOCIO = {
  direccion: "Calle Los Aromos 245, Barrio Sur, Ciudad Ficticia",
  telefono: "+56 9 5000 0000",
  correo: "hola@molinosur.example",
};

/** Horario por día de la semana (0 = domingo). null = cerrado. */
export const HORARIO: Record<number, [number, number] | null> = {
  0: [9, 14], 1: [8, 19], 2: [8, 19], 3: [8, 19], 4: [8, 19], 5: [8, 20], 6: [9, 20],
};
export const DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

export function estadoAhora(f = new Date()): { abierto: boolean; texto: string } {
  const h = HORARIO[f.getDay()];
  const hora = f.getHours() + f.getMinutes() / 60;
  if (h && hora >= h[0] && hora < h[1]) return { abierto: true, texto: `Abierto ahora · cierra a las ${h[1]}:00` };
  const sig = (() => {
    for (let i = 0; i <= 7; i++) {
      const d = (f.getDay() + i) % 7;
      const hh = HORARIO[d];
      if (hh && (i > 0 || hora < hh[0])) return { d, hh, i };
    }
    return null;
  })();
  return { abierto: false, texto: sig ? `Cerrado · abre ${sig.i === 0 ? "hoy" : sig.i === 1 ? "mañana" : DIAS[sig.d].toLowerCase()} a las ${sig.hh[0]}:00` : "Cerrado" };
}

export const PRODUCTOS = [
  { id: "pan-masa-madre", nombre: "Pan de masa madre", precio: "Desde $3.800", imagen: "assets/molino-sur/pan-rustico.webp", alt: "Pan de masa madre sobre un paño de lino", texto: "Fermentación lenta de 24 horas, corteza crujiente y miga alveolada." },
  { id: "croissants", nombre: "Croissants y viennoiserie", precio: "Desde $1.800", imagen: "assets/molino-sur/pasteleria.webp", alt: "Plato de croissants, pains au chocolat y almendrados", texto: "Mantequilla de verdad, laminados a mano cada madrugada." },
  { id: "cafe", nombre: "Café de especialidad", precio: "Desde $2.200", imagen: "assets/molino-sur/barista.webp", alt: "Barista sirviendo un café con arte latte", texto: "Granos de tostadores locales, preparados al momento." },
  { id: "tortas", nombre: "Tortas por encargo", precio: "Cotizar", imagen: "assets/molino-sur/galeria.webp", alt: "Estantería de panes y bollería", texto: "Para celebraciones, con 72 horas de anticipación." },
] as const;

export const GALERIA = [
  { src: "assets/molino-sur/hero.webp", alt: "Panes recién horneados sobre un mesón de madera" },
  { src: "assets/molino-sur/cafeteria.webp", alt: "Mujer tomando café junto a la ventana de la cafetería" },
  { src: "assets/molino-sur/banner.webp", alt: "Interior de la panadería con mostrador de pasteles" },
  { src: "assets/molino-sur/fachada.webp", alt: "Fachada de la panadería con toldo rayado" },
  { src: "assets/molino-sur/galeria.webp", alt: "Estantería con variedad de panes" },
  { src: "assets/molino-sur/pasteleria.webp", alt: "Croissants y café sobre una mesa de madera" },
];

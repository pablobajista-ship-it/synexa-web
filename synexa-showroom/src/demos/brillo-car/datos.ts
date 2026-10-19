/** Contenido ficticio de BrilloCar Detailing. Todos los precios y testimonios son de demostración. */

export const MARCA = { azul: "#2f6bff", grafito: "#14161b", grafito2: "#1d2027" };

export const PAQUETES = [
  {
    id: "esencial",
    nombre: "Esencial",
    precio: 45000,
    duracion: "3 horas",
    resumen: "Limpieza profunda para mantener tu auto como nuevo.",
    incluye: ["Lavado exterior a mano", "Descontaminación de pintura", "Aspirado y limpieza interior", "Cristales y neumáticos"],
    destacado: false,
  },
  {
    id: "premium",
    nombre: "Premium",
    precio: 120000,
    duracion: "1 día",
    resumen: "Recupera el brillo y protege la pintura por meses.",
    incluye: ["Todo lo del paquete Esencial", "Pulido de una etapa", "Sellante de pintura 6 meses", "Hidratación de cuero y plásticos", "Limpieza de motor"],
    destacado: true,
  },
  {
    id: "ceramico",
    nombre: "Cerámico",
    precio: 290000,
    duracion: "2 a 3 días",
    resumen: "Protección cerámica y corrección de pintura de alto nivel.",
    incluye: ["Todo lo del paquete Premium", "Corrección de pintura en dos etapas", "Recubrimiento cerámico 2 años", "Protección de llantas y cristales", "Revisión de control a los 30 días"],
    destacado: false,
  },
] as const;

export const BENEFICIOS = [
  { titulo: "Pintura protegida", texto: "Productos de grado profesional que sellan la pintura contra sol, lluvia y suciedad." },
  { titulo: "Brillo que se nota", texto: "Pulido y corrección que eliminan micro-rayas y devuelven profundidad al color." },
  { titulo: "Interior impecable", texto: "Limpieza detallada de cuero, plásticos y tapiz, hasta los rincones difíciles." },
  { titulo: "Más valor de reventa", texto: "Un auto bien cuidado se vende mejor y a mejor precio." },
];

export const TESTIMONIOS = [
  { nombre: "Camila R.", auto: "SUV blanca", texto: "Mi auto parecía recién salido de la agencia. El antes y el después es impresionante." },
  { nombre: "Martín S.", auto: "Pickup negra", texto: "Me explicaron cada paso y cumplieron el plazo. El cerámico sigue repeliendo el agua." },
  { nombre: "Daniela P.", auto: "Hatchback gris", texto: "Pensé que la pintura no tenía arreglo. Quedó perfecta, y con precio claro desde el inicio." },
];

export const FAQ = [
  { q: "¿Cuánto dura el recubrimiento cerámico?", a: "El paquete Cerámico incluye un recubrimiento de 2 años, con revisión de control a los 30 días. La duración real depende del uso y del mantenimiento." },
  { q: "¿Puedo esperar mientras trabajan en mi auto?", a: "El paquete Esencial se hace en unas 3 horas y puedes esperar en la sala. Los demás requieren dejar el auto uno o más días." },
  { q: "¿Trabajan con cualquier tipo de vehículo?", a: "Sí: autos, SUV y pickups. El valor puede variar según el tamaño y el estado del vehículo; lo confirmamos en la cotización." },
  { q: "¿Qué pasa si el auto tiene rayas profundas?", a: "El pulido corrige las marcas superficiales. Las rayas que atraviesan la pintura requieren reparación de carrocería, que no realizamos." },
  { q: "¿Cómo reservo?", a: "Completa el formulario de cotización. Te respondemos con un valor y una fecha disponible." },
];

export const GALERIA = [
  { src: "assets/brillo-car/galeria-1.webp", alt: "SUV blanca con pintura sellada y gotas de agua en el taller" },
  { src: "assets/brillo-car/galeria-2.webp", alt: "Detalle de una llanta limpia con pinza de freno roja" },
  { src: "assets/brillo-car/galeria-3.webp", alt: "Pickup negra pulida al atardecer" },
  { src: "assets/brillo-car/interior.webp", alt: "Interior de cuero negro impecable" },
];

export const TIPOS_VEHICULO = ["Auto / hatchback", "Sedán", "SUV", "Pickup", "Otro"];

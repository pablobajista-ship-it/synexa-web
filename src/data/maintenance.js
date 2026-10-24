/**
 * Contenido comercial de la oferta en dos líneas: desarrollo web (principal) y
 * mantenimiento web (adicional y opcional). Nada de esto fija precios ni
 * condiciones contractuales nuevas: los planes y valores vigentes viven en
 * supportPlans.js. Los grupos de mantenimiento son orientativos.
 */
import { SHOWROOM_HREF } from "@/data/showroomTeaser";
import { contactHref } from "@/data/contact";

export const MAINTENANCE_HREF = "/mantenimiento-web";
export const MAINTENANCE_CONTACT = contactHref({ service: "mantenimiento", source: "mantenimiento-web" });

export const TWO_SERVICES = {
  development: {
    title: "Creamos tu sitio web",
    badge: "Servicio por proyecto",
    text: "Diseñamos, desarrollamos y publicamos páginas web, tiendas online, catálogos y plataformas digitales profesionales. Cada proyecto se adapta a las necesidades de tu negocio, con características, plazos y precios definidos previamente.",
    benefits: [
      "Diseño profesional y adaptable.",
      "Desarrollo y configuración.",
      "Publicación y puesta en marcha.",
      "Entrega según el alcance contratado.",
    ],
    cta: { href: SHOWROOM_HREF, label: "Explorar sitios y precios" },
  },
  maintenance: {
    title: "Mantenemos tu sitio funcionando",
    badge: "Servicio adicional y opcional",
    text: "Después de publicar tu sitio, puedes contratar nuestros servicios de mantenimiento y soporte técnico. Te ayudamos a mantener tu plataforma actualizada, supervisada y en buenas condiciones de funcionamiento, de acuerdo con el plan elegido.",
    benefits: [
      "Actualizaciones técnicas.",
      "Respaldos y verificaciones.",
      "Revisión del funcionamiento.",
      "Resolución de incidencias.",
      "Ajustes menores autorizados.",
      "Orientación técnica.",
    ],
    note: "Los beneficios dependen del plan contratado.",
    cta: { href: MAINTENANCE_HREF, label: "Conocer mantenimiento" },
  },
};

/** Modalidades de contratación (Servicios y Precios). */
export const CONTRACT_MODES = [
  {
    id: "desarrollo",
    title: "Desarrollo web",
    text: "Pagas por el diseño y desarrollo del proyecto acordado. El valor depende del tipo de sitio y las funcionalidades contratadas.",
  },
  {
    id: "mantenimiento",
    title: "Mantenimiento web",
    text: "Puedes contratar posteriormente un servicio de mantenimiento y soporte. Es opcional y se cotiza o contrata por separado, según las necesidades de tu proyecto.",
  },
];

export const AFTER_DELIVERY = [
  "Recibes tu proyecto de acuerdo con el alcance contratado.",
  "Puedes gestionar tu sitio sin contratar mantenimiento de SYNEXA.",
  "Puedes solicitar asistencia o modificaciones adicionales, sujetas a evaluación y cotización.",
  "Puedes contratar un plan de mantenimiento periódico, si lo necesitas.",
];

/** Grupos orientativos: NO son planes contractuales. */
export const MAINTENANCE_GROUPS = [
  {
    id: "tecnico",
    title: "Mantenimiento técnico básico",
    items: [
      "Revisiones generales.",
      "Actualizaciones compatibles con la tecnología utilizada.",
      "Verificación de funcionamiento.",
      "Respaldos cuando la infraestructura lo permita.",
    ],
  },
  {
    id: "asistencia",
    title: "Mantenimiento y asistencia",
    items: [
      "Servicios del nivel básico.",
      "Soporte ante incidencias.",
      "Ajustes menores definidos en el contrato.",
      "Orientación sobre el uso del sitio.",
    ],
  },
  {
    id: "avanzado",
    title: "Mantenimiento avanzado",
    items: [
      "Supervisión técnica de mayor alcance.",
      "Apoyo a plataformas con funcionalidades especiales.",
      "Evaluación de mejoras y optimizaciones.",
      "Atención según las condiciones comerciales pactadas.",
    ],
  },
];

/** Conceptos que no deben confundirse ni darse por incluidos. */
export const NOT_THE_SAME = [
  { term: "Mantenimiento", text: "Cuidado técnico posterior a la entrega, según el plan contratado." },
  { term: "Hosting e infraestructura", text: "Dónde funciona el sitio. Se especifica por separado o como parte del alcance de la propuesta." },
  { term: "Dominio", text: "La dirección web del sitio. Se detalla en cada propuesta." },
  { term: "Garantía del trabajo entregado", text: "Se define en el acuerdo de cada proyecto; no se asume incluida." },
  { term: "Nuevas funcionalidades", text: "Mejoras y modificaciones mayores pueden requerir una cotización independiente." },
];

export const MAINTENANCE_FAQ = [
  {
    q: "¿Debo contratar mantenimiento al crear mi página web?",
    a: "No. El desarrollo del sitio y el mantenimiento posterior son servicios distintos. Puedes contratar únicamente la creación de tu página web.",
  },
  {
    q: "¿Puedo contratar mantenimiento después?",
    a: "Sí. Podemos evaluar tus necesidades y ofrecerte una propuesta de mantenimiento según las características de tu sitio.",
  },
  {
    q: "¿Pueden mantener un sitio web que no fue creado por SYNEXA?",
    a: "Podemos evaluar sitios desarrollados por otros proveedores, revisando previamente su tecnología, accesos, estado y necesidades.",
  },
  {
    q: "¿El mantenimiento incluye agregar nuevas funcionalidades?",
    a: "No necesariamente. Las nuevas funcionalidades y modificaciones mayores pueden requerir una cotización independiente.",
  },
  {
    q: "¿El hosting y dominio están incluidos?",
    a: "Depende de la propuesta contratada. Estos conceptos se especifican por separado o como parte del alcance comercial.",
  },
];

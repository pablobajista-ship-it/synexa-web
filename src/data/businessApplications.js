/**
 * ===========================================================================
 * SYNEXA — Aplicaciones para Negocios
 * ===========================================================================
 *
 * Fuente de verdad de /aplicaciones-para-negocios.
 *
 * ⚠️ IMPORTANTE (mensaje comercial)
 * Todo lo que hay aquí describe soluciones que SYNEXA *puede desarrollar*.
 * Nada de esto es un producto terminado a la venta. La interfaz refuerza ese
 * encuadre ("Ejemplo de solución que podemos desarrollar", "Posibles módulos").
 * No agregar nombres de producto ni afirmaciones de disponibilidad.
 *
 * ---------------------------------------------------------------------------
 * Páginas por industria (futuro)
 * ---------------------------------------------------------------------------
 * Cada aplicación ya lleva un `slug` pensado para
 * /aplicaciones-para-negocios/<slug>. Mientras `detailAvailable` sea false,
 * la tarjeta enlaza al formulario de contacto en lugar de a una ruta que
 * todavía no existe. Cuando crees la página, pon `detailAvailable: true` y el
 * enlace apuntará solo a ella: no hay que tocar ningún componente.
 *
 * ---------------------------------------------------------------------------
 * Precios
 * ---------------------------------------------------------------------------
 * Esta página NO define precios propios: los de referencia se derivan del
 * catálogo de /servicios-y-precios (src/data/servicesPricing.js), que es la
 * única fuente de verdad comercial. Así un cambio de precio se hace en un
 * solo lugar y las dos páginas no se pueden desincronizar.
 */
import {
  getServiceById,
  getLaunchPeriod,
  TAX_LABEL,
} from "@/data/servicesPricing";

/** §9 — Las tres familias de aplicaciones. */
export const APP_CATEGORIES = [
  {
    id: "atencion-clientes",
    name: "Atención y Clientes",
    tagline:
      "Negocios que atienden personas: agenda, fichas e historial en un mismo lugar.",
    icon: "users",
  },
  {
    id: "operaciones",
    name: "Operaciones y Servicios",
    tagline:
      "Trabajo que avanza por etapas: órdenes, técnicos, terreno y estados.",
    icon: "wrench",
  },
  {
    id: "gestion",
    name: "Gestión Empresarial",
    tagline:
      "Procesos internos, documentos y comunicación con clientes, ordenados.",
    icon: "layers",
  },
];

/**
 * §8 — Módulos reutilizables. No son obligatorios: cada sistema combina los
 * que el negocio necesite.
 */
export const APP_MODULES = [
  { label: "Clientes", icon: "users" },
  { label: "Agenda", icon: "calendar" },
  { label: "Fichas", icon: "file" },
  { label: "Usuarios", icon: "users" },
  { label: "Roles", icon: "lock" },
  { label: "Documentos", icon: "file" },
  { label: "Reservas", icon: "calendar" },
  { label: "Cotizaciones", icon: "clipboard" },
  { label: "Pagos", icon: "card" },
  { label: "Órdenes de trabajo", icon: "clipboard" },
  { label: "Notificaciones", icon: "bell" },
  { label: "Reportes", icon: "chart" },
  { label: "Panel administrativo", icon: "grid" },
  { label: "Historial", icon: "clock" },
  { label: "Archivos", icon: "folder" },
  { label: "Integraciones", icon: "link" },
];

/** §7 — De los procesos manuales a una solución digital. */
export const MANUAL_TO_DIGITAL = {
  before: ["Planillas", "Correos", "Documentos", "Mensajes", "Procesos manuales"],
  after: [
    "Información centralizada",
    "Procesos organizados",
    "Acceso seguro",
    "Seguimiento",
    "Reportes",
  ],
};

/**
 * ---------------------------------------------------------------------------
 * Ejemplos de aplicaciones
 * ---------------------------------------------------------------------------
 * {
 *   id, slug, category, title, subtitle, shortDescription,
 *   icon      — clave de appIcons.js,
 *   modules   — string[]  "Posibles módulos"
 *   flow      — string[]  etapas, si el negocio trabaja por estados
 *   flowLabel — título del flujo
 *   examples  — string[]  tipos de negocio a los que aplica
 *   note      — aclaración discreta bajo el contenido
 *   featured  — destaca la tarjeta
 *   detailAvailable — ver comentario de cabecera
 * }
 */
export const BUSINESS_APPLICATIONS = [
  {
    id: "veterinarias",
    slug: "veterinarias",
    category: "atencion-clientes",
    title: "Veterinarias",
    subtitle: "Gestión de clientes, mascotas y atención veterinaria.",
    shortDescription:
      "Una solución puede centralizar la información de propietarios y mascotas, historial de atención, vacunas, citas y documentos dentro de una misma plataforma.",
    icon: "paw",
    modules: [
      "Clientes",
      "Mascotas",
      "Fichas",
      "Controles",
      "Vacunas",
      "Agenda",
      "Documentos",
      "Archivos",
      "Historial",
      "Recordatorios",
      "Panel administrativo",
    ],
    flow: null,
    flowLabel: null,
    examples: [],
    note: null,
    featured: true,
    detailAvailable: false,
  },
  {
    id: "clinicas",
    slug: "clinicas",
    category: "atencion-clientes",
    title: "Clínicas y centros profesionales",
    subtitle: "Pacientes, agenda, tratamientos y seguimiento.",
    shortDescription:
      "Aplicaciones para gestionar pacientes o clientes, agenda, fichas, tratamientos, documentos y seguimiento.",
    icon: "pulse",
    modules: [
      "Pacientes / clientes",
      "Ficha",
      "Agenda",
      "Profesionales",
      "Tratamientos",
      "Presupuestos",
      "Documentos",
      "Archivos",
      "Pagos",
      "Historial",
    ],
    flow: null,
    flowLabel: null,
    examples: [],
    note: "Los proyectos que gestionen información sensible requieren medidas de seguridad y privacidad acordes al uso de la solución.",
    featured: false,
    detailAvailable: false,
  },
  {
    id: "reservas",
    slug: "reservas",
    category: "atencion-clientes",
    title: "Reservas y agendamiento",
    subtitle: "Horarios, disponibilidad y confirmaciones automáticas.",
    shortDescription:
      "Para negocios cuyo día se organiza en torno a una agenda: quién atiende, a qué hora y con qué servicio.",
    icon: "calendar",
    modules: [
      "Clientes",
      "Profesionales",
      "Servicios",
      "Horarios",
      "Disponibilidad",
      "Reservas",
      "Confirmaciones",
      "Cancelaciones",
      "Historial",
      "Recordatorios",
    ],
    flow: null,
    flowLabel: null,
    examples: [
      "Peluquerías",
      "Barberías",
      "Estética",
      "Consultas profesionales",
      "Servicios",
      "Academias",
      "Centros de atención",
    ],
    note: null,
    featured: false,
    detailAvailable: false,
  },
  {
    id: "talleres",
    slug: "talleres",
    category: "operaciones",
    title: "Talleres y servicios técnicos",
    subtitle: "Del ingreso a la entrega, con el estado siempre visible.",
    shortDescription:
      "Cada equipo o vehículo avanza por etapas. La aplicación deja registro de diagnósticos, presupuestos, repuestos y fotografías en cada paso.",
    icon: "wrench",
    modules: [
      "Clientes",
      "Vehículos o equipos",
      "Órdenes de trabajo",
      "Diagnósticos",
      "Presupuestos",
      "Repuestos",
      "Fotografías",
      "Estados",
      "Historial",
      "Entrega",
    ],
    flow: [
      "Recibido",
      "Diagnóstico",
      "Presupuesto",
      "Aprobación",
      "Trabajo",
      "Listo",
      "Entregado",
    ],
    flowLabel: "Flujo de una orden de trabajo",
    examples: [],
    featured: true,
    note: null,
    detailAvailable: false,
  },
  {
    id: "mantencion",
    slug: "mantencion",
    category: "operaciones",
    title: "Empresas de mantención y servicios en terreno",
    subtitle: "Visitas, checklists y reportes desde el lugar de trabajo.",
    shortDescription:
      "Ideal para empresas que realizan servicios técnicos, instalaciones, mantenciones o visitas en terreno.",
    icon: "route",
    modules: [
      "Clientes",
      "Instalaciones",
      "Equipos",
      "Técnicos",
      "Visitas",
      "Órdenes de servicio",
      "Checklist",
      "Fotografías",
      "Documentos",
      "Reportes",
      "Estados",
    ],
    flow: null,
    flowLabel: null,
    examples: [],
    note: null,
    featured: false,
    detailAvailable: false,
  },
  {
    id: "cotizaciones",
    slug: "cotizaciones",
    category: "gestion",
    title: "Cotizaciones y gestión comercial",
    subtitle: "Del borrador al documento enviado, con seguimiento.",
    shortDescription:
      "Arma cotizaciones con tus productos, precios y descuentos, genera el documento y sigue en qué estado está cada una.",
    icon: "clipboard",
    modules: [
      "Clientes",
      "Productos",
      "Servicios",
      "Precios",
      "Descuentos",
      "IVA",
      "Cotizaciones",
      "Documentos PDF",
      "Estados",
      "Seguimiento",
    ],
    flow: ["Borrador", "Enviada", "Aceptada", "Rechazada"],
    flowLabel: "Estados de una cotización",
    examples: [],
    note: "Más adelante, una cotización aceptada puede convertirse en un proyecto u orden de trabajo dentro del mismo sistema.",
    featured: false,
    detailAvailable: false,
  },
  {
    id: "portal-clientes",
    slug: "portal-clientes",
    category: "gestion",
    title: "Portal de clientes",
    subtitle: "Un espacio privado para cada cliente.",
    shortDescription:
      "Permite que cada cliente acceda de manera privada a información relacionada con los servicios que mantiene con la empresa.",
    icon: "lock",
    modules: [
      "Login",
      "Perfil",
      "Documentos",
      "Solicitudes",
      "Proyectos",
      "Tickets",
      "Archivos",
      "Comunicaciones",
      "Historial",
      "Estados",
    ],
    flow: null,
    flowLabel: null,
    examples: [],
    note: null,
    featured: false,
    detailAvailable: false,
  },
  {
    id: "gestion-interna",
    slug: "gestion-interna",
    category: "gestion",
    title: "Sistemas internos de gestión",
    subtitle: "Los procesos propios de tu empresa, ordenados.",
    shortDescription:
      "Aplicaciones diseñadas para organizar procesos propios de cada empresa.",
    icon: "grid",
    modules: [
      "Solicitudes internas",
      "Aprobación de procesos",
      "Gestión documental",
      "Inventario",
      "Tareas",
      "Proyectos",
      "Seguimiento",
      "Reportes",
      "Bases de datos",
      "Usuarios y permisos",
    ],
    flow: null,
    flowLabel: null,
    examples: [],
    note: null,
    featured: false,
    detailAvailable: false,
  },
];

/** §19 — Proceso adaptado a aplicaciones empresariales. */
export const APP_PROCESS_STEPS = [
  {
    n: "01",
    title: "Analizamos",
    text: "Entendemos cómo funciona actualmente el negocio y qué problema queremos resolver.",
    image: "/images/proceso/01-analizamos.webp",
  },
  {
    n: "02",
    title: "Diseñamos",
    text: "Definimos procesos, usuarios, módulos y experiencia de uso.",
    image: "/images/proceso/02-disenamos.webp",
  },
  {
    n: "03",
    title: "Desarrollamos",
    text: "Construimos la aplicación y base de datos.",
    image: "/images/proceso/03-desarrollamos.webp",
  },
  {
    n: "04",
    title: "Implementamos",
    text: "Probamos, configuramos y ponemos la solución en funcionamiento.",
    image: "/images/proceso/04-implementamos.webp",
  },
  {
    n: "05",
    title: "Acompañamos",
    text: "Realizamos puesta en marcha, soporte y evolución posterior.",
    image: "/images/proceso/05-acompanamos.webp",
  },
];

/** §20 — Mockup conceptual del panel. */
export const MOCKUP = {
  label: "Ejemplo conceptual",
  sidebar: ["Dashboard", "Clientes", "Agenda", "Documentos", "Reportes", "Configuración"],
  metrics: [
    { label: "Clientes activos", hint: "Total en el sistema" },
    { label: "Solicitudes", hint: "Pendientes de revisión" },
    { label: "Próximas citas", hint: "Agenda de la semana" },
  ],
  activityTitle: "Actividad reciente",
  activityRows: [
    "Ficha actualizada",
    "Nueva solicitud recibida",
    "Documento cargado",
    "Cita confirmada",
  ],
};

/** §21 — Usuarios y roles. */
export const APP_ROLES = {
  title: "Cada usuario ve solo lo que necesita",
  text: "Una aplicación puede tener distintos tipos de acceso. Cada usuario accede solamente a las funciones e información que necesita.",
  roles: [
    { name: "Administrador", hint: "Configura y ve todo el sistema" },
    { name: "Empleado", hint: "Trabaja sobre su área" },
    { name: "Profesional", hint: "Agenda y fichas propias" },
    { name: "Técnico", hint: "Órdenes y visitas asignadas" },
    { name: "Cliente", hint: "Su información y solicitudes" },
  ],
};

/** §22 — Acceso desde cualquier dispositivo. */
export const APP_DEVICES = {
  title: "Se usa desde donde trabajas",
  text: "Las aplicaciones web pueden diseñarse para utilizarse desde computadores, tablets y teléfonos mediante navegador.",
  devices: [
    { name: "Desktop", icon: "monitor", hint: "Oficina y administración" },
    { name: "Tablet", icon: "tablet", hint: "Mostrador y atención" },
    { name: "Móvil", icon: "phone", hint: "Terreno y visitas" },
  ],
};

/** §23 — Integraciones. */
export const APP_INTEGRATIONS = {
  title: "Conecta tus herramientas",
  text: "Las integraciones disponibles dependerán de cada proyecto y de las plataformas involucradas.",
  items: [
    { label: "Correo", icon: "mail" },
    { label: "Google Calendar", icon: "calendar" },
    { label: "Sistemas de pago", icon: "card" },
    { label: "APIs", icon: "link" },
    { label: "Formularios", icon: "clipboard" },
    { label: "Analytics", icon: "chart" },
    { label: "Almacenamiento de archivos", icon: "folder" },
    { label: "Servicios externos", icon: "layers" },
  ],
};

/** §24 — Seguridad. */
export const APP_SECURITY = {
  title: "Seguridad desde el diseño",
  text: "La seguridad no se agrega al final: se decide junto con los procesos, los roles y el tipo de información que administra cada sistema.",
  items: [
    "Autenticación",
    "Roles",
    "Permisos",
    "Validación",
    "Respaldo",
    "Acceso seguro",
    "Protección de información",
  ],
};

/**
 * §25 — Referencias de precio.
 *
 * Cada nivel apunta a un servicio del catálogo mediante `serviceId`: el
 * importe, el prefijo ("Desde") y la etiqueta de impuesto salen de allí.
 * Aquí solo vive el texto propio de esta página.
 *
 * Para cambiar un valor se edita el servicio en src/data/servicesPricing.js.
 */
const APP_PRICING_TIERS = [
  {
    // El nivel de entrada toma su precio de "Portal de Clientes": es el
    // servicio del catálogo que mejor representa una aplicación de gestión
    // inicial. Mapeo revisado y confirmado — no cambiar sin acordarlo.
    id: "aplicaciones-negocios",
    serviceId: "portal-de-clientes",
    name: "Aplicaciones para negocios",
    text: "Para aplicaciones iniciales de gestión con funcionalidades acotadas.",
    featured: false,
  },
  {
    id: "sistemas-medida",
    serviceId: "sistema-web-a-medida",
    name: "Sistemas a medida",
    text: "Para plataformas con mayor personalización, procesos, roles o integraciones.",
    featured: true,
  },
];

/** Toma de un servicio del catálogo lo que necesita una tarjeta de precio. */
function resolveTier(tier) {
  const service = getServiceById(tier.serviceId);

  return {
    ...tier,
    price: service?.price ?? null,
    pricePrefix: service?.pricePrefix ?? "Desde",
    taxLabel: service?.taxLabel ?? TAX_LABEL,
  };
}

/**
 * El período de referencia para sistemas también sale del catálogo, para que
 * no haya un "60 días" escrito a mano que se desincronice.
 */
const SYSTEMS_LAUNCH_PERIOD = getLaunchPeriod(
  getServiceById("sistema-web-a-medida")
);

export const APP_PRICING = {
  title: "¿Cuánto cuesta desarrollar una aplicación?",
  text: "El valor depende de los módulos, cantidad de usuarios, integraciones y complejidad del proyecto.",
  tiers: APP_PRICING_TIERS.map(resolveTier),
  disclaimer:
    "Los valores son precios iniciales de referencia: cada aplicación se cotiza según su alcance real.",
  launchNote: `Las aplicaciones incluyen un período de puesta en marcha para verificar la correcta operación de las funcionalidades acordadas. Para sistemas, portales y aplicaciones complejas la referencia es de ${
    SYSTEMS_LAUNCH_PERIOD?.label ?? "60 días"
  }.`,
};

// ---------------------------------------------------------------------------
// Accesores — única API que consumen los componentes.
// ---------------------------------------------------------------------------

export function getAppCategories() {
  return APP_CATEGORIES;
}

export function getApplicationsByCategory(categoryId) {
  return BUSINESS_APPLICATIONS.filter((app) => app.category === categoryId);
}

/**
 * Destino del CTA de una aplicación: su página por industria cuando exista,
 * y el formulario de contacto mientras no exista.
 */
export function getApplicationHref(app) {
  return app.detailAvailable ? `/aplicaciones-para-negocios/${app.slug}` : "#contacto";
}

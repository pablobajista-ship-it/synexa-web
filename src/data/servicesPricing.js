/**
 * ===========================================================================
 * SYNEXA — Catálogo de servicios y precios
 * ===========================================================================
 *
 * ÚNICA fuente de verdad de /servicios-y-precios. Ningún precio ni texto
 * comercial vive dentro de los componentes visuales: para cambiar un valor
 * basta con editar este archivo.
 *
 * Los importes son números en pesos chilenos, NETOS (sin IVA). La interfaz
 * agrega "+ IVA" a partir de `taxLabel`.
 *
 * ---------------------------------------------------------------------------
 * Preparado para un futuro panel administrativo
 * ---------------------------------------------------------------------------
 * Los componentes solo consumen las funciones `getServiceGroups()`,
 * `getServicesByGroup()` y `getLaunchPeriods()`. El día que los precios
 * vengan de la base de datos, basta con que esas funciones lean de la BD
 * (o se conviertan en async) sin tocar la interfaz.
 */

export const CURRENCY = "CLP";
export const TAX_LABEL = "+ IVA";

/** Etiqueta que se muestra cuando un servicio no tiene precio de referencia. */
export const CUSTOM_QUOTE_LABEL = "Cotización personalizada";

/**
 * Grupos de navegación interna. `image` reutiliza los íconos 3D corporativos
 * que ya existen en /public/images/servicios — no se crearon íconos nuevos.
 */
export const SERVICE_GROUPS = [
  {
    id: "presencia-digital",
    name: "Presencia Digital",
    tagline: "Tu negocio, presentado con claridad y profesionalismo.",
    highlights: ["Landing Pages", "Sitios Web", "Catálogos Digitales"],
    image: "/images/servicios/01-sitios-web.webp",
  },
  {
    id: "comercio-procesos",
    name: "Comercio y Procesos",
    tagline: "Vender, agendar y atender desde una sola plataforma.",
    highlights: ["E-commerce", "Reservas", "Portales"],
    image: "/images/servicios/03-ecommerce.webp",
  },
  {
    id: "sistemas-plataformas",
    name: "Sistemas y Plataformas",
    tagline: "Datos, procesos y sistemas conectados a la medida.",
    highlights: [
      "Bases de Datos",
      "Sistemas Empresariales",
      "Integraciones",
      "Desarrollo a Medida",
    ],
    image: "/images/servicios/04-portales-plataformas.webp",
  },
];

/**
 * Períodos de puesta en marcha (§14). `id` se referencia desde cada servicio.
 */
export const LAUNCH_PERIODS = {
  simple: { id: "simple", days: 30, label: "30 días", scope: "Landing Pages y sitios simples" },
  corporativo: {
    id: "corporativo",
    days: 45,
    label: "45 días",
    scope: "Sitios corporativos y E-commerce",
  },
  sistemas: {
    id: "sistemas",
    days: 60,
    label: "60 días",
    scope: "Portales, bases de datos y sistemas a medida",
  },
};

/**
 * ---------------------------------------------------------------------------
 * Servicios
 * ---------------------------------------------------------------------------
 * {
 *   id, group, name, icon (clave de SERVICE_ICONS), shortDescription,
 *   price            número neto en CLP, o null si solo hay cotización,
 *   pricePrefix      "Desde" | null,
 *   taxLabel         "+ IVA",
 *   billingType      "proyecto" | "mensual" | "hora",
 *   features         string[] — lo que puede incluir,
 *   featuresNote     aclaración bajo las features,
 *   launchPeriod     clave de LAUNCH_PERIODS,
 *   featured         destaca la tarjeta,
 *   customQuote      true ⇒ además del "Desde", enfatiza cotización a medida,
 *   cta              { label, href }
 * }
 */
export const SERVICES = [
  // ------------------------------- Presencia Digital
  {
    id: "landing-page-profesional",
    group: "presencia-digital",
    name: "Landing Page Profesional",
    icon: "layout",
    shortDescription:
      "Página enfocada en presentar un producto, servicio, campaña o negocio de manera clara y orientada a conversión.",
    price: 349000,
    pricePrefix: "Desde",
    taxLabel: TAX_LABEL,
    billingType: "proyecto",
    features: [
      "Diseño responsive",
      "Identidad visual aplicada",
      "Formulario de contacto",
      "Optimización básica",
      "SEO técnico inicial",
      "Integración básica con Analytics cuando corresponda",
      "Publicación",
      "Período de puesta en marcha",
    ],
    featuresNote: null,
    launchPeriod: "simple",
    featured: false,
    customQuote: false,
    cta: { label: "Solicitar cotización", href: "#contacto" },
  },
  {
    id: "sitio-web-pyme",
    group: "presencia-digital",
    name: "Sitio Web PYME",
    icon: "layers",
    shortDescription:
      "Sitio web profesional de aproximadamente 4 a 6 páginas o secciones principales.",
    price: 649000,
    pricePrefix: "Desde",
    taxLabel: TAX_LABEL,
    billingType: "proyecto",
    features: [
      "Inicio",
      "Empresa",
      "Servicios",
      "Galería o proyectos",
      "Contacto",
      "Formularios",
      "Responsive",
      "SEO inicial",
      "Analytics",
      "Publicación",
    ],
    featuresNote: null,
    launchPeriod: "simple",
    featured: false,
    customQuote: false,
    cta: { label: "Solicitar cotización", href: "#contacto" },
  },
  {
    id: "sitio-web-corporativo",
    group: "presencia-digital",
    name: "Sitio Web Corporativo",
    icon: "layout",
    shortDescription:
      "Sitio profesional más completo para empresas, de aproximadamente 6 a 10 páginas o secciones.",
    price: 949000,
    pricePrefix: "Desde",
    taxLabel: TAX_LABEL,
    billingType: "proyecto",
    features: [
      "Diseño personalizado",
      "Múltiples servicios",
      "Formularios",
      "Secciones corporativas",
      "Integración básica",
      "SEO técnico inicial",
      "Analytics",
      "Optimización",
      "Publicación",
    ],
    featuresNote: null,
    launchPeriod: "corporativo",
    featured: true,
    customQuote: false,
    cta: { label: "Solicitar cotización", href: "#contacto" },
  },
  {
    id: "sitio-corporativo-avanzado",
    group: "presencia-digital",
    name: "Sitio Corporativo Avanzado",
    icon: "sliders",
    shortDescription:
      "Para empresas que requieren mayor contenido, integraciones o funcionalidades.",
    price: 1290000,
    pricePrefix: "Desde",
    taxLabel: TAX_LABEL,
    billingType: "proyecto",
    features: [],
    featuresNote:
      "El alcance se define según el contenido, las integraciones y las funcionalidades que necesite tu empresa.",
    launchPeriod: "corporativo",
    featured: false,
    customQuote: true,
    cta: { label: "Solicitar cotización", href: "#contacto" },
  },
  {
    id: "catalogo-digital",
    group: "presencia-digital",
    name: "Catálogo Digital / Portal de Promociones",
    icon: "tag",
    shortDescription:
      "Productos o servicios mostrados mediante catálogo, sin proceso completo de checkout.",
    price: 749000,
    pricePrefix: "Desde",
    taxLabel: TAX_LABEL,
    billingType: "proyecto",
    features: [],
    featuresNote:
      "El alcance depende del volumen de productos o promociones y de cómo se administren.",
    launchPeriod: "corporativo",
    featured: false,
    customQuote: false,
    cta: { label: "Solicitar cotización", href: "#contacto" },
  },
  {
    id: "rediseno-modernizacion",
    group: "presencia-digital",
    name: "Rediseño / Modernización Web",
    icon: "settings",
    shortDescription:
      "Modernización visual, responsive, estructura, rendimiento o tecnología de un sitio existente.",
    price: 490000,
    pricePrefix: "Desde",
    taxLabel: TAX_LABEL,
    billingType: "proyecto",
    features: [],
    featuresNote:
      "El alcance se define tras revisar el sitio actual, su tecnología y el estado de su contenido.",
    launchPeriod: "simple",
    featured: false,
    customQuote: false,
    cta: { label: "Solicitar cotización", href: "#contacto" },
  },

  // ------------------------------- Comercio y Procesos
  {
    id: "ecommerce-inicial",
    group: "comercio-procesos",
    name: "E-commerce Inicial",
    icon: "cart",
    shortDescription:
      "Tienda online lista para vender, desde el catálogo de productos hasta el pago.",
    price: 990000,
    pricePrefix: "Desde",
    taxLabel: TAX_LABEL,
    billingType: "proyecto",
    features: [
      "Catálogo de productos",
      "Carrito",
      "Checkout",
      "Integración con medio de pago",
      "Administración básica",
      "Responsive",
      "Configuración inicial",
    ],
    featuresNote: null,
    launchPeriod: "corporativo",
    featured: true,
    customQuote: false,
    cta: { label: "Solicitar cotización", href: "#contacto" },
  },
  {
    id: "ecommerce-profesional",
    group: "comercio-procesos",
    name: "E-commerce Profesional",
    icon: "cart",
    shortDescription:
      "Tiendas con mayor personalización, productos, integraciones y funcionalidades.",
    price: 1490000,
    pricePrefix: "Desde",
    taxLabel: TAX_LABEL,
    billingType: "proyecto",
    features: [],
    featuresNote:
      "El alcance se define según el volumen de productos, las integraciones y el nivel de personalización.",
    launchPeriod: "corporativo",
    featured: false,
    customQuote: true,
    cta: { label: "Solicitar cotización", href: "#contacto" },
  },
  {
    id: "sistema-reservas",
    group: "comercio-procesos",
    name: "Sistema de Reservas / Agendamiento",
    icon: "calendar",
    shortDescription:
      "Automatiza horas, agenda y disponibilidad con un panel para administrarlo.",
    price: 890000,
    pricePrefix: "Desde",
    taxLabel: TAX_LABEL,
    billingType: "proyecto",
    features: [
      "Disponibilidad",
      "Agenda",
      "Formularios",
      "Panel de administración",
      "Confirmaciones",
      "Gestión básica",
    ],
    featuresNote: null,
    launchPeriod: "sistemas",
    featured: false,
    customQuote: false,
    cta: { label: "Solicitar cotización", href: "#contacto" },
  },
  {
    id: "portal-de-clientes",
    group: "comercio-procesos",
    name: "Portal de Clientes",
    icon: "users",
    shortDescription:
      "Centraliza documentos, solicitudes y comunicación con tus clientes en un espacio privado.",
    price: 1490000,
    pricePrefix: "Desde",
    taxLabel: TAX_LABEL,
    billingType: "proyecto",
    features: [
      "Login",
      "Perfiles",
      "Documentos",
      "Solicitudes",
      "Historial",
      "Comunicación",
      "Panel de administración",
    ],
    featuresNote: null,
    launchPeriod: "sistemas",
    featured: false,
    customQuote: true,
    cta: { label: "Solicitar cotización", href: "#contacto" },
  },

  // ------------------------------- Sistemas y Plataformas
  {
    id: "base-de-datos-panel",
    group: "sistemas-plataformas",
    name: "Base de Datos + Panel Web",
    icon: "database",
    shortDescription:
      "Ordena tu información y consúltala desde un panel web, sin depender de archivos sueltos.",
    price: 1290000,
    pricePrefix: "Desde",
    taxLabel: TAX_LABEL,
    billingType: "proyecto",
    features: [
      "Base de datos",
      "Formularios",
      "Consultas",
      "Búsqueda",
      "Edición de registros",
      "Panel de administración",
    ],
    featuresNote: null,
    launchPeriod: "sistemas",
    featured: false,
    customQuote: true,
    cta: { label: "Solicitar cotización", href: "#contacto" },
  },
  {
    id: "plataforma-empresarial",
    group: "sistemas-plataformas",
    name: "Portal / Plataforma Empresarial",
    icon: "layers",
    shortDescription:
      "Usuarios, roles y módulos para digitalizar los procesos internos de tu empresa.",
    price: 1990000,
    pricePrefix: "Desde",
    taxLabel: TAX_LABEL,
    billingType: "proyecto",
    features: [
      "Usuarios",
      "Roles",
      "Módulos",
      "Procesos",
      "Panel administrativo",
      "Reportes básicos",
    ],
    featuresNote: null,
    launchPeriod: "sistemas",
    featured: false,
    customQuote: true,
    cta: { label: "Solicitar cotización", href: "#contacto" },
  },
  {
    id: "integracion-api",
    group: "sistemas-plataformas",
    name: "Integración API / Sistemas Externos",
    icon: "link",
    shortDescription:
      "Conecta los sistemas que ya usas para que trabajen con tu plataforma.",
    price: 390000,
    pricePrefix: "Desde",
    taxLabel: TAX_LABEL,
    billingType: "proyecto",
    features: [],
    featuresNote:
      "El precio dependerá de la API, su documentación, los permisos, la complejidad y los servicios externos involucrados.",
    launchPeriod: "sistemas",
    featured: false,
    customQuote: true,
    cta: { label: "Solicitar cotización", href: "#contacto" },
  },
  {
    id: "sistema-web-a-medida",
    group: "sistemas-plataformas",
    name: "Sistema Web a Medida / MVP",
    icon: "spark",
    shortDescription:
      "Sistemas diseñados según las necesidades específicas de cada empresa.",
    price: 2490000,
    pricePrefix: "Desde",
    taxLabel: TAX_LABEL,
    billingType: "proyecto",
    features: [],
    featuresNote:
      "Cada sistema se define a partir de tus procesos, usuarios y objetivos. El valor final se entrega en una propuesta a medida.",
    launchPeriod: "sistemas",
    featured: true,
    customQuote: true,
    cta: { label: "Solicitar cotización", href: "#contacto" },
  },
];

/**
 * §12 — Qué incluye todo proyecto SYNEXA.
 * `conditional: true` ⇒ se muestra con la nota "cuando corresponda".
 */
export const PROJECT_INCLUDES = [
  { label: "Diseño responsive", conditional: false },
  { label: "Aplicación de identidad visual", conditional: false },
  { label: "Desarrollo", conditional: false },
  { label: "Pruebas", conditional: false },
  { label: "Optimización básica", conditional: false },
  { label: "Formularios", conditional: true },
  { label: "SEO técnico inicial", conditional: false },
  { label: "Publicación", conditional: false },
  { label: "Capacitación básica", conditional: true },
  { label: "Período de puesta en marcha", conditional: false },
  { label: "Soporte inicial", conditional: false },
];

/** §13 — Costos de terceros. */
export const EXTERNAL_COSTS_NOTE =
  "Los servicios de terceros como dominio, hosting, licencias, plataformas de pago, API externas, servicios de correo y otras herramientas pueden tener costos independientes. Estos valores se informarán antes de comenzar el proyecto cuando correspondan.";

/** §15 / §16 / §17 — Puesta en marcha. */
export const LAUNCH_COVERAGE = {
  covered: [
    "Corrección de errores relacionados con lo contratado",
    "Problemas de visualización",
    "Errores en formularios",
    "Problemas en funcionalidades desarrolladas",
    "Ajustes menores de textos",
    "Reemplazo de imágenes",
    "Corrección de enlaces",
    "Pequeños ajustes visuales",
    "Apoyo inicial de uso",
    "Ajustes necesarios para que el proyecto funcione como fue originalmente acordado",
  ],
  notCovered: [
    "Nuevas funcionalidades",
    "Nuevos módulos",
    "Rediseño completo",
    "Nuevas integraciones",
    "Cambios importantes en procesos",
    "Nuevas automatizaciones",
    "Ampliación sustancial del proyecto",
    "Funcionalidades no contempladas originalmente",
  ],
  notCoveredNote:
    "La garantía cubre la correcta operación de las funcionalidades y alcance acordados originalmente. Nuevas funcionalidades o cambios de alcance se cotizan por separado.",
  minorChangesNote:
    "Durante la puesta en marcha se incluyen los ajustes menores necesarios para completar correctamente la implementación acordada.",
  minorChangesExamples: [
    "Modificar textos",
    "Reemplazar imágenes",
    "Cambiar teléfonos",
    "Corregir enlaces",
    "Pequeños ajustes de posición",
    "Pequeños cambios de color",
    "Ajustes simples de contenido",
  ],
};

/** §25 — Esquema de referencia para el cobro de proyectos. */
export const PAYMENT_SCHEMES = [
  {
    id: "pequenos",
    title: "Proyectos pequeños",
    milestones: [
      { pct: "50%", label: "Al comenzar" },
      { pct: "50%", label: "Antes de publicación" },
    ],
  },
  {
    id: "corporativos",
    title: "Proyectos corporativos",
    milestones: [
      { pct: "50%", label: "Inicio" },
      { pct: "30%", label: "Aprobación del desarrollo" },
      { pct: "20%", label: "Publicación" },
    ],
  },
  {
    id: "mayores",
    title: "Sistemas mayores",
    milestones: [
      { pct: "30%", label: "Inicio" },
      { pct: "30%", label: "Primer hito" },
      { pct: "30%", label: "Versión final" },
      { pct: "10%", label: "Puesta en producción" },
    ],
  },
];

export const PAYMENT_NOTE =
  "Las condiciones definitivas se especifican en cada propuesta comercial.";

/** §27 — FAQ. */
export const PRICING_FAQ = [
  {
    q: "¿Todos los proyectos tienen el mismo precio?",
    a: "No. Los valores publicados son referencias iniciales. El precio definitivo dependerá del alcance, funcionalidades, integraciones y nivel de personalización.",
  },
  {
    q: "¿Los precios incluyen IVA?",
    a: "No. Todos los valores indicados en esta página son netos: se muestran como “+ IVA” y el impuesto se agrega en la propuesta comercial.",
  },
  {
    q: "¿El dominio y hosting están incluidos?",
    a: "Los servicios externos como dominio, hosting, licencias, plataformas de pago o API de terceros se cotizan o informan por separado cuando corresponda.",
  },
  {
    q: "¿Qué ocurre después de entregar el proyecto?",
    a: "Todos los proyectos incluyen un período de puesta en marcha de 30, 45 o 60 días según el tipo de solución, para comprobar que funcione de acuerdo con lo originalmente acordado.",
  },
  {
    q: "¿Qué ocurre si necesito cambios después?",
    a: "Puedes contratar soporte puntual por hora o uno de los planes de Continuidad y Soporte SYNEXA.",
  },
  {
    q: "¿Puedo pedir algo que no aparece en los servicios?",
    a: "Sí. SYNEXA también desarrolla soluciones completamente personalizadas según las necesidades de cada empresa.",
  },
  {
    q: "¿Puedo combinar varios servicios?",
    a: "Sí. Se puede diseñar una solución que integre diferentes servicios y tecnologías dentro de un mismo proyecto.",
  },
  // --- Infraestructura y servicios externos ---
  {
    q: "¿El precio del desarrollo incluye dominio?",
    a: "No necesariamente. El dominio corresponde a un servicio externo y su costo de inscripción y renovación se informa por separado, salvo que la propuesta indique lo contrario.",
  },
  {
    q: "¿El alojamiento está incluido?",
    a: "Depende del proyecto y de la modalidad contratada. Puedes pagar directamente la infraestructura utilizada o contratar administración de infraestructura con SYNEXA.",
  },
  {
    q: "¿El dominio será mío?",
    a: "Sí. Siempre que sea técnicamente posible, el dominio se registra a nombre del cliente o de su empresa.",
  },
  {
    q: "¿Puedo utilizar mi propio hosting?",
    a: "Sí, siempre que sea compatible con los requisitos técnicos del proyecto.",
  },
  {
    q: "¿Por qué una aplicación puede tener costos mensuales?",
    a: "Las aplicaciones pueden utilizar infraestructura, bases de datos, almacenamiento, correo u otros servicios que generan costos recurrentes.",
  },
  {
    q: "¿SYNEXA puede administrar todo esto por mí?",
    a: "Sí. Podemos encargarnos de la configuración y administración técnica mediante nuestros servicios de infraestructura administrada.",
  },
];

// ---------------------------------------------------------------------------
// Accesores — única API que consumen los componentes.
// El día que los datos vengan de la base de datos, solo cambian estas funciones.
// ---------------------------------------------------------------------------

export function getServiceGroups() {
  return SERVICE_GROUPS;
}

export function getServicesByGroup(groupId) {
  return SERVICES.filter((service) => service.group === groupId);
}

/**
 * Busca un servicio del catálogo por id.
 *
 * Lo usa src/data/businessApplications.js para derivar de aquí los precios
 * de referencia que muestra /aplicaciones-para-negocios, en vez de repetir
 * los importes. Este archivo sigue siendo la única fuente de verdad.
 */
export function getServiceById(id) {
  return SERVICES.find((service) => service.id === id) ?? null;
}

export function getLaunchPeriod(service) {
  return LAUNCH_PERIODS[service?.launchPeriod] ?? null;
}

export function getLaunchPeriods() {
  return Object.values(LAUNCH_PERIODS);
}

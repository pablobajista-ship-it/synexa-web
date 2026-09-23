/**
 * ===========================================================================
 * SYNEXA — Infraestructura y servicios externos (proveedores de terceros)
 * ===========================================================================
 *
 * ⚠️ REGLA CLAVE
 * Aquí NO se escriben tarifas de proveedores. Los precios de NIC Chile,
 * Vercel, Supabase, Cloudflare y cualquier otro tercero cambian sin aviso y
 * no dependen de SYNEXA. Cada proveedor declara únicamente un
 * `pricingLabel` de texto ("Tarifa vigente del proveedor", "Según plan y
 * consumo"). Si algún día se quiere mostrar una referencia numérica, se
 * agrega aquí como `referenceLabel` y la interfaz la muestra siempre junto a
 * "Valor referencial — consultar tarifa vigente".
 *
 * Los precios PROPIOS de SYNEXA viven en src/data/infrastructurePlans.js.
 *
 * ---------------------------------------------------------------------------
 * Forma de un proveedor
 * ---------------------------------------------------------------------------
 * {
 *   id, provider, category, extension?,
 *   pricingType:     "provider" | "consumption" | "included",
 *   pricingLabel:    texto que se muestra en vez de un precio,
 *   referenceLabel:  referencia opcional, siempre marcada como referencial,
 *   url:             enlace externo (se abre en pestaña nueva),
 *   managedBySynexa: SYNEXA puede encargarse de configurarlo/administrarlo,
 *   role:            para qué se usa, en lenguaje de cliente,
 *   recommendedFor:  cuándo lo sugerimos — nunca "obligatorio"
 * }
 */

/** Los tres tipos de costo de un proyecto (§1 y §40). */
export const COST_MODEL = [
  {
    id: "desarrollo",
    label: "Desarrollo",
    summary: "Lo que SYNEXA construye.",
    text: "El trabajo de diseñar y desarrollar tu sitio, e-commerce, aplicación, portal, sistema, base de datos o integración.",
    billing: "Pago de proyecto",
    icon: "spark",
    tone: "blue",
  },
  {
    id: "infraestructura",
    label: "Infraestructura y servicios externos",
    summary: "Dónde y con qué servicios funciona.",
    text: "Dominio, alojamiento, base de datos, almacenamiento, correo, API o pasarelas de pago. Los prestan empresas externas.",
    billing: "Costo recurrente de terceros",
    icon: "server",
    tone: "teal",
  },
  {
    id: "soporte",
    label: "Continuidad y soporte",
    summary: "Cómo SYNEXA lo acompaña después.",
    text: "Administración, monitoreo, respaldos, mantenimiento, optimización, cambios menores y evolución del proyecto.",
    billing: "Servicio mensual SYNEXA",
    icon: "shield",
    tone: "blue",
  },
];

/** Frase de transparencia, con presencia propia en la página (§30). */
export const TRANSPARENCY_STATEMENT =
  "Antes de comenzar tu proyecto te informaremos qué servicios externos necesitará, cuáles son opcionales y cuáles tienen costos recurrentes.";

/** Los tres pilares de la sección (§3). */
export const INFRA_PILLARS = [
  {
    id: "dominio",
    title: "Dominio",
    text: "La dirección que usarán tus clientes para encontrarte en Internet.",
    icon: "globe",
  },
  {
    id: "alojamiento",
    title: "Alojamiento e infraestructura",
    text: "El servicio que mantiene tu solución disponible y funcionando.",
    icon: "server",
  },
  {
    id: "externos",
    title: "Servicios externos",
    text: "Pagos, correo, almacenamiento o API que tu proyecto pueda necesitar.",
    icon: "link",
  },
];

/** §4 — Dominio. */
export const DOMAIN_INFO = {
  title: "Dominio",
  intro:
    "El dominio es la dirección que utilizarán tus clientes para encontrar tu sitio o plataforma en Internet.",
  examples: ["empresa.cl", "empresa.com"],
  facts: [
    "No está incluido en el precio del desarrollo, salvo que la propuesta indique lo contrario.",
    "Tiene un costo de inscripción.",
    "Tiene un costo de renovación.",
    "Normalmente se renueva cada año.",
  ],
  /** §7 — Política de propiedad. Es el punto más importante del bloque. */
  ownership: {
    title: "El dominio pertenece al cliente.",
    text: "Siempre que sea técnicamente posible, el dominio queda registrado a nombre del cliente o de su empresa. SYNEXA puede encargarse de la parte técnica, pero la propiedad se mantiene contigo.",
    synexaHandles: [
      "Registro",
      "Configuración",
      "DNS",
      "Conexión con el alojamiento",
      "Certificados",
      "Renovaciones",
      "Administración técnica",
    ],
  },
  /** §8 — Servicio opcional, sin precio fijo todavía. */
  managedService: {
    title: "Administración de dominio SYNEXA",
    text: "Si prefieres no ocuparte de la parte técnica, podemos administrarlo por ti.",
    includes: [
      "Configuración DNS",
      "Conexión con servicios web",
      "SSL",
      "Renovación",
      "Cambios técnicos",
      "Soporte",
    ],
    priceLabel: "Valor según el dominio y los servicios asociados",
  },
};

/** §5 y §6 — Registradores. */
export const DOMAIN_PROVIDERS = [
  {
    id: "nic-chile",
    provider: "NIC Chile",
    category: "domain",
    extension: ".cl",
    pricingType: "provider",
    pricingLabel: "Tarifa según valor vigente de NIC Chile",
    referenceLabel: null,
    url: "https://www.nic.cl/",
    managedBySynexa: true,
    role: "Registrador oficial de los dominios .cl",
    recommendedFor: "Dominios .cl",
  },
  {
    id: "cloudflare-registrar",
    provider: "Cloudflare Registrar",
    category: "domain",
    extension: ".com y otras extensiones",
    pricingType: "provider",
    pricingLabel: "El costo depende de la extensión y del registrador seleccionado",
    referenceLabel: null,
    url: "https://www.cloudflare.com/products/registrar/",
    managedBySynexa: true,
    role: "Registro de dominios internacionales",
    recommendedFor: "Dominios .com, o el proveedor que acuerdes con nosotros",
  },
];

/** §10–§13 — Infraestructura y bases de datos. */
export const INFRA_PROVIDERS = [
  {
    id: "vercel",
    provider: "Vercel",
    category: "hosting",
    pricingType: "consumption",
    pricingLabel: "Costo según plan y consumo del proveedor",
    referenceLabel: null,
    url: "https://vercel.com/",
    managedBySynexa: true,
    role: "Publica y mantiene disponible la aplicación",
    recommendedFor: "Proyectos desarrollados con Next.js",
    benefits: [
      "Despliegue de aplicaciones",
      "CDN",
      "HTTPS / SSL",
      "Integración con Git",
      "Escalabilidad",
      "Despliegues automatizados",
    ],
  },
  {
    id: "cloudflare",
    provider: "Cloudflare",
    category: "network",
    pricingType: "provider",
    pricingLabel: "Tarifa vigente del proveedor según el plan",
    referenceLabel: null,
    url: "https://www.cloudflare.com/",
    managedBySynexa: true,
    role: "DNS, protección y distribución de contenido",
    recommendedFor: "Cuando el proyecto lo requiera — no todos lo necesitan",
    benefits: [
      "DNS",
      "Protección",
      "Distribución de contenido",
      "Administración de dominios",
      "Servicios web cuando corresponda",
    ],
  },
  {
    id: "supabase",
    provider: "Supabase",
    category: "database",
    pricingType: "consumption",
    pricingLabel: "Según plan y consumo del proveedor",
    referenceLabel: null,
    url: "https://supabase.com/",
    managedBySynexa: true,
    role: "Base de datos, autenticación y almacenamiento",
    recommendedFor: "Aplicaciones con datos, usuarios o archivos",
    benefits: [],
  },
  {
    id: "postgresql",
    provider: "PostgreSQL u otra infraestructura",
    category: "database",
    pricingType: "consumption",
    pricingLabel: "Según el proveedor y los recursos contratados",
    referenceLabel: null,
    url: null,
    managedBySynexa: true,
    role: "Base de datos administrada en otra plataforma",
    recommendedFor: "Cuando el proyecto o tu empresa requieran otro proveedor",
    benefits: [],
  },
];

/** §14 — Encuadre obligatorio para no presentar proveedores como impuestos. */
export const PROVIDER_DISCLAIMER =
  "Ninguno de estos proveedores es obligatorio. Son las tecnologías que sugerimos según las características de cada proyecto, y siempre pueden reemplazarse por la plataforma que prefieras o que ya utilices.";

/** §13 — Bases de datos, explicado en lenguaje de cliente. */
export const DATABASE_INTRO =
  "Algunas aplicaciones necesitan una base de datos donde almacenar clientes, productos, reservas, documentos, fichas u otra información.";

/** §15 — Diagrama de ejemplo. */
export const INFRA_DIAGRAM = {
  label: "Ejemplo de infraestructura",
  note: "No todos los proyectos usan exactamente esta arquitectura: se define según lo que necesite cada solución.",
  layers: [
    { id: "dominio", label: "Dominio", hint: "tuempresa.cl", icon: "globe" },
    { id: "dns", label: "Cloudflare / DNS", hint: "Rutas y protección", icon: "link" },
    { id: "hosting", label: "Vercel", hint: "Infraestructura web", icon: "server" },
    { id: "app", label: "Aplicación SYNEXA", hint: "Tu solución", icon: "spark", highlight: true },
    { id: "db", label: "Supabase / Base de datos", hint: "Información del negocio", icon: "database" },
  ],
};

/** §16 y §17 — Por qué un sistema necesita más infraestructura que una web. */
export const PROJECT_INFRA_EXAMPLES = [
  {
    id: "sitio-corporativo",
    title: "Sitio web corporativo",
    text: "Un sitio informativo necesita poco: estar publicado y ser seguro.",
    needs: ["Dominio", "Alojamiento", "SSL"],
    note: "No necesariamente necesita base de datos.",
    tone: "light",
  },
  {
    id: "aplicacion-empresarial",
    title: "Aplicación empresarial",
    text: "Un sistema guarda información, envía avisos y se conecta con otras plataformas.",
    needs: [
      "Dominio",
      "Infraestructura web",
      "Base de datos",
      "Almacenamiento",
      "Correo / notificaciones",
      "Servicios externos",
    ],
    note: "Por eso un sistema tiene más costos recurrentes que una página sencilla.",
    tone: "dark",
  },
];

/** §18 — Servicios externos. */
export const EXTERNAL_SERVICES = {
  title: "Servicios externos",
  intro:
    "Algunos proyectos pueden requerir servicios prestados por otras empresas. Cuando un proyecto necesite servicios externos con costo, estos serán informados antes de su implementación.",
  items: [
    "Medios de pago",
    "Correo transaccional",
    "Almacenamiento",
    "APIs",
    "Mapas",
    "WhatsApp",
    "SMS",
    "Google",
    "Servicios de IA",
    "Herramientas analíticas",
    "Sistemas externos",
    "Licencias",
  ],
};

/** §19 — Costos por consumo. */
export const CONSUMPTION_NOTE = {
  title: "Algunos costos dependen del uso",
  text: "Ciertos proveedores cobran según el uso real del sistema. Los costos de infraestructura pueden variar mes a mes.",
  factors: [
    "Tráfico",
    "Almacenamiento",
    "Cantidad de usuarios",
    "Solicitudes",
    "Correos enviados",
    "Uso de API",
    "Procesamiento",
    "Transferencia de datos",
  ],
};

/** §20 — Quién paga los servicios externos. */
export const CONTRACTING_MODES = [
  {
    id: "pago-directo",
    title: "Pago directo del cliente",
    text: "El cliente contrata y paga directamente dominio, hosting u otros servicios externos.",
    points: [
      "Propiedad y control directo",
      "Transparencia de costos",
      "Continuidad independiente de SYNEXA",
    ],
    footer: "SYNEXA realiza la configuración técnica.",
    icon: "wallet",
  },
  {
    id: "administrada",
    title: "Infraestructura administrada por SYNEXA",
    text: "SYNEXA administra la infraestructura necesaria y el cliente paga un servicio mensual de administración.",
    points: [
      "Alojamiento",
      "Configuración",
      "DNS",
      "SSL",
      "Monitoreo",
      "Despliegues",
      "Backups cuando corresponda",
      "Administración de infraestructura",
      "Soporte técnico relacionado",
    ],
    footer: null,
    icon: "server",
  },
];

/** §25 — Infraestructura no es soporte. */
export const INFRA_VS_SUPPORT = {
  infrastructure: {
    title: "Infraestructura",
    text: "Mantiene funcionando técnicamente la plataforma: dónde vive tu solución y con qué servicios opera.",
  },
  support: {
    title: "Continuidad y soporte",
    text: "Incluye atención, cambios, mantenimiento y acompañamiento SYNEXA sobre la solución ya funcionando.",
  },
  /** §26 — Cómo se combinan. */
  combined: {
    a: "Infraestructura",
    b: "SYNEXA Care",
    result: "Servicio administrado completo",
    note: "Puedes contratar solo infraestructura, o infraestructura junto con Continuidad y Soporte SYNEXA.",
  },
};

/** §28 y §29 — Caja informativa de costos de terceros. */
export const THIRD_PARTY_COSTS = {
  title: "Costos de terceros",
  text: "Los precios de dominio, infraestructura, bases de datos, almacenamiento, correo, API, pasarelas de pago y otros servicios externos corresponden a proveedores independientes. Sus valores pueden modificarse según las tarifas del proveedor, moneda, consumo y características del servicio.",
  currencyTitle: "Servicios facturados en moneda extranjera",
  currencyText:
    "Cuando un proveedor facture en USD u otra moneda extranjera, el costo puede variar según tipo de cambio, impuestos y condiciones del proveedor.",
  /** §31 — Sin márgenes ocultos. */
  marginNote:
    "El costo del proveedor y el servicio de administración SYNEXA son dos cosas distintas y se informan por separado.",
};

// ---------------------------------------------------------------------------
// Accesores
// ---------------------------------------------------------------------------

export function getDomainProviders() {
  return DOMAIN_PROVIDERS;
}

export function getInfraProviders(category) {
  return category
    ? INFRA_PROVIDERS.filter((provider) => provider.category === category)
    : INFRA_PROVIDERS;
}

/**
 * ===========================================================================
 * SYNEXA — Infraestructura Administrada (planes propios)
 * ===========================================================================
 *
 * Estos SÍ son precios de SYNEXA: corresponden al servicio de administrar la
 * infraestructura, no al costo del proveedor. Las tarifas de terceros viven
 * en src/data/externalServices.js y nunca se escriben como valores fijos.
 *
 * Importes en pesos chilenos NETOS (la interfaz agrega "+ IVA").
 */

export const TAX_LABEL = "+ IVA";

/**
 * {
 *   id, name, price, pricePrefix, taxLabel, billingPeriod,
 *   description, recommendedFor: string[], features: string[],
 *   customQuote: boolean, priceNote, recommended
 * }
 */
export const INFRASTRUCTURE_PLANS = [
  {
    id: "infra-web",
    name: "Infraestructura Web",
    price: 24900,
    pricePrefix: "Desde",
    taxLabel: TAX_LABEL,
    billingPeriod: "mes",
    description: "Para proyectos que solo necesitan estar publicados y seguros.",
    recommendedFor: ["Landing Pages", "Sitios corporativos", "Sitios informativos"],
    features: [
      "Alojamiento",
      "Configuración",
      "SSL",
      "DNS",
      "Despliegues",
      "Monitoreo básico",
    ],
    customQuote: false,
    priceNote: "Según características y consumo.",
    recommended: false,
  },
  {
    id: "infra-business",
    name: "Infraestructura Business",
    price: 49900,
    pricePrefix: "Desde",
    taxLabel: TAX_LABEL,
    billingPeriod: "mes",
    description: "Para proyectos que ya guardan información y crecen.",
    recommendedFor: [
      "Sitios avanzados",
      "Catálogos",
      "Aplicaciones pequeñas",
      "Portales",
    ],
    features: [
      "Infraestructura web",
      "Base de datos cuando corresponda",
      "Almacenamiento",
      "Backups",
      "Monitoreo",
      "Administración técnica",
    ],
    customQuote: false,
    priceNote: "Según características y consumo.",
    recommended: true,
  },
  {
    id: "infra-empresarial",
    name: "Infraestructura Empresarial",
    price: null,
    pricePrefix: null,
    taxLabel: TAX_LABEL,
    billingPeriod: "mes",
    description:
      "Para plataformas con más usuarios, más datos y mayor criticidad.",
    recommendedFor: [
      "Aplicaciones",
      "Sistemas empresariales",
      "E-commerce",
      "Bases de datos",
      "Plataformas críticas",
      "Gran cantidad de usuarios",
    ],
    features: [],
    customQuote: true,
    priceNote:
      "El valor dependerá de recursos, tráfico, almacenamiento, base de datos y servicios utilizados.",
    recommended: false,
  },
];

/**
 * §27 — SYNEXA MANAGED.
 *
 * Plan combinado (infraestructura + soporte) preparado pero NO publicado:
 * mientras `enabled` sea false la página no lo renderiza. Cuando exista
 * información comercial definitiva, completar `price`/`features` y poner
 * `enabled: true`: no hay que tocar ningún componente.
 */
export const SYNEXA_MANAGED = {
  enabled: false,
  id: "synexa-managed",
  name: "SYNEXA Managed",
  price: null,
  pricePrefix: "Desde",
  taxLabel: TAX_LABEL,
  billingPeriod: "mes",
  description:
    "Infraestructura y acompañamiento en un solo servicio administrado.",
  features: [
    "Alojamiento",
    "Infraestructura",
    "Dominio administrado",
    "Monitoreo",
    "Backups",
    "Soporte",
    "Cambios menores",
  ],
  customQuote: true,
  priceNote: null,
};

export const INFRASTRUCTURE_INTRO = {
  eyebrow: "Infraestructura administrada",
  title: "Infraestructura Administrada SYNEXA",
  text: "Nos encargamos de la infraestructura para que tú puedas concentrarte en tu negocio.",
  note: "Estos valores corresponden al servicio de administración de SYNEXA. El costo del proveedor de infraestructura se informa por separado.",
};

// ---------------------------------------------------------------------------
// Accesores
// ---------------------------------------------------------------------------

export function getInfrastructurePlans() {
  return INFRASTRUCTURE_PLANS;
}

export function getSynexaManaged() {
  return SYNEXA_MANAGED.enabled ? SYNEXA_MANAGED : null;
}

/**
 * ===========================================================================
 * SYNEXA — Continuidad y Soporte
 * ===========================================================================
 *
 * Planes mensuales de acompañamiento posteriores al período de puesta en
 * marcha, más el soporte por hora sin plan.
 *
 * Importes en pesos chilenos NETOS (la interfaz agrega "+ IVA").
 * Igual que el catálogo de servicios, esto vive fuera de los componentes
 * para que mañana pueda venir de la base de datos sin rehacer el diseño.
 */

export const TAX_LABEL = "+ IVA";

/**
 * {
 *   id, name, price, pricePrefix, taxLabel, billingPeriod,
 *   description   — a quién está orientado,
 *   features      — string[],
 *   responseTime  — tiempo de respuesta inicial,
 *   includedHours — horas de cambios/desarrollo incluidas,
 *   recommended   — marca discreta "Recomendado",
 *   priceNote     — aclaración bajo el precio
 * }
 */
export const SUPPORT_PLANS = [
  {
    id: "care",
    name: "SYNEXA Care",
    price: 59900,
    pricePrefix: null,
    taxLabel: TAX_LABEL,
    billingPeriod: "mes",
    description: "Landing Pages y sitios corporativos simples.",
    features: [
      "Monitoreo básico",
      "Revisión mensual",
      "Respaldo",
      "Comprobación de formularios",
      "Revisión de errores",
      "Actualizaciones técnicas cuando correspondan",
      "Soporte por ticket o email",
    ],
    responseTime: "Respuesta inicial hasta 2 días hábiles",
    includedHours: "Hasta 30 minutos de cambios menores por mes",
    recommended: false,
    priceNote: null,
  },
  {
    id: "care-plus",
    name: "SYNEXA Care Plus",
    price: 119900,
    pricePrefix: null,
    taxLabel: TAX_LABEL,
    billingPeriod: "mes",
    description: "Todo lo del plan Care, con mayor frecuencia y prioridad.",
    features: [
      "Todo lo incluido en SYNEXA Care",
      "Monitoreo frecuente",
      "Revisión de rendimiento",
      "Respaldo más frecuente",
      "Revisión básica de Analytics / errores",
      "Soporte prioritario",
      "Informe mensual breve",
    ],
    responseTime: "Respuesta inicial aproximadamente 1 día hábil",
    includedHours: "Hasta 2 horas de cambios menores mensuales",
    recommended: true,
    priceNote: null,
  },
  {
    id: "business",
    name: "SYNEXA Business",
    price: 219900,
    pricePrefix: null,
    taxLabel: TAX_LABEL,
    billingPeriod: "mes",
    description: "E-commerce, portales y sistemas importantes.",
    features: [
      "Monitoreo",
      "Respaldos",
      "Revisión de seguridad",
      "Rendimiento",
      "Revisión de formularios o transacciones",
      "Revisión de integraciones",
      "Soporte prioritario",
      "Reporte mensual",
    ],
    responseTime: "Respuesta inicial aproximadamente 8 horas hábiles",
    includedHours: "Hasta 5 horas mensuales de desarrollo o ajustes",
    recommended: false,
    priceNote: null,
  },
  {
    id: "business-critical",
    name: "SYNEXA Business Critical",
    price: 399900,
    pricePrefix: "Desde",
    taxLabel: TAX_LABEL,
    billingPeriod: "mes",
    description: "Sistemas empresariales o plataformas de mayor criticidad.",
    features: [
      "Monitoreo reforzado",
      "Respaldos",
      "Revisión de integraciones",
      "Soporte sobre funcionalidades",
      "Prioridad alta",
      "Seguimiento técnico",
      "Reuniones periódicas cuando corresponda",
    ],
    responseTime: "Tiempos de respuesta acordados",
    includedHours: "Hasta 10 horas mensuales",
    recommended: false,
    priceNote:
      "El valor final depende de la complejidad y criticidad del sistema.",
  },
];

/** §24 — Soporte sin plan. */
export const HOURLY_SUPPORT = [
  {
    id: "puntual",
    name: "Soporte puntual",
    price: 39900,
    pricePrefix: null,
    taxLabel: TAX_LABEL,
    unit: "hora",
    features: [
      "Cambios de contenido",
      "Ajustes",
      "Configuración",
      "Pequeños desarrollos",
      "Diagnóstico",
      "Soporte técnico",
    ],
    note: null,
  },
  {
    id: "urgente",
    name: "Soporte urgente",
    price: 69900,
    pricePrefix: "Desde",
    taxLabel: TAX_LABEL,
    unit: "hora",
    features: [],
    note: "Servicio sujeto a disponibilidad.",
  },
];

// ---------------------------------------------------------------------------
// Accesores
// ---------------------------------------------------------------------------

export function getSupportPlans() {
  return SUPPORT_PLANS;
}

export function getHourlySupport() {
  return HOURLY_SUPPORT;
}

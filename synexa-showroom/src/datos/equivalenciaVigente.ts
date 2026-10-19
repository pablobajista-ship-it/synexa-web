/**
 * Correspondencia entre los 19 paquetes propuestos y el catálogo VIGENTE del
 * sitio (src/data/servicesPricing.js del repositorio principal / documento
 * «Servicios-y-Precios-SYNEXA.docx»). Solo se usa para documentación y para el
 * reporte de conciliación; no se muestra al público.
 */
export const EQUIVALENCIA_VIGENTE: Record<string, { servicio: string; precioVigente: number } | null> = {
  "landing-captacion": { servicio: "Landing Page Profesional", precioVigente: 349000 },
  "web-pyme": { servicio: "Sitio Web PYME", precioVigente: 649000 },
  "corporativa-estandar": { servicio: "Sitio Web Corporativo", precioVigente: 949000 },
  "corporativa-plus": { servicio: "Sitio Corporativo Avanzado", precioVigente: 1290000 },
  "catalogo-basico": { servicio: "Catálogo Digital / Portal de Promociones", precioVigente: 749000 },
  "catalogo-avanzado": { servicio: "Catálogo Digital / Portal de Promociones", precioVigente: 749000 },
  "portal-comercial-especializado": null,
  "ecommerce-esencial": { servicio: "E-commerce Inicial", precioVigente: 990000 },
  "ecommerce-crecimiento": { servicio: "E-commerce Profesional", precioVigente: 1490000 },
  "radio-esencial": null,
  "radio-profesional": null,
  "portal-multimedia": null,
  "agenda-online": { servicio: "Sistema de Reservas / Agendamiento", precioVigente: 890000 },
  "portal-clientes": { servicio: "Portal de Clientes", precioVigente: 1490000 },
  "panel-datos": { servicio: "Base de Datos + Panel Web", precioVigente: 1290000 },
  "plataforma-procesos": { servicio: "Portal / Plataforma Empresarial", precioVigente: 1990000 },
  "mvp-medida": { servicio: "Sistema Web a Medida / MVP", precioVigente: 2490000 },
  "rediseno-acotado": { servicio: "Rediseño / Modernización Web", precioVigente: 490000 },
  "integracion-api-simple": { servicio: "Integración API / Sistemas Externos", precioVigente: 390000 },
};

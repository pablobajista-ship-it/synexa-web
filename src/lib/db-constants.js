// Constantes puras, sin dependencias de Node/servidor: seguras de importar
// tanto desde componentes cliente como desde src/lib/db.js.

export const ROLES = { CLIENT: "CLIENT", ADMIN: "ADMIN" };

export const TICKET_STATUS = {
  NUEVO: "NUEVO",
  RECIBIDO: "RECIBIDO",
  EN_REVISION: "EN_REVISION",
  EN_PROCESO: "EN_PROCESO",
  ESPERANDO_CLIENTE: "ESPERANDO_CLIENTE",
  RESUELTO: "RESUELTO",
  CERRADO: "CERRADO",
  CANCELADO: "CANCELADO",
};

export const TICKET_STATUS_LABELS = {
  NUEVO: "Nuevo",
  RECIBIDO: "Recibido",
  EN_REVISION: "En revisión",
  EN_PROCESO: "En proceso",
  ESPERANDO_CLIENTE: "Esperando tu respuesta",
  RESUELTO: "Resuelto",
  CERRADO: "Cerrado",
  CANCELADO: "Cancelado",
};

export const TICKET_PRIORITY = { BAJA: "BAJA", NORMAL: "NORMAL", ALTA: "ALTA", URGENTE: "URGENTE" };

export const TICKET_PRIORITY_LABELS = {
  BAJA: "Baja",
  NORMAL: "Normal",
  ALTA: "Alta",
  URGENTE: "Urgente",
};

export const TICKET_CATEGORIES = [
  "Problema o error en página web",
  "Solicitud de modificación",
  "Nueva funcionalidad",
  "Nuevo desarrollo web",
  "Cotización de nuevo proyecto",
  "Dominio",
  "Hosting",
  "Correo corporativo",
  "Certificado SSL / Seguridad",
  "Tienda online / E-commerce",
  "Sistema de reservas o agendamiento",
  "Base de datos",
  "Integración con sistemas externos",
  "API",
  "Google Analytics",
  "SEO / Posicionamiento",
  "Redes sociales / Integraciones",
  "Diseño web",
  "Diseño gráfico relacionado con el sitio",
  "Actualización de contenido",
  "Rendimiento o velocidad del sitio",
  "Problema de acceso",
  "Facturación o consulta comercial",
  "Capacitación o ayuda de uso",
  "Consulta general",
  "Otro",
];

export const PREFERRED_CONTACT = {
  TICKET: "A través de este ticket",
  EMAIL: "Correo electrónico",
  PHONE: "Teléfono",
  WHATSAPP: "WhatsApp",
};

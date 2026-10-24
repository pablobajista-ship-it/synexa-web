/**
 * Opciones y validación compartidas del formulario de contacto comercial
 * (cliente y servidor). El servidor valida siempre: nada de lo que llega por
 * la URL o el formulario se acepta sin pasar por estas funciones.
 */
export const SERVICE_OPTIONS = [
  { id: "pagina-web", label: "Crear una página web" },
  { id: "tienda-online", label: "Crear una tienda online" },
  { id: "catalogo", label: "Crear un catálogo digital" },
  { id: "aplicacion", label: "Desarrollar un sistema o aplicación" },
  { id: "mantenimiento", label: "Contratar mantenimiento web" },
  { id: "soporte", label: "Solicitar soporte técnico" },
  { id: "modernizar", label: "Mejorar un sitio web existente" },
  { id: "asesoria", label: "Otro servicio / necesito orientación" },
];

/** Ids anteriores: las consultas ya guardadas y los enlaces antiguos siguen siendo válidos. */
const LEGACY_SERVICES = {
  reservas: { label: "Sistema de reservas", maps: "aplicacion" },
  "portal-clientes": { label: "Portal de clientes", maps: "aplicacion" },
  personalizado: { label: "Sistema personalizado", maps: "aplicacion" },
};

export const SERVICE_IDS = SERVICE_OPTIONS.map((o) => o.id);
export const serviceLabel = (id) =>
  SERVICE_OPTIONS.find((o) => o.id === id)?.label ?? LEGACY_SERVICES[id]?.label ?? id;

/** Servicios que muestran los campos adicionales de mantenimiento. */
export const MAINTENANCE_SERVICES = ["mantenimiento", "soporte"];

export const HELP_TYPE_OPTIONS = [
  { id: "actualizaciones", label: "Actualizaciones" },
  { id: "revision", label: "Revisión técnica" },
  { id: "correccion", label: "Corrección de problemas" },
  { id: "respaldos", label: "Respaldos" },
  { id: "modificaciones", label: "Modificaciones" },
  { id: "no-seguro", label: "No estoy seguro" },
];
const HELP_TYPE_IDS = HELP_TYPE_OPTIONS.map((o) => o.id);

export const INQUIRY_STATUS = {
  NUEVA: "Nueva",
  EN_REVISION: "En revisión",
  CONTACTADA: "Contactada",
  CERRADA: "Cerrada",
};

export const LIMITS = { name: 120, company: 120, phone: 30, message: 3000, email: 254, siteUrl: 200 };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Chile (+56 9 1234 5678, 9 1234 5678) e internacionales (+34 ...). 7–15 dígitos. */
const PHONE_RE = /^\+?[0-9\s().-]{7,30}$/;

/** `origen` viene de la URL: solo slugs simples (a–z, 0–9, guion). */
export function sanitizeOrigin(value) {
  const v = String(value ?? "").trim().toLowerCase();
  return /^[a-z0-9-]{1,60}$/.test(v) ? v : "";
}

export function sanitizeService(value) {
  const v = String(value ?? "").trim();
  if (LEGACY_SERVICES[v]) return LEGACY_SERVICES[v].maps;
  return SERVICE_IDS.includes(v) ? v : "";
}

/** Devuelve { values, errors }. `values` ya viene recortado y normalizado. */
export function validateInquiry(input) {
  const s = (v) => String(v ?? "").trim();
  const values = {
    name: s(input.name).replace(/\s+/g, " "),
    email: s(input.email).toLowerCase(),
    company: s(input.company).replace(/\s+/g, " "),
    phone: s(input.phone),
    service: sanitizeService(input.service),
    message: s(input.message),
    siteUrl: s(input.siteUrl).replace(/\s+/g, ""),
    helpType: HELP_TYPE_IDS.includes(s(input.helpType)) ? s(input.helpType) : "",
    source: sanitizeOrigin(input.source),
    consent: input.consent === true,
  };
  const errors = {};

  if (values.name.length < 2) errors.name = "Escribe tu nombre.";
  else if (values.name.length > LIMITS.name) errors.name = `Máximo ${LIMITS.name} caracteres.`;

  if (!values.email) errors.email = "Escribe tu correo electrónico.";
  else if (values.email.length > LIMITS.email || !EMAIL_RE.test(values.email)) errors.email = "Revisa el formato del correo.";

  if (values.company.length > LIMITS.company) errors.company = `Máximo ${LIMITS.company} caracteres.`;

  if (values.phone) {
    const digits = values.phone.replace(/\D/g, "");
    if (!PHONE_RE.test(values.phone) || digits.length < 7 || digits.length > 15) {
      errors.phone = "Revisa el teléfono (ej. +56 9 1234 5678).";
    }
  }

  if (!values.service) errors.service = "Elige qué solución necesitas.";

  if (values.message.length < 10) errors.message = "Cuéntanos un poco más sobre tu idea (mínimo 10 caracteres).";
  else if (values.message.length > LIMITS.message) errors.message = `Máximo ${LIMITS.message} caracteres.`;

  if (values.siteUrl.length > LIMITS.siteUrl) errors.siteUrl = `Máximo ${LIMITS.siteUrl} caracteres.`;

  if (!values.consent) errors.consent = "Debes aceptar el tratamiento de tus datos para enviar la consulta.";

  // Los datos de mantenimiento no tienen columna propia (no se altera la base):
  // se anexan al mensaje para que lleguen completos al equipo.
  if (!MAINTENANCE_SERVICES.includes(values.service)) {
    values.siteUrl = "";
    values.helpType = "";
  } else {
    const extra = [];
    if (values.siteUrl) extra.push(`Sitio web a mantener: ${values.siteUrl}`);
    if (values.helpType) extra.push(`Tipo de ayuda: ${HELP_TYPE_OPTIONS.find((o) => o.id === values.helpType).label}`);
    if (extra.length) values.message = [values.message, extra.join("\n")].join("\n\n");
  }

  return { values, errors };
}

export const INQUIRY_STYLES = {
  NUEVA: "bg-blue-50 text-blue-700 border-blue-200",
  EN_REVISION: "bg-indigo-50 text-indigo-700 border-indigo-200",
  CONTACTADA: "bg-green-50 text-green-700 border-green-200",
  CERRADA: "bg-slate-100 text-slate-600 border-slate-200",
};

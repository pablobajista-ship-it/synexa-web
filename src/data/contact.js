/**
 * Datos de contacto comercial. Nada de esto está escrito a mano en el código:
 * los canales aparecen solo si están configurados (variables NEXT_PUBLIC_*).
 *
 *  - NEXT_PUBLIC_CONTACT_EMAIL     correo comercial público (debe existir y recibir correo).
 *  - NEXT_PUBLIC_WHATSAPP_NUMBER   solo dígitos con código de país, p. ej. 56912345678.
 *
 * El canal principal es el formulario de /contacto: guarda la consulta y avisa al equipo.
 */
const digits = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "");
const email = (process.env.NEXT_PUBLIC_CONTACT_EMAIL || "").trim();
const MESSAGE = "Hola SYNEXA, me gustaría recibir orientación sobre una solución digital para mi negocio.";

export const CONTACT_PAGE = "/contacto";
export const CONTACT_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "";
export const HAS_WHATSAPP = digits.length >= 8;
export const WHATSAPP_HREF = HAS_WHATSAPP ? `https://wa.me/${digits}?text=${encodeURIComponent(MESSAGE)}` : "";

/** Acción comercial principal de los CTA: WhatsApp si existe; si no, el formulario. */
export const CONTACT_PRIMARY = HAS_WHATSAPP
  ? { href: WHATSAPP_HREF, label: "Solicitar orientación por WhatsApp" }
  : { href: CONTACT_PAGE, label: "Solicitar orientación" };

/** Enlace a /contacto con la solución y el origen preseleccionados (se validan al abrir la página). */
export function contactHref({ service, source } = {}) {
  const params = new URLSearchParams();
  if (service) params.set("servicio", service);
  if (source) params.set("origen", source);
  const qs = params.toString();
  return qs ? `${CONTACT_PAGE}?${qs}` : CONTACT_PAGE;
}

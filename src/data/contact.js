/**
 * Datos de contacto comercial. El número de WhatsApp NO está en el código:
 * se define con NEXT_PUBLIC_WHATSAPP_NUMBER (solo dígitos con código de país,
 * p. ej. 56912345678). Sin él, el botón cae al correo existente.
 */
const digits = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "");
const MESSAGE = "Hola SYNEXA, me gustaría recibir orientación sobre una solución digital para mi negocio.";

export const CONTACT_EMAIL = "hola@synexa.com";
export const HAS_WHATSAPP = digits.length >= 8;
export const CONTACT_PRIMARY = HAS_WHATSAPP
  ? { href: `https://wa.me/${digits}?text=${encodeURIComponent(MESSAGE)}`, label: "Solicitar orientación por WhatsApp", external: true }
  : { href: `mailto:${CONTACT_EMAIL}`, label: "Solicitar orientación por correo" };

/**
 * Interruptor del Portal de Clientes.
 *
 * El portal (login, registro, tickets, panel) necesita base de datos y disco
 * para los adjuntos. En un despliegue serverless —como el sitio público en
 * Netlify— eso no está disponible, así que conviene ocultarlo en vez de dejar
 * un formulario que falla al enviarse.
 *
 * Por defecto está HABILITADO: en local y en cualquier host con base de datos
 * el portal funciona sin configurar nada. Para ocultarlo en el sitio público
 * se define la variable de entorno:
 *
 *   PORTAL_ENABLED=false
 *
 * Con eso desaparecen los enlaces al portal del header, del footer y de los
 * CTA, y /login pasa a mostrar un aviso de "próximamente".
 *
 * Se lee en el servidor (no es NEXT_PUBLIC) para no exponer configuración en
 * el bundle del cliente: los componentes de cliente la reciben como prop.
 */
export function isPortalEnabled() {
  return process.env.PORTAL_ENABLED !== "false";
}

/** Rutas que pertenecen al portal y no deben enlazarse si está oculto. */
const PORTAL_PREFIXES = ["/login", "/dashboard", "/admin", "/tickets", "/cuenta"];

export function isPortalHref(href) {
  return (
    typeof href === "string" &&
    PORTAL_PREFIXES.some((prefix) => href === prefix || href.startsWith(`${prefix}/`))
  );
}

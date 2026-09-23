/**
 * Interruptor del Portal de Clientes.
 *
 * El portal (login, registro, tickets, panel) necesita Supabase configurado
 * (DATABASE_URL, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY). En un despliegue
 * sin esas variables conviene ocultarlo en vez de dejar un formulario que
 * falla al enviarse.
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

/**
 * Respuesta de las rutas de API del portal cuando está oculto.
 *
 * Con el portal deshabilitado no hay base de datos, así que estas rutas no
 * pueden operar. Sin este guard responderían un 500 al intentar abrir el
 * archivo SQLite; un 503 dice lo correcto: el servicio no está disponible.
 *
 * No se aplica a /api/auth/[...nextauth]: el SessionProvider del cliente
 * consulta /api/auth/session en todas las páginas, incluidas las públicas,
 * y esa lectura no toca la base de datos (la sesión es un JWT).
 *
 * Usa Response.json() en vez de NextResponse para que este módulo —que
 * también importan componentes de la web pública— no dependa de next/server.
 */
export function portalDisabledResponse() {
  return Response.json(
    { error: "El Portal de Clientes no está disponible en este momento." },
    { status: 503, headers: { "Cache-Control": "no-store" } }
  );
}

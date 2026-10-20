import { auth } from "@/auth";
import { isPortalEnabled } from "@/lib/portal";
import { CONTACT_EMAIL } from "@/data/contact";
import SiteHeader from "@/components/marketing/SiteHeader";
import SiteFooter from "@/components/marketing/SiteFooter";
import Container from "@/components/ui/Container";

export const metadata = {
  title: "Política de Privacidad",
  description: "Cómo SYNEXA trata los datos que recibe a través del formulario de contacto.",
  alternates: { canonical: "/privacidad" },
};

/**
 * BORRADOR informativo. Debe ser revisado por quien represente legalmente a SYNEXA
 * antes de considerarlo definitivo: faltan los datos del responsable (razón social,
 * RUT, domicilio) y confirmar el plazo de conservación. En Chile rige la Ley 19.628
 * y la Ley 21.719, que modifica el régimen de protección de datos personales y,
 * según su texto, entra en vigencia en diciembre de 2026: conviene verificarlo.
 */
const RETENTION_MONTHS = 24;

export default async function PrivacidadPage() {
  const session = await auth();
  const dashboardHref = session?.user?.role === "ADMIN" ? "/admin" : "/dashboard";

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader isAuthenticated={!!session?.user} dashboardHref={dashboardHref} portalEnabled={isPortalEnabled()} />
      <main className="bg-white py-12 sm:py-16">
        <Container size="md">
          <h1 className="text-[2rem] sm:text-[2.5rem] font-bold tracking-[-0.02em] text-[var(--color-navy)] mb-3">
            Política de Privacidad
          </h1>
          <p className="text-[14px] text-[var(--color-gray-dark)]/80 mb-8">
            Versión preliminar. Última revisión: octubre de 2026.
          </p>

          <div className="space-y-7 text-[16px] leading-[1.7] text-[var(--color-gray-dark)] [&_h2]:text-[1.2rem] [&_h2]:font-bold [&_h2]:text-[var(--color-navy)] [&_h2]:mb-2">
            <section>
              <h2>Qué datos recogemos</h2>
              <p>
                Cuando usas el formulario de contacto te pedimos tu nombre y tu correo electrónico, y
                opcionalmente el nombre de tu negocio y un teléfono. También guardamos la solución que
                te interesa, el mensaje que nos escribes, la página desde la que llegaste y la fecha de
                la consulta. Para limitar el spam guardamos una huella cifrada de tu dirección IP, no la
                dirección misma.
              </p>
            </section>
            <section>
              <h2>Para qué los usamos</h2>
              <p>
                Solo para responder tu consulta y hacer seguimiento de la conversación comercial. No
                vendemos ni cedemos tus datos a terceros para publicidad.
              </p>
            </section>
            <section>
              <h2>Quién accede a ellos</h2>
              <p>
                Las consultas se guardan en una base de datos privada y solo las ve el equipo
                autorizado de SYNEXA. Usamos proveedores de infraestructura (alojamiento, base de datos
                y envío de correo) que procesan los datos por nuestra cuenta.
              </p>
            </section>
            <section>
              <h2>Cuánto tiempo los conservamos</h2>
              <p>
                Conservamos las consultas mientras la conversación siga abierta y, una vez cerradas,
                hasta {RETENTION_MONTHS} meses. Pasado ese plazo se eliminan.
              </p>
            </section>
            <section>
              <h2>Tus derechos</h2>
              <p>
                Puedes pedirnos acceso, rectificación o eliminación de tus datos, y retirar tu
                consentimiento en cualquier momento, escribiéndonos
                {CONTACT_EMAIL ? (
                  <>
                    {" "}a{" "}
                    <a className="font-semibold text-[var(--color-blue)]" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                  </>
                ) : (
                  " a través del formulario de contacto"
                )}
                .
              </p>
            </section>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </div>
  );
}

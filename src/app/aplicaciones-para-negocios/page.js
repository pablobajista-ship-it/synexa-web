import { auth } from "@/auth";
import { isPortalEnabled } from "@/lib/portal";
import { CONTACT_PAGE } from "@/data/contact";
import SiteHeader from "@/components/marketing/SiteHeader";
import SiteFooter from "@/components/marketing/SiteFooter";
import AppsHero from "@/components/marketing/AppsHero";
import AppsCapabilities from "@/components/marketing/AppsCapabilities";
import AppExamplesGallery from "@/components/marketing/AppExamplesGallery";
import AppsLevels from "@/components/marketing/AppsLevels";
import CtaSection from "@/components/marketing/CtaSection";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";

export const metadata = {
  title: "Aplicaciones para Negocios",
  description:
    "Descubre lo que una página web, una tienda online o una aplicación empresarial puede hacer por tu negocio: ejemplos para distintos rubros.",
};

export default async function AplicacionesParaNegociosPage() {
  const session = await auth();
  const dashboardHref = session?.user?.role === "ADMIN" ? "/admin" : "/dashboard";

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader
        isAuthenticated={!!session?.user}
        dashboardHref={dashboardHref}
        portalEnabled={isPortalEnabled()}
      />

      <main>
        <AppsHero contactHref="/contacto" />
        <AppsCapabilities />

        <section id="ejemplos" className="py-12 sm:py-14 lg:py-16 bg-[var(--color-surface-muted)] scroll-mt-20">
          <Container>
            <Reveal className="max-w-[720px] mb-8">
              <Eyebrow>Aplicaciones para negocios reales</Eyebrow>
              <h2 className="text-[1.75rem] sm:text-[2.25rem] leading-[1.15] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-3 mb-3 text-balance">
                Imagina lo que podríamos crear para tu negocio.
              </h2>
              <p className="text-[var(--color-gray-dark)] text-[16.5px] leading-[1.65]">
                Conoce ejemplos de soluciones digitales para distintos rubros y descubre cómo
                podrían facilitar la atención, las ventas y la gestión de tu empresa.
              </p>
              <p className="text-[13px] text-[var(--color-gray-dark)]/75 mt-3">
                Son ejemplos ilustrativos, no proyectos reales. Las funciones finales dependen del
                servicio contratado.
              </p>
            </Reveal>
            <AppExamplesGallery />
          </Container>
        </section>

        <AppsLevels />

        <CtaSection
          eyebrow="Hablemos de tu negocio"
          title="Cada negocio es diferente. Tu solución también puede serlo."
          description="Los ejemplos que has visto muestran algunas de las posibilidades. Podemos ayudarte a identificar qué funcionalidades necesita realmente tu negocio."
          primaryAction={{ href: CONTACT_PAGE, label: "Conversemos sobre tu proyecto" }}
          secondaryAction={{ href: "/servicios-y-precios", label: "Ver servicios y precios" }}
        />
      </main>

      <SiteFooter />
    </div>
  );
}

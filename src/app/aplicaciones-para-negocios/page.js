import { auth } from "@/auth";
import { isPortalEnabled } from "@/lib/portal";
import SiteHeader from "@/components/marketing/SiteHeader";
import SiteFooter from "@/components/marketing/SiteFooter";
import PageHero from "@/components/marketing/PageHero";
import AppHeroVisual from "@/components/marketing/AppHeroVisual";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import ManualToDigitalFlow from "@/components/marketing/ManualToDigitalFlow";
import ModuleGrid from "@/components/marketing/ModuleGrid";
import ApplicationCategorySection from "@/components/marketing/ApplicationCategorySection";
import CustomProjectBlock from "@/components/marketing/CustomProjectBlock";
import ProcessSteps from "@/components/marketing/ProcessSteps";
import DashboardMockup from "@/components/marketing/DashboardMockup";
import RolesAndDevices from "@/components/marketing/RolesAndDevices";
import IntegrationsSecurity from "@/components/marketing/IntegrationsSecurity";
import AppPricingBlock from "@/components/marketing/AppPricingBlock";
import CtaSection from "@/components/marketing/CtaSection";
import {
  getAppCategories,
  getApplicationsByCategory,
  APP_MODULES,
  MANUAL_TO_DIGITAL,
  APP_PROCESS_STEPS,
  MOCKUP,
  APP_ROLES,
  APP_DEVICES,
  APP_INTEGRATIONS,
  APP_SECURITY,
  APP_PRICING,
} from "@/data/businessApplications";

export const metadata = {
  title: "Aplicaciones para Negocios",
  description:
    "Desarrollo de aplicaciones web y sistemas para empresas: clientes, agenda, reservas, fichas, órdenes de trabajo, portales, bases de datos y soluciones a medida.",
};

export default async function AplicacionesParaNegociosPage() {
  const session = await auth();
  const dashboardHref = session?.user?.role === "ADMIN" ? "/admin" : "/dashboard";

  const categories = getAppCategories();

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader
        isAuthenticated={!!session?.user}
        dashboardHref={dashboardHref}
        portalEnabled={isPortalEnabled()}
      />

      <main>
        <PageHero
          eyebrow="Aplicaciones para negocios"
          title="Software pensado para la forma en que trabaja tu empresa."
          description="Digitalizamos procesos que hoy realizas mediante planillas, correos, documentos o múltiples herramientas. Diseñamos aplicaciones web adaptadas a tus clientes, equipos y procesos."
          actions={
            <>
              <Button href="#contacto" variant="accent" size="xl">
                Cuéntanos qué necesita tu negocio
              </Button>
              <Button href="#ejemplos" variant="on-dark-outline" size="xl">
                Explorar soluciones
              </Button>
            </>
          }
          note="No necesitas saber qué tecnología utilizar. Cuéntanos cómo funciona tu empresa y diseñaremos la solución contigo."
          aside={<AppHeroVisual />}
        />

        {/* §7 — De lo manual a lo digital */}
        <ManualToDigitalFlow
          before={MANUAL_TO_DIGITAL.before}
          after={MANUAL_TO_DIGITAL.after}
        />

        {/* §8 — Módulos */}
        <ModuleGrid modules={APP_MODULES} />

        {/* §9–§17 — Ejemplos por familia */}
        <section id="ejemplos" className="section-pad bg-white scroll-mt-20">
          <Container>
            <Reveal className="max-w-[780px] mb-14 lg:mb-16">
              <Eyebrow>Ejemplos</Eyebrow>
              <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
                Aplicaciones que podemos desarrollar
              </h2>
              <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7]">
                Los siguientes son ejemplos de soluciones que podemos construir para
                distintos tipos de negocio. No son productos disponibles: cada aplicación
                se diseña y desarrolla según la operación de cada empresa.
              </p>
            </Reveal>

            <div className="space-y-16 lg:space-y-24">
              {categories.map((category, i) => (
                <ApplicationCategorySection
                  key={category.id}
                  category={category}
                  applications={getApplicationsByCategory(category.id)}
                  index={i}
                />
              ))}
            </div>
          </Container>
        </section>

        {/* §18 — Tu negocio puede ser diferente */}
        <CustomProjectBlock
          title="¿Tu negocio no aparece aquí?"
          text="Estos son solamente algunos ejemplos."
          secondaryText="Si actualmente administras información, clientes, documentos o procesos mediante planillas, correos, formularios o aplicaciones separadas, probablemente podemos diseñar una solución que centralice parte de ese trabajo."
          cta={{ label: "Cuéntanos cómo funciona tu negocio", href: "#contacto" }}
        />

        {/* §19 — Cómo desarrollamos una aplicación */}
        <ProcessSteps
          id="proceso"
          eyebrow="Cómo lo hacemos"
          title="Cómo desarrollamos una aplicación"
          description="El mismo proceso de siempre, aplicado a sistemas de gestión: primero entendemos tu operación, después construimos."
          steps={APP_PROCESS_STEPS}
          className="bg-[var(--color-surface-muted)]"
        />

        {/* §20 — Mockup conceptual */}
        <DashboardMockup mockup={MOCKUP} />

        {/* §21 + §22 — Roles y dispositivos */}
        <RolesAndDevices roles={APP_ROLES} devices={APP_DEVICES} />

        {/* §23 + §24 — Integraciones y seguridad */}
        <IntegrationsSecurity
          integrations={APP_INTEGRATIONS}
          security={APP_SECURITY}
        />

        {/* §25–§27 — Precio, puesta en marcha y continuidad */}
        <AppPricingBlock pricing={APP_PRICING} />

        {/* §36 — CTA final */}
        <CtaSection
          eyebrow="Hablemos de tu negocio"
          title="¿Hay un proceso que podríamos hacer más simple?"
          description="Cuéntanos cómo trabajas hoy, qué información necesitas administrar y qué problema quieres resolver. Podemos ayudarte a transformarlo en una solución digital."
          primaryAction={{ href: "mailto:hola@synexa.com", label: "Cuéntanos tu idea" }}
          secondaryAction={{ href: "/servicios-y-precios", label: "Ver servicios y precios" }}
        />
      </main>

      <SiteFooter />
    </div>
  );
}

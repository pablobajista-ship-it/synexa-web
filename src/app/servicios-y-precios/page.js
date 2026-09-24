import { auth } from "@/auth";
import { isPortalEnabled } from "@/lib/portal";
import SiteHeader from "@/components/marketing/SiteHeader";
import SiteFooter from "@/components/marketing/SiteFooter";
import PageHero from "@/components/marketing/PageHero";
import PageSubNav from "@/components/marketing/PageSubNav";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import ServiceGroupNav from "@/components/marketing/ServiceGroupNav";
import ServiceGroupSection from "@/components/marketing/ServiceGroupSection";
import ProjectIncludes from "@/components/marketing/ProjectIncludes";
import LaunchPeriod from "@/components/marketing/LaunchPeriod";
import CostModelExplainer from "@/components/marketing/CostModelExplainer";
import InfrastructureIntro from "@/components/marketing/InfrastructureIntro";
import DomainBlock from "@/components/marketing/DomainBlock";
import HostingBlock from "@/components/marketing/HostingBlock";
import ExternalServicesBlock from "@/components/marketing/ExternalServicesBlock";
import ManagedInfrastructure from "@/components/marketing/ManagedInfrastructure";
import ThirdPartyCosts from "@/components/marketing/ThirdPartyCosts";
import CustomProjectBlock from "@/components/marketing/CustomProjectBlock";
import SupportPlans from "@/components/marketing/SupportPlans";
import PaymentTerms from "@/components/marketing/PaymentTerms";
import FaqSection from "@/components/marketing/FaqSection";
import CtaSection from "@/components/marketing/CtaSection";
import {
  getServiceGroups,
  getServicesByGroup,
  getLaunchPeriods,
  PROJECT_INCLUDES,
  EXTERNAL_COSTS_NOTE,
  LAUNCH_COVERAGE,
  PAYMENT_SCHEMES,
  PAYMENT_NOTE,
  PRICING_FAQ,
} from "@/data/servicesPricing";
import { getSupportPlans, getHourlySupport } from "@/data/supportPlans";
import {
  COST_MODEL,
  TRANSPARENCY_STATEMENT,
  INFRA_PILLARS,
  DOMAIN_INFO,
  getDomainProviders,
  getInfraProviders,
  PROVIDER_DISCLAIMER,
  DATABASE_INTRO,
  INFRA_DIAGRAM,
  PROJECT_INFRA_EXAMPLES,
  EXTERNAL_SERVICES,
  CONSUMPTION_NOTE,
  CONTRACTING_MODES,
  INFRA_VS_SUPPORT,
  THIRD_PARTY_COSTS,
} from "@/data/externalServices";
import {
  getInfrastructurePlans,
  getSynexaManaged,
  INFRASTRUCTURE_INTRO,
} from "@/data/infrastructurePlans";

/** Navegación interna: la página es larga y mezcla tres áreas comerciales. */
const SUB_NAV = [
  { id: "servicios", label: "Servicios y precios" },
  { id: "puesta-en-marcha", label: "Puesta en marcha" },
  { id: "tipos-de-costo", label: "Tipos de costo" },
  { id: "infraestructura", label: "Infraestructura" },
  { id: "infraestructura-administrada", label: "Infraestructura administrada" },
  { id: "soporte", label: "Continuidad y soporte" },
  { id: "contacto", label: "Contacto" },
];

export const metadata = {
  title: "Servicios y Precios",
  description:
    "Conoce los servicios digitales de SYNEXA para empresas: sitios web, e-commerce, bases de datos, portales, soluciones a medida, infraestructura administrada y planes de soporte tecnológico.",
};

export default async function ServiciosYPreciosPage() {
  const session = await auth();
  const dashboardHref = session?.user?.role === "ADMIN" ? "/admin" : "/dashboard";

  const groups = getServiceGroups();

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader
        isAuthenticated={!!session?.user}
        dashboardHref={dashboardHref}
        portalEnabled={isPortalEnabled()}
      />

      <PageSubNav items={SUB_NAV} />

      <main>
        <PageHero
          eyebrow="Servicios y precios"
          title="Soluciones digitales pensadas para cada etapa de tu negocio."
          description="Desde una presencia web profesional hasta plataformas y sistemas personalizados. Elige una solución inicial o cuéntanos qué necesita tu empresa y diseñaremos una propuesta a medida."
          actions={
            <>
              <Button href="#contacto" variant="accent" size="xl">
                Cuéntanos tu proyecto
              </Button>
              <Button href="#servicios" variant="on-dark-outline" size="xl">
                Ver servicios
              </Button>
            </>
          }
          badges={[
            "Precios de referencia",
            "Puesta en marcha incluida",
            "Infraestructura administrada",
            "Planes de soporte mensual",
          ]}
          image={{
            src: "/images/heroes/hero-servicios.webp",
            alt: "Escritorio de desarrollo con laptop, monitor, tablet y teléfono mostrando un mismo sitio web adaptado a cada pantalla",
            position: "70% center",
          }}
        />

        {/* ---------- Accesos por grupo ---------- */}
        <ServiceGroupNav groups={groups} />

        {/* ---------- Catálogo de desarrollo ---------- */}
        <section
          id="servicios"
          className="section-pad bg-[var(--color-surface-muted)] scroll-mt-20"
        >
          <Container>
            <Reveal className="max-w-[780px] mb-14 lg:mb-16">
              <Eyebrow>Catálogo</Eyebrow>
              <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
                Servicios y precios de referencia
              </h2>
              <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7]">
                Los valores indicados son precios netos de referencia y se muestran como{" "}
                <span className="font-semibold text-[var(--color-navy)]">
                  “Desde … + IVA”
                </span>
                . El precio definitivo depende del alcance, las funcionalidades y el nivel
                de personalización de cada proyecto.
              </p>
            </Reveal>

            <div className="space-y-16 lg:space-y-24">
              {groups.map((group, i) => (
                <ServiceGroupSection
                  key={group.id}
                  group={group}
                  services={getServicesByGroup(group.id)}
                  index={i}
                />
              ))}
            </div>
          </Container>
        </section>

        {/* ---------- Qué incluye + costos externos ---------- */}
        <ProjectIncludes items={PROJECT_INCLUDES} externalCostsNote={EXTERNAL_COSTS_NOTE} />

        {/* ---------- Puesta en marcha ---------- */}
        <LaunchPeriod periods={getLaunchPeriods()} coverage={LAUNCH_COVERAGE} />

        {/* ---------- Los tres tipos de costo ---------- */}
        <CostModelExplainer model={COST_MODEL} statement={TRANSPARENCY_STATEMENT} />

        {/* ---------- Infraestructura y servicios externos ---------- */}
        <InfrastructureIntro pillars={INFRA_PILLARS} />

        <DomainBlock domain={DOMAIN_INFO} providers={getDomainProviders()} />

        <HostingBlock
          providers={getInfraProviders()}
          databaseIntro={DATABASE_INTRO}
          disclaimer={PROVIDER_DISCLAIMER}
          diagram={INFRA_DIAGRAM}
          examples={PROJECT_INFRA_EXAMPLES}
        />

        <ExternalServicesBlock
          services={EXTERNAL_SERVICES}
          consumption={CONSUMPTION_NOTE}
        />

        <ManagedInfrastructure
          modes={CONTRACTING_MODES}
          intro={INFRASTRUCTURE_INTRO}
          plans={getInfrastructurePlans()}
          managed={getSynexaManaged()}
          comparison={INFRA_VS_SUPPORT}
        />

        <ThirdPartyCosts costs={THIRD_PARTY_COSTS} />

        {/* ---------- CTA de infraestructura ---------- */}
        <CustomProjectBlock
          title="¿No sabes qué infraestructura necesita tu proyecto?"
          text="No necesitas elegir proveedores ni conocer los detalles técnicos. Nosotros te indicaremos qué necesita tu solución y cuánto costará mantenerla."
          cta={{ label: "Hablar con SYNEXA", href: "#contacto" }}
        />

        {/* ---------- Continuidad y soporte ---------- */}
        <SupportPlans plans={getSupportPlans()} hourly={getHourlySupport()} />

        {/* ---------- Forma de pago ---------- */}
        <PaymentTerms schemes={PAYMENT_SCHEMES} note={PAYMENT_NOTE} />

        {/* ---------- FAQ ---------- */}
        <FaqSection
          title="Preguntas frecuentes"
          description="Lo que nos consultan con más frecuencia antes de iniciar un proyecto."
          items={PRICING_FAQ}
        />

        {/* ---------- CTA final ---------- */}
        <CtaSection
          title="¿No sabes qué servicio necesitas?"
          description="Cuéntanos qué quieres resolver y te ayudaremos a identificar la solución adecuada para tu negocio."
          primaryAction={{ href: "mailto:hola@synexa.com", label: "Cuéntanos tu proyecto" }}
          secondaryAction={{ href: "mailto:hola@synexa.com", label: "Hablar con SYNEXA" }}
        />
      </main>

      <SiteFooter />
    </div>
  );
}

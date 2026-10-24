import { auth } from "@/auth";
import { isPortalEnabled } from "@/lib/portal";
import SiteHeader from "@/components/marketing/SiteHeader";
import SiteFooter from "@/components/marketing/SiteFooter";
import PageHero from "@/components/marketing/PageHero";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Reveal from "@/components/marketing/Reveal";
import SupportPlans from "@/components/marketing/SupportPlans";
import FaqSection from "@/components/marketing/FaqSection";
import CtaSection from "@/components/marketing/CtaSection";
import { IconCheck } from "@/components/marketing/icons";
import { getSupportPlans, getHourlySupport } from "@/data/supportPlans";
import {
  AFTER_DELIVERY,
  MAINTENANCE_CONTACT,
  MAINTENANCE_FAQ,
  MAINTENANCE_GROUPS,
  NOT_THE_SAME,
} from "@/data/maintenance";

export const metadata = {
  title: "Mantenimiento Web",
  description:
    "Servicio opcional de mantenimiento y soporte técnico para sitios web: actualizaciones, respaldos, revisiones y resolución de incidencias, según el plan que elijas.",
  alternates: { canonical: "/mantenimiento-web" },
};

export default async function MantenimientoWebPage() {
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
        <PageHero
          eyebrow="Mantenimiento web"
          title="Mantenimiento y soporte para tu sitio, cuando lo necesites."
          description="Primero creamos tu sitio web. Después, si quieres continuidad técnica, puedes sumar un servicio de mantenimiento y soporte. Es adicional y opcional: puedes usar tu sitio sin contratarlo."
          actions={
            <>
              <Button href={MAINTENANCE_CONTACT} variant="accent" size="xl">
                Solicitar mantenimiento
              </Button>
              <Button href="#planes" variant="on-dark-outline" size="xl">
                Ver planes de soporte
              </Button>
            </>
          }
          image={{
            src: "/images/heroes/hero-mantenimiento.webp",
            alt: "Monitor y notebook sobre un escritorio oscuro mostrando un panel abstracto de estado de un sitio web, con un rack de servidores al fondo",
            position: "70% center",
          }}
          badges={["Servicio opcional", "Se cotiza por separado", "También evaluamos sitios de otros proveedores"]}
        />

        {/* ---------- Qué ocurre después de la entrega ---------- */}
        <section className="section-pad bg-white">
          <Container>
            <Reveal className="max-w-[780px] mb-10 lg:mb-12">
              <Eyebrow>Después de la entrega</Eyebrow>
              <h2 className="text-[2rem] sm:text-[2.5rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 text-balance">
                ¿Qué ocurre después de entregar tu sitio web?
              </h2>
            </Reveal>
            <Reveal>
              <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-5 max-w-[960px]">
                {AFTER_DELIVERY.map((text, i) => (
                  <li key={text} className="flex gap-3.5">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-navy)] text-white text-[13px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-[15.5px] leading-[1.65] text-[var(--color-gray-dark)] pt-1">{text}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </Container>
        </section>

        {/* ---------- Grupos orientativos ---------- */}
        <section className="section-pad bg-[var(--color-surface-muted)]">
          <Container>
            <Reveal className="max-w-[780px] mb-10 lg:mb-12">
              <Eyebrow>Qué podemos cubrir</Eyebrow>
              <h2 className="text-[2rem] sm:text-[2.5rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 mb-5 text-balance">
                Tres niveles de acompañamiento
              </h2>
              <p className="text-[var(--color-gray-dark)] text-[17px] leading-[1.7]">
                Son grupos orientativos para que identifiques qué necesitas; no son planes contractuales.
                El alcance final se define en la propuesta.
              </p>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
              {MAINTENANCE_GROUPS.map((group, i) => (
                <Reveal key={group.id} delay={i * 60} className="h-full">
                  <article className="card-hover h-full rounded-[1.75rem] border border-[var(--color-border)]/80 bg-white p-7">
                    <h3 className="text-[19px] font-bold text-[var(--color-navy)] mb-5">{group.title}</h3>
                    <ul className="space-y-3">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <span className="flex-shrink-0 w-[18px] h-[18px] mt-0.5 rounded-full bg-[var(--color-teal)]/15 text-[var(--color-teal-dark)] flex items-center justify-center">
                            <IconCheck className="w-2.5 h-2.5" />
                          </span>
                          <span className="text-[14.5px] leading-[1.55] text-[var(--color-gray-dark)]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* ---------- Conceptos que no se confunden ---------- */}
        <section className="section-pad bg-white">
          <Container>
            <Reveal className="max-w-[780px] mb-10 lg:mb-12">
              <Eyebrow>Transparencia</Eyebrow>
              <h2 className="text-[2rem] sm:text-[2.5rem] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-4 text-balance">
                Cada concepto, por separado
              </h2>
            </Reveal>
            <Reveal>
              <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {NOT_THE_SAME.map((item) => (
                  <div key={item.term} className="rounded-2xl border border-[var(--color-border)]/80 bg-[var(--color-surface-muted)]/50 p-6">
                    <dt className="text-[16.5px] font-bold text-[var(--color-navy)] mb-1.5">{item.term}</dt>
                    <dd className="text-[14.5px] leading-[1.6] text-[var(--color-gray-dark)]">{item.text}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </Container>
        </section>

        {/* ---------- Planes de soporte existentes ---------- */}
        <div id="planes" className="scroll-mt-20">
          <SupportPlans plans={getSupportPlans()} hourly={getHourlySupport()} />
        </div>

        <FaqSection
          className="bg-[var(--color-surface-muted)]"
          title="Preguntas frecuentes sobre mantenimiento"
          description="Lo esencial antes de decidir si necesitas acompañamiento después de la entrega."
          items={MAINTENANCE_FAQ}
        />

        <CtaSection
          title="¿Necesitas mantener tu sitio web?"
          description="Cuéntanos qué sitio tienes y en qué necesitas ayuda. Evaluaremos tu caso y te enviaremos una propuesta."
          primaryAction={{ href: MAINTENANCE_CONTACT, label: "Consultar planes de mantenimiento" }}
          secondaryAction={{ href: "/servicios-y-precios", label: "Ver servicios y precios" }}
        />
      </main>

      <SiteFooter />
    </div>
  );
}

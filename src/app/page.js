import { auth } from "@/auth";
import { isPortalEnabled } from "@/lib/portal";
import { CONTACT_PRIMARY } from "@/data/contact";
import SiteHeader from "@/components/marketing/SiteHeader";
import Hero from "@/components/marketing/Hero";
import HomeTwoServices from "@/components/marketing/HomeTwoServices";
import HomeSolutions from "@/components/marketing/HomeSolutions";
import HomeDemos from "@/components/marketing/HomeDemos";
import HomeWhy from "@/components/marketing/HomeWhy";
import HomeProcess from "@/components/marketing/HomeProcess";
import CtaSection from "@/components/marketing/CtaSection";
import SiteFooter from "@/components/marketing/SiteFooter";

export default async function Home() {
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
        <Hero />
        <HomeTwoServices />
        <HomeSolutions />
        <HomeDemos />
        <HomeWhy />
        <HomeProcess />
        <CtaSection
          title="¿Tienes una idea para tu negocio?"
          description="Cuéntanos qué necesitas. Te ayudaremos a encontrar una solución digital adecuada para tu proyecto."
          primaryAction={CONTACT_PRIMARY}
          secondaryAction={{ href: "/servicios-y-precios", label: "Ver servicios y precios" }}
        />
      </main>
      <SiteFooter />
    </div>
  );
}

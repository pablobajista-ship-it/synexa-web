import { auth } from "@/auth";
import SiteHeader from "@/components/marketing/SiteHeader";
import Hero from "@/components/marketing/Hero";
import ServicesGrid from "@/components/marketing/ServicesGrid";
import ValueProps from "@/components/marketing/ValueProps";
import HomeAppsTeaser from "@/components/marketing/HomeAppsTeaser";
import ProcessSteps from "@/components/marketing/ProcessSteps";
import UseCasesGrid from "@/components/marketing/UseCasesGrid";
import TechStack from "@/components/marketing/TechStack";
import DarkBrandBlock from "@/components/marketing/DarkBrandBlock";
import CtaSection from "@/components/marketing/CtaSection";
import SiteFooter from "@/components/marketing/SiteFooter";

export default async function Home() {
  const session = await auth();
  const dashboardHref = session?.user?.role === "ADMIN" ? "/admin" : "/dashboard";

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader isAuthenticated={!!session?.user} dashboardHref={dashboardHref} />
      <main>
        <Hero />
        <ServicesGrid />
        <ValueProps />
        <HomeAppsTeaser />
        <ProcessSteps />
        <UseCasesGrid />
        <TechStack />
        <DarkBrandBlock />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}

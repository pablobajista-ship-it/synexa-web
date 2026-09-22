import { auth } from "@/auth";
import SiteHeader from "@/components/marketing/SiteHeader";
import Hero from "@/components/marketing/Hero";
import ServicesGrid from "@/components/marketing/ServicesGrid";
import ValueProps from "@/components/marketing/ValueProps";
import ProcessSteps from "@/components/marketing/ProcessSteps";
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
        <ProcessSteps />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}

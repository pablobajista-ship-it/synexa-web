import Image from "next/image";
import { auth } from "@/auth";
import { isPortalEnabled } from "@/lib/portal";
import { VERIFIED_PROJECTS } from "@/data/projects";
import { CONTACT_PAGE } from "@/data/contact";
import SiteHeader from "@/components/marketing/SiteHeader";
import SiteFooter from "@/components/marketing/SiteFooter";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/marketing/Reveal";
import CtaSection from "@/components/marketing/CtaSection";
import AppIcon from "@/components/marketing/appIcons";
import { IconArrowRight } from "@/components/marketing/icons";

export const metadata = {
  title: "Nosotros",
  description:
    "Conoce a SYNEXA: desarrollamos páginas web, tiendas online y aplicaciones para negocios, con soluciones claras y adaptadas a cada proyecto.",
  alternates: { canonical: "/nosotros" },
};

const PRINCIPLES = [
  { icon: "users", title: "Escuchamos", text: "Conocemos tu negocio y sus necesidades antes de proponer nada." },
  { icon: "layers", title: "Diseñamos", text: "Construimos soluciones con un propósito claro y fáciles de utilizar." },
  { icon: "shield", title: "Acompañamos", text: "Te orientamos durante el desarrollo y ofrecemos servicios de continuidad, según lo contratado." },
];

export default async function NosotrosPage() {
  const session = await auth();
  const dashboardHref = session?.user?.role === "ADMIN" ? "/admin" : "/dashboard";

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader isAuthenticated={!!session?.user} dashboardHref={dashboardHref} portalEnabled={isPortalEnabled()} />

      <main>
        {/* Hero institucional */}
        <section className="relative overflow-hidden bg-[var(--color-navy)]">
          <div className="pointer-events-none absolute inset-0 tech-grid opacity-60" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(48% 60% at 8% 15%, rgba(37,99,235,0.3), transparent 70%), radial-gradient(40% 55% at 92% 90%, rgba(20,184,166,0.22), transparent 70%)" }}
          />
          <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8 grid lg:grid-cols-[48%_52%] items-center gap-10 py-12 sm:py-16 lg:py-20">
            <div className="max-w-[540px]">
              <span className="hero-enter inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[var(--color-teal)] mb-6" style={{ "--d": "0ms" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-teal)] shadow-[0_0_10px_2px_rgba(20,184,166,0.7)]" />
                Nosotros
              </span>
              <h1 className="hero-enter text-[2.4rem] leading-[1.07] sm:text-[3.2rem] xl:text-[3.6rem] font-bold tracking-[-0.025em] text-white mb-5 text-balance" style={{ "--d": "90ms" }}>
                Tecnología que{" "}
                <span className="bg-gradient-to-r from-[#5b93ff] to-[var(--color-teal)] bg-clip-text text-transparent">entiende tu negocio.</span>
              </h1>
              <p className="hero-enter text-[17px] sm:text-[18px] text-white/75 leading-[1.65]" style={{ "--d": "180ms" }}>
                En SYNEXA creemos que la tecnología debe ayudarte a crecer, simplificar tu trabajo y
                conectar mejor con tus clientes.
              </p>
            </div>
            <div className="hero-enter relative" style={{ "--d": "200ms" }}>
              <div className="absolute -inset-4 rounded-[2rem] bg-[var(--color-blue)]/20 blur-3xl" />
              <div className="relative aspect-[3/2] rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-2xl shadow-black/50">
                <Image
                  src="/images/nosotros/nosotros-hero.webp"
                  alt="Pantallas y dispositivos mostrando interfaces web sobre un escritorio oscuro"
                  fill
                  sizes="(min-width: 1200px) 600px, (min-width: 1024px) 52vw, 92vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quiénes somos */}
        <section className="py-12 sm:py-14 lg:py-16 bg-white">
          <Container>
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-14 items-start">
              <Reveal>
                <Eyebrow>Quiénes somos</Eyebrow>
                <h2 className="text-[1.9rem] sm:text-[2.4rem] leading-[1.12] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-3 text-balance">
                  Creamos soluciones digitales con propósito.
                </h2>
              </Reveal>
              <Reveal delay={80} className="space-y-4 text-[17px] leading-[1.75] text-[var(--color-gray-dark)]">
                <p>
                  SYNEXA desarrolla páginas web, tiendas online y aplicaciones para negocios que buscan
                  mejorar su presencia digital, organizar sus procesos y aprovechar nuevas oportunidades.
                </p>
                <p>
                  Nuestro enfoque parte por comprender cada necesidad y proponer soluciones claras,
                  funcionales y adaptadas a los objetivos del proyecto.
                </p>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Forma de trabajar */}
        <section className="py-12 sm:py-14 lg:py-16 bg-[var(--color-surface-muted)]">
          <Container>
            <Reveal className="max-w-[640px] mb-8">
              <Eyebrow>Nuestra forma de trabajar</Eyebrow>
              <h2 className="text-[1.75rem] sm:text-[2.25rem] leading-[1.15] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-3 text-balance">
                Tres principios que guían cada proyecto.
              </h2>
            </Reveal>
            <ul className="grid md:grid-cols-3 gap-5 lg:gap-6">
              {PRINCIPLES.map((p, i) => (
                <Reveal key={p.title} as="li" delay={i * 70}>
                  <div className="h-full rounded-2xl border border-[var(--color-border)]/80 bg-white p-6 shadow-[0_1px_2px_rgba(11,31,68,0.04)]">
                    <span className="w-11 h-11 rounded-xl bg-[var(--color-blue)]/[0.09] text-[var(--color-blue)] flex items-center justify-center mb-4">
                      <AppIcon name={p.icon} className="w-5 h-5" />
                    </span>
                    <h3 className="text-lg font-bold text-[var(--color-navy)] mb-2">{p.title}</h3>
                    <p className="text-[15.5px] leading-[1.65] text-[var(--color-gray-dark)]">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>

        {/* Proyectos reales: solo los verificados */}
        {VERIFIED_PROJECTS.length ? (
          <section className="py-12 sm:py-14 lg:py-16 bg-white">
            <Container>
              <Reveal className="max-w-[640px] mb-8">
                <Eyebrow>Nuestros proyectos</Eyebrow>
                <h2 className="text-[1.75rem] sm:text-[2.25rem] leading-[1.15] font-bold tracking-[-0.02em] text-[var(--color-navy)] mt-3 text-balance">
                  Sitios que ya están en línea.
                </h2>
              </Reveal>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {VERIFIED_PROJECTS.map((p) => (
                  <li key={p.id}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-hover group block h-full overflow-hidden rounded-2xl border border-[var(--color-border)]/80 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] focus-visible:ring-offset-2"
                    >
                      <div className="relative aspect-[16/10] bg-[var(--color-navy)]">
                        <Image src={p.image} alt={`Captura del sitio ${p.name}`} fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 46vw, 92vw" className="object-cover object-top" />
                      </div>
                      <div className="p-5">
                        <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-teal-dark)] mb-1">{p.type}</p>
                        <h3 className="text-lg font-bold text-[var(--color-navy)] mb-1.5">{p.name}</h3>
                        <p className="text-[14.5px] leading-[1.6] text-[var(--color-gray-dark)] mb-3">{p.description}</p>
                        <span className="inline-flex items-center gap-2 text-[14.5px] font-semibold text-[var(--color-blue)]">
                          Visitar sitio <IconArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ) : null}

        <CtaSection
          title="¿Tienes un proyecto en mente?"
          description="Conversemos sobre tu idea y exploremos cómo podemos ayudarte."
          primaryAction={{ href: CONTACT_PAGE, label: "Hablemos de tu proyecto" }}
          secondaryAction={{ href: "/servicios-y-precios", label: "Ver servicios y precios" }}
        />
      </main>

      <SiteFooter />
    </div>
  );
}

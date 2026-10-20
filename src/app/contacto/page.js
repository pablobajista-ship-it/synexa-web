import Image from "next/image";
import { auth } from "@/auth";
import { isPortalEnabled } from "@/lib/portal";
import { sanitizeOrigin, sanitizeService, serviceLabel } from "@/lib/contactOptions";
import { CONTACT_EMAIL, HAS_WHATSAPP, WHATSAPP_HREF } from "@/data/contact";
import SiteHeader from "@/components/marketing/SiteHeader";
import SiteFooter from "@/components/marketing/SiteFooter";
import ContactForm from "@/components/ContactForm";
import AppIcon from "@/components/marketing/appIcons";

export const metadata = {
  title: "Contacto",
  description:
    "Cuéntanos qué necesitas: una página web, una tienda online o una solución digital para tu empresa. Conversemos sobre tu proyecto.",
  alternates: { canonical: "/contacto" },
};

export default async function ContactoPage({ searchParams }) {
  const session = await auth();
  const dashboardHref = session?.user?.role === "ADMIN" ? "/admin" : "/dashboard";

  const params = await searchParams;
  const pick = (v) => (Array.isArray(v) ? v[0] : v);
  const service = sanitizeService(pick(params?.servicio));
  const source = sanitizeOrigin(pick(params?.origen));

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader
        isAuthenticated={!!session?.user}
        dashboardHref={dashboardHref}
        portalEnabled={isPortalEnabled()}
      />

      <main className="relative bg-gradient-to-b from-[var(--color-surface-muted)] via-white to-[var(--color-surface-muted)]">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
          style={{
            background:
              "radial-gradient(50% 80% at 10% 0%, rgba(37,99,235,0.10), transparent 70%), radial-gradient(40% 70% at 95% 10%, rgba(20,184,166,0.12), transparent 70%)",
          }}
        />
        <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8 py-10 sm:py-14 lg:py-16 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-start">
          <div className="lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.14em] text-[var(--color-blue)]">
              <span className="w-7 h-px bg-[var(--color-teal)]" />
              Contacto
            </span>
            <h1 className="mt-4 text-[2.2rem] sm:text-[2.9rem] leading-[1.08] font-bold tracking-[-0.025em] text-[var(--color-navy)] text-balance">
              Conversemos sobre tu próximo proyecto.
            </h1>
            <p className="mt-5 text-[17px] leading-[1.7] text-[var(--color-gray-dark)]">
              ¿Quieres crear una página web, una tienda online o una solución digital para tu
              empresa? Cuéntanos qué tienes en mente y te ayudaremos a encontrar el mejor punto
              de partida.
            </p>
            <p className="mt-4 rounded-xl border-l-4 border-[var(--color-teal)] bg-white px-4 py-3 text-[15.5px] font-medium leading-[1.6] text-[var(--color-navy)] shadow-sm">
              No necesitas tener todos los detalles resueltos. Podemos comenzar con una conversación.
            </p>

            <ul className="mt-6 space-y-3 text-[15px] text-[var(--color-gray-dark)]">
              {CONTACT_EMAIL ? (
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-blue)]/10 text-[var(--color-blue)]">
                    <AppIcon name="mail" className="h-[18px] w-[18px]" />
                  </span>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-[var(--color-navy)] hover:text-[var(--color-blue)]">
                    {CONTACT_EMAIL}
                  </a>
                </li>
              ) : null}
              {HAS_WHATSAPP ? (
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-teal)]/15 text-[var(--color-teal-dark)]">
                    <AppIcon name="phone" className="h-[18px] w-[18px]" />
                  </span>
                  <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--color-navy)] hover:text-[var(--color-blue)]">
                    Escríbenos por WhatsApp
                  </a>
                </li>
              ) : null}
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-navy)]/8 text-[var(--color-navy)]">
                  <AppIcon name="shield" className="h-[18px] w-[18px]" />
                </span>
                Usamos tus datos solo para responder tu consulta.
              </li>
            </ul>

            <div className="relative mt-7 hidden lg:block overflow-hidden rounded-2xl shadow-xl shadow-blue-900/15 ring-1 ring-[var(--color-border)]">
              <Image
                src="/images/nosotros/contacto.webp"
                alt="Notebook y teléfono sobre un escritorio oscuro con elementos de interfaz digital"
                width={1000}
                height={800}
                sizes="(min-width: 1024px) 460px, 0px"
                className="h-[230px] w-full object-cover"
              />
            </div>
          </div>

          <div>
            {source || service ? (
              <p className="mb-3 text-[13.5px] text-[var(--color-gray-dark)]">
                {service ? <>Solución seleccionada: <strong className="text-[var(--color-navy)]">{serviceLabel(service)}</strong>. </> : null}
                {source ? <>Referencia: <span className="font-mono text-[12.5px]">{source}</span>. </> : null}
                Puedes cambiarla si quieres.
              </p>
            ) : null}
            <ContactForm initialService={service} source={source} />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

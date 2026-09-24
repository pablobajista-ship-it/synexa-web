import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { auth, isGoogleLoginConfigured } from "@/auth";
import Logo from "@/components/Logo";
import LandingAuth from "@/components/LandingAuth";
import Button from "@/components/ui/Button";
import { IconClock } from "@/components/marketing/icons";
import { isPortalEnabled } from "@/lib/portal";

export function generateMetadata() {
  return {
    title: isPortalEnabled() ? "Iniciar sesión" : "Portal de Clientes",
  };
}

export default async function LoginPage() {
  /* En el sitio público el portal está oculto: no hay base de datos donde
     validar credenciales, así que se muestra un aviso en vez de un
     formulario que fallaría al enviarse. */
  if (!isPortalEnabled()) {
    return <PortalComingSoon />;
  }

  const session = await auth();
  if (session?.user) {
    redirect(session.user.role === "ADMIN" ? "/admin" : "/dashboard");
  }

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-[var(--color-surface-muted)]">
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center text-center mb-8">
            <Link href="/">
              <Logo size={38} />
            </Link>
            <p className="text-sm text-[var(--color-gray-dark)] mt-4">
              Portal de clientes — Centro de Atención y Soporte
            </p>
          </div>

          <LandingAuth googleEnabled={isGoogleLoginConfigured} />

          <p className="text-center mt-5 text-sm text-[var(--color-gray-dark)]">
            <Link href="/" className="font-semibold text-[var(--color-blue)] hover:underline">
              ← Volver al sitio principal
            </Link>
          </p>
        </div>
      </div>

      <PortalShowcase />
    </div>
  );
}

/* Panel fotográfico del login (solo desktop): da contexto de marca sin
   competir con el formulario. */
function PortalShowcase() {
  return (
    <aside className="relative hidden lg:flex items-end overflow-hidden bg-[var(--color-navy)]">
      <Image
        src="/images/heroes/hero-portal.webp"
        alt="Especialista de soporte de SYNEXA atendiendo solicitudes frente a dos monitores"
        fill
        /* El panel se oculta bajo lg: "1px" hace que en mobile el navegador
           elija la variante más chica en vez de la foto completa. */
        sizes="(min-width: 1024px) 50vw, 1px"
        className="object-cover object-[60%_center]"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)] via-[var(--color-navy)]/35 to-transparent" />
      <div
        className="absolute inset-0 mix-blend-overlay opacity-70"
        style={{
          background:
            "linear-gradient(135deg, rgba(37,99,235,0.45), transparent 45%, rgba(20,184,166,0.35))",
        }}
      />

      <div className="relative p-12 xl:p-16 max-w-[560px]">
        <span className="inline-flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.16em] text-[var(--color-teal)] mb-4">
          <span className="w-7 h-px bg-[var(--color-teal)]" />
          Centro de Atención y Soporte
        </span>
        <p className="text-[2rem] xl:text-[2.3rem] leading-[1.15] font-bold tracking-[-0.02em] text-white mb-4 text-balance">
          Tu equipo de soporte, a un mensaje de distancia.
        </p>
        <p className="text-white/72 text-[16px] leading-[1.7]">
          Crea tickets, adjunta archivos y sigue cada respuesta en un solo lugar.
        </p>
      </div>
    </aside>
  );
}

function PortalComingSoon() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--color-navy)] px-6 py-12 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 tech-grid" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(48% 62% at 12% 12%, rgba(37,99,235,0.3), transparent 70%), radial-gradient(42% 58% at 88% 88%, rgba(20,184,166,0.22), transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-md text-center">
        <Link href="/" className="inline-block mb-10">
          <Logo theme="dark" size={42} />
        </Link>

        <span className="w-14 h-14 rounded-2xl bg-[var(--color-teal)]/15 text-[var(--color-teal)] flex items-center justify-center mx-auto mb-7">
          <IconClock className="w-6 h-6" />
        </span>

        <h1 className="text-[1.9rem] sm:text-[2.15rem] leading-[1.18] font-bold tracking-[-0.02em] text-white mb-5 text-balance">
          El Portal de Clientes estará disponible pronto
        </h1>

        <p className="text-white/70 text-[16.5px] leading-[1.7] mb-9">
          Estamos terminando de habilitarlo. Mientras tanto, escríbenos y te
          respondemos directamente por correo.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Button href="mailto:hola@synexa.com" variant="accent" size="lg">
            Escribir a SYNEXA
          </Button>
          <Button href="/" variant="on-dark-outline" size="lg">
            Volver al sitio
          </Button>
        </div>
      </div>
    </div>
  );
}

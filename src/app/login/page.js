import { redirect } from "next/navigation";
import Link from "next/link";
import { auth, isGoogleLoginConfigured } from "@/auth";
import Logo from "@/components/Logo";
import LandingAuth from "@/components/LandingAuth";

export const metadata = { title: "Iniciar sesión" };

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect(session.user.role === "ADMIN" ? "/admin" : "/dashboard");
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--color-surface-muted)] px-6 py-12">
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
  );
}

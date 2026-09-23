import AuthCard from "@/components/AuthCard";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { redirect } from "next/navigation";
import { isPortalEnabled } from "@/lib/portal";

/* Se evalúa por request: si fuera estática, isPortalEnabled() quedaría
   congelada en el HTML generado durante el build. */
export const dynamic = "force-dynamic";

export const metadata = { title: "Recuperar contraseña" };

export default function ForgotPasswordPage() {
  // Sin portal no hay base de datos donde buscar la cuenta.
  if (!isPortalEnabled()) redirect("/login");

  return (
    <AuthCard title="Recuperar contraseña" subtitle="Te enviaremos un enlace para restablecerla.">
      <ForgotPasswordForm />
    </AuthCard>
  );
}

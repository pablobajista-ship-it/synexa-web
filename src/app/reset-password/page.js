import { Suspense } from "react";
import AuthCard from "@/components/AuthCard";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import { redirect } from "next/navigation";
import { isPortalEnabled } from "@/lib/portal";

/* Se evalúa por request: si fuera estática, isPortalEnabled() quedaría
   congelada en el HTML generado durante el build. */
export const dynamic = "force-dynamic";

export const metadata = { title: "Restablecer contraseña" };

export default function ResetPasswordPage() {
  // Sin portal no hay base de datos donde validar el token.
  if (!isPortalEnabled()) redirect("/login");

  return (
    <AuthCard title="Restablecer contraseña" subtitle="Elegí una nueva contraseña para tu cuenta.">
      <Suspense fallback={null}>
        <ResetPasswordForm />
      </Suspense>
    </AuthCard>
  );
}

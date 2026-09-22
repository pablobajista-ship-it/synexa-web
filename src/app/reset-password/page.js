import { Suspense } from "react";
import AuthCard from "@/components/AuthCard";
import ResetPasswordForm from "@/components/ResetPasswordForm";

export const metadata = { title: "Restablecer contraseña" };

export default function ResetPasswordPage() {
  return (
    <AuthCard title="Restablecer contraseña" subtitle="Elegí una nueva contraseña para tu cuenta.">
      <Suspense fallback={null}>
        <ResetPasswordForm />
      </Suspense>
    </AuthCard>
  );
}

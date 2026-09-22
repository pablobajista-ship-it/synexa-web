import AuthCard from "@/components/AuthCard";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export const metadata = { title: "Recuperar contraseña" };

export default function ForgotPasswordPage() {
  return (
    <AuthCard title="Recuperar contraseña" subtitle="Te enviaremos un enlace para restablecerla.">
      <ForgotPasswordForm />
    </AuthCard>
  );
}

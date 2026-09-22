import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { findUserById } from "@/lib/db";
import { formatDate } from "@/lib/ticketDisplay";
import Navbar from "@/components/Navbar";

export const metadata = { title: "Mi cuenta" };

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const user = findUserById(Number(session.user.id));

  const rows = [
    { label: "Nombre", value: `${user.name} ${user.last_name || ""}`.trim() },
    { label: "Correo electrónico", value: user.email },
    { label: "Empresa / negocio", value: user.company || "—" },
    { label: "Teléfono", value: user.phone || "—" },
    { label: "Método de acceso", value: user.provider === "google" ? "Google" : "Email y contraseña" },
    { label: "Cliente desde", value: formatDate(user.created_at) },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar role={session.user.role} userName={session.user.email} />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Mi cuenta</h1>
        <p className="text-slate-500 text-sm mb-8">Datos básicos de tu cuenta.</p>

        <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between px-5 py-4 text-sm">
              <span className="text-slate-500">{r.label}</span>
              <span className="font-semibold text-slate-900">{r.value}</span>
            </div>
          ))}
        </div>

        <p className="text-[12px] text-slate-400 mt-4">
          ¿Necesitás actualizar tus datos? Escribinos a través de un ticket y lo gestionamos por vos.
        </p>
      </main>
    </div>
  );
}

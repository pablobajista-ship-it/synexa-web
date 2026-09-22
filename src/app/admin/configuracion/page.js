import { redirect } from "next/navigation";
import { auth, isGoogleLoginConfigured } from "@/auth";
import Navbar from "@/components/Navbar";

export const metadata = { title: "Configuración" };

export default async function AdminConfigPage() {
  const session = await auth();
  if (!session?.user) redirect("/");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  const rows = [
    { label: "Administrador principal", value: "pablo.bajista@gmail.com" },
    { label: "Base de datos", value: process.env.DATABASE_PATH || "./data/ticketera.db" },
    { label: "Login con Google", value: isGoogleLoginConfigured ? "Configurado" : "No configurado" },
    { label: "Entorno", value: process.env.NODE_ENV },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar role="ADMIN" userName={session.user.email} />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Configuración</h1>
        <p className="text-slate-500 text-sm mb-8">
          Panel básico de configuración. Se irá ampliando cuando el sistema se publique en internet
          (dominio, envío de correos, almacenamiento en la nube, etc.).
        </p>

        <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between px-5 py-4 text-sm">
              <span className="text-slate-500">{r.label}</span>
              <span className="font-semibold text-slate-900">{r.value}</span>
            </div>
          ))}
        </div>

        <p className="text-[12px] text-slate-400 mt-4">
          Las variables sensibles (contraseñas, claves de Google, etc.) se administran en{" "}
          <code className="bg-slate-100 px-1 rounded">.env.local</code>, nunca desde esta pantalla.
        </p>
      </main>
    </div>
  );
}

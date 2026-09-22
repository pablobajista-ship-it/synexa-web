import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { listClients } from "@/lib/db";
import { formatDate } from "@/lib/ticketDisplay";
import Navbar from "@/components/Navbar";

export const metadata = { title: "Clientes" };

export default async function AdminClientsPage() {
  const session = await auth();
  if (!session?.user) redirect("/");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  const clients = listClients();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar role="ADMIN" userName={session.user.email} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Clientes</h1>
        <p className="text-slate-500 text-sm mb-8">{clients.length} clientes registrados.</p>

        {clients.length === 0 ? (
          <p className="text-sm text-slate-400">Todavía no hay clientes registrados.</p>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-6 gap-2 px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-400 border-b border-slate-100">
              <span className="col-span-2">Nombre</span>
              <span>Empresa</span>
              <span>Contacto</span>
              <span>Registro</span>
              <span>Tickets</span>
            </div>
            {clients.map((c) => (
              <div
                key={c.id}
                className="grid sm:grid-cols-6 gap-1 sm:gap-2 px-4 py-3 border-b border-slate-50 last:border-0 text-sm"
              >
                <span className="col-span-2 font-semibold text-slate-900">
                  {c.name} {c.last_name}
                </span>
                <span className="text-slate-500">{c.company || "—"}</span>
                <span className="text-slate-500 break-all">
                  {c.email}
                  {c.phone ? ` · ${c.phone}` : ""}
                </span>
                <span className="text-slate-500">{formatDate(c.created_at)}</span>
                <span className="text-slate-500">
                  {c.ticket_count} ({c.open_ticket_count} abiertos)
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

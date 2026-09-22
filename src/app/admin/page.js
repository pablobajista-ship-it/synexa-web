import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { ticketStats, listAllTickets, listClients } from "@/lib/db";
import Navbar from "@/components/Navbar";
import TicketList from "@/components/TicketList";

export const metadata = { title: "Dashboard admin" };

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  const stats = ticketStats();
  const tickets = listAllTickets();
  const clients = listClients();

  const cards = [
    { label: "Nuevos", value: stats.NUEVO },
    { label: "Abiertos", value: stats.NUEVO + stats.RECIBIDO + stats.EN_REVISION + stats.EN_PROCESO },
    { label: "En proceso", value: stats.EN_PROCESO },
    { label: "Esperando cliente", value: stats.ESPERANDO_CLIENTE },
    { label: "Resueltos", value: stats.RESUELTO },
    { label: "Cerrados", value: stats.CERRADO },
    { label: "Clientes registrados", value: clients.length },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar role="ADMIN" userName={session.user.email} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Vista general de todos los tickets del sistema.</p>
          </div>
          <Link
            href="/admin/tickets"
            className="px-5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-bold text-sm hover:bg-slate-50"
          >
            Ver todos los tickets
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-8">
          {cards.map((c) => (
            <div key={c.label} className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-2xl font-bold text-slate-900">{c.value}</p>
              <p className="text-[12px] text-slate-500">{c.label}</p>
            </div>
          ))}
        </div>

        <h2 className="text-sm font-bold text-slate-900 mb-3">Últimos tickets</h2>
        <TicketList tickets={tickets.slice(0, 10)} isAdmin />
      </main>
    </div>
  );
}

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { ticketStats, listAllTickets, listClients } from "@/lib/db";
import { TICKET_STATUS_LABELS } from "@/lib/db-constants";
import Navbar from "@/components/Navbar";

export const metadata = { title: "Estadísticas" };

export default async function AdminStatsPage() {
  const session = await auth();
  if (!session?.user) redirect("/");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  const stats = ticketStats();
  const tickets = listAllTickets();
  const clients = listClients();

  const byCategory = tickets.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1;
    return acc;
  }, {});
  const topCategories = Object.entries(byCategory).sort((a, b) => b[1] - a[1]).slice(0, 8);

  const byMonth = tickets.reduce((acc, t) => {
    const key = (t.created_at || "").slice(0, 7); // YYYY-MM
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const months = Object.entries(byMonth).sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar role="ADMIN" userName={session.user.email} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Estadísticas</h1>
        <p className="text-slate-500 text-sm mb-8">
          Vista básica sobre {tickets.length} tickets y {clients.length} clientes. Se irá ampliando
          más adelante (tiempos de respuesta, resolución, etc.).
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Tickets por estado</h2>
            <div className="space-y-2">
              {Object.entries(stats).map(([status, count]) => (
                <div key={status} className="flex items-center gap-3 text-sm">
                  <span className="w-40 text-slate-500">{TICKET_STATUS_LABELS[status]}</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--color-blue)]"
                      style={{ width: tickets.length ? `${(count / tickets.length) * 100}%` : "0%" }}
                    />
                  </div>
                  <span className="w-6 text-right font-semibold text-slate-900">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Solicitudes por categoría</h2>
            {topCategories.length === 0 ? (
              <p className="text-sm text-slate-400">Todavía no hay datos.</p>
            ) : (
              <div className="space-y-2">
                {topCategories.map(([category, count]) => (
                  <div key={category} className="flex items-center gap-3 text-sm">
                    <span className="flex-1 text-slate-500 truncate">{category}</span>
                    <span className="font-semibold text-slate-900">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 md:col-span-2">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Tickets por mes</h2>
            {months.length === 0 ? (
              <p className="text-sm text-slate-400">Todavía no hay datos.</p>
            ) : (
              <div className="flex items-end gap-3 h-32">
                {months.map(([month, count]) => {
                  const max = Math.max(...months.map(([, c]) => c));
                  return (
                    <div key={month} className="flex flex-col items-center gap-1 flex-1">
                      <div
                        className="w-full bg-[var(--color-blue)] rounded-t"
                        style={{ height: `${(count / max) * 100}%`, minHeight: 4 }}
                      />
                      <span className="text-[10px] text-slate-400">{month}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

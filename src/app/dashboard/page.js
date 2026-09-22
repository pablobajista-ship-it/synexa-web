import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { listTicketsForUser, ticketStats } from "@/lib/db";
import Navbar from "@/components/Navbar";
import TicketList from "@/components/TicketList";

export const metadata = { title: "Mis tickets" };

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/");
  if (session.user.role === "ADMIN") redirect("/admin");

  const userId = Number(session.user.id);
  const tickets = listTicketsForUser(userId);
  const stats = ticketStats(userId);

  const openCount = stats.NUEVO + stats.RECIBIDO + stats.EN_REVISION + stats.EN_PROCESO;
  const waitingCount = stats.ESPERANDO_CLIENTE;
  const resolvedCount = stats.RESUELTO;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar role="CLIENT" userName={session.user.email} />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Hola, {session.user.name}</h1>
            <p className="text-slate-500 text-sm mt-1">
              Desde aquí puedes revisar tus solicitudes y comunicarte con nuestro equipo.
            </p>
          </div>
          <Link
            href="/tickets/nuevo"
            className="px-5 py-2.5 rounded-lg bg-[var(--color-blue)] text-white font-bold text-sm hover:bg-[var(--color-blue-dark)]"
          >
            + Crear nuevo ticket
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-3xl font-bold text-slate-900">{openCount}</p>
            <p className="text-sm text-slate-500">Tickets abiertos</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-3xl font-bold text-slate-900">{waitingCount}</p>
            <p className="text-sm text-slate-500">Esperando respuesta</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-3xl font-bold text-slate-900">{resolvedCount}</p>
            <p className="text-sm text-slate-500">Tickets resueltos</p>
          </div>
        </div>

        <TicketList tickets={tickets} />
      </main>
    </div>
  );
}

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { listAllTickets } from "@/lib/db";
import Navbar from "@/components/Navbar";
import TicketList from "@/components/TicketList";

export const metadata = { title: "Tickets" };

export default async function AdminTicketsPage() {
  const session = await auth();
  if (!session?.user) redirect("/");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  const tickets = listAllTickets();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar role="ADMIN" userName={session.user.email} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Todos los tickets</h1>
        <p className="text-slate-500 text-sm mb-8">{tickets.length} tickets en total.</p>
        <TicketList tickets={tickets} isAdmin />
      </main>
    </div>
  );
}

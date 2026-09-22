import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  findTicketByNumber,
  findUserById,
  listTicketMessages,
  listTicketAttachments,
} from "@/lib/db";
import { canAccessTicket } from "@/lib/ticketAccess";
import { STATUS_STYLES, PRIORITY_STYLES, formatDate } from "@/lib/ticketDisplay";
import { TICKET_STATUS_LABELS, TICKET_PRIORITY_LABELS } from "@/lib/db-constants";
import Navbar from "@/components/Navbar";
import Badge from "@/components/Badge";
import Conversation from "@/components/Conversation";
import AdminTicketControls from "@/components/AdminTicketControls";

export async function generateMetadata({ params }) {
  const { ticketNumber } = await params;
  return { title: ticketNumber };
}

export default async function TicketDetailPage({ params }) {
  const session = await auth();
  if (!session?.user) redirect("/");

  const { ticketNumber } = await params;
  const ticket = findTicketByNumber(ticketNumber);

  if (!ticket || !canAccessTicket(session, ticket)) {
    notFound();
  }

  const isAdmin = session.user.role === "ADMIN";
  const client = findUserById(ticket.user_id);
  const messages = listTicketMessages(ticket.id, { includeInternal: isAdmin });
  const attachments = listTicketAttachments(ticket.id);

  const attachmentsByMessage = {};
  const ticketLevelAttachments = [];
  for (const a of attachments) {
    if (a.message_id) {
      (attachmentsByMessage[a.message_id] ??= []).push(a);
    } else {
      ticketLevelAttachments.push(a);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar role={session.user.role} userName={session.user.email} />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono font-semibold text-slate-400">{ticket.ticket_number}</span>
            <h1 className="text-xl font-bold text-slate-900 mt-1">{ticket.subject}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge label={TICKET_STATUS_LABELS[ticket.status]} className={STATUS_STYLES[ticket.status]} />
              <Badge label={TICKET_PRIORITY_LABELS[ticket.priority]} className={PRIORITY_STYLES[ticket.priority]} />
              <span className="text-[12px] text-slate-400">{ticket.category}</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-6">
          <div>
            <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
              <dl className="grid sm:grid-cols-2 gap-4 text-sm">
                {ticket.service ? (
                  <div>
                    <dt className="text-[12px] font-semibold text-slate-400">Proyecto / servicio</dt>
                    <dd className="text-slate-700">{ticket.service}</dd>
                  </div>
                ) : null}
                {ticket.url ? (
                  <div>
                    <dt className="text-[12px] font-semibold text-slate-400">URL relacionada</dt>
                    <dd className="text-slate-700 break-all">{ticket.url}</dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-[12px] font-semibold text-slate-400">Creado</dt>
                  <dd className="text-slate-700">{formatDate(ticket.created_at)}</dd>
                </div>
                <div>
                  <dt className="text-[12px] font-semibold text-slate-400">Última actualización</dt>
                  <dd className="text-slate-700">{formatDate(ticket.updated_at)}</dd>
                </div>
                {isAdmin ? (
                  <div className="sm:col-span-2">
                    <dt className="text-[12px] font-semibold text-slate-400">Cliente</dt>
                    <dd className="text-slate-700">
                      {client.name} {client.last_name} · {client.email}
                      {client.company ? ` · ${client.company}` : ""}
                    </dd>
                  </div>
                ) : null}
              </dl>

              <p className="text-sm text-slate-700 whitespace-pre-wrap mt-4 pt-4 border-t border-slate-100">
                {ticket.description}
              </p>

              {ticketLevelAttachments.length ? (
                <div className="flex flex-wrap gap-2 mt-4">
                  {ticketLevelAttachments.map((a) => (
                    <a
                      key={a.id}
                      href={`/api/attachments/${a.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
                    >
                      📎 {a.original_name}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>

            <Conversation
              ticketNumber={ticket.ticket_number}
              messages={messages}
              attachmentsByMessage={attachmentsByMessage}
              isAdmin={isAdmin}
            />
          </div>

          {isAdmin ? (
            <div>
              <AdminTicketControls
                ticketNumber={ticket.ticket_number}
                status={ticket.status}
                priority={ticket.priority}
                category={ticket.category}
              />
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

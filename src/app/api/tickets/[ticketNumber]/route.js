import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { findTicketByNumber, updateTicketFields, TICKET_STATUS, TICKET_PRIORITY, TICKET_CATEGORIES } from "@/lib/db";
import { canAccessTicket } from "@/lib/ticketAccess";

export async function PATCH(request, { params }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado." }, { status: 403 });
  }

  const { ticketNumber } = await params;
  const ticket = findTicketByNumber(ticketNumber);
  if (!ticket || !canAccessTicket(session, ticket)) {
    return NextResponse.json({ error: "Ticket no encontrado." }, { status: 404 });
  }

  const body = await request.json();
  const fields = {};

  if (body.status !== undefined) {
    if (!Object.values(TICKET_STATUS).includes(body.status)) {
      return NextResponse.json({ error: "Estado inválido." }, { status: 400 });
    }
    fields.status = body.status;
  }
  if (body.priority !== undefined) {
    if (!Object.values(TICKET_PRIORITY).includes(body.priority)) {
      return NextResponse.json({ error: "Prioridad inválida." }, { status: 400 });
    }
    fields.priority = body.priority;
  }
  if (body.category !== undefined) {
    if (!TICKET_CATEGORIES.includes(body.category)) {
      return NextResponse.json({ error: "Categoría inválida." }, { status: 400 });
    }
    fields.category = body.category;
  }

  const updated = updateTicketFields(ticket.id, fields);
  return NextResponse.json({ ticket: updated });
}

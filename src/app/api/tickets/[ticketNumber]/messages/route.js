import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  findTicketByNumber,
  addTicketMessage,
  addAttachment,
  findUserById,
  updateTicketFields,
  TICKET_STATUS,
} from "@/lib/db";
import { canAccessTicket } from "@/lib/ticketAccess";
import { saveUploadedFile, UploadError } from "@/lib/uploads";
import { notifyNewReplyToClient, notifyNewReplyToAdmin } from "@/services/notifications";

const MAX_FILES = 5;

export async function POST(request, { params }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { ticketNumber } = await params;
  const ticket = findTicketByNumber(ticketNumber);
  if (!ticket || !canAccessTicket(session, ticket)) {
    return NextResponse.json({ error: "Ticket no encontrado." }, { status: 404 });
  }

  const formData = await request.formData();
  const message = formData.get("message")?.toString().trim();
  const isInternal = session.user.role === "ADMIN" && formData.get("isInternal") === "true";

  if (!message) {
    return NextResponse.json({ error: "Escribí una respuesta." }, { status: 400 });
  }

  const files = formData.getAll("attachments").filter((f) => f instanceof File && f.size > 0);
  if (files.length > MAX_FILES) {
    return NextResponse.json(
      { error: `Podés adjuntar como máximo ${MAX_FILES} archivos.` },
      { status: 400 }
    );
  }

  const created = addTicketMessage(ticket.id, Number(session.user.id), message, isInternal);

  try {
    for (const file of files) {
      const saved = await saveUploadedFile(file, ticket.ticket_number);
      addAttachment({
        ticketId: ticket.id,
        messageId: created.id,
        originalName: saved.originalName,
        storedName: saved.storedName,
        mimeType: saved.mimeType,
        size: saved.size,
        filePath: saved.filePath,
      });
    }
  } catch (err) {
    if (err instanceof UploadError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }

  // Si el cliente responde a un ticket que estaba esperando su respuesta, lo reactivamos.
  if (session.user.role !== "ADMIN" && ticket.status === TICKET_STATUS.ESPERANDO_CLIENTE) {
    updateTicketFields(ticket.id, { status: TICKET_STATUS.EN_PROCESO });
  }

  const client = findUserById(ticket.user_id);
  if (session.user.role === "ADMIN") {
    notifyNewReplyToClient(ticket, client);
  } else {
    notifyNewReplyToAdmin(ticket, client);
  }

  return NextResponse.json({ ok: true });
}

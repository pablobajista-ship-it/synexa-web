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
import { saveUploadedFile, validateUploadedFile, UploadError } from "@/lib/uploads";
import { notifyNewReplyToClient, notifyNewReplyToAdmin } from "@/services/notifications";
import { isPortalEnabled, portalDisabledResponse } from "@/lib/portal";

const MAX_FILES = 5;

export async function POST(request, { params }) {
  if (!isPortalEnabled()) return portalDisabledResponse();

  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { ticketNumber } = await params;
  const ticket = await findTicketByNumber(ticketNumber);
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

  try {
    files.forEach(validateUploadedFile);
  } catch (err) {
    if (err instanceof UploadError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }

  const created = await addTicketMessage(ticket.id, Number(session.user.id), message, isInternal);

  for (const file of files) {
    const saved = await saveUploadedFile(file, ticket.ticket_number);
    await addAttachment({
      ticketId: ticket.id,
      messageId: created.id,
      originalName: saved.originalName,
      storedName: saved.storedName,
      mimeType: saved.mimeType,
      size: saved.size,
      filePath: saved.filePath,
    });
  }

  // Si el cliente responde a un ticket que estaba esperando su respuesta, lo reactivamos.
  if (session.user.role !== "ADMIN" && ticket.status === TICKET_STATUS.ESPERANDO_CLIENTE) {
    await updateTicketFields(ticket.id, { status: TICKET_STATUS.EN_PROCESO });
  }

  // Las notas internas no se notifican: el cliente no puede verlas.
  if (!isInternal) {
    const client = await findUserById(ticket.user_id);
    if (session.user.role === "ADMIN") {
      await notifyNewReplyToClient(ticket, client, message);
    } else {
      await notifyNewReplyToAdmin(ticket, client, message);
    }
  }

  return NextResponse.json({ ok: true });
}

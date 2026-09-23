import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  createTicket,
  listTicketsForUser,
  listAllTickets,
  addAttachment,
  findUserById,
  TICKET_CATEGORIES,
  TICKET_PRIORITY,
} from "@/lib/db";
import { saveUploadedFile, UploadError } from "@/lib/uploads";
import { notifyTicketCreatedToClient, notifyTicketCreatedToAdmin } from "@/services/notifications";
import { isPortalEnabled, portalDisabledResponse } from "@/lib/portal";

const URL_RE = /^https?:\/\/[^\s]+\.[^\s]+$/i;
const MAX_FILES = 5;

export async function GET() {
  if (!isPortalEnabled()) return portalDisabledResponse();

  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const tickets =
    session.user.role === "ADMIN" ? listAllTickets() : listTicketsForUser(Number(session.user.id));

  return NextResponse.json({ tickets });
}

export async function POST(request) {
  if (!isPortalEnabled()) return portalDisabledResponse();

  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const formData = await request.formData();

  const subject = formData.get("subject")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const category = formData.get("category")?.toString().trim();
  const service = formData.get("service")?.toString().trim();
  const url = formData.get("url")?.toString().trim();
  const priority = formData.get("priority")?.toString().trim() || TICKET_PRIORITY.NORMAL;
  const preferredContact = formData.get("preferredContact")?.toString().trim();
  const device = formData.get("device")?.toString().trim();
  const operatingSystem = formData.get("operatingSystem")?.toString().trim();
  const browser = formData.get("browser")?.toString().trim();
  const errorMessage = formData.get("errorMessage")?.toString().trim();
  const stepsBeforeError = formData.get("stepsBeforeError")?.toString().trim();

  const errors = {};
  if (!subject) errors.subject = "El asunto es obligatorio.";
  if (!description) errors.description = "Contanos qué necesitás.";
  if (!category || !TICKET_CATEGORIES.includes(category)) {
    errors.category = "Elegí una categoría válida.";
  }
  if (!Object.values(TICKET_PRIORITY).includes(priority)) {
    errors.priority = "Prioridad inválida.";
  }
  if (url && !URL_RE.test(url)) {
    errors.url = "La URL no es válida.";
  }

  const files = formData.getAll("attachments").filter((f) => f instanceof File && f.size > 0);
  if (files.length > MAX_FILES) {
    errors.attachments = `Podés adjuntar como máximo ${MAX_FILES} archivos.`;
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const ticket = createTicket(Number(session.user.id), {
    subject,
    description,
    category,
    service: service || null,
    url: url || null,
    priority,
    preferredContact: preferredContact || undefined,
    device: device || null,
    operatingSystem: operatingSystem || null,
    browser: browser || null,
    errorMessage: errorMessage || null,
    stepsBeforeError: stepsBeforeError || null,
  });

  try {
    for (const file of files) {
      const saved = await saveUploadedFile(file, ticket.ticket_number);
      addAttachment({
        ticketId: ticket.id,
        messageId: null,
        originalName: saved.originalName,
        storedName: saved.storedName,
        mimeType: saved.mimeType,
        size: saved.size,
        filePath: saved.filePath,
      });
    }
  } catch (err) {
    if (err instanceof UploadError) {
      return NextResponse.json({ errors: { attachments: err.message } }, { status: 400 });
    }
    throw err;
  }

  const client = findUserById(Number(session.user.id));
  notifyTicketCreatedToClient(ticket, client);
  notifyTicketCreatedToAdmin(ticket, client);

  return NextResponse.json({ ok: true, ticketNumber: ticket.ticket_number });
}

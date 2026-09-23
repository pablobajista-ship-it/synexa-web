import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { findAttachmentById, findTicketById } from "@/lib/db";
import { canAccessTicket } from "@/lib/ticketAccess";
import { readUploadedFile } from "@/lib/uploads";
import { isPortalEnabled, portalDisabledResponse } from "@/lib/portal";

export async function GET(request, { params }) {
  if (!isPortalEnabled()) return portalDisabledResponse();

  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { id } = await params;
  const attachmentId = Number(id);
  const attachment = Number.isInteger(attachmentId) ? await findAttachmentById(attachmentId) : null;
  if (!attachment) {
    return NextResponse.json({ error: "Archivo no encontrado." }, { status: 404 });
  }

  const ticket = await findTicketById(attachment.ticket_id);
  if (!canAccessTicket(session, ticket)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 403 });
  }

  const buffer = await readUploadedFile(attachment.path);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": attachment.mime_type,
      "Content-Disposition": `inline; filename="${encodeURIComponent(attachment.original_name)}"`,
      "Cache-Control": "private, max-age=0, no-cache",
    },
  });
}

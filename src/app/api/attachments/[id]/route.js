import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import { auth } from "@/auth";
import { findAttachmentById, findTicketById } from "@/lib/db";
import { canAccessTicket } from "@/lib/ticketAccess";
import { resolveUploadPath } from "@/lib/uploads";
import { isPortalEnabled, portalDisabledResponse } from "@/lib/portal";

export async function GET(request, { params }) {
  if (!isPortalEnabled()) return portalDisabledResponse();

  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { id } = await params;
  const attachment = findAttachmentById(Number(id));
  if (!attachment) {
    return NextResponse.json({ error: "Archivo no encontrado." }, { status: 404 });
  }

  const ticket = findTicketById(attachment.ticket_id);
  if (!canAccessTicket(session, ticket)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 403 });
  }

  const buffer = await fs.readFile(resolveUploadPath(attachment.path));

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": attachment.mime_type,
      "Content-Disposition": `inline; filename="${encodeURIComponent(attachment.original_name)}"`,
      "Cache-Control": "private, max-age=0, no-cache",
    },
  });
}

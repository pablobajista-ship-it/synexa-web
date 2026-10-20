import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { INQUIRY_STATUS } from "@/lib/contactOptions";
import { updateInquiryStatus, deleteInquiry } from "@/lib/db";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return null;
  return session;
}

const deny = () => NextResponse.json({ error: "No autorizado." }, { status: 403 });

export async function PATCH(request, { params }) {
  const session = await requireAdmin();
  if (!session) return deny();
  const id = Number((await params).id);
  const body = await request.json().catch(() => ({}));
  if (!Number.isInteger(id) || !Object.hasOwn(INQUIRY_STATUS, body.status)) {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }
  const note = String(body.note ?? "").trim().slice(0, 500);
  const row = await updateInquiryStatus(id, body.status, Number(session.user.id), note);
  if (!row) return NextResponse.json({ error: "No encontrada." }, { status: 404 });
  return NextResponse.json({ inquiry: row });
}

export async function DELETE(_request, { params }) {
  if (!(await requireAdmin())) return deny();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  const ok = await deleteInquiry(id);
  return NextResponse.json({ ok }, { status: ok ? 200 : 404 });
}

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { purgeClosedInquiries } from "@/lib/db";

/** Retención: DELETE /api/admin/consultas?meses=24 borra las CERRADAS con más de N meses. */
export async function DELETE(request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado." }, { status: 403 });
  }
  const months = Number(new URL(request.url).searchParams.get("meses"));
  if (!Number.isInteger(months) || months < 1 || months > 120) {
    return NextResponse.json({ error: "Indica un número de meses entre 1 y 120." }, { status: 400 });
  }
  return NextResponse.json({ deleted: await purgeClosedInquiries(months) });
}

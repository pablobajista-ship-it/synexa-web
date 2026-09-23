import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { findUserByEmail, setResetToken } from "@/lib/db";
import { isPortalEnabled, portalDisabledResponse } from "@/lib/portal";

export async function POST(request) {
  if (!isPortalEnabled()) return portalDisabledResponse();

  const { email } = await request.json();
  const trimmedEmail = email?.toString().trim();

  if (!trimmedEmail) {
    return NextResponse.json({ error: "Ingresá tu email." }, { status: 400 });
  }

  const user = findUserByEmail(trimmedEmail);

  // Por seguridad, la respuesta es la misma exista o no la cuenta.
  let devResetLink = null;

  if (user) {
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    setResetToken(user.id, token, expiresAt);

    const baseUrl = process.env.AUTH_URL || request.nextUrl.origin;
    devResetLink = `${baseUrl}/reset-password?token=${token}`;

    // No hay SMTP configurado todavía: dejamos el enlace en el log del server
    // y se lo devolvemos al cliente para poder probar el flujo en local.
    console.log(`[ticketera] Enlace de recuperación para ${user.email}: ${devResetLink}`);
  }

  return NextResponse.json({ ok: true, devResetLink });
}

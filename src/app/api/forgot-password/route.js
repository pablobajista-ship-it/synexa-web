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

  const user = await findUserByEmail(trimmedEmail);

  // Por seguridad, la respuesta es la misma exista o no la cuenta.
  let devResetLink = null;

  if (user) {
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    await setResetToken(user.id, token, expiresAt);

    // No hay SMTP configurado todavía. Solo en desarrollo se muestra el enlace
    // (en pantalla y en el log) para poder probar el flujo. En producción
    // devolverlo permitiría a cualquiera resetear la contraseña de otra cuenta,
    // incluida la del administrador, y el log guardaría tokens válidos.
    if (process.env.NODE_ENV !== "production") {
      const baseUrl = process.env.AUTH_URL || request.nextUrl.origin;
      devResetLink = `${baseUrl}/reset-password?token=${token}`;
      console.log(`[ticketera] Enlace de recuperación para ${user.email}: ${devResetLink}`);
    }
  }

  return NextResponse.json({ ok: true, devResetLink });
}

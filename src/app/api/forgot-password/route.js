import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { findUserByEmail, setResetToken } from "@/lib/db";
import { isPortalEnabled, portalDisabledResponse } from "@/lib/portal";
import { notifyPasswordReset } from "@/services/notifications";

export async function POST(request) {
  if (!isPortalEnabled()) return portalDisabledResponse();

  const { email } = await request.json();
  const trimmedEmail = email?.toString().trim().toLowerCase();

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

    const isProduction = process.env.NODE_ENV === "production";
    // En producción el enlace se arma solo con AUTH_URL: usar el host de la
    // petición permitiría a un atacante hacer que el correo apunte a su dominio.
    const baseUrl = (process.env.AUTH_URL || (isProduction ? "" : request.nextUrl.origin)).replace(/\/$/, "");
    const resetUrl = `${baseUrl}/reset-password?token=${token}`;

    if (baseUrl) {
      await notifyPasswordReset(user, resetUrl);
    } else {
      console.error("[ticketera] AUTH_URL no está definida: no se envió el correo de recuperación.");
    }

    // Solo en desarrollo se muestra el enlace en pantalla, para probar el flujo
    // sin correo. En producción devolverlo permitiría a cualquiera resetear la
    // contraseña de otra cuenta, incluida la del administrador.
    if (!isProduction) {
      devResetLink = resetUrl;
      console.log(`[ticketera] Enlace de recuperación para ${user.email}: ${devResetLink}`);
    }
  }

  return NextResponse.json({ ok: true, devResetLink });
}

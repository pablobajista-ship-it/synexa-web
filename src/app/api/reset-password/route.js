import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { findUserByValidResetToken, resetPassword } from "@/lib/db";
import { isPortalEnabled, portalDisabledResponse } from "@/lib/portal";

export async function POST(request) {
  if (!isPortalEnabled()) return portalDisabledResponse();

  const { token, password } = await request.json();

  if (!token) {
    return NextResponse.json({ error: "Falta el token." }, { status: 400 });
  }
  if (!password || password.length < 8) {
    return NextResponse.json(
      { error: "La contraseña debe tener al menos 8 caracteres." },
      { status: 400 }
    );
  }

  const user = findUserByValidResetToken(token);
  if (!user) {
    return NextResponse.json(
      { error: "El enlace es inválido o expiró. Pedí uno nuevo." },
      { status: 400 }
    );
  }

  resetPassword(user.id, bcrypt.hashSync(password, 10));

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { findUserByEmail, createUser } from "@/lib/db";
import { isPortalEnabled, portalDisabledResponse } from "@/lib/portal";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  if (!isPortalEnabled()) return portalDisabledResponse();

  const body = await request.json();
  const name = body.name?.toString().trim();
  const lastName = body.lastName?.toString().trim();
  const company = body.company?.toString().trim();
  const email = body.email?.toString().trim().toLowerCase();
  const phone = body.phone?.toString().trim();
  const password = body.password?.toString();
  const passwordConfirm = body.passwordConfirm?.toString();

  const errors = {};
  if (!name) errors.name = "El nombre es obligatorio.";
  if (!lastName) errors.lastName = "El apellido es obligatorio.";
  if (!email || !EMAIL_RE.test(email)) errors.email = "Ingresá un email válido.";
  if (!password || password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres.";
  } else if (password !== passwordConfirm) {
    errors.passwordConfirm = "Las contraseñas no coinciden.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  if (await findUserByEmail(email)) {
    return NextResponse.json(
      { errors: { email: "Ya existe una cuenta con ese email." } },
      { status: 409 }
    );
  }

  const user = await createUser({
    name,
    lastName,
    email,
    phone: phone || null,
    company: company || null,
    passwordHash: bcrypt.hashSync(password, 10),
  });

  return NextResponse.json({ ok: true, email: user.email });
}

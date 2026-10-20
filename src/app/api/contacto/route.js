import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { validateInquiry, serviceLabel } from "@/lib/contactOptions";
import { createInquiry, countRecentInquiriesByIp, countRecentInquiriesByEmail } from "@/lib/db";
import { notifyInquiryToAdmin } from "@/services/notifications";

/**
 * POST /api/contacto — recibe una consulta comercial.
 *
 * Capas anti-spam, sin servicios externos: campo trampa (honeypot), tiempo
 * mínimo de llenado, límite por IP y por correo (se cuenta en la base, así
 * funciona aunque cada petición caiga en una función serverless distinta) y
 * validación completa en el servidor. La IP solo se guarda como hash con sal.
 */
const MAX_BODY = 20_000;
const MIN_FILL_MS = 3_000;
const IP_LIMIT = { count: 5, minutes: 60 };
const EMAIL_LIMIT = { count: 3, minutes: 60 };

const json = (body, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

function clientIp(request) {
  const h = request.headers;
  return (
    h.get("x-nf-client-connection-ip") ||
    h.get("x-forwarded-for")?.split(",")[0].trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

const hashIp = (ip) =>
  createHash("sha256").update(`${process.env.AUTH_SECRET || "synexa"}:${ip}`).digest("hex");

export async function POST(request) {
  if (!process.env.DATABASE_URL) {
    console.error("[contacto] DATABASE_URL no está definida: no se pueden guardar consultas.");
    return json({ error: "El formulario no está disponible por ahora. Intenta de nuevo más tarde." }, 503);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY) return json({ error: "La consulta es demasiado larga." }, 413);

  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Solicitud inválida." }, 400);
  }

  // Honeypot / tiempo mínimo: se responde como si hubiera funcionado para no
  // dar pistas al bot, pero no se guarda ni se notifica nada.
  const tooFast = !(Number(body.elapsedMs) >= MIN_FILL_MS);
  if (body.website || tooFast) return json({ ok: true });

  const { values, errors } = validateInquiry(body);
  if (Object.keys(errors).length) return json({ error: "Revisa los campos marcados.", errors }, 422);

  try {
    const ipHash = hashIp(clientIp(request));
    const [byIp, byEmail] = await Promise.all([
      countRecentInquiriesByIp(ipHash, IP_LIMIT.minutes),
      countRecentInquiriesByEmail(values.email, EMAIL_LIMIT.minutes),
    ]);
    if (byIp >= IP_LIMIT.count || byEmail >= EMAIL_LIMIT.count) {
      return json({ error: "Recibimos varias consultas seguidas. Espera un momento antes de enviar otra." }, 429);
    }

    const inquiry = await createInquiry({ ...values, ipHash });
    await notifyInquiryToAdmin(inquiry, serviceLabel(inquiry.service));
    return json({ ok: true }, 201);
  } catch (err) {
    console.error("[contacto] no se pudo guardar la consulta:", err.message);
    return json({ error: "No pudimos registrar tu consulta. Inténtalo de nuevo en unos minutos." }, 500);
  }
}

import nodemailer from "nodemailer";

/**
 * Capa de notificaciones por correo (SMTP vía nodemailer).
 *
 * Con SMTP_HOST/SMTP_USER/SMTP_PASS definidos envía correos reales (hoy Gmail
 * con contraseña de aplicación; para pasar a Resend, Brevo u otro proveedor
 * basta cambiar esas variables). Sin SMTP configurado solo registra en consola,
 * así el desarrollo local funciona sin credenciales.
 *
 * Las funciones esperan el envío (en serverless, un envío "en segundo plano" se
 * corta cuando la función responde) pero nunca lanzan: un correo que falla no
 * debe hacer fallar la creación de un ticket o una respuesta.
 */

const APP_NAME = "SYNEXA";

function appUrl() {
  return (process.env.AUTH_URL || "http://localhost:3000").replace(/\/$/, "");
}

function adminNotifyEmail() {
  return process.env.ADMIN_NOTIFY_EMAIL || process.env.ADMIN_EMAIL;
}

function getTransport() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  const globalForMail = globalThis;
  if (!globalForMail.__ticketeraMail) {
    const port = Number(process.env.SMTP_PORT || 465);
    globalForMail.__ticketeraMail = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  return globalForMail.__ticketeraMail;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function excerpt(text, max = 400) {
  const clean = String(text ?? "").trim();
  return clean.length > max ? `${clean.slice(0, max)}…` : clean;
}

// Plantilla mínima con los colores de marca. `lines` son párrafos de texto
// plano: se escapan acá, así ningún dato del cliente se interpreta como HTML.
function renderEmail({ title, lines, cta }) {
  const paragraphs = lines
    .filter(Boolean)
    .map((line) => `<p style="margin:0 0 14px;line-height:1.5">${escapeHtml(line).replace(/\n/g, "<br>")}</p>`)
    .join("");
  const button = cta
    ? `<p style="margin:24px 0"><a href="${escapeHtml(cta.url)}" style="background:#2563EB;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:600;display:inline-block">${escapeHtml(cta.label)}</a></p>`
    : "";

  const html = `<!doctype html><html><body style="margin:0;background:#F3F4F6;font-family:Inter,Segoe UI,Arial,sans-serif;color:#374151">
<div style="max-width:560px;margin:0 auto;padding:24px 16px">
  <div style="background:#0B1F44;color:#fff;padding:16px 24px;border-radius:12px 12px 0 0;font-weight:700;letter-spacing:.5px">${APP_NAME}</div>
  <div style="background:#fff;padding:24px;border-radius:0 0 12px 12px">
    <h1 style="margin:0 0 16px;font-size:18px;color:#0B1F44">${escapeHtml(title)}</h1>
    ${paragraphs}${button}
    <p style="margin:24px 0 0;font-size:12px;color:#6B7280">Este es un mensaje automático del Centro de Soporte de ${APP_NAME}. Para responder, usa el enlace del ticket.</p>
  </div>
</div></body></html>`;

  const text = [title, "", ...lines.filter(Boolean), cta ? `\n${cta.label}: ${cta.url}` : ""].join("\n");
  return { html, text };
}

async function send(event, { to, subject, title, lines, cta, replyTo }) {
  if (!to) {
    console.warn(`[notifications] ${event}: sin destinatario, no se envía.`);
    return;
  }

  const transport = getTransport();
  if (!transport) {
    console.log(`[notifications] ${event} (SMTP no configurado)`, { to, subject });
    return;
  }

  const { html, text } = renderEmail({ title, lines, cta });
  try {
    await transport.sendMail({
      from: process.env.MAIL_FROM || `${APP_NAME} Soporte <${process.env.SMTP_USER}>`,
      to,
      replyTo,
      // El asunto incluye texto del cliente: sin saltos de línea en el header.
      subject: subject.replace(/[\r\n]+/g, " "),
      html,
      text,
    });
  } catch (err) {
    console.error(`[notifications] ${event}: no se pudo enviar el correo:`, err.message);
  }
}

const clientName = (client) => [client?.name, client?.last_name].filter(Boolean).join(" ");
const ticketUrl = (ticket) => `${appUrl()}/tickets/${ticket.ticket_number}`;

export async function notifyTicketCreatedToClient(ticket, client) {
  await send("ticket_created_client", {
    to: client?.email,
    subject: `Hemos recibido tu solicitud ${ticket.ticket_number}`,
    title: `Recibimos tu solicitud ${ticket.ticket_number}`,
    lines: [
      `Hola ${client?.name || ""},`.trim(),
      `Tu ticket "${ticket.subject}" quedó registrado. Te avisaremos por este medio cuando tengamos novedades.`,
    ],
    cta: { label: "Ver mi ticket", url: ticketUrl(ticket) },
  });
}

export async function notifyTicketCreatedToAdmin(ticket, client) {
  await send("ticket_created_admin", {
    to: adminNotifyEmail(),
    replyTo: client?.email,
    subject: `Nuevo ticket ${ticket.ticket_number}: ${ticket.subject}`,
    title: `Nuevo ticket ${ticket.ticket_number}`,
    lines: [
      `Cliente: ${clientName(client)} <${client?.email}>${client?.company ? ` · ${client.company}` : ""}`,
      `Categoría: ${ticket.category} · Prioridad: ${ticket.priority}`,
      `Asunto: ${ticket.subject}`,
      excerpt(ticket.description),
    ],
    cta: { label: "Abrir ticket", url: ticketUrl(ticket) },
  });
}

export async function notifyNewReplyToClient(ticket, client, message) {
  await send("ticket_reply_client", {
    to: client?.email,
    subject: `Nueva respuesta en tu ticket ${ticket.ticket_number}`,
    title: `Tienes una nueva respuesta en ${ticket.ticket_number}`,
    lines: [
      `Hola ${client?.name || ""},`.trim(),
      `El equipo de ${APP_NAME} respondió tu ticket "${ticket.subject}":`,
      excerpt(message),
    ],
    cta: { label: "Ver la conversación", url: ticketUrl(ticket) },
  });
}

export async function notifyNewReplyToAdmin(ticket, client, message) {
  await send("ticket_reply_admin", {
    to: adminNotifyEmail(),
    replyTo: client?.email,
    subject: `${clientName(client) || "El cliente"} respondió el ticket ${ticket.ticket_number}`,
    title: `Respuesta del cliente en ${ticket.ticket_number}`,
    lines: [`${clientName(client)} <${client?.email}> escribió:`, excerpt(message)],
    cta: { label: "Abrir ticket", url: ticketUrl(ticket) },
  });
}

export async function notifyPasswordReset(user, resetUrl) {
  await send("password_reset", {
    to: user?.email,
    subject: `Recupera tu contraseña de ${APP_NAME}`,
    title: "Recuperación de contraseña",
    lines: [
      `Hola ${user?.name || ""},`.trim(),
      "Recibimos una solicitud para cambiar la contraseña de tu cuenta. El enlace es válido por 1 hora y se puede usar una sola vez.",
      "Si no fuiste tú, ignora este correo: tu contraseña no cambiará.",
    ],
    cta: { label: "Crear nueva contraseña", url: resetUrl },
  });
}

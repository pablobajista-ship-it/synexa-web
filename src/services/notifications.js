/**
 * Capa de notificaciones. Hoy solo registra en consola; más adelante se
 * conecta acá un proveedor real (Resend, SMTP, Gmail API, etc.) sin tocar
 * los componentes ni las rutas API que la llaman.
 */

function send(event, payload) {
  console.log(`[notifications] ${event}`, payload);
}

export function notifyTicketCreatedToClient(ticket, client) {
  send("ticket_created_client", {
    to: client.email,
    subject: `Hemos recibido tu solicitud ${ticket.ticket_number}`,
  });
}

export function notifyTicketCreatedToAdmin(ticket, client) {
  send("ticket_created_admin", {
    subject: `Nuevo ticket recibido: ${ticket.ticket_number}`,
    from: client.email,
  });
}

export function notifyNewReplyToClient(ticket, client) {
  send("ticket_reply_client", {
    to: client.email,
    subject: `Hay una nueva respuesta en tu ticket ${ticket.ticket_number}`,
  });
}

export function notifyNewReplyToAdmin(ticket, client) {
  send("ticket_reply_admin", {
    subject: `El cliente respondió el ticket ${ticket.ticket_number}`,
    from: client.email,
  });
}

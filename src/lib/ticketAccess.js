export function canAccessTicket(session, ticket) {
  if (!session?.user || !ticket) return false;
  if (session.user.role === "ADMIN") return true;
  return ticket.user_id === Number(session.user.id);
}

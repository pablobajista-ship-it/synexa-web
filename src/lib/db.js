import postgres from "postgres";
import bcrypt from "bcryptjs";
import {
  ROLES,
  TICKET_STATUS,
  TICKET_PRIORITY,
  PREFERRED_CONTACT,
} from "@/lib/db-constants";

export * from "@/lib/db-constants";

// Conexión a Postgres (Supabase). DATABASE_URL debe apuntar al pooler en modo
// transacción (puerto 6543): cada función serverless abre pocas conexiones y el
// pooler las reparte. Ese modo no admite prepared statements, de ahí
// `prepare: false`. El esquema vive en supabase/migrations/ (npm run db:migrate).
function openSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("[ticketera] DATABASE_URL no está definida.");
  }
  return postgres(url, { prepare: false, max: 3, idle_timeout: 20 });
}

// En desarrollo, el hot reload vuelve a evaluar este módulo: se guarda la
// conexión en globalThis para no abrir un pool nuevo en cada recarga.
const globalForDb = globalThis;

export function getSql() {
  if (!globalForDb.__ticketeraSql) {
    globalForDb.__ticketeraSql = openSql();
  }
  return globalForDb.__ticketeraSql;
}

// Las páginas y formatDate() esperan fechas como texto ISO (así las devolvía
// SQLite); postgres las entrega como Date.
function plain(row) {
  if (!row) return undefined;
  const out = {};
  for (const [key, value] of Object.entries(row)) {
    out[key] = value instanceof Date ? value.toISOString() : value;
  }
  return out;
}

const plainAll = (rows) => rows.map(plain);

async function ensureAdmin(sql) {
  // El correo del administrador se configura por entorno para no dejar datos
  // personales en el código (este repositorio es público).
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!adminEmail) {
    console.warn(
      "[ticketera] ADMIN_EMAIL no está definida: el usuario administrador no se creó todavía."
    );
    return;
  }

  const [existing] = await sql`SELECT id FROM users WHERE email = ${adminEmail}`;
  if (existing) return;

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || adminPassword === "CAMBIAR_PASSWORD") {
    console.warn(
      "[ticketera] ADMIN_PASSWORD no está definida: el usuario administrador no se creó todavía."
    );
    return;
  }

  await sql`
    INSERT INTO users (name, last_name, email, password_hash, role, provider)
    VALUES (
      ${process.env.ADMIN_NAME || "Administrador"},
      ${process.env.ADMIN_LAST_NAME || ""},
      ${adminEmail},
      ${bcrypt.hashSync(adminPassword, 10)},
      ${ROLES.ADMIN},
      'credentials'
    )
    ON CONFLICT (email) DO NOTHING
  `;

  console.log(`[ticketera] Usuario administrador creado: ${adminEmail}`);
}

// Devuelve la conexión, asegurando (una vez por proceso) que exista el admin.
async function db() {
  const sql = getSql();
  if (!globalForDb.__ticketeraAdminReady) {
    globalForDb.__ticketeraAdminReady = ensureAdmin(sql).catch((err) => {
      globalForDb.__ticketeraAdminReady = undefined;
      throw err;
    });
  }
  await globalForDb.__ticketeraAdminReady;
  return sql;
}

// ---------- Users ----------

export async function findUserByEmail(email) {
  const sql = await db();
  const [row] = await sql`SELECT * FROM users WHERE email = ${email}`;
  return plain(row);
}

export async function findUserById(id) {
  const sql = await db();
  const [row] = await sql`SELECT * FROM users WHERE id = ${id}`;
  return plain(row);
}

export async function findUserByGoogleId(googleId) {
  const sql = await db();
  const [row] = await sql`SELECT * FROM users WHERE google_id = ${googleId}`;
  return plain(row);
}

export async function createUser({ name, lastName, email, phone, company, passwordHash, provider = "credentials" }) {
  const sql = await db();
  const [row] = await sql`
    INSERT INTO users (name, last_name, email, phone, company, password_hash, provider, role)
    VALUES (${name}, ${lastName ?? ""}, ${email}, ${phone ?? null}, ${company ?? null},
            ${passwordHash ?? null}, ${provider}, 'CLIENT')
    RETURNING *
  `;
  return plain(row);
}

export async function createUserFromGoogle({ name, email, googleId, image }) {
  const sql = await db();
  const [row] = await sql`
    INSERT INTO users (name, email, google_id, image, provider, role)
    VALUES (${name}, ${email}, ${googleId}, ${image ?? null}, 'google', 'CLIENT')
    RETURNING *
  `;
  return plain(row);
}

export async function linkGoogleAccount(userId, { googleId, image }) {
  const sql = await db();
  await sql`
    UPDATE users SET google_id = ${googleId}, image = COALESCE(${image ?? null}, image), updated_at = now()
    WHERE id = ${userId}
  `;
}

export async function setResetToken(userId, token, expiresAt) {
  const sql = await db();
  await sql`
    UPDATE users SET reset_token = ${token}, reset_token_expires_at = ${expiresAt}, updated_at = now()
    WHERE id = ${userId}
  `;
}

export async function findUserByValidResetToken(token) {
  const sql = await db();
  const [row] = await sql`
    SELECT * FROM users WHERE reset_token = ${token} AND reset_token_expires_at > now()
  `;
  return plain(row);
}

export async function resetPassword(userId, passwordHash) {
  const sql = await db();
  await sql`
    UPDATE users
    SET password_hash = ${passwordHash}, reset_token = NULL, reset_token_expires_at = NULL, updated_at = now()
    WHERE id = ${userId}
  `;
}

export async function listClients() {
  const sql = await db();
  const rows = await sql`
    SELECT u.*,
      (SELECT COUNT(*)::int FROM tickets t WHERE t.user_id = u.id) AS ticket_count,
      (SELECT COUNT(*)::int FROM tickets t WHERE t.user_id = u.id
         AND t.status NOT IN ('CERRADO','CANCELADO','RESUELTO')) AS open_ticket_count
    FROM users u WHERE u.role = 'CLIENT' ORDER BY u.created_at DESC
  `;
  return plainAll(rows);
}

// ---------- Tickets ----------

export async function createTicket(userId, data) {
  const sql = await db();

  // Número correlativo y alta del ticket en una misma transacción: el upsert
  // sobre `counters` es atómico, así que dos tickets simultáneos nunca reciben
  // el mismo número.
  const row = await sql.begin(async (tx) => {
    const [counter] = await tx`
      INSERT INTO counters (name, value) VALUES ('ticket_number', 1)
      ON CONFLICT (name) DO UPDATE SET value = counters.value + 1
      RETURNING value
    `;
    const ticketNumber = `SW-${String(counter.value).padStart(6, "0")}`;

    const [ticket] = await tx`
      INSERT INTO tickets (
        ticket_number, user_id, subject, description, category, service, url,
        priority, status, preferred_contact, device, operating_system, browser,
        error_message, steps_before_error
      ) VALUES (
        ${ticketNumber}, ${userId}, ${data.subject}, ${data.description}, ${data.category},
        ${data.service ?? null}, ${data.url ?? null}, ${data.priority ?? TICKET_PRIORITY.NORMAL},
        'NUEVO', ${data.preferredContact ?? PREFERRED_CONTACT.TICKET}, ${data.device ?? null},
        ${data.operatingSystem ?? null}, ${data.browser ?? null}, ${data.errorMessage ?? null},
        ${data.stepsBeforeError ?? null}
      )
      RETURNING *
    `;
    return ticket;
  });

  return plain(row);
}

export async function findTicketById(id) {
  const sql = await db();
  const [row] = await sql`SELECT * FROM tickets WHERE id = ${id}`;
  return plain(row);
}

export async function findTicketByNumber(ticketNumber) {
  const sql = await db();
  const [row] = await sql`SELECT * FROM tickets WHERE ticket_number = ${ticketNumber}`;
  return plain(row);
}

export async function listTicketsForUser(userId) {
  const sql = await db();
  const rows = await sql`SELECT * FROM tickets WHERE user_id = ${userId} ORDER BY created_at DESC`;
  return plainAll(rows);
}

export async function listAllTickets() {
  const sql = await db();
  const rows = await sql`
    SELECT t.*, u.name AS client_name, u.last_name AS client_last_name,
           u.company AS client_company, u.email AS client_email
    FROM tickets t JOIN users u ON u.id = t.user_id
    ORDER BY t.created_at DESC
  `;
  return plainAll(rows);
}

export async function updateTicketFields(ticketId, fields) {
  const allowed = ["status", "priority", "category"];
  const changes = {};

  for (const key of allowed) {
    if (fields[key] !== undefined) changes[key] = fields[key];
  }
  if (Object.keys(changes).length === 0) return findTicketById(ticketId);

  const now = new Date();
  changes.updated_at = now;
  if (fields.status === TICKET_STATUS.CERRADO) changes.closed_at = now;

  const sql = await db();
  const [row] = await sql`
    UPDATE tickets SET ${sql(changes)} WHERE id = ${ticketId} RETURNING *
  `;
  return plain(row);
}

export async function ticketStats(userId = null) {
  const sql = await db();
  const rows = userId
    ? await sql`SELECT status, COUNT(*)::int AS count FROM tickets WHERE user_id = ${userId} GROUP BY status`
    : await sql`SELECT status, COUNT(*)::int AS count FROM tickets GROUP BY status`;

  const stats = Object.fromEntries(Object.keys(TICKET_STATUS).map((s) => [s, 0]));
  for (const row of rows) stats[row.status] = row.count;
  return stats;
}

// ---------- Messages ----------

export async function addTicketMessage(ticketId, userId, message, isInternal = false) {
  const sql = await db();
  const row = await sql.begin(async (tx) => {
    const [created] = await tx`
      INSERT INTO ticket_messages (ticket_id, user_id, message, is_internal)
      VALUES (${ticketId}, ${userId}, ${message}, ${isInternal})
      RETURNING *
    `;
    await tx`UPDATE tickets SET updated_at = now() WHERE id = ${ticketId}`;
    return created;
  });
  return plain(row);
}

export async function listTicketMessages(ticketId, { includeInternal = false } = {}) {
  const sql = await db();
  const rows = await sql`
    SELECT m.*, u.name AS user_name, u.last_name AS user_last_name, u.role AS user_role
    FROM ticket_messages m JOIN users u ON u.id = m.user_id
    WHERE m.ticket_id = ${ticketId}
      ${includeInternal ? sql`` : sql`AND m.is_internal = false`}
    ORDER BY m.created_at ASC
  `;
  return plainAll(rows);
}

// ---------- Attachments ----------

export async function addAttachment({ ticketId, messageId, originalName, storedName, mimeType, size, filePath }) {
  const sql = await db();
  const [row] = await sql`
    INSERT INTO attachments (ticket_id, message_id, original_name, stored_name, mime_type, size, path)
    VALUES (${ticketId}, ${messageId ?? null}, ${originalName}, ${storedName}, ${mimeType}, ${size}, ${filePath})
    RETURNING *
  `;
  return plain(row);
}

export async function listTicketAttachments(ticketId) {
  const sql = await db();
  const rows = await sql`SELECT * FROM attachments WHERE ticket_id = ${ticketId}`;
  return plainAll(rows);
}

export async function findAttachmentById(id) {
  const sql = await db();
  const [row] = await sql`SELECT * FROM attachments WHERE id = ${id}`;
  return plain(row);
}

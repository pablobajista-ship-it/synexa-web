import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import path from "node:path";
import fs from "node:fs";
import {
  ROLES,
  TICKET_STATUS,
  TICKET_PRIORITY,
  PREFERRED_CONTACT,
} from "@/lib/db-constants";

const DB_PATH = process.env.DATABASE_PATH || "./data/ticketera.db";

export * from "@/lib/db-constants";

function openDb() {
  const resolved = path.resolve(process.cwd(), DB_PATH);
  fs.mkdirSync(path.dirname(resolved), { recursive: true });

  const db = new Database(resolved);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      last_name TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL UNIQUE,
      phone TEXT,
      company TEXT,
      password_hash TEXT,
      role TEXT NOT NULL DEFAULT 'CLIENT',
      image TEXT,
      provider TEXT NOT NULL DEFAULT 'credentials',
      google_id TEXT UNIQUE,
      reset_token TEXT UNIQUE,
      reset_token_expires_at TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ticket_number TEXT NOT NULL UNIQUE,
      user_id INTEGER NOT NULL REFERENCES users(id),
      subject TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      service TEXT,
      url TEXT,
      priority TEXT NOT NULL DEFAULT 'NORMAL',
      status TEXT NOT NULL DEFAULT 'NUEVO',
      preferred_contact TEXT NOT NULL DEFAULT 'A través de este ticket',
      device TEXT,
      operating_system TEXT,
      browser TEXT,
      error_message TEXT,
      steps_before_error TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      closed_at TEXT
    );

    CREATE TABLE IF NOT EXISTS ticket_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ticket_id INTEGER NOT NULL REFERENCES tickets(id),
      user_id INTEGER NOT NULL REFERENCES users(id),
      message TEXT NOT NULL,
      is_internal INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS attachments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ticket_id INTEGER NOT NULL REFERENCES tickets(id),
      message_id INTEGER REFERENCES ticket_messages(id),
      original_name TEXT NOT NULL,
      stored_name TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      size INTEGER NOT NULL,
      path TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS counters (
      name TEXT PRIMARY KEY,
      value INTEGER NOT NULL
    );
  `);

  seedAdmin(db);

  return db;
}

function seedAdmin(db) {
  const adminEmail = "pablo.bajista@gmail.com";
  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(adminEmail);
  if (existing) return;

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || adminPassword === "CAMBIAR_PASSWORD") {
    console.warn(
      "[ticketera] ADMIN_PASSWORD no está definida en .env.local: el usuario administrador no se creó todavía."
    );
    return;
  }

  db.prepare(
    `INSERT INTO users (name, last_name, email, password_hash, role, provider)
     VALUES (?, ?, ?, ?, ?, 'credentials')`
  ).run("Pablo", "Bajista", adminEmail, bcrypt.hashSync(adminPassword, 10), ROLES.ADMIN);

  console.log(`[ticketera] Usuario administrador creado: ${adminEmail}`);
}

let dbInstance;

export function getDb() {
  if (!dbInstance) {
    dbInstance = openDb();
  }
  return dbInstance;
}

// ---------- Users ----------

export function findUserByEmail(email) {
  return getDb().prepare("SELECT * FROM users WHERE email = ?").get(email);
}

export function findUserById(id) {
  return getDb().prepare("SELECT * FROM users WHERE id = ?").get(id);
}

export function findUserByGoogleId(googleId) {
  return getDb().prepare("SELECT * FROM users WHERE google_id = ?").get(googleId);
}

export function createUser({ name, lastName, email, phone, company, passwordHash, provider = "credentials" }) {
  const result = getDb()
    .prepare(
      `INSERT INTO users (name, last_name, email, phone, company, password_hash, provider, role)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'CLIENT')`
    )
    .run(name, lastName ?? "", email, phone ?? null, company ?? null, passwordHash ?? null, provider);
  return findUserById(result.lastInsertRowid);
}

export function createUserFromGoogle({ name, email, googleId, image }) {
  const result = getDb()
    .prepare(
      `INSERT INTO users (name, email, google_id, image, provider, role)
       VALUES (?, ?, ?, ?, 'google', 'CLIENT')`
    )
    .run(name, email, googleId, image ?? null);
  return findUserById(result.lastInsertRowid);
}

export function linkGoogleAccount(userId, { googleId, image }) {
  getDb()
    .prepare("UPDATE users SET google_id = ?, image = COALESCE(?, image), updated_at = ? WHERE id = ?")
    .run(googleId, image ?? null, new Date().toISOString(), userId);
}

export function setResetToken(userId, token, expiresAt) {
  getDb()
    .prepare("UPDATE users SET reset_token = ?, reset_token_expires_at = ?, updated_at = ? WHERE id = ?")
    .run(token, expiresAt, new Date().toISOString(), userId);
}

export function findUserByValidResetToken(token) {
  return getDb()
    .prepare("SELECT * FROM users WHERE reset_token = ? AND reset_token_expires_at > ?")
    .get(token, new Date().toISOString());
}

export function resetPassword(userId, passwordHash) {
  getDb()
    .prepare(
      "UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expires_at = NULL, updated_at = ? WHERE id = ?"
    )
    .run(passwordHash, new Date().toISOString(), userId);
}

export function listClients() {
  return getDb()
    .prepare(
      `SELECT u.*,
        (SELECT COUNT(*) FROM tickets t WHERE t.user_id = u.id) AS ticket_count,
        (SELECT COUNT(*) FROM tickets t WHERE t.user_id = u.id AND t.status NOT IN ('CERRADO','CANCELADO','RESUELTO')) AS open_ticket_count
       FROM users u WHERE u.role = 'CLIENT' ORDER BY u.created_at DESC`
    )
    .all();
}

// ---------- Tickets ----------

function nextTicketNumber(db) {
  const row = db.prepare("SELECT value FROM counters WHERE name = 'ticket_number'").get();
  const next = (row?.value ?? 0) + 1;

  if (row) {
    db.prepare("UPDATE counters SET value = ? WHERE name = 'ticket_number'").run(next);
  } else {
    db.prepare("INSERT INTO counters (name, value) VALUES ('ticket_number', ?)").run(next);
  }

  return `SW-${String(next).padStart(6, "0")}`;
}

export function createTicket(userId, data) {
  const db = getDb();
  const ticketNumber = nextTicketNumber(db);

  const result = db
    .prepare(
      `INSERT INTO tickets (
        ticket_number, user_id, subject, description, category, service, url,
        priority, status, preferred_contact, device, operating_system, browser,
        error_message, steps_before_error
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'NUEVO', ?, ?, ?, ?, ?, ?)`
    )
    .run(
      ticketNumber,
      userId,
      data.subject,
      data.description,
      data.category,
      data.service ?? null,
      data.url ?? null,
      data.priority ?? TICKET_PRIORITY.NORMAL,
      data.preferredContact ?? PREFERRED_CONTACT.TICKET,
      data.device ?? null,
      data.operatingSystem ?? null,
      data.browser ?? null,
      data.errorMessage ?? null,
      data.stepsBeforeError ?? null
    );

  return findTicketById(result.lastInsertRowid);
}

export function findTicketById(id) {
  return getDb().prepare("SELECT * FROM tickets WHERE id = ?").get(id);
}

export function findTicketByNumber(ticketNumber) {
  return getDb().prepare("SELECT * FROM tickets WHERE ticket_number = ?").get(ticketNumber);
}

export function listTicketsForUser(userId) {
  return getDb()
    .prepare("SELECT * FROM tickets WHERE user_id = ? ORDER BY created_at DESC")
    .all(userId);
}

export function listAllTickets() {
  return getDb()
    .prepare(
      `SELECT t.*, u.name AS client_name, u.last_name AS client_last_name,
              u.company AS client_company, u.email AS client_email
       FROM tickets t JOIN users u ON u.id = t.user_id
       ORDER BY t.created_at DESC`
    )
    .all();
}

export function updateTicketFields(ticketId, fields) {
  const allowed = ["status", "priority", "category"];
  const sets = [];
  const values = [];

  for (const key of allowed) {
    if (fields[key] !== undefined) {
      sets.push(`${key} = ?`);
      values.push(fields[key]);
    }
  }
  if (sets.length === 0) return findTicketById(ticketId);

  sets.push("updated_at = ?");
  values.push(new Date().toISOString());

  if (fields.status === TICKET_STATUS.CERRADO) {
    sets.push("closed_at = ?");
    values.push(new Date().toISOString());
  }

  values.push(ticketId);
  getDb().prepare(`UPDATE tickets SET ${sets.join(", ")} WHERE id = ?`).run(...values);
  return findTicketById(ticketId);
}

export function ticketStats(userId = null) {
  const db = getDb();
  const where = userId ? "WHERE user_id = ?" : "";
  const params = userId ? [userId] : [];

  const rows = db
    .prepare(`SELECT status, COUNT(*) AS count FROM tickets ${where} GROUP BY status`)
    .all(...params);

  const stats = Object.fromEntries(Object.keys(TICKET_STATUS).map((s) => [s, 0]));
  for (const row of rows) stats[row.status] = row.count;
  return stats;
}

// ---------- Messages ----------

export function addTicketMessage(ticketId, userId, message, isInternal = false) {
  const result = getDb()
    .prepare(
      "INSERT INTO ticket_messages (ticket_id, user_id, message, is_internal) VALUES (?, ?, ?, ?)"
    )
    .run(ticketId, userId, message, isInternal ? 1 : 0);

  getDb()
    .prepare("UPDATE tickets SET updated_at = ? WHERE id = ?")
    .run(new Date().toISOString(), ticketId);

  return getDb().prepare("SELECT * FROM ticket_messages WHERE id = ?").get(result.lastInsertRowid);
}

export function listTicketMessages(ticketId, { includeInternal = false } = {}) {
  const query = includeInternal
    ? "SELECT m.*, u.name AS user_name, u.last_name AS user_last_name, u.role AS user_role FROM ticket_messages m JOIN users u ON u.id = m.user_id WHERE m.ticket_id = ? ORDER BY m.created_at ASC"
    : "SELECT m.*, u.name AS user_name, u.last_name AS user_last_name, u.role AS user_role FROM ticket_messages m JOIN users u ON u.id = m.user_id WHERE m.ticket_id = ? AND m.is_internal = 0 ORDER BY m.created_at ASC";

  return getDb().prepare(query).all(ticketId);
}

// ---------- Attachments ----------

export function addAttachment({ ticketId, messageId, originalName, storedName, mimeType, size, filePath }) {
  const result = getDb()
    .prepare(
      `INSERT INTO attachments (ticket_id, message_id, original_name, stored_name, mime_type, size, path)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run(ticketId, messageId ?? null, originalName, storedName, mimeType, size, filePath);

  return getDb().prepare("SELECT * FROM attachments WHERE id = ?").get(result.lastInsertRowid);
}

export function listTicketAttachments(ticketId) {
  return getDb().prepare("SELECT * FROM attachments WHERE ticket_id = ?").all(ticketId);
}

export function findAttachmentById(id) {
  return getDb().prepare("SELECT * FROM attachments WHERE id = ?").get(id);
}

// Seed de datos de desarrollo: administrador + clientes ficticios + tickets de ejemplo.
// Uso: npm run seed
// Las contraseñas de prueba se toman de variables de entorno, nunca están escritas aquí.
require("dotenv").config({ path: ".env.local" });

const path = require("node:path");
const fs = require("node:fs");
const bcrypt = require("bcryptjs");
const Database = require("better-sqlite3");

const DB_PATH = process.env.DATABASE_PATH || "./data/ticketera.db";
const resolved = path.resolve(process.cwd(), DB_PATH);
fs.mkdirSync(path.dirname(resolved), { recursive: true });

const db = new Database(resolved);
db.pragma("journal_mode = WAL");

// Debe coincidir con el esquema de src/lib/db.js
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
    device TEXT, operating_system TEXT, browser TEXT,
    error_message TEXT, steps_before_error TEXT,
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
    original_name TEXT NOT NULL, stored_name TEXT NOT NULL,
    mime_type TEXT NOT NULL, size INTEGER NOT NULL, path TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS counters (name TEXT PRIMARY KEY, value INTEGER NOT NULL);
`);

const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
if (!adminEmail) {
  console.error("ADMIN_EMAIL no está definida en .env.local. Abortando seed.");
  process.exit(1);
}
const adminPassword = process.env.ADMIN_PASSWORD;
if (!adminPassword || adminPassword === "CAMBIAR_PASSWORD") {
  console.error("ADMIN_PASSWORD no está definida en .env.local. Abortando seed.");
  process.exit(1);
}
if (!db.prepare("SELECT id FROM users WHERE email = ?").get(adminEmail)) {
  db.prepare(
    "INSERT INTO users (name, last_name, email, password_hash, role, provider) VALUES (?,?,?,?,?,'credentials')"
  ).run(
    process.env.ADMIN_NAME || "Administrador",
    process.env.ADMIN_LAST_NAME || "",
    adminEmail,
    bcrypt.hashSync(adminPassword, 10),
    "ADMIN"
  );
  console.log(`Administrador creado: ${adminEmail}`);
} else {
  console.log(`Administrador ya existía: ${adminEmail}`);
}

const seedClientPassword = process.env.SEED_CLIENT_PASSWORD;
if (!seedClientPassword) {
  console.error(
    "SEED_CLIENT_PASSWORD no está definida en .env.local. Agregala para poder crear clientes de prueba. Abortando seed de clientes/tickets."
  );
  process.exit(0);
}

const demoClients = [
  { name: "Marta", lastName: "Reyes", email: "marta.reyes@clientedemo.local", company: "Panadería La Espiga" },
  { name: "Jorge", lastName: "Fuentes", email: "jorge.fuentes@clientedemo.local", company: "Ferretería Fuentes" },
];

const clientIds = [];
for (const c of demoClients) {
  let row = db.prepare("SELECT id FROM users WHERE email = ?").get(c.email);
  if (!row) {
    const result = db
      .prepare(
        "INSERT INTO users (name, last_name, email, company, password_hash, role, provider) VALUES (?,?,?,?,?,'CLIENT','credentials')"
      )
      .run(c.name, c.lastName, c.email, c.company, bcrypt.hashSync(seedClientPassword, 10));
    row = { id: result.lastInsertRowid };
    console.log(`Cliente de prueba creado: ${c.email}`);
  }
  clientIds.push(row.id);
}

function nextTicketNumber() {
  const row = db.prepare("SELECT value FROM counters WHERE name = 'ticket_number'").get();
  const next = (row?.value ?? 0) + 1;
  if (row) db.prepare("UPDATE counters SET value = ? WHERE name = 'ticket_number'").run(next);
  else db.prepare("INSERT INTO counters (name, value) VALUES ('ticket_number', ?)").run(next);
  return `SW-${String(next).padStart(6, "0")}`;
}

const existingTickets = db.prepare("SELECT COUNT(*) AS c FROM tickets").get().c;
if (existingTickets === 0) {
  const sampleTickets = [
    {
      userId: clientIds[0],
      subject: "No puedo ingresar al panel de administración",
      description: "Desde ayer me sale 'contraseña incorrecta' aunque la escribo bien.",
      category: "Problema de acceso",
      priority: "ALTA",
      status: "EN_PROCESO",
    },
    {
      userId: clientIds[0],
      subject: "Actualizar horario de atención en la web",
      description: "Necesito cambiar el horario que aparece en la página de inicio.",
      category: "Actualización de contenido",
      priority: "BAJA",
      status: "NUEVO",
    },
    {
      userId: clientIds[1],
      subject: "Cotización para tienda online",
      description: "Quisiera cotizar una tienda online para vender productos de ferretería.",
      category: "Cotización de nuevo proyecto",
      priority: "NORMAL",
      status: "RECIBIDO",
    },
  ];

  for (const t of sampleTickets) {
    const ticketNumber = nextTicketNumber();
    const result = db
      .prepare(
        `INSERT INTO tickets (ticket_number, user_id, subject, description, category, priority, status)
         VALUES (?,?,?,?,?,?,?)`
      )
      .run(ticketNumber, t.userId, t.subject, t.description, t.category, t.priority, t.status);

    db.prepare(
      "INSERT INTO ticket_messages (ticket_id, user_id, message, is_internal) VALUES (?,?,?,0)"
    ).run(result.lastInsertRowid, t.userId, t.description);

    console.log(`Ticket de prueba creado: ${ticketNumber}`);
  }
} else {
  console.log("Ya existían tickets, no se crean tickets de ejemplo.");
}

console.log("Seed completo.");

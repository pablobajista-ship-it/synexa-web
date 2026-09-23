// Seed de datos de desarrollo: administrador + clientes ficticios + tickets de ejemplo.
// Uso: npm run seed   (requiere haber corrido antes npm run db:migrate)
// Las contraseñas de prueba se toman de variables de entorno, nunca están escritas aquí.
require("dotenv").config({ path: ".env.local" });

const bcrypt = require("bcryptjs");
const postgres = require("postgres");

async function main(sql) {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!adminEmail) {
    console.error("ADMIN_EMAIL no está definida en .env.local. Abortando seed.");
    process.exitCode = 1;
    return;
  }
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || adminPassword === "CAMBIAR_PASSWORD") {
    console.error("ADMIN_PASSWORD no está definida en .env.local. Abortando seed.");
    process.exitCode = 1;
    return;
  }

  const [admin] = await sql`SELECT id FROM users WHERE email = ${adminEmail}`;
  if (!admin) {
    await sql`
      INSERT INTO users (name, last_name, email, password_hash, role, provider)
      VALUES (${process.env.ADMIN_NAME || "Administrador"}, ${process.env.ADMIN_LAST_NAME || ""},
              ${adminEmail}, ${bcrypt.hashSync(adminPassword, 10)}, 'ADMIN', 'credentials')
    `;
    console.log(`Administrador creado: ${adminEmail}`);
  } else {
    console.log(`Administrador ya existía: ${adminEmail}`);
  }

  const seedClientPassword = process.env.SEED_CLIENT_PASSWORD;
  if (!seedClientPassword) {
    console.error(
      "SEED_CLIENT_PASSWORD no está definida en .env.local. Agregala para poder crear clientes de prueba. Abortando seed de clientes/tickets."
    );
    return;
  }

  const demoClients = [
    { name: "Marta", lastName: "Reyes", email: "marta.reyes@clientedemo.local", company: "Panadería La Espiga" },
    { name: "Jorge", lastName: "Fuentes", email: "jorge.fuentes@clientedemo.local", company: "Ferretería Fuentes" },
  ];

  const clientIds = [];
  for (const c of demoClients) {
    let [row] = await sql`SELECT id FROM users WHERE email = ${c.email}`;
    if (!row) {
      [row] = await sql`
        INSERT INTO users (name, last_name, email, company, password_hash, role, provider)
        VALUES (${c.name}, ${c.lastName}, ${c.email}, ${c.company},
                ${bcrypt.hashSync(seedClientPassword, 10)}, 'CLIENT', 'credentials')
        RETURNING id
      `;
      console.log(`Cliente de prueba creado: ${c.email}`);
    }
    clientIds.push(row.id);
  }

  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM tickets`;
  if (count > 0) {
    console.log("Ya existían tickets, no se crean tickets de ejemplo.");
    return;
  }

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
    await sql.begin(async (tx) => {
      const [counter] = await tx`
        INSERT INTO counters (name, value) VALUES ('ticket_number', 1)
        ON CONFLICT (name) DO UPDATE SET value = counters.value + 1
        RETURNING value
      `;
      const ticketNumber = `SW-${String(counter.value).padStart(6, "0")}`;
      const [ticket] = await tx`
        INSERT INTO tickets (ticket_number, user_id, subject, description, category, priority, status)
        VALUES (${ticketNumber}, ${t.userId}, ${t.subject}, ${t.description}, ${t.category}, ${t.priority}, ${t.status})
        RETURNING id
      `;
      await tx`
        INSERT INTO ticket_messages (ticket_id, user_id, message, is_internal)
        VALUES (${ticket.id}, ${t.userId}, ${t.description}, false)
      `;
      console.log(`Ticket de prueba creado: ${ticketNumber}`);
    });
  }
}

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL no está definida en .env.local. Abortando seed.");
  process.exit(1);
}

const sql = postgres(process.env.DATABASE_URL, { prepare: false, max: 1 });
main(sql)
  .then(() => console.log("Seed completo."))
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => sql.end());

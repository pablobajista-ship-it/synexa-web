// Aplica las migraciones SQL de supabase/migrations/ en orden alfabético.
// Uso: npm run db:migrate
// Registra cada archivo aplicado en la tabla schema_migrations para no volver a
// correrlo. Usa DATABASE_URL de .env.local (o del entorno).
require("dotenv").config({ path: ".env.local" });

const fs = require("node:fs");
const path = require("node:path");
const postgres = require("postgres");

const MIGRATIONS_DIR = path.join(__dirname, "..", "supabase", "migrations");

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL no está definida en .env.local. Abortando.");
    process.exit(1);
  }

  const sql = postgres(process.env.DATABASE_URL, { prepare: false, max: 1 });

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        name text PRIMARY KEY,
        applied_at timestamptz NOT NULL DEFAULT now()
      )
    `;
    await sql`ALTER TABLE schema_migrations ENABLE ROW LEVEL SECURITY`;

    const applied = new Set((await sql`SELECT name FROM schema_migrations`).map((r) => r.name));
    const files = fs.readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith(".sql")).sort();

    for (const file of files) {
      if (applied.has(file)) {
        console.log(`= ${file} (ya aplicada)`);
        continue;
      }
      const content = fs.readFileSync(path.join(MIGRATIONS_DIR, file), "utf8");
      await sql.begin(async (tx) => {
        await tx.unsafe(content);
        await tx`INSERT INTO schema_migrations (name) VALUES (${file})`;
      });
      console.log(`+ ${file}`);
    }

    console.log("Migraciones al día.");
  } finally {
    await sql.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

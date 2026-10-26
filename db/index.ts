import { Pool } from "pg";
import type { Registration as StoredRegistration } from "../lib/rsvp-filters";

// One pool per server process; reused across requests (and across hot reloads in dev).
const globalForDb = globalThis as unknown as { pgPool?: Pool; schemaReady?: Promise<void> };

function getPool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Attach a Postgres database to this service.");
  }
  globalForDb.pgPool ??= new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });
  return globalForDb.pgPool;
}

// Creates the registrations table on first use, so no separate migration step is needed.
function ensureSchema(pool: Pool): Promise<void> {
  globalForDb.schemaReady ??= pool
    .query(
      `CREATE TABLE IF NOT EXISTS registrations (
        id         uuid        PRIMARY KEY,
        name       text        NOT NULL,
        company    text        NOT NULL,
        phone      text        NOT NULL UNIQUE,
        spa        text        NOT NULL CHECK (spa IN ('yes', 'no')),
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )`,
    )
    .then(() => undefined)
    .catch((error) => {
      globalForDb.schemaReady = undefined;
      throw error;
    });
  return globalForDb.schemaReady;
}

export type Registration = { name: string; company: string; phone: string; spa: "yes" | "no" };

// Same behaviour as the original D1 version: one RSVP per phone number, re-submitting updates it.
export async function saveRegistration(r: Registration): Promise<void> {
  const pool = getPool();
  await ensureSchema(pool);
  await pool.query(
    `INSERT INTO registrations (id, name, company, phone, spa)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (phone) DO UPDATE
       SET name = EXCLUDED.name, company = EXCLUDED.company, spa = EXCLUDED.spa, updated_at = now()`,
    [crypto.randomUUID(), r.name, r.company, r.phone, r.spa],
  );
}

// Newest first, matching the original organiser dashboard ordering.
export async function listRegistrations(): Promise<StoredRegistration[]> {
  const pool = getPool();
  await ensureSchema(pool);
  const { rows } = await pool.query<{ id: string; name: string; company: string; phone: string; spa: "yes" | "no"; created_at: Date }>(
    "SELECT id, name, company, phone, spa, created_at FROM registrations ORDER BY created_at DESC, id DESC",
  );
  return rows.map(r => ({ id: r.id, name: r.name, company: r.company, phone: r.phone, spa: r.spa, createdAt: r.created_at.toISOString() }));
}

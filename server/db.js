import pg from "pg";
import { requireEnv } from "./env.js";

// Hosted providers (Neon, Supabase, Render, ...) need SSL; local Postgres does not.
//   DATABASE_SSL=true       encrypted, and the server certificate is verified (recommended)
//   DATABASE_SSL_CA=...     PEM certificate of the provider's CA, for providers that
//                           use their own CA (e.g. Supabase); implies DATABASE_SSL=true
//   DATABASE_SSL=no-verify  encrypted but NOT verified; only if nothing else works,
//                           since it allows the connection to be intercepted
function sslOptions() {
  const mode = process.env.DATABASE_SSL;
  // Env vars often hold the PEM on one line with literal "\n" sequences.
  const ca = process.env.DATABASE_SSL_CA?.replace(/\\n/g, "\n");
  if (ca) return { rejectUnauthorized: true, ca };
  if (mode === "true") return { rejectUnauthorized: true };
  if (mode === "no-verify") return { rejectUnauthorized: false };
  return undefined;
}
const ssl = sslOptions();

export const pool = new pg.Pool({
  connectionString: requireEnv("DATABASE_URL"),
  ssl,
  max: 5,
});

export const query = (text, params) => pool.query(text, params);

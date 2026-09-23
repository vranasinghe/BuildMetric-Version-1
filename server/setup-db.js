// Creates the tables and the admin account.
// Usage: npm run db:setup
// Re-running is safe; it also resets the admin password to ADMIN_PASSWORD.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcryptjs";
import { requireEnv } from "./env.js";
import { pool } from "./db.js";

const here = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const schema = await fs.readFile(path.join(here, "schema.sql"), "utf8");
  await pool.query(schema);
  console.log("Tables are ready.");

  const email = requireEnv("ADMIN_EMAIL").trim().toLowerCase();
  const password = requireEnv("ADMIN_PASSWORD");
  if (password.length < 8) {
    throw new Error("ADMIN_PASSWORD must be at least 8 characters.");
  }
  const name = process.env.ADMIN_NAME || "BuildMetric Administrator";
  const hash = await bcrypt.hash(password, 12);

  await pool.query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES ($1, $2, $3, 'admin')
     ON CONFLICT (email) DO UPDATE
       SET role = 'admin', password_hash = EXCLUDED.password_hash, name = EXCLUDED.name`,
    [name, email, hash]
  );
  console.log(`Admin account ready: ${email}`);
}

main()
  .catch((err) => {
    console.error(err.message);
    process.exitCode = 1;
  })
  .finally(() => pool.end());

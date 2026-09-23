import pg from "pg";
import { requireEnv } from "./env.js";

// Hosted providers (Neon, Supabase, Render, ...) need SSL; local Postgres does not.
const ssl = process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined;

export const pool = new pg.Pool({
  connectionString: requireEnv("DATABASE_URL"),
  ssl,
  max: 5,
});

export const query = (text, params) => pool.query(text, params);

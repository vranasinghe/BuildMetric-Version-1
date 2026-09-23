// Loads server/.env for local development. On Vercel the variables come
// from the project settings, so a missing file is fine.
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const here = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(here, ".env"), quiet: true });

export const isProduction =
  process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL);

export function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

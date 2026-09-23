import { rateLimit } from "express-rate-limit";
import { query } from "./db.js";

// express-rate-limit keeps its counters in memory by default. On Vercel every
// serverless instance has its own memory (and loses it when it goes idle), so
// the limits would barely apply. This store keeps the counters in Postgres.
class PostgresStore {
  localKeys = false;

  constructor(prefix) {
    this.prefix = prefix;
  }

  init(options) {
    this.windowMs = options.windowMs;
  }

  key(key) {
    return `${this.prefix}:${key}`.slice(0, 200);
  }

  async get(key) {
    const { rows } = await query("SELECT hits, reset_at FROM rate_limits WHERE key = $1 AND reset_at > NOW()", [
      this.key(key),
    ]);
    return rows[0] ? { totalHits: rows[0].hits, resetTime: rows[0].reset_at } : undefined;
  }

  async increment(key) {
    // Start a new window when the old one has ended, otherwise count the hit.
    const { rows } = await query(
      `INSERT INTO rate_limits (key, hits, reset_at)
       VALUES ($1, 1, NOW() + ($2 || ' milliseconds')::interval)
       ON CONFLICT (key) DO UPDATE SET
         hits     = CASE WHEN rate_limits.reset_at <= NOW() THEN 1 ELSE rate_limits.hits + 1 END,
         reset_at = CASE WHEN rate_limits.reset_at <= NOW() THEN EXCLUDED.reset_at ELSE rate_limits.reset_at END
       RETURNING hits, reset_at`,
      [this.key(key), String(this.windowMs)]
    );
    // Occasionally clear out windows that ended long ago.
    if (Math.random() < 0.01) {
      query("DELETE FROM rate_limits WHERE reset_at < NOW() - INTERVAL '1 day'").catch(() => undefined);
    }
    return { totalHits: rows[0].hits, resetTime: rows[0].reset_at };
  }

  async decrement(key) {
    await query("UPDATE rate_limits SET hits = GREATEST(hits - 1, 0) WHERE key = $1", [this.key(key)]);
  }

  async resetKey(key) {
    await query("DELETE FROM rate_limits WHERE key = $1", [this.key(key)]);
  }
}

// A rate limiter whose counters live in the database. `name` keeps each
// limiter's counters separate.
export function dbRateLimit(name, { windowMs, limit, message, keyGenerator }) {
  return rateLimit({
    windowMs,
    limit,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: message },
    store: new PostgresStore(name),
    ...(keyGenerator ? { keyGenerator } : {}),
    // If the database is briefly unreachable, let the request through rather
    // than locking everyone out; the route itself will fail on the database anyway.
    passOnStoreError: true,
  });
}

import { Router } from "express";
import bcrypt from "bcryptjs";
import { query } from "../db.js";
import { endSession, optionalAuth, publicUser, startSession } from "../middleware/auth.js";
import { dbRateLimit } from "../rateLimit.js";
import * as v from "../validate.js";

const router = Router();

// Per IP address.
const authLimiter = dbRateLimit("auth", {
  windowMs: 15 * 60 * 1000,
  limit: 20,
  message: "Too many attempts. Please try again in a few minutes.",
});

// Per email address: after MAX_FAILED wrong passwords within LOCK_MINUTES the
// email is locked for LOCK_MINUTES, however many IP addresses the guesses come
// from. Unknown emails are counted the same way, so a lockout never reveals
// whether an account exists.
const MAX_FAILED = 5;
const LOCK_MINUTES = 15;
const LOCKED_MESSAGE = `Too many failed attempts for this email. Please try again in ${LOCK_MINUTES} minutes.`;

async function isLocked(email) {
  const { rows } = await query("SELECT 1 FROM login_attempts WHERE email = $1 AND locked_until > NOW()", [email]);
  return rows.length > 0;
}

async function recordFailure(email) {
  await query(
    `INSERT INTO login_attempts (email, failed_count, last_failed)
     VALUES ($1, 1, NOW())
     ON CONFLICT (email) DO UPDATE SET
       failed_count = CASE WHEN login_attempts.last_failed < NOW() - ($3 || ' minutes')::interval
                           THEN 1 ELSE login_attempts.failed_count + 1 END,
       last_failed  = NOW(),
       locked_until = CASE WHEN login_attempts.last_failed >= NOW() - ($3 || ' minutes')::interval
                            AND login_attempts.failed_count + 1 >= $2
                           THEN NOW() + ($3 || ' minutes')::interval
                           ELSE login_attempts.locked_until END`,
    [email, MAX_FAILED, String(LOCK_MINUTES)]
  );
  if (Math.random() < 0.01) {
    query("DELETE FROM login_attempts WHERE last_failed < NOW() - INTERVAL '1 day'").catch(() => undefined);
  }
}

// Compared against when the email is unknown, so both paths take the same time.
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 12);

router.post("/register", authLimiter, async (req, res) => {
  const name = v.text(req.body?.name, "Name", { required: true, max: 120 });
  const email = v.email(req.body?.email);
  const phone = v.text(req.body?.phone, "Phone", { max: 40 });
  const password = v.password(req.body?.password);

  const hash = await bcrypt.hash(password, 12);
  const { rows } = await query(
    `INSERT INTO users (name, email, phone, password_hash)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (email) DO NOTHING
     RETURNING id, name, email, phone, role, created_at`,
    [name, email, phone, hash]
  );
  if (!rows[0]) {
    return res.status(409).json({ error: "An account with this email already exists. Please log in." });
  }
  await startSession(res, rows[0]);
  res.status(201).json({ user: publicUser(rows[0]) });
});

router.post("/login", authLimiter, async (req, res) => {
  const email = v.email(req.body?.email);
  const password = typeof req.body?.password === "string" ? req.body.password : "";

  if (await isLocked(email)) {
    return res.status(429).json({ error: LOCKED_MESSAGE });
  }

  const { rows } = await query(
    "SELECT id, name, email, phone, role, created_at, password_hash FROM users WHERE email = $1",
    [email]
  );
  const user = rows[0];
  const ok = await bcrypt.compare(password, user ? user.password_hash : DUMMY_HASH);
  if (!user || !ok) {
    await recordFailure(email);
    if (await isLocked(email)) return res.status(429).json({ error: LOCKED_MESSAGE });
    return res.status(401).json({ error: "Incorrect email or password." });
  }

  await query("DELETE FROM login_attempts WHERE email = $1", [email]);
  await startSession(res, user);
  res.json({ user: publicUser(user) });
});

router.post("/logout", async (req, res) => {
  await endSession(req, res);
  res.json({ ok: true });
});

router.get("/me", optionalAuth, (req, res) => {
  res.json({ user: req.user ? publicUser(req.user) : null });
});

export default router;

import { Router } from "express";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import { query } from "../db.js";
import {
  clearSessionCookie,
  optionalAuth,
  publicUser,
  setSessionCookie,
} from "../middleware/auth.js";
import * as v from "../validate.js";

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many attempts. Please try again in a few minutes." },
});

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
  setSessionCookie(res, rows[0]);
  res.status(201).json({ user: publicUser(rows[0]) });
});

router.post("/login", authLimiter, async (req, res) => {
  const email = v.email(req.body?.email);
  const password = typeof req.body?.password === "string" ? req.body.password : "";

  const { rows } = await query(
    "SELECT id, name, email, phone, role, created_at, password_hash FROM users WHERE email = $1",
    [email]
  );
  const user = rows[0];
  const ok = await bcrypt.compare(password, user ? user.password_hash : DUMMY_HASH);
  if (!user || !ok) {
    return res.status(401).json({ error: "Incorrect email or password." });
  }
  setSessionCookie(res, user);
  res.json({ user: publicUser(user) });
});

router.post("/logout", (_req, res) => {
  clearSessionCookie(res);
  res.json({ ok: true });
});

router.get("/me", optionalAuth, (req, res) => {
  res.json({ user: req.user ? publicUser(req.user) : null });
});

export default router;

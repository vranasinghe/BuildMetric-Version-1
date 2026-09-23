import jwt from "jsonwebtoken";
import { isProduction, requireEnv } from "../env.js";
import { query } from "../db.js";

export const COOKIE_NAME = "bm_token";
const SESSION_DAYS = 7;

const jwtSecret = () => requireEnv("JWT_SECRET");

// Session lives in an httpOnly cookie so page scripts can never read the token.
export function setSessionCookie(res, user) {
  const token = jwt.sign({ sub: String(user.id) }, jwtSecret(), {
    expiresIn: `${SESSION_DAYS}d`,
  });
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60 * 1000,
  });
}

export function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME, { httpOnly: true, secure: isProduction, sameSite: "lax", path: "/" });
}

export function publicUser(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    role: row.role,
    createdAt: row.created_at,
  };
}

// Reads the user from the database on every request, so a deleted user or a
// changed role takes effect immediately rather than when the token expires.
async function loadUser(req) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return null;
  let payload;
  try {
    payload = jwt.verify(token, jwtSecret());
  } catch {
    return null;
  }
  const { rows } = await query(
    "SELECT id, name, email, phone, role, created_at FROM users WHERE id = $1",
    [Number(payload.sub)]
  );
  return rows[0] || null;
}

export async function optionalAuth(req, _res, next) {
  req.user = await loadUser(req);
  next();
}

export async function requireAuth(req, res, next) {
  const user = await loadUser(req);
  if (!user) {
    clearSessionCookie(res);
    return res.status(401).json({ error: "Please log in to continue." });
  }
  req.user = user;
  next();
}

export async function requireAdmin(req, res, next) {
  await requireAuth(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Admin access required." });
    }
    next();
  });
}

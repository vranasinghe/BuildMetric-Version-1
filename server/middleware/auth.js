import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { isProduction, requireEnv } from "../env.js";
import { query } from "../db.js";

export const COOKIE_NAME = "bm_token";
const SESSION_DAYS = 7;
const JWT_ALGORITHM = "HS256";

const jwtSecret = () => requireEnv("JWT_SECRET");

const cookieOptions = { httpOnly: true, secure: isProduction, sameSite: "lax", path: "/" };

// Starts a session: a row in the sessions table, and an httpOnly cookie holding
// a signed token that names that row. Page scripts can never read the token,
// and deleting/revoking the row ends the session even if the token was copied.
export async function startSession(res, user) {
  const sessionId = crypto.randomBytes(32).toString("base64url");
  await query(
    `INSERT INTO sessions (id, user_id, expires_at)
     VALUES ($1, $2, NOW() + ($3 || ' days')::interval)`,
    [sessionId, user.id, String(SESSION_DAYS)]
  );
  const token = jwt.sign({ sub: String(user.id), sid: sessionId }, jwtSecret(), {
    algorithm: JWT_ALGORITHM,
    expiresIn: `${SESSION_DAYS}d`,
  });
  res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: SESSION_DAYS * 24 * 60 * 60 * 1000 });
}

export function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME, cookieOptions);
}

function readToken(req) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return null;
  try {
    const payload = jwt.verify(token, jwtSecret(), { algorithms: [JWT_ALGORITHM] });
    return typeof payload.sid === "string" ? payload : null;
  } catch {
    return null;
  }
}

// Ends the session on the server, so the token stops working immediately.
export async function endSession(req, res) {
  const payload = readToken(req);
  if (payload) {
    await query("UPDATE sessions SET revoked_at = NOW() WHERE id = $1 AND revoked_at IS NULL", [payload.sid]);
  }
  clearSessionCookie(res);
}

// Ends every session a user has (used when the admin password is reset).
export async function endAllSessions(userId) {
  await query("UPDATE sessions SET revoked_at = NOW() WHERE user_id = $1 AND revoked_at IS NULL", [userId]);
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

// Reads the user from the database on every request, so a revoked session, a
// deleted user or a changed role takes effect immediately.
async function loadUser(req) {
  const payload = readToken(req);
  if (!payload) return null;
  const { rows } = await query(
    `SELECT u.id, u.name, u.email, u.phone, u.role, u.created_at
     FROM sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.id = $1 AND s.user_id = $2 AND s.revoked_at IS NULL AND s.expires_at > NOW()`,
    [payload.sid, Number(payload.sub)]
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

-- BuildMetric database schema. Safe to run more than once.

CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(120) NOT NULL,
  email         VARCHAR(255) NOT NULL UNIQUE,
  phone         VARCHAR(40),
  password_hash TEXT NOT NULL,
  role          VARCHAR(20) NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inquiries (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name        VARCHAR(120) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  phone       VARCHAR(40),
  service     VARCHAR(120),
  message     TEXT NOT NULL,
  source_page VARCHAR(120),
  status      VARCHAR(20) NOT NULL DEFAULT 'new'
              CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
  admin_note  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS inquiries_user_id_idx ON inquiries (user_id);
CREATE INDEX IF NOT EXISTS inquiries_status_created_idx ON inquiries (status, created_at DESC);

-- Website content edited in the admin panel: one row per section (homeHero, aboutPage, ...).
CREATE TABLE IF NOT EXISTS site_content (
  section    VARCHAR(60) PRIMARY KEY,
  data       JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL
);

-- Login sessions. The session cookie carries a signed token naming one of these
-- rows, so logging out (or a password reset) ends the session on the server too.
CREATE TABLE IF NOT EXISTS sessions (
  id         VARCHAR(64) PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions (user_id);

-- Request counters for rate limiting. Kept in the database so the limits hold
-- across server restarts and across Vercel's separate serverless instances.
CREATE TABLE IF NOT EXISTS rate_limits (
  key      VARCHAR(200) PRIMARY KEY,
  hits     INTEGER NOT NULL,
  reset_at TIMESTAMPTZ NOT NULL
);

-- Failed logins per email address (including emails with no account, so a
-- lockout never reveals whether an account exists).
CREATE TABLE IF NOT EXISTS login_attempts (
  email        VARCHAR(255) PRIMARY KEY,
  failed_count INTEGER NOT NULL DEFAULT 0,
  last_failed  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  locked_until TIMESTAMPTZ
);

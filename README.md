# BuildMetric-Version-1

BuildMetric Consultancy website (React + Vite) with a Node.js / Express API and a PostgreSQL database.

Clients create an account and log in to send inquiries from the Contact, Services and
Project Details pages. Admins log in at `/admin` to see and manage inquiries and registered clients.

## Local setup

1. Install dependencies

   ```bash
   npm install
   ```

2. Create the database (PostgreSQL must be running)

   ```bash
   psql -U postgres -c "CREATE DATABASE buildmetric;"
   ```

3. Copy `server/.env.example` to `server/.env` and fill in `DATABASE_URL`, `JWT_SECRET`,
   `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

4. Create the tables and the admin account (safe to re-run; it also resets the admin password)

   ```bash
   npm run db:setup
   ```

5. Start the website and the API together

   ```bash
   npm run dev:all
   ```

   The site runs on Vite's port and forwards `/api` requests to the API on port 4000.

## Pages

| URL | Who | What |
| --- | --- | --- |
| `/login`, `/register` | Clients | Log in or create an account |
| `/account` | Clients | Account details and the status of their inquiries |
| `/contact`, `/service`, `/project-details` | Clients | Inquiry form (requires login) |
| `/admin` | Admins | Website editor, plus **Inquiries** and **Clients** tabs |

## API

| Method | Path | Access |
| --- | --- | --- |
| POST | `/api/auth/register`, `/api/auth/login`, `/api/auth/logout` | Public |
| GET | `/api/auth/me` | Public (returns `null` when logged out) |
| GET | `/api/content` | Public (website text and images edited in the admin panel) |
| POST | `/api/inquiries` | Logged-in client |
| GET | `/api/inquiries/mine` | Logged-in client |
| GET | `/api/admin/stats`, `/api/admin/inquiries`, `/api/admin/clients` | Admin |
| PATCH, DELETE | `/api/admin/inquiries/:id` | Admin |
| PUT | `/api/admin/content/:section` | Admin (saves one website section, e.g. `aboutPage`) |

Sessions use an httpOnly cookie signed with `JWT_SECRET`. Passwords are hashed with bcrypt.

Website content edited in the admin panel is stored in the `site_content` table (one row per
section). Sections that were never edited fall back to the built-in text in
`src/admin/defaultContent.ts`. Back up the database with your hosting provider's backups or `pg_dump`.

## Deploying on Vercel

`api/index.js` runs the same Express app as a Vercel serverless function, and `vercel.json`
routes `/api/*` to it. To make logins work on the live site:

1. Create a hosted PostgreSQL database (for example Neon, Supabase or Render).
2. In Vercel → Project Settings → Environment Variables, add `DATABASE_URL`,
   `DATABASE_SSL=true`, `JWT_SECRET`, `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
3. Run `npm run db:setup` once against that database (put its `DATABASE_URL` in `server/.env` temporarily).
4. Redeploy.

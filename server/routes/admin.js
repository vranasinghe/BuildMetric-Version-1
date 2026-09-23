import { Router } from "express";
import { query } from "../db.js";
import { requireAdmin } from "../middleware/auth.js";
import * as v from "../validate.js";
import { INQUIRY_COLUMNS } from "./inquiries.js";

const router = Router();
router.use(requireAdmin);

export const STATUSES = ["new", "in_progress", "resolved", "closed"];

router.get("/stats", async (_req, res) => {
  const { rows } = await query(`
    SELECT
      (SELECT COUNT(*) FROM users WHERE role = 'client')::int            AS clients,
      (SELECT COUNT(*) FROM inquiries)::int                              AS inquiries,
      (SELECT COUNT(*) FROM inquiries WHERE status = 'new')::int         AS new,
      (SELECT COUNT(*) FROM inquiries WHERE status = 'in_progress')::int AS in_progress,
      (SELECT COUNT(*) FROM inquiries WHERE status = 'resolved')::int    AS resolved,
      (SELECT COUNT(*) FROM inquiries WHERE status = 'closed')::int      AS closed
  `);
  res.json({ stats: rows[0] });
});

router.get("/inquiries", async (req, res) => {
  const params = [];
  const where = [];
  if (req.query.status && req.query.status !== "all") {
    params.push(v.oneOf(req.query.status, "Status", STATUSES));
    where.push(`i.status = $${params.length}`);
  }
  if (typeof req.query.q === "string" && req.query.q.trim()) {
    params.push(`%${req.query.q.trim()}%`);
    where.push(`(i.name ILIKE $${params.length} OR i.email ILIKE $${params.length}
                 OR i.message ILIKE $${params.length} OR i.service ILIKE $${params.length})`);
  }
  const { rows } = await query(
    `SELECT ${INQUIRY_COLUMNS.split(", ").map((c) => `i.${c}`).join(", ")},
            i.user_id, u.name AS account_name
     FROM inquiries i
     JOIN users u ON u.id = i.user_id
     ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
     ORDER BY i.created_at DESC
     LIMIT 500`,
    params
  );
  res.json({ inquiries: rows });
});

router.patch("/inquiries/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid inquiry id." });

  const sets = [];
  const params = [];
  if (req.body?.status !== undefined) {
    params.push(v.oneOf(req.body.status, "Status", STATUSES));
    sets.push(`status = $${params.length}`);
  }
  if (req.body?.adminNote !== undefined) {
    params.push(v.text(req.body.adminNote, "Note", { max: 2000 }));
    sets.push(`admin_note = $${params.length}`);
  }
  if (!sets.length) return res.status(400).json({ error: "Nothing to update." });

  params.push(id);
  const { rows } = await query(
    `UPDATE inquiries SET ${sets.join(", ")}, updated_at = NOW()
     WHERE id = $${params.length}
     RETURNING ${INQUIRY_COLUMNS}`,
    params
  );
  if (!rows[0]) return res.status(404).json({ error: "Inquiry not found." });
  res.json({ inquiry: rows[0] });
});

router.delete("/inquiries/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid inquiry id." });
  const { rowCount } = await query("DELETE FROM inquiries WHERE id = $1", [id]);
  if (!rowCount) return res.status(404).json({ error: "Inquiry not found." });
  res.json({ ok: true });
});

router.get("/clients", async (_req, res) => {
  const { rows } = await query(`
    SELECT u.id, u.name, u.email, u.phone, u.created_at,
           COUNT(i.id)::int AS inquiry_count,
           MAX(i.created_at) AS last_inquiry_at
    FROM users u
    LEFT JOIN inquiries i ON i.user_id = u.id
    WHERE u.role = 'client'
    GROUP BY u.id
    ORDER BY u.created_at DESC
  `);
  res.json({ clients: rows });
});

export default router;

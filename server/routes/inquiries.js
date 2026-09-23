import { Router } from "express";
import rateLimit from "express-rate-limit";
import { query } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import * as v from "../validate.js";

const router = Router();

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "You have sent several inquiries recently. Please try again later." },
});

export const INQUIRY_COLUMNS =
  "id, name, email, phone, service, message, source_page, status, admin_note, created_at, updated_at";

router.post("/", requireAuth, submitLimiter, async (req, res) => {
  const name = v.text(req.body?.name, "Name", { required: true, max: 120 });
  const phone = v.text(req.body?.phone, "Phone", { max: 40 });
  const service = v.text(req.body?.service, "Service", { max: 120 });
  const message = v.text(req.body?.message, "Message", { required: true, max: 5000 });
  const sourcePage = v.text(req.body?.sourcePage, "Source page", { max: 120 });

  // The inquiry is always tied to the logged-in account's email.
  const { rows } = await query(
    `INSERT INTO inquiries (user_id, name, email, phone, service, message, source_page)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING ${INQUIRY_COLUMNS}`,
    [req.user.id, name, req.user.email, phone, service, message, sourcePage]
  );
  res.status(201).json({ inquiry: rows[0] });
});

router.get("/mine", requireAuth, async (req, res) => {
  const { rows } = await query(
    `SELECT ${INQUIRY_COLUMNS} FROM inquiries WHERE user_id = $1 ORDER BY created_at DESC`,
    [req.user.id]
  );
  res.json({ inquiries: rows });
});

export default router;

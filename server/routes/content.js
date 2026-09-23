import { Router } from "express";
import { query } from "../db.js";
import { requireAdmin } from "../middleware/auth.js";

// Website content edited in the admin panel. Each section (homeHero,
// aboutPage, ...) is stored as its own JSON row, so saving one page never
// overwrites another admin's changes to a different page.
export const publicContent = Router();
export const adminContent = Router();

// Section names like "aboutPage", or "aboutPage__ar" for the Arabic version.
const SECTION_RE = /^[a-zA-Z][a-zA-Z0-9]{0,55}(__ar)?$/;

publicContent.get("/", async (_req, res) => {
  const { rows } = await query("SELECT section, data, updated_at FROM site_content");
  const content = {};
  let updatedAt = null;
  for (const row of rows) {
    content[row.section] = row.data;
    if (!updatedAt || row.updated_at > updatedAt) updatedAt = row.updated_at;
  }
  res.set("Cache-Control", "no-store");
  res.json({ content, updatedAt });
});

adminContent.use(requireAdmin);

adminContent.put("/:section", async (req, res) => {
  const { section } = req.params;
  if (!SECTION_RE.test(section)) {
    return res.status(400).json({ error: "Invalid content section." });
  }
  const data = req.body?.data;
  if (data === undefined || data === null || typeof data !== "object") {
    return res.status(400).json({ error: "Section content must be an object or a list." });
  }
  const { rows } = await query(
    `INSERT INTO site_content (section, data, updated_at, updated_by)
     VALUES ($1, $2, NOW(), $3)
     ON CONFLICT (section) DO UPDATE
       SET data = EXCLUDED.data, updated_at = NOW(), updated_by = EXCLUDED.updated_by
     RETURNING updated_at`,
    [section, JSON.stringify(data), req.user.id]
  );
  res.json({ ok: true, updatedAt: rows[0].updated_at });
});

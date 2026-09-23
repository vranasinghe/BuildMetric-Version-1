import { isProduction } from "./env.js";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import inquiryRoutes from "./routes/inquiries.js";
import adminRoutes from "./routes/admin.js";
import { adminContent, publicContent } from "./routes/content.js";

const app = express();

// Which proxies to trust for the client IP (used by rate limiting). Trusting a
// proxy that isn't there lets anyone pick their own IP with an X-Forwarded-For
// header and dodge the limits. Vercel always sits in front, so trust one hop
// there; elsewhere trust nothing unless TRUST_PROXY says how many proxies there are.
function trustProxySetting() {
  const value = process.env.TRUST_PROXY;
  if (value === undefined || value === "") return process.env.VERCEL ? 1 : false;
  if (value === "true") return 1;
  if (value === "false") return false;
  return /^\d+$/.test(value) ? Number(value) : value;
}
app.set("trust proxy", trustProxySetting());
app.disable("x-powered-by");

// Security headers on every API response. The website's own headers are set in
// vercel.json (production) and vite.config.ts (local).
app.use((_req, res, next) => {
  res.set({
    "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
    // API responses carry account data; never let browsers or proxies keep them.
    "Cache-Control": "no-store",
  });
  if (isProduction) {
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
  next();
});

// Website content sections can be larger than normal requests.
app.use("/api/admin/content", express.json({ limit: "2mb" }));
app.use(express.json({ limit: "50kb" }));
app.use(cookieParser());

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/content", publicContent);
app.use("/api/admin/content", adminContent);
app.use("/api/admin", adminRoutes);

app.use("/api", (_req, res) => res.status(404).json({ error: "Not found." }));

// Express 5 forwards errors thrown in async handlers here.
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  if (status >= 500) console.error(err);
  res.status(status).json({
    error: status >= 500 ? "Something went wrong. Please try again." : err.message,
  });
});

export default app;

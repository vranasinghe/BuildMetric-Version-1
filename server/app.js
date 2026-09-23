import "./env.js";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import inquiryRoutes from "./routes/inquiries.js";
import adminRoutes from "./routes/admin.js";

const app = express();

// Behind Vercel's / a host's proxy: use the real client IP for rate limiting.
app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(express.json({ limit: "50kb" }));
app.use(cookieParser());

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/inquiries", inquiryRoutes);
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

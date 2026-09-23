// Local API server. Vite proxies /api here during `npm run dev`.
import app from "./app.js";

const port = Number(process.env.PORT) || 4000;

app.listen(port, () => {
  console.log(`BuildMetric API running on http://localhost:${port}`);
});

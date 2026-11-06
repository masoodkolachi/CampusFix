import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { requireLogin, requireRole } from "./middleware/auth.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL?.split(",") || true }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);

app.get("/api/admin/ping", requireLogin, requireRole("admin"), (req, res) => {
  res.json({ message: "Admin access confirmed" });
});

app.use(notFound);
app.use(errorHandler);

export default app;

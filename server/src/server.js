import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import csrf from "csurf";
import dotenv from "dotenv";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import xss from "xss-clean";
import { connectDB } from "./config/db.js";
import adminRoutes from "./routes/admin.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import authRoutes from "./routes/auth.routes.js";
import leadRoutes from "./routes/lead.routes.js";
import siteRoutes from "./routes/site.routes.js";

dotenv.config();

const app = express();
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:4173"
].filter(Boolean);

app.use(helmet());
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    // Allow any vercel.app preview/production domain
    if (origin.endsWith(".vercel.app")) return callback(null, true);
    // Allow explicitly listed origins
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));
app.use(compression());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(mongoSanitize());
app.use(xss());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

const publicLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 120, standardHeaders: true, legacyHeaders: false });
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false });
app.use(publicLimiter);

const csrfProtection = csrf({ cookie: { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production" } });
app.get("/api/csrf-token", csrfProtection, (req, res) => res.json({ csrfToken: req.csrfToken() }));

app.get("/api/health", (req, res) => res.json({ ok: true, service: "Arigya Hospital API" }));
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/site", siteRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => res.status(404).json({ message: "Route not found" }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const port = process.env.PORT || 5000;

connectDB()
  .then(() => app.listen(port, () => console.log(`API running on port ${port}`)))
  .catch((error) => {
    console.error("Database connection failed", error);
    process.exit(1);
  });

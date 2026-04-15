import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes    from "./src/routes/auth.routes.js";
import seatRoutes    from "./src/routes/seat.routes.js";
import errorMiddleware from "./src/middleware/error.middleware.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 8080;

const app = express();

// ── Global middleware ──────────────────────────────────────────────────────────
app.use(cors({
  origin: "http://localhost:8080",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.removeHeader("Content-Security-Policy");
  res.removeHeader("Content-Security-Policy-Report-Only");
  next();
});

// ── API Routes ─────────────────────────────────────────────────────────────────
app.use("/api/auth",  authRoutes);
app.use("/api/seats", seatRoutes);

app.use(express.static(path.join(__dirname, 'public')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'public/register.html')));
app.get('/login',    (req, res) => res.sendFile(path.join(__dirname, 'public/login.html')));
// app.get('/seats',    (req, res) => res.sendFile(path.join(__dirname, 'public/seat.html')));

// ── Global error handler (must be last) ────────────────────────────────────────
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

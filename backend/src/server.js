import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";

import reconstructRoutes from "./routes/reconstruct.js";
import searchRoutes from "./routes/search.js";
import reportRoutes from "./routes/reports.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json({ limit: "2mb" }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

// Rate limiter
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 10,
});
app.use(limiter);

// Routes
app.use("/api/reconstruct", reconstructRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/reports", reportRoutes);

app.get("/", (req, res) => res.send("Chronos backend is running 🚀"));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

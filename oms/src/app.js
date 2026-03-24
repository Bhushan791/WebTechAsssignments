const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

const { MONGODB_URI } = require("./config/env.config");

// ─── DATABASE CONNECTION ─────────────────────────────────────────
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ─── MIDDLEWARE ──────────────────────────────────────────────────
// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies (needed for form-data with Multer)
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ─── ROUTES ──────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the MS Backend API" });
});

// Auth routes (register/login/update)
app.use("/api/auth", require("./routes/auth.routes"));

// User routes (example)
app.use("/api/users", require("./routes/user.routes"));

// ─── 404 HANDLER ─────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, msg: "Route not found" });
});

// ─── GLOBAL ERROR HANDLER ────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, msg: err.message || "Internal server error" });
});

module.exports = app;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env.config");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, maxlength: 50, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    //IMAGE FIELD
    image: {
      type: String, // will store file path or URL
      default: null,
    },
  },
  { timestamps: true }
);

// ─── PRE SAVE HOOK ────────────────────────────────────────────────
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// ─── COMPARE PASSWORD METHOD ──────────────────────────────────────
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ─── JWT GENERATION METHOD ───────────────────────────────────────
userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = mongoose.model("User", userSchema);
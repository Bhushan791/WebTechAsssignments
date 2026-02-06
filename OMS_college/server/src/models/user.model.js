import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Prevent model overwrite during hot reload
if (mongoose.models.User) {
  delete mongoose.models.User;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // Student-only fields
    studentId: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },

    department: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },

    year: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },

    // Role control
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    // Common optional fields
    profileImage: {
      type: String, // Cloudinary URL
    },

    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// 🔐 Hash password before save
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// 🔑 Compare password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// 🎟 Generate Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, role: this.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// 🔄 Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model("User", userSchema);



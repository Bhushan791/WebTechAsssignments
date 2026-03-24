const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { MONGODB_URI } = require("./config/env.config");
const User = require("./models/user.model");

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");

    // check if admin already exists
    const existing = await User.findOne({ role: "admin" });
    if (existing) {
      console.log("Admin already exists:", existing.email);
      process.exit(0);
    }

    const hashed = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashed,
      role: "admin",
    });

    console.log("Admin seeded successfully");
    console.log("Email   : admin@gmail.com");
    console.log("Password: admin123");
    process.exit(0);

  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedAdmin();
import { User } from "./models/user.model.js";

const admins = [
  {
    name: "Admin One",
    email: "admin1@test.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "Admin Two",
    email: "admin2@test.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "Admin Three",
    email: "admin3@test.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "Admin Four",
    email: "admin4@test.com",
    password: "admin123",
    role: "admin",
  },
];

export const seedAdmins = async () => {
  try {
    // Check if admins already exist
    const existingAdmins = await User.find({ role: "admin" });

    if (existingAdmins.length > 0) {
      console.log("✅ Admins already seeded. Skipping...");
      return;
    }

    // Create all 4 admins — pre("save") hook will hash passwords automatically
    for (const admin of admins) {
      await User.create(admin);
      console.log(`✅ Admin created: ${admin.email}`);
    }

    console.log("🎉 All 4 admins seeded successfully!");
    console.log("🔑 Password for all: admin123");
  } catch (error) {
    console.error("❌ Error seeding admins:", error.message);
  }
};
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "./db/connection.js";
import app from "./app.js";

// temp setup
import { seedAdmins } from "./seedAdmin.js";

const port = process.env.PORT || 8080;

connectDB()
  .then(async () => {
    // Seed admins ONLY when explicitly enabled
    if (process.env.SEED_ADMINS === "true") {
      await seedAdmins();
      console.log("Admin seeding completed");
    }

    app.listen(port, () => {
      console.log("Server is running at PORT:", port);
    });

    app.on("error", (error) => {
      console.error("ERROR:", error);
      throw error;
    });
  })
  .catch((err) => {
    console.error("Failed DB connection", err);
  });

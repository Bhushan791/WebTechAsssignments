const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const databaseConnection = async () => {
  try {
    const dburl = process.env.MONGODB_URI;
    const conn = await mongoose.connect(dburl);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

module.exports = databaseConnection;


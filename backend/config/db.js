
const mongoose = require("mongoose");

async function connectDB() {
  const mongoURI =
    process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error("MONGODB_URI is missing in backend/.env");
  }

  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;

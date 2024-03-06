import dotenv from "dotenv";
import mongoose from "mongoose";

export function connectDB() {
  dotenv.config();

  if (!process.env.MONGO_DB_URI) {
    throw new Error("MONGODB_URI is not defined in the environment variables.");
  }

  mongoose
    .connect(process.env.MONGO_DB_URI, {
      dbName: process.env.MONGO_DB_NAME,
      user: process.env.MONGO_DB_USER,
      pass: process.env.MONGO_DB_PASS,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
}

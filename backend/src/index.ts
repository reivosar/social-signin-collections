import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

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

app.use(cors());
app.use(express.json());
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import { SessionOptions } from "express-session";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.COOKIE_SECRET) {
  throw new Error("MONGODB_URI is not defined in the environment variables.");
}

const cookieSecret = process.env.COOKIE_SECRET;
const cookieConfig: SessionOptions = {
  secret: cookieSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24,
  },
};

export default cookieConfig;

import jwt from "jsonwebtoken";
import { AuthorizedData } from "../models/socialLoginModels";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}
if (process.env.JWT_SECRET.length === 0) {
  throw new Error("JWT_SECRET is defined but is empty.");
}
const JWT_SECRET = process.env.JWT_SECRET;

export function encode(data: any, tokenExpiry: Date): string {
  const now = new Date().getTime();
  const expiry = new Date(tokenExpiry).getTime();
  let expiresIn = Math.max(0, (expiry - now) / 1000);
  expiresIn = Math.floor(expiresIn);

  if (expiresIn <= 0) {
    expiresIn = 3600;
    console.warn(
      "Calculated expiresIn is non-positive. Using default value of 1 hour."
    );
  }

  const encodedAuthorizationResult = jwt.sign(data, JWT_SECRET, {
    expiresIn: expiresIn,
  });

  return encodedAuthorizationResult;
}

export const verifyToken = (token: string): any => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded;
  } catch (error) {
    throw new Error("Invalid token.");
  }
};

import jwt from "jsonwebtoken";
import { AuthorizedData } from "../models/socialLoginModels";

export function generateRedirectUrl(authorizedData: AuthorizedData): string {
  const redirectUrl = process.env.FRONTEND_LOGIN_SUCCESS_URL;
  if (!redirectUrl) {
    throw new Error(
      "FRONTEND_LOGIN_SUCCESS_URL is not defined in the environment variables."
    );
  }

  const jwtSecret = process.env.JWT_SECRET as string;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }
  if (jwtSecret.length === 0) {
    throw new Error("JWT_SECRET is defined but is empty.");
  }

  const encodedAuthorizationResult = jwt.sign(authorizedData, jwtSecret, {
    expiresIn: "1h",
  });
  return `${redirectUrl}?userInfo=${encodeURIComponent(
    encodedAuthorizationResult
  )}`;
}

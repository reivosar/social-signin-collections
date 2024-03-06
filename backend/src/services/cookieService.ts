import { Response } from "express";
import { encode } from "./jwtService";

export const setAuthTokenToCookie = (
  res: Response,
  data: any,
  tokenExpiry: Date
) => {
  const isProduction = process.env.NODE_ENV === "production";
  const expiresIn = new Date(tokenExpiry).getTime() - Date.now();
  const jwtToken = encode(data, tokenExpiry);

  res.cookie("authToken", jwtToken, {
    httpOnly: true,
    secure: isProduction,
    maxAge: expiresIn,
    sameSite: "strict",
  });
};

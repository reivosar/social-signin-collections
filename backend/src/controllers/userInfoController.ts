import { Request, Response } from "express";
import { verifyToken } from "../services/jwtService";
import { findUserProfileBy } from "../db/socialLoginRepository";

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const token = req.cookies["authToken"];
    if (!token) {
      return res.status(401).json({ error: "Token not found." });
    }

    const decoded = verifyToken(token) as any;
    if (!decoded) {
      return res.status(401).json({ error: "Token not found." });
    }

    const socialAuthToken = await findUserProfileBy(decoded.loginTokenId);
    if (!socialAuthToken) {
      return res.status(404).json({ error: "User not found." });
    }

    const userInfo = {
      email: socialAuthToken?.email,
      name: socialAuthToken?.name,
    };
    res.json(userInfo);
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ error: "Invalid token." });
  }
};

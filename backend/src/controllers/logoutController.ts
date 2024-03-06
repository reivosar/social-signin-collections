import { Request, Response } from "express";

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("authToken");
  res.status(200).json({ message: "Logged out successfully" });
};

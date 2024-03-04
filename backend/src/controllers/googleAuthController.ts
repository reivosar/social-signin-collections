import { Request, Response } from "express";
import axios from "axios";
import { generateRedirectUrl } from "../services/urlCreateService";
import { handleGoogleRedirect } from "../services/googleAuthService";

export const googleRedirect = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    const authorizationResult = await handleGoogleRedirect(code);
    const redirectUrl = generateRedirectUrl(authorizationResult);
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Error during Google redirect flow:", error);
    const failedRedirectUrl =
      process.env.FRONTEND_LOGIN_FAILED_URL || "/login-failed";
    res.redirect(failedRedirectUrl);
  }
};

import { Request, Response } from "express";
import { handleGoogleRedirect } from "../services/googleAuthService";
import { setAuthTokenToCookie } from "../services/cookieService";
import {
  redirectToLoginSuccessPage,
  redirectToLoginFailedPage,
} from "../services/redirectService";

export const googleRedirect = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    const authorizationResult = await handleGoogleRedirect(code);
    setAuthTokenToCookie(
      res,
      authorizationResult,
      authorizationResult.tokenExpiry
    );
    redirectToLoginSuccessPage(res);
  } catch (error) {
    console.error("Error during Google redirect flow:", error);
    redirectToLoginFailedPage(res);
  }
};

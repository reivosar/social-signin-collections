import { Request, Response } from "express";
import { handleGitHubRedirect } from "../services/githubAuthService";
import { setAuthTokenToCookie } from "../services/cookieService";
import {
  redirectToLoginSuccessPage,
  redirectToLoginFailedPage,
} from "../services/redirectService";

export const githubRedirect = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    const authorizationResult = await handleGitHubRedirect(code);
    setAuthTokenToCookie(
      res,
      authorizationResult,
      authorizationResult.tokenExpiry
    );
    redirectToLoginSuccessPage(res);
  } catch (error) {
    console.error("Error during Github redirect flow:", error);
    redirectToLoginFailedPage(res);
  }
};

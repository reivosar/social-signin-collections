import { Response } from "express";

export function redirectToLoginSuccessPage(res: Response) {
  const redirectUrl =
    process.env.FRONTEND_LOGIN_SUCCESS_URL || "/login-success";
  res.redirect(redirectUrl);
}

export function redirectToLoginFailedPage(res: Response) {
  const failedRedirectUrl =
    process.env.FRONTEND_LOGIN_FAILED_URL || "/login-failed";
  res.redirect(failedRedirectUrl);
}

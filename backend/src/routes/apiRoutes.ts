import { Router } from "express";
import { logout } from "../controllers/logoutController";
import { getUserInfo } from "../controllers/userInfoController";
import { googleRedirect } from "../controllers/googleAuthController";
import { githubRedirect } from "../controllers/githubAuthController";

const router = Router();

router.get("/api/v1/logout", logout);

router.get("/api/v1/auth/userinfo", getUserInfo);

router.get("/redirect/google", googleRedirect);
router.get("/redirect/github", githubRedirect);

export default router;

import { Router } from "express";
import { logout } from "../controllers/logoutController";
import { getUserInfo } from "../controllers/userInfoController";
import { googleRedirect } from "../controllers/googleAuthController";

const router = Router();

router.get("/api/v1/logout", logout);

router.get("/api/v1/auth/userinfo", getUserInfo);

router.get("/redirect/google", googleRedirect);

export default router;

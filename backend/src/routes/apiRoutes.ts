import { Router } from "express";
import { getUserInfo } from "../controllers/userInfoController";
import { googleRedirect } from "../controllers/googleAuthController";

const router = Router();

router.get("/api/v1/auth/userinfo", getUserInfo);

router.get("/redirect/google", googleRedirect);

export default router;

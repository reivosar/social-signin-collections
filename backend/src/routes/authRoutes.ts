import { Router } from 'express';
import { googleRedirect } from '../controllers/googleAuthController';

const router = Router();

router.get('/redirect/google', googleRedirect);

export default router;

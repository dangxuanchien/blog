import { AuthMiddlewares } from '@/middlewares/AuthMiddlewares';
import { validateLogin } from '@/middlewares/ValidationMiddlewares';
import AuthController from '@/modules/auth/AuthController';
import { Router } from 'express';

const router = Router();

router.get('/session', AuthMiddlewares, AuthController.getSessions);
router.post('/login', validateLogin(), AuthController.login);
export default router;

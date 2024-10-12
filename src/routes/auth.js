import express from 'express';
import { validateRegisterPayload } from '../middleware/auth/payload-validation/register.js';
import { validateLoginPayload } from '../middleware/auth/payload-validation/login.js';
import { register, login, logout, authCheckHandler } from '../controllers/auth.js';
import { verifyToken } from '../middleware/auth/auth.js';

const router = express.Router();
router.post('/login', validateLoginPayload, login);
router.post('/register', validateRegisterPayload, register);
router.post('/logout', logout);
router.get('/check-auth', authCheckHandler);

export default router;

import express from 'express';
import {
    register,
    login,
    logout,
    authCheckHandler
} from '../controllers/auth.js';
import { verifyToken } from '../middleware/auth/auth.js';

const router = express.Router();
router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.get('/check-auth', verifyToken, authCheckHandler);

export default router;

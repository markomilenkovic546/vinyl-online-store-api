import express from 'express';
import { getCartHandler } from '../controllers/cart.js';
import { verifyToken } from '../middleware/auth/auth.js';


const router = express.Router();
router.get('/', verifyToken, getCartHandler);

export default router;

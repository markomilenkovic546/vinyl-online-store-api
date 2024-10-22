import express from 'express';
import { validateAddToCartPayload } from '../middleware/cart/payload-validation/addToCart.js';
import { getCartHandler, addToCartHandler } from '../controllers/cart.js';
import { verifyToken } from '../middleware/auth/auth.js';

const router = express.Router();
router.get('/', verifyToken, getCartHandler);
router.post('/', validateAddToCartPayload, verifyToken, addToCartHandler);

export default router;

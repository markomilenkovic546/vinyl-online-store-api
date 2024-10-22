import express from 'express';
import { validateAddToCartPayload } from '../middleware/cart/payload-validation/addToCart.js';
import { validateUpdateCartPayload } from '../middleware/cart/payload-validation/updateCart.js';
import { getCartHandler, addToCartHandler, updateCartHandler } from '../controllers/cart.js';
import { verifyToken } from '../middleware/auth/auth.js';

const router = express.Router();
router.get('/', verifyToken, getCartHandler);
router.post('/', validateAddToCartPayload, verifyToken, addToCartHandler);
router.patch('/', validateUpdateCartPayload, verifyToken, updateCartHandler);

export default router;

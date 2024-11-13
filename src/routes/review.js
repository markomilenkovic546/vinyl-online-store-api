import express from 'express';
import { verifyToken } from '../middleware/auth/auth.js';
import { createReviewHandler } from '../controllers/review.js';

const router = express.Router();
router.post('/', verifyToken, createReviewHandler);

export default router;

import express from 'express';
import { verifyToken } from '../middleware/auth/auth.js';
import { createReviewHandler } from '../controllers/review.js';
import { validateCreateReviewPayload } from '../middleware/review/payload-validation/createReview.js';

const router = express.Router();
router.post('/', verifyToken, validateCreateReviewPayload, createReviewHandler);

export default router;

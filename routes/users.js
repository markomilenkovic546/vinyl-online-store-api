import express from 'express';
import { getUserHandler } from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get('/:id', verifyToken, getUserHandler);

/* UPDATE*/

/* DELETE */
export default router;
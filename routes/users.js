import express from 'express';
import { getUserHandler, changePasswordHandler } from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get('/', verifyToken, getUserHandler);
router.post('/change-password', verifyToken, changePasswordHandler);
/* UPDATE*/

/* DELETE */
export default router;
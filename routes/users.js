import express from 'express';
import { getUserHandler, changePasswordHandler } from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';
import { addAddress } from '../controllers/users.js';

const router = express.Router();

/* READ */
router.get('/', verifyToken, getUserHandler);
router.post('/change-password', verifyToken, changePasswordHandler);
router.post('/addresses', verifyToken, addAddress)
/* UPDATE*/

/* DELETE */
export default router;
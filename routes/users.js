import express from 'express';
import { getUserHandler, changePasswordHandler } from '../controllers/users.js';
import { verifyToken } from '../middleware/auth/auth.js';
import { addAddressHandler } from '../controllers/users.js';

const router = express.Router();

/* READ */
router.get('/', verifyToken, getUserHandler);
router.post('/change-password', verifyToken, changePasswordHandler);
router.post('/addresses', verifyToken, addAddressHandler)
/* UPDATE*/

/* DELETE */
export default router;
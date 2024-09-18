import express from 'express';
import { getUserHandler, changePasswordHandler, deleteProfileImageHandler } from '../controllers/users.js';
import { verifyToken } from '../middleware/auth/auth.js';
import { validateChangePasswordPayload } from '../middleware/user/payload-validation/changePassword.js';
import { validateAddAddressPayload } from '../middleware/user/payload-validation/addAddress.js';
import { addAddressHandler } from '../controllers/users.js';
import { validateUpdateAddressPayload } from '../middleware/user/payload-validation/updateAddress.js';
import { updateAddressesHandler } from '../controllers/users.js';

const router = express.Router();

router.get('/', verifyToken, getUserHandler);
router.post(
    '/change-password',
    verifyToken,
    validateChangePasswordPayload,
    changePasswordHandler
);
router.post(
    '/addresses',
    verifyToken,
    validateAddAddressPayload,
    addAddressHandler
);

router.put('/address/:id', verifyToken, validateUpdateAddressPayload, updateAddressesHandler)

router.delete('/delete-profile-image', verifyToken, deleteProfileImageHandler)

export default router;

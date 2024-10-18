import express from 'express';
import {
    getUserHandler,
    changePasswordHandler,
    deleteProfileImageHandler,
    deleteAddressHandler,
    seedCountriesHandler,
    getCountriesHandler
} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth/auth.js';
import { validateChangePasswordPayload } from '../middleware/user/payload-validation/changePassword.js';
import { validateAddAddressPayload } from '../middleware/user/payload-validation/addAddress.js';
import {
    addAddressHandler,
    deleteUserHandler,
    updateAddressesHandler
} from '../controllers/users.js';
import { validateUpdateAddressPayload } from '../middleware/user/payload-validation/updateAddress.js';

const router = express.Router();

router.get('/', verifyToken, getUserHandler);
router.post(
    '/change-password',
    verifyToken,
    validateChangePasswordPayload,
    changePasswordHandler
);
router.post('/addresses', verifyToken, validateAddAddressPayload, addAddressHandler);

router.patch(
    '/addresses/:id',
    verifyToken,
    validateUpdateAddressPayload,
    updateAddressesHandler
);

router.get('/addresses/countries', getCountriesHandler);

router.post('/addresses/seed-countries', seedCountriesHandler)

router.delete('/addresses/:id', verifyToken, deleteAddressHandler);

router.delete('/delete-profile-image', verifyToken, deleteProfileImageHandler);

router.delete('/', verifyToken, deleteUserHandler);

export default router;

import {
    getUserById,
    changePassword,
    updateUser,
    addAddress,
    deleteProfileImage,
    deleteAddress
} from '../services/userService.js';
import { GetUserResponseDTO } from '../dtos/users/GetUserResponseDTO.js';
import { ChangePasswordRequestDTO } from '../dtos/users/ChangePasswordRequestDTO.js';
import { ChangePasswordResponseDTO } from '../dtos/users/ChangePasswordResponseDTO.js';
import { UpdateUserRequestDTO } from '../dtos/users/UpdateUserRequestDTO.js';
import { UpdateUserResponseDTO } from '../dtos/users/UpdateUserResponseDTO.js';
import { AddAddressRequestDTO } from '../dtos/users/AddAddressRequestDTO.js';
import { AddAddressResponseDTO } from '../dtos/users/AddAddressResponseDTO.js';
import { UpdateAddressRequestDTO } from '../dtos/users/UpdateAddressRequestDTO.js';
import { UpdateAddressResponseDTO } from '../dtos/users/UpdateAddressResponseDTO.js';
import { updateAddress } from '../services/userService.js';

// Controller function to handle the GET /user/:id route
export const getUserHandler = async (req, res) => {
    // Get extracted user id from the access token
    const { id } = req.user;
    try {
        // Get user data by user id from the database
        const user = await getUserById(id);
        if (user) {
            // Sanitize data and prepare for response
            const getUserResponseDTO = new GetUserResponseDTO(user);
            // Send response to the client when getting user data process is successful
            res.status(200).json(getUserResponseDTO);
        } else {
            return res.status(404).json({
                error: 'User not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        });
        console.log(error.message);
    }
};

export const changePasswordHandler = async (req, res) => {
    // Get extracted user id from the access token
    const { id } = req.user;
    const payload = req.body;
    try {
        const changePasswordRequestDTO = new ChangePasswordRequestDTO(
            id,
            payload
        );
        // Update password in db
        const user = await changePassword(changePasswordRequestDTO);
        if (user) {
            // Sanitize data and prepare for response
            const changePasswordResponseDTO = new ChangePasswordResponseDTO(
                user
            );
            // Send response for successful password change
            res.status(201).json(changePasswordResponseDTO);
        }
    } catch (error) {
        if (error.message === 'Current password is incorrect.') {
            return res.status(400).json({
                error: error.message
            });
        }
        res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        });
        console.log(error.message);
    }
};

export const updateUserHandler = async (req, res) => {
    const { id } = req.user;
    const payload = req.body;

    const updateUserRequestDTO = new UpdateUserRequestDTO(id, payload);

    try {
        // Updated user in database
        const updatedUser = await updateUser(req, res, updateUserRequestDTO);
        const updateUserResponseDTO = new UpdateUserResponseDTO(updatedUser);
        // Send a success response with the updated user data
        res.status(200).json(updateUserResponseDTO);
    } catch (error) {
        if (error.message === 'User not found.') {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        });
        console.error(error.message);
    }
};

export const deleteProfileImageHandler = async (req, res) => {
    const id = req.user.id;
    try {
        const updatedUser = await deleteProfileImage(id);
        res.status(200).json({
            message: 'Profile image successfully deleted.'
        });
    } catch (error) {
        if (error.message === 'User not found.') {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        });
        console.error(error.message);
    }
};

export const addAddressHandler = async (req, res) => {
    const { id } = req.user;
    const payload = req.body;

    const addAddressRequestDTO = new AddAddressRequestDTO(id, payload);

    try {
        const user = await addAddress(addAddressRequestDTO);
        const addAddressResponseDTO = new AddAddressResponseDTO(
            user.addresses[user.addresses.length - 1]
        );
        res.status(201).json(addAddressResponseDTO);
    } catch (error) {
        if (error.message === 'User not found.') {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        });
        console.error(error.message);
    }
};

export const updateAddressesHandler = async (req, res) => {
    const payload = req.body;
    const updateAddressRequestDTO = new UpdateAddressRequestDTO(payload);

    try {
        const updatedAddress = await updateAddress(
            req,
            res,
            updateAddressRequestDTO
        );
        const updateAddressResponseDTO = new UpdateAddressResponseDTO(
            updatedAddress
        );
        res.status(201).json(updateAddressResponseDTO);
    } catch (error) {
        if (
            error.message ==
            'You can update isDefault from true to false only by setting other address to be default'
        ) {
            return res.status(400).json({ error: error.message });
        }

        if (error.message === 'User not found.') {
            return res.status(404).json({ error: 'User not found' });
        }

        if (error.message === 'Address not found.') {
            return res.status(404).json({ error: 'Address not found' });
        }
        res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        });
        console.error(error.message);
    }
};

export const deleteAddressHandler = async (req, res) => {
    try {
        const deleted = await deleteAddress(req, res);
        if (deleted) {
            res.status(200).json({ message: 'Address successfully deleted.' });
        }
    } catch (error) {
        if (error.message === 'User not found.') {
            return res.status(404).json({ error: 'User not found' });
        }
        if (error.message === 'Address not found.') {
            return res.status(404).json({ error: 'Address not found' });
        }
        res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        });
        console.error(error.message);
    }
};

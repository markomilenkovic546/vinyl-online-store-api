import {
    getUserById,
    changePassword,
    updateUser,
    addAddress
} from '../services/userService.js';
import { GetUserResponseDTO } from '../dtos/users/GetUserResponseDTO.js';
import { ChangePasswordRequestDTO } from '../dtos/users/ChangePasswordRequestDTO.js';
import { ChangePasswordResponseDTO } from '../dtos/users/ChangePasswordResponseDTO.js';
import { UpdateUserRequestDTO } from '../dtos/users/UpdateUserRequestDTO.js';
import { UpdateUserResponseDTO } from '../dtos/users/UpdateUserResponseDTO.js';
import { AddAddressRequestDTO } from '../dtos/users/AddAddressRequestDTO.js';
import { AddAddressResponseDTO } from '../dtos/users/AddAddressResponseDTO.js';
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
    const { currentPassword, newPassword } = req.body;
    try {
        // Mandatory input validation
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                error: 'currentPassword and newPassword are required inputs.'
            });
        }
        // Type validations
        let typeValidationErrors = [];

        if (typeof currentPassword !== 'string') {
            typeValidationErrors.push('currentPassword must be a string.');
        }
        if (typeof newPassword !== 'string') {
            typeValidationErrors.push('newPassword must be a string.');
        }

        if (typeValidationErrors.length > 0) {
            return res.status(400).json({ error: typeValidationErrors });
        }

        const changePasswordRequestDTO = new ChangePasswordRequestDTO(
            id,
            currentPassword,
            newPassword
        );
        // Update password in db
        const user = await changePassword(req, res, changePasswordRequestDTO);
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
    const { firstName, lastName, birthday } = req.body;

    if (!firstName && !lastName && !birthday && !req.file) {
        return res.status(400).json({ error: 'No input provided' });
    }

    const updateUserRequestDTO = new UpdateUserRequestDTO(
        id,
        firstName,
        lastName,
        birthday
    );

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

export const addAddressHandler = async (req, res) => {
    const {
        country,
        firstName,
        lastName,
        streetAddress,
        city,
        state,
        postalCode
    } = req.body;

    const errors = [];

    // Validate each field individually
    if (!country) errors.push('Country is required.');
    if (!firstName) errors.push('First name is required.');
    if (!lastName) errors.push('Last name is required.');
    if (!streetAddress) errors.push('Street Address is required.');
    if (!city) errors.push('City is required.');
    if (!state) errors.push('State is required.');
    if (!postalCode) errors.push('Postal code is required.');

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const addAddressRequestDTO = new AddAddressRequestDTO(
        country,
        firstName,
        lastName,
        streetAddress,
        city,
        state,
        postalCode
    );
    try {
        const addedAddress = await addAddress(addAddressRequestDTO);
        const addAddressResponseDTO = new AddAddressResponseDTO(addedAddress);
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

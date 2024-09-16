import { registerUser, loginUser } from '../services/userService.js';
import { RegisterRequestDTO } from '../dtos/auth/RegisterRequestDTO.js';
import { RegisterResponseDTO } from '../dtos/auth/RegisterResponseDTO.js';
import { LoginRequestDTO } from '../dtos/auth/LoginRequestDTO.js';
import { LoginResponseDTO } from '../dtos/auth/LoginResponseDTO.js';

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const payload = req.body;
        // Instantiate RegisterRequestDTO class to create an object to pass to the userService
        const registerRequestDTO = new RegisterRequestDTO(payload);

        // Register user in the database
        const savedUser = await registerUser(registerRequestDTO);
        // Instantiate RegisterResponseDTO class to create a response body object
        const registerResponseDTO = new RegisterResponseDTO(savedUser);
        // Send response to the user for the successful registration process
        res.status(201).json(registerResponseDTO);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        });
        console.log(error);
    }
};

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const payload = req.body;

        // Instantiate LoginRequestDTO class to create an object to pass to the userService
        const loginRequestDTO = new LoginRequestDTO(payload);

        // Perform authentication
        const loggedInUser = await loginUser(loginRequestDTO);

        // Instantiate LoginResponseDTO class to create a response body object
        const loginResponseDTO = new LoginResponseDTO(loggedInUser);

        // Set the token in an HTTP-Only cookie
        res.cookie('jwt', loggedInUser.token, {
            httpOnly: true,
            secure: false,
            maxAge: 3 * 24 * 60 * 60 * 1000
        });
        // Send response for the successful login
        res.status(200).json(loginResponseDTO);
    } catch (error) {
        if (error.message === 'User does not exist.')
            return res.status(404).json({ error: 'User does not exist.' });

        if (error.message === 'Password is incorrect.') {
            return res.status(401).json({ error: 'Password is incorrect.' });
        }
        res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        });
        console.log(error);
    }
};

export const logout = async (req, res) => {
    try {
        // Clear the JWT cookie
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: false,
            maxAge: 3 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        });
        console.log(error);
    }
};

export const authCheckHandler = async (req, res) => {
    res.status(200).json({ authenticated: true, userId: req.user.id });
};

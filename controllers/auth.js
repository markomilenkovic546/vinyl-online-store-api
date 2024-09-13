import { registerUser, loginUser } from '../services/userService.js';
import { RegisterRequestDTO } from '../dtos/auth/RegisterRequestDTO.js';
import { RegisterResponseDTO } from '../dtos/auth/RegisterResponseDTO.js';
import { LoginRequestDTO } from '../dtos/auth/LoginRequestDTO.js';
import { LoginResponseDTO } from '../dtos/auth/LoginResponseDTO.js';

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        // Destructure payload object received from the client
        const { firstName, lastName, email, password } = req.body;

        // Validate mandatory fields
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                error: 'firstName, lastName, email, and password are required inputs.'
            });
        }

        // Instantiate RegisterRequestDTO class to create an object to pass to the userService
        const registerRequestDTO = new RegisterRequestDTO({
            firstName,
            lastName,
            email,
            password
        });

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
            message: 'An unexpected error occurred. Please try again later.'
        });
        console.log(error);
    }
};

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        // Destructure payload object received from the client
        const { email, password } = req.body;

        // Validate mandatory fields
        if (!email || !password) {
            return res.status(400).json({
                error: 'email and password are required fields.'
            });
        }
        // Instantiate LoginRequestDTO class to create an object to pass to the userService
        const loginRequestDTO = new LoginRequestDTO({
            email,
            password
        });

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
            message: 'An unexpected error occurred. Please try again later.'
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

        // Optionally, send a response
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'An unexpected error occurred. Please try again later.'
        });
        console.log(error);
    }
};

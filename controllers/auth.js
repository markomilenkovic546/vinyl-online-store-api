import { registerUser } from '../services/userService.js';

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Validate mandatory fields
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                error: 'firstName, lastName, email, and password are required fields.'
            });
        }

        const savedUser = await registerUser({
            firstName,
            lastName,
            email,
            password
        });

        res.status(201).json({
            message: 'User successfully registered.',
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            email: savedUser.email
        });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const registerUser = async (registerRequestDTO) => {
    const { firstName, lastName, email, password } = registerRequestDTO;
    // Encrypt the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new user object
    const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash
    });

    // Record a new user in db and return the result
    return await newUser.save();
};

export const loginUser = async (loginRequestDTO) => {
    const { email, password } = loginRequestDTO;
    // Search for email in db
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User does not exist.');
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Password is incorrect.');
    }

    // Sign the access token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return { token, user };
};

export const getUserById = async (userId) => {
    const user = await User.findById(userId);
    return user;
};

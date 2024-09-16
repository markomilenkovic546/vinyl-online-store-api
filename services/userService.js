import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AddressSchema from '../models/address.js';

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
        password: passwordHash,
        addresses:[
            {
                "firstName":firstName,
                "lastName":lastName,
                "isDefault": true
            }
        ]
        
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

export const changePassword = async (req, res, changePasswordRequestDTO) => {
    const { userId, currentPassword, newPassword } = changePasswordRequestDTO;
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found.');
    }
    // Validate current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        throw new Error('Current password is incorrect.');
    }
    // Encrypt the new password
    const salt = await bcrypt.genSalt();
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    // Update the user's password in the database
    user.password = newPasswordHash;
    await user.save();
    return user;
};

export const updateUser = async (req, res, updateUserRequestDTO) => {
    const { userId, firstName, lastName, birthday } = updateUserRequestDTO;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found.');
    }

    // Update only the fields that were provided
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (birthday) user.birthday = birthday;

    // If a new profile image is uploaded, update the profileImage field
    if (req.file) {
        user.profileImage = `/assets/profileImages/${req.file.filename}`;
    }
    // Save the updated user
    await user.save();
    return user;
};

export const addAddress = async (req, res, addAddressRequestDTO) => {
    const user = await User.findById(req.user?.id);

    if (!user) {
        throw new Error('User not found.');
    }

    /*If the new address is set as the default,
  ensure all other addresses are marked as non-default */

    if (addAddressRequestDTO.isDefault) {
        user.addresses.forEach((address) => {
            if (address.isDefault) {
                address.isDefault = false;
            }
        });
    }
    user.addresses.push(addAddressRequestDTO);

    // Save the updated user document
    return await user.save();
};

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Cart from '../models/Cart.js';
import mongoose from 'mongoose';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { remove } from 'fs-extra';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        addresses: [
            {
                firstName: firstName,
                lastName: lastName,
                isDefault: true
            }
        ]
    });

    // Record a new user in db
    const user = await newUser.save();
    // Create cart for the user
    const cart = new Cart({ userId: user._id });
    await cart.save();
    return user;
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

export const changePassword = async (changePasswordRequestDTO) => {
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
    const { id, firstName, lastName, birthday } = updateUserRequestDTO;

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
        throw new Error('User not found.');
    }

    // Update only the fields that were provided
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (birthday) user.birthday = birthday;

    // If a new profile image is uploaded, delete current image(if exists) and update the profileImage field
    if (req.file) {
        let filePath;
        if (user.profileImage) {
            // Construct the full file path
            filePath = path.resolve(
                __dirname,
                '..',
                '..',
                'public',
                user.profileImage.replace(/^\/+/, '')
            );
            // Check if the file exists before deleting
            if (fs.existsSync(filePath)) {
                try {
                    // Remove image file
                    await remove(filePath);
                    console.log('Image deleted successfully');
                } catch (error) {
                    console.error('Failed to delete profile image:', error);
                    throw new Error(error);
                }
            } else {
                console.warn('File does not exist:', filePath);
            }
        }
        // Record in db the path of the uploaded image
        user.profileImage = `/assets/profileImages/${req.file.filename}`;
    }

    // Save the updated user
    return await user.save();
};

export const deleteProfileImage = async (id) => {
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
        throw new Error('User not found.');
    }
    let filePath;
    if (user.profileImage) {
        // Construct the full file path
        filePath = path.resolve(
            __dirname,
            '..',
            '..',
            'public',
            user.profileImage.replace(/^\/+/, '')
        );
        // Check if the file exists before deleting
        if (fs.existsSync(filePath)) {
            await remove(filePath);
        } else {
            console.warn('File does not exist:', filePath);
        }
    }
    // Record in db the path of the uploaded image
    user.profileImage = '';
    // Save the updated user
    return await user.save();
};
export const addAddress = async (addAddressRequestDTO) => {
    const user = await User.findById(addAddressRequestDTO.id);

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

export const updateAddress = async (req, res, updateAddressRequestDTO) => {
    const userId = req.user.id;
    const addressId = req.params.id;
    const updateData = {
        'addresses.$.country': updateAddressRequestDTO.country,
        'addresses.$.firstName': updateAddressRequestDTO.firstName,
        'addresses.$.lastName': updateAddressRequestDTO.lastName,
        'addresses.$.company': updateAddressRequestDTO.company || '',
        'addresses.$.streetAddress': updateAddressRequestDTO.streetAddress,
        'addresses.$.apartment': updateAddressRequestDTO.apartment || '',
        'addresses.$.city': updateAddressRequestDTO.city,
        'addresses.$.state': updateAddressRequestDTO.state || '',
        'addresses.$.postalCode': updateAddressRequestDTO.postalCode,
        'addresses.$.phone': updateAddressRequestDTO.phone || '',
        'addresses.$.isDefault': updateAddressRequestDTO.isDefault
    };

    // Get user address that has to be updated
    const user = await User.findById(userId);

    if (!user) {
        throw new Error('User not found.');
    }

    const address = user.addresses.find((addr) => addr._id.toString() === addressId);

    if (!address) {
        throw new Error('Address not found.');
    }
    if (!updateAddressRequestDTO.isDefault && address.isDefault) {
        throw new Error(
            'You can update isDefault from true to false only by setting other address to be default'
        );
    }

    // If user wants to update address to be default, update current default address
    if (address) {
        user.addresses.forEach((address) => {
            if (address.isDefault) {
                address.isDefault = false;
            }
        });
    }
    await user.save();

    // Update address
    await User.updateOne(
        { _id: userId, 'addresses._id': addressId },
        { $set: updateData }
    );

    // Get updated address
    const updatedUser = await User.findById(userId);
    const updatedAddress = updatedUser.addresses.find(
        (addr) => addr._id.toString() === addressId
    );

    return updatedAddress;
};

export const deleteAddress = async (req, res) => {
    const userId = req.user.id;
    const addressId = req.params.id;

    // Find the user
    const user = await User.findOne({ _id: userId });

    if (!user) {
        throw new Error('User not found.');
    }

    // Check if the address exists in the user's addresses
    const addressToDelete = user.addresses.find(
        (address) => address._id.toString() === addressId
    );

    if (!addressToDelete) {
        throw new Error('Address not found.');
    }

    // If address that has to be deleted is default address, set first other address to default one
    const addressToSetToDefault = user.addresses.find(
        (address) => address._id.toString() !== addressId
    );

    if (addressToSetToDefault) {
        addressToSetToDefault.isDefault = true;
    }
    await user.save();

    // Delete address
    const deletingInfo = await User.updateOne(
        { _id: userId },
        { $pull: { addresses: { _id: addressId } } }
    );

    return deletingInfo.modifiedCount;
};

export const deleteUser = async (req, res) => {
    const userId = req.user.id;
    if (!userId) {
        throw new Error('userId is not valid');
    }
    const result = await User.deleteOne({ _id: userId });
    console.log('Delete result:', result);
    return result;
};


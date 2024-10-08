import mongoose from 'mongoose';
import AddressSchema from './Address.js';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String, // URL or path to the image
        default: ''
    },

    birthday: {
        type: String,
        default: ''
    },

    recordsCollection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            unique: true
        }
    ],

    loyaltyPoints: {
        type: Number,
        default: 0
    },

    addresses: [AddressSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save hook to update 'updatedAt' on user update
UserSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const User = mongoose.model('User', UserSchema);
export default User;

import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
    country: {
        type: String,
        trim: true,
        default: ''
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    company: {
        type: String,
        trim: true,
        default: ''
    },
    streetAddress: {
        type: String,
        trim: true,
        default: ''
    },
    apartment: {
        type: String,
        trim: true,
        default: ''
    },
    city: {
        type: String,
        trim: true,
        default: ''
    },
    state: {
        type: String,
        trim: true,
        default: ''
    },
    postalCode: {
        type: String,
        trim: true,
        default: ''
    },
    phone: {
        type: String,
        trim: true,
        default: ''
    },
    isDefault: {
        type: Boolean,
        default: false
    }
});

export default AddressSchema;
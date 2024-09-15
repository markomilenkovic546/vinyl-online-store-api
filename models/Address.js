import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true
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
        required: true
    },
    apartment: {
        type: String,
        trim: true,
        default: ''
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        default: ''
    },
    postalCode: {
        type: String,
        required: true
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
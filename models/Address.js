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
    address: {
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
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        default: ''
    }
});

export default AddressSchema;
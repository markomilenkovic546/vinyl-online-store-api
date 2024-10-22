import Joi from 'joi';
import mongoose from 'mongoose';

const addToCartSchema = Joi.object({
    productId: Joi.string()
        .custom((value, helpers) => {
            // Validate if the string is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.message(
                    'Invalid productId. It must be a valid ObjectId.'
                );
            }
            return value;
        })
        .required()
        .messages({
            'string.base': 'productId must be a string',
            'any.required': 'productId is required'
        }),
    quantity: Joi.number().strict().min(1).max(1).required().messages({
        'any.required': 'quantity is required',
        'number.base': 'quantity must be a number',
        'number.min': 'quantity must be at least 1',
        'number.max': 'max allowed quantity is 1'
    })
});

export default addToCartSchema;

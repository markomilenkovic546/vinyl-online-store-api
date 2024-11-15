import Joi from 'joi';
import mongoose from 'mongoose';

const createReviewSchema = Joi.object({
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
    comment: Joi.string().required().messages({
        'string.base': 'comment must be a string',
        'any.required': 'comment is required'
    }),
    rating: Joi.number().strict().min(1).max(5).required().messages({
        'any.required': 'rating is required',
        'number.base': 'rating must be a number',
        'number.min': 'rating must be at least 1',
        'number.max': 'max rating is 5'
    })
});

export default createReviewSchema;

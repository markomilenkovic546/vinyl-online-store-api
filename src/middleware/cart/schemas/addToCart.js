import Joi from 'joi';

const addToCartSchema = Joi.object({
    productId: Joi.string().required().messages({
        'string.base': 'Quantity must be a string'
    }),
    quantity: Joi.number().strict().min(1).max(5).required().messages({
        'any.required': 'Quantity is required',
        'number.base': 'Quantity must be a number',
        'number.min': 'Quantity must be at least 1',
        'number.max': 'Quantity must be 5 or less'
    })
});

export default addToCartSchema;

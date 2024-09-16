import Joi from 'joi';

const registerSchema = Joi.object({
    firstName: Joi.string().required().messages({
        'any.required': 'First name is required'
    }),
    lastName: Joi.string().required().messages({
        'any.required': 'Last name is required'
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Email must be a valid email address'
    }),
    password: Joi.string().min(4).required().messages({
        'any.required': 'Password is required',
        'string.min': 'Password must be at least 4 characters long'
    })
});

export default registerSchema;

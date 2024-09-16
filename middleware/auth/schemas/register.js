import Joi from 'joi';

const registerSchema = Joi.object({
    firstName: Joi.string().trim().required().messages({
        'any.required': 'First name is required',
        'string.empty': 'First name cannot be empty',
        'string.base': 'First name must be a string'
    }),
    lastName: Joi.string().trim().required().messages({
        'any.required': 'Last name is required',
        'string.empty': 'Last name cannot be empty',
        'string.base': 'Last name must be a string'
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Email must be a valid email address',
        'string.base': 'Email must be a string'
    }),
    password: Joi.string().min(4).required().messages({
        'any.required': 'Password is required',
        'string.min': 'Password must be at least 4 characters long',
        'string.base': 'Password must be a string'
    })
});

export default registerSchema;

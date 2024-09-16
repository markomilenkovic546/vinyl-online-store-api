import Joi from 'joi';

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Email must be a valid email address',
        'string.base': 'Email must be a string'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required',
        'string.base': 'Password must be a string'
    })
});

export default loginSchema;

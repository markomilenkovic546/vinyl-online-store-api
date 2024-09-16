import Joi from 'joi';

const changePasswordSchema = Joi.object({
    currentPassword: Joi.string().required().messages({
        'any.required': 'Current password is required',
        'string.base': 'Current password must be a string'
    }),
    newPassword: Joi.string().min(4).required().messages({
        'any.required': 'New password is required',
        'string.min': 'New password must be at least 4 characters long',
        'string.base': 'New password must be a string'
    })
});

export default changePasswordSchema;

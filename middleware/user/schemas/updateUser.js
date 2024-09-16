import Joi from 'joi';

const updateUserSchema = Joi.object({
    firstName: Joi.string().allow('', null).messages({
        'string.base': 'First name must be a string',
        'string.empty': 'First name cannot be an empty string'
    }),
    lastName: Joi.string().allow('', null).messages({
        'string.base': 'Last name must be a string',
        'string.empty': 'Last name cannot be an empty string'
    }),
    birthday: Joi.string()
        .allow('', null)
        .pattern(/^\d{2}\/\d{2}$/)
        .messages({
            'string.base': 'Birthday must be a string',
            'string.empty': 'Birthday cannot be an empty string',
            'string.pattern.base': 'Birthday must be in the format MM/DD'
        }),
    profileImage: Joi.allow()
}).or('firstName', 'lastName', 'birthday', 'profileImage');
export default updateUserSchema;

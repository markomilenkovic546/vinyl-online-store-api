import Joi from 'joi';

const updateAddressSchema = Joi.object({
    country: Joi.string().required().messages({
        'string.base': 'Country must be a string'
    }),
    firstName: Joi.string().required().messages({
        'any.required': 'First name is required',
        'string.base': 'First name must be a string'
    }),
    lastName: Joi.string().required().messages({
        'any.required': 'Last name is required',
        'string.base': 'Last name must be a string'
    }),
    company: Joi.string().allow('').optional().messages({
        'string.base': 'Company must be a string'
    }),
    streetAddress: Joi.string().required().messages({
        'string.base': 'Street address must be a string'
    }),
    apartment: Joi.string().allow('').optional().messages({
        'string.base': 'Apartment must be a string'
    }),
    city: Joi.string().required().messages({
        'string.base': 'City must be a string'
    }),
    state: Joi.string().allow('').optional().messages({
        'string.base': 'State must be a string'
    }),
    postalCode: Joi.string().required().messages({
        'string.base': 'Postal code must be a string'
    }),
    phone: Joi.string().allow('').optional().messages({
        'string.base': 'Phone must be a string'
    }),
    isDefault: Joi.boolean().optional().messages({
        'boolean.base': 'IsDefault must be a boolean'
    })
});

export default updateAddressSchema;
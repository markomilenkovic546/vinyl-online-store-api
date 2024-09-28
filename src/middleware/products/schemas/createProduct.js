import Joi from 'joi';

// Define the schema for the product creation
const createProductSchema = Joi.object({
    title: Joi.string().trim().required().messages({
        'string.base': 'Title must be a string',
        'string.empty': 'Title cannot be empty',
        'any.required': 'Title is required'
    }),
    artist: Joi.string().trim().required().messages({
        'string.base': 'Artist must be a string',
        'string.empty': 'Artist cannot be empty',
        'any.required': 'Artist is required'
    }),
    genre: Joi.string().trim().required().messages({
        'string.base': 'Genre must be a string',
        'string.empty': 'Genre cannot be empty',
        'any.required': 'Genre is required'
    }),
    decade: Joi.string().trim().required().messages({
        'string.base': 'Decade must be a string',
        'string.empty': 'Decade cannot be empty',
        'any.required': 'Decade is required'
    }),
    format: Joi.string().trim().required().messages({
        'string.base': 'Format must be a string',
        'string.empty': 'Format cannot be empty',
        'any.required': 'Format is required'
    }),
    description: Joi.string().trim().required().messages({
        'string.base': 'Description must be a string',
        'string.empty': 'Description cannot be empty',
        'any.required': 'Description is required'
    }),
    price: Joi.number().required().messages({
        'number.base': 'Price must be a number',
        'any.required': 'Price is required'
    }),
    featured: Joi.boolean().required().messages({
        'boolean.base': 'Featured must be a boolean value',
        'any.required': 'Featured is required'
    }),
    tracks: Joi.array()
        .items(
            Joi.object({
                title: Joi.string().trim().required().messages({
                    'string.base': 'Track title must be a string',
                    'string.empty': 'Track title cannot be empty',
                    'any.required': 'Track title is required'
                }),
                length: Joi.string().trim().required().messages({
                    'string.base': 'Track length must be a string',
                    'string.empty': 'Track length cannot be empty',
                    'any.required': 'Track length is required'
                })
            })
        )
        .required()
        .messages({
            'array.base': 'Tracks must be an array',
            'any.required': 'Tracks are required'
        }),
    inStock: Joi.boolean().required().messages({
        'boolean.base': 'In stock must be a boolean value',
        'any.required': 'In stock is required'
    })
});

export default createProductSchema;

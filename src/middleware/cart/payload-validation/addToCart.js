import addToCartSchema from '../schemas/addToCart.js';

export function validateAddToCartPayload(req, res, next) {
    const { error } = addToCartSchema.validate(req.body, {
        abortEarly: false
    });

    if (error) {
        // Extract error messages and format them as an array of strings
        const errorMessages = error.details.map((err) => err.message);

        return res.status(400).json({
            errors: errorMessages
        });
    }

    next();
}
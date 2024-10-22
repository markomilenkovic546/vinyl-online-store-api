import updateCartSchema from '../schemas/updateCart.js';

export function validateUpdateCartPayload(req, res, next) {
    const { error } = updateCartSchema.validate(req.body, {
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
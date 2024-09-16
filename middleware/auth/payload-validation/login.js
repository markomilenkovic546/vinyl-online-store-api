import loginSchema from '../schemas/login.js';

export function validateLoginPayload(req, res, next) {
    // Validate the request body against the schema
    const { error } = loginSchema.validate(req.body, { abortEarly: false });

    if (error) {
        // Extract error messages and format them as an array of strings
        const errorMessages = error.details.map((err) => err.message);

        // Send the response with status 400 and error messages
        return res.status(400).json({
            errors: errorMessages
        });
    }

    next();
}

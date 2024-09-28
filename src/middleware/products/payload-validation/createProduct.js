import createProductSchema from '../schemas/createProduct.js';

export function validateCreateProductPayload(req, res, next) {
    try {
        // Parse the tracks field, if it's a valid JSON string
        if (req.body.tracks) {
            req.body.tracks = JSON.parse(req.body.tracks);
        }
    } catch (error) {
        return res.status(400).json({ errors: ['Tracks must be a valid JSON array'] });
    }
    const { error } = createProductSchema.validate(req.body, {
        abortEarly: false
    });

    if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return res.status(400).json({ errors: errorMessages });
    }

    next();
}

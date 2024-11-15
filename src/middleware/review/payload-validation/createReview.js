import createReviewSchema from "../schemas/createReview.js";

export function validateCreateReviewPayload(req, res, next) {
    const { error } = createReviewSchema.validate(req.body, {
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
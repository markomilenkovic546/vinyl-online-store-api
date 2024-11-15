import { CreateReviewRequestDTO } from '../dtos/review/CreateReviewRequestDTO.js';
import { CreateReviewResponseDTO } from '../dtos/review/CreateReviewResponse.js';
import { createReview } from '../services/reviewService.js';

export const createReviewHandler = async (req, res) => {
    const payload = req.body;
    const userId = req.user?.id;
    const createReviewRequestDTO = new CreateReviewRequestDTO(payload, userId);
    try {
        const createdReview = await createReview(createReviewRequestDTO);
        const createReviewResponseDTO = new CreateReviewResponseDTO(
            createdReview
        );
        res.status(201).json(createReviewResponseDTO);
    } catch (error) {
        if (error.message === 'User not found.') {
            return res.status(404).json({ error: 'User not found.' });
        }
        if (error.message === 'Product not found.') {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        });
        console.error(error.message);
    }
};

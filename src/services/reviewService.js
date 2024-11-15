import Review from '../models/Review.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

export const createReview = async (createReviewRequestDTO) => {
    const { userId, productId, comment, rating } = createReviewRequestDTO;

    // Fetch the user from db
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found.');
    }

    // Fetch the product from the db
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error('Product not found.');
    }

    // Create a new instance of the Review model
    const newReview = new Review({
        user: userId,
        product: productId,
        comment: comment,
        rating: rating
    });
    // Save new review in db
    return await newReview.save();
};

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }

});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
